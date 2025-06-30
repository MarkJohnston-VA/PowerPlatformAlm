using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to create Volunteer global requirement & local Requirement etc.
    /// Message : Create
    /// Primary Entity : contact
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class VolunteerOnCreatePostOperation : IPlugin
    {
        const string USD = "USD";
        public const string AUTHENTICATED_USER_WEB_ROLE = "Authenticated Users";
        IOrganizationService service = null;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            service = serviceFactory.CreateOrganizationService(null);
            IOrganizationService user_service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            //if (context.Depth > 1)
            //    return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.Contact.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity && context.MessageName == Constants.Messages.Create)
            {
                bool isVolunteer = false;
                Entity leadEntity = null;
                if (targetEntity.Attributes.Contains(Constants.Contact.Msnfp_Primaryconstituenttype)
                    && targetEntity.GetAttributeValue<OptionSetValue>(Constants.Contact.Msnfp_Primaryconstituenttype).Value == 844060000)
                {
                    isVolunteer = true;
                    if (targetEntity.Attributes.Contains(Constants.Contact.Originatingleadid))
                        leadEntity = user_service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Originatingleadid).LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Originatingleadid).Id,
                            new ColumnSet(Constants.Leads.Facility, Constants.Leads.PrimaryFacility, Constants.Leads.BenefitingService, Constants.Leads.Role, Constants.Leads.Type, Constants.Leads.Organization));
                }
                else
                {
                    if (targetEntity.Attributes.Contains(Constants.Contact.Originatingleadid))
                    {

                        leadEntity = user_service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Originatingleadid).LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Originatingleadid).Id,
                            new ColumnSet(Constants.Leads.Facility, Constants.Leads.PrimaryFacility, Constants.Leads.BenefitingService, Constants.Leads.Role, Constants.Leads.Type, Constants.Leads.Organization));
                        if (leadEntity is Entity && leadEntity.Attributes.Contains(Constants.Leads.Type) && leadEntity.GetAttributeValue<OptionSetValue>(Constants.Leads.Type).Value == 100000001)
                            isVolunteer = true;

                    }
                }
                if (isVolunteer)
                {
                    //CreateWorkerRecord(tracingService, service, targetEntity);
                    if (targetEntity.Attributes.Contains(Constants.Contact.Primary_Facility_Id) || targetEntity.Attributes.Contains(Constants.Contact.Parentcustomerid))
                        CreateVolunteerRequirement(tracingService, service, targetEntity);

                    if (targetEntity.Attributes.Contains(Constants.Contact.Originatingleadid))
                    {
                        CreateVolunteerAssignmentFromLead(tracingService, user_service, targetEntity, leadEntity);
                        CreateVolunteerOrganizationFromLead(tracingService, user_service, targetEntity, leadEntity);
                    }
                    else
                    {
                        if (targetEntity.Attributes.Contains(Constants.Contact.Primaryorganizationid))
                            CreateVolunteerOrganization(tracingService, user_service, targetEntity);
                    }

                    //AssignAuthenticatedUserWebRole(tracingService, service, targetEntity.ToEntityReference());
                }
                //Create VA from Originating Lead

            }
        }

        private void CreateVolunteerOrganization(ITracingService tracingService, IOrganizationService user_service, Entity targetEntity)
        {
            tracingService.Trace($"Calling CreateVolunteerOrganizationFromLead...");

            Entity volunteerOrgEntity = new Entity(Constants.VolunteerOrganizations.LogicalName);
            volunteerOrgEntity[Constants.VolunteerOrganizations.Volunteer] = targetEntity.ToEntityReference();
            if (targetEntity.Attributes.Contains(Constants.Contact.Primary_Facility_Id))
                volunteerOrgEntity[Constants.VolunteerOrganizations.Facility] = targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primary_Facility_Id);
            else if (targetEntity.Attributes.Contains(Constants.Contact.Parentcustomerid))
                volunteerOrgEntity[Constants.VolunteerOrganizations.Facility] = targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid);

            volunteerOrgEntity[Constants.VolunteerOrganizations.Organization] = targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primaryorganizationid);

            string voName = GenerateVolunteerOrganizationName(tracingService, service, targetEntity, targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primaryorganizationid));

            if (!string.IsNullOrEmpty(voName))
                volunteerOrgEntity[Constants.VolunteerOrganizations.Name] = voName;

            user_service.Create(volunteerOrgEntity);
        }

        private void AssignAuthenticatedUserWebRole(ITracingService tracingService, IOrganizationService service, EntityReference entityReference)
        {
            tracingService.Trace($"Calling AssignAuthenticatedUserWebRole...");
            tracingService.Trace($"Finding Web Role with Name : {AUTHENTICATED_USER_WEB_ROLE}...");

            Entity webRoleEntity = RetrieveAuthenticatedUserWebRole(tracingService, service);
            if (webRoleEntity is Entity)
            {
                Relationship webrole_contact_RelationShip = new Relationship(Constants.WebRoleContactAssociation);

                EntityReferenceCollection contactEntityReferenceCollection = new EntityReferenceCollection();
                contactEntityReferenceCollection.Add(entityReference);

                service.Associate(webRoleEntity.LogicalName, webRoleEntity.Id, webrole_contact_RelationShip, contactEntityReferenceCollection);


            }

        }

        private void CreateVolunteerOrganizationFromLead(ITracingService tracingService, IOrganizationService user_service, Entity targetEntity, Entity leadEntity)
        {
            tracingService.Trace($"Calling CreateVolunteerOrganizationFromLead...");

            if (leadEntity is Entity && leadEntity.Attributes.Contains(Constants.Leads.Organization))
            {
                Entity volunteerOrgEntity = new Entity(Constants.VolunteerOrganizations.LogicalName);
                volunteerOrgEntity[Constants.VolunteerOrganizations.Volunteer] = targetEntity.ToEntityReference();
                if (targetEntity.Attributes.Contains(Constants.Contact.Primary_Facility_Id))
                    volunteerOrgEntity[Constants.VolunteerOrganizations.Facility] = targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primary_Facility_Id);
                else if (targetEntity.Attributes.Contains(Constants.Contact.Parentcustomerid))
                    volunteerOrgEntity[Constants.VolunteerOrganizations.Facility] = targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid);

                volunteerOrgEntity[Constants.VolunteerOrganizations.Organization] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Organization);

                string voName = GenerateVolunteerOrganizationName(tracingService, service, targetEntity, leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Organization));
                if (!string.IsNullOrEmpty(voName))
                    volunteerOrgEntity[Constants.VolunteerOrganizations.Name] = voName;

                user_service.Create(volunteerOrgEntity);

            }
        }


        private string GenerateVolunteerOrganizationName(ITracingService tracingService, IOrganizationService service, Entity volunteerEntity, EntityReference organizationEntityReference)
        {
            tracingService.Trace($"Inside GenerateVolunteerOrganizationName.");
            string voName = string.Empty;
            if (volunteerEntity.Attributes.Contains(Constants.Contact.Fullname))
                voName = volunteerEntity.GetAttributeValue<string>(Constants.Contact.Fullname);

            Entity orgEntity = service.Retrieve(organizationEntityReference.LogicalName,
                organizationEntityReference.Id, new ColumnSet(Constants.Account.Name));
            if (orgEntity is Entity && orgEntity.Attributes.Contains(Constants.Account.Name))
            {
                if (!string.IsNullOrEmpty(voName))
                    voName += " - " + orgEntity.GetAttributeValue<string>(Constants.Account.Name);
                else
                    voName = orgEntity.GetAttributeValue<string>(Constants.Account.Name);
            }
            tracingService.Trace($"Volunteer Organization Name : {voName}");

            return voName;
        }

        private void CreateVolunteerAssignmentFromLead(ITracingService tracingService, IOrganizationService user_service, Entity targetEntity, Entity leadEntity)
        {
            tracingService.Trace($"Calling CreateVolunteerAssignmentFromLead...");


            if (leadEntity is Entity && (leadEntity.Attributes.Contains(Constants.Leads.Facility) || leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility))
                && leadEntity.Attributes.Contains(Constants.Leads.BenefitingService) && leadEntity.Attributes.Contains(Constants.Leads.Role))
            {
                Entity volunteerAssignmentEntity = new Entity(Constants.VolunteerAssignment.LogicalName);
                volunteerAssignmentEntity[Constants.VolunteerAssignment.BenefitingService] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.BenefitingService);
                volunteerAssignmentEntity[Constants.VolunteerAssignment.Volunteer] = targetEntity.ToEntityReference();
                volunteerAssignmentEntity[Constants.VolunteerAssignment.BenefitingServiceRoles] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Role);
                if (leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility))
                    volunteerAssignmentEntity[Constants.VolunteerAssignment.Facility] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.PrimaryFacility);
                else if (leadEntity.Attributes.Contains(Constants.Leads.Facility))
                    volunteerAssignmentEntity[Constants.VolunteerAssignment.Facility] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Facility);

                user_service.Create(volunteerAssignmentEntity);
            }
        }

        private void CreateVolunteerRequirement(ITracingService tracingService, IOrganizationService service, Entity targetEntity)
        {
            tracingService.Trace($"Calling CreateVolunteerRequirement...");
            QueryExpression queryExpression = new QueryExpression(Constants.Requirements.LogicalName);
            queryExpression.ColumnSet = new ColumnSet(Constants.Requirements.PrimaryKey, Constants.Requirements.Name);

            FilterExpression filterExpression = new FilterExpression(LogicalOperator.Or);
            FilterExpression nationalFilterExpression = new FilterExpression(LogicalOperator.And);
            nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000000));
            nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000001));
            nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
            filterExpression.AddFilter(nationalFilterExpression);

            if (targetEntity.Attributes.Contains(Constants.Contact.Primary_Facility_Id) || targetEntity.Attributes.Contains(Constants.Contact.Parentcustomerid))
            {
                FilterExpression localFilterExpression = new FilterExpression(LogicalOperator.And);
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000000));
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000000));
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Facility, ConditionOperator.Equal,
                    (targetEntity.Attributes.Contains(Constants.Contact.Primary_Facility_Id)) ? targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primary_Facility_Id).Id
                     : targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid).Id));
                filterExpression.AddFilter(localFilterExpression);
            }

            queryExpression.Criteria.AddFilter(filterExpression);
            queryExpression.TopCount = 1000;
            queryExpression.NoLock = true;

            EntityCollection requirementEntityCollection = this.service.RetrieveMultiple(queryExpression);
            tracingService.Trace($"Requirement Count : {requirementEntityCollection.Entities.Count}...");
            foreach (Entity requirementEntity in requirementEntityCollection.Entities)
            {
                Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = targetEntity.ToEntityReference();
                volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirementEntity.ToEntityReference();
                volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirementEntity.GetAttributeValue<string>(Constants.Requirements.Name);

                service.Create(volunteerRequirementEntity);
            }

        }

        private void CreateWorkerRecord(ITracingService tracingService, IOrganizationService service, Entity contactEntity)
        {
            tracingService.Trace($"Calling CreateWorkerRecord...");
            Entity workerEntity = new Entity(Constants.Workers.LogicalName);

            workerEntity[Constants.Workers.Contact] = contactEntity.ToEntityReference();
            workerEntity[Constants.Workers.WorkerType] = new OptionSetValue(796500000);
            if (contactEntity.Attributes.Contains(Constants.Contact.Firstname))
                workerEntity[Constants.Workers.FirstName] = contactEntity.GetAttributeValue<string>(Constants.Contact.Firstname);
            if (contactEntity.Attributes.Contains(Constants.Contact.Lastname))
                workerEntity[Constants.Workers.LastName] = contactEntity.GetAttributeValue<string>(Constants.Contact.Lastname);
            if (contactEntity.Attributes.Contains(Constants.Contact.Fullname))
                workerEntity[Constants.Workers.WorkerName] = contactEntity.GetAttributeValue<string>(Constants.Contact.Fullname);
            if (contactEntity.Attributes.Contains(Constants.Contact.Address1_Line1))
                workerEntity[Constants.Workers.Street1] = contactEntity.GetAttributeValue<string>(Constants.Contact.Address1_Line1);
            if (contactEntity.Attributes.Contains(Constants.Contact.Address1_Line2))
                workerEntity[Constants.Workers.Street2] = contactEntity.GetAttributeValue<string>(Constants.Contact.Address1_Line2);
            if (contactEntity.Attributes.Contains(Constants.Contact.Address1_City))
                workerEntity[Constants.Workers.City] = contactEntity.GetAttributeValue<string>(Constants.Contact.Address1_City);
            if (contactEntity.Attributes.Contains(Constants.Contact.Address1_Stateorprovince))
                workerEntity[Constants.Workers.StateProvince] = contactEntity.GetAttributeValue<string>(Constants.Contact.Address1_Stateorprovince);
            if (contactEntity.Attributes.Contains(Constants.Contact.Address1_Country))
                workerEntity[Constants.Workers.Country] = contactEntity.GetAttributeValue<string>(Constants.Contact.Address1_Country);
            if (contactEntity.Attributes.Contains(Constants.Contact.Address1_Postalcode))
                workerEntity[Constants.Workers.PostalCode] = contactEntity.GetAttributeValue<string>(Constants.Contact.Address1_Postalcode);
            if (contactEntity.Attributes.Contains(Constants.Contact.Birthdate))
                workerEntity[Constants.Workers.BirthDate] = contactEntity.GetAttributeValue<DateTime>(Constants.Contact.Birthdate);

            Entity currencyEntity = RetrieveUSDCurrency(tracingService);
            if (currencyEntity is Entity)
                workerEntity[Constants.Workers.Currency] = currencyEntity.ToEntityReference();

            service.Create(workerEntity);
        }

        private Entity RetrieveUSDCurrency(ITracingService tracingService)
        {
            tracingService.Trace($"Calling RetrieveUSDCurrency...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.Currency.LogicalName,
                ColumnSet = new ColumnSet(Constants.Currency.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.Currency.Name,
                                    Operator = ConditionOperator.Like,
                                    Values = { USD }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 1
            };

            EntityCollection workerEntityCollection = service.RetrieveMultiple(query);
            if (workerEntityCollection.Entities.Count > 0)
                return workerEntityCollection.Entities[0];
            else
                return null;
        }

        private Entity RetrieveAuthenticatedUserWebRole(ITracingService tracingService, IOrganizationService service)
        {
            tracingService.Trace($"Calling RetrieveAuthenticatedUserWebRole...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.WebRoles.LogicalName,
                ColumnSet = new ColumnSet(Constants.WebRoles.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.WebRoles.Name,
                                    Operator = ConditionOperator.Like,
                                    Values = { AUTHENTICATED_USER_WEB_ROLE }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 1
            };

            EntityCollection webroleEntityCollection = service.RetrieveMultiple(query);
            if (webroleEntityCollection.Entities.Count > 0)
                return webroleEntityCollection.Entities[0];
            else
                return null;
        }
    }
}

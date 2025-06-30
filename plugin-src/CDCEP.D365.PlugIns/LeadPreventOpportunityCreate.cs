using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to prevent Opportunity during lead qualification process. Responsible to create Volunteer Assignment too. Responsible to create volunteer Organization record too.
    /// Message : QualifyLead
    /// Primary Entity : lead
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class LeadPreventOpportunityCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            //Obtain the execution context from the service provider.

            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
             
            if (context.MessageName != "QualifyLead")
                return;

            //Get a reference to the Organization service.

            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            IOrganizationService system_service = factory.CreateOrganizationService(null);

            //Extract the tracing service for use in debugging sandboxed plug-ins

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace("Input parameters before:");
            //foreach (var item in context.InputParameters)
            //{
            //    tracingService.Trace("{0}: {1}", item.Key, item.Value);
            //}

            //Modify the below input parameters to suit your requirements.
            //In this example, only a Contact record will be created

            context.InputParameters["CreateContact"] = true;
            context.InputParameters["CreateAccount"] = true;
            context.InputParameters["CreateOpportunity"] = false;

            tracingService.Trace("Input parameters after:");
            //foreach (var item in context.InputParameters)
            //{
            //    tracingService.Trace("{0}: {1}", item.Key, item.Value);
            //}

            if(context.InputParameters.Contains("LeadId") && context.InputParameters["LeadId"] is EntityReference)
            {
                EntityReference leadEntityReference = context.InputParameters["LeadId"] as EntityReference;

                if(leadEntityReference is EntityReference)
                {
                    Entity leadEntity = service.Retrieve(leadEntityReference.LogicalName, leadEntityReference.Id,
                        new ColumnSet(Constants.Leads.Facility, Constants.Leads.PrimaryFacility, Constants.Leads.BenefitingService, Constants.Leads.Role, Constants.Leads.Type, 
                        Constants.Leads.Organization, Constants.Leads.OnBoardExistingVolunteer, Constants.Leads.ExistingVolunteer, Constants.Leads.FullName, 
                        Constants.Leads.APDSStatus, Constants.Leads.APDSlastUpdatedOn, Constants.Leads.BackgroundCheckInitiatedDate, Constants.Leads.BackgroundCheckScheduledDate, Constants.Leads.BackgroundCheckStatus,
                        Constants.Leads.SACAdjudicationInitiatedDate, Constants.Leads.SACAdjudicationScheduledDate, Constants.Leads.SACAdjudicationStatus, Constants.Leads.Supervisor, Constants.Leads.APDSSecID));

                    if (leadEntity is Entity && leadEntity.Attributes.Contains(Constants.Leads.Type) && leadEntity.GetAttributeValue<OptionSetValue>(Constants.Leads.Type).Value == 100000001
                        && leadEntity.Attributes.Contains(Constants.Leads.OnBoardExistingVolunteer) && leadEntity.GetAttributeValue<bool>(Constants.Leads.OnBoardExistingVolunteer))
                    {
                        tracingService.Trace("Processing inactive volunteer");
                        if (leadEntity.Attributes.Contains(Constants.Leads.ExistingVolunteer))
                        {
                            tracingService.Trace($"Existing volunteer found : {leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer).Id}");

                            tracingService.Trace($"Activating Volunteer : {leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer).Id}");

                            int userTimeZoneCode = CommonMethods.RetrieveCurrentUsersTimeZoneSettings(service).Value;
                            DateTime localDate = CommonMethods.RetrieveLocalTimeFromUTCTime(service, DateTime.UtcNow, userTimeZoneCode).Value;

                            Entity volunteerEntity = new Entity(Constants.Contact.LogicalName);
                            volunteerEntity.Id = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer).Id;


                            EntityReference facilityEntityReference = null;

                            if (leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility))
                            {
                                volunteerEntity[Constants.Contact.Primary_Facility_Id] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.PrimaryFacility);
                                facilityEntityReference = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.PrimaryFacility);
                            }
                            else if (leadEntity.Attributes.Contains(Constants.Leads.Facility))
                            {
                                volunteerEntity[Constants.Contact.Primary_Facility_Id] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Facility);
                                facilityEntityReference = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Facility);
                            }

                            if(facilityEntityReference is EntityReference)
                            {
                                Entity facilityEntity = service.Retrieve(facilityEntityReference.LogicalName, facilityEntityReference.Id, new ColumnSet(Constants.Account.Ownerid));

                                Entity tmpVolunteerEntity = new Entity(volunteerEntity.LogicalName);
                                tmpVolunteerEntity.Id = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer).Id;
                                tmpVolunteerEntity[Constants.Contact.Ownerid] = facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid);
                                system_service.Update(tmpVolunteerEntity);
                            }

                            if (leadEntity.Attributes.Contains(Constants.Leads.Organization))
                            {
                                volunteerEntity[Constants.Contact.Primaryorganizationid] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Organization);
                                CreateVolunteerOrganizationFromLead(tracingService, service, leadEntity);
                            }

                            volunteerEntity[Constants.Contact.Parentcustomerid] = facilityEntityReference;
                            volunteerEntity[Constants.Contact.Terminateddate] = null;
                            volunteerEntity[Constants.Contact.Terminatedremarks] = null;
                            volunteerEntity[Constants.Contact.LastReEntryDate] = localDate;

                            //MAP IAM related field for Exsiting Volunteer.
                            if (leadEntity.Attributes.Contains(Constants.Leads.APDSSecID))
                                volunteerEntity[Constants.Contact.APDSSecID] = leadEntity.GetAttributeValue<string>(Constants.Leads.APDSSecID);
                            if (leadEntity.Attributes.Contains(Constants.Leads.Supervisor))
                                volunteerEntity[Constants.Contact.Supervisor] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Supervisor);


                            if (leadEntity.Attributes.Contains(Constants.Leads.APDSStatus))
                                volunteerEntity[Constants.Contact.APDSStatus] = leadEntity.GetAttributeValue<OptionSetValue>(Constants.Leads.APDSStatus);
                            if (leadEntity.Attributes.Contains(Constants.Leads.APDSlastUpdatedOn))
                                volunteerEntity[Constants.Contact.APDSlastUpdatedOn] = leadEntity.GetAttributeValue<DateTime>(Constants.Leads.APDSlastUpdatedOn);

                            if (leadEntity.Attributes.Contains(Constants.Leads.BackgroundCheckStatus))
                                volunteerEntity[Constants.Contact.BackgroundCheckStatus] = leadEntity.GetAttributeValue<OptionSetValue>(Constants.Leads.BackgroundCheckStatus);
                            if (leadEntity.Attributes.Contains(Constants.Leads.BackgroundCheckInitiatedDate))
                                volunteerEntity[Constants.Contact.BackgroundCheckInitiatedDate] = leadEntity.GetAttributeValue<DateTime>(Constants.Leads.BackgroundCheckInitiatedDate);
                            if (leadEntity.Attributes.Contains(Constants.Leads.BackgroundCheckScheduledDate))
                                volunteerEntity[Constants.Contact.BackgroundCheckScheduledDate] = leadEntity.GetAttributeValue<DateTime>(Constants.Leads.BackgroundCheckScheduledDate);

                            if (leadEntity.Attributes.Contains(Constants.Leads.SACAdjudicationStatus))
                                volunteerEntity[Constants.Contact.SACAdjudicationStatus] = leadEntity.GetAttributeValue<OptionSetValue>(Constants.Leads.SACAdjudicationStatus);
                            if (leadEntity.Attributes.Contains(Constants.Leads.SACAdjudicationInitiatedDate))
                                volunteerEntity[Constants.Contact.SACAdjudicationInitiatedDate] = leadEntity.GetAttributeValue<DateTime>(Constants.Leads.SACAdjudicationInitiatedDate);
                            if (leadEntity.Attributes.Contains(Constants.Leads.SACAdjudicationScheduledDate))
                                volunteerEntity[Constants.Contact.SACAdjudicationScheduledDate] = leadEntity.GetAttributeValue<DateTime>(Constants.Leads.SACAdjudicationScheduledDate);


                            volunteerEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                            volunteerEntity[Constants.Status.StateCode] = new OptionSetValue(0);

                            service.Update(volunteerEntity);
                            tracingService.Trace($"Volunteer : {leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer).Id} successfully activated.");

                            if (leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility) || leadEntity.Attributes.Contains(Constants.Leads.Facility))
                            {

                                CreateVolunteerAssignmentFromLead(tracingService, service, leadEntity);

                                //CreateVolunteerRequirement(tracingService, service, leadEntity);
                            }
                        }

                    }
                }
            }
        }

        private void CreateVolunteerOrganizationFromLead(ITracingService tracingService, IOrganizationService service, Entity leadEntity)
        {
            tracingService.Trace($"Calling CreateVolunteerOrganizationFromLead...");

            if (leadEntity is Entity && leadEntity.Attributes.Contains(Constants.Leads.Organization))
            {
                Entity volOrgEntity = RetrieveVolunteerOrganization(tracingService, service, leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer), leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Organization));
                if (volOrgEntity is Entity)
                {
                    //Heng Luo' change based on user story task, https://jira.devops.va.gov/browse/CRMCDCEP-3765, Missing development: When I re on board an inactive volunteer > the related Associated Organizations still shows inactive
                    tracingService.Trace($"Vol Org record Found. {volOrgEntity.Id.ToString()}...");
                    if (volOrgEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value == 1)
                    {
                        tracingService.Trace($"Vol Org record {volOrgEntity.Id.ToString()} state is inactive, activating it...");
                        volOrgEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                        volOrgEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                        service.Update(volOrgEntity);
                    }
                    return;
                }
                else
                {
                    tracingService.Trace($"Vol Org record Not Found. Creating New One...");
                    Entity volunteerOrgEntity = new Entity(Constants.VolunteerOrganizations.LogicalName);
                    volunteerOrgEntity[Constants.VolunteerOrganizations.Volunteer] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer);
                    if (leadEntity.Attributes.Contains(Constants.Leads.Facility))
                        volunteerOrgEntity[Constants.VolunteerOrganizations.Facility] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Facility);
                    else if (leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility))
                        volunteerOrgEntity[Constants.VolunteerOrganizations.Facility] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.PrimaryFacility);

                    volunteerOrgEntity[Constants.VolunteerOrganizations.Organization] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Organization);

                    string voName = GenerateVolunteerOrganizationName(tracingService, service, leadEntity, leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Organization));
                    if (!string.IsNullOrEmpty(voName))
                        volunteerOrgEntity[Constants.VolunteerOrganizations.Name] = voName;

                    service.Create(volunteerOrgEntity);
                }

            }
        }

        private string GenerateVolunteerOrganizationName(ITracingService tracingService, IOrganizationService service, Entity leadEntity, EntityReference organizationEntityReference)
        {
            tracingService.Trace($"Inside GenerateVolunteerOrganizationName.");
            string voName = string.Empty;
            if (leadEntity.Attributes.Contains(Constants.Leads.FullName))
                voName = leadEntity.GetAttributeValue<string>(Constants.Leads.FullName);

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


        private Entity RetrieveVolunteerOrganization(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference, EntityReference orgEntityReference)
        {
            tracingService.Trace($"Calling RetrieveVolunteerOrganization...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerOrganizations.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerOrganizations.PrimaryKey, Constants.Status.StateCode),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerOrganizations.Volunteer,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerOrganizations.Organization,
                                    Operator = ConditionOperator.Equal,
                                    Values = { orgEntityReference.Id }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 1
            };

            EntityCollection volOrgEntityCollection = service.RetrieveMultiple(query);
            if (volOrgEntityCollection.Entities.Count > 0)
                return volOrgEntityCollection.Entities[0];
            else
                return null;
        }

        private void CreateVolunteerAssignmentFromLead(ITracingService tracingService, IOrganizationService service, Entity leadEntity)
        {
            tracingService.Trace($"Calling CreateVolunteerAssignmentFromLead...");


            if (leadEntity is Entity && (leadEntity.Attributes.Contains(Constants.Leads.Facility) || leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility))
                && leadEntity.Attributes.Contains(Constants.Leads.BenefitingService) && leadEntity.Attributes.Contains(Constants.Leads.Role))
            {
                EntityCollection vaCollection = RetrieveActiveVolAssignment(tracingService, service, leadEntity);
                tracingService.Trace($"volunteer assignment count : {vaCollection.Entities.Count}...");
                if (vaCollection.Entities.Count > 0) {
                    Entity vaEntity = vaCollection.Entities[0];
                    if(vaEntity is Entity)
                    {
                        tracingService.Trace($"Updating volunteer assignment record {vaEntity.Id.ToString()}...");

                        vaEntity[Constants.Status.StatusCode] = new OptionSetValue(100000001);  //Approved
                        vaEntity[Constants.Status.StateCode] = new OptionSetValue(0);    //

                        service.Update(vaEntity);
                    }
                }
                else
                {
                    tracingService.Trace($"Creating new volunteer assignment record...");

                    Entity volunteerAssignmentEntity = new Entity(Constants.VolunteerAssignment.LogicalName);
                    volunteerAssignmentEntity[Constants.VolunteerAssignment.BenefitingService] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.BenefitingService);
                    volunteerAssignmentEntity[Constants.VolunteerAssignment.Volunteer] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer);
                    volunteerAssignmentEntity[Constants.VolunteerAssignment.BenefitingServiceRoles] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Role);
                    if (leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility))
                        volunteerAssignmentEntity[Constants.VolunteerAssignment.Facility] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.PrimaryFacility);
                    else if (leadEntity.Attributes.Contains(Constants.Leads.Facility))
                        volunteerAssignmentEntity[Constants.VolunteerAssignment.Facility] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Facility);

                    service.Create(volunteerAssignmentEntity);
                }

            }
        }

        private EntityCollection RetrieveActiveVolAssignment(ITracingService tracingService, IOrganizationService service, Entity targetEntity)
        {
            tracingService.Trace($"Calling RetrieveActiveVolAssignment...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerAssignment.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerAssignment.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.Volunteer,
                                    Operator = ConditionOperator.Equal,
                                    Values = { targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer).Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.BenefitingService,
                                    Operator = ConditionOperator.Equal,
                                    Values = { targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.BenefitingService).Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.BenefitingServiceRoles,
                                    Operator = ConditionOperator.Equal,
                                    Values = { targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.Role).Id }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 10
            };
            return service.RetrieveMultiple(query);

        }

    }
}

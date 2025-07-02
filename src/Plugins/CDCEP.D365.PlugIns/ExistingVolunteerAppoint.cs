using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used for creating/updating existing volunteer Requirement when Existing Volunteer lead is qualified.
    /// Message : QualifyLead
    /// Primary Entity : lead
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class ExistingVolunteerAppoint : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.MessageName != "QualifyLead")
                return;

            //Get a reference to the Organization service.

            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            IOrganizationService system_service = factory.CreateOrganizationService(null);

            //Extract the tracing service for use in debugging sandboxed plug-ins

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            if (context.InputParameters.Contains("LeadId") && context.InputParameters["LeadId"] is EntityReference)
            {
                EntityReference leadEntityReference = context.InputParameters["LeadId"] as EntityReference;

                if (leadEntityReference is EntityReference)
                {
                    Entity leadEntity = service.Retrieve(leadEntityReference.LogicalName, leadEntityReference.Id,
                        new ColumnSet(Constants.Leads.Facility, Constants.Leads.PrimaryFacility, Constants.Leads.BenefitingService, Constants.Leads.Role, Constants.Leads.Type,
                        Constants.Leads.Organization, Constants.Leads.OnBoardExistingVolunteer, Constants.Leads.ExistingVolunteer));

                    if (leadEntity is Entity && leadEntity.Attributes.Contains(Constants.Leads.Type) && leadEntity.GetAttributeValue<OptionSetValue>(Constants.Leads.Type).Value == 100000001
    && leadEntity.Attributes.Contains(Constants.Leads.OnBoardExistingVolunteer) && leadEntity.GetAttributeValue<bool>(Constants.Leads.OnBoardExistingVolunteer))
                    {
                        if (leadEntity.Attributes.Contains(Constants.Leads.PrimaryFacility) || leadEntity.Attributes.Contains(Constants.Leads.Facility))
                        {
                            CreateVolunteerRequirement(tracingService, system_service, leadEntity);
                        }
                    }
                }
            }

        }


        private void CreateVolunteerRequirement(ITracingService tracingService, IOrganizationService service, Entity targetEntity)
        {
            tracingService.Trace($"Calling CreateVolunteerRequirement...");
            QueryExpression queryExpression = new QueryExpression(Constants.Requirements.LogicalName);
            queryExpression.ColumnSet = new ColumnSet(Constants.Requirements.PrimaryKey, Constants.Requirements.Name, Constants.Requirements.RequirementDateType, Constants.Requirements.Scope);

            FilterExpression filterExpression = new FilterExpression(LogicalOperator.Or);
            FilterExpression nationalFilterExpression = new FilterExpression(LogicalOperator.And);
            nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000000));
            nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000001));
            nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
            filterExpression.AddFilter(nationalFilterExpression);

            if (targetEntity.Attributes.Contains(Constants.Leads.Facility) || targetEntity.Attributes.Contains(Constants.Leads.PrimaryFacility))
            {
                FilterExpression localFilterExpression = new FilterExpression(LogicalOperator.And);
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000000));
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000000));
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
                localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Facility, ConditionOperator.Equal,
                    (targetEntity.Attributes.Contains(Constants.Leads.Facility)) ? targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.Facility).Id
                     : targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.PrimaryFacility).Id));
                filterExpression.AddFilter(localFilterExpression);
            }

            queryExpression.Criteria.AddFilter(filterExpression);
            queryExpression.TopCount = 1000;
            queryExpression.NoLock = true;

            EntityCollection requirementEntityCollection = service.RetrieveMultiple(queryExpression);
            tracingService.Trace($"National Requirement Count : {requirementEntityCollection.Entities.Count}...");
            EntityCollection existingvolunteerRequirementCollection = RetrieveVolunteerRequirement(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer));
            tracingService.Trace($"Existing Volunteer Requirement Count : {existingvolunteerRequirementCollection.Entities.Count}...");
            tracingService.Trace($"Processing National Requirement. Total Count : {requirementEntityCollection.Entities.Where(r => r.Attributes.Contains(Constants.Requirements.Scope) && r.GetAttributeValue<OptionSetValue>(Constants.Requirements.Scope).Value == 100000001).Count()}...");
            foreach (Entity requirementEntity in requirementEntityCollection.Entities)
            {
                Entity existingVolunteerRequirementEntity = existingvolunteerRequirementCollection.Entities.Where(vr => vr.Attributes.Contains(Constants.VolunteerRequirements.RequirementID)
                 && vr.GetAttributeValue<EntityReference>(Constants.VolunteerRequirements.RequirementID).Id.Equals(requirementEntity.Id)).FirstOrDefault();
                if (existingVolunteerRequirementEntity is Entity)
                {
                    tracingService.Trace($"Existing Vol. Requirement found. ");
                    if (requirementEntity.Attributes.Contains(Constants.Requirements.RequirementDateType) && requirementEntity.GetAttributeValue<OptionSetValue>(Constants.Requirements.RequirementDateType).Value == 100000004)
                    {
                        if (existingVolunteerRequirementEntity.Attributes.Contains(Constants.VolunteerRequirements.RequirementDate)
                            && existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate) < DateTime.Now)
                        {
                            tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date : {existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate)} is " +
                                $"is less than Current Date : {DateTime.Now}. Marking Vol requirement as Not Met.");
                            Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                            tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                            tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(100000002);
                            service.Update(tmpvolreqEntity);
                        }
                        else
                        {
                            tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date not found. Marking Vol requirement as New.");
                            Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                            tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                            tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                            tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            service.Update(tmpvolreqEntity);
                        }
                    }
                    else
                    {
                        tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} Set status to Active and New.");
                        Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                        tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                        tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                        tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                        service.Update(tmpvolreqEntity);
                    }
                }
                else
                {
                    tracingService.Trace($"Existing Vol. Requirement NOT found. Creating New One...");
                    Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                    volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer);
                    volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirementEntity.ToEntityReference();
                    volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirementEntity.GetAttributeValue<string>(Constants.Requirements.Name);
                    volunteerRequirementEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                    volunteerRequirementEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                    service.Create(volunteerRequirementEntity);
                }

            }

            /*
            tracingService.Trace($"Processing Local Requirement. Total Count : {requirementEntityCollection.Entities.Where(r => r.Attributes.Contains(Constants.Requirements.Scope) && r.GetAttributeValue<OptionSetValue>(Constants.Requirements.Scope).Value == 100000000).Count()}...");
            foreach (Entity requirementEntity in requirementEntityCollection.Entities.Where(r => r.Attributes.Contains(Constants.Requirements.Scope) && r.GetAttributeValue<OptionSetValue>(Constants.Requirements.Scope).Value == 100000000).ToList())
            {
                Entity existingVolunteerRequirementEntity = existingvolunteerRequirementCollection.Entities.Where(vr => vr.Attributes.Contains(Constants.VolunteerRequirements.RequirementID)
                 && vr.GetAttributeValue<EntityReference>(Constants.VolunteerRequirements.RequirementID).Id.Equals(requirementEntity.Id)).FirstOrDefault();
                if (existingVolunteerRequirementEntity is Entity)
                {
                    tracingService.Trace($"Existing Vol. Requirement found. ");
                    if (requirementEntity.Attributes.Contains(Constants.Requirements.RequirementDateType) && requirementEntity.GetAttributeValue<OptionSetValue>(Constants.Requirements.RequirementDateType).Value == 100000004)
                    {
                        if (existingVolunteerRequirementEntity.Attributes.Contains(Constants.VolunteerRequirements.RequirementDate)
                            && existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate) < DateTime.Now)
                        {
                            tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date : {existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate)} is " +
                                $"is less than Current Date : {DateTime.Now}. Marking Vol requirement as Not Met.");
                            Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                            tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                            tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(100000002);
                            service.Update(tmpvolreqEntity);
                        }
                        else
                        {
                            tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date not found. Marking Vol requirement as New.");
                            Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                            tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                            tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                            tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            service.Update(tmpvolreqEntity);
                        }
                    }
                    else
                    {
                        tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} Set status to Active and New.");
                        Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                        tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                        tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                        tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                        service.Update(tmpvolreqEntity);
                    }
                }
                else
                {
                    tracingService.Trace($"Existing Vol. Requirement NOT found. Creating New One...");
                    Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                    volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = targetEntity.GetAttributeValue<EntityReference>(Constants.Leads.ExistingVolunteer);
                    volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirementEntity.ToEntityReference();
                    volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirementEntity.GetAttributeValue<string>(Constants.Requirements.Name);
                    volunteerRequirementEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                    volunteerRequirementEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                    service.Create(volunteerRequirementEntity);
                }

            }

            */
        }

        private EntityCollection RetrieveVolunteerRequirement(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference)
        {
            tracingService.Trace($"Calling RetrieveVolunteerRequirement...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerRequirements.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerRequirements.RequirementID, Constants.VolunteerRequirements.PrimaryKey, Constants.VolunteerRequirements.VolunteerID, Constants.VolunteerRequirements.RequirementDate, Constants.Status.StateCode),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerRequirements.VolunteerID,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerEntityReference.Id }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 100
            };

            LinkEntity reqLinkEntity = new LinkEntity(Constants.VolunteerRequirements.LogicalName, Constants.Requirements.LogicalName, Constants.VolunteerRequirements.RequirementID, Constants.Requirements.PrimaryKey, JoinOperator.Inner);
            reqLinkEntity.LinkCriteria.AddCondition(new ConditionExpression(Constants.Status.StateCode,ConditionOperator.Equal,0));
            query.LinkEntities.Add(reqLinkEntity);

            return service.RetrieveMultiple(query);

        }
    }
}

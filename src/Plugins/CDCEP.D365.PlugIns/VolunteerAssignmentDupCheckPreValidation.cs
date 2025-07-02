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
    /// Plugin is used to check for duplicate Volunteer Assignment for same volunteer.
    /// Message : Create
    /// Primary Entity : cdcep_volunteerassignment
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreValidation
    /// Execution Mode : Sync
    /// </summary>
    public class VolunteerAssignmentDupCheckPreValidation : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.VolunteerAssignment.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity && (context.MessageName == Constants.Messages.Create))
            {
                if(targetEntity.Attributes.Contains(Constants.VolunteerAssignment.Volunteer) && targetEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingService) && targetEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
                {
                    if (targetEntity.Attributes.Contains(Constants.VolunteerAssignment.Volunteer))
                    {
                        Entity volunteerEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer).LogicalName,
                            targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer).Id, new ColumnSet(Constants.Status.StateCode));
                        if (volunteerEntity is Entity && volunteerEntity.Attributes.Contains(Constants.Status.StateCode) && volunteerEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value != 0)
                            throw new InvalidPluginExecutionException("Volunteer Assignment can not be created on Inactive/Terminated Volunteer.");
                    }
                    EntityCollection activeVACollection = RetrieveActiveVolAssignment(tracingService, service, targetEntity);
                    tracingService.Trace($"Total same collection count : {activeVACollection.Entities.Count}");
                    if(activeVACollection.Entities.Count > 0)
                    {
                        throw new InvalidPluginExecutionException("Similar Active Volunteer Assignment found in the system. ");
                    }

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

                                //new ConditionExpression
                                //{
                                //    AttributeName = Constants.Status.StateCode,
                                //    Operator = ConditionOperator.Equal,
                                //    Values = { 0 }
                                //},
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.Volunteer,
                                    Operator = ConditionOperator.Equal,
                                    Values = { targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer).Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.BenefitingService,
                                    Operator = ConditionOperator.Equal,
                                    Values = { targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingService).Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.BenefitingServiceRoles,
                                    Operator = ConditionOperator.Equal,
                                    Values = { targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id }
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

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
    /// Plugin is used to check for duplicate Volunteer Assignment for same volunteer When Assignment is activated.
    /// Message : SetStateDynamicEntity
    /// Primary Entity : cdcep_volunteerassignment
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreValidation
    /// Execution Mode : Sync
    /// </summary>
    public class VolunteerAssignmentDupCheckPreValidationOnStatusChange : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            EntityReference vaEntityReference = null;
            OptionSetValue stateCode = null, statusCode = null;
            if (!context.InputParameters.Contains(Constants.EntityMoniker)) { return; }
            else
                vaEntityReference = context.InputParameters[Constants.EntityMoniker] as EntityReference;
            if (!context.InputParameters.Contains(Constants.InputParameters.State)) { return; }
            else
                stateCode = context.InputParameters[Constants.InputParameters.State] as OptionSetValue;
            if (!context.InputParameters.Contains(Constants.InputParameters.Status)) { return; }
            else
                statusCode = context.InputParameters[Constants.InputParameters.Status] as OptionSetValue;

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.EntityMoniker] as EntityReference).LogicalName}");
            tracingService.Trace($" State Code = {stateCode.Value}");
            tracingService.Trace($" Status Code = {statusCode.Value}");
            if(context.MessageName == Constants.Messages.SetStateDynamic && vaEntityReference is EntityReference && stateCode.Value == 0)
            {
                Entity vaEntity = service.Retrieve(vaEntityReference.LogicalName, vaEntityReference.Id,
                    new ColumnSet(Constants.VolunteerAssignment.Volunteer, Constants.VolunteerAssignment.BenefitingService, Constants.VolunteerAssignment.BenefitingServiceRoles));

                if(vaEntity is Entity)
                {
                    if (vaEntity.Attributes.Contains(Constants.VolunteerAssignment.Volunteer))
                    {
                        Entity volunteerEntity = service.Retrieve(vaEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer).LogicalName,
                            vaEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer).Id, new ColumnSet(Constants.Status.StateCode));
                        if(volunteerEntity is Entity && volunteerEntity.Attributes.Contains(Constants.Status.StateCode) && volunteerEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value != 0)
                            throw new InvalidPluginExecutionException("Volunteer Assignment can not be activated on Inactive/Terminated Volunteer.");
                    }
                    EntityCollection vaEntityCollection = RetrieveVolAssignment(tracingService, service, vaEntity);
                    tracingService.Trace($"Total count : {vaEntityCollection.Entities.Count}");
                    if (vaEntityCollection.Entities.Count > 0)
                    {
                        throw new InvalidPluginExecutionException("Similar Active Volunteer Assignment found in the system. ");
                    }
                }
            }

        }

        private EntityCollection RetrieveVolAssignment(ITracingService tracingService, IOrganizationService service, Entity targetEntity)
        {
            tracingService.Trace($"Calling RetrieveVolAssignment...");
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
                                    AttributeName = Constants.Status.StateCode,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 0 }
                                },
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

using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to populate Name for Available Assignment.
    /// Message : Create
    /// Primary Entity : cdcep_availableassignment
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class AvailableAssignmentOnCreate : IPlugin
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
            if (context.Depth > 1)
                return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.AvailableAssignment.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity && context.MessageName == Constants.Messages.Create)
            {
                string Name = string.Empty;
                if (targetEntity.Attributes.Contains(Constants.AvailableAssignment.Facility))
                {
                    Name = CommonMethods.RetrieveAccountName(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.AvailableAssignment.Facility));
                }

                if (targetEntity.Attributes.Contains(Constants.AvailableAssignment.BenefitingServiceRoles))
                {
                    Entity bsrEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.AvailableAssignment.BenefitingServiceRoles).LogicalName,
                        targetEntity.GetAttributeValue<EntityReference>(Constants.AvailableAssignment.BenefitingServiceRoles).Id,
                        new ColumnSet(Constants.BenefitingServiceRoles.Name));
                    if (bsrEntity is Entity && bsrEntity.Attributes.Contains(Constants.BenefitingServiceRoles.Name))
                    {
                        if (string.IsNullOrEmpty(Name))
                            Name = bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name);
                        else
                            Name += $" - {bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name)}";
                    }
                }
                tracingService.Trace($"Mapping Name : {Name}");
                if (!string.IsNullOrEmpty(Name))
                    targetEntity[Constants.AvailableAssignment.Name] = Name;
            }

        }
    }
}

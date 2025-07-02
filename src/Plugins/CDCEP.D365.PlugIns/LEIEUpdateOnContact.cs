using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to disable assignments when LEIE field is assigned on contact
    /// Message : Update
    /// Primary Entity : contact
    /// Secondary Entity : none
    /// Filtering Attributes : cdcep_leie
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : ASync
    /// </summary>
    public class LEIEUpdateOnContact : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 3)
                return;
            if (context.MessageName != Constants.Messages.Update)
                return;

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.Contact.LogicalName)
                return;

            Entity targetEntity = context.InputParameters[Constants.TARGET] as Entity;
            if (targetEntity.Contains("cdcep_leie") == false)
                return;
            DataCollection<Entity> assignmentList = RetrieveActiveAssignments(tracingService, service, targetEntity.Id);
            foreach(Entity assignment in assignmentList)
            {
                Entity updateAssignment = new Entity(assignment.LogicalName, assignment.Id);
                updateAssignment["statecode"] = new OptionSetValue(1);
                updateAssignment["statuscode"] = new OptionSetValue(2);
                service.Update(updateAssignment);
            }
        }

        private DataCollection<Entity> RetrieveActiveAssignments(ITracingService tracingService, IOrganizationService service, Guid contactId)
        {
            tracingService.Trace($"Calling RetrieveActiveAssignments...");
            QueryExpression query = new QueryExpression
            {
                EntityName = "cdcep_volunteerassignment",
                ColumnSet = new ColumnSet("cdcep_volunteerassignmentid"),
                Criteria = new FilterExpression
                {
                    Conditions =
                    {
                        new ConditionExpression
                        {
                            AttributeName = "cdcep_volunteerid",
                            Operator = ConditionOperator.Equal,
                            Values = { contactId }
                        },
                        new ConditionExpression
                        {
                            AttributeName = "statuscode",
                            Operator = ConditionOperator.In,
                            Values = { 1, 100000001, 100000000 }
                        }
                    }
                },
                NoLock = true,
                TopCount = 100
            };
            EntityCollection entityCollection = service.RetrieveMultiple(query);
            return entityCollection.Entities;
        }
    }
}

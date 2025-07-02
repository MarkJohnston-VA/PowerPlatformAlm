using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to set owner of the terminated/deactivated contact to national shared team
    /// Message : Update
    /// Primary Entity : contact
    /// Secondary Entity : none
    /// Filtering Attributes : statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class ContactOwnerUpdate : IPlugin
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
            if (context.Depth > 1) { return; }

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            Entity targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity &&
                context.MessageName == Constants.Messages.Update &&
                targetEntity.Attributes.Contains(Constants.Contact.Statuscode))
            {
                tracingService.Trace($"Contact Id: {targetEntity.Id}");

                int statusCode = targetEntity.GetAttributeValue<OptionSetValue>("statuscode").Value;
                tracingService.Trace($"Contact statuscode: {statusCode}");
                string teamName = "CDCE - Shared National Records";
                if (statusCode == 100000004 ||   // Terminated
                    statusCode == 100000005 ||   // Terminated with cause
                    statusCode == 2 ||           // Inactive
                    statusCode == 100000006 ||   // Terminated
                    statusCode == 100000007)     // Terminated with cause
                {
                    QueryExpression queryExpression = new QueryExpression("team");
                    queryExpression.ColumnSet = new ColumnSet("teamid");
                    FilterExpression filterExpression = new FilterExpression(LogicalOperator.And);
                    filterExpression.AddCondition(new ConditionExpression("name", ConditionOperator.Equal, teamName));
                    queryExpression.Criteria.AddFilter(filterExpression);
                    queryExpression.TopCount = 10;
                    queryExpression.NoLock = true;
                    EntityCollection teamCollection = service.RetrieveMultiple(queryExpression);
                    tracingService.Trace($"Team Count : {teamCollection.Entities.Count}...");
                    if (teamCollection.Entities.Count > 0)
                    {
                        targetEntity["ownerid"] = teamCollection.Entities[0].ToEntityReference();
                    }
                    else
                    {
                        tracingService.Trace($"Team not found: {teamName}");
                    }
                }
            }
        }
    }
}

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
    /// Plugin is used to make all donation detail record disabled when donation summary is disabled.
    /// Message : Update
    /// Primary Entity : cdcep_donationsummary
    /// Secondary Entity : none
    /// Filtering Attributes : statecode, statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : Post-Operation
    /// Execution Mode : Sync
    /// </summary>
    public class DonationSummaryStatusOnChange : IPlugin
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

            if(context.MessageName == Constants.Messages.Update 
                && (context.InputParameters[Constants.TARGET] as Entity).LogicalName == Constants.DonationSummary.LogicalName)
            {
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

                if(targetEntity is Entity && targetEntity.Attributes.Contains(Constants.Status.StateCode))
                {
                    tracingService.Trace($"State Code : {targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value}");

                    if(targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value == 1)
                    {
                        EntityCollection donationDetailCollection = RetrieveActiveDonationDetails(tracingService, service, targetEntity.ToEntityReference());
                        tracingService.Trace($"Total Active Donation Details Count : {donationDetailCollection.Entities.Count}");

                        foreach(Entity e in donationDetailCollection.Entities)
                        {
                            e.Attributes[Constants.Status.StateCode] = new OptionSetValue(1);
                            e.Attributes[Constants.Status.StatusCode] = new OptionSetValue(2);

                            service.Update(e);
                        }
                    }

                }
            }
        }

        private EntityCollection RetrieveActiveDonationDetails(ITracingService tracingService, IOrganizationService service, EntityReference entityReference)
        {
            tracingService.Trace($"Calling RetrieveActiveDonationDetails...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.DonationDetails.LogicalName,
                ColumnSet = new ColumnSet(Constants.DonationDetails.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.DonationDetails.DonationSummary,
                                    Operator = ConditionOperator.Equal,
                                    Values = { entityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.Status.StateCode,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 0 }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 100
            };

            return service.RetrieveMultiple(query);
        }
    }
}

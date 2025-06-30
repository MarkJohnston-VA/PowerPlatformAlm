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
    /// Plugin is used to delete Donation Summary for given e-Donation when e-donation is set to rejected.
    /// Message : Update
    /// Primary Entity : cdcep_donationlog
    /// Secondary Entity : none
    /// Filtering Attributes : cdcep_donationstatus
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class RejecteDonation : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.DonationLog.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;
            if (targetEntity is Entity && context.MessageName == Constants.Messages.Update)
            {
                if (targetEntity.Attributes.Contains(Constants.DonationLog.DonationStatus))
                {
                    tracingService.Trace($"Donation Status : {targetEntity.GetAttributeValue<OptionSetValue>(Constants.DonationLog.DonationStatus).Value}");

                    if (targetEntity.GetAttributeValue<OptionSetValue>(Constants.DonationLog.DonationStatus).Value == 100000002)
                    {
                        EntityCollection donSummaryCollection = RetrieveDonationSummary(tracingService, service, targetEntity.ToEntityReference());
                        foreach (Entity donSummaryEntity in donSummaryCollection.Entities)
                        {
                            service.Delete(donSummaryEntity.LogicalName, donSummaryEntity.Id);
                        }
                    }

                }
            }
        }

        private EntityCollection RetrieveDonationSummary(ITracingService tracingService, IOrganizationService service, EntityReference entityReference)
        {
            tracingService.Trace($"Calling RetrieveDonationSummary...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.DonationSummary.LogicalName,
                ColumnSet = new ColumnSet(Constants.DonationSummary.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.DonationSummary.EDonation,
                                    Operator = ConditionOperator.Equal,
                                    Values = { entityReference.Id }
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

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
    /// Plugin is used to calculate Total on Donation Summary when Donation Detail is Create.
    /// Message : Create
    /// Primary Entity : cdcep_donationdetails
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    /// <summary>
    /// Plugin is used to calculate Total on Donation Summary when Donation Detail is Updated.
    /// Message : Update
    /// Primary Entity : cdcep_donationdetails
    /// Secondary Entity : none
    /// Filtering Attributes : 
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    /// <summary>
    /// Plugin is used to calculate Total on Donation Summary when Donation Detail is Deleted.
    /// Message : Delete
    /// Primary Entity : cdcep_donationdetails
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class DonationSummaryTotalCalculation : IPlugin
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
            //if (context.Depth > 1)
            //    return;

            if ((context.MessageName == Constants.Messages.Create  || context.MessageName == Constants.Messages.Update) && !(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.DonationDetails.LogicalName)
                return;
            if (context.MessageName == Constants.Messages.Update && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;
            if (context.MessageName == Constants.Messages.Delete && !context.PreEntityImages.Contains(Constants.PRE_IMAGE) && !(context.InputParameters[Constants.TARGET] is EntityReference) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.DonationDetails.LogicalName)
                return;


            switch (context.MessageName)
            {
                case Constants.Messages.Create:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.PostEntityImages[Constants.POST_IMAGE];
                    break;
                case Constants.Messages.Delete:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as EntityReference).LogicalName}");
                    targetEntity = context.PreEntityImages[Constants.PRE_IMAGE];
                    break;
            }

            if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.DonationDetails.DonationSummary) && targetEntity.Attributes.Contains(Constants.DonationDetails.DonationValue))
            {

                EntityCollection donationDetailEntityCollection = service.RetrieveMultiple(
                    (context.MessageName == Constants.Messages.Create || context.MessageName == Constants.Messages.Update) ? new FetchExpression(string.Format(Constants.FetchXmls.DonationDetailTotalOnCreateUpdate,targetEntity.GetAttributeValue<EntityReference>(Constants.DonationDetails.DonationSummary).Id.ToString()))
                    : new FetchExpression(string.Format(Constants.FetchXmls.DonationDetailOnDelete, targetEntity.GetAttributeValue<EntityReference>(Constants.DonationDetails.DonationSummary).Id.ToString(), targetEntity.Id.ToString())));

                if(donationDetailEntityCollection.Entities.Count > 0)
                {
                    Entity donationDetailEntity = donationDetailEntityCollection.Entities[0];
                    if (donationDetailEntity.Attributes.Contains("Total"))
                    {
                        AliasedValue totalAliasedValue = donationDetailEntity.GetAttributeValue<AliasedValue>("Total");
                        Money donationTotal = (Money)totalAliasedValue.Value;
                        Entity donationSummaryEntity = new Entity(Constants.DonationSummary.LogicalName);
                        donationSummaryEntity.Id = targetEntity.GetAttributeValue<EntityReference>(Constants.DonationDetails.DonationSummary).Id;
                        if (donationTotal is Money)
                        {
                            tracingService.Trace($"Donation Total : {donationTotal.Value}");

                            donationSummaryEntity[Constants.DonationSummary.TotalDonationAmount] = donationTotal;
                        }
                        else
                        {
                            donationSummaryEntity[Constants.DonationSummary.TotalDonationAmount] = new Money(0);
                        }
                        service.Update(donationSummaryEntity);
                    }
                }
                else
                {
                    Entity donationSummaryEntity = new Entity(Constants.DonationSummary.LogicalName);
                    donationSummaryEntity.Id = targetEntity.GetAttributeValue<EntityReference>(Constants.DonationDetails.DonationSummary).Id;
                    donationSummaryEntity[Constants.DonationSummary.TotalDonationAmount] = new Money(0);

                    service.Update(donationSummaryEntity);
                }
            }

        }
    }
}

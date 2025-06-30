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
    /// Plugin is used to mark E-Donation is Created to true of Don Summary is created from E-Donation as well as create donation detail from EDonation information.
    /// Also update Last Donation Facility on Donation Record.
    /// Message : Create
    /// Primary Entity : cdcep_donationsummary
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class DonationSummaryOnCreate : IPlugin
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

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.DonationSummary.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity && context.MessageName == Constants.Messages.Create)
            {
                if (targetEntity.Attributes.Contains(Constants.DonationSummary.EDonation))
                {
                    tracingService.Trace($"Don summary ID : {targetEntity.Id}");
                    tracingService.Trace($"Don summary created from eDonation : {targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.EDonation).Id}");

                    Entity eDonationEntity = new Entity( targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.EDonation).LogicalName);
                    eDonationEntity.Id = targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.EDonation).Id;
                    
                    eDonationEntity[Constants.DonationLog.IsDonationCreated] = true;
                    eDonationEntity[Constants.DonationLog.DonationStatus] = new OptionSetValue(100000000);

                    service.Update(eDonationEntity);
                    tracingService.Trace($"E-Donation Flag successfully updated.");
                    tracingService.Trace($"Create Donation Detail for given Donation Summary from E-Donation");

                    Entity donLogEntity = service.Retrieve(Constants.DonationLog.LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.EDonation).Id,
                        new Microsoft.Xrm.Sdk.Query.ColumnSet(Constants.DonationLog.Facility, Constants.DonationLog.Program, Constants.DonationLog.DonationAmount));

                    if(donLogEntity is Entity)
                    {
                        if (donLogEntity.Attributes.Contains(Constants.DonationLog.Facility) && donLogEntity.Attributes.Contains(Constants.DonationLog.Program)
                            && donLogEntity.Attributes.Contains(Constants.DonationLog.DonationAmount))
                        {
                            tracingService.Trace($"Retrieving GPF By Name and Facility");
                            tracingService.Trace($"GPF Name : {donLogEntity.GetAttributeValue<string>(Constants.DonationLog.Program)}");
                            tracingService.Trace($"Facility : {donLogEntity.GetAttributeValue<EntityReference>(Constants.DonationLog.Facility).Id}");
                            tracingService.Trace($"Amount : {donLogEntity.GetAttributeValue<Money>(Constants.DonationLog.DonationAmount).Value}");

                            Entity gpfEntity = RetrieveGPFByFacilityandName(tracingService, service, donLogEntity.GetAttributeValue<EntityReference>(Constants.DonationLog.Facility), donLogEntity.GetAttributeValue<string>(Constants.DonationLog.Program));
                            if(gpfEntity is Entity)
                            {
                                tracingService.Trace($"GPF Found : {gpfEntity.Id}");
                                tracingService.Trace($"Creating Don Detail");

                                Entity donDetailEntity = new Entity(Constants.DonationDetails.LogicalName);
                                donDetailEntity[Constants.DonationDetails.GPF] = gpfEntity.ToEntityReference();
                                donDetailEntity[Constants.DonationDetails.DonationValue] = donLogEntity.GetAttributeValue<Money>(Constants.DonationLog.DonationAmount);
                                donDetailEntity[Constants.DonationDetails.DonationSummary] = targetEntity.ToEntityReference();
                                donDetailEntity[Constants.DonationDetails.Name] = donLogEntity.GetAttributeValue<string>(Constants.DonationLog.Program);

                                donDetailEntity.Id = service.Create(donDetailEntity);

                                tracingService.Trace($"Donation Detail successfully created : {donDetailEntity.Id}");

                            }
                        }
                    }

                }

                if (targetEntity.Attributes.Contains(Constants.DonationSummary.Donor))
                {
                    Entity donorEntity = new Entity(Constants.Contact.LogicalName);
                    donorEntity.Id = targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).Id;

                    donorEntity[Constants.Contact.Lastdonationfacilityid] = targetEntity.ToEntityReference();

                    service.Update(donorEntity);
                }
            }
        }

        private Entity RetrieveGPFByFacilityandName(ITracingService tracingService, IOrganizationService service, EntityReference facilityEntityReference, string gpfName)
        {
            tracingService.Trace($"Calling RetrieveGPFByFacilityandName...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.GPF.LogicalName,
                ColumnSet = new ColumnSet(Constants.GPF.Name,Constants.GPF.Facility),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.GPF.Name,
                                    Operator = ConditionOperator.BeginsWith,
                                    Values = { gpfName }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.GPF.Facility,
                                    Operator = ConditionOperator.Equal,
                                    Values = { facilityEntityReference.Id }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 1
            };

            EntityCollection gpfEntityCollection = service.RetrieveMultiple(query);
            if (gpfEntityCollection.Entities.Count > 0)
                return gpfEntityCollection.Entities[0];
            else
                return null;
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is only for the emergency fix. Can be removed or disable after certain time.
    /// This plugin is used to update Timeentry owner if it is owned by any user and flip it to volunteer owner (It should be owned by team) REMOVED AS IT IS NO LONGER NEEDED.
    /// This plugin is used for recalculating rollup field as soon as timeentry status change.
    /// This plugin is used for calculating Aggregate Hours for that given Volunteer for given Fiscal Year when Time Entry is Approved.
    /// Message : Update
    /// Primary Entity : msnfpe_timeentry
    /// Secondary Entity : none
    /// Filtering Attributes : statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class TimeEntryStatusOnChange : IPlugin
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

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.TimeEntries.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            switch (context.MessageName)
            {
                case Constants.Messages.Update:
                    targetEntity = context.PostEntityImages[Constants.POST_IMAGE] as Entity;
                    break;
            }

            if(targetEntity is Entity && targetEntity.Attributes.Contains(Constants.TimeEntries.OwnerID) && targetEntity.Attributes.Contains(Constants.Status.StatusCode) && targetEntity.Attributes.Contains(Constants.TimeEntries.Volunteer))
            {
                /*
                 * BELOW CODE IS OLDER CODE AND NO LONGER REQUIRED. PLEASE NEVER ADD BELOW CODE...
                tracingService.Trace($"Time Entry Owner Type : {targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.OwnerID).LogicalName}");

                if (targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.OwnerID).LogicalName == Constants.SystemUsers.LogicalName)
                {
                    tracingService.Trace($"Changing Owner to Volunteer Owner...");
                    Entity volunteerEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).LogicalName,
                        targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).Id, new ColumnSet(Constants.Contact.Ownerid));
                    if(volunteerEntity is Entity && volunteerEntity.Attributes.Contains(Constants.Contact.Ownerid))
                    {
                        tracingService.Trace($"Volunteer Owner Type : {volunteerEntity.GetAttributeValue<EntityReference>(Constants.Contact.Ownerid).LogicalName}");
                        if(volunteerEntity.GetAttributeValue<EntityReference>(Constants.Contact.Ownerid).LogicalName != Constants.SystemUsers.LogicalName)
                        {
                            Entity tmpEntity = new Entity(targetEntity.LogicalName);
                            tmpEntity.Id = targetEntity.Id;

                            tmpEntity[Constants.TimeEntries.OwnerID] = volunteerEntity.GetAttributeValue<EntityReference>(Constants.Contact.Ownerid);

                            service.Update(tmpEntity);
                        }

                    }
                }
                 */
                switch (targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StatusCode).Value)
                {
                    case 796500001:                 //Approved
                    case 2:                         //Completed
                        tracingService.Trace($"Within Approved/Completed Case block.");
                        CalculateRollupFieldRequest approvedHoursRollupRequest = new CalculateRollupFieldRequest()
                        {
                            FieldName = Constants.Contact.TotalApprovedHours,
                            Target = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer)
                        };
                        PerformAggregateCalculation(tracingService, service, targetEntity);
                        service.Execute(approvedHoursRollupRequest);
                        break;
                    case 796500000:                 //Submitted
                        tracingService.Trace($"Within Submitted Case block.");
                        CalculateRollupFieldRequest submittedHoursRollupRequest = new CalculateRollupFieldRequest()
                        {
                            FieldName = Constants.Contact.TotalSubmittedHours,
                            Target = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer)
                        };

                        service.Execute(submittedHoursRollupRequest);
                        break;
                    case 796500002:                 //Rejected
                                                    //case 796500004:               //Cancelled
                        tracingService.Trace($"Within Rejected Case block.");
                        //CalculateRollupFieldRequest rejectedHoursRollupRequest = new CalculateRollupFieldRequest()
                        //{
                        //    FieldName = Constants.Contact.tot,
                        //    Target = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer)
                        //};

                        //service.Execute(rejectedHoursRollupRequest);
                        break;
                    case 796500003:                         //Pending Approval
                        tracingService.Trace($"Within Pending Approval Case block.");
                        CalculateRollupFieldRequest pendingHoursRollupRequest = new CalculateRollupFieldRequest()
                        {
                            FieldName = Constants.Contact.PendingApprovalHours,
                            Target = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer)
                        };

                        service.Execute(pendingHoursRollupRequest);
                        break;
                }

                tracingService.Trace($"Regular Hours Calculation.");
                CalculateRollupFieldRequest regularHoursRollupRequest = new CalculateRollupFieldRequest()
                {
                    FieldName = Constants.Contact.TotalRegularHours,
                    Target = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer)
                };

                service.Execute(regularHoursRollupRequest);

            }

        }

        private void PerformAggregateCalculation(ITracingService tracingService, IOrganizationService service, Entity targetEntity)
        {
            tracingService.Trace($"Inside PerformAggregateCalculation");
            if (targetEntity.Attributes.Contains(Constants.TimeEntries.Date))
            {
                tracingService.Trace($"TimeEntry Date : {targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.Date)}");
                tracingService.Trace($"TimeEntry Date Fiscal Year : {targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.Date).CalculateFiscalYear()}");
                string xml = string.Format(Constants.timeEntryFiscalYearFetchXml, targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).Id.ToString(), targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.Date).CalculateFiscalYear().ToString());


                RetrieveMultipleRequest aggFetchRequest = new RetrieveMultipleRequest
                {
                    Query = new FetchExpression(xml)
                };
                EntityCollection aggEntityCollection = ((RetrieveMultipleResponse)service.Execute(aggFetchRequest)).EntityCollection;
                tracingService.Trace($"Time Entry Agg Record Count : {aggEntityCollection.Entities.Count}");
                Dictionary<int, FiscalYearPeriod> fiscalYearPeriod = new Dictionary<int, FiscalYearPeriod>();

                foreach (Entity aggEntity in aggEntityCollection.Entities)
                {
                    if (fiscalYearPeriod.ContainsKey(aggEntity.GetAliasedAttributeValue<int>("FiscalYear")))
                    {
                        string period = aggEntity.GetAliasedAttributeValue<string>("FiscalPeriod").Replace(aggEntity.GetAliasedAttributeValue<int>("FiscalYear").ToString() + "-", "");
                        switch (period)
                        {
                            case "01":
                                fiscalYearPeriod[aggEntity.GetAliasedAttributeValue<int>("FiscalYear")].q1 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                            case "02":
                                fiscalYearPeriod[aggEntity.GetAliasedAttributeValue<int>("FiscalYear")].q2 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                            case "03":
                                fiscalYearPeriod[aggEntity.GetAliasedAttributeValue<int>("FiscalYear")].q3 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                            case "04":
                                fiscalYearPeriod[aggEntity.GetAliasedAttributeValue<int>("FiscalYear")].q4 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                        }
                        fiscalYearPeriod[aggEntity.GetAliasedAttributeValue<int>("FiscalYear")].totalTimeEntry += aggEntity.GetAliasedAttributeValue<int>("TotalTimeEntries");
                    }
                    else
                    {
                        FiscalYearPeriod fisperiod = new FiscalYearPeriod();
                        fisperiod.FiscalYear = aggEntity.GetAliasedAttributeValue<int>("FiscalYear");
                        string period = aggEntity.GetAliasedAttributeValue<string>("FiscalPeriod").Replace(aggEntity.GetAliasedAttributeValue<int>("FiscalYear").ToString() + "-", "");
                        switch (period)
                        {
                            case "01":
                                fisperiod.q1 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                            case "02":
                                fisperiod.q2 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                            case "03":
                                fisperiod.q3 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                            case "04":
                                fisperiod.q4 = aggEntity.GetAliasedAttributeValue<decimal>("TotalHours");
                                break;
                        }
                        fisperiod.totalTimeEntry = aggEntity.GetAliasedAttributeValue<int>("TotalTimeEntries");
                        fiscalYearPeriod.Add(fisperiod.FiscalYear, fisperiod);
                    }
                }
                foreach (KeyValuePair<int, FiscalYearPeriod> keyValuePair in fiscalYearPeriod)
                {
                    KeyAttributeCollection keyCollection = new KeyAttributeCollection();
                    keyCollection.Add(Constants.AggregateHours.Volunteer, targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer));
                    keyCollection.Add(Constants.AggregateHours.FiscalYear, keyValuePair.Value.FiscalYear.ToString());
                    Entity aggHoursEntity = new Entity(Constants.AggregateHours.LogicalName, keyCollection);
                    aggHoursEntity[Constants.AggregateHours.Q1] = keyValuePair.Value.q1;
                    aggHoursEntity[Constants.AggregateHours.Q2] = keyValuePair.Value.q2;
                    aggHoursEntity[Constants.AggregateHours.Q3] = keyValuePair.Value.q3;
                    aggHoursEntity[Constants.AggregateHours.Q4] = keyValuePair.Value.q4;
                    aggHoursEntity[Constants.AggregateHours.NumberOfTimeEntries] = keyValuePair.Value.totalTimeEntry;

                    service.Execute(new UpsertRequest() { Target = aggHoursEntity });
                    if (keyValuePair.Value.FiscalYear == DateTime.Now.CalculateFiscalYear())
                    {
                        tracingService.Trace($"Updating Vol with Current Fiscal Year Aggregate Hours.");
                        Entity volEntity = new Entity(targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).LogicalName);
                        volEntity.Id = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).Id;
                        volEntity["cdcep_aggregatehoursid"] = new EntityReference(Constants.AggregateHours.LogicalName, keyCollection);
                        service.Update(volEntity);
                        tracingService.Trace($"Updating Vol with Current Fiscal Year Aggregate Hours. - Update Complete.");
                    }
                }

                service.Execute(new CalculateRollupFieldRequest()
                {
                    FieldName = "cdcep_totalhoursrollup",
                    Target = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer)
                });
            }
        }

    }

    internal class FiscalYearPeriod
    {
        public decimal q1;
        public int FiscalYear;
        public decimal q2;
        public decimal q3;
        public decimal q4;
        public int totalTimeEntry;
    }
} 

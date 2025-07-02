using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to populate LEIE field when lead is created
    /// Message : Create
    /// Primary Entity : lead
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class LEIECheckOnLeadCreate : IPlugin
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
            if (context.Depth > 1)
                return;
            if (context.MessageName != Constants.Messages.Create)
                return;

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.Leads.LogicalName)
                return;

            Entity targetEntity = context.InputParameters[Constants.TARGET] as Entity;
            if (targetEntity.Contains("firstname") &&
                targetEntity.Contains("lastname") &&
                targetEntity.Contains("cdcep_dob"))
            {
                string firstName = targetEntity.GetAttributeValue<string>("firstname");
                string lastName = targetEntity.GetAttributeValue<string>("lastname");
                DateTime dob = targetEntity.GetAttributeValue<DateTime>("cdcep_dob");
                tracingService.Trace($"firstname : {firstName}");
                tracingService.Trace($"lastName : {lastName}");
                tracingService.Trace($"dob : {dob}");
                DataCollection<Entity> leieList = RetrieveLEIEList(tracingService, service, firstName, lastName, dob);
                tracingService.Trace($"leieList.Count : {leieList.Count}");
                if (leieList.Count > 0)
                {
                    int userTimeZoneCode = CommonMethods.RetrieveCurrentUsersTimeZoneSettings(service).Value;
                    DateTime localDate = CommonMethods.RetrieveLocalTimeFromUTCTime(service, DateTime.UtcNow, userTimeZoneCode).Value;

                    targetEntity["cdcep_leie"] = leieList[0].ToEntityReference();
                    targetEntity[Constants.Leads.LastLEIECheckDate] = localDate;
                    targetEntity["cdcep_leiestatus"] = new OptionSetValue(100000001);
                }
                else
                {
                    targetEntity["cdcep_leiestatus"] = new OptionSetValue(100000000);
                }
            }
        }

        private DataCollection<Entity> RetrieveLEIEList(ITracingService tracingService, IOrganizationService service, string firstName, string lastName, DateTime dob)
        {
            tracingService.Trace($"Calling RetrieveLEIEList...");
            QueryExpression query = new QueryExpression
            {
                EntityName = "cdcep_leie",
                ColumnSet = new ColumnSet("cdcep_leieid", "cdcep_lastname"),
                Criteria = new FilterExpression
                {
                    Conditions =
                    {
                        new ConditionExpression
                        {
                            AttributeName = "cdcep_firstname",
                            Operator = ConditionOperator.Equal,
                            Values = { firstName }
                        },
                        new ConditionExpression
                        {
                            AttributeName = "cdcep_lastname",
                            Operator = ConditionOperator.Equal,
                            Values = { lastName }
                        },
                        new ConditionExpression
                        {
                            AttributeName = "cdcep_dateofbirth",
                            Operator = ConditionOperator.On,
                            Values = { dob }
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

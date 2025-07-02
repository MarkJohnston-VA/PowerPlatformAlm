using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to populate LEIE field when contact is created
    /// Message : Create
    /// Primary Entity : contact
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// 
    /// Plugin is used to populate LEIE field when contact is updated
    /// Message : Update
    /// Primary Entity : contact
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>

    public class LEIECheckOnContactCreateUpdate : IPlugin
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

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.Contact.LogicalName)
                return;

            if (context.MessageName == Constants.Messages.Create)
            {
                Entity targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                if (targetEntity.Contains("firstname") &&
                    targetEntity.Contains("lastname") &&
                    targetEntity.Contains("birthdate"))
                {
                    string firstName = targetEntity.GetAttributeValue<string>("firstname");
                    string lastName = targetEntity.GetAttributeValue<string>("lastname");
                    DateTime dob = targetEntity.GetAttributeValue<DateTime>("birthdate");
                    tracingService.Trace($"firstname : {firstName}");
                    tracingService.Trace($"lastName : {lastName}");
                    tracingService.Trace($"dob : {dob}");
                    DataCollection<Entity> leieList = RetrieveLEIEList(tracingService, service, firstName, lastName, dob);
                    tracingService.Trace($"leieList.Count : {leieList.Count}");
                    if (leieList.Count > 0)
                    {
                        targetEntity["cdcep_leie"] = leieList[0].ToEntityReference();
                        targetEntity["cdcep_leiestatus"] = new OptionSetValue(100000001);
                    }
                    else
                    {
                        targetEntity["cdcep_leiestatus"] = new OptionSetValue(100000000);
                    }
                }
            }

            if (context.MessageName == Constants.Messages.Update)
            {
                Entity targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                Entity postImage = context.PostEntityImages["PostImage"];
                if (postImage.Contains("firstname") &&
                    postImage.Contains("lastname") &&
                    postImage.Contains("birthdate") &&
                    postImage.Contains("cdcep_leie") == false)
                {
                    string firstName = postImage.GetAttributeValue<string>("firstname");
                    string lastName = postImage.GetAttributeValue<string>("lastname");
                    DateTime dob = postImage.GetAttributeValue<DateTime>("birthdate");
                    tracingService.Trace($"firstname : {firstName}");
                    tracingService.Trace($"lastName : {lastName}");
                    tracingService.Trace($"dob : {dob}");
                    DataCollection<Entity> leieList = RetrieveLEIEList(tracingService, service, firstName, lastName, dob);
                    tracingService.Trace($"leieList.Count : {leieList.Count}");
                    if (leieList.Count > 0)
                    {
                        Entity contactUpdate = new Entity("contact", targetEntity.Id);
                        contactUpdate["cdcep_leie"] = leieList[0].ToEntityReference();
                        contactUpdate["cdcep_leiestatus"] = new OptionSetValue(100000001);
                        service.Update(contactUpdate);
                    }
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

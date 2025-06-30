using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CDCEP.D365.PlugIns
{
    
    /// <summary>
    /// Plugin is used to remove or add Organization on all Draft Time Entries for given volunteer.
    /// Message : Create
    /// Primary Entity : cdcep_volunteerorganization
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    /// <summary>
    /// Message : Update
    /// Primary Entity : cdcep_volunteerorganization
    /// Secondary Entity : none
    /// Filtering Attributes : statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>    
    public class VolunteerOrganizationOnCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationServiceFactory serviceFactory1 = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = serviceFactory.CreateOrganizationService(null);
            //IOrganizationService user_service1 = serviceFactory1.CreateOrganizationService(context.InitiatingUserId);
            IOrganizationService user_service = serviceFactory.CreateOrganizationService(context.InitiatingUserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");


            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;

            Entity targetEntity = null;
            if ((context.MessageName == Constants.Messages.Create || context.MessageName == Constants.Messages.Update) && !(context.InputParameters[Constants.TARGET] is Entity)
                && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.VolunteerOrganizations.LogicalName)
                return;

            switch (context.MessageName)
            {
                case Constants.Messages.Create:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
            }

            if(targetEntity is Entity && targetEntity.Attributes.Contains(Constants.VolunteerOrganizations.Organization) && targetEntity.Attributes.Contains(Constants.VolunteerOrganizations.Volunteer))
            {
                EntityCollection activeVOEntityCollection = RetrieveActiveVolunteerOrganization(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Volunteer));
                OrganizationRequestCollection orgRequestCollection1 = new OrganizationRequestCollection();
                //OrganizationRequestCollection orgRequestCollection2 = new OrganizationRequestCollection();

                EntityCollection timeEntriesEntityCollection = new EntityCollection();
                Entity activeVOEntity = null;
                tracingService.Trace($" Active Volunteer Organization count : {activeVOEntityCollection.Entities.Count}");
                if (activeVOEntityCollection.Entities.Count == 1)
                {

                    tracingService.Trace($" Adding Organization to Draft Time Entries");
                    activeVOEntity = activeVOEntityCollection.Entities[0];
                    if (activeVOEntity is Entity && activeVOEntity.Attributes.Contains(Constants.VolunteerOrganizations.Organization)) {
                        tracingService.Trace($" Active Volunteer Organization Org ID : {activeVOEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Organization).Id}");
                        timeEntriesEntityCollection = RetrieveDraftTimeEntriesCollection(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Volunteer), true);
                        tracingService.Trace($" Total Time Entry to process : {timeEntriesEntityCollection.Entities.Count}");
                    }

                }
                else
                {
                    tracingService.Trace($" Removing Organization from Draft Time Entries");
                    timeEntriesEntityCollection = RetrieveDraftTimeEntriesCollection(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Volunteer), false);
                    tracingService.Trace($" Total Time Entry to process : {timeEntriesEntityCollection.Entities.Count}");
                }

                //foreach (Entity e in timeEntriesEntityCollection.Entities)
                Parallel.ForEach(timeEntriesEntityCollection.Entities, e => {
                    e[Constants.TimeEntries.Organization] = (activeVOEntity is Entity) ? activeVOEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Organization) : null;
                    UpdateRequest update = new UpdateRequest();
                    update.Target = e;
                    lock (orgRequestCollection1)
                        orgRequestCollection1.Add(update);
                });
                tracingService.Trace($" Org Collection Count : {orgRequestCollection1.Count}");
                //tracingService.Trace($" Org Collection Count : {orgRequestCollection2.Count}");
                if(orgRequestCollection1.Count > 0)

                PerformExecuteMultiple(tracingService, new ExecuteRequestClass(orgRequestCollection1, user_service));


            }
        }

        void PerformExecuteMultiple(ITracingService tracingService, ExecuteRequestClass executeRequestClass)
        {
            tracingService.Trace($"{DateTime.Now} : Execute Multiple Request with Count : {executeRequestClass.orgRequestCollection.Count}");
            var multipleRequest = new ExecuteMultipleRequest()
            {
                // Assign settings that define execution behavior: continue on error, return responses.
                Settings = new ExecuteMultipleSettings()
                {
                    ContinueOnError = true,
                    ReturnResponses = false
                },
                // Create an empty organization request collection.
                Requests = executeRequestClass.orgRequestCollection
            };

            try
            {
                ExecuteMultipleResponse multipleResponse = (ExecuteMultipleResponse)executeRequestClass.service.Execute(multipleRequest);
                tracingService.Trace($"{DateTime.Now} : Execute Multiple Completes for count : {executeRequestClass.orgRequestCollection.Count}");
            }
            catch (Exception ex)
            {
                tracingService.Trace(ex.Message + ex.StackTrace);
            }
        }

        private EntityCollection RetrieveDraftTimeEntriesCollection(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference, bool isOrganizationNull)
        {
            tracingService.Trace($"Retrieve Draft Time Entries for Volunteer : {volunteerEntityReference.Id}");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.TimeEntries.LogicalName,
                ColumnSet = new ColumnSet(Constants.TimeEntries.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.TimeEntries.Volunteer,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.Status.StatusCode,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 1 }
                                }
                                //,
                                //new ConditionExpression
                                //{
                                //    AttributeName = Constants.TimeEntries.Date,
                                //    Operator = ConditionOperator.OnOrAfter,
                                //    Values = { DateTime.Now.AddDays(-1) }
                                //}
                            }
                }
,
                NoLock = true
,
                TopCount = 1000
            };
            if (!isOrganizationNull)
            {
                query.Criteria.AddCondition(new ConditionExpression(Constants.TimeEntries.Organization,ConditionOperator.NotNull));
            }
            query.Orders.Add(new OrderExpression() { OrderType = OrderType.Descending, AttributeName = Constants.TimeEntries.Date });

            return service.RetrieveMultiple(query);
        }

        private EntityCollection RetrieveActiveVolunteerOrganization(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference)
        {
            tracingService.Trace($"Retrieve Active Volunteer Organization for Volunteer : {volunteerEntityReference.Id}");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerOrganizations.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerOrganizations.Organization,Constants.VolunteerOrganizations.Volunteer),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerOrganizations.Volunteer,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerEntityReference.Id }
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

    public class ExecuteRequestClass
    {
        public OrganizationRequestCollection orgRequestCollection;
        public IOrganizationService service;

        public ExecuteRequestClass(OrganizationRequestCollection OrgRequestCollection, IOrganizationService Service)
        {
            this.orgRequestCollection = OrgRequestCollection;
            this.service = Service;
        }

    }
}

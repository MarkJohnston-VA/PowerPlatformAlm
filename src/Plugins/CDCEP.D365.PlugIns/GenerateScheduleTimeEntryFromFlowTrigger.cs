using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to create timesheet when Flow set cdcep_generatetimeentry to true..
    /// Message : Update
    /// Primary Entity : cdcep_volunteerassignment
    /// Secondary Entity : none
    /// Filtering Attributes : cdcep_generatetimeentry
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class GenerateScheduleTimeEntryFromFlowTrigger : IPlugin
    {
        const int max_days = 60;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null, volAssignmentEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;

            if (context.MessageName == Constants.Messages.Update && !(context.InputParameters[Constants.TARGET] is Entity)
    && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.VolunteerAssignment.LogicalName)
                return;
            if (context.MessageName == Constants.Messages.Update && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;

            switch (context.MessageName)
            {
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    volAssignmentEntity = context.PostEntityImages[Constants.POST_IMAGE];
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
            }

            if(targetEntity is Entity && targetEntity.Attributes.Contains(Constants.VolunteerAssignment.GenerateTimeEntry) && volAssignmentEntity is Entity)
            {
                tracingService.Trace($"Generate Time Entry : {targetEntity.GetAttributeValue<bool>(Constants.VolunteerAssignment.GenerateTimeEntry)}");




                if (targetEntity.GetAttributeValue<bool>(Constants.VolunteerAssignment.GenerateTimeEntry))
                {
                    DateTime startDate, endDate;
                    if (!volAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.LastTimeEntryDate))
                        return;
                    else
                        startDate = volAssignmentEntity.GetAttributeValue<DateTime>(Constants.VolunteerAssignment.LastTimeEntryDate).AddDays(1);

                    OrganizationRequestCollection orgRequestCollection = new OrganizationRequestCollection();

                    endDate = startDate.AddDays(max_days);
                    tracingService.Trace($"Start Date : {startDate:MM/dd/yyyy}");
                    tracingService.Trace($"End Date : {endDate:MM/dd/yyyy}");

                    string fetch = string.Format(Constants.timeEntryFetchxml, volAssignmentEntity.Id.ToString(), startDate, endDate);

                    RetrieveMultipleRequest timeEntryFetchRequest = new RetrieveMultipleRequest
                    {
                        Query = new FetchExpression(fetch)
                    };
                    EntityCollection timeEntryEntityCollection = ((RetrieveMultipleResponse)service.Execute(timeEntryFetchRequest)).EntityCollection;
                    Entity VolOrgEntity = RetrieveVolunteerOrgFromVolunteer(tracingService, service, volAssignmentEntity.GetAttributeValue<EntityReference>("cdcep_volunteerid"));

                    if (timeEntryEntityCollection.Entities.Count == 0)
                    {
                        tracingService.Trace("\t\tNo Entries Found...");
                        foreach (DateTime date in EachDay(startDate, endDate))
                        {
                            tracingService.Trace($"\t\t\tCreating Time Entry for Date : {date:MM/dd/yyyy}...");
                            //tracer.Trace($"Current Day : {day.ToString()}");
                            //tracer.Trace($"Days of the Week : {day.DayOfWeek}");
                            Entity timeEntryEntity = new Entity("msnfpe_timeentry");
                            timeEntryEntity["cdcep_volunteerid"] = volAssignmentEntity.GetAttributeValue<EntityReference>("cdcep_volunteerid");

                            if (VolOrgEntity is Entity && VolOrgEntity.Attributes.Contains(Constants.VolunteerOrganizations.Organization))
                                timeEntryEntity[Constants.TimeEntries.Organization] = VolOrgEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Organization);

                            //if (volAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.Organization))
                            //    timeEntryEntity[Constants.VolunteerAssignment.Organization] = volAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Organization);

                            timeEntryEntity["cdcep_assignment_id"] = volAssignmentEntity.ToEntityReference();
                            timeEntryEntity["msnfpe_date"] = date;
                            timeEntryEntity["msnfpe_entryname"] = "New Time Entry";
                            timeEntryEntity["ownerid"] = volAssignmentEntity.GetAttributeValue<EntityReference>("ownerid");
                            timeEntryEntity["statuscode"] = new OptionSetValue(1);


                            CreateRequest createTimeEntryRequest = new CreateRequest() { Target = timeEntryEntity };
                            service.Execute(createTimeEntryRequest);
                            //orgRequestCollection.Add(createTimeEntryRequest);
                        }
                    }
                    else
                    {
                        tracingService.Trace("\t\tEntries Found...");
                        foreach (DateTime date in EachDay(startDate, endDate))
                        {
                            if (timeEntryEntityCollection.Entities.Where(te => te.GetAttributeValue<DateTime>("msnfpe_date") == date).Count() == 0)
                            {
                                tracingService.Trace($"\t\t\tCreating Time Entry for Date : {date:MM/dd/yyyy}...");
                                Entity timeEntryEntity = new Entity("msnfpe_timeentry");
                                timeEntryEntity["cdcep_volunteerid"] = volAssignmentEntity.GetAttributeValue<EntityReference>("cdcep_volunteerid");

                                //if (volAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.Organization))
                                //    timeEntryEntity[Constants.VolunteerAssignment.Organization] = volAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Organization);

                                if (VolOrgEntity is Entity && VolOrgEntity.Attributes.Contains(Constants.VolunteerOrganizations.Organization))
                                    timeEntryEntity[Constants.TimeEntries.Organization] = VolOrgEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Organization);


                                timeEntryEntity["cdcep_assignment_id"] = volAssignmentEntity.ToEntityReference();
                                timeEntryEntity["msnfpe_date"] = date;
                                timeEntryEntity["msnfpe_entryname"] = "New Time Entry";
                                timeEntryEntity["ownerid"] = volAssignmentEntity.GetAttributeValue<EntityReference>("ownerid");
                                timeEntryEntity["statuscode"] = new OptionSetValue(1);

                                CreateRequest createTimeEntryRequest = new CreateRequest() { Target = timeEntryEntity };
                                service.Execute(createTimeEntryRequest);
                                //orgRequestCollection.Add(createTimeEntryRequest);
                            }
                        }

                    }
                    Entity tmpVolAssignmentEntity = new Entity(volAssignmentEntity.LogicalName);
                    tmpVolAssignmentEntity.Id = volAssignmentEntity.Id;
                    tmpVolAssignmentEntity[Constants.VolunteerAssignment.LastTimeEntryDate] = endDate;
                    tmpVolAssignmentEntity[Constants.VolunteerAssignment.GenerateTimeEntry] = false;

                    UpdateRequest updateRequest = new UpdateRequest() { Target = tmpVolAssignmentEntity };
                    service.Execute(updateRequest);
                    //orgRequestCollection.Add(updateRequest);
                    tracingService.Trace($"Vol Assignment : {volAssignmentEntity.GetAttributeValue<string>(Constants.VolunteerAssignment.Name)} Process Complete");

                    //ProcessRequest(tracingService, service, orgRequestCollection);

                }



            }
        }

        private Entity RetrieveVolunteerOrgFromVolunteer(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference)
        {
            tracingService.Trace($"Calling RetrieveVolunteerOrgFromVolunteer...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerOrganizations.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerOrganizations.Organization, Constants.VolunteerOrganizations.PrimaryKey, Constants.VolunteerOrganizations.Volunteer),
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
                                    AttributeName = Constants.VolunteerOrganizations.Organization,
                                    Operator = ConditionOperator.NotNull
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
                TopCount = 10
            };

            EntityCollection volOrgEntityCollection = service.RetrieveMultiple(query);
            if (volOrgEntityCollection.Entities.Count == 1)
                return volOrgEntityCollection.Entities[0];
            return null;
        }

        private void ProcessRequest(ITracingService tracingService, IOrganizationService orgService, OrganizationRequestCollection orgRequestCollection)
        {
            var multipleRequest = new ExecuteMultipleRequest()
            {
                // Assign settings that define execution behavior: continue on error, return responses.
                Settings = new ExecuteMultipleSettings()
                {
                    ContinueOnError = true,
                    ReturnResponses = false
                },
                // Create an empty organization request collection.
                Requests = orgRequestCollection
            };

            try
            {
                ExecuteMultipleResponse multipleResponse = (ExecuteMultipleResponse)orgService.Execute(multipleRequest);
                tracingService.Trace("Execute Multiple Completes");
            }
            catch (Exception ex)
            {
                tracingService.Trace($"Error in ProcessRequest : {ex.Message} - {ex.StackTrace}");

            }
        }

        public static IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }


    }
}

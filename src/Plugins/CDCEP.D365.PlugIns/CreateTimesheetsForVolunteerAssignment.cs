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
    /// Plugin is used for generating first two months of time entry when assignment is created and approved.
    /// Message : Create
    /// Primary Entity : cdcep_volunteerassignment
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    /// <summary>
    /// Plugin is used for generating first two months of time entry when assignment is approved.
    /// Message : Update
    /// Primary Entity : cdcep_volunteerassignment
    /// Secondary Entity : none
    /// Filtering Attributes : statuscode 
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class CreateTimesheetsForVolunteerAssignment : IPlugin
    {
        const int APPROVED_ASSIGNMENT = 100000001;
        const int PLANNING_PERIOD_MONTHLY = 796500000;
        const int TIMEENTRY_ADD_MONTHS = 2;

        public const string lastesttimeEntryFetchxml = @"<fetch version='1.0'   no-lock='true' top='1' >
  <entity name='msnfpe_timeentry'>
    <attribute name='msnfpe_date' />
    <order attribute='msnfpe_date' descending='true' />
    <filter type='and'>
      <condition attribute='cdcep_assignment_id' operator='eq' value='{0}' />
      <condition attribute='statecode' operator='eq' value='0' />
    </filter>
  </entity>
</fetch>";
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
            IOrganizationService system_service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            Entity targetEntity = null;
            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }

            tracer.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.VolunteerAssignment.LogicalName)
                return;

            if (context.MessageName == Constants.Messages.Update && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;


            switch (context.MessageName)
            {
                case Constants.Messages.Create:
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
                case Constants.Messages.Update:
                    targetEntity = context.PostEntityImages[Constants.POST_IMAGE] as Entity;
                    break;
            }

            if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.VolunteerAssignment.Volunteer) && targetEntity.Attributes.Contains(Constants.Status.StatusCode)
                && targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StatusCode).Value == APPROVED_ASSIGNMENT)
            {
                tracer.Trace($"Volunteer Assignment Status : {targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StatusCode).Value}");

                EntityReference facilityEntityReference = null, facilityTeamOwnerEntityReference = null ;
                if (targetEntity.Attributes.Contains(Constants.VolunteerAssignment.RootFacility))
                    facilityEntityReference = targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility);
                else if (targetEntity.Attributes.Contains(Constants.VolunteerAssignment.Facility))
                    facilityEntityReference = targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility);

                if(facilityEntityReference is EntityReference)
                {
                    Entity facilityEntity = service.Retrieve(facilityEntityReference.LogicalName, facilityEntityReference.Id, new ColumnSet(Constants.Account.Ownerid));
                    if (facilityEntity is Entity && facilityEntity.Attributes.Contains(Constants.Account.Ownerid))
                    {
                        if (facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid).LogicalName == Constants.Team.LogicalName)
                            facilityTeamOwnerEntityReference = facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid);
                    }
                }

                EntityReference volunteerEntityReference = targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer);
                if (volunteerEntityReference is EntityReference)
                {
                    int userTimeZoneCode = CommonMethods.RetrieveCurrentUsersTimeZoneSettings(service).Value;
                    tracer.Trace($"\t****************User Time Zone : {userTimeZoneCode}****************");

                    DateTime localDate = CommonMethods.RetrieveLocalTimeFromUTCTime(service, DateTime.UtcNow, userTimeZoneCode).Value;
                    tracer.Trace($"\t****************User Local Current Date : {localDate:MM/dd/yyyy}****************");

                    DateTime lastTimeEntryDate = localDate.AddDays(-1);
                    Entity latestTimeEntry = RetrieveLatestTimeEntryForAssignment(tracer,system_service, targetEntity.ToEntityReference());
                    if (latestTimeEntry is Entity && latestTimeEntry.Attributes.Contains(Constants.TimeEntries.Date))
                    {
                        tracer.Trace($"\t****************Latest Time Entry Date : {latestTimeEntry.GetAttributeValue<DateTime>(Constants.TimeEntries.Date):MM/dd/yyyy}****************");
                        lastTimeEntryDate = latestTimeEntry.GetAttributeValue<DateTime>(Constants.TimeEntries.Date);
                        
                    }
                    Entity volunteerOrgEntity = RetrieveVolunteerOrgFromVolunteer(tracer, service, volunteerEntityReference);
                    Entity volunteerEntity = service.Retrieve(volunteerEntityReference.LogicalName, volunteerEntityReference.Id, new ColumnSet(Constants.Contact.Primaryorganizationid, Constants.Contact.Ownerid));

                    EntityReference orgEntityReference = null;
                    if(volunteerOrgEntity is Entity && volunteerOrgEntity.LogicalName == Constants.VolunteerOrganizations.LogicalName)
                    {
                        if (volunteerEntity is Entity && volunteerEntity.Attributes.Contains(Constants.Contact.Primaryorganizationid))
                            orgEntityReference = volunteerEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primaryorganizationid);
                        volunteerOrgEntity = null;
                    }

                    DateTime endDate = new DateTime();
                    for (int i = 0; i < TIMEENTRY_ADD_MONTHS; i++)
                    {
                        DateTime dt;
                        if (i == 0)
                            dt = localDate.AddMonths(i);
                        else
                            dt = endDate.AddDays(1);

                        endDate = CreateTimeEntries(tracer, system_service, dt, volunteerEntityReference, targetEntity, volunteerOrgEntity,
                            (facilityTeamOwnerEntityReference != null) ? facilityTeamOwnerEntityReference :volunteerEntity.GetAttributeValue<EntityReference>(Constants.Contact.Ownerid), lastTimeEntryDate, orgEntityReference);

                    }

                    Entity tmpVolAssignmentEntity = new Entity(targetEntity.LogicalName);
                    tmpVolAssignmentEntity.Id = targetEntity.Id;
                    tmpVolAssignmentEntity[Constants.VolunteerAssignment.LastTimeEntryDate] = endDate;

                    service.Update(tmpVolAssignmentEntity);

                }


            }
        }


        private DateTime CreateTimeEntries(ITracingService tracer, IOrganizationService service, DateTime startDate, EntityReference volunteerEntityReference, Entity assignmentEntity
    , Entity volunteerOrgEntity, EntityReference ownerEntityReference, DateTime lastTimeEntryDate, EntityReference orgEntityReference = null)
        {
            tracer.Trace("In CreateTimeEntries Method...");
            tracer.Trace($"Start Date : {startDate:MM/dd/yyyy}");
            tracer.Trace($"Last Time Entry Date : {lastTimeEntryDate:MM/dd/yyyy}");
            DateTime endDate = startDate.AddDays(30);
            //DateTime endDate = new DateTime(startDate.Year, startDate.Month, DateTime.DaysInMonth(startDate.Year, startDate.Month));
            //if (assignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.StartDate))
            //    startDate = assignmentEntity.GetAttributeValue<DateTime>(Constants.VolunteerAssignment.StartDate);
            //if (assignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.EndDate))
            //    endDate = assignmentEntity.GetAttributeValue<DateTime>(Constants.VolunteerAssignment.EndDate);
            //else
            //    endDate = new DateTime(startDate.Year, startDate.Month, DateTime.DaysInMonth(startDate.Year, startDate.Month));

            //tracer.Trace($"Total Days : {(endDate - startDate).TotalDays}");

            //tracer.Trace($"Vol Assignment StartDate : {startDate.ToString()}");
            //tracer.Trace($"Vol Assignment EndDate : {endDate.ToString()}");


            OrganizationRequestCollection orgRequestCollection = new OrganizationRequestCollection();
            foreach (DateTime day in EachDay(startDate, endDate))
            {
                //tracer.Trace($"Current Day : {day.ToString()}");
                //tracer.Trace($"Days of the Week : {day.DayOfWeek}");
                if (day > lastTimeEntryDate)
                {
                    Entity timeEntryEntity = new Entity(Constants.TimeEntries.LogicalName);
                    timeEntryEntity[Constants.TimeEntries.Volunteer] = volunteerEntityReference;
                    if (volunteerOrgEntity is Entity)
                        timeEntryEntity[Constants.TimeEntries.Organization] = volunteerOrgEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Organization);
                    else if (orgEntityReference is EntityReference)
                        timeEntryEntity[Constants.TimeEntries.Organization] = orgEntityReference;

                    timeEntryEntity[Constants.TimeEntries.VolunteerAssignment] = assignmentEntity.ToEntityReference();
                    timeEntryEntity[Constants.TimeEntries.Date] = day;
                    timeEntryEntity[Constants.TimeEntries.Name] = "New Time Entry";
                    timeEntryEntity[Constants.TimeEntries.OwnerID] = ownerEntityReference;
                    timeEntryEntity[Constants.Status.StatusCode] = new OptionSetValue(1);

                    CreateRequest createTimeEntryRequest = new CreateRequest() { Target = timeEntryEntity };
                    orgRequestCollection.Add(createTimeEntryRequest);
                }
                else
                    tracer.Trace($"Current Day : {day:MM/dd/yyyy} is lesser than {lastTimeEntryDate:MM/dd/yyyy}. So skipping.");
            }

            if (orgRequestCollection.Count > 0)
            {
                tracer.Trace($"Performing Execute Multiple Request...");
                ExecuteMultipleRequest executeMultipleRequest = new ExecuteMultipleRequest()
                {
                    // Assign settings that define execution behavior: continue on error, return responses. 
                    Settings = new ExecuteMultipleSettings()
                    {
                        ContinueOnError = true,
                        ReturnResponses = true
                    },
                    // Create an empty organization request collection.
                    Requests = orgRequestCollection
                };
                // Execute all the requests in the request collection using a single web method call.
                ExecuteMultipleResponse executeMultipleResponse =
                    (ExecuteMultipleResponse)service.Execute(executeMultipleRequest);

                foreach (var responseItem in executeMultipleResponse.Responses.Where(r => r.Fault != null).ToList())
                {

                    // An error has occurred.
                    if (responseItem.Fault != null)
                    {
                        tracer.Trace($"Error Code :  {responseItem.Fault.ErrorCode}, Error Message :  {responseItem.Fault.Message}");
                        tracer.Trace($"Error Details :  {responseItem.Fault.ErrorDetails}");
                    }
                }
            }

            tracer.Trace($"End Date : {endDate:MM/dd/yyyy}");
            return endDate;

        }


        private Entity RetrieveLatestTimeEntryForAssignment(ITracingService tracer, IOrganizationService service, EntityReference volunteerAssignmentEntityReference)
        {
            string fetch = string.Format(lastesttimeEntryFetchxml, volunteerAssignmentEntityReference.Id.ToString());

            RetrieveMultipleRequest timeEntryFetchRequest = new RetrieveMultipleRequest
            {
                Query = new FetchExpression(fetch)
            };
            EntityCollection timeEntryEntityCollection = ((RetrieveMultipleResponse)service.Execute(timeEntryFetchRequest)).EntityCollection;
            if (timeEntryEntityCollection.Entities.Count > 0)
                return timeEntryEntityCollection.Entities[0];
            else
                return null;

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

            EntityCollection workerEntityCollection = service.RetrieveMultiple(query);
            if (workerEntityCollection.Entities.Count == 1)
                return workerEntityCollection.Entities[0];
            else if (workerEntityCollection.Entities.Count == 0)
            {
                return new Entity(Constants.Contact.LogicalName);
            }
            return null;
        }



        public IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }



    }
}

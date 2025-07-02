using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is responsible to generate meal provided record (which lead to meal ticket generation via flow) when time entry hours entered.
    /// Message : Update
    /// Primary Entity : msnfpe_timeentry
    /// Secondary Entity : none
    /// Filtering Attributes : msnfpe_hours
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class TimeEntryHourChange : IPlugin
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

            if ((context.MessageName == Constants.Messages.Create || context.MessageName == Constants.Messages.Update) && !(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.TimeEntries.LogicalName)
                return;
            if (context.MessageName == Constants.Messages.Update && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;

            switch (context.MessageName)
            {
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.PostEntityImages[Constants.POST_IMAGE];
                    break;
            }

            if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.TimeEntries.Hours) && targetEntity.Attributes.Contains(Constants.TimeEntries.LocalDateTime) && targetEntity.Attributes.Contains(Constants.TimeEntries.VolunteerAssignment))
            {
                tracingService.Trace($"Hours : {targetEntity.GetAttributeValue<decimal>(Constants.TimeEntries.Hours)}");
                Entity volunteerAssignmentEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.VolunteerAssignment).LogicalName,
                    targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.VolunteerAssignment).Id,
                    new Microsoft.Xrm.Sdk.Query.ColumnSet(Constants.VolunteerAssignment.Facility, Constants.VolunteerAssignment.Volunteer));

                if (volunteerAssignmentEntity is Entity && volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.Facility))
                {
                    tracingService.Trace($"Found Vol Assignment : {targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.VolunteerAssignment).Id} With Facility : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility).Id}");
                    Entity facilityEntity = service.Retrieve(volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility).LogicalName,
                        volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility).Id,
                        new Microsoft.Xrm.Sdk.Query.ColumnSet(Constants.Account.Mealnumber, Constants.Account.Mealtime1cutoff, Constants.Account.Mealtime2cutoff, Constants.Account.Mealtime3cutoff,
                        Constants.Account.Meal_Duration1, Constants.Account.Meal_Duration2, Constants.Account.Meal_Duration3, Constants.Account.Msnfp_Accounttype, Constants.Account.Parentaccountid));

                    if (facilityEntity is Entity && facilityEntity.Attributes.Contains(Constants.Account.Msnfp_Accounttype)
                        && facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value == 844060000)     //Physical Location
                    {
                        if (facilityEntity.Attributes.Contains(Constants.Account.Parentaccountid))
                        {
                            tracingService.Trace($"Found Physical Location. Trying to get Parent using : {facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Parentaccountid).Id}");
                            facilityEntity = service.Retrieve(facilityEntity.LogicalName, facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Parentaccountid).Id, new ColumnSet(Constants.Account.Mealnumber, Constants.Account.Mealtime1cutoff, Constants.Account.Mealtime2cutoff, Constants.Account.Mealtime3cutoff,
                            Constants.Account.Meal_Duration1, Constants.Account.Meal_Duration2, Constants.Account.Meal_Duration3, Constants.Account.Msnfp_Accounttype, Constants.Account.Parentaccountid));
                        }
                    }

                    if (facilityEntity is Entity && facilityEntity.Attributes.Contains(Constants.Account.Mealnumber))
                    {
                        //decimal totalHours = CalculateTotalHours(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer), facilityEntity.ToEntityReference(), targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.Date));
                        //int noOfMeals = CalculateNumberOfMeals(tracingService, service, facilityEntity, totalHours, targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.LocalDateTime));
                        int noOfMeals = CalculateNumberOfMeals(tracingService, service, facilityEntity, targetEntity.GetAttributeValue<decimal>(Constants.TimeEntries.Hours), targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.LocalDateTime));

                        if (noOfMeals > 0)
                        {
                            EntityCollection mealsProvidedCollection = RetrieveMealsProvided(tracingService, service, facilityEntity.ToEntityReference(), volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer),
                                targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.Date));
                            if (mealsProvidedCollection.Entities.Count > 0)
                            {
                                tracingService.Trace($"No of Meals Tickets Generated Today : {mealsProvidedCollection.Entities.Count}");
                                if (noOfMeals > mealsProvidedCollection.Entities.Count)
                                    GenerateMealsProvided(tracingService, service, (noOfMeals - mealsProvidedCollection.Entities.Count), mealsProvidedCollection.Entities.Count, facilityEntity.ToEntityReference(), volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer),
                                        targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.LocalDateTime), targetEntity.Attributes.Contains(Constants.TimeEntries.KioskID) ? targetEntity.GetAttributeValue<string>(Constants.TimeEntries.KioskID) : string.Empty);
                            }
                            else
                            {
                                GenerateMealsProvided(tracingService, service, noOfMeals, 0, facilityEntity.ToEntityReference(), volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer),
                                    targetEntity.GetAttributeValue<DateTime>(Constants.TimeEntries.LocalDateTime), targetEntity.Attributes.Contains(Constants.TimeEntries.KioskID) ? targetEntity.GetAttributeValue<string>(Constants.TimeEntries.KioskID) : string.Empty);
                            }
                        }
                    }
                }
            }

        }

        private decimal CalculateTotalHours(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference, EntityReference facilityEntityReference, DateTime dateTime)
        {
            tracingService.Trace($"Inside CalculateTotalHours...");

            string xml = string.Format(Constants.TotalHoursByFacByDateByVol, volunteerEntityReference.Id.ToString(), facilityEntityReference.Id.ToString(), dateTime);

            decimal totalHours = 0;
            RetrieveMultipleRequest aggFetchRequest = new RetrieveMultipleRequest
            {
                Query = new FetchExpression(xml)
            };
            EntityCollection aggEntityCollection = ((RetrieveMultipleResponse)service.Execute(aggFetchRequest)).EntityCollection;
            tracingService.Trace($"Time Entry Agg Record Count : {aggEntityCollection.Entities.Count}");
            foreach (Entity t in aggEntityCollection.Entities)
            {
                if (t.Attributes.Contains("TH"))
                    totalHours = t.GetAliasedAttributeValue<decimal>("TH");
            }

            tracingService.Trace($"Total Hours : {totalHours}...");
            return totalHours;
        }

        private void GenerateMealsProvided(ITracingService tracingService, IOrganizationService service, int noOfMeals, int existingMealTicketCount, EntityReference facilityEntityReference,
            EntityReference volunteerEntityReference, DateTime dateTime, string kioskID)
        {
            tracingService.Trace($"Calling GenerateMealsProvided...");
            tracingService.Trace($"No of Meals Tickets to be generated : {noOfMeals}");
            for (int i = 0; i < noOfMeals; i++)
            {
                existingMealTicketCount += i + 1;
                KeyAttributeCollection keyAttributeCollection = new KeyAttributeCollection();
                keyAttributeCollection.Add(Constants.MealProvided.Volunteer, volunteerEntityReference);
                keyAttributeCollection.Add(Constants.MealProvided.Facility, facilityEntityReference);
                keyAttributeCollection.Add(Constants.MealProvided.DateOfMeal, dateTime.SetTime(0));
                keyAttributeCollection.Add(Constants.MealProvided.DayMealNumber, existingMealTicketCount);

                Entity mealsProvidedEntity = new Entity(Constants.MealProvided.LogicalName, keyAttributeCollection);
                mealsProvidedEntity[Constants.MealProvided.HowAdded] = new OptionSetValue(100000001);
                //mealsProvidedEntity[Constants.MealProvided.Facility] = facilityEntityReference;
                //mealsProvidedEntity[Constants.MealProvided.Volunteer] = volunteerEntityReference;
                mealsProvidedEntity[Constants.MealProvided.NumberOfMeals] = 1;
                //mealsProvidedEntity[Constants.MealProvided.DateOfMeal] = dateTime;
                mealsProvidedEntity[Constants.MealProvided.TicketRequestTime] = DateTime.Now;
                if (!string.IsNullOrEmpty(kioskID))
                    mealsProvidedEntity[Constants.MealProvided.KioskID] = kioskID;

                UpsertRequest request = new UpsertRequest()
                {
                    Target = mealsProvidedEntity
                };

                try
                {
                    UpsertResponse response = (UpsertResponse)service.Execute(request);
                    if (response.RecordCreated)
                        tracingService.Trace($"Record created with id : {response.Target.Id}");
                    else
                        tracingService.Trace("Record updated");
                }

                // Catch any service fault exceptions that Microsoft Dynamics CRM throws.
                catch (FaultException<Microsoft.Xrm.Sdk.OrganizationServiceFault>)
                {
                    throw;
                }


            }
        }

        private EntityCollection RetrieveMealsProvided(ITracingService tracingService, IOrganizationService service, EntityReference facilityEntityReference, EntityReference volunteerEntityReference, DateTime dateTime)
        {
            tracingService.Trace($"Calling RetrieveMealsProvided...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.MealProvided.LogicalName,
                ColumnSet = new ColumnSet(true),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.MealProvided.Facility,
                                    Operator = ConditionOperator.Equal,
                                    Values = { facilityEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.MealProvided.Volunteer,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.MealProvided.DateOfMeal,
                                    Operator = ConditionOperator.On,
                                    Values = { dateTime }
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

        private int CalculateNumberOfMeals(ITracingService tracingService, IOrganizationService service, Entity facilityEntity, decimal hoursPut, DateTime localDateTime)
        {
            tracingService.Trace($"CalculateNumberOfMeals method.");
            int noOfMeals = 0;
            tracingService.Trace($"Local Date Time : {localDateTime}");
            tracingService.Trace($"Local Time : {localDateTime.ToString("HHmm")}");
            int localTime = int.Parse(localDateTime.ToString("HHmm"));
            switch (facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealnumber).Value)
            {
                case 100000000:     //0
                    noOfMeals = 0;
                    break;
                case 100000001:     //1
                    if (facilityEntity.Attributes.Contains(Constants.Account.Meal_Duration1))
                    {
                        tracingService.Trace($"Required Hours for Meal : {facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration1)}");
                        if (hoursPut >= facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration1))
                        {
                            tracingService.Trace($"Checking Meal 1 Cut Off time...");
                            if (facilityEntity.Attributes.Contains(Constants.Account.Mealtime1cutoff))
                            {
                                tracingService.Trace($"Meal 1 Cut Off time : {facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime1cutoff).Value}");
                                string meal1CutOffTime = CommonMethods.GetoptionsetText(service, Constants.Account.LogicalName, Constants.Account.Mealtime1cutoff, facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime1cutoff).Value);
                                tracingService.Trace($"Meal 1 Cut Off time : {meal1CutOffTime}");
                                if (!string.IsNullOrEmpty(meal1CutOffTime))
                                {
                                    int i_meal1CutOffTime = 0;
                                    if (int.TryParse(meal1CutOffTime.Trim().Replace(":", ""), out i_meal1CutOffTime))
                                    {
                                        tracingService.Trace($"Meal 1 Cut Off time : {i_meal1CutOffTime}");
                                        tracingService.Trace($"Local time : {localTime}");
                                        if (localTime <= i_meal1CutOffTime)
                                        {
                                            tracingService.Trace($"Meal Tickets Allowed.");
                                            noOfMeals = 1;
                                        }
                                    }
                                }

                            }
                        }
                    }
                    break;
                case 100000002:     //2
                    if (facilityEntity.Attributes.Contains(Constants.Account.Meal_Duration1))
                    {
                        tracingService.Trace($"Required Hours for Meal 1 : {facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration1)}");
                        if (hoursPut >= facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration1))
                        {
                            tracingService.Trace($"Checking Meal 1 Cut Off time...");
                            if (facilityEntity.Attributes.Contains(Constants.Account.Mealtime1cutoff))
                            {
                                tracingService.Trace($"Meal 1 Cut Off time : {facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime1cutoff).Value}");
                                string meal1CutOffTime = CommonMethods.GetoptionsetText(service, Constants.Account.LogicalName, Constants.Account.Mealtime1cutoff, facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime1cutoff).Value);
                                tracingService.Trace($"Meal 1 Cut Off time : {meal1CutOffTime}");
                                if (!string.IsNullOrEmpty(meal1CutOffTime))
                                {
                                    int i_meal1CutOffTime = 0;
                                    if (int.TryParse(meal1CutOffTime.Trim().Replace(":", ""), out i_meal1CutOffTime))
                                    {
                                        tracingService.Trace($"Meal 1 Cut Off time : {i_meal1CutOffTime}");
                                        tracingService.Trace($"Local time : {localTime}");
                                        if (localTime <= i_meal1CutOffTime)
                                        {
                                            tracingService.Trace($"Meal Tickets Allowed.");
                                            noOfMeals++;
                                        }
                                    }
                                }

                            }
                        }
                    }

                    if (facilityEntity.Attributes.Contains(Constants.Account.Meal_Duration2))
                    {
                        tracingService.Trace($"Required Hours for Meal 2: {facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration2)}");
                        if (hoursPut >= facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration2))
                        {
                            tracingService.Trace($"Checking Meal 2 Cut Off time...");
                            if (facilityEntity.Attributes.Contains(Constants.Account.Mealtime2cutoff))
                            {
                                tracingService.Trace($"Meal 2 Cut Off time : {facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime2cutoff).Value}");
                                string meal2CutOffTime = CommonMethods.GetoptionsetText(service, Constants.Account.LogicalName, Constants.Account.Mealtime2cutoff, facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime2cutoff).Value);
                                tracingService.Trace($"Meal 2 Cut Off time : {meal2CutOffTime}");
                                if (!string.IsNullOrEmpty(meal2CutOffTime))
                                {
                                    int i_meal2CutOffTime = 0;
                                    if (int.TryParse(meal2CutOffTime.Trim().Replace(":", ""), out i_meal2CutOffTime))
                                    {
                                        tracingService.Trace($"Meal 2 Cut Off time : {i_meal2CutOffTime}");
                                        tracingService.Trace($"Local time : {localTime}");
                                        if (localTime <= i_meal2CutOffTime)
                                        {
                                            tracingService.Trace($"Meal Tickets Allowed.");
                                            noOfMeals++;
                                        }
                                    }
                                }

                            }
                        }
                    }
                    break;
                case 100000003:     //3
                    if (facilityEntity.Attributes.Contains(Constants.Account.Meal_Duration1))
                    {
                        tracingService.Trace($"Required Hours for Meal 1 : {facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration1)}");
                        if (hoursPut >= facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration1))
                        {
                            tracingService.Trace($"Checking Meal 1 Cut Off time...");
                            if (facilityEntity.Attributes.Contains(Constants.Account.Mealtime1cutoff))
                            {
                                tracingService.Trace($"Meal 1 Cut Off time : {facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime1cutoff).Value}");
                                string meal1CutOffTime = CommonMethods.GetoptionsetText(service, Constants.Account.LogicalName, Constants.Account.Mealtime1cutoff, facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime1cutoff).Value);
                                tracingService.Trace($"Meal 1 Cut Off time : {meal1CutOffTime}");
                                if (!string.IsNullOrEmpty(meal1CutOffTime))
                                {
                                    int i_meal1CutOffTime = 0;
                                    if (int.TryParse(meal1CutOffTime.Trim().Replace(":", ""), out i_meal1CutOffTime))
                                    {
                                        tracingService.Trace($"Meal 1 Cut Off time : {i_meal1CutOffTime}");
                                        tracingService.Trace($"Local time : {localTime}");
                                        if (localTime <= i_meal1CutOffTime)
                                        {
                                            tracingService.Trace($"Meal Tickets Allowed.");
                                            noOfMeals++;
                                        }
                                    }
                                }

                            }
                        }
                    }

                    if (facilityEntity.Attributes.Contains(Constants.Account.Meal_Duration2))
                    {
                        tracingService.Trace($"Required Hours for Meal 2: {facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration2)}");
                        if (hoursPut >= facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration2))
                        {
                            tracingService.Trace($"Checking Meal 2 Cut Off time...");
                            if (facilityEntity.Attributes.Contains(Constants.Account.Mealtime2cutoff))
                            {
                                tracingService.Trace($"Meal 2 Cut Off time : {facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime2cutoff).Value}");
                                string meal2CutOffTime = CommonMethods.GetoptionsetText(service, Constants.Account.LogicalName, Constants.Account.Mealtime2cutoff, facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime2cutoff).Value);
                                tracingService.Trace($"Meal 2 Cut Off time : {meal2CutOffTime}");
                                if (!string.IsNullOrEmpty(meal2CutOffTime))
                                {
                                    int i_meal2CutOffTime = 0;
                                    if (int.TryParse(meal2CutOffTime.Trim().Replace(":", ""), out i_meal2CutOffTime))
                                    {
                                        tracingService.Trace($"Meal 2 Cut Off time : {i_meal2CutOffTime}");
                                        tracingService.Trace($"Local time : {localTime}");
                                        if (localTime <= i_meal2CutOffTime)
                                        {
                                            tracingService.Trace($"Meal Tickets Allowed.");
                                            noOfMeals++;
                                        }
                                    }
                                }

                            }
                        }
                    }

                    if (facilityEntity.Attributes.Contains(Constants.Account.Meal_Duration3))
                    {
                        tracingService.Trace($"Required Hours for Meal 3: {facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration3)}");
                        if (hoursPut >= facilityEntity.GetAttributeValue<decimal>(Constants.Account.Meal_Duration3))
                        {
                            tracingService.Trace($"Checking Meal 3 Cut Off time...");
                            if (facilityEntity.Attributes.Contains(Constants.Account.Mealtime3cutoff))
                            {
                                tracingService.Trace($"Meal 3 Cut Off time : {facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime3cutoff).Value}");
                                string meal3CutOffTime = CommonMethods.GetoptionsetText(service, Constants.Account.LogicalName, Constants.Account.Mealtime3cutoff, facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealtime3cutoff).Value);
                                tracingService.Trace($"Meal 3 Cut Off time : {meal3CutOffTime}");
                                if (!string.IsNullOrEmpty(meal3CutOffTime))
                                {
                                    int i_meal3CutOffTime = 0;
                                    if (int.TryParse(meal3CutOffTime.Trim().Replace(":", ""), out i_meal3CutOffTime))
                                    {
                                        tracingService.Trace($"Meal 3 Cut Off time : {i_meal3CutOffTime}");
                                        tracingService.Trace($"Local time : {localTime}");
                                        if (localTime <= i_meal3CutOffTime)
                                        {
                                            tracingService.Trace($"Meal Tickets Allowed.");
                                            noOfMeals++;
                                        }
                                    }
                                }

                            }
                        }
                    }
                    break;
            }

            tracingService.Trace($"Total Meal Tickets Allowed : {noOfMeals}");
            return noOfMeals;
        }
    }
}

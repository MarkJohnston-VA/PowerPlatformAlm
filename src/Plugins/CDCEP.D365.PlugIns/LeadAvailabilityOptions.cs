using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to set Lead's Morning, Afternoon, Evening availability list when lead is created from portal.
    /// Message : Create
    /// Primary Entity : lead
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class LeadAvailabilityOptions : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            ITracingService tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            if (context.MessageName.ToLower() != "create") return;

            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                Entity entity = (Entity)context.InputParameters["Target"];

                if (entity.LogicalName == "lead")
                {
                    //if (entity.Attributes.Contains("cdcep_volunteer_type"))
                    //    entity["cdcep_volunteertype"] = (entity.GetAttributeValue<bool>("cdcep_volunteertype")) ? new OptionSetValue(100000001) : new OptionSetValue(100000000); 
                    var selectedOptions = new List<OptionSetValue>();
                    if (entity.Attributes.Contains("cdcep_volunteer_morning_list"))
                    {
                        tracer.Trace("Morning Availability: {0}", entity["cdcep_volunteer_morning_list"]);
                        var morningOptions = Convert.ToString(entity["cdcep_volunteer_morning_list"]);
                        var morningOptionsList = string.IsNullOrEmpty(morningOptions) ? new string[0] : morningOptions.ToString().Split(new[] { ',' });
                        morningOptionsList.ToList().ForEach((option) =>
                        {
                            if (int.TryParse(option, out int optionValue))
                            {
                                selectedOptions.Add(new OptionSetValue(optionValue));
                            }
                        });

                        if (!selectedOptions.Count.Equals(0)) entity.Attributes["cdcep_volunteer_morning"] = new OptionSetValueCollection(selectedOptions);
                    }
                    if (entity.Attributes.Contains("cdcep_volunteer_afternoon_list"))
                    {
                        tracer.Trace("Afternoon Availability: {0}", entity["cdcep_volunteer_afternoon_list"]);
                        var afternoonOptions = Convert.ToString(entity["cdcep_volunteer_afternoon_list"]);
                        var afternoonOptionsList = string.IsNullOrEmpty(afternoonOptions) ? new string[0] : afternoonOptions.ToString().Split(new[] { ',' });
                        selectedOptions = new List<OptionSetValue>();
                        afternoonOptionsList.ToList().ForEach((option) =>
                        {
                            if (int.TryParse(option, out int optionValue))
                            {
                                selectedOptions.Add(new OptionSetValue(optionValue));
                            }
                        });

                        if (!selectedOptions.Count.Equals(0)) entity.Attributes["cdcep_volunteer_afternoon"] = new OptionSetValueCollection(selectedOptions);
                    }
                    if (entity.Attributes.Contains("cdcep_volunteer_evening_list"))
                    {
                        tracer.Trace("Evening Availability: {0}", entity["cdcep_volunteer_evening_list"]);
                        var eveningOptions = Convert.ToString(entity["cdcep_volunteer_evening_list"]);
                        var eveningOptionsList = string.IsNullOrEmpty(eveningOptions) ? new string[0] : eveningOptions.ToString().Split(new[] { ',' });
                        selectedOptions = new List<OptionSetValue>();
                        eveningOptionsList.ToList().ForEach((option) =>
                        {
                            if (int.TryParse(option, out int optionValue))
                            {
                                selectedOptions.Add(new OptionSetValue(optionValue));
                            }
                        });

                        if (!selectedOptions.Count.Equals(0)) entity.Attributes["cdcep_volunteer_evening"] = new OptionSetValueCollection(selectedOptions);
                    }


                }
            }
        }





    }
}

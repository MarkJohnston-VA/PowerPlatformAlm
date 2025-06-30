using Microsoft.Crm.Sdk.Messages;
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
    /// DO NOT ENABLE.
    /// Message : Update
    /// Primary Entity : msnfpe_timeentry
    /// Secondary Entity : none
    /// Filtering Attributes : statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class VolunteerHoursCalculation : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {

            return;

            //IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            //IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            //IOrganizationService service = serviceFactory.CreateOrganizationService(null);

            //ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            //tracingService.Trace($"Context Depth : {context.Depth}");
            //tracingService.Trace($"Context Message : {context.MessageName}");

            //if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            //if (context.Depth > 1)
            //    return;

            //Entity targetEntity = null;
            //if ((context.MessageName == Constants.Messages.Create || context.MessageName == Constants.Messages.Update) && !(context.InputParameters[Constants.TARGET] is Entity)
            //    && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.TimeEntries.LogicalName)
            //    return;
            //if (context.MessageName == Constants.Messages.Update && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
            //    return;

            //switch (context.MessageName)
            //{
            //    case Constants.Messages.Update:
            //        tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
            //        targetEntity = context.PostEntityImages[Constants.POST_IMAGE];
            //        break;
            //}

            //if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.TimeEntries.Hours) && targetEntity.Attributes.Contains(Constants.TimeEntries.Date)
            //    && targetEntity.Attributes.Contains(Constants.TimeEntries.VolunteerAssignment) && targetEntity.Attributes.Contains(Constants.Status.StatusCode)
            //     && targetEntity.Attributes.Contains(Constants.TimeEntries.Volunteer))
            //{
            //    //Calculate Rollup Field
            //    CalculateRollupFieldRequest totalHoursRollupRequest = new CalculateRollupFieldRequest()
            //    {
            //        FieldName = Constants.Contact.TotalHours,
            //        Target = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer)
            //    };

            //    service.Execute(totalHoursRollupRequest);

            //    tracingService.Trace($"Updating Contact");
            //    Entity contactEntity = new Entity(Constants.Contact.LogicalName);
            //    contactEntity.Id = targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).Id;

            //    //contactEntity[Constants.Contact.TotalHours] = workerEntity.GetAttributeValue<decimal>(Constants.Workers.TotalHours);

            //    EntityCollection currentYearEntityCollection = service.RetrieveMultiple(new FetchExpression(string.Format(Constants.FetchXmls.CurrentYearHours, targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).Id.ToString())));

            //    if (currentYearEntityCollection.Entities.Count > 0)
            //    {
            //        Entity currentYearEntity = currentYearEntityCollection.Entities[0];
            //        if (currentYearEntity.Attributes.Contains("TotalHours"))
            //        {
            //            decimal CurrentYearHours = currentYearEntity.GetAliasedAttributeValue<decimal>("TotalHours");
            //            tracingService.Trace($"Current Year Hours Total : {CurrentYearHours.ToString()}");

            //            contactEntity[Constants.Contact.CurrentYearHours] = CurrentYearHours;
            //        }
            //        else
            //            contactEntity[Constants.Contact.CurrentYearHours] = 0;
            //    }

            //    EntityCollection lastYearEntityCollection = service.RetrieveMultiple(new FetchExpression(string.Format(Constants.FetchXmls.LastYearHours, targetEntity.GetAttributeValue<EntityReference>(Constants.TimeEntries.Volunteer).Id.ToString())));

            //    if (lastYearEntityCollection.Entities.Count > 0)
            //    {
            //        Entity lastYearEntity = lastYearEntityCollection.Entities[0];
            //        if (lastYearEntity.Attributes.Contains("TotalHours"))
            //        {
            //            decimal LastYearHours = lastYearEntity.GetAliasedAttributeValue<decimal>("TotalHours");
            //            tracingService.Trace($"Last Year Hours Total : {LastYearHours.ToString()}");

            //            contactEntity[Constants.Contact.PriorYearHours] = LastYearHours;
            //        }
            //        else
            //            contactEntity[Constants.Contact.PriorYearHours] = 0;
            //    }

            //    service.Update(contactEntity);

            //}
        }
    }
}

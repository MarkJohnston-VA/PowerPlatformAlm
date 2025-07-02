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
    /// Plugin is used to preventing user from deactivating a volunteer assopciated primary organization.
    /// Message : Update
    /// Primary Entity : cdcep_volunteerorganization
    /// Secondary Entity : none
    /// Filtering Attributes : statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Async
    /// Heng Luo created it on 11/13/2024. https://jira.devops.va.gov/browse/CRMCDCEP-3765
    /// </summary>    
    public class VolunteerOrganizationPreOnUpdate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = serviceFactory.CreateOrganizationService(null);
            IOrganizationService user_service = serviceFactory.CreateOrganizationService(context.InitiatingUserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            int statecode=3;
            if (!context.InputParameters.Contains(Constants.EntityMoniker) && !context.InputParameters.Contains("State"))
            {
                return;
            }
            else
            {
                statecode = (context.InputParameters["State"] as OptionSetValue).Value;

                if (statecode != 1) //if not currently active then quit
                {
                    return;
                }
            }
        
            if (context.Depth > 3)
                return;

            EntityReference entityReference = null;
            Entity targetEntity = null;

            if ((context.MessageName == Constants.Messages.SetState || context.MessageName == Constants.Messages.SetStateDynamic || context.MessageName == Constants.Messages.Update) && !(context.InputParameters[Constants.EntityMoniker] is EntityReference)
                && (context.InputParameters[Constants.EntityMoniker] as EntityReference).LogicalName != Constants.VolunteerOrganizations.LogicalName)
                return;
            entityReference = context.InputParameters[Constants.EntityMoniker] as EntityReference;


            //switch (context.MessageName)
            //{
            //    case Constants.Messages.Update:
            //        tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
            //        targetEntity = context.InputParameters[Constants.TARGET] as Entity;
            //        break;
            //}
            //
         
            
            targetEntity = service.Retrieve(entityReference.LogicalName, entityReference.Id, new ColumnSet(Constants.VolunteerOrganizations.Organization, Constants.VolunteerOrganizations.Volunteer));
           

            if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.VolunteerOrganizations.Organization) && targetEntity.Attributes.Contains(Constants.VolunteerOrganizations.Volunteer))
            {
                tracingService.Trace($"Volunteer ID : {targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Volunteer).Id}");
                tracingService.Trace($"Organization ID : {targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Organization).Id}");
                Entity volunteerEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Volunteer).LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Volunteer).Id,
                         new ColumnSet(Constants.Contact.Primaryorganizationid,Constants.Status.StateCode));
                if (volunteerEntity is Entity && volunteerEntity.Attributes.Contains(Constants.Status.StateCode) && volunteerEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value == 0 && volunteerEntity.Attributes.Contains(Constants.Contact.Primaryorganizationid) && volunteerEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primaryorganizationid).Id == targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerOrganizations.Organization).Id)
                {
                    tracingService.Trace($"You are not allowed to deactivate a volunteer organization record that is associated with the same volunteer primary organization.");
                    throw new InvalidPluginExecutionException("You are not allowed to deactivate a volunteer organization record that is associated with the same volunteer primary organization.");
                }
            }
        }
    }
}
       

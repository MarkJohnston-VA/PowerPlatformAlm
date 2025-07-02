using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;

/// <summary>
/// Plugin is used to add append permission to User.
/// Message : Create
/// Primary Entity : cdcep_volunteerfacility
/// Secondary Entity : none
/// Filtering Attributes : none
/// Run in User's Context : Calling User
/// Execution Order : 1
/// Event Pipeline : PreValidation
/// Execution Mode : Async
/// </summary>
namespace CDCEP.D365.PlugIns
{
    public class VolunteerFacilityOnCreatePreValidation : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationServiceFactory serviceFactory1 = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
            //IOrganizationService user_service1 = serviceFactory1.CreateOrganizationService(context.InitiatingUserId);
            IOrganizationService system_service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;

            Entity targetEntity = null;
            if ((context.MessageName == Constants.Messages.Create) && !(context.InputParameters[Constants.TARGET] is Entity)
                && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.VolunteerFacility.LogicalName)
                return;

            switch (context.MessageName)
            {
                case Constants.Messages.Create:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
            }

            if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.VolunteerFacility.Volunteer))
            {
                tracingService.Trace($"Current User ID : {context.UserId}");
                CommonMethods.ShareRecordToTeamOrUser(tracingService, system_service, new EntityReference(Constants.SystemUsers.LogicalName, context.UserId), targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer),
                     AccessRights.AppendToAccess);

            }
        }
    }
}

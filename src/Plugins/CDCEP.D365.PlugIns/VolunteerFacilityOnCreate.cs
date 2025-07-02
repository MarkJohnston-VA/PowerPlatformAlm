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
    /// Plugin is used to add permission to Facility Owner for given volunteer.
    /// Message : Create
    /// Primary Entity : cdcep_volunteerfacility
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class VolunteerFacilityOnCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationServiceFactory serviceFactory1 = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = serviceFactory.CreateOrganizationService(null);
            //IOrganizationService user_service1 = serviceFactory1.CreateOrganizationService(context.InitiatingUserId);
            IOrganizationService user_service = serviceFactory.CreateOrganizationService(context.UserId);

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

            if(targetEntity is Entity && targetEntity.Attributes.Contains(Constants.VolunteerFacility.Volunteer) && targetEntity.Attributes.Contains(Constants.VolunteerFacility.Facility))
            {
                Entity facilityEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Facility).LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Facility).Id,
                    new ColumnSet(Constants.Account.Ownerid));
                if(facilityEntity is Entity)
                {
                    tracingService.Trace($" Facility Owner Type : {facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid).LogicalName}");
                    if(facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid).LogicalName == Constants.Team.LogicalName)
                    {
                        tracingService.Trace($" Sharing Volunteer record : {targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer).Id} with Facility Team : {facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid).Id}");
                        CommonMethods.ShareRecordToTeamOrUser(tracingService, service, facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid), targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer),
                            AccessRights.ReadAccess | AccessRights.AppendAccess | AccessRights.AppendToAccess);
                        tracingService.Trace($" Revoking Volunteer record : {targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer).Id} with Facility Team : {facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid).Id}");
                        CommonMethods.RevokeRecordToTeamOrUser(tracingService, service, new EntityReference(Constants.SystemUsers.LogicalName, context.UserId), targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer));
                    }
                }
            }
        }
    }
}

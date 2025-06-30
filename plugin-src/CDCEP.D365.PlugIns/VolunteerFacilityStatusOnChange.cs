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
    /// Plugin is used to remove share permission when Volunteer Faciility is inactive. 
    /// Also make Volunteer Assignment Inactive in the system for that given Volunteer as well as Facility.
    /// Message : Update
    /// Primary Entity : cdcep_volunteerfacility
    /// Secondary Entity : none
    /// Filtering Attributes : statecode, statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : Post-Operation
    /// Execution Mode : Sync
    /// </summary>
    public class VolunteerFacilityStatusOnChange : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null, postImageEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (context.MessageName == Constants.Messages.Update
                && (context.InputParameters[Constants.TARGET] as Entity).LogicalName == Constants.VolunteerFacility.LogicalName && context.PostEntityImages.Contains(Constants.POST_IMAGE))
            {
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                postImageEntity = context.PostEntityImages[Constants.POST_IMAGE] as Entity;

                if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.Status.StateCode) && postImageEntity is Entity 
                    && postImageEntity.Attributes.Contains(Constants.VolunteerFacility.Facility) && postImageEntity.Attributes.Contains(Constants.VolunteerFacility.Volunteer))
                {
                    tracingService.Trace($"State Code : {targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value}");

                    if (targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value == 1)
                    {
                        Entity facilityEntity = service.Retrieve(postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Facility).LogicalName, postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Facility).Id,
    new ColumnSet(Constants.Account.Ownerid));
                        if (facilityEntity is Entity)
                        {
                            tracingService.Trace($"Revoking Permission for the facility...");
                            if (facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid).LogicalName == Constants.Team.LogicalName)
                                CommonMethods.RevokeRecordToTeamOrUser(tracingService, service, facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid), postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer));
                            tracingService.Trace($"Making Vol Assignment inactive for facility with ID  : {facilityEntity.Id} & Volunteer ID : {postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer).Id}...");
                            EntityCollection volAssignmentEntityCollection = RetrieveActiveVolunteerAssignmentForFacility(tracingService, service, facilityEntity.ToEntityReference(), postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer));
                            tracingService.Trace($"No of Active Volunteer Assignment found : {volAssignmentEntityCollection.Entities.Count}...");

                            foreach(Entity volAssignmentEntity in volAssignmentEntityCollection.Entities)
                            {
                                volAssignmentEntity[Constants.Status.StateCode] = new OptionSetValue(1);
                                volAssignmentEntity[Constants.Status.StatusCode] = new OptionSetValue(2);
                                service.Update(volAssignmentEntity);
                            }
                        }
                    }
                    else
                    {
                        Entity facilityEntity = service.Retrieve(postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Facility).LogicalName, postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Facility).Id,
    new ColumnSet(Constants.Account.Ownerid));
                        if (facilityEntity is Entity)
                        {
                            if (facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid).LogicalName == Constants.Team.LogicalName)
                                CommonMethods.ShareRecordToTeamOrUser(tracingService, service, facilityEntity.GetAttributeValue<EntityReference>(Constants.Account.Ownerid),
                                    postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerFacility.Volunteer), AccessRights.ReadAccess | AccessRights.AppendAccess | AccessRights.AppendToAccess);
                        }
                    }
                }
            }
        }

        private EntityCollection RetrieveActiveVolunteerAssignmentForFacility(ITracingService tracingService, IOrganizationService service, EntityReference facilityEntityReference, EntityReference volunteerEntityReference)
        {
            tracingService.Trace($"Calling RetrieveActiveVolunteerAssignmentForFacility...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerAssignment.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerAssignment.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.Facility,
                                    Operator = ConditionOperator.Equal,
                                    Values = { facilityEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.Volunteer,
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
}

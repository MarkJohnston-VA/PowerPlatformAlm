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
    /// Plugin is used to populate Meal Ticket setting on a basis of Primary Facility.Also set Account Name & DOB.
    /// Message : Create
    /// Primary Entity : contact
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    /// <summary>
    /// Plugin is used to populate Meal Ticket setting on a basis of Primary Facility.Also set Account Name & DOB.
    /// Message : Update
    /// Primary Entity : contact
    /// Secondary Entity : none
    /// Filtering Attributes : cdcep_primary_facility_id
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>    
    public class VolunteerOnPreOperation : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null, preImageEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            //if (context.Depth > 1)
            //    return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if ((context.MessageName == Constants.Messages.Create || context.MessageName == Constants.Messages.Update) && !(context.InputParameters[Constants.TARGET] is Entity) &&
                (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.Contact.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            switch (context.MessageName)
            {
                case Constants.Messages.Create:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    preImageEntity = context.PreEntityImages[Constants.PRE_IMAGE];
                    break;
            }

            if (targetEntity is Entity)
            {
                if (targetEntity.Attributes.Contains(Constants.Contact.Primary_Facility_Id))
                {

                    tracingService.Trace($"Primary Facility Change...");
                    tracingService.Trace($"Set Parent Customer (Account Name) with Primary Facility...");
                    tracingService.Trace($"Set Facility Meal Setting ...");
                    targetEntity[Constants.Contact.Parentcustomerid] = targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primary_Facility_Id);
                    int userTimeZoneCode = CommonMethods.RetrieveCurrentUsersTimeZoneSettings(service).Value;
                    DateTime localDate = CommonMethods.RetrieveLocalTimeFromUTCTime(service, DateTime.UtcNow, userTimeZoneCode).Value;
                    if (context.MessageName == Constants.Messages.Create)
                        targetEntity[Constants.Contact.EntryDate] = localDate;
                    if (context.MessageName == Constants.Messages.Create)
                    {
                        MapFacilityMealSettings(tracingService, service, targetEntity, targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primary_Facility_Id));
                        if (targetEntity.Attributes.Contains(Constants.Contact.Originatingleadid))
                        {

                            Entity leadEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Originatingleadid).LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Originatingleadid).Id,
                                new ColumnSet(Constants.Leads.Facility, Constants.Leads.PrimaryFacility, Constants.Leads.Type, Constants.Leads.Organization));
                            if (leadEntity is Entity && leadEntity.Attributes.Contains(Constants.Leads.Type) && leadEntity.GetAttributeValue<OptionSetValue>(Constants.Leads.Type).Value == 100000001)
                            {
                                targetEntity[Constants.Contact.Msnfp_Primaryconstituenttype] = new OptionSetValue(844060000);
                                if (leadEntity.Attributes.Contains(Constants.Leads.Organization))
                                    targetEntity[Constants.Contact.Primaryorganizationid] = leadEntity.GetAttributeValue<EntityReference>(Constants.Leads.Organization);

                            }
                            else
                                targetEntity[Constants.Contact.Msnfp_Primaryconstituenttype] = new OptionSetValue(100000000);
                        }
                    }
                    else
                    {
                        if (!preImageEntity.Attributes.Contains(Constants.Contact.IsMealSettingsOverride) ||
                            (preImageEntity.Attributes.Contains(Constants.Contact.IsMealSettingsOverride) && !preImageEntity.GetAttributeValue<bool>(Constants.Contact.IsMealSettingsOverride)))
                            MapFacilityMealSettings(tracingService, service, targetEntity, targetEntity.GetAttributeValue<EntityReference>(Constants.Contact.Primary_Facility_Id));

                    }

                }
                //07/01/2019 12:00 AM -> User who invoke - EST. -> Systm stored in UTC time 07/01/2019 4:00 AM -> PST 06/30/2019 
                //07/01/2019 12:00 AM -> User who invoke - PST. -> Systm stored in UTC time 07/01/2019 8:00 AM -> EST 07/01/2019 4:00 AM
                //01/05/2019 12:00 AM -> User who invoke - EST. -> Systm stored in UTC time 01/05/2019 4:00 AM -> PST 01/04/2019 
                //01/05/2019 12:00 AM -> User who invoke - PST. -> Systm stored in UTC time 07/01/2019 8:00 AM -> EST 07/01/2019 4:00 AM
                if (targetEntity.Attributes.Contains(Constants.Contact.Birthdate))
                    targetEntity[Constants.Contact.Dob] = targetEntity.GetAttributeValue<DateTime>(Constants.Contact.Birthdate);

            }
        }

        private void MapFacilityMealSettings(ITracingService tracingService, IOrganizationService service, Entity targetEntity, EntityReference entityReference)
        {
            tracingService.Trace($"Calling MapFacilityMealSettings...");
            Entity facilityEntity = service.Retrieve(entityReference.LogicalName, entityReference.Id, new ColumnSet(Constants.Account.Mealnumber));
            if (facilityEntity is Entity && facilityEntity.Attributes.Contains(Constants.Account.Mealnumber))
            {
                if (facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealnumber).Value == 100000001 ||
                    facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealnumber).Value == 100000002 ||
                    facilityEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Mealnumber).Value == 100000003)
                    targetEntity[Constants.Contact.Mealseligible] = new OptionSetValue(100000001);
                else
                    targetEntity[Constants.Contact.Mealseligible] = new OptionSetValue(100000000);
            }
        }
    }
}

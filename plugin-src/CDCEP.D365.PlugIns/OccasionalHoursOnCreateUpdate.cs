using System;
using Microsoft.Xrm.Sdk;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to populate Name and Fiscal Year when Occasional Hours is updated.
    /// Message : Update
    /// Primary Entity : cdcep_occasionalhours
    /// Secondary Entity : none
    /// Filtering Attributes : cdcep_facilityid, cdcep_roleid, cdcep_date, cdcep_organizationid
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    /// <summary>
    /// Plugin is used to populate Name and Fiscal Year when Occasional Hours is created.
    /// Message : Create
    /// Primary Entity : cdcep_occasionalhours
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class OccasionalHoursOnCreateUpdate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            Entity targetEntity = null, postImageEntity = null;
            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }

            tracer.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.OccasionalHours.LogicalName)
                return;

            if (context.MessageName == Constants.Messages.Update && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;


            switch (context.MessageName)
            {
                case Constants.Messages.Create:
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
                case Constants.Messages.Update:
                    postImageEntity = context.PostEntityImages[Constants.POST_IMAGE] as Entity;
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    break;
            }

            if(targetEntity is Entity ) {
                if(context.MessageName == Constants.Messages.Create)
                {
                    tracer.Trace($"Processing Create Operation...");
                    tracer.Trace($"Set Fiscal Year...");

                    if (targetEntity.Attributes.Contains(Constants.OccasionalHours.Date))
                    {
                        //SQL Calculation... case when (datepart(month,[DateWorked])*(100)+datepart(day,[DateWorked]))>=(1001) then datepart(year,[DateWorked])+(1) else datepart(year,[DateWorked])
                        //Simplified version is...
                        tracer.Trace($"Date worked month : {targetEntity.GetAttributeValue<DateTime>(Constants.OccasionalHours.Date).Month}");
                        targetEntity[Constants.OccasionalHours.FiscalYear] = targetEntity.GetAttributeValue<DateTime>(Constants.OccasionalHours.Date).CalculateFiscalYear();
                    }
                    tracer.Trace($"Set Name...");
                    string name = string.Empty;
                    if (targetEntity.Attributes.Contains(Constants.OccasionalHours.Facility))
                    {
                        name = CommonMethods.RetrieveAccountName(tracer, service, targetEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.Facility));
                    }

                    if(targetEntity.Attributes.Contains(Constants.OccasionalHours.Organization))
                    {
                        if (string.IsNullOrEmpty(name))
                            name = CommonMethods.RetrieveAccountName(tracer, service, targetEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.Organization));
                        else
                            name += " - " + CommonMethods.RetrieveAccountName(tracer, service, targetEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.Organization));
                    }

                    if (targetEntity.Attributes.Contains(Constants.OccasionalHours.BenefitingServiceRole))
                    {
                        if (string.IsNullOrEmpty(name))
                            name = CommonMethods.RetrieveBenefitingServiceRoleName(tracer, service, targetEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.BenefitingServiceRole));
                        else
                            name += " - " + CommonMethods.RetrieveBenefitingServiceRoleName(tracer, service, targetEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.BenefitingServiceRole));
                    }
                    if (!string.IsNullOrEmpty(name))
                        targetEntity[Constants.OccasionalHours.Name] = (name.Length > 850) ? name.Substring(0,845) + "..." : name;

                }
                else if (context.MessageName == Constants.Messages.Update && postImageEntity is Entity)
                {
                    Entity tmpEntity = new Entity(targetEntity.LogicalName);
                    tmpEntity.Id = targetEntity.Id;

                    if (targetEntity.Attributes.Contains(Constants.OccasionalHours.Date))
                    {
                        tracer.Trace($"Set Fiscal Year...");
                        //SQL Calculation... case when (datepart(month,[DateWorked])*(100)+datepart(day,[DateWorked]))>=(1001) then datepart(year,[DateWorked])+(1) else datepart(year,[DateWorked])
                        //Simplified version is...
                        tracer.Trace($"Date worked month : {targetEntity.GetAttributeValue<DateTime>(Constants.OccasionalHours.Date).Month}");
                        tmpEntity[Constants.OccasionalHours.FiscalYear] = targetEntity.GetAttributeValue<DateTime>(Constants.OccasionalHours.Date).CalculateFiscalYear();
                    }

                    if (targetEntity.Attributes.Contains(Constants.OccasionalHours.Organization) || targetEntity.Attributes.Contains(Constants.OccasionalHours.Facility)
                        || targetEntity.Attributes.Contains(Constants.OccasionalHours.BenefitingServiceRole))
                    {
                        tracer.Trace($"Set Name...");
                        string name = string.Empty;
                        if (postImageEntity.Attributes.Contains(Constants.OccasionalHours.Facility))
                        {
                            name = CommonMethods.RetrieveAccountName(tracer, service, postImageEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.Facility));
                        }

                        if (postImageEntity.Attributes.Contains(Constants.OccasionalHours.Organization))
                        {
                            if (string.IsNullOrEmpty(name))
                                name = CommonMethods.RetrieveAccountName(tracer, service, postImageEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.Organization));
                            else
                                name += " - " + CommonMethods.RetrieveAccountName(tracer, service, postImageEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.Organization));
                        }

                        if (postImageEntity.Attributes.Contains(Constants.OccasionalHours.BenefitingServiceRole))
                        {
                            if (string.IsNullOrEmpty(name))
                                name = CommonMethods.RetrieveBenefitingServiceRoleName(tracer, service, postImageEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.BenefitingServiceRole));
                            else
                                name += " - " + CommonMethods.RetrieveBenefitingServiceRoleName(tracer, service, postImageEntity.GetAttributeValue<EntityReference>(Constants.OccasionalHours.BenefitingServiceRole));
                        }
                        if (!string.IsNullOrEmpty(name))
                            tmpEntity[Constants.OccasionalHours.Name] = (name.Length > 850) ? name.Substring(0, 845) + "..." : name;
                    }
                    if (tmpEntity.Attributes.Count > 0)
                        service.Update(tmpEntity);

                }
            }

        }
    }
}

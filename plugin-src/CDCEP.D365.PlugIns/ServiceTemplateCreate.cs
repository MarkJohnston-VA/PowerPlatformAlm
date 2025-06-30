using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to create General Role when any new Service Template is being created.
    /// Message : Create
    /// Primary Entity : cdcep_benefitingservice
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class ServiceTemplateCreate : IPlugin
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
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.ServiceTemplates.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity)
            {

                switch (context.MessageName)
                {
                    case Constants.Messages.Create:
                        tracingService.Trace($"ST Name : {targetEntity.GetAttributeValue<string>(Constants.ServiceTemplates.Name)}");
                        Entity serviceTemplateRoleEntity = new Entity(Constants.ServiceRoleTemplates.LogicalName);
                        serviceTemplateRoleEntity[Constants.ServiceRoleTemplates.RoleType] = new OptionSetValue(100000001);
                        serviceTemplateRoleEntity[Constants.ServiceRoleTemplates.ServiceTemplateID] = targetEntity.ToEntityReference();
                        serviceTemplateRoleEntity[Constants.ServiceRoleTemplates.Name] = "General";
                        serviceTemplateRoleEntity[Constants.ServiceRoleTemplates.IsRequiredAndReadOnly] = true;

                        service.Create(serviceTemplateRoleEntity);
                        break;
                }
            }
        }
    }
}
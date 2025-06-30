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
    /// Plugin is used to create General Role when any new Benefiting Service is being created.
    /// Message : Create
    /// Primary Entity : cdcep_benefitingservice
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class BenefitingServiceCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

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

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.BenefitingServices.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity )
            {

                switch (context.MessageName)
                {
                    case Constants.Messages.Create:
                        tracingService.Trace($"Facility ID : {targetEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServices.FacilityID).Id}");
                        tracingService.Trace($"BS Name : {targetEntity.GetAttributeValue<string>(Constants.BenefitingServices.Name)}");
                        //Retrieve Service Template Role with RoleType General.
                        if (targetEntity.Attributes.Contains(Constants.BenefitingServices.ServiceTemplateID))
                        {
                            tracingService.Trace($"Creating General BSR with Scope NATIONAL.");
                            tracingService.Trace($"Retrieving Service Role Template for Service Template : {targetEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServices.ServiceTemplateID).Id}");
                            EntityCollection serviceRoleTemplateCollection = RetrieveGeneralServiceRoleTemplate(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServices.ServiceTemplateID));
                            if (serviceRoleTemplateCollection.Entities.Count > 0)
                            {
                                Entity benefitingServiceRoleEntity = new Entity(Constants.BenefitingServiceRoles.LogicalName);
                                benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.FacilityID] = targetEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServices.FacilityID);
                                benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.BenefitingServiceID] = targetEntity.ToEntityReference();
                                benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.RoleType] = new OptionSetValue(100000001);
                                benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.ServiceTemplateID] = targetEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServices.ServiceTemplateID);
                                benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.ServiceTemplateRoleID] = serviceRoleTemplateCollection.Entities[0].ToEntityReference();
                                benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.Name] = targetEntity.GetAttributeValue<string>(Constants.BenefitingServices.Name) + " - General";
                                benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.Scope] = new OptionSetValue(100000001);

                                service.Create(benefitingServiceRoleEntity);
                            }
                        }
                        else
                        {
                            tracingService.Trace($"Creating General BSR with Scope LOCAL.");
                            Entity benefitingServiceRoleEntity = new Entity(Constants.BenefitingServiceRoles.LogicalName);
                            benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.FacilityID] = targetEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServices.FacilityID);
                            benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.BenefitingServiceID] = targetEntity.ToEntityReference();
                            benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.RoleType] = new OptionSetValue(100000001);
                            benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.Name] = targetEntity.GetAttributeValue<string>(Constants.BenefitingServices.Name) + " - General";
                            benefitingServiceRoleEntity[Constants.BenefitingServiceRoles.Scope] = new OptionSetValue(100000000);

                            service.Create(benefitingServiceRoleEntity);
                        }
                        break;
                }
            }
        }

        private EntityCollection RetrieveGeneralServiceRoleTemplate(ITracingService tracingService, IOrganizationService service, EntityReference serviceRoleTemplateEntityReference)
        {
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.ServiceRoleTemplates.LogicalName,
                ColumnSet = new ColumnSet(true),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.ServiceRoleTemplates.ServiceTemplateID,
                                    Operator = ConditionOperator.Equal,
                                    Values = { serviceRoleTemplateEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.ServiceRoleTemplates.RoleType,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 100000001 }
                                }

                            }
                }
                ,NoLock = true
                ,TopCount = 1
            };

            return service.RetrieveMultiple(query);
        }
    }
}

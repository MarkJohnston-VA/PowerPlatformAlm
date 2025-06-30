using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to populate Security Roles in comma separated on User Record.
    /// Message : Associate/Diassociate
    /// Primary Entity : none
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class SecurityRoleChange : IPlugin
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

            EntityReference targetEntityReference = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as EntityReference).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is EntityReference) && (context.InputParameters[Constants.TARGET] as EntityReference).LogicalName != Constants.SystemUsers.LogicalName)
                return;
            else
                targetEntityReference = context.InputParameters[Constants.TARGET] as EntityReference;
            if (context.InputParameters.Contains(Constants.RelationShip) && ((Relationship)context.InputParameters[Constants.RelationShip]).SchemaName != Constants.SystemUserRolesAssociation)
                return;

            switch (context.MessageName)
            {
                case Constants.Messages.Disassociate:
                case Constants.Messages.Associate:
                    if (context.InputParameters.Contains(Constants.RelatedEntities) && !(context.InputParameters[Constants.RelatedEntities] is EntityReferenceCollection))
                        return;
                    EntityReferenceCollection relatedEntities = context.InputParameters[Constants.RelatedEntities] as EntityReferenceCollection;
                    if (relatedEntities != null && relatedEntities.Count > 0)
                    {
                        foreach (EntityReference e in relatedEntities)
                        {
                            tracingService.Trace($"{e.LogicalName} - {e.Id}");
                        }
                    }

                    tracingService.Trace($"retrieving Security Roles for user - {targetEntityReference.Id}");
                    QueryExpression query = new QueryExpression
                    {
                        EntityName = Constants.SystemUserRoles.LogicalName,
                        ColumnSet = new ColumnSet(true),
                        Criteria = new FilterExpression
                        {
                            Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.SystemUserRoles.systemUserID,
                                    Operator = ConditionOperator.Equal,
                                    Values = { targetEntityReference.Id }
                                }
                            }
                        }
                        ,
                        NoLock = true
                        ,
                        TopCount = 5000
                    };

                    EntityCollection systemUserRolesEntityCollection = service.RetrieveMultiple(query);
                    if (systemUserRolesEntityCollection.Entities.Count > 0)
                    {
                        EntityCollection roleCollection = RetrieveCDCEPSecurityRoles(tracingService, service);
                        tracingService.Trace($"Total Security Roles for Given User : {systemUserRolesEntityCollection.Entities.Count}. And Roles are...");
                        string roleName = string.Empty;
                        foreach (Entity e in systemUserRolesEntityCollection.Entities)
                        {
                            tracingService.Trace($"--Role ID - {e.GetAttributeValue<Guid>(Constants.SystemUserRoles.roleID)}");
                            Entity roleEntity = roleCollection.Entities.Where(r => r.Id.Equals(e.GetAttributeValue<Guid>(Constants.SystemUserRoles.roleID))).FirstOrDefault();
                            if (roleEntity is Entity)
                            {
                                if (string.IsNullOrEmpty(roleName))
                                    roleName = roleEntity.GetAttributeValue<string>(Constants.Role.RoleName);
                                else
                                    roleName += ", " + roleEntity.GetAttributeValue<string>(Constants.Role.RoleName);
                            }
                        }
                        tracingService.Trace($"Users CDCEP Security Roles are : {roleName}");
                        if (!string.IsNullOrEmpty(roleName))
                        {
                            Entity userEntity = new Entity(Constants.SystemUsers.LogicalName);
                            userEntity.Id = targetEntityReference.Id;
                            userEntity[Constants.SystemUsers.SecurityRoles] = roleName;

                            service.Update(userEntity);
                        }

                    }
                    else
                        tracingService.Trace("No Security Roles found for given User.");
                    break;
            }

        }

        private EntityCollection RetrieveCDCEPSecurityRoles(ITracingService tracingService, IOrganizationService service)
        {
            tracingService.Trace($"Retrieving Roles from the system...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.Role.LogicalName,
                ColumnSet = new ColumnSet(Constants.Role.RoleName),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.Role.RoleName,
                                    Operator = ConditionOperator.BeginsWith,
                                    Values = {"CDCEP"}
                                }
                            }
                }
            };

            return service.RetrieveMultiple(query);


        }


    }


}

using Microsoft.Xrm.Sdk;
using System;
using VRM.Architects.Models;

namespace VRM.Architects.PluginPackage
{
    /// <summary>
    /// Plugin development guide: https://docs.microsoft.com/powerapps/developer/common-data-service/plug-ins
    /// Best practices and guidance: https://docs.microsoft.com/powerapps/developer/common-data-service/best-practices/business-logic/
    /// </summary>
    public class AwardTypeCreate : PluginBase
    {
        public AwardTypeCreate(string unsecureConfiguration, string secureConfiguration)
            : base(typeof(AwardTypeCreate))
        {
            // TODO: Implement your custom configuration handling
            // https://docs.microsoft.com/powerapps/developer/common-data-service/register-plug-in#set-configuration-data
        }

        // Entry point for custom business logic execution
        protected override void ExecuteDataversePlugin(ILocalPluginContext localPluginContext)
        {
            if (localPluginContext == null)
            {
                throw new ArgumentNullException(nameof(localPluginContext));
            }

            var context = localPluginContext.PluginExecutionContext;

            // Check for the entity on which the plugin would be registered
            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                var entity = (Entity)context.InputParameters["Target"];

                // Check for entity name on which this plugin would be registered
                if (entity.LogicalName == "vrmarch_awardtype")
                {
                    var postImage = context.PostEntityImages["AwardType"];
                    var createdBy = postImage.GetAttributeValue<EntityReference>("createdby");
                    var awardTypeModel = new AwardType
                    {
                        CreatedBy = createdBy.Id,
                        CreatedByName = createdBy.Name,
                        CreateOn = postImage.GetAttributeValue<DateTime>("createdon"),
                        Name = postImage.GetAttributeValue<string>("vrmarch_name")
                    };
                    var serlializedAwardType = System.Text.Json.JsonSerializer.Serialize(awardTypeModel);

                    localPluginContext.Trace($"AwardType created: {serlializedAwardType}");
                }
            }
        }
    }
}

using Microsoft.Xrm.Sdk;
using System;

namespace VRM.Architects.Plugins
{
    /// <summary>
    /// Plugin development guide: https://docs.microsoft.com/powerapps/developer/common-data-service/plug-ins
    /// Best practices and guidance: https://docs.microsoft.com/powerapps/developer/common-data-service/best-practices/business-logic/
    /// </summary>
    public class AwardNominationPlugin : PluginBase
    {
        public AwardNominationPlugin(string unsecureConfiguration, string secureConfiguration)
            : base(typeof(AwardNominationPlugin))
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
                var preImage = context.PreEntityImages["AwardNomination"];

                // Check for entity name on which this plugin would be registered
                if (entity.LogicalName == "vrmarch_awardnomination")
                {
                    var awardTypeName = preImage.GetAttributeValue<EntityReference>("vrmarch_awardtype").Name;
                    var nominee = preImage.GetAttributeValue<EntityReference>("vrmarch_nominee").Name;
                    var newName = $"Award Nomination - {awardTypeName} for {nominee}";
                    entity["vrmarch_name"] = newName;
                    localPluginContext.Trace($"Updating Name attribute for Award Nomination. New Name: {newName}");
               }
            }
        }
    }
}

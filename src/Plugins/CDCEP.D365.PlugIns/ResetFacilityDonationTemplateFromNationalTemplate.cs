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
    /// Plugin is used to Reset Facility Document Template with National Template
    /// Message : Update
    /// Primary Entity : cdcep_facilitydonationlettertemplate
    /// Secondary Entity : none
    /// Filtering Attributes : cdcep_resettemplate
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class ResetFacilityDonationTemplateFromNationalTemplate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null, orgEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;

            if (context.MessageName != Constants.Messages.Update)
                return;
            if (!(context.InputParameters[Constants.TARGET] is Entity))
                return;
            if (!context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;
            if ((context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.FacilityDonationLetterTemplate.LogicalName)
                return;




            switch (context.MessageName)
            {
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    orgEntity = context.InputParameters[Constants.TARGET] as Entity;
                    targetEntity = context.PostEntityImages[Constants.POST_IMAGE];
                    break;
            }

            if(orgEntity is Entity && orgEntity.Attributes.Contains(Constants.FacilityDonationLetterTemplate.ResetTemplate) && orgEntity.GetAttributeValue<bool>(Constants.FacilityDonationLetterTemplate.ResetTemplate) &&
                targetEntity is Entity)
            {
                tracingService.Trace($"Reseting Template...");

                tracingService.Trace($"Retrieving National Template for Type : {targetEntity.GetAttributeValue<OptionSetValue>(Constants.FacilityDonationLetterTemplate.TemplateType).Value}");

                Entity nationalTemplateEntity = RetrieveNationalTemplate(tracingService, service, targetEntity.GetAttributeValue<OptionSetValue>(Constants.FacilityDonationLetterTemplate.TemplateType).Value);
                if(nationalTemplateEntity is Entity && nationalTemplateEntity.Attributes.Contains(Constants.FacilityDonationLetterTemplate.TemplateContent))
                {
                    tracingService.Trace($"Reseting flag and content.");

                    Entity tmpEntity = new Entity(targetEntity.LogicalName);
                    tmpEntity.Id = targetEntity.Id;
                    tmpEntity[Constants.FacilityDonationLetterTemplate.ResetTemplate] = false;
                    tmpEntity[Constants.FacilityDonationLetterTemplate.TemplateContent] = nationalTemplateEntity.GetAttributeValue<string>(Constants.FacilityDonationLetterTemplate.TemplateContent);

                    service.Update(tmpEntity);
                }

            }


        }

        private Entity RetrieveNationalTemplate(ITracingService tracingService, IOrganizationService service, int TemplateType)
        {
            tracingService.Trace($"Inside RetrieveNationalTemplate method...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.FacilityDonationLetterTemplate.LogicalName,
                ColumnSet = new ColumnSet(Constants.FacilityDonationLetterTemplate.Name, Constants.FacilityDonationLetterTemplate.TemplateType, Constants.FacilityDonationLetterTemplate.TemplateContent),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.Status.StateCode,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 0 }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.FacilityDonationLetterTemplate.TemplateContent,
                                    Operator = ConditionOperator.NotNull
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.FacilityDonationLetterTemplate.TemplateType,
                                    Operator = ConditionOperator.Equal,
                                    Values = { TemplateType }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.FacilityDonationLetterTemplate.Scope,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 100000001 }
                                }
                            }
                }
,
                NoLock = true,
                TopCount = 1

            };


            EntityCollection entityCollection = service.RetrieveMultiple(query);
            if (entityCollection.Entities.Count > 0)
                return entityCollection.Entities[0];
            else
                return null;
        }
    }
}

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
    /// Plugin is used to make Org Donor record disabled when organization is disabled.
    /// Message : Update
    /// Primary Entity : account
    /// Secondary Entity : none
    /// Filtering Attributes : statecode, statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : Post-Operation
    /// Execution Mode : Sync
    /// </summary>
    public class OrganizationStatusOnChange : IPlugin
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

            if (context.MessageName == Constants.Messages.Update && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;
            if (context.Depth > 1)
                return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            switch (context.MessageName)
            {
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.PostEntityImages[Constants.POST_IMAGE];
                    break;
            }

            if(targetEntity is Entity && targetEntity.Attributes.Contains(Constants.Account.Msnfp_Accounttype) && (targetEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value == 844060001 ||
                targetEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value == 100000001)
                && targetEntity.Attributes.Contains(Constants.Status.StateCode) && targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StateCode).Value == 1)
            {
                EntityCollection orgDonorCollection = RetrieveActiveOrgDonor(tracingService, service, targetEntity.ToEntityReference());

                foreach(Entity e in orgDonorCollection.Entities)
                {
                    e.Attributes[Constants.Status.StateCode] = new OptionSetValue(1);
                    e.Attributes[Constants.Status.StatusCode] = new OptionSetValue(2);

                    service.Update(e);
                }
            }
        }

        private EntityCollection RetrieveActiveOrgDonor(ITracingService tracingService, IOrganizationService service, EntityReference entityReference)
        {
            tracingService.Trace($"Calling RetrieveActiveOrgDonor...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.Contact.LogicalName,
                ColumnSet = new ColumnSet(Constants.Contact.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.Contact.Parentcustomerid,
                                    Operator = ConditionOperator.Equal,
                                    Values = { entityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.Contact.Msnfp_Primaryconstituenttype,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 100000000 }
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
                TopCount = 1
            };

            return service.RetrieveMultiple(query);
        }
    }
}

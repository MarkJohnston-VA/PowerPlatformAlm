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
    /// Plugin is used for updating Org Donor Name and Address as soon as Organization Name and/or address updated.
    /// Message : Update
    /// Primary Entity : account
    /// Secondary Entity : none
    /// Filtering Attributes : name,address1_line1,address1_city,cdcep_stateid,address1_postalcode 
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class AccountNameAddressUpdate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");


            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1) { return; }
            if (context.InputParameters[Constants.TARGET] is Entity == false) { return; }
            if (context.MessageName != Constants.Messages.Update) { return; }

            Entity targetEntity = context.InputParameters[Constants.TARGET] as Entity;
            tracingService.Trace($"Target Logical Name : {targetEntity.LogicalName}");

            if (targetEntity.LogicalName != Constants.Account.LogicalName) { return; }

            if (targetEntity.Attributes.Contains(Constants.Account.Name) ||
                targetEntity.Attributes.Contains(Constants.Account.Address1_Line1) ||
                targetEntity.Attributes.Contains(Constants.Account.Address1_Line2) ||
                targetEntity.Attributes.Contains(Constants.Account.Address1_City) ||
                targetEntity.Attributes.Contains(Constants.Account.Stateid) ||
                targetEntity.Attributes.Contains(Constants.Account.Address1_Postalcode))
            {
                tracingService.Trace($"Account Id: {targetEntity.Id}");

                QueryExpression queryExpression = new QueryExpression(Constants.Contact.LogicalName);
                queryExpression.ColumnSet = new ColumnSet(Constants.Contact.PrimaryKey);

                FilterExpression filterExpression = new FilterExpression(LogicalOperator.And);
                filterExpression.AddCondition(new ConditionExpression(Constants.Contact.Msnfp_Primaryconstituenttype, ConditionOperator.Equal, 100000000));
                filterExpression.AddCondition(new ConditionExpression(Constants.Contact.Donortype, ConditionOperator.Equal, 100000003));
                filterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
                filterExpression.AddCondition(new ConditionExpression(Constants.Contact.Parentcustomerid, ConditionOperator.Equal, targetEntity.Id));

                queryExpression.Criteria.AddFilter(filterExpression);
                queryExpression.TopCount = 1000;
                queryExpression.NoLock = true;

                EntityCollection donorContactCollection = service.RetrieveMultiple(queryExpression);
                tracingService.Trace($"Donor Count : {donorContactCollection.Entities.Count}...");
                foreach (Entity donorContact in donorContactCollection.Entities)
                {
                    tracingService.Trace($"Donor Id : {donorContact.Id}");
                    Entity updateDonorContact = new Entity(Constants.Contact.LogicalName, donorContact.Id);
                    if (targetEntity.Attributes.Contains(Constants.Account.Name))
                        updateDonorContact[Constants.Contact.Lastname] = targetEntity.GetAttributeValue<string>(Constants.Account.Name);
                    if (targetEntity.Attributes.Contains(Constants.Account.Address1_Line1))
                        updateDonorContact[Constants.Contact.Address1_Line1] = targetEntity.GetAttributeValue<string>(Constants.Account.Address1_Line1);
                    if (targetEntity.Attributes.Contains(Constants.Account.Address1_Line2))
                        updateDonorContact[Constants.Contact.Address1_Line2] = targetEntity.GetAttributeValue<string>(Constants.Account.Address1_Line2);
                    if (targetEntity.Attributes.Contains(Constants.Account.Address1_City))
                        updateDonorContact[Constants.Contact.Address1_City] = targetEntity.GetAttributeValue<string>(Constants.Account.Address1_City);
                    if (targetEntity.Attributes.Contains(Constants.Account.Stateid))
                        updateDonorContact[Constants.Contact.State_Id] = targetEntity.GetAttributeValue<EntityReference>(Constants.Account.Stateid);
                    if (targetEntity.Attributes.Contains(Constants.Account.Address1_Postalcode))
                        updateDonorContact[Constants.Contact.Address1_Postalcode] = targetEntity.GetAttributeValue<string>(Constants.Account.Address1_Postalcode);
                    service.Update(updateDonorContact);
                }
            }
        }
    }
}

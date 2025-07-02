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
    /// Plugin is used to generate meal ticket from Template
    /// Message : Create
    /// Primary Entity : cdcep_mealprovided
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>

    public class GenerateMealTicketFromTemplate : IPlugin
    {
        //const string MEAL_TICKET_TEMPLATE = "7c5a9616-d82a-ed11-b83c-001dd8069a90";
        const string MEAL_TICKET_TEMPLATE = "17c061db-c169-ed11-9562-001dd806acfb";
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 3)
                return;
            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if ((context.MessageName == Constants.Messages.Create || context.MessageName == Constants.Messages.Update) && !(context.InputParameters[Constants.TARGET] is Entity) &&
                (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.MealProvided.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            switch (context.MessageName)
            {
                case Constants.Messages.Create:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    if (targetEntity is Entity)
                        GenerateDocumentFromTemplate(tracingService, service, targetEntity.ToEntityReference(), new Guid(MEAL_TICKET_TEMPLATE));
                    break;
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

                    targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                    if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.MealProvided.Retry) && targetEntity.GetAttributeValue<bool>(Constants.MealProvided.Retry))
                        GenerateDocumentFromTemplate(tracingService, service, targetEntity.ToEntityReference(), new Guid(MEAL_TICKET_TEMPLATE));
                    break;
            }


        }

        void GenerateDocumentFromTemplate(ITracingService tracingService, IOrganizationService service, EntityReference targetEntityReference, Guid templateGUID)
        {
            tracingService.Trace($"Generating Template using Template GUID : {templateGUID.ToString()}");
            OrganizationRequest req = new OrganizationRequest("SetWordTemplate");

            req["Target"] = targetEntityReference;
            req["SelectedTemplate"] = new EntityReference("documenttemplate", templateGUID);
            try
            {
                service.Execute(req);
            }
            catch(InvalidPluginExecutionException ex)
            {
                tracingService.Trace(ex.Message);
                tracingService.Trace(ex.StackTrace);
            }
        }
    }
}

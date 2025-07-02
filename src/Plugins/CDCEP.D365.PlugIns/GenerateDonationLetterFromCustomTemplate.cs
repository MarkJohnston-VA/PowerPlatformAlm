using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to Generate Donation Letter from Facility Donation Template
    /// Message : Update
    /// Primary Entity : cdcep_donationsummary
    /// Secondary Entity : none
    /// Filtering Attributes : cdcep_generatedonationletter
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Sync
    /// </summary>
    public class GenerateDonationLetterFromCustomTemplate : IPlugin
    {
        const string MEMO_TEMPLATE_ID = "f5eae905-a6af-ec11-983e-001dd804de4d";
        const string RECEIPT_TEMPLATE_ID = "bf0e7a60-aaaf-ec11-983e-001dd804de4d";
        const string MEMO_ACK_TEMPLATE_ID = "627b93fc-24d6-ec11-a7b4-001dd804e767";
        const string RECEIPT_ACK_TEMPLATE_ID = "525d2ab0-25d6-ec11-a7b4-001dd804e767";
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
            IOrganizationService system_service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 1)
                return;

            if (context.MessageName != Constants.Messages.Update)
                return;
            if (!(context.InputParameters[Constants.TARGET] is Entity))
                return;
            if (!context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;
            if ((context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.DonationSummary.LogicalName)
                return;




            switch (context.MessageName)
            {
                case Constants.Messages.Update:
                    tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");
                    targetEntity = context.PostEntityImages[Constants.POST_IMAGE];
                    break;
            }

            if (targetEntity is Entity && targetEntity.Attributes.Contains(Constants.DonationSummary.GenerateDonationLetter) && targetEntity.GetAttributeValue<bool>(Constants.DonationSummary.GenerateDonationLetter)
                && targetEntity.Attributes.Contains(Constants.DonationSummary.DonationType) && targetEntity.Attributes.Contains(Constants.DonationSummary.Facility) && targetEntity.Attributes.Contains(Constants.DonationSummary.DonorType))
            {
                if (targetEntity.GetAttributeValue<OptionSetValue>(Constants.DonationSummary.DonorType).Value == 100000000)
                {
                    tracingService.Trace("Processing Individual Donors...");
                    int TemplateType = 0, familyContactTemplate = 0;
                    switch (targetEntity.GetAttributeValue<OptionSetValue>(Constants.DonationSummary.DonationType).Value)
                    {
                        case 100000004:     //E-Donation
                        case 100000005:     //Credit Card
                        case 100000000:     //Cash
                            if (targetEntity.Attributes.Contains(Constants.DonationSummary.FamilyContactName))
                            {
                                familyContactTemplate = 100000006;
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000005;
                                else
                                    TemplateType = 100000007;
                            }
                            else
                            {
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000003;
                                else
                                    TemplateType = 100000002;
                            }
                            break;
                        case 100000001:     //Check
                            if (targetEntity.Attributes.Contains(Constants.DonationSummary.FamilyContactName))
                            {
                                familyContactTemplate = 100000006;
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000004;
                                else
                                    TemplateType = 100000014;
                            }
                            else
                            {
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000001;
                                else
                                    TemplateType = 100000000;

                            }
                            break;
                        case 100000002:     //Item
                            TemplateType = 100000008;
                            break;
                        case 100000003:     //Activity
                            TemplateType = 100000009;
                            break;
                    }

                    tracingService.Trace($"Template Type : {TemplateType}");
                    if (TemplateType != 0)
                    {
                        Entity dontationTemplateEntity = RetrieveDonationTemplateEntity(tracingService, system_service,
                            targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Facility), TemplateType);

                        if (dontationTemplateEntity is Entity && dontationTemplateEntity.Attributes.Contains(Constants.FacilityDonationLetterTemplate.TemplateContent))
                        {
                            Entity donSummaryEntity = new Entity(targetEntity.LogicalName);
                            donSummaryEntity.Id = targetEntity.Id;



                            if (!targetEntity.Attributes.Contains(Constants.DonationSummary.AckDate))
                            {
                                targetEntity[Constants.DonationSummary.AckDate] = DateTime.Now;
                                donSummaryEntity[Constants.DonationSummary.AckDate] = DateTime.Now;
                            }

                            string content = GenerateDonationLetterContent(tracingService, system_service, targetEntity, dontationTemplateEntity);



                            donSummaryEntity[Constants.DonationSummary.GenerateDonationLetter] = false;
                            donSummaryEntity[Constants.DonationSummary.ReadyToGeneratePDF] = true;
                            donSummaryEntity[Constants.DonationSummary.DonationLetter] = content;

                            if (familyContactTemplate != 0)
                            {
                                tracingService.Trace($"Family Template Type : {familyContactTemplate}");
                                Entity familyDonationTemplateEntity = RetrieveDonationTemplateEntity(tracingService, system_service, targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Facility), familyContactTemplate);
                                if (familyDonationTemplateEntity is Entity)
                                {
                                    string familyContent = GenerateDonationLetterContent(tracingService, system_service, targetEntity, familyDonationTemplateEntity);
                                    donSummaryEntity[Constants.DonationSummary.FamilyDonationLetter] = familyContent;
                                }
                            }

                            service.Update(donSummaryEntity);

                            GenerateDocumentFromTemplate(tracingService, system_service, targetEntity.ToEntityReference(), new Guid(MEMO_TEMPLATE_ID));
                            GenerateDocumentFromTemplate(tracingService, system_service, targetEntity.ToEntityReference(), new Guid(RECEIPT_TEMPLATE_ID));


                        }


                    }
                }
                else
                {
                    tracingService.Trace($"Processing Type of Donors : {targetEntity.GetAttributeValue<OptionSetValue>(Constants.DonationSummary.DonorType).Value}");
                    int TemplateType = 0, familyContactTemplate = 0;
                    switch (targetEntity.GetAttributeValue<OptionSetValue>(Constants.DonationSummary.DonationType).Value)
                    {
                        case 100000004:     //E-Donation
                        case 100000005:     //Credit Card
                        case 100000000:     //Cash
                            if (targetEntity.Attributes.Contains(Constants.DonationSummary.FamilyContactName))
                            {
                                familyContactTemplate = 100000006;
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000019;
                                else
                                    TemplateType = 100000020;
                            }
                            else
                            {
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000016;
                                else
                                    TemplateType = 100000011;
                            }
                            break;
                        case 100000001:     //Check
                            if (targetEntity.Attributes.Contains(Constants.DonationSummary.FamilyContactName))
                            {
                                familyContactTemplate = 100000006;
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000017;
                                else
                                    TemplateType = 100000018;
                            }
                            else
                            {
                                if (targetEntity.Attributes.Contains(Constants.DonationSummary.InMemoryOf))
                                    TemplateType = 100000015;
                                else
                                    TemplateType = 100000010;
                            }
                            break;
                        case 100000002:     //Item
                            TemplateType = 100000013;
                            break;
                        case 100000003:     //Activity
                            TemplateType = 100000012;
                            break;
                    }

                    if (TemplateType != 0)
                    {
                        Entity dontationTemplateEntity = RetrieveDonationTemplateEntity(tracingService, system_service,
    targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Facility), TemplateType);

                        if (dontationTemplateEntity is Entity && dontationTemplateEntity.Attributes.Contains(Constants.FacilityDonationLetterTemplate.TemplateContent))
                        {
                            Entity donSummaryEntity = new Entity(targetEntity.LogicalName);
                            donSummaryEntity.Id = targetEntity.Id;



                            if (!targetEntity.Attributes.Contains(Constants.DonationSummary.AckDate))
                            {
                                targetEntity[Constants.DonationSummary.AckDate] = DateTime.Now;
                                donSummaryEntity[Constants.DonationSummary.AckDate] = DateTime.Now;
                            }

                            string content = GenerateDonationLetterContent(tracingService, system_service, targetEntity, dontationTemplateEntity);



                            donSummaryEntity[Constants.DonationSummary.GenerateDonationLetter] = false;
                            donSummaryEntity[Constants.DonationSummary.ReadyToGeneratePDF] = true;
                            donSummaryEntity[Constants.DonationSummary.DonationLetter] = content;

                            if (familyContactTemplate != 0)
                            {
                                tracingService.Trace($"Family Template Type : {familyContactTemplate}");
                                Entity familyDonationTemplateEntity = RetrieveDonationTemplateEntity(tracingService, system_service, targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Facility), familyContactTemplate);
                                if (familyDonationTemplateEntity is Entity)
                                {
                                    string familyContent = GenerateDonationLetterContent(tracingService, system_service, targetEntity, familyDonationTemplateEntity);
                                    donSummaryEntity[Constants.DonationSummary.FamilyDonationLetter] = familyContent;
                                }
                            }

                            service.Update(donSummaryEntity);

                            Guid memoTemplateGuid = new Guid(MEMO_TEMPLATE_ID);
                            Guid receiptTemplateGuid = new Guid(RECEIPT_TEMPLATE_ID);

                            if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckOverride) && targetEntity.GetAttributeValue<bool>(Constants.DonationSummary.AckOverride))
                            {
                                memoTemplateGuid = new Guid(MEMO_ACK_TEMPLATE_ID);
                                receiptTemplateGuid = new Guid(RECEIPT_ACK_TEMPLATE_ID);
                            }

                                GenerateDocumentFromTemplate(tracingService, system_service, targetEntity.ToEntityReference(), memoTemplateGuid);
                            GenerateDocumentFromTemplate(tracingService, system_service, targetEntity.ToEntityReference(), receiptTemplateGuid);
                        }
                    }
                }
            }

        }

        void GenerateDocumentFromTemplate(ITracingService tracingService, IOrganizationService service, EntityReference targetEntityReference, Guid templateGUID)
        {
            tracingService.Trace($"Generating Template using Template GUID : {templateGUID.ToString()}");
            OrganizationRequest req = new OrganizationRequest("SetWordTemplate");

            req["Target"] = targetEntityReference;
            req["SelectedTemplate"] = new EntityReference("documenttemplate", templateGUID);

            service.Execute(req);
        }
        private string GenerateDonationLetterContent(ITracingService tracingService, IOrganizationService service, Entity targetEntity, Entity dontationTemplateEntity)
        {
            string content = dontationTemplateEntity.GetAttributeValue<string>(Constants.FacilityDonationLetterTemplate.TemplateContent);
            tracingService.Trace($"Original Template Content : {content}");
            content = content.Replace("\r", "^^$$^^").Replace("\n", "~~**~~");
            List<string> accountFieldList = new List<string>();
            accountFieldList.Add(Constants.Account.Signature_Voluntary);
            accountFieldList.Add(Constants.Account.Signature_Director);
            accountFieldList.Add(Constants.Account.Meal_Value);
            List<string> contactFieldList = new List<string>();

            var accountpattern = new Regex(@"{{account./?\w+;}}", RegexOptions.Compiled);
            var accountAttributesMatches = accountpattern.Matches(content);

            var contactpattern = new Regex(@"{{contact./?\w+;}}", RegexOptions.Compiled);
            var contactAttributesMatches = contactpattern.Matches(content);

            var donSummarypattern = new Regex(@"{{cdcep_donationsummary./?\w+;}}", RegexOptions.Compiled);
            var donSummaryAttributesMatches = donSummarypattern.Matches(content);

            foreach (Match match in accountAttributesMatches)
            {
                //tracingService.Trace($"Account : {match.Value}");
                accountFieldList.Add(match.Value.Replace("{{", "").Replace(";}}", "").Replace("account.", ""));
            }

            foreach (Match match in contactAttributesMatches)
            {
                // tracingService.Trace($"Contact : {match.Value}");
                contactFieldList.Add(match.Value.Replace("{{", "").Replace(";}}", "").Replace("contact.", ""));
            }

            foreach (Match match in donSummaryAttributesMatches)
            {
                tracingService.Trace($"Don Summary : {match.Value}");
            }



            content = ProcessContect(tracingService, service, content, targetEntity, donSummaryAttributesMatches);

            if (contactFieldList.Count > 0)
            {
                Entity contactEntity = service.Retrieve(Constants.Contact.LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).Id, new ColumnSet(contactFieldList.ToArray()));
                if (contactEntity is Entity)
                {
                    content = ProcessContect(tracingService, service, content, contactEntity, contactAttributesMatches);
                }
            }

            Entity accountEntity = service.Retrieve(Constants.Account.LogicalName, targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Facility).Id, new ColumnSet(accountFieldList.ToArray()));
            decimal totalDonationAmount = 0, valueAmount = 0;

            if (accountEntity is Entity)
            {
                content = ProcessContect(tracingService, service, content, accountEntity, accountAttributesMatches);
                if (accountEntity.Attributes.Contains(Constants.Account.Meal_Value))
                    valueAmount = accountEntity.GetAttributeValue<Money>(Constants.Account.Meal_Value).Value;

                tracingService.Trace($"Meal Value : {valueAmount}");
            }

            tracingService.Trace("Processing Signature...");
            if (targetEntity.Attributes.Contains(Constants.DonationSummary.TotalDonationAmount))
                totalDonationAmount = targetEntity.GetAttributeValue<Money>(Constants.DonationSummary.TotalDonationAmount).Value;

            tracingService.Trace($"Total Donation Value : {totalDonationAmount}");


            string signature = string.Empty;
            if (totalDonationAmount >= valueAmount)
            {
                tracingService.Trace($"Donation Value greater than or equal to Meal Value");

                signature = (accountEntity.Attributes.Contains(Constants.Account.Signature_Director)) ? accountEntity.GetAttributeValue<string>(Constants.Account.Signature_Director) : string.Empty;
                tracingService.Trace($"Director Signature : {accountEntity.GetAttributeValue<string>(Constants.Account.Signature_Director)}");
            }
            else
            {
                tracingService.Trace($"Donation Value less than Meal Value");
                signature = (accountEntity.Attributes.Contains(Constants.Account.Signature_Voluntary)) ? accountEntity.GetAttributeValue<string>(Constants.Account.Signature_Voluntary) : string.Empty;
                tracingService.Trace($"Voluntary Staff Signature : {accountEntity.GetAttributeValue<string>(Constants.Account.Signature_Voluntary)}");
            }
            tracingService.Trace($"Final Signature : {signature}");

            content = content.Replace("{{signature;}}", signature);

            tracingService.Trace("Processing Donation Details...");



            var tdStylepattern = new Regex("<td style=(\"|')[^(\"|')]*(\"|')", RegexOptions.Compiled);
            var tdStyleMatches = tdStylepattern.Matches(content);
            foreach (Match match in tdStyleMatches)
            {
                //tracingService.Trace("TD Style : " + match.Value);
                content = content.Replace(match.Value, "<td");
            }


            var tableStylepattern = new Regex("<table cellspacing=\"0\" class=\"MsoTableGrid\" style=(\"|')[^(\"|')]*(\"|')", RegexOptions.Compiled);
            var tableStyleMatches = tableStylepattern.Matches(content);

            foreach (Match match in tableStyleMatches)
            {
                //tracingService.Trace("Style : " + match.Value);
                content = content.Replace(match.Value, "<br><br><table cellspacing=\"0\" class=\"MsoTableGrid\" style=\"font-size:12pt;font-family:arial;border-collapse:collapse;width:90%; table-layout:fixed; border:none\"");
            }


            content = content.Replace("vertical-align:top; width:", "vertical-align:top; overflow:hidden;word-wrap: break-word; width:");
            content = content.Replace("border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:1px solid black;", "border:none;");//
            content = Regex.Replace(content, "</?(td border)[^>]*>", "<td style=\"text-align:center;\">");
            content = content.Replace("border-color:black; border-style:solid;", "border:none;");//border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:1px solid black;
                                                                                                 //content = content.Replace("table border=\"1\"", "table");
            content = content.Replace("^^$$^^", "\r").Replace("~~**~~", "\n").Replace("~~**~~", "");

            content = Regex.Replace(content, "</?(span)[^>]*>", "");

            if (content.Contains("{{donation_details_table;}}"))
            {

                EntityCollection donationDetailCollection = RetrieveDonationDetails(tracingService, service, targetEntity.ToEntityReference());

                tracingService.Trace($"Donation Details Count : {donationDetailCollection.Entities.Count}...");

                if (donationDetailCollection.Entities.Count > 0)
                {
                    string donDetailsTable = "<div style='align - content:center'><table style='border:solid;border-color:rgb(171, 171, 171);border-width:1px;border-collapse:collapse;'><thead><tr style='background-color:lightgrey;font-weight:bold;'><th style='border:solid;border-color:#C0C0C0;border-width:1px;padding:5px;'>General Post Fund</th><th style='border:solid;border-color:#C0C0C0;border-width:1px;padding:5px;'>Donation value</th></tr></thead>";

                    foreach (Entity e in donationDetailCollection.Entities)
                    {
                        if (e.Attributes.Contains(Constants.DonationDetails.GPF))
                            donDetailsTable += $"<tr><td style='border:solid;border-color:#C0C0C0;border-width:1px;padding:5px;'>{e.GetAttributeValue<EntityReference>(Constants.DonationDetails.GPF).Name}</td><td style='font-size:12pt;font-family:arial;border:solid;border-color:#C0C0C0;border-width:1px;padding:5px;'>{ e.GetAttributeValue<Money>(Constants.DonationDetails.DonationValue).Value:C}</td></tr>";
                        else
                            donDetailsTable += $"<tr><td style='border:solid;border-color:#C0C0C0;border-width:1px;padding:5px;'> </td><td style='font-size:12pt;font-family:arial;border:solid;border-color:#C0C0C0;border-width:1px;padding:5px;'>{ e.GetAttributeValue<Money>(Constants.DonationDetails.DonationValue).Value:C}</td></tr>";
                    }
                    donDetailsTable += "</table></div>";
                    content = content.Replace("{{donation_details_table;}}", donDetailsTable);
                }
                else
                    content = content.Replace("{{donation_details_table;}}", string.Empty);
            }

            if (content.Contains("{{organization_contact_information;}}"))
            {
                tracingService.Trace("Processing {{organization_contact_information;}}...");

                bool ackOverride = false;
                if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckOverride))
                {
                    if (targetEntity.GetAttributeValue<bool>(Constants.DonationSummary.AckOverride))
                        ackOverride = true;
                    else
                        ackOverride = false;
                }
                else
                    ackOverride = false;

                StringBuilder org_contact_info = new StringBuilder();
                if (ackOverride)
                {
                    tracingService.Trace("Using Org Contact from Donation Summary Record...");

                    string name = string.Empty;
                    if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckFirstName))
                        name = targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckFirstName);

                    if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckLastName))
                    {
                        if (!string.IsNullOrEmpty(name))
                            name += $" {targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckLastName)}";
                        else
                            name = targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckLastName);
                    }

                    org_contact_info.Append(name + "<br>");

                    //if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckOrgContactName))
                    //    org_contact_info.Append(targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckOrgContactName) + "<br>");

                    if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckTitle))
                        org_contact_info.Append(targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckTitle) + "<br>");

                    string orgName = RetrieveOrganizationName(tracingService, service, targetEntity);
                    if (!string.IsNullOrEmpty(orgName))
                        org_contact_info.Append(orgName + "<br>");

                    if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckAddress1))
                        org_contact_info.Append(targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckAddress1) +
                            ((targetEntity.Attributes.Contains(Constants.DonationSummary.AckAddress2)) ? ", " + targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckAddress2) + "<br>" : "<br>"));

                    if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckCity))
                        org_contact_info.Append(targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckCity));

                    if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckState))
                        org_contact_info.Append(", " + targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.AckState).Name);

                    if (targetEntity.Attributes.Contains(Constants.DonationSummary.AckZip))
                        org_contact_info.Append(" " + targetEntity.GetAttributeValue<string>(Constants.DonationSummary.AckZip));
                }
                else
                {
                    tracingService.Trace("Using Donor from Contact Record...");
                    tracingService.Trace($"Retrieving Donor Record : {targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).Id}...");
                    Entity donorEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).LogicalName,
                        targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).Id, new ColumnSet(Constants.Contact.Donortype, Constants.Contact.Parentcustomerid));
                    if (donorEntity is Entity && donorEntity.Attributes.Contains(Constants.Contact.Parentcustomerid))
                    {
                        tracingService.Trace($"Retrieving Organization Record : {donorEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid).Id}...");

                        Entity organizationEntity = service.Retrieve(donorEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid).LogicalName,
                            donorEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid).Id,
                            new ColumnSet(Constants.Account.Msnfp_Accounttype, Constants.Account.Parentaccountid, Constants.Account.Name, Constants.Account.Chiefmanager, Constants.Account.Chieftitle, Constants.Account.Address1_Line1, Constants.Account.Address1_Line2,
                            Constants.Account.Address1_City, Constants.Account.Address1_Postalcode, Constants.Account.Stateid));
                        if (organizationEntity is Entity && organizationEntity.Attributes.Contains(Constants.Account.Msnfp_Accounttype))
                        {
                            if (organizationEntity.Attributes.Contains(Constants.Account.Chiefmanager))
                                org_contact_info.Append(organizationEntity.GetAttributeValue<string>(Constants.Account.Chiefmanager) + "<br>");

                            if (organizationEntity.Attributes.Contains(Constants.Account.Chieftitle))
                                org_contact_info.Append(organizationEntity.GetAttributeValue<string>(Constants.Account.Chieftitle) + "<br>");

                            string OrgName = string.Empty;
                            tracingService.Trace($"Organization Type : {organizationEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value}...");
                            if (organizationEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value == 100000001)
                            {
                                if (organizationEntity.Attributes.Contains(Constants.Account.Parentaccountid))
                                    OrgName = organizationEntity.GetAttributeValue<EntityReference>(Constants.Account.Parentaccountid).Name + " - " + organizationEntity.GetAttributeValue<string>(Constants.Account.Name);
                            }
                            else
                            {
                                OrgName = organizationEntity.GetAttributeValue<string>(Constants.Account.Name);
                            }
                            if (!string.IsNullOrEmpty(OrgName))
                                org_contact_info.Append(OrgName + "<br>");

                            if (organizationEntity.Attributes.Contains(Constants.Account.Address1_Line1))
                                org_contact_info.Append(organizationEntity.GetAttributeValue<string>(Constants.Account.Address1_Line1) +
                                    ((organizationEntity.Attributes.Contains(Constants.Account.Address1_Line2)) ? ", " + organizationEntity.GetAttributeValue<string>(Constants.Account.Address1_Line2) + "<br>" : "<br>"));

                            if (organizationEntity.Attributes.Contains(Constants.Account.Address1_City))
                                org_contact_info.Append(organizationEntity.GetAttributeValue<string>(Constants.Account.Address1_City));

                            if (organizationEntity.Attributes.Contains(Constants.Account.Stateid))
                                org_contact_info.Append(", " + organizationEntity.GetAttributeValue<EntityReference>(Constants.Account.Stateid).Name);

                            if (organizationEntity.Attributes.Contains(Constants.Account.Address1_Postalcode))
                                org_contact_info.Append(" " + organizationEntity.GetAttributeValue<string>(Constants.Account.Address1_Postalcode));


                        }
                    }

                }
                tracingService.Trace($"Org Contact Info : {org_contact_info.ToString()}");
                content = content.Replace("{{organization_contact_information;}}", org_contact_info.ToString());
            }

            content = content.Replace("{{VA_LOGO;}}", $"<img style='object-fit:fill; height:58px; width:302px;' src='{Constants.VA_DONATION_LETTER_IMAGE_BASE64}' />");

            content = content.Replace("<div>&nbsp;</div>", " ");

            if (dontationTemplateEntity.Attributes.Contains(Constants.FacilityDonationLetterTemplate.Footer))
                content += $"<br><div class='bottom'>{dontationTemplateEntity.GetAttributeValue<string>(Constants.FacilityDonationLetterTemplate.Footer)}</div>";

            return content;
        }

        private string RetrieveOrganizationName(ITracingService tracingService, IOrganizationService service, Entity targetEntity)
        {
            string OrgName = string.Empty;
            tracingService.Trace($"Retrieving Donor Record : {targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).Id}...");
            Entity donorEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).LogicalName,
                targetEntity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Donor).Id, new ColumnSet(Constants.Contact.Donortype, Constants.Contact.Parentcustomerid));
            if (donorEntity is Entity && donorEntity.Attributes.Contains(Constants.Contact.Parentcustomerid))
            {
                tracingService.Trace($"Retrieving Organization Record : {donorEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid).Id}...");

                Entity organizationEntity = service.Retrieve(donorEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid).LogicalName,
                    donorEntity.GetAttributeValue<EntityReference>(Constants.Contact.Parentcustomerid).Id, new ColumnSet(Constants.Account.Msnfp_Accounttype, Constants.Account.Parentaccountid, Constants.Account.Name));
                if (organizationEntity is Entity && organizationEntity.Attributes.Contains(Constants.Account.Msnfp_Accounttype))
                {
                    tracingService.Trace($"Organization Type : {organizationEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value}...");
                    if (organizationEntity.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value == 100000001)
                    {
                        if (organizationEntity.Attributes.Contains(Constants.Account.Parentaccountid))
                            OrgName = organizationEntity.GetAttributeValue<EntityReference>(Constants.Account.Parentaccountid).Name + " - " + organizationEntity.GetAttributeValue<string>(Constants.Account.Name);
                    }
                    else
                    {
                        OrgName = organizationEntity.GetAttributeValue<string>(Constants.Account.Name);
                    }
                }

            }

            tracingService.Trace($"Organization Name : {OrgName}...");
            return OrgName;
        }

        private EntityCollection RetrieveDonationDetails(ITracingService tracingService, IOrganizationService service, EntityReference entityReference)
        {
            tracingService.Trace($"Inside execution of RetrieveDonationTemplateEntity");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.DonationDetails.LogicalName,
                ColumnSet = new ColumnSet(Constants.DonationDetails.GPF, Constants.DonationDetails.DonationValue),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.DonationDetails.DonationSummary,
                                    Operator = ConditionOperator.Equal,
                                    Values = { entityReference.Id }
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
                TopCount = 100
            };

            return service.RetrieveMultiple(query);
        }

        private string ProcessContect(ITracingService tracingService, IOrganizationService service, string content, Entity d365Entity, MatchCollection attributesMatches)
        {
            if (d365Entity.LogicalName == Constants.DonationSummary.LogicalName)
            {
                if (d365Entity.Attributes.Contains(Constants.DonationSummary.Affiliation))
                {
                    Entity organization = service.Retrieve(Constants.Account.LogicalName, d365Entity.GetAttributeValue<EntityReference>(Constants.DonationSummary.Affiliation).Id,
                        new ColumnSet(Constants.Account.Msnfp_Accounttype, Constants.Account.Parentaccountid, Constants.Account.Name));
                    if (organization is Entity && organization.Attributes.Contains(Constants.Account.Msnfp_Accounttype))
                    {
                        tracingService.Trace($"Account Type : {organization.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value}");
                        if (organization.GetAttributeValue<OptionSetValue>(Constants.Account.Msnfp_Accounttype).Value == 100000001)
                        {
                            if (organization.Attributes.Contains(Constants.Account.Parentaccountid))
                                content = content.Replace("{{cdcep_donationsummary.cdcep_affiliationid;}}", $"On Behalf Of {organization.GetAttributeValue<EntityReference>(Constants.Account.Parentaccountid).Name} {organization.GetAttributeValue<string>(Constants.Account.Name)}");
                        }
                        else
                            content = content.Replace("{{cdcep_donationsummary.cdcep_affiliationid;}}", $"On Behalf Of {organization.GetAttributeValue<string>(Constants.Account.Name)}");
                    }
                }
            }
            foreach (Match match in attributesMatches)
            {
                tracingService.Trace(match.Value);
                string fieldname = match.Value.Replace("{{", "").Replace(";}}", "").Replace($"{d365Entity.LogicalName}.", "");
                if (d365Entity.Attributes.Contains(fieldname))
                {
                    KeyValuePair<string, object> attribute = d365Entity.Attributes.Where(a => a.Key.Equals(fieldname)).FirstOrDefault();
                    content = content.Replace(match.Value, ExtractAttributeValue(tracingService, service, d365Entity, attribute));
                }
                else
                    content = content.Replace(match.Value, string.Empty);

            }

            return content;
        }

        private string ExtractAttributeValue(ITracingService tracingService, IOrganizationService service, Entity entity, KeyValuePair<string, object> att)
        {
            string value = "";
            switch (att.Value)
            {
                case String st:
                    tracingService.Trace($"Attribute Logical Name : {att.Key} & Type : {att.Value.GetType().ToString()}");
                    value = entity.GetAttributeValue<string>(att.Key).Trim();
                    break;
                case int i:
                    tracingService.Trace($"Attribute Logical Name : {att.Key} & Type : {att.Value.GetType().ToString()}");
                    value = entity.GetAttributeValue<int>(att.Key).ToString();
                    break;
                case OptionSetValue options:
                    tracingService.Trace($"Attribute Logical Name : {att.Key} & Type : {att.Value.GetType().ToString()}");
                    value = GetOptionSetLabel(service, entity.GetAttributeValue<OptionSetValue>(att.Key).Value, entity.LogicalName, att.Key);
                    tracingService.Trace($"{att.Key} value is {entity.GetAttributeValue<OptionSetValue>(att.Key).Value}");
                    break;
                case EntityReference entityReference:
                    tracingService.Trace($"Attribute Logical Name : {att.Key} & Type : {att.Value.GetType().ToString()}");
                    tracingService.Trace($"{att.Key} value is {entity.GetAttributeValue<EntityReference>(att.Key).Id}");
                    value = entity.GetAttributeValue<EntityReference>(att.Key).Name.Trim();
                    break;
                case DateTime dt:
                    tracingService.Trace($"Attribute Logical Name : {att.Key} & Type : {att.Value.GetType().ToString()}");
                    //Console.WriteLine($"{att.Key} value is {entity.GetAttributeValue<DateTime>(att.Key).ToString()}");
                    value = $"{entity.GetAttributeValue<DateTime>(att.Key):MMMM dd, yyyy}";
                    break;
                case bool b:
                    tracingService.Trace($"Attribute Logical Name : {att.Key} & Type : {att.Value.GetType().ToString()}");
                    //Console.WriteLine($"{att.Key} value is {entity.GetAttributeValue<bool>(att.Key)}");
                    value = entity.GetAttributeValue<bool>(att.Key).ToString();
                    break;
                case Money m:
                    tracingService.Trace($"Attribute Logical Name : {att.Key} & Type : {att.Value.GetType().ToString()}");
                    //Console.WriteLine($"{att.Key} value is {entity.GetAttributeValue<Money>(att.Key).Value}");
                    value = entity.GetAttributeValue<Money>(att.Key).Value.ToString("C");
                    break;
            }
            return value;
        }

        private string GetOptionSetLabel(IOrganizationService service, int optionSetValue, string entityName, string attributeName)
        {
            RetrieveAttributeRequest retrieveAttributeRequest = new
            RetrieveAttributeRequest
            {
                EntityLogicalName = entityName,
                LogicalName = attributeName,
                RetrieveAsIfPublished = true
            };
            // Execute the request.
            RetrieveAttributeResponse retrieveAttributeResponse = (RetrieveAttributeResponse)service.Execute(retrieveAttributeRequest);
            OptionMetadata[] optionList = null;
            switch (retrieveAttributeResponse.AttributeMetadata)
            {
                case PicklistAttributeMetadata picklistAttributeMetadata:

                    optionList = picklistAttributeMetadata.OptionSet.Options.ToArray();
                    break;
                case StateAttributeMetadata stateAttributeMetadata:

                    optionList = stateAttributeMetadata.OptionSet.Options.ToArray();
                    break;
                case StatusAttributeMetadata statusAttributeMetadata:

                    optionList = statusAttributeMetadata.OptionSet.Options.ToArray();
                    break;
            }
            // Access the retrieved attribute.

            string selectedOptionLabel = string.Empty;

            foreach (OptionMetadata oMD in optionList)
            {
                if (oMD.Value == optionSetValue)
                {
                    selectedOptionLabel = oMD.Label.UserLocalizedLabel.Label;
                    break;
                }
            }

            return selectedOptionLabel;
        }


        private Entity RetrieveDonationTemplateEntity(ITracingService tracingService, IOrganizationService service, EntityReference facilityEntityReference, int templateType)
        {
            tracingService.Trace($"Inside execution of RetrieveDonationTemplateEntity");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.FacilityDonationLetterTemplate.LogicalName,
                ColumnSet = new ColumnSet(Constants.FacilityDonationLetterTemplate.Name, Constants.FacilityDonationLetterTemplate.TemplateContent, Constants.FacilityDonationLetterTemplate.TemplateType, Constants.FacilityDonationLetterTemplate.Facility, Constants.FacilityDonationLetterTemplate.Footer),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.FacilityDonationLetterTemplate.Facility,
                                    Operator = ConditionOperator.Equal,
                                    Values = { facilityEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.FacilityDonationLetterTemplate.TemplateType,
                                    Operator = ConditionOperator.Equal,
                                    Values = { templateType }
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

            EntityCollection templateEntityCollection = service.RetrieveMultiple(query);
            if (templateEntityCollection.Entities.Count > 0)
                return templateEntityCollection.Entities[0];
            else
                return null;
        }
    }
}

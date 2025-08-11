if (typeof CommCare == 'undefined')
{ CommCare = { __namespace: true }; }

if (typeof (CommCare.Contact) == "undefined") {
    CommCare.Contact = {
        __namespace: true
    };
}

if (typeof (CommCare.Contact.OCCFM) == "undefined") {
    CommCare.Contact.OCCFM = {
        __namespace: true
    };
}

if (typeof (CommCare.Contact.Constants) == "undefined") {
    CommCare.Contact.Constants = {
        __namespace: true
    };
}

CommCare.Contact.Constants.BeneficiaryFormId = "bf55bea1-59fa-43f1-8470-216b5e49b66f";
CommCare.Contact.Constants.SummaryFormId = "ada7a6d0-ef87-41e7-8fe9-3a5bcd39afc6";
CommCare.Contact.Constants.VeteranFormId = "99dfbd4f-ac3e-487e-9535-9d48dd7c7c06";

CommCare.Contact.OCCFM = (function () {

    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        //CommCare.Shared.HashHandler();

        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_CustomerNotification");
        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_FMP_Customer_Notification");
        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_mcs_ICQClaimSearch");
        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_FMPClaimSearch");
        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_mcs_DebtorSearch");

        displaySpecialAttentionMessage();
        displayNoClaimsThisYearMessage();
        dontSendMedicareA();
        doNotSaveCustomerNotification();
        enableSSN();
        hideshowFMP();
        handleIntegrationErrors();
        hideshowSpinaBifida();
        
        
    }

    function handleIntegrationErrors() {
        var errorOccurred = CommCare.Shared.GetFieldValue("mcs_integrationerroroccurred");
        var errorMessage = CommCare.Shared.GetFieldValue("mcs_integrationerrormessage");

        if (errorOccurred == true && errorMessage != null) {
            var msg = CommCare.Shared.GetFieldValue("mcs_customernotification");
            if (msg == null) msg = "";
            CommCare.Shared.SetFieldValue("mcs_customernotification", errorMessage + "\n" + msg);
            if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB") != null) {
                if (CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification") != null) {
                    if (CommCare.Shared.GetFieldValue("mcs_customernotification") != null) {
                        CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification").setVisible(true);
                        refreshNotification();
                    }
                    else {
                        if (CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification") != null) {
                            CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification").setVisible(false);
                        }
                    }
                }
            }
        }
        else {
            if (CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification") != null) {
                CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification").setVisible(false);
            }
            
        }
    }

    function hideshowSpinaBifida() {
        var sb = CommCare.Shared.GetFieldValue("hac_spinabifida");
        var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
        //debugger;
        if (sb == true) {
            if (currentFormId != CommCare.Contact.Constants.BeneficiaryFormId) {
                if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB") != null) {
                    if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("CONTACT_INFORMATION") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("CONTACT_INFORMATION").setVisible(false);
                    }

                    if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("DEMOGRAPHIC_INFO_SB") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("DEMOGRAPHIC_INFO_SB").setVisible(true);
                    }
                }

                if (CommCare.Shared.FormContext.ui.tabs.get("ICQ") != null) {
                    if (CommCare.Shared.FormContext.ui.tabs.get("ICQ").sections.get("ICQ_CAT_CAP_INFO") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("ICQ").sections.get("ICQ_CAT_CAP_INFO").setVisible(false);
                    }
                }

                if (CommCare.Shared.FormContext.ui.tabs.get("OhiTab") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("OhiTab").setVisible(false);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("TrueDatesTab") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("TrueDatesTab").setVisible(false);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("Eligibility_Information") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("Eligibility_Information").setVisible(false);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPADDRESSES") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPADDRESSES").setVisible(false);
                }

                // Display notification to user
                //CommCare.Shared.FormContext.ui.setFormNotification("Customer is Spina Bifida. Please transfer to Specialty.", "ERROR");
                var msg = CommCare.Shared.GetFieldValue("mcs_customernotification");
                if (msg == null) msg = "";
                var newMsg = "Patient is Spina Bifida. Please transfer to Specialty.";
                CommCare.Shared.SetFieldValue("mcs_customernotification", newMsg + "\n" + msg);

                if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB") != null) {
                    if (CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification") != null) {
                        if (CommCare.Shared.GetFieldValue("mcs_customernotification") != null) {
                            CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification").setVisible(true);
                            refreshNotification();
                        }
                    }
                }
            }
        }
        else {
            if (currentFormId != CommCare.Contact.Constants.BeneficiaryFormId) {
                if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB") != null) {

                    if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("CONTACT_INFORMATION") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("CONTACT_INFORMATION").setVisible(true);
                    }

                    if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("DEMOGRAPHIC_INFO_SB") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").sections.get("DEMOGRAPHIC_INFO_SB").setVisible(false);
                    }

                    if (CommCare.Shared.FormContext.ui.tabs.get("OhiTab") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("OhiTab").setVisible(true);
                    }
                    if (CommCare.Shared.FormContext.ui.tabs.get("TrueDatesTab") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("TrueDatesTab").setVisible(true);
                    }
                    if (CommCare.Shared.FormContext.ui.tabs.get("Eligibility_Information") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("Eligibility_Information").setVisible(true);
                    }
                }

                if (CommCare.Shared.FormContext.ui.tabs.get("ICQ") != null) {
                    if (CommCare.Shared.FormContext.ui.tabs.get("ICQ").sections.get("ICQ_CAT_CAP_INFO") != null) {
                        CommCare.Shared.FormContext.ui.tabs.get("ICQ").sections.get("ICQ_CAT_CAP_INFO").setVisible(true);
                    }
                }

                // Hide fields
                //CommCare.Shared.FormContext.getControl("hac_claimcatcap").setVisible(true);
                //CommCare.Shared.FormContext.getControl("hac_claimcatcapyear").setVisible(true);
                //CommCare.Shared.FormContext.getControl("hac_champvabeneficiarydeductible").setVisible(true);
                //CommCare.Shared.FormContext.getControl("hac_champvafamilydeductible").setVisible(true);

                //CommCare.Shared.SetVisible("hac_claimcatcap", true);
                //CommCare.Shared.SetVisible("hac_claimcatcapyear", true);
                //CommCare.Shared.SetVisible("hac_champvabeneficiarydeductible", true);
                //CommCare.Shared.SetVisible("hac_champvafamilydeductible", true);
            }
        }
    }

    function refreshNotification() {
        setTimeout(function () {
            var src = CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification").getSrc();
            CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification").setSrc("about:blank");
            CommCare.Shared.FormContext.ui.controls.get("WebResource_CustomerNotification").setSrc(src);
        }, 1000)
    }

    function hideshowFMP() {
        var FMP = CommCare.Shared.GetFieldValue("mcs_fmp");
        var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();

        if (FMP == true) {
            // Assumption is customer is FMP. Display notification to user
            //CommCare.Shared.FormContext.ui.setFormNotification("Customer is FMP. Please transfer to Specialty.", "ERROR");
            var msg = CommCare.Shared.GetFieldValue("mcs_customernotification");
            if (msg == null) msg = "";
            var newMsg = "Patient is FMP. Please transfer to Specialty.";
            CommCare.Shared.SetFieldValue("mcs_customernotification", newMsg + "\n" + msg);

            if (CommCare.Shared.FormContext.ui.tabs.get("TAB_FMP") != null) {
                if (CommCare.Shared.FormContext.ui.controls.get("WebResource_FMP_Customer_Notification") != null) {
                    CommCare.Shared.FormContext.ui.controls.get("WebResource_FMP_Customer_Notification").setVisible(true);
                    refreshNotification();
                }
            }

            if (currentFormId != CommCare.Contact.Constants.BeneficiaryFormId) {
                // Hide other tabs
                if (CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("SUMMARY_TAB").setVisible(false);
                }

                if (CommCare.Shared.FormContext.ui.tabs.get("OhiTab") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("OhiTab").setVisible(false);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("TrueDatesTab") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("TrueDatesTab").setVisible(false);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("Eligibility_Information") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("Eligibility_Information").setVisible(false);
                }
                //if (CommCare.Shared.FormContext.ui.tabs.get("ClaimTab") != null) {
                //    CommCare.Shared.FormContext.ui.tabs.get("ClaimTab").setVisible(false);
                //}
                if (CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPADDRESSES") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPADDRESSES").setVisible(true);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("TAB_CONDITIONS") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("TAB_CONDITIONS").setVisible(true);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPClaimSearch") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPClaimSearch").setVisible(true);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("ICQ") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("ICQ").setVisible(false);
                }
                if (CommCare.Shared.FormContext.ui.tabs.get("PreAuthorizationRequests") != null) {
                    CommCare.Shared.FormContext.ui.tabs.get("PreAuthorizationRequests").setVisible(false);
                }
            }
        }
        else if (currentFormId != CommCare.Contact.Constants.BeneficiaryFormId) {
            // Hide FMP
            if (CommCare.Shared.FormContext.ui.tabs.get("TAB_FMP") != null) {
                CommCare.Shared.FormContext.ui.tabs.get("TAB_FMP").setVisible(false);
            }
            if (CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPADDRESSES") != null) {
                CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPADDRESSES").setVisible(false);
            }
            if (CommCare.Shared.FormContext.ui.tabs.get("TAB_CONDITIONS") != null) {
                CommCare.Shared.FormContext.ui.tabs.get("TAB_CONDITIONS").setVisible(false);
                CommCare.Shared.FormContext.ui.tabs.get("TAB_CONDITIONS").setDisplayState('collapsed');
            }
            if (CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPClaimSearch") != null) {
                CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPClaimSearch").setVisible(false);
                CommCare.Shared.FormContext.ui.tabs.get("TAB_FMPClaimSearch").setDisplayState('collapsed');
            }
        }
    }

    function displayNoClaimsThisYearMessage() {
        var claimCatCapYear = CommCare.Shared.GetFieldValue("hac_claimcatcapyear");
        try {
            var currentYear = (new Date()).getFullYear();
            if (claimCatCapYear !== null && Number(claimCatCapYear) !== currentYear)
                CommCare.Shared.CrmCommonJS.Notification.SetInfo("No claims found for beneficiary in " + currentYear, "NOCLAIMSTHISYEARINFO");
        }
        catch (e) {
            console.log("Error in displayNoClaimsThisYearMessage", e.message);
        }
    }

    function displaySpecialAttentionMessage() {
        var claimCatCapYear = CommCare.Shared.GetFieldValue("hac_specialattentioninfo");
        if (claimCatCapYear !== null) {
            CommCare.Shared.CrmCommonJS.Notification.SetInfo(CommCare.Shared.FormContext.getAttribute("hac_specialattentioninfo").getValue(), "SPECIALATTENTIONINFO");
            //alert(CommCare.Shared.FormContext.getAttribute("hac_specialattentioninfo").getValue());
        }
    }
    function dontSendMedicareA() {
        try {
            //CommCare.Shared.FormContext.getAttribute("hac_relationshiptosponsor").setSubmitMode("never");
            CommCare.Shared.SetSubmitMode("hac_relationshiptosponsor", "never");
        }
        catch (e) {
            console.log("Error in dontSendMedicareA", e.message);
            //alert(e.message + ".  Please contact your system administrator. Submit Mode");
        }
    }

    function enableSSN() {
        try {
            if (CommCare.Shared.FormContext.ui.getFormType() == 1) {
                //var ctrl = CommCare.Shared.FormContext.getControl("hac_ssn");
                //if(ctrl !== null)
                //    ctrl.setDisabled(false);
                CommCare.Shared.SetReadOnly("hac_ssn", false);
            }
        }
        catch (e) {
            console.log("Error in enableSSN: " + e.message);
            //alert(e.message + ".  Please contact your system administrator. Enable SSN");
        }
    }

    function doNotSaveCustomerNotification() {
        try {
            // Do not save customer notification field ever
            CommCare.Shared.SetSubmitMode("mcs_customernotification", "never");
            CommCare.Shared.SetFieldValue("mcs_customernotification", "");
        }
        catch (e) {
            console.log("Error in doNotSaveCustomerNotification(): ", e.message);
        }
    }
})();
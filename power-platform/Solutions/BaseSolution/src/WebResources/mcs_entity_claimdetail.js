/// <reference path="CommCareShared.min.js"/>

if (typeof CommCare == 'undefined')
{ CommCare = { __namespace: true }; }

if (typeof (CommCare.ClaimDetail) == "undefined") {
    CommCare.ClaimDetail = {
        __namespace: true
    };
}


if (typeof (CommCare.ClaimDetail.Global) == "undefined") {
    CommCare.ClaimDetail.Global = {
        __namespace: true
    };
}

CommCare.ClaimDetail.Global = (function () {
    return {
        OnLoad: onLoad
    };

    function onLoad(context) {
        
        showhideControls(context);
        
    }

    function showhideControls(context) {
        CommCare.Shared.GetFormContext(context);
        //CommCare.Shared.HashHandler();

        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_DisplayEOB");

        var isEOBSpecified = CommCare.Shared.GetFieldValue("hac_eobspecified");
        if (isEOBSpecified != null) {
            isEOBSpecified = isEOBSpecified.toLowerCase();
        }
        

        var setVisible = isEOBSpecified == null ? false
            : isEOBSpecified == "true" ? true
            : false;

        var tabObj = CommCare.Shared.FormContext.ui.tabs.get("ClaimPPR");
        tabObj.setVisible(setVisible);

        var beneficiaryID = CommCare.Shared.GetFieldValue("hac_beneficiaryid");
        if (beneficiaryID != null) {
            var beneID = beneficiaryID[0].id.replace("{", "").replace("}", "").toLowerCase();
            var columns = "hac_dfn,hac_bfn,hac_spinabifida";

            CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(beneID, "contacts", columns, null).then(function (result) {
                var spinaBifida = result["hac_spinabifida"];

                // Do not display the following fields for Spina Bifida beneficiary
                if (spinaBifida == true) {
                    console.log("Hiding fields for spina bifida beneficiary");

                    CommCare.Shared.SetVisible("mcs_champvabeneficiarydeductible", false);
                    CommCare.Shared.SetVisible("mcs_champvafamilydeductible", false);
                    CommCare.Shared.SetVisible("mcs_champvafamilycatastrophiccap", false);
                    CommCare.Shared.SetVisible("mcs_deductible", false);
                    CommCare.Shared.SetVisible("mcs_costshare", false);
                    CommCare.Shared.SetVisible("mcs_ohipaid", false);
                    CommCare.Shared.SetVisible("mcs_patientresponsibilityamount", false);
                    CommCare.Shared.SetVisible("mcs_beneficiarypaid", false);
                    CommCare.Shared.SetVisible("mcs_medicaidpaid", false);
                }
            }).catch(function (error) {
                console.log("Error retrieving contact record: " + error.message);
                console.log(error);
            });
        }
    }
})();
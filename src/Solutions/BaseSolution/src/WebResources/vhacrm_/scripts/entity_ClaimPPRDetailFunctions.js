if (typeof CommCare == 'undefined')
{ CommCare = { __namespace: true }; }

if (typeof (CommCare.ClaimPPRDetail) == "undefined") {
    CommCare.ClaimPPRDetail = {
        __namespace: true
    };
}


CommCare.ClaimPPRDetail = (function () {

    function onLoad(context) {
		CommCare.Shared.GetFormContext(context);
        //outpatientHospitalSection = 806,860,002 = PPRProcedureLine
        if (CommCare.Shared.FormContext.getAttribute("hac_pprdetailtype").getValue() === "PPRProcedureLine") {
            CommCare.Shared.FormContext.getAttribute("hac_pprtype").setValue(806860002);
        }
        //inpatientSection = 806,860,001 = PPRItemLine
        if (CommCare.Shared.FormContext.getAttribute("hac_pprdetailtype").getValue() === "PPRItemLine") {
            CommCare.Shared.FormContext.getAttribute("hac_pprtype").setValue(806860001);
        }
        //pharmacySection = 806,860,000 = PPRDiagnosisLine
        if (CommCare.Shared.FormContext.getAttribute("hac_pprdetailtype").getValue() === "PPRDiagnosisLine") {
            CommCare.Shared.FormContext.getAttribute("hac_pprtype").setValue(806860000);
        }
        //durableMedicalEquipmentSection = 806,860,003 = PPRDeliveryLine
        if (CommCare.Shared.FormContext.getAttribute("hac_pprdetailtype").getValue() === "PPRDeliveryLine") {
            CommCare.Shared.FormContext.getAttribute("hac_pprtype").setValue(806860003);
        }
        //pharmacySection = 806,860,000 = PPRNDCLine
        if (CommCare.Shared.FormContext.getAttribute("hac_pprdetailtype").getValue() === "PPRNDCLine") {
            CommCare.Shared.FormContext.getAttribute("hac_pprtype").setValue(806860000);
        }

    }
    function ShowSection(strSectionName, bShow) {
        CommCare.Shared.FormContext.ui.tabs.get("lineItemPPRTab").sections.get(strSectionName).setVisible(bShow);
    }
    //Public Interface
    return {
        OnLoad: onLoad,
        ShowSection: ShowSection
    };
})();
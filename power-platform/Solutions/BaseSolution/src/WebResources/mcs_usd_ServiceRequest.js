function setCaseField(context, CaseId, CaseTitle, SSN) {
    if (Xrm.Page.ui.getFormType() == 1) {
        var caseLookupValue = [];
        var caseEntityReference = {};

        caseEntityReference.id = CaseId;
        caseEntityReference.name = CaseTitle;
        caseEntityReference.entityType = "incident";
        caseLookupValue[0] = caseEntityReference;

        Xrm.Page.getAttribute("regardingobjectid").setValue(caseLookupValue);

        Xrm.Page.getAttribute("hac_authorizationnumber").setValue(SSN);
    }
}

function SaveServiceRequest(context) {
    Xrm.Page.data.entity.save();
}
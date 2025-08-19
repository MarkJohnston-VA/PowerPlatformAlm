if (typeof (patient) == "undefined") { patient = {}; }
// Create Namespace container for functions in this library;
patient.contact = {};
patient.contact.FORM_TYPE_CREATE = 1;
patient.contact.FORM_TYPE_UPDATE = 2;
patient.contact.FORM_TYPE_READ_ONLY = 3;
patient.contact.FORM_TYPE_DISABLED = 4;

patient.contact.onLoad = function (executioncontext) {
    var formContext = executioncontext.getFormContext();
    var globalContext = Xrm.Utility.getGlobalContext();


    var IFRAME = formContext.getControl("IFRAME_demo");
    var entityId = formContext.data.entity.getId();
    var realURL = entityId.substring(1, 37);
    var newUrl = globalContext.getClientUrl() + "/main.aspx?cmdbar=false&navbar=off&forceUCI=0&pagetype=entityrecord&etn=mcs_demographic&id=" + realURL;


    IFRAME.setSrc(newUrl);

};
patient.contact.eligTab = function (executioncontext) {
    var formContext = executioncontext.getFormContext();
    var globalContext = Xrm.Utility.getGlobalContext();


    var IFRAME = formContext.getControl("IFRAME_Eligibility");
    var entityId = formContext.data.entity.getId();
    var realURL = entityId.substring(1, 37);
    var newUrl = globalContext.getClientUrl() + "/main.aspx?cmdbar=false&navbar=off&forceUCI=0&pagetype=entityrecord&etn=mcs_eligibility&id=" + realURL;
    IFRAME.setSrc(newUrl);
};
patient.contact.enrollmentTab = function (executioncontext) {
    var formContext = executioncontext.getFormContext();
    var globalContext = Xrm.Utility.getGlobalContext();

    var IFRAME = formContext.getControl("IFRAME_enrollment");
    var entityId = formContext.data.entity.getId();
    var realURL = entityId.substring(1, 37);
    var newUrl = globalContext.getClientUrl() + "/main.aspx?cmdbar=false&navbar=off&forceUCI=0&pagetype=entityrecord&etn=mcs_enrollment&id=" + realURL;
    IFRAME.setSrc(newUrl);
};
patient.contact.clinicalTab = function (executioncontext) {
    var formContext = executioncontext.getFormContext();

    var globalContext = Xrm.Utility.getGlobalContext();
    var IFRAME = formContext.getControl("IFRAME_Clinical");
    var entityId = formContext.data.entity.getId();
    var realURL = entityId.substring(1, 37);
    var newUrl = globalContext.getClientUrl() + "/main.aspx?cmdbar=false&navbar=off&forceUCI=0&pagetype=entityrecord&etn=mcs_clinical&id=" + realURL;
    IFRAME.setSrc(newUrl);
};

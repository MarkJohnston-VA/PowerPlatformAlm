/// <reference path="CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.Response) == "undefined") {
    CommCare.Response = {
        __namespace: true
    };
}

if (typeof (CommCare.Response.Global) == "undefined") {
    CommCare.Response.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.Response.Constants) == "undefined") {
    CommCare.Response.Constants = {
        __namespace: true
    };
}

CommCare.Response.Global = (function () {
    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        showHideWHHLSectionAndFields();
        CommCare.Shared.SetOnChange("mcs_whhltemplate", showHideWHHLSectionAndFields);
    }

    function showHideWHHLSectionAndFields() {
        var isWHHL = CommCare.Shared.GetFieldValue("mcs_whhltemplate");
        console.log("Statuscode: " + CommCare.Shared.GetFieldValue("statuscode"));
        var requireWHHL = isWHHL == true ? "required" : "none";
        var requireResponse = isWHHL == true ? "none" : "required";
        if (isWHHL == true) {
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("WHHLResponse").setVisible(true);
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Response").setVisible(false);
        } else if (isWHHL == false) {
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("WHHLResponse").setVisible(false);
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Response").setVisible(true);
        }
    }
})();
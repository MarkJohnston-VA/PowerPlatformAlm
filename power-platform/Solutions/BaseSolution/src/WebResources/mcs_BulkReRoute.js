/// <reference path="Common/CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.BulkReRoute) == "undefined") {
    CommCare.BulkReRoute = {
        __namespace: true
    };
}

if (typeof (CommCare.BulkReRoute.Global) == "undefined") {
    CommCare.BulkReRoute.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.BulkReRoute.Constants) == "undefined") {
    CommCare.BulkReRoute.Constants = {
        __namespace: true
    };
}

CommCare.BulkReRoute.Constants.RR_SUPERVISOR = "DA494801-E41E-E711-942D-0050568D1C17";

CommCare.BulkReRoute.Global = (function () {

    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        console.log(CommCare.Shared.GetFieldValue("mcs_owningteam"));
        preFilterRouteActionLookup();
        CommCare.Shared.FormContext.data.entity.addOnSave(showProgressIndicator);
        CommCare.Shared.FormContext.data.entity.addOnPostSave(promptRefresh);
    }

    function showProgressIndicator() {
        Xrm.Utility.showProgressIndicator("Rerouting tasks...");
    }

    function promptRefresh() {
        Xrm.Utility.closeProgressIndicator();
        var alertStrings = { text: "Selected items are now Re-Routed. Please refresh the view to see the changes.", title: "Bulk Re-Route Complete" };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }

    function preFilterRouteActionLookup() {
        CommCare.Shared.FormContext.getControl("mcs_routeaction").addPreSearch(function () {
            setRouteActionPrefilter();
        });
    }

    function setRouteActionPrefilter() {
        var owningTeam = CommCare.Shared.GetFieldValue("mcs_owningteam");
        var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles["_collection"];
        var isSup = false;
        for (const roleId in userRoles) {
            console.log(roleId.toUpperCase());
            console.log(roleId.toUpperCase() == CommCare.BulkReRoute.Constants.RR_SUPERVISOR);
            if (roleId.toUpperCase() == CommCare.BulkReRoute.Constants.RR_SUPERVISOR) {
                isSup = true;
                break;
            }
        }
        var fetchXml = "";
        console.log("isSup: " + isSup);
        if (isSup) {
            fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='hac_owner_teamid' operator='eq' value='" + owningTeam + "' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='a9c7b284-f0e3-e611-9427-0050568d1c17' />\
                                </filter>";
        }
        else {
            fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='hac_owner_teamid' operator='eq' value='" + owningTeam + "' />\
                                  <condition attribute='mcs_leadonly' operator='ne' value='1' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='a9c7b284-f0e3-e611-9427-0050568d1c17' />\
                                </filter>";
        }
        console.log(fetchXml);
        CommCare.Shared.FormContext.getControl("mcs_routeaction").addCustomFilter(fetchXml);
    }
})();
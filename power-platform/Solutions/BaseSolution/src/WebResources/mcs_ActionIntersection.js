/// <reference path="CommCareShared.min.js"/>

if (typeof CommCare == 'undefined')
{ CommCare = { __namespace: true }; }

if (typeof (CommCare.ActionIntersection) == "undefined") {
    CommCare.ActionIntersection = {
        __namespace: true
    };
}


if (typeof (CommCare.ActionIntersection.Global) == "undefined") {
    CommCare.ActionIntersection.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.ActionIntersection.Constants) == "undefined") {
    CommCare.ActionIntersection.Constants = {
        __namespace: true
    };
}

CommCare.ActionIntersection.Constants.RouteType = {
	DCU: 803750000,
	Facility: 803750001,
	Queue: 806860000,
	TPL: 803750003,
	Team: 806860001,
	VISN: 803750002,
	TeamInsideOfQueue: 803750004,
    Other: 806860002,
    StatusUpdate: 803750005,
    Hub: 803750006
};

CommCare.ActionIntersection.Global = (function () {
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        var fetchXml = "<fetch><entity name='role'><attribute name='name'/><attribute name='roleid'/><filter type='and'><condition attribute='name' operator='eq' value='system administrator'/></filter></entity></fetch>";

        setOnChangeHandlers();
        showHideBasedOnRouteType();
        
        CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
        CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("roles", fetchXml).then(function (role) {
            if (role.value.length > 0) {
                var isAdmin = false
                var adminRoleId = role.value[0].roleid;
                var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles["_collection"];
                for (const roleId in userRoles) {
                    if (roleId.toUpperCase() == adminRoleId.toUpperCase()) {
                        isAdmin = true;
                        break;
                    }
                }
                console.log("isAdmin: " + isAdmin);
                var fieldList = ["vhacrm_nvcconboardingaction_bool", "vhacrm_queueid"];
                setReadOnlyOnMultipleFields(fieldList, !isAdmin);
            }

        }).catch(function (error) {
            console.log("Error in Getting System Administrator Role: " + error.message);
        });

        invokeBusinessRules();
    }

    function showHideBasedOnRouteType() {
        if (CommCare.Shared.GetFieldValue("hac_routetype_code") == CommCare.ActionIntersection.Constants.RouteType.StatusUpdate) {
            CommCare.Shared.SetVisible("mcs_statusupdate", true);
        } else if (CommCare.Shared.GetFieldValue("hac_routetype_code") == CommCare.ActionIntersection.Constants.RouteType.Hub) {
            CommCare.Shared.SetVisible("mcs_newaction", true);
            CommCare.Shared.SetVisible("mcs_newpurpose", true);
            CommCare.Shared.SetVisible("mcs_newpurposedetail", true);
            CommCare.Shared.SetVisible("mcs_sendbacktofacility", true);
            CommCare.Shared.SetVisible("mcs_newprogram", true);
            CommCare.Shared.SetVisible("mcs_newtype", true);

            CommCare.Shared.SetVisible("hac_route_teamid", false);
            CommCare.Shared.SetVisible("mcs_statusupdate", false);
        } else {
            CommCare.Shared.SetVisible("mcs_statusupdate", false);
            CommCare.Shared.SetVisible("vhacrm_queueid", false);
            CommCare.Shared.SetVisible("mcs_newaction", false);
            CommCare.Shared.SetVisible("mcs_newpurpose", true);
            CommCare.Shared.SetVisible("mcs_newpurposedetail", false);
            CommCare.Shared.SetVisible("mcs_sendbacktofacility", false);
            CommCare.Shared.SetVisible("mcs_newprogram", false);
            CommCare.Shared.SetVisible("mcs_newtype", false);
        }
    }

    

    function invokeBusinessRules() {
    	brMakeQueueOrTeamRequired();
    	brShowRouteTypeAndMakeRequired();
    }

    function setOnChangeForMultipleFields(fieldList, functionName) {
    	for (var i = 0; i < fieldList.length; i++) {
    		CommCare.Shared.SetOnChange(fieldList[i], functionName);
    	}
    }

    function setOnChangeHandlers() {
        if (CommCare.Shared.FormContext.getAttribute("hac_routetype_code") != null) {
            CommCare.Shared.FormContext.getAttribute("hac_routetype_code").addOnChange(showHideBasedOnRouteType);
            setOnChangeForMultipleFields(["hac_routetype_code"], brMakeQueueOrTeamRequired);
        }
        
    	setOnChangeForMultipleFields(["hac_routingaction_bool"], brShowRouteTypeAndMakeRequired);
    }

    function setReadOnlyOnMultipleFields(fieldList, bool) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.SetReadOnly(fieldList[i], bool);
        }
    }

    function brMakeQueueOrTeamRequired() {
    	var routeType = {
    		schemaName: "hac_routetype_code",
    		attr: CommCare.Shared.FormContext.getAttribute("hac_routetype_code"),
    		control: CommCare.Shared.FormContext.getControl("hac_routetype_code"),
    		value: CommCare.Shared.GetFieldValue("hac_routetype_code")
    	};

    	var queue = {
    		schemaName: "vhacrm_queueid",
    		attr: CommCare.Shared.FormContext.getAttribute("vhacrm_queueid"),
    		control: CommCare.Shared.FormContext.getControl("vhacrm_queueid"),
    		value: CommCare.Shared.GetFieldValue("vhacrm_queueid")
    	};

    	var team = {
    		schemaName: "hac_route_teamid",
    		attr: CommCare.Shared.FormContext.getAttribute("hac_route_teamid"),
    		control: CommCare.Shared.FormContext.getControl("hac_route_teamid"),
    		value: CommCare.Shared.GetFieldValue("hac_route_teamid")
    	};

    	if (routeType.value === CommCare.ActionIntersection.Constants.RouteType.Queue) {
    		CommCare.Shared.SetVisible(queue.schemaName, true);
    		CommCare.Shared.SetRequired(queue.schemaName, "required");

    		CommCare.Shared.SetVisible(team.schemaName, false);
    		CommCare.Shared.SetRequired(team.schemaName, "none");
    	}
    	else if (routeType.value === CommCare.ActionIntersection.Constants.RouteType.Team) {
    		CommCare.Shared.SetVisible(team.schemaName, true);
    		CommCare.Shared.SetRequired(team.schemaName, "required");

    		CommCare.Shared.SetVisible(queue.schemaName, false);
    		CommCare.Shared.SetRequired(queue.schemaName, "none");
    	}
    	else if (routeType.value === CommCare.ActionIntersection.Constants.RouteType.TeamInsideOfQueue) {
    		CommCare.Shared.SetVisible(team.schemaName, true);
    		CommCare.Shared.SetRequired(team.schemaName, "required");

    		CommCare.Shared.SetVisible(queue.schemaName, true);
    		CommCare.Shared.SetRequired(queue.schemaName, "required");
        }
        else if (routeType.value === CommCare.ActionIntersection.Constants.RouteType.Hub) {
            CommCare.Shared.SetVisible(queue.schemaName, true);
            CommCare.Shared.SetRequired(queue.schemaName, "none");

            CommCare.Shared.SetVisible(team.schemaName, false);
            CommCare.Shared.SetRequired(team.schemaName, "none");
        }
    	else {
    		CommCare.Shared.SetVisible(queue.schemaName, false);
    		CommCare.Shared.SetRequired(queue.schemaName, "none");
    		CommCare.Shared.SetVisible(team.schemaName, false);
    		CommCare.Shared.SetRequired(team.schemaName, "none");
    	}
    }

    function brShowRouteTypeAndMakeRequired() {
    	var routingAction = {
    		schemaName: "hac_routingaction_bool",
    		attr: CommCare.Shared.FormContext.getAttribute("hac_routingaction_bool"),
    		control: CommCare.Shared.FormContext.getControl("hac_routingaction_bool"),
    		value: CommCare.Shared.GetFieldValue("hac_routingaction_bool")
    	};

    	var routeType = {
    		schemaName: "hac_routetype_code",
    		attr: CommCare.Shared.FormContext.getAttribute("hac_routetype_code"),
    		control: CommCare.Shared.FormContext.getControl("hac_routetype_code"),
    		value: CommCare.Shared.GetFieldValue("hac_routetype_code")
    	};

    	var queue = {
    		schemaName: "vhacrm_queueid",
    		attr: CommCare.Shared.FormContext.getAttribute("vhacrm_queueid"),
    		control: CommCare.Shared.FormContext.getControl("vhacrm_queueid"),
    		value: CommCare.Shared.GetFieldValue("vhacrm_queueid")
    	};

    	var team = {
    		schemaName: "hac_route_teamid",
    		attr: CommCare.Shared.FormContext.getAttribute("hac_route_teamid"),
    		control: CommCare.Shared.FormContext.getControl("hac_route_teamid"),
    		value: CommCare.Shared.GetFieldValue("hac_route_teamid")
    	};

    	if (routingAction.value === true) {
    		CommCare.Shared.SetVisible(routeType.schemaName, true);
    		CommCare.Shared.SetRequired(routeType.schemaName, "required");
    	}
    	else {
    		CommCare.Shared.SetVisible(routeType.schemaName, false);
            CommCare.Shared.SetRequired(routeType.schemaName, "none");
            CommCare.Shared.SetVisible(queue.schemaName, false);
            CommCare.Shared.SetRequired(queue.schemaName, "none");
    		
    		CommCare.Shared.SetVisible(team.schemaName, false);
    		CommCare.Shared.SetRequired(team.schemaName, "none");
    	}
    }
})();
/// <reference path="Common/CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.ActionItem) == "undefined") {
    CommCare.ActionItem = {
        __namespace: true
    };
}

if (typeof (CommCare.ActionItem.Global) == "undefined") {
    CommCare.ActionItem.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.ActionItem.Constants) == "undefined") {
    CommCare.ActionItem.Constants = {
        __namespace: true
    };
}

CommCare.ActionItem.Constants.PatsROutcomes = {
    Approved: 803750000,
    Disapproved: 803750001,
    Founded: 803750002,
    Unfounded: 803750003
}

CommCare.ActionItem.Constants.StatusReason = {
    Open: 1,
    ReadyForApproval: 803750000,
    Approved: 803750001,
    ResponseSent: 803750004,
    Reopened: 803750003,
    Inactive: 2,
    ResponseSentToRequestor: 803750002,
    RejectToPATSR: 803750005,
    PendingPATSRApproval: 803750006,
    RejectedByPATSR: 803750007,
    SendToAUSH: 803750008,
    SendToDAUSH: 803750009,
    Rejected: 803750010,
    ApprovedTo16: 803750011,
    SendToEO: 803750012
}

CommCare.ActionItem.Constants.YesNo = {
    Yes: 806860000,
    No: 806860001
}

CommCare.ActionItem.Constants.StateCode = {
    Active: 0,
    Inactive: 1
}

CommCare.ActionItem.Constants.OverDueReasons = {
    AdditionalClarificationNeeded: 803750000,
    ConfusionOnPOCs: 803750001,
    CoordinationOfMultipleDepartmentsNeeded: 803750002,
    DelayDueToEncryptionIssues: 803750003,
    DelayDueToTPAResponseNeeded: 803750004,
    DifficultyTrackingDownInformation: 803750005,
    ExtensionRequestNotProvided: 803750006,
    FileSizeDelay: 803750007,
    IncorrectInformationProvidedInRequest: 803750008,
    IncorrectRouting: 803750009,
    LackOfSMEAvailability: 803750010,
    NoExplanationProvided: 803750011,
    NotMarkedCompleteOnCompletedDate: 803750012,
    ProviderOutreachDelay: 803750013,
    ShortTurnaround: 803750014,
    Other: 803750015
}

CommCare.ActionItem.Constants.FrontOfficeTeam = "2d9ad717-246a-eb11-a812-001dd800a140";
CommCare.ActionItem.Constants.AUSHTeam = "257bc50b-9e76-ed11-81ab-001dd80701be";
CommCare.ActionItem.Constants.DAUSHTeam = "da75dba6-9e76-ed11-81ab-001dd80701be";
CommCare.ActionItem.Constants.ExecutiveOfficerTeam = "9e40f033-69cd-ec11-983e-001dd8031ffe";
CommCare.ActionItem.Constants.FormType = null;
CommCare.ActionItem.Constants.GlobalRequestorGroupFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";
CommCare.ActionItem.Constants.GlobalAssignedToFetch = "";

CommCare.ActionItem.Global = (function () {
    //Public functions
    return {
        OnLoad: onLoad,
        LockWHHLResponseFields: lockWHHLResponseFields
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        console.log("gotContext");

        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_PersonSearchAIT");
        var formType = CommCare.Shared.FormContext.ui.getFormType();

        //On Load Events
        showHideRequestorGroupFields();
        showHideReopenReason();
        showHideResponseSentFields();
        setFormLocks();
        showHidePatsTabs();
        showHideRejectionReason();
        showHideWHHLResolutionFields();
        showHidePatsRejectionReason();
        showHideUnresolvedFields();
        showHideTreatmentStatusSubType();
        setTreatmentStatusPreFilter();
        showHideMPIHTML();
        showHideComments();
        removeRejectToPatsStatusForNonPats();
        defaultOwningTeam();
        showHideMetadataTabs();
        buildPreFilterFetchXml();
        prefilterRequestorGroup();
        lockOwnerWhenCreatedViaEmail();
        buildAssignedToPreFilter();
        showHideOverdueReason();
        showHideOtherDetails();
        addRemoveBlockAttestationSave();
        showHideAttestationSection();

        if (formType != CommCare.Shared.Constants.CREATE_FORM)
            checkForInactiveRecordsInActionItemChain();

        //On Change Events
        var fieldList = ["mcs_requestorgroup"];
        setOnChangeForMultipleFields(fieldList, showHideRequestorGroupFields);
        CommCare.Shared.SetOnChange("mcs_receiveddate", disallowFutureReceivedDate);
        CommCare.Shared.SetOnChange("mcs_originatorduedate", disallowPastOriginatorDueDates);
        CommCare.Shared.SetOnChange("mcs_frontofficeduedate", disallowPastFrontOfficeDueDates);
        CommCare.Shared.SetOnChange("mcs_treatmentstatus", showHideTreatmentStatusSubType);
        CommCare.Shared.SetOnChange("mcs_treatmentstatus", clearSubTypeOnChangeOfTreatmentStatus);
        CommCare.Shared.SetOnChange("statuscode", showHideWHHLResolutionFields);
        CommCare.Shared.SetOnChange("statuscode", showHideRejectionReason);
        CommCare.Shared.SetOnChange("statuscode", addRemoveBlockAttestationSave);
        CommCare.Shared.SetOnChange("statuscode", showHideAttestationSection);
        CommCare.Shared.SetOnChange("ownerid", showHideRejectionReason);
        CommCare.Shared.SetOnChange("statuscode", showHideResponseSentFields);
        CommCare.Shared.SetOnChange("statuscode", showHideReopenReason);
        CommCare.Shared.SetOnChange("mcs_setsubmitteraspointofcontact", setPOCUserData);
        CommCare.Shared.SetOnChange("mcs_requestorgroup", showHideMetadataTabs);
        CommCare.Shared.SetOnChange("mcs_pointofcontactphonenumber", validatePOCPhoneNumber);
        CommCare.Shared.SetOnChange("ownerid", showHideComments);
        CommCare.Shared.SetOnChange("statuscode", showHideComments);
        CommCare.Shared.SetOnChange("statuscode", showHideOverdueReason);
        CommCare.Shared.SetOnChange("mcs_originatorduedate", showHideOverdueReason);
        CommCare.Shared.SetOnChange("mcs_frontofficeduedate", showHideOverdueReason);
        CommCare.Shared.SetOnChange("mcs_overduereason", showHideOtherDetails);
        CommCare.Shared.SetOnChange("mcs_attestation1", addRemoveBlockAttestationSave);
        CommCare.Shared.SetOnChange("mcs_attestation2", addRemoveBlockAttestationSave);
        CommCare.Shared.SetOnChange("mcs_attestation3", addRemoveBlockAttestationSave);

        

        //On Save Events
        CommCare.Shared.FormContext.data.entity.addOnPostSave(lockFormWhenRejected);
        CommCare.Shared.FormContext.data.entity.addOnSave(form_OnSave);
        
    }

    function checkForInactiveRecordsInActionItemChain() {
        var NoActionStatusCodeActionItem = 803750013;
        var NoActionStatusCodeTasker = 803750008;
        var NoActionStatusCodeDirTask = 803750010;
        var patsRId = CommCare.Shared.GetFieldValue("mcs_patsrid");
        var actionItemId = CommCare.Shared.FormContext.data.entity.getId();
        var oData = "?$select=mcs_trackerid,statecode,statuscode&$expand=mcs_mcs_tracker_mcs_taskertask_ActionItem($select=statecode,statuscode,mcs_name),mcs_mcs_tracker_mcs_trackeritem_ActionItem($select=statecode,statuscode,mcs_name)";
        
        Xrm.WebApi.retrieveRecord("mcs_tracker", actionItemId, oData).then((result) => {
            var aiState = result.statecode;
            var aiStatus = result.statuscode;
            var taskers = result.mcs_mcs_tracker_mcs_trackeritem_ActionItem;
            var dirTasks = result.mcs_mcs_tracker_mcs_taskertask_ActionItem;

            var inactiveTaksers = taskers.filter(x => x.statecode != 0 && x.statuscode != NoActionStatusCodeTasker);
            var inactiveDirTasks = dirTasks.filter(x => x.statecode != 0 && x.statuscode != NoActionStatusCodeDirTask);
            var inactiveAI = aiState != 0 && aiStatus != NoActionStatusCodeActionItem;

            if (!!patsRId || inactiveAI || inactiveTaksers.length > 0 || inactiveDirTasks.length > 0)
                CommCare.Shared.SetReadOnly("mcs_whhltemplate", true);
            else
                CommCare.Shared.SetReadOnly("mcs_whhltemplate", false);
        }).catch((e) => {
            console.log(e);
        });
    }

    function form_OnSave(context) {
        if (validatePOCPhoneNumber() == false) {
            console.log("Invalid Phone Number.  Stopping form save.");
            context.getEventArgs().preventDefault();
        }
    }

    function setFormLocks() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.ActionItem.Constants.StatusReason.PendingPATSRApproval || status == CommCare.ActionItem.Constants.StatusReason.RejectToPATSR) {
            CommCare.Shared.LockForm();            
        } else
        {
            
            lockWHHLResponseFields();
            //CommCare.Shared.SetOnChange("statuscode", lockWHHLResponseFields);
            unlockDueDate13FrontOffice();
            lockStatusReason();
            CommCare.Shared.FormContext.data.entity.addOnSave(lockWHHLResponseFields);
            CommCare.Shared.SetOnChange("statuscode", lockFormWhenPendingPatsApproval);
            CommCare.Shared.FormContext.data.entity.addOnPostSave(lockFormWhenPendingPatsApproval);
            lockGeneralDetails();
        }
    }

    function lockFormWhenRejected() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.ActionItem.Constants.StatusReason.RejectToPATSR) {
            CommCare.Shared.LockForm();
        }
    }

    function lockGeneralDetails() {
        //if patsrid != null
        var patsRId = CommCare.Shared.GetFieldValue("mcs_patsrid");

        if (!!patsRId) {
            //Moved handling of whhl template to single function
            //CommCare.Shared.SetReadOnly("mcs_whhltemplate", true);
            //CommCare.Shared.SetReadOnly("mcs_missionact", true);
            
            CommCare.Shared.SetReadOnly("mcs_name", true);
            CommCare.Shared.SetReadOnly("mcs_receiveddate", true);
            CommCare.Shared.SetReadOnly("mcs_originatorduedate", true);
            CommCare.Shared.SetReadOnly("mcs_requestorgroup", true);
            CommCare.Shared.SetRequired("mcs_treatmentstatus", true);
        } else {
            CommCare.Shared.SetVisible("mcs_missionact", false);
            CommCare.Shared.SetVisible("mcs_treatmentstatus", false);
        }
    }

    function lockFormWhenPendingPatsApproval() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.ActionItem.Constants.StatusReason.PendingPATSRApproval) {
            CommCare.Shared.LockForm();
            console.log(fName + " complete");
        }
    }

    function showHideUnresolvedFields() {
        var showPatientPerception = false;
        if (CommCare.Shared.GetFieldValue("mcs_patientperception") != null) {
            showPatientPerception = true;
        }

        var showUnresolvedReason = false;
        if (CommCare.Shared.GetFieldValue("mcs_unresolvedreason") != null) {
            showUnresolvedReason = true;
        }

        var showUnresolvedDetails = false;
        if (CommCare.Shared.GetFieldValue("mcs_unresolveddetails") != null) {
            showUnresolvedDetails = true;
        }

        CommCare.Shared.SetVisible("mcs_patientperception", showPatientPerception);
        CommCare.Shared.SetVisible("mcs_unresolvedreason", showUnresolvedReason);
        CommCare.Shared.SetVisible("mcs_unresolveddetails", showUnresolvedDetails);
    }

    function showHideWHHLResolutionFields() {
        var patsRId = CommCare.Shared.GetFieldValue("mcs_patsrid");
        var whhlJson = CommCare.Shared.GetFieldValue("mcs_whhlresolutioncomponents");
        var status = CommCare.Shared.GetFieldValue("statuscode");
        try {
            if (patsRId != null && whhlJson != null) {
                console.log(whhlJson);
                var whhlObj = JSON.parse(whhlJson);
                console.log(whhlObj["Fields"]);
                for (var i = 0; i < whhlObj["Fields"].length; i++) {
                    var fieldObject = whhlObj["Fields"][i];
                    var fieldName = fieldObject["FieldName"];
                    switch (fieldName) {
                        case "mcs_dateveterancontacted":
                            fieldName = "mcs_dateofreport";
                            break;
                        case "mcs_statementoftheissueandstatus":
                            fieldName = "mcs_briefstatementofissueandstatus";
                            break;
                        case "mcs_pointofcontact":
                            fieldName = "mcs_forfurtherinformationcontact";
                            break;
                    }
                    //console.log(fieldObject);
                    if (fieldObject["Show"] == true) {
                        CommCare.Shared.SetVisible(fieldName, true);

                        if (fieldObject["Require"] == true && (status == CommCare.ActionItem.Constants.StatusReason.Approved || status == CommCare.ActionItem.Constants.StatusReason.ResponseSent )) {
                            CommCare.Shared.SetRequired(fieldName, true);
                        } else {
                            CommCare.Shared.SetRequired(fieldName, false);
                        }
                    } else {
                        CommCare.Shared.SetVisible(fieldName, false);
                        CommCare.Shared.SetRequired(fieldName, false);
                    }
                }

                try {
                    if (whhlObj["Outcomes"].length > 0) {
                        var outcomeOptionSetControl = CommCare.Shared.FormContext.getControl("mcs_patsroutcome");
                        var approvedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.ActionItem.Constants.PatsROutcomes.Approved);
                        var disApprovedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.ActionItem.Constants.PatsROutcomes.Disapproved);
                        var foundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.ActionItem.Constants.PatsROutcomes.Founded);
                        var unfoundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.ActionItem.Constants.PatsROutcomes.Unfounded);
                        outcomeOptionSetControl.clearOptions();
                        for (var i = 0; i < whhlObj["Outcomes"].length; i++) {
                            switch (whhlObj["Outcomes"][i]) {
                                case "Approved":
                                    outcomeOptionSetControl.addOption(approvedValue);
                                    break;
                                case "Disapproved":
                                    outcomeOptionSetControl.addOption(disApprovedValue);
                                    break;
                                case "Founded":
                                    outcomeOptionSetControl.addOption(foundedValue);
                                    break;
                                case "Unfounded":
                                    outcomeOptionSetControl.addOption(unfoundedValue);
                                    break;
                            }
                        }
                    }
                } catch (ex) {
                    console.log("exception in outcomes: " + ex.message);
                }
                
            } else {
                showHideWHHLSections();
            }
        } catch (ex) {
            console.log(ex);
            showHideWHHLSections();
        }        
    }

    function showHidePatsRejectionReason() {
        var patsRejectionReason = CommCare.Shared.GetFieldValue("mcs_patsrrejectreason");
        
        if (patsRejectionReason != null) {
            CommCare.Shared.FormContext.ui.tabs.get("Responses").sections.get("PATSRRejectReason").setVisible(true);
        } else {
            CommCare.Shared.FormContext.ui.tabs.get("Responses").sections.get("PATSRRejectReason").setVisible(false);
        }
    }

    function showHideRejectionReason() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        var showMcs_reasonforrejection = false;
        if (status == CommCare.ActionItem.Constants.StatusReason.RejectToPATSR) {
            showMcs_reasonforrejection = true;
        }
        CommCare.Shared.SetVisible("mcs_rejectionreason", showMcs_reasonforrejection);
        CommCare.Shared.SetRequired("mcs_rejectionreason", showMcs_reasonforrejection);
        CommCare.Shared.SetVisible("mcs_reasonforrejection", showMcs_reasonforrejection);
        CommCare.Shared.SetRequired("mcs_reasonforrejection", showMcs_reasonforrejection);

        var showRejectReason = false;
        if (status == CommCare.ActionItem.Constants.StatusReason.Rejected && owner != CommCare.ActionItem.Constants.FrontOfficeTeam) {
            showRejectReason = true;
        }

        CommCare.Shared.SetVisible("mcs_rejectionreason", showRejectReason || showMcs_reasonforrejection);
        CommCare.Shared.SetRequired("mcs_rejectionreason", showRejectReason || showMcs_reasonforrejection);
        CommCare.Shared.SetVisible("mcs_rejectionreasonmulti", showRejectReason);
        CommCare.Shared.SetRequired("mcs_rejectionreasonmulti", showRejectReason);
        var systemUserId = CommCare.Shared.FormContext.context.getUserId().replace("{", "").replace("}", "");
        Xrm.WebApi.retrieveMultipleRecords("teammembership", `?$select=systemuserid&$filter=(systemuserid eq ${systemUserId} and (teamid eq ${CommCare.ActionItem.Constants.AUSHTeam} or teamid eq ${CommCare.ActionItem.Constants.DAUSHTeam} or teamid eq ${CommCare.ActionItem.Constants.ExecutiveOfficerTeam}))`).then(
            function success(results) {
                console.log(results);
                if (results.entities.length > 0 && status == CommCare.ActionItem.Constants.StatusReason.RejectToPATSR) {
                    CommCare.Shared.SetVisible("mcs_rejectionreason", true);
                    CommCare.Shared.SetRequired("mcs_rejectionreason", true);
                    CommCare.Shared.SetVisible("mcs_reasonforrejection", true);
                    CommCare.Shared.SetRequired("mcs_reasonforrejection", true);
                }
            },
            function (error) {
                console.log(error.message);
            }
        );
        

    }

    async function checkIfUserIsMemberOfTeam(userId, teamId) {
        try {
            // Use the Web API to retrieve the team record
            const teamResponse = await Xrm.WebApi.retrieveRecord("team", teamId, "?$expand=teammembership_association($select=systemuserid)");     // Check if the user is a member of the team
            const isMember = teamResponse.teammembership_association.some(member => member.systemuserid === userId); return isMember;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    function showHidePatsTabs() {
        var patsRId = CommCare.Shared.GetFieldValue("mcs_patsrid");
        var showTabs = !!patsRId;

        CommCare.Shared.FormContext.ui.tabs.get("PATSR").setVisible(showTabs);
        CommCare.Shared.FormContext.ui.tabs.get("WHHLMetadata").setVisible(showTabs);
        CommCare.Shared.FormContext.ui.tabs.get("Callers").setVisible(showTabs);
        CommCare.Shared.FormContext.ui.tabs.get("NamedEmployees").setVisible(showTabs);
        CommCare.Shared.FormContext.ui.tabs.get("WHHLCaseUpdates").setVisible(showTabs);
    }

    function lockStatusReason() {
        is13FrontOfficeUser().then(function (isFrontOfficeUser) {
            CommCare.Shared.SetReadOnly("statuscode", !isFrontOfficeUser);
        });
    }

    function is13FrontOfficeUser() {
        var ownerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        return new Promise(function (resolve, reject) {
            return Xrm.WebApi.retrieveRecord("systemuser", CommCare.Shared.FormContext.context.getUserId(), "?$select=systemuserid&$expand=teammembership_association($select=teamid,name)").then(
                function success(result) {
                    console.log(result);
                    // Columns
                    var systemuserid = result["systemuserid"]; // Guid

                    // Many To Many Relationships
                    for (var j = 0; j < result.teammembership_association.length; j++) {
                        var teammembership_association_teamid = result.teammembership_association[j]["teamid"]; // Guid
                        var teammembership_association_name = result.teammembership_association[j]["name"]; // Text
                        if (teammembership_association_teamid == CommCare.ActionItem.Constants.FrontOfficeTeam.toLowerCase()) {
                            resolve(true);
                        }
                        if (teammembership_association_teamid == ownerId) {
                            resolve(true);
                        }
                    }
                    resolve(false);
                },
                function (error) {
                    console.log(error.message);
                }
            );
            //return Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
            //    function success(results) {
            //        for (var i = 0; i < results.entities.length; i++) {

            //            if (results.entities[i]["teamid"].toLowerCase() == CommCare.ActionItem.Constants.FrontOfficeTeam.toLowerCase()) {
            //                resolve(true);
            //            }
            //        }
            //        resolve(false);
            //    },
            //    function (error) {
            //        reject(error.message);
            //    }
            //);
        });
    }

    function unlockDueDate13FrontOffice() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        if (CommCare.Shared.FormContext.ui.getFormType() != 1) {
            Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
                function success(results) {
                    var lockDueDate = true;
                    for (var i = 0; i < results.entities.length; i++) {
                        if (results.entities[i]["teamid"].toLowerCase() == CommCare.ActionItem.Constants.FrontOfficeTeam.toLowerCase()) {
                            lockDueDate = false;
                        }
                    }
                    var patsRId = CommCare.Shared.GetFieldValue("mcs_patsrid");
                    
                    CommCare.Shared.SetReadOnly("mcs_originatorduedate", lockDueDate);
                    CommCare.Shared.SetReadOnly("mcs_frontofficeduedate", lockDueDate);

                    if (!!patsRId) {
                        CommCare.Shared.SetReadOnly("mcs_originatorduedate", true);
                    }
                    console.log(fName + " complete");
                },
                function (error) {
                    var alertStrings = { text: error.message };
                    Xrm.Navigation.openAlertDialog(alertStrings);
                }
            );  
        }
         
    }

    function lockWHHLResponseFields() {
        console.log("lockWHHLResponseFields");
        var lockFields = false;
        var status = CommCare.Shared.GetFieldValue("statuscode");
        //console.log(status);
        if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.ActionItem.Constants.StatusReason.Approved) {
            //CommCare.Shared.setReadOnlyOnMultipleFields(["mcs_dateofreport", "mcs_briefstatementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_forfurtherinformationcontact", "mcs_response"], true);
            lockFields = true;
        }
        var fieldList = [
            "mcs_dateofreport",
            "mcs_briefstatementofissueandstatus",
            "mcs_actionsprogressandresolution",
            "mcs_nextsteps",
            "mcs_forfurtherinformationcontact",
            "mcs_response",
            "mcs_resolutiondescription",
            "mcs_patsroutcome",
            "mcs_patsrindependentexternalreview",
            "mcs_setsubmitteraspointofcontact",
            "mcs_pointofcontactfirstname",
            "mcs_pointofcontactlastname",
            "mcs_pointofcontactemail",
            "mcs_pointofcontactposition",
            "mcs_pointofcontactphonenumber",
        ];

        for (var i = 0; i < fieldList.length; i++) {
            if (CommCare.Shared.GetFieldValue(fieldList[i]) != null && status != CommCare.ActionItem.Constants.StatusReason.RejectedByPATSR
                && status != CommCare.ActionItem.Constants.StatusReason.Reopened && status != CommCare.ActionItem.Constants.StatusReason.ReadyForApproval) {
                if (fieldList[i] != "mcs_pointofcontactphonenumber") {
                    CommCare.Shared.SetReadOnly(fieldList[i], true);
                } else if (validatePOCPhoneNumber()) {
                    CommCare.Shared.SetReadOnly(fieldList[i], true);
                }
            } else {
                CommCare.Shared.SetReadOnly(fieldList[i], false);
            }
        }
    }

    function showHideWHHLSections() {
        var showResponsesHideWHHL = CommCare.Shared.GetFieldValue("mcs_whhltemplate");
        var requireWHHL = showResponsesHideWHHL == true ? "required" : "none";
        //console.log("requireWHHL: " + requireWHHL);
        var requireResponse = showResponsesHideWHHL == true ? "none" : "required";
        //console.log("showResponsesHideWHHL: " + showResponsesHideWHHL);

        var systemUserId = CommCare.Shared.FormContext.context.getUserId().replace("{", "").replace("}", "");
        Xrm.WebApi.online.retrieveRecord("systemuser", systemUserId, "?$expand=teammembership_association($select=teamid,mcs_frontofficeteam,name)").then(
            function success(result) {
                //console.log(result);
                // Columns
                var systemuserid = result["systemuserid"]; // Guid

                var frontOfficeCount = 0;
                for (var j = 0; j < result.teammembership_association.length; j++) {
                    var teamId = result.teammembership_association[j]["teamid"]; // Guid
                    var isFrontOffice = result.teammembership_association[j]["mcs_frontofficeteam"]; // Boolean
                    
                    if (isFrontOffice == true) {
                        frontOfficeCount++;
                    }
                }

                CommCare.Shared.FormContext.ui.tabs.get("Responses").sections.get("WHHL Resolution").setVisible(showResponsesHideWHHL);
                CommCare.Shared.FormContext.ui.tabs.get("Responses").sections.get("Response").setVisible(!showResponsesHideWHHL);

                var status = CommCare.Shared.GetFieldValue("statuscode");
                if (status == CommCare.ActionItem.Constants.StatusReason.Approved
                    || frontOfficeCount > 0 && (status == CommCare.ActionItem.Constants.StatusReason.SendToEO || status == CommCare.ActionItem.Constants.StatusReason.SendToDAUSH || status == CommCare.ActionItem.Constants.StatusReason.SendToAUSH)) {
                    setRequiredOnMultipleFields(["mcs_dateofreport", "mcs_briefstatementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_forfurtherinformationcontact"], requireWHHL);
                    CommCare.Shared.SetRequired("mcs_response", requireResponse);
                } else {
                    setRequiredOnMultipleFields(["mcs_dateofreport", "mcs_briefstatementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_forfurtherinformationcontact"], false);
                    CommCare.Shared.SetRequired("mcs_response", false);
                }

                var patsFields = ["mcs_patsrindependentexternalreview", "mcs_patsroutcome", "mcs_resolutiondescription"];
                for (var i = 0; i < patsFields.length; i++) {
                    CommCare.Shared.SetVisible(patsFields[i], false);
                }

            },
            function (error) {
                console.log(error.message);
            }
        );
    }

    function setRequiredOnMultipleFields(fieldList, requiredLevel) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.SetRequired(fieldList[i], requiredLevel);
        }
    }

    function showHideResponseSentFields() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.ActionItem.Constants.StatusReason.Approved || status == CommCare.ActionItem.Constants.StatusReason.ResponseSent || status == CommCare.ActionItem.Constants.StatusReason.ResponseSentToRequestor) {
            CommCare.Shared.SetVisible("mcs_sentto", true);
            CommCare.Shared.SetVisible("mcs_datesent", true);
        } else {
            CommCare.Shared.SetVisible("mcs_sentto", false);
            CommCare.Shared.SetVisible("mcs_datesent", false);
        }
    }

    function showHideReopenReason() {
        if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.ActionItem.Constants.StatusReason.Reopened) {
            CommCare.Shared.SetVisible("mcs_reopenreason", true);
            CommCare.Shared.SetRequired("mcs_reopenreason", true);
        } else {
            CommCare.Shared.SetVisible("mcs_reopenreason", false);
            CommCare.Shared.SetRequired("mcs_reopenreason", false);
        }
    }

    function setOnChangeForMultipleFields(fieldList, functionName) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.SetOnChange(fieldList[i], functionName);
        }
    }

    function showHideRequestorGroupFields() {

        //VISN
        var requestorGroup = CommCare.Shared.GetLookupName(CommCare.Shared.GetFieldValue("mcs_requestorgroup"));
        var showVisn = requestorGroup == "VISN" ? true : false;
        CommCare.Shared.SetVisible("mcs_visn", showVisn);
        CommCare.Shared.SetRequired("mcs_visn", showVisn);

        //VAMC
        var showVamc = requestorGroup == "VAMC" ? true : false;
        CommCare.Shared.SetVisible("mcs_vamc", showVamc);
        CommCare.Shared.SetRequired("mcs_vamc", showVamc);

        //Other
         var showOther = requestorGroup == "Other" ? true : false;
         CommCare.Shared.SetVisible("mcs_otherdetails", showOther);
         CommCare.Shared.SetRequired("mcs_otherdetails", showOther);
    }

    function disallowFutureReceivedDate() {
        if (CommCare.Shared.GetFieldValue("mcs_receiveddate") != null) {
            CommCare.Shared.FormContext.getControl("mcs_receiveddate").clearNotification("receiveddatevalidation");
            if (CommCare.Shared.GetFieldValue("mcs_receiveddate").setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
                CommCare.Shared.FormContext.getControl("mcs_receiveddate").setNotification("A received date on or before today is required.", "receiveddatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_receiveddate").clearNotification("receiveddatevalidation");
        }
    }

    function disallowPastOriginatorDueDates() {
        if (CommCare.Shared.GetFieldValue("mcs_originatorduedate") != null) {
            CommCare.Shared.FormContext.getControl("mcs_originatorduedate").clearNotification("duedatevalidation");
            if (CommCare.Shared.GetFieldValue("mcs_originatorduedate") < new Date()) {
                CommCare.Shared.FormContext.getControl("mcs_originatorduedate").setNotification("A due date that is on or after today is required.", "duedatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_originatorduedate").clearNotification("duedatevalidation");
        }
    }

    function disallowPastFrontOfficeDueDates() {
        if (CommCare.Shared.GetFieldValue("mcs_frontofficeduedate") != null) {
            CommCare.Shared.FormContext.getControl("mcs_frontofficeduedate").clearNotification("duedatevalidation");
            //if (CommCare.Shared.GetFieldValue("mcs_frontofficeduedate").setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
            if (CommCare.Shared.GetFieldValue("mcs_frontofficeduedate") < new Date()) {
                CommCare.Shared.FormContext.getControl("mcs_frontofficeduedate").setNotification("A due date that is on or after today is required.", "duedatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_frontofficeduedate").clearNotification("duedatevalidation");
        }
    }

    function clearSubTypeOnChangeOfTreatmentStatus() {
        CommCare.Shared.SetFieldValue("mcs_treatmentstatussubtype", null);
        showHideTreatmentStatusSubType();
    }

    function showHideTreatmentStatusSubType() {
        var treatmentStatusSubType = CommCare.Shared.GetFieldValue("mcs_treatmentstatussubtype");
        if (treatmentStatusSubType != null) {
            CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", true);
            CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", true);
        } else {
            var treatmentStatusId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_treatmentstatus"));
            Xrm.WebApi.online.retrieveMultipleRecords("mcs_treatmentstatussubtype", "?$filter=_mcs_treatmentstatus_value eq " + treatmentStatusId).then(
                function success(results) {
                    if (results.entities.length > 0) {
                        CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", true);
                        CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", true);
                    } else {
                        CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", false);
                        CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", false);
                    }

                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        }
    }

    function setTreatmentStatusPreFilter() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);

        if (!!CommCare.Shared.FormContext.getControl("mcs_treatmentstatus"))
            CommCare.Shared.FormContext.getControl("mcs_treatmentstatus").addPreSearch(treatmentStatusPreSearch);
    }

    function treatmentStatusPreSearch() {

        var fetchXml = "<filter type='and'>"
        fetchXml += "<condition attribute='mcs_name' operator='ne' value='Community Care' />";
        fetchXml += "</filter>"

        if (!!CommCare.Shared.FormContext.getControl("mcs_treatmentstatus"))
            CommCare.Shared.FormContext.getControl("mcs_treatmentstatus").addCustomFilter(fetchXml);
    }

    function setPOCUserData() {
        var poc = CommCare.Shared.GetFieldValue("mcs_setsubmitteraspointofcontact");
        if (poc == CommCare.ActionItem.Constants.YesNo.Yes) {
            var systemUserId = CommCare.Shared.FormContext.context.getUserId().replace("{", "").replace("}", "");
            Xrm.WebApi.online.retrieveRecord("systemuser", systemUserId, "?$select=address1_telephone1,domainname,firstname,internalemailaddress,lastname,mobilephone,_positionid_value,title").then(
                function success(result) {
                    //console.log(result);
                    var firstname = result["firstname"];
                    var internalemailaddress = result["internalemailaddress"];
                    var lastname = result["lastname"];
                    var mainphone = result["address1_telephone1"];
                    var _positionid_value_formatted = result["_positionid_value@OData.Community.Display.V1.FormattedValue"];
                    var title = result["title"];

                    CommCare.Shared.SetFieldValue("mcs_pointofcontactfirstname", firstname);
                    CommCare.Shared.SetFieldValue("mcs_pointofcontactlastname", lastname);
                    CommCare.Shared.SetFieldValue("mcs_pointofcontactemail", internalemailaddress);
                    CommCare.Shared.SetFieldValue("mcs_pointofcontactposition", title);
                    //CommCare.Shared.SetFieldValue("mcs_pointofcontactphonenumber", mainphone.replace(/\D/g,'').match(/^(\d{3})(\d{0,3})(\d{0,4}$/);
                    var cleanMainPhone = mainphone.replace(/\D/g, '');
                    var match = cleanMainPhone.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
                    if (match) {
                        console.log("(" + match[1] + ")" + match[2] + "-" + match[3]);
                        CommCare.Shared.SetFieldValue("mcs_pointofcontactphonenumber", "(" + match[1] + ")" + match[2] + "-" + match[3]);
                    }
                    CommCare.Shared.FormContext.getAttribute("mcs_pointofcontactphonenumber").fireOnChange();
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        } else {
            CommCare.Shared.SetFieldValue("mcs_pointofcontactfirstname", null);
            CommCare.Shared.SetFieldValue("mcs_pointofcontactlastname", null);
            CommCare.Shared.SetFieldValue("mcs_pointofcontactemail", null);
            CommCare.Shared.SetFieldValue("mcs_pointofcontactposition", null);
            CommCare.Shared.SetFieldValue("mcs_pointofcontactphonenumber", null);
        }
    }

    function showHideMetadataTabs() {
        var requestorGroupName = CommCare.Shared.GetLookupName(CommCare.Shared.GetFieldValue("mcs_requestorgroup"));
        var whhlString = "PATS-R/WHHL";
        var avaString = "PATS-R/AVA";
        var ccString = "PATS-R/CommCare";
        CommCare.Shared.FormContext.ui.tabs.get("WHHLMetadata").setVisible(true);
        CommCare.Shared.FormContext.ui.tabs.get("AVAMetadata").setVisible(true);
        CommCare.Shared.FormContext.ui.tabs.get("CommCareMetadata").setVisible(true);
        if (requestorGroupName != whhlString) CommCare.Shared.FormContext.ui.tabs.get("WHHLMetadata").setVisible(false);
        if (requestorGroupName != avaString) CommCare.Shared.FormContext.ui.tabs.get("AVAMetadata").setVisible(false);
        if (requestorGroupName != ccString) CommCare.Shared.FormContext.ui.tabs.get("CommCareMetadata").setVisible(false);
    }

    function validatePOCPhoneNumber() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var fieldNames = [];
        fieldNames[0] = "mcs_pointofcontactphonenumber";

        var validPhone = CommCare.Shared.ValidatePhoneOrFaxNumber("ActionItem", null, fieldNames, "Phone");

        return validPhone;
    }

    function showHideMPIHTML() {
        var vet = CommCare.Shared.GetFieldValue("mcs_veteran");
        if (vet == null && CommCare.Shared.FormContext.ui.getFormType() != 1) {
            CommCare.Shared.FormContext.ui.tabs.get("MPIHTML").setVisible(true);
        }

        if (vet != null) {
            if (vet[0].name == "N/A N/A") {
                CommCare.Shared.FormContext.ui.tabs.get("MPIHTML").setVisible(true);
            } else  {
                CommCare.Shared.FormContext.ui.tabs.get("MPIHTML").setVisible(false);
            }
        }
        
    }

    function showHideComments() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        var ownerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));

        if (
            //status == CommCare.ActionItem.Constants.StatusReason.Approved
             (status == CommCare.ActionItem.Constants.StatusReason.SendToAUSH && ownerId == CommCare.ActionItem.Constants.DAUSHTeam)
            //|| (status == CommCare.ActionItem.Constants.StatusReason.SendToDAUSH && ownerId == CommCare.ActionItem.Constants.DAUSHTeam)
            //|| (status == CommCare.ActionItem.Constants.StatusReason.SendToEO && ownerId == CommCare.ActionItem.Constants.ExecutiveOfficerTeam)
            || (status == CommCare.ActionItem.Constants.StatusReason.ApprovedTo16
            && (ownerId == CommCare.ActionItem.Constants.AUSHTeam || ownerId == CommCare.ActionItem.Constants.DAUSHTeam || ownerId == CommCare.ActionItem.Constants.ExecutiveOfficerTeam))) {
            CommCare.Shared.SetVisible("mcs_comments", true);
            
        }
        else {
            CommCare.Shared.SetVisible("mcs_comments", false);
        }
        

    }

    function removeRejectToPatsStatusForNonPats() {
        var statusControl = CommCare.Shared.FormContext.getControl("statuscode");
        var patsRId = CommCare.Shared.GetFieldValue("mcs_patsrid");

        if (patsRId == null) {
            statusControl.removeOption(CommCare.ActionItem.Constants.StatusReason.RejectToPATSR);
        }
    }

    function defaultOwningTeam() {
        var stateCode = CommCare.Shared.GetFieldValue("statecode");
        if (stateCode == CommCare.ActionItem.Constants.StateCode.Active) {
            var systemUserId = CommCare.Shared.FormContext.context.getUserId().replace("{", "").replace("}", "");
            Xrm.WebApi.online.retrieveRecord("systemuser", systemUserId, "?$expand=teammembership_association($select=teamid,mcs_frontofficeteam,name)").then(
                function success(result) {
                    //console.log(result);
                    // Columns
                    var systemuserid = result["systemuserid"]; // Guid

                    var frontOfficeCount = 0;
                    var frontOfficeId;
                    var frontOfficeName;
                    for (var j = 0; j < result.teammembership_association.length; j++) {
                        var teamId = result.teammembership_association[j]["teamid"]; // Guid
                        var isFrontOffice = result.teammembership_association[j]["mcs_frontofficeteam"]; // Boolean
                        var teamName = result.teammembership_association[j]["name"];

                        if (isFrontOffice == true) {
                            frontOfficeCount++;
                            frontOfficeId = teamId;
                            frontOfficeName = teamName;
                        }
                    }

                    if (frontOfficeCount == 1) {
                        var lookupValue = [{ id: frontOfficeId, entityType: "team", name: frontOfficeName }];
                        var owningTeam = CommCare.Shared.GetFieldValue("mcs_owningteam");
                        if (owningTeam == null) {
                            CommCare.Shared.SetFieldValue("mcs_owningteam", lookupValue);
                        }
                    } else if (frontOfficeCount > 1) {
                        CommCare.Shared.SetRequired("mcs_owningteam", true);
                    } else {
                        CommCare.Shared.SetRequired("mcs_owningteam", false);
                    }

                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }

    function buildPreFilterFetchXml() {
        var directInquiryGroupId = "4a0fe354-fe82-ed11-81ad-001dd80701be";
        CommCare.ActionItem.Constants.GlobalRequestorGroupFetch = "<filter type='and'>";

        Xrm.WebApi.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_requestorgroup_value,_mcs_team_value&$filter=(statecode eq 0 and mcs_name eq 'AdditionalRequestorGroupsByTeam')").then((luFilters) => {
            for (var i = 0; i < luFilters.entities.length; i++) {
                CommCare.ActionItem.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${luFilters.entities[i]._mcs_requestorgroup_value}' />`;
            }

            CommCare.ActionItem.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${directInquiryGroupId}' />`;
            CommCare.ActionItem.Constants.GlobalRequestorGroupFetch += "</filter>";
            console.log(CommCare.ActionItem.Constants.GlobalRequestorGroupFetch);
        }).catch((e) => {
            console.log(e);
        });
    }

    function prefilterRequestorGroup() {
        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").addPreSearch(filterRequestorGroupLookup);
    }

    function filterRequestorGroupLookup() {
        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").addCustomFilter(CommCare.ActionItem.Constants.GlobalRequestorGroupFetch);
    }

    function lockOwnerWhenCreatedViaEmail(){
        var createdViaEmail = CommCare.Shared.GetFieldValue("mcs_createdviaemail");
        if(createdViaEmail){
            CommCare.Shared.SetReadOnly("mcs_owningteam", true);
        }
        else{
            CommCare.Shared.SetReadOnly("mcs_owningteam", false);
        }
    }

    function buildAssignedToPreFilter() {
        var ownerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `<fetch>`;
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `<entity name='systemuser'><attribute name='systemuserid' /><attribute name='fullname' /><attribute name='domainname' /><attribute name='internalemailaddress' /><attribute name='businessunitid' /><attribute name='title' /><attribute name='positionid' /><attribute name='address1_telephone1' />`;
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `<filter>`;
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `<condition entityname='teammembership' attribute='teamid' operator='eq' value='${ownerId}' />`;
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `</filter>`;
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `<link-entity name='teammembership' from='systemuserid' to='systemuserid' />`;
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `</entity>`;
        CommCare.ActionItem.Constants.GlobalAssignedToFetch += `</fetch>`;
        
        CommCare.Shared.FormContext.getControl("mcs_assignedto").addPreSearch(preFilterAssignedTo);
        
    }

    function preFilterAssignedTo() {
        var enabledUsersViewId = "00000000-0000-0000-00aa-000010001019";
        var entityName = "systemuser";
        var viewName = "Enabled Users";
        var layoutXML = "<grid name='resultset' object='1' jump='new_name' select='1' icon='1' preview='1'><row name='result' id='systemuserid'><cell name='fullname' width='150' /></row></grid>";
        CommCare.Shared.FormContext.getControl("mcs_assignedto").addCustomView(enabledUsersViewId, entityName, viewName, CommCare.ActionItem.Constants.GlobalAssignedToFetch, layoutXML, true);
        //CommCare.Shared.FormContext.getControl("mcs_assignedto").addCustomView(CommCare.ActionItem.Constants.GlobalAssignedToFetch);
    }

    function showHideOverdueReason() {
        let fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        let originatorDueDate = CommCare.Shared.GetFieldValue("mcs_originatorduedate");
        let frontOfficeDueDate = CommCare.Shared.GetFieldValue("mcs_frontofficeduedate");
        let showRequireOverdueReason = false;
        if (originatorDueDate < new Date() || frontOfficeDueDate < new Date()) {
            let status = CommCare.Shared.GetFieldValue("statuscode");
            if (status == CommCare.ActionItem.Constants.StatusReason.Approved) {
                showRequireOverdueReason = true;
                CommCare.Shared.FormContext.data.entity.addOnSave(lockOverdueReasonFieldsOnSave);
            }
        }
        CommCare.Shared.SetRequired("mcs_overduereason", showRequireOverdueReason);
        CommCare.Shared.SetVisible("mcs_overduereason", showRequireOverdueReason);
    }

    function showHideOtherDetails() {
        let overdueReason = CommCare.Shared.GetFieldValue("mcs_overduereason");

        var showOther = false;
        if (overdueReason != null && overdueReason.includes(CommCare.ActionItem.Constants.OverDueReasons.Other)) {
            showOther = true;
        }
        CommCare.Shared.SetRequired("mcs_overduereasonotherdetails", showOther);
        CommCare.Shared.SetVisible("mcs_overduereasonotherdetails", showOther);
    }

    function lockOverdueReasonFieldsOnSave() {
        let overdueReason = CommCare.Shared.GetFieldValue("mcs_overduereason");
        if (overdueReason != null) {
            CommCare.Shared.SetReadOnly("mcs_overduereason", true);
        }

        let overdueDetail = CommCare.Shared.GetFieldValue("mcs_overduereasonotherdetails");
        if (overdueDetail != null) {
            CommCare.Shared.SetReadOnly("mcs_overduereasonotherdetails", true);
        }
    }

    function showHideAttestationSection() {
        let status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.ActionItem.Constants.StatusReason.Approved) {
            CommCare.Shared.FormContext.ui.tabs.get("Responses").sections.get("Attestation").setVisible(true);
            CommCare.Shared.SetRequired("mcs_attestation1", true);
            CommCare.Shared.SetRequired("mcs_attestation2", true);
            CommCare.Shared.SetRequired("mcs_attestation3", true);
        } else {
            CommCare.Shared.FormContext.ui.tabs.get("Responses").sections.get("Attestation").setVisible(false);
            CommCare.Shared.SetRequired("mcs_attestation1", false);
            CommCare.Shared.SetRequired("mcs_attestation2", false);
            CommCare.Shared.SetRequired("mcs_attestation3", false);
        }
    }

    function addRemoveBlockAttestationSave() {
        let status = CommCare.Shared.GetFieldValue("statuscode");
        let attestation1 = CommCare.Shared.GetFieldValue("mcs_attestation1");
        let attestation2 = CommCare.Shared.GetFieldValue("mcs_attestation2");
        let attestation3 = CommCare.Shared.GetFieldValue("mcs_attestation3");
        if (status == CommCare.ActionItem.Constants.StatusReason.Approved && (attestation1 == false || attestation2 == false || attestation3 == false)) {
            CommCare.Shared.FormContext.data.entity.addOnSave(blockSaveForAttestation);
        } else {
            CommCare.Shared.FormContext.ui.clearFormNotification("AttestationBlocked");
            CommCare.Shared.FormContext.data.entity.removeOnSave(blockSaveForAttestation);
        }
    }

    function blockSaveForAttestation(context) {
        context.getEventArgs().preventDefault();
        CommCare.Shared.FormContext.ui.setFormNotification("You must attest that all requirements have been met prior to setting the status to Approved", "ERROR", "AttestationBlocked");
    }
})();
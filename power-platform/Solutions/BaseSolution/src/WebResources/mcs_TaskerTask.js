/// <reference path="Common/CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.TaskerTask) == "undefined") {
    CommCare.TaskerTask = {
        __namespace: true
    };
}

if (typeof (CommCare.TaskerTask.Global) == "undefined") {
    CommCare.TaskerTask.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.TaskerTask.Constants) == "undefined") {
    CommCare.TaskerTask.Constants = {
        __namespace: true
    };
}

CommCare.TaskerTask.Global.AssignedFromFetch = "";
CommCare.TaskerTask.Constants.ExtensionRequestMethodEnabled = false;

CommCare.TaskerTask.Constants.Main_Form = "14DA26B4-9A60-40F6-922A-86984B4301C6";
CommCare.TaskerTask.Constants.QuickCreate_Form = "E7E5BCF7-B9CE-4B84-9156-E43DD8E1D254";
CommCare.TaskerTask.Constants.FrontOfficeTeam = "2d9ad717-246a-eb11-a812-001dd800a140";
CommCare.TaskerTask.Constants.POMTeam = "4f888d79-7c6c-eb11-a812-001dd800ad2c";
CommCare.TaskerTask.Constants.IENTeam = "0a4f0a09-c960-eb11-a812-001dd801df87";

CommCare.TaskerTask.Constants.StatusReason = {
    Open: 1,
    ReadyForApproval: 803750000,
    Approved: 803750001,
    Rejected: 803750003,
    Inactive: 2,
    Closed: 803750002,
    Reopened: 803750004,
    SubmitToRegion: 803750005,
    Review: 803750006,
    Agree: 803750007,
    AgreeEdits: 803750008,
    Disagree: 803750009
}

CommCare.TaskerTask.Constants.TrackerTeamType = {
    Directorate: 803750000,
    ExecutiveDirectorate: 803750001,
    Region: 803750003,
    VISN: 803750002,
    SubDirectorate: 803750004
}

CommCare.TaskerTask.Constants.PatsROutcomes = {
    Approved: 803750000,
    Disapproved: 803750001,
    Founded: 803750002,
    Unfounded: 803750003
}

CommCare.TaskerTask.Constants.BillingOutcomes = {
    Approved: 803750000,
    Unapproved: 803750001,
    InquiryOnly: 803750002
}

CommCare.TaskerTask.Constants.ApprovalNeeded = {
    NoHigher: 153190000,
    Directorate: 153190001,
    ExecutiveDirectorate: 153190002,
    Full: 153190003
};

CommCare.TaskerTask.Constants.Priority = {
    Urgent: 806860000,
    NonUrgent: 806860001
}

CommCare.TaskerTask.Constants.ApprovalLevelNeeded = {
    NoHigherApproval: 153190000,
    DirectorateApproval: 153190001,
    ExecutiveDirectorateApproval: 153190002,
    FullApproval: 153190003
}

CommCare.TaskerTask.Constants.OverDueReasons = {
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

CommCare.TaskerTask.Constants.FormType = null;
CommCare.TaskerTask.Constants.ParentTasker = null;
CommCare.TaskerTask.Constants.ParentDirectorateTask = null;
CommCare.TaskerTask.Constants.DirectorateDueDate = null;
CommCare.TaskerTask.Constants.InitialDueDate = null;
CommCare.TaskerTask.Constants.CachedStatus = null;
CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";

CommCare.TaskerTask.Constants.StatusCodeOptions = null;

CommCare.TaskerTask.Global = (function () {
    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context, formType) {
        CommCare.Shared.GetFormContext(context);

        if (formType != null) {
            CommCare.TaskerTask.Constants.FormType = formType;
        }

        closeQuickCreateIfParentIsRFR();
        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_PersonSearchAIT");

        if (CommCare.TaskerTask.Constants.CachedStatus == null) {
            CommCare.TaskerTask.Constants.CachedStatus = CommCare.Shared.GetFieldValue("statuscode");
        }

        var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");

        //On Load
        //offsetInitialDueDate();
        //showHideIENPriority();
        hideShowApprovalNeeded();
        showAndSetRegion(currentForm);
        showHideResponsibleNetworkOther();
        checkForInactiveRecordsInActionItemChain();
        showHideWhhlTemplate();
        

        //On Change
        CommCare.Shared.SetOnChange("mcs_assignedtoteam", function () { showAndSetRegion(currentForm); });
        CommCare.Shared.SetOnChange("mcs_directorateduedate", disallowPastDueDates);
        //CommCare.Shared.SetOnChange("mcs_assignedfrom", showHideIENPriority);
        CommCare.Shared.SetOnChange("mcs_responsiblenetwork", showHideResponsibleNetworkOther);
        if (!!internal) CommCare.Shared.SetOnChange("mcs_assignedtoteam", limitApprovalOptions);

        if ((currentForm != null) && (currentForm.getId().toLowerCase() === CommCare.TaskerTask.Constants.Main_Form.toLowerCase())) {
            //On Load
            showHideReasonForRejection();
            showHideRejectionReasonMulti();
            showHideWHHLSectionAndFields();
            showHideRequestorGroupFields();
            setParentFieldsVisible();
            showAndSetRegion();
            showHideReopenReason();
            unlockDueDateForAssignedFromTeam();
            lockReasonForRejection();
            showHideMPIHTML();
            lockStatusReason();
            showHideWHHLResolutionFields();
            showHideEditsTextbox(false);
            storeApprovalLevelNeeded("load");
            lockResponseWHHLFields(true);
            hideShowTabsBasedOnExecutiveDirectorateTeam();
            removeReviewStatusForNoConcurrence(true);
            lockConcurrenceIfTrue();
            showHideOverdueReason();
            //addRemoveBlockAttestationSave();
            //showHideAttestationSection();
            cacheInitialDueDate();
            lockOverdueReasonFieldsOnLoad();

            if (!!internal) {
                limitApprovalOptions();
            }

            //On Change
            CommCare.Shared.SetOnChange("statuscode", unlockResponseWHHLFields);
            CommCare.Shared.SetOnChange("statuscode", showHideReasonForRejection);
            CommCare.Shared.SetOnChange("statuscode", showHideRejectionReasonMulti);
            CommCare.Shared.SetOnChange("statuscode", showHideWHHLSectionAndFields);
            CommCare.Shared.SetOnChange("statuscode", showHideReopenReason);
            CommCare.Shared.SetOnChange("statuscode", lockReasonForRejection);
            CommCare.Shared.SetOnChange("statuscode", function () { showHideEditsTextbox(false); });
            CommCare.Shared.SetOnChange("statuscode", nullAssignedToForStatusAgree);
            CommCare.Shared.SetOnChange("statuscode", setPriorityUrgentForConcurrenceDisagree);
            CommCare.Shared.SetOnChange("statuscode", showHideWHHLResolutionFields);
            CommCare.Shared.SetOnChange("statuscode", function () { lockResponseWHHLFields(true); });
            CommCare.Shared.SetOnChange("statuscode", showHideOverdueReason);
            //CommCare.Shared.SetOnChange("statuscode", addRemoveBlockAttestationSave);
            //CommCare.Shared.SetOnChange("statuscode", showHideAttestationSection);
            CommCare.Shared.SetOnChange("mcs_approvallevelneeded", storeApprovalLevelNeeded);
            CommCare.Shared.SetOnChange("mcs_assignedtoteam", hideShowTabsBasedOnExecutiveDirectorateTeam);
            CommCare.Shared.SetOnChange("mcs_dateveterancontacted", disallowFutureReportDate);
            CommCare.Shared.SetOnChange("ownerid", lockReasonForRejection);
            CommCare.Shared.SetOnChange("ownerid", lockStatusReason);
            CommCare.Shared.SetOnChange("mcs_needsconcurrence", setPriorityUrgentForConcurrenceDisagree);
            CommCare.Shared.SetOnChange("mcs_pointofcontactphonenumber", validatePOCPhoneNumber);
            CommCare.Shared.SetOnChange("mcs_whhltemplate", showHideWHHLResolutionFields);
            CommCare.Shared.SetOnChange("mcs_whhltemplate", showHideWHHLSectionAndFields);
            CommCare.Shared.SetOnChange("mcs_needsconcurrence", function () { removeReviewStatusForNoConcurrence(false); });
            CommCare.Shared.SetOnChange("mcs_duedate", showHideOverdueReason);
            CommCare.Shared.SetOnChange("mcs_overduereason", showHideOtherDetails);
            //CommCare.Shared.SetOnChange("mcs_attestation1", addRemoveBlockAttestationSave);
            //CommCare.Shared.SetOnChange("mcs_attestation2", addRemoveBlockAttestationSave);
            //CommCare.Shared.SetOnChange("mcs_attestation3", addRemoveBlockAttestationSave);
            CommCare.Shared.SetOnChange("mcs_directorateduedate", requestExtensionForPastDueDate);
            CommCare.Shared.SetOnChange("mcs_approvallevelneeded", requestExtensionForPastDueDate);
            //CommCare.Shared.SetOnChange("ownerid", function () { lockResponseWHHLFields(true); });
            
            //On Save
            CommCare.Shared.FormContext.data.entity.addOnSave(function () { lockResponseWHHLFields(false); });
            CommCare.Shared.FormContext.data.entity.addOnPostSave(function () { showHideEditsTextbox(true); });
            CommCare.Shared.FormContext.data.entity.addOnPostSave(refreshFormOnSave);
            CommCare.Shared.FormContext.data.entity.addOnSave(form_OnSave);
            CommCare.Shared.FormContext.data.entity.addOnSave(lockConcurrenceIfTrue);
            
        }

        if (CommCare.TaskerTask.Constants.FormType == "quickcreate") {
            //Both Internal and Regular
            showHideIENPriority();
            hideShowAssignToMultiple();
            showHideAssignedToTeamsQC();
            prefilterRequestorGroup();
            blockSaveForNewWithAssoicatedVeteranActionItems();
            CommCare.Shared.SetOnChange("mcs_assigntomultipledirectorates", showHideAssignedToTeamsQC);
            CommCare.Shared.SetOnChange("mcs_directorateduedate", requestExtensionForPastDueDate);
            CommCare.Shared.SetOnChange("mcs_approvallevelneeded", requestExtensionForPastDueDate);
            CommCare.Shared.SetOnChange("mcs_assignedtoteam", buildPrefilterFetchXml);
            
            //Type-Specific Logic
            if (!!internal) {
                hideShowFieldsForInternal();
                defaultAssignedFromForInternal();
                CommCare.Shared.SetOnChange("mcs_assignedtoteam", setAssignedFromFromAssignedToForInternal);
            }
            else {
                showVeteranHasOpenActionItems();
                filterDirectorateTeamsByParent();
                offsetInitialDueDate();
                //CommCare.Shared.FormContext.data.entity.addOnSave(blockSaveForNewWithAssoicatedVeteranActionItems);
                //CommCare.Shared.FormContext.data.entity.addOnSave(requestExtensionForPastDueDate);
            }
        }
    }

    function refreshFormOnSave() {
        console.log("refreshFormOnSave");
        CommCare.Shared.FormContext.data.refresh(false);
    }

    function form_OnSave(context) {
        if (validatePOCPhoneNumber() == false) {
            console.log("Invalid Phone Number.  Stopping form save.");
            context.getEventArgs().preventDefault();
        }
        
    }

    function showHideWHHLResolutionFields() {
        
        var status = CommCare.Shared.GetFieldValue("statuscode");
        try {
            Xrm.WebApi.online.retrieveRecord("mcs_tracker", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem")), "?$select=mcs_whhlresolutioncomponents,mcs_patsrid").then(function success(result) {
                var whhlJson = result.mcs_whhlresolutioncomponents;
                var patsRId = result.mcs_patsrid;
                console.log(whhlJson);
                if (patsRId != null && whhlJson != null) {
                    console.log(whhlJson);
                    var whhlObj = JSON.parse(whhlJson);
                    console.log(whhlObj["Fields"]);
                    for (var i = 0; i < whhlObj["Fields"].length; i++) {
                        var fieldObject = whhlObj["Fields"][i];
                        var fieldName = fieldObject["FieldName"];
                        switch (fieldName) {
                            case "mcs_dateveterancontacted":
                                fieldName = "mcs_dateveterancontacted";
                                break;
                            case "mcs_statementoftheissueandstatus":
                                fieldName = "mcs_statementofissueandstatus";
                                break;
                            case "mcs_pointofcontact":
                                fieldName = "mcs_whocontactedveteranpointofcontact";
                                break;
                        }
                        console.log(fieldObject);
                        if (fieldName == "mcs_billingoutcome") {
                            showHideBillingOutcome(fieldObject["Show"], fieldObject["Require"]);
                        } else {
                            if (fieldObject["Show"] == true) {
                                CommCare.Shared.SetVisible(fieldName, true);

                                if (fieldObject["Require"] == true && (status == CommCare.TaskerTask.Constants.StatusReason.Approved || status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval || status == CommCare.TaskerTask.Constants.StatusReason.SubmitToRegion)) {
                                    CommCare.Shared.SetRequired(fieldName, true);
                                } else {
                                    CommCare.Shared.SetRequired(fieldName, false);
                                }
                            } else {
                                CommCare.Shared.SetVisible(fieldName, false);
                                CommCare.Shared.SetRequired(fieldName, false);
                            }
                        }   
                    }
                    try {
                        if (whhlObj["Outcomes"].length > 0) {
                            var outcomeOptionSetControl = CommCare.Shared.FormContext.getControl("mcs_patsroutcome");
                            var approvedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.TaskerTask.Constants.PatsROutcomes.Approved);
                            var disApprovedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.TaskerTask.Constants.PatsROutcomes.Disapproved);
                            var foundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.TaskerTask.Constants.PatsROutcomes.Founded);
                            var unfoundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.TaskerTask.Constants.PatsROutcomes.Unfounded);
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

                    try {
                        if (whhlObj["BillingOutcomes"].length > 0) {
                            let billingOutcomeControl = CommCare.Shared.FormContext.getControl("mcs_billingoutcome");
                            let approvedValue = CommCare.Shared.FormContext.getAttribute("mcs_billingoutcome").getOption(CommCare.TaskerTask.Constants.BillingOutcomes.Approved);
                            let unapprovedValue = CommCare.Shared.FormContext.getAttribute("mcs_billingoutcome").getOption(CommCare.TaskerTask.Constants.BillingOutcomes.Unapproved);
                            let inquiryOnlyValue = CommCare.Shared.FormContext.getAttribute("mcs_billingoutcome").getOption(CommCare.TaskerTask.Constants.BillingOutcomes.InquiryOnly);
                            billingOutcomeControl.clearOptions();
                            for (var i = 0; i < whhlObj["BillingOutcomes"].length; i++) {
                                switch (whhlObj["BillingOutcomes"][i]) {
                                    case "Approved":
                                        billingOutcomeControl.addOption(approvedValue);
                                        break;
                                    case "Unapproved":
                                        billingOutcomeControl.addOption(unapprovedValue);
                                        break;
                                    case "Inquiry Only":
                                        billingOutcomeControl.addOption(inquiryOnlyValue);
                                        break;
                                }
                            }
                        }
                    } catch (ex) {
                        console.log("exception in billing outcomes: " + ex.message);
                    }

                } else {
                    //lockResponseWHHLFields(false);
                    showHideWHHLSections();
                }
            });

        } catch (ex) {
            console.log("reached exception 1");
            console.log(ex);
            //lockResponseWHHLFields(false);
            showHideWHHLSections();
        }
    }

    function lockStatusReason() {
        var user = CommCare.Shared.FormContext.context.getUserId().toLowerCase();
        Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + user).then(
            function success(results) {
                var lockStatus = true;
                var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
                for (var i = 0; i < results.entities.length; i++) {
                    if (results.entities[i]["teamid"].toLowerCase() == owner || user == owner) {
                        lockStatus = false;
                    }
                }
                CommCare.Shared.SetReadOnly("statuscode", lockStatus);
            },
            function (error) {
                var alertStrings = { text: error.message };
                Xrm.Navigation.openAlertDialog(alertStrings);
            }
        );
    }

    function lockReasonForRejection() {
        console.log("lockReasonForRejection");
        isAssignedFromTeamUser().then(function (isAssignedFromUser) {
            isRegionTeamUser().then(function (isRegionTeam) {
                var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
                var region = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_region"));
                var internal = CommCare.Shared.GetFieldValue("mcs_internal");
                var approvalLevel = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");

                var assignedFromTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom"));
                
                if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected && owner == assignedFromTeam && isAssignedFromTeamUser) {
                    CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", false);
                    CommCare.Shared.SetReadOnly("mcs_reasonforrejection", false);
                }
                else if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected && owner == region && !!isRegionTeam) {
                    CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", false);
                    CommCare.Shared.SetReadOnly("mcs_reasonforrejection", false);
                }
                else if (!!internal && approvalLevel == CommCare.TaskerTask.Constants.ApprovalLevelNeeded.NoHigherApproval && CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected) {
                    CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", false);
                    CommCare.Shared.SetReadOnly("mcs_reasonforrejection", false);
                }
                else if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Disagree) {
                    CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", false);
                    CommCare.Shared.SetReadOnly("mcs_reasonforrejection", true);
                }
                else {
                    CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", true);
                    CommCare.Shared.SetReadOnly("mcs_reasonforrejection", true);
                }
            });
            
        });
    }

    function isAssignedFromTeamUser() {
        return new Promise(function (resolve, reject) {
            return Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        var assignedFromTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom"));
                        if (results.entities[i]["teamid"].toLowerCase() == assignedFromTeam) {
                            resolve(true);
                        }
                    }
                    resolve(false);
                },
                function (error) {
                    reject(error.message);
                }
            );
        });
    }

    function isRegionTeamUser() {
        return new Promise(function (resolve, reject) {
            return Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        var regionTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
                        if (results.entities[i]["teamid"].toLowerCase() == regionTeam) {
                            resolve(true);
                        }
                    }
                    resolve(false);
                },
                function (error) {
                    reject(error.message);
                }
            );
        });
    }

    function is13FrontOfficeUser() {
        return new Promise(function (resolve, reject) {
            return Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {

                        if (results.entities[i]["teamid"].toLowerCase() == CommCare.TaskerTask.Constants.FrontOfficeTeam.toLowerCase()) {
                            resolve(true);
                        }
                    }
                    resolve(false);
                },
                function (error) {
                    reject(error.message);
                }
            );
        });
    }

    function unlockDueDateForAssignedFromTeam() {
        
        var membershipPromise = Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
            function success(results) {
                let lockDueDate = true;
                for (var i = 0; i < results.entities.length; i++) {

                    if (results.entities[i]["teamid"].toLowerCase() == CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom"))) {
                        lockDueDate = false;
                    }
                }
                return lockDueDate;
                
            },
            function (error) {
                var alertStrings = { text: error.message };
                Xrm.Navigation.openAlertDialog(alertStrings);
            }
        );
        //CRMCC-7882 - the below field doesn't exist, so changed it to grab the current item's id.
        // This seems to check if there are any internal child tasks and if so, don't lock the due date
        //var taskId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_taskertaskid"));        
        var taskId = CommCare.Shared.FormContext._entityReference.id.guid;
        var internalPromise = Xrm.WebApi.online.retrieveMultipleRecords("mcs_taskertask", "?$select=mcs_internal&$filter=mcs_internal eq true and  _mcs_parenttask_value eq " + taskId).then(
            function success(results) {
                let lockDueDate = true;
                if (results.entities.length > 0) lockDueDate = false;
                return lockDueDate;
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );

        Promise.all([membershipPromise, internalPromise]).then((returnedPromises) => {
            console.log(returnedPromises);
            let lockDueDate = true;
            if (returnedPromises[0] == false || returnedPromises[1] == false) {
                lockDueDate = false;
            }
            CommCare.Shared.SetReadOnly("mcs_directorateduedate", lockDueDate);
        });
    }

    function showHideReopenReason() {
        if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Reopened) {
            CommCare.Shared.SetVisible("mcs_reopenreason", true);
            CommCare.Shared.SetRequired("mcs_reopenreason", true);
        } else {
            CommCare.Shared.SetVisible("mcs_reopenreason", false);
            CommCare.Shared.SetRequired("mcs_reopenreason", false);
        }
    }

    function showHideStatusReasonValues() {
        getAssignedToTeam().then((result) => {
            if (result.trackerTeamType != CommCare.TaskerTask.Constants.TrackerTeamType.VISN) {
                CommCare.Shared.FormContext.getControl("statuscode").removeOption(CommCare.TaskerTask.Constants.StatusReason.SubmitToRegion);
            }
            if (result.trackerTeamType == CommCare.TaskerTask.Constants.TrackerTeamType.VISN && (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Open
                || CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected)) {
                CommCare.Shared.FormContext.getControl("statuscode").removeOption(CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval);
            }
            if (result.trackerTeamType == CommCare.TaskerTask.Constants.TrackerTeamType.VISN && CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.SubmitToRegion) {
                var hasRFA = false;
                var options = CommCare.Shared.FormContext.getAttribute("statuscode").getOptions();
                for (var i = 0; i < options.length; i++) {
                    if (options[i]["value"] == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval) {
                        hasRFA = true;
                    }
                }
                if (!hasRFA) {
                    CommCare.Shared.FormContext.getControl("statuscode").addOption({ value: CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval, text: "Ready for Approval" });
                }
                
            } 
        });
    }

    function showAndSetRegion(currentForm) {
        if (CommCare.Shared.GetFieldValue("mcs_assignedtoteam") == null) {
            CommCare.Shared.SetVisible("mcs_region", false);
        } else {
            //if (CommCare.Shared.GetFieldValue("mcs_region") == null) {
            if (true) {
                getAssignedToTeam().then((result) => {
                    if (result.region != null) {
                        CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_region", result.region, result.regionName, "team");
                        CommCare.Shared.SetVisible("mcs_region", true);
                        if ((currentForm != null) && (currentForm.getId().toLowerCase() === CommCare.TaskerTask.Constants.Main_Form.toLowerCase())) {
                            CommCare.Shared.FormContext.data.save();
                        }

                    } else {
                        CommCare.Shared.SetVisible("mcs_region", false);
                    }
                });
            } else {
                CommCare.Shared.SetVisible("mcs_region", true);
            }
        }
    }

    function getAssignedToTeam() {
        return new Promise(function (resolve, reject) {
            if (CommCare.Shared.GetFieldValue("mcs_assignedtoteam") != null) {
                return Xrm.WebApi.online.retrieveRecord("team", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedtoteam")), "?$select=_mcs_region_value,mcs_trackerteamtype").then(
                    function success(result) {
                        var returnResult = {};
                        returnResult.trackerTeamType = result.mcs_trackerteamtype;
                        returnResult.region = result["_mcs_region_value"];
                        returnResult.regionName = result["_mcs_region_value@OData.Community.Display.V1.FormattedValue"];
                        resolve(returnResult);
                    },
                    function (error) {
                        var alertStrings = { text: error.message };
                        Xrm.Navigation.openAlertDialog(alertStrings);
                        reject(error.message);
                    }
                );
            }
        });
    }

    function setParentFieldsVisible() {
        var tasker = CommCare.Shared.GetFieldValue("mcs_tasker");
        if (!tasker) {
            CommCare.Shared.SetVisible("mcs_tasker", false);
        }

        var parentTask = CommCare.Shared.GetFieldValue("mcs_parenttask");
        if (!parentTask) {
            CommCare.Shared.SetVisible("mcs_parenttask", false);
        }
    }

    function closeQuickCreateIfParentIsRFR() {
        if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM) {
            getParentTaskerTask().then((result) => {
                if (result.statuscode == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval) {
                    var alertStrings = { text: "The Parent Record is in Ready for Review Status.  No new items can be added to it at this time.", title: "Action Item is Ready for Review" };
                    var alertOptions = { height: 120, width: 260 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                        CommCare.Shared.FormContext.ui.close();
                    },
                    (error) => {
                        console.log("Error in closing dialog", error);
                    });
                }
            });
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

    function unlockResponseWHHLFields() {
        if ((CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval || CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.AgreeEdits)
            && CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom")) != CommCare.TaskerTask.Constants.POMTeam) {
            var responseWHHLFields = ["mcs_dateveterancontacted", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact", "mcs_response"];
            for (var i = 0; i < responseWHHLFields.length; i++) {
                CommCare.Shared.SetReadOnly(responseWHHLFields[i], false);

                if (responseWHHLFields[i] == "mcs_response") {
                    CommCare.Shared.SetReadOnly("mcs_responsetemplate", false);
                }
            }
        }
    }

    function showHideWHHLSections() {
        var showResponsesHideWHHL = CommCare.Shared.GetFieldValue("mcs_whhltemplate");
        var requireWHHL = showResponsesHideWHHL == true ? "required" : "none";
        console.log("requireWHHL: " + requireWHHL);
        console.log("showResponsesHideWHHL: " + showResponsesHideWHHL);
        var patsFields = ["mcs_patsrindependentexternalreview", "mcs_patsroutcome", "mcs_resolutiondescription"];
        for (var i = 0; i < patsFields.length; i++) {
            CommCare.Shared.SetVisible(patsFields[i], false);
        }


        CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("WHHL Resolution").setVisible(showResponsesHideWHHL);
        if (CommCare.Shared.GetFieldValue("statuscode") != CommCare.TaskerTask.Constants.StatusReason.Open) {
            setRequiredOnMultipleFields(["mcs_dateveterancontacted", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact"], requireWHHL);
        } else {
            setRequiredOnMultipleFields(["mcs_dateveterancontacted", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact"], "none");
        }
    }

    function lockResponseWHHLFields(isLoad) {
        console.log("isLoad: " + isLoad);

        var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        var assignedFromTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom"));
        var assignedToTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedtoteam"));
        var ownerIsAssignedFromTeam = false;
        if (assignedFromTeam != null) {
            ownerIsAssignedFromTeam = owner == assignedFromTeam ? true : false;
        }
        var ownerIsAssignedToTeam = false;
        if (assignedToTeam != null) {
            ownerIsAssignedToTeam = owner == assignedToTeam ? true : false;
        }
        var responseWHHLFields = ["mcs_dateveterancontacted",
            "mcs_statementofissueandstatus",
            "mcs_actionsprogressandresolution",
            "mcs_nextsteps",
            "mcs_whocontactedveteranpointofcontact",
            "mcs_response",
            "mcs_resolutiondescription",
            "mcs_patsroutcome",
            "mcs_patsrindependentexternalreview",
            "mcs_pointofcontactfirstname",
            "mcs_pointofcontactlastname",
            "mcs_pointofcontactemail",
            "mcs_pointofcontactposition",
            "mcs_pointofcontactphonenumber"];

        //if (((CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval && !ownerIsAssignedFromTeam)
        //    || (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected && ownerIsAssignedToTeam)) && isLoad
        //    || (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected && owner == assignedToTeam)
        //    || CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Open
        //    || CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Reopened
        //) {
            
        //    for (var i = 0; i < responseWHHLFields.length; i++) {
        //        CommCare.Shared.SetReadOnly(responseWHHLFields[i], false);
        //    }
        //}
        var status = CommCare.Shared.GetFieldValue("statuscode");
        //if (status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval
        //    || status == CommCare.TaskerTask.Constants.StatusReason.Review
        //    || status == CommCare.TaskerTask.Constants.StatusReason.Agree
        //    || status == CommCare.TaskerTask.Constants.StatusReason.Rejected
        //    || !ownerIsAssignedToTeam)
        if (status == CommCare.TaskerTask.Constants.StatusReason.Review
            || status == CommCare.TaskerTask.Constants.StatusReason.Agree)            
        {
            
            for (var i = 0; i < responseWHHLFields.length; i++) {
                if (CommCare.Shared.GetFieldValue(responseWHHLFields[i]) != null) {
                    if (responseWHHLFields[i] != "mcs_pointofcontactphonenumber") {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    } else if (validatePOCPhoneNumber()) {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    }

                    if (responseWHHLFields[i] == "mcs_response") {
                        CommCare.Shared.SetReadOnly("mcs_responsetemplate", true);
                    }
                }
            }
        }
        else if ((status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval
            || status == CommCare.TaskerTask.Constants.StatusReason.Rejected)
            && ownerIsAssignedFromTeam) {
            for (var i = 0; i < responseWHHLFields.length; i++) {
                if (CommCare.Shared.GetFieldValue(responseWHHLFields[i]) != null) {
                    if (responseWHHLFields[i] != "mcs_pointofcontactphonenumber") {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    } else if (validatePOCPhoneNumber()) {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    }

                    if (responseWHHLFields[i] == "mcs_response") {
                        CommCare.Shared.SetReadOnly("mcs_responsetemplate", true);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < responseWHHLFields.length; i++) {
                CommCare.Shared.SetReadOnly(responseWHHLFields[i], false);

                if (responseWHHLFields[i] == "mcs_response") {
                    CommCare.Shared.SetReadOnly("mcs_responsetemplate", false);
                }
            }
        }
    }

    function showHideReasonForRejection() {
        var showRequireReasonForRejection = (CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected
            || CommCare.Shared.GetFieldValue("mcs_reasonforrejection") != null);
        CommCare.Shared.SetRequired("mcs_reasonforrejection", showRequireReasonForRejection);
        CommCare.Shared.SetVisible("mcs_reasonforrejection", showRequireReasonForRejection);
    }

    function showHideRejectionReasonMulti() {
        var showRejectionReasonMulti = CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Disagree
            || CommCare.Shared.GetFieldValue("statuscode") == CommCare.TaskerTask.Constants.StatusReason.Rejected;
        CommCare.Shared.SetVisible("mcs_rejectionreasonmulti", showRejectionReasonMulti);
        CommCare.Shared.SetRequired("mcs_rejectionreasonmulti", showRejectionReasonMulti);
    }

    function disallowFutureReportDate() {
        if (CommCare.Shared.GetFieldValue("mcs_dateveterancontacted") != null) {
            CommCare.Shared.FormContext.getControl("mcs_dateveterancontacted").clearNotification("reportdatevalidation");
            if (CommCare.Shared.GetFieldValue("mcs_dateveterancontacted").setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
                CommCare.Shared.FormContext.getControl("mcs_dateveterancontacted").setNotification("A report date on or before today is required.", "reportdatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_dateveterancontacted").clearNotification("reportdatevalidation");
        }
    }

    function cacheInitialDueDate() {
        if (CommCare.Shared.GetFieldValue("mcs_directorateduedate") != null) {
            CommCare.TaskerTask.Constants.InitialDueDate = CommCare.Shared.GetFieldValue("mcs_directorateduedate");
        }
    }

    function offsetInitialDueDate() {

        if (CommCare.Shared.GetFieldValue("mcs_directorateduedate") == null) {
            getParentTaskerTask().then(function (result) {
                console.log(result.parentDueDate);
                var parentDT = new Date(result.parentDueDate);
                var newDate = new Date(parentDT.getFullYear(), parentDT.getMonth(), parentDT.getDate() - 1, parentDT.getHours(), parentDT.getMinutes());
                console.log(newDate);
                CommCare.Shared.SetSubmitMode("mcs_directorateduedate", "always");
                CommCare.Shared.SetFieldValue("mcs_directorateduedate", newDate);
                CommCare.TaskerTask.Constants.InitialDueDate = newDate;
                CommCare.Shared.FormContext.getAttribute("mcs_directorateduedate").fireOnChange();
            });
        }
    }

    function getParentTaskerTask() {

        return new Promise(function (resolve, reject) {
            if (CommCare.Shared.GetFieldValue("mcs_parenttask") != null) {
                return Xrm.WebApi.online.retrieveRecord("mcs_taskertask", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parenttask")), "?$select=mcs_directorateduedate, statuscode").then(
                    function success(result) {
                        var returnResult = {};
                        returnResult.parentDueDate = result.mcs_directorateduedate;
                        returnResult.statuscode = result.statuscode;

                        resolve(returnResult);
                    },
                    function (error) {
                        var alertStrings = { text: error.message };
                        Xrm.Navigation.openAlertDialog(alertStrings);
                        reject(error.message);
                    }
                );
            } else {
                return Xrm.WebApi.online.retrieveRecord("mcs_trackeritem", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker")), "?$select=_mcs_actionitem_value,mcs_duedate, statuscode").then(
                    function success(result) {
                        var returnResult = {};
                        returnResult.parentDueDate = result.mcs_duedate;
                        returnResult.statuscode = result.statuscode;

                        resolve(returnResult);
                    },
                    function (error) {
                        var alertStrings = { text: error.message };
                        Xrm.Navigation.openAlertDialog(alertStrings);
                        reject(error.message);
                    }
                );
            }
        });
    }

    function showHideWHHLSectionAndFields() {
        var isWHHL = CommCare.Shared.GetFieldValue("mcs_whhltemplate");
        console.log("Statuscode: " + CommCare.Shared.GetFieldValue("statuscode"));
        var requireWHHL = isWHHL == true ? "required" : "none";
        var requireResponse = isWHHL == true ? "none" : "required";
        if (isWHHL == true) {
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("WHHL Resolution").setVisible(true);
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Response").setVisible(false);
        } else if (isWHHL == false) {
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("WHHL Resolution").setVisible(false);
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Response").setVisible(true);
        }
        
        if (CommCare.Shared.GetFieldValue("statuscode") != CommCare.TaskerTask.Constants.StatusReason.Open) {
            setRequiredOnMultipleFields(["mcs_dateofreport", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact", "mcs_dateveterancontacted"], requireWHHL);
            CommCare.Shared.SetRequired("mcs_response", requireResponse);
        } else {
            setRequiredOnMultipleFields(["mcs_dateofreport", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact", "mcs_dateveterancontacted"], "none");
            CommCare.Shared.SetRequired("mcs_response", "none");
        }
    }

    function setRequiredOnMultipleFields(fieldList, requiredLevel) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.SetRequired(fieldList[i], requiredLevel);
        }
    }

    function disallowPastDueDates() {
        if (CommCare.Shared.GetFieldValue("mcs_directorateduedate") != null) {
            CommCare.Shared.FormContext.getControl("mcs_directorateduedate").clearNotification("duedatevalidation");
            //if (CommCare.Shared.GetFieldValue("mcs_directorateduedate").setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
            if (CommCare.Shared.GetFieldValue("mcs_directorateduedate") < new Date()) {
                CommCare.Shared.FormContext.getControl("mcs_directorateduedate").setNotification("A due date that is on or after today is required.", "duedatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_directorateduedate").clearNotification("duedatevalidation");
        }
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
        if (vet == null) {
            CommCare.Shared.FormContext.ui.tabs.get("MPIHTML").setVisible(true);
        }

        if (vet != null) {
            if (vet[0].name == "N/A N/A") {
                CommCare.Shared.FormContext.ui.tabs.get("MPIHTML").setVisible(true);
            } else {
                CommCare.Shared.FormContext.ui.tabs.get("MPIHTML").setVisible(false);
            }
        }

    }

    function showHideAssignedToTeamsQC() {
        var assignedToMultipe = CommCare.Shared.GetFieldValue("mcs_assigntomultipledirectorates");
        if (!!assignedToMultipe) {
            CommCare.Shared.SetVisible("mcs_assignedtoteams", true);
            CommCare.Shared.SetRequired("mcs_assignedtoteams", true);
            CommCare.Shared.SetVisible("mcs_assignedtoteam", false);
            CommCare.Shared.SetRequired("mcs_assignedtoteam", false);
        } else {
            CommCare.Shared.SetVisible("mcs_assignedtoteam", true);
            CommCare.Shared.SetRequired("mcs_assignedtoteam", true);
            CommCare.Shared.SetVisible("mcs_assignedtoteams", false);
            CommCare.Shared.SetRequired("mcs_assignedtoteams", false);
        }
    }

    function filterDirectorateTeamsByParent() {
        var parentTeamId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom"));
        var promiseArray = [];

        promiseArray.push(Xrm.WebApi.online.retrieveMultipleRecords("team", `?$select=teamid,name&$filter=_mcs_parentteam_value eq ${parentTeamId}&$orderby=name asc`));
        promiseArray.push(Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=mcs_directorateoption,_mcs_team_value&$filter=mcs_name eq 'DirectorateMapping'"));

        Promise.all(promiseArray).then((promiseResults) => {
            var childTeamResults;
            var lookupFilters;

            CommCare.Shared.FormContext.getControl("mcs_assignedtoteams").clearOptions();

            if (!!promiseResults && promiseResults.length == 2) {
                if (!!promiseResults[0] && !!promiseResults[0].entities && !!promiseResults[1] && !!promiseResults[1].entities) {
                    childTeamResults = promiseResults[0].entities;
                    lookupFilters = promiseResults[1].entities;

                    for (var i = 0; i < childTeamResults.length; i++) {
                        var luFilter = lookupFilters.filter(x => x["_mcs_team_value"] == childTeamResults[i].teamid);

                        if (luFilter.length > 0 && !!luFilter[0]["mcs_directorateoption"]) {
                            try {
                                var option = {};
                                option.text = luFilter[0]["mcs_directorateoption@OData.Community.Display.V1.FormattedValue"];
                                option.value = parseInt(luFilter[0]["mcs_directorateoption"]);
                                CommCare.Shared.FormContext.getControl("mcs_assignedtoteams").addOption(option);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                        else {
                            console.log(`Lookup Filter for id: ${childTeamResults[i].teamid} with Name: ${childTeamResults[i].name} not found.`);
                        }
                    }
                }
            }


        }).catch((error) => {
            console.log(error);
        });
    }

    //No longer needed  CRMCC-5741 - PV

    function showHideIENPriority() {
        var showIEN = false;
        var parentTask = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parenttask"));
        if (parentTask == null) {
            if (CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom")) == CommCare.TaskerTask.Constants.IENTeam.toLowerCase()) {
                showIEN = true;
            }
            CommCare.Shared.SetVisible("mcs_ienpriority", showIEN);
        } else {
            Xrm.WebApi.online.retrieveRecord("mcs_taskertask", parentTask, "?$select=_mcs_assignedfrom_value").then(
                function success(result) {
                    var parentAssignedFrom = result["_mcs_assignedfrom_value"]; // Lookup
                    if (parentAssignedFrom != null) {
                        if (parentAssignedFrom.toLowerCase() == CommCare.TaskerTask.Constants.IENTeam.toLowerCase()) {
                            showIEN = true;
                        }
                        CommCare.Shared.SetVisible("mcs_ienpriority", showIEN);
                    }
                    
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
        
    }

    function showHideResponsibleNetworkOther() {
        var responsibleNetwork = CommCare.Shared.GetFieldValue("mcs_responsiblenetwork");
        if(responsibleNetwork && responsibleNetwork.includes(803750003)) {
            CommCare.Shared.SetVisible("mcs_responsiblenetworkother", true);
            CommCare.Shared.SetRequired("mcs_responsiblenetworkother", true);
        }
        else {
            CommCare.Shared.SetVisible("mcs_responsiblenetworkother", false);
            CommCare.Shared.SetRequired("mcs_responsiblenetworkother", false);
        }

    }

    function requestExtensionForPastDueDate() {
        //context.getEventArgs().preventDefault();
        var dirDueDate = CommCare.Shared.GetFieldValue("mcs_directorateduedate");
        var approvalLevelNeeded = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
        console.log(dirDueDate);
        var taskerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
        var parentTaskId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parenttask"));
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        if (internal == true) {
            return;
        }
        if (taskerId != null) {
            Xrm.WebApi.online.retrieveRecord("mcs_trackeritem", taskerId, "?$select=_mcs_actionitem_value,mcs_duedate,mcs_name").then(
                function success(tasker) {
                    console.log(tasker);
                    var taskerDueDate = new Date(tasker["mcs_duedate"]); // Date Time
                    var mcs_actionitem = tasker["_mcs_actionitem_value"];
                    var mcs_actionitem_formatted = tasker["_mcs_actionitem_value@OData.Community.Display.V1.FormattedValue"];
                    var mcs_actionitem_lookuplogicalname = tasker["_mcs_actionitem_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    var taskerName = tasker["mcs_name"];
                    if (taskerDueDate != null) {
                        //if (dirDueDate > taskerDueDate && approvalLevelNeeded != CommCare.TaskerTask.Constants.ApprovalLevelNeeded.NoHigherApproval) {
                        if (dirDueDate > taskerDueDate) {
                            CommCare.TaskerTask.Constants.DirectorateDueDate = dirDueDate;
                            CommCare.TaskerTask.Constants.ParentTasker = tasker;
                            CommCare.Shared.FormContext.ui.setFormNotification("The current directorate due date exceeds the due date of the tasker and will require an extension request.", "WARNING", "TaskerExtensionRequest");
                            if (CommCare.TaskerTask.Constants.ExtensionRequestMethodEnabled == false) {
                                CommCare.Shared.FormContext.data.entity.addOnSave(openExtensionRequestOnSave);
                                CommCare.TaskerTask.Constants.ExtensionRequestMethodEnabled = true;
                            }
                            

                        } else {
                            CommCare.Shared.FormContext.data.entity.removeOnSave(openExtensionRequestOnSave);
                            CommCare.Shared.FormContext.ui.clearFormNotification("TaskerExtensionRequest");
                            CommCare.TaskerTask.Constants.ExtensionRequestMethodEnabled = false;
                            //CommCare.Shared.FormContext.data.save();
                        }
                    }
                    //console.log(dirDueDate > taskerDueDate);

                },
                function (error) {
                    console.log(error.message);
                }
            );
        } else if (parentTaskId != null) {
            Xrm.WebApi.online.retrieveRecord("mcs_taskertask", parentTaskId, "?$select=_mcs_actionitem_value,mcs_directorateduedate,mcs_name,_mcs_tasker_value").then(
                function success(parentDT) {
                    console.log(parentDT);
                    // Columns
                    var mcs_taskertaskid = parentDT["mcs_taskertaskid"]; // Guid
                    var parentTaskDueDate = new Date(parentDT["mcs_directorateduedate"]); // Date Time
                    var mcs_actionitem = parentDT["_mcs_actionitem_value"]; // Lookup
                    var mcs_actionitem_formatted = parentDT["_mcs_actionitem_value@OData.Community.Display.V1.FormattedValue"];
                    var mcs_actionitem_lookuplogicalname = parentDT["_mcs_actionitem_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    var mcs_name = parentDT["mcs_name"]; // Text
                    var mcs_tasker = parentDT["_mcs_tasker_value"]; // Lookup
                    var mcs_tasker_formatted = parentDT["_mcs_tasker_value@OData.Community.Display.V1.FormattedValue"];
                    var mcs_tasker_lookuplogicalname = parentDT["_mcs_tasker_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                    if (parentTaskDueDate != null) {
                        //if (dirDueDate > parentTaskDueDate && approvalLevelNeeded != CommCare.TaskerTask.Constants.ApprovalLevelNeeded.NoHigherApproval) {
                        if (dirDueDate > parentTaskDueDate) {
                            CommCare.TaskerTask.Constants.DirectorateDueDate = dirDueDate;
                            CommCare.TaskerTask.Constants.ParentDirectorateTask = parentDT;
                            CommCare.Shared.FormContext.ui.setFormNotification("The current directorate due date exceeds the due date of the parent directorate task and will require an extension request.", "WARNING", "DTExtensionRequest");
                            if (CommCare.TaskerTask.Constants.ExtensionRequestMethodEnabled == false) {
                                CommCare.Shared.FormContext.data.entity.addOnSave(openDTExtensionRequestOnSave);
                                CommCare.TaskerTask.Constants.ExtensionRequestMethodEnabled = true;
                            }
                            
                            
                        } else {
                            CommCare.Shared.FormContext.data.entity.removeOnSave(openDTExtensionRequestOnSave);
                            //CommCare.Shared.FormContext.data.save();
                            CommCare.Shared.FormContext.ui.clearFormNotification("DTExtensionRequest");
                            CommCare.TaskerTask.Constants.ExtensionRequestMethodEnabled = false;
                        }
                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
        
    }

    function preventCreateForNoHigherApproval() {
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        if (internal == true) {
            var alertStrings = { text: "Extension Requests cannot be created for items where no higher approval is required.", title: "Cannot create Extension Request" };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                CommCare.Shared.FormContext.data.save();

                //CommCare.Shared.FormContext.ui.close();
            },
                (error) => {
                    console.log("Error in closing dialog", error);
                });
        }

    }

    function openExtensionRequestOnSave(context) {
        context.getEventArgs().preventDefault();
        var tasker = CommCare.TaskerTask.Constants.ParentTasker;
        var dirDueDate = CommCare.TaskerTask.Constants.DirectorateDueDate;
        var taskerDueDate = new Date(tasker["mcs_duedate"]); // Date Time
        var mcs_actionitem = tasker["_mcs_actionitem_value"];
        var mcs_actionitem_formatted = tasker["_mcs_actionitem_value@OData.Community.Display.V1.FormattedValue"];
        var mcs_actionitem_lookuplogicalname = tasker["_mcs_actionitem_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
        var taskerName = tasker["mcs_name"];
        var taskerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
        var approvalLevelNeeded = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
        var currentDate = CommCare.Shared.GetFieldValue("mcs_directorateduedate");
        console.log(approvalLevelNeeded);
        //if (approvalLevelNeeded == CommCare.TaskerTask.Constants.ApprovalLevelNeeded.NoHigherApproval) {
        //    CommCare.Shared.FormContext.data.entity.removeOnSave(openExtensionRequestOnSave);
        //    preventCreateForNoHigherApproval();
        //    return;
        //}

        var confirmString = {
            text: "The due date you entered is after the due date for the tasker. Press 'File Extension' to file an Extension Request for the tasker.  Press 'Cancel' to edit the directorate task due date.",
            title: "Invalid Due Date",
            confirmButtonLabel: "File Extension",
            cancelButtonLabel: "Cancel"
        };

        Xrm.Navigation.openConfirmDialog(confirmString).then(function (successCallback) {
            if (successCallback.confirmed) {
                var entityFormOptions = {
                    entityName: "mcs_duedateextensionrequest",
                    useQuickCreateForm: true
                };

                var parameters = {};
                parameters["mcs_approvallevelneeded"] = approvalLevelNeeded;
                parameters["mcs_tasker"] = taskerId;
                parameters["mcs_taskername"] = taskerName;
                parameters["mcs_taskertype"] = "mcs_trackeritem";

                parameters["mcs_parentactionitem"] = mcs_actionitem;
                parameters["mcs_parentactionitemname"] = mcs_actionitem_formatted;
                parameters["mcs_parentactionitemtype"] = mcs_actionitem_lookuplogicalname;

                parameters["mcs_currentduedate"] = new Date(taskerDueDate);
                var extensionReqestDate = new Date(dirDueDate);
                var parentDate = new Date(dirDueDate);
                extensionReqestDate.setDate(parentDate.getDate() + 1);
                parameters["mcs_requestedduedate"] = extensionReqestDate;
                Xrm.Navigation.openForm(entityFormOptions, parameters).then(function (openFormSuccess) {
                    console.log(openFormSuccess);
                    if (openFormSuccess.savedEntityReference != null) {

                        CommCare.Shared.FormContext.data.entity.removeOnSave(openExtensionRequestOnSave);
                        CommCare.Shared.SetSubmitMode("mcs_directorateduedate", "always");
                        CommCare.Shared.SetFieldValue("mcs_directorateduedate", CommCare.TaskerTask.Constants.InitialDueDate);
                        CommCare.Shared.FormContext.data.save().then(function (createdTaskerTask) {
                            console.log(createdTaskerTask);
                            let parentExtensionReqId = openFormSuccess.savedEntityReference[0]["id"].replace("{", "").replace("}", "").toLowerCase();
                            console.log(parentExtensionReqId);
                            let directorateTaskId = createdTaskerTask.savedEntityReference.id;
                            console.log(directorateTaskId);
                            var record = {};
                            record["mcs_DirectorateTask@odata.bind"] = "/mcs_taskertasks(" + directorateTaskId + ")"; // Lookup
                            record.mcs_approvallevelneeded = approvalLevelNeeded;
                            record["mcs_ParentTasker@odata.bind"] = "/mcs_trackeritems(" + taskerId + ")"; // Lookup
                            record["mcs_ParentExtensionRequest@odata.bind"] = "/mcs_duedateextensionrequests(" + parentExtensionReqId + ")"; // Lookup
                            let taskerDueDate = new Date(tasker["mcs_duedate"]);
                            let taskerDueDateMinusOne = new Date(tasker["mcs_duedate"]);
                            taskerDueDateMinusOne.setDate(taskerDueDate.getDate() - 1);
                            console.log(`taskerDueDateMinusOne: ${taskerDueDateMinusOne}`);
                            record.mcs_currentduedate = taskerDueDateMinusOne; // Date Time
                            record.mcs_requestedduedate = dirDueDate;

                            Xrm.WebApi.createRecord("mcs_duedateextensionrequest", record).then(
                                function success(result) {
                                    var newId = result.id;
                                    console.log(newId);
                                    var record = {};
                                    record["mcs_ChildExtensionRequest@odata.bind"] = "/mcs_duedateextensionrequests(" + newId + ")"; // Lookup

                                    Xrm.WebApi.updateRecord("mcs_duedateextensionrequest", parentExtensionReqId, record).then(
                                        function success(result) {
                                            var updatedId = result.id;
                                            console.log(updatedId);
                                        },
                                        function (error) {
                                            console.log(error.message);
                                        }
                                    );

                                },
                                function (error) {
                                    console.log(error.message);
                                }
                            );
                        });

                        

                        
                    }

                });
            }

        }, function (cancelCallback) {

        });
    }

    function openDTExtensionRequestOnSave(context) {
        context.getEventArgs().preventDefault();
        var approvalLevelNeeded = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
        var currentDate = CommCare.Shared.GetFieldValue("mcs_directorateduedate");
        console.log(approvalLevelNeeded);
        //if (approvalLevelNeeded == CommCare.TaskerTask.Constants.ApprovalLevelNeeded.NoHigherApproval) {
        //    CommCare.Shared.FormContext.data.entity.removeOnSave(openDTExtensionRequestOnSave);
        //    preventCreateForNoHigherApproval();
        //    return;
        //}
        var confirmString = {
            text: "The due date you entered is after the due date for the parent task. Press 'File Extension' to file an Extension Request for the parent task.  Press 'Cancel' to edit the directorate task due date.",
            title: "Invalid Due Date",
            confirmButtonLabel: "File Extension",
            cancelButtonLabel: "Cancel"
        };

        Xrm.Navigation.openConfirmDialog(confirmString).then(function (successCallback) {
            if (successCallback.confirmed) {
                var entityFormOptions = {
                    entityName: "mcs_duedateextensionrequest",
                    useQuickCreateForm: true
                };

                var parentDT = CommCare.TaskerTask.Constants.ParentDirectorateTask;
                var dirDueDate = CommCare.TaskerTask.Constants.DirectorateDueDate;

                var mcs_taskertaskid = parentDT["mcs_taskertaskid"]; // Guid
                var parentTaskDueDate = new Date(parentDT["mcs_directorateduedate"]); // Date Time
                var mcs_actionitem = parentDT["_mcs_actionitem_value"]; // Lookup
                var mcs_actionitem_formatted = parentDT["_mcs_actionitem_value@OData.Community.Display.V1.FormattedValue"];
                var mcs_actionitem_lookuplogicalname = parentDT["_mcs_actionitem_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var mcs_name = parentDT["mcs_name"]; // Text
                var mcs_tasker = parentDT["_mcs_tasker_value"]; // Lookup
                var mcs_tasker_formatted = parentDT["_mcs_tasker_value@OData.Community.Display.V1.FormattedValue"];
                var mcs_tasker_lookuplogicalname = parentDT["_mcs_tasker_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var approvalLevelNeeded = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
                

                var parameters = {};
                parameters["mcs_approvallevelneeded"] = approvalLevelNeeded;
                parameters["mcs_parenttasker"] = mcs_tasker;
                parameters["mcs_parenttaskername"] = mcs_tasker_formatted;
                parameters["mcs_parenttaskertype"] = mcs_tasker_lookuplogicalname;

                //parameters["mcs_parentactionitem"] = mcs_actionitem;
                //parameters["mcs_parentactionitemname"] = mcs_actionitem_formatted;
                //parameters["mcs_parentactionitemtype"] = mcs_actionitem_lookuplogicalname;

                parameters["mcs_directoratetask"] = mcs_taskertaskid;
                parameters["mcs_directoratetaskname"] = mcs_name;
                parameters["mcs_directoratetasktype"] = "mcs_taskertask";


                parameters["mcs_currentduedate"] = new Date(parentTaskDueDate);
                //var extensionReqestDate = new Date(dirDueDate);

                //extensionReqestDate.setDate(dirDueDate.getDate() + 1);
                //parameters["mcs_requestedduedate"] = extensionReqestDate;
                var extensionReqestDate = new Date(dirDueDate);
                var parentDate = new Date(dirDueDate);
                extensionReqestDate.setDate(parentDate.getDate() + 1);
                parameters["mcs_requestedduedate"] = extensionReqestDate;
                Xrm.Navigation.openForm(entityFormOptions, parameters).then(function (openFormSuccess) {
                    console.log(openFormSuccess);
                    if (openFormSuccess.savedEntityReference != null) {
                        CommCare.Shared.FormContext.data.entity.removeOnSave(openDTExtensionRequestOnSave);
                        CommCare.Shared.SetSubmitMode("mcs_directorateduedate", "always");
                        CommCare.Shared.SetFieldValue("mcs_directorateduedate", CommCare.TaskerTask.Constants.InitialDueDate);
                        console.log("CommCare.TaskerTask.Constants.InitialDueDate");
                        console.log(CommCare.TaskerTask.Constants.InitialDueDate);
                        CommCare.Shared.FormContext.data.save().then(function (createdTaskerTask) {
                            let parentExtensionReqId = openFormSuccess.savedEntityReference[0]["id"].replace("{", "").replace("}", "").toLowerCase();
                            let directorateTaskId = createdTaskerTask.savedEntityReference.id;
                            var record = {};
                            record["mcs_DirectorateTask@odata.bind"] = "/mcs_taskertasks(" + directorateTaskId + ")"; // Lookup
                            record.mcs_approvallevelneeded = approvalLevelNeeded; // Choice
                            record["mcs_ParentExtensionRequest@odata.bind"] = "/mcs_duedateextensionrequests(" + parentExtensionReqId + ")"; // Lookup
                            record.mcs_currentduedate = currentDate; // Date Time
                            record.mcs_requestedduedate = dirDueDate; // Date Time
                            record["mcs_ParentDirectorateTaskId@odata.bind"] = "/mcs_taskertasks(" + mcs_taskertaskid + ")"; // Lookup
                            Xrm.WebApi.createRecord("mcs_duedateextensionrequest", record).then(
                                function success(result) {
                                    console.log("created extension request");
                                    var newId = result.id;
                                    console.log(newId);
                                    var record = {};
                                    record["mcs_ChildExtensionRequest@odata.bind"] = "/mcs_duedateextensionrequests(" + newId + ")"; // Lookup

                                    Xrm.WebApi.updateRecord("mcs_duedateextensionrequest", parentExtensionReqId, record).then(
                                        function success(result) {
                                            var updatedId = result.id;
                                            console.log(updatedId);
                                        },
                                        function (error) {
                                            console.log(error.message);
                                        }
                                    );
                                },
                                function (error) {
                                    console.log(error.message);
                                }
                            );
                        });
                    }

                });
            }
        }, function (cancelCallback) {

        });
        
    }

    function hideShowFieldsForInternal() {
        var internal = !!CommCare.Shared.GetFieldValue("mcs_internal");
        CommCare.Shared.SetVisible("mcs_requestorgroup", internal);
        CommCare.Shared.SetVisible("mcs_name", internal);
        CommCare.Shared.SetVisible("mcs_assignedtoteam", internal);
        CommCare.Shared.SetVisible("mcs_approvallevelneeded", internal);

        CommCare.Shared.SetVisible("mcs_assignedtoteams", !internal);
        CommCare.Shared.SetVisible("mcs_assigntomultipledirectorates", !internal);
    }

    function hideShowApprovalNeeded() {
        var internal = !!CommCare.Shared.GetFieldValue("mcs_internal");
        CommCare.Shared.SetVisible("mcs_approvallevelneeded", internal);
        CommCare.Shared.SetRequired("mcs_approvallevelneeded", internal);
    }

    function limitApprovalOptions() {
        var assignToTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedtoteam"));
        var dirOption = { text: "Directorate Approval", value: CommCare.TaskerTask.Constants.ApprovalNeeded.Directorate };

        if (!!assignToTeam) {
            Xrm.WebApi.online.retrieveRecord("team", assignToTeam, "?$select=mcs_trackerteamtype").then((result) => {
                var teamType = result.mcs_trackerteamtype;
                var cnt = CommCare.Shared.FormContext.getControl("mcs_approvallevelneeded");

                if (!!cnt) {
                    var options = cnt.getOptions();
                    var hasDir = options.filter(x => x.value == CommCare.TaskerTask.Constants.ApprovalNeeded.Directorate).length > 0;

                    if (teamType == CommCare.TaskerTask.Constants.TrackerTeamType.Directorate)
                        cnt.removeOption(CommCare.TaskerTask.Constants.ApprovalNeeded.Directorate);
                    else if (!hasDir)
                        cnt.addOption(dirOption, 2);
                }
            }).catch(function (e) {
                console.log("Failed to retrieve assigned to team");
                console.log(e);
            });
        }
    }

    function defaultAssignedFromForInternal() {
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        var userId = Xrm.Utility.getGlobalContext().userSettings.userId;

        if (!!userId && !!internal) {
            CommCare.Shared.SetReadOnly("mcs_assignedfrom", true);
            CommCare.Shared.SetVisible("mcs_assignedfrom", false);

            Xrm.WebApi.online.retrieveRecord("systemuser", userId, "?$select=fullname&$expand=teammembership_association($select=teamid,name,mcs_trackerteamtype)").then((result) => {
                if (!!result.teammembership_association && result.teammembership_association.length > 0) {
                    var dirTeams = result.teammembership_association.filter(
                        x => x.mcs_trackerteamtype == CommCare.TaskerTask.Constants.TrackerTeamType.Directorate || x.mcs_trackerteamtype == CommCare.TaskerTask.Constants.TrackerTeamType.SubDirectorate
                    );
                    console.log("Directorate Teams", dirTeams);
                    if (!!dirTeams && dirTeams.length > 0) {
                        if (dirTeams.length == 1) {
                            var lookupValue = [{ id: dirTeams[0].teamid, entityType: "team", name: dirTeams[0].name }];
                            //CommCare.Shared.SetFieldValue("mcs_assignedfrom", lookupValue);
                            CommCare.Shared.SetFieldValue("mcs_assignedtoteam", lookupValue);
                            CommCare.Shared.SetReadonly("mcs_assignedtoteam", true);
                            //CommCare.Shared.SetSubmitMode("mcs_assignedfrom", "always");
                            CommCare.Shared.SetSubmitMode("mcs_assignedtoteam", "always");
                            CommCare.Shared.FormContext.getAttribute("mcs_assignedtoteam").fireOnChange();
                        }
                        else {
                            CommCare.TaskerTask.Global.AssignedFromFetch = "<filter type='or' >";

                            for (var i = 0; i < dirTeams.length; i++) {
                                CommCare.TaskerTask.Global.AssignedFromFetch += `<condition attribute='teamid' operator='eq' value='${dirTeams[i].teamid}' />`
                            }

                            CommCare.TaskerTask.Global.AssignedFromFetch += "</filter>"
                            console.log(CommCare.TaskerTask.Global.AssignedFromFetch);

                            CommCare.Shared.FormContext.getControl("mcs_assignedtoteam").addPreSearch(setAssignedFromPrefilter);
                        }
                    }
                    else {
                        console.log("No Directorate Teams Found.");
                    }
                }
                else {
                    console.log("No teams found");
                }
            }).catch(function (e) {
                console.log("Failed retrieving user.");
                console.log(e);
            });
        }

    }

    function setAssignedFromPrefilter() {
        CommCare.Shared.FormContext.getControl("mcs_assignedtoteam").addCustomFilter(CommCare.TaskerTask.Global.AssignedFromFetch);
    }

    function setAssignedFromFromAssignedToForInternal() {
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");

        if (!!internal) {
            //CommCare.Shared.SetFieldValue("mcs_assignedfrom", CommCare.Shared.GetFieldValue("mcs_assignedtoteam"));
            //CommCare.Shared.SetSubmitMode("mcs_assignedfrom", "always");

            var teamId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedtoteam"));

            if (!!teamId) {
                Xrm.WebApi.retrieveRecord("team", teamId, "?$select=_mcs_parentteam_value").then((result) => {
                    var lookupValue = [{ id: result._mcs_parentteam_value, entityType: "team", name: result["_mcs_parentteam_value@OData.Community.Display.V1.FormattedValue"] }];
                    CommCare.Shared.SetFieldValue("mcs_assignedfrom", lookupValue);
                    CommCare.Shared.SetSubmitMode("mcs_assignedfrom", "always");
                }).catch(function (e) {
                    console.log("Failed retrieving parent team");
                    console.log(e);
                });
            }
            else {
                CommCare.Shared.SetFieldValue("mcs_assignedfrom", null);
            }
        }
    }

    function showVeteranHasOpenActionItems() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var taskerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
        var parentTaskId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parenttask"));
        if (parentTaskId != null) {
            Xrm.WebApi.online.retrieveRecord("mcs_taskertask", parentTaskId, "?$select=mcs_internal").then(
                function success(result) {
                    console.log(result);
                    var mcs_internal = result["mcs_internal"]; // Boolean
                    if (mcs_internal != true) {
                        var veteran = CommCare.Shared.GetFieldValue("mcs_veteran");
                        if (veteran != null) {
                            var veteranId = CommCare.Shared.GetCleanId(veteran);
                            var defaultContactId;

                            CommCare.Shared.GetDefaultContactPromise().then(function (defaultContact) {
                                if (defaultContact != null) {
                                    defaultContactId = CommCare.Shared.GetCleanId(defaultContact);
                                    if (veteranId !== defaultContactId) {
                                        var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));

                                        Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", "?$select=mcs_trackerid&$filter=(statecode eq 0 and _mcs_veteran_value eq " + CommCare.Shared.GetCleanId(veteran) + " and mcs_trackerid ne " + actionItemId + ")").then(
                                            function success(results) {
                                                console.log(results);
                                                if (results.entities.length > 0) {
                                                    CommCare.Shared.FormContext.ui.setFormNotification("Veteran has Open Action Items.", "WARNING", "VeteranOpenActionItem");
                                                }
                                            },
                                            function (error) {
                                                console.log(error.message);
                                            }
                                        );
                                    }
                                }
                            });
                        }
                    }
                    
                },
                function (error) {
                    console.log(error.message);
                }
            );
        } else {
            Xrm.WebApi.retrieveRecord("mcs_trackeritem", taskerId, "?$select=mcs_internal").then(
                function success(result) {
                    console.log(result);
                    // Columns
                    var mcs_internal = result["mcs_internal"]; // Boolean
                    if (mcs_internal != true) {
                        var veteran = CommCare.Shared.GetFieldValue("mcs_veteran");
                        if (veteran != null) {
                            var veteranId = CommCare.Shared.GetCleanId(veteran);
                            var defaultContactId;

                            CommCare.Shared.GetDefaultContactPromise().then(function (defaultContact) {
                                if (defaultContact != null) {
                                    defaultContactId = CommCare.Shared.GetCleanId(defaultContact);
                                    if (veteranId !== defaultContactId) {
                                        var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));

                                        Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", "?$select=mcs_trackerid&$filter=(statecode eq 0 and _mcs_veteran_value eq " + CommCare.Shared.GetCleanId(veteran) + " and mcs_trackerid ne " + actionItemId + ")").then(
                                            function success(results) {
                                                console.log(results);
                                                if (results.entities.length > 0) {
                                                    CommCare.Shared.FormContext.ui.setFormNotification("Veteran has Open Action Items.", "WARNING", "VeteranOpenActionItem");
                                                }
                                            },
                                            function (error) {
                                                console.log(error.message);
                                            }
                                        );
                                    }
                                }
                            });
                        }
                    }

                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }

    function showHideEditsTextbox(isSave) {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        var concurence = CommCare.Shared.GetFieldValue("mcs_needsconcurrence");
        var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        var assignedToTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedtoteam"));
        if (isSave) {
            CommCare.Shared.SetVisible("mcs_edits", false);
        }
        else if (status == CommCare.TaskerTask.Constants.StatusReason.AgreeEdits
            || status == CommCare.TaskerTask.Constants.StatusReason.Disagree
            || (status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval && concurence == true && owner == assignedToTeam)) {
            CommCare.Shared.SetVisible("mcs_edits", true);
        } else {
            CommCare.Shared.SetVisible("mcs_edits", false);
        }

        var requireEdits = false;
        if (status == CommCare.TaskerTask.Constants.StatusReason.AgreeEdits
            || status == CommCare.TaskerTask.Constants.StatusReason.Disagree) {
            requireEdits = true;
        }
        CommCare.Shared.SetRequired("mcs_edits", requireEdits);
    }

    function hideShowAssignToMultiple() {
        var parentTasker = !!CommCare.Shared.GetFieldValue("mcs_tasker");
        CommCare.Shared.SetVisible("mcs_assigntomultipledirectorates", parentTasker);
    }

    function nullAssignedToForStatusAgree() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        console.log(status);
        console.log(CommCare.TaskerTask.Constants.CachedStatus);
        if ((status == CommCare.TaskerTask.Constants.StatusReason.Agree)
            || status == CommCare.TaskerTask.Constants.StatusReason.AgreeEdits
            || (status == CommCare.TaskerTask.Constants.StatusReason.Review && CommCare.TaskerTask.Constants.CachedStatus != CommCare.TaskerTask.Constants.StatusReason.AgreeEdits && CommCare.TaskerTask.Constants.CachedStatus != CommCare.TaskerTask.Constants.StatusReason.Agree && CommCare.TaskerTask.Constants.CachedStatus != CommCare.TaskerTask.Constants.StatusReason.Disagree)) {
            CommCare.Shared.SetFieldValue("mcs_assignedto", null);
            CommCare.Shared.SetRequired("mcs_assignedto", true);
        } else {
            CommCare.Shared.SetRequired("mcs_assignedto", false);
        }
        CommCare.TaskerTask.Constants.CachedStatus = status;
    }

    function setPriorityUrgentForConcurrenceDisagree() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        var concurence = CommCare.Shared.GetFieldValue("mcs_needsconcurrence");

        if (status == CommCare.TaskerTask.Constants.StatusReason.Disagree && concurence == true) {
            CommCare.Shared.SetFieldValue("mcs_priority", CommCare.TaskerTask.Constants.Priority.Urgent);
        }
    }

    function storeApprovalLevelNeeded(isLoad) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);

        if (isLoad == "load") {
            sessionStorage.removeItem("ApprovalLevelNeededDirTask");
        }
        else {
            var claimOnFile = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
            if (!!sessionStorage) {
                sessionStorage.setItem("ApprovalLevelNeededDirTask", claimOnFile);
            }
        }
    }

    function checkForInactiveRecordsInActionItemChain() {
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        var formType = CommCare.Shared.FormContext.ui.getFormType();
        var NoActionStatusCodeActionItem = 803750013;
        var NoActionStatusCodeTasker = 803750008;
        var NoActionStatusCodeDirTask = 803750010;
        var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
        var oData = "?$select=mcs_trackerid,mcs_patsrid,statecode,statuscode&$expand=mcs_mcs_tracker_mcs_taskertask_ActionItem($select=statecode,statuscode,mcs_name),mcs_mcs_tracker_mcs_trackeritem_ActionItem($select=statecode,statuscode,mcs_name)";

        if (internal && formType == CommCare.Shared.Constants.CREATE_FORM) {
            CommCare.Shared.SetReadOnly("mcs_whhltemplate", false);
            return;
        }

        Xrm.WebApi.retrieveRecord("mcs_tracker", actionItemId, oData).then((result) => {
            var aiState = result.statecode;
            var aiStatus = result.statuscode;
            var patsr = !!result.mcs_patsrid;
            var taskers = result.mcs_mcs_tracker_mcs_trackeritem_ActionItem;
            var dirTasks = result.mcs_mcs_tracker_mcs_taskertask_ActionItem;

            var inactiveTaksers = taskers.filter(x => x.statecode != 0 && x.statuscode != NoActionStatusCodeTasker);
            var inactiveDirTasks = dirTasks.filter(x => x.statecode != 0 && x.statuscode != NoActionStatusCodeDirTask);
            var inactiveAI = aiState != 0 && aiStatus != NoActionStatusCodeActionItem;

            if (patsr || inactiveAI || inactiveTaksers.length > 0 || inactiveDirTasks.length > 0)
                CommCare.Shared.SetReadOnly("mcs_whhltemplate", true);
            else
                CommCare.Shared.SetReadOnly("mcs_whhltemplate", false);
        }).catch((e) => {
            console.log(e);
        });
    }

    function showHideWhhlTemplate() {
        var internal = !!CommCare.Shared.GetFieldValue("mcs_internal");
        CommCare.Shared.SetVisible("mcs_whhltemplate", internal);
    }

    function buildPrefilterFetchXml() {
        var initialFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";
        var teamId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedtoteam"));
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        var teamArray = [];
        CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch = "<filter type='and'>";

        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").removePreSearch(filterRequestorGroupLookup);

        if (!!teamId) {
            returnTeamHierarchy(teamId, teamArray).then((teamHierarchy) => {
                teamArray = teamHierarchy;
                return Xrm.WebApi.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_requestorgroup_value,_mcs_team_value&$filter=(statecode eq 0 and mcs_name eq 'AdditionalRequestorGroupsByTeam')")
            }).then((luFilters) => {
                var needsFilter = false;
                for (var i = 0; i < luFilters.entities.length; i++) {
                    if (!teamArray.includes(luFilters.entities[i]._mcs_team_value.toLowerCase()) || !internal) {
                        CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${luFilters.entities[i]._mcs_requestorgroup_value}' />`;
                        needsFilter = true;
                    }
                }

                CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch += "</filter>";

                if (needsFilter == false)
                    CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch = initialFetch;
                else
                    prefilterRequestorGroup();

                console.log("Requestor Group Filter");
                console.log(CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch);
            }).catch((e) => {
                console.log(e);
            });
        }
        else {
            //CommCare.Shared.SetFieldValue("mcs_requestorgroup", null);

            Xrm.WebApi.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_requestorgroup_value,_mcs_team_value&$filter=(statecode eq 0 and mcs_name eq 'AdditionalRequestorGroupsByTeam')").then((luFilters) => {
                for (var i = 0; i < luFilters.entities.length; i++) {
                    if (!teamArray.includes(luFilters.entities[i]._mcs_team_value.toLowerCase()) || !internal) {
                        CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${luFilters.entities[i]._mcs_requestorgroup_value}' />`;
                    }
                }

                if (!internal)
                    CommCare.Tasker.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${directInquiryGroupId}' />`;

                CommCare.Tasker.Constants.GlobalRequestorGroupFetch += "</filter>";
                console.log("Requestor Group Filter");
                console.log(CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch);

                prefilterRequestorGroup();
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    function prefilterRequestorGroup() {
        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").addPreSearch(filterRequestorGroupLookup);
    }

    function filterRequestorGroupLookup() {
        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").addCustomFilter(CommCare.TaskerTask.Constants.GlobalRequestorGroupFetch);
    }

    function hideShowTabsBasedOnExecutiveDirectorateTeam() {
        var teamId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedtoteam"));
        var luFilters;

        Xrm.WebApi.retrieveMultipleRecords("mcs_lookupfilter", "?$select=mcs_tabname,_mcs_team_value&$filter=mcs_name eq 'CramTabVisibilityByTeam'").then((results) => {
            luFilters = results.entities;
            if (!!teamId)
                return returnTeamHierarchy(teamId, []);
            else
                hideAllTabsFromSearchResult(luFilters);
        }).then((teamArray) => {
            if (!!teamArray) {
                for (var i = 0; i < luFilters.length; i++) {
                    var tab = CommCare.Shared.FormContext.ui.tabs.get(luFilters[i].mcs_tabname);
                    if (!!tab)
                        tab.setVisible(teamArray.includes(luFilters[i]._mcs_team_value.toLowerCase()));
                }
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    function hideAllTabsFromSearchResult(luFilters) {
        for (var i = 0; i < luFilters.length; i++) {
            var tab = CommCare.Shared.FormContext.ui.tabs.get(luFilters[i].mcs_tabname);
            if (!!tab)
                tab.setVisible(false);
        }
    }

    function returnTeamHierarchy(teamId, array) {
        return retrieveTeam(teamId).then((result) => {
            if (!!result) {
                array.push(result.teamid.toLowerCase());
                if (!!result._mcs_parentteam_value)
                    return returnTeamHierarchy(result._mcs_parentteam_value, array);
                else
                    return array;
            }
        });
    }

    function retrieveTeam(teamId) {
        return Xrm.WebApi.retrieveRecord("team", teamId, "?$select=teamid,_mcs_parentteam_value,name,mcs_trackerteamtype").then(
            function success(result) {
                return result;
            },
            function (error) {
                console.log(error.message);
            }
        );
    }

    function removeReviewStatusForNoConcurrence(isLoad) {
        var needsConcurrence = CommCare.Shared.GetFieldValue("mcs_needsconcurrence");
        var statusControl = CommCare.Shared.FormContext.getControl("statuscode");
        if (isLoad) {
            CommCare.TaskerTask.Constants.StatusCodeOptions = CommCare.Shared.FormContext.getAttribute("statuscode").getOptions();
        } else {
            statusControl.clearOptions();
            for (var i = 0; i < CommCare.TaskerTask.Constants.StatusCodeOptions.length; i++) {
                statusControl.addOption(CommCare.TaskerTask.Constants.StatusCodeOptions[i]);
            }
        }
        console.log(needsConcurrence);
        if (needsConcurrence == false) {

            statusControl.removeOption(CommCare.TaskerTask.Constants.StatusReason.Review);
        }
    }

    function lockConcurrenceIfTrue() {
        var needsConcurrence = CommCare.Shared.GetFieldValue("mcs_needsconcurrence");
        if (needsConcurrence == true) {
            CommCare.Shared.SetReadOnly("mcs_needsconcurrence", true);
        }
    }

    function blockSaveForNewWithAssoicatedVeteranActionItems() {
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        if (!!internal) { return }
        var taskerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
        var parentTaskId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parenttask"));
        if (parentTaskId != null) {
            Xrm.WebApi.retrieveRecord("mcs_taskertask", parentTaskId, "?$select=mcs_internal").then(
                function success(result) {
                    console.log(result);
                    var mcs_internal = result["mcs_internal"]; // Boolean
                    if (mcs_internal != true) {
                        var assocatedVeteranId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_veteran"));
                        if (!!assocatedVeteranId) {
                            var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
                            //Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", `?$select=mcs_trackerid&$filter=statecode eq 0 and  _mcs_veteran_value eq ${assocatedVeteranId} and  mcs_trackerid ne ${actionItemId}`).then(
                            Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", `?$select=mcs_trackerid&$filter=(statecode eq 0 and mcs_trackerid ne ${actionItemId} and mcs_Veteran/fullname ne 'N/A N/A' and mcs_Veteran/contactid eq ${assocatedVeteranId})`).then(
                                function success(results) {
                                    if (results.entities.length > 0) {
                                        CommCare.Shared.FormContext.data.entity.addOnSave(blockSave);
                                    }
                                },
                                function (error) {
                                    Xrm.Utility.alertDialog(error.message);
                                }
                            );

                        }
                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        } else {
            Xrm.WebApi.retrieveRecord("mcs_trackeritem", taskerId, "?$select=mcs_internal").then(
                function success(result) {
                    console.log(result);
                    var mcs_internal = result["mcs_internal"]; // Boolean
                    if (mcs_internal != true) {
                        var assocatedVeteranId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_veteran"));
                        if (!!assocatedVeteranId) {
                            var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
                            //Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", `?$select=mcs_trackerid&$filter=statecode eq 0 and  _mcs_veteran_value eq ${assocatedVeteranId} and  mcs_trackerid ne ${actionItemId}`).then(
                            Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", `?$select=mcs_trackerid&$filter=(statecode eq 0 and mcs_trackerid ne ${actionItemId} and mcs_Veteran/fullname ne 'N/A N/A' and mcs_Veteran/contactid eq ${assocatedVeteranId})`).then(
                                function success(results) {
                                    if (results.entities.length > 0) {
                                        CommCare.Shared.FormContext.data.entity.addOnSave(blockSave);
                                    }
                                },
                                function (error) {
                                    Xrm.Utility.alertDialog(error.message);
                                }
                            );
                        }
                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }

    function blockSave(context) {
        context.getEventArgs().preventDefault();
        var confrimStrings = {
            cancelButtonLabel: "Cancel",
            confirmButtonLabel: "Confirm",
            text: "Please confirm that you want to create this record as the Veteran has an Open Action Item(s)",
            title: "Veteran with open action items"
        };

        Xrm.Navigation.openConfirmDialog(confrimStrings).then(
            function (success) {
                if (success.confirmed) {
                    CommCare.Shared.FormContext.data.entity.removeOnSave(blockSave);
                    CommCare.Shared.FormContext.data.save();
                } else {
                    CommCare.Shared.FormContext.ui.close();
                }
            }
        );
    }

    function showHideOverdueReason() {
        let dueDate = CommCare.Shared.GetFieldValue("mcs_directorateduedate");
        let showRequireOverdueReason = false;
        if (dueDate < new Date()) {
            let status = CommCare.Shared.GetFieldValue("statuscode");
            if (status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval) {
                showRequireOverdueReason = true;
                CommCare.Shared.FormContext.data.entity.addOnSave(lockOverdueReasonFieldsOnSave);
            }
        }
        CommCare.Shared.SetRequired("mcs_overduereason", showRequireOverdueReason);
        CommCare.Shared.SetVisible("mcs_overduereason", showRequireOverdueReason);
        showHideOtherDetails();
    }

    function showHideOtherDetails() {
        let overdueReason = CommCare.Shared.GetFieldValue("mcs_overduereason");
        let status = CommCare.Shared.GetFieldValue("statuscode");

        var showOther = false;
        if (status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval) {
            if (overdueReason != null && overdueReason.includes(CommCare.TaskerTask.Constants.OverDueReasons.Other)) {
                showOther = true;
            }
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

    function lockOverdueReasonFieldsOnLoad() {
        let owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        let assignedFromTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_assignedfrom"));
        let ownerIsAssignedToTeam = false;
        if (assignedFromTeam != null) {
            ownerIsAssignedToTeam = owner == assignedFromTeam ? true : false;
        }
        let status = CommCare.Shared.GetFieldValue("statuscode");

        if (status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval && ownerIsAssignedToTeam) {
            let overdueReason = CommCare.Shared.GetFieldValue("mcs_overduereason");
            if (overdueReason != null) {
                CommCare.Shared.SetReadOnly("mcs_overduereason", true);
            }

            let overdueDetail = CommCare.Shared.GetFieldValue("mcs_overduereasonotherdetails");
            if (overdueDetail != null) {
                CommCare.Shared.SetReadOnly("mcs_overduereasonotherdetails", true);
            }
        }
    }

    function showHideBillingOutcome(show, require) {
        if (show == true) {
            let actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
            Xrm.WebApi.retrieveRecord("mcs_tracker", actionItemId, "?$select=mcs_patsrcasesubtype,mcs_patsrcasetype").then(
                function success(result) {
                    console.log(result);
                    var mcs_patsrcasesubtype = result["mcs_patsrcasesubtype"]; // Text
                    var mcs_patsrcasetype = result["mcs_patsrcasetype"]; // Text
                    if (mcs_patsrcasetype == "Investigation" && mcs_patsrcasesubtype == "Billing Issues") {
                        CommCare.Shared.SetVisible("mcs_billingoutcome", true);
                        CommCare.Shared.SetVisible("mcs_patsroutcome", false);
                        CommCare.Shared.SetRequired("mcs_patsroutcome", false);
                        if (require == true) {
                            CommCare.Shared.SetRequired("mcs_billingoutcome", true);
                        } else {
                            CommCare.Shared.SetRequired("mcs_billingoutcome", false);
                        }
                    } else {
                        CommCare.Shared.SetVisible("mcs_billingoutcome", false);
                        CommCare.Shared.SetRequired("mcs_billingoutcome", false);
                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );

        } else {
            CommCare.Shared.SetVisible("mcs_billingoutcome", false);
            CommCare.Shared.SetRequired("mcs_billingoutcome", false);
        }
    }

    //function showHideAttestationSection() {
    //    let status = CommCare.Shared.GetFieldValue("statuscode");
    //    if (status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval) {
    //        CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Attestation").setVisible(true);
    //        CommCare.Shared.SetRequired("mcs_attestation1", true);
    //        CommCare.Shared.SetRequired("mcs_attestation2", true);
    //        CommCare.Shared.SetRequired("mcs_attestation3", true);
    //    } else {
    //        CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Attestation").setVisible(false);
    //        CommCare.Shared.SetRequired("mcs_attestation1", false);
    //        CommCare.Shared.SetRequired("mcs_attestation2", false);
    //        CommCare.Shared.SetRequired("mcs_attestation3", false);
    //    }
    //}

    //function addRemoveBlockAttestationSave() {
    //    let status = CommCare.Shared.GetFieldValue("statuscode");
    //    let attestation1 = CommCare.Shared.GetFieldValue("mcs_attestation1");
    //    let attestation2 = CommCare.Shared.GetFieldValue("mcs_attestation2");
    //    let attestation3 = CommCare.Shared.GetFieldValue("mcs_attestation3");
    //    if (status == CommCare.TaskerTask.Constants.StatusReason.ReadyForApproval && (attestation1 == false || attestation2 == false || attestation3 == false)) {
    //        CommCare.Shared.FormContext.data.entity.addOnSave(blockSaveForAttestation);
    //    } else {
    //        CommCare.Shared.FormContext.ui.clearFormNotification("AttestationBlocked");
    //        CommCare.Shared.FormContext.data.entity.removeOnSave(blockSaveForAttestation);
    //    }
    //}

    //function blockSaveForAttestation(context) {
    //    context.getEventArgs().preventDefault();
    //    CommCare.Shared.FormContext.ui.setFormNotification("You must attest that all requirements have been met prior to setting the status to Ready for Approval", "ERROR", "AttestationBlocked");
    //}
})();
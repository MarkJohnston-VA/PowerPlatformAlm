/// <reference path="Common/CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.Tasker) == "undefined") {
    CommCare.Tasker = {
        __namespace: true
    };
}

if (typeof (CommCare.Tasker.Global) == "undefined") {
    CommCare.Tasker.Global = {
        __namespace: true
    };
}
if (typeof (CommCare.Tasker.Constants) == "undefined") {
    CommCare.Tasker.Constants = {
        __namespace: true
    };
}

CommCare.Tasker.Constants.ExtensionRequestMethodEnabled = false;

CommCare.Tasker.Constants.StatusReason = {
    Open: 1,
    ReadyForApproval: 803750000,
    Approved: 803750002,
    Rejected: 803750001,
    Reopened: 803750003,
    Closed: 2,
    Review: 803750004,
    Agree: 803750005,
    AgreeEdits: 803750006,
    Disagree: 803750007,
    NoAction: 803750008
}

CommCare.Tasker.Constants.PatsROutcomes = {
    Approved: 803750000,
    Disapproved: 803750001,
    Founded: 803750002,
    Unfounded: 803750003
};

CommCare.Tasker.Constants.TrackerTeamType = {
    Directorate: 803750000,
    ExecutiveDirectorate: 803750001,
    Region: 803750003,
    VISN: 803750002,
    SubDirectorate: 803750004
};

CommCare.Tasker.Constants.ApprovalNeeded = {
    NoHigher: 153190000,
    Directorate: 153190001,
    ExecutiveDirectorate: 153190002,
    Full: 153190003
};

CommCare.Tasker.Constants.Priority = {
    Urgent: 806860000,
    NonUrgent: 806860001
}

CommCare.Tasker.Constants.OverDueReasons = {
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

CommCare.Tasker.Constants.Main_Form = "5810C50A-B58D-41CD-8552-AB5A782BEECC";
CommCare.Tasker.Constants.QuickCreate_Form = "47082357-D7CF-400C-8D6D-A1C19670E22F";
CommCare.Tasker.Constants.FrontOfficeTeam = "2d9ad717-246a-eb11-a812-001dd800a140";

CommCare.Tasker.Global.ExecutiveDirectorateFetch = "";
CommCare.Tasker.Constants.FormType = null;
CommCare.Tasker.Constants.StatusCodeOptions = null;
CommCare.Tasker.Constants.CachedStatus = null;
CommCare.Tasker.Constants.GlobalRequestorGroupFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";
//CommCare.Tasker.Constants.GlobalResponseTemplateFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";
//CommCare.Tasker.Constants.GlobalNoteTemplateFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";

CommCare.Tasker.Global = (function () {
    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context, formParam) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        CommCare.Shared.GetFormContext(context);
        console.log("gotContext");
        CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_PersonSearchAIT");

        if (CommCare.Tasker.Constants.CachedStatus == null) {
            CommCare.Tasker.Constants.CachedStatus = CommCare.Shared.GetFieldValue("statuscode");
        }

        if (formParam != null) {
            CommCare.Tasker.Constants.FormType = formParam;
        }

        buildPrefilterFetchXml();
        prefilterRequestorGroup();
        CommCare.Shared.SetOnChange("mcs_executivedirectorateteam", buildPrefilterFetchXml);
        hideShowApprovalNeeded();
        limitApprovalOptions();
        CommCare.Shared.SetOnChange("mcs_duedate", disallowPastDueDates);

        var formType = CommCare.Shared.FormContext.ui.getFormType();

        if (formType === CommCare.Shared.Constants.CREATE_FORM) {
            var internal = CommCare.Shared.GetFieldValue("mcs_internal");

            //Internal Only
            if (!!internal) {
                showHideFieldsForInternalQC();
                defaultExecutiveDirectorateForInternal();
            }
            else {
                offsetInitialDueDate();
                closeQuickCreateIfActionItemIsRFR();
                showHideExecutiveDirectoratesFields();
                CommCare.Shared.SetOnChange("mcs_assigntomultipleexecutivedirectorates", showHideExecutiveDirectoratesFields);
                CommCare.Shared.FormContext.data.entity.addOnSave(blockSaveForNewWithAssoicatedVeteranActionItems);
            }
        }

        var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
        if ((currentForm != null) && (currentForm.getId().toLowerCase() === CommCare.Tasker.Constants.Main_Form.toLowerCase())) {
            //On Load
            lockResponseWHHLFields(true);
            showHideRequestorGroupFields();
            showHideReasonForRejection();
            showHideRejectionReasonMulti();
            showHideReopenReason();
            unlockDueDate13FrontOffice();
            lockReasonForRejection();
            lockStatusReason();
            showHideWHHLResolutionFields();
            showHideMPIHTML();
            showHideEditsTextbox(false);
            removeReviewStatusForNoConcurrence(true);
            checkForInactiveRecordsInActionItemChain();
            showHideResponsibleNetworkOther();
            hideShowTabsBasedOnExecutiveDirectorateTeam();
            showHideOverdueReason();
            showHideOtherDetails();
            //buildResponseTemplateFetch();
            //buildNoteTemplateFetch();
            addRemoveBlockAttestationSave();
            showHideAttestationSection();

            //On Change
            CommCare.Shared.SetOnChange("statuscode", unlockResponseWHHLFields);
            CommCare.Shared.SetOnChange("statuscode", showHideReasonForRejection);
            CommCare.Shared.SetOnChange("statuscode", showHideRejectionReasonMulti);
            CommCare.Shared.SetOnChange("statuscode", showHideReopenReason);
            CommCare.Shared.SetOnChange("statuscode", lockReasonForRejection);
            CommCare.Shared.SetOnChange("statuscode", function () { lockResponseWHHLFields(true); });
            CommCare.Shared.SetOnChange("statuscode", showHideWHHLResolutionFields);
            CommCare.Shared.SetOnChange("statuscode", function () { showHideEditsTextbox(false); });
            CommCare.Shared.SetOnChange("statuscode", nullAssignedToForStatusAgree);
            CommCare.Shared.SetOnChange("statuscode", setPriorityUrgentForConcurrenceDisagree);
            CommCare.Shared.SetOnChange("statuscode", showHideOverdueReason);
            CommCare.Shared.SetOnChange("statuscode", addRemoveBlockAttestationSave);
            CommCare.Shared.SetOnChange("statuscode", showHideAttestationSection);
            CommCare.Shared.SetOnChange("ownerid", lockReasonForRejection);
            CommCare.Shared.SetOnChange("ownerid", lockStatusReason);
            //CommCare.Shared.SetOnChange("ownerid", buildResponseTemplateFetch);
            CommCare.Shared.SetOnChange("mcs_dateveterancontacted", disallowFutureReportDate);
            CommCare.Shared.SetOnChange("mcs_executivedirectorateteam", hideShowTabsBasedOnExecutiveDirectorateTeam);
            CommCare.Shared.SetOnChange("mcs_needsconcurrence", function () { removeReviewStatusForNoConcurrence(false); });
            CommCare.Shared.SetOnChange("mcs_needsconcurrence", setPriorityUrgentForConcurrenceDisagree);
            CommCare.Shared.SetOnChange("mcs_pointofcontactphonenumber", validatePOCPhoneNumber);
            CommCare.Shared.SetOnChange("mcs_responsiblenetwork", showHideResponsibleNetworkOther);
            CommCare.Shared.SetOnChange("mcs_whhltemplate", showHideWHHLSections);
            CommCare.Shared.SetOnChange("mcs_duedate", showHideOverdueReason);
            CommCare.Shared.SetOnChange("mcs_duedate", validateDueDatePastActionItemDueDateQC);
            CommCare.Shared.SetOnChange("mcs_overduereason", showHideOtherDetails);
            //CommCare.Shared.SetOnChange("mcs_notetemplate", showNoteTemplate);
            //CommCare.Shared.SetOnChange("mcs_responsetemplate", setResponseFromTemplate);
            CommCare.Shared.SetOnChange("mcs_attestation1", addRemoveBlockAttestationSave);
            CommCare.Shared.SetOnChange("mcs_attestation2", addRemoveBlockAttestationSave);
            CommCare.Shared.SetOnChange("mcs_attestation3", addRemoveBlockAttestationSave);
            //CommCare.Shared.SetOnChange("ownerid", function () { lockResponseWHHLFields(true); });

            //On Save
            CommCare.Shared.FormContext.data.entity.addOnSave(function () { lockResponseWHHLFields(false); });
            CommCare.Shared.FormContext.data.entity.addOnSave(form_OnSave);

            //Post Save Events
            CommCare.Shared.FormContext.data.entity.addOnPostSave(function () { showHideEditsTextbox(true); });
            CommCare.Shared.FormContext.data.entity.addOnPostSave(refreshFormOnSave);

            //CommCare.Shared.SetSubmitMode("mcs_responsetemplate", "never");
            //CommCare.Shared.SetSubmitMode("mcs_notetemplate", "never");
        }

        if (CommCare.Tasker.Constants.FormType == "quickcreate") {
            showVeteranHasOpenActionItems();
            //CommCare.Shared.SetOnChange("mcs_duedate", validateDueDatePastActionItemDueDateQC);
        }
    }

    function form_OnSave(context) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);

        if (validatePOCPhoneNumber() == false) {
            console.log("Invalid Phone Number.  Stopping form save.");
            context.getEventArgs().preventDefault();
        }

        //var template = CommCare.Shared.GetFieldValue("mcs_notetemplate");

        //if (!!template) {
        //    Xrm.Utility.showProgressIndicator("Creating Note from Template");
        //    var noteTitle = CommCare.Shared.GetFieldValue("mcs_notetitle");
        //    var noteText = CommCare.Shared.GetFieldValue("mcs_notetext");

        //    createNoteRecordFromFormComponentSave(noteTitle, noteText);
        //    clearNoteTemplateField();
        //}
    }

    //function prefilterResponseTemplate() {
    //    CommCare.Shared.FormContext.getControl("mcs_responsetemplate").addPreSearch(filterResponseTemplateLookup);
    //}

    //function filterResponseTemplateLookup() {
    //    CommCare.Shared.FormContext.getControl("mcs_responsetemplate").addCustomFilter(CommCare.Tasker.Constants.GlobalResponseTemplateFetch);
    //}

    //function buildResponseTemplateFetch() {
    //    var owner = CommCare.Shared.GetFieldValue("ownerid");
    //    var ownerId = CommCare.Shared.GetCleanId(owner);
    //    var odata = "?$select=mcs_notetemplateid,mcs_name";
    //    odata += "&$expand=mcs_NoteTemplate_Team_Team($select=teamid,name)";
    //    odata += ",mcs_NoteTemplate_mcs_NoteTemplateTable_mc($select=mcs_notetemplatetableid,mcs_name,mcs_tablelogicalname)";
    //    odata += "&$filter=statecode eq 0";

    //    CommCare.Shared.FormContext.getControl("mcs_responsetemplate").removePreSearch(filterResponseTemplateLookup);

    //    Xrm.WebApi.retrieveMultipleRecords("mcs_notetemplate", odata).then((results) => {
    //        var r = results.entities;
    //        var x = r.filter(z =>
    //            z.mcs_NoteTemplate_Team_Team.some(y => y.teamid == ownerId)
    //            && z.mcs_NoteTemplate_mcs_NoteTemplateTable_mc.some(a => a.mcs_tablelogicalname == "mcs_trackeritem")
    //        );

    //        CommCare.Tasker.Constants.GlobalResponseTemplateFetch = "<filter type='or'>";

    //        if (x.length > 0) {
    //            for (var i = 0; i < x.length; i++) {
    //                CommCare.Tasker.Constants.GlobalResponseTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='${x[i].mcs_notetemplateid}' />`;
    //            }
    //        }
    //        else {
    //            CommCare.Tasker.Constants.GlobalResponseTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='00000000-0000-0000-0000-000000000000' />`;
    //        }

    //        CommCare.Tasker.Constants.GlobalResponseTemplateFetch += "</filter>";

    //        prefilterResponseTemplate();

    //    }).catch((e) => {
    //        console.log("Error retrieving Templates");
    //        console.error(e);
    //    });
    //}

    //function setResponseFromTemplate() {
    //    var template = CommCare.Shared.GetFieldValue("mcs_responsetemplate");

    //    if (!!template) {
    //        Xrm.WebApi.retrieveRecord("mcs_notetemplate", CommCare.Shared.GetCleanId(template), "?$select=mcs_notetext,mcs_notetitle").then((result) => {
    //            CommCare.Shared.SetFieldValue("mcs_response", result.mcs_notetext);
    //        }).catch((e) => {
    //            console.log("Error retrieving template");
    //            console.error(e);
    //        });
    //    }
    //    else {
    //        CommCare.Shared.SetFieldValue("mcs_response", null);
    //    }
    //}

    //function prefilterNoteTemplate() {
    //    CommCare.Shared.FormContext.getControl("mcs_notetemplate").addPreSearch(filterNoteTemplateLookup);
    //}

    //function filterNoteTemplateLookup() {
    //    CommCare.Shared.FormContext.getControl("mcs_notetemplate").addCustomFilter(CommCare.Tasker.Constants.GlobalNoteTemplateFetch);
    //}

    //function buildNoteTemplateFetch() {
    //    var owner = CommCare.Shared.GetFieldValue("ownerid");
    //    var ownerId = CommCare.Shared.GetCleanId(owner);
    //    var odata = "?$select=mcs_notetemplateid,mcs_name";
    //    odata += "&$expand=mcs_NoteTemplate_Team_Team($select=teamid,name)";
    //    odata += ",mcs_NoteTemplate_mcs_NoteTemplateTable_mc($select=mcs_notetemplatetableid,mcs_name,mcs_tablelogicalname)";
    //    odata += "&$filter=statecode eq 0";

    //    CommCare.Shared.FormContext.getControl("mcs_notetemplate").removePreSearch(filterNoteTemplateLookup);

    //    Xrm.WebApi.retrieveMultipleRecords("mcs_notetemplate", odata).then((results) => {
    //        var r = results.entities;
    //        var x = r.filter(z =>
    //            z.mcs_NoteTemplate_Team_Team.some(y => y.teamid == ownerId)
    //            && z.mcs_NoteTemplate_mcs_NoteTemplateTable_mc.some(a => a.mcs_tablelogicalname == "mcs_trackeritem")
    //        );

    //        CommCare.Tasker.Constants.GlobalNoteTemplateFetch = "<filter type='or'>";

    //        if (x.length > 0) {
    //            for (var i = 0; i < x.length; i++) {
    //                CommCare.Tasker.Constants.GlobalNoteTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='${x[i].mcs_notetemplateid}' />`;
    //            }
    //        }
    //        else {
    //            CommCare.Tasker.Constants.GlobalNoteTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='00000000-0000-0000-0000-000000000000' />`;
    //        }

    //        CommCare.Tasker.Constants.GlobalNoteTemplateFetch += "</filter>";

    //        prefilterNoteTemplate();

    //    }).catch((e) => {
    //        console.log("Error retrieving Templates");
    //        console.error(e);
    //    });
    //}

    //function createNoteRecordFromFormComponentSave(NoteTitle, NoteText) {
    //    var record = {};
    //    record.notetext = NoteText;
    //    record.subject = NoteTitle;
    //    record["objectid_mcs_trackeritem@odata.bind"] = `/mcs_trackeritems(${CommCare.Shared.FormContext.data.entity.getId().replace(/[{}]/g, "")})`;

    //    Xrm.WebApi.createRecord("annotation", record).then((result) => {
    //        console.log(`Created Note with Id: ${result.id}`);
    //        var timeline = CommCare.Shared.FormContext.getControl("Timeline");
    //        if (!!timeline) timeline.refresh();
    //        Xrm.Utility.closeProgressIndicator();
    //    }).catch((e) => {
    //        console.error(e);
    //        Xrm.Utility.closeProgressIndicator();
    //    });
    //}

    //function clearNoteTemplateField() {
    //    CommCare.Shared.SetFieldValue("mcs_notetemplate", null);
    //    CommCare.Shared.SetFieldValue("mcs_notetitle", null);
    //    CommCare.Shared.SetFieldValue("mcs_notetext", null);

    //    var att = CommCare.Shared.FormContext.getAttribute("mcs_notetemplate");
    //    if (!!att) att.fireOnChange();
    //}

    //function showNoteTemplate() {
    //    var template = CommCare.Shared.GetFieldValue("mcs_notetemplate");

    //    setSectionVisibility("NoteTemplateFields", !!template);
    //    CommCare.Shared.SetRequired("mcs_notetitle", !!template);
    //    CommCare.Shared.SetRequired("mcs_notetext", !!template);

    //    if (!!template) {
    //        Xrm.WebApi.retrieveRecord("mcs_notetemplate", CommCare.Shared.GetCleanId(template), "?$select=mcs_notetext,mcs_notetitle").then((result) => {
    //            CommCare.Shared.SetFieldValue("mcs_notetitle", result.mcs_notetitle);
    //            CommCare.Shared.SetFieldValue("mcs_notetext", result.mcs_notetext);
    //        }).catch((e) => {
    //            console.log("Error retrieving note template");
    //            console.error(e);
    //        });
    //    }
    //    else {
    //        CommCare.Shared.SetFieldValue("mcs_notetitle", null);
    //        CommCare.Shared.SetFieldValue("mcs_notetext", null);
    //    }
    //}

    //function setSectionVisibility(section, vis) {
    //    if (vis === void 0) vis = true;
    //    CommCare.Shared.FormContext.ui.tabs.get().some((tab) => {
    //        var sec = tab.sections.get(section);
    //        if (sec) {
    //            sec.setVisible(vis);
    //            return true;
    //        }
    //        else {
    //            return false;
    //        }
    //    });
    //}

    function checkForInactiveRecordsInActionItemChain() {
        var NoActionStatusCodeActionItem = 803750013;
        var NoActionStatusCodeTasker = 803750008;
        var NoActionStatusCodeDirTask = 803750010;
        var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
        var oData = "?$select=mcs_trackerid,mcs_patsrid,statecode,statuscode&$expand=mcs_mcs_tracker_mcs_taskertask_ActionItem($select=statecode,statuscode,mcs_name),mcs_mcs_tracker_mcs_trackeritem_ActionItem($select=statecode,statuscode,mcs_name)";

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

    function refreshFormOnSave() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.Tasker.Constants.StatusReason.Review) {
            CommCare.Shared.SetRequired("mcs_assignedto", false);
        }
        CommCare.Shared.FormContext.data.refresh(false);
    }

    function showHideWHHLResolutionFields() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        //var patsRId = CommCare.Shared.GetFieldValue("mcs_patsrid");
        var status = CommCare.Shared.GetFieldValue("statuscode");
        try {
            Xrm.WebApi.online.retrieveRecord("mcs_tracker", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem")), "?$select=mcs_whhlresolutioncomponents, mcs_patsrid").then(function success(result) {
                var whhlJson = result.mcs_whhlresolutioncomponents;
                var patsRId = result.mcs_patsrid;
                //console.log(whhlJson);
                if (patsRId != null && whhlJson != null) {

                    //console.log(whhlJson);
                    var whhlObj = JSON.parse(whhlJson);
                    //console.log(whhlObj["Fields"]);

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
                        //console.log(fieldObject);
                        if (fieldObject["Show"] == true) {
                            CommCare.Shared.SetVisible(fieldName, true);

                            if (fieldObject["Require"] == true && (status == CommCare.Tasker.Constants.StatusReason.ReadyForApproval || status == CommCare.Tasker.Constants.StatusReason.Approved)) {
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
                            var approvedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Tasker.Constants.PatsROutcomes.Approved);
                            var disApprovedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Tasker.Constants.PatsROutcomes.Disapproved);
                            var foundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Tasker.Constants.PatsROutcomes.Founded);
                            var unfoundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Tasker.Constants.PatsROutcomes.Unfounded);
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
                    CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Response").setVisible(false);

                } else {
                    showHideWHHLSections();
                }
            });

        } catch (ex) {
            console.log(ex);
            showHideWHHLSections();
        }
    }

    function lockStatusReason() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
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
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        var approvalLevel = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");

        is13FrontOfficeUser().then(function (isFrontOfficeUser) {
            var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));

            if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Rejected && owner == CommCare.Tasker.Constants.FrontOfficeTeam && isFrontOfficeUser) {
                CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", false);
                CommCare.Shared.SetReadOnly("mcs_reasonforrejection", false);
            }
            else if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Rejected && !!internal && CommCare.Tasker.Constants.ApprovalNeeded.NoHigher) {
                CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", false);
                CommCare.Shared.SetReadOnly("mcs_reasonforrejection", false);
            }
            else {
                CommCare.Shared.SetReadOnly("mcs_rejectionreasonmulti", true);
                CommCare.Shared.SetReadOnly("mcs_reasonforrejection", true);
            }
        });

    }

    function showHideReopenReason() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Reopened) {
            CommCare.Shared.SetVisible("mcs_reopenreason", true);
            CommCare.Shared.SetRequired("mcs_reopenreason", true);
        } else {
            CommCare.Shared.SetVisible("mcs_reopenreason", false);
            CommCare.Shared.SetRequired("mcs_reopenreason", false);
        }
    }

    function closeQuickCreateIfActionItemIsRFR() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM) {
            Xrm.WebApi.online.retrieveRecord("mcs_tracker", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem")), "?$select=statuscode,mcs_frontofficeduedate").then(function success(result) {
                if (result.statuscode == CommCare.Tasker.Constants.StatusReason.ReadyForApproval) {
                    var alertStrings = { text: "The Action Item is in Ready for Review Status.  No new items can be added to it at this time.", title: "Action Item is Ready for Review" };
                    var alertOptions = { height: 120, width: 260 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                        CommCare.Shared.FormContext.ui.close();
                    },
                        (error) => {
                            console.log("Error in closing dialog", error);
                        });
                } else if (result.mcs_frontofficeduedate == null) {
                    var alertStrings = { text: "A Front Office due date is required.  No new items can be added to it at this time.", title: "Front Office due date required" };
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
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
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

    function disallowFutureReportDate() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        if (CommCare.Shared.GetFieldValue("mcs_dateveterancontacted") != null) {
            CommCare.Shared.FormContext.getControl("mcs_dateveterancontacted").clearNotification("reportdatevalidation");
            if (CommCare.Shared.GetFieldValue("mcs_dateveterancontacted").setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
                CommCare.Shared.FormContext.getControl("mcs_dateveterancontacted").setNotification("A report date on or before today is required.", "reportdatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_dateveterancontacted").clearNotification("reportdatevalidation");
        }
    }

    function offsetInitialDueDate() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        Xrm.WebApi.online.retrieveRecord("mcs_tracker", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem")), "?$select=mcs_frontofficeduedate").then(function success(result) {
            parentDueDate = result["mcs_frontofficeduedate"];
            //console.log(parentDueDate);
            var parentDT = new Date(parentDueDate);
            var newDate = new Date(parentDT.getFullYear(), parentDT.getMonth(), parentDT.getDate() - 1, parentDT.getHours(), parentDT.getMinutes());
            //console.log(newDate);

            //console.log(CommCare.Shared.GetFieldValue("mcs_duedate"));
            if (CommCare.Shared.GetFieldValue("mcs_duedate") == null) {
                //set the newDate
                CommCare.Shared.SetFieldValue("mcs_duedate", newDate);
                CommCare.Shared.FormContext.getAttribute("mcs_duedate").fireOnChange();
            }
        });


    }

    function showHideReasonForRejection() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var showRequireReasonForRejection = (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Rejected
            || CommCare.Shared.GetFieldValue("mcs_reasonforrejection") != null);
        CommCare.Shared.SetVisible("mcs_reasonforrejection", showRequireReasonForRejection);
        CommCare.Shared.SetRequired("mcs_reasonforrejection", showRequireReasonForRejection);
    }

    function showHideRejectionReasonMulti() {
        var showRejectionReasonMulti = CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Disagree
            || CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Rejected;
        CommCare.Shared.SetVisible("mcs_rejectionreasonmulti", showRejectionReasonMulti);
        CommCare.Shared.SetRequired("mcs_rejectionreasonmulti", showRejectionReasonMulti);
    }

    function unlockResponseWHHLFields() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.ReadyForApproval
            || CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.AgreeEdits) {
            var responseWHHLFields = ["mcs_dateveterancontacted", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact", "mcs_response"];
            for (var i = 0; i < responseWHHLFields.length; i++) {
                CommCare.Shared.SetReadOnly(responseWHHLFields[i], false);
            }
        }
    }

    function is13FrontOfficeUser() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
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
                        if (teammembership_association_teamid == CommCare.Tasker.Constants.FrontOfficeTeam.toLowerCase()) {
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
        });
        //return new Promise(function (resolve, reject) {
        //    return Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
        //        function success(results) {
        //            for (var i = 0; i < results.entities.length; i++) {

        //                if (results.entities[i]["teamid"].toLowerCase() == CommCare.Tasker.Constants.FrontOfficeTeam.toLowerCase()) {
        //                    resolve(true);
        //                }
        //            }
        //            resolve(false);
        //        },
        //        function (error) {
        //            reject(error.message);
        //        }
        //    );
        //});
    }

    function unlockDueDate13FrontOffice() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + CommCare.Shared.FormContext.context.getUserId()).then(
            function success(results) {
                var lockDueDate = true;
                for (var i = 0; i < results.entities.length; i++) {

                    if (results.entities[i]["teamid"].toLowerCase() == CommCare.Tasker.Constants.FrontOfficeTeam.toLowerCase()) {
                        lockDueDate = false;
                    }
                }
                CommCare.Shared.SetReadOnly("mcs_duedate", lockDueDate);
            },
            function (error) {
                var alertStrings = { text: error.message };
                Xrm.Navigation.openAlertDialog(alertStrings);
            }
        );
    }

    function lockResponseWHHLFields(isLoad) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        //console.log("isLoad: " + isLoad);
        var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        var assignedFromTeam = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_executivedirectorateteam"));
        //console.log(owner[0]["name"]);
        var directorate = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_executivedirectorateteam"));

        var responseWHHLFields = [
            "mcs_dateveterancontacted",
            "mcs_statementofissueandstatus",
            "mcs_actionsprogressandresolution",
            "mcs_actionsprogressandresolution",
            "mcs_nextsteps",
            "mcs_whocontactedveteranpointofcontact",
            "mcs_resolutiondescription",
            "mcs_response",
            "mcs_patsroutcome",
            "mcs_patsrindependentexternalreview",
            "mcs_setsubmitteraspointofcontact",
            "mcs_pointofcontactfirstname",
            "mcs_pointofcontactlastname",
            "mcs_pointofcontactemail",
            "mcs_pointofcontactposition",
            "mcs_pointofcontactphonenumber"
        ];

        //console.log(directorate);
        var status = CommCare.Shared.GetFieldValue("statuscode");
        //if (
            //(CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.ReadyForApproval && owner != CommCare.Tasker.Constants.FrontOfficeTeam && isLoad)
            //|| (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Rejected && owner == CommCare.Tasker.Constants.FrontOfficeTeam)
            //|| (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Rejected && owner == directorate)
            //|| CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Open
            //|| CommCare.Shared.GetFieldValue("statuscode") == CommCare.Tasker.Constants.StatusReason.Reopened) {
            //for (var i = 0; i < responseWHHLFields.length; i++) {
            //    CommCare.Shared.SetReadOnly(responseWHHLFields[i], false);
            //}
        if (
            status == CommCare.Tasker.Constants.StatusReason.Review
            || status == CommCare.Tasker.Constants.StatusReason.Agree
            || status == CommCare.Tasker.Constants.StatusReason.Approved
            ) {
            
            for (var i = 0; i < responseWHHLFields.length; i++) {
                if (CommCare.Shared.GetFieldValue(responseWHHLFields[i]) != null) {
                    if (responseWHHLFields[i] != "mcs_pointofcontactphonenumber") {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    } else if (validatePOCPhoneNumber()) {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    }
                }
            }
        } else if ((status == CommCare.Tasker.Constants.StatusReason.ReadyForApproval
            || status == CommCare.Tasker.Constants.StatusReason.Rejected)
            && owner != directorate) {
            for (var i = 0; i < responseWHHLFields.length; i++) {
                if (CommCare.Shared.GetFieldValue(responseWHHLFields[i]) != null) {
                    if (responseWHHLFields[i] != "mcs_pointofcontactphonenumber") {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    } else if (validatePOCPhoneNumber()) {
                        CommCare.Shared.SetReadOnly(responseWHHLFields[i], true);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < responseWHHLFields.length; i++) {
                CommCare.Shared.SetReadOnly(responseWHHLFields[i], false);
            }
        }
    }

    function showHideWHHLSections() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var showResponsesHideWHHL = CommCare.Shared.GetFieldValue("mcs_whhltemplate");
        var requireWHHL = showResponsesHideWHHL == true ? "required" : "none";
        //console.log("requireWHHL: " + requireWHHL);
        var requireResponse = showResponsesHideWHHL == true ? "none" : "required";
        //console.log("showResponsesHideWHHL: " + showResponsesHideWHHL);

        CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("WHHLResolution").setVisible(showResponsesHideWHHL);
        CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Response").setVisible(!showResponsesHideWHHL);
        var patsFields = ["mcs_patsrindependentexternalreview", "mcs_patsroutcome", "mcs_resolutiondescription"];
        for (var i = 0; i < patsFields.length; i++) {
            CommCare.Shared.SetVisible(patsFields[i], false);
        }
        if (CommCare.Shared.GetFieldValue("statuscode") != CommCare.Tasker.Constants.StatusReason.Open) {
            setRequiredOnMultipleFields(["mcs_dateveterancontacted", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact"], requireWHHL);
            CommCare.Shared.SetRequired("mcs_response", requireResponse);
        } else {
            setRequiredOnMultipleFields(["mcs_dateveterancontacted", "mcs_statementofissueandstatus", "mcs_actionsprogressandresolution", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_whocontactedveteranpointofcontact"], "none");
            CommCare.Shared.SetRequired("mcs_response", "none");
        }
    }

    function setRequiredOnMultipleFields(fieldList, requiredLevel) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.SetRequired(fieldList[i], requiredLevel);
        }
    }

    function disallowPastDueDates() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        if (CommCare.Shared.GetFieldValue("mcs_duedate") != null) {
            CommCare.Shared.FormContext.getControl("mcs_duedate").clearNotification("duedatevalidation");
            //if (CommCare.Shared.GetFieldValue("mcs_duedate").setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
            if (CommCare.Shared.GetFieldValue("mcs_duedate") < new Date()) {
                CommCare.Shared.FormContext.getControl("mcs_duedate").setNotification("A due date that is on or after today is required.", "duedatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_duedate").clearNotification("duedatevalidation");
        }
    }

    function showHideExecutiveDirectoratesFields() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        //console.log("showHideExecutiveDirectoratesFields");;
        if (CommCare.Shared.GetFieldValue("mcs_assigntomultipleexecutivedirectorates") != null) {
            if (CommCare.Shared.GetFieldValue("mcs_assigntomultipleexecutivedirectorates")) {
                CommCare.Shared.SetRequired("mcs_executivedirectorateteam", false);
                CommCare.Shared.SetVisible("mcs_executivedirectorateteam", false);
                CommCare.Shared.SetFieldValue("mcs_executivedirectorateteam", null);

                CommCare.Shared.SetRequired("mcs_executivedirectorates", true);
                CommCare.Shared.SetVisible("mcs_executivedirectorates", true);
            } else {
                CommCare.Shared.SetRequired("mcs_executivedirectorates", false);
                CommCare.Shared.SetVisible("mcs_executivedirectorates", false);
                CommCare.Shared.SetFieldValue("mcs_executivedirectorates", null);

                CommCare.Shared.SetRequired("mcs_executivedirectorateteam", true);
                CommCare.Shared.SetVisible("mcs_executivedirectorateteam", true);
            }
        } else {
            CommCare.Shared.SetRequired("mcs_executivedirectorates", false);
            CommCare.Shared.SetVisible("mcs_executivedirectorates", false);

            CommCare.Shared.SetRequired("mcs_executivedirectorateteam", false);
            CommCare.Shared.SetVisible("mcs_executivedirectorateteam", false);
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
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
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

    function showHideFieldsForInternalQC() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var internal = !!CommCare.Shared.GetFieldValue("mcs_internal");

        if (internal) {
            CommCare.Shared.SetVisible("mcs_requestorgroup", internal);
            CommCare.Shared.SetVisible("mcs_name", internal);
            CommCare.Shared.SetVisible("mcs_assigntomultipleexecutivedirectorates", !internal);
            CommCare.Shared.SetVisible("mcs_executivedirectorateteam", internal);
            CommCare.Shared.SetVisible("mcs_executivedirectorates", !internal);
            CommCare.Shared.SetVisible("mcs_approvallevelneeded", internal);
        }
    }

    function hideShowApprovalNeeded() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var internal = !!CommCare.Shared.GetFieldValue("mcs_internal");
        CommCare.Shared.SetVisible("mcs_approvallevelneeded", internal);
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

    function limitApprovalOptions() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var cnt = CommCare.Shared.FormContext.getControl("mcs_approvallevelneeded");

        if (!!cnt) {
            cnt.removeOption(CommCare.Tasker.Constants.ApprovalNeeded.Directorate);
            cnt.removeOption(CommCare.Tasker.Constants.ApprovalNeeded.ExecutiveDirectorate);
        }
    }

    function defaultExecutiveDirectorateForInternal() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var internal = !!CommCare.Shared.GetFieldValue("mcs_internal");
        var userId = Xrm.Utility.getGlobalContext().userSettings.userId;

        if (internal) {
            Xrm.WebApi.online.retrieveRecord("systemuser", userId, "?$select=fullname&$expand=teammembership_association($select=teamid,name,mcs_trackerteamtype)").then((result) => {
                if (!!result.teammembership_association && result.teammembership_association.length > 0) {
                    var edTeams = result.teammembership_association.filter(
                        x => x.mcs_trackerteamtype == CommCare.Tasker.Constants.TrackerTeamType.ExecutiveDirectorate
                    );
                    //console.log("Executive Directorate Teams", edTeams);
                    if (!!edTeams && edTeams.length > 0) {
                        if (edTeams.length == 1) {
                            var lookupValue = [{ id: edTeams[0].teamid, entityType: "team", name: edTeams[0].name }];
                            CommCare.Shared.SetFieldValue("mcs_executivedirectorateteam", lookupValue);
                            CommCare.Shared.SetReadOnly("mcs_executivedirectorateteam", true);
                            CommCare.Shared.SetSubmitMode("mcs_executivedirectorateteam", "always");
                            CommCare.Shared.FormContext.getAttribute("mcs_executivedirectorateteam").fireOnChange();
                        }
                        else {
                            CommCare.Tasker.Global.ExecutiveDirectorateFetch = "<filter type='or' >";

                            for (var i = 0; i < edTeams.length; i++) {
                                CommCare.Tasker.Global.ExecutiveDirectorateFetch += `<condition attribute='teamid' operator='eq' value='${edTeams[i].teamid}' />`
                            }

                            CommCare.Tasker.Global.ExecutiveDirectorateFetch += "</filter>"
                            //console.log(CommCare.Tasker.Global.ExecutiveDirectorateFetch);

                            CommCare.Shared.FormContext.getControl("mcs_executivedirectorateteam").addPreSearch(setExecutiveDirectoratePrefilter);
                        }
                    }
                    else {
                        console.log("No Executive Directorate Teams Found.");
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

    function setExecutiveDirectoratePrefilter() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        CommCare.Shared.FormContext.getControl("mcs_executivedirectorateteam").addCustomFilter(CommCare.Tasker.Global.ExecutiveDirectorateFetch);
    }

    function showVeteranHasOpenActionItems() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
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

    function showHideEditsTextbox(isSave) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var status = CommCare.Shared.GetFieldValue("statuscode");
        var concurence = CommCare.Shared.GetFieldValue("mcs_needsconcurrence");
        var owner = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
        var edTeam= CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_executivedirectorateteam"));

        if (isSave) {
            CommCare.Shared.SetVisible("mcs_edits", false);
        }
        else if (status == CommCare.Tasker.Constants.StatusReason.AgreeEdits
            || status == CommCare.Tasker.Constants.StatusReason.Disagree
            || (status == CommCare.Tasker.Constants.StatusReason.ReadyForApproval && concurence == true && owner == edTeam)) {
            CommCare.Shared.SetVisible("mcs_edits", true);
        } else {
            CommCare.Shared.SetVisible("mcs_edits", false);
        }

        var requireEdits = false;
        if (status == CommCare.Tasker.Constants.StatusReason.AgreeEdits
            || status == CommCare.Tasker.Constants.StatusReason.Disagree) {
            requireEdits = true;
        }
        CommCare.Shared.SetRequired("mcs_edits", requireEdits);
    }

    function removeReviewStatusForNoConcurrence(isLoad) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var needsConcurrence = CommCare.Shared.GetFieldValue("mcs_needsconcurrence");
        var statusControl = CommCare.Shared.FormContext.getControl("statuscode");
        if (isLoad) {
            CommCare.Tasker.Constants.StatusCodeOptions = CommCare.Shared.FormContext.getAttribute("statuscode").getOptions();
        } else {
            statusControl.clearOptions();
            for (var i = 0; i < CommCare.Tasker.Constants.StatusCodeOptions.length; i++) {
                statusControl.addOption(CommCare.Tasker.Constants.StatusCodeOptions[i]);
            }
        }
        console.log(needsConcurrence);
        if (needsConcurrence == false) {
            
            statusControl.removeOption(CommCare.Tasker.Constants.StatusReason.Review);
        }
    }

    function nullAssignedToForStatusAgree() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        
        var status = CommCare.Shared.GetFieldValue("statuscode");
        console.log("status: " + status);
        console.log("cached status: " + CommCare.Tasker.Constants.CachedStatus);
        if ((status == CommCare.Tasker.Constants.StatusReason.Agree)
            || status == CommCare.Tasker.Constants.StatusReason.AgreeEdits
            || (status == CommCare.Tasker.Constants.StatusReason.Review && CommCare.Tasker.Constants.CachedStatus != CommCare.Tasker.Constants.StatusReason.AgreeEdits && CommCare.Tasker.Constants.CachedStatus != CommCare.Tasker.Constants.StatusReason.Agree && CommCare.Tasker.Constants.CachedStatus != CommCare.Tasker.Constants.StatusReason.Disagree)) {
            CommCare.Shared.SetFieldValue("mcs_assignedto", null);
            CommCare.Shared.SetRequired("mcs_assignedto", true);
        } else {
            CommCare.Shared.SetRequired("mcs_assignedto", false);
        }
        CommCare.Tasker.Constants.CachedStatus = status;
    }

    function setPriorityUrgentForConcurrenceDisagree() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);
        var status = CommCare.Shared.GetFieldValue("statuscode");
        var concurence = CommCare.Shared.GetFieldValue("mcs_needsconcurrence");

        if (status == CommCare.Tasker.Constants.StatusReason.Disagree && concurence == true) {
            CommCare.Shared.SetFieldValue("mcs_priority", CommCare.Tasker.Constants.Priority.Urgent);
        }
    }

    function validateDueDatePastActionItemDueDateQC() {
        var taskerDueDate = CommCare.Shared.GetFieldValue("mcs_duedate");
        var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
        if (actionItemId != null) {
            Xrm.WebApi.retrieveRecord("mcs_tracker", actionItemId, "?$select=mcs_frontofficeduedate,mcs_originatorduedate").then(
                function success(result) {
                    console.log(result);
                    // Columns
                    var mcs_trackerid = result["mcs_trackerid"]; // Guid
                    var mcs_frontofficeduedate = result["mcs_frontofficeduedate"]; // Date Time
                    var mcs_frontofficeduedate_formatted = result["mcs_frontofficeduedate@OData.Community.Display.V1.FormattedValue"];
                    var mcs_originatorduedate = result["mcs_originatorduedate"]; // Date Time
                    var mcs_originatorduedate_formatted = result["mcs_originatorduedate@OData.Community.Display.V1.FormattedValue"];
                    var frontOfficeDueDate = new Date(result["mcs_frontofficeduedate"]);

                    if (frontOfficeDueDate != null) {
                        if (taskerDueDate > frontOfficeDueDate) {
                            CommCare.Shared.FormContext.ui.setFormNotification("The current tasker due date exceeds the due date of the action item.", "WARNING", "TaskerExtensionRequest");
                            if (CommCare.Tasker.Constants.ExtensionRequestMethodEnabled == false) {
                                CommCare.Shared.FormContext.data.entity.addOnSave(blockDueDatePastActionItemDueDateQC);
                                CommCare.Tasker.Constants.ExtensionRequestMethodEnabled = true;
                            }
                            
                        } else {
                            CommCare.Shared.FormContext.data.entity.removeOnSave(blockDueDatePastActionItemDueDateQC);
                            CommCare.Shared.FormContext.ui.clearFormNotification("TaskerExtensionRequest");
                            CommCare.Tasker.Constants.ExtensionRequestMethodEnabled = false;
                        }

                    } 
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }

    function blockDueDatePastActionItemDueDateQC(context) {
        context.getEventArgs().preventDefault();
        var alertStrings = {
            confirmButtonLabel: "OK",
            text: "The current tasker due date exceeds the due date of the action item. Please edit the tasker due date.",
            title: "Invalid Due Date"
        };

        Xrm.Navigation.openAlertDialog(alertStrings).then(function (success) {
            console.log(success);
        },
            function (error) {
                console.log(error.message);
            });
    }

    function buildPrefilterFetchXml() {
        var directInquiryGroupId = "4a0fe354-fe82-ed11-81ad-001dd80701be";
        var initialFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";
        var teamId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_executivedirectorateteam"));
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        var teamArray = [teamId];
        CommCare.Tasker.Constants.GlobalRequestorGroupFetch = "<filter type='and'>";

        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").removePreSearch(filterRequestorGroupLookup);


        Xrm.WebApi.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_requestorgroup_value,_mcs_team_value&$filter=(statecode eq 0 and mcs_name eq 'AdditionalRequestorGroupsByTeam')").then((luFilters) => {
            var needsFilter = false;
            for (var i = 0; i < luFilters.entities.length; i++) {
                if (teamArray.length > 0) {
                    if (!teamArray.includes(luFilters.entities[i]._mcs_team_value.toLowerCase()) || !internal) {
                        CommCare.Tasker.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${luFilters.entities[i]._mcs_requestorgroup_value}' />`;
                        needsFilter = true;
                    }
                }
                else {
                    CommCare.Tasker.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${luFilters.entities[i]._mcs_requestorgroup_value}' />`;
                    needsFilter = true;
                }
            }

            if (!internal)
                CommCare.Tasker.Constants.GlobalRequestorGroupFetch += `<condition attribute='mcs_groupid' operator='ne' value='${directInquiryGroupId}' />`;

            CommCare.Tasker.Constants.GlobalRequestorGroupFetch += "</filter>";

            if (needsFilter == false)
                CommCare.Tasker.Constants.GlobalRequestorGroupFetch = initialFetch;
            else
                prefilterRequestorGroup();

            console.log("Requestor Group Filter");
            console.log(CommCare.Tasker.Constants.GlobalRequestorGroupFetch);
        }).catch((e) => {
            console.log(e);
        });
    }

    function prefilterRequestorGroup() {
        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").addPreSearch(filterRequestorGroupLookup);
    }

    function filterRequestorGroupLookup() {
        CommCare.Shared.FormContext.getControl("mcs_requestorgroup").addCustomFilter(CommCare.Tasker.Constants.GlobalRequestorGroupFetch);
    }

    function hideShowTabsBasedOnExecutiveDirectorateTeam() {
        var teamId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_executivedirectorateteam"));

        Xrm.WebApi.retrieveMultipleRecords("mcs_lookupfilter", "?$select=mcs_tabname,_mcs_team_value&$filter=mcs_name eq 'CramTabVisibilityByTeam'").then((results) => {
            for (var i = 0; i < results.entities.length; i++) {
                var tab = CommCare.Shared.FormContext.ui.tabs.get(results.entities[i].mcs_tabname);
                if (!!tab)
                    tab.setVisible(results.entities[i]._mcs_team_value.toLowerCase() == teamId);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    function blockSaveForNewWithAssoicatedVeteranActionItems(context) {
        var assocatedVeteranId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_veteran"));
        if (!!assocatedVeteranId) {
            context.getEventArgs().preventDefault();
            var actionItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
            //Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", `?$select=mcs_trackerid&$filter=statecode eq 0 and  _mcs_veteran_value eq ${assocatedVeteranId} and  mcs_trackerid ne ${actionItemId}`).then(
            Xrm.WebApi.online.retrieveMultipleRecords("mcs_tracker", `?$select=mcs_trackerid&$filter=(statecode eq 0 and mcs_trackerid ne ${actionItemId} and mcs_Veteran/fullname ne 'N/A N/A' and mcs_Veteran/contactid eq ${assocatedVeteranId})`).then(
                function success(results) {
                    if (results.entities.length == 0) {
                        CommCare.Shared.FormContext.data.entity.removeOnSave(blockSaveForNewWithAssoicatedVeteranActionItems);
                        CommCare.Shared.FormContext.data.save();
                    } else {
                        var confrimStrings = {
                            cancelButtonLabel: "Cancel",
                            confirmButtonLabel: "Confirm",
                            text: "Please confirm that you want to create this record as the Veteran has an Open Action Item(s)",
                            title: "Veteran with open action items"
                        };

                        Xrm.Navigation.openConfirmDialog(confrimStrings).then(
                            function (success) {
                                if (success.confirmed) {
                                    CommCare.Shared.FormContext.data.entity.removeOnSave(blockSaveForNewWithAssoicatedVeteranActionItems);
                                    CommCare.Shared.FormContext.data.save();
                                } else {
                                    CommCare.Shared.FormContext.ui.close();
                                }
                            }
                        );
                    }

                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );

        }
    }

    function showHideOverdueReason() {
        let dueDate = CommCare.Shared.GetFieldValue("mcs_duedate");
        let showRequireOverdueReason = false;
        if (dueDate < new Date()) {
            let status = CommCare.Shared.GetFieldValue("statuscode");
            if (status == CommCare.Tasker.Constants.StatusReason.ReadyForApproval) {
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
        if (overdueReason != null && overdueReason.includes(CommCare.Tasker.Constants.OverDueReasons.Other)) {
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
        if (status == CommCare.Tasker.Constants.StatusReason.ReadyForApproval) {
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Attestation").setVisible(true);
            CommCare.Shared.SetRequired("mcs_attestation1", true);
            CommCare.Shared.SetRequired("mcs_attestation2", true);
            CommCare.Shared.SetRequired("mcs_attestation3", true);
        } else {
            CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("Attestation").setVisible(false);
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
        if (status == CommCare.Tasker.Constants.StatusReason.ReadyForApproval && (attestation1 == false || attestation2 == false || attestation3 == false)) {
            CommCare.Shared.FormContext.data.entity.addOnSave(blockSaveForAttestation);
        } else {
            CommCare.Shared.FormContext.ui.clearFormNotification("AttestationBlocked");
            CommCare.Shared.FormContext.data.entity.removeOnSave(blockSaveForAttestation);
        }
    }

    function blockSaveForAttestation(context) {
        context.getEventArgs().preventDefault();
        CommCare.Shared.FormContext.ui.setFormNotification("You must attest that all requirements have been met prior to setting the status to Ready for Approval", "ERROR", "AttestationBlocked");
    }
})();
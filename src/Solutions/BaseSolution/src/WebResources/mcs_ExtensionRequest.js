/// <reference path="common/CommCareShared.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.ExtensionRequest) == "undefined") {
    CommCare.ExtensionRequest = {
        __namespace: true
    };
}

if (typeof (CommCare.ExtensionRequest.Global) == "undefined") {
    CommCare.ExtensionRequest.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.ExtensionRequest.Constants) == "undefined") {
    CommCare.ExtensionRequest.Constants = {
        __namespace: true
    };
}

CommCare.ExtensionRequest.Constants.StatusReason = {
    Pending: 1,
    Inactive: 2,
    ApprovedActive: 803750002,
    RejectedActive: 803750003,
    ApprovedInactive: 803750000,
    RejectedInactive: 803750001,
    ApprovedWithAdjustment: 803750004,
    ApproveAndRequestAdditionalExtension: 803750005,
    AwaitingApproval: 803750006,
    NeedsAttention: 803750007,
    ApprovedWithAdjustmentInactive: 803750008,
    Canceled: 803750010,
    CanceledInActive: 803750009
}

CommCare.ExtensionRequest.Constants.ApprovalLevelNeeded = {
    NoHigherApproval: 153190000,
    DirectorateApproval: 153190001,
    ExecutiveDirectorateApproval: 153190002,
    FullApproval: 153190003
}

CommCare.ExtensionRequest.Constants.StateCode = {
    Active: 0,
    Inactive: 1
}

CommCare.ExtensionRequest.Constants.FormType = null;
CommCare.ExtensionRequest.Constants.StatusCodeOptions = null;

CommCare.ExtensionRequest.Global = (function () {
    //Public functions
    return {
        OnLoad: onLoad
    }

    async function onLoad(context, formTypeString) {
        CommCare.Shared.GetFormContext(context);
        console.log("gotContext");

        if (formTypeString != null) {
            CommCare.ExtensionRequest.Constants.FormType = formTypeString;
        }

        hideNullParentFields();
        console.log(`resolved hideNullParentFields`);
        let hasParents = await populateParentEntitiesOnLoad();
        console.log(`resolved populateParentEntitiesOnLoad`);
        //populateParentEntitiesOnLoad();
        CommCare.Shared.SetOnChange("mcs_requestedduedate", disallowPastDueDate);
        lockFormIfNotQuickCreate();
        CommCare.Shared.SetOnChange("statuscode", lockFormIfNotQuickCreate);
        handleRejectionReasonVisibilityRequirement();
        CommCare.Shared.SetOnChange("statuscode", handleRejectionReasonVisibilityRequirement);
        CommCare.Shared.FormContext.data.entity.addOnPostSave(openAdditionalExtensionRequestQuickCreate);
        CommCare.Shared.SetOnChange("statuscode", lockFormIfAwaitingApproval);
        showRequireAdjustedDueDate();
        CommCare.Shared.SetOnChange("statuscode", showRequireAdjustedDueDate);
        closeQuickCreateFromActionItem();
        closeQuickCreateIfParentIsInactive();

        if (CommCare.ExtensionRequest.Constants.FormType != "quickcreate") {
            CommCare.Shared.SetOnChange("mcs_adjustedduedate", disallowPastAdjustedDueDate);
            buildConditionalStatusOptions(true);
            modalDialogForActionItem();
            hideShowCancelReason()
            CommCare.Shared.SetOnChange("statuscode", hideShowCancelReason);
        }
        openModalDialogsWhenTopApprovalLevel();
        console.log(CommCare.Shared.FormContext.ui.getFormType());
        var approvalLevelNeeded = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
        if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM && approvalLevelNeeded == CommCare.ExtensionRequest.Constants.ApprovalLevelNeeded.NoHigherApproval) {
            console.log("preventCreateForNoHigherApproval");
            preventCreateForNoHigherApproval();
        }
        //CommCare.Shared.FormContext.data.entity.addOnPostSave(openModalDialogsWhenTopApprovalLevel);
    }

    function preventCreateForNoHigherApproval() {
        var internal = CommCare.Shared.GetFieldValue("mcs_internal");
        if (internal == true) {
            var alertStrings = { text: "Extension Requests cannot be created for items where no higher approval is required.", title: "Cannot create Extension Request" };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                CommCare.Shared.FormContext.ui.close();
            },
                (error) => {
                    console.log("Error in closing dialog", error);
                });
        }

    }

    function hideNullParentFields() {
        var parentEntityFields = ["mcs_actionitem", "mcs_tasker", "mcs_directoratetask", "mcs_parentdirectoratetaskid", "mcs_parenttasker", "mcs_parentactionitem"];
        for (var i = 0; i < parentEntityFields.length; i++) {
            if (CommCare.Shared.GetFieldValue(parentEntityFields[i]) == null) {
                CommCare.Shared.SetVisible(parentEntityFields[i], false);
            }
        }
    }

    function disallowPastDueDate() {
        if (CommCare.Shared.GetFieldValue("mcs_requestedduedate") != null) {
            var currentDueDate = CommCare.Shared.GetFieldValue("mcs_currentduedate");
            CommCare.Shared.FormContext.getControl("mcs_requestedduedate").clearNotification("duedatevalidation");
            if (CommCare.Shared.GetFieldValue("mcs_requestedduedate") < new Date()) {
                CommCare.Shared.FormContext.getControl("mcs_requestedduedate").setNotification("A due date that is on or after today is required.", "duedatevalidation");
                return;
            }

            if (CommCare.Shared.GetFieldValue("mcs_requestedduedate") <= currentDueDate) {
                CommCare.Shared.FormContext.getControl("mcs_requestedduedate").setNotification("A due date that is after the current due date is required.", "duedatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_requestedduedate").clearNotification("duedatevalidation");
        }
    }

    function disallowPastAdjustedDueDate() {
        if (CommCare.Shared.GetFieldValue("mcs_adjustedduedate") != null) {
            var currentDueDate = CommCare.Shared.GetFieldValue("mcs_currentduedate");
            CommCare.Shared.FormContext.getControl("mcs_adjustedduedate").clearNotification("duedatevalidation");
            if (CommCare.Shared.GetFieldValue("mcs_adjustedduedate") < new Date()) {
                CommCare.Shared.FormContext.getControl("mcs_adjustedduedate").setNotification("A due date that is on or after today is required.", "duedatevalidation");
                return;
            }

            if (CommCare.Shared.GetFieldValue("mcs_adjustedduedate") <= currentDueDate) {
                CommCare.Shared.FormContext.getControl("mcs_adjustedduedate").setNotification("A due date that is after the current due date is required.", "duedatevalidation");
            }
        } else {
            CommCare.Shared.FormContext.getControl("mcs_adjustedduedate").clearNotification("duedatevalidation");
        }
    }

    function lockFormIfAwaitingApproval() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.ExtensionRequest.Constants.StatusReason.AwaitingApproval) {
            CommCare.Shared.LockForm();
        }
    }

    function lockFormIfNotQuickCreate() {
        if (CommCare.ExtensionRequest.Constants.FormType != "quickcreate") {
            var ownerTeamId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
            var createdById = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("createdby"));
            var status = CommCare.Shared.GetFieldValue("statuscode");
            var globalContext = Xrm.Utility.getGlobalContext();
            var userId = globalContext.userSettings.userId.replace("{", "").replace("}", "");
            var fields = ["mcs_description", "mcs_requestedduedate", "statuscode"];

            //CommCare.ExtensionRequest.Constants.StatusReason

            Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=teamid eq " + ownerTeamId + " and  systemuserid eq " + userId.toLowerCase()).then((results) => {
                console.log(results);
                if (results.entities.length == 0) {
                    CommCare.Shared.LockForm();
                }

                if (createdById.toLowerCase() == userId.toLowerCase() && status == CommCare.ExtensionRequest.Constants.StatusReason.Pending) {
                    setDisabledOnMultipleFields(fields, false);
                }
                else {
                    CommCare.Shared.SetReadOnly("mcs_description", true);
                    CommCare.Shared.SetReadOnly("mcs_requestedduedate", true);
                }

                if (createdById.toLowerCase() == userId.toLowerCase() && status == CommCare.ExtensionRequest.Constants.StatusReason.Canceled) {
                    setDisabledOnMultipleFields(["mcs_cancellationnotes"], false);
                }
            }).catch(function (error) {
                console.log("Error retrieving any Note records on Request: " + error.message);
                console.log(error);
            });

            //should this be inside the check?  would this work with statusreason as field name (statuscode)
            //CommCare.Shared.SetReadOnly("statusreason", false);
        }
    }

    function setDisabledOnMultipleFields(fieldList, disabled) {
        if (!!fieldList && fieldList.length > 0 && disabled != undefined) {
            for (var i = 0; i < fieldList.length; i++) {
                CommCare.Shared.SetReadOnly(fieldList[i], disabled);
            }
        }
    }

    function handleRejectionReasonVisibilityRequirement() {
        if (CommCare.ExtensionRequest.Constants.FormType != "quickcreate") {
            var status = CommCare.Shared.GetFieldValue("statuscode");
            if (status == CommCare.ExtensionRequest.Constants.StatusReason.RejectedActive || status == CommCare.ExtensionRequest.Constants.StatusReason.RejectedInactive) {
                CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("RejectionReason").setVisible(true);
                CommCare.Shared.SetRequired("mcs_rejectionreason", true);
            } else {
                CommCare.Shared.FormContext.ui.tabs.get("General").sections.get("RejectionReason").setVisible(false);
                CommCare.Shared.SetRequired("mcs_rejectionreason", false);
            }
        }
    }

    function openAdditionalExtensionRequestQuickCreate() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        if (status == CommCare.ExtensionRequest.Constants.StatusReason.ApproveAndRequestAdditionalExtension) {
            var entityFormOptions = {};
            entityFormOptions["entityName"] = "mcs_duedateextensionrequest";
            entityFormOptions["useQuickCreateForm"] = true;


            var quickcreateparams = {};
            quickcreateparams["mcs_childextensionrequest"] = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "").toLowerCase();
            quickcreateparams["mcs_childextensionrequestname"] = CommCare.Shared.GetFieldValue("mcs_name");
            quickcreateparams["mcs_childextensionrequesttype"] = "mcs_duedateextensionrequest";
            quickcreateparams["mcs_approvallevelneeded"] = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
            var directorateTask = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_directoratetask"));
            if (directorateTask != null) {
                Xrm.WebApi.online.retrieveRecord("mcs_taskertask", directorateTask, "?$select=mcs_directorateduedate,_mcs_parenttask_value,_mcs_tasker_value").then(
                    function success(result) {
                        console.log(result);
                        var mcs_directorateduedate = result["mcs_directorateduedate"];
                        var _mcs_parenttask_value = result["_mcs_parenttask_value"];
                        if (_mcs_parenttask_value != null) {
                            Xrm.WebApi.online.retrieveRecord("mcs_taskertask", _mcs_parenttask_value, "?$select=mcs_directorateduedate").then(
                                function success(parentResult) {
                                    console.log(parentResult);
                                    quickcreateparams["mcs_directoratetask"] = _mcs_parenttask_value;
                                    quickcreateparams["mcs_directoratetaskname"] = result["_mcs_parenttask_value@OData.Community.Display.V1.FormattedValue"];
                                    var newDueDate = calculateNewCurrentDueDate(CommCare.Shared.GetFieldValue("mcs_requestedduedate"), CommCare.Shared.GetFieldValue("mcs_currentduedate"), parentResult["mcs_directorateduedate"]);
                                    quickcreateparams["mcs_currentduedate"] = new Date(parentResult["mcs_directorateduedate"]);
                                    quickcreateparams["mcs_requestedduedate"] = newDueDate;
                                    openQuickCreateForm(entityFormOptions, quickcreateparams, status);
                                },
                                function (error) {
                                    Xrm.Utility.alertDialog(error.message);
                                }
                            );
                        }

                        var _mcs_tasker_value = result["_mcs_tasker_value"];
                        if (_mcs_tasker_value != null) {
                            Xrm.WebApi.online.retrieveRecord("mcs_trackeritem", _mcs_tasker_value, "?$select=mcs_duedate").then(
                                function success(parentResult) {
                                    console.log(parentResult);
                                    quickcreateparams["mcs_tasker"] = _mcs_tasker_value;
                                    quickcreateparams["mcs_taskername"] = result["_mcs_tasker_value@OData.Community.Display.V1.FormattedValue"];
                                    var newDueDate = calculateNewCurrentDueDate(CommCare.Shared.GetFieldValue("mcs_requestedduedate"), CommCare.Shared.GetFieldValue("mcs_currentduedate"), parentResult["mcs_duedate"]);
                                    quickcreateparams["mcs_currentduedate"] = new Date(parentResult["mcs_duedate"]);
                                    quickcreateparams["mcs_requestedduedate"] = newDueDate;
                                    openQuickCreateForm(entityFormOptions, quickcreateparams, status);
                                },
                                function (error) {
                                    Xrm.Utility.alertDialog(error.message);
                                }
                            );
                        }


                    },
                    function (error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            } else {
                var tasker = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
                Xrm.WebApi.online.retrieveRecord("mcs_trackeritem", tasker, "?$select=_mcs_actionitem_value,mcs_duedate").then(
                    function success(result) {
                        console.log(result);
                        var _mcs_actionitem_value = result["_mcs_actionitem_value"];
                        var mcs_duedate = result["mcs_duedate"];

                        Xrm.WebApi.online.retrieveRecord("mcs_tracker", _mcs_actionitem_value, "?$select=mcs_frontofficeduedate").then(
                            function success(actionItemResult) {
                                console.log(actionItemResult);
                                quickcreateparams["mcs_actionitem"] = _mcs_actionitem_value;
                                quickcreateparams["mcs_actionitemname"] = result["_mcs_actionitem_value@OData.Community.Display.V1.FormattedValue"];
                                var newDueDate = calculateNewCurrentDueDate(CommCare.Shared.GetFieldValue("mcs_requestedduedate"), CommCare.Shared.GetFieldValue("mcs_currentduedate"), actionItemResult["mcs_frontofficeduedate"]);
                                quickcreateparams["mcs_currentduedate"] = new Date(actionItemResult["mcs_frontofficeduedate"]);
                                quickcreateparams["mcs_requestedduedate"] = newDueDate;
                                openQuickCreateForm(entityFormOptions, quickcreateparams, status);

                            },
                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }
                        );
                    },
                    function (error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            }


        }

    }

    function calculateNewCurrentDueDate(requestedDate, currentDate, approversDueDate) {
        var diffReqCurDate = new Date(requestedDate) - new Date(currentDate);
        var approverDueDateTime = new Date(approversDueDate).getTime();
        var timeStamp = diffReqCurDate + approverDueDateTime;
        var returnDate = new Date(timeStamp);
        return returnDate;
    }

    function openQuickCreateForm(entityFormOptions, quickcreateparams, status) {
        var currentExtensionRequest = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "").toLowerCase();
        Xrm.Navigation.openForm(entityFormOptions, quickcreateparams).then(
            function (lookup) {
                try {
                    console.log(lookup);
                    console.log((lookup["savedEntityReference"][0]["id"]).replace("{", "").replace("}", "").toLowerCase());
                    var entity = {};
                    entity.statuscode = 803750006;
                    entity["mcs_ParentExtensionRequest@odata.bind"] = "/mcs_duedateextensionrequests(" + (lookup["savedEntityReference"][0]["id"]).replace("{", "").replace("}", "").toLowerCase() + ")";

                    Xrm.WebApi.online.updateRecord("mcs_duedateextensionrequest", currentExtensionRequest, entity).then(
                        function success(result) {
                            CommCare.Shared.FormContext.data.refresh(true).then(function () {
                                console.log("refresh");
                                buildConditionalStatusOptions(false);
                            });
                        },
                        function (error) {
                            Xrm.Utility.alertDialog(error.message);
                        }
                    );
                } catch (ex) {
                    console.log(ex);
                    console.log(status);
                    CommCare.Shared.SetFieldValue("statuscode", CommCare.ExtensionRequest.Constants.StatusReason.Pending);
                }

            },
            function (error) { console.error(error); }
        );
    }

    async function populateParentEntitiesOnLoad() {
        return new Promise((resolve, reject) => {
            if (CommCare.ExtensionRequest.Constants.FormType == "quickcreate") {
                CommCare.Shared.SetFieldValue("mcs_parentdirectoratetaskid", null);
                CommCare.Shared.SetFieldValue("mcs_parenttasker", null);
                CommCare.Shared.SetFieldValue("mcs_parentactionitem", null);
                var directorateTask = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_directoratetask"));
                var tasker = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
                if (directorateTask != null) {
                    Xrm.WebApi.online.retrieveRecord("mcs_taskertask", directorateTask, "?$select=mcs_directorateduedate,_mcs_parenttask_value,_mcs_tasker_value").then(
                        function success(result) {
                            console.log(result);
                            var _mcs_tasker_value = result["_mcs_tasker_value"];
                            var _mcs_parenttask_value = result["_mcs_parenttask_value"];

                            if (_mcs_parenttask_value != null) {
                                CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_parentdirectoratetaskid", _mcs_parenttask_value, result["_mcs_parenttask_value@OData.Community.Display.V1.FormattedValue"], "mcs_taskertask");
                            }

                            if (_mcs_tasker_value != null) {
                                CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_parenttasker", _mcs_tasker_value, result["_mcs_tasker_value@OData.Community.Display.V1.FormattedValue"], "mcs_trackeritem");
                            }
                            resolve(true);
                        },
                        function (error) {
                            Xrm.Utility.alertDialog(error.message);
                        }
                    );
                } else if (tasker != null) {
                    Xrm.WebApi.online.retrieveRecord("mcs_trackeritem", tasker, "?$select=_mcs_actionitem_value").then(
                        function success(result) {
                            console.log(result);
                            var _mcs_actionitem_value = result["_mcs_actionitem_value"];
                            if (_mcs_actionitem_value != null) {
                                CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_parentactionitem", _mcs_actionitem_value, result["_mcs_actionitem_value@OData.Community.Display.V1.FormattedValue"], "mcs_tracker");
                            }
                            resolve(true);
                        },
                        function (error) {
                            Xrm.Utility.alertDialog(error.message);
                        }
                    );
                }
            } else {
                resolve(true);
            }
        });


    }

    function showRequireAdjustedDueDate() {
        if (CommCare.ExtensionRequest.Constants.FormType != "quickcreate") {
            var status = CommCare.Shared.GetFieldValue("statuscode");
            if (status == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedWithAdjustment
                || status == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedWithAdjustmentInactive) {
                CommCare.Shared.SetVisible("mcs_adjustedduedate", true);
                CommCare.Shared.SetRequired("mcs_adjustedduedate", true);
            } else {
                CommCare.Shared.SetVisible("mcs_adjustedduedate", false);
                CommCare.Shared.SetRequired("mcs_adjustedduedate", false);
            }
        }
    }

    function buildConditionalStatusOptions(isLoad) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);

        var stateCode = CommCare.Shared.GetFieldValue("statecode");
        console.log(stateCode);
        if (stateCode == 0) {
            getParentDueDate().then(function (parentDueDate) {
                var requestedDueDate = CommCare.Shared.GetFieldValue("mcs_requestedduedate");
                var status = CommCare.Shared.GetFieldValue("statuscode");
                var approvalNeeded = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
                var internal = CommCare.Shared.GetFieldValue("mcs_internal");
                var globalContext = Xrm.Utility.getGlobalContext();
                var userId = globalContext.userSettings.userId.replace("{", "").replace("}", "").toLowerCase();
                var createdById = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("createdby")).toLowerCase();
                var parentTasker = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parenttasker"));
                var parentDirectorateTask = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parentdirectoratetaskid"));
                console.log(internal);
                console.log(status);
                var statusControl = CommCare.Shared.FormContext.getControl("statuscode");
                var promiseArray = [];

                var parentActionItemFetchXml = "?fetchXml=<fetch top='1'><entity name='mcs_trackeritem'><filter><condition attribute='mcs_trackeritemid' operator='eq' value='" + parentTasker + "'/></filter><link-entity name='mcs_tracker' from='mcs_trackerid' to='mcs_actionitem'><attribute name='statecode'/></link-entity></entity></fetch>"
                var parentActionItemPromise = parentTasker != null ? Xrm.WebApi.online.retrieveMultipleRecords("mcs_trackeritem", parentActionItemFetchXml).then(function success(results) {
                    console.log(results);
                    return results.entities[0]["mcs_tracker1.statecode"];
                }, function (error) {
                    Xrm.Utility.alertDialog(error.message);
                    return error.message;
                }) : new Promise(function (resolve, reject) { resolve(false) });
                promiseArray.push(parentActionItemPromise);

                var parentTaskerFetchXml = "?fetchXml=<fetch top='1'><entity name='mcs_taskertask'><filter><condition attribute='mcs_taskertaskid' operator='eq' value='" + parentDirectorateTask + "'/></filter><link-entity name='mcs_trackeritem' from='mcs_trackeritemid' to='mcs_tasker'><attribute name='statecode'/></link-entity></entity></fetch>";
                var parentTaskerPromise = parentDirectorateTask != null ? Xrm.WebApi.online.retrieveMultipleRecords("mcs_taskertask", parentTaskerFetchXml).then(function success(results) {
                    console.log(results);
                    return results.entities[0]["mcs_trackeritem1.statecode"];
                }, function (error) {
                    Xrm.Utility.alertDialog(error.message);
                    return error.message;
                }) : new Promise(function (resolve, reject) { resolve(false) });
                promiseArray.push(parentTaskerPromise);

                Promise.all(promiseArray).then(promiseResults => {
                    console.log(promiseResults);
                    var parentActionItemStatus = promiseResults[0];
                    var parentTaskerStatus = promiseResults[1];
                    if (isLoad) {
                        CommCare.ExtensionRequest.Constants.StatusCodeOptions = CommCare.Shared.FormContext.getAttribute("statuscode").getOptions();
                    }
                    else {
                        statusControl.clearOptions();
                        for (var i = 0; i < CommCare.ExtensionRequest.Constants.StatusCodeOptions.length; i++) {
                            statusControl.addOption(CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]);
                        }
                    }

                    var removeArray = [];
                    var allowArray = [];
                    if (new Date(requestedDueDate) < new Date(parentDueDate)) {
                        console.log("parent date after requested date");
                        for (var i = 0; i < CommCare.ExtensionRequest.Constants.StatusCodeOptions.length; i++) {
                            //if (CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != status
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.Pending
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.ApprovedActive
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.RejectedActive
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.ApprovedWithAdjustment
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.Inactive
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.ApprovedInactive
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.ApprovedWithAdjustmentInactive
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.RejectedInactive
                            //    && CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] != CommCare.ExtensionRequest.Constants.StatusReason.Canceled) {
                            //    removeArray.push(CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"]);
                            //}
                            if (CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == status
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.Pending
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedActive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.RejectedActive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedWithAdjustment
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.Inactive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedInactive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedWithAdjustmentInactive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.RejectedInactive) {
                                allowArray.push(CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"]);
                            }
                        }

                        if (userId == createdById)
                            allowArray.push(CommCare.ExtensionRequest.Constants.StatusReason.Canceled);

                    }
                    else {
                        console.log("parent date before requested date");

                        for (var i = 0; i < CommCare.ExtensionRequest.Constants.StatusCodeOptions.length; i++) {
                            //console.log(CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]);
                            if (CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == status
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.Pending
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.RejectedActive
                                //|| CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApproveAndRequestAdditionalExtension
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.Inactive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedInactive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedWithAdjustmentInactive
                                || CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.RejectedInactive) {
                                allowArray.push(CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"]);
                            }

                            //if (CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"] == CommCare.ExtensionRequest.Constants.StatusReason.ApprovedActive
                            //    && ((approvalNeeded == CommCare.ExtensionRequest.Constants.ApprovalLevelNeeded.DirectorateApproval && CommCare.Shared.GetFieldValue("mcs_parentactionitem") != null)
                            //    || (approvalNeeded == CommCare.ExtensionRequest.Constants.ApprovalLevelNeeded.ExecutiveDirectorateApproval && CommCare.Shared.GetFieldValue("mcs_parenttasker") != null))) {
                            //    allowArray.push(CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]["value"]);
                            //}



                        }

                        if (

                            (CommCare.Shared.GetFieldValue("mcs_directoratetask") != null && CommCare.Shared.GetFieldValue("mcs_parentdirectoratetaskid") != null && parentTaskerStatus == 0)
                            || (CommCare.Shared.GetFieldValue("mcs_directoratetask") != null && CommCare.Shared.GetFieldValue("mcs_parenttasker") != null && parentActionItemStatus == 0)


                            //|| internal == false
                        ) {
                            allowArray.push(CommCare.ExtensionRequest.Constants.StatusReason.ApproveAndRequestAdditionalExtension);
                        }
                        if (userId == createdById)
                            allowArray.push(CommCare.ExtensionRequest.Constants.StatusReason.Canceled);

                    }

                    for (var k = 0; k < CommCare.ExtensionRequest.Constants.StatusCodeOptions.length; k++) {
                        var pushToRemove = true;
                        for (var j = 0; j < allowArray.length; j++) {
                            if (allowArray[j] == CommCare.ExtensionRequest.Constants.StatusCodeOptions[k]["value"]) {
                                pushToRemove = false;
                            }
                        }
                        if (pushToRemove) {
                            removeArray.push(CommCare.ExtensionRequest.Constants.StatusCodeOptions[k]["value"]);
                        }
                    }
                    for (var i = 0; i < removeArray.length; i++) {
                        statusControl.removeOption(removeArray[i]);
                    }
                });


            });
        }
        else {
            if (isLoad) {
                CommCare.ExtensionRequest.Constants.StatusCodeOptions = CommCare.Shared.FormContext.getAttribute("statuscode").getOptions();
            } else {
                statusControl.clearOptions();
                for (var i = 0; i < CommCare.ExtensionRequest.Constants.StatusCodeOptions.length; i++) {
                    statusControl.addOption(CommCare.ExtensionRequest.Constants.StatusCodeOptions[i]);
                }
            }
        }

    }

    function getParentDueDate() {
        var parentDirectorateTask = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parentdirectoratetaskid"));
        var parentTasker = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parenttasker"));
        var parentActionItem = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_parentactionitem"));
        //var returnObject = {};
        if (parentDirectorateTask != null) {
            return Xrm.WebApi.online.retrieveRecord("mcs_taskertask", parentDirectorateTask, "?$select=mcs_directorateduedate").then(function success(parentResult) {
                console.log(parentResult);
                return parentResult["mcs_directorateduedate"];

            },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        } else if (parentTasker != null) {
            return Xrm.WebApi.online.retrieveRecord("mcs_trackeritem", parentTasker, "?$select=mcs_duedate").then(
                function success(result) {
                    console.log(result);
                    return result["mcs_duedate"];
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        } else if (parentActionItem != null) {
            return Xrm.WebApi.online.retrieveRecord("mcs_tracker", parentActionItem, "?$select=mcs_frontofficeduedate").then(
                function success(actionItemResult) {
                    console.log(actionItemResult);
                    return actionItemResult["mcs_frontofficeduedate"];

                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        }
    }

    function modalDialogForDirectorateTask() {
        var parentDirTask = CommCare.Shared.GetFieldValue("mcs_parentdirectoratetaskid");
        CommCare.Shared.FormContext.getControl("mcs_parentdirectoratetaskid").addOnLookupTagClick(context => {
            context.getEventArgs().preventDefault();
            context.getEventArgs().getTagValue();
            Xrm.Navigation.navigateTo({
                pageType: "entityrecord",
                entityName: parentDirTask[0]["entityType"],
                formType: 2,
                entityId: CommCare.Shared.GetCleanId(parentDirTask),
                formId: "5285084b-7dd5-4593-8a25-db2daf934654"
            }, {
                target: 2,
                position: 1,
                width: {
                    value: 80,
                    unit: "%"
                }
            }).then(function () {
                CommCare.Shared.FormContext.data.refresh(true).then(function () {
                    console.log("refresh");
                    buildConditionalStatusOptions(false);
                    CommCare.Shared.FormContext.ui.clearFormNotification("TopChainDirTask");
                    CommCare.Shared.FormContext.ui.clearFormNotification("TopChainTasker");
                });
            });
        });

    }

    function modalDialogForTasker() {
        var parentTasker = CommCare.Shared.GetFieldValue("mcs_parenttasker");
        CommCare.Shared.FormContext.getControl("mcs_parenttasker").addOnLookupTagClick(context => {
            context.getEventArgs().preventDefault();
            context.getEventArgs().getTagValue();
            Xrm.Navigation.navigateTo({
                pageType: "entityrecord",
                entityName: parentTasker[0]["entityType"],
                formType: 2,
                entityId: CommCare.Shared.GetCleanId(parentTasker),
                formId: "FEFA62A3-527A-4C2D-8E9B-6C21F362DECD"
            }, {
                target: 2,
                position: 1,
                width: {
                    value: 80,
                    unit: "%"
                }
            }).then(function () {
                CommCare.Shared.FormContext.data.refresh(true).then(function () {
                    console.log("refresh");
                    buildConditionalStatusOptions(false);
                    CommCare.Shared.FormContext.ui.clearFormNotification("TopChainDirTask");
                    CommCare.Shared.FormContext.ui.clearFormNotification("TopChainTasker");
                });
            });
        });

    }

    function modalDialogForActionItem() {
        var parentActionItem = CommCare.Shared.GetFieldValue("mcs_parentactionitem");
        console.log(parentActionItem);
        CommCare.Shared.FormContext.getControl("mcs_parentactionitem").addOnLookupTagClick(context => {
            context.getEventArgs().preventDefault();
            context.getEventArgs().getTagValue();

            Xrm.Navigation.navigateTo({
                pageType: "entityrecord",
                entityName: parentActionItem[0]["entityType"],
                formType: 2,
                entityId: CommCare.Shared.GetCleanId(parentActionItem),
                formId: "144FEF3B-964A-4D0A-8FBB-5A445B5A5A18"
            }, {
                target: 2,
                position: 1,
                width: {
                    value: 80,
                    unit: "%"
                }
            }).then(function () {
                CommCare.Shared.FormContext.data.refresh(true).then(function () {
                    console.log("refresh");
                    buildConditionalStatusOptions(false);
                    CommCare.Shared.FormContext.ui.clearFormNotification("TopChainDirTask");
                    CommCare.Shared.FormContext.ui.clearFormNotification("TopChainTasker");
                });
            });
        });

    }

    function closeQuickCreateFromActionItem() {
        if (CommCare.ExtensionRequest.Constants.FormType == "quickcreate") {
            var tasker = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
            var directorateTask = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_directoratetask"));
            if (tasker == null && directorateTask == null) {
                var alertStrings = { text: "Extension Requests cannot be created for Action Items.", title: "Cannot create Extension Request" };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                    CommCare.Shared.FormContext.ui.close();
                },
                    (error) => {
                        console.log("Error in closing dialog", error);
                    });
            }
        }
    }

    function closeQuickCreateIfParentIsInactive() {
        if (CommCare.ExtensionRequest.Constants.FormType == "quickcreate") {
            var parentTasker = CommCare.Shared.GetFieldValue("mcs_parenttasker");
            var parentDirTask = CommCare.Shared.GetFieldValue("mcs_parentdirectoratetaskid");
            var parentActionItem = CommCare.Shared.GetFieldValue("mcs_parentactionitem");
            console.log(`parentActionItem: ${parentActionItem}`);
            var tasker = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_tasker"));
            var directorateTask = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_directoratetask"));

            var queryEntity = "";
            var queryGuid;
            if (tasker != null && parentActionItem != null) {
                queryEntity = "mcs_tracker";
                queryGuid = CommCare.Shared.GetCleanId(parentActionItem);
            }

            if (directorateTask != null && parentTasker != null) {
                queryEntity = "mcs_trackeritem";
                queryGuid = CommCare.Shared.GetCleanId(parentTasker);
            }

            if (directorateTask != null && parentDirTask != null) {
                queryEntity = "mcs_taskertask";
                queryGuid = CommCare.Shared.GetCleanId(parentDirTask);
            }

            console.log(`queryEntity: ${queryEntity}`);
            console.log(`queryGuid: ${queryGuid}`);

            Xrm.WebApi.retrieveRecord(queryEntity, queryGuid, "?$select=statecode").then(
                function success(result) {
                    console.log(result);
                    var statecode = result["statecode"]; // State
                    if (statecode == CommCare.ExtensionRequest.Constants.StateCode.Inactive) {
                        let alertStrings = { text: "Extension Requests cannot be created for when a record's parent is inactive.", title: "Cannot create Extension Request" };
                        let alertOptions = { height: 120, width: 260 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                            CommCare.Shared.FormContext.ui.close();
                        },
                            (error) => {
                                console.log("Error in closing dialog", error);
                            });
                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }

    }

    function openModalDialogsWhenTopApprovalLevel() {
        var approvalLevelNeeded = CommCare.Shared.GetFieldValue("mcs_approvallevelneeded");
        var parentTasker = CommCare.Shared.GetFieldValue("mcs_parenttasker");
        var parentDirTask = CommCare.Shared.GetFieldValue("mcs_parentdirectoratetaskid");
        var tasker = CommCare.Shared.GetFieldValue("mcs_tasker");
        var dirTask = CommCare.Shared.GetFieldValue("mcs_directoratetask");
        CommCare.Shared.FormContext.ui.clearFormNotification("TopChainDirTask");
        CommCare.Shared.FormContext.ui.clearFormNotification("TopChainTasker");
        if (approvalLevelNeeded == CommCare.ExtensionRequest.Constants.ApprovalLevelNeeded.DirectorateApproval && parentDirTask != null) {
            CommCare.Shared.FormContext.ui.setFormNotification("This extension request can not be approved, please click on the parent directorate task to adjust the due date of the directorate task.", "WARNING", "TopChainDirTask");
            modalDialogForDirectorateTask();
        }

        if (approvalLevelNeeded == CommCare.ExtensionRequest.Constants.ApprovalLevelNeeded.ExecutiveDirectorateApproval && dirTask != null && parentTasker != null) {
            CommCare.Shared.FormContext.ui.setFormNotification("This extension request can not be approved, please click on the parent tasker to adjust the due date of the tasker.", "WARNING", "TopChainTasker");
            modalDialogForTasker();
        }
    }

    function hideShowCancelReason() {
        var status = CommCare.Shared.GetFieldValue("statuscode");
        var setVis = status == CommCare.ExtensionRequest.Constants.StatusReason.Canceled || status == CommCare.ExtensionRequest.Constants.StatusReason.CanceledInActive;

        var tab = CommCare.Shared.FormContext.ui.tabs.get("General");
        var section;

        if (!!tab) {
            section = tab.sections.get("CancellationNotes");
            if (!!section) {
                section.setVisible(setVis);
            }
        }

        CommCare.Shared.SetRequired("mcs_cancellationnotes", status == CommCare.ExtensionRequest.Constants.StatusReason.Canceled);
        CommCare.Shared.SetReadOnly("mcs_cancellationnotes", status == CommCare.ExtensionRequest.Constants.StatusReason.Canceled);
    }

})();
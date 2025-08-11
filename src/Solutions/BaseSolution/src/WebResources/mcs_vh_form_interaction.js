var VETHOME_Interaction_MviLoaded = false;
var VETHOME_Interaction_LookupFilters = {};

if (typeof VETHOME == 'undefined') { var VETHOME = { __namespace: true }; }

if (typeof (VETHOME.Interaction) == "undefined") {
    VETHOME.Interaction = {
        __namespace: true
    };
}

VETHOME.Interaction.Functions = function () {
    function onLoad(executionContext) {
        CommCare.Shared.GetFormContext(executionContext);
        onVetSearchFocus(executionContext);
        if (CommCare.Shared.FormContext.ui.getFormType() == CommCare.Shared.Constants.CREATE_FORM) {
            initialSave();
        }
        else {
            setOnChangeEvents(executionContext);
            getLookupFilters();
            runSensitiveVetCheck();
            showTimelineForDocumentUpload();
            addContactFromRegistrant();
            showHideContact();
            DisablePurposePurposeDetailforCOE();
        }
    }

    function setOnChangeEvents(executionContext) {
        CommCare.Shared.SetOnChange("bah_interactionsource_code", function () { driveFormBusinessRules(); });
        CommCare.Shared.SetOnChange("bah_interactedwith_code", function () { driveFormBusinessRules(); });
        CommCare.Shared.SetOnChange("bah_interactedwith_code", function (executionContext) { setMeaningfulRelationshipOtherRequired(executionContext); });
        CommCare.Shared.SetOnChange("bah_interactedwith_code", function () { showEmployeeField(); });
        CommCare.Shared.SetOnChange("mcs_cliniciantype", function () { showEmployeeField(); });
        CommCare.Shared.SetOnChange("mcs_cliniciantype", function () { providerFacilityShowRequiredLevel() });
        CommCare.Shared.SetOnChange("bah_relationshiptoveteran_code", function (executionContext) { setMeaningfulRelationshipOtherRequired(executionContext); });
        CommCare.Shared.SetOnChange("mcs_employee", function () { onSetEmployee(executionContext); });
        CommCare.Shared.SetOnChange("vhacrm_interactionpurposeid", function () { showFieldsFromPurposeOrCondition() });
        CommCare.Shared.SetOnChange("bah_phonenumber_text", function () {
            VETHOME.Shared.Functions.FormatPhoneNumber(executionContext, "bah_phonenumber_text");
        });
        CommCare.Shared.SetOnChange("bah_veteranid", runSensitiveVetCheck);
        CommCare.Shared.SetOnChange("bah_veteranid", showHideContact);
        CommCare.Shared.SetOnChange("vhacrm_interactionsubpurposeid", function () { showTimelineForDocumentUpload() });
        executionContext.getFormContext().data.entity.addOnSave(function (executionContext) { onSave(executionContext); });
    }

    function onVetSearchFocus(executionContext) {
        if (!VETHOME_Interaction_MviLoaded) {
            VETHOME_Interaction_MviLoaded = true;
            setupChildContext("WebResource_MviSearch", executionContext.getFormContext(), 0);
        }
    }

    function setupChildContext(controlName, formContext, retryCounter) {
        var wrControl = formContext.ui.controls.get(controlName);
        if (wrControl) {
            wrControl.getContentWindow().then(
                function (contentWindow) {
                    if (typeof contentWindow.setClientApiContext == 'function') { //Sometimes web resource html page loads out of order, so need to confirm page load before calling function on it
                        contentWindow.setClientApiContext(Xrm, formContext);
                    }
                    else if (retryCounter < 3) { //building a retry loop to account for timing/sequencing issues with html loading
                        console.log("Failed to load content in window prior to Setting Client Form Context " + retryCounter);
                        retryCounter++;
                        setTimeout(function () { setupChildContext(controlName, formContext, retryCounter) }, 200);
                    }
                    else
                        console.error("Exiting after multiple failure to load content in window prior to Setting Client Form Context " + retryCounter);
                },
                function (failure) {
                    Xrm.Utility.alertDialog(failure);
                }
            )
        }
    }


    function initialSave() {
        getLob().then(function (data) {
            setLob(data);
            setDefaultsAndSavePromise().then(function (data) {
                //getLookupFilters();
                console.log("Completed Initial Save");
            });
        });
    }

    function getLob() {
        return new Promise(function (resolve, reject) {
            var fetch = '?fetchXml=' +
                '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">' +
                '<entity name="hrc_lob">' +
                '<attribute name="hrc_lobid" />' +
                '<attribute name = "hrc_name" />' +
                '<order attribute = "hrc_name" descending = "false" /> ' +
                '<link-entity name="vhacrm_hrc_lob_systemuser" from="hrc_lobid" to="hrc_lobid" visible="false" intersect="true">' +
                '<link-entity name="systemuser" from="systemuserid" to="systemuserid" alias="ac">' +
                '<filter type="and">' +
                '<condition attribute="systemuserid" operator="eq-userid" />' +
                '</filter>' +
                '</link-entity>' +
                '</link-entity>' +
                '</entity>' +
                '</fetch>';

            Xrm.WebApi.retrieveMultipleRecords("hrc_lob", fetch).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    }

    function setLob(data) {
        var lobs = data.entities;
        if (lobs.length == 1) {
            CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("hrc_lobid", lobs[0]["hrc_lobid"], lobs[0]["hrc_name"], "hrc_lob");
        }
        else {
            var alertStrings = { text: "You do not have a Line of Business on your Profile. Please put in a SNOW Ticket to update your Profile with the Correct Line of Business.", title: "No LOB" };
            if (logs.length > 1)
                alertStrings = { text: "You have multiple Lines of Business on your Profile. Please put in a SNOW Ticket to update your Profile with the Correct Line of Business.", title: "Too Many LOBs" };

            var alertOptions = { height: 200, width: 300 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                CommCare.Shared.FormContext.ui.close();
            },
                (error) => {
                    console.log("Error in closing dialog", error);
                });
        }
    }

    function getLookupFilters() {
        var lobId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("hrc_lobid"));
        console.log(lobId);
        Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=(_mcs_lineofbusiness_value eq " + lobId + " and mcs_name ne 'DefaultLOBInteractionValues' and statuscode eq 1)&$orderby=mcs_sortorder asc").then(
            function success(results) {
                console.log(results);
                VETHOME_Interaction_LookupFilters = results;

                var otherResults = { entities: [] };
                for (var i = 0; i < results.entities.length; i++) {
                    otherResults.entities.push(results.entities[i]);
                }
                VETHOME_Interaction_LookupFilters = otherResults;
                driveFormBusinessRules(otherResults);
            },
            function (error) {
                console.log(error.message);
            }
        );
    }

    function setDefaultsAndSavePromise() {
        return new Promise(function (resolve, reject) {
            var lobId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("hrc_lobid"));
            console.log(lobId);

            Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=(_mcs_lineofbusiness_value eq " + lobId + " and mcs_name eq 'DefaultLOBInteractionValues')&$orderby=mcs_sortorder asc").then(
                function success(results) {
                    //VETHOME_Interaction_LookupFilters = results;
                    console.log(results);
                    var otherResults = { entities: [] };
                    for (var i = 0; i < results.entities.length; i++) {
                        if (results.entities[i]["mcs_name"] == "DefaultLOBInteractionValues") {

                            var result = results.entities[i];

                            setLookupFromOData("bah_programtypeid", result, "_mcs_programtype_value");
                            setLookupFromOData("vhacrm_typeintersectionid", result, "_mcs_type_value");
                            CommCare.Shared.SetSubmitMode("vhacrm_typeintersectionid", "always");

                            CommCare.Shared.SetFieldValue("bah_interactedwith_code", result["mcs_interactedwith"]);
                            CommCare.Shared.SetFieldValue("bah_interactionsource_code", result["mcs_source"]);
                        }
                    }

                    CommCare.Shared.FormContext.data.entity.attributes.forEach(function (attribute, index) {
                        attribute.setRequiredLevel("none");
                    });

                    CommCare.Shared.FormContext.data.save().then(function () {
                        resolve();
                    },
                        function (e) {
                            console.log("Error in finish save " + e.message);
                            reject("Error in finish save " + e.message);
                        });


                },
                function (error) {
                    console.log(error.message);
                    reject(error);
                }
            );
        });

    }

    function driveFormBusinessRules(results) {
        if (results == null || typeof results.getFormContext == 'function')
            results = VETHOME_Interaction_LookupFilters;
        setDefaultRequiredFields(results);
        setRequiredFieldsFromSource(results);
        showRequireFields(results);
        showInteractedWithValue(results);
        showSourceValue(results);
        showRelationshipToVeteranValues(results);
        emailRequiredLevel();
        phoneEmailRequiredLevel();
        providerFacilityShowRequiredLevel();
        showFieldsFromPurposeOrCondition(results);
        showEmployeeField();
    }

    function setDefaultRequiredFields(results) {
        for (var i = 0; i < results.entities.length; i++) {
            var result = results.entities[i];
            if (result["mcs_name"] != "DefaultInteractionRequiredFields")
                continue;

            var fields = result["mcs_fieldname"].split(',');
            for (var j = 0; j < fields.length; j++) {
                CommCare.Shared.SetRequired(fields[j], "required");
            }

        }
    }

    function showRequireFields(results) {
        var source = CommCare.Shared.GetFieldValue("bah_interactionsource_code");
        var iwc = CommCare.Shared.GetFieldValue("bah_interactedwith_code");
        var actionsToTake = [];
        var fieldsMatched = [];
        var actionsMissed = [];
        for (var i = 0; i < results.entities.length; i++) {
            var result = results.entities[i];
            var sourceMatches = (result["mcs_source"] == source)
                || (source == null)
                || (result["mcs_source"] == null);
            var iwcMatches = result["mcs_interactedwith"] == iwc
                || (result["mcs_interactedwith"] == null)
                || (iwc == null);
            if (result.mcs_name != "ShowHideFields")
                continue;

            var requiredLevel = result["mcs_requirementlevel"];
            if (requiredLevel != "required" && requiredLevel != "recommended")
                requiredLevel = "none";

            var correctPicklistVal = (iwcMatches && sourceMatches);
            var fields = result["mcs_fieldname"].split(',');
            var disabled = result["mcs_value"];


            for (var j = 0; j < fields.length; j++) {
                if (correctPicklistVal) {
                    actionsToTake.push({ "reqd": requiredLevel, "disable": disabled, "fields": fields[j] });
                    fieldsMatched.push(fields[j]);
                }
                else {
                    actionsMissed.push({ "reqd": requiredLevel, "fields": fields[j] });
                }
            }

        }
        actionsMissed = actionsMissed.filter(f => fieldsMatched.indexOf(f.fields) == -1);

        for (var i = 0; i < actionsToTake.length; i++) {
            var field = actionsToTake[i].fields;
            var requiredLevel = actionsToTake[i].reqd;
            var disabled = actionsToTake[i].disable;

            if (requiredLevel != "required" && requiredLevel != "recommended")
                requiredLevel = "none";

            CommCare.Shared.SetRequired(field, requiredLevel);
            CommCare.Shared.SetVisible(field, true);
            if (disabled == "disabled")
                CommCare.Shared.SetReadOnly(field, true);
            else if (disabled == "enabled")
                CommCare.Shared.SetReadOnly(field, false);
        }
        for (var i = 0; i < actionsMissed.length; i++) {
            var field = actionsMissed[i].fields;
            var requiredLevel = actionsMissed[i].reqd;

            CommCare.Shared.SetRequired(field, "none");
            CommCare.Shared.SetVisible(field, false);
        }
    }

    function showRequirePurpose(results) {
        if (results == null || typeof results.getFormContext == 'function')
            results = VETHOME_Interaction_LookupFilters;

        var purpose = CommCare.Shared.GetFieldValue("vhacrm_interactionpurposeid");
        var purposeId = CommCare.Shared.GetCleanId(purpose);
        for (var i = 0; i < results.entities.length; i++) {
            var result = results.entities[i];
            if (result.mcs_name != "ShowRequirePurpose")
                continue;

            var purposeMatches = (result["_mcs_purposeintersection_value"] == purposeId);

            var requiredLevel = result["mcs_requirementlevel"];
            if (requiredLevel != "required" && requiredLevel != "recommended")
                requiredLevel = "none";

            var fields = result["mcs_fieldname"].split(',');
            for (var j = 0; j < fields.length; j++) {
                if (purposeMatches) {
                    CommCare.Shared.SetRequired(fields[j], requiredLevel);
                    CommCare.Shared.SetVisible(fields[j], true);
                }
                else {
                    CommCare.Shared.SetRequired(fields[j], "none");
                    CommCare.Shared.SetVisible(fields[j], false);
                }
            }

        }
    }

    function showFieldsFromPurposeOrCondition(results) {
        if (typeof results == 'undefined')
            results = VETHOME_Interaction_LookupFilters;
        if (!!!VETHOME_Interaction_LookupFilters || typeof VETHOME_Interaction_LookupFilters.entities == 'undefined')
            return;
        var actionsToTake = [];
        var actionsMissed = [];
        var purpose = CommCare.Shared.GetFieldValue("vhacrm_interactionpurposeid");
        var purposeId = CommCare.Shared.GetCleanId(purpose);
        for (var i = 0; i < results.entities.length; i++) {
            var result = results.entities[i];
            if (result["mcs_name"] == "ShowFieldsWithPurposeOrCondition") {
                var fields = result["mcs_fieldname"].split(',');
                if (result["_mcs_purposeintersection_value"] == purposeId) {
                    actionsToTake.push({ "result": result, "fields": fields });
                }
                else {
                    actionsMissed.push({ "result": result, "fields": fields });
                }
            }
        }
        var fieldsToDefault = [];
        var fieldsToShow = [];
        var reqOrNot = [];
        for (var j = 0; j < actionsMissed.length; j++) {
            var fieldsToTakeDefaults = actionsMissed[j].fields;
            for (var i = 0; i < fieldsToTakeDefaults.length; i++) {
                fieldsToDefault.push(fieldsToTakeDefaults[i]);
            }
        }
        for (var j = 0; j < actionsToTake.length; j++) {
            var action = actionsToTake[j];
            for (var i = 0; i < action.fields.length; i++) {
                var fieldName = action.fields[i];
                fieldsToShow.push(fieldName);
            }
        }
        fieldsToDefault = fieldsToDefault.filter(f => fieldsToShow.indexOf(f) == -1);

        for (var i = 0; i < fieldsToDefault.length; i++) {
            CommCare.Shared.SetVisible(fieldsToDefault[i], false);
            CommCare.Shared.SetRequired(fieldsToDefault[i], "none");
            CommCare.Shared.SetFieldValue(fieldsToDefault[i], null);
        }
        // for (var j = 0; j < actionsMissed.length; j++) {
        //     var fieldsToTakeDefaults = actionsMissed[j].fields;
        //     for (var i = 0; i < fieldsToTakeDefaults.length; i++) {
        //         CommCare.Shared.SetVisible(fieldsToTakeDefaults[i], false);
        //         CommCare.Shared.SetRequired(fieldsToTakeDefaults[i], "none");
        //         // CommCare.Shared.SetFieldValue(fieldsToTakeDefaults[i], null);
        //         CommCare.Shared.SetSubmitMode(fieldsToTakeDefaults[i], "never");
        //     }
        // }
        for (var j = 0; j < actionsToTake.length; j++) {
            var action = actionsToTake[j];
            for (var i = 0; i < action.fields.length; i++) {
                var fieldName = action.fields[i];
                var reqLevel = action.result["mcs_requirementlevel"] || "none";
                CommCare.Shared.SetVisible(fieldName, true);
                CommCare.Shared.SetRequired(fieldName, reqLevel);
                CommCare.Shared.SetSubmitMode(fieldsToTakeDefaults[i], "dirty");
            }
        }
    }

    function showHideMultipleFields(executionContext, fieldForValue, fieldsToShow, valueForComparison) {
        //var formContext = executionContext.getFormContext();
        if (fieldsToShow && fieldsToShow.length > 0) {
            for (var i = 0; i < fieldsToShow.length; i++)
                showHideField(executionContext, fieldForValue, fieldsToShow[i], valueForComparison);
        }
    }

    function showHideField(executionContext, fieldForValue, fieldToShow, valueForComparison) {
        //var formContext = executionContext.getFormContext();
        var isValue = false;
        if (Array.isArray(valueForComparison)) {
            for (var i = 0; i < valueForComparison.length; i++) {
                if (valueForComparison[i] == CommCare.Shared.GetFieldValue(fieldForValue))
                    isValue = true;
            }
        }
        else
            isValue = CommCare.Shared.GetFieldValue(fieldForValue) == valueForComparison;

        CommCare.Shared.SetVisible(fieldToShow, isValue);
    }

    function performShowHides(executionContext) {
        debugger;
        console.log("test");
    }

    function phoneEmailRequiredLevel() {
        var source = CommCare.Shared.GetFieldValue("bah_interactionsource_code");
        var interactedWith = CommCare.Shared.GetFieldValue("bah_interactedwith_code");

        if (source == VETHOME.Interaction.Constants.InteractionSource.Phone) {
            CommCare.Shared.SetRequired("bah_phonenumber_text", "required");
        }
        else if (interactedWith == VETHOME.Interaction.Constants.InteractedWith.Clinician) {
            CommCare.Shared.SetRequired("bah_phonenumber_text", "required");
        }
        else if (interactedWith == VETHOME.Interaction.Constants.InteractedWith.VAEmployeeNonClinical) {
            CommCare.Shared.SetRequired("bah_phonenumber_text", "recommended");
        }
        else
            CommCare.Shared.SetRequired("bah_phonenumber_text", "none");
    }

    function emailRequiredLevel() {
        var source = CommCare.Shared.GetFieldValue("bah_interactionsource_code");
        var interactedWith = CommCare.Shared.GetFieldValue("bah_interactedwith_code");

        if (source == VETHOME.Interaction.Constants.InteractionSource.Email || source == VETHOME.Interaction.Constants.InteractionSource.Internal) {
            CommCare.Shared.SetRequired("mcs_emailaddress", "required");
        }
        else if (interactedWith == VETHOME.Interaction.Constants.InteractedWith.VAEmployeeNonClinical) {
            CommCare.Shared.SetRequired("mcs_emailaddress", "recommended");
        }
        else
            CommCare.Shared.SetRequired("mcs_emailaddress", "none");
    }

    function showEmployeeField() {
        var vaClinicianType = CommCare.Shared.GetFieldValue("mcs_cliniciantype") == 803750002;
        var isClinician = CommCare.Shared.GetFieldValue("bah_interactedwith_code") == 803750014;
        var vaEmployee = CommCare.Shared.GetFieldValue("bah_interactedwith_code") == 803750012;

        if (isClinician && vaClinicianType) {
            CommCare.Shared.SetVisible("mcs_employee", true);
        }
        else if (vaEmployee) {
            CommCare.Shared.SetVisible("mcs_employee", true);
        }
        else {
            CommCare.Shared.SetVisible("mcs_employee", false);
        }
    }

    function providerFacilityShowRequiredLevel() {
        var isClinician = CommCare.Shared.GetFieldValue("bah_interactedwith_code") == 803750014;
        var isCommunityProvider = CommCare.Shared.GetFieldValue("mcs_cliniciantype") == 803750000;

        if (isClinician && isCommunityProvider) {
            CommCare.Shared.SetVisible("ccwf_providerfacility_text", true);
            CommCare.Shared.SetRequired("ccwf_providerfacility_text", "required");
        }
        else {
            CommCare.Shared.SetVisible("ccwf_providerfacility_text", false);
            CommCare.Shared.SetRequired("ccwf_providerfacility_text", "none");
        }

    }

    //function setRequiredShownFieldsFromGeneric(results) {
    //    if (results == null || typeof results.getFormContext == 'function')
    //        results = VETHOME_Interaction_LookupFilters;

    //    var purpose = CommCare.Shared.GetFieldValue("vhacrm_interactionpurposeid");
    //    var purposeId = CommCare.Shared.GetCleanId(purpose);
    //    for (var i = 0; i < results.entities.length; i++) {
    //        var result = results.entities[i];
    //        if (result.mcs_name != "ShowRequireGeneric")
    //            continue;

    //        var purposeMatches = (result["_mcs_purposeintersection_value"] == purposeId);

    //        var requiredLevel = result["mcs_requirementlevel"];
    //        if (requiredLevel != "required" && requiredLevel != "recommended")
    //            requiredLevel = "none";

    //        var fields = result["mcs_fieldname"].split(',');
    //        for (var j = 0; j < fields.length; j++) {
    //            if (purposeMatches) {
    //                CommCare.Shared.SetRequired(fields[j], requiredLevel);
    //                CommCare.Shared.SetVisible(fields[j], true);
    //            }
    //            else {
    //                CommCare.Shared.SetRequired(fields[j], "none");
    //                CommCare.Shared.SetVisible(fields[j], false);
    //            }
    //        }

    //    }
    //}

    function setRequiredFieldsFromSource(results) {
        var fieldsToRequire = [];
        var fieldsToUnRequire = [];
        var source = CommCare.Shared.GetFieldValue("bah_interactionsource_code");
        for (var i = 0; i < results.entities.length; i++) {
            var result = results.entities[i];
            if (result["mcs_name"] == "SetRequiredFieldsFromSource") {
                var fields = result["mcs_fieldname"];
                var fieldList = fields.split(',');
                if (result["mcs_source"] == source)
                    fieldsToRequire = fieldList;
                else {
                    for (var j = 0; j < fieldList.length; j++) {
                        if (fieldsToUnRequire.indexOf(fieldList[j]) == -1)
                            fieldsToUnRequire.push(fieldList[j]);
                    }
                }
            }
        }
        fieldsToUnRequire = fieldsToUnRequire.filter(f => fieldsToRequire.indexOf(f) == -1);
        for (var i = 0; i < fieldsToRequire.length; i++) {
            CommCare.Shared.SetRequired(fieldsToRequire[i], "required");
        }
        for (var i = 0; i < fieldsToUnRequire.length; i++) {
            CommCare.Shared.SetRequired(fieldsToUnRequire[i], "none");
        }
    }

    function showRelationshipToVeteranValues(results) {
        showPicklistValues(results, "bah_relationshiptoveteran_code", "ShowRelationToVeteran", "mcs_relationtoveteran");
    }

    function showSourceValue(results) {
        showPicklistValues(results, "bah_interactionsource_code", "ShowSourceValue", "mcs_source");
    }

    function showInteractedWithValue(results) {
        showPicklistValues(results, "bah_interactedwith_code", "ShowInteractedWithValue", "mcs_interactedwith");
    }

    function showPicklistValues(results, formFieldName, lookupFilterName, oDataFieldName) { //"bah_interactedwith_code",  //"ShowInteractedWithValue", //"mcs_interactedwith"
        var currentVal = CommCare.Shared.GetFieldValue(formFieldName);
        var options = CommCare.Shared.FormContext.getAttribute(formFieldName).getOptions();
        var optionsAdded = [];
        CommCare.Shared.FormContext.getControl(formFieldName).clearOptions();
        for (var i = 0; i < results.entities.length; i++) {
            var result = results.entities[i];
            if (result["mcs_name"] == lookupFilterName) {
                var mcs_interactedwith = result[oDataFieldName];
                var optionToAdd = options.filter(o => o.value == result[oDataFieldName])[0];
                optionsAdded.push(optionToAdd.value);
                CommCare.Shared.FormContext.getControl(formFieldName).addOption(optionToAdd);
            }
        }
        if (currentVal != null && optionsAdded.indexOf(currentVal) == -1) {
            var currentOption = options.filter(o => o.value == currentVal)[0];
            CommCare.Shared.FormContext.getControl(formFieldName).addOption(currentOption);
        }

        if (currentVal != null)
            CommCare.Shared.SetFieldValue(formFieldName, currentVal);
    }

    function onSetEmployee(executionContext) {
        var formContext = executionContext.getFormContext();
        var employee = formContext.getAttribute("mcs_employee").getValue();
        if (employee == null)
            return;
        Xrm.WebApi.online.retrieveRecord("aaduser", employee[0].id, "?$select=businessphones,displayname,givenname,surname,userprincipalname").then(
            function success(result) {
                var phones = VETHOME.Shared.Functions.SplitPhoneNumber(result["businessphones"]);
                CommCare.Shared.SetFieldValue("bah_firstname_text", result["givenname"]);
                CommCare.Shared.SetFieldValue("bah_lastname_text", result["surname"]);
                CommCare.Shared.SetFieldValue("mcs_emailaddress", result["userprincipalname"]);
                if (phones.primary) {
                    CommCare.Shared.SetFieldValue("bah_phonenumber_text", phones.primary);
                }
                else
                    CommCare.Shared.SetFieldValue("bah_phonenumber_text", result["businessphones"]);
                CommCare.Shared.FormContext.getAttribute("bah_phonenumber_text").fireOnChange();

                if (phones.ext)
                    CommCare.Shared.SetFieldValue("bah_phoneextension_text", phones.ext);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }

    function setMeaningfulRelationshipOtherRequired(executionContext) {
        var formContext = executionContext.getFormContext();
        var iwc = CommCare.Shared.GetFieldValue("bah_interactedwith_code");
        var relationshipVal = CommCare.Shared.GetFieldValue("bah_relationshiptoveteran_code");
        if (relationshipVal == 810050004 && iwc == 810050002) { //Meaningful Relationship, Relationship Type Other
            CommCare.Shared.SetRequired("bah_otherrelationship_text", "required");
            CommCare.Shared.SetVisible("bah_otherrelationship_text", true);
        }
        else {
            CommCare.Shared.SetRequired("bah_otherrelationship_text", "none");
            CommCare.Shared.SetVisible("bah_otherrelationship_text", false);
        }
    }

    function setLookupFromOData(destinationFieldName, odataResult, odataFieldName) {
        CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue(destinationFieldName, odataResult[odataFieldName], odataResult[odataFieldName + "@OData.Community.Display.V1.FormattedValue"], odataResult[odataFieldName + "@Microsoft.Dynamics.CRM.lookuplogicalname"]);
    }

    function runSensitiveVetCheck() {
        var vetObj = CommCare.Shared.GetFieldValue("bah_veteranid");
        if (vetObj != null)
            VETHOME.Sensitive.Functions.CheckForVetSensitivity();
    }

    function onSave(executionContext) {
        var formContext = executionContext.getFormContext();
        var isClinician = CommCare.Shared.GetFieldValue("bah_interactedwith_code") == 803750014;
        var vaEmployee = CommCare.Shared.GetFieldValue("bah_interactedwith_code") == 803750012;

        var phone = CommCare.Shared.GetFieldValue("bah_phonenumber_text");
        var email = CommCare.Shared.GetFieldValue("mcs_emailaddress");

        if ((isClinician || vaEmployee) && (phone == null && email == null)) {
            CommCare.Shared.FormContext.ui.setFormNotification("You must enter either phone number or email.", "ERROR", "errorphoneemail");
            executionContext.getEventArgs().preventDefault();
        }
        else
            CommCare.Shared.FormContext.ui.clearFormNotification("errorphoneemail");
    }

    function showTimelineForDocumentUpload() {
        if (CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_interactionsubpurposeid")) === "764aeaf4-f3bc-ed11-83ff-001dd80721cf") {
            CommCare.Shared.SetVisible("Timeline", true);
        }
        else {
            CommCare.Shared.SetVisible("Timeline", false);
        }
    }

    //TODO remove EDIPI or fix mappings
    function addContactFromRegistrant() {
        var reg = CommCare.Shared.GetFieldValue("mcs_vethomevirpregistrant");
        var customer = CommCare.Shared.GetFieldValue("bah_veteranid");

        var purpose = CommCare.Shared.GetFieldValue("vhacrm_interactionpurposeid")
        if (CommCare.Shared.GetCleanId(purpose) == VETHOME.Interaction.Constants.VETHOME_VirpOutreachId) {
            CommCare.Shared.SetReadOnly("vhacrm_interactionpurposeid", true);
        }

        if (reg != null && customer == null) {
            CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_interactionpurposeid", VETHOME.Interaction.Constants.VETHOME_VirpOutreachId, VETHOME.Interaction.Constants.VETHOME_VirpOutreachName, "vhacrm_areaintersection");
            CommCare.Shared.SetReadOnly("vhacrm_interactionpurposeid", true);

            var id = CommCare.Shared.GetCleanId(reg);
            Xrm.WebApi.online.retrieveMultipleRecords("contact", "?$select=contactid,fullname,firstname,lastname,telephone1,emailaddress1,bah_dob_date&$filter=_mcs_vethomevirpregistrant_value eq " + id + " or bah_edipi_text eq '123'").then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        var result = results.entities[i];
                        var contactid = result["contactid"];
                        var contactName = result["fullname"];
                        //var contactFName = result["firstname"];
                        //var contactLName = result["lastname"];
                        //var contactPhone = result["telephone1"];
                        //var contactEmail = result["emailaddress1"];
                        //var contactDobRes = result["bah_dob_date"];

                        setFieldValueFromOdata(result["firstname"], "bah_firstname_text");
                        setFieldValueFromOdata(result["lastname"], "bah_lastname_text");
                        setFieldValueFromOdata(result["telephone1"], "bah_phonenumber_text");
                        setFieldValueFromOdata(result["emailaddress1"], "mcs_emailaddress");
                        var dob = getDateFromString(result["bah_dob_date"]);
                        setFieldValueFromOdata(dob, "bah_dob_date");

                        CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("bah_veteranid", contactid, contactName, "contact");
                        CommCare.Shared.FormContext.getAttribute("bah_veteranid").fireOnChange();
                        CommCare.Shared.FormContext.ui.tabs.get("interactioninformation").setFocus();
                    }
                },
                function (err) {
                    console.error(err);
                    //Xrm.Utility.alertDialog(error.message);
                }
            );
        }
    }

    function showHideContact() {
        if (CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("bah_veteranid")) != null) {
            CommCare.Shared.FormContext.ui.tabs.get("interactioninformation").sections.get("form_veteran").setVisible(true);
        }
        else {
            CommCare.Shared.FormContext.ui.tabs.get("interactioninformation").sections.get("form_veteran").setVisible(false);
        }
    }

    function getDateFromString(dateString) {
        if (dateString == null || dateString == "")
            return null;
        var d = new Date(dateString);
        d.setHours(12);
        d.setDate(d.getDate() + 1);
        return d;
    }

    function setFieldValueFromOdata(value, targetField) {
        if (CommCare.Shared.GetFieldValue(targetField) == null)
            CommCare.Shared.SetFieldValue(targetField, value);
    }

    function DisablePurposePurposeDetailforCOE() {
        if (CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_interactionsubpurposeid")) === "764aeaf4-f3bc-ed11-83ff-001dd80721cf") {
            CommCare.Shared.SetReadOnly("vhacrm_interactionpurposeid", true);
            CommCare.Shared.SetReadOnly("vhacrm_interactionsubpurposeid", true);
        }
    }

    return {
        OnLoad: onLoad,
        //SetPatientFields: setPatientFields,
        DriveFormBusinessRules: driveFormBusinessRules,
        OnSetEmployee: onSetEmployee,
        OnSave: onSave
    };
}();
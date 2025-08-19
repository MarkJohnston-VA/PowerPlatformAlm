if (typeof CommCare == 'undefined')
{ CommCare = { __namespace: true }; }

if (typeof (CommCare.ProgressNote) == "undefined") {
    CommCare.ProgressNote = {
        __namespace: true
    };
}


if (typeof (CommCare.ProgressNote.Global) == "undefined") {
    CommCare.ProgressNote.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.ProgressNote.Constants) == "undefined") {
    CommCare.ProgressNote.Constants = {
        __namespace: true
    };
}

CommCare.ProgressNote.Constants.SiteIds = [];

CommCare.ProgressNote.Global = (function () {
    //Public functions
    return {
        OnLoad: onLoad,
        FormatTelephoneNumber: formatTelephoneNumber,
        FormatTelephoneNumberNANP: formatTelephoneNumberNANP
    }
    vcmn_newProgressNoteLoad_WebURL
    function onLoad(context) {
        try {
            CommCare.Shared.GetFormContext(context);
            
            var tabNotes = CommCare.Shared.FormContext.ui.tabs.get("Note");
            tabNotes.addTabStateChange(RefreshNotes);

            // add on change events
            //CommCare.Shared.SetOnChange("mcs_patientfacility", vcmn_initViaDropdownControls);
            CommCare.Shared.SetOnChange("mcs_callbacknumber", validatePhoneNumber);
            CommCare.Shared.SetOnChange("mcs_isreaddisclaimer", vcmn_needToReadDisclaimer_OnChange);
            CommCare.Shared.SetOnChange("mcs_ispatientagree", vcmn_isPatientInAgreement_OnChange);
            CommCare.Shared.SetOnChange("mcs_patientcallersreasonfordisagreeing", vcmn_appendNoteFinancialDisclaimer_OnChange);
            CommCare.Shared.SetOnChange("mcs_progressnotefacility", setPatientFac);

            // on load events
            vcmn_newProgressNoteLoad();
            CommCare.Shared.FormContext.getAttribute("mcs_callbacknumber").fireOnChange();
            CommCare.Shared.SetFieldValue("mcs_selectedworkloadnotetitleid", "266");
            CommCare.Shared.SetSubmitMode("mcs_selectedworkloadnotetitleid", "always");
            CommCare.Shared.SetFieldValue("mcs_selectedworkloadnotetitletext", "CALL <CALL CENTER NOTE>CALL CENTER NOTE");
            CommCare.Shared.SetSubmitMode("mcs_selectedworkloadnotetitletext", "always");

            openSelectedPersonUnattendedLoc();

            CommCare.Shared.FormContext.data.entity.addOnSave(form_OnSave);
        }
        catch (err) {
            console.log(err);
        }   
    }

    function form_OnSave(context) {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log("*** ", fName);

        if (validatePhoneNumber() == false) {
            console.log("Invalid Phone Number.  Stopping form save.");
            context.getEventArgs().preventDefault();
        }
    }

    function validatePhoneNumber() {
        var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
        console.log(fName);

        var programType = CommCare.Shared.GetFieldValue("mcs_typeintersectionid");
        var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

        CommCare.Shared.ValidatePhoneOrFaxNumber("ProgressNote", programTypeName, ["mcs_callbacknumber"], "Phone");
    }

    function openSelectedPersonUnattendedLoc(icn) {

        // receiving ICN (not full patientIdentifier) e.g. 1012587220V891111, no additional parsing necessary
        console.log("Making second call to MVI for correlated values.");
        if (icn == null) {
            icn = localStorage.getItem("ICN");
        }
        if (icn != null && icn.length > 0) {
            //var filter = "&select=*&$filter=crme_ICN eq '" + icn + "' and crme_SearchType eq 'SelectedPersonSearch'";
            //SDK.REST.retrieveMultipleRecords("crme_person", filter, personRetrieveCallbackLoc, function (error) { alert(error.message); }, function () { });
            var columns = "crme_patientid, crme_siteid"
            var filter = "$filter=";
            filter += buildQueryFilter("crme_icn", icn, false);
            filter += buildQueryFilter("crme_searchtype", "SelectedPersonSearch", true);

            CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("crme_persons", columns, filter).then(function (results) {
                console.log("crme_persons successfully retrieved:");
                personRetrieveCallbackLoc(results.value);
            }).catch(function (error) {
                console.log("Error retrieving record: " + error.message);
                console.log(error);
                handleMviError();
            });

        }
        console.log("going into selectedPersonLoc");
        return false;
    }

    function personRetrieveCallbackLoc(data) {

        //loop through results and populate global _siteIds array
        //_siteIds = [];

        for (var i = 0; i < data.length; i++) {
            var idObj = { patientid: data[i].crme_patientid, siteid: data[i].crme_siteid }
            if (data[i].crme_siteid.length == 3 && !isNaN(data[i].crme_siteid)) {
                //Add the Facility
                //_siteIds[_siteIds.length] = idObj;
                CommCare.ProgressNote.Constants.SiteIds[CommCare.ProgressNote.Constants.SiteIds.length] = idObj;
            }
        }
        populateLocGrid();
    }

    function populateLocGrid() {

        var PromiseArray = []
        //loop through the siteIDs and generate fetch for lookup filter
        for (var i = 0; i < CommCare.ProgressNote.Constants.SiteIds.length; ++i) {
            var facilityNumber = CommCare.ProgressNote.Constants.SiteIds[i].siteid;
            var facilityConcat = "";
            var phoneNumber = "";
            // retrieve the facility info from CRM
            if (facilityNumber != null && facilityNumber != '') {
                //var facilityInfoQuery = "bah_facilitySet?$select=*&$filter=bah_stationsuffix_text eq '" + facilityNumber + "'";
                //var facilityInfo = MakeRequest(facilityInfoQuery);

                var columns = "bah_name,bah_facilityid";
                var filter = "$filter=";
                filter += buildQueryFilter("bah_stationsuffix_text", facilityNumber, false);

                var promiseElement = CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("bah_facilities", columns, filter);
                PromiseArray.push(promiseElement);


                //CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("bah_facilities", columns, filter).then(function (results) {
                //    console.log("bah_facilities successfully retrieved for station suffix " + facilityNumber + ":");
                //    facilityInfo = results.value;
                //    // check for length
                //    if (facilityInfo != null && facilityInfo.length > 0) {
                //        for (var p = 0; p < facilityInfo.length; p++) {
                //            if (facilityInfo[p].bah_name != null && facilityInfo[p].bah_name != "") {
                //                var facilityName = facilityInfo[p].bah_name;
                //                var facilityId = facilityInfo[p].bah_facilityid;
                //                console.log(facilityName + " retrieved successfully");
                //                //$("#tableBody").append("<tr id='" + facilityId + "|" + facilityName + "' ondblclick='setFacility(this.id)'><td>" + facilityName + "</td></tr>");
                //                var fetchXml = "<filter type='or'>";
                //                fetchXml += "<condition attribute='bah_facilityid' operator='eq' value='" + facilityId + "' /></filter>"
                //                CommCare.Shared.FormContext.getControl("mcs_progressnotefacility").addPreSearch(function () {
                //                    setPreFilterForProgressNoteFacility("mcs_progressnotefacility", fetchXml);
                //                })
                //            }
                //        }
                //    }
                //}).catch(function (error) {
                //    console.log("Error retrieving record: " + error.message);
                //    console.log(error);
                //    handleMviError();
                //});
            }
        }
        Promise.all(PromiseArray).then(function (results) {
            var fetchXml = "<filter type='or'>";
            if (results != null && results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].value != null && results[i].value.length > 0) {
                        for (var j = 0; j < results[i].value.length; j++) {
                            fetchXml += "<condition attribute='bah_facilityid' operator='eq' value='" + results[i].value[j].bah_facilityid + "' />"
                        }
                    }
                }
            }

            fetchXml += "</filter>";
            CommCare.Shared.FormContext.getControl("mcs_progressnotefacility").addPreSearch(function () {
                setPreFilterForProgressNoteFacility("mcs_progressnotefacility", fetchXml);
            })
        });
    }

    function setPreFilterForProgressNoteFacility(field, fetchXml) {
        CommCare.Shared.FormContext.getControl(field).addCustomFilter(fetchXml);
    }

    function buildQueryFilter(field, value, and) {
        if (value == '') {
            if (and) {
                return " and " + field + " eq null";
            } else {
                return field + " eq null";
            }
        }
        else {
            if (and) {
                return " and " + field + " eq '" + value + "'";
            } else {
                return field + " eq '" + value + "'";
            }
        }
    }

    function setPatientFac() {
        var noteFac = CommCare.Shared.GetFieldValue("mcs_progressnotefacility");
        if (noteFac != null) {
            var facId = noteFac != null ? noteFac[0].id : null;
            var facNam = noteFac != null ? noteFac[0].name : null;
            CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_patientfacility", facId, facNam, "bah_facility")
        }
        else {
            CommCare.Shared.SetFieldValue("mcs_patientfacility", null);
        }

        
        CommCare.Shared.SetSubmitMode("mcs_patientfacility", "always");
    }

    function RefreshNotes() {
        console.log("*** RefreshNotes")
        var tabNotes = CommCare.Shared.FormContext.ui.tabs.get("Note");
        var dispState = tabNotes.getDisplayState();

        if (dispState == "expanded") {
            var webResourceControl = CommCare.Shared.FormContext.getControl("WebResource_CPRSNotesWorkloadResource");
            var src = webResourceControl.getSrc();
            if (src == "about:blank") src = "/%7b637113379540010334%7d/webresources/mcs_CPRSNotesWorkload.html";
            webResourceControl.setSrc("about:blank") //if this is null it won't set the source to nothing... it does nothing and retains its source therefore the setSrc does nothing

            setTimeout(function () {
                webResourceControl.setSrc(src);
            }, 500)
        }
    }

    // fires on change of ftp_callbacknumber
    function formatTelephoneNumber(pContext) {
        //pass to new formatTelephoneNumberNANP function, for formatting according to North American Numbering Plan
        if (!!pContext) {
            var changedAttribute = pContext.getEventSource();
            if (!!changedAttribute) {
                var notificationName = changedAttribute.getName() + "_FORMATTINGERROR";
                CommCare.Shared.FormContext.ui.clearFormNotification(notificationName);
                // Xrm.Page.ui.clearFormNotification(notificationName); //use form-level INFO notifications, so as not to block the save of the record
                var value = changedAttribute.getValue();
                if (!!value) {
                    var formattedValue = value;
                    try {
                        formattedValue = formatTelephoneNumberNANP(value);
                        changedAttribute.setValue(formattedValue);
                    }
                    catch (e) {
                        changedAttribute.setValue(formattedValue);
                        var message = "Error formatting value of " + CommCare.Shared.FormContext.getControl(changedAttribute.getName()).getLabel() + ": " + e.message;
                        CommCare.Shared.FormContext.ui.setFormNotification(message, "INFO", notificationName);
                    }
                }
            }
        }
    }
    
    function formatTelephoneNumberNANP(pValue) {
        var formattedValue = pValue;
        if (!!pValue) {
            try {
                var tempValue = pValue.toString().replace(/[^0-9A-Za-z]/g, "").toUpperCase();
                var leadingZerosWarning = "";
                while (tempValue[0] == "0") {
                    tempValue = tempValue.substr(1, 99);
                    leadingZerosWarning = ", or leading-zeros";
                }
                if (tempValue.length >= 10) {
                    var NAOffset = tempValue.length > 10 && tempValue[0] == "1" ? 1 : 0;
                    var countryCode = tempValue.substr(0, NAOffset);
                    var countryCodeString = countryCode != "" ? countryCode + "-" : "";
                    var areaCode = tempValue.substr(0 + NAOffset, 3);
                    if (areaCode[0] == "0" || areaCode[0] == "1") { throw new Error("Area code (first 3-digit segment of a 10-digit number) cannot start with '0' or '1'"); }
                    if (areaCode.length == 3) {
                        var centralOfficeCode = tempValue.substr(3 + NAOffset, 3);
                        if (centralOfficeCode[0] == "0" || centralOfficeCode[0] == "1") { throw new Error("Central office code (second 3-digit segment of a 10-digit number) cannot start with '0' or '1'"); }
                        if (centralOfficeCode[1] == "1" && centralOfficeCode[2] == "1") { throw new Error("Central office code (second 3-digit segment of a 10-digit number) cannot be in the format 'N11'"); }
                        if (centralOfficeCode.length == 3) {
                            var lineNumber = tempValue.substr(6 + NAOffset, 4);
                            if (lineNumber.length == 4) {
                                formattedValue = countryCodeString + [areaCode, centralOfficeCode, lineNumber].join("-");
                            }
                            else {
                                throw new Error(pValue + " is not a valid phone number");
                                //throw new Error(tempValue + " is not a valid phone number of at least 10 characters, not counting parentheses or dashes" + leadingZerosWarning);
                            }
                        }
                        else {
                            throw new Error(pValue + " is not a valid phone number");
                            //throw new Error(tempValue + " is not a valid phone number of at least 10 characters, not counting parentheses or dashes" + leadingZerosWarning);
                        }
                    }
                    else {
                        throw new Error(pValue + " is not a valid phone number");
                        //throw new Error(tempValue + " is not a valid phone number of at least 10 characters, not counting parentheses or dashes" + leadingZerosWarning);
                    }
                }
                else {
                    throw new Error(pValue + " is not a valid phone number");
                    //throw new Error(pValue + " is not a valid phone number of at least 10 characters, not counting parentheses or dashes" + leadingZerosWarning);
                }
            }
            catch (e) {
                console.error(e.message);
                throw e;
            }
        }
        return formattedValue;
    }

})();
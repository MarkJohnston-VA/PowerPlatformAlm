var mvi = {
    personSelected: function (id, name, ssn, dob, firstName, lastName) {
        console.log("personSelected");
        startTimer = performance.now();
        //console.log("utility namespace extended: " + !!Xrm.Utility.fireVeteranOnChange);
        var currentEntity = CommCare.Shared.FormContext.data.entity.getEntityName();
        var cleanID = id.replace("{", "").replace("}", "").toUpperCase();
        var veteran = [];
        veteran[0] = {};
        veteran[0].id = "{" + cleanID + "}";
        veteran[0].entityType = "contact";
        veteran[0].name = name;

        //.replace(/[{}]/g, "").toLowerCase();
        var previousVeteran = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_veteran"));
        var actionItemId = currentEntity == "mcs_tracker" ? CommCare.Shared.FormContext.data.entity.getId().replace(/[{}]/g, "").toLowerCase() : CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_actionitem"));
        var actionItemName = currentEntity == "mcs_tracker" ? CommCare.Shared.GetFieldValue("mcs_name") : CommCare.Shared.GetFieldValue("mcs_actionitem")[0].name;
        var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "").toLowerCase();

        CommCare.Shared.SetFieldValue("mcs_veteran", veteran);
        CommCare.Shared.SetFieldValue("mcs_icn", _icn);

        var requiredAttributes = [];
        CommCare.Shared.FormContext.data.entity.attributes.forEach(function (attribute, index) {
            if (attribute.getRequiredLevel() == "required") {
                requiredAttributes.push(attribute);
                attribute.setRequiredLevel("none");
            }
        });

        var MviTab = CommCare.Shared.FormContext.ui.tabs.get("MPIHTML");
        if (!!MviTab) MviTab.setVisible(false);

        CommCare.Shared.FormContext.data.save().then(() => {
            for (var i = 0; i < requiredAttributes.length; i++) {
                requiredAttributes[i].setRequiredLevel("required");
            }

            var SelectedPersonMetadata = this.getSelectedPersonMetadata(actionItemId, cleanID, previousVeteran, _icn);

            return Xrm.WebApi.online.execute(SelectedPersonMetadata);
        }).then((results) => {
            console.log("Execute Multiple Complete");
            if (results.ok) { return results.json(); }
            else { console.log("Response Not OK"); }
        }).then((response) => {
            console.log(response);
            console.log(response["ResponseMessage"]);
        }).catch(function (error) {
            $('div#tmpDialog').hide();
            console.log("Error saving record: " + error.message);
            console.log(error);
        });
    },

    getSelectedPersonMetadata: function (ActionItemId, VeteranId, PreviousVeteranId, icn) {
        var execute_mcs_AITSelectedPersonMasterAction_Request;

        if (!!PreviousVeteranId) {
            execute_mcs_AITSelectedPersonMasterAction_Request = {
                ActionItem: { "@odata.type": "Microsoft.Dynamics.CRM.mcs_tracker", mcs_trackerid: ActionItemId }, // mscrm.mcs_tracker
                Veteran: { "@odata.type": "Microsoft.Dynamics.CRM.contact", contactid: VeteranId }, // mscrm.contact
                PreviousVeteran: { "@odata.type": "Microsoft.Dynamics.CRM.contact", contactid: PreviousVeteranId }, // mscrm.contact
                ICN: icn, // Edm.String

                getMetadata: function () {
                    return {
                        boundParameter: null,
                        parameterTypes: {
                            ActionItem: { typeName: "mscrm.mcs_tracker", structuralProperty: 5 },
                            Veteran: { typeName: "mscrm.contact", structuralProperty: 5 },
                            PreviousVeteran: { typeName: "mscrm.contact", structuralProperty: 5 },
                            ICN: { typeName: "Edm.String", structuralProperty: 1 }
                        },
                        operationType: 0, operationName: "mcs_AITSelectedPersonMasterAction"
                    };
                }
            };
        }
        else {
            execute_mcs_AITSelectedPersonMasterAction_Request = {
                ActionItem: { "@odata.type": "Microsoft.Dynamics.CRM.mcs_tracker", mcs_trackerid: ActionItemId }, // mscrm.mcs_tracker
                Veteran: { "@odata.type": "Microsoft.Dynamics.CRM.contact", contactid: VeteranId }, // mscrm.contact
                ICN: icn, // Edm.String

                getMetadata: function () {
                    return {
                        boundParameter: null,
                        parameterTypes: {
                            ActionItem: { typeName: "mscrm.mcs_tracker", structuralProperty: 5 },
                            Veteran: { typeName: "mscrm.contact", structuralProperty: 5 },
                            PreviousVeteran: { typeName: "mscrm.contact", structuralProperty: 5 },
                            ICN: { typeName: "Edm.String", structuralProperty: 1 }
                        },
                        operationType: 0, operationName: "mcs_AITSelectedPersonMasterAction"
                    };
                }
            };
        }

        return execute_mcs_AITSelectedPersonMasterAction_Request;
    }
}

var lobLookupAtt;
var lobLookup;
var perfTimer;
var startTimer;
var endTimer;

function initiatePersonSearchUtils() {
    lobLookupAtt = CommCare.Shared.GetFieldValue("hrc_lobid");
    console.log(lobLookupAtt);
    lobLookup = null;
}

function writeToConsole(message) {
    if (typeof console != 'undefined') console.log(message);
}

function addDuplicateCheckBox(row, _contactId, index, isDuplicate, addcolumn) {
    if (addcolumn) {
        var column = document.createElement('td');
        var checkbox = document.createElement('input');

        column.className = 'duplicateCheck';
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('contactId', _contactId);
        checkbox.setAttribute('name', 'duplicateCheck' + index);
        checkbox.addEventListener('click', checkAllDuplicateCheckBoxes);

        if (isDuplicate) {
            checkbox.checked = true;
            checkbox.disabled = true;
        }

        column.appendChild(checkbox);
        row.appendChild(column);
    }
}

function addApplyFlagButton(row, columncount, addcolumn) {
    if (addcolumn) {
        var column = document.createElement('td');
        var button = document.createElement('button');

        column.setAttribute('colSpan', columncount);
        button.appendChild(document.createTextNode('Flag Duplicate Records'));
        button.setAttribute('id', 'applyDuplicatesBtn');
        button.addEventListener('click', applyDuplicateFlags);
        column.appendChild(button);
        row.appendChild(column);
    }
}

function checkAllDuplicateCheckBoxes() {
    var table = document.getElementById('possibleResultsTable');
    var button = document.getElementById('applyDuplicatesBtn');
    //var rows = table.getElementsByTagName('tr');
    var rows = table.getElementsByClassName('resultRow')
    var checkbox, disabled, checked;
    var disableButton = true;

    for (i = 0; i < rows.length; i++) {

        checkbox = rows[i].getElementsByTagName('input');
        disabled = checkbox[0].disabled;
        checked = checkbox[0].checked;

        if (checked && !disabled) {
            disableButton = false;
            break;
        }
    }

    button.disabled = disableButton;
}

function applyDuplicateFlags() {
    var table = document.getElementById('possibleResultsTable');
    //var rows = table.getElementsByTagName('tr');
    var rows = table.getElementsByClassName('resultRow');
    var button = document.getElementById('applyDuplicatesBtn');

    var column, checkbox, disabled, checked;
    var guid, data;

    for (i = 0; i < rows.length; i++) {

        column = rows[i].getElementsByClassName('duplicateCheck');
        checkbox = column[0].getElementsByTagName('input');
        disabled = checkbox[0].disabled;
        checked = checkbox[0].checked;

        if (!disabled && checked) {

            guid = checkbox[0].getAttribute('contactId');
            data = { 'new_duplicateofanothercustomer': true };
            Xrm.WebApi.updateRecord('contact', guid, data).then(function (results) {
                console.log('Success applying duplicate flag to customer record: ' + results.id);
            }).catch(function (error) {
                console.log('Error retrieving applying duplicate flag tocustomer record');
                console.log(error);
                alert(error.message);
            });
        }

        if (checked && !disabled) {
            column[0].appendChild(document.createTextNode('flagged'));
        }

        checkbox[0].disabled = true;
    }

    button.disabled = true;
}

function addRowAttribute(row, attributename, attributevalue, addcolumn) {
    if (addcolumn) {
        var column = document.createElement('td');
        column.setAttribute('style', 'padding: 0 0.5em;');
        column.appendChild(document.createTextNode(attributevalue));
        row.appendChild(column);
    }
    row.setAttribute(attributename, attributevalue);
}


function addHeaderColumn(row, colname) {

    var th = document.createElement('th');
    th.setAttribute('style', 'padding: 0 0.5em;');
    th.appendChild(document.createTextNode(colname));
    row.appendChild(th);
}

function formatDatePart(datepart) {
    return datepart.length == 1 ? "0" + datepart : datepart;
}

function buildQueryFilter(field, value, and) {
    // remove unwanted characters 
    var arr1 = ["'", "\""];
    for (a = 0; a < arr1.length; a++) {
        if (value.indexOf(arr1[a]))
            value = value.replace(arr1[a], " ");
    }

    if (and) {
        return " and " + field + " eq '" + value + "'";
    } else {
        return field + " eq '" + value + "'";
    }
}

function validateDateOfBirth(dobyear, dobmonth, dobday) {
    if ((dobyear == "" || dobyear == "YYYY") && (dobmonth == "" || dobmonth == "MM") && (dobday == "" || dobday == "DD")) {
        return true;
    }
    if (dobyear != "YYYY" || dobmonth != "MM" || dobday != "DD") {
        if ((dobyear != "" && isNumeric(dobyear) == false) || (dobmonth != "" && isNumeric(dobmonth) == false) || (dobday != "" && isNumeric(dobday) == false)) {
            return false;
        }
    }
    if (dobyear.length != 4) {
        return false;
    }
    if (dobyear >= (new Date).getFullYear() + 1) {
        return false;
    }
    if (dobyear < (new Date).getFullYear() - 200) {
        return false;
    }
    if (dobmonth < 1 || dobmonth > 12) {
        return false;
    }
    if (dobday < 1 || dobday > 31) {
        return false;
    }
    return true;
}

function isNumeric(value) {
    return !isNaN(parseFloat(value) && isFinite(value));
}

function formatName(data) {
    var firstName = data.crme_firstname != null ? data.crme_firstname : "";
    var middleName = data.crme_middlename != null ? data.crme_middlename : "";
    var lastName = data.crme_lastname != null ? data.crme_lastname : "";

    var fullName = lastName != "" ? lastName : "";
    fullName += firstName != "" && lastName != "" ? ", " + firstName : "";
    fullName += middleName != "" && firstName != "" && lastName != "" ? " " + middleName : "";

    return fullName;
}

function formatAddress(data) {
    if (data.crme_fulladdress != null) {
        return data.crme_fulladdress;
    }
    if (data.crme_stateprovinceid != null && data.crme_zippostalcodeid != null) {
        var street = data.crme_address1 != null ? data.crme_address1 : "";
        var city = data.crme_city != null ? data.crme_city : "";
        var state = data.crme_stateprovinceid.name != null ? data.crme_stateprovinceid.name : "";
        var zip = data.crme_zippostalcodeid.name != null ? data.crme_zippostalcodeid.name : "";

        return street + " " + city + " " + state + " " + zip;
    }
    return "";
}

function clearField(obj) {
    if (obj.defaultValue == obj.value) obj.value = '';
}

function retrieveMultipleSync(odataSetName, select, filter) {
    console.log("retrieveMultipleSync");
    // Get Server URL
    var serverUrl = Xrm.Utility.getGlobalContext().getClientUrl();
    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";
    var odataUri = serverUrl + ODATA_ENDPOINT + "/" + odataSetName + "?";
    if (select) {
        odataUri += "$select=" + select;
    }
    if (filter) {
        odataUri += "&" + "$filter=" + filter;
    }
    var service = getRequestObject();
    if (service != null) {
        service.open("GET", odataUri, false);
        service.setRequestHeader("X-Requested-Width", "XMLHttpRequest");
        service.setRequestHeader("Accept", "application/json,text/javascript, */*");
        service.send(null);
        var requestResults = JSON.parse(service.responseText).d;
        return requestResults;
    }
}

function getRequestObject() {
    if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest;
    }
    else {
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
        }
        catch (ex) {
            return null;
        }
    }
}

function formatExecutingSearch() {

    $('div#tmpDialog').show();
    $("#validationFailedDiv").hide();
    $("#resultsFieldSetDiv").hide();
    $("#notFoundDiv").hide();
    $("#possibleResultsDiv").hide();
    $("#createDiv").hide();
    $("#searchResultsMessageDiv").hide();
    $("#SearchByNameButton").attr('disabled', true);
    $("#SearchByAddButton").attr('disabled', true);
    $("#SearchByIdentifierButton").attr('disabled', true);
    $("#mviDownCreateRow").hide();
    $("#last4CreateRow").hide();
    $("#createAttributesTable").hide();
    $("#createLastNameTextBox").val("");
    $("#createFirstNameTextBox").val("");
    $("#householdResultsFieldSetDiv").hide();
    $("#createBeneficiaryDiv").hide();
    $("#mviDownCreateBeneficiaryRow").hide();
    $("#householdNotFoundDiv").hide();
}

function formatValidationFailed() {
    $("#validationFailedDiv").show();
    $("#notFoundDiv").hide();
    $("#possibleResultsDiv").hide();
    $("#createDiv").hide();
    $("#resultsFieldSetDiv").hide();
    $("#searchResultsMessageDiv").hide();
    $("#personSearchResultsTable").find("thead, tr, th").remove();
    $("#personSearchResultsTable").find("tr:gt(0)").remove();
    $("#mviDownCreateRow").hide();
    $("#last4CreateRow").hide();
    $("#createAttributesTable").hide();
    $("#createLastNameTextBox").val("");
    $("#createFirstNameTextBox").val("");
    $("#householdResultsFieldSetDiv").hide();

    //scrollIframe("#validationFailedDiv");
}

function scrollIframe(elementid) {
    $(elementid).append('<p id="scrollanchorgraph"><a id="scrollanchor" name="scrollanchor" href=""></a></p>');
    //set the focus (effectively scroll to it)
    $("#scrollanchor").focus();
    //remove the anchor we used for scrolling
    $('#scrollanchorgraph').remove();
}

function personSearchComplete() {
    $('div#tmpDialog').hide();
    $("#SearchByNameButton").attr('disabled', false);
    $("#SearchByAddButton").attr('disabled', false);
    $("#SearchByIdentifierButton").attr('disabled', false);
}

function resetVeteranFields() {

    var veteranField = CommCare.Shared.GetFieldValue("bah_veteranid");
    var veteranFieldCtrl = CommCare.Shared.FormContext.ui.controls.get("bah_veteranid");
    if (veteranField !== null) {
        veteranFieldCtrl.setDisabled(false);
        veteranFieldCtrl.setDisabled(true);
    }

    CommCare.Shared.SetFieldValue("bah_veteranid", null);
    CommCare.Shared.FormContext.getAttribute("bah_veteranid").setSubmitMode("always");
    CommCare.Shared.FormContext.getAttribute("bah_ssn_text").setValue(null);
    CommCare.Shared.FormContext.getAttribute("bah_dob_date").setValue(null);
    console.log("end of resetVeteranFields");
}

function edipiSearchCallBack(data) {
    searchCallBack(data);
    //   searchCallBackWithStations(data, true);
}

function traitsSearchCallBack(data) {
    searchCallBack(data);
    //   searchCallBackWithStations(data, false);
}

function determinisiticSearchCallBack(data) {
    searchCallBack(data, false);
}

function showResultsMessageDiv(resultsMessage) {
    $("#resultsFieldSetDiv").show();
    $("#searchResultsMessageDiv").show();
    $("#searchResultsMessageDiv").text(resultsMessage);
}

function showNotFoundDiv(notFoundLabel) {
    $("#noResultsLabel").text(notFoundLabel);
    $("#notFoundDiv").show();
}

// callback from initial call to MVI  plugin
function searchCallBack(returnData, isAttended) {
    lobLookupAtt = CommCare.Shared.FormContext.getAttribute("hrc_lobid");

    if (lobLookupAtt != null)
        lobLookup = lobLookupAtt.getValue();

    if (isAttended === undefined)
        isAttended = true;

    var table = $("#personSearchResultsTable");

    $("#personSearchResultsTable").find("thead, tr, th").remove();
    $("#personSearchResultsTable").find("tr:gt(0)").remove();
    $("#resultsFieldSetDiv").hide();

    var ctidob = null;
    if (CommCare.Shared.FormContext.getAttribute("vhacrm_ctidob") != null) {
        ctidob = CommCare.Shared.GetFieldValue("vhacrm_ctidob");
    }

    var ctissn = null;
    if (CommCare.Shared.FormContext.getAttribute("vhacrm_ctiidentifier") != null) {
        ctissn = CommCare.Shared.GetFieldValue("vhacrm_ctiidentifier");
    }

    if ((ctidob != null) && (ctissn != null)) {
        console.log("*** CTI SSN and DOB not null");
        var householddata = CommCare.Shared.GetFieldValue("mcs_householddatalarge");
        if (householddata != null) {
            console.log("*** CTI HH data is not null");
            response = JSON.parse(householddata);
            CommCare.Shared.SetFieldValue("mcs_householddatalarge", "");
        }
        else {
            response = null;
        }
    }

    if (returnData != null && returnData.value != null && returnData.value.length > 0) {

        // check for exceptions 1st
        if (returnData.value[0].crme_ExceptionOccured) {
            showResultsMessageDiv(returnData.value[0].crme_ExceptionMessage);
            showNotFoundDiv("Error searching in MVI");
            return;
        }

        var thead = document.createElement('thead');
        var theadRow = document.createElement('tr');

        addHeaderColumn(theadRow, 'Name');
        addHeaderColumn(theadRow, 'SSN');
        addHeaderColumn(theadRow, 'EDIPI');
        addHeaderColumn(theadRow, 'Date of Birth');
        addHeaderColumn(theadRow, 'Deceased Date');
        addHeaderColumn(theadRow, 'Br. of Svc');
        addHeaderColumn(theadRow, 'Phone No');
        addHeaderColumn(theadRow, 'Address');
        addHeaderColumn(theadRow, 'Source');
        thead.appendChild(theadRow);
        table.append(thead);

        for (var i = 0; i < returnData.value.length; i++) {

            var fullName = formatName(returnData.value[i]);
            if (fullName.trim() == "") {
                showResultsMessageDiv("No records found. Verify the search criteria, enter additional search criteria, or search for a record in CRM using the button below.");
                showNotFoundDiv("No Records Found");
                if (isAttended)
                    scrollIframe("#notFoundDiv");
                return;
            }

            var recordSource = returnData.value[i].crme_recordsource == null ? "" : returnData.value[i].crme_recordsource;
            var patientMviIdentifier = returnData.value[i].crme_patientmviidentifier == null ? "" : returnData.value[i].crme_patientmviidentifier;
            var icn = returnData.value[i].crme_icn == null ? "" : returnData.value[i].crme_icn;

            var edipi = returnData.value[i].crme_edipi == null ? "" : returnData.value[i].crme_edipi;

            var ssn = returnData.value[i].crme_ssn == null ? "" : returnData.value[i].crme_ssn;
            var gender = returnData.value[i].crme_gender == null ? "" : returnData.value[i].crme_gender;
            var deceasedDate = returnData.value[i].crme_deceaseddate == null ? "" : returnData.value[i].crme_deceaseddate;
            var branchOfService = returnData.value[i].crme_branchofservice == null ? "" : returnData.value[i].crme_branchofservice;

            var dateOfBirth = returnData.value[i].crme_dobstring == null ? "" : returnData.value[i].crme_dobstring;
            var formattedDate;
            if ((dateOfBirth != null) && (dateOfBirth.indexOf('/') != -1) && (dateOfBirth.indexOf('-') != -1)) {
                var d1 = ParseYYYYMMDD(dateOfBirth);
                formattedDate = getFormattedDate(d1);
            }

            var pobc = returnData.value[i].crme_pobc == null ? "" : returnData.value[i].crme_pobc;
            var pobs = returnData.value[i].crme_pobs == null ? "" : returnData.value[i].crme_pobs;
            var mmn = returnData.value[i].crme_mmn == null ? "" : returnData.value[i].crme_mmn;

            var firstName = returnData.value[i].crme_firstname == null ? "" : returnData.value[i].crme_firstname;
            var middleName = returnData.value[i].crme_middlename == null ? "" : returnData.value[i].crme_middlename;
            var lastName = returnData.value[i].crme_lastname == null ? "" : returnData.value[i].crme_lastname;
            var alias = returnData.value[i].crme_alias == null ? "" : returnData.value[i].crme_alias;

            var fulladdress = formatAddress(returnData.value[i]);
            var address1 = returnData.value[i].crme_address1 == null ? "" : returnData.value[i].crme_address1;
            var address2 = returnData.value[i].crme_address2 == null ? "" : returnData.value[i].crme_address2;
            var city = returnData.value[i].crme_city == null ? "" : returnData.value[i].crme_city;
            var state = returnData.value[i].crme_stateprovinceid == null ? "" : returnData.value[i].crme_stateprovinceid.Name;
            var zip = returnData.value[i].crme_zippostalcodeid == null ? "" : returnData.value[i].crme_zippostalcodeid.Name;
            var phoneNumber = returnData.value[i].crme_primaryphone == null ? "" : returnData.value[i].crme_primaryphone;
            var email = returnData.value[i].crme_email == null ? "" : returnData.value[i].crme_email;

            var classcode = returnData.value[i].crme_classcode == null ? "" : returnData.value[i].crme_classcode;
            var identityTheft = returnData.value[i].crme_identitytheft == null ? "" : returnData.value[i].crme_identitytheft;
            var vetSensLevel = returnData.value[i].crme_veteransensitivitylevel == null ? "" : returnData.value[i].crme_veteransensitivitylevel;
            var arrVetSensLevel = vetSensLevel.split(":");
            var isSensitive = arrVetSensLevel[0];
            var isVeteran = arrVetSensLevel[1];
            var participantId = returnData.value[i].crme_patientmviidentifier == null ? "" : returnData.value[i].crme_patientmviidentifier;
            var rawValueFromMVI = returnData.value[i].crme_rawvaluefrommvi == null ? "" : returnData.value[i].crme_rawvaluefrommvi;
            _siteId = returnData.value[i].crme_siteid == null ? "" : returnData.value[i].crme_siteid;
            _patientId = returnData.value[i].crme_patientid == null ? "" : returnData.value[i].crme_patientid; // This is Patient's "DFN"

            // Table rows
            var row = document.createElement('tr');
            addRowAttribute(row, 'fullName', fullName, true);
            addRowAttribute(row, 'ssn', ssn, true);
            addRowAttribute(row, 'edipi', edipi, true);
            addRowAttribute(row, 'dateofbirth', dateOfBirth, true);
            addRowAttribute(row, 'deceasedDate', deceasedDate, true);
            addRowAttribute(row, 'branchOfService', branchOfService, true);
            addRowAttribute(row, 'phoneNumber', phoneNumber, true);
            addRowAttribute(row, 'fulladdress', fulladdress, true);
            addRowAttribute(row, 'recordSource', recordSource, true);

            addRowAttribute(row, 'firstName', firstName, false);
            addRowAttribute(row, 'lastName', lastName, false);
            addRowAttribute(row, 'patientMviIdentifier', patientMviIdentifier, false);
            addRowAttribute(row, 'gender', gender, false);
            addRowAttribute(row, 'pobc', pobc, false);
            addRowAttribute(row, 'pobs', pobs, false);
            addRowAttribute(row, 'mmn', mmn, false);
            addRowAttribute(row, 'middleName', middleName, false);
            addRowAttribute(row, 'alias', alias, false);
            addRowAttribute(row, 'address1', address1, false);
            addRowAttribute(row, 'address2', address2, false);
            addRowAttribute(row, 'city', city, false);
            addRowAttribute(row, 'state', state, false);
            addRowAttribute(row, 'zip', zip, false);
            addRowAttribute(row, 'email', email, false);
            addRowAttribute(row, 'classcode', classcode, false);
            addRowAttribute(row, 'icn', icn, false);
            addRowAttribute(row, 'vetSensLevel', vetSensLevel, false);
            addRowAttribute(row, 'participantId', participantId, false);
            addRowAttribute(row, 'siteId', _siteId, false);
            addRowAttribute(row, 'patientId', _patientId, false);
            addRowAttribute(row, 'rawValueFromMVI', rawValueFromMVI, false);

            row.className = (i % 2 == 0) ? "even" : "odd";

            row.ondblclick = function () { checkForSensitive(this); };
            row.onkeydown = function (e) {
                if (e.keyCode === 13 || e.keyCode === 32) {
                    checkForSensitive(this);
                }
            };
            row.tabIndex = 100 + i;
            table.append(row);

            $("#resultsFieldSetDiv").show();
            if (i == 0) {
                //row.focus = true;
                //row.focus();
            }
        }

        ///Only show the Create Div if the form is not OCCFM as this is create for "Veteran" not Bene
        if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
            //$("#createBeneficiaryDiv").show();
            //$("#mviDownCreateBeneficiaryRow").show();
            ////$("#mviDownCreateRow").show();
            //if (isAttended)
            //    scrollIframe("#createBeneficiaryDiv");
        }
        else {
            $("#createDiv").show();
            $("#mviDownCreateRow").show();
            if (isAttended)
                scrollIframe("#createDiv");
        }

        //$("#personSearchResultsTable tr:first").focus();
        if (isAttended) {
            table.find("tr:first").focus();
        }
        //$("#resultsFieldSetDiv").remove('#anchorgraph');
        if (_lastSearchType == "EDIPI") {
            $("#createAttributesTable").show();
        }
    }
    else {
        console.log("*** Response is null");
        showNotFoundDiv("No Records Found");
        if (isAttended)
            scrollIframe("#notFoundDiv");
    }

    var resultsAppend = "";
    if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
        $("#searchResultsHeader").text("Section 2 - Search Results");

        if (!isAttended)
            resultsAppend = " Double click the correct record in the grid below to proceed. If the correct record is not listed, verify the search criteria or enter additional search criteria and try your search again.";
        else
            resultsAppend = " Double click the correct record in the grid to proceed with Household search. If the correct record is not listed, verify the search criteria or enter additional search criteria and try your search again.";
    }
    else
        resultsAppend = " Double click the correct Veteran in the grid to proceed. If the correct Veteran is not listed, verify the search criteria, enter additional search criteria, or select the Create New Veteran button below.";

    var hasError = false;
    if (returnData != null && returnData.value != null && returnData.value.length > 0) {
        if ((returnData.value[0].crme_returnmessage != null && returnData.value[0].crme_returnmessage.indexOf("Your search in MVI found")) != -1 || ((returnData.value[0].crme_returnmessage == null) || (returnData.value[0].crme_returnmessage == ""))) {
            hasError = false;
        }
        else {
            hasError = true;
        }
    }
    else {
        hasError = true;
    }

    showResultsMessageDiv(!hasError ? resultsAppend : "No records found. Verify the search criteria, enter additional search criteria, or search for a record in CRM using the button below.");
}


function handleMviError() {
    $('div#tmpDialog').hide();
    showNotFoundDiv("Error Contacting MVI");
    showResultsMessageDiv("There was a problem searching MVI.");
}

// user double clicked on Veteran - check to see if Sensitive.
function checkForSensitive(obj) {
    startTimer = performance.now();
    var patientMviIdentifier = obj.getAttribute("patientMviIdentifier");
    var vetSensLevel = obj.getAttribute("vetSensLevel") == null ? "" : obj.getAttribute("vetSensLevel");
    var arrVetSensLevel = vetSensLevel.split(":");
    var patientIsSensetive = arrVetSensLevel[0];
    var veteranRecord = FindVeteranByMVI(patientMviIdentifier);
    var alreadySearchRecord = false;
    if (veteranRecord != null) {
        if ((veteranRecord.isSensitive) && (veteranRecord.ClickedContinue))
            alreadySearchRecord = true;

    }

    CommCare.Shared.FormContext.data.save().then(() => {
        if ((obj.getAttribute("vetSensLevel").substring(0, 4) == "true") && (!alreadySearchRecord)) {
            var interaction = CommCare.Shared.FormContext.data.entity.getId();

            handleSensitiveVet(interaction, obj); // set up global vars for sensitive vet & display warning (function is on VeteranAlerts.js) 

        }
        else {
            openSelectedPerson(obj); // proceed w/ opening person 
            perfTimer = performance.now();
            endTimer = perfTimer - startTimer;
            console.log("Check for Sensitive: " + endTimer.toString() + " milliseconds");
        }
    });
}

function openSelectedPerson(obj) {
    //set global selected person object for use later
    _selectedPersonObj = obj;
    var participantId = obj.getAttribute('participantId');

    if (participantId.indexOf("^") > 1) {
        var idparts = participantId.split("^");
        if (idparts.length > 0) {
            _icn = idparts[0];
        }

        $('div#tmpDialog').show();

        var fieldsSelected = "*";
        var filter = "$filter=crme_icn eq '" + _icn + "' and crme_searchtype eq 'SelectedPersonSearch'";
        //debugger;
        CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("crme_persons", fieldsSelected.toLowerCase(), filter).then(function (results) {
            console.log("Success retrieving Person with results:");
            //selectedPersonCallBack(results.value);
            personRetrieveCallback(results.value);
        }).catch(function (error) {
            console.log("Error retrieving Person from MVI");
            console.log(error);
            alert(error.message);
        });
    }

    return false;
}

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}

function buildPersonSearchResultsTableFromHACDeterministic(mviResultsList) {
    ///TODO: Get and Build personSearchResultsTable from returned Deterministic Search results
    var returnData = [];

    // Added value as this is Web API structure
    returnData.value = [];
    for (var i = 0; i < mviResultsList.length; i++) {

        var person = {};
        person.crme_firstname = mviResultsList[i].hac_MVIPerson_FirstName;
        person.crme_middlename = mviResultsList[i].hac_MVIPerson_MiddleName;
        person.crme_lastname = mviResultsList[i].hac_MVIPerson_LastName;
        person.crme_recordsource = mviResultsList[i].hac_RecordSource;
        // person.crme_PatientMviIdentifier = mviResultsList[i].hac_RecordSource;
        person.crme_gender = mviResultsList[i].hac_MVIPerson_Gender;
        person.crme_deceaseddate = mviResultsList[i].hac_MVIPerson_DeceasedDate;
        person.crme_dobstring = mviResultsList[i].hac_MVIPerson_DateOfBirth;

        person.crme_ssn = mviResultsList[i].hac_MVIPerson_SSN;
        person.crme_participantid = mviResultsList[i].hac_MVIPerson_ParticipantId;
        person.crme_patientmviidentifier = mviResultsList[i].hac_MVIPerson_PatientMviIdentifier;
        person.crme_rawvaluefrommvi = mviResultsList[i].hac_MVIPerson_RawValueFromMVI;
        person.crme_fulladdress = mviResultsList[i].hac_MVIPerson_FullAddress;
        person.crme_alias = mviResultsList[i].hac_MVIPerson_Alias;
        person.crme_returnmessage = mviResultsList[i].hac_ReturnMessage;
        returnData.value.push(person);
    }

    searchCallBack(returnData);
}

function buildPersonSearchResultsTableFromHACDeterministicFetch(mviResultsList) {
    ///TODO: Get and Build personSearchResultsTable from returned Deterministic Search results
    var returnData = [];

    // Added value as this is Web API structure
    returnData.value = [];
    for (var i = 0; i < mviResultsList.length; i++) {

        var person = {};
        person.crme_firstname = mviResultsList[i].hac_mviperson_firstname;
        person.crme_middlename = mviResultsList[i].hac_mviperson_middlename;
        person.crme_lastname = mviResultsList[i].hac_mviperson_lastname;
        person.crme_recordsource = mviResultsList[i].hac_recordsource;
        // person.crme_PatientMviIdentifier = mviResultsList[i].hac_RecordSource;
        person.crme_gender = mviResultsList[i].hac_gender;
        person.crme_deceaseddate = mviResultsList[i].hac_deceaseddate;
        person.crme_dobstring = mviResultsList[i].hac_dobstring;

        person.crme_ssn = mviResultsList[i].hac_mviperson_ssn;
        person.crme_participantid = mviResultsList[i].hac_mviperson_participantid;
        person.crme_patientmviidentifier = mviResultsList[i].hac_mviperson_patientmviidentifier;
        person.crme_rawvaluefrommvi = mviResultsList[i].hac_mviperson_rawvaluefrommvi;
        person.crme_fulladdress = mviResultsList[i].hac_fulladdress;
        person.crme_alias = mviResultsList[i].hac_alias;
        person.crme_returnmessage = mviResultsList[i].hac_returnmessage;
        returnData.value.push(person);
    }

    searchCallBack(returnData);
}

function ParseYYYYMMDD(str) {
    var y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
    return new Date(y + "-" + m + "-" + d + " 00:00");
}

function showHousholdResultsMessageDiv(resultsMessage) {
    //$("#resultsFieldSetDiv").show();
    $("#householdSearchResultsMessageDiv").show();
    $("#householdSearchResultsMessageDiv").text(resultsMessage);
}

function hideHousholdResultsMessageDiv() {
    //$("#resultsFieldSetDiv").show();
    $("#householdSearchResultsMessageDiv").hide();
}

function showHouseholdNotFound(text) {
    ///Show the not found stuff
    $("#householdNoResultsLabel").text(text);
    $("#householdNotFoundDiv").show();
    //$("#houseoldSearchCrmButton").hide();
    $("#notFoundDiv").show();
}

//function openSelectedBeneficiary(obj) {
//    // Determine if we are clicking on sponsor for FMP call. If so, ignore double click
//    var progTypeLookup = CommCare.Shared.GetFieldValue("bah_programtypeid");
//    var ProgTypeName = progTypeLookup != null ? CommCare.Shared.DialogNameReturn(progTypeLookup[0].name) : null;

//    var _selectedPersonObj = obj;
//    var persontype = _selectedPersonObj.getAttribute('persontype');

//    //if ((ProgTypeName != "FMP") && (persontype == "sponsor")) {
//    //    showResultsMessageDiv("Only a beneficiary can be selected for this program type.");
//    //}

//    if ((ProgTypeName == "FMP") && (persontype == "beneficiary")) {
//        showResultsMessageDiv("Only a sponsor can be selected when program type is FMP.");
//    }

//    //if ((ProgTypeName == "FMP" && persontype == "sponsor") || (ProgTypeName != "FMP" && persontype == "beneficiary")) {

//    hideHousholdResultsMessageDiv();
//    $('div#tmpDialog').show();

//    var personalIdentifier = _selectedPersonObj.getAttribute('ssn');
//    ///TODO: Put in order by on created date

//    var filter = "$filter=";
//    filter += "bah_ssn_text eq '" + personalIdentifier + "'";
//    var orderby = "&$orderby=createdon desc";

//    var columns = "contactid,createdon";

//    CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("contacts", columns, filter).then(function (results) {
//        console.log("contacts successfully retrieved:");
//        openSelectedBeneficiaryCallBack(results.value, _selectedPersonObj);
//    }).catch(function (error) {
//        console.log("Error retrieving record: " + error.message);
//        console.log(error);
//        showResultsMessageDiv("An error occurred opening the selected beneficiary. If the error persists please contact your administrator.");
//        $('div#tmpDialog').hide();
//    });

//    //showResultsMessageDiv("Opening selected Beneficiary...");
//    // go back to MVI to get Correlations for selected person:

//    //SDK.REST.retrieveMultipleRecords("Contact", filter, function (response) { openSelectedBeneficiaryCallBack(response, _selectedPersonObj) }, function (error) {
//    //    showResultsMessageDiv("An error occurred opening the selected beneficiary. If the error persists please contact your administrator.");
//    //    console.log(error);
//    //    $('div#tmpDialog').hide();
//    //}, function () { });
//    //}
//}

//function openSelectedBeneficiaryCallBack(response, selectedPersonObj) {
//    //showResultsMessageDiv("");
//    if (response != null && response.length > 0) {
//        ///We found a match, update the existing record with current results
//        ///and use it to set Veteran Lookup and initiate the process

//        //$('div#tmpDialog').hide();
//        var currentEntity = CommCare.Shared.FormContext.data.entity.getEntityName();

//        if (currentEntity === "bah_interactions") {
//            SetFocusToTab("request_create_tab");
//        }

//        var fullName = selectedPersonObj.getAttribute('fullName');
//        var prefix = selectedPersonObj.getAttribute('prefix');
//        var firstName = selectedPersonObj.getAttribute('firstName');
//        var middleName = selectedPersonObj.getAttribute('middleName');
//        var lastName = selectedPersonObj.getAttribute('lastName');
//        var suffix = selectedPersonObj.getAttribute('suffix');

//        /*/
//        var firstName = "";
//        var middleInitial = "";
//        var lastName = "";

//        var fullNameArray = fullName.split(" ");

//        if (fullNameArray.length == 2) {
//            firstName = fullNameArray[0];
//            lastName = fullNameArray[1];
//        }
//        else if (fullNameArray.length == 1) {
//            lastName = fullNameArray[0];
//        }
//        else if (fullNameArray.length == 3) {
//            firstName = fullNameArray[0];
//            middleInitial = fullNameArray[1];
//            lastName = fullNameArray[2];
//        }
//        else
//            lastName = fullName;
//        //*/

//        // Set Survey Email Address from Contact
//        var lob = CommCare.Shared.GetFieldValue("hrc_lobid");
//        var lobName = lob != null ? CommCare.Shared.DialogNameReturn(lob[0].name) : null;

//        if (lobName == "Customer Experience") {
//            var intWith;
//            if (CommCare.Shared.FormContext.data.entity.attributes.get("bah_interactedwith_code") != null) {
//                intWith = CommCare.Shared.FormContext.data.entity.attributes.get("bah_interactedwith_code").getSelectedOption().text;
//            }
//            var callerFirstName;
//            if (CommCare.Shared.FormContext.data.entity.attributes.get("bah_firstname_text") != null) {
//                var checkFnameValue = CommCare.Shared.FormContext.data.entity.attributes.get("bah_firstname_text").getValue();
//                if (checkFnameValue != null)
//                    callerFirstName = checkFnameValue;
//            }

//            var callerLastName;
//            if (CommCare.Shared.FormContext.data.entity.attributes.get("bah_lastname_text") != null) {
//                var checkLnameValue = CommCare.Shared.FormContext.data.entity.attributes.get("bah_lastname_text").getValue();
//                if (checkLnameValue != null)
//                    callerLastName = checkLnameValue;
//            }

//            if (callerFirstName != null && callerLastName != null && intWith != null) {
//                if (callerFirstName.toUpperCase() == firstName.toUpperCase() && callerLastName.toUpperCase() == lastName.toUpperCase()) {
//                    if (intWith == "Veteran") {
//                        CommCare.Shared.SetFieldValue("mcs_surveyemailaddress", response[0].emailaddress1);

//                        var lookupValue = new Array();
//                        lookupValue[0] = new Object();
//                        lookupValue[0].id = response[0].contactid;
//                        //lookupValue[0].name = "";
//                        lookupValue[0].entityType = "contact";

//                        if (CommCare.Shared.GetFieldValue("mcs_surveycustomer") != null) {
//                            CommCare.Shared.SetFieldValue("mcs_surveycustomer", lookupValue);
//                            //CommCare.Shared.SetFieldValue("mcs_surveycustomer", response[0].ContactId);
//                        }
//                    }
//                }
//            }
//        }

//        var ssn = selectedPersonObj.getAttribute('ssn');
//        var dob = selectedPersonObj.getAttribute('dateofbirth');
//        //var dobSplit = dob.split("/");
//        //if (dobSplit.length = 3) {
//        //    dob = new Date(dobSplit[2], Number(dobSplit[0]) - 1, dobSplit[1]);
//        //}

//        var contact = {};
//        contact.hac_prefix = prefix;
//        contact.firstname = firstName;
//        //contact.middlename = middleInitial;
//        contact.middlename = middleName;
//        contact.lastname = lastName;
//        contact.hac_suffix = suffix;
//        contact.bah_ssn_text = selectedPersonObj.getAttribute('ssn');
//        contact.hac_dfn = selectedPersonObj.getAttribute('dfn');
//        contact.hac_bfn = selectedPersonObj.getAttribute('bfn');

//        var progTypeLookup = CommCare.Shared.GetFieldValue("bah_programtypeid");
//        var ProgTypeName = progTypeLookup != null ? CommCare.Shared.DialogNameReturn(progTypeLookup[0].name) : null;

//        if (ProgTypeName == "FMP") {
//            contact.mcs_fmp = true;
//        }
//        else {
//            contact.mcs_fmp = false;
//        }

//        CommCare.Shared.CrmCommonJS.WebApi.UpdateRecord(response[0].contactid, "contacts", contact).then(function (results) {
//            console.log("update of contact with id " + response[0].contactid + " complete");
//            mvi.personSelected(response[0].contactid, fullName, ssn, dob, firstName, lastName);
//        }).catch(function (error) {
//            alert(error.message);
//        });
//    }
//    else {
//        ///We didn't find a matching contact in CRM, so Create it
//        ///Only setting these fields : FirstName, LastName, DFN, BFN, MiddleName, SSN

//        var fullName = selectedPersonObj.getAttribute('fullName');
//        var prefix = selectedPersonObj.getAttribute('prefix');
//        var firstName = selectedPersonObj.getAttribute('firstName');
//        var middleName = selectedPersonObj.getAttribute('middleName');
//        var lastName = selectedPersonObj.getAttribute('lastName');
//        var suffix = selectedPersonObj.getAttribute('suffix');

//        /*/
//        var firstName = "";
//        var middleInitial = "";
//        var lastName = "";

//        var fullNameArray = fullName.split(" ");

//        if (fullNameArray.length == 2) {
//            firstName = fullNameArray[0];
//            lastName = fullNameArray[1];
//        }
//        else if (fullNameArray.length == 1) {
//            lastName = fullNameArray[0];
//        }
//        else if (fullNameArray.length == 3) {
//            firstName = fullNameArray[0];
//            middleInitial = fullNameArray[1];
//            lastName = fullNameArray[2];
//        }
//        else
//            lastName = fullName;
//        //*/

//        var contact = {};
//        contact.fullname = fullName;
//        contact.hac_prefix = prefix;
//        contact.firstname = firstName;
//        //contact.middlename = middleInitial;
//        contact.middlename = middleName;
//        contact.lastname = lastName;
//        contact.hac_suffix = suffix;
//        contact.bah_ssn_text = selectedPersonObj.getAttribute('ssn');
//        contact.hac_dfn = selectedPersonObj.getAttribute('dfn');
//        contact.hac_bfn = selectedPersonObj.getAttribute('bfn');

//        var progTypeLookup = CommCare.Shared.GetFieldValue("bah_programtypeid");
//        var ProgTypeName = progTypeLookup != null ? CommCare.Shared.DialogNameReturn(progTypeLookup[0].name) : null;

//        if (ProgTypeName == "FMP") {
//            contact.mcs_fmp = true;
//        }
//        else {
//            contact.mcs_fmp = false;
//        }

//        //SDK.REST.createRecord(contact, "Contact", contactCreateCallBack, function (error) { console.log(error); $('div#tmpDialog').hide(); });
//        //debugger;
//        CommCare.Shared.CrmCommonJS.WebApi.CreateRecord(contact, "contacts").then(function (results) {
//            contact.contactid = results;

//            contactCreateCallBack(contact);
//        }).catch(function (error) {
//            console.log(error);
//            $('div#tmpDialog').hide();
//        });

//    }
//}

function SetFocusToTab(TabName) {
    var CntrlName = CommCare.Shared.FormContext.ui.tabs.get(TabName);
    CntrlName.setFocus(true);
}

// This grabs pairs out of a "correlations" field that is retrieved from MVI on the 2nd retrieve 
function getCorrespondingId(type) {
    var filteredIds = _correspondingIds.filter(function (data) { return data.idtype.toUpperCase() == type.toUpperCase(); });
    if (filteredIds.length == 1) {
        return filteredIds[0].idvalue;
    }
    else {
        return null;
    }
}

// callback from 2nd call to MVI plugin
function personRetrieveCallback(data) {
    // $('div#tmpDialog').hide();
    if (data[0].crme_ExceptionOccured) {
        $('div#tmpDialog').hide();
        showResultsMessageDiv(data[0].crme_ExceptionMessage);
        showNotFoundDiv("Error with corresponding IDs in MVI");
        console.log("Error with corresponding IDs in MVI");
        return;
    }

    if (data[0].crme_exceptionoccured) {
        $('div#tmpDialog').hide();
        showResultsMessageDiv(data[0].crme_exceptionmessage);
        showNotFoundDiv("Error with corresponding IDs in MVI");
        console.log("Error with corresponding IDs in MVI");
        return;
    }

    //set global correlations object for use later
    _selectedPersonObjCorrelations = data;

    //loop through results and populate global _correspondingIds array
    _correspondingIds = [];

    for (var i = 0; i < data.length; i++) {
        var idObj = { idvalue: data[i].crme_patientid, idtype: data[i].crme_siteid }
        _correspondingIds[_correspondingIds.length] = idObj;

        //primary VistA record has the Sensitivity Flag set 
        if (data[i].crme_veteransensitivitylevel != null) {
            // set the record current veteran while going through the loop.
            _selectedPersonObjCorrelations = data[i];
        }
    }

    selectedPersonFindContactCallback();
    perfTimer = performance.now();
    endTimer = perfTimer - startTimer;
    console.log("Person Retrieve Callback: " + endTimer.toString() + " milliseconds");
}


// formerly ESRCallback, but ESR piece removed. 8/1/17
function selectedPersonFindContactCallback() {
    obj = _selectedPersonObj;
    var correlations = _selectedPersonObjCorrelations;
    var edipi = getCorrespondingId("200DOD"); // use this to get value from corresponding id's
    var _edipi = ""; // use this to pass into filter, after data scrub
    if (edipi != null && edipi.toUpperCase() != "UNK" && edipi != "") { _edipi = edipi; }

    var ssn = "";
    var dob = "";

    ///Sometimes we get an array?????? :(
    if (correlations !== undefined && (correlations instanceof Array) && correlations.length > 0) {
        ssn = correlations[0].crme_ssn; // This might have been masked on 1st MVI call so get from 2nd. obj.getAttribute('ssn');
        dob = correlations[0].crme_dobstring; // This might have been maskted on 1st MVI call so get from 2nd. obj.getAttribute('dateofbirth');
    }
    else if (correlations !== undefined) {
        ssn = correlations.crme_ssn; // This might have been masked on 1st MVI call so get from 2nd. obj.getAttribute('ssn');
        dob = correlations.crme_dobstring; // This might have been maskted on 1st MVI call so get from 2nd. obj.getAttribute('dateofbirth');
    }

    var firstName = obj.getAttribute('firstName');
    var lastName = obj.getAttribute('lastName');
    var patientMviIdentifier = obj.getAttribute('patientMviIdentifier');
    //var edipi = obj.crme_EDIPI; // obj.getAttribute('edipi');
    var edipi = _edipi; //getCorrespondingId('200DOD');
    var recordSource = obj.getAttribute('recordSource');
    var gender = obj.getAttribute('gender');
    var deceasedDate = obj.getAttribute('deceasedDate');
    var bos = obj.getAttribute('branchOfService');
    var pobc = obj.getAttribute('pobc');
    var pobs = obj.getAttribute('pobs');
    var mmn = obj.getAttribute('mmn');
    var middleName = obj.getAttribute('middleName');
    var alias = obj.getAttribute('alias');
    var address1 = obj.getAttribute('address1');
    var address2 = obj.getAttribute('address2');
    var city = obj.getAttribute('city');
    var state = obj.getAttribute('state');
    var zip = obj.getAttribute('zip');
    var country = "";
    var fullAddress = obj.getAttribute('fulladdress');
    var phoneNumber = obj.getAttribute('phoneNumber');
    var email = obj.getAttribute('email');
    var classcode = obj.getAttribute('classcode');
    var participantId = obj.getAttribute('participantId');
    _icn = obj.getAttribute('icn');
    __MVI_FullName = lastName + ", " + firstName;
    if (middleName != null) __MVI_FullName += " " + middleName;

    var fieldsSelected = "contactid,bah_edipi_text, bah_dob_date, bah_ssn_text, firstname, middlename, lastname, bah_branch_text, telephone1, address1_line1, address1_city, address1_postalcode, address1_stateorprovince, bah_source_text, emailaddress1";
    
    var filter2 = buildQueryFilter("bah_searchtype_text", "CREATEUPDATEMVI", false);

    if (edipi != "" && edipi.toUpperCase() != 'UNK' && edipi != null) filter2 += buildQueryFilter("bah_edipi_text", edipi, true);
    if (ssn != "" && ssn != null) filter2 += buildQueryFilter("bah_ssn_text", ssn, true);
    if (firstName != "" && firstName != null) filter2 += buildQueryFilter("firstname", firstName, true);
    if (lastName != "" && lastName != null) filter2 += buildQueryFilter("lastname", lastName, true);
    if (middleName != "" && middleName != null) filter2 += buildQueryFilter("middlename", middleName, true);
    if (alias != "" && alias != null) filter2 += buildQueryFilter("nickname", alias, true);
    if (recordSource != "" && recordSource != null) filter2 += buildQueryFilter("bah_source_text", recordSource, true);
    if (bos != "" && bos != null) filter2 += buildQueryFilter("bah_branch_text", bos, true);
    if (pobc != "" && pobc != null) filter2 += buildQueryFilter("bah_placeofbirth_city_text", pobc, true);
    if (mmn != "" && mmn != null) filter2 += buildQueryFilter("bah_mmn_text", mmn, true);
    if (phoneNumber != "" && phoneNumber != null) filter2 += buildQueryFilter("telephone1", phoneNumber, true);
    if (email != "" && email != null) filter2 += buildQueryFilter("emailaddress1", email, true);
    if (gender == "M") {
        filter2 += " and gendercode eq 1";
    }
    else if (gender == "F") {
        filter2 += " and gendercode eq 2";
    }

    if (address1 != "" && address1 != null) filter2 += buildQueryFilter("address1_line1", address1, true);
    if (address2 != "" && address2 != null) filter2 += buildQueryFilter("address1_line2", address2, true);
    if (city != "" && city != null) filter2 += buildQueryFilter("address1_city", city, true);

    if (state != "" && state != null) {
        var stateObj = getState(state);
        if (stateObj != null) {
            filter2 += " and _bah_address1_stateid_value eq " + stateObj.bah_stateId.toString();
            filter2 += buildQueryFilter("address1_stateorprovince", stateObj.bah_name, true);
        }
        else {
            filter2 += buildQueryFilter("address1_stateorprovince", state, true);
        }
    }

    if (country != "" && country != null) {
        var countryId = getCountryId(country);
        if (countryId != "") {
            filter2 += " and _bah_address1_countryid_value eq " + countryId.toString();
        }
        filter2 += buildQueryFilter("address1_country", country, true);
    }

    if (zip != "" && zip != null) filter2 += buildQueryFilter("address1_postalcode", zip, true);

    if (dob != "" && dob != null) {
        var isoDOB = CommCare.Shared.FormatDate(dob, "ge");
        var isoDOB2 = CommCare.Shared.FormatDate(dob, "lt");

        filter2 += " and bah_dob_date eq " + isoDOB
    }

    if (deceasedDate != "" && deceasedDate != null) {
        var isoDOD = CommCare.Shared.FormatDate(deceasedDate, "ge");
        var isoDOD2 = CommCare.Shared.FormatDate(deceasedDate, "lt");

        filter2 += " and bah_dateofdeath_date ge " + isoDOD + " and bah_dateofdeath_date lt " + isoDOD2
    }

    filter2 += " and statecode eq 0";
    filter2 = "$filter=" + filter2 + "&$orderby=createdon desc";

    CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("contacts", fieldsSelected.toLowerCase(), filter2).then(function (results) {
        console.log("Success retrieving Contact with results:");
        selectedPersonCallBack(results.value);
        personSearchComplete();
    }).catch(function (error) {
        alert(error.message);
        personSearchComplete();
    });

    return false;
}

//function GetEmailAddressFromContactC4(ssn, firstName, lastName, dob) {

//    var filter = "";

//    filter += "bah_ssn_text eq '" + ssn + "'";

//    //if (ssn != "" && ssn != null) filter += buildQueryFilter("bah_ssn_text", ssn, true);
//    if (firstName != "" && firstName != null) filter += buildQueryFilter("FirstName", firstName, true);
//    if (lastName != "" && lastName != null) filter += buildQueryFilter("LastName", lastName, true);
//    //if (dob != "" && dob != null) filter += buildQueryFilter("bah_dob_date", dob, true);

//    if (dob != null) {
//        dob = dob.toISOString();
//        filter += " and bah_dob_date eq datetime'" + dob + "'";
//    }

//    var fieldsSelected = "ContactId,EMailAddress1,FullName";
//    var fields = "$select=" + fieldsSelected + "&$filter=" + filter;
//    //fields = encodeURIComponent(fields);

//    //SDK.REST.retrieveMultipleRecords("Contact", fields, GetEmailAddressFromContactC4Callback, function (error) { alert(error.message); }, function () { console.log("GetEmailAddressFromContact complete"); });

//    //SDK.REST.retrieveMultipleRecords("Contact", fields,
//    //    function (data) {
//    //        GetEmailAddressFromContactC4Callback(data, ssn, dob);
//    //    }
//    //    , function (error) { alert(error.message); }
//    //    , function () {
//    //        console.log("GetEmailAddressFromContact complete");
//    //    });

//    CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("contacts", fieldsSelected.toLowerCase(), filter).then(function (results) {
//        console.log("Success retrieving Email Address of Contact with results:");
//        GetEmailAddressFromContactC4Callback(results.value, ssn, dob);
//    }).catch(function (error) {
//        console.log(error.message);
//    });
//}

//function SetEmailAddressOnContact(data, ssn, dob, emailaddress) {
//    var lookupValue = new Array();
//    lookupValue[0] = new Object();
//    lookupValue[0].id = data[0].contactid;
//    lookupValue[0].name = data[0].fullname;
//    lookupValue[0].entityType = "contact";

//    if (CommCare.Shared.GetFieldValue("mcs_surveycustomer") != null) {
//        CommCare.Shared.SetFieldValue("mcs_surveycustomer", lookupValue);
//    }

//    if (data[0].emailaddress1 != null) {
//        if (CommCare.Shared.GetFieldValue("mcs_surveyemailaddress") != null) {
//            CommCare.Shared.SetFieldValue("mcs_surveyemailaddress", data[0].emailaddress1);
//        }
//    }

//    $('div#tmpDialog').hide();

//    //var DateOfBirth = new Date(dob + " 00:00");

//    mvi.personSelected(data[0].contactid, __MVI_FullName, ssn, dob, data[0].firstname, data[0].lastname);
//    perfTimer = performance.now();
//    endTimer = perfTimer - startTimer;
//    console.log("SetEmailAddressOnContact " + endTimer.toString() + " milliseconds");

//}

//function GetEmailAddressFromContactC4Callback(data, ssn, dob) {
//    var lookupValue = new Array();
//    lookupValue[0] = new Object();
//    lookupValue[0].id = data[0].ContactId;
//    lookupValue[0].name = data[0].FullName;
//    lookupValue[0].entityType = "contact";

//    if (CommCare.Shared.GetFieldValue("mcs_surveycustomer") != null) {
//        CommCare.Shared.SetFieldValue("mcs_surveycustomer", lookupValue);
//    }

//    if (CommCare.Shared.GetFieldValue("mcs_surveyemailaddress") != null) {
//        CommCare.Shared.SetFieldValue("mcs_surveyemailaddress", data[0].EMailAddress1);
//    }

//    $('div#tmpDialog').hide();

//    var DateOfBirth = new Date(dob);

//    mvi.personSelected(data[0].ContactId, __MVI_FullName, ssn, dob, data[0].firstname, data[0].lastname);
//    perfTimer = performance.now();
//    endTimer = perfTimer - startTimer;
//    console.log("selectedPersonCallback " + endTimer.toString() + " milliseconds");

//}

function selectedPersonCallBack(data) {
    // currently called after RetrieveMultiple Contact
    $("#SearchByIdentifierButton").enable = true;
    var currentEntity = CommCare.Shared.FormContext.data.entity.getEntityName();
    // only automatically open if we have exactly one match returned
    if (data != null && data.length == 1) {

        _contactId = data[0].contactid;

        if (currentEntity === "bah_interactions") {
            SetFocusToTab("request_create_tab");
        }

        if (currentEntity === "mcs_tracker" || currentEntity === "mcs_trackeritem" || currentEntity === "mcs_taskertask") {
            SetFocusToTab("VeteranHistory");
        }

        completeSelectedPersonCallback(data, perfTimer, startTimer, endTimer);
    }
    else {

        var lastName = _selectedPersonObj.getAttribute('lastName');
        var ssn = _selectedPersonObj.getAttribute('ssn');
        var dob = _selectedPersonObj.getAttribute('dateofbirth');
        var dobwebapi;
        //only run search if we have all three criteria
        if (ssn != "") {
            var columns = "contactid,bah_edipi_text, bah_dob_date, bah_ssn_text, firstname, middlename, lastname, bah_branch_text, telephone1, address1_line1, address1_city, address1_postalcode, address1_stateorprovince, bah_source_text";
            var filter = "$filter=";
            var filterfull = "endswith(bah_ssn_text,'" + ssn.slice(-4) + "')"
            if (lastName != "") filterfull += buildQueryFilter("lastname", lastName, true);
            if (dob != "") {

                ///rip out month, day year and rebuild
                var dateParts = dob.split("/");

                if (dateParts.length === 3) {
                    if (isNumeric(dateParts[0]) && isNumeric(dateParts[1]) && isNumeric(dateParts[2])) {
                        if (!isNaN(Date.parse(dateParts[2] + "-" + dateParts[0] + "-" + dateParts[1] + "T12:00:00Z"))) {
                            dob = dateParts[2] + "-" + dateParts[0] + "-" + dateParts[1] + "T12:00:00Z";
                            dobwebapi = dateParts[2] + "-" + dateParts[0] + "-" + dateParts[1];
                        }
                    }
                }

                var dobdate = new Date(dob);
                var dobsearchstring = dobdate.getFullYear() + "-" + ("0" + (dobdate.getMonth() + 1)).slice(-2) + "-" + ("0" + dobdate.getDate()).slice(-2);
                dobsearchstring += "T12:00:00Z";
                filterfull += " and bah_dob_date eq " + dobwebapi;
            }
            filterfull = "(" + filterfull + ")";
            filterfull = filterfull + " and statecode eq 0";
            filter += filterfull;

            CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("contacts", columns, filter).then(function (results) {
                console.log("contacts successfully retrieved:");
                crmVeteranSearchCallBackFromLast4SsnSearch(results.value);
            }).catch(function (error) {
                console.log("Error retrieving record: " + error.message);
                alert(error.message);
                console.log(error);
                $('div#tmpDialog').hide();
            });

        }
    }
}

function completeSelectedPersonCallback(data, perfTimer, startTimer, endTimer) {
    $('div#tmpDialog').hide();
    mvi.personSelected(data[0].contactid, __MVI_FullName, data[0].bah_ssn_text, data[0].bah_dob_date, data[0].firstname, data[0].lastname);
    perfTimer = performance.now();
    endTimer = perfTimer - startTimer;
    console.log("selectedPersonCallback " + endTimer.toString() + " milliseconds");
}

function crmVeteranSearchCallBackFromLast4SsnSearch(veteranData) {
    crmVeteranSearchCallBack(veteranData, true);
}

function crmVeteranSearchCallBackFromMviDownSearch(veteranData) {
    crmVeteranSearchCallBack(veteranData, false);
}

function mviDownSearch() {
    document.getElementById("createNewVeteranFromLast4SearchButton").disabled = false;
    document.getElementById("createNewVeteranFromMviDownSearchButton").disabled = false;
    document.getElementById("createNewBeneficiaryFromMviDownSearchButton").disabled = false;

    $('#notFoundDiv').hide();
    var lastName = $("#LastNameTextBox").val();
    var firstName = $("#FirstNameTextBox").val();
    var middleName = $("#AddMiddleNameTextBox").val();
    var ssn = $("#SocialSecurityTextBox").val();
    var dobyear = $("#BirthYearTextBox").val();
    var dobmonth = $("#BirthMonthTextBox").val();
    var dobday = $("#BirthDayTextBox").val();
    var dob = "";

    if (dobmonth.length === 1)
        dobmonth = "0" + dobmonth;

    if (dobday.length === 1)
        dobday = "0" + dobday;

    if (isNumeric(dobyear) && isNumeric(dobmonth) && isNumeric(dobday)) {
        if (!isNaN(Date.parse(dobyear + "-" + dobmonth + "-" + dobday + "T12:00:00Z"))) {
            dob = dobyear + "-" + dobmonth + "-" + dobday + "T12:00:00Z";
            dobwebapi = dobyear + "-" + dobmonth + "-" + dobday
        }
    }

    var columns = "contactid, bah_edipi_text, bah_dob_date, bah_ssn_text, firstname, middlename, lastname, bah_branch_text, telephone1, address1_line1, address1_city, address1_postalcode, address1_stateorprovince, bah_source_text, emailaddress1, new_duplicateofanothercustomer";
    var filter = "$filter=";

    //try to search by edipi
    if (_lastSearchType == "EDIPI") {
        var edipi = $("#EdipiTextBox").val();
        filter += buildQueryFilter("bah_edipi_text", edipi, false);
    }
    else {
        if (lastName != "") { //we should always have lastname if we got to this point
            filter += buildQueryFilter("lastname", lastName, false);
        }
        if (ssn != "") {
            filter += buildQueryFilter("bah_ssn_text", ssn, true);
        }
        if (dob != "") {
            var dobdate = new Date(dob);
            var dobsearchstring = dobdate.getFullYear() + "-" + ("0" + (dobdate.getMonth() + 1)).slice(-2) + "-" + ("0" + dobdate.getDate()).slice(-2);
            dobsearchstring += "T12:00:00Z";
            //filter += " and bah_dob_date eq datetime'" + dobsearchstring + "'";
            filter += " and bah_dob_date eq " + dobwebapi;
        }
        if (firstName != "") {
            filter += buildQueryFilter("firstname", firstName, true);

        }
    }

    filter += " and statecode eq 0";

    CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("contacts", columns, filter).then(function (results) {
        console.log("contacts successfully retrieved:");
        crmVeteranSearchCallBackFromMviDownSearch(results.value);
    }).catch(function (error) {
        console.log("Error retrieving record: " + error.message);
        console.log(error);
    });

}

function crmVeteranSearchCallBack(veteranData, last4CallBack) {
    $('div#tmpDialog').hide();
    lobLookupAtt = CommCare.Shared.FormContext.getAttribute("hrc_lobid");
    if (lobLookupAtt !== null)
        lobLookup = lobLookupAtt.getValue();

    if (veteranData != null && veteranData.length > 0) {

        $("#possibleResultsTable").find("thead, tr, th").remove();
        $("#possibleResultsTable").find("tr:gt(0)").remove();
        $("#possibleResultsDiv").hide();
        $("#createDiv").hide();

        var table = $("#possibleResultsTable");
        var thead = document.createElement('thead');
        var theadRow = document.createElement('tr');
        for (var i = 0; i < veteranData.length; i++) {
            _contactId = veteranData[i].contactid == null ? "" : veteranData[i].contactid;
            var edipi = veteranData[i].bah_edipi_text == null ? "" : veteranData[i].bah_edipi_text;
            var dateOfBirth = veteranData[i].bah_dob_date == null ? "" : veteranData[i].bah_dob_date;
            var ssn = veteranData[i].bah_ssn_text == null ? "" : veteranData[i].bah_ssn_text;
            var firstName = veteranData[i].firstname == null ? "" : veteranData[i].firstname;
            var middleName = veteranData[i].middlename == null ? "" : veteranData[i].middlename;
            var lastName = veteranData[i].lastname == null ? "" : veteranData[i].lastname;
            var branch = veteranData[i].bah_branch_text == null ? "" : veteranData[i].bah_branch_text;
            var telephone1 = veteranData[i].telephone1 == null ? "" : veteranData[i].telephone1;
            //Address1_Line1
            var street1 = veteranData[i].address1_line1 == null ? "" : veteranData[i].address1_line1;
            var city = veteranData[i].address1_city == null ? "" : veteranData[i].address1_city;
            var zip = veteranData[i].address1_postalcode == null ? "" : veteranData[i].address1_postalcode;
            var state = veteranData[i].address1_stateorprovince == null ? "" : veteranData[i].address1_stateorprovince.Value;
            var source = veteranData[i].bah_source_text == null ? "" : veteranData[i].bah_source_text;
            var emailaddress1 = veteranData[i].emailaddress1 == null ? "" : veteranData[i].emailaddress1;
            var isDuplicate = veteranData[i].new_duplicateofanothercustomer == null ? false : veteranData[i].new_duplicateofanothercustomer;

            var fulladdress = "";
            if (city != "" && street1 != "" && zip != "" && state != "") {
                fulladdress = street1 + " " + city + ", " + state + " " + zip;
            }

            var dobstring = "";
            if (dateOfBirth != "") {
                var dobdate = new Date(dateOfBirth);
                dobdate.setDate(dobdate.getDate() + 1);
                dobdate = dobdate.toISOString();

                var isoDOBDate = new Date(dobdate);
                isoDOBDate.setHours(12);

                dobstring = ("0" + (isoDOBDate.getMonth() + 1)).slice(-2) + "/" + ("0" + isoDOBDate.getDate()).slice(-2) + "/" + isoDOBDate.getFullYear();
            }

            if (i === 0) {
                addHeaderColumn(theadRow, "Full Name");
                /*if (last4CallBack) {
                    addHeaderColumn(theadRow, "Partial SSN");
                }
                else*/ {
                    addHeaderColumn(theadRow, "SSN");
                }
                addHeaderColumn(theadRow, "EDIPI");
                addHeaderColumn(theadRow, "Date of Birth");
                addHeaderColumn(theadRow, "Phone No");
                addHeaderColumn(theadRow, "Address");
                addHeaderColumn(theadRow, "Email");
                addHeaderColumn(theadRow, "Source");
                addHeaderColumn(theadRow, "Duplicate?")
                thead.appendChild(theadRow);
                table.append(thead);
            }

            // Table rows
            var row = document.createElement('tr');
            addRowAttribute(row, 'fullName', lastName + ", " + firstName + " " + middleName, true);
            /*if (last4CallBack) {
                addRowAttribute(row, 'ssn', "*****" + ssn, true);
            }
            else*/ {
                addRowAttribute(row, 'ssn', ssn, true);
            }
            addRowAttribute(row, 'edipi', edipi, true);
            addRowAttribute(row, 'dobstring', dobstring, true);
            addRowAttribute(row, 'telephone1', telephone1, true);
            addRowAttribute(row, 'fulladdress', fulladdress, true);
            addRowAttribute(row, 'emailaddress1', emailaddress1, true);
            addRowAttribute(row, 'source', source, true);

            // Check Box to flag duplicate customer records
            addDuplicateCheckBox(row, _contactId, i, isDuplicate, true);

            row.className = (i % 2 === 0) ? "even resultRow" : "odd resultRow";
            row.id = "resultstable-row-" + i;
            row.setAttribute('contactId', _contactId);
            row.setAttribute('firstname', firstName);
            row.setAttribute('lastname', lastName);
            if (last4CallBack) {
                row.ondblclick = function () { updateSelectedPersonFromLast4Search(this); };
                row.onkeydown = function (e) {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        updateSelectedPersonFromLast4Search(this);
                    }
                };
            }
            else {
                row.ondblclick = function () { updateSelectedVeteranFromMviDownSearch(this); };
                row.onkeydown = function (e) {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        updateSelectedVeteranFromMviDownSearch(this);
                    }
                };
            }
            table.append(row);
        }

        // show button to flag duplicates if table has more than 1 row
        if (veteranData.length > 1) {
            row = document.createElement('tr');
            addApplyFlagButton(row, 9, true);
            table.append(row);
            checkAllDuplicateCheckBoxes();
        }

        $("#possibleResultsDiv").show();
    }
    else {
        alert("Could not find matching contact in CRM using provided search criteria");

        if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
            $("#createBeneficiaryDiv").show();
            $("#mviDownCreateBeneficiaryRow").show();
        }
    }



    if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
        return;
    }
    else {

        $("#createDiv").show();
        if (last4CallBack) {
            $("#last4CreateRow").show();
            $("#mviDownCreateRow").hide();
        }
        else {

            $("#last4CreateRow").hide();
            $("#mviDownCreateRow").show();
            if (_lastSearchType == "EDIPI") {
                $("#createAttributesTable").show();
            }
            else {
                $("#createAttributesTable").hide();
            }
        }
    }
}

function validateSearchByIdentifier() {

    var edipi = $("#EdipiTextBox").val();

    if (edipi != "") {
        if ((edipi.length != 10 || isNumeric(edipi) == false)) {
            $("#validationFailedDiv").text("VALIDATION FAILED: EDIPI is invalid.");
            return false;
        }
        return true;
    }
    else {
        $("#validationFailedDiv").text("VALIDATION FAILED: The search requires an EDIPI.");
        return false;
    }
}

function updateSelectedPersonFromLast4Search(obj) {

    var contact = {};
    _contactId = obj.getAttribute('contactId');
    var fname = _selectedPersonObj.getAttribute('firstName');
    var lname = _selectedPersonObj.getAttribute('lastName');
    var patientMviIdentifier = _selectedPersonObj.getAttribute('patientMviIdentifier');
    var ssn = _selectedPersonObj.getAttribute('ssn');
    var edipi = _selectedPersonObj.getAttribute('edipi');
    var phone = _selectedPersonObj.getAttribute('phoneNumber');
    var mname = _selectedPersonObj.getAttribute('middleName');
    var street = _selectedPersonObj.getAttribute('address1');
    var city = _selectedPersonObj.getAttribute('city');
    var state = _selectedPersonObj.getAttribute('state');
    var zip = _selectedPersonObj.getAttribute('zip');
    var mmn = _selectedPersonObj.getAttribute('mmn');
    var gender = _selectedPersonObj.getAttribute('gender');
    var source = _selectedPersonObj.getAttribute('recordSource');
    var dobstring = _selectedPersonObj.getAttribute('dateofbirth');
    // for Sensitive Vet process:
    var dFN = "0"; //Added as temp plachoder.

    var dob;


    if (lname == "" || dob == "" || (ssn == "" && edipi == "")) {
        alert("Last Name, Date of Birth, and SSN or EDIPI are required to update the Veteran Record");
        return;
    }
    else {


        var dob2;
        var DateOfBirth;

        //SetFocusToTab("request_create_tab");
        SetFocusToTab("VeteranHistory");
        if (!isNaN(Date.parse(dobstring))) {
            var dobdate = new Date(dobstring);
            var dobmonth = dobdate.getMonth() + 1;
            var dobday = dobdate.getDate();
            var dobyear = dobdate.getFullYear();
            dob = dobyear + "-" + dobmonth + "-" + dobday + "T12:00:00Z";
            dob2 = dobyear + "-" + dobmonth + "-" + dobday;
            contact.bah_dob_date = dob2;
            DateOfBirth = new Date(dob2 + " 00:00");
        }

        mvi.personSelected(_contactId, __MVI_FullName, ssn, dobstring, fname, lname);

        contact.lastname = lname;
        contact.bah_dob_date = dob2;
        contact.bah_source_text = source;

        if (ssn != "") { contact.bah_ssn_text = ssn; }
        if (edipi != "") { contact.bah_edipi_text = edipi; }
        if (fname != "") { contact.firstname = fname; }
        if (mname != "") { contact.middlename = mname; }
        if (mmn != "") { contact.bah_mmn_text = mmn; }
        if (phone != "") { contact.telephone1 = phone; }
        if (street != "") { contact.address1_line1 = street; }
        if (city != "") { contact.address1_city = city; }
        if (zip != "") { contact.address1_postalcode = zip; }
        if (patientMviIdentifier != "") { contact.bah_mvipatientidentifier_text = patientMviIdentifier; }
        if (dFN != "") { contact.vhacrm_dfn_text = dFN; }

        if (gender == "M") {
            contact.gendercode = 1;
        }
        else if (gender == "F") {
            contact.gendercode = 2;
        }

        if (state != "") {
            var stateObj = getState(state);
        }
        if (stateObj != null) {
            contact.bah_address1_stateid = { Id: stateObj.bah_stateId, LogicalName: "vhacrm_state", Name: stateObj.bah_name };
            contact.address1_stateorprovince = stateObj.bah_name;
        }
        else {
            contact.address1_stateorprovince = state;
        }
    }

    var fullname = lname + ", " + fname + " " + mname;

    CommCare.Shared.CrmCommonJS.WebApi.UpdateRecord(_contactId, "contacts", contact).then(function (results) {
        console.log("Selected Veteran Updated in CRM");
    }).catch(function (error) {
        alert(error.message);
    });


}

function updateSelectedVeteranFromMviDownSearch(obj) {
    _contactId = obj.getAttribute('contactId');
    var fullName = obj.getAttribute('fullName');
    var ssn = obj.getAttribute("ssn");
    var dobstring = obj.getAttribute("dobstring");

    var firstName = obj.getAttribute('firstName');
    var lastName = obj.getAttribute('lastName');
    var emailaddress1 = obj.getAttribute('emailaddress1');

    updateSelectedVeteranOnForm(_contactId, fullName, ssn, dobstring, firstName, lastName);
}

//function setEmailAddress(contactId, firstName, lastName, fullName, emailaddress1) {

//    // Set Survey Email Address from Contact
//    var intWith;
//    if (CommCare.Shared.FormContext.data.entity.attributes.get("bah_interactedwith_code") != null) {
//        intWith = CommCare.Shared.FormContext.data.entity.attributes.get("bah_interactedwith_code").getSelectedOption().text;
//    }
//    var callerFirstName;
//    if (CommCare.Shared.FormContext.data.entity.attributes.get("bah_firstname_text") != null) {
//        var checkFnameValue = CommCare.Shared.FormContext.data.entity.attributes.get("bah_firstname_text").getValue();
//        if (checkFnameValue != null)
//            callerFirstName = checkFnameValue;
//    }

//    var callerLastName;
//    if (CommCare.Shared.FormContext.data.entity.attributes.get("bah_lastname_text") != null) {
//        var checkLnameValue = CommCare.Shared.FormContext.data.entity.attributes.get("bah_lastname_text").getValue();
//        if (checkLnameValue != null)
//            callerLastName = checkLnameValue;
//    }

//    if (callerFirstName != null && callerLastName != null && intWith != null) {
//        if (callerFirstName.toUpperCase() == firstName.toUpperCase() && callerLastName.toUpperCase() == lastName.toUpperCase()) {
//            if (intWith == "Beneficiary" || intWith == "Sponsor" || intWith == "Veteran") {
//                CommCare.Shared.SetFieldValue("mcs_surveyemailaddress", emailaddress1);

//                var lookupValue = new Array();
//                lookupValue[0] = new Object();
//                lookupValue[0].id = contactId;
//                lookupValue[0].name = fullName;
//                lookupValue[0].entityType = "contact";

//                if (CommCare.Shared.GetFieldValue("mcs_surveycustomer") != null) {
//                    CommCare.Shared.SetFieldValue("mcs_surveycustomer", lookupValue);
//                }
//            }
//        }
//    }

//}


function createNewVeteranFromLast4Search() {
    if (CommCare.Shared.FormContext != null) {
        var fname = _selectedPersonObj.getAttribute('firstName');
        var lname = _selectedPersonObj.getAttribute('lastName');
        var patientMviIdentifier = _selectedPersonObj.getAttribute('patientMviIdentifier');
        var ssn = _selectedPersonObj.getAttribute('ssn');
        var edipi = _selectedPersonObj.getAttribute('edipi');
        var phone = _selectedPersonObj.getAttribute('phoneNumber');
        var mname = _selectedPersonObj.getAttribute('middleName');
        var street = _selectedPersonObj.getAttribute('address1');
        var city = _selectedPersonObj.getAttribute('city');
        var state = _selectedPersonObj.getAttribute('state');
        var zip = _selectedPersonObj.getAttribute('zip');
        var mmn = _selectedPersonObj.getAttribute('mmn');
        var gender = _selectedPersonObj.getAttribute('gender');
        var source = _selectedPersonObj.getAttribute('recordSource');
        var dobstring = _selectedPersonObj.getAttribute('dateofbirth');
        _preferredFacility = _selectedPersonObj.getAttribute('preferredFacility');
        var dFN = "0"; //Added as temp plachoder.

        var dob;

        if (lname == "" || dob == "" || (ssn == "" && edipi == "")) {
            alert("Last Name, Date of Birth, and SSN or EDIPI are required to create a new Veteran Record");
            return;
        }
        else {
            var dobdate = new Date(dobstring);
            var dobmonth = dobdate.getMonth() + 1;
            var dobday = dobdate.getDate();
            var dobyear = dobdate.getFullYear();
            dob = dobyear + "-" + dobmonth + "-" + dobday + "T12:00:00Z";
        }

        // TODO: Add additional fields

        var contact = {};
        contact.LastName = lname;
        contact.bah_dob_date = dob;
        contact.bah_source_text = source;

        if (ssn != "") { contact.bah_ssn_text = ssn; }
        if (edipi != "") { contact.bah_edipi_text = edipi; }
        if (fname != "") { contact.FirstName = fname; }
        if (mname != "") { contact.MiddleName = mname; }
        if (mmn != "") { contact.bah_mmn_text = mmn; }
        if (phone != "") { contact.Telephone1 = phone; }
        if (street != "") { contact.Address1_Line1 = street; }
        if (city != "") { contact.Address1_City = city; }
        if (zip != "") { contact.Address1_PostalCode = zip; }
        if (patientMviIdentifier != "") { contact.bah_mvipatientidentifier_text = patientMviIdentifier; }
        if (dFN != "") { contact.vhacrm_dfn_text = dFN; }

        ///TODO: JE 12/12/2017 - Not finding where these variables are being defined. Currently they are throwing errors on form. 
        if (_preferredFacility != null && _preferredFacility != "") {
            contact.vhacrm_facilitynumber_text = _preferredFacility;

            if (_isSensitive != "") { contact.vhacrm_issensitive_bool = _isSensitive; }


            if (gender == "M") {
                contact.GenderCode = { Value: 1 };
            }
            else if (gender == "F") {
                contact.GenderCode = { Value: 2 };
            }

            if (state != "") {
                var stateObj = getState(state);
                if (stateObj != null) {
                    contact.bah_address1_stateid = { Id: stateObj.bah_stateId, LogicalName: "vhacrm_state", Name: stateObj.bah_name };
                    contact.Address1_StateOrProvince = stateObj.bah_name;
                }
                else {
                    contact.Address1_StateOrProvince = state;
                }
            }

            CommCare.Shared.CrmCommonJS.WebApi.CreateRecord(contact, "contacts").then(function (results) {
                contact.contactid = results;

                contactCreateCallBack(contact);
            }).catch(function (error) {
                console.log(error);
                $('div#tmpDialog').hide();
            });
        }
    }
}


function contactCreateCallBack(returnData) {
    if (returnData != null && returnData.length > 0) {
        alert("Contact was not created.");
        $('div#tmpDialog').hide();
        return;
    }

    try {

        $('div#tmpDialog').hide();
        $("#createBeneficiaryDiv").hide();
        $("#mviDownCreateBeneficiaryRow").hide();

        var ssn = returnData.bah_ssn_text == "" ? null : returnData.bah_ssn_text;
        var dob = returnData.bah_dob_date == "" ? null : returnData.bah_dob_date;

        if (returnData.contactid != null)
            mvi.personSelected(returnData.contactid, returnData.fullname, ssn, dob, returnData.firstname, returnData.lastname);
        else
            mvi.personSelected(returnData.ContactId, returnData.FullName, ssn, dob, returnData.firstname, returnData.lastname);
    }
    catch (err) {
        $('div#tmpDialog').hide();
        var contactid;
        if (returnData.contactid != null)
            contactid = returnData.contactid;
        else
            contactid = returnData.ContactId;
        alert("Error encountered trying to update bah_veteranid field value to " + contactid + " : " + err);
    }
}

function updateSelectedVeteranOnForm(contactid, fullname, ssn, dob, firstName, lastName) {

    try {
        mvi.personSelected(contactid, fullname, ssn, dob, firstName, lastName);

    }
    catch (err) {
        alert("Error encountered trying to update bah_veteranid field value to " + contactid + " : " + err);
    }
}

function showHideTable(tblObj, imgObj, msgObj, msgFriendlyName) {
    if (tblObj.style.display != "") {  // show table & display -
        tblObj.style.display = "";
        imgObj.alt = "Hide Additional Search Criteria";
        imgObj.src = "bah_collapse"; //"expand_collapse_minus.gif"; 
        msgObj.value = "Hide " + msgFriendlyName;
    }
    else {  // hide table & display +
        tblObj.style.display = "none";
        imgObj.alt = "Show Additional Search Criteria";
        imgObj.src = "bah_expand"; //"expand_collapse_plus.gif";
        msgObj.value = "Show " + msgFriendlyName;
    }
}

function showHideTableFromKeydown(tblObj, imgObj, msgObj, event, msgFriendlyName) {
    if (event.keyCode === 13 || event.keyCode === 32) {
        if (tblObj.style.display != "") {  // show table & show -
            tblObj.style.display = "";
            imgObj.alt = "Hide " + msgFriendlyName;
            imgObj.src = "bah_collapse"; //"expand_collapse_minus.gif";
            msgObj.value = "Hide " + msgFriendlyName;
        }
        else {  // hide table & show +
            tblObj.style.display = "none";
            imgObj.alt = "Show Additional Search Criteria";
            imgObj.src = "bah_expand"; // "expand_collapse_plus.gif";
            msgObj.value = "Show Additional Search Criteria";
        }

        // need to set focus back on the image (**NOT WORKING IN CRM)
        imgObj.focus();
    }
}

function getCountryId(countryname) {
    var countryId = "";

    var oDataSetName = "bah_countrySet";
    var filter = "bah_countryname eq '" + countryname + "'";
    var columns = "bah_countryname, bah_countryId";

    Xrm.WebApi.online.retrieveMultipleRecords("bah_country", "?$select=bah_countryid,bah_countryname&$filter=bah_countryname eq '" + countryname + "'").then(
        function success(results) {
            return results.entities[0]["bah_countryid"];
        },
        function (error) {
            //Xrm.Utility.alertDialog(error.message);
            var alertStrings = {
                text: error.message
            };
            Xrm.Navigation.openAlertDialog(alertStrings);
        }
    );
}

function getState(statename) {
    var oDataSetName = "bah_stateSet";
    var filter = "bah_abbreviation_text eq '" + statename + "' or bah_name eq '" + statename + "'";
    var columns = "bah_name, bah_stateId, bah_abbreviation_text";
    var requestResults = retrieveMultipleSync(oDataSetName, columns, filter);
    var result = null;

    if (requestResults != null) {
        result = requestResults.results[0];
    }

    return result;
}

// added on 11/8/2017 check against local storage if the person is already exist and if it has sensetive flag = true
function FindVeteranByMVI(mviIdentifier) {

    var veteransList = JSON.parse(localStorage.getItem("storedVeteransList"));
    if ((veteransList == null) || (veteransList == "null"))
        return null;
    else
        removeExpiredVeterans();

    // Get updated storage
    veteransList = JSON.parse(localStorage.getItem("storedVeteransList"));

    var now = new Date();
    var currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (var i = 0; i < veteransList.length; i++) {

        if (veteransList[i].MVIId != null) {
            if (veteransList[i].MVIId == mviIdentifier) {
                // Confirm this record is still valid by date
                var DateAdded = new Date(veteransList[i].DateAdded);
                if (DateAdded.getTime() == currentDate.getTime()) {
                    return veteransList[i];
                }
            }
        }
    }
    return null;
}

// check if veteran exist and return sensetive value
function SearchVeteranIsSensetive(mviIdentifier) {
    var result = FindVeteranByMVI(mviIdentifier);
    if (result != null)
        result.isSensitive;
    else
        false;
}

// make sure that datetime does not include time
function GetDateWithoutTime() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toString();
}

//clean the storage 
function RemoveFromStorage() {
    localStorage.removeItem("storedVeteransList");
    //Store Person in the local storage
}

//clean the storage 
function RemoveVetFromStorage(patientIdentifier) {
    var veteransList = [];
    var veterans = localStorage.getItem("storedVeteransList");
    veteransList = JSON.parse(localStorage.getItem("storedVeteransList"));
    //get Veteran List,
    if ((veteransList == null) || (veteransList == "null")) {
        veteransList = [];
    }

    for (var i = 0; i < veteransList.length; i++) {  //check to see if the vetrean exist already

        if (veteransList[i].MVIId != "null") {
            if (veteransList[i].MVIId == patientIdentifier) {
                veteransList[i].isSensetive = isSensetive;
                foundRecord = true;
            }
        }
    }
}


function UpsertPatient(patientIdentifier, isSensetive) {

    var veteransList = [];
    var veterans = localStorage.getItem("storedVeteransList");
    veteransList = JSON.parse(localStorage.getItem("storedVeteransList"));
    //get Veteran List,
    if ((veteransList == null) || (veteransList == "null")) {
        veteransList = [];
    } else {
        removeExpiredVeterans();
    }

    // Get updated storage
    veteransList = JSON.parse(localStorage.getItem("storedVeteransList"));

    var foundRecord = false;//set default to create

    for (var i = 0; i < veteransList.length; i++) {  //check to see if the vetrean exist already

        if (veteransList[i].MVIId != "null") {
            if (veteransList[i].MVIId == patientIdentifier) {
                veteransList[i].isSensetive = isSensetive;
                foundRecord = true;
            }
        }
    }
    try {
        if (!foundRecord)// if no existing record was found it will add a new record to the list
        {
            var person = {
                "isSensitive": isSensetive,
                "MVIId": patientIdentifier,
                "ClickedContinue": false,
                "DateAdded": getCurrentDate()
            };

            veteransList.push(person);

            localStorage.setItem("storedVeteransList", JSON.stringify(veteransList));

        }

    }
    catch (ex) {
        localStorage.removeItem("storedVeteransList");
    }
    //alert(person.firstName);
}

function getCurrentDate() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function removeExpiredVeterans() {
    var veteransList = [];
    var veterans = localStorage.getItem("storedVeteransList");
    veteransList = JSON.parse(localStorage.getItem("storedVeteransList"));

    if ((veteransList != null) && (veteransList != "null")) {
        var i = veteransList.length;
        while (i--) {
            var vet = veteransList[i];
            var d = new Date(vet.DateAdded);

            var todaysdate = getCurrentDate();

            if (d.getTime() < todaysdate.getTime()) {
                veteransList.splice(i, 1);
            }
        }
        localStorage.setItem("storedVeteransList", JSON.stringify(veteransList));

    }
}

///JE: Support for CTI invoked searches
///Following are expected from CTI to the Interaction form as default values
///ANI; DNIS; SSN; DOB; EDIPI; LOB;
//function doCTISearch() {

//    //var ctiTriggered = CommCare.Shared.GetFieldValue("vhacrm_ctitriggered");

//    //if (ctiTriggered)
//    //    return;

//    //CommCare.Shared.SetFieldValue("vhacrm_ctitriggered", true);

//    var searchCriteria = {};
//    var validDob = false;
//    var validIdentifier = false;
//    var errorMessage = "";
//    var errorCount = 0;
//    ///Get Fields from the form
//    var ani = CommCare.Shared.GetFieldValue("vhacrm_ctiani");
//    var patientIdentifier = CommCare.Shared.GetFieldValue("vhacrm_ctiidentifier");
//    var dob = CommCare.Shared.GetFieldValue("vhacrm_ctidob");
//    var edipi = CommCare.Shared.GetFieldValue("vhacrm_ctiedipi");
//    var inboundPhoneNumber = CommCare.Shared.GetFieldValue("vhacrm_ctiinboundphone");
//    var providerTin = CommCare.Shared.GetFieldValue("vhacrm_ctitin");

//    if (ani !== null) {
//        //CommCare.Shared.SetFieldValue("bah_phonenumber_text", ani);

//        CommCare.Shared.SetFieldValue("bah_phonenumber_text", ani);
//    }

//    if (providerTin !== null) {
//        //CommCare.Shared.SetFieldValue("ccwf_tin_text", providerTin);
//        CommCare.Shared.SetFieldValue("bah_phonenumber_text", providerTin);
//        CommCare.Shared.FormContext.getAttribute("ccwf_tin_text").fireOnChange();
//    }


//    if (dob !== null) {

//        if (dob.trim().length !== 8 || !isNumeric(dob.trim())) {
//            errorMessage += " DOB is invalid.";
//            errorCount += 1;
//        }

//        var year = dob.substring(0, 4);
//        var month = dob.substring(4, 6);
//        var day = dob.substring(6, 8);

//        //Validate the DOB and set the value to true or false for later use
//        validDob = validateDateOfBirth(year, month, day);

//        if (!validDob) {
//            errorMessage += " DOB is invalid.";
//            errorCount += 1;
//        }

//        ///TODO: build the date accordingly    
//        $("#BirthDayTextBox").val(day);
//        $("#BirthYearTextBox").val(year);
//        $("#BirthMonthTextBox").val(month);

//        var searchDobString = month + "/" + day + "/" + year;
//    }

//    if (patientIdentifier !== null) {
//        //Validate the SSN Now
//        patientIdentifier = patientIdentifier.replace(/-/g, "");
//        $("#SocialSecurityTextBox").val(patientIdentifier);
//        if (patientIdentifier.trim().length != 9 || isNumeric(patientIdentifier.trim()) == false) {
//            errorMessage += " SSN is invalid.";
//            errorCount += 1;
//        }
//        else
//            validIdentifier = true;
//    }

//    if (edipi !== null) {
//        $("#EdipiTextBox").val(edipi);
//        //Invoke the expand/collapse of the EDII search section
//        $("#Img1").click();
//    }
//    //If EDIPI is null and DOB or Identifiers provider are invalid we need to display error and return out.
//    else if (!validDob || !validIdentifier) {
//        //Show message that we do not have valid info from IVR to search MVI
//        errorCount += 1;
//    }

//    if (errorCount > 0) {
//        formatValidationFailed();
//        $("#validationFailedDiv").text(errorMessage);
//        return;
//    }

//    lobLookupAtt = CommCare.Shared.FormContext.getAttribute("hrc_lobid");
//    if (lobLookupAtt !== null)
//        lobLookup = lobLookupAtt.getValue();

//    if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
//        ///Need to call hac_household with a SearchType of "DeterministicSearch"
//        searchCriteria.patientIdentifier = patientIdentifier;
//        searchCriteria.dob = dob;//searchDobString;

//        formatExecutingSearch();
//        getHouseholdsByBFN_DFN(searchCriteria, false);

//    }
//    // else (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.CCWF_LOB_NAME) {
//    else {
//        ///Need to call crme_Person with SearchType of "DeterministicSearch"
//        searchCriteria.patientIdentifier = patientIdentifier;
//        searchCriteria.dob = dob;// searchDobString;
//        searchCriteria.edipi = edipi;

//        doMVIDeterministicSearch(searchCriteria);
//    }

//    //defaultProgramTypeCTI();

//}

function doMVIDeterministicSearch(searchCriteria) {
    formatExecutingSearch();

    var filter = "$filter=";
    filter += "crme_isattended eq true";

    if (searchCriteria.patientIdentifier !== undefined && searchCriteria.patientIdentifier !== "" && searchCriteria.patientIdentifier !== null) {
        filter += " and crme_ssn eq '" + searchCriteria.patientIdentifier + "'";
    }

    if (searchCriteria.dob !== undefined && searchCriteria.dob != "" && searchCriteria.dob !== null) {
        filter += " and crme_dobstring eq '" + searchCriteria.dob + "'";
    }

    if (searchCriteria.edipi !== undefined && searchCriteria.edipi !== "" && searchCriteria.edipi !== null) {
        filter += " and crme_edipi eq '" + searchCriteria.edipi + "'";
    }

    filter += " and crme_searchtype eq 'DeterministicSearch'";

    var columns = "*";

    CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("crme_persons", columns, filter).then(function (results) {
        console.log("Success retrieving Person with results:");

        var strObj = JSON.stringify(results);
        CommCare.Shared.SetFieldValue("mcs_householddatalarge", strObj);
        var obj = JSON.parse(strObj);

        var tab = CommCare.Shared.FormContext.ui.tabs.get("tab_2");
        if (tab != null) {
            tab.setVisible(true);
        }
    }).catch(function (error) {
        console.log("Error retrieving crme_persons");
        console.log(error);
        alert(error.message);
    });
}
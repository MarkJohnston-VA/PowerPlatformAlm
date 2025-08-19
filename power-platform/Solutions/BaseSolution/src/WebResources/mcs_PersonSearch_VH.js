if (typeof CommCare == 'undefined')
{ CommCare = { __namespace: true }; }

if (typeof (CommCare.PersonSearch) == "undefined") {
    CommCare.PersonSearch = {
        __namespace: true
    };
}

CommCare.PersonSearch = function () {
    /////External Methods////////////
    function traitSearch() {
        search(false, true);
    }

    function edipiSearch() {
        search(true, true);
    }

    function deterministicSearch() {
        search(true, false);
    }

    function handleSensitiveVet() {
        //parent.Xrm.Page.ui.tabs.get("tab_veteranalerthtm").setVisible(true);
        //parent.Xrm.Page.ui.tabs.get("tab_veteranalerthtm").setFocus();
        $('#modal-sensitive').show();
        console.log(document.activeElement);
    }

    function handleContinueSensitiveAttended(obj) {
        var icn = obj.getAttribute("ICN");
        $('#modal-sensitive').hide();
        $('div#tmpDialog').show();
        upsertVeteranClickContinue(icn);
        findCreateVet(obj);
//        openSelectedPerson(obj); // PersonSearchUtils.openSelectedPerson
    }

    function selectPersonSearchResult(obj) {
        startTimer = performance.now();
        $('div#tmpDialog').show();

        var rawValueFromMvi = obj.getAttribute("rawValueFromMvi");
        var isSensitiveObj = obj.getAttribute("isSensitive") == null ? "" : obj.getAttribute("isSensitive");
        var isSensitive = isSensitiveObj == "true";
        //var arrVetSensLevel = vetSensLevel.split(":");
        //var patientIsSensetive = arrVetSensLevel[0];
        var veteranRecord = findVeteranByMVI(rawValueFromMvi);
        var alreadySearchRecord = false;
        if (veteranRecord != null) {
            if ((isSensitive) && (veteranRecord.ClickedContinue))
                alreadySearchRecord = true;
        }

        if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
            ///Need to call HouseHold Search Now and render the Sponser and Bene grids
            console.log("OCC FM Selected Person handler");
            getHouseholdsSelectedPerson(obj);
        }
        else {
            if (isSensitive && !alreadySearchRecord) {
                var interaction = window.parent.Xrm.Page.data.entity.getId();
                _selectedRow = obj;
                handleSensitiveVet(interaction, obj); // set up global vars for sensitive vet & display warning (function is on VeteranAlerts.js)
                personSearchComplete();
            }
            else {
                findCreateVet(obj);
                ///TODO: Handle FM Selected Person Here.
                ///Should call hac_household at this point to get sponser and benies
                perfTimer = performance.now();
                endTimer = perfTimer - startTimer;
                console.log("Check for Sensitive: " + endTimer.toString() + " milliseconds");
            }
        }
    }

    function clearIdentifierFieldsButton() {
        $("#EdipiTextBox").val("");
        $("#validationFailedDiv").hide();
        $("#notFoundDiv").hide();
        $("#possibleResultsDiv").hide();
        $("#resultsFieldSetDiv").hide();
        $("#createDiv").hide();
        $("#mviDownCreateRow").hide();
        $("#last4CreateRow").hide();
        $("#createAttributesTable").hide();
        $("#createLastNameTextBox").val("");
        $("#createFirstNameTextBox").val("");
        personSearchComplete();
    }

    function clearNameFieldsButton() {
        $("#resultsFieldSetDiv").hide();
        $("#FirstNameTextBox").val("");
        $("#MiddleNameTextBox").val("");
        $("#LastNameTextBox").val("");
        $("#BirthMonthTextBox").val("");
        $("#BirthDayTextBox").val("");
        $("#BirthYearTextBox").val("");
        //$("#PhoneNoTextBox").val("");
        $("#SocialSecurityTextBox").val("");
        $("#validationFailedDiv").hide();
        $("#notFoundDiv").hide();
        $("#possibleResultsDiv").hide();
        $("#createDiv").hide();
        $("#mviDownCreateRow").hide();
        $("#last4CreateRow").hide();
        $("#createAttributesTable").hide();
        $("#createLastNameTextBox").val("");
        $("#createFirstNameTextBox").val("");

        personSearchComplete();
    }

    function searchCrmButton() {

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

        //var columns = "contactid,bah_edipi_text, bah_dob_date, bah_ssn_text, firstname, middlename, lastname, bah_branch_text, telephone1, address1_line1, address1_city, address1_postalcode, address1_stateorprovince, bah_source_text, emailaddress1";
        var columns = "contactid, bah_edipi_text, bah_dob_date, bah_ssn_text, firstname, middlename, lastname, bah_branch_text, telephone1, address1_line1, address1_city, address1_postalcode, address1_stateorprovince, bah_source_text, emailaddress1, new_duplicateofanothercustomer";
        ///var filterPrefix = "$select=" + fieldsSelected + "&$filter=";
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

        //filter = encodeURIComponent(filter);
        //filter = filterPrefix + filter;
        //SDK.REST.retrieveMultipleRecords("Contact", filter, crmVeteranSearchCallBackFromMviDownSearch, function (error) { alert(error.message); }, function () {/*do nothing*/ });

        CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("contacts", columns, filter).then(function (results) {
            console.log("contacts successfully retrieved:");
            crmVeteranSearchCallBack(results.value, false);
        }).catch(function (error) {
            console.log("Error retrieving record: " + error.message);
            console.log(error);
        });

    }

    function createNewVeteran(type) {
        if (CommCare.Shared.FormContext != null) {
            var contact = {};

            var validEdipi = false;
            var edipi = $("#EdipiTextBox").val();
            if (edipi != "") {
                if (edipi.length == 10 && isNumeric(edipi)) {
                    validEdipi = true;
                }
            }
            if (_lastSearchType == "EDIPI") {
                if (validEdipi) {
                    //need to get attributes from "temp" fields
                    var lname = $("#createLastNameTextBox").val();
                    var fname = $("#createFirstNameTextBox").val();
                    if (fname != "") {
                        contact.firstname = fname;
                    }
                    else {
                        alert("First Name and Last Name are required to create a new Veteran record based on an EDIPI search.");
                        return;
                    }
                    if (lname != "") {
                        contact.lastname = lname;
                    }
                    else {
                        alert("First Name and Last Name are required to create a new Veteran record based on an EDIPI search.");
                        return;
                    }
                    contact.bah_edipi_text = edipi;
                }
                else {
                    alert("EDIPI is invalid. Please start over.");
                }
            }
            else {
                var lname = $("#LastNameTextBox").val();
                var fname = $("#FirstNameTextBox").val();
                var source = "";
                var ssn = $("#SocialSecurityTextBox").val();
                var dobmonth = $("#BirthMonthTextBox").val();
                var dobday = $("#BirthDayTextBox").val();
                var dobyear = $("#BirthYearTextBox").val();
                var dob = "";

                if (isNumeric(dobyear) && isNumeric(dobmonth) && isNumeric(dobday)) {
                    if (dobmonth.length == 1)
                        dobmonth = '0' + dobmonth;

                    if (dobday.length == 1)
                        dobday = '0' + dobday;

                    if (!isNaN(Date.parse(dobyear + "-" + dobmonth + "-" + dobday + "T12:00:00Z"))) {
                        dob = dobyear + "-" + dobmonth + "-" + dobday;
                        contact.bah_dob_date = dob;
                    }
                }

                contact.lastname = lname;
                contact.bah_source_text = source;
                if (ssn != "") { contact.bah_ssn_text = ssn; }
                if (fname != "") { contact.firstname = fname; }
            }

            CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "return=representation");
            CommCare.Shared.CrmCommonJS.WebApi.CreateRecordReturnRepresentation(contact, "contacts").then(function (results) {
                //Disable Create Button to prevent duplicates
                var buttonId = type.target.id;
                document.getElementById(buttonId).disabled = true;
                setLookupFireOnChange(results.contactid, results.firstname, results.lastname);
            }).catch(function (error) {
                console.log(error);
            });

        }
    }

    function createNewVetButton() {
        if (Xrm != null && Xrm.Page != null && Xrm.Page.context != null) {
            var contact = {};

            var validEdipi = false;
            var edipi = $("#EdipiTextBox").val();
            if (edipi != "") {
                if (edipi.length == 10 && isNumeric(edipi)) {
                    //need to get attributes from "temp" fields
                    var lname = $("#createLastNameTextBox").val();
                    var fname = $("#createFirstNameTextBox").val();
                    if (fname != "") {
                        contact.FirstName = fname;
                    }
                    else {
                        alert("First Name and Last Name are required to create a new Veteran record based on an EDIPI search.");
                        return;
                    }
                    if (lname != "") {
                        contact.LastName = lname;
                    }
                    else {
                        alert("First Name and Last Name are required to create a new Veteran record based on an EDIPI search.");
                        return;
                    }
                    contact.bah_edipi_text = edipi;
                }
                else {
                    alert("EDIPI is invalid. Please start over.");
                }
            }
            else {
                var lname = $("#LastNameTextBox").val();
                var fname = $("#FirstNameTextBox").val();
                var source = "Local";
                var ssn = $("#SocialSecurityTextBox").val();
                var dobmonth = $("#BirthMonthTextBox").val();
                var dobday = $("#BirthDayTextBox").val();
                var dobyear = $("#BirthYearTextBox").val();
                var dob = "";

                if (isNumeric(dobyear) && isNumeric(dobmonth) && isNumeric(dobday)) {
                    if (dobmonth.length == 1)
                        dobmonth = '0' + dobmonth;

                    if (dobday.length == 1)
                        dobday = '0' + dobday;

                    dob = dobmonth + "-" + dobday + "-" + dobyear;
                    if (!isNaN(Date.parse(dob))) {
                        contact.bah_dob_date = new Date(Date.parse(dob));
                    }
                }

                contact.LastName = lname;
                contact.bah_source_text = source;
                if (ssn != "") { contact.bah_ssn_text = ssn; }
                if (fname != "") { contact.firstname = fname; }
            }

            Xrm.WebApi.online.createRecord('contact', contact).then(
                function (result, contact) {
                    var data = JSON.parse(result.responseText);
                    setLookupFireOnChange(data.id, contact.FirstName, contact.LastName);
                    popQC(contact.bah_ssn_text, contact.bah_dob_date, contact.FirstName + contact.lastName, result.id);
                }, function (error) {

                }
            );
        }

    }

    ////////////////////INTERNAL ONLY Methods////////////////////////////////////

    ///***********************************Initial Search Functions*************************************//
    //Common function used by Edipi and Trait and Determistic Search

    function search(isIdentifierBased, isAttended) {
        isIdentifierBased = isIdentifierBased || false;
        isAttended = isAttended || false;

        $("#searchResultsMessageDiv").val("");

        var isValid = isIdentifierBased ? validateSearchByIdentifier() : validateSearchByTraits();
        if (!isValid) {
            formatValidationFailed();
            return;
        }
        formatExecutingSearch();

        var req = BuildInitialSearchRequest(isAttended);
        //debugger;

        Xrm.WebApi.online.execute(req).then(
            function success(data) {
                data.json().then(res => {
                    searchCallBack(res);
                    personSearchComplete();
                }
                ).catch(function (error) {
                    console.log("Error parsing response: " + error.message);
                    console.log(error);
                    handleMviError();
                    personSearchComplete();
                });
            }).catch(function (error) {
                console.log("Error retrieving record: " + error.message);
                console.log(error);
                handleMviError();
                personSearchComplete();
            });
    }

    function BuildInitialSearchRequest(isAttended) {
        if (isAttended === undefined)
            isAttended = true;

        var edipi = "";
        if ($("#EdipiTextBox").val() != "") {
            edipi = $("#EdipiTextBox").val();
        }

        var dobday = $("#BirthDayTextBox").val() == "DD" ? "" : $("#BirthDayTextBox").val();
        var dobyear = $("#BirthYearTextBox").val() == "YYYY" ? "" : $("#BirthYearTextBox").val();
        var dobmonth = $("#BirthMonthTextBox").val() == "MM" ? "" : $("#BirthMonthTextBox").val();
        if (dobday.length == 1)
            dobday = '0' + dobday;
        if (dobmonth.length == 1)
            dobmonth = '0' + dobmonth;
        var dob = "";
        if (dobmonth != "" && dobday != "" && dobyear != "") {
            dob = dobyear + dobmonth + dobday;
        }

        var socsecnum = "";
        if ($("#SocialSecurityTextBox").val() != "") {
            socsecnum = $("#SocialSecurityTextBox").val();
            socsecnum = socsecnum.replace(/-/g, "");
        }

        var lName = $("#LastNameTextBox").val();
        var fName = "";
        //inputEntity.crme_isattended = isAttended ? 'true' : 'false';
        if ($("#FirstNameTextBox").val() != "")
            fName = $("#FirstNameTextBox").val();

        return actionParms(dob, socsecnum, fName, lName, edipi);
    }

    function findCreateVet(obj) {
        var contact = mapMpiToContact(obj);
        var parms = actionFindCreateParms(contact);
        Xrm.WebApi.online.execute(parms).then(
            function success(data) {
                data.json().then(result => {
                    var name = contact.firstname + " " + contact.lastname;
                    //CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_vethomevirpregistrant", result.VirpRegistrant.mcs_vethomevirpregistrantid, "registrant", "mcs_vethomevirpregistrant");
                    setLookupFireOnChange(result.id, contact.firstname, contact.lastname);
                    personSearchComplete();
                }
                ).catch(function (error) {
                    console.log("Error parsing response: " + error.message);
                    console.log(error);
                    handleMviError();
                    personSearchComplete();
                });
        }, function (error) {
            console.error("Failure with contact retrieval: " + error.message);
            console.log(error);
            handleMviError();
        }
        );
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
                addRowAttribute(row, 'ssn', ssn, true);
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
                //row.setAttribute('emailaddress1', emailaddress1);
                if (last4CallBack) {
                    row.ondblclick = function () { updateSelectedPersonFromLast4Search(this); };
                    row.onkeydown = function (e) {
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            updateSelectedPersonFromLast4Search(this);
                        }
                    };
                }
                else {
                    row.ondblclick = function () { setLookupFireOnChange(this.getAttribute("contactId"), this.getAttribute("firstname"), this.getAttribute("lastname")); };
                    row.onkeydown = function (e) {
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            setLookupFireOnChange(this.getAttribute("contactId"), this.getAttribute("firstname"), this.getAttribute("lastname")); 
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
        }
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

    function setLookupFireOnChange(contactid, firstName, lastName) {
        var contactLookup = new Array();
        var fullName = firstName + " " + lastName;
        contactLookup[0] = {
            entityType: "contact",
            id: contactid,
            name: fullName
        };
        _formContext.getAttribute("bah_veteranid").setValue(contactLookup);
        var interactedWith = _formContext.getAttribute("bah_interactedwith_code").getValue();
        if (interactedWith == VETHOME.Interaction.Constants.InteractedWith.Veteran) {
            _formContext.getAttribute("bah_firstname_text").setValue(firstName);
            _formContext.getAttribute("bah_lastname_text").setValue(lastName);
        }
        _formContext.getAttribute("bah_veteranid").fireOnChange();
        _formContext.ui.tabs.get("interactioninformation").setFocus();
    }

    function mapMpiToContact(obj) {
        var dobVal = obj.getAttribute("dateofbirth");
        var dodVal = obj.getAttribute("deceasedDate");
        var formattedDob = dobVal.length == 8 ? dobVal.substring(0, 4) + "-" + dobVal.substring(4, 6) + "-" + dobVal.substring(6, 8) : null;
        var formattedDod = dodVal.length == 8 ? dodVal.substring(0, 4) + "-" + dodVal.substring(4, 6) + "-" + dodVal.substring(6, 8) : null;
        var contactObj = {};
        contactObj.firstname = obj.getAttribute("firstName");
        contactObj.middlename = obj.getAttribute("middleName");
        contactObj.lastname = obj.getAttribute("lastName");
        contactObj.bah_ssn_text = obj.getAttribute("ssn");
        contactObj.bah_source_text = "MVI";
        contactObj.bah_mvipatientidentifier_text = obj.getAttribute("icn") || obj.getAttribute("patientMviIdentifier");
        contactObj.hac_rawvaluefrommvi = obj.getAttribute("rawValueFromMVI");
        contactObj.bah_branch_text = obj.getAttribute("branchOfService");
        if (obj.getAttribute("edipi"))
            contactObj.bah_edipi_text = obj.getAttribute("edipi");
        contactObj.hac_gender = obj.getAttribute("gender");
        contactObj.gendercode = obj.getAttribute("gender") == "F" ? 2 : (obj.getAttribute("gender") == "M" ? 1 : null);
        contactObj.bah_dob_date = formattedDob;
        contactObj.bah_dateofdeath_date = formattedDod;
        contactObj.mcs_serviceconnectedpercentage = obj.getAttribute("scPercent");
        contactObj.bah_preferredfacility_text = obj.getAttribute("preferredFacility");
        contactObj.vhacrm_issensitive_bool = obj.getAttribute("isSensitive");
        return contactObj;
    }

    function searchCallBackFailure(error) {
        $('div#tmpDialog').hide();
        showNotFoundDiv("Error Contacting MVI");
        showResultsMessageDiv("There was a problem searching MVI. " + error);
        //Show Search in CRM Button
    }

    // callback from initial call to MVI  plugin
    function searchCallBack(data, isAttended) {
        lobLookupAtt = window.parent.Xrm.Page.getAttribute("hrc_lobid");

        if (lobLookupAtt != null)
            lobLookup = lobLookupAtt.getValue();

        if (isAttended === undefined)
            isAttended = true;

        // $('div#tmpDialog').show();
        // get the table
        var table = $("#personSearchResultsTable");

        // reset the table by removing all data rows
        $("#personSearchResultsTable").find("thead, tr, th").remove();
        $("#personSearchResultsTable").find("tr:gt(0)").remove();
        $("#resultsFieldSetDiv").hide();

        var persons = data.results;
        var message = data.returnmessage;

        if (message == "No Veterans found") {
            showNotFoundDiv("No Records Found");
            showResultsMessageDiv("No Records Found in MVI");
            if (isAttended)
                scrollIframe("#notFoundDiv");
            return;
        }
        else if (message != "Success") {
            showResultsMessageDiv(message);
            showNotFoundDiv("Error searching in MVI");
            return;
        }
        else {
            var thead = document.createElement('thead');
            var theadRow = document.createElement('tr');

            for (var i = 0; i < persons.length; i++) {
                var fullName = formatName(persons[i]);
                var recordSource = persons[i].crme_recordsource == null ? "" : persons[i].crme_recordsource;
                var patientMviIdentifier = persons[i].crme_patientmviidentifier == null ? "" : persons[i].crme_patientmviidentifier;
                var icn = persons[i].crme_icn == null ? "" : persons[i].crme_icn;
                var edipi = persons[i].crme_edipi == null ? "" : persons[i].crme_edipi;
                var ssn = persons[i].crme_ssn == null ? "" : persons[i].crme_ssn;
                var gender = persons[i].crme_gender == null ? "" : persons[i].crme_gender;
                var deceasedDate = persons[i].crme_deceaseddate == null ? "" : persons[i].crme_deceaseddate;
                var branchOfService = persons[i].crme_branchofservice == null ? "" : persons[i].crme_branchofservice;
                var dateOfBirth = persons[i].crme_dobstring == null ? "" : persons[i].crme_dobstring;
                var pobc = persons[i].crme_pobc == null ? "" : persons[i].crme_pobc;
                var pobs = persons[i].crme_pobs == null ? "" : persons[i].crme_pobs;
                var mmn = persons[i].crme_mmn == null ? "" : persons[i].crme_mmn;

                var firstName = persons[i].crme_firstname == null ? "" : persons[i].crme_firstname;
                var middleName = persons[i].crme_middlename == null ? "" : persons[i].crme_middlename;
                var lastName = persons[i].crme_lastname == null ? "" : persons[i].crme_lastname;
                var alias = persons[i].crme_alias == null ? "" : persons[i].crme_alias;

                var fulladdress = formatAddress(persons[i]);
                var address1 = persons[i].crme_address1 == null ? "" : persons[i].crme_address1;
                var address2 = persons[i].crme_address2 == null ? "" : persons[i].crme_address2;
                var city = persons[i].crme_city == null ? "" : persons[i].crme_city;
                var state = persons[i].crme_statestring == null ? "" : persons[i].crme_statestring;
                var zip = persons[i].crme_zipstring == null ? "" : persons[i].crme_zipstring.Name;
                var phoneNumber = persons[i].crme_primaryphone == null ? "" : persons[i].crme_primaryphone;
                var email = persons[i].crme_email == null ? "" : persons[i].crme_email;

                var classcode = persons[i].crme_classcode == null ? "" : persons[i].crme_classcode;
                var identityTheft = persons[i].crme_identitytheft == null ? "" : persons[i].crme_identitytheft;

                var isSensitive = persons[i].crme_sensitive == null ? false : persons[i].crme_sensitive;
                var scPercent = persons[i].crme_scconnectedpercentage == null ? "" : persons[i].crme_scconnectedpercentage;
                var preferredFacility = persons[i].crme_preferredfacility == null ? "" : persons[i].crme_preferredfacility;

                var participantId = persons[i].crme_patientmviidentifier == null ? "" : persons[i].crme_patientmviidentifier;
                var rawValueFromMVI = persons[i].crme_rawvaluefrommvi == null ? "" : persons[i].crme_rawvaluefrommvi;

                if (i == 0) {
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
                }

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
                addRowAttribute(row, 'isSensitive', isSensitive, false);
                addRowAttribute(row, 'scPercent', scPercent, false);
                addRowAttribute(row, 'preferredFacility', preferredFacility, false);
                //addRowAttribute(row, 'vetSensLevel', vetSensLevel, false);
                addRowAttribute(row, 'participantId', participantId, false);
                addRowAttribute(row, 'rawValueFromMVI', rawValueFromMVI, false);

                row.className = (i % 2 == 0) ? "even" : "odd";
                row.ondblclick = function () { selectPersonSearchResult(this); };
                row.onkeydown = function (e) {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        selectPersonSearchResult(this);
                    }
                };
                row.tabIndex = 100 + i;
                table.append(thead);
                table.append(row);

                $("#resultsFieldSetDiv").show();
            }

            ///Only show the Create Div if the form is not OCCFM as this is create for "Veteran" not Bene
            if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
                $("#createBeneficiaryDiv").show();
                $("#mviDownCreateBeneficiaryRow").show();
                //$("#mviDownCreateRow").show();
                if (isAttended)
                    scrollIframe("#createBeneficiaryDiv");
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
            //Create Attributes Table?
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
            resultsAppend = " Double click the correct Veteran in the grid to proceed. If the correct Veteran is not listed, verify the search criteria, enter additional search criteria, or select the Create New Patient button below.";

        showResultsMessageDiv((persons != null && persons.length > 0) ? resultsAppend : "No records found. Verify the search criteria, enter additional search criteria, or search for a record in CRM using the button below.");
    }
    ///***********************************Initial Search Functions(end)********************************//
    //Helper for Selecting result of 1st search - builds action to call plugin
    function buildSelectedPersonSearchRequest(obj, searchType) {
        var patientMviIdentifier = obj.getAttribute("icn");
        if (patientMviIdentifier == null || patientMviIdentifier == "") {
            patientMviIdentifier = obj.getAttribute("rawValueFromMVI");
        }
        var participantId = obj.getAttribute('participantId');
        var icn = obj.getAttribute('icn');
        if ((icn == null || icn == "") && participantId.indexOf("^") > 1) {
            var idparts = participantId.split("^");
            if (idparts.length > 0) {
                icn = idparts[0];
            }
        }

        var inputEntity = {};
        inputEntity.crme_icn = icn;
        inputEntity.crme_ssn = obj.getAttribute('ssn');
        inputEntity.crme_edipi = obj.getAttribute('edipi');
        inputEntity.crme_gender = obj.getAttribute('gender');
        inputEntity.crme_deceaseddate = obj.getAttribute('deceasedDate');
        inputEntity.crme_branchofservice = obj.getAttribute('branchOfService');
        inputEntity.crme_primaryphone = obj.getAttribute('phoneNumber');
        inputEntity.crme_firstname = obj.getAttribute('firstName');
        inputEntity.crme_lastname = obj.getAttribute('lastName');
        inputEntity.crme_patientmviidentifier = obj.getAttribute('patientMviIdentifier');
        inputEntity.crme_pobc = obj.getAttribute('pobc');
        inputEntity.crme_pobs = obj.getAttribute('pobs');
        inputEntity.crme_mmn = obj.getAttribute('mmn');
        inputEntity.crme_middlename = obj.getAttribute('middleName');
        inputEntity.crme_alias = obj.getAttribute('alias');
        inputEntity.crme_address1 = obj.getAttribute('address1');
        inputEntity.crme_address2 = obj.getAttribute('address2');
        inputEntity.crme_city = obj.getAttribute('city');
        //inputEntity.crme_stateorprovinceid = obj.getAttribute('state');
        //inputEntity.crme_zippostalcodeid = obj.getAttribute('zip');
        inputEntity.crme_email = obj.getAttribute('email');
        inputEntity.crme_classcode = obj.getAttribute('classcode');
        inputEntity.crme_veteransensitivitylevel = obj.getAttribute('isSensitive');
        //inputEntity.crme_veteran = obj.getAttribute('isVeteran');
        inputEntity.crme_dobstring = obj.getAttribute('dateofbirth');
        inputEntity.crme_fullname = obj.getAttribute('fullname');

        var isFM = getIsFM();

        var parameters = {};
        parameters.InputEntity = inputEntity;
        parameters.Lob = isFM ? "OCCFM" : "CCWF";

        if (searchType === undefined)
            parameters.SearchType = isFM ? "HouseholdSearch" : "SelectedPersonSearch";
        else
            parameters.SearchType = searchType;

        parameters.getMetadata = function () {
            return {
                boundParameter: null,
                parameterTypes: {
                    "InputEntity": {
                        "typeName": "mscrm.crme_person",
                        "structuralProperty": 5
                    },
                    "SearchType": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    },
                    "Lob": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    }
                },
                operationType: 0,
                operationName: "mcs_PersonSearch"
            };
        }
        return parameters;
    }

    //*************************************************Secondary Search Functions(end)*****************//


    //**************************************************Search Input Validation******************************************************//

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

    function validateSearchByTraits() {
        var lname = $("#LastNameTextBox").val();
        var fname = $("#FirstNameTextBox").val();
        var ssn = $("#SocialSecurityTextBox").val();
        var dobyear = $("#BirthYearTextBox").val();
        var dobmonth = $("#BirthMonthTextBox").val();
        var dobday = $("#BirthDayTextBox").val();
        var dob = dobyear + dobmonth + dobday;
        var errorMessage = "VALIDATION FAILED: ";
        var errorCount = 0;

        if (lname == null || lname == "") {
            errorMessage += "'Last Name' and at least 2 other fields are required for MVI search.";
            $("#validationFailedDiv").text(errorMessage);
            return false;
        }

        if (ssn == null || ssn.trim() == "") {
            errorCount += 1;
        }
        else if (ssn != null && ssn != "") {
            ssn = ssn.replace(/-/g, "");
            if (ssn.trim().length != 9 || isNumeric(ssn.trim()) == false) {
                errorMessage += " SSN is invalid.";
                errorCount += 1;
                $("#validationFailedDiv").text(errorMessage);
                return false;
            }
        }

        if (fname == "" || fname == null)
            errorCount += 1;

        if (dob == null || dob.trim() == "" || !isNumeric(dob.trim())) {
            errorCount += 1;
        } else if (!validateDateOfBirth(dobyear, dobmonth, dobday)) {
            errorMessage += " DOB is invalid.";
            $("#validationFailedDiv").text(errorMessage);
            return false;
        }

        // if searching with no additional traits check for 3 fields
        if (errorCount > 1) {
            errorMessage += " At least 3 fields are required for MVI search.";
            $("#validationFailedDiv").text(errorMessage);
            return false;
        }

        return true;
    }
    //*************************************************Search Input Validation(end)*************************************************//

    //*******************************************HTML Formatting functions**********************************************//
    function showNotFoundDiv(notFoundLabel) {
        $("#noResultsLabel").text(notFoundLabel);
        $("#notFoundDiv").show();
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

        scrollIframe("#validationFailedDiv");
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
        //$("#personSearchResultsTable").find("tr:gt(0)").focus();
        //$("#personSearchResultsTable").focus();
    }

    function clearFieldNames() {
        $("#resultsFieldSetDiv").hide();
        $("#FirstNameTextBox").val("");
        $("#LastNameTextBox").val("");
        $("#BirthMonthTextBox").val("");
        $("#BirthDayTextBox").val("");
        $("#BirthYearTextBox").val("");
        $("#SocialSecurityTextBox").val("");
        $("#validationFailedDiv").hide();
        $("#notFoundDiv").hide();
        $("#possibleResultsDiv").hide();
        $("#createDiv").hide();
        $("#mviDownCreateRow").hide();
        $("#last4CreateRow").hide();
        $("#createAttributesTable").hide();
        $("#createLastNameTextBox").val("");
        $("#createFirstNameTextBox").val("");

        personSearchComplete();
    }

    function showResultsMessageDiv(resultsMessage) {
        $("#resultsFieldSetDiv").show();
        $("#searchResultsMessageDiv").show();
        $("#searchResultsMessageDiv").text(resultsMessage);
    }

    function handleMviError() {
        $('div#tmpDialog').hide();
        showNotFoundDiv("Error Contacting MVI");
        showResultsMessageDiv("There was a problem searching MVI.");
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
    //*******************************************HTML Formatting functions(end)*****************************************//


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

    function addRowAttribute(row, attributename, attributevalue, addcolumn) {
        if (addcolumn) {
            var column = document.createElement('td');
            column.appendChild(document.createTextNode(attributevalue));
            row.appendChild(column);
        }
        row.setAttribute(attributename, attributevalue);
    }

    function addHeaderColumn(row, colname) {

        var th = document.createElement('th');
        th.appendChild(document.createTextNode(colname));
        row.appendChild(th);
    }

    function formatDatePart(datepart) {
        return datepart.length == 1 ? "0" + datepart : datepart;
    }

    function formatDate(date) {
        if (date == null)
            return date;
        var parts = date.split('/');
        if (parts.length == 3)
            return formatDatePart(parts[0]) + "/" + formatDatePart(parts[1]) + "/" + formatDatePart(parts[2]);
        else
            return date;
    }

    function formatAddress(data) {
        if (data.crme_fulladdress != null) {
            return data.crme_fulladdress;
        }
        if (data.crme_stateprovinceid != null && data.crme_zippostalcodeid != null) {
            var street = data.crme_address1 != null ? data.crme_address1 : "";
            var city = data.crme_city != null ? data.crme_city : "";
            var state = data.crme_stateprovinceid.Name != null ? data.crme_stateprovinceid.Name : "";
            var zip = data.crme_zippostalcodeid.Name != null ? data.crme_zippostalcodeid.Name : "";

            return street + " " + city + " " + state + " " + zip;
        }
        return "";
    }

    function clearField(obj) {
        if (obj.defaultValue == obj.value) obj.value = '';
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
    ////**************************************Formatting functions (end)*****************************************************//

    ////**************************************Helpers with Sensitivity Cache*************************************************//
    function findVeteranByMVI(mviIdentifier) {
        if (!!mviIdentifier && mviIdentifier.indexOf("^") == -1 && mviIdentifier.indexOf("V") != -1)
            mviIdentifier += "^NI^200M^USVHA^P"; //accommodate rawMVIValue or ICN only

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

    function upsertVeteranClickContinue(patientMviIdentifier) {
        // Called on Continue click
        // Check if the veteran exists in local storage (wasn't cleared) and update the date

        if (!!patientMviIdentifier && patientMviIdentifier.indexOf("^") == -1 && patientMviIdentifier.indexOf("V") != -1)
            patientMviIdentifier += "^NI^200M^USVHA^P"; //accommodate rawMVIValue or ICN only

        debugger;

        removeExpiredVeterans();

        var veteransList = [];
        var veterans = localStorage.getItem("storedVeteransList");
        veteransList = JSON.parse(localStorage.getItem("storedVeteransList"));

        //get Veteran List,
        if ((veteransList == null) || (veteransList == "null")) {
            veteransList = [];
        }

        var foundRecord = false;//set default to create

        for (var i = 0; i < veteransList.length; i++) {  //check to see if the vetrean exist already

            if (veteransList[i].MVIId != "null") {
                if (veteransList[i].MVIId == patientMviIdentifier) {

                    //
                    veteransList[i].ClickedContinue = true;
                    foundRecord = true;
                    veteransList[i].DateAdded = getCurrentDate();
                }
            }
        }

        // If record not found, create it
        try {
            if (!foundRecord)// if no existing record was found it will add a new record to the list
            {
                var person = {
                    "isSensitive": true,
                    "MVIId": patientMviIdentifier,
                    "ClickedContinue": true,
                    "DateAdded": getCurrentDate()
                };


                veteransList.push(person);

                localStorage.setItem("storedVeteransList", JSON.stringify(veteransList));
            }

            if (veteransList.length > 0) {
                localStorage.setItem("storedVeteransList", JSON.stringify(veteransList));
            }
        }
        catch (ex) {
            localStorage.removeItem("storedVeteransList");
        }
    }

    function initiateMVIForm() {
        if (parent.window.IsUSD) {
            CommCare.Shared.SetOnChange("vhacrm_ctitriggered", doCTISearch);
        }

        //Default values for Bene and Vet
        defaultValuesForBeneAndVet();

        $("#tmpDialog").hide();
        //Initial call to MVI plugin (by traits)
        $("#SearchByNameButton").bind("click", function () {
            traitSearch();
        });

        // Initial call to MVI plugin (by EDIPI)
        $("#SearchByIdentifierButton").bind("click", function () {
            edipiSearch();
        });

        $('#clearIdentifierFieldsButton').bind("click", function () {
            $("#EdipiTextBox").val("");
            $("#validationFailedDiv").hide();
            $("#notFoundDiv").hide();
            $("#possibleResultsDiv").hide();
            $("#resultsFieldSetDiv").hide();
            $("#createDiv").hide();
            $("#mviDownCreateRow").hide();
            $("#last4CreateRow").hide();
            $("#createAttributesTable").hide();
            $("#createLastNameTextBox").val("");
            $("#createFirstNameTextBox").val("");
            personSearchComplete();
            resetVeteranFields();
        });

        $('#clearNameFieldsButton').bind("click", function () {
            // clear Trait fields
            $("#resultsFieldSetDiv").hide();
            $("#LastNameTextBox").val("");
            $("#BirthMonthTextBox").val("");
            $("#BirthDayTextBox").val("");
            $("#BirthYearTextBox").val("");
            $("#SocialSecurityTextBox").val("");
            // additional searhc fields
            $("#FirstNameTextBox").val("");
            $("#AddMiddleNameTextBox").val("");
            $("#AddGenderTextBox").val("");
            $("#AddMMNTextBox").val("");
            $("#AddHomeStreetTextBox").val("");
            $("#AddHomeCityTextBox").val("");
            $("#AddHomeStateTextBox").val("");
            $("#AddHomeZipTextBox").val("");
            $("#AddPhoneNoTextBox").val("");
            $("#AddBirthCityTextBox").val("");
            $("#AddBirthStateTextBox").val("");
            $("#validationFailedDiv").hide();
            $("#notFoundDiv").hide();
            $("#possibleResultsDiv").hide();
            $("#createDiv").hide();
            $("#mviDownCreateRow").hide();
            $("#last4CreateRow").hide();
            $("#createAttributesTable").hide();
            $("#createLastNameTextBox").val("");
            $("#createFirstNameTextBox").val("");
            $("#householdResultsFieldSetDiv").hide();
            $("#householdNotFoundDiv").hide();
            $("#createBeneficiaryDiv").hide();

            personSearchComplete();
            resetVeteranFields();
        });

        $('#searchCrmButton').bind("click", mviDownSearch);
        $('#createNewVeteranFromLast4SearchButton').bind("click", createNewVeteran);
        $('#createNewVeteranFromMviDownSearchButton').bind("click", createNewVeteran);
        $('#createNewBeneficiaryFromMviDownSearchButton').bind("click", createNewVeteran);

        $(".formInputText:not(#createFirstNameTextBox):not(#createLastNameTextBox)").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#SearchByNameButton").click();
            }
        });

        $("#EdipiTextBox").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#SearchByIdentifierButton").click();
            }
        });

        // rational story #351001
        $("#BirthMonthTextBox").keyup(function (event) {
            if (this.value.length == 2 && event.key >= "0" && event.key <= "9") {
                $("#BirthDayTextBox").focus();
            }
        });
        $("#BirthDayTextBox").keyup(function (event) {
            if (this.value.length == 2 && event.key >= "0" && event.key <= "9") {
                $("#BirthYearTextBox").focus();
            }
        });

        //debugger;
        if (parent.window.IsUSD) {
            handleCti()
        }

        $("#modal-sensitive").on('shown.bs.modal', function () {
            $('#handleSensitive').focus();
        });
    }

    function handleCti() {
        console.log("*** CTI IsUSD");
        var ani = CommCare.Shared.GetFieldValue("vhacrm_ctiani");
        var ctidob = CommCare.Shared.GetFieldValue("vhacrm_ctidob");
        var ctissn = CommCare.Shared.GetFieldValue("vhacrm_ctiidentifier");

        var ctiTriggered = CommCare.Shared.GetFieldValue("vhacrm_ctitriggered");

        if ((ctidob != null) && (ctissn != null)) {
            //debugger;

            $("#SocialSecurityTextBox").val(ctissn);
            //var year = ctidob.substring(0, 4);
            //var month = ctidob.substring(4, 6);
            //var day = ctidob.substring(6, 8);

            var year = ctidob.substring(4, 9);
            var month = ctidob.substring(0, 2);
            var day = ctidob.substring(2, 4);


            $("#BirthDayTextBox").val(day);
            $("#BirthYearTextBox").val(year);
            $("#BirthMonthTextBox").val(month);

            console.log("*** CTI DOB and SSN both not null");
            var householddata = CommCare.Shared.GetFieldValue("mcs_householddatalarge");
            var householdJSON = JSON.parse(householddata);
            var isAttended = false;
            if (householddata != null) {
                console.log("*** CTI HH Data not null");
                CommCare.Shared.FormContext.ui.tabs.get("tab_2").setVisible(true);
                var lobLookupAtt = CommCare.Shared.GetFieldValue("hrc_lobid");
                if (lobLookupAtt != null) {
                    console.log("*** CTI LOB not null");
                    var lobLookup = CommCare.Shared.GetFieldValue("hrc_lobid");
                    if (lobLookup !== null && lobLookup[0].name === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
                        console.log("*** CTI FM");
                        getHouseholdsCallBack(householdJSON, false);
                        personSearchComplete();
                    }
                    else {
                        console.log("*** CTI C4");
                        determinisiticSearchCallBack(householdJSON);
                        personSearchComplete();
                    }
                }
                else {
                    console.log("*** CTI No LOB Found");
                }
            }
            else {
                console.log("*** HH Data not found");
            }
        }
    }

    function actionFindCreateParms(contact) {
        contact["@odata.type"] = "Microsoft.Dynamics.CRM.contact";
        var actionRequest = {
            contact: contact,

            getMetadata: function () {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        "contact": {
                            "typeName": "mscrm.contact",
                            "structuralProperty": 5
                        }
                    },
                    operationType: 0,
                    operationName: "mcs_FindCreateContact"
                };
            }
        };

        return actionRequest;
    }

    function actionParms(dob, ssn, fName, lName, edipi) {

        var mcs_personsearchRequest = {
            dob: dob,
            ssn: ssn,
            fName: fName,
            lName: lName,
            edipi: edipi,

            getMetadata: function () {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        "dob": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        },
                        "ssn": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        },
                        "lName": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        },
                        "fName": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        },
                        "edipi": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        }
                    },
                    operationType: 1,
                    operationName: "mcs_personsearch"
                };
            }
        };
        return mcs_personsearchRequest;
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

    return {
        TraitSearchButton: traitSearch,
        EdipiSearchButton: edipiSearch,
        DeterministicSearch: deterministicSearch,
        HandleSensitiveVet: handleSensitiveVet,
        HandleContinueSensitiveAttended: handleContinueSensitiveAttended,
        //OpenSelectedPerson: openSelectedPerson,
        ClearIdentifierFieldsButton: clearIdentifierFieldsButton,
        ClearNameFieldsButton: clearNameFieldsButton,
        SearchCrmButton: searchCrmButton,
        CreateNewVetButton: createNewVetButton,
        InitiateMVIForm: initiateMVIForm,
        ShowHideTable: showHideTable,
        ShowHideTableFromKeydown: showHideTableFromKeydown,
        ClearField: clearField

    };
}
();

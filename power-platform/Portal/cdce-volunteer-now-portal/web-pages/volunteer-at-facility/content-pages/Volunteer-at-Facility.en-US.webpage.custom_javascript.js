(function ($) {
    var daysOfTheWeek = [
        { "Text": "M", "Value": "844060000", "Name": "Monday" },
        { "Text": "T", "Value": "844060001", "Name": "Tuesday" },
        { "Text": "W", "Value": "844060002", "Name": "Wednesday" },
        { "Text": "TH", "Value": "844060003", "Name": "Thursday" },
        { "Text": "F", "Value": "844060004", "Name": "Friday" },
        { "Text": "SA", "Value": "844060005", "Name": "Saturday" },
        { "Text": "SU", "Value": "844060006", "Name": "Sunday" }
    ];

    $(document).ready(function () {
        var dobLabel = $("#cdcep_dob_label").text();
        var organizationNameLabel = $("#cdcep_group_organization_name_label").text();
        // Ram - 10-07-2021 - CRMCDCEP-1293
        var emargencyContactLabel = $("#cdcep_emergency_contact_label").text();
        var emargencyContactPhoneLabel = $("#cdcep_emergency_contact_phone_label").text();
        var emargencyContactRelationLabel = $("#cdcep_emergency_contact_relationship_label").text();

        //HIDE AFTERNOON AVAILABILITY INPUT FIELD AND LABEL
        $("#cdcep_volunteer_afternoon_list").hide();
        $("#cdcep_volunteer_afternoon_list").parents('tr').hide();

        //HIDE EVENING AVAILABILITY INPUT FIELD AND LABEL
        $("#cdcep_volunteer_evening_list").hide();
        $("#cdcep_volunteer_evening_list").parents('tr').hide();

        //HIDE MORNING AVAILABILITY INPUT FIELD
        $("#cdcep_volunteer_morning_list").hide();

        //BUILD THE AVAILABILITY INPUT MATRIX
        addAvailabilityFields();
        $(".entity-action-button").append("<input id='reset' type=\'reset\' class=\'btn btn-primary\'/>");
        $("#cdcep_pronoun_other").hide();
        $("#cdcep_pronoun_other").parents('tr').hide();

        //shiju commented 9.23.24 duplicates
		//addValidator("cdcep_dob", dobLabel);
        addValidator("cdcep_preferredphonenumber", "Preferred Phone Number");


        $("#emailaddress1").attr("type", "email");
        $("#emailaddress1").attr("title", "Please provide a valid Email Address");

        $("#cdcep_facilityid").closest("td").find("div.control, div.info").hide();
        //$("#cdcep_facilityid").hide();
        //$("#cdcep_facilityid").parents('tr').hide();

        ///////////////////

        $("#cdcep_preferredphonenumber").on('change', function () {

            if ($("#cdcep_preferredphonenumber").val() === "100000000") { // Home
                addValidator("telephone2", "Home Phone");
                removeValidator("mobilephone");
                removeValidator("telephone1");
            }
            else if ($("#cdcep_preferredphonenumber").val() === "100000001") { // Mobile
                addValidator("mobilephone", "Mobile Phone");
                removeValidator("telephone1");
                removeValidator("telephone2");
            }
            else if ($("#cdcep_preferredphonenumber").val() === "100000002") { //Work
                addValidator("telephone1", "Work Phone");
                removeValidator("mobilephone");
                removeValidator("telephone2");
            }
            else {
                removeValidator("telephone1");
                removeValidator("mobilephone");
                removeValidator("telephone2");
            }
        });
        

        $("#cdcep_enteraddressmanually_1").prop('checked',true);
        $("#cdcep_enteraddressmanually_1").parents('tr').hide();

        $("#cdcep_pronoun").on('change', function () {
            let pronoun = $("#cdcep_pronoun").val();
            if (pronoun === "100000003") {
                $("#cdcep_pronoun_other").show();
                $("#cdcep_pronoun_other").parents('tr').show();
            }
            else {
                $("#cdcep_pronoun_other").hide();
                $("#cdcep_pronoun_other").parents('tr').hide();
            }
        });

        if ($("#cdcep_volunteer_type_0").prop('checked')) {
            $("#cdcep_dob").parents('tr').show();
            $("#cdcep_group_organization_name").parents('tr').hide();
        }

        if ($("#cdcep_volunteer_type_1").prop('checked')) {
            $("#cdcep_dob").parents('tr').hide();
            $("#cdcep_group_organization_name").parents('tr').show();
        }

        $("#cdcep_volunteer_type_0").on('click', function () {
            if ($("#cdcep_volunteer_type_0").prop('checked')) {
                $("#cdcep_dob").parents('tr').show();
                $("#cdcep_group_organization_name").parents('tr').hide();

                // Ram - 10-07-2021 - Start- CRMCDCEP-1293
                $("#cdcep_emergency_contact").parents('tr').show();
                $("#cdcep_emergency_contact_phone").parents('tr').show();
                $("#cdcep_emergency_contact_relationship").parents('tr').show();
                addValidator("cdcep_emergency_contact", emargencyContactLabel);
                addValidator("cdcep_emergency_contact_phone", emargencyContactPhoneLabel);
                addValidator("cdcep_emergency_contact_relationship", emargencyContactRelationLabel);
                // Ram - 10-07-2021 - End- CRMCDCEP-1293

                addValidator("cdcep_dob", dobLabel);
                removeValidator("cdcep_group_organization_name");
            }
        })

        $("#cdcep_volunteer_type_1").on('click', function () {
            if ($("#cdcep_volunteer_type_1").prop('checked')) {
                $("#cdcep_dob").parents('tr').hide();
                $("#cdcep_group_organization_name").parents('tr').show();
                // Ram - 10-07-2021 - Start- CRMCDCEP-1293
                $("#cdcep_emergency_contact").parents('tr').hide();
                $("#cdcep_emergency_contact_phone").parents('tr').hide();
                $("#cdcep_emergency_contact_relationship").parents('tr').hide();
                removeValidator("cdcep_emergency_contact");
                removeValidator("cdcep_emergency_contact_phone");
                removeValidator("cdcep_emergency_contact_relationship");
                // Ram - 10-07-2021 - End- CRMCDCEP-1293
                addValidator("cdcep_group_organization_name", organizationNameLabel);
                removeValidator("cdcep_dob");
            }
        })

        $("#cdcep_facilityid").on('change', function () {
            let stateId = $("#cdcep_servicestateid").val();
            if (stateId) {
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").removeAttr("disabled");
            }
            else {
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").attr("disabled", "disabled");
            }
        });

        $("#cdcep_servicestateid").on('change', function () {
            let facId = $("#cdcep_facilityid").val();
            let stateId = $("#cdcep_servicestateid").val();
            if (stateId) {
                $("#cdcep_facilityid").closest("td").find("div.control, div.info").show();
                //$("#cdcep_facilityid").show();
                //$("#cdcep_facilityid").parents('tr').show();
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").removeAttr("disabled");
            }
            else {
                $("#cdcep_facilityid").closest("td").find("div.control, div.info").hide();
                //$("#cdcep_facilityid").hide();
                //$("#cdcep_facilityid").parents('tr').hide();
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").attr("disabled", "disabled");
                $("#cdcep_facilityid_name").parent().find("button.clearlookupfield").hide();
                $("#cdcep_facilityid_name").val(null);
                $("#cdcep_facilityid").val(null);
            }
        });

        $("#reset").on('click', function () {
            $("#cdcep_facilityid").closest("td").find("div.control, div.info").hide();
            //$("#cdcep_facilityid").hide();
            //$("#cdcep_facilityid").parents('tr').hide();
            $("#ValidationSummaryEntityFormView").hide();
            $("#cdcep_volunteer_type_0").focus();
            $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").attr("disabled", "disabled");
            $("#cdcep_facilityid_name").parent().find("button.clearlookupfield").hide();
            $("#cdcep_servicestateid_name").parent().find("button.clearlookupfield").hide();
            $("#cdcep_stateid_name").parent().find("button.clearlookupfield").hide();
        });

    });

    function addAvailabilityFields() {

        var timeOfDayToShow = "";
        var availabilityRow = $("<table id=\"availabilityRow\" class=\"table\">");

        var availabilityMatrixHeaderRow = $("<thead>");
        var availabilityMatrixHeaderCols = $("<th>TIME</th><th>MONDAY</th><th>TUESDAY</th><th>WEDNESDAY</th><th>THURSDAY</th><th>FRIDAY</th><th>SATURDAY</th><th>SUNDAY</th>");

        availabilityMatrixHeaderRow.append(availabilityMatrixHeaderCols);
        availabilityRow.append(availabilityMatrixHeaderRow);

        var availabilityMatrixRow = $("<tbody>");
        var dayOfWeekField = "";

        for (var i = 0; i < 3; i++) {

            var row = $("<tr>");
            var rowCol = $("<td>");
            switch (i) {
                case 0:
                    rowCol.append("Morning");
                    timeOfDayToShow = "Morning";
                    dayOfWeekField = "cdcep_volunteer_morning_list";
                    break;
                case 1:
                    rowCol.append("Afternoon");
                    timeOfDayToShow = "Afternoon";
                    dayOfWeekField = "cdcep_volunteer_afternoon_list";
                    break;
                case 2:
                    rowCol.append("Evening");
                    timeOfDayToShow = "Evening";
                    dayOfWeekField = "cdcep_volunteer_evening_list";
                    break;
            }
            row.attr("id", dayOfWeekField + "_row");
            row.append(rowCol);

            for (var x = 0; x < daysOfTheWeek.length; x++) {
                rowCol = $("<td>");
                rowCol.append("<input title=\"" + daysOfTheWeek[x].Name + " " + timeOfDayToShow + "\" id=\"" + timeOfDayToShow + "_" + daysOfTheWeek[x].Value + "\" type=\"checkbox\" value=\"" + daysOfTheWeek[x].Value + "\" onclick=\"window.updateAvailability(\'" + dayOfWeekField + "\')\">");
                row.append(rowCol);
            }

            availabilityMatrixRow.append(row);
        }

        availabilityRow.append(availabilityMatrixRow);

        $("#cdcep_volunteer_morning_list_label").text("Availability");
        $("#cdcep_volunteer_morning_list").parent().append(availabilityRow);
        addValidator2("cdcep_volunteer_morning_list_label", "AtLeastOne", "{label} must have at least one selected", function () {
            return $(":checkbox:checked").length > 0;
        });
    }

    function addValidator2(controlId, validatorIdPrefix, failureMessageMask, evalFunction) {
        // get control label and label text from page
        var controlLabelId = controlId + "_label";
        var controlLabel = "";

        // need to check if the control label exists. if not, we want to scroll to the control itself
        if ($("#" + controlLabelId).length == 0) {
            controlLabelId = controlId;
        }
        controlLabel = $("#" + controlLabelId).text();

        $("#" + controlLabelId).parent().addClass("required");

        //  replace the slug with the control label text
        var failureMessage = failureMessageMask.replace("{label}", controlLabel);

        var validator = document.createElement("span");
        validator.style.display = "none";
        validator.id = validatorIdPrefix + "_" + controlId;
        validator.controltovalidate = controlId;
        validator.errormessage = "<a href='#" + controlLabelId + "'>" + failureMessage + "</a>";
        validator.setAttribute("initialvalue", "");
        validator.evaluationfunction = evalFunction;

        // add the page validator and hook the error message click
        Page_Validators.push(validator);
    }

    function addValidator(fieldName, fieldLabel) {
        if (typeof (Page_Validators) == 'undefined') return;
        // Create new validator
        $("#" + fieldName + "_label").parent().addClass("required");

        var newValidator = document.createElement('span');
        newValidator.style.display = "none";
        newValidator.id = "RequiredFieldValidator" + fieldName;
        newValidator.controltovalidate = "casetypecode";
        newValidator.errormessage = "<a href='#" + fieldName + "_label'>" + fieldLabel + " is a required field.</a>";
        newValidator.validationGroup = "";
        newValidator.initialvalue = "";
        newValidator.evaluationfunction = function () {
            var value = $("#" + fieldName).val();
            if (value == null || value == "") {
                return false;
            } else {
                return true;
            }
        };

        // Add the new validator to the page validators array:
        Page_Validators.push(newValidator);

        // Wire-up the click event handler of the validation summary link
        $("a[href='#" + fieldName + "_label']").on("click", function () { scrollToAndFocus(fieldName + '_label', fieldName); });
    }

    function removeValidator(fieldName) {

        $("#" + fieldName + "_label").parent().removeClass("required");

        $.each(Page_Validators, function (index, validator) {
            if (validator.id == "RequiredFieldValidator" + fieldName) {
                Page_Validators.splice(index, 1);
            }
        });

        //$("#" + fieldName + "_label").parent().removeClass("required");
    }

    function updateAvailability(availabilityField) {
        var selectedOptions = "";

        $("#" + availabilityField + "_row").find(":checked").each(function (idx, chkbx) {
            if (selectedOptions === "") selectedOptions += $(chkbx).val();
            else selectedOptions += "," + $(chkbx).val();
        });

        $("#" + availabilityField).val(selectedOptions);
    }

    window.updateAvailability = updateAvailability;
}(jQuery));
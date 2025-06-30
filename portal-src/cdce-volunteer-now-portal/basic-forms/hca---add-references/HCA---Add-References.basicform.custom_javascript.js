$(document).ready(
    function () {
        addPhoneNumberValidation("cdcep_phonenumber");
        $("#cdcep_internationalreference").change(function () {
            let isInternational = document.getElementById("cdcep_internationalreference_1").checked;
            debugger;
            if (isInternational === true) {
                removePhoneNumberValidation("cdcep_phonenumber");
            }
            else {
                addPhoneNumberValidation("cdcep_phonenumber");
            }
        });
    }
);


var addPhoneNumberValidation = function (fieldName) {
    try {
        if ($("#" + fieldName) != undefined) {
            $("#" + fieldName).inputmask("999-999-9999");
            var Requiredvalidator = document.createElement('span');
            Requiredvalidator.style.display = "none";
            Requiredvalidator.id = fieldName + "Validator";
            Requiredvalidator.controltovalidate = fieldName;
            Requiredvalidator.errormessage = "&lt;a href='#" + fieldName + "_label'&gt;" + $("#" + fieldName + "_label").html() + " is not valid.&lt;/a&gt;";
            Requiredvalidator.initialvalue = "";
            Requiredvalidator.evaluationfunction = function () {
                var value = $("#" + fieldName).val();
                if (value == null || value == "") {
                    return false;
                }
                if (value.length != 12) {
                    return false;
                }
                if (value.indexOf('_') >= 0) {
                    return false;
                }
                return true;
            };
            // Add the new validator to the page validators array:
            Page_Validators.push(Requiredvalidator);
        }
    }
    catch (error) {
        errorHandler(error);
    }
};

var removePhoneNumberValidation = function (fieldName) {
    try {
        if ($("#" + fieldName) != undefined) {
            $("#" + fieldName).inputmask('remove');
            for (i = 0; i < Page_Validators.length; i++) {
                if (Page_Validators[i].id == fieldName + "Validator") {
                    Page_Validators.splice(i);
                }
            }
        }
    }
    catch (error) {
        errorHandler(error);
    }
};
$(document).ready(function () {

    $("#cdcep_felonyconviction").change(function () {
        checkFelonyConviction();
    });
    $("#cdcep_pronoun").change(function () {
        checkPronoun();
    });
    $("#cdcep_phone").inputmask("999-999-9999");
    addPhoneNumberValidation("cdcep_phone");
    checkFelonyConviction();
    checkPronoun();
});

var checkPronoun = function () {
    let pronoun = $("#cdcep_pronoun").val();
    if (pronoun === "100000003") {
        $("#cdcep_pronounother").show();
        $("#cdcep_pronounother").parents('tr').show();
    }
    else {
        $("#cdcep_pronounother").hide();
        $("#cdcep_pronounother").parents('tr').hide();
    }
}
var checkFelonyConviction = function () {
    var FelonyConviction = $("#cdcep_felonyconviction").val();
    //alert ("FelonyConviction : " +FelonyConviction);
    if (FelonyConviction == 1) //if Yes (radiobutton selected)
    {
        $("#cdcep_felonyconviction_description").parent().parent().show();
        MakeRequired("cdcep_felonyconviction_description");
    }
    else {
        $("#cdcep_felonyconviction_description").parent().parent().hide();
        MakeNotRequired("cdcep_felonyconviction_description");
    }
}


var MakeRequired = function (fieldName) {
    try {
        if ($("#" + fieldName) != undefined) {
            $("#" + fieldName).prop('required', true);
            $("#" + fieldName).closest(".control").prev().addClass("required");

            // Create new validator
            var Requiredvalidator = document.createElement('span');
            Requiredvalidator.style.display = "none";
            Requiredvalidator.id = fieldName + "Validator";
            Requiredvalidator.controltovalidate = fieldName;
            Requiredvalidator.errormessage = "&lt;a href='#" + fieldName + "_label'&gt;" + $("#" + fieldName + "_label").html() + " is a required field.&lt;/a&gt;";
            Requiredvalidator.initialvalue = "";
            Requiredvalidator.evaluationfunction = function () {
                var value = $("#" + fieldName).val();
                if (value == null || value == "") {
                    return false;
                } else {
                    return true;
                }
            };

            // Add the new validator to the page validators array:
            Page_Validators.push(Requiredvalidator);
        }
    }
    catch (error) {
        errorHandler(error);
    }
}
//Make UnMandatory
var MakeNotRequired = function (fieldName) {
    try {
        if ($("#" + fieldName) != undefined) {
            $("#" + fieldName).closest(".control").prev().removeClass("required");
            $("#" + fieldName).prop('required', false);

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
}

var addPhoneNumberValidation = function (fieldName) {
    try {
        if ($("#" + fieldName) != undefined) {
            $("#" + fieldName).prop('required', true);
            $("#" + fieldName).closest(".control").prev().addClass("required");

            // Create new validator
            var Requiredvalidator = document.createElement('span');
            Requiredvalidator.style.display = "none";
            Requiredvalidator.id = fieldName + "Validator";
            Requiredvalidator.controltovalidate = fieldName;
            Requiredvalidator.errormessage = "&lt;a href='#" + fieldName + "_label'&gt;" + $("#" + fieldName + "_label").html() + " number is not valid.&lt;/a&gt;";
            Requiredvalidator.initialvalue = "";
            Requiredvalidator.evaluationfunction = function () {
                var value = $("#" + fieldName).val();
                if (value == null || value == "") {
                    return true;
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
}
$(document).ready(function () {
//    $("#cdcep_honorabledischarge").change(function () {
//        var hondischarge = $("#cdcep_honorabledischarge").val();
//        var enddate = "cdcep_enddate";
//        //alert(hondischarge);
//        if (hondischarge == 100000000) {  // if yes
//            MakeRequired(enddate);
//        }
//        else {
//            MakeNotRequired(enddate);
//        }

 //});
 $("#cdcep_activedutyyn").change(function () {
    checkActiveDuty();
  });
 checkActiveDuty();
});


var checkActiveDuty = function()
{
     //var activeDuty = $("#cdcep_activedutyyn").val();
    var activeDutyYes = $("#cdcep_activedutyyn_1").is(":checked"); 
    var activeDutyNo = $("#cdcep_activedutyyn_0").is(":checked"); 

        //alert("activeDutyNo :" +activeDutyNo );

        if (activeDutyNo) //if true (radiobutton selected)
        { 
             $("#cdcep_enddate").parent().parent().show();
            MakeRequired("cdcep_enddate");
            $("#cdcep_honorabledischarge").parent().parent().show();
            MakeRequired("cdcep_honorabledischarge");

        }
        else 
        {
            MakeNotRequired("cdcep_enddate");
            $("#cdcep_honorabledischarge").parent().parent().hide();
            $("#cdcep_enddate").parent().parent().hide();
            MakeNotRequired("cdcep_honorabledischarge");
        }
}
   

//Make mandatory field
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
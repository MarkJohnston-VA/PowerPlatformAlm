$(document).ready(function ()
{
	$("ol.progress").first().css("display", "none");
	var allyn = true;
	$('#cdcep_over18').val('');
	$('#cdcep_uscitizen').val('');
	$('#cdcep_interesedinhealthcarecareer').val('');
	$('#cdcep_currentundergrad').val('');
	$('#cdcep_redeemcode').attr("readonly", true);
    $("#cdcep_phone").inputmask("999-999-9999");
    addPhoneNumberValidation("cdcep_phone");

    urlvars = getUrlVars();
    redeemcode = urlvars['redeemcode'];
    checkRedeemCode(redeemcode, '', '', ''); // first visit to page we only should expect redeem code.
    $('#cdcep_redeemcode').val(redeemcode);
    // window.location.replace("/hcta_Invalidcode");

	webFormClientValidate = function ()
	{
		debugger;
		var over18 = $('#cdcep_over18').val();
		var uscitizen = $('#cdcep_uscitizen').val();
		var interestedinhealth = $('#cdcep_interesedinhealthcarecareer').val();
		var undergrad = $('#cdcep_currentundergrad').val();
		var firstname = $('#cdcep_firstname').val();
		var lastname = $('#cdcep_lastname').val();
		var emailaddress = $('#cdcep_emailaddress').val();
		var phone = $('#cdcep_phone').val();
        if(window.ApplicantInvitation.Email == emailaddress && window.ApplicantInvitation.FirstName == firstname && window.ApplicantInvitation.LastName == lastname){
            return WebForm_OnSubmit();//                    return true;
        }
        else
            window.location.replace("/hcta_Invalidcode");
	};

	function getUrlVars()
	{
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	function checkRedeemCode(redeemcode, emailaddress, firstname, lastname)
	{
        $.ajax(
        {
            url: "/getapplicationinvitationbycode-json",
            type: "GET",
            data: {
                redeemcode: redeemcode
            },
            async: false,
            success: function (data)
            {
                var obj = JSON.parse(data);
                var records = obj.results.length;
                if (records != 1 || obj.results[0].RedeemCode === undefined) { // invalid
                    window.location.replace("/hcta_Invalidcode");
                }
                else{
                    window.ApplicantInvitation = obj.results[0];
                    return true;
                }
            }
        });
	}
});


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
};
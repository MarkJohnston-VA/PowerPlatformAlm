function openNewInvitationForm(context) {    
	var veteranId = context.getAttribute("mcs_veteranid").getValue()[0].id;
	Xrm.WebApi.online.retrieveRecord("contact", veteranId, "?$select=emailaddress1").then(
		function success(result) {
			var email = result["emailaddress1"];
			if (!email) {
                var alertStrings = { text: "The email field is blank for this Veteran. Please add an email address before sending an invitation.", title: "Validation Error" };
                var alertOptions = { height: 200, width: 300 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then((success) => {
                    CommCare.Shared.FormContext.ui.close();
                },
                (error) => {
                    console.log("Error in closing dialog", error);
                });
                context.getAttribute("emailaddress1").setRequiredLevel("required");
			} else {
				context.getAttribute("mcs_sendportalinvitation").setValue(true);
				context.data.save().then(function() {
						context.ui.setFormNotification("Portal invitation sent.", "INFO", "portal-message");
					},
					function(e) {
						console.log("Error in save " + e.message);
					});
			}
		},
		function(error) {
			Xrm.Utility.alertDialog(error.message);
		}
	);
}
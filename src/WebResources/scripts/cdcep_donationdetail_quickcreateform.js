//donationdetail_quickcreateform.js
var CDCEP = CDCEP || {};
CDCEP.DonationDetailQuickCreateForm = CDCEP.DonationDetailQuickCreateForm || {};
CDCEP.DonationDetailQuickCreateForm.customGPFFilter = "<filter type='and'><condition attribute='cdcep_facilityid' operator='eq' uitype='account' value='{0}' /></filter>";

CDCEP.DonationDetailQuickCreateForm.OnLoad = function (executionContext) {

    // Close the Quick Create form if not all required fields are populated - this prevents the user from using the + sign on the homepage
    validateQuickCreate(executionContext, ["cdcep_donationsummaryid"], "Option not available", "Option is not available through this menu selection");

    var formContext = executionContext.getFormContext();

    var donationSummary = formContext.getAttribute("cdcep_donationsummaryid").getValue();
    if (donationSummary !== null && donationSummary !== undefined) {
        Xrm.WebApi.online.retrieveRecord("cdcep_donationsummary", donationSummary[0].id, "?$select=_cdcep_facilityid_value,cdcep_donationtype").then(
            function success(result) {
                debugger;
                var _cdcep_facilityid_value = result["_cdcep_facilityid_value"];
                var donationType = result["cdcep_donationtype"];
                if (donationType == 100000002 || donationType == 100000003)  // Item or Activity
                {
                    formContext.getAttribute("cdcep_generalpostfundid").setRequiredLevel('none');
                    formContext.getControl("cdcep_generalpostfundid").setVisible(false);
                }
                else {
                    formContext.getAttribute("cdcep_generalpostfundid").setRequiredLevel('required');
                    formContext.getControl("cdcep_generalpostfundid").setVisible(true);
                    if (_cdcep_facilityid_value !== null && _cdcep_facilityid_value !== undefined) {
                        CDCEP.DonationDetailQuickCreateForm.customGPFFilter = CDCEP.DonationDetailQuickCreateForm.customGPFFilter.replace('{0}', _cdcep_facilityid_value);
                    }
                    else {
                        CDCEP.DonationDetailQuickCreateForm.customGPFFilter = "<filter type='and'><condition attribute='cdcep_generalpostfundid' operator='null'/></filter>";
                    }
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }

    formContext.getControl("cdcep_generalpostfundid").addPreSearch(function () { CDCEP.DonationDetailQuickCreateForm.filterGPFLookup(formContext) });

}

CDCEP.DonationDetailQuickCreateForm.filterGPFLookup = function (formContext) {
    //debugger;
    formContext.getControl("cdcep_generalpostfundid").addCustomFilter(CDCEP.DonationDetailQuickCreateForm.customGPFFilter);
}

    //12/07/2023 : MD Comment : BELOW FUNCTION NEVER BEEN USED IN DONTATION DETAIL QUICK CREATE FORM. NEED TO PURGE IT.
CDCEP.DonationDetailQuickCreateForm.FiscalYearOnChange = function (executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();
    if (!CDCEP.DonationDetailQuickCreateForm.CheckUserRole("CDCEP - National Admin") && !CDCEP.DonationDetailQuickCreateForm.CheckUserRole("System Administrator")) {
        if (formContext.getAttribute("cdcep_donationdate").getValue() != null && formContext.getAttribute("cdcep_donationdate").getValue() != undefined) {
            var currentdatetime = new Date();
            var currentdatetimeMonth = currentdatetime.getMonth() + 1;
            var currentdatetimeDay = currentdatetime.getDate();
            var currentdatetimeYear = currentdatetime.getFullYear();
            var date = formContext.getAttribute("cdcep_donationdate").getValue();

            if (date.getFullYear() <= currentdatetimeYear - 2) {
                //if(((currentdatetimeMonth < 10 && date.getMonth()+1 < 9 || date.getMonth()+1 == 9)  && date.getFullYear() <= currentdatetimeYear -1)){ 

                //Alert User you cannot enter that date and clear the value
                Xrm.Utility.alertDialog("Date not within fiscal year. Please specify date for this fiscal year");
                formContext.getAttribute("cdcep_donationdate").setValue(null);
            }
            //Grace period
            else if (currentdatetimeMonth == 10 && currentdatetimeDay < 15 && date.getMonth() + 1 <= 9 && date.getFullYear() <= currentdatetimeYear - 1) {

                //Alert User you cannot enter that date and clear the value
                Xrm.Utility.alertDialog("Date not within fiscal year. Please specify date for this fiscal year");
                formContext.getAttribute("cdcep_donationdate").setValue(null);

            }
            //After grace period
            // else if (((currentdatetimeMonth == 10 && currentdatetimeDay >= 15 || currentdatetimeMonth > 10) && date.getFullYear() < currentdatetimeYear - 1) || date.getMonth() + 1 < 10 && date.getFullYear() == currentdatetimeYear) {
            else if (((currentdatetimeMonth == 10 && currentdatetimeDay >= 15 || currentdatetimeMonth > 10) && date.getFullYear() < currentdatetimeYear - 1) || date.getMonth() + 1 < 10 && date.getFullYear() < currentdatetimeYear) {

                //Alert User you cannot enter that date and clear the value
                Xrm.Utility.alertDialog("Date not within fiscal year. Please specify date for this fiscal year");
                formContext.getAttribute("cdcep_donationdate").setValue(null);

            }
            else if (date > currentdatetime) {
                Xrm.Utility.alertDialog("Cannot enter a future date");
                formContext.getAttribute("cdcep_donationdate").setValue(null);
            }
            else {

                //Unlock all fields
                // CDCEP.OccassionalHoursForm.LockFields(false, formContext);

            }


        }//date check
    } //security role check    

}

CDCEP.DonationDetailQuickCreateForm.CheckUserRole = function (roleName) {
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;

    if (roles === null) return false;

    var hasRole = false;
    roles.forEach(function (item) {
        if (item.name.toLowerCase() === roleName.toLowerCase()) {
            hasRole = true;
        }
    });

    return hasRole;
}
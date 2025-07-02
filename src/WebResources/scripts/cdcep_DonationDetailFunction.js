var CDCEP = CDCEP || {};
CDCEP.DonationDetailForm = CDCEP.DonationDetailForm || {};

CDCEP.DonationDetailForm.Variables = {
    OverrideDateValidation: true
};

CDCEP.DonationDetailForm.SECURITY_ROLE = {
    SYSTEM_ADMIN: "System Administrator",
    FACILITY_CHIEF: "CDCEP - Facility Chief",
    FACILITY_SPECIALIST: "CDCEP - Facility Specialist",
    NATIONAL_ADMIN: "CDCEP - National Admin",
    OFFICE_ASSISTANT: "CDCEP - Volunteer/Office assistant"
}

CDCEP.DonationDetailForm.OnLoad = function (executionContext) {

    CDCEP.DonationDetailForm.FiscalYear(executionContext);

}

CDCEP.DonationDetailForm.FiscalYear = function (executionContext) {
    //debugger;

    var formContext = executionContext.getFormContext();
    if (CDCEP.DonationDetailForm.CheckUserRole(CDCEP.DonationDetailForm.SECURITY_ROLE.FACILITY_CHIEF) || CDCEP.DonationDetailForm.CheckUserRole(CDCEP.DonationDetailForm.SECURITY_ROLE.FACILITY_SPECIALIST)
        || CDCEP.DonationDetailForm.CheckUserRole(CDCEP.DonationDetailForm.SECURITY_ROLE.OFFICE_ASSISTANT)) {

        var donationSummary = formContext.getAttribute("cdcep_donationsummaryid").getValue();
        if (donationSummary !== null && donationSummary !== undefined) {
            Xrm.WebApi.online.retrieveRecord("cdcep_donationsummary", donationSummary[0].id.replace("{", "").replace("}", ""), "?$select=cdcep_donationdate").then(
                function success(result) {
                    //debugger;
                    var dateReturned = result["cdcep_donationdate"];
                    var date = new Date(dateReturned);

                    if (CDCEP.DonationDetailForm.Variables.OverrideDateValidation === false) {

                        var isDateInFiscalYear = new CustomApi.IsDateInCurrentFiscalYear(date);
                        return new Promise(function (resolve, reject) {
                            Xrm.WebApi.online.execute(isDateInFiscalYear).then(
                                function success(result) {
                                    var isInRage = false;
                                    result.json().then(
                                        function (response) {
                                            //TODO: Add your logic here. In this case, we may want to read the output parameter defined using the following code:
                                            isInRage = response.IsInRange;
                                            resolve(isInRage);
                                            var currentdatetime = new Date();       //   12/1/2023
                                            var currentdatetimeMonth = currentdatetime.getMonth() + 1;
                                            var currentdatetimeDay = currentdatetime.getDate();
                                            var currentdatetimeYear = currentdatetime.getFullYear();
                                            var dateMonth = date.getMonth() + 1;
                                            var dateYear = date.getFullYear();

                                            var lockRecord = false;

                                            if (isInRage)
                                                lockRecord = false;
                                            else {
                                                if (currentdatetimeMonth == 10 && currentdatetimeDay < 15) {
                                                    if ((dateMonth <= 9 && dateYear === currentdatetimeYear) || (dateMonth > 9 && dateYear === currentdatetimeYear - 1))        //09/05/2022
                                                        lockRecord = false;
                                                    else
                                                        lockRecord = true;
                                                }
                                                else
                                                    lockRecord = true;
                                            }
                                            CDCEP.DonationDetailForm.LockFields(lockRecord, formContext);
                                        }
                                    );
                                    ////debugger;
                                },
                                function (error) {
                                    reject(error.message);
                                    Xrm.Navigation.openErrorDialog({
                                        details: error.message,
                                        message: 'An error occurred while calling the IsDateInCurrentFiscalYear Custom API.'
                                    });
                                }
                            );
                        });
                    }
                    else {
                        var cutOffDate = new Date(2021, 10, 1);
                        cutOffDate.setHours(0, 0, 0, 0);
                        if (dateReturned < cutOffDate) {
                            CDCEP.DonationDetailForm.LockFields(true, formContext);
                        }
                    }
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        }
        //  var date = formContext.getAttribute("cdcep_date").getValue(); 


    }

}

CDCEP.DonationDetailForm.LockFields = function (lock, formContext) {
    formContext.ui.controls.forEach(function (control, i) {
        if (control && control.getDisabled && !control.getDisabled()) {
            control.setDisabled(lock);
        }
    });

}


CDCEP.DonationDetailForm.CheckUserRole = function (roleName) {
    const matchingRoles = Xrm.Utility.getGlobalContext().userSettings.roles.get(function (Role) {
        return Role.name === roleName;
    });

    return matchingRoles.length > 0;
}
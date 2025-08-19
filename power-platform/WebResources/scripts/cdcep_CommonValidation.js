//*****************************************************************
// This function closes the Quick Create form if not all the 
// required fields are populated. This prevents the user
// from creating records using the + sign on the homepage
//*****************************************************************
function validateQuickCreate(executionContext, requiredFields, errorTitle, errorMessage) {
    var formContext = executionContext.getFormContext();
    var isValid = true;

    if (formContext.ui.getFormType() === 1) {

        for (let i = 0; i < requiredFields.length; i++) {
            if (formContext.getAttribute(requiredFields[i]).getValue() === null) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            var alertStrings = {
                confirmButtonLabel: "Ok",
                text: errorMessage,
                title: errorTitle
            };
            var alertOptions = {
                height: 260,
                width: 400
            };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                function (success) {
                    formContext.ui.close();
                    return;
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }
}

//*****************************************************************
// This function closes the Quick Create form if the Requirement 
// is not of type Specific Roles
// from creating records using the + sign on the homepage
//*****************************************************************
function validateQuickCreateForServiceRoleRequirement(executionContext, errorTitle, errorMessage) {

    var formContext = executionContext.getFormContext();

    if (formContext.ui.getFormType() === 1) {

        if (formContext.getAttribute("cdcep_facility").getValue() === null && formContext.getAttribute("cdcep_requirement").getValue() === null) {

            showErrorMessage(errorTitle, errorMessage, formContext);
        }
        else {
            if (!window.top.IsValidForQuickCreate) {
                showErrorMessage(errorTitle, errorMessage, formContext);
            }
        }

    }
}

function showErrorMessage(errorTitle, errorMessage, formContext) {
    var alertStrings = {
        confirmButtonLabel: "Ok",
        text: errorMessage,
        title: errorTitle
    };
    var alertOptions = {
        height: 260,
        width: 400
    };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function (success) {
            formContext.ui.close();
            return;
        },
        function (error) {
            console.log(error.message);
        }
    );
}

if (typeof VETHOME == 'undefined') { VETHOME = { __namespace: true }; }

if (typeof (VETHOME.Shared) == "undefined") {
    VETHOME.Shared = {
        __namespace: true
    };
}

if (typeof (VETHOME.Shared.Constants) == "undefined") {
    VETHOME.Shared.Constants = {
        __namespace: true
    };
}

// Constants
VETHOME.Shared.Constants.CREATE_FORM = 1;
VETHOME.Shared.Constants.UPDATE_FORM = 2;
VETHOME.Shared.Constants.INACTIVE_FORM = 4;
VETHOME.Shared.Constants.QUICK_CREATE_FORM = 5;
VETHOME.Shared.Constants.VETHOME_LOB_NAME = "VET-HOME";

VETHOME.Shared.Functions = function () {
    function formatPhoneNumber(executionContext, fieldName) {
        var formContext = executionContext.getFormContext();
        var number = CommCare.Shared.GetFieldValue(fieldName);
        if (number == null) {
            CommCare.Shared.FormContext.getControl(fieldName).clearNotification("PHONELENGTHERROR");
            CommCare.Shared.FormContext.ui.clearFormNotification("PHONEERROR" + fieldName);
            return;
        }
        var numberOnly = number.replace(/\D/g, '');
        if (numberOnly.length == 10) {
            CommCare.Shared.FormContext.getControl(fieldName).clearNotification("PHONELENGTHERROR");
            CommCare.Shared.FormContext.ui.clearFormNotification("PHONEERROR" + fieldName);

            var first = numberOnly.substring(0, 3);
            var second = numberOnly.substring(3, 6);
            var third = numberOnly.substring(6);
            var formatted = "(" + first + ") " + second + "-" + third;
            CommCare.Shared.SetFieldValue(fieldName, formatted);
            return formatted;
        }
        else {
            CommCare.Shared.FormContext.getControl(fieldName).setNotification("Phone Number must contain only 10 digits", "PHONELENGTHERROR");
            CommCare.Shared.FormContext.ui.setFormNotification("Phone Number must contain only 10 digits", "ERROR", "PHONEERROR" + fieldName);
            return number;
        }
    }

    function splitPhoneNumber(inputPhone) {
        if (!!!inputPhone)
            return null;
        var firstPart = null;
        var extension = null;
        if (inputPhone[0] == '1')
            inputPhone = inputPhone.substring(1);
        var allMatches = inputPhone.replace(/\D/g, '').match(/[0-9]/g);
        if (allMatches.length > 10) {
            firstPart = allMatches.join('').substring(0, 10);
            extension = allMatches.join('').substring(10);
        } else if (allMatches.length == 10) {
            firstPart = allMatches.join();
        }

        return { primary: firstPart, ext: extension };
    }

    return {
        FormatPhoneNumber: formatPhoneNumber,
        SplitPhoneNumber: splitPhoneNumber
    };
} ();
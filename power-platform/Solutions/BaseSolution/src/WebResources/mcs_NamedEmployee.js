/// <reference path="CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.NamedEmployee) == "undefined") {
    CommCare.NamedEmployee = {
        __namespace: true
    };
}

if (typeof (CommCare.NamedEmployee.Global) == "undefined") {
    CommCare.NamedEmployee.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.NamedEmployee.Constants) == "undefined") {
    CommCare.NamedEmployee.Constants = {
        __namespace: true
    };
}

CommCare.NamedEmployee.Constants.YesNo = {
    Yes: 806860000,
    No: 806860001
}

CommCare.NamedEmployee.Global = (function () {

    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        lockFormIfNotPatsR();
        requireAllFieldsForPOC();
        hideShowCountryCode();

        CommCare.Shared.SetOnChange("mcs_pointofcontact", requireAllFieldsForPOC);
        CommCare.Shared.SetOnChange("mcs_phonenumber", validatePhoneNumber);

        CommCare.Shared.FormContext.data.entity.addOnSave(onSave);
    }

    function onSave(context) {
        if (CommCare.Shared.ValidatePhoneOrFaxNumber("NamedEmployee", "none", ["mcs_phonenumber"], "Phone") == false) {
            context.getEventArgs().preventDefault();
        }
    }

    function hideShowCountryCode() {
        var countryCode = CommCare.Shared.GetFieldValue("mcs_countrycode");
        CommCare.Shared.SetVisible("mcs_countrycode", !!countryCode);
    }

    function lockFormIfNotPatsR() {
        //if (CommCare.Shared.GetFieldValue("mcs_patsrid") != null) {
        if (CommCare.Shared.FormContext.ui.getFormType() != 1) {
            CommCare.Shared.LockForm();
        }
    }

    function requireAllFieldsForPOC() {
        var POC = CommCare.Shared.GetFieldValue("mcs_pointofcontact");
        var isPOC = POC == CommCare.NamedEmployee.Constants.YesNo.Yes ? true : false;

        CommCare.Shared.SetRequired("mcs_phonenumber", isPOC);
        //CommCare.Shared.SetRequired("mcs_position", isPOC);
        CommCare.Shared.SetRequired("mcs_email", isPOC);
    }

    function validatePhoneNumber() {
        CommCare.Shared.ValidatePhoneOrFaxNumber("NamedEmployee", "none", ["mcs_phonenumber"], "Phone");
    }
})();
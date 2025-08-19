/// <reference path="Common/CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') {
    CommCare = {
        __namespace: true
    };
}

if (typeof (CommCare.Caller) == "undefined") {
    CommCare.Caller = {
        __namespace: true
    };
}

if (typeof (CommCare.Caller.Global) == "undefined") {
    CommCare.Caller.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.Caller.Constants) == "undefined") {
    CommCare.Caller.Constants = {
        __namespace: true
    };
}

CommCare.Caller.Constants.InteractedWith =
{
    VACO: 803750005,
    VISN: 803750008
};

CommCare.Caller.Global = (function () {

    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        if (CommCare.Shared.GetFieldValue("mcs_actionitem")) {
            limitInteractedWithAIT();
        } else {
            CommCare.Shared.LimitInteractedWithOptions();
        }

        setVaDetailsVisibility();
        hideShowCountryCode();

        if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM) {
            CommCare.Shared.SetFieldValue("mcs_name", "Will Set On Save");
            CommCare.Shared.SetSubmitMode("mcs_name", "always");
        }
        else {
            CommCare.Shared.LockForm();
        }

        hideVACOVISNContactingEntityValues();

        //vaco or visn
        CommCare.Shared.SetOnChange("mcs_interactedwith", setVaDetailsVisibility);
        CommCare.Shared.SetOnChange("mcs_phonenumber", validatePhoneNumber);
        CommCare.Shared.FormContext.data.entity.addOnSave(form_OnSave);
        CommCare.Shared.SetOnChange("mcs_phoneextension", validatePhoneExtension);
        
    }

    function hideShowCountryCode() {
        var countryCode = CommCare.Shared.GetFieldValue("mcs_countrycode");
        CommCare.Shared.SetVisible("mcs_countrycode", !!countryCode);
    }

    function limitInteractedWithAIT() {
        //ShowInteractedWithAIT
        var xrmPage = CommCare.Shared.FormContext;
        var pickListFieldName = "mcs_interactedwith";
        var pickListField = xrmPage.getControl(pickListFieldName);
        var options = xrmPage.getAttribute(pickListFieldName).getOptions();
        //clear all items
        for (var i = 0; i < options.length; i++) {
            pickListField.removeOption(options[i].value);
        }
        var odata = "?$select=mcs_interactedwith,mcs_name&$filter=mcs_name eq 'ShowInteractedWithAIT' and statecode eq 0&$orderby=mcs_sortorder asc";
        Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", odata).then(
            function success(results) {

                for (var i = 0; i < results.entities.length; i++) {
                    var mcs_interactedwith = results.entities[i]["mcs_interactedwith"];
                    var mcs_interactedwith_formatted = results.entities[i]["mcs_interactedwith@OData.Community.Display.V1.FormattedValue"];

                    var optionToUse = options.filter(v => v.value == mcs_interactedwith);
                    pickListField.addOption(optionToUse[0]);

                    hideVACOVISNContactingEntityValues();
                }
            });
    }

    function form_OnSave(context) {
        var programType = CommCare.Shared.GetFieldValue("mcs_typeintersectionid");
        var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

        if (CommCare.Shared.ValidatePhoneOrFaxNumber("Caller", programTypeName, ["mcs_phonenumber"], "Phone") == false) {
            context.getEventArgs().preventDefault();
        }
    }

    function validatePhoneNumber() {
        var programType = CommCare.Shared.GetFieldValue("mcs_typeintersectionid");
        var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

        CommCare.Shared.ValidatePhoneOrFaxNumber("Caller", programTypeName, ["mcs_phonenumber"], "Phone");
    }

    function setVaDetailsVisibility() {
        CommCare.Shared.SetVisible("mcs_vadetails", false);
        CommCare.Shared.SetVisible("mcs_visn", false);
        CommCare.Shared.SetRequired("mcs_vadetails", "none");
        CommCare.Shared.SetRequired("mcs_visn", "none");

        var interactedWith = CommCare.Shared.GetFieldValue("mcs_interactedwith");
        console.log(interactedWith);
        if (interactedWith == CommCare.Caller.Constants.InteractedWith.VACO) {
            CommCare.Shared.SetRequired("mcs_vadetails", "required");
        } else {
            CommCare.Shared.SetRequired("mcs_vadetails", false);
        }
        
        if (interactedWith == CommCare.Caller.Constants.InteractedWith.VISN) {
            CommCare.Shared.SetRequired("mcs_visn", "required");
        }
        if (CommCare.Shared.GetFieldValue("mcs_visn") != null) {
            CommCare.Shared.SetVisible("mcs_visn", true);
        }

        if (CommCare.Shared.GetFieldValue("mcs_vadetails") != null) {
            CommCare.Shared.SetVisible("mcs_vadetails", true);
        } else if (interactedWith == CommCare.Caller.Constants.InteractedWith.VACO && CommCare.Shared.GetFieldValue("mcs_patsrid") == null) {
            CommCare.Shared.SetVisible("mcs_vadetails", true);
        } else {
            CommCare.Shared.SetVisible("mcs_vadetails", false);
        }
    }

    function hideVACOVISNContactingEntityValues() {

        var xrmPage = CommCare.Shared.FormContext;
        var optionSelect = xrmPage.getControl("mcs_interactedwith");

        optionSelect.removeOption(CommCare.Caller.Constants.InteractedWith.VACO);
        optionSelect.removeOption(CommCare.Caller.Constants.InteractedWith.VISN);
    }

    function validatePhoneExtension() {
        CommCare.Shared.FormContext.getControl("mcs_phoneextension").clearNotification("extensionError");
        var rawPhoneExtension = CommCare.Shared.GetFieldValue("mcs_phoneextension");
        var errMsg = "Extension must contain no more than 6 digits";
        var badNumber;
        if (rawPhoneExtension != null) {
            console.log(rawPhoneExtension.replace(/\D/g, ''));
            if (rawPhoneExtension.replace(/\D/g, '').length < rawPhoneExtension.length && rawPhoneExtension.length > 0) {
                errMsg = "Extension cannot contain letters";
                badNumber = true;
            } else if (rawPhoneExtension.length == 0) {
                badNumber = false;
            }
            else {
                badNumber = rawPhoneExtension.length > 6 ? true : false;
            }

            if (badNumber) {
                CommCare.Shared.FormContext.getControl("mcs_phoneextension").setNotification(errMsg, "extensionError");
            }
        }
        
    }
})();
if (!window.VETHOME) { window.VETHOME = {}; }
if (!VETHOME.VirpRegistrant) { VETHOME.VirpRegistrant = {}; }

VETHOME.VirpRegistrant.Functions = (function () {
    return {
        OnLoad: onLoad
    };

    function onLoad(executionContext) {
        CommCare.Shared.GetFormContext(executionContext);
        if (CommCare.Shared.FormContext.ui.getFormType() == CommCare.Shared.Constants.CREATE_FORM) {
            return;
        }
        else {
            handleUnattended();
        }
    }

    function handleUnattended() {
        checkForExistingContact().then(function (matches) {
            if (!matches) {
                executeUnattendedSearch();
            }
            else {
                console.log("Registrant already matches contact, no unatt")
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    function checkForExistingContact() {
        return new Promise(function (resolve, reject) {
            var id = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
            Xrm.WebApi.online.retrieveMultipleRecords("contact", "?$filter=_mcs_vethomevirpregistrant_value eq " + id).then(
                function success(results) {
                    for (var i = 0; i < results.entities.length; i++) {
                        resolve(true);
                        //var contactid = results.entities[i]["contactid"];
                    }
                    resolve(false);
                },
                function (error) {
                    reject(error);
                    //Xrm.Utility.alertDialog(error.message);
                }
            );
        });
    }

    function executeUnattendedSearch() {
        var edipi = CommCare.Shared.GetFieldValue("mcs_edipi");
        var req = buildActionInput(edipi);
        CommCare.Shared.FormContext.ui.setFormNotification("Running Unattended Search", "INFO", "UnattendedProcessing");
        Xrm.WebApi.online.execute(req).then(function (result) {
            CommCare.Shared.FormContext.ui.clearFormNotification("UnattendedProcessing");
            if (result.ok) {
                //var data = JSON.parse(result.responseText);
                //CommCare.Shared.SetFieldValue()
                console.log("success");
            }
            else
                CommCare.Shared.FormContext.ui.setFormNotification("failure with processing: " + e.message, "ERROR", "UnattendedProcessingFailed");
        },
            function (e) {
                CommCare.Shared.FormContext.ui.clearFormNotification("UnattendedProcessing");
                CommCare.Shared.FormContext.ui.setFormNotification("failure with processing: " + e.message, "ERROR", "UnattendedProcessingFailed");
                console.error(e);
            }

        ).catch(function (err) {

        });
    }

    function buildActionInput(edipi, id) {
        var parameters = {};
        parameters.Edipi = edipi;
        var registrant = {};
        registrant.mcs_vethomevirpregistrantid = id; //Delete if creating new record
        registrant["@odata.type"] = "Microsoft.Dynamics.CRM.mcs_vethomevirpregistrant";
        parameters.Registrant = registrant;

        var mcs_MVISearchUnattendedRequest = {
            Edipi: parameters.Edipi,
            Registrant: parameters.Registrant,

            getMetadata: function () {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        "Edipi": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        },
                        "Registrant": {
                            "typeName": "mscrm.crmbaseentity",
                            "structuralProperty": 5
                        }
                    },
                    operationType: 0,
                    operationName: "mcs_MVISearchUnattended"
                };
            }
        };

        return mcs_MVISearchUnattendedRequest;
    }

})();
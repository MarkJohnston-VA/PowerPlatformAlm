if (!window.VETHOME) { window.VETHOME = {}; }
if (!VETHOME.Task) { VETHOME.Task = {}; }
if (!VETHOME.Task.Constants) { VETHOME.Task.Constants = {}; }

VETHOME.Task.Constants = {
    CREATE_FORM: 1,
    UPDATE_FORM: 2,
    READ_ONLY_FORM: 3
};

VETHOME.Task.Functions = (function () {
    return {
        OnLoad: onLoad,
        OnSave: onSave,
        controlResolution: controlResolution
    };

    //OnLoad
    function onLoad(executionContext) {
    var formContext = executionContext.getFormContext(); 
        CommCare.Shared.GetFormContext(executionContext);
        setOnChanges(executionContext);
        controlResolution();
        
        if (formContext.ui.getFormType() !== VETHOME.Task.Constants.CREATE_FORM) {        
             VETHOME.Sensitive.Functions.CheckForVetSensitivity();
        }
    }

    //onChange
    function setOnChanges(executionContext) {
        CommCare.Shared.SetOnChange("mcs_resolutionid", function () { controlResolution() });        
        CommCare.Shared.SetOnChange("mcs_vethometasktypeid", function () { validateProviderVhApptOnCase() })
    }

    //OnSave
    function onSave(executionContext) {
        //        
    }

})();

//Validation for creating Task through Case
function validateProviderVhApptOnCase() {
    const caseId = CommCare.Shared.GetFieldValue("mcs_case");
    const taskType = CommCare.Shared.GetFieldValue("mcs_vethometasktypeid");
    if (taskType && taskType[0].name == "Write Follow-Up Letter") {
        Xrm.WebApi.online.retrieveRecord("mcs_vethomecase", caseId[0].id, "?$select=_mcs_vethomeprovider_value,mcs_appointmentscheduledintmp").then(
            function success(result) {
                const fields = [];
                if (!result["_mcs_vethomeprovider_value"]) {
                    fields.push("VET-HOME Provider");
                }
                if (!result["mcs_appointmentscheduledintmp"]) {
                    fields.push("Appointment Scheduled in TMP");
                }
                if (fields.length > 0) {
                    let alertText = "Please set the following field(s) on the VET-HOME Case before setting this VET-HOME Task Type:";
                    for (let i = 0; i < fields.length; i++) {
                        alertText += "\n• " + fields[i];
                    }
                    const alertStrings = { text: alertText, title: "Validation Error" };
                    const alertOptions = { height: 220, width: 320 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                        function success(result) {
                            CommCare.Shared.SetFieldValue("mcs_vethometasktypeid", null);
                        },
                        function error(error) {
                            console.log("Error in closing dialog", error);
                        }
                    );
                }
            },
            function error(error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

//Control Resolution Description
function controlResolution() {
    const resolution = CommCare.Shared.GetFieldValue("mcs_resolutionid");
    if (resolution) {
        CommCare.Shared.SetVisible("mcs_resolutiondescription", true);
        CommCare.Shared.SetRequired("mcs_resolutiondescription", "required");
    }
    else {
        CommCare.Shared.SetVisible("mcs_resolutiondescription", false);
        CommCare.Shared.SetRequired("mcs_resolutiondescription", "none");
        CommCare.Shared.SetFieldValue("mcs_resolutiondescription", null);
    }
}
VETHOME_Interaction_MviLoaded = false;

if (typeof VETHOME == 'undefined') { VETHOME = { __namespace: true }; }
if (typeof VETHOME.Interaction == 'undefined') { VETHOME.Interaction = { __namespace: true }; }

VETHOME.Interaction = function () {
    onVetSearchFocus = function (executionContext) {
        if (!VETHOME_Interaction_MviLoaded) {
            VETHOME_Interaction_MviLoaded = true;
            setupChildContext("WebResource_MviSearch", executionContext.getFormContext());
        }
    },

    setupChildContext = function(controlName, formContext) {

        var wrControl = formContext.ui.controls.get(controlName);
        if (wrControl) {
            wrControl.getContentWindow().then(
                function (contentWindow) {
                    contentWindow.setClientApiContext(Xrm, formContext);
                },
                function (failure) {
                    Xrm.Utility.alertDialog(failure);
                }
            )
        }
    }

    return {
        OnVetSearchFocus: onVetSearchFocus
    };
}()


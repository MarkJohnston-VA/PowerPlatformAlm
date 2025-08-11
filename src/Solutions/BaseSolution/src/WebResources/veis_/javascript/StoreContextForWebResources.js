"use strict";

// This function is used in conjuction with the web resources as a way to access the Dynamics contexts
function StoreContext(executionContext) {
    window.parent.ExecutionContext = executionContext;
    window.parent.GlobalContext = Xrm.Utility.getGlobalContext();
}

// This function is used to directly load the web resource
function LoadWebResource(executionContext, controlName) {
    var formContext = executionContext.getFormContext();
    var webResource = formContext.getControl(controlName);
    if (webResource) {
        webResource.getContentWindow().then(
            function (contentWindow) {
                contentWindow.RenderControlWithContext(Xrm.Utility.getGlobalContext(), executionContext);
            });
    }
}
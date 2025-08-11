function CallDebugger(context) {
    debugger;
}

function CheckDirty(context) {
    var chk = Xrm.Page.data.entity.getIsDirty();
    return chk.toString();
}

function SwitchForm(context, formName) {

    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    if (currentForm != null) {
        if (currentForm.getLabel().toLowerCase() != formName.toLowerCase()) {
            var availableForms = Xrm.Page.ui.formSelector.items.get();
            for (var i in availableForms) {
                var form = availableForms[i];
                if (form.getLabel().toLowerCase() == formName.toLowerCase()) {
                    form.navigate();
                }
            }
        }
    }
}

function ExecuteCommand(context, commandid) {
    if (window.top.document.getElementById(commandid) == null ||
     (window.top.document.getElementById(commandid).parentElement.id == "moreCommandsList"
      && window.top.document.getElementById(commandid).parentElement.parentElement.parentElement.style.display == "none")) {
        window.top.document.getElementById("moreCommands").getElementsByTagName("A")[0].click();
    }
    window.top.document.getElementById(commandid).getElementsByTagName("A")[0].click();
}

function SetSubmitModeNever(context) {
    // After successful save, ensure all fields are set to SubmitMode=never, else fields will show as dirty
    Xrm.Page.data.entity.attributes.forEach(function (control, i) {
        control.setSubmitMode("never");
    });
}

function RefreshClaims(context) {
    Xrm.Page.getControl("Claims").refresh();
}

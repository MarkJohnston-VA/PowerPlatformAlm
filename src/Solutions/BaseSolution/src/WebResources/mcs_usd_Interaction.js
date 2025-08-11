function PopulateCTIValues(context, inputSSN, inputDOB, inputANI, inputDNIS) {
    try {
        var webres = Xrm.Page.ui.controls.get("WebResource_ccwf_mvisearch").getObject().contentWindow.document;
        var wrSSN = webres.getElementById("SocialSecurityTextBox");
        var wrDOB_M = webres.getElementById("BirthMonthTextBox");
        var wrDOB_D = webres.getElementById("BirthDayTextBox");
        var wrDOB_Y = webres.getElementById("BirthYearTextBox");

        wrSSN.value = inputSSN;
        wrDOB_Y.value = inputDOB.substring(0, 4);
        wrDOB_M.value = inputDOB.substring(4, 6);
        wrDOB_D.value = inputDOB.substring(6, 8);

    }
    catch (err) {
        alert(err.message);
    }

}

function USDTabName(context) {
    if (Xrm.Page.getAttribute("mcs_usdtabname") != null) {
        Xrm.Page.getAttribute("mcs_usdtabname").setValue("");
    }
}

function Tab2Expanded(context) {
    Xrm.Page.ui.tabs.get("tab_2").setDisplayState('expanded');
}

function ExecuteCommand(context, commandid) {
    if (window.top.document.getElementById(commandid) == null ||
     (window.top.document.getElementById(commandid).parentElement.id == "moreCommandsList"
      && window.top.document.getElementById(commandid).parentElement.parentElement.parentElement.style.display == "none")) {
        window.top.document.getElementById("moreCommands").getElementsByTagName("A")[0].click();
    }
    window.top.document.getElementById(commandid).getElementsByTagName("A")[0].click();
}

function RefreshInteraction(context) {
    Xrm.Page.data.refresh();
}


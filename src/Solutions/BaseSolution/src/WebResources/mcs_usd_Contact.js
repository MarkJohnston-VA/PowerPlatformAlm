function ExecuteCommand(context, commandid) {
    if (window.top.document.getElementById(commandid) == null ||
     (window.top.document.getElementById(commandid).parentElement.id == "moreCommandsList"
      && window.top.document.getElementById(commandid).parentElement.parentElement.parentElement.style.display == "none")) {
        window.top.document.getElementById("moreCommands").getElementsByTagName("A")[0].click();
    }
    window.top.document.getElementById(commandid).getElementsByTagName("A")[0].click();
}

function SetLastName(context, LastName) {
    Xrm.Page.getAttribute("lastname").setValue("");
}

function SaveContact(context) {
    Xrm.Page.data.entity.save();
}

function setCaregiverFields(context, CaregiverSSN, FirstName, LastName, DOB) {
    if (CaregiverSSN != "")
        Xrm.Page.getAttribute("hac_ssn").setValue(CaregiverSSN);
    if (FirstName != "")
        Xrm.Page.getAttribute("firstname").setValue(FirstName);
    if (LastName != "")
        Xrm.Page.getAttribute("lastname").setValue(LastName);
    if (DOB != "")
        Xrm.Page.getAttribute("birthdate").setValue(new Date(DOB));
}

function searchTypeVisibility(context, SearchType) {
    // Change what fields/tabs are visible based off the search type and form type.
    try {
        if ((SearchType == "Caregiver")) {

            Xrm.Page.ui.tabs.get("SUMMARY_TAB").setVisible(true);

            //Xrm.Page.ui.tabs.get("Contact_Information").setVisible(false); removing due to the tab no longer existing
            Xrm.Page.ui.tabs.get("Eligibility_Information").setVisible(false);
            Xrm.Page.ui.tabs.get("OhiTab").setVisible(false);
            Xrm.Page.ui.tabs.get("ClaimTab").setVisible(false);
            Xrm.Page.ui.tabs.get("TrueDatesTab").setVisible(false);

            Xrm.Page.getControl("hac_ssn").setDisabled(false);
            Xrm.Page.getControl("firstname").setDisabled(false);
            Xrm.Page.getControl("middlename").setDisabled(false);
            Xrm.Page.getControl("lastname").setDisabled(false);
            Xrm.Page.getControl("birthdate").setDisabled(false);

            Xrm.Page.getControl("firstname").setVisible(true);
            Xrm.Page.getControl("middlename").setVisible(false);
            Xrm.Page.getControl("lastname").setVisible(true);
            Xrm.Page.getControl("birthdate").setVisible(true);

            Xrm.Page.getControl("hac_sponsorname").setVisible(false);
            Xrm.Page.getControl("hac_dateofdeath").setVisible(false);
            Xrm.Page.getControl("hac_gender").setVisible(false);
            Xrm.Page.getControl("hac_relationshiptosponsor").setVisible(false);

            if (Xrm.Page.ui.tabs.get("SUMMARY_TAB").getDisplayState() == "collapsed")
                Xrm.Page.ui.controls.get("firstname").setFocus();
        }
    }
    catch (e) {
        alert(e.message + ".  Please contact your supervisor.");
    }
}

function fixPopulateDataforSaveEvent() {
    setTimeout("callOldSavedEvent();", 2000);
}
function callOldSavedEvent() {
    if (Xrm.Page.data.entity.getId() == "") {
        setTimeout("callOldSavedEvent();", 1000);
        return; // only load new data if it's actually new
    }
    var data = top.getClassicData();
    top.USDFORMDATA = data;
    window.open('http://event/?eventname=usddataload&saveeventfired=true');
    setTimeout("fireSavedEvent();", 500);  // have to do a delay because of a bug in USD
}
function fireSavedEvent() {
    window.open("http://event/?eventname=Saved"); // notify USD of save
}

function ContactAddOnSave(context) {
    Xrm.Page.data.entity.addOnSave(fixPopulateDataforSaveEvent);
}

function RefreshGrids(context) {
    var subgrid = Xrm.Page.ui.controls.get("Cases");
    var subgrid2 = Xrm.Page.ui.controls.get("PhoneCalls");
    subgrid2.refresh();
    subgrid.refresh();
}

function SwitchForm(formName) {

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

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

function callAddOnSave() {
    Xrm.Page.data.entity.addOnSave(fixPopulateDataforSaveEvent);
}

function SaveAccount() {
    Xrm.Page.data.entity.save();
}
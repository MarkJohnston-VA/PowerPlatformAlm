
function setSubmitModeOnNTNV(context) {
    Xrm.Page.data.entity.attributes.forEach(function (control, i) {
        control.setSubmitMode("never");
    });
}

function setSubmitModeOnNTSV(context) {
    Xrm.Page.data.entity.attributes.forEach(function (control, i) {
        control.setSubmitMode("never");
    });
}

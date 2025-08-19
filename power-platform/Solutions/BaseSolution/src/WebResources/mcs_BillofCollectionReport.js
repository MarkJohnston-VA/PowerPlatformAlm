/// <reference path="Common\CommCareShared.min.js"/>

function OnLoad(context) {
    CommCare.Shared.GetFormContext(context);
    //CommCare.Shared.HashHandler();
    CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_mcs_BillofCollectionReport");
}

function DisplayReport(rpt) {
    console.log("display report start");
    try {
        if (rpt) {
            var divRpt = document.createElement("DIV");
            var divRptText = document.createTextNode(rpt);
            var formattedRpt = rpt;
            formattedRpt = formattedRpt.split("\n").join("<br/>");
            formattedRpt = formattedRpt.split(" ").join("&nbsp;");
            divRpt.innerHTML = formattedRpt;
            document.getElementById("divReport").appendChild(divRpt);
        }
    }
    catch (err) {
        var source = "DisplayRpt:userid="// + Xrm.Utility.getGlobalContext().userSettings.userId;
    }
}
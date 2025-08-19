if (typeof (patient) == "undefined") { patient = {}; }
// Create Namespace container for functions in this library;
patient.visits = {};
patient.visits.FORM_TYPE_CREATE = 1;
patient.visits.FORM_TYPE_UPDATE = 2;
patient.visits.FORM_TYPE_READ_ONLY = 3;
patient.visits.FORM_TYPE_DISABLED = 4;
patient.visits.filter = "";
patient.visits.formContext;

patient.visits.FilterVisits = function (executionContext) {
   
    var formContext = executionContext.getFormContext();
    patient.visits.formContext = formContext;

    var icn = formContext.getAttribute("mcs_icn").getValue();
    patient.visits.getSiteInfo(icn);

       
};
patient.visits.getSiteInfo = function (icn) {

    // receiving ICN (not full patientIdentifier) e.g. 1012587220V891111, no additional parsing necessary
    console.log("Making second call to MVI for correlated values.");
    if (icn != null && icn.length > 0) {
        //var filter = "&select=*&$filter=crme_ICN eq '" + icn + "' and crme_SearchType eq 'SelectedPersonSearch'";
        //SDK.REST.retrieveMultipleRecords("crme_person", filter, personRetrieveCallbackVAMC, function (error) { alert(error.message); }, function () { });
        var columns = "crme_patientid, crme_siteid"
        var filter = "$filter=";
        filter += buildQueryFilter("crme_icn", icn, false);
        filter += buildQueryFilter("crme_searchtype", "SelectedPersonSearch", true);

        CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("crme_persons", columns, filter).then(function (results) {
            console.log("crme_persons successfully retrieved:");
            patient.visits.personRetrieveCallbackMVI(results.value);
        }).catch(function (error) {
            console.log("Error retrieving record: " + error.message);
            console.log(error);
            handleMviError();
        });

    }
    console.log("done with MVI");
    return false;
};

patient.visits.personRetrieveCallbackMVI = function (data) {

    //loop through results and populate global _siteIds array
    _siteIds = [];

    for (var i = 0; i < data.length; i++) {
        var idObj = { patientid: data[i].crme_patientid, siteid: data[i].crme_siteid }
        if (data[i].crme_siteid.length == 3 && !isNaN(data[i].crme_siteid)) {
            //Add the Facility
            _siteIds[_siteIds.length] = idObj;
        }
    }
    patient.visits.getFilter();
};

patient.visits.getFilter = function () {
    //debugger;
    var filter = "<filter type='or'>";
    for (var i = 0; i < _siteIds.length; ++i) {
        var facilityNumber = _siteIds[i].siteid;
        filter += "<condition attribute='bah_stationsuffix_text' operator='eq' value='" + facilityNumber + "' />";

    }
    var visitSG = patient.visits.formContext.getControl("visits");
    filter +="</filter > ";

    visitSG.setFilterXml(filter);
    visitSG.refresh();
    console.log(visitSG.getFetchXml());
    console.log(visitSG.getViewSelector().getCurrentView());



};




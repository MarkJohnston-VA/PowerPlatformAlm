if (typeof (HDRCerner) == "undefined") { HDRCerner = {}; }
if (typeof (HDRCerner.MedCharts) == "undefined") { HDRCerner.MedCharts = {}; }
if (typeof (HDRCerner.MedChartsRibbon) == "undefined") { HDRCerner.MedChartsRibbon = {}; }
// Create Namespace container for functions in this library;

HDRCerner.MedCharts.OnLoad = function (executioncontext) {

    var formContext = executioncontext.getFormContext();
    formContext.ui.headerSection.setCommandBarVisible(false);
    formContext.ui.headerSection.setBodyVisible(false);
    formContext.ui.footerSection.setVisible(false);
    var tabToShow = formContext.ui.tabs.get("Labs");
    var globalContext = Xrm.Utility.getGlobalContext();
    globalContext.getCurrentAppProperties().then(
        function success(app) {
            if (app.displayName == 'VET-HOME') {
                tabToShow = formContext.ui.tabs.get("Labs");
                if (tabToShow != null) {
                    tabToShow.setVisible(true);
                    tabToShow.setFocus();
                    var sectionToShow = tabToShow.sections.get("labgrid");
                    if (sectionToShow != null) {
                        sectionToShow.setVisible(true);
                    }
                }
                tabToShow = formContext.ui.tabs.get("Imaging");
                if (tabToShow != null) {
                    tabToShow.setVisible(true);
                }
               
            }
            else {
                tabToShow = formContext.ui.tabs.get("tab_consults");
                if (tabToShow != null) {
                    tabToShow.setVisible(true);
                    var sectionToShow = tabToShow.sections.get("consultsection");
                    if (sectionToShow != null) {
                        sectionToShow.setVisible(true);
                    }
                }
            }
        }, function errorCallback() { console.log("Error"); });

    var filters = [
        ["mcs_imagingstartdate", "mcs_imageradiology"],
        ["mcs_imagingenddate", "mcs_imageradiology"],
        ["mcs_labsstartdate", "mcs_lab"],
        ["mcs_labsenddate", "mcs_lab"],
        ["mcs_consultstartdate", "mcs_consult"],
        ["mcs_consultenddate", "mcs_consult"],
        ["mcs_notesstartdate", "mcs_note"],
        ["mcs_notesenddate", "mcs_note"],
        ["mcs_orderstartdate", "mcs_order"],
        ["mcs_orderenddate", "mcs_order"],
        ["mcs_apptsstartdate", "mcs_appointment"],
        ["mcs_apptsenddate", "mcs_appointment"],
        ["mcs_postingsstartdate", "mcs_posting"],
        ["mcs_postingsenddate", "mcs_posting"],
    ];
    var otherGrids = [
        ["notes", "mcs_notecount"],
        ["orders", "mcs_ordercount"],
        ["appts", "mcs_appointmentcount"],
        ["postings", "mcs_postingcount"],
        ["consult", "mcs_consultcount"],
        ["labs", "mcs_labcount"],
        ["imaging", "mcs_imageradiologycount"]
    ];

    for (var i = 0; i < filters.length; i++) {
        HDRCerner.MedCharts.SetupFilters(executioncontext, filters[i][0], filters[i][1]);
    }
    for (var j = 0; j < otherGrids.length; j++) {
        HDRCerner.MedCharts.GetGridCounters(executioncontext, otherGrids[j][0], otherGrids[j][1]);
    }
};

HDRCerner.MedCharts.SetIFrame = function (executioncontext, iFrameName, entityName) {
    var formContext = executioncontext.getFormContext();
    var IFRAME = formContext.getControl(iFrameName);
    var entityId = formContext.data.entity.getId();

    var recordId = entityId.substring(1, 37);
    var baseUrl = Xrm.Utility.getGlobalContext().getClientUrl();
    var newUrl = baseUrl + "/main.aspx?cmdbar=false&navbar=off&forceUCI=0&pagetype=entityrecord&etn=" + entityName + "&id=" + recordId;
    IFRAME.setSrc(newUrl);
};

HDRCerner.MedCharts.GetGridCounters = function (executioncontext, gridName, fieldName) {
    var formContext = executioncontext.getFormContext();
    var gridControl = formContext.getControl(gridName);
    gridControl.addOnLoad(function (context) { HDRCerner.MedCharts.GetGridRefreshInfo(context, gridName, fieldName); });
};

HDRCerner.MedCharts.DateOnChange = function (executioncontext, fieldName, tableName) {
    var formContext = executioncontext.getFormContext();
    var thisDate = formContext.getAttribute(fieldName).getValue();
    VirtualEntities.Filters.findAndDeleteVEdata(executioncontext, fieldName, tableName);

    if (thisDate == null)
        return;

    HDRCerner.MedCharts.CacheDateFilters(executioncontext, fieldName);

    var entityId = formContext.data.entity.getId().toString().substring(1, 37);

    var month = thisDate.getMonth() + 1;
    var dateString = month + "/" + thisDate.getDate() + "/" + thisDate.getFullYear();

    var data = {
        "vte_name": fieldName,
        "vte_value": dateString,
        "vte_entity": tableName,
        "vte_recordid": entityId
    };
    VirtualEntities.Filters.createVEFilterdata(executioncontext, data);
};

HDRCerner.MedCharts.SetupFilters = function (executioncontext, fieldName, tableName) {
    var formContext = executioncontext.getFormContext();

    var key = formContext.data.entity.getId() + "_" + fieldName;
    if (typeof (sessionStorage[key]) !== 'undefined') {
        formContext.getAttribute(fieldName).setValue(new Date(JSON.parse(sessionStorage[key])));
        formContext.getAttribute(fieldName).fireOnChange();
    }
    else
        VirtualEntities.Filters.deleteVEdataGetDefault(executioncontext, fieldName, tableName);

    formContext.getAttribute(fieldName).setSubmitMode("never");
    formContext.getAttribute(fieldName).addOnChange(function () { HDRCerner.MedCharts.DateOnChange(executioncontext, fieldName, tableName); });
};

HDRCerner.MedCharts.GetGridRefreshInfo = function (executioncontext, gridName, fieldName) {
    var formContext = executioncontext.getFormContext();
    var grid = formContext.getControl(gridName).getGrid();
    var totalRecords = grid.getTotalRecordCount();
    var pageNumberString = grid.pageId;
    formContext.getAttribute(fieldName).setValue(totalRecords);
    formContext.getAttribute(fieldName).setSubmitMode("never");
    //grid.addOnRecordSelect(function (context) { HDRCerner.MedChartsRibbon.OpenModalForm(context, "mcs_problem"); });
};

HDRCerner.MedCharts.CacheDateFilters = function (executioncontext, fieldName) {
    var formContext = executioncontext.getFormContext();
    var value = formContext.getAttribute(fieldName).getValue();
    var recordId = formContext.data.entity.getId();
    var key = recordId + "_" + fieldName;
    sessionStorage[key] = JSON.stringify(value);
};

HDRCerner.MedCharts.CreateRecordAccess = function (executioncontext) {
    if (executioncontext.getEventSource().getDisplayState() == 'collapsed')
        return;
    var formContext = executioncontext.getFormContext();
    var chartName = executioncontext.getEventSource().getLabel();

    var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");
    var customerId = formContext.data.entity.getId().replace("{", "").replace("}", "");;

    var data = {
        "HDRCerner_name": "Medical Chart Accessed",
        "HDRCerner_accessed": true,
        "HDRCerner_issensitiveveteran": false,
        "HDRCerner_flagsacknowledged": false,
        "HDRCerner_recordaccessed": chartName,	// Name of Chart
        "HDRCerner_AccessingUser@odata.bind": "/systemusers(" + userId + ")",
        "HDRCerner_veteran@odata.bind": "/contacts(" + customerId + ")",
        "HDRCerner_application": 100000000
    };

    window.Xrm.WebApi.createRecord("HDRCerner_recordaccess", data)
        .then(function success(result) {

        }, function (error) {
            console.log(error.message);
        }
        );

}
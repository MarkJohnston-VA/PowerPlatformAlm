/// <reference path="Common/CommCareShared.min.js"/>

var _selectedLOB = [];
var _selectedTeam = [];
var _tabs = new Array();
var _currentLob = null;

function onLoad() {
    console.log("Load");
    hideTabs();
    getLOBS();
}

function validateSelection() {
    var isValid = false;
    if (_selectedLOB.length == 0) {
        $("#lobDropDown").removeClass();
        $("#lobDropDown").addClass("btn btn-danger dropdown-toggle");
    }
    else if (_selectedLOB[1] == "OCC FM" && _selectedTeam.length == 0) {
        $("#teamDropDown").removeClass();
        $("#teamDropDown").addClass("btn btn-danger dropdown-toggle");
    }
    else {
        isValid = true;
        $("#teamDropDown").removeClass();
        $("#teamDropDown").addClass("btn btn-primary dropdown-toggle");
        $("#lobDropDown").removeClass();
        $("#lobDropDown").addClass("btn btn-primary dropdown-toggle");
    }
    return isValid;
}

function selectedItem(id, listRef) {
    var splitId = id.split("|")
    var selectedName = splitId[1];
    var selectedId = splitId[0];
    var tableName = listRef == 0 ? "lobDropDown" : "teamDropDown"

    $("#" + tableName).html(selectedName);
    if (listRef == 0 && selectedName == "OCC FM") {
        $("#TeamsSelector").css("visibility", "visible");
        $("tmpDialog").css("visibility", "visible");
        getTeams();
    }
    else if (listRef == 0) {
        $("#TeamsSelector").css("visibility", "hidden");
        $("tmpDialog").css("visibility", "hidden");
    }

    if (listRef == 0) {
        _selectedLOB = [selectedId, selectedName]
    }
    else if (listRef == 1) {
        _selectedTeam = [selectedId, selectedName];
    }
}

function submitLobTeam() {
    if (!validateSelection()) return;

    var lookupValue = new Array();
    lookupValue[0] = new Object();
    lookupValue[0].id = _selectedLOB[0];
    lookupValue[0].name = _selectedLOB[1];
    lookupValue[0].entityType = "hrc_lob";

    CommCare.Shared.SetFieldValue("hrc_lobid", lookupValue);

    if (_selectedTeam.length != 0 && _selectedLOB[1] == "OCC FM") {
        var team = new Array();
        team[0] = new Object();
        team[0].id = _selectedTeam[0];
        team[0].name = _selectedTeam[1];
        team[0].entityType = "team";
        CommCare.Shared.SetFieldValue("hac_teamid", team);
    }

    defaultProgramType();
    defaultTypeByProgram();

    showTabs();
    CommCare.Shared.finishSave(_selectedLOB[1], null, _selectedTeam[1]);
}

function defaultProgramType() {
    var lobName = _selectedLOB[1];

    if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
        defaultProgramTypeToNonVA();
    }
    else {
        defaultProgramTypeToCSC();
    }
}

function defaultProgramTypeToCSC() {
    var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    console.log("*** ", fName);
    var programType = CommCare.Shared.GetFieldValue("bah_programtypeid");
    var programTypeId = CommCare.Shared.GetCleanId(programType)
    var programTypeName = getLookupName(programType);
    //if (programType == null || programTypeName == "C6" || programTypeName == "C3" || programTypeName == "Non-VA" || programTypeName == "DO Hub") {
    if (programTypeId == null
        || programTypeId == CommCare.Shared.Constants.PROGRAM_TYPE_C6
        || programTypeId == CommCare.Shared.Constants.PROGRAM_TYPE_C3
        || programTypeId == CommCare.Shared.Constants.PROGRAM_TYPE_NONVA
        || programTypeId == CommCare.Shared.Constants.PROGRAM_TYPE_DOHUB
    ) {
        //construct object to pass into SetFieldValue
        var lookupValue = new Array();
        lookupValue[0] = new Object();
        lookupValue[0].id = CommCare.Shared.Constants.PROGRAM_TYPE_CSC;
        lookupValue[0].name = "CSC";
        lookupValue[0].entityType = "bah_program";

        CommCare.Shared.SetFieldValue("bah_programtypeid", lookupValue);
    }
}

function defaultProgramTypeToNonVA() {
    var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    console.log("*** ", fName);
    var programType = CommCare.Shared.GetFieldValue("bah_programtypeid");
    var programTypeName = getLookupName(programType);
    if (programType == null || programTypeName == "CSC") {
        //construct object to pass into SetFieldValue
        var lookupValue = new Array();
        lookupValue[0] = new Object();
        lookupValue[0].id = CommCare.Shared.Constants.PROGRAM_TYPE_NONVA;
        lookupValue[0].name = "Non-VA";
        lookupValue[0].entityType = "bah_program";

        CommCare.Shared.SetFieldValue("bah_programtypeid", lookupValue);
    }

}

function defaultTypeByProgram() {
    var lobName = _selectedLOB[1];

    if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
        setTypeByProgramC4();
    }
    else {
        setTypeByProgramFM();
    }
}

function setTypeByProgramFM() {
    var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    console.log("*** ", fName);
    var programType = CommCare.Shared.GetFieldValue("bah_programtypeid");
    if (programType != null) {
        //construct object to pass into SetFieldValue
        var lookupName = "";
        var lookupId = "";
        var lookupValue = new Array();
        lookupValue[0] = new Object();
        switch (programType[0].name) {
            case "FMP":
                lookupId = CommCare.Shared.Constants.TYPE_INTERSECTION_FMP;
                lookupName = " FMP";
                break;
            default:
                lookupId = CommCare.Shared.Constants.TYPE_INTERSECTION_CSC;
                lookupName = " CSC";
        }
        lookupValue[0].id = lookupId;
        lookupValue[0].name = lookupName;
        lookupValue[0].entityType = "vhacrm_typeintersection";

        CommCare.Shared.SetFieldValue("vhacrm_typeintersectionid", lookupValue);
    }
}

function setTypeByProgramC4() {
    var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    console.log("*** ", fName);
    var programType = CommCare.Shared.GetFieldValue("bah_programtypeid");
    if (programType != null) {
        //construct object to pass into SetFieldValue
        var lookupName = "";
        var lookupId = "";
        var lookupValue = new Array();
        lookupValue[0] = new Object();
        switch (programType[0].name) {
            case "Help Desk":
                lookupId = CommCare.Shared.Constants.TYPE_INTERSECTION_HELPDESK;
                lookupName = "CVHD Program";
                break;
            case "C6":
                lookupId = CommCare.Shared.Constants.TYPE_INTERSECTION_C6;
                lookupName = "C6";
                break;
            case CommCare.Shared.Constants.C3Name:
                lookupId = CommCare.Shared.Constants.TYPE_INTERSECTION_C3;
                lookupName = CommCare.Shared.Constants.C3Name;
                break;
            default:
                lookupId = CommCare.Shared.Constants.TYPE_INTERSECTION_COMMCARE;
                lookupName = "Community Care";
                break;
        }
        lookupValue[0].id = lookupId;
        lookupValue[0].name = lookupName;
        lookupValue[0].entityType = "vhacrm_typeintersection";

        CommCare.Shared.SetFieldValue("vhacrm_typeintersectionid", lookupValue);
    }
}

function getLookupName(lookup) {
    var lookupName = lookup != null ? CommCare.Shared.DialogNameReturn(lookup[0].name) : null;
    return lookupName;
}

function getLOBS() {
    _currentLob = CommCare.Shared.GetFieldValue("hrc_lobid");
    if (_currentLob != null) {
        var lob = {
            hrc_lobid: _currentLob[0].id,
            hrc_name: _currentLob[0].name
        }
        buildRow(lob, 0, "lobMenu");
        $("#lobDropDown").html(_currentLob[0].name);
        selectedItem(_currentLob[0].id + "|" + _currentLob[0].name, 0);
    }
    else {
        var fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' > \
                        <entity name='hrc_lob' > \
                        <attribute name='hrc_lobid' /> \
                        <attribute name='hrc_name' /> \
                        <attribute name='vhacrm_interactionformid' /> \
                        <order attribute='hrc_name' descending='false' /> \
                        <link-entity name='vhacrm_hrc_lob_systemuser' from='hrc_lobid' to='hrc_lobid' visible='false' intersect='true' > \
                            <link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='ae' > \
                            <attribute name='positionid' alias='PositionId' /> \
                            <attribute name='positionidname' alias='PositionName' /> \
                            <filter type='and' > \
                                <condition attribute='systemuserid' operator='eq-userid' /> \
                            </filter> \
                            <link-entity name='teammembership' from='systemuserid' to='systemuserid' link-type='outer' > \
                                <attribute name='teamid' alias='teamID' /> \
                                <filter> \
                                <condition attribute='teamid' operator='eq' value='64086c6d-b457-e911-a96f-001dd800a749' /> \
                                </filter> \
                            </link-entity> \
                            </link-entity> \
                        </link-entity> \
                        </entity> \
                    </fetch>"
        CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
        CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("hrc_lobs", fetchXML).then(function (userLobs) {
            assembleData(userLobs, "lobMenu");
        }).catch(function (error) {
            console.log("Error in Getting current users LOBs: " + error.message);
        });
    }
}

function getTeams() {
    var departmentTeamFetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'> \
                                          <entity name='team'> \
                                            <attribute name='name' /> \
                                            <attribute name='businessunitid' /> \
                                            <attribute name='teamid' /> \
                                            <attribute name='teamtype' /> \
                                            <order attribute='name' descending='false' /> \
                                            <filter type='and'> \
                                              <condition attribute='vhacrm_commcareteamtype' operator='eq' value='713770000' /> \
                                            </filter> \
                                            <link-entity name='teammembership' from='teamid' to='teamid' visible='false' intersect='true'> \
                                              <link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='ab'> \
                                                <filter type='and'> \
                                                  <condition attribute='systemuserid' operator='eq-userid' /> \
                                                </filter> \
                                              </link-entity> \
                                            </link-entity> \
                                          </entity> \
                                        </fetch>";

    CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
    CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("teams", departmentTeamFetch).then(function (results) {
        if (results.value.length == 1) {
            var team = {
                teamid: results.value[0]["teamid"],
                name: results.value[0]["name"]
            }
            buildRow(team, 0, "teamMenu");
            $("#teamDropDown").html(team.name);
            selectedItem(team.teamid + "|" + team.name, 1);
        }
        else {
            $("#teamMenu").remove();
            $("#teamParent").append("<ul class='dropdown-menu' id='teamMenu' style='width: 500px'></ul>");
            assembleData(results, "teamMenu");
        }
    });
}

function assembleData(data, tableName) {
    //console.log(results);
    for (var i = 0; i < data.value.length; i++) {
        buildRow(data.value[i], i, tableName);
    }
    $("#tmpDialog").css("visibility", "hidden");
}

function buildRow(data, i, tableName) {
    var id = tableName == "lobMenu" ? "hrc_lobid" : "teamid";
    var name = tableName == "lobMenu" ? "hrc_name" : "name";

    var optionHtml = "";
    if (tableName == "lobMenu") {
        optionHtml = "<li><a onclick='selectedItem(this.id, 0)' href='javascript:void(0);' id='" + data[id] + "|" + data[name] + "'>" + data[name] + "</a></li>";
    }
    else {
        optionHtml = "<li><a onclick='selectedItem(this.id, 1)' href='javascript:void(0);' id='" + data[id] + "|" + data[name] + "'>" + data[name] + "</a></li>";
    }
    $("#" + tableName).append(optionHtml);
}

function hideTabs() {
    if (CommCare.Shared.FormContext.ui.getFormType() == 1) {
        var tabsCollection = CommCare.Shared.FormContext.ui.tabs.get();
        for (var i = 0; i < tabsCollection.length; i++) {
            _tabs[i] = new Object();
            _tabs[i].visible = tabsCollection[i].getVisible();
            _tabs[i].name = tabsCollection[i].name;

            if (tabsCollection[i].name != "LOB_Selector") {
                tabsCollection[i].setVisible(false);
            }
        }
    }
    else {
        console.log("Not the Create Form.  Do Nothing.");
    }

}

function showTabs() {
    for (var i = 0; i < _tabs.length; i++) {
        CommCare.Shared.FormContext.ui.tabs.get(_tabs[i].name).setVisible(_tabs[i].visible);
    }
}
/// <reference path="CommCareShared.min.js"/>

function onLoad() {
    console.log("has form context: " + !!CommCare.Shared.FormContext);
	//restrictSearchParameters();
    //$("#tin").on("change", restrictSearchParameters);
    $("#tmpDialog").show();
    var searchValue = getDataParam();

    if (searchValue != null) {
        searchData(searchValue);
    }
    else {
        $("#tmpDialog").hide();
    }
}

function openRequest(input) {
	var guid = input.replace("btn-", "");

    getAppIdAsync()
	.then(function (appid) {
		return "https://" + window.location.host + "/main.aspx?appid=" + appid + "&pagetype=entityrecord&etn=incident&id=" + guid;
	})
        .then(function (url) {
            window.open(encodeURIComponent(url), '_blank');
	})
	.catch(function err(e) {
		console.error(e);
		alert("There was an error. Check console.");
	});
}

function getAppIdAsync() {
    return Xrm.WebApi.online.retrieveMultipleRecords("appmodule", "?$select=appmoduleid,name,uniquename&$filter=uniquename eq 'mcs_CommCare'").then(
        function success(results) {
            console.log(results);
            if (results.entities.length === 1) {
                return results.entities[0]["appmoduleid"];
            } else {
                return "AppModule not found.";
            }
            
        },
        function (error) {
            console.log(error.message);
            return error.message;
        }
    );
}

function searchRequestsByTin() {
    console.log("Searching Debtors");
    var searchValue = $("#tin").val();
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    searchValue = searchValue === "" ? null : searchValue;
    fromDate = fromDate === "" ? null : fromDate;
    toDate = toDate === "" ? null : toDate;
    clearAll(true);

    if (searchValue != null) {
        $("#tableBody").empty();
        $("#tmpDialog").show();
        var tmpVisible = $("#tmpDialog").is(":visible");
        console.log("Temp Dialog is visible = ", tmpVisible);
        searchData(searchValue, fromDate, toDate);
    }
    else {
        console.log("No search value provided");
    }
}

function searchData(searchValue, fromDate, toDate) {
    //clearAll();
    console.log("in search data");
    var parameters = {};

    if (searchValue != null) {
        $("#tin").val(searchValue);
        parameters.searchValue = searchValue;
        
    }
    if (fromDate !== null) {
    	$("#fromDate").val(fromDate);
    	parameters.fromDate = fromDate;
    }

    if (toDate !== null) {
    	$("#toDate").val(toDate);
    	parameters.toDate = toDate;
    }

    //if (searchValue === null && fromDate === null && toDate === null) {
    if (searchValue === null) {
    	$("#tmpDialog").hide();
    	return;
    }

    //callAction(parameters);
    callActionAsync(parameters);
}

function constructDateFilterString(fromDate, toDate) {
	var str = "";
	if (!fromDate && !toDate) {
		return str;
	}

	if (!!fromDate) {
		str += " and createdon ge " + fromDate;
	}

	if (!!toDate) {
		str += " and createdon le " + toDate;
	}

	return str;
}

function callActionAsync(parameters) {
    Xrm.WebApi.online.retrieveMultipleRecords("incident", "?$select=_ccwf_programid_value,createdon,_customerid_value,ccwf_providerfacility_text,_vhacrm_areaintersectionid_value,_vhacrm_subareaintersectionid_value,_vhacrm_resolutionintersectionid_value,_vhacrm_actionintersectionid_value,ticketnumber,_vhacrm_visnid_value,statecode,ccwf_tin_text&$filter=ccwf_tin_text eq '" + parameters.searchValue.trim() + "'" + constructDateFilterString(parameters.fromDate, parameters.toDate) + "&$orderby=createdon desc").then(
        function success(results) {
            console.log(results);
            var resArr = [];
            if (results.entities.length == 0) {
                $("#noContent").show();
                $("#tmpDialog").hide();
                return;
            }
            for (var i = 0; i < results.entities.length; i++) {
                var result = results.entities[i];
                // Columns
                

                var data = {
                    incidentId: result["incidentid"],
                    programId: {
                        display: result["_ccwf_programid_value@OData.Community.Display.V1.FormattedValue"],
                        value: result["_ccwf_programid_value"] === null ? "" : result["_ccwf_programid_value"],
                        logicalName: result["_ccwf_programid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                    },
                    providerFacility: {
                        display: result["ccwf_providerfacility_text"] === null ? "" : result["ccwf_providerfacility_text"]
                    },
                    tin: {
                        display: result["ccwf_tin_text"] === null ? "" : result["ccwf_tin_text"]
                    },
                    createdOn: {
                        display: result["createdon@OData.Community.Display.V1.FormattedValue"],
                        value: new Date(result["createdon"])
                    },
                    customerId: {
                        display: result["_customerid_value@OData.Community.Display.V1.FormattedValue"],
                        value: result["_customerid_value"] === null ? "" : result["_customerid_value"],
                        logicalName: result["_customerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                    },
                    status: {
                        display: result["statecode@OData.Community.Display.V1.FormattedValue"],
                        value: result["statecode"]
                    },
                    requestNumber: {
                        display: result["ticketnumber"],
                        value: result["ticketnumber"] === null ? "" : result["ticketnumber"]
                    },
                    requestAction: {
                        display: result["_vhacrm_actionintersectionid_value@OData.Community.Display.V1.FormattedValue"],
                        value: result["_vhacrm_actionintersectionid_value"] === null ? "" : result["_vhacrm_actionintersectionid_value"],
                        logicalName: result["_vhacrm_actionintersectionid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                    },
                    purpose: {
                        display: result["_vhacrm_areaintersectionid_value@OData.Community.Display.V1.FormattedValue"],
                        value: result["_vhacrm_areaintersectionid_value"] === null ? "" : result["_vhacrm_areaintersectionid_value"],
                        logicalName: result["_vhacrm_areaintersectionid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                    },
                    queueResolution: {
                        display: result["_vhacrm_resolutionintersectionid_value@OData.Community.Display.V1.FormattedValue"],
                        value: result["_vhacrm_resolutionintersectionid_value"] === null ? "" : result["_vhacrm_resolutionintersectionid_value"],
                        logicalName: result["_vhacrm_resolutionintersectionid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                    },
                    purposeDetail: {
                        display: result["_vhacrm_subareaintersectionid_value@OData.Community.Display.V1.FormattedValue"],
                        value: result["_vhacrm_subareaintersectionid_value"] === null ? "" : result["_vhacrm_subareaintersectionid_value"],
                        logicalName: result["_vhacrm_subareaintersectionid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                    },
                    servicingVisn: {
                        display: result["_vhacrm_visnid_value@OData.Community.Display.V1.FormattedValue"],
                        value: result["_vhacrm_visnid_value"] === null ? "" : result["_vhacrm_visnid_value"],
                        logicalName: result["_vhacrm_visnid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                    }
                }
                resArr.push(data);
            }
            assembleData(resArr);
        },
        function (error) {
            console.log(error.message);
        }
    );
}

function onClick(id) {
    console.log("clicked" + id);
}

function getDataParam() {
    var vals = new Array();
    if (location.search != "") {
        vals = location.search.substr(1).split("&");
        for (var i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
        }
        console.log(vals);

        var found = false;
        for (var i in vals) {
            if (vals[i][0].toLowerCase() == "data") {
                retVal = parseDataValue(vals[i][1]);
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("no params");
        }
        else {
            return retVal;
        }
    }
    else {
        console.log("no params in URL - Checking form");
        var entity = CommCare.Shared.FormContext.data.entity.getEntityName();
        console.log(entity);
        if (entity === 'incident' && CommCare.Shared.FormContext != null) {
            var boc = CommCare.Shared.GetFieldValue("hac_boc_text");
            if (boc != null && boc.length == 11) {
                $("#bocSearch").val(boc);
                $("#tin").prop("disabled", true);
            }
        }
        else {
            $("#tmpDialog").hide();
        }
    }
}

function parseDataValue(datavalue) {
    var searchValue;
    if (datavalue != "") {
        var vals = new Array();

        vals = decodeURIComponent(datavalue).split("&");
        for (var i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
        }

        searchValue = vals[0][1];

        return searchValue;
    }
}


function assembleData(results) {
    console.log(results);
    for (var i = 0; i < results.length; i++) {
        buildRow(results[i], i);
    }

    //sortTable(1);
    $("#tmpDialog").hide();
}

function buildRow(data) {
    //var name = data["mcs_name"] == null ? "" : data["mcs_name"].replace(/[^a-zA-Z0-9 ]/g, "");
    //var address = data["mcs_addressline1"] == null ? "" : data["mcs_addressline1"];
    //var city = data["mcs_city"] == null ? "" : data["mcs_city"];
    //var state = data["mcs_state"] == null ? "" : data["mcs_state"];
    //var zip = data["mcs_zipcode"] == null ? "" : data["mcs_zipcode"];
    //var phone = data["mcs_phonenumber"] == null ? "" : data["mcs_phonenumber"];
    //var fms = data["mcs_fmscode"] == null ? "" : data["mcs_fmscode"];
    //var debtorId = data["mcs_debtornumber"] == null ? "" : data["mcs_debtornumber"];

    //var rowID = name + "|" + address + "|" + city + "|" + state + "|" + zip + "|" + phone + "|" + fms + "|" + debtorId;

    var rowHtml = "<tr id='" + data.incidentId + "' class='row' data-group='1'>"
    rowHtml += "<td class='col-1'><button type='button'class='btn btn-default btn-xs' id='btn-" + data.incidentId + "' onclick=openRequest(this.id)>View</button></td>"
    rowHtml += "<td class='col-1'>" + emptyStringify(data.createdOn.display) + "</td>"
    rowHtml += "<td class='col-2'>" + emptyStringify(data.customerId.display) + "</td>"
    rowHtml += "<td class='col-2'>" + emptyStringify(data.requestNumber.display) + "</td>"
    rowHtml += "<td class='col-2'>" + emptyStringify(data.purpose.display) + "</td>"
    rowHtml += "<td class='col-1'>" + emptyStringify(data.purposeDetail.display) + "</td>"
    rowHtml += "<td class='col-1'>" + emptyStringify(data.requestAction.display) + "</td>"
    rowHtml += "<td class='col-1'>" + emptyStringify(data.servicingVisn.display) + "</td>"
    rowHtml += "<td class='col-1'>" + emptyStringify(data.status.display) + "</td>"
    rowHtml += "<td class='col-1'>" + emptyStringify(data.queueResolution.display) + "</td>"
    rowHtml += "</tr>"
    //REMOVE ENCODEURICOMPONENT IF DEPLOYING TO CRM
    //ONLY THERE FOR FORTIFY
    //$("#tableBody").append(encodeURIComponent(rowHtml));
    $("#tableBody").append(rowHtml);
}

function emptyStringify(val) {
	if (val === undefined || val === null) {
		return "";
	}
	return val;
}

function clearAll(fromSearch) {
    if (fromSearch != true || fromSearch == undefined) {
        $(".inputField").val("");
        $(".inputField").prop("disabled", false);
    }
    
    $("#tableBody").empty();
    $("table tr").show();
    //$("#tmpDialog").hide();
    $("#noContent").hide();
    //restrictSearchParameters();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1) ; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function restrictSearchParameters(event) {
    //console.log(event);
    //console.log(event.target.id);

	if ($("#tin").val() === "") {
		$("#fromDate").prop("disabled", true);
		$("#fromDate").val("");

		$("#toDate").prop("disabled", true);
		$("#toDate").val("");
	}
	else {
		$("#fromDate").prop("disabled", false);
		$("#toDate").prop("disabled", false);
	}
}
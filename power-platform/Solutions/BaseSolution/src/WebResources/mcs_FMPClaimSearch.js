/// <reference path="Common/CommCareShared.min.js"/>

var _bfn;
var _dfn;

function onLoad() {
    //hashReadyNotification();

    $(".inputField").on("change", restrictSearchParameters);
    $("#startDate").on("change", filterByDate);
    $("#endDate").on("change", filterByDate);
    $("#tmpDialog").hide();

    var _this = this;
    var paramsArray = getDataParam();
    _dfn = paramsArray.dfn;
    _bfn = paramsArray.bfn;

    //searchData();
}

function hashReadyNotification() {
    window.location.hash = "ReadyXrm";
}

function setClientApiContext(xrm, formContext) {
    window.Xrm = xrm;
    window._formContext = formContext;
    CommCare.Shared.FormContext = formContext;
    console.log("FMP claim search has context");
    initiateApplicationInsights();
    onLoad();
}

function searchData() {
    clearAll();

    if (_dfn == null) _dfn = CommCare.Shared.GetFieldValue("hac_dfn");
    if (_bfn == null) _bfn = CommCare.Shared.GetFieldValue("hac_dfn");

    $("#tmpDialog").show();
    $("#tableBody").remove();
    $("#table").append("<tbody id='tableBody'></tbody>");
    //var filter = getFilter();
    //var pdiString = $("#PDI").val() == "" ? null : $("#PDI").val();
    
    var claimNumber = $("#claimNumber").val() == "" ? null : $("#claimNumber").val();
    var startDate = $("#startDate").val() == "" ? null : $("#startDate").val();
    var endDate = $("#endDate").val() == "" ? null : $("#endDate").val();

    //ENCODED URI FOR HARD CODING PARAMS FOR WEB RESOURCE
    //?data=dfn%3D887787%26bfn%3D1

    //var bfn = '1';
    //var dfn = '887787';  //26 claims
    //var dfn = '489989';  //This guy has around 5300 claims

    console.log(claimNumber, startDate, endDate);

    var parameters = {};
    parameters.startDate = startDate;
    parameters.endDate = endDate;
    parameters.claimNumber = claimNumber;
    parameters.bfn = _bfn;
    parameters.dfn = _dfn;
    console.log(parameters);

    var execute_mcs_FMPClaimSearch_Request = {
        // Parameters
        bfn: _bfn,
        dfn: _dfn,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        claimNumber: claimNumber,

        getMetadata: function () {
            return {
                boundParameter: null,
                parameterTypes: {
                    bfn: { typeName: "Edm.String", structuralProperty: 1 },
                    dfn: { typeName: "Edm.String", structuralProperty: 1 },
                    startDate: { typeName: "Edm.DateTimeOffset", structuralProperty: 1 },
                    endDate: { typeName: "Edm.DateTimeOffset", structuralProperty: 1 },
                    claimNumber: { typeName: "Edm.String", structuralProperty: 1 }
                },
                operationType: 0, operationName: "mcs_FMPClaimSearch"
            };
        }
    };

    callActionAsync(execute_mcs_FMPClaimSearch_Request).then(function (result) {
        if (result.value.length > 0) {
            console.log("Successful FMP Claim Search with Results: ");
            console.log(result);
            assembleData(result);
            $("#tmpDialog").hide();
        }
        else {
            console.log("No results returned");
            $("#tmpDialog").hide();
            $("#noContent").show();
        }
    }).catch(function (error) {
        console.log("Error in Action Call")
        $("#tmpDialog").hide();
        $("#noContent").show();
    });

    //callAction(parameters).then(function (result) {

    //    if (result.value.length > 0) {
    //        console.log("Successful FMP Claim Search with Results: ");
    //        console.log(result);
    //        assembleData(result);
    //        $("#tmpDialog").hide();
    //    }
    //    else {
    //        console.log("No results returned");
    //        $("#tmpDialog").hide();
    //        $("#noContent").show();
    //    }
    //}).catch(function (error) {
    //    console.log("Error in Action Call")
    //    $("#tmpDialog").hide();
    //    $("#noContent").show();
    //});
}

function callActionAsync(parameters) {
    return Xrm.WebApi.online.execute(parameters).then(
        function success(response) {
            if (response.ok) { return response.json(); }
        }
    ).then(function (responseBody) {
        var result = responseBody;
        console.log(result);
        // Return Type: mscrm.mcs_FMPClaimSearchResponse
        // Output Parameters
        var ec = result["ec"]; // Collection(mscrm.crmbaseentity)
        return result;
    }).catch(function (error) {
        console.log(error.message);
    });
}

function callAction(parameters) {
    return new Promise(function (resolve, reject) {
        try {
            var req = new XMLHttpRequest();
            req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/mcs_FMPClaimSearch", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var result = JSON.parse(this.response);

                        //console.log("Successful FMP Claim Search with Results: ");
                        //console.log(result);
                        //assembleData(result);

                        //_returnedClaims = result.value;
                        //$("#tmpDialog").hide();

                        resolve(result)

                    } else {
                        console.log("Error in action call: " + this.statusText);
                        //console.log(JSON.parse(this.response).error.message);
                        $("#tmpDialog").hide();
                        $("#noContent").show();
                    }
                }
            };
        } catch (e) {
            console.log(e);
        }

        req.send(JSON.stringify(parameters));
    });
}

function onClick(id) {
    console.log("clicked" + id);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
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
        console.log("no params");

        var dfn = CommCare.Shared.GetFieldValue("hac_dfn");
        if (dfn == null) { dfn = "null"; }
        var bfn = CommCare.Shared.GetFieldValue("hac_bfn");
        if (bfn == null) { bfn = "null"; }
        return { dfn: dfn, bfn: bfn };
    }
}

function parseDataValue(datavalue) {
    var dfn;
    var bfn;
    if (datavalue != "") {
        var vals = new Array();

        vals = decodeURIComponent(datavalue).split("&");
        for (var i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
        }

        dfn = vals[0][1];
        bfn = vals[1][1];

        return { dfn: dfn, bfn: bfn };
    }
}


function assembleData(results) {
    for (var i = 0; i < results.value.length; i++) {
        buildRow(results.value[i], i);
    }

    //$("#tmpDialog").hide();
}

function buildRow(data) {

    var dos = data["mcs_dateofservice"] != null ? data["mcs_dateofservice"].substring(0, 10) : null;
    var amtPaid = data["mcs_amountpaid"] != null ? data["mcs_amountpaid"].toLocaleString("en-US", {style: "currency", currency: 'USD'}) : "$ 0.00";
    var amtBilled = data["mcs_amountbilled"] != null ? data["mcs_amountbilled"].toLocaleString("en-US", { style: "currency", currency: 'USD' }) : "$ 0.00";
    var checkNumber = data["mcs_checknumber"] != null ? data["mcs_checknumber"] : "";
    var claimNumber = data["mcs_claimnumber"];
    var claimStatus = data["mcs_claimstatus"];
    var claimVendor = data["mcs_vendor"].replace(/[^a-zA-Z0-9 ]/g, "");
    var typeOfService = data["mcs_typeofservice"].replace(/[^a-zA-Z0-9 ]/g, "");
    var checkTotal = data["mcs_checktotal"] != null ? data["mcs_checktotal"] : 0;
    var rowID = claimNumber + "|" + checkNumber + "|" + claimStatus + "|" + claimVendor + "|" + typeOfService + "|" + dos + "|" + data["mcs_amountpaid"] + "|" + data["mcs_amountbilled"] + "|" + checkTotal;

    //var rowHtml = "<tr id='" + data["mcs_claimnumber"] + "' class='row'>"
    var rowHtml = "<tr id='" + data["mcs_claimnumber"] + "' class='row' data-group='1'>"
    rowHtml += "<td class='col-1'><button type='button'class='btn btn-default btn-xs' id='btn-" + rowID + "' onclick=openClaim(this.id)>View</button></td>"
    rowHtml += "<td class='col-1'>" + data["mcs_claimnumber"] + "</td>"
    rowHtml += "<td class='col-2'>" + data["mcs_claimstatus"] + "</td>"
    rowHtml += "<td class='col-2'>" + data["mcs_vendor"] + "</td>"
    rowHtml += "<td class='col-2'>" + data["mcs_typeofservice"] + "</td>"
    rowHtml += "<td class='col-1'>" + dos + "</td>"
    rowHtml += "<td class='col-1'>" + checkNumber + "</td>"
    rowHtml += "<td class='col-1'>" + amtPaid + "</td>"
    rowHtml += "<td class='col-1'>" + amtBilled + "</td>"
    rowHtml += "</tr>"
    $("#tableBody").append(rowHtml);
}

function clearAll() {
    $(".inputField").val("");
    $(".inputField").prop("disabled", false);
    $("table tr").show();
    $("#tmpDialog").hide();
    $("#noContent").hide();
}

function validateDateFormat(date) {
    if (date == null) return null;
    if (date.length != 10) return null;

    var retVal = null;
    var splitter1 = date.substring(2,3);
    var splitter2 = date.substring(5,6);
    var splitter3 = date.substring(4,5);
    var splitter4 = date.substring(7, 8);
    var month;
    var day;
    var year;
    var dateString

    if (splitter3 == "-" && splitter4 == "-") return date;
    if (splitter1 == "/" || splitter4 == "/") {
        month = date.substring(0, 2);
        day = date.substring(3, 5);
        year = date.substring(6, 10);
        dateString = year + "-" + month + "-" + day;
        console.log(dateString);
        return dateString;
    }

    return null;
}

function validateDates(startDate, endDate) {
    console.log(startDate, endDate);
    var startOnlySearch = false;
    var endOnlySearch = false;
    var bothSearch = false;
    var valid = false;

    startDate = (validateDateFormat(startDate));
    endDate = (validateDateFormat(endDate));

    if (startDate != null) {
        if (startDate > "1900-01-01" && startDate < "2100-01-01") {
            startOnlySearch = true;
            valid = true;
        }
    }

    if (endDate != null) {
        if (endDate > "1900-01-01" && endDate < "2100-01-01") {
            endOnlySearch = true;
            valid = true;
        }
    }

    if (startOnlySearch == true && endOnlySearch == true) {
        bothSearch = true;
    }

    return { valid: valid, start: startOnlySearch, end: endOnlySearch, both: bothSearch, startDate: startDate, endDate: endDate };
}

function filterByDate(event) {
    var startDateateInput = $("#startDate").val() == "" ? null : $("#startDate").val();
    var endDateInput = $("#endDate").val() == "" ? null : $("#endDate").val();
    var validDates = validateDates(startDateateInput, endDateInput);
    startDateateInput = validDates.startDate;
    endDateInput = validDates.endDate;

    var dataGroup;
    if (validDates.valid == true) {
        if (validDates.both == true) {
            console.log("Searching by both dates");
            $("table tr").each(function () {
                var dos = $(this).find("td").eq(5).text();
                dataGroup = $(this).attr("data-group") == undefined ? 0 : $(this).attr("data-group");

                if ((dos < startDateateInput || dos > endDateInput) && dataGroup == 1) {
                    $(this).hide();
                }
                else {
                    $(this).show();
                }
            });
        }
        else if (validDates.start == true) {
            console.log("Searching by Start Date only");
            $("table tr").each(function () {
                var dos = $(this).find("td").eq(5).text();
                dataGroup = $(this).attr("data-group") == undefined ? 0 : $(this).attr("data-group");

                if (dos < startDateateInput && dataGroup == 1) {
                    $(this).hide();
                }
                else {
                    $(this).show();
                }
            });
        }
        else if (validDates.end == true) {
            console.log("Searching by end date only");
            $("table tr").each(function () {
                var dos = $(this).find("td").eq(5).text();
                dataGroup = $(this).attr("data-group") == undefined ? 0 : $(this).attr("data-group");

                if (dos < endDateInput && dataGroup == 1) {
                    $(this).hide();
                }
                else {
                    $(this).show();
                }
            });
        }
        else {
            $("#table tr").show();
        }
    }
}

function openClaim(input) {
    input = input.replace("btn-", "");
    var params = input.split("|");
    console.log(params);

    var claimNumber = params[0];
    var checkNumber = params[1];
    var claimStatus = params[2];
    var claimVendor = params[3];
    var typeOfService = params[4];
    var dateOfService = params[5];
    var amtPaid = params[6];
    var amtBilled = params[7];
    var checkTotal = params[8];

    var dateParts = dateOfService.split("-");
    var dos = new Date(dateParts[0], dateParts[1], dateParts[2]);

    var entity = {};
    entity.mcs_name = claimNumber;
    entity.mcs_checknumber = checkNumber;
    entity.mcs_dfn = _dfn;
    entity.mcs_bfn = _bfn;
    entity.mcs_claimstatus = claimStatus;
    entity.mcs_vendor = claimVendor;
    entity.mcs_typeofservice = typeOfService;
    entity.mcs_dateofservice = dateOfService;
    entity.mcs_amountpaid = parseFloat(amtPaid);
    entity.mcs_amountbilled = parseFloat(amtBilled);
    entity.mcs_checktotal = parseFloat(checkTotal);

    CommCare.Shared.CreateRecord("mcs_fmpclaimsummaries", entity).then(function (newRecord) {
        console.log(newRecord);

        if (parent.window.IsUSD) {
            windowToOpenRequest = "http://event/?eventName=OpenFMPClaim&ClaimId=" + newRecord.toLowerCase();
            setTimeout(function () {
                window.open(windowToOpenRequest);
            }, 1500);
        }
        else {
            //var windowOptions = {
            //    openInNewWindow: true
            //};

            var appProperties = CommCare.Shared.GetCurrentAppProperties();
            var appId = appProperties.then(function (result) {
                if (result.appId != null) {
                    url = Xrm.Utility.getGlobalContext().getClientUrl();
                    Xrm.Navigation.openUrl(url + "/main.aspx?appid=" + result.appId + "&newWindow=true&pagetype=entityrecord&etn=mcs_fmpclaimsummary&id=" + newRecord);
                }
            });

            //url = Xrm.Page.context.getClientUrl();
            //Xrm.Navigation.openUrl(url + "/main.aspx?appid=bce5a257-b0a4-e911-a97d-001dd80081ad&newWindow=true&pagetype=entityrecord&etn=mcs_fmpclaimsummary&id=" + newRecord);
            //Xrm.Utility.openEntityForm("mcs_fmpclaimsummary", newRecord, null, windowOptions);

            //var windowOptions = {
            //    openInNewWindow: true
            //};
            //var openFormParameters = {
            //    navbar: "off",
            //    cmdbar: false
            //};
            //var newWindow = Xrm.Utility.openEntityForm("mcs_fmpclaimsummary", newRecord, openFormParameters, windowOptions);

        }
        
    }).catch(function (error) {
        console.log("Error Creating record: " + error.message);
    });
}

function restrictSearchParameters(event) {
    //console.log(event);
    //console.log(event.target.id);

    if (event.target.id == "claimNumber" && $("#claimNumber").val() != "") {
        $("#startDate").prop("disabled", true);
        $("#endDate").prop("disabled", true);
        $("#checkNumber").prop("disabled", true);
        $("#claimNumber").prop("disabled", false);
    } else if (event.target.id == "startDate" && ($("#startDate").val() != "" || $("#endDate").val() != "")) {
        $("#startDate").prop("disabled", false);
        $("#endDate").prop("disabled", false);
        $("#checkNumber").prop("disabled", true);
        $("#claimNumber").prop("disabled", true);
    } else if (event.target.id == "endDate" && ($("#endDate").val() != "" || $("#startDate").val() != "")) {
        $("#startDate").prop("disabled", false);
        $("#endDate").prop("disabled", false);
        $("#checkNumber").prop("disabled", true);
        $("#claimNumber").prop("disabled", true);
    } else if (event.target.id == "PDI" && $("#PDI").val() != "") {
        $("#startDate").prop("disabled", true);
        $("#endDate").prop("disabled", true);
        $("#checkNumber").prop("disabled", false);
        $("#claimNumber").prop("disabled", true);
    } else {
        $("#startDate").prop("disabled", false);
        $("#endDate").prop("disabled", false);
        $("#checkNumber").prop("disabled", false);
        $("#claimNumber").prop("disabled", false);
    }
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

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function exportTableToCSV() {
    var csv = [];
    var rows = document.querySelectorAll("[id='table'] tr");
    var dt = new Date();
    var filename = "FMPClaimSearchResults " + dt.toLocaleString('en-US', { hour12: true }).replace(/, /g, " ").replace(/,/g, "-").replace(/_/g, "-") + ".csv";

    for (var i = 0; i < rows.length; i++) {
        // Only export rows visible to user
        if (rows[i].style["display"] != "none") {
            var row = [];
            var cols = rows[i].querySelectorAll("td, th");
            var cell;

            for (var j = 0; j < cols.length; j++) {
                cell = cols[j].innerText;
                if (cell != "No Content Found" && cell != "View") {
                    row.push(cell);
                }
            }

            csv.push(row.join(","));
        }
    }

    // Download CSV
    downloadCSV(csv.join("\n"), filename);
}
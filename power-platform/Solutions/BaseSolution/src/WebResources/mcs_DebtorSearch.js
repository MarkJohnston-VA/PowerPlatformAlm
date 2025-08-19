/// <reference path="CommCareShared.min.js"/>

function onLoad() {
    $(".inputField").on("change", restrictSearchParameters);
    $("#tmpDialog").show();
    console.log("common context exists " + !!CommCare.Shared.FormContext);
    var searchValue = getDataParam();
    if (searchValue != null) {
        searchData(searchValue);
    }
    else {
        $("#tmpDialog").hide();
    }
}

function openDebtor(input) {
    input = input.replace("btn-", "");
    var params = input.split("|");
    console.log(params);

    var name = params[0];
    var address = params[1];
    var city = params[2];
    var state = params[3];
    var zip = params[4];
    var phone = params[5];
    var fms = params[6];
    var debtorId = params[7];

    var entity = {};
    entity.mcs_name = name;
    entity.mcs_addressline1 = address;
    entity.mcs_city = city;
    entity.mcs_state = state;
    entity.mcs_zipcode = zip;
    entity.mcs_phonenumber = phone;
    entity.mcs_fmscode = fms;
    entity.mcs_debtornumber = debtorId;

    CommCare.Shared.CreateRecord("mcs_debtors", entity).then(function (newRecord) {
        console.log(newRecord);

        if (parent.window.IsUSD) {
            windowToOpenRequest = "http://event/?eventName=OpenDebtor&DebtorId=" + newRecord.toLowerCase();
            setTimeout(function () {
                window.open(windowToOpenRequest);
            }, 1500);
        }
        else {
            var appProperties = CommCare.Shared.GetCurrentAppProperties();
            var appId = appProperties.then(function (result) {
                if (result.appId != null) {
                    url = Xrm.Utility.getGlobalContext().getClientUrl();
                    Xrm.Navigation.openUrl(url + "/main.aspx?appid=" + result.appId + "&newWindow=true&pagetype=entityrecord&etn=mcs_debtor&id=" + newRecord);
                }
            });
        }

    }).catch(function (error) {
        console.log("Error Creating record: " + error.message);
    });
}

function searchDataFromFullSearchButton() {
    console.log("Searching Debtors");
    var searchValue = $("#fullSearch").val();
    var bocSearchValue = $("#bocSearch").val();
    searchValue = searchValue == "" ? null : searchValue;
    bocSearchValue = bocSearchValue == "" ? null : bocSearchValue;
    clearAll();

    if (searchValue != null) {
        $("#tableBody").empty();
        $("#tmpDialog").show();
        var tmpVisible = $("#tmpDialog").is(":visible");
        console.log("Temp Dialog is visible = ", tmpVisible);
        searchData(searchValue);
    }
    else if (bocSearchValue != null) {
        $("#tableBody").empty();
        $("#tmpDialog").show();
        $("#bocSearch").val(bocSearchValue);
        OpenBillFromKNumber(bocSearchValue);
    }
    else {
        console.log("No search value provided");
    }
}

function searchData(searchValue) {
    clearAll();

    if (searchValue != null) {
        $("#fullSearch").val(searchValue);
        $("#bocSearch").prop("disabled", true);

        var parameters = {
            searchValue: searchValue,

            getMetadata: function () {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        searchValue: { typeName: "Edm.String", structuralProperty: 1 }
                    },
                    operationType: 0, operationName: "mcs_DCUDebtorSearch"
                };
            }
        };
        callActionAsync(parameters);

    }
    else {
        $("#tmpDialog").hide();
    }
}

function GetBillFromKNumber(kNumber) {
    console.log("Begin Bill Search from KNumber - Finding Debtor Name");
    var parameters = {};
    parameters.billNumber = kNumber;

    var GetDebtorName = CommCare.Shared.CallAction("mcs_DCUGetDebtorNamefromKNumber", parameters)

    var CreateDebtorRecords = GetDebtorName.then(function (result) {
        var debtorName;
        if (result != null) debtorName = result["debtorName"];
        console.log("Creating Debtors with name " + debtorName);
        var params = {};
        params.searchValue = debtorName;

        return CommCare.Shared.CallAction("mcs_DCUCreateDebtors", params);
    });

    var RetrieveCreatedBill = CreateDebtorRecords.then(function (debtors) {
        var statusMessage = "SUCCESS";
        var errorMessage = "";
        var responseParts;

        var check = debtors != null ? true
            : debtors["Response"] ? true : false;

        if (check) responseParts = debtors["Response"].split("|");

        statusMessage = responseParts < 3 ? statusMessage
            : responseParts[1] != "ERROR" ? statusMessage
            : "ERROR";

        if (check && statusMessage == "ERROR") {
            errorMessage = statusMessage == "ERROR" ? responseParts[2] : null;
            console.log(statusMessage, errorMessage);
            return { Status: statusMessage, Message: errorMessage };
        }
        else {
            console.log("Retrieving bill");
            var columns = "mcs_billofcollectionid";
            var filter = "$filter=mcs_name eq '" + kNumber + "'&$orderby=createdon desc";
            return CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("mcs_billofcollections", columns, filter);
        }
    });

    return Promise.all([GetDebtorName, CreateDebtorRecords, RetrieveCreatedBill])
}

function OpenBillFromKNumber(kNumber) {
    if (kNumber != null && kNumber.length == 11) {
        GetBillFromKNumber(kNumber).then(function (allResponses) {
            if (allResponses != null) {
                if (allResponses.length >= 3) {
                    if (allResponses[2]["Status"]) {
                        errorMessage = allResponses[2]["Message"];
                        document.getElementById("noContentText").innerHTML = "An Error Occurred with Message: " + errorMessage;
                        $("#noContent").show();
                        $("#tmpDialog").hide();
                    }
                    else {
                        billId = allResponses[2].value[0]["mcs_billofcollectionid"];
                        OpenBill(billId)
                    }
                }
                else {
                    billId = allResponses[2].value[0]["mcs_billofcollectionid"];
                    OpenBill(billId)
                }
            }
        });
    }
}

function OpenBill(billId) {
    $("#tmpDialog").hide();
    try {
        if (billId != null) {
            //var windowOptions = {
            //    openInNewWindow: true
            //};

            if (parent.window.IsUSD) {
                var windowtoOpen = "";
                windowtoOpen = "http://event/?eventName=OpenBOC&billId=" + billId;
                setTimeout(function () {
                    window.open(windowtoOpen);
                }, 1500);
            } else {
                var appProperties = CommCare.Shared.GetCurrentAppProperties();

                var appId = appProperties.then(function (result) {
                    if (result.appId != null) {
                        url = Xrm.Utility.getGlobalContext().getClientUrl();
                        Xrm.Navigation.openUrl(url + "/main.aspx?appid=" + result.appId + "&newWindow=true&pagetype=entityrecord&etn=mcs_billofcollection&id=" + billId);
                    }
                });

            }

        }
    } catch (e) {
        console.log("Error: " + e.message);
        $("#tmpDialog").hide();
        document.getElementById("noContentText").innerHTML = "An Error Occurred with Message: " + e.message;
        $("#noContent").show();
    }
}

function callActionAsync(parameters) {
    Xrm.WebApi.online.execute(parameters).then(
        function success(response) {
            if (response.ok) { return response.json(); }
        }
    ).then(function (responseBody) {
        var result = responseBody;
        console.log("Successful Debtor Search with Results: ");
        console.log(result);
        assembleData(result);
    }).catch(function (error) {
        console.log("Error in action call: " + error.message);
        $("#tmpDialog").hide();
        $("#noContent").show();
    });
}

function callAction(parameters) {
    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/mcs_DCUDebtorSearch", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                console.log("Successful Debtor Search with Results: ");
                console.log(result);
                assembleData(result);

            } else {
                console.log("Error in action call: " + this.statusText);
                //console.log(JSON.parse(this.response).error.message);
                $("#tmpDialog").hide();
                $("#noContent").show();
            }
        }
    };
    req.send(JSON.stringify(parameters));
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
        console.log("no params in URL - Checking form");
        var entity = CommCare.Shared.FormContext.data.entity.getEntityName();
        console.log(entity);
        if (entity === 'incident') {
            var boc = CommCare.Shared.GetFieldValue("hac_boc_text");
            if (boc != null && boc.length == 11) {
                $("#bocSearch").val(boc);
                $("#fullSearch").prop("disabled", true);
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

    for (var i = 0; i < results.value.length; i++) {
        buildRow(results.value[i]);
    }

    sortTable(1);
    $("#tmpDialog").hide();
}

function buildRow(data) {
    var name = data["mcs_name"] == null ? "" : data["mcs_name"].replace(/[^a-zA-Z0-9 ]/g, "");
    var address = data["mcs_addressline1"] == null ? "" : data["mcs_addressline1"];
    var city = data["mcs_city"] == null ? "" : data["mcs_city"];
    var state = data["mcs_state"] == null ? "" : data["mcs_state"];
    var zip = data["mcs_zipcode"] == null ? "" : data["mcs_zipcode"];
    var phone = data["mcs_phonenumber"] == null ? "" : data["mcs_phonenumber"];
    var fms = data["mcs_fmscode"] == null ? "" : data["mcs_fmscode"];
    var debtorId = data["mcs_debtornumber"] == null ? "" : data["mcs_debtornumber"];

    var rowID = name + "|" + address + "|" + city + "|" + state + "|" + zip + "|" + phone + "|" + fms + "|" + debtorId;

    var rowHtml = "<tr id='" + debtorId.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "' class='row' data-group='1'>"
    rowHtml += "<td class='col-1'><button type='button'class='btn btn-default btn-xs' id='btn-" + rowID + "' onclick=openDebtor(this.id)>View</button></td>"
    rowHtml += "<td class='col-1'>" + name.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "<td class='col-2'>" + address.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "<td class='col-2'>" + city.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "<td class='col-2'>" + state.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "<td class='col-1'>" + zip.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "<td class='col-1'>" + phone.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "<td class='col-1'>" + fms.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "<td class='col-1'>" + debtorId.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim() + "</td>"
    rowHtml += "</tr>"
    //REMOVE ENCODEURICOMPONENT IF DEPLOYING TO CRM
    //ONLY THERE FOR FORTIFY
    //$("#tableBody").append(encodeURIComponent(rowHtml.replace(/(<\/?(?:tr|td)[^>]*>)|<[^>]+>/ig, ' ')));
    $("#tableBody").append(rowHtml);
}

function clearAll() {
    $(".inputField").val("");
    $(".inputField").prop("disabled", false);
    $("#tableBody").empty();
    $("table tr").show();
    //$("#tmpDialog").hide();
    $("#noContent").hide();
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

    if (event.target.id == "fullSearch" && $("#fullSearch").val() != "") {
        $("#bocSearch").prop("disabled", true);
    } else if (event.target.id == "bocSearch" && $("#bocSearch").val() != "") {
        $("#fullSearch").prop("disabled", true);
    } else {
        $("#fullSearch").prop("disabled", false);
        $("#bocSearch").prop("disabled", false);
    }
}
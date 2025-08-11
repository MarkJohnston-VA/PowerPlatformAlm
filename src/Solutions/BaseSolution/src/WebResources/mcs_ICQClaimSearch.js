/// <reference path="common/CommCareShared.min.js"/>

var _bfn;
var _dfn;
var _chunk = 1;

function onLoad() {
    //hashReadyNotification();

    var eDate;
    var stDate;
    var date = new Date();
    var isoDate = date.toISOString();

    if (isoDate.indexOf("T") >= 0) {
        eDate = isoDate.split('T')[0];
    }

    var stISO = new Date(date.getFullYear() - 2, date.getMonth(), date.getDate()).toISOString()
    if (stISO.indexOf("T")) {
        stDate = stISO.split('T')[0];
    }

    $(".inputField").on("change", restrictSearchParameters);
    $("#startDate").val(stDate);
    $("#endDate").val(eDate);
    $("#startDate").on("change", filterByDate);
    $("#startDate").on("change", defaultEndDate);
    $("#endDate").on("change", filterByDate);
    $("#tmpDialog").hide();
    $("#footer").hide();

    $('.pagination').on('click', 'li:not(.prev):not(.next)', function () {
        $('.pagination li').removeClass('active');
        $(this).not('.prev,.next').addClass('active');
    });

    $('.pagination').on('click', 'li.prev', function () {
        $('li.active').removeClass('active').prev().addClass('active');
    });

    $('.pagination').on('click', 'li.next', function () {
        $('li.active').removeClass('active').next().addClass('active');
    });

    searchData(_chunk);
}

function hashReadyNotification() {
    window.location.hash = "ReadyXrm";
}

function setClientApiContext(xrm, formContext) {
    window.Xrm = xrm;
    window._formContext = formContext
    CommCare.Shared.FormContext = formContext;
    console.log("ICQClaimSearch has context");
    initiateApplicationInsights();
    //searchData(_chunk);
    onLoad();
}

function searchData(_chunk) {
    clearAll(true);

    var paramsArray = getDataParam();
    _dfn = paramsArray.dfn;
    _bfn = paramsArray.bfn;

    $("#tableBody").remove();
    $("#table").append("<tbody id='tableBody'></tbody>");
    $("#tmpDialog").show();
    var pdiString = $("#PDI").val() == "" ? null : $("#PDI").val();
    var claimNumber = $("#claimNumber").val() == "" ? null : $("#claimNumber").val().toUpperCase();
    var startDate = $("#startDate").val() == "" ? null : $("#startDate").val();
    var endDate = $("#endDate").val() == "" ? null : $("#endDate").val();

    var execute_mcs_ICQClaimSearch_Request = {
        // Parameters
        bfn: _bfn,
        dfn: _dfn,
        startDate: new Date(startDate), 
        endDate: new Date(endDate), 
        claimNumber: claimNumber,
        pdi: pdiString,
        chunkNumber: _chunk,

        getMetadata: function () {
            return {
                boundParameter: null,
                parameterTypes: {
                    bfn: { typeName: "Edm.String", structuralProperty: 1 },
                    dfn: { typeName: "Edm.String", structuralProperty: 1 },
                    startDate: { typeName: "Edm.DateTimeOffset", structuralProperty: 1 },
                    endDate: { typeName: "Edm.DateTimeOffset", structuralProperty: 1 },
                    claimNumber: { typeName: "Edm.String", structuralProperty: 1 },
                    pdi: { typeName: "Edm.String", structuralProperty: 1 },
                    chunkNumber: { typeName: "Edm.Int32", structuralProperty: 1 }
                },
                operationType: 0, operationName: "mcs_ICQClaimSearch"
            };
        }
    };
    callActionAsync(execute_mcs_ICQClaimSearch_Request);
}

function callActionAsync(parameters) {
    Xrm.WebApi.online.execute(parameters).then(
        function success(response) {
            if (response.ok) { return response.json(); }
        }
    ).then(function (responseBody) {
        var result = responseBody;
        console.log(result);
        // Return Type: mscrm.mcs_ICQClaimSearchResponse
        // Output Parameters
        var ec = result["ec"]; // Collection(mscrm.crmbaseentity)
        var totalrecords = result["TotalRecords"]; // Edm.Int32
        var morechunkrecords = result["MoreChunkRecords"]; // Edm.Boolean
        var moredaterecords = result["MoreDateRecords"]; // Edm.Boolean
        var recordsreturned = result["RecordsReturned"]; // Edm.Int32

        if (result.ec.length == 0) {
            console.log("No results returned: ", result);
            $("#tmpDialog").hide();
            $("#noContent").show();
        }

        console.log("Successful ICQ Claim Search with Results: ");
        console.log(result);
        _chunk = parameters.chunkNumber;

        assembleData(result);
        $("#footer").show();

    }).catch(function (error) {
        console.log("Error in action call: " + error.message);
        $("#tmpDialog").hide();
        $("#noContent").show();
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
    for (var i = 0; i < results.ec.length; i++) {
        buildRow(results.ec[i], results.ec.length);
    }

    buildPageNumbers(results);

    $("#tmpDialog").hide();
}

function buildRow(data, claimLength) {

    var dos = data["hac_servicedate"] != null ? data["hac_servicedate"].substring(0, 10) : null;
    var amtBilled = data["hac_amountbilled"] != null ? data["hac_amountbilled"].toLocaleString("en-US", { style: "currency", currency: 'USD' }) : "$ 0.00";
    //var EIN = data["hac_ein"] != null ? data["hac_ein"] : "";
    var claimNumber = data["hac_claimnumber"] != null ? data["hac_claimnumber"] : "";
    var claimVendor = data["hac_provider"] != null ? data["hac_provider"].replace(/[^a-zA-Z0-9 ]/g, "") : "";
    var claimStatus = data["hac_claimstatus"] != null ? data["hac_claimstatus"] : "";
    var champVAPayment = data["mcs_champvapaid"] != null ? data["mcs_champvapaid"].toLocaleString("en-US", { style: "currency", currency: 'USD' }) : "$ 0.00";
    var deductible = data["mcs_deductible"] != null ? data["mcs_deductible"].toLocaleString("en-US", { style: "currency", currency: 'USD' }) : "$ 0.00";
    var costShare = data["mcs_costshare"] != null ? data["mcs_costshare"].toLocaleString("en-US", { style: "currency", currency: 'USD' }) : "$ 0.00";
    var ohiPayment = data["mcs_ohipaid"] != null ? data["mcs_ohipaid"].toLocaleString("en-US", { style: "currency", currency: 'USD' }) : "$ 0.00";
    var allowable = data["mcs_allowable"] != null ? data["mcs_allowable"].toLocaleString("en-US", { style: "currency", currency: 'USD' }) : "$ 0.00";
    var rejectReasons = data["mcs_rejectreasons"] != null ? data["mcs_rejectreasons"] : "";
    var rejectReasonsHTML = buildRejectReasons(data["mcs_rejectreasons"], claimLength);
    var rowID = claimNumber + "|" + claimVendor + "|" + dos + "|" + amtBilled + "|" + claimStatus + "|" + champVAPayment + "|" + costShare + "|" + rejectReasons;

    var rowHtml = "<tr id='" + data["mcs_claimnumber"] + "' class='row' data-group='1'>"
    rowHtml += "<td class='col-1'><button type='button'class='btn btn-default btn-xs' id='btn-" + rowID + "' onclick=openClaim(this.id)>Open</button></td>"
    rowHtml += "<td class='col-1'>" + claimNumber + "</td>"
    rowHtml += "<td class='col-1'>" + claimStatus + "</td>"
    rowHtml += "<td class='col-2'>" + claimVendor + "</td>"
    //rowHtml += "<td class='col-2'>" + EIN + "</td>"
    rowHtml += "<td class='col-1'>" + dos + "</td>"
    rowHtml += "<td class='col-1'>" + amtBilled + "</td>"
    rowHtml += "<td class='col-1'>" + ohiPayment + "</td>"
    rowHtml += "<td class='col-1'>" + allowable + "</td>"
    rowHtml += "<td class='col-1'>" + champVAPayment + "</td>"
    rowHtml += "<td class='col-1'>" + deductible + "</td>"
    rowHtml += "<td class='col-1'>" + costShare + "</td>"
    rowHtml += "<td class='col-1'>" + rejectReasonsHTML + "</td>"
    rowHtml += "</tr>"
    //REMOVE ENCODEURICOMPONENT IF DEPLOYING TO CRM
    //ONLY THERE FOR FORTIFY
    //$("#tableBody").append(encodeURIComponent(rowHtml.replace(/(<\/?(?:tr|td)[^>]*>)|<[^>]+>/ig, ' ')));
    $("#tableBody").append(rowHtml);
}

function clearAll(fromSearch) {
    if (fromSearch != true) {
        $(".inputField").val("");
    }
    $(".inputField").prop("disabled", false);
    $("table tr").show();
    $("#tmpDialog").hide();
    $("#noContent").hide();
    $("#tableBody").remove();
    $("#table").append("<tbody id='tableBody'></tbody>");
    $("#footer").hide();
}

function validateDateFormat(date) {
    if (date == null) return null;
    if (date.length != 10) return null;

    var retVal = null;
    var splitter1 = date.substring(2, 3);
    var splitter2 = date.substring(5, 6);
    var splitter3 = date.substring(4, 5);
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
    var beneficiaryID = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "").toLowerCase();

    var entity = {};
    entity.hac_claimnumber = claimNumber;
    entity["hac_beneficiaryid@odata.bind"] = "/contacts(" + beneficiaryID + ")";

    CommCare.Shared.CreateRecord("hac_claims", entity).then(function (newRecord) {
        console.log(newRecord);

        if (parent.window.IsUSD) {
            windowToOpenRequest = "http://event/?eventName=OpenClaimFromContact&ClaimId=" + newRecord.toLowerCase();
            setTimeout(function () {
                window.open(windowToOpenRequest);
            }, 1500);
        }
        else {

            var appProperties = CommCare.Shared.GetCurrentAppProperties();
            var appId = appProperties.then(function (result) {
                if (result.appId != null) {
                    url = Xrm.Utility.getGlobalContext().getClientUrl();
                    Xrm.Navigation.openUrl(url + "/main.aspx?appid=" + result.appId + "&newWindow=true&pagetype=entityrecord&etn=hac_claim&id=" + newRecord);
                }
            });
        }

    }).catch(function (error) {
        console.log("Error Creating record: " + error.message);
    });
}

function restrictSearchParameters(event) {
    if (event.target.id == "claimNumber" && $("#claimNumber").val() != "") {
        $("#startDate").prop("disabled", true);
        $("#endDate").prop("disabled", true);
        $("#PDI").prop("disabled", true);
        $("#claimNumber").prop("disabled", false);
    } else if (event.target.id == "startDate" && ($("#startDate").val() != "" || $("#endDate").val() != "")) {
        $("#startDate").prop("disabled", false);
        $("#endDate").prop("disabled", false);
        $("#PDI").prop("disabled", true);
        $("#claimNumber").prop("disabled", true);
    } else if (event.target.id == "endDate" && ($("#endDate").val() != "" || $("#startDate").val() != "")) {
        $("#startDate").prop("disabled", false);
        $("#endDate").prop("disabled", false);
        $("#PDI").prop("disabled", true);
        $("#claimNumber").prop("disabled", true);
    } else if (event.target.id == "PDI" && $("#PDI").val() != "") {
        $("#startDate").prop("disabled", true);
        $("#endDate").prop("disabled", true);
        $("#PDI").prop("disabled", false);
        $("#claimNumber").prop("disabled", true);
    } else {
        $("#startDate").prop("disabled", false);
        $("#endDate").prop("disabled", false);
        $("#PDI").prop("disabled", false);
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

function buildPageNumbers(vimtGetClaimDataResponse) {
    var recordsReturned = vimtGetClaimDataResponse.RecordsReturned;
    var totalRecords = Math.ceil(vimtGetClaimDataResponse.TotalRecords);
    CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("mcs_settings", "hac_cpneclaimsearchmaxresultcount", null).then(function (dataResponse) {
        var data = dataResponse.value;
        if (data.length > 0) {
            var maxResultCount = data[0].hac_cpneclaimsearchmaxresultcount;
            //debugger;
            $('#pag_nav ul').empty();

            var previousPageNumber = Number(_chunk) - 1;
            var nextPageNumber = Number(_chunk) + 1;
            if (recordsReturned >= maxResultCount) {
                if (_chunk > 1) {
                    $('#pag_nav ul').append('<li id=' + previousPageNumber + ' onclick=searchData(this.id)><a class="paginationLink" href="#">Previous</a></li>');
                } else if (_chunk == 1) {
                    $('#pag_nav ul').append('<li></li>');
                } else {
                    $('#pag_nav ul').append('<li style="pointer-events:none;" id=' + previousPageNumber + ' onclick=searchData(this.id)><a class="paginationLink" href="#">Previous</a></li>');
                }
                //$('#i').removeAttr('href');
                if (maxResultCount != null && maxResultCount != 0) {
                    buildPagination(totalRecords, maxResultCount, _chunk);
                }
                

                if (vimtGetClaimDataResponse.MoreChunkRecords == true) {
                    $('#pag_nav ul').append('<li id=' + nextPageNumber + ' onclick=searchData(this.id)><a class="paginationLink" href="#">Next</a></li>');
                }
                
            }
            else if (recordsReturned < maxResultCount) {
                if (_chunk > 1) {
                    $('#pag_nav ul').append('<li id=' + previousPageNumber + ' onclick=searchData(this.id)><a class="paginationLink" href="#">Previous</a></li>');
                } else if (_chunk == 1) {
                    $('#pag_nav ul').append('<li></li>');
                } else {
                    $('#pag_nav ul').append('<li style="pointer-events:none;" id=' + previousPageNumber + ' onclick=searchData(this.id)><a class="paginationLink" href="#">Previous</a></li>');
                }
                if (maxResultCount != null && maxResultCount != 0) {
                    buildPagination(totalRecords, maxResultCount, _chunk);
                }
                
                //$('#pag_nav ul').append('<li class="disabled" style="pointer-events:none;" id=' + nextPageNumber + ' onclick=searchData(this.id)><a href="#">Next</a></li>');
            }

            document.getElementById("pag_nav_count").innerHTML = "Total Records: " + totalRecords;

            $("#footer").show();
        }
    }).catch(function (error) {
        console.log("Error in retrieving mcs_settings");
    });
}

function buildPagination(totalRecords, maxResultCount, _chunk) {
    var paginations = Math.ceil(totalRecords / maxResultCount);
    for (var page = 1; page <= paginations; page++) {
        if (_chunk == page) {
            $('#pag_nav ul').append('<li class="page-item active" onclick=searchData(' + page +')><a class="paginationLink" href="#">' + page + '</a></li>');
        } else {
            $('#pag_nav ul').append('<li class="page-item" onclick=searchData(' + page +')><a class="paginationLink" href="#">' + page + '</a></li>');
        }
    }
}

function defaultEndDate(event) {
    if (event.target.id == "startDate" && ($("#endDate").val() == "" || $("#startDate").val() != "")) {
        var startDate = $("#startDate").val()
        $("#endDate").val(startDate);
    }
}

function buildRejectReasons(rejectReasons, claimLength) {
    var checkNull = !!rejectReasons;
    var html = "";
    var dropdownItems = "";

    if (checkNull) {

        var rrAr = rejectReasons.split('^#*');

        for (var i = 0; i < rrAr.length; i++) {
            var arrayOfLines = fold(rrAr[i], 100);
            var foldedString = arrayOfLines.join('<br/>');

            dropdownItems += "<li><a href='#'>" + foldedString + "</a></li>";
        }

        //html = "<div class='dropdown'><button type='button' class='btn btn-default dropdown-toggle btn-xs' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>View <span class='caret' style='color: #002050'></span></button><ul class='dropdown-menu'>" + dropdownItems + "</ul></div>"

        if (claimLength <= 1) {
            var height = rrAr.length * 25;
            document.getElementById("table").style.height = height + "px";
        }
    }
    else {
        console.log("No Reject Reasons were found for claim");
        dropdownItems = "<li><a href='#'>- NONE FOUND </a></li>";
    }

    html = "<div class='dropdown'><button type='button' class='btn btn-default dropdown-toggle btn-xs' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>View <span class='caret' style='color: #002050'></span></button><ul class='dropdown-menu'>" + dropdownItems + "</ul></div>";
    return html;
}

function fold(input, lineSize, lineArray) {
    lineArray = lineArray || [];
    if (input.length <= lineSize) {
        lineArray.push(input);
        return lineArray;
    }
    lineArray.push(input.substring(0, lineSize));
    var tail = input.substring(lineSize);
    return fold(tail, lineSize, lineArray);
}
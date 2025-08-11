if (typeof CommCare == 'undefined') { CommCare = { __namespace: true }; }

if (typeof (CommCare.Veteran) == "undefined") {
    CommCare.Veteran = {
        __namespace: true
    };
}

if (typeof (CommCare.Veteran.Global) == "undefined") {
    CommCare.Veteran.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.Veteran.Constants) == "undefined") {
    CommCare.Veteran.Constants = {
        __namespace: true
    };
}

CommCare.Veteran.Global = (function () {
    //Public functions
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        console.log("I MADE IT");
        CommCare.Shared.GetFormContext(context);
        UnattendedSearchFromVeteran();
    }

    function loadESRWebParts(icn) {
        //pass icn, folder path and list of control names/resource names to the loadEsrResources function
        //remove VAMC: loadEsrResources(icn, '/webresources/vhacrm_/ESRParts', 'WebResource_PhoneNumbersGrid|PhoneNumberGrid.htm,WebResource_EmailGrid|EmailGrid.htm,WebResource_Demographics|Demographics.htm,WebResource_Enrollment|Enrollment.htm,WebResource_Eligibility|Eligibility.htm,WebResource_VAMC|VAMC.htm');
        loadEsrResources(icn, '/webresources/vhacrm_/ESRParts', 'WebResource_PhoneNumbersGrid|PhoneNumberGrid.htm,WebResource_EmailGrid|EmailGrid.htm,IFRAME_esr_addresses|Addresses.htm');
    }

    ///takes icn, path to web resources (starting from root CRM url) and list of form control names and web resource names as arguments
    ///example - loadEsrResources(icn, '/webresources/vhacrm_/ESRParts', 'WebResource_enrollment|enrollment.htm,WebResource_esreligibility|eligibility.htm,WebResource_demographics|demographics.htm');
    function loadEsrResources(icn, resourcepath, resourceparam) {
        //debugger;
        var columns = "*";
        var filter = null;

        CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("mcs_settings", columns, filter).then(function (dataResponse) {
            var data = dataResponse.value;
            if (data.length > 0) {

                var resourcearr = resourceparam.split(',');
                //debugger;
                if (resourcearr.length > 0) {
                    for (var i = 0; i < resourcearr.length; i++) {
                        try {
                            //start with assumption that resource name and control name are the same
                            var controlname = "";
                            var webresourcename = "";

                            //check to see if we have pipe-separated value -> control name should be first, resource name should be second
                            if (resourcearr[i].indexOf('|') > 0) {
                                controlname = resourcearr[i].split('|')[0];
                                webresourcename = resourcearr[i].split('|')[1];
                            }
                            else {
                                throw ("ESR resource target control and resource name not supplied in correct format.")
                            }

                            if (controlname == "IFRAME_esr_addresses") {
                                resourcepath = "/webresources/mcs_/ESRParts";
                            }
                            //figure out the full url to the BAH esr proxy
                            var esrEndpoint = data[0].mcs_veisihub_baseurl + getEndpointUrl(data[0], webresourcename);
                            var actualEndpoint = esrEndpoint.replace('{0}', '000000' + icn + '000000'); //pad ICN with six zeroes on beginning and end
                            var subscriptionId_east = data[0].mcs_subscriptionid_east;
                            var subscriptionId_south = data[0].mcs_subscriptionid_south;
                            var veisContentUrl = data[0].mcs_veiscontentsiteurl;
                            //build the querystring to call the page that will query esr and display the data - note CRM requires everything be encoded and passed in a 'data' parameter
                            var qs = 'data=' + encodeURIComponent('esr=' + encodeURIComponent(actualEndpoint) + '&subscriptionid_east=' + encodeURIComponent(subscriptionId_east) + '&subscriptionid_south=' + encodeURIComponent(subscriptionId_south) + '&veiscontenturl=' + encodeURIComponent(veisContentUrl));

                            // Get a reference to the iFrame
                            var webResArea = CommCare.Shared.FormContext.ui.controls.get(controlname);
                            if (webResArea == null) {
                                throw ("Could not find ESR resource target control with name - '" + controlname + "'");
                            }
                            else {
                                // Set the iFrame's URL
                                var src = Xrm.Utility.getGlobalContext().getClientUrl() + resourcepath + '/' + webresourcename + '?' + qs;
                                var url = src.substring(src.indexOf("/WebResources"));
                                var n = url.indexOf("&dt=");
                                if (n > 0) url = url.substring(0, url.length - n + 1);
                                var dt = Date.now();
                                if (url.indexOf("?data") > 0)
                                    url += encodeURIComponent('&dt=' + dt);  // Unified interface 
                                else
                                    url += '?data=' + encodeURIComponent('dt=' + dt); // Classic interface 
                                webResArea.setSrc(url);
                            }
                        }
                        catch (err) { alert(err); }
                    }
                }
            }
        }).catch(function (e) {
            console.log("Error getting Settings for URL");
        });
    }

    function getEndpointUrl(data, resourcename) {
        switch (resourcename) {
            case "Insurance.htm":
                return data.mcs_esr_insurance;
            case "Addresses.htm":
                return data.mcs_esr_addresses;
            default:
                return data.mcs_esr_endpoint;
        }
    }

    function buildQueryFilter(field, value, and) {
        if (value == '') {
            if (and) {
                return " and " + field + " eq null";
            } else {
                return field + " eq null";
            }
        }
        else {
            if (and) {
                return " and " + field + " eq '" + value + "'";
            } else {
                return field + " eq '" + value + "'";
            }
        }
    }

    function UnattendedSearchFromVeteran() {
        var filter = "$filter=";

        var edipi = CommCare.Shared.GetFieldValue("bah_edipi_text");
        if (edipi != null && edipi != "UNK") {
            if (edipi.length > 11) {
                edipi = "";
            }
        }
        else {
            edipi = "";
        }
        var firstname = CommCare.Shared.GetFieldValue("firstname");
        var lastname = CommCare.Shared.GetFieldValue("lastname");

        var dobdate = CommCare.Shared.GetFieldValue("bah_dob_date");
        var dobstring = "";
        if (dobdate != null) {
            dobstring = (dobdate.getMonth() + 1) + "/" + dobdate.getDate() + "/" + dobdate.getFullYear();
        }


        var ssn = CommCare.Shared.GetFieldValue("bah_ssn_text");
        if (ssn != "" && ssn != null) {
            ssn = ssn.replace(/-/g, "");
        }

        //if we have edipi, search using just it
        if (edipi != "") {
            filter += buildQueryFilter("crme_edipi", edipi, false);
            filter += buildQueryFilter("crme_classcode", 'MIL', true);
            filter += buildQueryFilter("crme_searchtype", 'SearchByIdentifier', true);

            //set search type as unattended
            filter += " and crme_isattended eq false";
        }
        else {
            //otherwise search using lastname, firstname, ssn, dob
            filter += buildQueryFilter("crme_lastname", lastname, false); //assuming lastname will never be blank

            if (firstname != "" && firstname != null) {
                filter += buildQueryFilter("crme_firstname", firstname, true);
            }

            if (ssn != "" && ssn != null) {
                filter += buildQueryFilter("crme_ssn", ssn, true);
            }

            if (dobstring != "") {
                filter += " and crme_dobstring eq '" + dobstring + "'";
            }
            filter += buildQueryFilter("crme_searchtype", 'SearchByFilter', true);

            //set search type as attended (for now)
            filter += " and crme_isattended eq true";
        }

        var fieldsSelected = "crme_patientmviidentifier,crme_veteransensitivitylevel";
        //debugger;
        CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("crme_persons", fieldsSelected.toLowerCase(), filter).then(function (results) {
            console.log("Success retrieving Person with results:", results);
            UnattendedSearchCallback(results.value);
        }).catch(function (error) {
            console.log("Error retrieving Person from MVI: " + error);
        });
    }

    function UnattendedSearchCallback(returnData) {
        var patientMviIdentifier = "";

        if (returnData != null && returnData.length == 1) {
            if (returnData[0].crme_exceptionOccured || (returnData[0].crme_returnmessage != null && returnData[0].crme_returnmessage == "An unexpected error occured during the MVI search. Please try again or contact your system administrator if the problem persists.")) {
                //do nothing
                loaESRWebParts(null)
            }
            else {
                patientMviIdentifier = returnData[0].crme_patientmviidentifier == null ? "" : returnData[0].crme_patientmviidentifier;
                if (!!patientMviIdentifier) {
                    var idParts = patientMviIdentifier.split("^");

                    if (idParts.length > 0) {
                        loadESRWebParts(idParts[0]);
                    }
                }
                else {
                    loadESRWebParts(null);
                }
            }
        }
        else {
            loadESRWebParts(null);
        }
    }
})();
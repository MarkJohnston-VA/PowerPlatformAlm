/// <reference path="common/CommCareShared.min.js"/>

function onLoad() {
    Xrm.WebApi.online.retrieveMultipleRecords("mcs_resourcelink", "?$filter=mcs_resourcetype eq 803750001&$orderby=mcs_sequencenumber asc").then(
        function success(results) {
            console.log(results);
            for (var i = 0; i < results.entities.length; i++) {
                var entity = results.entities[i];
                //$("#buttonContainer").append("<div class='col-md-2 text-center' style='padding: 5px'><a href='" + entity["mcs_link"] + "' class='btn btn-info' role='button' style='width:80%' target='_blank'>" + entity["mcs_buttondisplayname"] + "</a></div>");
                $("#buttonContainer").append("<div class='text-center' style='padding: 5px'><a href='" + entity["mcs_link"] + "' class='btn btn-info' role='button' style='width:80%' target='_blank'>" + entity["mcs_buttondisplayname"] + "</a></div>");
                console.log(entity["mcs_name"] + " appended");
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}
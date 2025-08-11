function assignToSelfFromView(primaryControl, selectedItemsReferences) {

    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId.replace("{", "").replace("}", "");

    for (i = 0; i < selectedItemsReferences.length; i++) {
        var recordId = selectedItemsReferences[i].Id;

        var user = {};
        user["ownerid@odata.bind"] = "/systemusers(" + currentuserid +")"; // Owner

        Xrm.WebApi.updateRecord("bah_interactions", recordId, user).then(
            function success(result) {
                var updatedId = result.id;
                Xrm.Utility.refreshParentGrid(result);
            },
            function(error) {
                console.log(error.message);
            }
        );
    }    
}
function assignToSelfFromForm(context) {

    var recordId = context.data.entity.getId().replace("{", "").replace("}", "");
    var userSettings =  Xrm.Utility.getGlobalContext().userSettings;
    var currentUserId = userSettings.userId.replace("{", "").replace("}", "");
    //var currentOwnerId = context.getAttribute("ownerid").getValue()[0].id.replace("{", "").replace("}", "");

    var record = {};
    record["ownerid@odata.bind"] = "/systemusers(" + currentUserId + ")"; // Owner
    Xrm.WebApi.updateRecord("bah_interactions", recordId, record).then(
        function success(result) {
            console.log(result);
            context.data.refresh();
        },
        function(error) {
            console.log(error.message);
        }
    );
}
function reassignBackToTeamFromForm(context) {
    var recordId = context.data.entity.getId().replace("{", "").replace("}", "");
    var userSettings =  Xrm.Utility.getGlobalContext().userSettings;
    var currentUserId = userSettings.userId.replace("{", "").replace("}", "");
    var currentOwnerId = context.getAttribute("ownerid").getValue()[0].id.replace("{", "").replace("}", "");
    console.log("debugging assignToSelfFromForm");
    console.log(currentUserId);
    console.log(currentOwnerId);

    var originalFetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                                "<entity name='vhacrm_areaintersection'>" +
                                    "<attribute name='mcs_defaultroutetoteamid' />" +
                                    "<order attribute='vhacrm_name' descending='false' />" +
                                    "<link-entity name='bah_interactions' from='vhacrm_interactionpurposeid' to='vhacrm_areaintersectionid' link-type='inner' alias='ad'>" +
                                    "<attribute name='bah_interactionsid' />" +
                                    "<filter type='and'>" +
                                        "<condition attribute='bah_interactionsid' operator='eq' uitype='bah_interactions' value='" + recordId + "' />" +
                                    "</filter>" +
                                    "</link-entity>" +
                                "</entity>" +
                                "</fetch>";
    var escapedFetchXML = encodeURIComponent(originalFetchXML);

    Xrm.WebApi.retrieveMultipleRecords("vhacrm_areaintersection", "?fetchXml=" + escapedFetchXML).then(
        function success(results) {
            if(results.entities.length == 1) {
                var defaultTeamGuid = results.entities[0]["_mcs_defaultroutetoteamid_value"];        
                var record = {};
                record["ownerid@odata.bind"] = "/teams(" + defaultTeamGuid+ ")"; // Owner
                
                Xrm.WebApi.updateRecord("bah_interactions", recordId, record).then(
                    function success(result) {
                        console.log(result);
                        context.data.refresh();
                    },
                    function(error) {
                        console.log(error.message);
                    }
                );      
            }
                                                     
        },
        function (error) {
            console.log(error.message);            
        }
    );    
    
}

function reassignBackToTeamFromView(primaryControl, selectedItemsReferences) {     

    var teamPromiseArray = [];
    for (i = 0; i < selectedItemsReferences.length; i++) {
        
        var recordId = selectedItemsReferences[i].Id;

        var originalFetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                                "<entity name='vhacrm_areaintersection'>" +
                                    "<attribute name='mcs_defaultroutetoteamid' />" +
                                    "<order attribute='vhacrm_name' descending='false' />" +
                                    "<link-entity name='bah_interactions' from='vhacrm_interactionpurposeid' to='vhacrm_areaintersectionid' link-type='inner' alias='ad'>" +
                                    "<attribute name='bah_interactionsid' />" +
                                    "<filter type='and'>" +
                                        "<condition attribute='bah_interactionsid' operator='eq' uitype='bah_interactions' value='" + recordId + "' />" +
                                    "</filter>" +
                                    "</link-entity>" +
                                "</entity>" +
                                "</fetch>";
        var escapedFetchXML = encodeURIComponent(originalFetchXML);

        var getTeamPromise = new Promise(function(resolve, reject){
            return Xrm.WebApi.retrieveMultipleRecords("vhacrm_areaintersection", "?fetchXml=" + escapedFetchXML).then(
                function success(results) {
                    resolve(results);                                           
                },
                function (error) {
                    console.log(error.message);
                    reject(error);
                }
            );
        } );
        teamPromiseArray.push(getTeamPromise);                     
    }

    Promise.all(teamPromiseArray).then(function (returnedTeams) {
        var updatePromiseArray = [];
        for (var j = 0; j < returnedTeams.length; j++) {
            var row = returnedTeams[j];
            if(row.entities.length > 0) {
                var defaultTeamGuid = row.entities[0]["_mcs_defaultroutetoteamid_value"];                
                var interactionId = row.entities[0]["ad.bah_interactionsid"]; 

                var record = {};
                record["ownerid@odata.bind"] = "/teams(" + defaultTeamGuid+ ")"; // Owner

                var updateInteractionPromise = new Promise(function(resolve, reject){
                    return Xrm.WebApi.updateRecord("bah_interactions", interactionId, record).then(
                        function success(result) {
                            resolve(result);
                        },
                        function(error) {
                            console.log(error.message);
                            reject(error);
                        }
                    );
                });
                updatePromiseArray.push(updateInteractionPromise);    
            }            
        } 
        Promise.all(updatePromiseArray).then(            
            function success(results) {
                if(results.length > 0) {                
                    Xrm.Utility.refreshParentGrid(results[0]);
                }
            },
            function(error) {
                console.log(error.message);
            });

    });        
}
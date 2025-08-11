function launchReplyQuickCreate(context) {
    var recordId = context.data.entity.getId();
    var originalMessageId = context.getAttribute("mcs_originalmessageid").getValue();
    var veteranId = context.getAttribute("mcs_veteran").getValue();
    var subject = context.getAttribute("mcs_name").getValue();
    var vetHomeCaseId = context.getAttribute("mcs_vethomecaseid").getValue();

    var originalMessageIdOnNewRecord = null;
    if(originalMessageId)
        originalMessageIdOnNewRecord = originalMessageId;
    else
        originalMessageIdOnNewRecord = recordId

    if(subject.indexOf("re:") == -1) {
        subject = "re: " + subject;
    }
    
	var formOptions = {};
	formOptions.entityName = "mcs_portalmessage";
	formOptions.useQuickCreateForm = false;

	var formParams = {};
	formParams.mcs_name = subject;
    formParams.mcs_originalmessageid = originalMessageIdOnNewRecord;
    formParams.mcs_replytomessageid = recordId;
    formParams.mcs_veteran = veteranId;
    formParams.mcs_vethomecaseid = vetHomeCaseId;

	Xrm.Navigation.openForm(formOptions, formParams).then(
		function (success) {
			console.log(success);
		},
		function (error) {
			console.log(error);
		}
	);
}

function SendMessage(context) {
    //Status reason to Pending Send
    context.getAttribute("statuscode").setValue(153190000);
    context.data.entity.save();
    console.log("Sending Message Completed!");
}

function assignToSelfFromView(primaryControl, selectedItemsReferences) {

    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var currentuserid = userSettings.userId.replace("{", "").replace("}", "");

    for (i = 0; i < selectedItemsReferences.length; i++) {
        var recordId = selectedItemsReferences[i].Id;

        var user = {};
        user["ownerid@odata.bind"] = "/systemusers(" + currentuserid +")"; // Owner

        Xrm.WebApi.updateRecord("mcs_portalmessage", recordId, user).then(
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
    Xrm.WebApi.updateRecord("mcs_portalmessage", recordId, record).then(
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

     var originalFetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                "<entity name='mcs_portalmessage'>" +
                                    "<attribute name='mcs_portalmessageid' />" +
                                    "<attribute name='mcs_name' />" +
                                    "<order attribute='mcs_name' descending='false' />" +
                                    "<filter type='and'>" +
                                        "<condition attribute='mcs_portalmessageid' operator='eq' uiname='re: originating team test' uitype='mcs_portalmessage' value='" + recordId + "' />" +
                                    "</filter>" +
                                    "<link-entity name='mcs_portalmessage' from='mcs_portalmessageid' to='mcs_replytomessageid' visible='false' link-type='outer' alias='aa'>" +
                                        "<attribute name='mcs_originatingteamid' />" +
                                    "</link-entity>" +
                                    "</entity>" +
                                "</fetch>";

    var escapedFetchXML = encodeURIComponent(originalFetchXML);

    Xrm.WebApi.retrieveMultipleRecords("mcs_portalmessage", "?fetchXml=" + escapedFetchXML).then(
        function success(results) {
            if(results.entities.length == 1) {debugger;
                var defaultTeamGuid = results.entities[0]["aa.mcs_originatingteamid"];        
                var record = {};
                record["ownerid@odata.bind"] = "/teams(" + defaultTeamGuid+ ")"; // Owner
                
                Xrm.WebApi.updateRecord("mcs_portalmessage", recordId, record).then(
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

        var originalFetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                    "<entity name='mcs_portalmessage'>" +
                                        "<attribute name='mcs_portalmessageid' />" +
                                        "<attribute name='mcs_name' />" +
                                        "<order attribute='mcs_name' descending='false' />" +
                                        "<filter type='and'>" +
                                            "<condition attribute='mcs_portalmessageid' operator='eq' uitype='mcs_portalmessage' value='" + recordId + "' />" +
                                        "</filter>" +
                                        "<link-entity name='mcs_portalmessage' from='mcs_portalmessageid' to='mcs_replytomessageid' link-type='inner' alias='aa'>" +
                                            "<attribute name='mcs_originatingteamid' />" +
                                            "<filter type='and'>" +
                                                "<condition attribute='mcs_originatingteamid' operator='not-null' />" +
                                            "</filter>" +
                                        "</link-entity>" +
                                        "</entity>" +
                                    "</fetch>";
        console.log("xml")
        console.log(originalFetchXML);
        var escapedFetchXML = encodeURIComponent(originalFetchXML);

        var getTeamPromise = new Promise(function(resolve, reject){
            return Xrm.WebApi.retrieveMultipleRecords("mcs_portalmessage", "?fetchXml=" + escapedFetchXML).then(
                
                function success(results) {
                    console.log("results");
                    console.log(results);
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
                var defaultTeamGuid = row.entities[0]["aa.mcs_originatingteamid"];                
                var interactionId = row.entities[0]["mcs_portalmessageid"]; 
                var messageName = row.entities[0]["mcs_name"]; 
               
                var record = {};
                record["ownerid@odata.bind"] = "/teams(" + defaultTeamGuid+ ")"; // Owner

                var updateInteractionPromise = new Promise(function(resolve, reject){
                    return Xrm.WebApi.updateRecord("mcs_portalmessage", interactionId, record).then(
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
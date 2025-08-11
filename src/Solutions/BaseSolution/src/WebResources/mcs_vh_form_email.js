if (typeof VETHOME == 'undefined') { VETHOME = { __namespace: true }; }

if (typeof (VETHOME.Email) == "undefined") {
    VETHOME.Email = {
        __namespace: true
    };
}

if (typeof (VETHOME.Email.Constants) == "undefined") {
    VETHOME.Email.Constants = {
        __namespace: true
    };
}

VETHOME.Email.Constants.CREATE_FORM = 1;
VETHOME.Email.Constants.UPDATE_FORM = 2;
VETHOME.Email.Constants.COETEAM = "2b54d4f6-d3a3-ed11-aad0-001dd80721cf";
VETHOME.Email.Constants.COE_EMAILINBOX = "c99f00fe-76b8-ed11-83fe-001dd80724a2";
VETHOME.Email.Constants.COE_EMAILINBOX_NAME = "VET-Home COE Inbox";
VETHOME.Email.Constants.VETHOME_EMAILBOX = "3d7e328b-3b97-ed11-aad1-001dd80721cf";
VETHOME.Email.Constants.VETHOME_EMAILBOX_NAME = "VET-HOME Intake Center";

VETHOME.Email.Functions = function () {

    function onLoad(executionContext) {        
        var formContext = executionContext.getFormContext();

        //set the inbox value on From field
        if(formContext.ui.getFormType() == VETHOME.Email.Constants.CREATE_FORM) {
        
           var regarding = formContext.getAttribute("regardingobjectid").getValue();

           if (regarding != null && regarding[0].id != null) 
           {
                var type = regarding[0].entityType ;
                if(type == "bah_interactions")
                {
                    //retrieve email address and set on To field 
                    Xrm.WebApi.retrieveRecord("bah_interactions", regarding[0].id, "?$select=mcs_emailaddress,bah_interactionsid,_vhacrm_interactionpurposeid_value").then(
                        function success(result) {
                            if (result != null) {
                                if (result.mcs_emailaddress != null)
                                {
                                    formContext.getAttribute('to').setValue(
                                    [
                                        {
                                        name: result.mcs_emailaddress,
                                        entityType: 'unresolvedaddress',
                                        id: '{00000000-0000-0000-0000-000000000000}'
                                        }
                                    ]);

                                    if(result._vhacrm_interactionpurposeid_value != null)
                                    {
                                        SetFromField(formContext,result._vhacrm_interactionpurposeid_value,result.bah_firstname_text,result.bah_lastname_text);
                                    }
                                }
                                else
                                {
                                    DisplayErrorAndGoBack(formContext);
                                }
                            }
                        },
                        function(error) {
                        alert(error.message);
                
                        }
                    );
                }
                else if( type == "mcs_vethomecase")
                {
                    //retrieve email address and set on To field 
                    Xrm.WebApi.retrieveRecord("mcs_vethomecase", regarding[0].id, "?$select=_mcs_veteranid_value").then(
                        function success(result1) {
                            if (result1 != null) 
                            {
                                var vetId = result1._mcs_veteranid_value;
                                if( vetId != null)
                                {
                                    Xrm.WebApi.retrieveRecord("contact", vetId, "?$select=emailaddress1,firstname,lastname").then(
                                    
                                    function success(result2) 
                                    {
                                        if (result2 != null) 
                                        {
                                            if (result2.emailaddress1 != null)
                                            {
                                                
                                                formContext.getAttribute('to').setValue(
                                                [
                                                    {
                                                    name: result2.emailaddress1,
                                                    entityType: 'contact',
                                                    id: vetId
                                                    }
                                                ]);
                                                SetVetHomeFrom(formContext);        
                                                SetVETHomeEmailBody(formContext,result2.firstname,result2.lastname)
                                            }
                                            else{
                                                DisplayErrorAndGoBack(formContext);
                                            }
                                        }
                                    });
                                }
                            }
                        },
                        function(error) {
                        alert(error.message);
                
                        }
                    );
                    
                }
            }
        }
    }
        

  function onSave(executionContext) {
        //
    }
    return {
        OnLoad: onLoad,
        OnSave: onSave
    };

}();

function SetVetHomeFrom(formContext)
{
    var partlistData = new Array();
    partlistData[0] = new Object();
    partlistData[0].id = VETHOME.Email.Constants.VETHOME_EMAILBOX;
    partlistData[0].name = VETHOME.Email.Constants.VETHOME_EMAILBOX_NAME;
    partlistData[0].entityType = "queue";

    formContext.getAttribute("from").setValue(partlistData);
}

function SetVETHomeEmailBody(formContext,first,last)
{
    var signature;
    signature = "<br><br><br><br><br><br><br><br><br>";
    
    GetEnvironmentVariable("mcs_EmailSignature",
        function(success)
        {
            if(success !== "")
            {
                signature += success;
                formContext.getAttribute("description").setValue(signature);
            }
        },
        function (error) { 
            console.log("Error retrieving environment value");
        } 
    );
    
}

function SetCOEEmailBody(formContext,first,last)
{
    var signature;
    //signature = "<br>Dear " + first + " " + last + "," +
    signature = "<br><br><br><br><br><br><br><br><br>"; 

    GetEnvironmentVariable("mcs_VETHomeCOEEmailSignature",
        function(success)
        {
            if(success !== "")
            {
                signature += success;
                formContext.getAttribute("description").setValue(signature);
            }
        },
        function (error) { 
            console.log("Error retrieving environment value");
        } 
    );

    

}

function SetFromField(formContext,purposeId,first,last)
{
     //retrieve email address and set on To field 
     Xrm.WebApi.retrieveRecord("vhacrm_areaintersection", purposeId, "?$select=_mcs_defaultroutetoteamid_value,vhacrm_areaintersectionid").then(
        function success(result) {
            if (result != null) {
                var partlistData = new Array();

                if (result._mcs_defaultroutetoteamid_value == VETHOME.Email.Constants.COETEAM)
                {
                    partlistData[0] = new Object();
                    partlistData[0].id = VETHOME.Email.Constants.COE_EMAILINBOX;
                    partlistData[0].name =VETHOME.Email.Constants.COE_EMAILINBOX_NAME;
                    partlistData[0].entityType = "queue";

                    formContext.getAttribute("from").setValue(partlistData);

                    SetCOEEmailBody(formContext,first,last);

                   
                }
                else
                {
                    var partlistData = new Array();
                    partlistData[0] = new Object();
                    partlistData[0].id = VETHOME.Email.Constants.VETHOME_EMAILBOX;
                    partlistData[0].name =VETHOME.Email.Constants.VETHOME_EMAILBOX_NAME;
                    partlistData[0].entityType = "queue";

                    formContext.getAttribute("from").setValue(partlistData);

                    SetVETHomeEmailBody(formContext,first,last);
                }
                
            }
        },
        function(error) {
            alert(error.message);
        }
    );
}


function DisplayErrorAndGoBack(formContext)
{
    
    //alert("Email is not provided on Contact Us submission.")
    var alertStrings = { confirmButtonLabel: "Ok", text: "Email Address is not provided on contact-us submission. Redirecting back to Interaction form.", title: "Error: Information Missing" };
    var alertOptions = { height: 120, width: 330 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function (success) {
            var attributes = formContext.data.entity.attributes.get();
            for (var i in attributes)
            {       
                attributes[i].setSubmitMode("never"); 
            }
            
            window.history.back();
        },
        function (error) {
            console.log(error.message);
        }
    );
}

//function to return environment variables
function GetEnvironmentVariable(varName, onSuccess, onError){ 
    "use strict"; 
     Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", "?$select=defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '"+varName+"'").then( 
    
   function success(result) { 
        var varValue = null; 
        for (var i = 0; i < result.entities.length; i++) { 
            if(typeof(result.entities[i]["environmentvariabledefinition_environmentvariablevalue"]) !== "undefined" 
                && result.entities[i]["environmentvariabledefinition_environmentvariablevalue"].length > 0) 
            { 
                if(result.entities[i]["environmentvariabledefinition_environmentvariablevalue"][i].value != null)
                    varValue = result.entities[i]["environmentvariabledefinition_environmentvariablevalue"][i].value; 
                else
                    varValue = result.entities[i].defaultvalue;

            } 
            else if(typeof(result.entities[i].defaultvalue) !== "undefined") 
            { 
                varValue = result.entities[i].defaultvalue; 
            } 
            else{ 
                varValue = null; 
            } 
        }     
        
        onSuccess(varValue); 
        }, 
            
        function (error) { 
            onError(error);
        } 
    ); 
    
} 
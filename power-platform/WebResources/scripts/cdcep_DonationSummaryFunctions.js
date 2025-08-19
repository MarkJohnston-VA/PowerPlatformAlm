var CDCEP = CDCEP || {};
CDCEP.DonationSummaryForm = CDCEP.DonationSummaryForm || {};
//CDCEP.DonationSummaryForm.customDonorFilter = "<filter type='and'><condition attribute='cdcep_donortype' operator='eq' value='{0}' /></filter>";
//CDCEP.DonationSummaryForm.globalFormContext = null;
//CDCEP.DonationSummaryForm.gridRefreshCount = 0;
CDCEP.DonationSummaryForm.Variables = {
	OverrideDateValidation: true,
	customDonorFilter: "<filter type='and'><condition attribute='cdcep_donortype' operator='eq' value='{0}' /></filter>",
	globalFormContext: null,
	gridRefreshCount: 0
};
CDCEP.DonationSummaryForm.SECURITY_ROLE = {
	SYSTEM_ADMIN: "System Administrator",
	FACILITY_CHIEF: "CDCEP - Facility Chief",
	FACILITY_SPECIALIST: "CDCEP - Facility Specialist",
	NATIONAL_ADMIN: "CDCEP - National Admin",
	OFFICE_ASSISTANT: "CDCEP - Volunteer/Office assistant"
}
CDCEP.DonationSummaryForm.OnLoad = function (executionContext)
{
	var formContext = executionContext.getFormContext();
	CDCEP.DonationSummaryForm.Variables.globalFormContext = executionContext.getFormContext();
	CDCEP.DonationSummaryForm.RemoveLegacyDonorTypeOptions(executionContext);
	var eDonation = formContext.getAttribute("cdcep_edonationid").getValue();
	if (eDonation !== null && eDonation !== undefined)
	{
		formContext.getControl("cdcep_donationtype").setDisabled(true);
		formContext.getAttribute("cdcep_donationtype").setSubmitMode("always");
		formContext.getControl("cdcep_facilityid").setDisabled(true);
		formContext.getAttribute("cdcep_facilityid").setSubmitMode("always");
		formContext.getControl("cdcep_donationdate").setDisabled(true);
		formContext.getAttribute("cdcep_donationdate").setSubmitMode("always");
		formContext.getControl("cdcep_donationtype").setDisabled(true);
		formContext.getAttribute("cdcep_donationtype").setSubmitMode("always");
		formContext.getControl("cdcep_edonationid").setDisabled(true);
		formContext.getAttribute("cdcep_edonationid").setSubmitMode("always");
		formContext.getControl("cdcep_epaytrackingid").setDisabled(true);
		formContext.getAttribute("cdcep_epaytrackingid").setSubmitMode("always");
	}
	var donorType = formContext.getAttribute("cdcep_donortype").getValue();
	if (donorType !== null && donorType !== undefined)
	{
		if (donorType === 100000003)
		{
			formContext.getAttribute("cdcep_donortype").setSubmitMode("always");
			// If Donor Type = Org unlock for Nation Admin and Chief and System Admin
			if (CDCEP.DonationSummaryForm.CheckUserRole(CDCEP.DonationSummaryForm.SECURITY_ROLE.NATIONAL_ADMIN) || CDCEP.DonationSummaryForm.CheckUserRole(CDCEP.DonationSummaryForm.SECURITY_ROLE.FACILITY_CHIEF) || CDCEP.DonationSummaryForm.CheckUserRole(CDCEP.DonationSummaryForm.SECURITY_ROLE.SYSTEM_ADMIN))
			{
				formContext.getControl("cdcep_donortype").setDisabled(false);
			}
			else
			{
				formContext.getControl("cdcep_donortype").setDisabled(true);
			}
		}
		else
		{
			if (formContext.ui.getFormType() === 1)
			{
				formContext.getAttribute("cdcep_affiliationid").setValue(null);
			}
		}
	}
	CDCEP.DonationSummaryForm.OnDonationTypeChange(executionContext);
	formContext.getControl("cdcep_donorid").addPreSearch(function ()
	{
		CDCEP.DonationSummaryForm.filterDonorLookup(formContext)
	});
	//CDCEP.DonationSummaryForm.CheckRecordCount(formContext);
	if (formContext.ui.getFormType() == 2) CDCEP.DonationSummaryForm.SubgridEventHandler(formContext);
	//Jarrett added CRMCDCEP-1653
	//CDCEP.DonationSummaryForm.FiscalYear(executionContext);
}
CDCEP.DonationSummaryForm.SubgridEventHandler = function (formContext)
{
	var gridContext = formContext.getControl("SUBGRID_donationdetails");
	//Verify the subgrid is loaded, if not recursively call function again
	//debugger;
	if (gridContext != null && gridContext != undefined)
	{
		//don't try to pass formEontext some time it doesn't works
		gridContext.addOnLoad(CDCEP.DonationSummaryForm.SubgridFunctionExe);
	}
	else
	{
		//debugger;
		setTimeout(function ()
		{
			CDCEP.DonationSummaryForm.SubgridEventHandler(formContext);
		}, 1000);
	}
}
//It triggers onLoad of form, on load and on refresh of subgrid
//as well on add new record and on delete of record it will trigger
CDCEP.DonationSummaryForm.SubgridFunctionExe = function ()
{
	// here use globalFormContext
	//debugger;
	if (CDCEP.DonationSummaryForm.Variables.gridRefreshCount < 1)
	{
		CDCEP.DonationSummaryForm.Variables.gridRefreshCount++;
		setTimeout(function ()
		{
			CDCEP.DonationSummaryForm.Variables.gridRefreshCount = 0;
		}, 3000);
		CDCEP.DonationSummaryForm.Variables.globalFormContext.data.refresh(false);
	}
	else
	{
		CDCEP.DonationSummaryForm.Variables.gridRefreshCount = 0;
	}
}
CDCEP.DonationSummaryForm.OnDonationTypeChange = function (executionContext)
{
	var formContext = executionContext.getFormContext();
	var donationType = formContext.getAttribute("cdcep_donationtype").getValue();
	//alert(donationType);
	formContext.getControl("cdcep_epaytrackingid").setVisible(false);
	formContext.getAttribute("cdcep_epaytrackingid").setRequiredLevel("none");
	formContext.getControl("cdcep_checkdate").setVisible(false);
	formContext.getAttribute("cdcep_checkdate").setRequiredLevel("none");
	formContext.getControl("cdcep_checknumber").setVisible(false);
	formContext.getAttribute("cdcep_checknumber").setRequiredLevel("none");
	formContext.getControl("cdcep_creditcardtype").setVisible(false);
	formContext.getAttribute("cdcep_creditcardtype").setRequiredLevel("none");
	formContext.getControl("cdcep_creditcardtransactionid").setVisible(false);
	formContext.getAttribute("cdcep_creditcardtransactionid").setRequiredLevel("none");
	formContext.getControl("cdcep_fieldservicereceipt").setVisible(false);
	formContext.getAttribute("cdcep_fieldservicereceipt").setRequiredLevel("none");
	formContext.ui.tabs.get("GeneralTab").sections.get("GeneralTab_section_edonation").setVisible(false);
	formContext.ui.tabs.get("tab_InMemoryOf").setVisible(false);
	switch (donationType)
	{
		case 100000000:
			//Cash
			formContext.ui.tabs.get("tab_InMemoryOf").setVisible(true);
			formContext.getControl("cdcep_fieldservicereceipt").setVisible(true);
			break;
		case 100000001:
			//Check
			formContext.ui.tabs.get("tab_InMemoryOf").setVisible(true);
			formContext.getControl("cdcep_fieldservicereceipt").setVisible(true);
			formContext.getControl("cdcep_checkdate").setVisible(true);
			formContext.getControl("cdcep_checknumber").setVisible(true);
			formContext.getAttribute("cdcep_checknumber").setRequiredLevel("required");
			break;
		case 100000002:
			//Item
			break;
		case 100000003:
			//Activity
			break;
		case 100000004:
			//E-Donation
			formContext.ui.tabs.get("tab_InMemoryOf").setVisible(true);
			formContext.getControl("cdcep_fieldservicereceipt").setVisible(true);
			formContext.getControl("cdcep_epaytrackingid").setVisible(true);
			formContext.getAttribute("cdcep_epaytrackingid").setRequiredLevel("required");
			formContext.ui.tabs.get("GeneralTab").sections.get("GeneralTab_section_edonation").setVisible(true);
			break;
		case 100000005:
			//Credit Card
			formContext.ui.tabs.get("tab_InMemoryOf").setVisible(true);
			formContext.getControl("cdcep_fieldservicereceipt").setVisible(true);
			formContext.getControl("cdcep_creditcardtype").setVisible(true);
			formContext.getAttribute("cdcep_creditcardtype").setRequiredLevel("required");
			formContext.getControl("cdcep_creditcardtransactionid").setVisible(true);
			formContext.getAttribute("cdcep_creditcardtransactionid").setRequiredLevel("none");
			break;
	}
}


CDCEP.DonationSummaryForm.RemoveLegacyDonorTypeOptions = function (executionContext)
{
	var formContext = executionContext.getFormContext();
	if (formContext.ui.getFormType() == 1)
	{
		formContext.getControl('cdcep_donortype').removeOption(100000001); //Org and Individual
		formContext.getControl('cdcep_donortype').removeOption(100000002); //Other Groups and Individual
		formContext.getControl('cdcep_donortype').removeOption(100000004); //Other Groups
	}
	else
	{
		var donorType = formContext.getAttribute("cdcep_donortype").getValue();
		if (donorType !== null && donorType !== undefined)
		{
			if (donorType === 100000001 || donorType === 100000002 || donorType === 100000004)
			{
				if (donorType === 100000001)
				{
					formContext.getControl('cdcep_donortype').removeOption(100000002); //Other Groups and Individual
					formContext.getControl('cdcep_donortype').removeOption(100000004); //Other Groups
				}
				else if (donorType === 100000002)
				{
					formContext.getControl('cdcep_donortype').removeOption(100000001); //Org and Individual
					formContext.getControl('cdcep_donortype').removeOption(100000004); //Other Groups
				}
				else if (donorType === 100000004)
				{
					formContext.getControl('cdcep_donortype').removeOption(100000001); //Org and Individual
					formContext.getControl('cdcep_donortype').removeOption(100000002); //Other Groups and Individual
				}
			}
			else
			{
				formContext.getControl('cdcep_donortype').removeOption(100000001); //Org and Individual
				formContext.getControl('cdcep_donortype').removeOption(100000002); //Other Groups and Individual
				formContext.getControl('cdcep_donortype').removeOption(100000004); //Other Groups
			}
		}
		else
		{
			formContext.getControl('cdcep_donortype').removeOption(100000001); //Org and Individual
			formContext.getControl('cdcep_donortype').removeOption(100000002); //Other Groups and Individual
			formContext.getControl('cdcep_donortype').removeOption(100000004); //Other Groups
		}
	}
}
CDCEP.DonationSummaryForm.OnDonorTypeChange = function (executionContext, isOnLoad)
{
	var formContext = executionContext.getFormContext();
	var donorType = formContext.getAttribute("cdcep_donortype").getValue();
	if (donorType !== null && donorType !== undefined)
	{
		CDCEP.DonationSummaryForm.Variables.customDonorFilter = "<filter type='and'><condition attribute='cdcep_donortype' operator='eq' value='" + donorType + "' /></filter>";
		if (donorType === 100000005) //Unknown
		{
			formContext.getAttribute("cdcep_donorid").setRequiredLevel("none");
			formContext.getControl("cdcep_donorid").setDisabled(true);
			formContext.getAttribute("cdcep_donorid").setSubmitMode("always");
			Xrm.WebApi.online.retrieveMultipleRecords("contact", "?$select=contactid,cdcep_donortype,fullname&$filter=cdcep_donortype eq 100000005&$top=1").then(

			function success(results)
			{
				for (var i = 0; i < results.entities.length; i++)
				{
					formContext.getAttribute("cdcep_donorid").setValue([
					{
						id: results.entities[i]["contactid"],
						name: results.entities[i]["fullname"],
						entityType: "contact"}]);
				}
			},

			function (error)
			{
				Xrm.Utility.alertDialog(error.message);
			});
		}
		else
		{
			formContext.getAttribute("cdcep_donorid").setRequiredLevel("required");
			formContext.getAttribute("cdcep_donorid").setSubmitMode("always");
			if (formContext.ui.getFormType() === 2) formContext.getControl("cdcep_donorid").setDisabled(false);
			if (!isOnLoad)
			{
				formContext.getAttribute("cdcep_donorid").setValue(null);
			}
		}
	}
}
CDCEP.DonationSummaryForm.filterDonorLookup = function (formContext)
{
	formContext.getControl("cdcep_donorid").addCustomFilter(CDCEP.DonationSummaryForm.Variables.customDonorFilter);
}
CDCEP.DonationSummaryForm.LockFields = function (lock, formContext)
{
	formContext.ui.controls.forEach(function (control, i)
	{
		if (control && control.getDisabled && !control.getDisabled())
		{
			control.setDisabled(lock);
		}
	});
}
CDCEP.DonationSummaryForm.CheckUserRole = function (roleName)
{
	const matchingRoles = Xrm.Utility.getGlobalContext().userSettings.roles.get(function (Role)
	{
		return Role.name === roleName;
	});
	return matchingRoles.length > 0;
}

CDCEP.GetDonationDetails = async function (cdcep_donationsummaryid)
{
    var showGPFResetDialog = false;
    await Xrm.WebApi.online.retrieveMultipleRecords("cdcep_donationdetails",
        `?$select=_cdcep_donationsummaryid_value,cdcep_donationvalue,_cdcep_generalpostfundid_value
        &$filter=_cdcep_donationsummaryid_value eq ${cdcep_donationsummaryid} and _cdcep_generalpostfundid_value ne null`).then(results => {
            console.table(results);
            for (var i = 0; i < results.entities.length; i++)
            {
                var result = results.entities[i];
                // Columns
                var cdcep_generalpostfundid = result["_cdcep_generalpostfundid_value"]; // Lookup
                var cdcep_generalpostfundid_formatted = result["_cdcep_generalpostfundid_value@OData.Community.Display.V1.FormattedValue"];
                
                //alert(cdcep_donationvalue + " " + " " + cdcep_donationdetailsid);
                
                if (cdcep_generalpostfundid_formatted != null && cdcep_generalpostfundid_formatted != undefined && cdcep_generalpostfundid != "")
                {
                    showGPFResetDialog = true;
                    break;
                }
            }
        })
        .catch(error => 
        {
            console.log(error.message);
        });
        return showGPFResetDialog;
}

CDCEP.GetDonationDetailsForNoGPF = async function (cdcep_donationsummaryid)
{
    var showGPFRequiredDialog = false;
    await Xrm.WebApi.online.retrieveMultipleRecords("cdcep_donationdetails",
        `?$select=_cdcep_donationsummaryid_value,cdcep_donationvalue,_cdcep_generalpostfundid_value
        &$filter=_cdcep_donationsummaryid_value eq ${cdcep_donationsummaryid} and _cdcep_generalpostfundid_value eq null`).then(results => {
            console.log(results.entities.length);
            var results = results.entities.length;
            if(results > 0)
            {
                showGPFRequiredDialog = true;
            }
        })
        .catch(error => 
        {
            console.log(error.message);
        });
        return showGPFRequiredDialog;
}

 async function getEnvironmentVariable(schemaName) {
     var value = null;

    // Get the matching environment variable definition with related values
     var data = await Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", "?$top=1" +
         "&$select=environmentvariabledefinitionid,defaultvalue" +
         "&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)" +
         `&$filter=schemaname eq '${schemaName}'`);

    if (data && data.entities && data.entities.length > 0) {
         // Definition exists
         var definition = data.entities[0];

        // Use the default value only if no related values
         value = definition.defaultvalue;

        // Get the related value if provided
         if (definition.environmentvariabledefinition_environmentvariablevalue.length > 0) {
             value = definition.environmentvariabledefinition_environmentvariablevalue[0].value;
         }
     }

    return value;
 }

//const flowURL = `https://prod-62.usgovtexas.logic.azure.us:443/workflows/cc766d8a07cb463a999b1c7b53591d13/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rbvI6777fuDE9EF5yppA7xTheXuBD_FMsujVE-FLA_c`;
// Popup confirmation before running the flow
const confirmationOptionsShow = true; // use false if no confirmation is needed
const confirmationOptionsText = "The selection Donation type does not include a GPF.  The GPF for the related Donation Details records will be removed."; // Confirmation text
const confirmationOptionsTitle = "Remove GPF?"; // Confirmation header
const confirmationOptionsHeight = 250; // Height
const confirmationOptionsWidth = 500; // Width
const confirmationOptionsOKLabel = "Yes, Remove GPF"; // Confirm button text
const confirmationOptionsCancelLabel = "No, don't change anything"; // Cancel button text

// Top bar notification while flow is running
const flowRunningOptionsShow = true; // use false if no message is needed
const flowRunningOptionsText = "Working on removing GPF values, please wait..."; // Notification text

// Top bar notification when the flow has finished successfully
const flowRunningOptionsSuccessShow = true; // use false if no message is needed
const flowRunningOptionsSuccess = "The GPF values have been removed."; // Notification text

// Popup confirmation when the flow has finished successfully
const successOptionsShow = false; // use true if a popup message should be shown
const successOptionsText = "The GPF values have been removed."; // Confirmation text
const successOptionsTitle = "GPF removed successfully."; // Confirmation header
const successOptionsHeight = 250; // Height
const successOptionsWidth = 200; // Width
const successOptionsConfirmationLabel = "Ok"; // Confirm button text

// Popup confirmation if the flow has finished with an error
const errorOptionsShow = false; // use true if a popup message should be shown
const errorOptionsText = "The flow has failed"; // Confirmation text
const errorOptionsTitle = "Error"; // Confirmation header
const errorOptionsHeight = 200; // Height
const errorOptionsWidth = 150; // Width
const errorOptionsConfirmationLabel = "Ok"; // Confirm button text

// Top bar notification if the flow has finished with an error
const flowRunningOptionsErrorShow = true; // use false if no message is needed
const flowRunningOptionsError = "The flow has finished with an error"; // Confirmation text

// Clear top bar after X seconds
const removeNotificationsOptions = 10000; // Milliseconds

// Refresh the form when the flow has finished
const refreshFormOptions = true; // use false if the form should not be refreshed

// Save the record before the flow is running
const saveFormBeforeRunningOptions = false; // use false if the record should not be saved (higher risk of failure)

// NO NEED TO CHANGE BELOW CODE //

// Get record ID
const getEntityValues = async (FormContext) => {
    const entityId = FormContext.data.entity.getId().replace("{", "").replace("}", "");
    return entityId;
};

// Send the entityId to Power Automate
const postEntityId = async (recordId) => {

   let flowUrlValue = await getEnvironmentVariable("cdcep_ENV_VAR_ClearGPFValueFlow");
   console.log(flowUrlValue);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donationSummaryId: recordId }),
        redirect: 'follow'
    };

    try {
        //debugger;
        const response = await fetch(flowUrlValue, requestOptions);
        return response.ok;
    } catch (error) {
        console.error('Failed to post entity ID:', error);
        return false;
    }
};

CDCEP.ClearGPFValueUsingFlow = async function (cdcep_donationsummaryid, FormContext)
{

	try {
        const entityId = await getEntityValues(FormContext);

        // Show confirmation dialog
        if (confirmationOptionsShow) {
            const confirmStrings = { text: confirmationOptionsText, title: confirmationOptionsTitle, confirmButtonLabel: confirmationOptionsOKLabel, cancelButtonLabel: confirmationOptionsCancelLabel };
            const confirmOptions = { height: confirmationOptionsHeight, width: confirmationOptionsWidth };
            const confirmed = await new Promise((resolve) => {
                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                    function (success) {
                        resolve(success.confirmed);
                    }
                );
            });

            if (!confirmed) {
                return;
            }
        }


        // Save the form before running the flow
        if (saveFormBeforeRunningOptions) {
            await FormContext.data.entity.save();
        }

        // Show flow is running notification
        if (flowRunningOptionsShow) {
            FormContext.ui.setFormNotification(flowRunningOptionsText, "INFO", entityId);
        }
        
        const flowCompleted = await postEntityId(entityId);

        if (flowCompleted) {
            // Refresh the form
            if (refreshFormOptions) {
                FormContext.data.refresh(false);
            }
            // Success message to user
            if (flowRunningOptionsSuccessShow) {
                FormContext.ui.setFormNotification(flowRunningOptionsSuccess, "INFO", entityId);
            }
            // Success popup to user
            if (successOptionsShow) {
                const confirmStringsSuccess = { text: successOptionsText, title: successOptionsTitle, confirmButtonLabel: successOptionsConfirmationLabel };
                const confirmOptionsSuccess = { height: successOptionsHeight, width: successOptionsWidth };
                Xrm.Navigation.openAlertDialog(confirmStringsSuccess, confirmOptionsSuccess);
            }
        } else {
            // Error notification to user
            if (flowRunningOptionsErrorShow) {
                FormContext.ui.setFormNotification(flowRunningOptionsError, "ERROR", entityId);
            }
            // Error popup to user
            if (errorOptionsShow) {
                const confirmStringsError = { text: errorOptionsText, title: errorOptionsTitle, confirmButtonLabel: errorOptionsConfirmationLabel };
                const confirmOptionsError = { height: errorOptionsHeight, width: errorOptionsWidth };
                Xrm.Navigation.openAlertDialog(confirmStringsError, confirmOptionsError);
            }
        }
        // Clear notifications
        if (flowRunningOptionsErrorShow || flowRunningOptionsSuccessShow || flowRunningOptionsShow) {
            setTimeout(function () {
                FormContext.ui.clearFormNotification(entityId);
            }, removeNotificationsOptions);
        }
    } catch (error) {
        console.log(`ClearGPFValueUsingFlow function failed: ${error}`);
    } finally {
        console.log("ClearGPFValueUsingFlow function stopped");
    }

}

CDCEP.ShowGPFRequiredDialog = async function (cdcep_donationsummaryid, FormContext)
{

	try {
        const entityId = await getEntityValues(FormContext);

        // Show confirmation dialog
        if (confirmationOptionsShow) {
           var alertStrings = {
                    confirmButtonLabel: "Ok",
                    text: "You have selected a donation type that requires a General Post Fund. Please update all donation details with the necessary General Post Fund values.",
                    title: "General Post Fund Required"
                };
                var alertOptions = {
                    height: 260,
                    width: 400
                };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(

                function (success)
                {
                    return;
                },

                function (error)
                {
                    console.log(error.message);
                });
        }


        // Save the form before running the flow
        if (saveFormBeforeRunningOptions) {
            await FormContext.data.entity.save();
        }

      
    } catch (error) {
        console.log(`ShowGPFRequiredDialog function failed: ${error}`);
    } finally {
        console.log("ShowGPFRequiredDialog function stopped");
    }

}

CDCEP.DonationSummaryForm.CallGPFClearFlow = async function (executionContext, isOnLoad, isOnSave)
{
    var formContext = executionContext.getFormContext();
    var donationTypeValue = formContext.getAttribute("cdcep_donationtype").getValue();
    var donationTypeChanged = formContext.getAttribute("cdcep_donationtype").getIsDirty();
    var entityId = parent.Xrm.Utility.getPageContext().input.entityId;            
    console.clear();
    
    console.log(donationTypeValue);
    
    if(donationTypeChanged)
    {
        if(donationTypeValue === 100000002 || donationTypeValue === 100000003)
        {
            //alert('Save Called:' + donationTypeChanged);
            
            if (entityId != null && entityId != undefined && entityId != "")
            {
                var id = entityId.replace("{", '').replace("}", '');
                //alert(id);
                if (id != null && id != undefined && id != "")
                {
                    var result = await CDCEP.GetDonationDetails(id);
                    console.log(result);
                    if(result){
                        await CDCEP.ClearGPFValueUsingFlow(id, formContext);
                    }
                }
             }
        }
        
        if(donationTypeValue === 100000000 || donationTypeValue === 100000001 || donationTypeValue === 100000004 || donationTypeValue === 100000005)
        {
            //alert('Save Called:' + donationTypeChanged);
                //var id = parent.Xrm.Utility.getPageContext().input.entityId.replace("{", '').replace("}", '');
                if (entityId != null && entityId != undefined && entityId != "")
                {
                    var id = entityId.replace("{", '').replace("}", '');
                    //alert(id);
                    if (id != null && id != undefined && id != "")
                    {
                        var result = await CDCEP.GetDonationDetailsForNoGPF(id);
                        console.log(result);
                        if(result){
                            await CDCEP.ShowGPFRequiredDialog(id, formContext);
                        }
                    }
                }
        }
    }
}
CDCEP.DonationSummaryForm.DateValidation = function (executionContext, isOnLoad, isOnSave)
{
	var formContext = executionContext.getFormContext();
	if (formContext !== null && formContext !== undefined)
	{
		var date = formContext.getAttribute("cdcep_donationdate").getValue();
		if (date !== null && date !== undefined)
		{
			date.setHours(0, 0, 0, 0);
			var todayDate = new Date();
			todayDate.setHours(0, 0, 0, 0);
			if (date > todayDate)
			{
				var alertStrings = {
					confirmButtonLabel: "Ok",
					text: "Donation for Future Date is Not Allowed.",
					title: "Donation Future Date Validation"
				};
				var alertOptions = {
					height: 260,
					width: 400
				};
				Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(

				function (success)
				{
					formContext.getAttribute("cdcep_donationdate").setValue(null);
					return;
				},

				function (error)
				{
					console.log(error.message);
				});
			}
			else
			{
				if (CDCEP.DonationSummaryForm.CheckUserRole(CDCEP.DonationSummaryForm.SECURITY_ROLE.FACILITY_CHIEF) || CDCEP.DonationSummaryForm.CheckUserRole(CDCEP.DonationSummaryForm.SECURITY_ROLE.FACILITY_SPECIALIST) || CDCEP.DonationSummaryForm.CheckUserRole(CDCEP.DonationSummaryForm.SECURITY_ROLE.OFFICE_ASSISTANT))
				{
					if (CDCEP.DonationSummaryForm.Variables.OverrideDateValidation === false)
					{
						var isDateInFiscalYear = new CustomApi.IsDateInCurrentFiscalYear(date);
						return new Promise(function (resolve, reject)
						{
							Xrm.WebApi.online.execute(isDateInFiscalYear).then(

							function success(result)
							{
								var isInRage = false;
								result.json().then(

								function (response)
								{
									//TODO: Add your logic here. In this case, we may want to read the output parameter defined using the following code:
									isInRage = response.IsInRange;
									resolve(isInRage);
									var currentdatetime = new Date(); //   12/1/2023
									var currentdatetimeMonth = currentdatetime.getMonth() + 1;
									var currentdatetimeDay = currentdatetime.getDate();
									var currentdatetimeYear = currentdatetime.getFullYear();
									var dateMonth = date.getMonth() + 1;
									var dateYear = date.getFullYear();
									var lockRecord = false;
									if (isInRage) lockRecord = false;
									else
									{
										if (currentdatetimeMonth == 10 && currentdatetimeDay < 15)
										{
											if ((dateMonth <= 9 && dateYear === currentdatetimeYear) || (dateMonth > 9 && dateYear === currentdatetimeYear - 1)) //09/05/2022
											lockRecord = false;
											else lockRecord = true;
										}
										else lockRecord = true;
									}
									if (isOnLoad)
									{
										CDCEP.DonationSummaryForm.LockFields(lockRecord, formContext);
									}
									else if (isOnSave)
									{
										if (lockRecord)
										{
											executionContext.getEventArgs().preventDefault();
										}
									}
									else
									{
										if (lockRecord)
										{
											var alertStrings = {
												confirmButtonLabel: "Ok",
												text: "Date not within fiscal year. Please specify date for this fiscal year.",
												title: "Donation Date Validation"
											};
											var alertOptions = {
												height: 260,
												width: 400
											};
											Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(

											function (success)
											{
												formContext.getAttribute("cdcep_donationdate").setValue(null);
												return;
											},

											function (error)
											{
												console.log(error.message);
											});
										}
									}
								});
								//debugger;
							},

							function (error)
							{
								reject(error.message);
								Xrm.Navigation.openErrorDialog(
								{
									details: error.message,
									message: 'An error occurred while calling the IsDateInCurrentFiscalYear Custom API.'
								});
							});
						});
					}
					else
					{
						var cutOffDate = new Date(2021, 10, 1);
						cutOffDate.setHours(0, 0, 0, 0);
						if (date < cutOffDate)
						{
							if (isOnLoad)
							{
								CDCEP.DonationSummaryForm.LockFields(true, formContext);
							}
							else
							{
								if (isOnSave)
								{
									formContext.getAttribute("cdcep_donationdate").setValue(null);
									executionContext.getEventArgs().preventDefault();
								}
								var alertStrings = {
									confirmButtonLabel: "Ok",
									text: "Please specify date on or after 11/1/2021.",
									title: "Donation Date Validation"
								};
								var alertOptions = {
									height: 260,
									width: 400
								};
								Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(

								function (success)
								{
									formContext.getAttribute("cdcep_donationdate").setValue(null);
									return;
								},

								function (error)
								{
									console.log(error.message);
								});
							}
						}
					}
				}
			}
		}
	}
}
// Updates the state lookup when the address state oob field is changed
CDCEP.DonationSummaryForm.UpdateStateLookup = function (executionContext)
{
	var formContext = executionContext.getFormContext();
	var stateText = formContext.getAttribute("cdcep_ackstate").getValue();
	var fetchXml = "?fetchXml=<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'><entity name='cdcep_state'><attribute name='cdcep_stateid' /><filter type='and'><condition attribute='cdcep_name' operator='eq' value='" + stateText + "' /></filter></entity></fetch>";
	Xrm.WebApi.retrieveMultipleRecords("cdcep_state", fetchXml).then(

	function success(result)
	{
		for (var i = 0; i < result.entities.length; i++)
		{
			var stateLookup = [];
			stateLookup[0] = {};
			stateLookup[0].id = result.entities[i]["cdcep_stateid"];
			stateLookup[0].name = stateText;
			stateLookup[0].entityType = "cdcep_state";
			formContext.getAttribute("cdcep_ackstateid").setValue(stateLookup);
		}
	},

	function (error)
	{
		console.log(error.message);
	});
}
// Shows/Hides the Bing address search web resource based
// on the "Enter Address Manually" field
// Also shows/hides the yellow geolocation banner
CDCEP.DonationSummaryForm.ConfigureGeoLocationPieces = function (executionContext)
{
	CDCEP.DonationSummaryForm.HideAddressSearchControl(executionContext);
}
// Shows/Hides the Bing address search web resource based
// on the "Enter Address Manually" field
CDCEP.DonationSummaryForm.HideAddressSearchControl = function (executionContext)
{
	var formContext = executionContext.getFormContext();
	var manualAddress = formContext.getAttribute("cdcep_ackenteraddressmanually").getValue();
	var overrideAddress = formContext.getAttribute("cdcep_showacknowledgementaddress").getValue();
	var wrControl = formContext.getControl("WebResource_addressverification");
	if (overrideAddress === true)
	{
		if (wrControl)
		{
			if (manualAddress === true)
			{
				wrControl.setVisible(false);
			}
			else
			{
				wrControl.setVisible(true);
			}
		}
	}
	else
	{
		wrControl.setVisible(false);
	}
}
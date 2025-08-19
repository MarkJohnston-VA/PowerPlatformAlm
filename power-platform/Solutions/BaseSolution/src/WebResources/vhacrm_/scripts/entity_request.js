/// <reference path="Common/CommCareShared.min.js"/>
/// <reference path="mcs_Constants.js"/>

/// Change Flag 2023 Dec 22 16:08 10404

if (typeof CommCare == 'undefined') { CommCare = { __namespace: true }; }

if (typeof (CommCare.Request) == "undefined") {
	CommCare.Request = {
		__namespace: true
	};
}

if (typeof (CommCare.Request.Global) == "undefined") {
	CommCare.Request.Global = {
		__namespace: true
	};
}

if (typeof (CommCare.Request.Constants) == "undefined") {
	CommCare.Request.Constants = {
		__namespace: true
	};
}

if (typeof (CommCare.Request.QuickCreate) == "undefined") {
	CommCare.Request.QuickCreate = {
		__namespace: true
	};
}


CommCare.Request.Global.FormType = null;
CommCare.Request.Global.ClaimMessageShowing = false;
CommCare.Request.Global.DoHubFetch = "";
CommCare.Request.Global.ReturnToVAMCFetch = "";
CommCare.Request.Global.AssignedToQuickCreateFetch = "";
CommCare.Request.Global.RouteActionLookupFetch = "";

CommCare.Request.Constants.CCWF_DEFAULT_LOB_NAME = "Customer Experience";
CommCare.Request.Constants.CurrentFormType = "Main";

// CRMCC-7414 -> moved initializations to InitializeInteractWithStuff()
CommCare.Request.Constants.ShowFieldsInteractedWith ;
CommCare.Request.Constants.AllShowFieldsInteractedWith;
CommCare.Request.Constants.ACRHideFieldsInteractedWith;
CommCare.Request.Constants.CCRHideFieldsInteractedWith;
CommCare.Request.Constants.AllHideFieldsInteractedWith;
CommCare.Request.Constants.SetRequiredInteractedWith;
CommCare.Request.Constants.AllSetRequiredInteractedWith;
CommCare.Request.Constants.SetNotRequiredInteractedWith;
CommCare.Request.Constants.AllSetNotRequiredInteractedWith;

var isValidationNeeded = true;
var saveErrorOccurred = false;
var isValidationNeeded_HandleCustomerCareOnSave = true;
var hasRequestActionChanged = false;

var SaveMode = {
	Save: 1,
	SaveAndClose: 2,
	SaveAndNew: 59,
	AutoSave: 70
};

CommCare.Request.Global = (function () {
	return {
		OnLoad: form_OnLoad,
		NewTopicButtonTrigger: newTopicButtonTrigger,
		USD_NewTopicButtonTrigger: USD_newTopicButtonTrigger,
		ShowMviFromRibbon: showMviFromRibbon,
		USD_ShowMviFromRibbon: USD_showMviFromRibbon,
		OpenTask: openTask,
		RouteActionButton: routeActionButton,
		//CallDCUGetDebtorNameFromKNumberAction: CallDCUGetDebtorNameFromKNumberAction,
		//USD_CallDCUGetDebtorNameFromKNumberAction: USD_CallDCUGetDebtorNameFromKNumberAction,  CRMCC-7147 body commented out
		//OpenBillFromKNumber: OpenBillFromKNumber,
		//USD_OpenBillFromKNumber: USD_OpenBillFromKNumber,  CRMCC-7147 body commented out
		GeneratePQIForm: GeneratePQIForm,
		USD_GeneratePQIForm: USD_GeneratePQIForm,
		AdditionalRequestButton: AdditionalRequestButton_Click,
		USD_SaveForm: SaveForm
	}

	function InitializeInteractWithStuff() { // CRMCC-7414 -> the first call in the OnLoad event
		CommCare.Request.Constants.ShowFieldsInteractedWith =
		{
			ccwf_tin_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.VeteranRepresentative],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.Other],
			ccwf_providerfacility_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice],
			vhacrm_otherrelationship_text: [],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_stateid: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_lastname_text: [],
			vhacrm_provideraddressline1_text: [],
			vhacrm_providercity_text: [],
			vhacrm_providerstateid: [],
			vhacrm_providerzip_text: []
		};
		CommCare.Request.Constants.AllShowFieldsInteractedWith =
		{
			ccwf_tin_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.VeteranRepresentative],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.Other],
			ccwf_providerfacility_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship],
			vhacrm_otherrelationship_text: [],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_city_text: [],
			vhacrm_interaction_stateid: [],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_lastname_text: [],
			vhacrm_provideraddressline1_text: [],
			vhacrm_providercity_text: [],
			vhacrm_providerstateid: [],
			vhacrm_providerzip_text: [],
			ccwf_interactionpurpose: [],
			vhacrm_firstname_text: []
		};
		CommCare.Request.Constants.ACRHideFieldsInteractedWith =
		{
			ccwf_tin_text: [],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			ccwf_providerfacility_text: [],
			vhacrm_otherrelationship_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_stateid: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_lastname_text: [],
			vhacrm_provideraddressline1_text: [CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providercity_text: [CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providerstateid: [CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providerzip_text: [CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other]
		};
		CommCare.Request.Constants.CCRHideFieldsInteractedWith =
		{
			ccwf_tin_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			ccwf_providerfacility_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_otherrelationship_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_stateid: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_lastname_text: [],
			vhacrm_provideraddressline1_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providercity_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providerstateid: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providerzip_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other]
		};
		CommCare.Request.Constants.AllHideFieldsInteractedWith =
		{
			ccwf_tin_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			ccwf_providerfacility_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_otherrelationship_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_interaction_stateid: [CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_lastname_text: [],
			vhacrm_provideraddressline1_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_providercity_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_providerstateid: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_providerzip_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			ccwf_interactionpurpose: [],
			vhacrm_firstname_text: []
		};
		CommCare.Request.Constants.SetRequiredInteractedWith =
		{
			ccwf_tin_text: [],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.VeteranRepresentative],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.Other],
			ccwf_providerfacility_text: [],
			vhacrm_otherrelationship_text: [],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_stateid: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_lastname_text: [],
			vhacrm_provideraddressline1_text: [],
			vhacrm_providercity_text: [],
			vhacrm_providerstateid: [],
			vhacrm_providerzip_text: []
		};
		CommCare.Request.Constants.AllSetRequiredInteractedWith =
		{
			ccwf_tin_text: [],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.VeteranRepresentative],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.Other],
			ccwf_providerfacility_text: [],
			vhacrm_otherrelationship_text: [],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_stateid: [],
			vhacrm_interaction_zip_text: [],
			vhacrm_lastname_text: [CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_provideraddressline1_text: [],
			vhacrm_providercity_text: [],
			vhacrm_providerstateid: [],
			vhacrm_providerzip_text: [],
			ccwf_interactionpurpose: [CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_firstname_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other]
		};
		CommCare.Request.Constants.SetNotRequiredInteractedWith =
		{
			ccwf_tin_text: [CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			ccwf_providerfacility_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_otherrelationship_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_stateid: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_lastname_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice],
			vhacrm_provideraddressline1_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providercity_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providerstateid: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_providerzip_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other]
		};
		CommCare.Request.Constants.AllSetNotRequiredInteractedWith =
		{
			ccwf_tin_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_vsooffice_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_othertitle_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			ccwf_providerfacility_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_otherrelationship_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_relationshiptoveteran_code: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VeteranRepresentative, CommCare.Constants.Integers.InteractedWith.VAEmployee, CommCare.Constants.Integers.InteractedWith.Other],
			vhacrm_interaction_addressline1_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_city_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice, CommCare.Constants.Integers.InteractedWith.Veteran, CommCare.Constants.Integers.InteractedWith.VAEmployee],
			vhacrm_interaction_stateid: [CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_interaction_zip_text: [CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_lastname_text: [CommCare.Constants.Integers.InteractedWith.TPA, CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice],
			vhacrm_provideraddressline1_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_providercity_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_providerstateid: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			vhacrm_providerzip_text: [CommCare.Constants.Integers.InteractedWith.MeaningfulRelationship, CommCare.Constants.Integers.InteractedWith.TPA],
			ccwf_interactionpurpose: [CommCare.Constants.Integers.InteractedWith.Provider, CommCare.Constants.Integers.InteractedWith.CommunityProviderOffice],
			vhacrm_firstname_text: []
		};
	}

	function SaveForm() {
		CommCare.Shared.FormContext.data.save().then(
			() => {
				console.log("Save From USD");
			},
			(e) => {
				console.log("Error in Save from USD", e);
			}
		);
	}

	function AdditionalRequestAcrSetAction(context) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		if (context.getEventSource().getName() == "vhacrm_areaintersectionid") {
			//var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));// fixed CRMCC-7217
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed fixed CRMCC-7217
			var purposeID = CommCare.Shared.GetCleanId(purpose);
			var actionIdParam = CommCare.Shared.GetFieldValue("p_actionintersectionid"); //CommCare.Shared.FormContext.data.attributes.get("p_actionintersectionid").getValue();
			var actionNameParam = CommCare.Shared.GetFieldValue("p_actionintersectionname"); //CommCare.Shared.FormContext.data.attributes.get("p_actionintersectionname").getValue();
			//if (purposeName == "ACR" && actionIdParam != null && actionNameParam != null) {  CRMCC-7217
			if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID) && actionIdParam != null && actionNameParam != null) {
				var lookup = [{
					name: actionNameParam,
					id: actionIdParam,
					entityType: 'vhacrm_actionintersection'
				}];

				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", lookup);
			}
		}
	}

	function AdditionalRequestButton_Click(triggerSource) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		console.log(triggerSource);
		console.log(CommCare.Shared.FormContext);

		var interactionLookupVal = CommCare.Shared.GetFieldValue("bah_interactionstorequestid");
		if (interactionLookupVal === undefined || interactionLookupVal === null) {
			CommCare.Shared.FormContext.ui.setFormNotification("No associated interaction!", "ERROR", "NOINTERACTION");
			return;
		}

		var parentInteraction = {
			entityType: "bah_interactions",
			id: interactionLookupVal[0].id
		};
		var entityFormOptions = {};
		entityFormOptions["entityName"] = "incident";
		entityFormOptions["useQuickCreateForm"] = true;
		entityFormOptions["createFromEntity"] = parentInteraction;

		var quickcreateparams = {};

		var customer = CommCare.Shared.GetFieldValue("customerid");
		if (customer !== undefined && customer !== null) {
			quickcreateparams["p_customerid"] = customer[0].id;
			quickcreateparams["p_customername"] = customer[0].name;
		}

		var ssn = CommCare.Shared.GetFieldValue("ccwf_ssn_text");
		if (ssn !== undefined && ssn !== null) {
			quickcreateparams["p_ssn_text"] = ssn;
		}

		var dob = CommCare.Shared.GetFieldValue("vhacrm_dateofbirth_date");
		if (dob !== undefined && dob !== null) {
			quickcreateparams["p_dob"] = dob.toDateString();
		}

		var homeFac = CommCare.Shared.GetFieldValue("ccwf_homefacility");
		if (homeFac !== undefined && homeFac !== null) {
			if (homeFac[0]["name"] !== "CX Contact Center") {// fix? from testing string to GUID 
				quickcreateparams["p_homefacilityid"] = homeFac[0].id;
				quickcreateparams["p_homefacilityname"] = homeFac[0].name;
			}
		}

		var homeVisn = CommCare.Shared.GetFieldValue("ccwf_visn");
		if (homeVisn !== undefined && homeVisn !== null) {
			if (homeVisn[0]["name"] !== "CX Contact Center") {// fix? from testing string to GUID 
				quickcreateparams["p_homevisnid"] = homeVisn[0].id;
				quickcreateparams["p_homevisnname"] = homeVisn[0].name;
			}
		}

		var serVisn = CommCare.Shared.GetFieldValue("vhacrm_visnid");
		if (serVisn !== undefined && serVisn !== null) {
			if (serVisn[0]["name"] !== "CX Contact Center") {// fix? from testing string to GUID 
				quickcreateparams["p_servicingvisnid"] = serVisn[0].id;
				quickcreateparams["p_servicingvisnname"] = serVisn[0].name;
			}
		}

		var servFac = CommCare.Shared.GetFieldValue("hrc_facilityid");
		if (servFac !== undefined && servFac !== null) {
			if (servFac[0]["name"] !== "CX Contact Center") {// fix? from testing string to GUID 
				quickcreateparams["p_servicingfacilityid"] = servFac[0].id;
				quickcreateparams["p_servicingfacilityname"] = servFac[0].name;
			}
		}

		//quickcreateparams["p_actionintersectionid"] = "373A123A-E562-EA11-A997-001DD800A749"; // fixed GUID CRMCC-7217
		quickcreateparams["p_actionintersectionid"] = CommCare.Constants.GUIDS.ActionIntersection.ACRCSCImmedateACR;
		quickcreateparams["p_actionintersectionname"] = "ACR CSC Immediate";

		quickcreateparams["p_routeoncreate"] = true;

		var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
		quickcreateparams["p_patsrid"] = patsrId;

		Xrm.Navigation.openForm(entityFormOptions, quickcreateparams).then(
			function (lookup) { console.log(lookup); },
			function (error) { console.error(error); }
		);
	}

	function quickCreateLoadParameters() {
		var cid = CommCare.Shared.FormContext.data.attributes.get("p_customerid").getValue();
		var cname = CommCare.Shared.FormContext.data.attributes.get("p_customername").getValue();
		var ssn = CommCare.Shared.FormContext.data.attributes.get("p_ssn_text").getValue();
		var dob = CommCare.Shared.FormContext.data.attributes.get("p_dob").getValue();
		var routeOnCreate = CommCare.Shared.FormContext.data.attributes.get("p_routeoncreate").getValue();
		var servicingFacilityId = CommCare.Shared.FormContext.data.attributes.get("p_servicingfacilityid").getValue();
		var servicingFacilityName = CommCare.Shared.FormContext.data.attributes.get("p_servicingfacilityname").getValue();
		var homeFacilityId = CommCare.Shared.FormContext.data.attributes.get("p_homefacilityid").getValue();
		var homeFacilityName = CommCare.Shared.FormContext.data.attributes.get("p_homefacilityname").getValue();
		var servVisnId = CommCare.Shared.FormContext.data.attributes.get("p_servicingvisnid").getValue();
		var servVisnName = CommCare.Shared.FormContext.data.attributes.get("p_servicingvisnname").getValue();
		var homeVisnId = CommCare.Shared.FormContext.data.attributes.get("p_homevisnid").getValue();
		var homeVisnName = CommCare.Shared.FormContext.data.attributes.get("p_homevisnname").getValue();
		var actionIntersectionId = CommCare.Shared.FormContext.data.attributes.get("p_actionintersectionid").getValue();
		var actionIntersectionName = CommCare.Shared.FormContext.data.attributes.get("p_actionintersectionname").getValue();


		if (cid !== null && cname !== null) {
			var customerVal = [{
				name: cname,
				entityType: "contact",
				id: cid
			}];

			CommCare.Shared.SetFieldValue("customerid", customerVal);
		}

		if (ssn !== null) {
			CommCare.Shared.SetFieldValue("ccwf_ssn_text", ssn);
		}

		if (dob !== null) {
			CommCare.Shared.SetFieldValue("vhacrm_dateofbirth_date", new Date(dob));
		}

		if (routeOnCreate !== null) {
			CommCare.Shared.SetFieldValue("mcs_routeoncreate", true);
		}

		if (servicingFacilityId !== null && servicingFacilityName !== null) {
			var lookup = [{
				name: servicingFacilityName,
				id: servicingFacilityId,
				entityType: 'bah_facility'
			}];
			CommCare.Shared.SetFieldValue("hrc_facilityid", lookup);

		}

		if (servVisnId !== null && servVisnName !== null) {
			var lookup = [{
				name: servVisnName,
				id: servVisnId,
				entityType: 'bah_visn'
			}];
			CommCare.Shared.SetFieldValue("vhacrm_visnid", lookup);
		}

		if (homeFacilityId !== null && homeFacilityName !== null) {
			var lookup = [{
				name: homeFacilityName,
				id: homeFacilityId,
				entityType: 'bah_facility'
			}];

			CommCare.Shared.SetFieldValue("ccwf_homefacility", lookup);
		}

		if (homeVisnId !== null && homeVisnName !== null) {
			var lookup = [{
				name: homeVisnName,
				id: homeVisnId,
				entityType: 'bah_visn'
			}];

			CommCare.Shared.SetFieldValue("ccwf_visn", lookup);
		}
		//if (actionIntersectionId !== null && actionIntersectionName !== null) {
		//    var lookup = [{
		//        name: actionIntersectionName,
		//        id: actionIntersectionId,
		//        entityType: 'vhacrm_actionintersection'
		//    }];

		//    CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", lookup);
		//}
	}

	async function form_OnLoad(context, formType) {
		InitializeInteractWithStuff();//CRMCC-7414
		if (formType !== undefined) {
			CommCare.Request.Constants.CurrentFormType = formType.toLowerCase();
		}
		CommCare.Shared.GetFormContext(context);
		//CommCare.Shared.HashHandler();
		//if (CommCare.Request.Constants.UserTeamMemberships.length < 1) {
		//	CommCare.Request.Constants.UserTeamMemberships = await GetUserRoles();
		//}
		//CRMCC-209 Moved so that the on save handler is only called once - Chad Marshall

		if (CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) {
			await navigateForm();
		}
		else {
			await onLoadCallback();
		}
	}

	async function onLoadCallback() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		var perfTimer;
		var startTimer;
		var endTimer;
		startTimer = performance.now();
		CommCare.Shared.FormContext.data.entity.addOnSave(form_OnSave);
		ResetDisabledFields();
		var entity = CommCare.Shared.FormContext.entityReference.entityType;
		var systemUserId = CommCare.Shared.FormContext.context.getUserId().replace("{", "").replace("}", "");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);
		if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) {// fix? from testing string to GUID 
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_ccwf_mivsearchrequest");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_SendEmailButton");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_VeteranAlerts");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "IFRAME_VeteranSidebar");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_request_north52_quick_referral_button");
		}

		if (lobName == CommCare.Shared.Constants.OCCFM_LOB_NAME) {// fix? from testing string to GUID 
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_mcs_RouteActionButtonFM");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_mcs_DebtorSearch");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_MVI");

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(systemUserId, "systemusers", "fullname,_positionid_value").then(function (user) {
				CommCare.Shared.IsCSR = user["_positionid_value"] == CommCare.Shared.Constants.Position.CSR ? true : false;
				CommCare.Shared.PreFilterPurposeforCSR(entity);
			});
		}

		if (CommCare.Shared.DefaultContactRecord == null)
			CommCare.Shared.GetDefaultContact();

		CommCare.Request.Global.FormType = CommCare.Shared.FormContext.ui.getFormType();
		if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM) {
			//GetCrmContactDetails();
			quickCreateLoadParameters();
			setCustomerForBOCProviders();
			retrievePreferredFacility();
			setRoutingReasonOptions();
			PatsrQuickCreate();
			var fieldList = ["vhacrm_areaintersectionid", "vhacrm_subareaintersectionid", "mcs_issuewasresolved", "vhacrm_actionintersectionid"];
			setOnChangeForMultipleFields(fieldList, PatsrQuickCreate)
			CommCare.Shared.SetOnChange("ccwf_homefacility", ClearEsrTimeoutNotification);
			CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", RequireComplaintNotesOnRequest);
			perfTimer = performance.now();
			endTimer = perfTimer - startTimer;
			console.log("Request-ShowFormLabels: " + endTimer.toString() + " milliseconds");
		}

		if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.UPDATE_FORM) {
			//navigateForm();
			acrTabsHideShow(true);
			GetCrmContactDetails();
			setRoutingReasonOptions();
			CommCare.Shared.LimitMethodOfDelivery();
			collapseBOCtoRequest();
			hideShowPatsrTabs();
			hideShowPatsrRejectReason();
			CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", hideShowPatsrRejectReason);
			hideShowQueueResolution();
			CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", hideShowQueueResolution);
			hideShowVSignalsQueueResolutionFields();
			lockTaskTitleAndDueDate()
		}

		if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.INACTIVE_FORM) {
			//navigateForm();
			acrTabsHideShow(true);
			hideShowPatsrTabs();
			hideShowVSignalsQueueResolutionFields();
		}
		///Set the prefilter
		preFilterPurposeDetailLookup();
		await preFilterRouteActionLookup(true);
		setTreatmentStatusPreFilter();

		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-preFilterRouteActionLookup: " + endTimer.toString() + " milliseconds");

		//Hide or show resolution based on lob, action and purpose
		await handleHiddenFields();
		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-handleHiddenFields: " + endTimer.toString() + " milliseconds");

		//invoke the Reference Business Rules and set the various onchange events to fire them as needed
		invokeBusinessRules();
		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-invokeBusinessRules: " + endTimer.toString() + " milliseconds");
		setBROnChangeEvents();

		if (CommCare.Shared.FormContext.getAttribute("ccwf_issuerequestor_code") !== null) {
			CommCare.Shared.LimitInteractedWithOptions(CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code"));
		}

		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-LimitInteractedWithOptions: " + endTimer.toString() + " milliseconds");
		//Check if a Home Facility is there and set VISN/CPAC
		setVISNfromHomeFac_OnChange("load");
		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-setVISNfromHomeFac_OnChange: " + endTimer.toString() + " milliseconds");
		//setServicingVISN();
		//HideSocialPaneItems();
		showHideCareTypeEscalationNotes();
		preFilterEscalateToTierOneReturnToVAMC();
		showEscalateToTier3();
		setAcceptingRequestForVisnOrServicingFac();

		enablePhoneNumberIfInvalidValue();
		lockTreatmentStatusOnVSignalsRequest();

		//lockPurposeForProviderRequests();
		//Add other events here
		//CommCare.Shared.SetOnChange("hac_boc_text", lookupOrCreateBOC);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", setBOCPrefix);
		//CommCare.Shared.SetOnChange("hac_pcduoissuenumber", OpenBillFromKNumber);
		//CommCare.Shared.SetOnChange("hac_pcduoissuenumber", CallDCUGetDebtorNameFromKNumberAction);

		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", navigateForm); //Nav
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", handleHiddenFields);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", showEscalateToTier3);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", AdditionalRequestAcrSetAction);
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", handleHiddenFields);
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", clearActionFromPurposeDetail_OnChange);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", handleHiddenFields);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", clearRoutingReasonFromAction_OnChange);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", setRoutingReasonOptions);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", clearAssignSupervisorsDateEscalateToCSCCor);
		CommCare.Shared.SetOnChange("ccwf_resolutionrequest", handleHiddenFields);
		CommCare.Shared.SetOnChange("ccwf_homefacility", setVISNfromHomeFac_OnChange);
		CommCare.Shared.SetOnChange("ccwf_visn", setCPACfromVISN_OnChange);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", clearFormValidations);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", clearFormValidations);
		CommCare.Shared.SetOnChange("vhacrm_routingreason_code", clearFormValidations);
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", clearFormValidations);
		CommCare.Shared.SetOnChange("hrc_facilityid", setServicingVISN);
		CommCare.Shared.SetOnChange("vhacrm_choiceops_siteid", setPRSServicingVISN);
		CommCare.Shared.SetOnChange("customerid", setCustomerName_OnChange);
		CommCare.Shared.SetOnChange("vhacrm_choiceops_visnid", updateFacAndVisn_ChoiceOps);
		CommCare.Shared.SetOnChange("vhacrm_choiceops_siteid", updateFacAndVisn_ChoiceOps);
		CommCare.Shared.SetOnChange("hac_pdinumber_text", handleRequestOnSaveFM); //!!!
		//CommCare.Shared.SetOnChange("mcs_boctorequest", refreshBOCQuickView);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", showHideCareTypeEscalationNotes);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", showHideCareTypeEscalationNotes);
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", showHideCareTypeEscalationNotes);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", preFilterEscalateToTierOneReturnToVAMC);
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", preFilterEscalateToTierOneReturnToVAMC);
		//CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", lockPurposeForProviderRequests);
		//CommCare.Shared.SetOnChange("hac_cl1_24hourcontactmade_bol", autoSaveContactMade);
		//CommCare.Shared.SetOnChange("hac_cl2_24hourcontactmade_bool", autoSaveContactMade);
		//CommCare.Shared.SetOnChange("hac_cl1_24hourattempted_bool", autoSaveContactMade);
		//CommCare.Shared.SetOnChange("hac_cl2_24hourattempted_bool", autoSaveContactMade);
		CommCare.Shared.SetOnChange("ccwf_fax_text", validateFaxNumber);
		CommCare.Shared.SetOnChange("vhacrm_faxnumber_text", validateFaxNumber);
		CommCare.Shared.SetOnChange("ccwf_phone_text", validatePhoneNumber);
		CommCare.Shared.SetOnChange("vhacrm_provider_phoneno_text", validatePhoneNumber);
		CommCare.Shared.SetOnChange("mcs_completedbyphonenumber", validatePhoneNumber);
		CommCare.Shared.SetOnChange("mcs_collectionsphonenumber", validatePhoneNumber);
		CommCare.Shared.SetOnChange("mcs_complaintphonenumber", validatePhoneNumber);
		CommCare.Shared.SetOnChange("ccwf_tinvendorization", validateTIN);
		CommCare.Shared.SetOnChange("ccwf_tin_text", validateTIN);
		//CommCare.Shared.SetOnChange("vhacrm_ahr_ob1resolution_code", preFilterRouteActionLookup);
		if (CommCare.Shared.FormContext.getAttribute("vhacrm_ahr_ob1resolution_code") != null) {
			CommCare.Shared.FormContext.getAttribute("vhacrm_ahr_ob1resolution_code").addOnChange(function () { preFilterRouteActionLookup(false) });
		}
		//CommCare.Shared.SetOnChange("vhacrm_ahr_ob1resolution_code", brRequireCommCareProgramForClosingTheLoop);
		CommCare.Shared.SetOnChange("mcs_patientperception", requireUnResolvedDetails);
		CommCare.Shared.SetOnChange("vhacrm_resolutionintersectionid", hideShowVSignalsQueueResolutionFields);
		CommCare.Shared.SetOnChange("mcs_treatmentstatus", lockTreatmentStatusOnVSignalsRequest);

		//short code ywB
		if (CommCare.Shared.FormContext.ui.getFormType() != 1) {
			var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
			//if (currentFormId == CommCare.Request.Constants.ACR_FORM) {
			// var validRoles1 = ["HAC Supervisor", "System Administrator", "Partner Group - CSC LOTW"]; CRMCC-7178
			//CommCare.Shared.CrmCommonJS.Security.UserHasRole(validRoles).then(function (isInRole) {
			//	if (!isInRole) {CRMCC-7178
			var validRoleIDs1 = [CommCare.Constants.GUIDS.Roles.HACSupervisor, CommCare.Constants.GUIDS.Roles.SystemAdministrator, CommCare.Constants.GUIDS.Roles.PartnerGroupCSCLOTW];

			//if (!await CommCare.Shared.isInRole(validRoleIDs1)) {
			//	CommCare.Shared.FormContext.ui.tabs.get("tab_5").setVisible(false);
			//}
			//}).catch(function (error) {CRMCC-7178
			//	console.log("Error Checking if user has role. Not disabling Complaint tab. Error Message: " + error);
			//});
			//}CRMCC-7178

			//short codes qIJ, fDp
			if ((currentFormId == CommCare.Constants.GUIDS.Forms.CCWF) &&
				(CommCare.Request.Global.FormType === CommCare.Shared.Constants.UPDATE_FORM)) {
				//var validRoles = ["Community Care - CSC Supervisor/Leadership"]; CRMCC-7178
				//CommCare.Shared.CrmCommonJS.Security.UserHasRole(validRoles).then(function (isInRole) { CRMCC-7178
				//if (isInRole) {
				var validRolIDs2 = [CommCare.Constants.GUIDS.Roles.CommunityCareCSCSupervisorLeadership];

				if (await CommCare.Shared.isInRole(validRolIDs2)) {
					CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", false); //qIJ
					CommCare.Shared.SetReadOnly("customerid", false); //fDp
				}
				//}).catch(function (error) { CRMCC-7178
				//	console.log("Error Checking if user has role. Not enabling Resolution and Customer fields. Error Message: " + error);
				//}); CRMCC-7178
			}

			//short code 2XO
			if (currentFormId == CommCare.Constants.GUIDS.Forms.CCWF) {
				CommCare.Shared.SetOnChange("ccwf_endingdate_date", validateMODBeginAndEndDates);
				CommCare.Shared.SetOnChange("ccwf_beginningdate_date", validateMODBeginAndEndDates);
			}
		}

		CommCare.Shared.SetOnChange("vhacrm_ahr_ob1resolution_code", setOB1Date);
		CommCare.Shared.SetOnChange("vhacrm_ahr_ob1resolution_code", setMemoRequiredTradCC);
		setMemoRequiredTradCC(true);//CRMCC-7300
		console.log("Passed setMemoRequiredTradCC(true) in onLoadCallback");
		CommCare.Shared.SetOnChange("vhacrm_ahr_ob1resolution_code", setNotRequiredFieldsWhenNACR);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_choiceops_status_code", "vhacrm_actionintersectionid", "mcs_operationsfinalstatus"], setNotRequiredFieldsWhenNACR);
		CommCare.Shared.SetOnChange("vhacrm_ahr_ob2resolution_code", setOB2Date);
		CommCare.Shared.SetOnChange("vhacrm_ahr_ob2resolution_code", setNotRequiredFieldsWhenNACR);
		CommCare.Shared.SetOnChange("vhacrm_cl_ob1resolution_code", setCLOB1Date);
		CommCare.Shared.SetOnChange("vhacrm_cl_ob2resolution_code", setCLOB2Date);
		CommCare.Shared.SetOnChange("vhacrm_cl_ob3resolution_code", setCLOB3Date);
		CommCare.Shared.SetOnChange("vhacrm_cl_ob1date_date", validateCTLOB1Date);
		CommCare.Shared.SetOnChange("vhacrm_cl_ob2date_date", validateCTLOB2Date);
		CommCare.Shared.SetOnChange("vhacrm_cl_ob3date_date", validateCTLOB3Date);
		//CommCare.Shared.SetOnChange("vhacrm_choiceops_status_code", validateACRChoiceOperationsStatus);
		//N52 formula conversion
		CommCare.Shared.SetOnChange("hac_pdinumber_text", pdiNumberOnChange);

		notesAttachedWarning(); // Display Form notification if Note(s) is attached to Request

		// For existing ACR Request - Not Adverse Credit Report
		setNotRequiredFieldsWhenNACR();

		// refresh timelinecontrol if Notes & Activities tab is clicked
		var tabNotes = CommCare.Shared.FormContext.ui.tabs.get("tab_16");
		var acrRequestDetailsTab = CommCare.Shared.FormContext.ui.tabs.get("tab_15");

		if (acrRequestDetailsTab !== null) {
			acrRequestDetailsTab.addTabStateChange(handleHiddenFields);
		}

		if (tabNotes !== null) {
			tabNotes.addTabStateChange(function () {

				// check to make sure tab is expanded, refresh notes control
				var tabNotes = CommCare.Shared.FormContext.ui.tabs.get("tab_16");

				if (tabNotes.getDisplayState() === "expanded") {
					CommCare.Shared.FormContext.getControl('Notes').refresh();
				}
			});
		}

		if (currentFormId == CommCare.Constants.GUIDS.Forms.CCWF) {
			acrTabsHideShow(true);
		}

		brShowOldACRStuff();
		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-LoadComplete: " + endTimer.toString() + " milliseconds");
		showHidePATSRResolutionsAndRejections(true);
		CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").addOnChange(function () { showHidePATSRResolutionsAndRejections(false) });

		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		//lockFormForPatsrRejection(getLookupName(action)); // fixed action CCCRM7217
		lockFormForPatsrRejection(CommCare.Shared.GetCleanId(action)); 
		preFilterResolutionIntersections();
		preFilterC3Purpose();
		preFilterC3ServiceRecoveryActions();
		showHideDocumentReceiptDateQC();
		showHideTaskTitle();
		CommCare.Shared.SetOnChange("vhacrm_areaintersection", showHideTaskTitle);
		//hideQueueResolutionForNonServiceRecoveryApprovalNonServiceRecoveryApprovalTeam();
		hideShowVSignalsQueueResolutionFields();
		//requireDueDateForServiceRecoveryRequests();
		//CommCare.Shared.SetOnChange("vhacrm_areaintersection", requireDueDateForServiceRecoveryRequests);
		hideShowRequestActionSubmittedRequest();
		CommCare.Shared.SetOnChange("statuscode", PatsrQuickCreate);


		//disallowFutureDocumentReceiptDates
		CommCare.Shared.SetOnChange("mcs_requestdocumentreceiptdate", disallowFutureDocumentReceiptDates);
		CommCare.Shared.SetOnChange("ccwf_duedate_date", disallowPastDueDates);
		hideShowVSignalsInfo();
		prefilterServiceRecoveryInteractionPurpose();
		prefilterRemoveGenericResolvedInteractionPurpose();
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", prefilterRemoveGenericResolvedInteractionPurpose);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", prefilterRemoveGenericResolvedInteractionPurpose);
		prefilterQueueResolutionRejectedByPatsR();
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "statuscode", "vhacrm_actionintersectionid"], prefilterQueueResolutionRejectedByPatsR);
		lockReceiptDateOnSaveWithTask();
		hideShowWhiteHouseHLTab();
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", hideShowWhiteHouseHLTab);
		//preFilterRemoveSendToPatsPurposesUpdateForm();
		requireRequestDescriptionOnServiceRecoveryApproval();
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", requireRequestDescriptionOnServiceRecoveryApproval);
		showHideWHHLFields();
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", showHideWHHLFields);
		prefilterDOHubActions(true);
		CommCare.Shared.FormContext.getAttribute("vhacrm_subareaintersectionid").addOnChange(function () { prefilterDOHubActions(false) });

		prefilterReturnToVAMC(true);
		CommCare.Shared.FormContext.getAttribute("vhacrm_areaintersectionid").addOnChange(function () { prefilterReturnToVAMC(false) });
		CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").addOnChange(function () { prefilterReturnToVAMC(false) });
		lockServicingFacilityVisnForPats();
		//showHideReasonForRejection();
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", showHideReasonForRejection);
		lockReasonForRejection();
		handleAssignedToQuickCreate();
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", handleAssignedToQuickCreate);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", handleAssignedToQuickCreate);

		//CRMCC-1976
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", onChangeOfRequestActionLockQueueResolution);
		CommCare.Shared.SetOnChange("vhacrm_resolutionintersectionid", onChangeOfQueueResolutionOrOB1LockRequestAction);
		CommCare.Shared.SetOnChange("vhacrm_cl_ob1resolution_code", onChangeOfQueueResolutionOrOB1LockRequestAction);
		CommCare.Shared.SetOnChange("vhacrm_ahr_ob1resolution_code", onChangeOfQueueResolutionOrOB1LockRequestAction);
		CommCare.Shared.FormContext.data.entity.addOnPostSave(refreshFormOnSave);
		doesQueueMatchRequestAction();
		hideShowNPI();
		CommCare.Shared.SetOnChange("ccwf_issuerequestor_code", hideShowNPI);
		CommCare.Shared.SetOnChange("mcs_npi", validateNPI);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", requirePurposeDetailForServiceRecovery);
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", requirePurposeDetailForServiceRecovery);
		//CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", preFilterRouteActionLookup);
		CommCare.Shared.FormContext.getAttribute("vhacrm_areaintersectionid").addOnChange(function () { preFilterRouteActionLookup(false) }); // CRMCC-4880 - moved from below if() so handler is set on edit form

		if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM) {
			requirePurposeDetailForServiceRecovery();
			hideTaskTitleQuickCreateForNonServiceRecovery();
			lockDueDateForPSDDTAClaimFU();
		}
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", hideTaskTitleQuickCreateForNonServiceRecovery);
		var xrmPage = CommCare.Shared.FormContext;
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = lob != null ? CommCare.Shared.DialogNameReturn(lob[0].name) : null;
		CommCare.Shared.LimitNonCoreOptions("vhacrm_noncorereason_code", lobName, null, xrmPage, null, "mcs_programtype");
		//CommCare.Shared.FormContext.getAttribute("bah_interactionsource_code").addOnChange(function () { CommCare.Shared.LimitNonCoreOptions("vhacrm_noncorereason_code", lobName, null, xrmPage, null, "bah_programtypeid") });
		CommCare.Shared.FormContext.getAttribute("vhacrm_areaintersectionid").addOnChange(function () { CommCare.Shared.LimitNonCoreOptions("vhacrm_noncorereason_code", lobName, null, xrmPage, null, "mcs_programtype") });
		//CommCare.Shared.FormContext.data.entity.addOnPostSave(lockAdditionalFollowUpWhenEsclating);		
		//CommCare.Shared.SetOnChange("hac_cl1_needescalationtosrsup_bool", lockAdditionalFollowUpWhenEsclating);
		showHideImageLocatorTypeOfCare();
		showHideTreatmentStatusSubType();
		CommCare.Shared.SetOnChange("mcs_treatmentstatus", clearSubTypeOnChangeOfTreatmentStatus);
		CommCare.Shared.SetOnChange("mcs_treatmentstatus", showHideTreatmentStatusSubType);
		lockQueueResolutionForSelectedActions();
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", lockQueueResolutionForSelectedActions);
		//hideShowEscalationNotes();
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", hideShowEscalationNotes);
		CommCare.Shared.SetOnChange("vhacrm_internalnumber_text", validateReferalNumber);
		CommCare.Shared.SetOnChange("mcs_setsubmitteraspointofcontact", requirePOCNamedEmployeeFields);
		CommCare.Shared.SetOnChange("mcs_setsubmitteraspointofcontact", setPOCUserData);
		showHideIntakeNoteFields();
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", showHideIntakeNoteFields);
		showHideMetadataTabs();
		CommCare.Shared.SetOnChange("vhacrm_subareaintersectionid", showHideMetadataTabs);
		CommCare.Shared.SetOnChange("mcs_pointofcontactphonenumber", validatePOCPhoneNumber);
		showHideIssueWasResolved();
		CommCare.Shared.SetOnChange("ccwf_programid", showHideIssueWasResolved);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", showHideIssueWasResolved);
		CommCare.Shared.SetOnChange("mcs_issuewasresolved", setActionBeingRequestedForIssueWasResolved);
		setActionBeingRequestedForIssueWasResolved();
		lockActionVISNVAMCBillingConcern();
		CommCare.Shared.SetOnChange("mcs_issuewasresolved", lockActionVISNVAMCBillingConcern);
		CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", lockActionVISNVAMCBillingConcern);
		requireRejectionReasonForRejectedAction();
		CommCare.Shared.SetOnChange("vhacrm_resolutionintersectionid", requireRejectionReasonForRejectedAction);
		CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", requireRejectionReasonForRejectedAction);
	}

	function enablePhoneNumberIfInvalidValue() {

		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed  CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		if (purposeValue !== null) {
			purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		}

		var fieldNames = [];
		//if (purposeName === "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			fieldNames[0] = "ccwf_phone_text";
			fieldNames[1] = "vhacrm_provider_phoneno_text";
			fieldNames[2] = "mcs_collectionsphonenumber";
		} else {
			fieldNames[0] = "ccwf_phone_text";
			fieldNames[1] = "mcs_completedbyphonenumber";
		}

		var validPhone = CommCare.Shared.ValidatePhoneOrFaxNumber("Request", programTypeName, fieldNames, "Phone");

		if (!validPhone) {

			for (var i = 0; i < fieldNames.length; i++) {

				CommCare.Shared.SetReadOnly(fieldNames[i], false);
			}
		}
	}

	function ClearEsrTimeoutNotification() {
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Constants.MessageIDs.SetHomeFacilityTimeout);
	}

	function notesAttachedWarning() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = lineOfBusiness != null ? CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) : null;

		if (lineOfBusinessName != CommCare.Shared.Constants.OCCFM_LOB_NAME) {
			var requestID = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
			if (requestID === "") {
				return;
			}
			var columns = "annotationid";
			var filter = "$filter=_objectid_value eq '" + requestID + "'";

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("annotations", columns, filter).then(function (results) {
				if (results.value.length > 0) {
					console.log("WARNING: Notes found attached to Request.");

					CommCare.Shared.FormContext.ui.setFormNotification("This Request has one or more Notes attached", "WARNING", CommCare.Constants.MessageIDs.RequestDoesNotExist);
				} else {
					console.log("No Notes are attached to Request.");

					CommCare.Shared.FormContext.ui.clearFormNotification(CommCare.Constants.MessageIDs.RequestDoesNotExist);
				}
			}).catch(function (error) {
				console.log("Error retrieving any Note records on Request: " + error.message);
				console.log(error);
			});
		}
	}

	function validateCTLOB1Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		validateCTLOBDate("OB1");
	}

	function validateCTLOB2Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		validateCTLOBDate("OB2");
	}

	function validateCTLOB3Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		validateCTLOBDate("OB3");
	}

	function validateCTLOBDate(dateField) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var isValid = false;
		var today = new Date();
		var obDate = "";
		var cl1Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1date_date");
		var cl2Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2date_date");
		var cl3Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3date_date");

		switch (dateField) {
			case "OB1":
				obDate = cl1Date;
				break;
			case "OB2":
				obDate = cl2Date;
				break;
			case "OB3":
				obDate = cl3Date;
				break;
		}

		CommCare.Shared.FormContext.ui.clearFormNotification("CTLBAD" + dateField + "DATE");
		CommCare.Shared.FormContext.ui.clearFormNotification("CTL2BADDATE");
		CommCare.Shared.FormContext.ui.clearFormNotification("CTL3BADDATE");

		if (obDate != null) obDate = new Date(obDate.getFullYear(), obDate.getMonth(), obDate.getDate());
		if (cl1Date != null) cl1Date = new Date(cl1Date.getFullYear(), cl1Date.getMonth(), cl1Date.getDate());
		if (cl2Date != null) cl2Date = new Date(cl2Date.getFullYear(), cl2Date.getMonth(), cl2Date.getDate());

		if (obDate != null) {
			if (obDate > today) {
				isValid = false;

				CommCare.Shared.FormContext.ui.setFormNotification("Closing the Loop " + dateField + " Date cannot be in the future.", "ERROR", "CTLBAD" + dateField + "DATE");
			}
			else {
				switch (dateField) {
					case "OB2":
						if (obDate < cl1Date) {
							CommCare.Shared.FormContext.ui.setFormNotification("Closing the Loop " + dateField + " Date cannot be prior to OB1 Date.", "ERROR", "CTL2BADDATE");
						}
						else {
							isValid = true;
						}
						break;
					case "OB3":
						if (obDate < cl1Date || obDate < cl2Date) {
							CommCare.Shared.FormContext.ui.setFormNotification("Closing the Loop " + dateField + " Date cannot be prior to OB1 or OB2 Date.", "ERROR", "CTL3BADDATE");
						}
						else {
							isValid = true;
						}
						break;
					default:
						isValid = true;
						break;
				}
			}
		}
		else {
			isValid = true;
		}

		if (isValid === false) {
			console.log("Invalid CTL OB Date.");
		}

		return isValid;
	}

	function setOB1Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");

		//if (purposeName == "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if (ob1Resolution != null) {
				var now = new Date();
				CommCare.Shared.SetFieldValue("vhacrm_ahr_ob1date_date", now);
			}
			else {
				CommCare.Shared.SetFieldValue("vhacrm_ahr_ob1date_date", null);
			}
		}
	}

	function setOB2Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

		//if (purposeName == "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if (ob2Resolution != null) {
				var now = new Date();
				CommCare.Shared.SetFieldValue("vhacrm_ahr_ob2date_date", now);
			}
			else {
				CommCare.Shared.SetFieldValue("vhacrm_ahr_ob2date_date", null);
			}
		}
	}

	function setCLOB1Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
		var ob1Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1date_date");

		//if (purposeName == "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if ((ob1Resolution != null) && (ob1Date == null)) {
				var now = new Date();
				CommCare.Shared.SetFieldValue("vhacrm_cl_ob1date_date", now);
			}
		}
	}

	function setCLOB2Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
		var ob2Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2date_date");

		//if (purposeName == "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if ((ob2Resolution != null) && (ob2Date == null)) {
				var now = new Date();
				CommCare.Shared.SetFieldValue("vhacrm_cl_ob2date_date", now);
			}
		}
	}

	function setCLOB3Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217
		var ob3Resolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");
		var ob3Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3date_date");

		//if (purposeName == "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if ((ob3Resolution != null) && (ob3Date == null)) {
				var now = new Date();
				CommCare.Shared.SetFieldValue("vhacrm_cl_ob3date_date", now);
			}
		}
	}

	function validateMODBeginAndEndDates() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var beginDate = CommCare.Shared.GetFieldValue("ccwf_beginningdate_date");
		var endDate = CommCare.Shared.GetFieldValue("ccwf_endingdate_date");

		if ((beginDate != null) && (endDate != null)) {
			if (endDate < beginDate) {
				CommCare.Shared.FormContext.ui.setFormNotification("Ending Date cannot be before the Beginning Date", "ERROR", "2XO");
				return false;
			}
			else
				CommCare.Shared.CrmCommonJS.Notification.ClearNotification("2XO");
			return true;
		}
		return true;
	}

	function validateValidityFromToDates() { // CRMCC-5972
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var beginDate = CommCare.Shared.GetFieldValue("mcs_validityfromdate");
		var endDate = CommCare.Shared.GetFieldValue("mcs_validitytodate");

		if ((beginDate != null) && (endDate != null)) {
			if (endDate < beginDate) {
				CommCare.Shared.FormContext.ui.setFormNotification("Validity To Date cannot be before the Validity From Date", "ERROR", "ValidityDatesInvalid");
				return false;
			}
			else {
				CommCare.Shared.CrmCommonJS.Notification.ClearNotification("ValidityDatesInvalid");
			}
		}
		return true;
	}

	function validateFaxNumber() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed  CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		var fieldNames = [];
		//if (purposeName === "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			fieldNames[0] = "vhacrm_faxnumber_text";
			fieldNames[1] = "ccwf_fax_text";
		} else {
			fieldNames[0] = "vhacrm_faxnumber_text";
			fieldNames[1] = "ccwf_fax_text";
		}

		var validFax = CommCare.Shared.ValidatePhoneOrFaxNumber("Request", programTypeName, fieldNames, "Fax");

		return validFax;
	}

	function validatePhoneNumber() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		var fieldNames = [];
		//if (purposeName === "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			fieldNames[0] = "ccwf_phone_text";
			fieldNames[1] = "vhacrm_provider_phoneno_text";
			fieldNames[2] = "mcs_collectionsphonenumber";
		} else {
			fieldNames[0] = "ccwf_phone_text";
			fieldNames[1] = "mcs_completedbyphonenumber";
			fieldNames[2] = "mcs_complaintphonenumber";
		}

		var validPhone = CommCare.Shared.ValidatePhoneOrFaxNumber("Request", programTypeName, fieldNames, "Phone");

		return validPhone;
	}

	function enablePhoneNumberIfInvalidValue() {

		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		var fieldNames = [];
		//if (purposeName === "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			fieldNames[0] = "ccwf_phone_text";
			fieldNames[1] = "vhacrm_provider_phoneno_text";
			fieldNames[2] = "mcs_collectionsphonenumber";
		} else {
			fieldNames[0] = "ccwf_phone_text";
			fieldNames[1] = "mcs_completedbyphonenumber";
		}

		var validPhone = CommCare.Shared.ValidatePhoneOrFaxNumber("Request", programTypeName, fieldNames, "Phone");

		if (!validPhone) {

			for (var i = 0; i < fieldNames.length; i++) {

				CommCare.Shared.SetReadOnly(fieldNames[i], false);
			}
		}
	}

	function validateTIN() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var validTIN = CommCare.Shared.ValidateTIN("Request");

		return validTIN;
	}

	function setRoutingReasonOptions() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var xrmPage = CommCare.Shared.FormContext;
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = lineOfBusiness != null ? CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) : null;

		if (lineOfBusinessName != CommCare.Shared.Constants.OCCFM_LOB_NAME) {
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
			var purposeID = CommCare.Shared.GetCleanId(purposeValue);
			//var purposeName = getLookupName(purposeValue);  CRMCC-7217
			var pickListFieldName = "vhacrm_routingreason_code";
			var routingReasonOptionSet = CommCare.Shared.FormContext.getControl(pickListFieldName);

			if (!routingReasonOptionSet) {
				return;
			}

			if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.UPDATE_FORM) {
				// Don't wipe value previously set
				var origRoutingReason = CommCare.Shared.GetFieldValue(pickListFieldName);
			}
			//Cache all existing options
			if (!window.routingReasonOptions) {
				window.routingReasonOptions = {};
				routingReasonOptions.ReferralRequiresModification = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.ReferralRequiresModification);//713770000); // fixed integer 7217
				routingReasonOptions.ApprovedConsultWithoutReferral = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.ApprovedConultWithoutReferral);//713770001); // fixed integer 7217
				routingReasonOptions.RFSRequiredRequested = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.SARRequiredRequested);//713770002); // fixed integer 7217
				routingReasonOptions.Other = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.Other);//713770003); // fixed integer 7217
				routingReasonOptions.Choice30 = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.Choice30);//713770004); // fixed integer 7217
				routingReasonOptions.Choice40 = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.Choice40);//713770005); // fixed integer 7217
				routingReasonOptions.ChoiceExcessiveBurdenNote = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.ChoiceExcessiveBurdenNote);//713770006); // fixed integer 7217
				routingReasonOptions.NeedsMedicalReviewDetermination = xrmPage.getAttribute(pickListFieldName).getOption(CommCare.Constants.Integers.RoutingReason.NeedsMedicalReviewDetermination);//713770007); // fixed integer 7217
			}

			routingReasonOptionSet.clearOptions();

			//switch (purposeName) { CRMCC-7217
				//case "Authorizations/Referrals": CRMCC-7217
			if (CommCare.Constants.Compare.PurposeIntersection.AuthorizationsReferrals(purposeID) ||
				//case "Appointments": CRMCC-7217
				CommCare.Constants.Compare.PurposeIntersection.Appointments(purposeID) ||
				//case "Claim Status": CRMCC-7217
				CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) {
				routingReasonOptionSet.addOption(routingReasonOptions.ReferralRequiresModification);
				routingReasonOptionSet.addOption(routingReasonOptions.ApprovedConsultWithoutReferral);
				routingReasonOptionSet.addOption(routingReasonOptions.RFSRequiredRequested);
				routingReasonOptionSet.addOption(routingReasonOptions.Other);
			}
			//		break;
			//case "Eligibility & Benefits": CRMCC-7217
			else if (CommCare.Constants.Compare.PurposeIntersection.EligibilityAndBenefits) {
				routingReasonOptionSet.addOption(routingReasonOptions.Choice30);
				routingReasonOptionSet.addOption(routingReasonOptions.ChoiceExcessiveBurdenNote);
			}
			//		break;
			//	default:
			else {
				routingReasonOptionSet.addOption(routingReasonOptions.ReferralRequiresModification);
				routingReasonOptionSet.addOption(routingReasonOptions.ApprovedConsultWithoutReferral);
				routingReasonOptionSet.addOption(routingReasonOptions.RFSRequiredRequested);
				routingReasonOptionSet.addOption(routingReasonOptions.Other);
				routingReasonOptionSet.addOption(routingReasonOptions.Choice30);
				routingReasonOptionSet.addOption(routingReasonOptions.Choice40);
				routingReasonOptionSet.addOption(routingReasonOptions.ChoiceExcessiveBurdenNote);
				routingReasonOptionSet.addOption(routingReasonOptions.NeedsMedicalReviewDetermination);
				//		break;
			}
			
			if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.UPDATE_FORM) {
				// Restore value previously set
				CommCare.Shared.SetFieldValue("vhacrm_routingreason_code", origRoutingReason);
			}
		}
	}

	function clearAssignSupervisorsDateEscalateToCSCCor() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(requestAction);
		//var requestName;

		if (requestAction !== null) {
			//requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);

			var formItem = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
			if (formItem != null) {
				var currentFormId = formItem.getId();
				if (currentFormId === CommCare.Constants.GUIDS.Forms.CCWF) {
					//if (requestName === "Escalation to CSC" || requestName === "Escalation to COR" || requestName === "Escalation to COR") { repeated OR clause fixed action CCCRM7217
					if (CommCare.Constants.Compare.ActionIntersection.EscalationToCSC(actionID) ||
						CommCare.Constants.Compare.ActionIntersection.EscalationToCOR(actionID)) {
						CommCare.Shared.SetFieldValue("vhacrm_assigntocscsupervisors_bool", false);
						setVisibleOnMultipleFields(["vhacrm_assignedtocscsupervisors_date"], false);
						CommCare.Shared.SetFieldValue("vhacrm_assignedtocscsupervisors_date", null);
					}
				}
			}
		}
	}


	function collapseBOCtoRequest() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = lineOfBusiness != null ? CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) : null;

		if (lineOfBusinessName == CommCare.Shared.Constants.OCCFM_LOB_NAME) {
			var bocNumber = CommCare.Shared.GetFieldValue("hac_boc_text");
			if (bocNumber != null && bocNumber != "741-K") {// fix? from testing string to GUID
				if (CommCare.Shared.FormContext.ui.tabs.get("BOCtoRequestTab") != null) {
					CommCare.Shared.FormContext.ui.tabs.get("BOCtoRequestTab").setVisible(true);
				}
			}
			else {
				if (CommCare.Shared.FormContext.ui.tabs.get("BOCtoRequestTab") != null) {
					CommCare.Shared.FormContext.ui.tabs.get("BOCtoRequestTab").setVisible(false);
				}
			}
		}
	}

	function hideshowPreauthorizationRequests() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = lineOfBusiness != null ? CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) : null;
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(purpose); CRMCC-7217

		//if (lineOfBusinessName == CommCare.Shared.Constants.OCCFM_LOB_NAME && purposeName == "Preauthorization") { CRMCC-7217
		if (lineOfBusinessName == CommCare.Shared.Constants.OCCFM_LOB_NAME && CommCare.Constants.Compare.PurposeIntersection.Preauthorization(purposeID)) {
			CommCare.Shared.FormContext.ui.tabs.get("PreauthorizationRequests").setVisible(true);
		}
		else {
			CommCare.Shared.FormContext.ui.tabs.get("PreauthorizationRequests").setVisible(false);
		}
	}

	function ResetDisabledFields() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = getLookupName(lineOfBusiness);

		//if (CommCare.Shared.FormContext == null) {
		//	CommCare.Shared.FormContext = parent.Xrm.Page;
		//}
		var setLock = CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM ? false
			: lineOfBusinessName == CommCare.Shared.Constants.CCWF_LOB_NAME ? false
				: true;

		// Fix for white space issue
		CommCare.Shared.SetReadOnly("ccwf_homefacility", false);
		CommCare.Shared.SetReadOnly("ccwf_visn", false);
		CommCare.Shared.SetReadOnly("vhacrm_areaintersectionid", setLock);
		CommCare.Shared.SetReadOnly("vhacrm_subareaintersectionid", setLock);
		CommCare.Shared.SetReadOnly("vhacrm_noncorevisndetailid", false);
		CommCare.Shared.SetReadOnly("hrc_facilityid", false);
		CommCare.Shared.SetReadOnly("vhacrm_visnid", false);
		CommCare.Shared.SetReadOnly("vhacrm_providerstateid", false);
		CommCare.Shared.SetReadOnly("vhacrm_lobid", false);
		CommCare.Shared.SetReadOnly("mcs_boctorequest", false);
		CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
		CommCare.Shared.SetReadOnly("hac_teamid", false);
		CommCare.Shared.SetReadOnly("vhacrm_stationwithactivityid", false);
		CommCare.Shared.SetReadOnly("vhacrm_stationtobeloadedtoid", false);
		CommCare.Shared.SetReadOnly("ccwf_resolutionrequest", false);
	}

	function showEscalateToTier3() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		var purposeName = getLookupName(purposeValue);
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);

		//var setVal = purposeName == "Mission Act" ? lobName == "OCC FM" ? true : false : false // fixed from testing string to GUID CRMCC-7217
		var setVal = CommCare.Constants.Compare.PurposeIntersection.MissionAct(purposeID) ? lobName == "OCC FM" ? true : false : false
		CommCare.Shared.SetVisible("mcs_escalatetotier3", setVal);
	}

	function handleRequestOnSaveFM(context) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var pdiNumber = CommCare.Shared.GetFieldValue("hac_pdinumber_text");
		if (pdiNumber != null) {
			var validPDI = CommCare.Shared.ValidatePDI(pdiNumber);
			if (validPDI == false) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("The PDI Number must contain only numbers and must be 15 characters long", "PDI");
				if (context.getEventArgs() != null)
					StopSave(context);
			}
			else {
				CommCare.Shared.CrmCommonJS.Notification.ClearNotification("PDI");
			}
		}
	}

	//short code Lcc

	function checkAssignedToCleared(queueItemId, saveMode) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var workerId = null;
		//retrieve queueitem and check its workerid for null
		var queueItemFetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'> \
                                <entity name='queueitem'> \
                                <attribute name='workerid' /> \
                                <filter type='and'> \
                                    <condition attribute='queueitemid' operator='eq' value='" + queueItemId + "' /> \
                                </filter> \
                                </entity> \
                            </fetch>";

		CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("queueitems", queueItemFetch).then(function (qi) {
			workerId = qi.value[0]._workerid_value;
			if (workerId != null) {
				//set the warning message and don't allow update
				var errorMessage = "User cannot clear Assigned To from the Request form. Please choose another User to work the Request.";
				CommCare.Shared.CrmCommonJS.Notification.SetError(errorMessage, "Lcc");
			}
			else {
				CommCare.Shared.CrmCommonJS.Notification.ClearNotification("Lcc");
				isValidationNeeded = false;
				if ((saveMode === SaveMode.Save) || (saveMode === SaveMode.AutoSave))
					CommCare.Shared.FormContext.data.save();
				else if (saveMode === SaveMode.SaveAndClose) {
					var saveOptions = {
						saveMode: SaveMode.SaveAndClose
					};
					CommCare.Shared.FormContext.data.save(saveOptions);
				}
				else if (saveMode === SaveMode.SaveAndNew) {
					var saveOptions = {
						saveMode: SaveMode.SaveAndNew
					};
					CommCare.Shared.FormContext.data.save(saveOptions);
				}

			}
		}).catch(function (error) {
			console.log("could not retrieve queueitem workerid: " + error.message);
		});
	}

	function clearActionFromPurposeDetail_OnChange() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		console.log("clearActionFromPurposeDetail_OnChange cleared vhacrm_actionintersectionid");
		CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").setValue(null);
	}

	function clearRoutingReasonFromAction_OnChange() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		CommCare.Shared.SetFieldValue("vhacrm_routingreason_code", null);
	}

	function CheckOb2ResolutionIsNACRForCTLTab() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
		if (currentFormId == CommCare.Constants.GUIDS.Forms.ACR) {
			var action = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").getValue();
			if (action != null) {
				if (CommCare.Shared.GetCleanId(action) != CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR)
					return;
				//if (CommCare.Shared.DialogNameReturn(action[0].name) != "Closing the Loop") {
				//	return;
				//}
			}

			//Check if the AHR OB2 resolution is a dirty field during this save operation
			var dataXml = CommCare.Shared.FormContext.data.entity.getDataXml();
			var isAhrOb2Dirty = false
			if (dataXml.indexOf("<vhacrm_ahr_ob2resolution_code>") > 0 && dataXml.indexOf("</vhacrm_ahr_ob2resolution_code>") > 0) {
				isAhrOb2Dirty = true;
			}

			if (isAhrOb2Dirty) {
				var ahrOb1 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
				var ahrOb2 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
				if (ahrOb1 === CommCare.Constants.Integers.OBResolution.NoContact && ahrOb2 === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
					var ctlTab = CommCare.Shared.FormContext.ui.tabs.get("tab_ClosingTheLoop");
					if (ctlTab !== null) {
						ctlTab.setFocus();
					}
				}
			}
		}
	}

	async function form_OnSave(context) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);

		var saveMode = context.getEventArgs().getSaveMode();

		if (!isValidationNeeded) {
			isValidationNeeded = true;
			return;
		}
		setContactToDefaultOnCreatedInError();
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = lineOfBusiness != null ? CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) : null;
		var formType = CommCare.Shared.FormContext.ui.getFormType();
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217

		if (formType === CommCare.Shared.Constants.UPDATE_FORM) {

			if (lineOfBusinessName !== null && lineOfBusinessName === CommCare.Shared.Constants.CCWF_LOB_NAME) {
				//StopSave(context);
				//handleCustomerCareOnSave(context).then((result) => {
				//	console.log("returned from handleCustomerCareOnSave");
				//	console.log(result);
				//});
				await handleCustomerCareOnSaveAsync(context).then((isValid) => {
					console.log("returned from handleCustomerCareOnSave(", isValid, ")");
					console.log(isValid);

					if (!isValid) {
						StopSave(context);
					}
				});
			}
			else {
				collapseBOCtoRequest();//
			}
		}

		if (formType === CommCare.Shared.Constants.CREATE_FORM) {
			stopCreateOfNullVetRequest(context, lineOfBusinessName);
			stopProviderWithContactRequest(context, lineOfBusinessName);
		}

		if (lineOfBusinessName == CommCare.Shared.Constants.OCCFM_LOB_NAME) handleRequestOnSaveFM(context);
		if (lineOfBusinessName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
			var servFac = CommCare.Shared.GetFieldValue("hrc_facilityid");
			if (servFac !== null && action != null) { 
				var servFacId = servFac[0].id.toString();
				var columns = "mcs_acceptingrequests";
				var filter = null;

				var acceptingRequests = CommCare.Shared.GetFieldValue("mcs_facilityacceptingrequests");
				if (acceptingRequests == false || acceptingRequests == null) {
					CommCare.Shared.CrmCommonJS.Notification.SetError("This servicing facility or VISN is not accepting request at the moment", "NOTACCEPTINGWORKMESSAGE");
					StopSave(context);
				}
				else {
					CommCare.Shared.CrmCommonJS.Notification.ClearNotification("NOTACCEPTINGWORKMESSAGE");
				}
			}
		}

		if (validateTIN() == false) {
			console.log("Invalid TIN.  Stopping form save.");
			StopSave(context);
		}

		if (validatePhoneNumber() == false) {
			console.log("Invalid Phone Number.  Stopping form save.");
			StopSave(context);
		}

		if (validateFaxNumber() == false) {
			console.log("Invalid Fax Number.  Stopping form save.");
			StopSave(context);
		}

		if (validatePOCPhoneNumber() == false) {
			console.log("Invalid POC Phone Number.  Stopping form save.");
			StopSave(context);
		}

		//if (!validateCTLOBDate("OB1")) StopSave(context);
		//if (!validateCTLOBDate("OB2")) StopSave(context);
		//if (!validateCTLOBDate("OB2")) StopSave(context);
		if (!validateValidityFromToDates()) {
			StopSave(context);
		}

		if (formType === CommCare.Shared.Constants.UPDATE_FORM) {
			if (lineOfBusinessName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
				// Prevent save if ACR CTL OB Dates are in future
				if (!(validateCTLOBDate("OB1") && validateCTLOBDate("OB2") && validateCTLOBDate("OB3"))) {
					StopSave(context);
				}

				if (!(validateOpsOBDate("OB1") && validateOpsOBDate("OB2") && validateOpsOBDate("OB3"))) {
					StopSave(context);
				}

				//if (validateACRChoiceOperationsStatus() == false) {
				//	console.log("The Request is already in this Queue.  Stopping form save.");
				//	StopSave(context);
				//}

				if (!validateMODBeginAndEndDates()) {
					StopSave(context);
				}

				if (CommCare.Shared.FormContext.getAttribute("ccwf_assignedtoid").getIsDirty()) {
					var assignedTo = CommCare.Shared.GetFieldValue("ccwf_assignedtoid");
					if ((assignedTo == null) || (assignedTo[0].id == null)) {
						var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
						if (queueItem != null) {
							var queueItemId = queueItem[0].id.replace("{", "").replace("}", "");
							StopSave(context);
							checkAssignedToCleared(queueItemId, saveMode);
						}
					}
				}
				packageResolution();
			}
		}

		//requireNoteForServiceRecoveryApproval(context, formType, lineOfBusinessName, getLookupName(action));
		//lockFormForPatsrRejection(getLookupName(action)); // fixed action CCCRM7217
		lockFormForPatsrRejection(CommCare.Shared.GetCleanId(action));
		lockReceiptDateOnSaveWithTask();

		if (CommCare.Request.Constants.CurrentFormType.toLowerCase() != "quickcreate") {
			//lockReceiptDateOnSaveWithTask();
			lockTaskTitleAndDueDate();
		}
	}

	function stopProviderWithContactRequest(context, lineOfBusinessName) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue);
		var cust = CommCare.Shared.GetFieldValue("customerid");
		var custName = getLookupName(cust);

		if (cust[0].entityType == "account" && purposeDetailName != "Provider") { // fix? from testing string to GUID
			StopSave(context);
			CommCare.Shared.CrmCommonJS.Notification.SetError("This Request must have a Purpose of Bill of Collections with a Purpose Detail of Provider due to the Customer Attached", "BOCMESSAGE");
		}
		//else if (cust[0].entityType == "contact" && purposeName == "Bill of Collections" && purposeDetailName == "Provider") { // Fixed CRMCC-7217
		else if (cust[0].entityType == "contact" && CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID) && purposeDetailName == "Provider") {
			StopSave(context);
			CommCare.Shared.CrmCommonJS.Notification.SetError("A Request regarding a person cannot have the Purpose of Bill of Collections and Subpurpose of Provider", "BOCMESSAGE");
		}
	}

	function updateFacAndVisn_ChoiceOps() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var coVisn = CommCare.Shared.GetFieldValue("vhacrm_choiceops_visnid");
		//var invalidVISN = ["4593E98C-9393-E511-940E-00155D14F3B4", "C493FBB7-9393-E511-940E-00155D14F3B4", "5DC638DE-9393-E511-940E-00155D14F3B4"]; // Fixed CRMCC-7217
		var invalidVISN = [CommCare.Constants.GUIDS.VISN.VISN03, CommCare.Constants.GUIDS.VISN.VISN11, CommCare.Constants.GUIDS.VISN.VISN18];
		var coVisnId = coVisn != null ? CommCare.Shared.GetCleanId(coVisn) : null;


		if (coVisn && invalidVISN.indexOf(coVisnId) < 0) {
			var coVisnName = CommCare.Shared.DialogNameReturn(coVisn[0].name);
			CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_visnid", coVisnId, coVisnName, "bah_visn");

			var servFac = CommCare.Shared.GetFieldValue("vhacrm_choiceops_siteid");
			if (servFac != null) {
				var servFacId = servFac[0].id.replace("{", "").replace("}", "");
				var servFacName = CommCare.Shared.DialogNameReturn(servFac[0].name);
				CommCare.Shared.RemoveOnChange("hrc_facilityid", setServicingVISN);
				CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("hrc_facilityid", servFacId, servFacName, "bah_facility");
				CommCare.Shared.SetOnChange("hrc_facilityid", setServicingVISN);
			}
		}


	}

	function stopCreateOfNullVetRequest(context, LOB) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification("NANAVETMESSAGE");
		var custID = CommCare.Shared.GetFieldValue("customerid");
		var custIDName = custID != null ? CommCare.Shared.DialogNameReturn(custID[0].name) : null;

		if ((LOB === "Customer Experience" || LOB === "OCC FM") && custIDName == CommCare.Shared.DefaultContactRecord[0].name) { // fix? from testing string to GUID
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
			var purposeID = CommCare.Shared.GetCleanId(purpose);
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
			var actionID = CommCare.Shared.GetCleanId(action);

			var purposeDetailName = purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;
			//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217
			//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : ""; CRMCC-7217
			var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;
			//var actionName = getLookupName(action); // fixed action CCCRM7217
			//let actionNameFormatted = actionName != null ? actionName.trim().toLowerCase() : "";

			var validForNaNa = false;
			if (purposeDetailName == "Claim Status Report") validForNaNa = true; // fix? from testing string to GUID
			//if (purposeName == "Non-Core") validForNaNa = true; // fixed from testing string to GUID CRMCC-7217
			if (CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) validForNaNa = true;
			if (programTypeName == "Help Desk") validForNaNa = true; // fix? from testing string to GUID
			//if (actionName == "Camp Lejeune") validForNaNa = true; // fix? from testing string to GUID  // fixed action CCCRM7217
			if (CommCare.Constants.Compare.ActionIntersection.CampLejeune(actionID)) validForNaNa = true;
			//if (LOB === CommCare.Shared.Constants.OCCFM_LOB_NAME && purposeNameFormatted.includes("mission act")) validForNaNa = true; // fixed from testing string to GUID CRMCC-7217
			if (LOB === CommCare.Shared.Constants.OCCFM_LOB_NAME && CommCare.Constants.Compare.PurposeIntersection.MissionAct(purposeID)) validForNaNa = true;
			//if (purposeNameFormatted.includes("service recovery")) validForNaNa = true; // fixed from testing string to GUID CRMCC-7217
			if (CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID)) validForNaNa = true;

			if (!validForNaNa) {
				StopSave(context);
				console.log("Invalid NA NA Request Blocked");
				//CommCare.Shared.CrmCommonJS.Notification.SetError("A Request cannot be created for the N/A N/A Master Veteran or Beneficiary.  Please Associate a Person to this request.", NANAVETMESSAGE);
				alert("A Request cannot be created for the N/A N/A Master Veteran or Beneficiary.  Please Associate a Person to this request.");
			}
		}
	}


	function setContactToDefaultOnCreatedInError() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var nonCoreReasonText = CommCare.Shared.GetOptionSetText("vhacrm_noncorereason_code");
		//console.log(CommCare.Shared.DefaultContactRecord);
		//console.log(nonCoreReasonText);
		if (nonCoreReasonText == "Created in Error") { // fix? from testing string to GUID
			//TODO - use the SetLookup from shared below and remove the webApi.Update
			var nana = new Array();
			nana[0] = new Object()
			nana[0].id = CommCare.Shared.DefaultContactRecord[0].id;
			nana[0].name = CommCare.Shared.DefaultContactRecord[0].name;
			nana[0].entityType = CommCare.Shared.DefaultContactRecord[0].entityType;
			CommCare.Shared.FormContext.getAttribute("customerid").setValue(nana);
			CommCare.Shared.SetSubmitMode("customerid", "always");

			//CommCare.Shared.CrmCommonJS.WebApi.UpdateRecord()
		}
	}

	function setCustomerName_OnChange() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var customer = CommCare.Shared.GetFieldValue("customerid");
		if (customer !== null) {
			var customerId = customer[0].id.replace("{", "").replace("}", "");
			var columns = "firstname,lastname,bah_dob_date,bah_ssn_text";

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(customerId, "contacts", columns, null).then(function (result) {
				console.log(result);

				// Check if form is still open
				if (typeof CommCare.Shared.GetFieldValue("customerid").setValue !== "undefined") {

					var firstName = result["firstname"];
					var lastName = result["lastname"];
					var dob = result["bah_dob_date"];
					var ssn = result["bah_ssn_text"];

					var convertedDOB;

					if (dob !== null) {
						convertedDOB = new Date(dob);
						convertedDOB.setHours(convertedDOB.getHours() + 12);
					}

					CommCare.Shared.SetFieldValue("vhacrm_veteranfirstname_text", firstName);
					CommCare.Shared.SetFieldValue("vhacrm_veteranlastname_text", lastName);

					if (convertedDOB != undefined) {
						CommCare.Shared.SetFieldValue("vhacrm_dateofbirth_date", convertedDOB);
					}

					CommCare.Shared.SetFieldValue("ccwf_ssn_text", ssn);

					CommCare.Shared.FormContext.data.save();
				}
			}).catch(function (error) {
				console.log("Error retrieving Contact:");
				console.log(error);
			});
		}
	}

	function USD_showMviFromRibbon(context) {
		showMviFromRibbon();
	}

	function showMviFromRibbon() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var cust = CommCare.Shared.GetFieldValue("customerid");
		var custName = (cust !== null) ? CommCare.Shared.DialogNameReturn(cust[0].name) : null;

		if (custName === CommCare.Shared.DefaultContactRecord[0].name) { // fix? from testing string to GUID
			CommCare.Shared.FormContext.ui.tabs.get("MVI_TAB").setVisible(true);
		}
		else {
			CommCare.Shared.CrmCommonJS.Notification.SetError("A person is already associated with this record.", "1");
		}
	}

	function setClaimsReportAction(purposeDetail) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		//if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM) {
		if (purposeDetail !== null) {
			if (purposeDetail === "Claim Status Report") {
				var actionFetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'> \
                                  <entity name='vhacrm_actionintersection'> \
                                    <attribute name='vhacrm_actionintersectionid' /> \
                                    <filter type='and'> \
                                      <condition attribute='vhacrm_name' operator='eq' value='Claim Status Report' /> \
                                    </filter> \
                                  </entity> \
                                </fetch>";

				CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
				CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("vhacrm_actionintersections", actionFetch).then(function (action) {
					var actionId = action.value[0].vhacrm_actionintersectionid;
					CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_actionintersectionid", actionId, "Claim Status Report", "vhacrm_actionintersection");
					//CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
					MethodOfDelivery();
					//brBeginningEndingDatesMethodOfDeliveryR6();
				}).catch(function (error) {
					console.log("Error in setting action default for claim status report: " + error.message);
				});
			}
		}
		//}
	}

	function ctlTabsHideShow() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").getValue();
		var queue = CommCare.Shared.GetFieldValue("vhacrm_queueid");

		if (queue != null) {
			//if (CommCare.Shared.DialogNameReturn(action[0].name) == "Closing the Loop") { CRMCC-7217
			if (CommCare.Shared.GetCleanId(queue) == CommCare.Constants.GUIDS.Queues.ClosingTheLoop) {
				CommCare.Shared.FormContext.ui.tabs.get("tab_ClosingTheLoop").setVisible(true);
			}
			else {
				CommCare.Shared.FormContext.ui.tabs.get("tab_ClosingTheLoop").setVisible(false);
			}
		}
	}

	function acrTabsHideShow(isOnLoad) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		// show tabs for N52 formulas <-- logic was replaced for onLoad events
		// ywB shortcode
		if (CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) {
			var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
			if (currentFormId) {
				if (currentFormId == CommCare.Constants.GUIDS.Forms.ACR) {
					CommCare.Shared.FormContext.ui.tabs.get("General").setVisible(true);
					//var generalDisplayState = CommCare.Shared.FormContext.getDisplayState("General")
					//if (generalDisplayState != "expanded")
					if (isOnLoad == true) CommCare.Shared.FormContext.ui.tabs.get("General").setDisplayState("expanded");
					var queueid = CommCare.Shared.FormContext.getAttribute("vhacrm_queueid").getValue();
					var action = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").getValue();
					if (queueid != null) {
						//if (CommCare.Shared.DialogNameReturn(action[0].name) == "Closing the Loop") { CRMCC-7217
						if (CommCare.Shared.GetCleanId(queueid) == CommCare.Constants.GUIDS.Queues.ClosingTheLoop) {
							CommCare.Shared.FormContext.ui.tabs.get("tab_ClosingTheLoop").setVisible(true);
						}
						else {
							CommCare.Shared.FormContext.ui.tabs.get("tab_ClosingTheLoop").setVisible(false);
						}
					}
					else {
						CommCare.Shared.FormContext.ui.tabs.get("tab_ClosingTheLoop").setVisible(false);
					}
					// Ffv shortcode
					if (queueid != null) {
						//if (CommCare.Shared.DialogNameReturn(queueid[0].name) == "PR&S" || CommCare.Shared.DialogNameReturn(queueid[0].name) == "Operations" || CommCare.Shared.DialogNameReturn(queueid[0].name) == "Closing the Loop") { CRMCC-7217
						if (CommCare.Shared.GetCleanId(queueid) == CommCare.Constants.GUIDS.Queues.PRS
							|| CommCare.Shared.GetCleanId(queueid) == CommCare.Constants.GUIDS.Queues.Operations
							|| CommCare.Shared.GetCleanId(queueid) == CommCare.Constants.GUIDS.Queues.ClosingTheLoop) {
							CommCare.Shared.FormContext.ui.tabs.get("tabChoiceOperationsGroup").setVisible(true);
						} else {
							CommCare.Shared.FormContext.ui.tabs.get("tabChoiceOperationsGroup").setVisible(false);
						}
					}
				}
				else {
					cvhdSections();
				}
			}
		}
	}

	//TODO - should we remove the check on 680 (if setVis===true) so that the tabs show if relevant or hide if not - aka if this is not Help Desk - what do we do here (currently we are just leaving the form exactly as is)
	function cvhdSections() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
		if (currentFormId === CommCare.Constants.GUIDS.Forms.CCWF) {
			var programID = CommCare.Shared.FormContext.getAttribute("ccwf_programid") != null ? CommCare.Shared.FormContext.getAttribute("ccwf_programid").getValue() : null;
			var setVis = false;
			if (programID != null) {
				(CommCare.Shared.DialogNameReturn(programID[0].name) === "Help Desk") ? setVis = true : setVis = false; // fix? from testing string to GUID
				if (setVis === true) {
					CommCare.Shared.FormContext.ui.tabs.get("tab_8").setVisible(setVis); // summary
					CommCare.Shared.FormContext.ui.tabs.get("tab_9").setVisible(!setVis); // claim details
					CommCare.Shared.FormContext.ui.tabs.get("tab_10").setVisible(!setVis); // authorizations/referrals details
					CommCare.Shared.FormContext.ui.tabs.get("tab_11").setVisible(!setVis); // clinical information
					CommCare.Shared.FormContext.ui.tabs.get("tab_12").setVisible(!setVis); // addresses
					CommCare.Shared.FormContext.ui.tabs.get("tab_7").setVisible(setVis); // notes/activities
					CommCare.Shared.FormContext.ui.tabs.get("tab_6").setVisible(setVis); // administration
				}
			}
		}
	}

	async function handleCustomerCareOnSaveAsync(context) { /* TOM DO NOT REFACTOR */
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("", fName);
		clearFormValidations();
		var requestId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");  // <- not refactoring this function
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");  // <- not refactoring this function
		var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid"); // <- not refactoring this function
		var purposeDetailName = purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;
		let purposeDetailNameFormatted = purposeDetailName != null ? purposeDetailName.trim().toLowerCase() : "";
		var customerId = CommCare.Shared.GetFieldValue("customerid");
		var customerIdName = customerId != null ? CommCare.Shared.DialogNameReturn(customerId[0].name) : null;
		var routingReason = CommCare.Shared.GetFieldValue("vhacrm_routingreason_code");
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;
		var programTypeNameForamatted = programTypeName != null ? programTypeName.trim().toLowerCase() : "";
		var resolutionLookup = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
		var ob1AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		var ob2AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
		var resolutionName = "";
		if (resolutionLookup != null)
			resolutionName = CommCare.Shared.DialogNameReturn(resolutionLookup[0].name);
		var isValid = true;
		var actionsNeedingClaims = [];
		var actionsNeedingReferrals = [];
		var requestName;
		//let requestNameFormatted = requestName != null ? requestName.trim().toLowerCase() : null;
		let requestNameFormatted = "";

		if (requestAction !== null) {
			requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
			requestNameFormatted = requestName != null ? requestName.trim().toLowerCase() : "";
			var requestActionsRequiringClaimPromise = await Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_action_value&$filter=mcs_name eq 'RequestActionsRequiringClaims' and statecode eq 0");
			for (var i = 0; i < requestActionsRequiringClaimPromise.entities.length; i++) {
				actionsNeedingClaims.push(requestActionsRequiringClaimPromise.entities[i]["_mcs_action_value@OData.Community.Display.V1.FormattedValue"]);
			}

			var requestActionsRequiringReferralPromise = await Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_action_value&$filter=mcs_name eq 'RequestActionsRequiringReferrals' and statecode eq 0");
			for (var i = 0; i < requestActionsRequiringReferralPromise.entities.length; i++) {
				actionsNeedingReferrals.push(requestActionsRequiringReferralPromise.entities[i]["_mcs_action_value@OData.Community.Display.V1.FormattedValue"]);
			}
		}

		console.log(actionsNeedingClaims);

		//CRMCC-6690 CRMCC-4867. Per story a claim should not be required for Appeals with request actions DOD and IHS
		// fix? from testing string to GUID
		if ((actionsNeedingClaims.indexOf(requestName) > -1
			&& ((requestNameFormatted.includes("load edit")
			|| requestNameFormatted.includes("vamc internal review")
			|| requestNameFormatted.includes("initial claim review")
			|| requestNameFormatted.includes("escalated claim review")
			|| purposeNameFormatted.includes("claim status"))
			||
			(
			(requestNameFormatted.includes("tier two ccn-optum")
				|| requestNameFormatted.includes("tier two ccn-triwest")
				|| requestNameFormatted.includes("tier two local contract")
				|| requestNameFormatted.includes("tier two emergent care")
				|| requestNameFormatted.includes("tier two vca")
				|| requestNameFormatted.includes("escalate to tier one") 
				|| requestNameFormatted.includes("not active, for testing only - tier one")
				|| requestNameFormatted.includes("send to vamc")
				|| requestNameFormatted.includes("send to vamc - authorization")
				|| requestNameFormatted.includes("send to vamc - scheduling")
				|| requestNameFormatted.includes("tier two pharmacy"))
			&&/* TOM DO NOT REFACTOR */
				(CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Constants.Integers.TypeOfCare.Emergent || CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Constants.Integers.TypeOfCare.Urgent))
		))
			|| (purposeNameFormatted.includes("appeal") &&
			(requestNameFormatted.includes("provide appeal status") || requestNameFormatted.includes("escalation to csc"))) ||
			(purposeNameFormatted.includes("billing concern") && requestNameFormatted.includes("payment escalation") && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR)) || (purposeNameFormatted.includes("acr") && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR))
			|| (purposeNameFormatted.includes("traveling veteran") && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR) && resolutionName != "Resolved")
			|| (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") == null && purposeNameFormatted.includes("acr") && ob1AhrResolution != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting && ob2AhrResolution != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting)

		) {
			var claimRequiredPromise = await Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name&$filter=_ccwf_requestid_value eq " + requestId);
			console.log(claimRequiredPromise);
			if (claimRequiredPromise.entities.length == 0) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
				isValid = false;
			}
		}

		// fix? from testing string to GUID
		if ((actionsNeedingReferrals.indexOf(requestName) > -1 && CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Constants.Integers.TypeOfCare.Scheduled)

			|| requestNameFormatted.includes("create appointment")
			|| (routingReason !== null && (routingReason === CommCare.Constants.Integers.RoutingReason.ReferralRequiresModification || routingReason === CommCare.Constants.Integers.RoutingReason.SARRequiredRequested))) {
			var referralRequiredPromise = await Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date&$filter=_vhacrm_requestid_value eq " + requestId);
			if (referralRequiredPromise.entities.length == 0) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
				isValid = false;
			}

			if (requestNameFormatted.includes("escalate to tier one") || requestNameFormatted.includes("tier two local contract") || requestNameFormatted.includes("tier two emergent care") || requestNameFormatted.includes("tier two vca") || requestNameFormatted.includes("send to vamc - authorization") || requestNameFormatted.includes("send to vamc - scheduling") || requestNameFormatted.includes("tier two pharmacy")) {/* TOM DO NOT REFACTOR */
				var claimRequiredPromise = await Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name&$filter=_ccwf_requestid_value eq " + requestId);
				console.log(`ClaimRequiredPromiseLength: ${claimRequiredPromise.entities.length}`);
				if (claimRequiredPromise.entities.length == 0) {
					CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
					isValid = false;
				}

			}
		}
		// fix? from testing string to GUID
		if (requestNameFormatted.includes("modify appointment") || requestNameFormatted.includes("cancel appointment") ||
			((routingReason !== null && routingReason === CommCare.Constants.Integers.RoutingReason.ReferralRequiresModification) || requestNameFormatted.includes("set up consult"))) {
			var noteRequiredPromise = await Xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=_objectid_value&$filter=_objectid_value eq " + requestId);
			if (noteRequiredPromise.entities.length == 0) {
				//CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Note to the Request to save changes and move forward.", CommCare.Request.Global.NoteRequiredMessageId);
				isValid = false;
			}
		}
		// fix? from testing string to GUID
		if (requestNameFormatted.includes("modify appointment") || requestNameFormatted.includes("cancel appointment")) {
			var apptIdTemp = CommCare.Shared.GetFieldValue("vhacrm_vetappidtempfield_text");
			var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
			var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");

			if (apptIdTemp === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("An appointment is needed for this process. Please attach an appointment, or complete the following fields in the Notes box:\r\nDate*\r\nTime*\r\nFacility*\r\nProgram*\r\nType of Service*\r\nReferral/Auth Number*\r\nVISN*", CommCare.Constants.MessageIDs.AppointmentNoteRequired);
			}
		}
		// fix? from testing string to GUID
		if (requestNameFormatted.includes("cancel appointment")) {
			var apptDate = CommCare.Shared.GetFieldValue("vhacrm_appointmentdatetime_date");

			if (apptDate !== null) {
				var dateNow = new Date();

				if (apptDate < dateNow) {
					CommCare.Shared.CrmCommonJS.Notification.SetError("Request cannot be saved with appointment that occurs in the past.  Please select a future appointment.", CommCare.Constants.MessageIDs.AppointmentDateInPast);
				}
			}
		}
		// fix? from testing string to GUID
		if ((routingReason !== null && routingReason === CommCare.Constants.Integers.RoutingReason.ApprovedConultWithoutReferral) || requestNameFormatted.includes("set up consult")) {

			var consultList = CommCare.Shared.GetFieldValue("vhacrm_consult_id_list");
			var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
			var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");

			if (consultList === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("A consult is needed for this process. Please attach a consult, or complete the following fields in the Notes box:\r\nDate*\r\nConsult Title*\r\nRequesting Provider*\r\nConsult Status*\r\nConsult Number*\r\nConsult Urgency*", CommCare.Constants.MessageIDs.ConsultNoteRequired);
			}
		}

		if (CommCare.Shared.DefaultContactRecord != null) {

			// fix? from testing string to GUID
			if (customerIdName == CommCare.Shared.DefaultContactRecord[0].name && !programTypeNameForamatted.includes("help desk") && (!requestNameFormatted.includes("claim status report") || !purposeDetailNameFormatted.includes("claim status report")) && !purposeNameFormatted.includes("non-core") && !purposeNameFormatted.includes("service recovery")) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("N/A N/A Master cannot be the associated vet if the Purpose Detail or Action is not Claim Status Report.  Please use the Associate Person button in your ribbon to begin a search.", CommCare.Constants.MessageIDs.NaNaVeteran);
				isValid = false;
			}
		}
		// fix? from testing string to GUID
		if (purposeNameFormatted.includes("acr")) {
			if (!CommCare.Shared.FormIsValid(CommCare.Constants.GUIDS.Forms.ACR)) {
				return true;
			}

			var resId = "411D47EF-B322-E611-941E-0050568D64C9"; // Resolved

			// Check if the Closing the Loop Final Status = Closed
			var ctlStatus = CommCare.Shared.GetFieldValue("vhacrm_cl_clfinalstatus_code");
			var ob1ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
			var ob2ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
			var ob3ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");
			var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");

			var ob1AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
			var ob2AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

			if (ctlStatus == 713770002) {
				if (ob1ClResolution != 713770004 && ob2ClResolution != 713770004 && ob3ClResolution == null) {
					CommCare.Shared.FormContext.ui.setFormNotification("To set the Closing the Loop Final Status to Closed, at least 3 Outbound calls must be made or a Resolution must be provided on one of the calls.", "ERROR", "CTLFINALSTATUSCLOSED");
				} else {
					var recordId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
					CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_resolutionintersectionid", resId, "Resolved", "vhacrm_resolutionintersection");
					if (initialResolutionDate == null) {
						var now = new Date();
						CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
					}
					CommCare.Shared.FormContext.ui.clearFormNotification("CTLFINALSTATUSCLOSED");
				}
			}
			else {
				CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").setValue(null);
				CommCare.Shared.FormContext.ui.clearFormNotification("CTLFINALSTATUSCLOSED");
			}

			// Check if the Ops/POM Final Status = Closed
			var opsStatus = CommCare.Shared.GetFieldValue("mcs_operationsfinalstatus");
			var ob1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
			var ob2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
			var ob3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");
			var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");

			if (opsStatus == CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed) {
				if (ob1 != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided
					&& ob2 != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided
					&& ob3 == null) {
					CommCare.Shared.FormContext.ui.setFormNotification("To set the Ops Final Status to Closed, at least 3 Outbound calls must be made or a Resolution must be provided on one of the calls.", "ERROR", "OPSFINALSTATUSCLOSED");
				}
				else {
					CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_resolutionintersectionid", resId, "Resolved", "vhacrm_resolutionintersection");
					if (initialResolutionDate == null) {
						var now = new Date();
						CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
					}
					CommCare.Shared.FormContext.ui.clearFormNotification("OPSFINALSTATUSCLOSED");
				}
			}
			else {
				var resDirty = CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").getIsDirty();
				if (!resDirty) {
					CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").setValue(null);
					CommCare.Shared.FormContext.ui.clearFormNotification("OPSFINALSTATUSCLOSED");
				}
			}

			var claimEntityRequiredAttributes = ["bah_name", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			var claimRequestRequiredAttrs = ["ccwf_claimnumber_text", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			var searchAttribute = "ccwf_requestid";

			if (ob1AhrResolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting
				|| ob2AhrResolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
				isValid = true;
				CheckOb2ResolutionIsNACRForCTLTab();
			}
			else if (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") == null) {
				//isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);
			}
			else {
				isValid = true;
			}
		}
		else {
			var resolution = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
			var resName = "";
			if (resolution !== null)
				resName = CommCare.Shared.DialogNameReturn(resolution[0].name);

			if (resName === "Resolved") { // fix? from testing string to GUID
				var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");
				if (initialResolutionDate == null) {
					var now = new Date();
					CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
				}
			}
		}


		return isValid;
	}


	function handleCustomerCareOnSave(context) { /* TOM DO NOT REFACTOR */
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		return new Promise((resolve, reject) => {

			//StopSave(context);
			//Reset all form level validation for execution again.
			clearFormValidations();

			if (!isValidationNeeded_HandleCustomerCareOnSave) {
				isValidationNeeded_HandleCustomerCareOnSave = true;
				return;
			}

			var requestId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
			var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
			var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // <- not refactoring this function
			var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
			let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName = purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;
			let purposeDetailNameFormatted = purposeDetailName != null ? purposeDetailName.trim().toLowerCase() : "";
			var customerId = CommCare.Shared.GetFieldValue("customerid");
			var customerIdName = customerId != null ? CommCare.Shared.DialogNameReturn(customerId[0].name) : null;
			var routingReason = CommCare.Shared.GetFieldValue("vhacrm_routingreason_code");
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;
			var isValid = true;
			var actionsNeedingClaims = [];
			var actionsNeedingReferrals = [];
			var requestName;
			let requestNameFormatted;
			/////// new promise chain region
			var topLevelPromiseArray = [];

			//var topLevelPromise = new Promise((resolve, reject) => {
			if (requestAction !== null) {
				requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
				requestNameFormatted = requestName != null ? requestName.trim().toLowerCase() : "";
				var requestActionsRequiringClaimPromise = Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_action_value&$filter=mcs_name eq 'RequestActionsRequiringClaims' and statecode eq 0").then(
					function success(results) {

						for (var i = 0; i < results.entities.length; i++) {
							actionsNeedingClaims.push(results.entities[i]["_mcs_action_value@OData.Community.Display.V1.FormattedValue"]);
						}
						var requestActionsRequiringClaimsArray = [];
						if (actionsNeedingClaims.indexOf(requestName) > -1) {
							if (requestNameFormatted.includes("load edit")) {
								var requiredAssociatedRecordType = "bah_claim";
								var loadEditPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										}
										else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										}
										else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(loadEditPromise);
								console.log("loadEditPromise");
							}
							else if (requestNameFormatted.includes("vamc internal review") || requestNameFormatted.includes("initial claim review") || requestNameFormatted.includes("escalated claim review")) { // fix? from testing string to GUID
								var requiredAssociatedRecordType = "bah_claim";
								var vamcReviewPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										}
										else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										}
										else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(vamcReviewPromise);
								console.log("vamcReviewPromise");
							} else if (purposeNameFormatted.includes("claim status")) { // fix? from testing string to GUID
								var requiredAssociatedRecordType = "bah_claim";
								var claimStatusPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										}
										else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										}
										else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(claimStatusPromise);
								console.log("claimStatusPromise");
								// fix? from testing string to GUID
							}
							else if ((requestNameFormatted.includes("tier two ccn-optum") || requestNameFormatted.includes("tier two ccn-triwest") || requestNameFormatted.includes("tier two local contract") || requestNameFormatted.includes("tier two emergent care") || requestNameFormatted.includes("tier two vca") || requestNameFormatted.includes("escalate to tier one") || requestNameFormatted.includes("not active, for testing only - tier one")) &&/* TOM DO NOT REFACTOR */
								//programTypeName == "Non-VA" &&
								(CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Constants.Integers.TypeOfCare.Emergent || CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Constants.Integers.TypeOfCare.Urgent)) {
								var requiredAssociatedRecordType = "bah_claim";
								var tierTwoPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										}
										else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										}
										else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(tierTwoPromise);
								console.log("tierTwoPromise");
							} else if (requestNameFormatted.includes("create appointment")) { // fix? from testing string to GUID
								var requiredAssociatedRecordType = "vhacrm_referrals";
								var createAppointmentPromise = Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date,vhacrm_inpatientoutpatient_code,vhacrm_name,_vhacrm_servicingfacilityid_value,vhacrm_todate_date,vhacrm_vendor_text&$filter=_vhacrm_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										}
										else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										}
										else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(createAppointmentPromise);
								console.log("createAppointmentPromise")
							}

						}
						return Promise.all(requestActionsRequiringClaimsArray).then((requestActionsRequiringClaimsResults) => {
							console.log(requestActionsRequiringClaimsResults);
							return requestActionsRequiringClaimsResults;
						});
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(requestActionsRequiringClaimPromise);
				console.log("requestActionsRequiringClaimPromise");

				var requestActionsRequiringReferralPromise = Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_action_value&$filter=mcs_name eq 'RequestActionsRequiringReferrals' and statecode eq 0").then(
					function success(results) {
						console.log(results);
						for (var i = 0; i < results.entities.length; i++) {
							actionsNeedingClaims.push(results.entities[i]["_mcs_action_value@OData.Community.Display.V1.FormattedValue"]);
						}
						var requestActionsRequiringReferralsArray = [];
						if (actionsNeedingClaims.indexOf(requestName) > -1 && CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Constants.Integers.TypeOfCare.Scheduled) { // fix? from testing string to GUID
							var requiredAssociatedRecordType = "vhacrm_referrals";
							var careTypeScheduledPromise = Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date&$filter=_vhacrm_requestid_value eq " + requestId).then(
								function success(results) {
									if (results.entities.length > 0) {
										return true;
									}
									else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
										var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
										var requestName;

										if (requestAction !== null) {
											requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
										}

										console.log(requestName);
										console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
										var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
										if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
											CommCare.Request.Global.ClaimMessageShowing = true;
										}
										else {
											return true;
										}
									}
									else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
										CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
									}
									return false;
								},
								function (error) {
									Xrm.Utility.alertDialog(error.message);
								}
							);
							requestActionsRequiringReferralsArray.push(careTypeScheduledPromise);
							console.log("careTypeScheduledPromise");
						}
						return Promise.all(requestActionsRequiringReferralsArray).then((requestActionsRequiringReferralsResult) => {
							console.log(requestActionsRequiringReferralsResult);
							return requestActionsRequiringReferralsResult;
						});
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(requestActionsRequiringReferralPromise);
				console.log("requestActionsRequiringReferralPromise");


				if (requestNameFormatted.includes("modify appointment") || requestNameFormatted.includes("cancel appointment")) { // fix? from testing string to GUID
					var apptIdTemp = CommCare.Shared.GetFieldValue("vhacrm_vetappidtempfield_text");
					var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
					var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");
					if (apptIdTemp === null) {
						var requiredAssociatedRecordType = "annotation";
						var modifyCancelAppointmentPromise = Xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=_objectid_value&$filter=_objectid_value eq " + requestId).then(
							function success(results) {
								if (results.entities.length > 0) {
									return true;
								}
								else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
									var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
									var requestName;

									if (requestAction !== null) {
										requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
									}

									console.log(requestName);
									console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
									var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
									if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
										CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
										CommCare.Request.Global.ClaimMessageShowing = true;
									}
									else {
										return true;
									}
								}
								else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
									CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
								}
								return false;
							},
							function (error) {
								Xrm.Utility.alertDialog(error.message);
							}
						);
						topLevelPromiseArray.push(modifyCancelAppointmentPromise);
						console.log("modifyCancelAppointmentPromise");

						//if (apptIdTemp === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
						//	CommCare.Shared.CrmCommonJS.Notification.SetError("An appointment is needed for this process. Please attach an appointment, or complete the following fields in the Notes box:\r\nDate*\r\nTime*\r\nFacility*\r\nProgram*\r\nType of Service*\r\nReferral/Auth Number*\r\nVISN*", CommCare.Constants.MessageIDs.AppointmentNoteRequired);
						//	StopSave(context);
						//}
					}
				}

				if (purposeNameFormatted.includes("appeal")) {
					console.log("handleCustomerCareOnSave where (purposeNameFormatted.includes(\"appeal\")");
					var requiredAssociatedRecordType = "bah_claim";
					var appealPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
						function success(results) {
							if (results.entities.length > 0) {
								return true;
							}
							else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
								var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
								var requestName;

								if (requestAction !== null) {
									requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
								}

								console.log(requestName);
								console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
								var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
								if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
									CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
									CommCare.Request.Global.ClaimMessageShowing = true;
								}
								else {
									return true;
								}
							}
							else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
							}
							return false;
						},
						function (error) {
							Xrm.Utility.alertDialog(error.message);
						}
					);
					topLevelPromiseArray.push(appealPromise);
					console.log("appealPromise");
				}

				if (requestNameFormatted.includes("cancel appointment")) { // fix? from testing string to GUID
					var apptDate = CommCare.Shared.GetFieldValue("vhacrm_appointmentdatetime_date");

					if (apptDate !== null) {
						var dateNow = new Date();

						if (apptDate < dateNow) {
							CommCare.Shared.CrmCommonJS.Notification.SetError("Request cannot be saved with appointment that occurs in the past.  Please select a future appointment.", CommCare.Constants.MessageIDs.AppointmentDateInPast);
							//StopSave(context);
						}
					}
				}
			}

			if (purposeNameFormatted.includes("billing concern") && requestNameFormatted.includes("payment escalation")) { // fix? from testing string to GUID
				var requiredAssociatedRecordType = "bah_claim";
				var billingConcernPaymentEscalationPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=ccwf_billedamount_currency,ccwf_dateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						}
						else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						}
						else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
						}
						return false;
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(billingConcernPaymentEscalationPromise);
				console.log("billingConcernPaymentEscalationPromise");

				//if (isValid == false && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)))
				//	StopSave(context);
			}

			if (purposeNameFormatted.includes("acr")) {
				var requiredAssociatedRecordType = "bah_claim";
				var acrPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=ccwf_billedamount_currency,ccwf_dateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						}
						else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						}
						else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
						}
						return false;
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(acrPromise);
				console.log("acrPromise");
				//if (isValid == false && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)))
				//	StopSave(context);
			}

			if (purposeNameFormatted.includes("traveling veteran")) {
				var resolutionLookup = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
				var resolutionName = "";
				if (resolutionLookup != null)
					resolutionName = CommCare.Shared.DialogNameReturn(resolutionLookup[0].name);
				var requiredAssociatedRecordType = "bah_claim";
				var travelingVetPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=ccwf_billedamount_currency,ccwf_dateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						}
						else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						}
						else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
						}
						return false;
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(travelingVetPromise);
				console.log("travelingVetPromise");

				//if (isValid == false && resolutionName != "Resolved" && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)))
				//	StopSave(context);
			}

			if (routingReason !== null && (routingReason === CommCare.Constants.Integers.RoutingReason.ReferralRequiresModification || routingReason === CommCare.Constants.Integers.RoutingReason.SARRequiredRequested)) {
				var requiredAssociatedRecordType = "vhacrm_referrals";
				var modificationSarRequiredPromise = Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date,vhacrm_inpatientoutpatient_code,vhacrm_name,_vhacrm_servicingfacilityid_value,vhacrm_todate_date,vhacrm_vendor_text&$filter=_vhacrm_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						}
						else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						}
						else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
						}
						return false;
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(modificationSarRequiredPromise);
				console.log("modificationSarRequiredPromise");
			}
			else if ((routingReason !== null && routingReason === CommCare.Constants.Integers.RoutingReason.ReferralRequiresModification) || requestName == "Set Up Consult") {
				var handleMessage = false;

				var consultList = CommCare.Shared.GetFieldValue("vhacrm_consult_id_list");
				var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
				var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");
				var requiredAssociatedRecordType = "annotation";
				var referralModificationPromise = Xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=_objectid_value&$filter=_objectid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						}
						else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						}
						else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
						}
						return false;
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(referralModificationPromise);
				console.log("referralModificationPromise");
			}

			if (CommCare.Shared.DefaultContactRecord != null) {
				// fix? from testing string to GUID
				if (customerIdName == CommCare.Shared.DefaultContactRecord[0].name && programTypeName != "Help Desk" && (!requestNameFormatted.includes("claim status report") || !purposeDetailNameFormatted.includes("claim status report")) && !purposeNameFormatted.includes("non-core") && !purposeNameFormatted.includes("service recovery")) {
					CommCare.Shared.CrmCommonJS.Notification.SetError("N/A N/A Master cannot be the associated vet if the Purpose Detail or Action is not Claim Status Report.  Please use the Associate Person button in your ribbon to begin a search.", CommCare.Constants.MessageIDs.NaNaVeteran);
					//StopSave(context);
					isValid = false;
				}
			}

			//Replaces N52 formula 'Request - Validate Request Action'
			var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
			var actionIntersection = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
			var state = CommCare.Shared.GetFieldValue("statecode");

			var resolutionLookup = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
			var resolutionName = "";
			if (resolutionLookup != null)
				resolutionName = CommCare.Shared.DialogNameReturn(resolutionLookup[0].name);
			// fix? from testing string to GUID
			//if (queueItem != null && actionIntersection == null && actionIntersection != "97eecf60-5111-e611-941d-0050568d64c9" /* acrcc */ && state == 0 && resolutionName != "Resolved" && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM))) {
			if (queueItem != null && actionIntersection == null && actionIntersection.toLowerCase() != CommCare.Constants.GUIDS.PurposeIntersection.ACRCC.toLowerCase() &&
				state == 0 && resolutionName != "Resolved" && ((currentForm != null) && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR))) {

				alert("You must enter a Request Action in order to save");
				//StopSave(context);
			}

			if (purposeNameFormatted.includes("acr")) { // fix? from testing string to GUID
				if (!CommCare.Shared.FormIsValid(CommCare.Constants.GUIDS.Forms.ACR)) {
					return true;
				}

				var resId = "411D47EF-B322-E611-941E-0050568D64C9"; // Resolved

				// Check if the Closing the Loop Final Status = Closed
				var ctlStatus = CommCare.Shared.GetFieldValue("vhacrm_cl_clfinalstatus_code");
				var ob1ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
				var ob2ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
				var ob3ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");
				var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");

				var ob1AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
				var ob2AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

				if (ctlStatus == 713770002) {
					if (ob1ClResolution != 713770004 && ob2ClResolution != 713770004 && ob3ClResolution == null) {
						CommCare.Shared.FormContext.ui.setFormNotification("To set the Closing the Loop Final Status to Closed, at least 3 Outbound calls must be made or a Resolution must be provided on one of the calls.", "ERROR", "CTLFINALSTATUSCLOSED");
					} else {
						var recordId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
						CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_resolutionintersectionid", resId, "Resolved", "vhacrm_resolutionintersection");
						if (initialResolutionDate == null) {
							var now = new Date();
							CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
						}
						CommCare.Shared.FormContext.ui.clearFormNotification("CTLFINALSTATUSCLOSED");
					}
				}
				else {
					CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").setValue(null);
					CommCare.Shared.FormContext.ui.clearFormNotification("CTLFINALSTATUSCLOSED");
				}

				// Check if the Ops/POM Final Status = Closed
				var opsStatus = CommCare.Shared.GetFieldValue("mcs_operationsfinalstatus");
				var ob1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
				var ob2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
				var ob3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");
				var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");

				if (opsStatus == CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed) {
					if (ob1 != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided
						&& ob2 != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided
						&& ob3 == null) {
						CommCare.Shared.FormContext.ui.setFormNotification("To set the Ops Final Status to Closed, at least 3 Outbound calls must be made or a Resolution must be provided on one of the calls.", "ERROR", "OPSFINALSTATUSCLOSED");
					}
					else {
						CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_resolutionintersectionid", resId, "Resolved", "vhacrm_resolutionintersection");
						if (initialResolutionDate == null) {
							var now = new Date();
							CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
						}
						CommCare.Shared.FormContext.ui.clearFormNotification("OPSFINALSTATUSCLOSED");
					}
				}
				else {
					var resDirty = CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").getIsDirty();
					if (!resDirty) {
						CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").setValue(null);
						CommCare.Shared.FormContext.ui.clearFormNotification("OPSFINALSTATUSCLOSED");
					}
				}

				if (ob1AhrResolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting
					|| ob2AhrResolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
					isValid = true;
					CheckOb2ResolutionIsNACRForCTLTab();
				}
				else if (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") == null) {
					var requiredAssociatedRecordType = "bah_claim";
					var referredByVamcPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
						function success(results) {
							if (results.entities.length > 0) {
								return true;
							}
							else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) { // fix? from testing string to GUID
								var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // <- not refactoring this function REPEAT
								var requestName;

								if (requestAction !== null) {
									requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
								}

								console.log(requestName);
								console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
								var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
								if (!requestNameFormatted.includes("fraud/waste/abuse") && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) { // fix? from testing string to GUID
									CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
									CommCare.Request.Global.ClaimMessageShowing = true;
								}
								else {
									return true;
								}
							}
							else if (requiredAssociatedRecordType === "vhacrm_referrals") { // fix? from testing string to GUID
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
							}
							return false;
						},
						function (error) {
							Xrm.Utility.alertDialog(error.message);
						}
					);
					topLevelPromiseArray.push(referredByVamcPromise);
					console.log("referredByVamcPromise");
				}
				else {
					isValid = true;
				}
			}
			else {
				var resolution = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
				var resName = "";
				if (resolution !== null)
					resName = CommCare.Shared.DialogNameReturn(resolution[0].name);

				if (resName === "Resolved") { // fix? from testing string to GUID
					var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");
					if (initialResolutionDate == null) {
						var now = new Date();
						CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
					}
				}
			}


			return Promise.all(topLevelPromiseArray).then((topLevelResult) => {
				console.log(topLevelResult);
				var isValid = true;
				for (var i = 0; i < topLevelResult.length; i++) {
					if (typeof topLevelResult[i] == "array") {
						for (var j = 0; j < topLevelResult[i].length; j++) {
							console.log("topLevelResult[" + i + "][" + j + "]: " + topLevelResult[i][j]);
							if (topLevelResult[i][j] == false) {
								console.log("setting false for topLevelResult[" + i + "][" + j + "]");
								isValid = false;
							}
						}
					} else {
						console.log("topLevelResult[" + i + "]: " + topLevelResult[i]);
						if (topLevelResult[i] == false) {
							console.log("setting false for topLevelResult[" + i + "]");
							isValid = false;
						}
					}
				}
				console.log("isValid: " + isValid);
				resolve(isValid);
			});

		});

	}

	function pdiNumberOnChange() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var pdiNumber = CommCare.Shared.GetFieldValue("hac_pdinumber_text");
		var ticketNumber = CommCare.Shared.GetFieldValue("ticketnumber");
		//see if any other requests have this PDI Number and warn user if so
		var incidentFetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'> \
                                <entity name='incident'> \
                                <attribute name='incidentid' /> \
                                <filter type='and'> \
                                    <condition attribute='hac_pdinumber_text' operator='eq' value='" + pdiNumber + "' /> \
                                </filter> \
                                </entity> \
                            </fetch>";

		CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("incidents", incidentFetch).then(function (inc) {
			if (inc.value.length > 0) {
				var msg = "Warning: There is already a Request with the entered PDI number: " + pdiNumber;
				if ((ticketNumber != null) && (ticketNumber.length > 0))
					msg += " for Request: " + ticketNumber;
				alert(msg);
			}
		}).catch(function (error) {
			console.log("could not retrieve queueitem workerid: " + error.message);
		});
	}

	///Used to Clear form Validation set by Function handleCustomerCareOnSave()
	function clearFormValidations() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Constants.MessageIDs.AppointmentDateInPast);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Constants.MessageIDs.AppointmentNoteRequired);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Constants.MessageIDs.ConsultNoteRequired);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Constants.MessageIDs.ClaimRequired);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Constants.MessageIDs.ReferralRequired);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification("PDI");
		CommCare.Request.Global.ClaimMessageShowing = false;

		var RequestRequiredAttrs = ["vhacrm_inpatientoutpatient_code",
			"vhacrm_internalnumber_text",
			"vhacrm_fromdate_date",
			"vhacrm_todate_date",
			"vhacrm_vendor_text",
			"vhacrm_servicingfacilityreferralid",
			//"ccwf_claimnumber_text",
			//"ccwf_billedamount_currency",
			//"ccwf_dateofservice_date",
			//"ccwf_enddateofservice_date"
		];

		for (var i = 0, l = RequestRequiredAttrs.length; i < l; i++) {

			if (CommCare.Shared.FormContext.getAttribute(RequestRequiredAttrs[i]) != null) {
				CommCare.Shared.SetRequired(RequestRequiredAttrs[i], "none");
			}
		}
	}

	//Public functions
	function retrievePreferredFacility() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = lineOfBusiness != null ? CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) : null;

		if (lineOfBusinessName != CommCare.Shared.Constants.OCCFM_LOB_NAME) { // fix? from testing string to GUID
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;
			if (purposeDetail !== null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetail[0].name);
				if (purposeDetailName === "Claim Status Report") { // fix? from testing string to GUID
					return;
				}
			}
			var homeFac = CommCare.Shared.GetFieldValue("ccwf_homefacility");
			if (homeFac !== null) {
				return;
			}
			var icn = CommCare.Shared.GetFieldValue("mcs_icn");
			var homeFac = CommCare.Shared.GetFieldValue("ccwf_homefacility");
			if (homeFac !== null)
				return;
			if (icn !== null) {
				var fieldsSelected = "mcs_veisihub_baseurl,mcs_subscriptionid_east,mcs_subscriptionid_south,mcs_esr_endpoint";
				CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("mcs_settings", fieldsSelected.toLowerCase()).then(function (results) {
					CommCare.Shared.FormContext.ui.clearFormNotification(CommCare.Constants.MessageIDs.SetHomeFacilityTimeout);
					if (results.value.length > 0) {
						var startTimer = performance.now();
						var endTimer;
						var baseUrl = results.value[0].mcs_veisihub_baseurl;
						var url = baseUrl + results.value[0].mcs_esr_endpoint;
						var subscriptionId_east = results.value[0].mcs_subscriptionid_east;
						var subscriptionId_south = results.value[0].mcs_subscriptionid_south;
						var webresourceUrl = url.replace('{0}', '000000' + icn + '000000');
						$.ajax({
							url: webresourceUrl,
							type: "GET",
							dataType: "text",
							//timeout: 2000,
							beforeSend: function (xhr) {
								xhr.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionId_east);
								xhr.setRequestHeader('Ocp-Apim-Subscription-Key-E', subscriptionId_east);
								xhr.setRequestHeader('Ocp-Apim-Subscription-Key-S', subscriptionId_south);
							},
							success: function (data) {
								endTimer = performance.now() - startTimer;
								console.log("ESR data retrieval: " + endTimer.toString() + " milliseconds");
								console.log("Entering success function of ESR data retrieval");
								try {
									var esr = JSON.parse(data);
									CommCare.Shared.FormContext.ui.clearFormNotification(CommCare.Constants.MessageIDs.SetHomeFacilityTimeout);
									setPreferredFacility(esr.Data.Demographics.PreferredFacility);
								}
								catch (e) {
									console.log("Error within success function of ESR data retrieval");
									CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", CommCare.Constants.MessageIDs.SetHomeFacilityTimeout);
								}
							},
							error: function (data) {
								endTimer = performance.now() - startTimer;
								console.log("ESR data retrieval: " + endTimer.toString() + " milliseconds");
								console.log("Error retrieving ESR data");
								CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", CommCare.Constants.MessageIDs.SetHomeFacilityTimeout);
							}
						});
					}
				}).catch(function (error) {
					console.log("Error retrieving MCS Settings: " + error);
				});
			}
			else {
				console.log("No ICN");
				CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", CommCare.Constants.MessageIDs.SetHomeFacilityTimeout);
			}
		}
	}

	function setPreferredFacility(facilityData) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		//this function is only called from the quick create. It assumes there is not already a home facility on the request, and writes it.
		if (facilityData !== null) {
			//split on hyphen
			var facParts = facilityData.split("-");
			if (facParts.length > 0) {

				var columns = "bah_facilityid,bah_name,statecode"; // CRMCC-2076: Added status to query
				if (facParts[0].replace(" ", "") == "987")
					facParts[0] = "523A5";
				var filter = "$filter=bah_stationsuffix_text eq '" + facParts[0].replace(" ", "") + "'";
				var startTimer = performance.now();
				var endTimer;

				CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("bah_facilities", columns, filter).then(function (facility) {
					if (facility.value.length > 0) {
						endTimer = performance.now() - startTimer;

						for (i = 0; i < facility.value.length; i++) {

							if (facility.value[0].statecode == 0) { //check for active facility

								console.log("RetrieveMultiple Facility " + facParts[i] + ": " + endTimer.toString() + " milliseconds");
								var facName = facility.value[i].bah_name;
								var facId = facility.value[i].bah_facilityid;

								CommCare.Shared.FormContext.ui.clearFormNotification("FACNOTFOUND");
								CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("ccwf_homefacility", facId, facName, "bah_facility");
								CommCare.Shared.FormContext.getAttribute("ccwf_homefacility").fireOnChange();

								break;
							}
						}
					}
					else {
						endTimer = performance.now() - startTimer;
						console.log("RetrieveMultiple Facility " + facParts[0] + ": " + endTimer.toString() + " milliseconds");
						CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", "FACNOTFOUND");
					}

				}).catch(function (error) {
					console.log("Error retrieving Facility:");
					console.log(error);
					CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", "FACNOTFOUND");
				});
			}
		}
		else {
			console.log("Parsed Facility Data is null");
			CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", "FACNOTFOUND");
		}
	}

	function GetCrmContactDetails() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var contact = CommCare.Shared.GetFieldValue("customerid");

		if (contact !== null) {

			var contactId = contact[0].id.replace("{", "").replace("}", "");

			var columns = "bah_dob_date,bah_ssn_text";

			//Added check for non-null values, in which case skip the entire CRM Query and just exit, which functionally is the same as the remainder of the function
			if (CommCare.Shared.GetFieldValue("vhacrm_dateofbirth_date") != null && CommCare.Shared.GetFieldValue("ccwf_ssn_text") != null) {
				return;
			}

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(contactId, "contacts", columns).then(function (contact) {

				var dob = contact["bah_dob_date"];
				var ssn = contact["bah_ssn_text"];

				var convertedDob;

				if (dob !== null) {
					convertedDob = new Date(dob);
					convertedDob.setHours(convertedDob.getHours() + 12);
				}

				var currentDOB = CommCare.Shared.GetFieldValue("vhacrm_dateofbirth_date");
				var currentSSN = CommCare.Shared.GetFieldValue("ccwf_ssn_text");

				if (currentDOB === null)
					CommCare.Shared.SetFieldValue("vhacrm_dateofbirth_date", convertedDob);

				if (currentSSN === null)
					CommCare.Shared.SetFieldValue("ccwf_ssn_text", ssn);

			}).catch(function (error) {
				console.log("Error retrieving Contact:");
				console.log(error);
			});
		}
	}

	function preFilterPurposeDetailLookup() {
		CommCare.Shared.FormContext.getControl("vhacrm_subareaintersectionid").addPreSearch(function () {
			setPurposeDetailPreFilter();
		});
	}

	//do it here
	async function preFilterRouteActionLookup(isLoad) {
		//var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(purpose);
		//var lobName = getLookupName(lineOfBusiness);
		//var lobId = lineOfBusiness[0].id;
		//var team = CommCare.Shared.GetFieldValue("hac_teamid");
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		//var teamName = getLookupName(team); 
		var purposeDetailName = getLookupName(purposeDetail);
		//var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		//var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
		//var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("tab_14");
		var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("General");
		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");

		var formType = CommCare.Shared.FormContext.ui.getFormType();
		//var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
		var queue = CommCare.Shared.GetFieldValue("vhacrm_queueid")
		var queueId = CommCare.Shared.GetCleanId(queue);
		//var Tier1Queue = "5e55f8c8-648b-ec11-8d20-001dd800b6ad"; // fixed GUID CRMCC-7217
		var Tier1Queue = CommCare.Constants.GUIDS.Queues.Tier1Queue;
		//var Tier2Queue = "92de07d5-648b-ec11-8d20-001dd800b6ad"; // fixed GUID CRMCC-7217
		var Tier2Queue = CommCare.Constants.GUIDS.Queues.Tier2Queue;
		//var Tier3Queue = "fa3913db-648b-ec11-8d20-001dd800b6ad"; // fixed GUID CRMCC-7217
		var Tier3Queue = CommCare.Constants.GUIDS.Queues.Tier3Queue;
		//var billingConcernPurposeC3 = "95121a83-46b7-eb11-8236-001dd80216dc" // fixed GUID CRMCC-7217
		var billingConcernPurposeC3 = CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV;
		//var billingConcernPurposeNonVa = "450cc7e4-4e8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var billingConcernPurposeNonVa = CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernCC;

		//var EscalatetoTierOneC3 = "16170bb9-af8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var EscalatetoTierOneC3 = CommCare.Constants.GUIDS.ActionIntersection.EscalateToTierOneBillingConcernVISNVAMC;
		//var EscalatetoTierThreeC3 = "c531a0c2-dd8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var EscalatetoTierThreeC3 = CommCare.Constants.GUIDS.ActionIntersection.EscalateToTierThreeBillingConcernVV;
		//var EscalatetoTierThreeNVA = "48c18f74-538f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var EscalatetoTierThreeNVA = CommCare.Constants.GUIDS.ActionIntersection.EscalatetoTierThreeBillingConcernCC;
		//var InternalTierOneReviewNVA = "8f06947b-4f8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var InternalTierOneReviewNVA = CommCare.Constants.GUIDS.ActionIntersection.InternalTierOneReviewNVA;
		//var ReturntoTierOneC3 = "8e421e4a-de8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var ReturntoTierOneC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierOneBillingConcernVISNVAMC;
		//var ReturntoTierOneNVA = "d5081fc9-6097-ec11-8d20-001dd8034b05"; // fixed GUID CRMCC-7217
		var ReturntoTierOneNVA = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierOneBillingConcernCommunityCare;
		//var ReturntoTierTwoC3 = "d7d39971-e08d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var ReturntoTierTwoC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierTwoBillingConcernVISNVAMC;
		//var ReturntoTierTwoNVA = "10a1d7c5-548f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var ReturntoTierTwoNVA = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierTwoBillingConcernCommunityCare;
		//var ReturntoVAMCC3 = "19febfb8-91f0-eb11-bacb-001dd8018ade"; // fixed GUID CRMCC-7217
		var ReturntoVAMCC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCBillingConcernVISNVAMC;
		//var SendtoVAMCNVA = "31be14fa-4f8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var SendtoVAMCNVA = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCBillingConcernCommunityCare;
		//var TierTwoCCNOptumC3 = "3120930b-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoCCNOptumC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNOptumVV;
		//var TierTwoCCNOptumNVA = "6277b55d-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoCCNOptumNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNOptumCC;
		//var TierTwoCCNTriwestC3 = "0e9fe91d-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoCCNTriwestC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNTriwestVV;
		//var TierTwoCCNTriwestNVA = "1965a869-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoCCNTriwestNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNTriwestCC;
		//var TierTwoLocalContractC3 = "d1f30942-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoLocalContractC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoLocalContractVV;
		//var TierTwoLocalContractNVA = "cd7da881-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoLocalContractNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoLocalContractCC;
		//var TierTwoUrgentEmergentC3 = "0a6c622b-d78d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoUrgentEmergentC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoEmergentCareVV;
		//var TierTwoUrgentEmergentNVA = "0aebc451-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoUrgentEmergentNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoEmergentCareCC
		//var TierTwoVCAC3 = "49951730-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoVCAC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoVCAVV;
		//var TierTwoVCANVA = "218db575-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoVCANVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoVCACC;
		//var VAMCInternalReviewC3 = "43c7fa6e-fc67-ec11-8f8e-001dd800c03c"; // fixed GUID CRMCC-7217
		var VAMCInternalReviewC3 = CommCare.Constants.GUIDS.ActionIntersection.VAMCInternalReviewBillingConcernVV;
		//var SendToVAMCScheduling = "6137afee-75d4-ed11-b596-001dd8072538"; // fixed GUID CRMCC-7217
		var SendToVAMCScheduling = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCSchedulingBillingConcernCommunityCare;
		//var SendToVAMCAuthorization = "37636e87-75d4-ed11-b596-001dd8072538"; // fixed GUID CRMCC-7217
		var SendToVAMCAuthorization = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCAuthorizationBillingConcernCommunityCare;

		var isWHHL = false;
		if (purposeDetailName != null) {
			if (purposeDetailName.indexOf("VA Hotline") > -1 || purposeDetailName.indexOf("PATS-R") > -1 || purposeDetailName.indexOf("AVA") > -1) { // fix? from testing string to GUID
				isWHHL = true;
			}
		}


		CommCare.Request.Global.RouteActionLookupFetch = "";

		// if (purpose != null && CommCare.Shared.GetCleanId(purpose) == "5e03aa4f-6b59-ea11-a99c-001dd8009f4b" /*Service Recovery C4*/) { CRMCC-7217
		if (purpose != null && CommCare.Shared.GetCleanId(purpose) == CommCare.Constants.GUIDS.PurposeIntersection.ServiceRecoveryCC.toLowerCase()) {
			//var purpDetailText = CommCare.Shared.GetCleanId(purposeDetail) ?? "null";


			if (queueItem == null) {
				//only serv recovery investigation
				//<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \ CRMCC-7217 
				//<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Investigation' /> \
				CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
						<condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.PurposeIntersection.ServiceRecoveryCC + "' /> \
						<filter type='or' > \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationClinicalDecisions + "' /> \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationCSCLOTW + "' /> \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationSeniorSupervisors + "' /> \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationServiceRecoveryCommunityCare + "' /> \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationServiceRecoveryVISNVAMC + "' /> \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationServiceRecovery + "' /> \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationSignatureLOTW + "' /> \
							<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationSupervisorsTL852 + "' /> \
						</filter> \
					</filter >"
				if (!isLoad) {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
					console.log("removed setRouteActionPreFilter presearch");
				}
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
			}
			else {

				Xrm.WebApi.online.retrieveRecord("queueitem", CommCare.Shared.GetCleanId(queueItem), "?$select=_queueid_value").then(
					function success(result) {
						var _queueid_value = result["_queueid_value"];
						var _queueid_value_formatted = result["_queueid_value@OData.Community.Display.V1.FormattedValue"];
						var _queueid_value_lookuplogicalname = result["_queueid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];


						if (_queueid_value_formatted == "<Service Recovery>") {
							if (!isWHHL) {  //(purposeDetailName != "White House Hotline") {
								//Service Recovery Approval
								//<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \ CRMCC-7217
								//<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval' /> \
								CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
									<condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.PurposeIntersection.ServiceRecoveryCC + "' /> \
									<filter type='or' > \
										<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryApprovalServiceRecovery + "' /> \
									<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryApprovalServiceRecoveryCSC + "' /> \
								  </filter > \
								</filter >"
							} else if (purposeDetailName != null) {
								if (isWHHL) {
									//Approval
									//All rejects
									//<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \ CRMCC-7217
									//<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval' /> \
									//<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval' /> \
									CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
									<condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.PurposeIntersection.ServiceRecoveryCC + "' /> \
									<filter type='or' > \
									<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryApprovalServiceRecovery + "' /> \
									<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryApprovalServiceRecoveryCSC + "' /> \
									</filter> \
								</filter >"
									//Removed from qa
									//	< condition attribute = 'vhacrm_name' operator = 'eq' value = 'Rejected - Incorrect Facility' /> \
									//<condition attribute='vhacrm_name' operator='eq' value='Rejected - Not Actionable' /> \
									//<condition attribute='vhacrm_name' operator='eq' value='Rejected - Not for OCC' /> \
									//<condition attribute='vhacrm_name' operator='eq' value='Rejected - Other' /> \
								}
							}

						}
						else if (_queueid_value_formatted == "<Service Recovery Approval>") {
							if (!isWHHL) /*(purposeDetailName != "White House Hotline")*/ {
								//Return to Service Recovery
								//<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \ CRMCC-7217
								//	<condition attribute='vhacrm_name' operator='eq' value='Return to Service Recovery' /> \
								CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
									<condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.PurposeIntersection.ServiceRecoveryCC + "' /> \
									<filter type='or' > \
										<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ReturnToServiceRecoveryServiceRecoveryVISNVAMC + "' /> \
										<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ReturnToServiceRecoveryServiceRecoveryCommunityCare + "' /> \
										<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ReturnToServiceRecoveryServiceRecoveryApproval + "' /> \
								  </filter> \
								</filter >"
							}
							else if (isWHHL) /*(purposeDetailName == "White House Hotline")*/ {
								//Approval
								//Return
								//Pats approval
								//rejects
								//<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \ CRMCC-7217
								//	<condition attribute='vhacrm_name' operator='eq' value='Return to Service Recovery' /> \
								//	<condition attribute='vhacrm_name' operator='eq' value='PATS-R Approval' /> \
								//  <condition attribute='vhacrm_name' operator='eq' value='Send for PATS-R Approval' /> \
								CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
								  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.PurposeIntersection.ServiceRecoveryCC + "' /> \
								  <filter type='or' > \
									<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ReturnToServiceRecoveryServiceRecoveryVISNVAMC + "' /> \
									<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ReturnToServiceRecoveryServiceRecoveryCommunityCare + "' /> \
									<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ReturnToServiceRecoveryServiceRecoveryApproval + "' /> \
									<condition attribute='vhacrm_actionintersectionid' operator= eq' values='" + CommCare.Constants.GUIDS.ActionIntersection.PATSRApprovalServiceRecoveryCommunityCare + "' /> \
									<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.PATSRApprovalServiceRecovery + "' /> \
								    <condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.SendForPATSRApprovalServiceRecoveryVV + "' /> \
								  </filter> \
								</filter>"
								//removed from qa
								//	< condition attribute = 'vhacrm_name' operator = 'eq' value = 'Service Recovery Approval - Rejected - Incorrect Facility' /> \
								//<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval - Rejected - Not Actionable' /> \
								//<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval - Rejected - Not for OCC' /> \
								//<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval - Rejected - Other' /> \
							}
						}
						if (!isLoad) {
							CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
							console.log("removed setRouteActionPreFilter presearch");
						}
						CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
					},
					function (error) {
						console.log("Error Retrieving Queue Item with message: " + error.message);
					}
				);
			}
		}/* end */
		else if (!!purposeID && (purposeID == CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV || purposeID == CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernCC)) {
			if ((formType == CommCare.Shared.Constants.CREATE_FORM || formType == CommCare.Shared.Constants.UPDATE_FORM) && (queue == null || (queueId != Tier1Queue && queueId != Tier2Queue && queueId != Tier3Queue))) {
				var fetchXml = "<filter type='or' >";
				if (purposeID == CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV) {
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + VAMCInternalReviewC3 + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + EscalatetoTierOneC3 + "' />";
					// CRMCC-5934 Tier Two Pharamacy commented out CRMCC-7413
					//if (await CommCare.Shared.IsOnTeam(CommCare.Constants.GUIDS.Teams.TierOne)) {
					//	fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementVV + "' />";
					//}
				}
				else {
					// CRMCC-5934 Tier Two Pharamacy
					if (await CommCare.Shared.IsOnTeam(CommCare.Constants.GUIDS.Teams.TierOne)) {
						if (purposeID == CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV) {
							fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementVV + "' />";
						} else {
							fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementCC + "' />";
						}
					}
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + InternalTierOneReviewNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoUrgentEmergentNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoCCNOptumNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoCCNTriwestNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoVCANVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoLocalContractNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + SendtoVAMCNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + SendToVAMCAuthorization + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + SendToVAMCScheduling + "' />";
				}

				fetchXml += "</filter>";

				CommCare.Request.Global.RouteActionLookupFetch = fetchXml;

				if (!isLoad) {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
					console.log("removed setRouteActionPreFilter presearch");
				}
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
			}
			else if (CommCare.Shared.GetCleanId(queue) == Tier1Queue) {
				var urgEmerg = purposeID == billingConcernPurposeC3 ? TierTwoUrgentEmergentC3 : TierTwoUrgentEmergentNVA;
				var optum = purposeID == billingConcernPurposeC3 ? TierTwoCCNOptumC3 : TierTwoCCNOptumNVA;
				var triwest = purposeID == billingConcernPurposeC3 ? TierTwoCCNTriwestC3 : TierTwoCCNTriwestNVA;
				var VCA = purposeID == billingConcernPurposeC3 ? TierTwoVCAC3 : TierTwoVCANVA;
				var localContract = purposeID == billingConcernPurposeC3 ? TierTwoLocalContractC3 : TierTwoLocalContractNVA;
				var toVamc = purposeID == billingConcernPurposeC3 ? ReturntoVAMCC3 : SendtoVAMCNVA;


				var fetchXml = "<filter type='or' >";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + urgEmerg + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + optum + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + triwest + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + VCA + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + localContract + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + toVamc + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + EscalatetoTierOneC3 + "' />";

				if (purposeID == billingConcernPurposeNonVa) {
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + SendToVAMCScheduling + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + SendToVAMCAuthorization + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + InternalTierOneReviewNVA + "' />";
				}
				/*  CRMCC-5934 Tier Two Pharamacy commented out CRMCC-7413 uncommented out CRMCC-7437 and CRMCC-7438 */
				if (await CommCare.Shared.IsOnTeam(CommCare.Constants.GUIDS.Teams.TierOne)) {
					if (purposeID != null && purposeID.toLowerCase() == CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV.toLowerCase()) {
						fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementVV + "' />";
					} else {
						fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementCC + "' />";
					}
				}

				fetchXml += "</filter>";

				CommCare.Request.Global.RouteActionLookupFetch = fetchXml;

				if (!isLoad) {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
					console.log("removed setRouteActionPreFilter presearch");
				}
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
			}
			else if (CommCare.Shared.GetCleanId(queue) == Tier2Queue) {
				var toTier3 = purposeID == billingConcernPurposeC3 ? EscalatetoTierThreeC3 : EscalatetoTierThreeNVA;
				var toTier1 = purposeID == billingConcernPurposeC3 ? ReturntoTierOneC3 : ReturntoTierOneNVA;

				var fetchXml = "<filter type='or' >";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + toTier3 + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + toTier1 + "' />";
				if (purposeID == billingConcernPurposeC3) fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + ReturntoVAMCC3 + "' />";
				fetchXml += "</filter>";

				CommCare.Request.Global.RouteActionLookupFetch = fetchXml;

				if (!isLoad) {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
					console.log("removed setRouteActionPreFilter presearch");
				}
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
			}
			else if (CommCare.Shared.GetCleanId(queue) == Tier3Queue) {
				var toTier2 = purposeID == billingConcernPurposeC3 ? ReturntoTierTwoC3 : ReturntoTierTwoNVA;

				var fetchXml = "<filter type='or' >";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + toTier2 + "' />";
				fetchXml += "</filter>";

				CommCare.Request.Global.RouteActionLookupFetch = fetchXml;

				if (!isLoad) {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
					console.log("removed setRouteActionPreFilter presearch");
				}
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
			}
		}
		else {
			if (!isLoad) {
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
				console.log("removed setRouteActionPreFilter presearch");
			}
			CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
		}

	}

	function setPurposeDetailPreFilter() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		if (lineOfBusiness !== null) {
			if (CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) === "OCC FM") { // fix? from testing string to GUID
				var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
				var purposeID = CommCare.Shared.GetCleanId(purpose);
				//var purposeName; CRMCC-7217
				var team = CommCare.Shared.GetFieldValue("hac_teamid");
				var teamID = CommCare.Shared.GetCleanId(team);
				//var teamName; CRMCC-7217

				if (team != null)
					teamName = CommCare.Shared.DialogNameReturn(team[0].name);

				if (purpose != null) {
					var fetchXml = "<filter type='and'>";
					//purposeName = CommCare.Shared.DialogNameReturn(purpose[0].name); CRMCC-7217
					//if (purposeName === "Preauthorization") { CRMCC-7217
					if (CommCare.Constants.Compare.PurposeIntersection.Preauthorization(purposeID)) {

						//get user team and filter out all but Inquiry unless team = CSC Specialty
						//if (teamName !== "CSC Specialty" && teamName !== "Supervisors TL 852") { // fixed from testing string to GUID CRMCC-7217
						if (teamID != null && teamID.toLowerCase() != CommCare.Constants.GUIDS.Teams.CSCSpecialty.toLowerCase() && teamID.toLowerCase() != CommCare.Constants.GUIDS.Teams.SupervisorsTL852.toLowerCase()) {
							//fetchXml += "<condition attribute='vhacrm_subareaintersectionid' operator='eq' value='{50ae0175-62e7-e811-812c-1458d04e2f20}' />\ CRMCC-7217
							fetchXml += "<condition attribute='vhacrm_subareaintersectionid' operator='eq' value='{" + CommCare.Constants.GUIDS.SubPurpose.PreauthorizationInquiry + "}' />\
                                    </filter>";
						}
						else {
							fetchXml += "<condition attribute='vhacrm_areaintersectionid' operator='eq' value='\
                                    " + purpose[0].id + "' />\
                                </filter>";
						}
					}
					else {
						fetchXml += "<condition attribute='vhacrm_areaintersectionid' operator='eq' value='\
                                    " + purpose[0].id + "' />\
                                </filter>";
					}
					CommCare.Shared.FormContext.getControl("vhacrm_subareaintersectionid").addCustomFilter(fetchXml);
				}
			}
		}
	}

	function setTreatmentStatusPreFilter() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetail);

		if (!!purposeDetailName) {
			if (purposeDetailName.toLowerCase().indexOf("v-sig") > -1) { // fix? from testing string to GUID
				console.log("This is a V-Signal.  Showing Community Care Treatment Status");
			}
			else {
				if (!!CommCare.Shared.FormContext.getControl("mcs_treatmentstatus"))
					CommCare.Shared.FormContext.getControl("mcs_treatmentstatus").addPreSearch(treatmentStatusPreSearch);
			}
		}
		else {
			if (!!CommCare.Shared.FormContext.getControl("mcs_treatmentstatus"))
				CommCare.Shared.FormContext.getControl("mcs_treatmentstatus").addPreSearch(treatmentStatusPreSearch);
		}
	}

	function treatmentStatusPreSearch() {

		var fetchXml = "<filter type='and'>"
		fetchXml += "<condition attribute='mcs_name' operator='ne' value='Community Care' />";
		fetchXml += "</filter>"

		if (!!CommCare.Shared.FormContext.getControl("mcs_treatmentstatus"))
			CommCare.Shared.FormContext.getControl("mcs_treatmentstatus").addCustomFilter(fetchXml);
	}

	function setRouteActionPreFilter() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed  CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(purpose); CRMCC-7217
		var lobName = getLookupName(lineOfBusiness);
		var lobId = lineOfBusiness[0].id;
		var team = CommCare.Shared.GetFieldValue("hac_teamid");
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var teamName = getLookupName(team);
		var teamID = CommCare.Shared.GetCleanId(team);
		var purposeDetailName = getLookupName(purposeDetail);
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
		//var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("tab_14");
		var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("General");
		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");

		if (lineOfBusiness !== null) {
			if (lobName === CommCare.Shared.Constants.CCWF_LOB_NAME) { // fix? from testing string to GUID
				console.log(CommCare.Request.Global.RouteActionLookupFetch);
				if (CommCare.Request.Global.RouteActionLookupFetch != "") {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(CommCare.Request.Global.RouteActionLookupFetch);
				}
				//else if (purpose !== null && purposeName != "ACR") { // fix? from testing string to GUID CRMCC-7217
				else if (purpose !== null && !CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
					var fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                </filter>";
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
				}
				//else if (purposeName == "ACR") { // fix? from testing string to GUID CRMCC-7217
				else if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
					var fetchXml
					if (ob2Resolution == null
						&& (ob1Resolution == CommCare.Constants.Integers.OBResolution.NoContact
							|| ob1Resolution == CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting)
						&& ahrTab.getDisplayState() == "expanded") {
						fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR + "' />\
                                </filter>";

						//<condition attribute='vhacrm_name' operator='neq' value='Closing the Loop' />\
					}
					else if (ob2Resolution != null && ahrTab.getDisplayState() == "expanded") {
						fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ACRCSCImmedateACR + "' />\
                                </filter>";

						//<condition attribute='vhacrm_name' operator='neq' value='ACR CSC Immediate' />\
					}
					else if (ob2Resolution == null && ahrTab.getDisplayState() == "expanded") {
						fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ACRCSCImmedateACR + "' />\
								  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR + "' />\
                                </filter>";

						//<condition attribute='vhacrm_name' operator='neq' value='ACR CSC Immediate' />\
						//<condition attribute='vhacrm_name' operator='neq' value='Closing the Loop' />\
					}
					else {
						fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                </filter>";
					}
					console.log(fetchXml);
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
				}
			}
			else if (lobName === CommCare.Shared.Constants.OCCFM_LOB_NAME) { // fix? from testing string to GUID
				if (team !== null) {
					var fetchXml = "<filter type='or'>\
                                <filter type='and'>\
                                <condition attribute='statecode' operator='eq' value='0' />\
                                <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                <condition attribute='hac_owner_teamid' operator='eq' value='" + team[0].id + "' />\
                                <condition attribute='vhacrm_subareaintersectionid' operator='null' />\
                                </filter>\
                                ";
					if ( // fix? from testing string to GUID// Fixed CRMCC-7217
						//(teamName === 'EEV')
						//|| (teamName === 'PSD Appeals')
						//|| (teamName === 'PSD DTA')
						//|| (teamName === 'Pharmacy')
						//|| (teamName === 'Congressional')
						//|| (teamName === 'R&R Suspense 1')
						//|| (teamName === 'R&R Suspense 2')
						//|| (teamName === 'R&R Suspense 3')
						//|| (teamName === 'R&R Suspense 4')
						//|| (teamName === 'R&R Suspense 5')
						//|| (teamName === 'R&R Suspense 6')// Fixed CRMCC-7217
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.EEV.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.PSDAppeals.toLowerCase() || //NOT in table
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.PSDDTA.toLowerCase() || //NOT in table
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.Pharmacy.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.Congressional.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.RandRSuspense1.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.RandRSuspense2.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.RandRSuspense3.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.RandRSuspense4.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.RandRSuspense5.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.RandRSuspense6.toLowerCase() ||
						(
							//(teamName === 'CSC Specialty' || teamName === 'Supervisors TL 852' || teamName === 'Clinical Decisions')// Fixed CRMCC-7217
							(teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.CSCSpecialty.toLowerCase() ||
								teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.SupervisorsTL852.toLowerCase() ||
								teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.ClinicalDecisions)
							//&& (purposeName === 'Preauthorization') CRMCC-7217 
							&& (CommCare.Constants.Compare.PurposeIntersection.Preauthorization(purposeID))
							&& ((purposeDetailName == null) || (purposeDetailName === 'Inquiry'))
						)
						||
						(
							//(teamName === 'CSC Specialty' || teamName === 'Supervisors TL 852' || teamName === 'Clinical Decisions') &&  Fixed CRMCC-7217
							(teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.CSCSpecialty.toLowerCase() ||
								teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.SupervisorsTL852.toLowerCase() ||
								teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.ClinicalDecisions) &&
							//&& (purposeName !== 'Preauthorization')) CRMCC-7217
							(!CommCare.Constants.Compare.PurposeIntersection.Preauthorization(purposeID)))
					) {
						//Added team condition to stop duplicate actions in quick create
						fetchXml += "<filter type='and'>\
                                <condition attribute='statecode' operator='eq' value='0' />\
                                <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                <condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + CommCare.Constants.GUIDS.PurposeIntersection.PreauthorizationCSC + "' />\
								<condition attribute='hac_owner_teamid' operator='eq' value='" + team[0].id + "' />\
                                </filter>\
                            ";
					}
					//else if ((teamName === 'CSC Specialty' || teamName === 'Supervisors TL 852') && (purposeDetail !== null)) { Fixed CRMCC-7217
					else if ((teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.CSCSpecialty.toLowerCase() ||
						teamID.toLowerCase() == CommCare.Constants.GUIDS.Teams.SupervisorsTL852.toLowerCase()) && (purposeDetail !== null)) {
						//Added team condition to stop duplicate actions in quick create
						fetchXml += "<filter type='and'>\
                                <condition attribute='statecode' operator='eq' value='0' />\
                                <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                <condition attribute='vhacrm_subareaintersectionid' operator='eq' value='" + purposeDetail[0].id + "' />\
								<condition attribute='hac_owner_teamid' operator='eq' value='" + team[0].id + "' />\
                                </filter>\
                            ";
					}
					fetchXml += "</filter>";
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
				}
			}
		}
	}

	//TODO this looks the same as getMissingRequiredFieldNames except it returns true false vs list of reqd fields.  If this is actually needed, call getMissingRequiredFieldNames and return true if it is not null or empty string
	function checkMandatoryFields() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var populated = true;
		var tin = CommCare.Shared.FormContext.ui.controls.get("ccwf_tin_text");
		console.log(tin);
		CommCare.Shared.FormContext.ui.controls.forEach(function (control, index) {
			try {
				var controlRequired = control.getAttribute().getRequiredLevel();
				var controlVisible = control.getVisible();
				var controlName = control.getAttribute().getName();
				var fieldsToIgnore = ["name", "subject", "to", "from"];

				//console.log(controlName, "controlVisible ", controlVisible, "conrtrolRequired ", controlRequired);
				if (controlVisible == true && controlRequired == "required") {
					if (control.getAttribute().getValue() === null && fieldsToIgnore.indexOf(controlName) < 0) {
						populated = false;
						console.log("***************Found Required but null field*************** " + controlName);
					}
				}
			} catch (e) {
				console.log(e.message);
			}
		});
		return populated;
	}

	function USD_newTopicButtonTrigger(context, newWindowUrl) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		newTopicButtonTrigger(newWindowUrl);
	}

	///This is called from USD to perform save of form and then navigate the user
	function newTopicButtonTrigger(newWindowUrl) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");

		if (lineOfBusiness !== null && CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) === "Customer Experience") { // fix? from testing string to GUID

			CommCare.Shared.FormContext.data.save().then(
				function () {
					setTimeout(
						function () {
							UsdButtonClickSaveCallBack(newWindowUrl);
						}, 10)
				},
				function (errorCode) {
					saveErrorOccurred = true;
					console.log(errorCode.message);
					if (parent.window.IsUSD) {
						setTimeout(function () {
							window.open("http://event/?EventName=RequestClearProgressIndicator");
							console.log("*** Called event RequestClearProgressIndicator");
						}, 1500);
					}
				});
		}
		else {
			CommCare.Shared.FormContext.data.save().then(setTimeout(function () {

				// After successful save, ensure all fields are set to SubmitMode=never, else fields will show as dirty
				CommCare.Shared.FormContext.data.entity.attributes.forEach(function (control, i) {
					console.log("submit Mode == never in newTopicButtonTrigger");
					control.setSubmitMode("never");
				});

				window.open(newWindowUrl);
			}, 10),
				function (errorCode) {
					console.log(errorCode.message);
					if (parent.window.IsUSD) {
						setTimeout(function () {
							window.open("http://event/?EventName=RequestClearProgressIndicator");
							console.log("*** Called event RequestClearProgressIndicator");
						}, 1500);
					}
				});
		}

		///Need to trigger save event to form w/then statement post save to trigger USD Event if we are in USD. 
		//CommCare.Shared.FormContext.data.save().then(setTimeout(function () { window.open(newWindowUrl); }, 2000),
		//function (errorCode) { console.log(errorCode.message); });
	}

	function StopSave(context) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		context.getEventArgs().preventDefault();
		if (parent.window.IsUSD) {
			setTimeout(function () {
				window.open("http://event/?EventName=RequestClearProgressIndicator");
				console.log("*** Called event RequestClearProgressIndicator");
			}, 1500);
		}
	}

	//TODO - this looks identical to checkMandatoryFields (except that it returns the string concatenated list of fields) - the other function, if needed should call this one and return true if the string is not empty
	function getMissingRequiredFieldNames() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var populated = "";
		CommCare.Shared.FormContext.ui.controls.forEach(function (control, index) {
			try {
				var controlRequired = control.getAttribute().getRequiredLevel();
				var controlVisible = control.getVisible();
				var controlName = control.getAttribute().getName();
				var fieldsToIgnore = ["name", "subject", "to", "from"];

				//console.log(controlName, "controlVisible ", controlVisible, "conrtrolRequired ", controlRequired);
				if (controlVisible == true && controlRequired == "required") {
					if (control.getAttribute().getValue() === null && fieldsToIgnore.indexOf(controlName) < 0) { // fix? from testing string to GUID
						if (populated === "") {
							populated = populated.concat(control.getLabel());
						}
						else {
							populated = populated.concat(", ", control.getLabel());
						}
						console.log("***************Found Required but null field*************** " + controlName);
					}
				}
			} catch (e) {

			}

		});
		return populated;
	}

	function UsdButtonClickSaveCallBack(newWindowUrl) {

		var throwError = checkMandatoryFields();

		if (throwError == false) {
			var fieldText = "Please enter all required fields :: " + getMissingRequiredFieldNames();
			CommCare.Shared.CrmCommonJS.Notification.ClearNotification();
			CommCare.Shared.CrmCommonJS.Notification.SetError(fieldText, "1");
			return;
		}
		else {
			CommCare.Shared.CrmCommonJS.Notification.ClearNotification();

		}
		console.log("UsdButtonClickSaveCallBack");
		var valid = handleCustomerCareOnSave();

		if (valid) {

			// After successful save, ensure all fields are set to SubmitMode=never, else fields will show as dirty
			CommCare.Shared.FormContext.data.entity.attributes.forEach(function (control, i) {
				console.log("submit Mode == never in UsdButtonClickSaveCallBack");
				control.setSubmitMode("never");
			});


			window.open(newWindowUrl);
		}
	}

	function categoryOfCare() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purpName = getLookupName(purpose);
		//var reqLevel = purpName == "ACR" ? "required" : "none" CRMCC-7217
		var reqLevel = (purposeID != null &&  CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) ? "required" : "none"
		//if (purpName == "ACR") { // fix? from testing string to GUID
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) { 
			CommCare.Shared.SetRequired("mcs_categoryofcare", reqLevel);
		}

	}

	async function navigateForm(eventArgs) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //Fixed CRMCC-7217
		categoryOfCare();
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purpName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		//var acrFormId = "640932ba-e0f3-4107-849a-0cbec308fba5"; CRMCC-7217
		var acrFormId = CommCare.Constants.GUIDS.Forms.ACR;
		//var requestQuickCreateFormId = '0131f842-65c0-47b8-85c7-d8272cdfa6ee' CRMCC-7217
		var requestQuickCreateFormId = CommCare.Constants.GUIDS.Forms.QuickCreate;
		//var commCareFormId = "40ba7433-4b0b-4c58-bb2a-81e346e98910"; CRMCC-7217
		var commCareFormId = CommCare.Constants.GUIDS.Forms.CCWF;
		//var occfmFormId = "43132D83-9BC6-432A-B20C-2039CFC2E0C8"; CRMCC-7217
		var occfmFormId = CommCare.Constants.GUIDS.Forms.OCCFM;
		var isValidForm = true;
		var formType = CommCare.Shared.FormContext.ui.getFormType()

		///If we have eventArgs then we are being called from onChange. 
		///This is assuming that context param is NOT sent in onload call of this function
		//if (eventArgs !== undefined && purpName != "Bill of Collections") { // fixed from testing string to GUID
		if (eventArgs !== undefined &&CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID)) {
			CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", null);
			CommCare.Shared.FormContext.getAttribute("vhacrm_subareaintersectionid").fireOnChange();
		}

		if (formType === CommCare.Shared.Constants.UPDATE_FORM || formType === CommCare.Shared.Constants.INACTIVE_FORM) {
			///If purpose is null then we do nothing here as we don't know where to go until user gives us a value
			if (purpose === null) {
				console.log("NavigateForm no purpose");
				return;
			}

			//var lineOfBusiness = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_lobid"));
			//CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(lineOfBusiness, "hrc_lobs", "hrc_name,mcs_requestformid").then(function (lobRecord) {
			//	var validFormId = lobRecord["mcs_requestformid"];
			//	console.log(validFormId);
			//	console.log(CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId());
			//	console.log(!CommCare.Shared.FormIsValid(validFormId));
			//	console.log(CommCare.Shared.FormContext.ui.formSelector.items.get(validFormId.toLowerCase()) != null);
			//	if (validFormId !== null) {
			//		if (!CommCare.Shared.FormIsValid(validFormId)) {
			//			console.log("FORM IS VALID");
			//			CommCare.Shared.FormContext.data.entity.attributes.forEach(function (control, i) {
			//				control.setSubmitMode("never");
			//			});
			//			CommCare.Shared.FormContext.ui.formSelector.items.get(validFormId.toLowerCase()).navigate();
			//			return;
			//		}
			//	}

			//	if (!!eventArgs) {
			//		if (!!eventArgs.getEventSource()) {
			//			var eventSource = eventArgs.getEventSource().getName();
			//			if (!!eventSource) {
			//				console.log(eventSource);
			//				console.log("Not running onload callback");
			//				return;
			//			}
			//		}
			//	}

			//	if (isValidForm == true) {
			//		onLoadCallback();
			//	}

			//}).catch(function (error) {
			//	console.log("Error retrieving Line of business record: " + error.message);
			//	console.log(error);
			//});

			var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");

			if (lineOfBusiness !== null && getLookupName(lineOfBusiness) === CommCare.Shared.Constants.CCWF_LOB_NAME) {
				//TODO - use the purpName as it handles the dialog function and was already retrieved above
				//if (purpose[0].name === "ACR") { // fixed from testing string to GUID CRMCC-7217
				if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {

					if (!CommCare.Shared.FormIsValid(acrFormId)) {
						isValidForm = false;
						CommCare.Shared.FormContext.data.entity.attributes.forEach(function (attribute, index) {
							if (attribute.getName() != "vhacrm_areaintersectionid in the if (!CommCare.Shared.FormIsValid(acrFormId)) {") {
								console.log("submit Mode == never in navigateForm");
								attribute.setSubmitMode("never");
								attribute.setRequiredLevel("none")
								//CommCare.Shared.SetReadOnly(attribute, "none");
							}
						});
						isValidationNeeded_HandleCustomerCareOnSave = false;
						CommCare.Shared.FormContext.data.save().then(function () {
							CommCare.Shared.FormContext.ui.formSelector.items.get(acrFormId.toLowerCase()).navigate();
						},
							function (errorCode) {
								console.log("Error auto saving Request prior to form change: " + errorCode.message);
							});

					}
				}
				else if (!CommCare.Shared.FormIsValid(commCareFormId)) {
					isValidForm = false;
					CommCare.Shared.FormContext.data.entity.attributes.forEach(function (attribute, index) {
						if (attribute.getName() != "vhacrm_areaintersectionid") {
							console.log("submit Mode == never in navigateForm in the else if (!CommCare.Shared.FormIsValid(commCareFormId))");
							attribute.setSubmitMode("never");
							attribute.setRequiredLevel("none")
							//CommCare.Shared.SetReadOnly(attribute, "none");
						}
					});
					isValidationNeeded_HandleCustomerCareOnSave = false;
					CommCare.Shared.FormContext.data.save().then(function () {
						CommCare.Shared.FormContext.ui.formSelector.items.get(commCareFormId.toLowerCase()).navigate();
					},
						function (errorCode) {
							console.log("Error auto saving Request prior to form change: " + errorCode.message);
						});
				}
			}
			else if (lineOfBusiness !== null && CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
				if (!CommCare.Shared.FormIsValid(occfmFormId)) {
					isValidForm = false;
					CommCare.Shared.FormContext.ui.formSelector.items.get(occfmFormId.toLowerCase()).navigate();
				}
			}

			if (!!eventArgs) {
				if (!!eventArgs.getEventSource()) {
					var eventSource = eventArgs.getEventSource().getName();
					if (!!eventSource) {
						console.log(eventSource);
						console.log("NavigateForm Not running onload callback");
						return;
					}
				}
			}

			if (isValidForm == true) {
				await onLoadCallback();
			}
		}
	}

	function setAcceptingRequestForVisnOrServicingFac() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = getLookupName(lineOfBusiness);
		var acceptingRequests = true;

		if (lineOfBusinessName == CommCare.Shared.Constants.CCWF_LOB_NAME) { // fixed from testing string to GUID
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); //Already uses a GUID
			if (action != null) {
				var columns = "hac_routetype_code"
				var filter = null;

				CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(CommCare.Shared.GetCleanId(action), "vhacrm_actionintersections", columns, filter).then(function (retAct) {
					console.log(retAct);
					var routeTypeCode = retAct.hac_routetype_code;
					var servFac = CommCare.Shared.GetFieldValue("hrc_facilityid");
					var servVISN = CommCare.Shared.GetFieldValue("vhacrm_visnid");

					if (routeTypeCode == CommCare.Constants.Integers.ActionRouteType.Facility) {
						if (servFac !== null) {
							var servFacId = servFac[0].id.toString();
							var columns = "mcs_acceptingrequests";
							var filter = null;

							CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(servFacId, "bah_facilities", columns, filter).then(function (facility) {
								acceptingRequests = facility.mcs_acceptingrequests;
								CommCare.Shared.SetFieldValue("mcs_facilityacceptingrequests", acceptingRequests);
							}).catch(function (error) {
								console.log("Error retrieving Facility:");
								console.log(error);
							});
						}
					}
					else if (routeTypeCode == CommCare.Constants.Integers.ActionRouteType.VISN) {
						if (servVISN != null) {
							var visnId = servVISN[0].id.toString();
							var columns = "mcs_accpetingrequests";
							var filter = null;

							CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(visnId, "bah_visns", columns, filter).then(function (visn) {
								acceptingRequests = visn.mcs_accpetingrequests;
								CommCare.Shared.SetFieldValue("mcs_facilityacceptingrequests", acceptingRequests);
							}).catch(function (error) {
								console.log("Error retrieving Facility:");
								console.log(error);
							});
						}
					}
					else {
						CommCare.Shared.SetFieldValue("mcs_facilityacceptingrequests", acceptingRequests);
					}
				}).catch(function (error) {
					console.log("Error retrieving Action Intersection with message: ");
					console.log(error);
				});
			}
		}
		else {
			CommCare.Shared.SetFieldValue("mcs_facilityacceptingrequests", acceptingRequests);
		}
	}

	///TODO Patrick - Add check for null and clear VISN/CPAC
	///TODO Patrikc - Add On Load to check for source Fac and default VISN/CPAC
	function setVISNfromHomeFac_OnChange(isLoad) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var homeFac = CommCare.Shared.GetFieldValue("ccwf_homefacility");
		var servicingFac = CommCare.Shared.GetFieldValue("hrc_facilityid");
		var servicingVISN = CommCare.Shared.GetFieldValue("ccwf_visn");

		if (isLoad == "load" && servicingVISN != null)
			return;

		if (homeFac !== null) {
			var facId = homeFac[0].id.toString();

			var columns = "bah_visnid";
			var filter = "$expand=bah_visnid($select=bah_name)";

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(facId, "bah_facilities", columns, filter).then(function (facility) {
				console.log("request successful ", facility, "VISN Obj", facility["bah_visnid"], facility["bah_visnid"]["bah_name"]);
				var visnName = facility["bah_visnid"]["bah_name"];
				var visnId = facility["bah_visnid"]["bah_visnid"];
				CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("ccwf_visn", visnId, visnName, "bah_visn");
				CommCare.Shared.FormContext.getAttribute("ccwf_visn").fireOnChange();
			}).catch(function (error) {
				console.log("Error retrieving Facility:");
				console.log(error);
			});

			if (servicingFac == null) {
				CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("hrc_facilityid", facId, getLookupName(homeFac), "bah_facility");
				CommCare.Shared.FormContext.getAttribute("hrc_facilityid").fireOnChange()
			}
		}
	}

	//TODO combine this and the function above by making them call a common "Generic" function that accepts string params for source field and target field
	function setServicingVISN() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var servFac = CommCare.Shared.GetFieldValue("hrc_facilityid");
		var servVisn = CommCare.Shared.GetFieldValue("vhacrm_visnid");
		if (servFac !== null) {
			var servFacId = servFac[0].id.toString();
			var columns = "bah_visnid,mcs_acceptingrequests";
			var filter = "$expand=bah_visnid($select=bah_name,mcs_accpetingrequests)";

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(servFacId, "bah_facilities", columns, filter).then(function (facility) {
				console.log("request successful ", facility, "VISN Obj", facility["bah_visnid"], facility["bah_visnid"]["bah_name"]);
				var visnName = facility["bah_visnid"]["bah_name"];
				var visnId = facility["bah_visnid"]["bah_visnid"];

				var acceptingRequests = facility.mcs_acceptingrequests == false ? false
					: facility.bah_visnid.mcs_accpetingrequests == false ? false
						: true;

				CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_visnid", visnId, visnName, "bah_visn");
				//CommCare.Shared.SetFieldValue("mcs_facilityacceptingrequests", acceptingRequests);
				CommCare.Shared.FormContext.getAttribute("vhacrm_visnid").fireOnChange();
			}).catch(function (error) {
				console.log("Error retrieving Facility:");
				console.log(error);
			});
		}
	}

	function setPRSServicingVISN() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var servFac = CommCare.Shared.GetFieldValue("vhacrm_choiceops_siteid");
		var servVisn = CommCare.Shared.GetFieldValue("vhacrm_choiceops_visnid");
		if (servFac !== null) {
			var servFacId = servFac[0].id.toString();
			var columns = "bah_visnid,mcs_acceptingrequests";
			var filter = "$expand=bah_visnid($select=bah_name,mcs_accpetingrequests)";

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(servFacId, "bah_facilities", columns, filter).then(function (facility) {
				console.log("request successful ", facility, "VISN Obj", facility["bah_visnid"], facility["bah_visnid"]["bah_name"]);
				var visnName = facility["bah_visnid"]["bah_name"];
				var visnId = facility["bah_visnid"]["bah_visnid"];

				var acceptingRequests = facility.mcs_acceptingrequests == false ? false
					: facility.bah_visnid.mcs_accpetingrequests == false ? false
						: true;

				CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_choiceops_visnid", visnId, visnName, "bah_visn");
				//CommCare.Shared.SetFieldValue("mcs_facilityacceptingrequests", acceptingRequests);
				CommCare.Shared.FormContext.getAttribute("vhacrm_choiceops_visnid").fireOnChange();
			}).catch(function (error) {
				console.log("Error retrieving Facility:");
				console.log(error);
			});
		}
	}

	function setCPACfromVISN_OnChange() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var visn = CommCare.Shared.GetFieldValue("ccwf_visn");
		if (visn === null)
			return;

		var visnId = visn[0].id.toString(); //.replace("{", "").replace("}", "");
		console.log("visnid = ", visnId);


		var columns = "hrc_cpacid";
		var filter = "$expand=hrc_cpacid($select=hrc_name)";

		CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(visnId, "bah_visns", columns, filter).then(function (visn) {
			//CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(visnId, "bah_visns", columns).then(function (visn) {
			console.log("request successful IN CPAC ", visn) //, "VISN Obj", facility["bah_visnid"], facility["bah_visnid"]["bah_name"]);
			var cpacName = visn["hrc_cpacid"]["hrc_name"];
			var cpacId = visn["hrc_cpacid"]["hrc_cpacid"];

			CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_cpacid", cpacId, cpacName, "hrc_cpac");
			CommCare.Shared.FormContext.data.entity.attributes.get("vhacrm_cpacid").setSubmitMode("always"); // TODO - clear this: i believe the setlookupvalue function already sets submit mode to always - so this line is redundant
		}).catch(function (error) {
			console.log("Error retrieving CPAC:");
			console.log(error);
		});
	}

	function visnServiceFacHideShowRequire(purpose, action, purposeDetail, lob, programType) { // fix? programType from testing string to GUID
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		if (lob === CommCare.Shared.Constants.CCWF_LOB_NAME) {
			if (programType == "C6") {
				if (purposeDetail == "VA Facility") {
					CommCare.Shared.SetVisible("hrc_facilityid", true);
					CommCare.Shared.SetRequired("hrc_facilityid", "required");
				}
				//else if (action == "Facility Follow Up") {
				else if (CommCare.Constants.Compare.ActionIntersection.FacilityFollowUp(action)) {
					CommCare.Shared.SetVisible("hrc_facilityid", true);
					var fieldList = ["vhacrm_appointmentdatetime_date", "hrc_facilityid"];
					setRequiredOnMultipleFields(fieldList, "required");
					setVisibleOnMultipleFields(fieldList, true);
				}
				else {
					CommCare.Shared.SetVisible("hrc_facilityid", true);
					CommCare.Shared.SetRequired("hrc_facilityid", "none");
				}
			}
			//else if (purpose !== "Non-Core" && purpose !== CommCare.Shared.Constants.CCWF_LOB_NAME && programType !== "Help Desk" && purposeDetail !== "Claim Status Report") { // fixed from testing string to GUID CRMCC-7217
			// NOTE: Purpose (area intersection) does not have an entry for CommCare.Shared.Constants.CCWF_LOB_NAME ("Customer Experience")
			else if (!CommCare.Constants.Compare.PurposeIntersection.NonCore(purpose) &&
				!CommCare.Constants.Compare.PurposeIntersection.LineOfBusiness(purpose) && 
				programType !== "Help Desk" && purposeDetail !== "Claim Status Report") { 
				CommCare.Shared.SetRequired("vhacrm_visnid", "none");
				CommCare.Shared.SetRequired("hrc_facilityid", "required");
				CommCare.Shared.SetVisible("vhacrm_visnid", true);
				CommCare.Shared.SetVisible("hrc_facilityid", true);
				CommCare.Shared.SetVisible("ccwf_homefacility", true);
				CommCare.Shared.SetRequired("ccwf_homefacility", "required");
			}
			//else if (action === "Claim Status Report" || purposeDetail === "Claim Status Report") { // fixed from testing string to GUID CRMCC-7217
			else if (CommCare.Constants.Compare.ActionIntersection.ClaimStatusReport(action) || purposeDetail === "Claim Status Report") { 
				CommCare.Shared.SetRequired("vhacrm_visnid", "required");
				CommCare.Shared.SetRequired("hrc_facilityid", "none");
				CommCare.Shared.SetRequired("ccwf_homefacility", "none");
				CommCare.Shared.SetVisible("vhacrm_visnid", true);
				CommCare.Shared.SetVisible("hrc_facilityid", false);
				CommCare.Shared.SetVisible("ccwf_homefacility", false);

			}
			else if (programType !== "Help Desk") { // fix? from testing string to GUID
				CommCare.Shared.SetRequired("hrc_facilityid", "none"); // <--- TODO : is this correct?? this field becomes not required whether its help desk or not
				CommCare.Shared.SetVisible("vhacrm_visnid", true);
			}
			else if (programType === "Help Desk") { // fix? from testing string to GUID
				CommCare.Shared.SetRequired("vhacrm_visnid", "none");
				CommCare.Shared.SetRequired("hrc_facilityid", "none");
				CommCare.Shared.SetVisible("vhacrm_visnid", false);
				CommCare.Shared.SetVisible("hrc_facilityid", false);
			}
		}
	}

	function openTask() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		//var requestId = parent.Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");
		var requestId = CommCare.Shared.FormContext.data.entity.getId().replace(/[{}]/g, "");

		var columns = "activityid,hac_type_code,subject";
		var filter = "$filter=_regardingobjectid_value eq " + requestId;

		CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("tasks", columns, filter).then(function (task) {

			var taskId;
			var columns = "activityid,hac_type_code,subject";
			var filter = "$filter=_regardingobjectid_value eq " + requestId;

			taskId = task.value[0].activityid;
			var taskformid = "16654191-19AD-48CA-9E46-C4B4FBDAD76F";

			var windowToOpen = "http://event/?eventName=OpenTask&taskid=" + taskId + "&taskformid=" + taskformid + "&setfocus=true";

			if (parent.window.IsUSD) {
				window.open(windowToOpen);
			}
		}).catch(function (error) {
			console.log("Error retrieving Associated Task:");
			console.log(error)
		});
	}

	async function handleHiddenFields() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		// NOTE: "Mission Act" and "Discharge Planning" are in both valid and invalid lists. Since both lists are referenced once and because invalid is behind valid, removed from valid list.
		//			"Emergent Care Notification" is in the valid list twice, removed repeated entry
		//var validPurposeValuesForResolution = ["Mission Act", "Authorizations/Referrals", "Eligibility & Benefits", "DME", "Emergent Care Notification", "Emergent Care Notification", "Dental", "Traveling Veteran", "Discharge Planning"];// fixed CRMCC-7217
		// moved to be below the if (purposeValue !== null) { line
		//var invalidPurposeValuesForAction = ["Mission Act", "Non-Core", "Discharge Planning", "ACR"];// moved to be below the if (purposeValue !== null) { line
		// moved to be below the if (purposeValue !== null) { line
		//var validActionsForRoutingReason = ["Authorizations/Referrals Investigation", "Authorization Request"]; // fixed action CCCRM7217
		var validSubPurposesForResolution = ["Medical Documents", "Medication Management"];
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue);
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		//var actionNameFormatted = ""; // fixed action CCCRM7217
		var resolution = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);
		var hasPurpose = false;
		var hasPurposeDetail = false;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");//vhacrm_typeintersectionid
		var programTypeName = getLookupName(programType);
		var validForAction = true;
		var validForRoutingReason = false;
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();

		if (purposeValue !== null) {
			var validPurposeValuesForResolution = purposeID != null && (CommCare.Constants.Compare.PurposeIntersection.AuthorizationsReferrals(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.EligibilityAndBenefits(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.Dental(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.DME(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.TravelingVeteran(purposeID));

			//if (validPurposeValuesForResolution.indexOf(purposeName) >= 0) {// fixed from testing string to GUID CRMCC-7217
			if (validPurposeValuesForResolution) {
				hasPurpose = true;
			}

			var invalidPurposeValuesForAction = purposeID != null && (CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.DischargePlanning(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.MissionAct(purposeID) ||
				CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID));

			//Need to add our logic for PATS-R Here
			//if (invalidPurposeValuesForAction.indexOf(purposeName) >= 0) {// fixed from testing string to GUID CRMCC-7217
			if (invalidPurposeValuesForAction) {
				validForAction = false;
			}

			//if (purposeName === "Non-Core") { // fixed from testing string to GUID CRMCC-7217
			if (CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) {
				CommCare.Shared.SetVisible("vhacrm_noncorereason_code", true);
				CommCare.Shared.SetRequired("vhacrm_noncorereason_code", "required");
			}
			else {
				CommCare.Shared.SetVisible("vhacrm_noncorereason_code", false);
				CommCare.Shared.SetRequired("vhacrm_noncorereason_code", "none");
			}
		}

		if (action !== null) { // fixed action CCCRM7217
			//actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
			//actionNameFormatted = actionName != null ? actionName.trim().toLowerCase() : ""; // fixed action CCCRM7217
			//if (validActionsForRoutingReason.indexOf(actionName) >= 0) {
			//	validForRoutingReason = true;
			//}
			// to replicate var validActionsForRoutingReason = ["Authorizations/Referrals Investigation", "Authorization Request"];
			if (actionID != null && (CommCare.Constants.Compare.ActionIntersection.AuthorizationsReferralsInvestigation(actionID) ||
				CommCare.Constants.Compare.ActionIntersection.AuthorizationRequest(actionID))) {
				validForRoutingReason = true;
			}
		}

		hasPurposeDetail = validSubPurposesForResolution.indexOf(purposeDetailName) >= 0 ? true : false;

		if (!action && (hasPurpose == true || hasPurposeDetail == true) && lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) { // fix? from testing string to GUID 
			CommCare.Shared.SetVisible("ccwf_resolutionrequest", true);
		}
		else {
			CommCare.Shared.SetVisible("ccwf_resolutionrequest", false);
		}
		var vSignalId = CommCare.Shared.GetFieldValue("mcs_vsignalssurveytype");

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// called three time in the function
		//if (!purpose) { purpose = 0; }
		//if (!purposeID) { purposeID = 0; }
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		if (!purposeDetail) { purposeDetail = 0; }


		//showHide queue resolution

		// CRMCC-7140
		//var purposeInfo = await Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", CommCare.Shared.GetCleanId(purpose), "?$select=mcs_sendtopatsr,vhacrm_name,vhacrm_typeintersectionid,vhacrm_areaid");
		var purposeInfo = purposeID != null ? await Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purposeID, "?$select=mcs_sendtopatsr,vhacrm_name,vhacrm_typeintersectionid,vhacrm_areaid") : null;
		// CRMCC-7140
		//var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();
		// CRMCC-7140
		//var teamMemberships = await Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + userId + " and  teamid eq " + CommCare.Constants.GUIDS.ServiceRecoveryApprovalTeam); CRMCC-7179

		/* CRMCC-7140
		var purposePromise = new Promise(function (resolve, reject) {
			if (purpose != null) {
				return Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr,vhacrm_name,vhacrm_typeintersectionid,vhacrm_areaid").then(function (result) {
					resolve(result);
				});
			} else {
				resolve("no purpose");
			}
		});

		var purposeDetailPromise = new Promise(function (resolve, reject) {
			if (purposeDetail != null) {
				resolve(purposeDetail[0]);
			} else {
				resolve("no purpose detail");
			}
		});

		var teamPromise = new Promise(function (resolve, reject) {
			var globalContext = Xrm.Utility.getGlobalContext();
			return Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + globalContext.userSettings.userId.replace("{", "").replace("}", "").toLowerCase() + " and  teamid eq " + CommCare.Constants.GUIDS.ServiceRecoveryApprovalTeam).then(
				function success(results) {
					resolve(results.entities);
				},
				function (error) {
					Xrm.Navigation.openAlertDialog({ text: error.message });
					reject();
				}
			);
		});

		Promise.all([purposePromise, teamPromise, purposeDetailPromise]).then(function (returnedPromises) {

			console.log(returnedPromises); CRMCC-7140 */

		var showResolutionRequest = true;
		var lockResolutionRequest = true;
		//var isServiceRecoveryApprovalTeam = false; CRMCC - 7179
		var isServiceRecoveryApprovalTeam = await CommCare.Shared.IsOnTeam(CommCare.Constants.GUIDS.Teams.ServiceRecoveryApproval);
		//console.log(teamMemberships.entities);
		//isServiceRecoveryApprovalTeam = teamMemberships.entities == null ? false : teamMemberships.entities.length > 0; CRMCC - 7179
		/* CRMCC-7140
		for (var i = 0; i < returnedPromises[1].length; i++) { 
			console.log("isServiceRecoveryApprovalTeam");
			isServiceRecoveryApprovalTeam = true;
		}*/

		//if type == c3 && patsrid != null, hide 
		var program = CommCare.Shared.GetFieldValue("ccwf_programid");
		if (program != null) {
			//if (CommCare.Shared.GetFieldValue("mcs_patsrid") != null && CommCare.Shared.GetCleanId(program) == CommCare.Request.Constants.PROGRAM_TYPE_C3) {
			if (CommCare.Shared.GetFieldValue("mcs_patsrid") != null && CommCare.Shared.GetCleanId(program) == CommCare.Constants.GUIDS.Programs.VISN_VAMC) {

				showResolutionRequest = false;
			}
		}
		console.log(purposeDetail[0]);
		//if (returnedPromises[2] != null && program != null) { CRMCC-7140
		if (purposeDetail[0] != null && program != null) {
			//if (program[0]["name"] == "Non-VA" && actionNameFormatted.includes("service recovery approval") && purposeDetail[0]["name"] == "V-Signals") { // fixed from testing string to GUID // fixed action CCCRM7217
			if (program[0]["name"] == "Non-VA" && CommCare.Constants.Compare.ActionIntersection.ServiceRecoveryApproval(actionID) && purposeDetail[0]["name"] == "V-Signals") { 

				showResolutionRequest = true;
				lockResolutionRequest = false;
			}
		}
		//let purposeNameFormatted = returnedPromises[0]["vhacrm_name"] != null ? purposeInfo["vhacrm_name"].trim().toLowerCase() : ""; CRMCC-7140 
		//let purposeNameFormatted = purposeInfo["vhacrm_name"] != null ? purposeInfo["vhacrm_name"].trim().toLowerCase() : ""; 
		//if (isServiceRecoveryApprovalTeam && purposeNameFormatted.includes("service recovery")) {
		if (!!purposeInfo && isServiceRecoveryApprovalTeam && !!purposeInfo["vhacrm_areaid"] && purposeInfo["vhacrm_areaid"].trim().toLowerCase() == CommCare.Constants.GUIDS.Purpose.ServiceRecovery) {
			lockResolutionRequest = false;
		}
		//else if (!isServiceRecoveryApprovalTeam && purposeNameFormatted.includes("service recovery")) {
		else if (!!purposeInfo && !!purposeInfo && !isServiceRecoveryApprovalTeam && !!purposeInfo["vhacrm_areaid"] && purposeInfo["vhacrm_areaid"].trim().toLowerCase() == CommCare.Constants.GUIDS.Purpose.ServiceRecovery) {

			lockResolutionRequest = true;
		}

		//if (returnedPromises[0]["mcs_sendtopatsr"] == true || (CommCare.Shared.GetFieldValue("mcs_patsrid") != null && returnedPromises[2]["id"] == "62fc507f-55e2-ea11-a813-001dd8018866")) { CRMCC-7140
		if (!!purposeInfo && purposeInfo["mcs_sendtopatsr"] == true || (CommCare.Shared.GetFieldValue("mcs_patsrid") != null && purposeDetail[0]["id"].toLowerCase() == CommCare.Constants.GUIDS.SubPurpose.NonVAVSignals.toLowerCase())) {

			showResolutionRequest = false;
		}
		if (purposeDetailName != null) {
			if (purposeDetailName.indexOf("VA Hotline") > -1 || purposeDetailName.indexOf("PATS-R") > -1 || purposeDetailName.indexOf("AVA") > -1) { // fix? from testing string to GUID
				showResolutionRequest = false;
			}
		}


		if (hasRequestActionChanged) {
			lockResolutionRequest = true;
		}

		//if (!isServiceRecoveryApprovalTeam) {
		//	showResolutionRequest = false;
		//         }

		if (CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid") != null) {
			showResolutionRequest = true;
		}
		if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Constants.Integers.StatusCode.RejectedByPats) {

			showResolutionRequest = true;
			lockResolutionRequest = false;
		}

		if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid")).replace(/\s/g, "") == "DOHub" && CommCare.Shared.GetFieldValue("mcs_patsrid") != null) { // fix? from testing string to GUID
			lockResolutionRequest = true;
		}
		console.log(showResolutionRequest);
		CommCare.Shared.SetVisible("vhacrm_resolutionintersectionid", showResolutionRequest);
		hideShowQueueResolution();
		CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", lockResolutionRequest);

		//if (CommCare.Shared.GetFieldValue("mcs_patsrid") == null && !purposeNameFormatted.includes("service recovery")) {  CRMCC-7140 CRMCC-7140@
		if (CommCare.Shared.GetFieldValue("mcs_patsrid") == null && purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID)) {

			brAssignedToQueueResolution();
		}
		//}); CRMCC-7140

		if (lobName == CommCare.Shared.Constants.OCCFM_LOB_NAME && validForAction == true) {
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
		}
		//else if (purposeName == "ACR" && CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) { // fixed from testing string to GUID CRMCC-7140
		else if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID) && CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) {
			var requestActionVisibility = true;
			if (CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code") == CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
				requestActionVisibility = false;
			}
			CommCare.Shared.FormContext.ui.controls.forEach(function (control, i) {
				var controlName = control["_controlName"];
				if (controlName.includes("vhacrm_actionintersectionid")) {
					CommCare.Shared.SetVisible(controlName, requestActionVisibility);
				}
			});

		}
		else if (!resolution && lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && validForAction == true && purposeDetailName != "Mill Bill Ruling") { // fix? from testing string to GUID
			var type = CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid");
			//var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); called three time in the function

			//if (purpose != null) {
			if (purposeID != null && purposeID != 0) {
				Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purposeID, "?$select=mcs_sendtopatsr").then(
					function success(result) {
						var mcs_sendtopatsr = result["mcs_sendtopatsr"];

						if (mcs_sendtopatsr == true && CommCare.Shared.GetCleanId(type) == CommCare.Shared.Constants.TYPE_INTERSECTION_C3) {
							CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
						} else {
							CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
						}
					},
					function (error) {
						console.log(error.message);
					}
				);
			}
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
		}

		if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) { // fix? from testing string to GUID
			CommCare.Shared.SetVisible("vhacrm_routingreason_code", validForRoutingReason);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_routingreason_code", false);
		}

		if (CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) {
			if (purposeDetailName != null) {
				//if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && purposeDetailName.indexOf("Quality Issue") > -1 && actionName == "Optum PQI") { // fixed action CCCRM7217
				if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && purposeDetailName.indexOf("Quality Issue") > -1 && actionID != null &&  CommCare.Constants.Compare.ActionIntersection.OptumPQI(actionID)) {
					//CommCare.Shared.FormContext.ui.tabs.get("tab_13").setVisible(true);

					var requiredPQIFields = ["mcs_firstname", "mcs_lastname", "mcs_dob", "mcs_ssn", "mcs_address1line1", "mcs_address1city",
						"mcs_address1state", "mcs_address1postalcode", "mcs_providername", "mcs_address2line1", "mcs_address2city",
						"mcs_address2state", "mcs_address2postalcode", "mcs_admitservicedatefromdate", "mcs_dischargetodate", "mcs_readmit",
						"mcs_discharge", "mcs_approximatedateofpqioccurrence", "mcs_datepqiidentified", "mcs_qualityofcarepatientsafety",
						"mcs_qualityofservice", "mcs_unknown", "mcs_descriptionofevents", "mcs_completedbynametitle", "mcs_completedbynameofdepartment"];

					setRequiredOnMultipleFields(requiredPQIFields, "required");

					//Copy Provider Info to Place of Service
					var providerFields = ["mcs_providername", "mcs_providernpinumber", "mcs_providerspecialty", "mcs_address2line1", "mcs_address2line2",
						"mcs_address2city", "mcs_address2state", "mcs_address2postalcode"];

					setOnChangeForMultipleFields(providerFields, copyPQIProviderToPlaceOfService);
				}
				//else if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && actionName != "Optum PQI" && (currentForm != null) && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR)) { // fixed from testing string to GUID  // fixed action CCCRM7217
				else if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME &&
					actionID != null && !CommCare.Constants.Compare.ActionIntersection.OptumPQI(actionID) &&
					(currentForm != null) && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR)) {

					var requiredPQIFields = ["mcs_firstname", "mcs_lastname", "mcs_dob", "mcs_ssn", "mcs_address1line1", "mcs_address1city",
						"mcs_address1state", "mcs_address1postalcode", "mcs_providername", "mcs_address2line1", "mcs_address2city",
						"mcs_address2state", "mcs_address2postalcode", "mcs_admitservicedatefromdate", "mcs_dischargetodate", "mcs_readmit",
						"mcs_discharge", "mcs_approximatedateofpqioccurrence", "mcs_datepqiidentified", "mcs_qualityofcarepatientsafety",
						"mcs_qualityofservice", "mcs_unknown", "mcs_descriptionofevents", "mcs_completedbynametitle", "mcs_completedbynameofdepartment"];

					setRequiredOnMultipleFields(requiredPQIFields, "none");
				}
			//} else if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && actionName != "Optum PQI" && (currentForm != null) && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR)) { // fixed from testing string to GUID // fixed action CCCRM7217
			} else if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME &&
				actionID != null && !CommCare.Constants.Compare.ActionIntersection.OptumPQI(actionID) &&
				(currentForm != null) && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR)) {
				CommCare.Shared.FormContext.ui.tabs.get("tab_13").setVisible(false);

				var requiredPQIFields = ["mcs_firstname", "mcs_lastname", "mcs_dob", "mcs_ssn", "mcs_address1line1", "mcs_address1city",
					"mcs_address1state", "mcs_address1postalcode", "mcs_providername", "mcs_address2line1", "mcs_address2city",
					"mcs_address2state", "mcs_address2postalcode", "mcs_admitservicedatefromdate", "mcs_dischargetodate", "mcs_readmit",
					"mcs_discharge", "mcs_approximatedateofpqioccurrence", "mcs_datepqiidentified", "mcs_qualityofcarepatientsafety",
					"mcs_qualityofservice", "mcs_unknown", "mcs_descriptionofevents", "mcs_completedbynametitle", "mcs_completedbynameofdepartment"];

				setRequiredOnMultipleFields(requiredPQIFields, "none");
			}

		}

		//Validate the need for Service Fac or Service VISN and require/hide/show accordingly
		//visnServiceFacHideShowRequire(purposeName, actionName, purposeDetailName, lobName, programTypeName); // fixed programTypeName from testing string to GUID CRMCC-7217
		visnServiceFacHideShowRequire(purposeID, actionID, purposeDetailName, lobName, programTypeName); 

		//DUPLICATE WITH MASTERPROVIDERTIN()
		//Require provider info if Interacted With = Provider and Purpose = Emergent Care
		//requireProviderFac(purposeName, interactedWith);

		//Auto claim status report on action if purpose detail is claim status report
		setClaimsReportAction(purposeDetailName);

		//Check and see if type of care should be showing
		showHideImageLocatorTypeOfCare();

	}

	function getLookupName(lookup) {
		var lookupName = lookup != null ? CommCare.Shared.DialogNameReturn(lookup[0].name) : null;
		return lookupName;
	}

	function brRequireNotRequire72Hour() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var typeOfCare = CommCare.Shared.GetFieldValue("mcs_whatwasthetypeofcare");
		if (typeOfCare === CommCare.Constants.Integers.TypeOfCare.Emergent) {
			CommCare.Shared.SetVisible("mcs_wastherea72hournotification", true);
			CommCare.Shared.SetRequired("mcs_wastherea72hournotification", "required");
		}
		else {
			CommCare.Shared.SetVisible("mcs_wastherea72hournotification", false);
			CommCare.Shared.SetRequired("mcs_wastherea72hournotification", "none");
		}
	}

	/// SetActionIntersectionToGUID below does the same thing using a GUID Fixed actionCRMCC-7217
	function SetActionIntersectionToValue(name) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		return Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_actionintersection", "?$select=vhacrm_name&$filter=vhacrm_name eq '" + name + "'").then(
			function success(results) {
				if (results.entities.length === 0) {
					var msg = "Action Intersection with name " + name + " not found.";
					Xrm.Navigation.openAlertDialog({ text: msg });
					return null;
				}

				var lookup = [{
					name: results.entities[0]["vhacrm_name"],
					entityType: "vhacrm_actionintersection",
					id: results.entities[0]["vhacrm_actionintersectionid"]
				}];

				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", lookup);
				console.log("SetActionIntersectionToValue fire on change");
				CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
				return true;
			},
			function (error) {
				Xrm.Navigation.openAlertDialog({ text: error.message });
			}
		);
	}
	/// Replacement for SetActionIntersectionToValue that uses GUID instead of name Fixed actionCRMCC-7217
	function SetActionIntersectionToGUID(guid) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		return Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_actionintersection", "?$select=vhacrm_name&$filter=vhacrm_actionintersectionid eq '" + guid + "'").then(
			function success(results) {
				if (results.entities.length === 0) {
					var msg = "Action Intersection with GUID " + guid + " not found.";
					Xrm.Navigation.openAlertDialog({ text: msg });
					return null;
				}

				var lookup = [{
					name: results.entities[0]["vhacrm_name"],
					entityType: "vhacrm_actionintersection",
					id: results.entities[0]["vhacrm_actionintersectionid"]
				}];

				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", lookup);
				console.log("SetActionIntersectionToGUID fire on change");
				CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
				return true;
			},
			function (error) {
				Xrm.Navigation.openAlertDialog({ text: error.message });
			}
		);
	}

	function brOBResolutionsPresetAction() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

		if (ob2Resolution === CommCare.Constants.Integers.OBResolution.NoContact) {
			// set Request Action to Not Contacted  --- REMOVED CRMCC-3762 PV
			//SetActionIntersectionToValue("Not Contacted").then(
			//	function success(retVal) {
			//		if (retVal === true) {
			//			ctlTabsHideShow();
			//		}
			//	});
			setActionFromCommunityCareProgram(false, false);
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
		}
		else if (ob2Resolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
			// set Request Action to Closing the Loop
			//SetActionIntersectionToValue("Closing the Loop - TPA Resolution").then( // fixed - changed to using GUID CRMCC-7217
			SetActionIntersectionToGUID(CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR).then(
				function success(retVal) {
					if (retVal === true) {
						ctlTabsHideShow();
					}
				});;
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
		}
		else if (ob2Resolution !== null
			&& ob2Resolution !== CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting
			&& ob2Resolution !== CommCare.Constants.Integers.OBResolution.ProviderAgrees
			&& ob2Resolution !== CommCare.Constants.Integers.OBResolution.ProviderDisagrees
		) {
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
			CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
		}
		else if (ob2Resolution == CommCare.Constants.Integers.OBResolution.ProviderAgrees || ob2Resolution == CommCare.Constants.Integers.OBResolution.ProviderDisagrees) {
			setActionFromCommunityCareProgram(false, "ob2");
		}
		else if (ob1Resolution === CommCare.Constants.Integers.OBResolution.NoContact) {
			// set Request Action to ACR CSC Immediate
			//SetActionIntersectionToValue("ACR CSC Immediate").then( // fixed - canged to use GUID CRMCC-7217
			SetActionIntersectionToGUID(CommCare.Constants.GUIDS.ActionIntersection.ACRCSCImmedateACR).then(
				function success(retVal) {
					if (retVal === true) {
						ctlTabsHideShow();
					}
				});
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
		}
		else if (ob1Resolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
			// hide the Request Action field.
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
			CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
			console.log("brOBResolutionsPresetAction fire on change");
			CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
			ctlTabsHideShow();
		}
		else if (ob1Resolution !== null && ob1Resolution !== CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
		}
	}

	function brLockCTLResolutions() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var ctlOb1Res = {
			attr: CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob1resolution_code"),
			control: CommCare.Shared.FormContext.getControl("vhacrm_cl_ob1resolution_code"),
			value: CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code"),
			setDisabled: function () {
				var retVal = ctlOb1Res.value == null ? false
					: !validateCTLOBDate("OB1") ? false
						: true;

				ctlOb1Res.control.setDisabled(retVal);
			}
		}
		var ctlOb2Res = {
			attr: CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob2resolution_code"),
			control: CommCare.Shared.FormContext.getControl("vhacrm_cl_ob2resolution_code"),
			value: CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code"),
			setDisabled: function () {
				var retVal = !validateCTLOBDate("OB2") ? false
					: ctlOb2Res.value == null ? false
						: true;

				ctlOb2Res.control.setDisabled(retVal);
			}
		}
		var ctlOb3Res = {
			attr: CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob3resolution_code"),
			control: CommCare.Shared.FormContext.getControl("vhacrm_cl_ob3resolution_code"),
			value: CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code"),
			setDisabled: function () {
				var retVal = ctlOb3Res.value == null ? false
					: !validateCTLOBDate("OB3") ? false
						: true;

				ctlOb3Res.control.setDisabled(retVal);
			}
		}
		var ctlOb1Date = {
			attr: CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob1date_date"),
			control: CommCare.Shared.FormContext.getControl("vhacrm_cl_ob1date_date"),
			value: CommCare.Shared.GetFieldValue("vhacrm_cl_ob1date_date"),
			setDisabled: function () {
				var retVal = ctlOb1Date.value == null ? false
					: !validateCTLOBDate("OB1") ? false
						: true;

				ctlOb1Date.control.setDisabled(retVal);
			}
		}
		var ctlOb2Date = {
			attr: CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob2date_date"),
			control: CommCare.Shared.FormContext.getControl("vhacrm_cl_ob2date_date"),
			value: CommCare.Shared.GetFieldValue("vhacrm_cl_ob2date_date"),
			setDisabled: function () {

				var retVal = !validateCTLOBDate("OB2") ? false
					: ctlOb2Date.value == null ? false
						: true;

				ctlOb2Date.control.setDisabled(retVal);
			}
		}
		var ctlOb3Date = {
			attr: CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob3date_date"),
			control: CommCare.Shared.FormContext.getControl("vhacrm_cl_ob3date_date"),
			value: CommCare.Shared.GetFieldValue("vhacrm_cl_ob3date_date"),
			setDisabled: function () {
				var retVal = ctlOb3Date.value == null ? false
					: !validateCTLOBDate("OB3") ? false
						: true;

				ctlOb3Date.control.setDisabled(retVal);
			}
		}

		ctlOb1Res.setDisabled();
		ctlOb2Res.setDisabled();
		ctlOb3Res.setDisabled();
		ctlOb1Date.setDisabled();
		ctlOb2Date.setDisabled();
		ctlOb3Date.setDisabled();

	}

	function brSetACRFieldsRequired() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var fields = ["mcs_whatwasthetypeofcare", "mcs_wereyoutravelingoutsideyourlocalarea", "mcs_isthereaclaimonfile", "mcs_categoryofcare", "mcs_isthisincollectionsorthreatofentering"];
		setRequiredOnMultipleFields(fields, "required");
	}

	function invokeBusinessRules() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		////jw 20180810 BR to JS conversion begin
		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		//execute one of the InteractedWith functions first
		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR)) {
			brACRInteractedWith();
		}
		else if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF)) {
			brCCRInteractedWith();
		}
		else {
			brInteractedWith();
		}
		//ACR scope
		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR)) {
			categoryOfCare();
			brACRSetTitleFieldFromId();
			brACRAssignToBIMs();
			brACRReferredToVAMCNoAndDidYouOrNonVAProviderNotifyVAMCYes();
			brACRClosingTheLoopRequireOB2Date();
			brACRClosingTheLoopRequireOB1ResolutionAndOB1Date();
			brACRLockFieldsIfOB1IsNoContactAndNoOB2();
			brACRClosingTheLoopRequireOB3Date();
			brACRAccountHoldRequestOB2ResolutionAndDate();
			brACRAuthorizationNumber();
			brACRSetLineOfBusiness();
			brACRPreviousAttemptsToResolve();
			brACRRequireReferredByVAMCAndAHROB1ResolutionAndDate();
			brACRReferredToVAMCNo();
			brACRReferredToVAMCYes();
			brACRClosingTheLoopOB2ResolutionAndDate();
			//brACRChoiceOperationsCompleted();
			brACRClosingTheLoopOB3ResolutionAndDate();
			brACRHealthNetTriwest();
			brACRShowAccountHoldRequest();
			brACRShowClosingTheLoopOBFields();
			brRequireNotRequire72Hour();
			brCollectionsOrThreat();
			//brSetCLFinalStatusSolved();
			brLockCTLResolutions();
			brLockOpsResolutions();
			brSetACRFieldsRequired();
			requireAuthNumber();
			//requireProviderOrCollections();
			removeTriWestFromCCProgramList();
			requireReasonForClaimDenied();
			setActionFromCommunityCareProgram(true);
			//requireAHRNotes();
			showHideOpsOBSection();
			OpsOBFieldLogic("load");
			storeClaimonFile("load");
			CommCare.Shared.SetOnChange("mcs_whatwasthetypeofcare", requireAuthNumber);
			//CommCare.Shared.SetOnChange("ccwf_providerfacility_text", requireProviderOrCollections);
			//CommCare.Shared.SetOnChange("mcs_collectionscompany", requireProviderOrCollections);
			//CommCare.Shared.SetOnChange("mcs_isthisincollectionsorthreatofentering", requireProviderOrCollections);
			CommCare.Shared.SetOnChange("vhacrm_choiceops_claimresolution_code", requireReasonForClaimDenied);
			CommCare.Shared.SetOnChange("mcs_communitycareprogram", function () { setActionFromCommunityCareProgram(false, "ccp") });
			//CommCare.Shared.SetOnChange("vhacrm_ahr_ob2resolution_code", function () { setActionFromCommunityCareProgram(false, "ob2") });
			CommCare.Shared.SetOnChange("mcs_isthereaclaimonfile", storeClaimonFile);
			CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", requireAHRNotes);
			CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", showHideOpsOBSection);
			setOnChangeForMultipleFields(["mcs_pomob1resolution", "mcs_pomob2resolution", "mcs_pomob3resolution"], function () { OpsOBFieldLogic("onchange") });
			setOnChangeForMultipleFields(["mcs_pomob1resolution", "mcs_pomob2resolution", "mcs_pomob3resolution"], brSetOpsFinalStatusSolved);
			var opsTab = CommCare.Shared.FormContext.ui.tabs.get("tabChoiceOperationsGroup");
			if (!!opsTab) opsTab.addTabStateChange(function () { OpsOBFieldLogic("tabstatechange") });
			//var generalTab = CommCare.Shared.FormContext.ui.tabs.get("General");
			//if (!!generalTab) generalTab.addTabStateChange(requireAHRNotes);

			CommCare.Shared.SetOnChange("mcs_pomob1resolution", function () { setDateForOpsOBFields(1); });
			CommCare.Shared.SetOnChange("mcs_pomob2resolution", function () { setDateForOpsOBFields(2); });
			CommCare.Shared.SetOnChange("mcs_pomob3resolution", function () { setDateForOpsOBFields(3); });

			CommCare.Shared.SetOnChange("mcs_tpa_acr", setValuesForTPA);
		}
		//methods duplicated in CCR and All Forms scope - execute one set or the other but not both
		//these are in order of execution found in PreProd, according to XRM ToolBox component Patrick used
		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF)) {
			//MethodOfDelivery();
			//brCCRMethodOfDeliveryClaimStatusReportPFRARR6();
			//brCCRMethodOfDeliverySendCorrespondenceR6();
			//brCCRBeginningEndingDatesMethodOfDeliveryR6();
			brCCRRecipientNotProvider();
			brCCRShowHideRecipient();
			brCCRShowHideRoutingReason();
			brCCRShowHideOtherReason();
			lockActionVISNVAMCBillingConcern();
			CommCare.Shared.SetOnChange("mcs_issuewasresolved", lockActionVISNVAMCBillingConcern);
			CommCare.Shared.SetOnChange("vhacrm_areaintersectionid", lockActionVISNVAMCBillingConcern);
		}
		else if ((currentForm == null) || (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR)) {
			brRecipientNotProvider();
			brShowHideRecipient();
			brShowHideRoutingReason();
			brShowHideOtherReason();
			//MethodOfDelivery();
			//brMethodOfDeliverySendCorrespondenceR6();
			//brBeginningEndingDatesMethodOfDeliveryR6();
			//brMethodOfDeliveryClaimStatusReportPFRARR6();
		}
		//remaining CCR scoped functions next
		//these are in order of execution found in PreProd, according to XRM ToolBox component Patrick used
		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF)) {
			brInteractionSource();
			brLockProgramForHelpDesk();
			brRequestVISNVisibility();
			brShowHideOtherReasonResolution();
			brRecipientR6();
			brNonCoreHealthNetTriwestDetail();
			//brAssignedToQueueResolution();
			//brNonCoreReason();
			brNonCoreVISNDetail();
			brDefaultSubAreaForClaimStatusArea()
			brLockAreaSubAreaActionForNANAVeteran();
			brLoadEditFields();
			brCCRCVHDProgramType();
			brShowHideAppointmentDateTime();
			//brAssignedToQueueResolution();
			MethodOfDelivery();
			//brSetTitleFieldFromID();
			//brMethodOfDeliveryClaimStatusReportPFRARR6();
			//brBeginningEndingDatesMethodOfDeliveryR6();
			hideShowCountryCode();
		}
		//run these ONLY on the QC
		if ((currentForm == null) || ((currentForm.getId() !== CommCare.Constants.GUIDS.Forms.ACR) && (currentForm.getId() !== CommCare.Constants.GUIDS.Forms.CCWF))) {
			brSetC4QuickCreate();
			brNonCoreReasonRequest();
		}
		//if (CommCare.Request.Constants.CurrentFormType === "quickcreate") {
		//	brNullifyACRBooleans();
		//}
		if (currentForm != null && currentForm.getId() == CommCare.Constants.GUIDS.Forms.OCCFM.toLowerCase()) {
			hideshowPreauthorizationRequests();
			hideShowFullSearch();
			RequireComplaintNotesOnRequest();

			CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", RequireComplaintNotesOnRequest);
		}

		//remaining All Forms scoped functions
		//these are in order of execution found in PreProd, according to XRM ToolBox component Patrick used
		brLockUnlockAssignToCSCSupervisors();
		brPDIFieldRequiredWhenActionIsUnprocessedPDI();
		brRequireProgramType();
		brShowDateAssignedToCSCSupervisors();
		brRecipient();
		//brNonCoreReasonInteraction();
		brFMShowMakeRequiredNonCoreReason();
		brShowHideTINVendorization();
		brClaimStatusReportSubArea();
        brHandleActionIsDTANewDayClaimsVFMPDTA();  //CRMCC-6025
		brSetBeneAndShowHideFieldsWhenActionIsCampLejeune();
		brLoadEditR6();
		brCVHDProgramType();
		brNonCoreVISNDetailInteraction();
		//brNonCoreReasonRequest();
		brCommunityCareDefaultSubAreaForClaimStatusArea();
		brShowHideMakeRequiredDisableIfLOBIsOCCFM();
		//brShowHideMillBillRulingNotes(); // removed for CRMCC-4112
		brRequireHomeFacility();
		brNonCoreHealthNetTriwestDetailRequest();
		brShowHideCorrespondenceType();
		brNonCoreHealthNetTriwestDetailInteraction();
		brNonCoreVISNDetailRequest();
		//brRequireFacility();
		brRelationshipToVeteran();
		MasterProviderTIN();
		//MasterProviderTIN(); //always run this after the TIN and ProviderFacility BRs
		//brTINProviderFacilityRequireOneOrTheOtherNoAction();
		//brTINProviderFacilityRequireOneOrTheOtherWithAction();
		//brProviderWithNoTINRequiredFieldsWithAction();
		//brProviderWithNoTINRequiredFieldsNoAction();
		//brProviderFacilityTINRequireOneOrTheOtherWithAction();
		//brProviderFacilityTINRequireOneOrTheOtherNoAction();
		MethodOfDelivery();
		//brSetStreetPOBoxForMODIsMail();
		//brSetCityForMODIsMail();
		//brSetStateForMODIsMail();
		//brSetZipForMODIsMail();
		//brMethodOfDeliveryClaimStatusReportPFRARR6();
		showHideFMPurposeDetail();
		setBOCPrefix();
		//showHideFacilityAcceptingRequests();
		// hideRequestActionOnNonCore();
		brShowHidePriorities();

		CommCare.Shared.SetOnChange("mcs_validityfromdate", validateValidityFromToDates); // CRMCC-5972
		CommCare.Shared.SetOnChange("mcs_validitytodate", validateValidityFromToDates); // CRMCC-5972
	}

	function requireAuthNumber() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var typeOfCare = CommCare.Shared.GetFieldValue("mcs_whatwasthetypeofcare");

		var setReq = typeOfCare == CommCare.Constants.Integers.WhatWasTheTypeOfCare.Scheduled;

		CommCare.Shared.SetRequired("mcs_authorizationnumber", setReq);
		CommCare.Shared.SetRequired("mcs_authorizationlocation", setReq);
		CommCare.Shared.SetRequired("mcs_validityfromdate", setReq); // CRMCC-5972
		CommCare.Shared.SetRequired("mcs_validitytodate", setReq); // CRMCC-5972
	}

	function brSetCLFinalStatusSolved() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var clOb1 = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
		var clOb2 = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
		var clOb3 = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");

		if ((clOb1 !== null && clOb1 === CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided)
			|| (clOb2 !== null && clOb2 === CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided)
			|| (clOb3 !== null)
		) {
			CommCare.Shared.SetFieldValue("vhacrm_cl_clfinalstatus_code", CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed);
			CommCare.Shared.FormContext.getAttribute("vhacrm_cl_clfinalstatus_code").fireOnChange();
		}
	}

	function brSetOpsFinalStatusSolved() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var clOb1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
		var clOb2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
		var clOb3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");

		if ((clOb1 !== null && clOb1 === CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided)
			|| (clOb2 !== null && clOb2 === CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided)
			|| (clOb3 !== null)
		) {
			CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed);
			CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
		}
	}

	function setBROnChangeEvents() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR)) {
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_ahr_ob1resolution_code"], brACRAccountHoldRequestOB2ResolutionAndDate);
			setOnChangeForMultipleFields(["vhacrm_queueid", "vhacrm_previousqueueid"], brACRAssignToBIMs);
			setOnChangeForMultipleFields(["vhacrm_authreceived_code", "vhacrm_areaintersectionid",
				"vhacrm_referredbyvamc_code"], brACRAuthorizationNumber);
			//setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_choiceops_status_code", "vhacrm_actionintersectionid", "mcs_operationsfinalstatus"], brACRChoiceOperationsCompleted);
			setOnChangeForMultipleFields(["vhacrm_cl_ob1resolution_code", "vhacrm_areaintersectionid"], brACRClosingTheLoopOB2ResolutionAndDate);
			setOnChangeForMultipleFields(["vhacrm_cl_ob2resolution_code", "vhacrm_areaintersectionid"], brACRClosingTheLoopOB3ResolutionAndDate);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_cl_ob2resolution_code"], brACRClosingTheLoopRequireOB2Date);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_cl_ob3resolution_code"], brACRClosingTheLoopRequireOB3Date);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_cl_clfinalstatus_code"], brACRClosingTheLoopRequireOB1ResolutionAndOB1Date);
			setOnChangeForMultipleFields(["vhacrm_queueid", "vhacrm_choiceops_status_code", "vhacrm_previousqueueid"], brACRHealthNetTriwest);
			setOnChangeForMultipleFields(["ccwf_issuerequestor_code"], brACRInteractedWith);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_ahr_ob1resolution_code",
				"vhacrm_ahr_ob2resolution_code"], brACRLockFieldsIfOB1IsNoContactAndNoOB2);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_referredbyvamc_code"], brACRPreviousAttemptsToResolve);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_referredbyvamc_code"], brACRReferredToVAMCNo);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_referredbyvamc_code"], brACRReferredToVAMCYes);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_referredbyvamc_code",
				"vhacrm_vamcnotification_code"], brACRReferredToVAMCNoAndDidYouOrNonVAProviderNotifyVAMCYes);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], brACRRequireReferredByVAMCAndAHROB1ResolutionAndDate);
			setOnChangeForMultipleFields(["ticketnumber"], brACRSetTitleFieldFromId);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], brACRShowAccountHoldRequest);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_cl_clfinalstatus_code"], brACRShowClosingTheLoopOBFields);
			setOnChangeForMultipleFields(["mcs_categoryofcare"], categoryOfCare);
			setOnChangeForMultipleFields(["mcs_whatwasthetypeofcare"], brRequireNotRequire72Hour);
			setOnChangeForMultipleFields(["mcs_isthisincollectionsorthreatofentering"], brCollectionsOrThreat);
			setOnChangeForMultipleFields(["vhacrm_cl_ob1resolution_code", "vhacrm_cl_ob2resolution_code", "vhacrm_cl_ob3resolution_code"], brSetCLFinalStatusSolved);
			setOnChangeForMultipleFields(["vhacrm_ahr_ob1resolution_code", "vhacrm_ahr_ob2resolution_code"], brOBResolutionsPresetAction);
			setOnChangeForMultipleFields(["vhacrm_ahr_ob1resolution_code", "vhacrm_ahr_ob2resolution_code"], setRouteActionPreFilter);
			//setOnChangeForMultipleFields(["vhacrm_ahr_ob2resolution_code", "vhacrm_actionintersectionid"], brRequireCommCareProgramForClosingTheLoop)

			//CommCare.Shared.FormContext.ui.tabs.get("tab_14").addTabStateChange(setRouteActionPreFilter);
			CommCare.Shared.FormContext.ui.tabs.get("General").addTabStateChange(setRouteActionPreFilter);
		}
		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF)) {
			setOnChangeForMultipleFields(["vhacrm_queueitemid"], brAssignedToQueueResolution);
			setOnChangeForMultipleFields(["ccwf_programid"], brCCRCVHDProgramType);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], brDefaultSubAreaForClaimStatusArea);
			setOnChangeForMultipleFields(["ccwf_issuerequestor_code", "ccwf_programid"], brCCRInteractedWith);
			setOnChangeForMultipleFields(["caseorigincode"], brInteractionSource);
			setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brLoadEditFields);
			setOnChangeForMultipleFields(["customerid", "ccwf_programid"], brLockAreaSubAreaActionForNANAVeteran);
			setOnChangeForMultipleFields(["ccwf_programid"], brLockProgramForHelpDesk);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_noncorereason_code"], brNonCoreHealthNetTriwestDetail);
			//setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], brNonCoreReason);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_noncorereason_code"], brNonCoreVISNDetail);
			setOnChangeForMultipleFields(["ccwf_issuerequestor_code", "vhacrm_actionintersectionid"], brRecipientR6);
			setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "vhacrm_recipient_code"], brCCRRecipientNotProvider);
			setOnChangeForMultipleFields(["vhacrm_subareaintersectionid", "ccwf_programid"], brRequestVISNVisibility);
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_actionintersectionid"], brShowHideAppointmentDateTime);
			setOnChangeForMultipleFields(["vhacrm_routingreason_code", "vhacrm_actionintersectionid"], brCCRShowHideOtherReason);
			setOnChangeForMultipleFields(["vhacrm_resolutionintersectionid"], brShowHideOtherReasonResolution);
			setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brCCRShowHideRecipient);
			setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brCCRShowHideRoutingReason);
			setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brCCRShowHideRoutingReason);

			//MOD
			setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "vhacrm_methodofdelivery_code", "vhacrm_areaintersectionid", "vhacrm_subareaintersectionid"], MethodOfDelivery);
			//setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "vhacrm_methodofdelivery_code", "vhacrm_areaintersectionid", "vhacrm_subareaintersectionid"], brCCRMethodOfDeliveryClaimStatusReportPFRARR6);
			//setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_actionintersectionid", "vhacrm_methodofdelivery_code"], brCCRMethodOfDeliverySendCorrespondenceR6);
			//setOnChangeForMultipleFields(["vhacrm_subareaintersectionid", "vhacrm_actionintersectionid", "vhacrm_areaintersectionid"], brCCRBeginningEndingDatesMethodOfDeliveryR6);
			//short codes 1me, l9F, GES
			setOnChangeForMultipleFields(["vhacrm_methodofdelivery_code", "vhacrm_recipient_code"], MODRecipientHideShow);
		}
		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.OCCFM)) {
			setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], hideshowPreauthorizationRequests);
		}

		setOnChangeForMultipleFields(["ccwf_issuerequestor_code", "vhacrm_subareaintersectionid"], brClaimStatusReportSubArea);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid",
			"accountHoldRequestNotes"], brCommunityCareDefaultSubAreaForClaimStatusArea);
		setOnChangeForMultipleFields(["ccwf_programid"], brCVHDProgramType);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], brFMShowMakeRequiredNonCoreReason);
		setOnChangeForMultipleFields(["ccwf_issuerequestor_code"], brInteractedWith);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_subareaintersectionid",
			"vhacrm_actionintersectionid"], brLoadEditR6);
		setOnChangeForMultipleFields(["vhacrm_queueitemid"], brLockUnlockAssignToCSCSupervisors);
		setOnChangeForMultipleFields(["ccwf_interactionpurpose", "vhacrm_noncorereason_code"], brNonCoreHealthNetTriwestDetailInteraction);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_noncorereason_code"], brNonCoreHealthNetTriwestDetailRequest);
		//setOnChangeForMultipleFields(["ccwf_interactionpurpose"], brNonCoreReasonInteraction);
		//setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], brNonCoreReasonRequest);
		setOnChangeForMultipleFields(["ccwf_interactionpurpose", "vhacrm_noncorereason_code"], brNonCoreVISNDetailInteraction);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_noncorereason_code"], brNonCoreVISNDetailRequest);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "ccwf_claimnumber_text", "hac_pdinumber_text"], brPDIFieldRequiredWhenActionIsUnprocessedPDI);
		setOnChangeForMultipleFields(["ccwf_issuerequestor_code", "vhacrm_actionintersectionid"], brRecipient);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "vhacrm_recipient_code"], brRecipientNotProvider);
		setOnChangeForMultipleFields(["vhacrm_relationshiptoveteran_code"], brRelationshipToVeteran);
		//setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_subareaintersectionid", "ccwf_programid"], brRequireFacility);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid", "vhacrm_subareaintersectionid", "ccwf_programid",
			"vhacrm_actionintersectionid"], brRequireHomeFacility);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "hac_pdinumber_text"], brHandleActionIsDTANewDayClaimsVFMPDTA);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brSetBeneAndShowHideFieldsWhenActionIsCampLejeune);
		setOnChangeForMultipleFields(["vhacrm_assigntocscsupervisors_bool"], brShowDateAssignedToCSCSupervisors);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "vhacrm_areaintersectionid"], brShowHideCorrespondenceType);
		//setOnChangeForMultipleFields(["vhacrm_subareaintersectionid"], brShowHideMillBillRulingNotes); // removed for CRMCC-4112
		setOnChangeForMultipleFields(["vhacrm_routingreason_code", "vhacrm_actionintersectionid"], brShowHideOtherReason);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brShowHideRecipient);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brShowHideRoutingReason);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], brShowHideTINVendorization);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], setPurposeDetailOnRequestActionChangeToClaimStatusReport);
		setOnChangeForMultipleFields(["vhacrm_areaintersectionid"], showHideFMPurposeDetail);
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "hrc_facilityid", "vhacrm_visnid"], setAcceptingRequestForVisnOrServicingFac);

		//FAC TIN REQ
		setOnChangeForMultipleFields(["mcs_isthisincollectionsorthreatofentering", "mcs_collectionscompany", "ccwf_issuerequestor_code", "ccwf_providerfacility_text", "ccwf_tin_text", "vhacrm_subareaintersectionid", "ccwf_firstrequestcreated", "vhacrm_areaintersectionid", "vhacrm_actionintersectionid", "ccwf_programid", "mcs_collectionsphonenumber", "vhacrm_provider_phoneno_text", "vhacrm_ahr_ob1resolution_code"], MasterProviderTIN);

		//MOD
		setOnChangeForMultipleFields(["vhacrm_actionintersectionid", "vhacrm_methodofdelivery_code", "vhacrm_areaintersectionid", "vhacrm_subareaintersectionid"], MethodOfDelivery);

		setOnChangeForMultipleFields(["vhacrm_actionintersectionid"], brShowHidePriorities);
	}

	function brShowHidePriorities() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lobVal = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lobVal);
		if (lobName != null) {
			if (lobName.toLowerCase() === "occ fm") { // fix? from testing string to GUID
				setVisibleOnMultipleFields(["prioritycode"], false);
				setRequiredOnMultipleFields(["prioritycode"], "none");

				var actionVal = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // Not used in string comparison, check for null only
				setVisibleOnMultipleFields(["mcs_fmpriority"], actionVal !== null);
			}
			else if (lobName.toLowerCase() === "customer experience") { // fix? from testing string to GUID
				setVisibleOnMultipleFields(["prioritycode"], false);
				setVisibleOnMultipleFields(["mcs_fmpriority"], true);
				setRequiredOnMultipleFields(["mcs_fmpriority"], "none");
			}
		}
	}

	function hideShowFullSearch() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed  CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(purpose);
		//var setVisible = purposeName == "Bill of Collections" ? true : false; CRMCC-7217
		var setVisible = CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID) ? true : false;

		CommCare.Shared.FormContext.ui.tabs.get("FullSearch").setVisible(setVisible);
	}

	function setOnChangeForMultipleFields(fieldList, functionName) {
		for (var i = 0; i < fieldList.length; i++) {
			CommCare.Shared.SetOnChange(fieldList[i], functionName);
		}
	}
	function setRequiredOnMultipleFields(fieldList, requiredLevel) {
		for (var i = 0; i < fieldList.length; i++) {
			CommCare.Shared.SetRequired(fieldList[i], requiredLevel);
		}
	}
	function setVisibleOnMultipleFields(fieldList, bool) {
		for (var i = 0; i < fieldList.length; i++) {
			CommCare.Shared.SetVisible(fieldList[i], bool);
		}
	}
	function setReadOnlyOnMultipleFields(fieldList, bool) {
		for (var i = 0; i < fieldList.length; i++) {
			CommCare.Shared.SetReadOnly(fieldList[i], bool);
		}
	}
	function showHideFMPurposeDetail() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(purpose);
		//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programID = CommCare.Shared.GetCleanId(programType);
		var programTypeName = getLookupName(programType);
		var status = CommCare.Shared.GetFieldValue("statecode");
		if (lobName == "OCC FM") { // fix? from testing string to GUID
			if (purpose != null) {
				Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_subareaintersection", "?$select=_vhacrm_areaintersectionid_value,vhacrm_name&$filter=_vhacrm_areaintersectionid_value eq " + purpose[0].id).then(
					function success(results) {
						if (results.entities.length > 0) {
							CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
						}
						else {
							//clear purpose detail and hide it
							CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", null);
							CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", false);
						}
					},
					function (error) {
						Xrm.Navigation.openAlertDialog({ text: error.message });
					}
				);
			}

			//show purpose detail when purpose = Preauthorization and set it to Inquiry if it isn't already set to something else
			//if (purposeName === "Preauthorization") {
			if (CommCare.Constants.Compare.PurposeIntersection.Preauthorization(purposeID)) {
				//CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "required");
				if (purposeDetail == null) {
					//var purposeID = purpose[0].id.replace("{", "").replace("}", "");
					var subPurposeFetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'> \
                                <entity name='vhacrm_subareaintersection'> \
                                <attribute name='vhacrm_subareaintersectionid' /> \
                                <filter type='and'> \
                                    <condition attribute='vhacrm_name' operator='eq' value='Inquiry' /> \
                                    <condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + purposeID + "' /> \
                                </filter> \
                                </entity> \
                            </fetch>";

					CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
					CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("vhacrm_subareaintersections", subPurposeFetch).then(function (subPurpose) {

						var retrievedSubPurpose = subPurpose.value;
						var subpurposeID = retrievedSubPurpose[0].vhacrm_subareaintersectionid;

						CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_subareaintersectionid", subpurposeID, "Inquiry", "vhacrm_subareaintersection");
					}).catch(function (error) {
						console.log("Error in setting purpose defaults: " + error.message);
					});
				}
			}
			//else if (purposeName == "Bill of Collections" && programTypeName == "CSC") { // fixed from testing string to GUID CRMCC-7217
			else if (CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID) && programTypeName == "CSC") {
				//CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "required");
				if (purposeDetail == null) {
					CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_subareaintersectionid", "D56255E9-AE45-E911-812D-1458D04E0CA0", "Provider", "vhacrm_subareaintersection");
				}
			}
			//else if (purposeName == "Mission Act") { // fixed from testing string to GUID CRMCC-7217
			else if (CommCare.Constants.Compare.PurposeIntersection.MissionAct(purposeID)) {
				//CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "required");
			}
			else {
				//CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", false);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "none");
				lockActionVISNVAMCBillingConcern();
			}
		}
		else {
			//if (purposeName == "Mission Act") { // fixed from testing string to GUID CRMCC-7217
			if (CommCare.Constants.Compare.PurposeIntersection.MissionAct(purposeID)) {
				CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "required");
			}
			//else if (status == 0 && (programID == CommCare.Request.Constants.PROGRAM_TYPE_CSC || programID == CommCare.Request.Constants.PROGRAM_TYPE_NONVA) && purposeNameFormatted.includes("service recovery")) { // fixed from testing string to GUID CRMCC-7217
			else if (status == 0 && (!!programID && (programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.CSC.toLowerCase() ||
				programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.NonVA.toLowerCase()) &&
				CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(programID))) {
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
			}
			else {
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "none");
				lockActionVISNVAMCBillingConcern();
			}
		}
	}

	function brACRAccountHoldRequestOB2ResolutionAndDate() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName;
		var ob1ResolutionAhr = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");

		//if (purposeValue !== null)
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);

		//if ((purposeName === "ACR") && (ob1ResolutionAhr === CommCare.Constants.Integers.OBResolution.NoContact)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			(ob1ResolutionAhr === CommCare.Constants.Integers.OBResolution.NoContact)) {
			CommCare.Shared.SetVisible("vhacrm_ahr_ob2resolution_code", true);
			CommCare.Shared.SetVisible("vhacrm_ahr_ob2date_date", true);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_ahr_ob2resolution_code", false);
			CommCare.Shared.SetVisible("vhacrm_ahr_ob2date_date", false);
			CommCare.Shared.SetRequired("vhacrm_ahr_ob2date_date", "none");
		}
	}
	function brACRAssignToBIMs() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var queue = CommCare.Shared.GetFieldValue("vhacrm_queueid");
		var queueName;
		var queueId = "none";
		var previousQueue = CommCare.Shared.GetFieldValue("vhacrm_previousqueueid");
		var previousQueueName;
		var previousQueueId = "none";

		if (queue != null) {
			queueName = CommCare.Shared.DialogNameReturn(queue[0].name);
			queueId = CommCare.Shared.GetCleanId(queue);
		}

		if (previousQueue != null) {
			previousQueueName = CommCare.Shared.DialogNameReturn(previousQueue[0].name);
			previousQueueId = CommCare.Shared.GetCleanId(previousQueue);
		}

		//if (queueName === "Operations") {
		if (queueId.toLowerCase() === CommCare.Constants.GUIDS.Queues.Operations) {
			CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", true);
			CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", false);
		}
		//else if ((queueName === "Closing the Loop") && (previousQueueName === "Operations")) {
		else if ((queueId.toLowerCase() === CommCare.Constants.GUIDS.Queues.ClosingTheLoop) && (previousQueueId.toLowerCase() === CommCare.Constants.GUIDS.Queues.Operations)) {
			CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", true);
			CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", false);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
		}
	}
	function brACRAuthorizationNumber() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var authReceived = CommCare.Shared.GetFieldValue("vhacrm_authreceived_code");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");//Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName;
		var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((authReceived === CommCare.Constants.Integers.AuthorizationReceived.Yes) && (purposeName === "ACR") && (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.Yes)) { // fixed from testing string to GUID CRMCC-7217
		if ((authReceived === CommCare.Constants.Integers.AuthorizationReceived.Yes) && (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			(referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.Yes)) { 
			CommCare.Shared.SetVisible("vhacrm_authno_text", true);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_authno_text", false);
		}
	}

	function brACRClosingTheLoopOB2ResolutionAndDate() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var ob1ResolutionCtl = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((ob1ResolutionCtl !== null) && (ob1ResolutionCtl != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) && (purposeName === "ACR")) { // fixed from testing string to GUID CRMCC-7217
		if ((ob1ResolutionCtl !== null) && (ob1ResolutionCtl != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) &&
			(purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID))) {
			CommCare.Shared.SetVisible("vhacrm_cl_ob2resolution_code", true);
			CommCare.Shared.SetVisible("vhacrm_cl_ob2date_date", true);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_cl_ob2resolution_code", false);
			CommCare.Shared.SetVisible("vhacrm_cl_ob2date_date", false);
			CommCare.Shared.SetVisible("vhacrm_cl_ob3resolution_code", false);
			CommCare.Shared.SetVisible("vhacrm_cl_ob3date_date", false);
		}
	}
	function brACRClosingTheLoopOB3ResolutionAndDate() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var ob2ResolutionCtl = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((ob2ResolutionCtl !== null) && (ob2ResolutionCtl != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) && (purposeName === "ACR")) { // fixed from testing string to GUID CRMCC-7217
		if ((ob2ResolutionCtl !== null) && (ob2ResolutionCtl != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) &&
			(purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID))) {
			CommCare.Shared.SetVisible("vhacrm_cl_ob3resolution_code", true);
			CommCare.Shared.SetVisible("vhacrm_cl_ob3date_date", true);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_cl_ob3resolution_code", false);
			CommCare.Shared.SetVisible("vhacrm_cl_ob3date_date", false);
		}
	}
	function brACRClosingTheLoopRequireOB2Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var ob1ResolutionCtl = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
		var ob2ResolutionCtl = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (ob1ResolutionCtl !== null) && (ob2ResolutionCtl !== null)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) && (ob1ResolutionCtl !== null) && (ob2ResolutionCtl !== null)) { 
			CommCare.Shared.SetRequired("vhacrm_cl_ob2date_date", "required");
		}
		else {
			CommCare.Shared.SetRequired("vhacrm_cl_ob2date_date", "none");
		}
	}
	function brACRClosingTheLoopRequireOB3Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var ob2ResolutionCtl = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
		var ob3ResolutionCtl = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (ob2ResolutionCtl !== null) && (ob3ResolutionCtl !== null)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) && (ob2ResolutionCtl !== null) && (ob3ResolutionCtl !== null)) { 
			CommCare.Shared.SetRequired("vhacrm_cl_ob3date_date", "required");
		}
		else {
			CommCare.Shared.SetRequired("vhacrm_cl_ob3date_date", "none");
		}
	}
	function brACRClosingTheLoopRequireOB1ResolutionAndOB1Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var closingTheLoopFinalStatus = CommCare.Shared.GetFieldValue("vhacrm_cl_clfinalstatus_code");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (closingTheLoopFinalStatus === CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			(closingTheLoopFinalStatus === CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed)) {
			CommCare.Shared.SetRequired("vhacrm_cl_ob1resolution_code", "required");
			CommCare.Shared.SetRequired("vhacrm_cl_ob1date_date", "required");
			CommCare.Shared.SetRequired("mcs_finalclaimresolution", "required");
		}
		else {
			CommCare.Shared.SetRequired("vhacrm_cl_ob1resolution_code", "none");
			CommCare.Shared.SetRequired("vhacrm_cl_ob1date_date", "none");
			CommCare.Shared.SetRequired("mcs_finalclaimresolution", "none");
		}
	}
	function brACRHealthNetTriwest() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var queue = CommCare.Shared.GetFieldValue("vhacrm_queueid");
		var queueName = getLookupName(queue);
		var queueId = CommCare.Shared.GetCleanId(queue);
		//var choiceOperationsStatus = CommCare.Shared.GetFieldValue("vhacrm_choiceops_status_code");
		var previousQueue = CommCare.Shared.GetFieldValue("vhacrm_previousqueueid");
		//var previousQueueName = getLookupName(previousQueue);
		var previousQueueId = CommCare.Shared.GetCleanId(previousQueue);
		//var actionName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); NOT used
		var actionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); //Already uses a GUID, any changes are from moving constants to mcs_Constants.js file

		//if ((queueName === "PR&S") && actionName == "Closing the Loop") { //(choiceOperationsStatus === CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop)) {
		if ((queueId == CommCare.Shared.Constants.QUEUE_PRS) && actionId == CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR) { //(choiceOperationsStatus === CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop)) {
			CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", true);
			CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "required");
			CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
		}
		//else if ((queueName === "PR&S") && actionName != "Closing the Loop") /*(choiceOperationsStatus !== CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
		else if ((queueId == CommCare.Shared.Constants.QUEUE_PRS) && actionId != CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR) /*(choiceOperationsStatus !== CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
			CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", true);
			CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "none");
			CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
		}
		//else if ((queueName === "Closing the Loop") && (previousQueueName === "PR&S") && actionName == "Closing the Loop") /*(choiceOperationsStatus === CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
		else if ((queueId === CommCare.Constants.GUIDS.Queues.ClosingTheLoop) && (previousQueueId === CommCare.Shared.Constants.QUEUE_PRS) && actionId == CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR) /*(choiceOperationsStatus === CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
			CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", true);
			CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "required");
			CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
		}
		else if ((queueId === CommCare.Constants.GUIDS.Queues.ClosingTheLoop) && (previousQueueId === CommCare.Shared.Constants.QUEUE_PRS) && actionId != CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR) /*(choiceOperationsStatus !== CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
			CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", true);
			//CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "none");
			CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", false);
			CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "none");
		}
	}
	function brACRInteractedWith() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		if (programTypeName == "PRRT") { // fix? from testing string to GUID
			MasterProviderTIN();
			return;
		}

		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var fieldList = ["ccwf_tin_text", "vhacrm_vsooffice_text", "vhacrm_othertitle_text", "ccwf_providerfacility_text", "vhacrm_otherrelationship_text",
			"vhacrm_relationshiptoveteran_code", "vhacrm_interaction_addressline1_text", "vhacrm_interaction_city_text", "vhacrm_interaction_stateid",
			"vhacrm_interaction_zip_text", "vhacrm_lastname_text", "vhacrm_provideraddressline1_text", "vhacrm_providercity_text",
			"vhacrm_providerstateid", "vhacrm_providerzip_text"];
		var arrayLength = fieldList.length;
		//could switch to making this section of CommCare.Request.Constants.ACRHideFieldsInteractedWith/show/setnotreq/setreq 2D arrays or name by string instead of pre-defined name fields and then not have to have a case statement, but just loop by index
		for (var i = 0; i < arrayLength; i++) {
			switch (fieldList[i]) {
				case "ccwf_tin_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_vsooffice_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_othertitle_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "ccwf_providerfacility_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_otherrelationship_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_relationshiptoveteran_code":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_interaction_addressline1_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_interaction_city_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_interaction_stateid":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_interaction_zip_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_lastname_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_provideraddressline1_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_providercity_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_providerstateid":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
				case "vhacrm_providerzip_text":
					if (CommCare.Request.Constants.ACRHideFieldsInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], false);
					if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetVisible(fieldList[i], true);
					if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "none");
					if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
						CommCare.Shared.SetRequired(fieldList[i], "required");
					break;
			}
		}
	}

	function brShowOldACRStuff() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if (purposeName !== "ACR") { // fixed from testing string to GUID CRMCC-7217
		if (!CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			return;
		}

		var referredByVamc = {
			attr: CommCare.Shared.FormContext.getAttribute("vhacrm_referredbyvamc_code"),
			control: CommCare.Shared.FormContext.getControl("vhacrm_referredbyvamc_code"),
			value: CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code")
		};

		if (referredByVamc.value !== null) {
			HideAndNotRequire("mcs_whatwasthetypeofcare");
			HideAndNotRequire("mcs_wereyoutravelingoutsideyourlocalarea");
			HideAndNotRequire("mcs_isthereaclaimonfile");
			HideAndNotRequire("mcs_categoryofcare");
			CommCare.Shared.SetRequired("mcs_isthisincollectionsorthreatofentering", "none");
		}
		else {
			HideAndNotRequire("vhacrm_referredbyvamc_code");
		}
	}

	function HideAndNotRequire(fieldName) {
		CommCare.Shared.SetRequired(fieldName, "none");
		CommCare.Shared.SetVisible(fieldName, false);
	}

	function brACRLockFieldsIfOB1IsNoContactAndNoOB2() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var ob1ResolutionAhr = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		var ob2ResolutionAhr = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (ob1ResolutionAhr === CommCare.Constants.Integers.OBResolution.NoContact) && (ob2ResolutionAhr == null)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			(ob1ResolutionAhr === CommCare.Constants.Integers.OBResolution.NoContact) && (ob2ResolutionAhr == null)) {
			CommCare.Shared.SetReadOnly("vhacrm_routeto_code", true);
			//CommCare.Shared.SetReadOnly("vhacrm_choiceops_status_code", true);
			CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
		}
		//else if ((purposeName === "ACR") && (ob1ResolutionAhr == null) && (ob2ResolutionAhr == null)) { CRMCC-7217
		else if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) && (ob1ResolutionAhr == null) && (ob2ResolutionAhr == null)) {
			CommCare.Shared.SetReadOnly("vhacrm_routeto_code", true);
			//CommCare.Shared.SetReadOnly("vhacrm_choiceops_status_code", true);
			CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
		}
		else {
			CommCare.Shared.SetReadOnly("vhacrm_routeto_code", false);
			//CommCare.Shared.SetReadOnly("vhacrm_choiceops_status_code", true);
			CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
		}
	}
	function brACRPreviousAttemptsToResolve() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && ((referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.Yes) || (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No))) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			((referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.Yes) || (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No))) {
			CommCare.Shared.SetVisible("vhacrm_previousattemptstoresolve_code", true);
			CommCare.Shared.SetRequired("vhacrm_previousattemptstoresolve_code", "required");
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_previousattemptstoresolve_code", false);
			CommCare.Shared.SetRequired("vhacrm_previousattemptstoresolve_code", "none");
		}
	}
	function brACRReferredToVAMCNo() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

		//if (purposeValue !== null) {
		//	purposeName = CommCare.Shared.Di CRMCC-7217alogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			(referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No)) {
			CommCare.Shared.SetVisible("vhacrm_emergency_code", true);
			CommCare.Shared.SetRequired("vhacrm_emergency_code", "required");
			CommCare.Shared.SetVisible("vhacrm_vamcnotification_code", true);
			CommCare.Shared.SetRequired("vhacrm_vamcnotification_code", "required");
			CommCare.Shared.SetVisible("vhacrm_vamcnoticationid", true);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_emergency_code", false);
			CommCare.Shared.SetRequired("vhacrm_emergency_code", "none");
			CommCare.Shared.SetVisible("vhacrm_vamcnotification_code", false);
			CommCare.Shared.SetRequired("vhacrm_vamcnotification_code", "none");
			CommCare.Shared.SetVisible("vhacrm_vamcnoticationid", false);
			CommCare.Shared.SetRequired("vhacrm_vamcnoticationid", "none");
		}
	}
	function brACRReferredToVAMCNoAndDidYouOrNonVAProviderNotifyVAMCYes() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");
		var didYouOrTheNonVAProviderNotifyTheVAMC = CommCare.Shared.GetFieldValue("vhacrm_vamcnotification_code");

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No) && (didYouOrTheNonVAProviderNotifyTheVAMC == CommCare.Constants.Integers.NotifyTheVAMC.Yes)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			(referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No) && (didYouOrTheNonVAProviderNotifyTheVAMC == CommCare.Constants.Integers.NotifyTheVAMC.Yes)) {
			CommCare.Shared.SetRequired("vhacrm_vamcnoticationid", "required");
		}
		//else if ((purposeName === "ACR") && (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No) && (didYouOrTheNonVAProviderNotifyTheVAMC == CommCare.Constants.Integers.NotifyTheVAMC.No)) { CRMCC-7217
		else if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) &&
			(referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.No) && (didYouOrTheNonVAProviderNotifyTheVAMC == CommCare.Constants.Integers.NotifyTheVAMC.No)) {
			CommCare.Shared.SetRequired("vhacrm_vamcnoticationid", "none");
		}
	}
	function brACRReferredToVAMCYes() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.Yes)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) && (referredByVAMC === CommCare.Constants.Integers.ReferredByVAMC.Yes)) { 
			//
			CommCare.Shared.SetVisible("vhacrm_authreceived_code", true);
			CommCare.Shared.SetRequired("vhacrm_authreceived_code", "required");
			CommCare.Shared.SetVisible("vhacrm_vamcreferredbyid", true);
			CommCare.Shared.SetRequired("vhacrm_vamcreferredbyid", "required");
			CommCare.Shared.SetVisible("vhacrm_referredaschoice_code", true);
			CommCare.Shared.SetRequired("vhacrm_referredaschoice_code", "required");
			CommCare.Shared.SetVisible("vhacrm_contactedby_code", true);
			CommCare.Shared.SetRequired("vhacrm_contactedby_code", "required");
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_authreceived_code", false);
			CommCare.Shared.SetRequired("vhacrm_authreceived_code", "none");
			CommCare.Shared.SetVisible("vhacrm_vamcreferredbyid", false);
			CommCare.Shared.SetRequired("vhacrm_vamcreferredbyid", "none");
			CommCare.Shared.SetVisible("vhacrm_referredaschoice_code", false);
			CommCare.Shared.SetRequired("vhacrm_referredaschoice_code", "none");
			CommCare.Shared.SetVisible("vhacrm_authno_text", false);
			CommCare.Shared.SetRequired("vhacrm_authno_text", "none");
			CommCare.Shared.SetVisible("vhacrm_contactedby_code", false);
			CommCare.Shared.SetRequired("vhacrm_contactedby_code", "none");
		}
	}
	function brACRRequireReferredByVAMCAndAHROB1ResolutionAndDate() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if (purposeName === "ACR") { CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") !== null) {
				CommCare.Shared.SetRequired("vhacrm_referredbyvamc_code", "required");
				CommCare.Shared.SetVisible("vhacrm_referredbyvamc_code", true);
			}
			CommCare.Shared.SetRequired("vhacrm_ahr_ob1resolution_code", "required");
			CommCare.Shared.SetRequired("vhacrm_servicelocationcity_text", "required");
			CommCare.Shared.SetRequired("vhacrm_servicelocationstateid", "required");
		}
		else {
			CommCare.Shared.SetRequired("vhacrm_referredbyvamc_code", "none");
			CommCare.Shared.SetRequired("vhacrm_ahr_ob1resolution_code", "none");
			CommCare.Shared.SetRequired("vhacrm_servicelocationcity_text", "none");
			CommCare.Shared.SetRequired("vhacrm_servicelocationstateid", "none");
		}
	}
	//TODO - recommend to use SetLookupValue and turn this into 1 line function (assuming you want to setSubmitModeAlways (aka this only runs onLoad)
	function brACRSetLineOfBusiness() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		//construct object to pass into SetFieldValue
		var lookupValue = new Array();
		lookupValue[0] = new Object();
		lookupValue[0].id = CommCare.Constants.GUIDS.LOB.defaultCCWF;
		lookupValue[0].name = CommCare.Request.Constants.CCWF_DEFAULT_LOB_NAME;
		lookupValue[0].entityType = "hrc_lob";

		CommCare.Shared.SetFieldValue("vhacrm_lobid", lookupValue);
	}
	function brACRSetTitleFieldFromId() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var requestNumber = CommCare.Shared.GetFieldValue("ticketnumber");

		if (requestNumber != null)
			CommCare.Shared.SetFieldValue("title", requestNumber);
	}
	function brACRShowAccountHoldRequest() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if (purposeName === "ACR") { // fixed from testing string to GUID CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			CommCare.Shared.SetVisible("vhacrm_provider_firstname_text", true);
			CommCare.Shared.SetVisible("vhacrm_provider_lastname_text", true);
			CommCare.Shared.SetVisible("vhacrm_provider_directphoneno_text", true);
			CommCare.Shared.SetVisible("vhacrm_providerdirectphoneextension_text", true);
			CommCare.Shared.SetVisible("vhacrm_ahr_ob1resolution_code", true);
			CommCare.Shared.SetVisible("vhacrm_ahr_ob1date_date", true);
		}
	}
	function brACRShowClosingTheLoopOBFields() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var closingTheLoopFinalStatus = CommCare.Shared.GetFieldValue("vhacrm_cl_clfinalstatus_code");

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "ACR") && (closingTheLoopFinalStatus != null)) { CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) && (closingTheLoopFinalStatus != null)) {
			CommCare.Shared.SetVisible("vhacrm_cl_ob1resolution_code", true);
			CommCare.Shared.SetVisible("vhacrm_cl_ob1date_date", true);
		}
	}
	function brAssignedToQueueResolution() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
		//var queueItemName;
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");//Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217

		if (queueItem !== null) {
			queueItemName = CommCare.Shared.DialogNameReturn(queueItem[0].name);
		}

		//if (purposeValue !== null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((queueItem == null) && ((purposeName !== "Discharge Planning") || (purposeName !== "Dental")) || hasRequestActionChanged) { // fixed from testing string to GUID CRMCC-7217
		if (purposeID != null && (queueItem == null) && (!CommCare.Constants.Compare.PurposeIntersection.DischargePlanning(purposeID) ||
			!CommCare.Constants.Compare.PurposeIntersection.Dental(purposeID)) || hasRequestActionChanged) { // hasRequestActionChanged is a global (to this file) variable
			CommCare.Shared.SetReadOnly("ccwf_assignedtoid", true);
			CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", true);
		}
		else if (queueItem != null) {
			CommCare.Shared.SetReadOnly("ccwf_assignedtoid", false);
			CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", false);
		}
	}
	function brClaimStatusReportSubArea() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var createdOn = CommCare.Shared.GetFieldValue("createdon");
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName;
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		if (purposeDetailValue != null) {
			purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
		}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}
		//PRRT Handler
		if ((createdOn != null) && (interactedWith === CommCare.Constants.Integers.InteractedWith.Provider || interactedWith === CommCare.Constants.Integers.InteractedWith.VIPProvider) && (purposeDetailName === "Claim Status Report") && (lobName === "Customer Experience")) {// fix? from testing string to GUID

			CommCare.Shared.SetRequired("vhacrm_lastname_text", "required");
			CommCare.Shared.SetRequired("vhacrm_provideraddressline1_text", "none");
			CommCare.Shared.SetRequired("vhacrm_providercity_text", "none");
			CommCare.Shared.SetRequired("vhacrm_providerstateid", "none");
			CommCare.Shared.SetRequired("vhacrm_providerzip_text", "none");
		}
		else if ((createdOn != null) && (purposeDetailName !== "Claim Status Report") && (interactedWith === CommCare.Constants.Integers.InteractedWith.Provider) && (lobName === "Customer Experience")) { // fix? from testing string to GUID
			CommCare.Shared.SetRequired("vhacrm_lastname_text", "none");
		}

		if (programTypeName == "PRRT") { // fix? from testing string to GUID
			MasterProviderTIN();
			return;
		}
	}
	function brCommunityCareDefaultSubAreaForClaimStatusArea() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName;
		var accountHoldRequestNotes = CommCare.Shared.GetFieldValue("vhacrm_accountholdnotes_memo");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (purposeDetailValue != null) {
			purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
		}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}
		//TODO - use SetFormLookup?
		//if ((purposeName === "Claim Status") && (purposeDetailName == null) && (accountHoldRequestNotes == null) && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(purposeDetailName == null) && (accountHoldRequestNotes == null) && (lobName === "Customer Experience")) {
			//set purpose detail to "Inquiry"
			//construct object to pass into SetFieldValue
			var lookupValue = new Array();
			lookupValue[0] = new Object();
			lookupValue[0].id = CommCare.Constants.GUIDS.PurposeDetail.Inquiry;
			lookupValue[0].name = "Inquiry";
			lookupValue[0].entityType = "vhacrm_subareaintersection";

			CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", lookupValue);
		}
	}
	function brCVHDProgramType() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName;
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		if (programType != null) {
			programTypeName = CommCare.Shared.DialogNameReturn(programType[0].name);
		}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		if ((programTypeName === "Help Desk") && (lobName === "Customer Experience")) { // fix? from testing string to GUID
			CommCare.Shared.SetVisible("vhacrm_firstname_text", true);
			CommCare.Shared.SetVisible("vhacrm_lastname_text", true);
			CommCare.Shared.SetVisible("vhacrm_username_text", true);
			CommCare.Shared.SetVisible("vhacrm_providerfacilitycvhd_text", true);
			CommCare.Shared.SetVisible("vhacrm_homefacilitycvhdid", true);
			CommCare.Shared.SetRequired("vhacrm_firstname_text", "required");
			CommCare.Shared.SetRequired("vhacrm_lastname_text", "required");
			CommCare.Shared.SetRequired("vhacrm_username_text", "required");
			CommCare.Shared.SetRequired("vhacrm_providerfacilitycvhd_text", "required");
			CommCare.Shared.SetRequired("vhacrm_homefacilitycvhdid", "none");
			CommCare.Shared.SetVisible("ccwf_tin_text", false);
			CommCare.Shared.SetVisible("ccwf_providerfacility_text", false);
			CommCare.Shared.SetVisible("vhacrm_provideraddressline1_text", false);
			CommCare.Shared.SetVisible("vhacrm_providercity_text", false);
			CommCare.Shared.SetVisible("vhacrm_providerstateid", false);
			CommCare.Shared.SetVisible("vhacrm_cpacid", false);
			CommCare.Shared.SetVisible("vhacrm_providerzip_text", false);
			CommCare.Shared.SetVisible("vhacrm_veteranfirstname_text", false);
			CommCare.Shared.SetVisible("vhacrm_veteranlastname_text", false);
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_username_text", false);
			CommCare.Shared.SetVisible("vhacrm_providerfacilitycvhd_text", false);
			CommCare.Shared.SetVisible("vhacrm_homefacilitycvhdid", false);
			CommCare.Shared.SetRequired("vhacrm_username_text", "none");
			CommCare.Shared.SetRequired("vhacrm_providerfacilitycvhd_text", "none");
			CommCare.Shared.SetRequired("vhacrm_homefacilitycvhdid", "none");
			CommCare.Shared.SetVisible("vhacrm_cpacid", true);
			CommCare.Shared.SetVisible("vhacrm_veteranfirstname_text", true);
			CommCare.Shared.SetVisible("vhacrm_veteranlastname_text", true);
		}
	}

	//TODO - review: This is almost identical to function above.  Are both really needed?  
	function brCCRCVHDProgramType() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName;

		if (programType != null) {
			programTypeName = CommCare.Shared.DialogNameReturn(programType[0].name);
		}

		if (programTypeName === "Help Desk") { // fix? from testing string to GUID
			CommCare.Shared.SetVisible("vhacrm_firstname_text", true);
			CommCare.Shared.SetVisible("vhacrm_lastname_text", true);
			CommCare.Shared.SetVisible("vhacrm_username_text", true);
			CommCare.Shared.SetVisible("vhacrm_providerfacilitycvhd_text", true);
			CommCare.Shared.SetVisible("vhacrm_homefacilitycvhdid", true);
			CommCare.Shared.SetVisible("ccwf_tin_text", false);
			CommCare.Shared.SetVisible("ccwf_providerfacility_text", false);
			CommCare.Shared.SetVisible("vhacrm_provideraddressline1_text", false);
			CommCare.Shared.SetVisible("vhacrm_providercity_text", false);
			CommCare.Shared.SetVisible("vhacrm_providerstateid", false);
			CommCare.Shared.SetVisible("vhacrm_providerzip_text", false);
			CommCare.Shared.SetRequired("vhacrm_firstname_text", "required");
			CommCare.Shared.SetRequired("vhacrm_lastname_text", "required");
			CommCare.Shared.SetRequired("vhacrm_username_text", "required");
			CommCare.Shared.SetRequired("vhacrm_providerfacilitycvhd_text", "required");
			CommCare.Shared.SetRequired("vhacrm_homefacilitycvhdid", "required");
			CommCare.Shared.SetVisible("hrc_facilityid", false);
			CommCare.Shared.SetVisible("vhacrm_visnid", false);
			CommCare.Shared.SetVisible("ccwf_typeofbillsubcategory_code", false);
			CommCare.Shared.SetRequired("vhacrm_visnid", "none");
			CommCare.Shared.SetRequired("hrc_facilityid", "none");
			CommCare.Shared.SetRequired("ccwf_tin_text", "none");
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_username_text", false);
			CommCare.Shared.SetVisible("vhacrm_providerfacilitycvhd_text", false);
			CommCare.Shared.SetVisible("vhacrm_homefacilitycvhdid", false);
			CommCare.Shared.SetRequired("vhacrm_firstname_text", "none");
			CommCare.Shared.SetRequired("vhacrm_lastname_text", "none");
			CommCare.Shared.SetRequired("vhacrm_username_text", "none");
			CommCare.Shared.SetRequired("vhacrm_providerfacilitycvhd_text", "none");
			CommCare.Shared.SetRequired("vhacrm_homefacilitycvhdid", "none");
		}
	}
	function brDefaultSubAreaForClaimStatusArea() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (purposeDetailValue != null) {
			purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
		}

		//if ((purposeName === "Claim Status") && (purposeDetailName == null)) {  // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) && (purposeDetailName == null)) { 
			//set purpose detail to "Inquiry"
			//construct object to pass into SetFieldValue
			var lookupValue = new Array();
			lookupValue[0] = new Object();
			lookupValue[0].id = CommCare.Constants.GUIDS.PurposeDetail.Inquiry;
			lookupValue[0].name = "Inquiry";
			lookupValue[0].entityType = "vhacrm_subareaintersection";

			CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", lookupValue);
		}
	}
	function brFMShowMakeRequiredNonCoreReason() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((purposeName === "Non-Core") && (lobName === "OCC FM")) { // fixed from testing string to GUID CRMCC-7217
		if ((CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) && (lobName === "OCC FM")) {
			CommCare.Shared.SetVisible("vhacrm_noncorereason_code", true);
			CommCare.Shared.SetRequired("vhacrm_noncorereason_code", "required");
		}
		else {
			CommCare.Shared.SetVisible("vhacrm_noncorereason_code", false);
			CommCare.Shared.SetRequired("vhacrm_noncorereason_code", "none");
		}
	}
	///TODO - heavy overlap with brACRInteractedWith() function
	function brCCRInteractedWith() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = getLookupName(programType);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(purpose); CRMCC-7217
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetail);

		if (programTypeName == "PRRT") {
			MasterProviderTIN();
			return;
		}

		if (programTypeName !== "Help Desk" && programTypeName !== "PRRT") { // fix? from testing string to GUID
			var fieldList = ["ccwf_tin_text", "vhacrm_vsooffice_text", "vhacrm_othertitle_text", "ccwf_providerfacility_text", "vhacrm_otherrelationship_text",
				"vhacrm_relationshiptoveteran_code", "vhacrm_interaction_addressline1_text", "vhacrm_interaction_city_text", "vhacrm_interaction_stateid",
				"vhacrm_interaction_zip_text", "vhacrm_lastname_text", "vhacrm_provideraddressline1_text", "vhacrm_providercity_text",
				"vhacrm_providerstateid", "vhacrm_providerzip_text"];
			var arrayLength = fieldList.length;

			for (var i = 0; i < arrayLength; i++) {
				switch (fieldList[i]) {
					case "ccwf_tin_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_vsooffice_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_othertitle_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "ccwf_providerfacility_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_otherrelationship_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_relationshiptoveteran_code":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_addressline1_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_city_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_stateid":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_zip_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_lastname_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_provideraddressline1_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_providercity_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_providerstateid":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_providerzip_text":
						if (CommCare.Request.Constants.CCRHideFieldsInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.ShowFieldsInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.SetNotRequiredInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.SetRequiredInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
				}
			}

			if (programTypeName == "C6" || programTypeName == CommCare.Shared.Constants.C3Name) { // fix? from testing string to GUID
				if (interactedWith == CommCare.Constants.Integers.InteractedWith.VAEmployee) {
					requireEmailOrPhoneC6();
				}
				else {
					var email = CommCare.Shared.GetFieldValue("hrc_emailaddress_text");

					if (email == null) CommCare.Shared.SetRequired("hrc_emailaddress_text", "none");
					if (email == null) CommCare.Shared.SetVisible("hrc_emailaddress_text", false);
					CommCare.Shared.SetRequired("ccwf_phone_text", "required");
					CommCare.Shared.SetVisible("ccwf_phone_text", true);
				}
				//if (purposeName == "Bill of Collections" && purposeDetailName == "Provider") { CRMCC-7217
				if (CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID) && purposeDetailName == "Provider") {
					CommCare.Shared.SetRequired("ccwf_tin_text", "required");
					CommCare.Shared.SetVisible("ccwf_tin_text", true);

					setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
					setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
				}
			}

			var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
			if (patsrId != null) {
				CommCare.Shared.SetRequired("ccwf_phone_text", "none");
			}

			var source = CommCare.Shared.GetFieldValue("caseorigincode");

			if (source == CommCare.Constants.Integers.Source.PATSR && patsrId != null) {
				for (var i = 0; i < arrayLength; i++) {
					CommCare.Shared.SetRequired(fieldList[i], "none");
				}
				return;
			}
		}
	}
	function requireEmailOrPhoneC6() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		CommCare.Shared.SetVisible("hrc_emailaddress_text", true);

		var eMail = CommCare.Shared.GetFieldValue("hrc_emailaddress_text");
		var phoneNumber = CommCare.Shared.GetFieldValue("ccwf_phone_text");

		if (phoneNumber == null) {
			CommCare.Shared.SetRequired("hrc_emailaddress_text", "required");
		}
		else {
			CommCare.Shared.SetRequired("hrc_emailaddress_text", "none");
		}
		if (eMail == null) {
			CommCare.Shared.SetRequired("bah_phonenumber_text", "required");
		}
		else {
			CommCare.Shared.SetRequired("bah_phonenumber_text", "none");
		}
	}
	//heavy overlap with brCCRInteractedWith() function - 2 additional fields here for firstname and 
	function brInteractedWith() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		if (programTypeName == "PRRT") { // fix? from testing string to GUID
			MasterProviderTIN();
			return;
		}

		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}



		if (lobName === "Customer Experience") { // fix? from testing string to GUID
			var fieldList = ["ccwf_tin_text", "vhacrm_vsooffice_text", "vhacrm_othertitle_text", "ccwf_providerfacility_text", "vhacrm_otherrelationship_text",
				"vhacrm_relationshiptoveteran_code", "vhacrm_interaction_addressline1_text", "vhacrm_interaction_city_text", "vhacrm_interaction_stateid",
				"vhacrm_interaction_zip_text", "vhacrm_lastname_text", "vhacrm_provideraddressline1_text", "vhacrm_providercity_text",
				"vhacrm_providerstateid", "vhacrm_providerzip_text", "ccwf_InteractionPurpose", "vhacrm_firstname_text"];
			var arrayLength = fieldList.length;



			for (var i = 0; i < arrayLength; i++) {
				switch (fieldList[i]) {
					case "ccwf_tin_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.ccwf_tin_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_vsooffice_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_vsooffice_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_othertitle_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_othertitle_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "ccwf_providerfacility_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.ccwf_providerfacility_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_otherrelationship_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_otherrelationship_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_relationshiptoveteran_code":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_relationshiptoveteran_code.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_addressline1_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_interaction_addressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_city_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_interaction_city_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_stateid":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_interaction_stateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_interaction_zip_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_interaction_zip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_lastname_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_lastname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_provideraddressline1_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_provideraddressline1_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_providercity_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_providercity_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_providerstateid":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_providerstateid.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_providerzip_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_providerzip_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "ccwf_interactionpurpose":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.ccwf_interactionpurpose.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.ccwf_interactionpurpose.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.ccwf_interactionpurpose.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.ccwf_interactionpurpose.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
					case "vhacrm_firstname_text":
						if (CommCare.Request.Constants.AllHideFieldsInteractedWith.vhacrm_firstname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], false);
						if (CommCare.Request.Constants.AllShowFieldsInteractedWith.vhacrm_firstname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetVisible(fieldList[i], true);
						if (CommCare.Request.Constants.AllSetNotRequiredInteractedWith.vhacrm_firstname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "none");
						if (CommCare.Request.Constants.AllSetRequiredInteractedWith.vhacrm_firstname_text.indexOf(interactedWith) != -1)
							CommCare.Shared.SetRequired(fieldList[i], "required");
						break;
				}
			}

			var source = CommCare.Shared.GetFieldValue("caseorigincode");
			var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");

			if (source == CommCare.Constants.Integers.Source.PATSR && patsrId != null) {
				for (var i = 0; i < arrayLength; i++) {
					CommCare.Shared.SetRequired(fieldList[i], "none");
				}
				return;
			}
		}
	}
	function brInteractionSource() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var source = CommCare.Shared.GetFieldValue("caseorigincode");
		switch (source) {
			case CommCare.Constants.Integers.Source.Email:
				CommCare.Shared.SetVisible("hrc_emailaddress_text", true);
				break;
			case CommCare.Constants.Integers.Source.Fax:
				CommCare.Shared.SetVisible("vhacrm_faxnumber_text", true);
				break;
		}
	}
	function brLoadEditR6() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName;
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (purposeDetailValue != null) {
			purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
		}
		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((purposeName === "Claim Status") && (purposeDetailName === "Inquiry") && (actionName === "Load Edit") && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217// fixed action CCCRM7217
		if ((purposeID != null && actionID != null && CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(purposeDetailName === "Inquiry") &&
			CommCare.Constants.Compare.ActionIntersection.LoadEdit(actionID) &&
			(lobName === "Customer Experience")) {
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
		}
		//else if ((purposeName === "Traveling Veteran") && (actionName === "Load Edit") && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		else if ((purposeID != null && actionID != null && CommCare.Constants.Compare.PurposeIntersection.TravelingVeteran(purposeID)) &&
			CommCare.Constants.Compare.ActionIntersection.LoadEdit(actionID) &&
			(lobName === "Customer Experience")) {
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
		}
		//the following condition makes no sense logically, as none of the succeeding branches can be true
		//else if ((purposeName == null) || (purposeDetailName == null) || (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		else if ((purposeID == null) || (purposeDetailName == null) || (lobName === "Customer Experience")) {
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
		}
		//else if ((purposeName !== "Claim Status") && (purposeName !== "Traveling Veteran") && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((purposeID != null && !CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(purposeID != null && !CommCare.Constants.Compare.PurposeIntersection.TravelingVeteran(purposeID)) &&
			(lobName === "Customer Experience")) { 
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
		}
		//else if ((actionName !== "Load Edit") && (actionName !== "Load Edit") && (lobName === "Customer Experience")) { // Not Load Edit in twice // fixed action CCCRM7217
		else if (actionID != null &&
			!CommCare.Constants.Compare.ActionIntersection.LoadEdit(actionID) &&
			(lobName === "Customer Experience")) {
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
		}
		//else if ((purposeName === "Claim Status") && (purposeDetailName !== "Inquiry") && (lobName === "Customer Experience")) { // fix? from testing string to GUID  // fixed from testing string to GUID CRMCC-7217
		else if ((purposeID != null &&
			CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(purposeDetailName !== "Inquiry") && 
			(lobName === "Customer Experience")) {
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
		}
	}
	//Heavy overlap with brLoadEditR6
	function brLoadEditFields() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217

		//if (action != null) { // fixed action CCCRM7217
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}

		//if (actionName === "Load Edit") { // fix? from testing string to GUID // fixed action CCCRM7217
		if (actionID != null && CommCare.Constants.Compare.ActionIntersection.LoadEdit(actionID)) {
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
		//}
		//else if (actionName === "Load Edit") { // This can't be right.  what is the intention here (the condition is identical to above, therefore else if will never hit)?
		//	CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
		//	CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
		//	CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
		//	CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
		}
		else {
			CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
			CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
			CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
			CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
		}
	}
	function brLockAreaSubAreaActionForNANAVeteran() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var veteran = CommCare.Shared.GetFieldValue("customerid");
		var veteranName;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName;
		//var defaultContact = CommCare.Shared.GetDefaultContact();
		var defaultContactId;
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue); CRMCC-7217
		var issueWasResolved = CommCare.Shared.GetFieldValue("mcs_issuewasresolved");
		var queueItemValue = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
		//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : ""; CRMCC-7217


		CommCare.Shared.GetDefaultContactPromise().then(function (defaultContact) {
			if (veteran != null) {
				veteranId = CommCare.Shared.GetCleanId(veteran);
			}
			if (defaultContact != null) {
				defaultContactId = CommCare.Shared.GetCleanId(defaultContact);
			}
			if (programType != null) {
				programTypeName = CommCare.Shared.DialogNameReturn(programType[0].name);
			}

			if ((veteranId === defaultContactId) && (programTypeName !== "Help Desk") && patsrId == null) { // fix? from testing string to GUID
				CommCare.Shared.SetReadOnly("vhacrm_areaintersectionid", true);
				CommCare.Shared.SetReadOnly("vhacrm_subareaintersectionid", true);
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				//} else if (programTypeName == "VISN/VAMC" && purposeNameFormatted.includes("billing concern") && issueWasResolved && !queueItemValue) { // fixed from testing string to GUID CRMCC-7217
			} else if (programTypeName == "VISN/VAMC" && purposeID != null && CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) && issueWasResolved && !queueItemValue) {
				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				//} else if (programTypeName == "VISN/VAMC" && purposeNameFormatted.includes("billing concern") && issueWasResolved && queueItemValue != null) { // fixed from testing string to GUID CRMCC-7217
			} else if (programTypeName == "VISN/VAMC" && purposeID != null && CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) && issueWasResolved && queueItemValue != null) {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_resolutionintersectionid", true);
			}
			else {
				CommCare.Shared.SetReadOnly("vhacrm_areaintersectionid", false);
				CommCare.Shared.SetReadOnly("vhacrm_subareaintersectionid", false);
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
			}

			if (patsrId != null) {
				CommCare.Shared.SetReadOnly("vhacrm_areaintersectionid", true);
				var subIntersectionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid"));
				if (subIntersectionId != null) {
					Xrm.WebApi.online.retrieveRecord("vhacrm_subareaintersection", subIntersectionId, "?$select=statecode").then(
						function success(result) {
							var statecode = result["statecode"];
							var statecode_formatted = result["statecode@OData.Community.Display.V1.FormattedValue"];
							console.log(result);
							if (statecode == 0) {
								CommCare.Shared.SetReadOnly("vhacrm_subareaintersectionid", false);
							} else {
								CommCare.Shared.SetReadOnly("vhacrm_subareaintersectionid", true);
							}
						},
						function (error) {
							Xrm.Utility.alertDialog(error.message);
						}
					);
				} else {
					CommCare.Shared.SetReadOnly("vhacrm_subareaintersectionid", false);
				}


			}

			//lockFormForPatsrRejection(getLookupName(action)); // fixed action CCCRM7217
			lockFormForPatsrRejection(CommCare.Shared.GetCleanId(action));
		});
	}

	function brLockProgramForHelpDesk() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName;

		if (programType != null) {
			programTypeName = CommCare.Shared.DialogNameReturn(programType[0].name);
		}

		if (programTypeName === "Help Desk") // fix? from testing string to GUID
			CommCare.Shared.SetReadOnly("ccwf_programid", true);
	}

	function brLockUnlockAssignToCSCSupervisors() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
		var queueItemName;
		var type = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid"));
		var setVis = type == CommCare.Shared.Constants.TYPE_INTERSECTION_C3 ? false : true;

		if (queueItem != null) {
			queueItemName = CommCare.Shared.DialogNameReturn(queueItem[0].name);
		}

		if (queueItemName != null)
			CommCare.Shared.SetReadOnly("vhacrm_assigntocscsupervisors_bool", false);
		else
			CommCare.Shared.SetReadOnly("vhacrm_assigntocscsupervisors_bool", true);

		CommCare.Shared.SetVisible("vhacrm_assigntocscsupervisors_bool", setVis);
	}
	//TODO - review and possibly combine the next several functions regarding MethodOfDelivery (MOD) - tagged as MOD Merge Candidate
	//TODO - review: Several potential candidates for merge around non-core : tagged as NC Merge Candidate
	function brNonCoreHealthNetTriwestDetail() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName;
		var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");

		//if (purposeValue != null) { //Fixed CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.Choice)) { // fixed from testing string to GUID CRMCC-7217
		if ((CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.Choice)) {
			setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], true);
			setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "required");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], false);
			setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "none");
		}
	}
	//NC Merge Candidate
	function brNonCoreHealthNetTriwestDetailInteraction() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var interactionPurposeValue = CommCare.Shared.GetFieldValue("ccwf_interactionpurpose");
		var interactionPurposeName;
		var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		if (interactionPurposeValue != null) {
			interactionPurposeName = CommCare.Shared.DialogNameReturn(interactionPurposeValue[0].name);
		}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		if ((interactionPurposeName === "Non-Core") && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.Choice) && (lobName === "Customer Experience")) { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], true);
			setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "required");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], false);
			setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "none");
		}
	}
	//NC Merge Candidate
	function brNonCoreHealthNetTriwestDetailRequest() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.Choice) && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		if ((CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.Choice) && (lobName === "Customer Experience")) {
			setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], true);
			setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "required");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], false);
			setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "none");
		}
	}

	//NC Merge Candidate
	function brNonCoreReasonRequest() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((purposeName === "Non-Core") && (lobName = "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		if ((CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) && (lobName = "Customer Experience")) {
			setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], true);
			setVisibleOnMultipleFields(["vhacrm_routingreason_code", "vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], false);
			setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "required");
			setRequiredOnMultipleFields(["vhacrm_routingreason_code"], "none");
		}
		//else if ((purposeName !== "Non-Core") && (lobName = "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		else if ((!CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) && (lobName = "Customer Experience")) {
			//setVisibleOnMultipleFields(["vhacrm_routingreason_code", "vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], true);
			setVisibleOnMultipleFields(["vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], true);
			setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], false);
			setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "none");
		}
	}
	//NC Merge Candidate
	function brNonCoreVISNDetail() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}

		//if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.UnsupportedVISN)) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) &&
			(nonCoreReason === CommCare.Constants.Integers.NonCoreReason.UnsupportedVISN)) {
			setVisibleOnMultipleFields(["vhacrm_noncorevisndetailid"], true);
			setRequiredOnMultipleFields(["vhacrm_noncorevisndetailid"], "required");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_noncorevisndetailid"], false);
			setRequiredOnMultipleFields(["vhacrm_noncorevisndetailid"], "none");
		}
	}
	//NC Merge Candidate
	function brNonCoreVISNDetailInteraction() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var interactionPurposeValue = CommCare.Shared.GetFieldValue("ccwf_interactionpurpose");
		var interactionPurposeName;
		var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		if (interactionPurposeValue != null) {
			interactionPurposeName = CommCare.Shared.DialogNameReturn(interactionPurposeValue[0].name);
		}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		if ((interactionPurposeName === "Non-Core") && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.UnsupportedVISN) && (lobName = "Customer Experience")) { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["vhacrm_noncorevisndetailid"], true);
			setRequiredOnMultipleFields(["vhacrm_noncorevisndetailid"], "none");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_noncorevisndetailid"], false);
			setRequiredOnMultipleFields(["vhacrm_noncorevisndetailid"], "none");
		}
	}
	//NC Merge Candidate
	function brNonCoreVISNDetailRequest() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Constants.Integers.NonCoreReason.UnsupportedVISN) && (lobName = "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) &&
			(nonCoreReason === CommCare.Constants.Integers.NonCoreReason.UnsupportedVISN) && (lobName = "Customer Experience")) {
			setVisibleOnMultipleFields(["vhacrm_noncorevisndetailid"], true);
			setRequiredOnMultipleFields(["vhacrm_noncorevisndetailid"], "required");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_noncorevisndetailid"], false);
			setRequiredOnMultipleFields(["vhacrm_noncorevisndetailid"], "none");
		}
	}
	function brPDIFieldRequiredWhenActionIsUnprocessedPDI() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}

		//var purpose = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));// ununsed
		var claimNumber = CommCare.Shared.GetFieldValue("ccwf_claimnumber_text");
		var pdi = CommCare.Shared.GetFieldValue("hac_pdinumber_text");

		//if ((actionName != null) && (actionName.indexOf("Unprocessed PDI") >= 0)) // fixed action CCCRM7217
		if ((action != null) && (CommCare.Constants.Compare.ActionIntersection.UnprocessedPDI(actionID))) 
			setRequiredOnMultipleFields(["hac_pdinumber_text"], "required");
		else
			setRequiredOnMultipleFields(["hac_pdinumber_text"], "none");
			
		//if (actionName != null && (actionName == "Recoupment Walkthru" || actionName == "Reopen Walkthru" || actionName == "Claim Push" || actionName == "Clinical Decision")) { // fixed action CCCRM7217
		if (action != null && (CommCare.Constants.Compare.ActionIntersection.RecoupmentWalkthru(actionID) ||
			CommCare.Constants.Compare.ActionIntersection.ReopenWalkthru(actionID) ||
			CommCare.Constants.Compare.ActionIntersection.ClaimPush(actionID) ||
			CommCare.Constants.Compare.ActionIntersection.ClinicalDecision(actionID))) {
			if ((claimNumber == null && pdi == null) || (claimNumber != null && pdi != null)) {
				CommCare.Shared.SetRequired("ccwf_claimnumber_text", true);
				CommCare.Shared.SetRequired("hac_pdinumber_text", true);
				CommCare.Shared.SetReadOnly("hac_pdinumber_text", false);
			} else if (claimNumber != null) {
				CommCare.Shared.SetRequired("ccwf_claimnumber_text", true);
				CommCare.Shared.SetRequired("hac_pdinumber_text", false);
			} else if (pdi != null) {
				CommCare.Shared.SetRequired("ccwf_claimnumber_text", false);
				CommCare.Shared.SetRequired("hac_pdinumber_text", true);
			}
			// TO ELIMINATE ANY RACE CONDITIONS...
			showHideImageLocatorTypeOfCare();
			//if (actionName != null && (actionName == "Claim Push" || actionName == "Clinical Decision")) { // fix? from testing string to GUID
			//	CommCare.Shared.SetVisible("mcs_imagelocator", true);
			//	CommCare.Shared.SetVisible("mcs_typeofcare", true);
			//	CommCare.Shared.SetRequired("mcs_imagelocator", true);
			//	CommCare.Shared.SetRequired("mcs_typeofcare", true);
			//} else {
			//	CommCare.Shared.SetVisible("mcs_imagelocator", false);
			//	CommCare.Shared.SetVisible("mcs_typeofcare", false);
			//	CommCare.Shared.SetRequired("mcs_imagelocator", false);
			//	CommCare.Shared.SetRequired("mcs_typeofcare", false);
			//}
		}
		else {
			CommCare.Shared.SetRequired("ccwf_claimnumber_text", false);
			CommCare.Shared.SetRequired("hac_pdinumber_text", false);
			//CommCare.Shared.SetReadOnly("hac_pdinumber_text", true);
		}
	}
	function brRecipient() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}
		// fix? from testing string to GUID
		//if ((interactedWith === CommCare.Constants.Integers.InteractedWith.Provider || interactedWith === CommCare.Constants.Integers.InteractedWith.VIPProvider) && (actionName === "Send Correspondence") && (lobName === "Customer Experience")) { //fixed action CCCRM7217
		if ((interactedWith === CommCare.Constants.Integers.InteractedWith.Provider ||
			interactedWith === CommCare.Constants.Integers.InteractedWith.VIPProvider) &&
			(actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) && 
			(lobName === "Customer Experience")) {

			CommCare.Shared.SetFieldValue("vhacrm_recipient_code", interactedWith);
			setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], true);
			setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
				"vhacrm_provideraddressline1_text"], false);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], "required");
			setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
				"vhacrm_provideraddressline1_text"], "none");
		} // fix? from testing string to GUID
		//else if ((interactedWith !== CommCare.Constants.Integers.InteractedWith.Provider && interactedWith !== CommCare.Constants.Integers.InteractedWith.VIPProvider) && (actionName === "Send Correspondence") && (lobName === "Customer Experience")) {// fixed action CCCRM7217
		else if ((interactedWith !== CommCare.Constants.Integers.InteractedWith.Provider &&
			interactedWith !== CommCare.Constants.Integers.InteractedWith.VIPProvider) &&
			(actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(lobName === "Customer Experience")) {
			setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text", "vhacrm_providerzip_text", "vhacrm_providerstateid",
				"vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text", "vhacrm_providerzip_text", "vhacrm_providerstateid",
				"vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
			CommCare.Shared.SetFieldValue("vhacrm_recipient_code", interactedWith);
		}
		if (programTypeName == "PRRT") {
			MasterProviderTIN();
			return;
		}
	}
	function brRecipientR6() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var createdOn = CommCare.Shared.GetFieldValue("createdon");
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var recipient = CommCare.Shared.GetFieldValue("vhacrm_recipient_code");
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		//if ((interactedWith === CommCare.Constants.Integers.InteractedWith.Provider) && (createdOn != null) && (actionName === "Send Correspondence") && (recipient == null)) {// fixed action CCCRM7217
		if ((interactedWith === CommCare.Constants.Integers.InteractedWith.Provider) &&
			(createdOn != null) &&
			(actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(recipient == null)) {
			setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], true);
			setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
				"vhacrm_provideraddressline1_text"], false);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], "required");
			setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
				"vhacrm_provideraddressline1_text"], "none");
			CommCare.Shared.SetFieldValue("vhacrm_recipient_code", interactedWith);
		}
		//else if ((interactedWith !== CommCare.Constants.Integers.InteractedWith.Provider) && (actionName === "Send Correspondence") && (createdOn != null) && (recipient == null)) {// fixed action CCCRM7217
		else if ((interactedWith !== CommCare.Constants.Integers.InteractedWith.Provider) &&
			(actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(createdOn != null) &&
			(recipient == null)) {
			setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text", "vhacrm_providerzip_text", "vhacrm_providerstateid",
				"vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text", "vhacrm_providerzip_text", "vhacrm_providerstateid",
				"vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
			CommCare.Shared.SetFieldValue("vhacrm_recipient_code", interactedWith);
		}
		if (programTypeName == "PRRT") { // fix? from testing string to GUID
			MasterProviderTIN();
			return;
		}
	}
	function brRecipientNotProvider() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var recipient = CommCare.Shared.GetFieldValue("vhacrm_recipient_code");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((actionName === "Send Correspondence") && (recipient !== CommCare.Constants.Integers.InteractedWith.Provider) && (lobName === "Customer Experience")) { // fixed from testing string to GUID // fixed action CCCRM7217
		if ((actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(recipient !== CommCare.Constants.Integers.InteractedWith.Provider) &&
			(lobName === "Customer Experience")) { 
			setVisibleOnMultipleFields(["ccwf_providerfacility_text"], false);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "none");
		}
		//else if ((actionName === "Send Correspondence") && (recipient === CommCare.Constants.Integers.InteractedWith.Provider) && (lobName === "Customer Experience")) { // fixed from testing string to GUID // fixed action CCCRM7217
		else if ((actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(recipient === CommCare.Constants.Integers.InteractedWith.Provider) &&
			(lobName === "Customer Experience")) { // fix? from testing string to GUID 
			setVisibleOnMultipleFields(["ccwf_providerfacility_text"], true);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "required");
		}

		if (programTypeName == "PRRT") {
			MasterProviderTIN();
			return;
		}
	}
	function brCCRRecipientNotProvider() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var recipient = CommCare.Shared.GetFieldValue("vhacrm_recipient_code");
		var createdOn = CommCare.Shared.GetFieldValue("createdon");

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}

		//if ((actionName === "Send Correspondence") && (recipient !== CommCare.Constants.Integers.InteractedWith.Provider) && (createdOn != null)) { // fixed from testing string to GUID // fixed action CCCRM7217
		if ((actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(recipient !== CommCare.Constants.Integers.InteractedWith.Provider) &&
			(createdOn != null)) {
			setVisibleOnMultipleFields(["ccwf_providerfacility_text"], false);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "none");
		}
		//else if ((actionName === "Send Correspondence") && (recipient === CommCare.Constants.Integers.InteractedWith.Provider) && (createdOn != null)) { // fixed from testing string to GUID // fixed action CCCRM7217
		else if ((actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(recipient === CommCare.Constants.Integers.InteractedWith.Provider) &&
			(createdOn != null)) {
			setVisibleOnMultipleFields(["ccwf_providerfacility_text"], true);
			setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "required");
		}
	}
	function brRelationshipToVeteran() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var relationshipToVeteran = CommCare.Shared.GetFieldValue("vhacrm_relationshiptoveteran_code");

		if (relationshipToVeteran === CommCare.Constants.Integers.RelationshipToVeteran.Other) {
			setVisibleOnMultipleFields(["vhacrm_otherrelationship_text"], true);
		}
		else if ((relationshipToVeteran != null) && (relationshipToVeteran !== CommCare.Constants.Integers.RelationshipToVeteran.Other)) {
			setVisibleOnMultipleFields(["vhacrm_otherrelationship_text"], false);
		}
	}
	function brRequestVISNVisibility() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName;

		if (purposeDetailValue != null) {
			purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
		}
		if (programType != null) {
			programTypeName = CommCare.Shared.DialogNameReturn(programType[0].name);
		}

		if ((purposeDetailName === "Claim Status Report") && (programTypeName !== "Help Desk")) { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["hrc_facilityid"], false);
			setRequiredOnMultipleFields(["vhacrm_visnid"], "required");
		}
		else if ((purposeDetailName === "Claim Status Report") && (programTypeName !== "Help Desk")) { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["hrc_facilityid"], true);
			setRequiredOnMultipleFields(["vhacrm_visnid"], "none");
		}
		else if (programTypeName === "Help Desk") { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["hrc_facilityid", "vhacrm_visnid"], false);
			setRequiredOnMultipleFields(["hrc_facilityid", "vhacrm_visnid"], "none");
		}
	}

	function brRequireHomeFacility() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName;
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName;
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (purposeDetailValue != null) {
			purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
		}
		if (programType != null) {
			programTypeName = CommCare.Shared.DialogNameReturn(programType[0].name);
		}
		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((purposeName === "Non-Core") || (purposeDetailName === "Claim Status Report") || (programTypeName === "Help Desk") || (actionName == "Claim Status Report") || (lobName !== "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) ||
			(purposeDetailName === "Claim Status Report") ||
			(programTypeName === "Help Desk") ||
			(actionID != null && CommCare.Constants.Compare.ActionIntersection.ClaimStatusReport(actionID)) ||
			(lobName !== "Customer Experience")) {
			setVisibleOnMultipleFields(["ccwf_homefacility"], false);
			setRequiredOnMultipleFields(["ccwf_homefacility"], "none");
		}
		else {
			setVisibleOnMultipleFields(["ccwf_homefacility"], true);
			setRequiredOnMultipleFields(["ccwf_homefacility"], "required");
		}
	}
	function brRequireProgramType() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var createdOn = CommCare.Shared.GetFieldValue("createdon");

		if (createdOn != null)
			setRequiredOnMultipleFields(["ccwf_programid"], "required");
	}
    
	function brHandleActionIsDTANewDayClaimsVFMPDTA() {
        // CRMCC-6025
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
		var actionID = CommCare.Shared.GetCleanId(action);

		if ((action != null) && (CommCare.Constants.Compare.ActionIntersection.DTANewDayClaimsVFMPDTA(actionID))) {
            setRequiredOnMultipleFields(["hac_pdinumber_text"], "required");
		}
		else {
            setRequiredOnMultipleFields(["hac_pdinumber_text"], "none");
		}
		
	}
    
	function brSetBeneAndShowHideFieldsWhenActionIsCampLejeune() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action
		//var lookupValue = constructNoBeneObject();


		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}

		//if ((actionName != null) && (actionName.indexOf("Camp Lejeune") >= 0)) { // fixed action CCCRM7217
		if ((action != null) && (CommCare.Constants.Compare.ActionIntersection.CampLejeune(actionID))) { 
			if (CommCare.Shared.DefaultContactRecord == null) {
				CommCare.Shared.GetDefaultContactPromise().then(function (contact) {
					CommCare.Shared.SetFieldValue("customerid", contact);
				});
			}
			else {
				CommCare.Shared.SetFieldValue("customerid", CommCare.Shared.DefaultContactRecord);
			}
			//CommCare.Shared.SetFieldValue("customerid", lookupValue);
			setVisibleOnMultipleFields(["hac_veteranname_text", "hac_veteranssn_text"], true);
			setRequiredOnMultipleFields(["hac_veteranname_text", "hac_veteranssn_text"], "required");
		}
		else {
			setVisibleOnMultipleFields(["hac_veteranname_text", "hac_veteranssn_text"], false);
			setRequiredOnMultipleFields(["hac_veteranname_text", "hac_veteranssn_text"], "none");
		}
	}

	function brSetC4QuickCreate() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		if (lobName === "Customer Experience") { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["ccwf_homefacility"], true);
			setVisibleOnMultipleFields(["hac_teamid", "hac_boc_text", "hac_pdinumber_text", "ccwf_claimnumber_text"], false);
		}
		else {
			//setVisibleOnMultipleFields(["ccwf_homefacility", "vhacrm_requestnotes_memo", "mcs_millbillrulingnotes"], false);
			setVisibleOnMultipleFields(["ccwf_homefacility", "mcs_millbillrulingnotes"], false);
		}
	}
	function brShowDateAssignedToCSCSupervisors() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var assignToSupervisors = CommCare.Shared.GetFieldValue("vhacrm_assigntocscsupervisors_bool");
		if ((assignToSupervisors === CommCare.Constants.Integers.TwoOptions.Yes)) {
			setVisibleOnMultipleFields(["vhacrm_assignedtocscsupervisors_date"], true);
		}
		else {
			//Clear out supervisor assigned date when assignToSupervisors is No
			setVisibleOnMultipleFields(["vhacrm_assignedtocscsupervisors_date"], false);
			CommCare.Shared.SetFieldValue("vhacrm_assignedtocscsupervisors_date", null);
		}
	}

	function brShowHideAppointmentDateTime() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue); CRMCC-7217
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action); // fixed action CCCRM7217
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = getLookupName(programType);
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);

		if (programTypeName == "C6" || programTypeName == CommCare.Shared.Constants.C3Name) { // fix? from testing string to GUID
			if (purposeDetailName == "VA Facility") {
				CommCare.Shared.SetVisible("hrc_facilityid", true);
				CommCare.Shared.SetRequired("hrc_facilityid", "required");
			}
			//else if (actionName == "Facility Follow Up") { // fixed action CCCRM7217
			else if (CommCare.Constants.Compare.ActionIntersection.FacilityFollowUp(actionID)) {
				CommCare.Shared.SetVisible("hrc_facilityid", true);
				var fieldList = ["vhacrm_appointmentdatetime_date", "hrc_facilityid"];
				setRequiredOnMultipleFields(fieldList, "required");
				setVisibleOnMultipleFields(fieldList, true);
			}
			else {
				CommCare.Shared.SetVisible("hrc_facilityid", true);
				CommCare.Shared.SetRequired("hrc_facilityid", "none");
			}
		}
		//else if ((purposeName === "Appointments") && (actionName === "Modify Appointment")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((CommCare.Constants.Compare.PurposeIntersection.Appointments(purposeID)) &&
			(CommCare.Constants.Compare.ActionIntersection.ModifyAppointment(actionID))) { 
			setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
			setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "required");
		}
		//else if ((purposeName === "Appointments") && (actionName === "Cancel Appointment")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((CommCare.Constants.Compare.PurposeIntersection.Appointments(purposeID)) &&
			(CommCare.Constants.Compare.ActionIntersection.CancelAppointment(actionID))) {
			setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
			setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "required");
		}
		//else if ((purposeName === "Appointments") && (actionName === "Create Appointment")) { // fixed from testing string to GUID CRMCC-7217// fixed action CCCRM7217
		else if ((CommCare.Constants.Compare.PurposeIntersection.Appointments(purposeID)) &&
			(CommCare.Constants.Compare.ActionIntersection.CreateAppointment(actionID))) { 
			setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
			setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "none");
		}
		//else if ((purposeName === "Authorizations/Referrals") && (actionName === "Create Appointment")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if (CommCare.Constants.Compare.PurposeIntersection.AuthorizationsReferrals(purposeID) &&
			(CommCare.Constants.Compare.ActionIntersection.CreateAppointment(actionID))) {
			setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
			setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "none");
		}
		//else if ((purposeName === "Authorizations/Referrals") && (actionName === "Modify Appointment")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if (CommCare.Constants.Compare.PurposeIntersection.AuthorizationsReferrals(purposeID) &&
			(CommCare.Constants.Compare.ActionIntersection.ModifyAppointment(actionID))) {
			setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
			setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "required");
		}
		//else if ((purposeName === "Authorizations/Referrals") && (actionName === "Cancel Appointment")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if (CommCare.Constants.Compare.PurposeIntersection.AuthorizationsReferrals(purposeID) &&
			(CommCare.Constants.Compare.ActionIntersection.CancelAppointment(actionID))) {
			setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
			setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "required");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], false);
			setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "none");
		}
	}
	function brShowHideCorrespondenceType() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((actionName === "Send Correspondence") && (purposeName === "Emergent Care Notification") && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		if ((actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(purposeID != null && CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID)) &&
			(lobName === "Customer Experience")) {
			setVisibleOnMultipleFields(["vhacrm_correspondencetype_code"], true);
			setRequiredOnMultipleFields(["vhacrm_correspondencetype_code"], "required");
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_correspondencetype_code"], false);
			setRequiredOnMultipleFields(["vhacrm_correspondencetype_code"], "none");
		}
	}
	//keep following function uncommented
	function brShowHideMakeRequiredDisableIfLOBIsOCCFM() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;
		var tin = CommCare.Shared.GetFieldValue("ccwf_tin_text");
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		if (lobName === "OCC FM") { // fix? from testing string to GUID
			if (tin != null) {
				setVisibleOnMultipleFields(["ccwf_tin_text"], true);
			}
			else {
				setVisibleOnMultipleFields(["ccwf_tin_text"], false);
			}
			setVisibleOnMultipleFields(["ccwf_ssn_text", "vhacrm_dateofbirth_date"], true);
			setVisibleOnMultipleFields(["vhacrm_stationwithactivityid", "vhacrm_stationtobeloadedtoid", "ccwf_tinvendorization",
				"vhacrm_cpacid", "ccwf_visn", "vhacrm_subareaintersectionid", "vhacrm_noncoredetail_code", "vhacrm_noncorevisndetailid",
				"ccwf_homefacility", "ccwf_providerfacility_text",
				"vhacrm_provideraddressline1_text", "vhacrm_providercity_text", "vhacrm_providerstateid", "vhacrm_providerzip_text",
				"ccwf_programid", "hrc_facilityid", "vhacrm_visnid", "vhacrm_recipient_code"], false);
			setRequiredOnMultipleFields(["hrc_facilityid", "ccwf_providerfacility_text"], "none");
			setReadOnlyOnMultipleFields(["ccwf_issuerequestor_code"], true);

			if (programTypeName == "PRRT") {
				MasterProviderTIN();
				return;
			}
		}
	}
	//TODO - Combine with the next function - which is written inefficiently but could be combined with this given thought
	function brCCRShowHideOtherReason() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var routingReason = CommCare.Shared.GetFieldValue("vhacrm_routingreason_code");
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}

		//if ((routingReason === CommCare.Constants.Integers.RoutingReason.Other) && (actionName === "Authorizations/Referrals Investigation")) { // fixed from testing string to GUID // fixed action CCCRM7217
		if ((routingReason === CommCare.Constants.Integers.RoutingReason.Other) && actionID != null && 
			(CommCare.Constants.Compare.ActionIntersection.AuthorizationsReferralsInvestigation(actionID))) {  
			setVisibleOnMultipleFields(["vhacrm_otherreason_text"], true);
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_otherreason_text"], false);
		}
	}
	//Merge above other reason function
	function brShowHideOtherReason() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var routingReason = CommCare.Shared.GetFieldValue("vhacrm_routingreason_code");
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((routingReason === CommCare.Constants.Integers.RoutingReason.Other) && (actionName === "Authorizations/Referrals Investigation") && (lobName === "Customer Experience")) { // fixed from testing string to GUID // fixed action CCCRM7217
		if ((routingReason === CommCare.Constants.Integers.RoutingReason.Other) && actionID != null && 
			(CommCare.Constants.Compare.ActionIntersection.AuthorizationsReferralsInvestigation(actionID)) &&
			(lobName === "Customer Experience")) { 
			setVisibleOnMultipleFields(["vhacrm_otherreason_text"], true);
		}
		else if ((routingReason === CommCare.Constants.Integers.RoutingReason.Other) && (lobName === "Customer Experience")) { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["vhacrm_otherreason_text"], true);
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_otherreason_text"], false);
		}
	}
	//Should this be triggered on the resolution intersection onChange
	function brShowHideOtherReasonResolution() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var queueResolution = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
		var queueResolutionName;

		if (queueResolution != null) {
			queueResolutionName = CommCare.Shared.DialogNameReturn(queueResolution[0].name);
		}

		if (queueResolutionName === "Unable to complete Referral - Other") { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["vhacrm_otherreasonresolution_text"], true);
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_otherreasonresolution_text"], false);
		}
	}
	//TODO - candidate for merge with next function - Merge Recipient
	function brShowHideRecipient() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((actionName === "Send Correspondence") && (lobName === "Customer Experience")) { // fixed from testing string to GUID // fixed action CCCRM7217
		if ((actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(lobName === "Customer Experience")) { 
			setVisibleOnMultipleFields(["vhacrm_recipient_code"], true);
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_recipient_code"], false);
		}
	}
	//Merge Recipient
	function brCCRShowHideRecipient() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}

		//if (actionName === "Send Correspondence") { // fixed action CCCRM7217
		if (actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) { 
			setVisibleOnMultipleFields(["vhacrm_recipient_code"], true);
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_recipient_code"], false);
		}
	}
	//TODO merge with following function - Merge Routing Reason
	function brShowHideRoutingReason() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName;
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		if (lobName !== "Customer Experience") { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["vhacrm_routingreason_code"], false);
		}
		//else if (actionName === "Authorizations/Referrals Investigation") { // fixed action CCCRM7217
		else if (actionID != null || CommCare.Constants.Compare.ActionIntersection.AuthorizationsReferralsInvestigation(actionID)) { 
			setVisibleOnMultipleFields(["vhacrm_routingreason_code"], true);
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_routingreason_code"], false);
		}
	}
	// Merge Routing Reason
	function brCCRShowHideRoutingReason() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}

		//if (actionName === "Authorizations/Referrals Investigation") { // fixed action CCCRM7217
		if (CommCare.Constants.Compare.ActionIntersection.AuthorizationsReferralsInvestigation(actionID)) {
			setVisibleOnMultipleFields(["vhacrm_routingreason_code"], true);
		}
		else {
			setVisibleOnMultipleFields(["vhacrm_routingreason_code"], false);
		}
	}
	function brShowHideTINVendorization() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName;

		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (lob != null) {
			lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
		}

		//if ((purposeName === "Vendorization") && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.Vendorization(purposeID)) &&
			(lobName === "Customer Experience")) {
			setVisibleOnMultipleFields(["ccwf_tinvendorization"], true);
			setRequiredOnMultipleFields(["ccwf_tinvendorization"], "required");
		}
		else {
			setVisibleOnMultipleFields(["ccwf_tinvendorization"], false);
			setRequiredOnMultipleFields(["ccwf_tinvendorization"], "none");
		}
	}
	function constructClaimStatusReportPurposeDetailObject() {
		//construct object to pass into SetFieldValue
		var lookupValue = new Array();
		lookupValue[0] = new Object();
		lookupValue[0].id = CommCare.Constants.GUIDS.PurposeDetail.ClaimStatusReport;
		lookupValue[0].name = "Claim Status Report";
		lookupValue[0].entityType = "vhacrm_subareaintersection";
		return lookupValue;
	}
	function setPurposeDetailOnRequestActionChangeToClaimStatusReport() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName; // fixed action CCCRM7217
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName; CRMCC-7217
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName;

		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name); // fixed action CCCRM7217
		//}
		//if (purposeValue != null) { CRMCC-7217
		//	purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//}
		if (purposeDetailValue != null) {
			purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
		}

		//if ((purposeName === "Claim Status") && (purposeDetailName !== "Claim Status Report") && (actionName === "Claim Status Report")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(purposeDetailName !== "Claim Status Report") &&
			(CommCare.Constants.Compare.ActionIntersection.ClaimStatusReport(actionID))) {
			CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", constructClaimStatusReportPurposeDetailObject());
		}
	}

	function launchTask(requestId) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var taskId;
		var columns = "activityid,hac_type_code,subject";
		var filter = "$filter=_regardingobjectid_value eq " + requestId + "&$orderby=createdon desc";

		CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("tasks", columns, filter).then(function (task) {
			if (task.value.length > 0) {
				taskId = task.value[0].activityid;
				var taskSubject = task.value[0].subject;
				var taskType = task.value[0].hac_type_code;
				var validComplaintSubjects = ["24-Hour Contact", "Follow Up", "CL1 - 24-Hour Contact Task", "CL2 - 24-Hour Contact Task", "CL1 - Follow Up Task", "CL2 - Follow Up Task"]
				var selectedForm;

				//var actionTypeForm = "62d16774-b6ab-4a60-9702-2f87186559cf"; // fixed GUID CRMCC-7217
				var actionTypeForm = CommCare.Constants.GUIDS.FormType.Action;
				//var complaintTypeForm = "5533fa60-3ff8-44ca-8769-f29ead946c98"; // fixed GUID CRMCC-7217
				var complaintTypeForm = CommCare.Constants.GUIDS.FormType.Complaint;

				if (taskType !== null) {
					//selectedForm = taskType == 806860000 ?  actionTypeForm CRMCC-7217
					selectedForm = taskType == CommCare.Constants.Integers.TaskType.ActionForm ? actionTypeForm
						//: taskType = 806860001 ? complaintTypeForm
						: taskType = CommCare.Constants.Integers.TaskType.ComplaintForm ? complaintTypeForm
							: actionTypeForm;
				}
				else if (subject !== null) {
					if (validComplaintSubjects.indexOf(subject) >= 0) {
						selectedForm = complaintTypeForm;
					}
					else {
						selectedForm = actionTypeForm;
					}
				}

				CommCare.Shared.FormContext.data.refresh(true).then(function () {
					brShowHidePriorities();
					console.log("taskId = " + taskId);
					var windowToOpen = "http://event/?eventName=OpenTask&taskid=" + taskId + "&taskformid=" + selectedForm + "&setfocus=true";

					if (parent.window.IsUSD) {
						window.open(windowToOpen);
					}
				});


			}

		}).catch(function (error) {
			console.log("Error retrieving Associated Task:");
			console.log(error)
		});
	}

	function routeActionButton() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var workflowId = "5C6C5EEA-A7AD-475E-B124-8D490478FDD9"; // fixed GUID routeActionButtonWorlFlow

		if (action == null) {
			alert("You must select an Action before attempting to route.");
		}
		else {
			//var actionName = action != null ? CommCare.Shared.DialogNameReturn(action[0].name) : null; // fixed action CCCRM7217

			//var isComplaint = actionName == "Complaint Level 1";// fixed action CCCRM7217
			var isComplaint = CommCare.Constants.Compare.ActionIntersection.ComplaintLevel1(actionID);
			var requestId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");

			if (isComplaint) {
				var columns = "activityid,hac_type_code,subject";
				var filter = "$filter=_regardingobjectid_value eq " + requestId + " and hac_type_code eq 806860001";

				CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("tasks", columns, filter).then(function (task) {
					console.log("Task successfully retrieved:");
					if (task.value.length > 0) {
						CommCare.Shared.CrmCommonJS.Notification.SetError("There is a complaint task already open, please use the existing complaint or create a new Request.", "ROUTEBUTTONERROR");
					}
					else {
						console.log("No complaint tasks found.")
						CommCare.Shared.FormContext.data.save().then(function () {
							//CommCare.Shared.ExecuteWorkflow(workflowId, requestId).then(function () {
							CommCare.Shared.ExecuteWorkflow(CommCare.Constants.GUIDS.WorkFlowID.RoutActionButton, requestId).then(function () {
								CommCare.Shared.FormContext.data.save().then(launchTask(requestId));

							}).catch(function (e) {
								console.log("Error in running workflow with message: " + e.message);
							});
						});
					}
				});
			}
			else {
				Xrm.Utility.showProgressIndicator('Adding action task, saving current record. Please wait...');// CRMCC-7492
				CommCare.Shared.FormContext.data.save().then(function () {
					Xrm.Utility.showProgressIndicator('Current record saved,setting action intersection value. Please wait...');// CRMCC-7492
					CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("hac_temp_actionintersectionid", action[0].id, action[0].name, "vhacrm_actionintersection");
					//CommCare.Shared.ExecuteWorkflow(workflowId, requestId).then(function () {
					Xrm.Utility.showProgressIndicator('Current record saved, action intersection set, starting workflow to create action task. Please wait...');// CRMCC-7492
					CommCare.Shared.ExecuteWorkflow(CommCare.Constants.GUIDS.WorkFlowID.RoutActionButton, requestId).then(function () {
						Xrm.Utility.showProgressIndicator('Action task created, saving action task data. Please wait...');// CRMCC-7492
						CommCare.Shared.FormContext.data.save().then(function () {
							Xrm.Utility.showProgressIndicator('Action task data saved. Please wait...');// CRMCC-7492
							launchTask(requestId);
							Xrm.Utility.closeProgressIndicator();// CRMCC-7492
						}).catch(function (e) {
							Xrm.Utility.closeProgressIndicator();// CRMCC-7492
							console.log("Error in running workflow with message: " + e.message);
						});
					}).catch(function (e) {
						Xrm.Utility.closeProgressIndicator();// CRMCC-7492
						console.log("Error in running workflow with message: " + e.message);
					});
				}).catch(function (e) {
					Xrm.Utility.closeProgressIndicator();// CRMCC-7492
					console.log("Error saving current record with message: " + e.message);
				});
			}
		}
	}

	function setCustomerForBOCProviders() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purpDetailName = getLookupName(purpDetail);
		var cust = CommCare.Shared.GetFieldValue("customerid");
		var custName = getLookupName(cust);
		var tin = CommCare.Shared.GetFieldValue("ccwf_tin_text");

		//var defaultContact = CommCare.Shared.DefaultContactRecord == null ? CommCare.Shared.GetDefaultContact() : CommCare.Shared.DefaultContactRecord;
		//var defaultContactName = getLookupName(defaultContact);

		if (CommCare.Shared.FormContext.ui.getFormType() == CommCare.Shared.Constants.CREATE_FORM) {
			if (purpDetailName == "Provider") {
				var columns = "accountid,name";
				var filter = "$filter=hac_tin eq '" + tin + "'";

				CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
				CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("accounts", columns, filter).then(function (retProvider) {
					console.log(retProvider)
					if (retProvider.value.length == 0) {
						var entity = {};
						entity.name = tin;
						entity.hac_tin = tin;
						CommCare.Shared.CreateRecord("accounts", entity).then(function (newRecord) {
							CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("customerid", newRecord, tin, "account");
							CommCare.Shared.SetReadOnly("ccwf_tin_text", true);
							CommCare.Shared.SetRequired("ccwf_tin_text", "required");
							OpenContactUSD(newRecord);
						});
					}
					else {
						CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("customerid", retProvider.value[0]["accountid"], tin, "account");
						CommCare.Shared.SetReadOnly("ccwf_tin_text", true);
						CommCare.Shared.SetRequired("ccwf_tin_text", "required");
						OpenContactUSD(retProvider.value[0]["accountid"]);
					}
				}).catch(function (error) {
					console.log("Error retrieving record: " + error.message);
					console.log(error);
				});
			}
		}
	}

	function OpenContactUSD(ContactId) {
		// Open the Contact form for Provider in USD
		if (parent.window.IsUSD) {
			//var providerForm = "86bca151-cd13-4e47-aede-2799b920ca2b";
			var providerForm = CommCare.Constants.GUIDS.Forms.ContactForProviderInUSD;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName = getLookupName(lob);
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //Fixed CRMCC-7217
			var purposeID = CommCare.Shared.GetCleanId(purpose);
			//var purposeName = getLookupName(purpose); //Fixed CRMCC-7217
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var programDetailName = getLookupName(purposeDetail);

			//if (lobName === "OCC FM" && purposeName == "Bill of Collections" && programDetailName == "Provider") { // fixed from testing string to GUID CRMCC-7217
			if (lobName === "OCC FM" &&
				CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID) &&
				programDetailName == "Provider") {
				windowtoOpen = "http://event/?eventName=OpenContact&setfocus=true&formid=" + providerForm + "&rectype=provider&providerid=" + ContactId;

				setTimeout(function () {
					window.open(windowtoOpen);
				}, 1500);
			}
		}
	}

	function setBOCPrefix() {
		var purpDetail = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpDetail);
		//var purpDetailName = getLookupName(purpDetail);
		var bocNumber = CommCare.Shared.GetFieldValue("hac_boc_text");

		//if (purpDetailName == "Bill of Collections" && bocNumber == null) { // fixed from testing string to GUID CRMCC-7217
		if (CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID) && bocNumber == null) {
			CommCare.Shared.SetFieldValue("hac_boc_text", "741-K")
		}
	}

	function MasterProviderTIN() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var form = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		var currentForm = form != null ? form.getId() : null;
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var providerFacility = CommCare.Shared.GetFieldValue("ccwf_providerfacility_text");
		var providerPhone = CommCare.Shared.GetFieldValue("vhacrm_provider_phoneno_text");
		var tin = CommCare.Shared.GetFieldValue("ccwf_tin_text");
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);
		var firstRequestCreated = CommCare.Shared.GetFieldValue("ccwf_firstrequestcreated");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); //Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue); CRMCC-7217
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action); // fixed action CCCRM7217
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = getLookupName(programType);
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);
		var provider = CommCare.Constants.Integers.InteractedWith.Provider;
		var vipProvider = CommCare.Constants.Integers.InteractedWith.VIPProvider;
		var cust = CommCare.Shared.GetFieldValue("customerid");
		var custName = getLookupName(cust);

		var collectionsEnum = {
			Yes: 806860000,
			No: 806860001
		};

		var fields = [
			"vhacrm_provider_phoneno_text",
			"ccwf_providerfacility_text",
			"vhacrm_patientacctno_text",
			"mcs_collectionscompany",
			"mcs_collectionsphonenumber",
			"mcs_dateenteredcollections"
		];


		var collectionsThreat = CommCare.Shared.GetFieldValue("mcs_isthisincollectionsorthreatofentering");
		var colCompany = CommCare.Shared.GetFieldValue("mcs_collectionscompany");
		var colPhone = CommCare.Shared.GetFieldValue("mcs_collectionsphonenumber");

		//This should also handle the Interacted With Scenarios
		if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME || programTypeName == "PRRT") { // fixed from testing string to GUID

			//if (programType != "Help Desk" && purposeName != "Non-Core") { // fixed from testing string to GUID CRMCC-7217
			if (programType != "Help Desk" && !CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) {
				//if ((interactedWith === provider || interactedWith === vipProvider) && actionName != "Send Correspondence" && purposeName != "Emergent Care Notification") { CRMCC-7217 // fixed action CCCRM7217
				if ((interactedWith === provider || interactedWith === vipProvider) &&
					(actionID != null && !CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
					CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID)) {
					//setRequiredOnMultipleFields(["ccwf_tin_text"], "required");

					if (providerFacility == null && tin == null) {
						if (CommCare.Shared.GetFieldValue("caseorigincode") != CommCare.Constants.Integers.Source.PATSR) {
							setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], "required");
						}
						setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);

						var setVis = (currentForm == CommCare.Constants.GUIDS.Forms.ACR) ? true : false;
						setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
						setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], setVis);
					}
					else if (providerFacility != null && tin == null) {
						setRequiredOnMultipleFields(["ccwf_tin_text"], "none");
						setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);

						setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "required");
						setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], true);
					}
					else if (providerFacility == null && tin != null) {
						setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "none");
						setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);

						setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
						setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
					}
					else if (providerFacility != null && tin != null) {
						setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "none");
						setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);

						setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
						setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
					}
					else {
						if (CommCare.Shared.GetFieldValue("caseorigincode") != CommCare.Constants.Integers.Source.PATSR) {
							setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], "required");
						}
						setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);
					}

					if (currentForm == CommCare.Constants.GUIDS.Forms.ACR) {
						if (collectionsThreat == collectionsEnum.Yes) {

							setVisibleOnMultipleFields(fields, true);

							if (!!!colCompany && !!!providerFacility) {
								CommCare.Shared.SetRequired("mcs_collectionscompany", true);
								CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

								CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
								CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
							}
							else if (!!colCompany && !!!providerFacility) {
								CommCare.Shared.SetRequired("mcs_collectionscompany", true);
								CommCare.Shared.SetRequired("ccwf_providerfacility_text", false);

								CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
								CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
							}
							else if (!!!colCompany && !!providerFacility) {
								CommCare.Shared.SetRequired("mcs_collectionscompany", false);
								CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

								CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
								CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);
							}
							else if (!!colCompany && !!providerFacility) {
								CommCare.Shared.SetRequired("mcs_collectionscompany", true);
								CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

								CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
								CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);

								if (!!colPhone || !!!providerPhone) {
									CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
									CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
								}
								else if (!!!colPhone || !!providerPhone) {
									CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
									CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);
								}

							}
						}
					}
				}
				//Handle Recipient BR here
				//else if ((interactedWith === provider || interactedWith === vipProvider) && (actionName == "Send Correspondence" || purposeName == "Emergent Care Notification")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
				else if ((interactedWith === provider || interactedWith === vipProvider) &&
					((actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) ||
					(purposeID != null && CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID)))) {
					setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], true);
					setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
					setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], "required");
					setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
				}
				else if (purposeDetailName == "In Network" || purposeDetailName == "Out of Network") { // fix? from testing string to GUID
					setVisibleOnMultipleFields(["ccwf_tin_text"], false);
					setVisibleOnMultipleFields(["ccwf_providerfacility_text", "vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], true);
					setRequiredOnMultipleFields(["ccwf_tin_text"], "none");
					setRequiredOnMultipleFields(["ccwf_providerfacility_text", "vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "required");
				}
				else if (currentForm == CommCare.Constants.GUIDS.Forms.ACR) {
					//setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);
					//setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], "none");
					setRequiredOnMultipleFields(["ccwf_providerfacility_text"], true);
					setRequiredOnMultipleFields(["ccwf_tin_text"], false);
					setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);

					if (collectionsThreat == collectionsEnum.Yes) {

						setVisibleOnMultipleFields(fields, true);

						if (!!!colCompany && !!!providerFacility) {
							CommCare.Shared.SetRequired("mcs_collectionscompany", true);
							CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

							CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
							CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
						}
						else if (!!colCompany && !!!providerFacility) {
							CommCare.Shared.SetRequired("mcs_collectionscompany", true);
							CommCare.Shared.SetRequired("ccwf_providerfacility_text", false);

							CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
							CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
						}
						else if (!!!colCompany && !!providerFacility) {
							CommCare.Shared.SetRequired("mcs_collectionscompany", false);
							CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

							CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
							CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);
						}
						else if (!!colCompany && !!providerFacility) {
							CommCare.Shared.SetRequired("mcs_collectionscompany", true);
							CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

							CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
							CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);

							if (!!colPhone || !!!providerPhone) {
								CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
								CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
							}
							else if (!!!colPhone || !!providerPhone) {
								CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
								CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);
							}
						}
					}
				}
				else {
					setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], "none");
					setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], false);

					setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
					setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
				}
				if (programTypeName == "C6" || programTypeName == CommCare.Shared.Constants.C3Name) { // fix? from testing string to GUID
					if (interactedWith == CommCare.Constants.Integers.InteractedWith.VAEmployee) {
						requireEmailOrPhoneC6();
					}
					else {
						var email = CommCare.Shared.GetFieldValue("hrc_emailaddress_text");

						if (email == null) CommCare.Shared.SetRequired("hrc_emailaddress_text", "none");
						if (email == null) CommCare.Shared.SetVisible("hrc_emailaddress_text", false);
						CommCare.Shared.SetRequired("ccwf_phone_text", "required");
						CommCare.Shared.SetVisible("ccwf_phone_text", true);
					}
				}

				var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
				if (patsrId != null) {
					CommCare.Shared.SetRequired("ccwf_phone_text", "none");
				}
			}

			if (programTypeName == "PRRT") { // fix? from testing string to GUID
				setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text", "vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text", "ccwf_providerfacility_text"], "none");
				if (tin != null) {
					setVisibleOnMultipleFields(["ccwf_tin_text"], true);
				}
			}
		}
		else if (lobName == CommCare.Shared.Constants.OCCFM_LOB_NAME) {
			//if (purposeName == "Bill of Collections" && purposeDetailName == "Provider") { // fixed from testing string to GUID CRMCC-7217
			if ((purposeID != null && CommCare.Constants.Compare.PurposeIntersection.BillOfCollections(purposeID)) && purposeDetailName == "Provider") {
				CommCare.Shared.SetRequired("ccwf_tin_text", "required");
				CommCare.Shared.SetVisible("ccwf_tin_text", true);

				setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
				setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
			}
			if (cust[0].entityType == "account") { // fix? from testing string to GUID
				CommCare.Shared.SetRequired("ccwf_tin_text", "required");
				CommCare.Shared.SetReadOnly("ccwf_tin_text", true);
				CommCare.Shared.SetVisible("ccwf_tin_text", true);
			}
		}
	}

	function hideShowEmailButton() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action); // fixed action CCCRM7217
		var methodOfDelivery = CommCare.Shared.GetFieldValue("vhacrm_methodofdelivery_code");// Method of Delivery
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue);

		//var setVis = purposeName === "Emergent Care Notification" && actionName === "Send Correspondence" && methodOfDelivery == CommCare.Constants.Integers.MethodOfDelivery.Email ? true : false // fix? from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		var setVis = CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID) &&
			(actionID != null && CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			methodOfDelivery == CommCare.Constants.Integers.MethodOfDelivery.Email ? true : false 
		CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_7").setVisible(setVis);
	}

	//METHOD OF DELIVERY REFACTOR
	function MethodOfDelivery() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		/* ONLY RUN THIS ON UPDATE FORM */
		if (CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.UPDATE_FORM)
			return;

		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action); // fixed action CCCRM7217
		var methodOfDelivery = CommCare.Shared.GetFieldValue("vhacrm_methodofdelivery_code");// Method of Delivery
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue);
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);
		var createdOn = CommCare.Shared.GetFieldValue("createdon");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);

		//if (((purposeName === "Emergent Care Notification") && (actionName === "Send Correspondence")) || actionName == "Send Documents") { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		if (((CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID)) &&
			(CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID))) ||
			CommCare.Constants.Compare.ActionIntersection.SendDocuments(actionID)) { 
			hideShowEmailButton();

			//brBeginningEndingDatesMethodOfDeliveryR6
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");

			//brMethodOfDeliverySendCorrespondenceR6
			if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Mail) {
				setVisibleOnMultipleFields(["ccwf_address1_postalcode_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_address1_city_text", "vhacrm_address1_stateid"], true);
				setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
				setRequiredOnMultipleFields(["ccwf_address1_postalcode_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "vhacrm_address1_stateid"], "required");
				setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
			}
			else if (methodOfDelivery == CommCare.Constants.Integers.MethodOfDelivery.VHIE) {
				setRequiredOnMultipleFields(
					["ccwf_fax_text",
						"vhacrm_faxattentionline_text",
						"ccwf_address1_postalcode_text",
						"vhacrm_address1_stateid",
						"ccwf_address1_city_text",
						"ccwf_address1_line1_text",
						"ccwf_address1_attentionline_text",
						"ccwf_email_text",
						"ccwf_beginningdate_date"
						, "ccwf_endingdate_date"]
					, "none");
				setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
			}
			else if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Email) {
				setVisibleOnMultipleFields(["ccwf_email_text"], true);
				if (lobName === "Customer Experience") { // fix? from testing string to GUID
					setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date", "vhacrm_address1_stateid"], false);
					setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_attentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
				}
				else {
					setVisibleOnMultipleFields(["ccwf_beginningdate_date", "ccwf_endingdate_date", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "vhacrm_faxattentionline_text", "ccwf_fax_text"], false);
					setRequiredOnMultipleFields(["ccwf_beginningdate_date", "ccwf_endingdate_date", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "vhacrm_faxattentionline_text", "ccwf_fax_text"], "none");
				}

				setRequiredOnMultipleFields(["ccwf_email_text"], "required");
			}
			else if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Fax) {
				setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], true);
				setVisibleOnMultipleFields(["ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
				setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], "required");
				setRequiredOnMultipleFields(["ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
			}
		}

		//if ((actionName === "Claim Status Report") && (purposeName === "Claim Status") && (purposeDetailName === "Claim Status Report")) { CRMCC-7217 // fixed action CCCRM7217
		if ((CommCare.Constants.Compare.ActionIntersection.ClaimStatusReport(actionID)) &&
			(CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(purposeDetailName === "Claim Status Report")) {

			//brBeginningEndingDatesMethodOfDeliveryR6
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", true);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", true);
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "required");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "required");

			//brCCRMethodOfDeliverySendCorrespondenceR6

			//brMethodOfDeliveryClaimStatusReportPFRARR6
			if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Mail) {
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], true);
				setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text"], false);
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_beginningdate_date", "ccwf_endingdate_date", "vhacrm_address1_stateid"], "required");
				setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_email_text", "vhacrm_faxattentionline_text"], "none");
			}
			else if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Email) {
				setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], true);
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "vhacrm_address1_stateid"], false);
				setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "required");
				setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text"], "none");
			}
			else if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Fax) {
				setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], true);
				setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], false);
				setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "required");
				setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], "none");
			}
		}

		if ((methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.NotClaimStatusReport)) {
			setVisibleOnMultipleFields([], true);
			setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_fax_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
			setRequiredOnMultipleFields([], "required");
			setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
		}
		//else if ((actionName === "PFRAR") && (purposeName === "Claim Status") && (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Mail) && (purposeDetailName === "Claim Status Report")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((CommCare.Constants.Compare.ActionIntersection.PFRAR(actionID)) &&
			(CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Mail) &&
			(purposeDetailName === "Claim Status Report")) {
			setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text"], true);
			setVisibleOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_email_text"], false);
			if (lobName === "Customer Experience") { // fix? from testing string to GUID
				setRequiredOnMultipleFields(["vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_endingdate_date"], "none");
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_postalcode_text"], "required");
			}
			else {
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text"], "required");
				setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_email_text"], "none");
			}
		}
		//else if ((actionName === "PFRAR") && (purposeName === "Claim Status") && (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Fax) && (purposeDetailName === "Claim Status Report") && (lobName === "Customer Experience")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((CommCare.Constants.Compare.ActionIntersection.PFRAR(actionID)) &&
			(CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Fax) &&
			(purposeDetailName === "Claim Status Report") &&
			(lobName === "Customer Experience")) {
			setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "vhacrm_faxattentionline_text", "ccwf_fax_text"], true);
			setVisibleOnMultipleFields(["ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], false);
			setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text"], "required");
			setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], "none");
		}
		//brCCRMethodOfDeliveryClaimStatusReportPFRARR6
		//else if ((createdOn != null) && (actionName === "PFRAR") && (purposeName === "Claim Status") && (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Fax) && (purposeDetailName === "Inquiry")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((createdOn != null) && (CommCare.Constants.Compare.ActionIntersection.PFRAR(actionID)) &&
			(CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID)) &&
			(methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Fax) &&
			(purposeDetailName === "Inquiry")) {
			setVisibleOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text"], true);
			setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], false);
			setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text"], "required");
			setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], "none");
		}
		//else if ((actionName === "PFRAR") && (purposeName === "Claim Status") && ((purposeDetailName === "Inquiry") || purposeDetailName === "Fraud, Waste, & Abuse")) { // fixed from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((CommCare.Constants.Compare.ActionIntersection.PFRAR(actionID)) &&
			(purposeID != null && CommCare.Constants.GUIDS.PurposeIntersection.ClaimStatusCC.toLowerCase()) &&
			((purposeDetailName === "Inquiry") ||
				purposeDetailName === "Fraud, Waste, & Abuse")) {
			//brBeginningEndingDatesMethodOfDeliveryR6
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");

			//if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Email) {
			//    setVisibleOnMultipleFields(["ccwf_email_text"], true);
			//    setVisibleOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], false);
			//    setRequiredOnMultipleFields(["ccwf_email_text"], "required");
			//    setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], "none");
			//}

			if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Mail) {
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], true);
				setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], "required");
				setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_email_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
			}
			else if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Email) {
				setVisibleOnMultipleFields(["ccwf_email_text"], true);
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
				setRequiredOnMultipleFields(["ccwf_email_text"], "required");
				setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
			}
			else if (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Fax) {
				setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], true);
				setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
				setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], "required");
				setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
			}
		}
		//brBeginningEndingDatesMethodOfDeliveryR6
		//else if ((purposeDetailName === "Inquiry") && (actionName === "PFRAR") && (lobName === "Customer Experience")) { // fixed action CCCRM7217
		else if ((purposeDetailName === "Inquiry") &&
			(CommCare.Constants.Compare.ActionIntersection.PFRAR(actionID)) &&
			(lobName === "Customer Experience")) { 
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
		}
		//else if (purposeName == "Non-Core") { // fixed from testing string to GUID CRMCC-7217
		else if (CommCare.Constants.Compare.PurposeIntersection.NonCore(purposeID)) {
			fieldList = ["ccwf_endingdate_date", "ccwf_endingdate_date"]
			setVisibleOnMultipleFields(fieldList, false);
			setRequiredOnMultipleFields(fieldList, "none");
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
		}
		//else if (actionName == "Send Documents") { // fixed action CCCRM7217
		else if (CommCare.Constants.Compare.ActionIntersection.SendDocuments(actionID)) {
			fieldList = ["ccwf_endingdate_date", "ccwf_endingdate_date"]
			setVisibleOnMultipleFields(fieldList, false);
			setRequiredOnMultipleFields(fieldList, "none");
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
		}
		//brCCRBeginningEndingDatesMethodOfDeliveryR6
		//else if ((purposeDetailName === "Inquiry") && (actionName !== "PFRAR")) { // fixed action CCCRM7217
		else if ((purposeDetailName === "Inquiry") &&
			(!CommCare.Constants.Compare.ActionIntersection.PFRAR(actionID))) {
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
		}
		//else if ((purposeDetailName === "Claim Status Report") && (actionName !== "Claim Status Report")) { // fixed action CCCRM7217
		else if ((purposeDetailName === "Claim Status Report") &&
			(!CommCare.Constants.Compare.ActionIntersection.ClaimStatusReport(actionID))) { 
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
		}
		//else if ((purposeName == null) || (actionName == null)) { CRMCC-7217
		else if ((purposeID == null) || (actionID == null)) {
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
		}
		//else if ((purposeName != "Claim Status") && (purposeName != "Emergent Care Notification")) { // fixed from testing string to GUID CRMCC-7217
		else if (!CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID) &&
			!CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID)) {
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
		}
		//else if ((purposeName === "Claim Status") && (purposeDetailName == null)) { // fix from testing string to GUID CRMCC-7217 
		else if (CommCare.Constants.Compare.PurposeIntersection.ClaimStatus(purposeID) &&
			(purposeDetailName == null)) {
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
		}
		//else if ((purposeName === "Emergent Care Notification") && (actionName !== "Send Correspondence")) { // fix from testing string to GUID CRMCC-7217 // fixed action CCCRM7217
		else if ((CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID)) &&
			(!CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID))) { 
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
		}
		//else if ((actionName !== "Send Correspondence") && (actionName !== "PFRAR") && (actionName !== "Claim Status Report")) { // fixed action CCCRM7217
		else if ((!CommCare.Constants.Compare.ActionIntersection.SendCorrespondence(actionID)) &&
			(!CommCare.Constants.Compare.ActionIntersection.PFRAR(actionID)) &&
			(!CommCare.Constants.Compare.ActionIntersection.ClaimStatusReport(actionID))) {
			CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
			CommCare.Shared.SetRequired("ccwf_address1_attentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_line1_text", "none");
			CommCare.Shared.SetRequired("ccwf_address1_city_text", "none");
			CommCare.Shared.SetRequired("vhacrm_address1_stateid", "none");
			CommCare.Shared.SetRequired("ccwf_address1_postalcode_text", "none");
			CommCare.Shared.SetRequired("vhacrm_faxattentionline_text", "none");
			CommCare.Shared.SetRequired("ccwf_fax_text", "none");
			CommCare.Shared.SetRequired("ccwf_email_text", "none");
			CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");
			CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			CommCare.Shared.SetVisible("ccwf_fax_text", false);
			CommCare.Shared.SetVisible("ccwf_email_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_postalcode_text", false);
			CommCare.Shared.SetVisible("vhacrm_address1_stateid", false);
			CommCare.Shared.SetVisible("ccwf_address1_city_text", false);
			CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
			CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
			CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
			CommCare.Shared.SetVisible("ccwf_address1_attentionline_text", false);
			CommCare.Shared.SetVisible("ccwf_address1_line1_text", false);
			CommCare.Shared.SetVisible("vhacrm_faxattentionline_text", false);
		}
		else if (methodOfDelivery == null) {

			if (lobName === "Customer Experience") { // fix? from testing string to GUID
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_email_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "ccwf_address1_city_text", "ccwf_fax_text", "vhacrm_address1_stateid"], false);
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_email_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "ccwf_address1_city_text", "ccwf_fax_text", "vhacrm_address1_stateid"], "none");
			}
			else {
				setVisibleOnMultipleFields([], true);
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_email_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "ccwf_address1_line1_text", "ccwf_fax_text", "vhacrm_address1_stateid"], false);
				setRequiredOnMultipleFields([], "required");
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_email_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "ccwf_address1_line1_text", "ccwf_fax_text", "vhacrm_address1_stateid"], "none");
			}
		}

		var cityMethodOfDelivery = CommCare.Shared.GetFieldValue("ccwf_address1_city_text");
		var stateMethodOfDelivery = CommCare.Shared.GetFieldValue("vhacrm_address1_stateid");
		var streetMethodOfDelivery = CommCare.Shared.GetFieldValue("ccwf_address1_line1_text");
		var zipMethodOfDelivery = CommCare.Shared.GetFieldValue("ccwf_address1_postalcode_text");

		var providerCity = CommCare.Shared.GetFieldValue("vhacrm_providercity_text");
		var providerState = CommCare.Shared.GetFieldValue("vhacrm_providerstateid");
		var providerStreet = CommCare.Shared.GetFieldValue("vhacrm_provideraddressline1_text");
		var providerZip = CommCare.Shared.GetFieldValue("vhacrm_providerzip_text");

		//if ((actionName === "Claim Status Report") && (methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Mail) && (lobName === "Customer Experience")) { // fixed action CCCRM7217
		if ((CommCare.Constants.Compare.ActionIntersection.ClaimStatusReport(actionID)) &&
			(methodOfDelivery === CommCare.Constants.Integers.MethodOfDelivery.Mail) &&
			(lobName === "Customer Experience")) { // fix? from testing string to GUID
			//brSetCityForMODIsMail
			if (cityMethodOfDelivery == null) {
				CommCare.Shared.SetFieldValue("ccwf_address1_city_text", providerCity);
			}
			//brSetStateForMODIsMail
			else if (stateMethodOfDelivery == null) {
				CommCare.Shared.SetFieldValue("vhacrm_address1_stateid", providerState);
			}
			//brSetStreetPOBoxForMODIsMail
			else if (streetMethodOfDelivery == null) {
				CommCare.Shared.SetFieldValue("ccwf_address1_line1_text", providerStreet);
			}
			//brSetZipForMODIsMail
			else if (zipMethodOfDelivery == null) {
				CommCare.Shared.SetFieldValue("ccwf_address1_postalcode_text", providerZip);
			}
		}
	}

	function MODRecipientHideShow() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var modCode = CommCare.Shared.GetFieldValue("vhacrm_methodofdelivery_code");
		var recipientCode = CommCare.Shared.GetFieldValue("vhacrm_recipient_code");
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//var purposeName = getLookupName(purposeValue); CRMCC-7217

		//if ((recipientCode == 810050001) && (purposeName == "Emergent Care Notification")) { //810050001 = Veteran // fixed from testing string to GUID CRMCC-7217
		if ((recipientCode == CommCare.Constants.Integers.Recipient.Veteran) &&
			CommCare.Constants.Compare.PurposeIntersection.EmergentCareNotification(purposeID)) {
			//if (modCode == 713770000) //mail CRMCC-7217
			if (modCode == CommCare.Constants.Integers.MethodOfDelivery.Mail)
				CommCare.Shared.FormContext.ui.tabs.get("tab_12").setVisible(true);
			else
				CommCare.Shared.FormContext.ui.tabs.get("tab_12").setVisible(false);

			//if (modCode == 713770001) //email CRMCC-7217
			if (modCode == CommCare.Constants.Integers.MethodOfDelivery.Email)
				CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_9").setVisible(true);
			else
				CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_9").setVisible(false);

			//if (modCode == 713770002) //fax CRMCC-7217
			if (modCode == CommCare.Constants.Integers.MethodOfDelivery.Fax)
				CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_8").setVisible(true);
			else
				CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_8").setVisible(false);
		}
		else {
			CommCare.Shared.FormContext.ui.tabs.get("tab_12").setVisible(false);
			CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_9").setVisible(false);
			CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_8").setVisible(false);
		}
	}

	function copyPQIProviderToPlaceOfService() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var posname = CommCare.Shared.GetFieldValue("mcs_placeofservicename");
		if (posname == null) {
			var name = CommCare.Shared.GetFieldValue("mcs_providername");
			CommCare.Shared.SetFieldValue("mcs_placeofservicename", name);
		}

		var posnpi = CommCare.Shared.GetFieldValue("mcs_placeofservicenpitin");
		if (posnpi == null) {
			var npi = CommCare.Shared.GetFieldValue("mcs_providernpinumber");
			CommCare.Shared.SetFieldValue("mcs_placeofservicenpitin", npi);
		}

		var posspecialty = CommCare.Shared.GetFieldValue("mcs_placeofservicespecialty");
		if (posspecialty == null) {
			var specialty = CommCare.Shared.GetFieldValue("mcs_providerspecialty");
			CommCare.Shared.SetFieldValue("mcs_placeofservicespecialty", specialty);
		}

		var posline1 = CommCare.Shared.GetFieldValue("mcs_address3line1");
		if (posline1 == null) {
			var line1 = CommCare.Shared.GetFieldValue("mcs_address2line1");
			CommCare.Shared.SetFieldValue("mcs_address3line1", line1);
		}

		var posline2 = CommCare.Shared.GetFieldValue("mcs_address3line2");
		if (posline2 == null) {
			var line2 = CommCare.Shared.GetFieldValue("mcs_address2line2");
			CommCare.Shared.SetFieldValue("mcs_address3line2", line2);
		}

		var poscity = CommCare.Shared.GetFieldValue("mcs_address3city");
		if (poscity == null) {
			var city = CommCare.Shared.GetFieldValue("mcs_address2city");
			CommCare.Shared.SetFieldValue("mcs_address3city", city);
		}

		var posstate = CommCare.Shared.GetFieldValue("mcs_address3state");
		if (posstate == null) {
			var state = CommCare.Shared.GetFieldValue("mcs_address2state");
			CommCare.Shared.SetFieldValue("mcs_address3state", state);
		}

		var poszip = CommCare.Shared.GetFieldValue("mcs_address3postalcode");
		if (poszip == null) {
			var zip = CommCare.Shared.GetFieldValue("mcs_address2postalcode");
			CommCare.Shared.SetFieldValue("mcs_address3postalcode", zip);
		}
	}

	function USD_GeneratePQIForm(context, actionName) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		GeneratePQIForm(actionName);
	}

	function GeneratePQIForm(actionName) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification("PQI");

		var requiredPQIFields = ["mcs_firstname", "mcs_lastname", "mcs_dob", "mcs_ssn", "mcs_address1line1", "mcs_address1city",
			"mcs_address1state", "mcs_address1postalcode", "mcs_providername", "mcs_address2line1", "mcs_address2city",
			"mcs_address2state", "mcs_address2postalcode", "mcs_admitservicedatefromdate", "mcs_dischargetodate", "mcs_readmit",
			"mcs_discharge", "mcs_approximatedateofpqioccurrence", "mcs_datepqiidentified", "mcs_qualityofcarepatientsafety",
			"mcs_qualityofservice", "mcs_unknown", "mcs_descriptionofevents", "mcs_completedbynametitle", "mcs_completedbynameofdepartment"];

		CommCare.Shared.FormContext.data.save().then(function () {
			var requiredFieldsPopulated = allRequiredPQIFieldsPopulated(requiredPQIFields);
			if (requiredFieldsPopulated == true) {
				callGeneratePQIFormAction(actionName);
				CommCare.Shared.CrmCommonJS.Notification.ClearNotification("PQI");
			}
			else if (requiredFieldsPopulated != true) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("Unable to generate the PQI Form. Please populate the required fields.", "PQI");
			}
		});
	}

	function callGeneratePQIFormAction(actionName) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		try {
			var id = CommCare.Shared.FormContext.data.entity.getId();
			id = id.replace('{', '').replace('}', '');

			var entityName = "incident";

			var parameters = {};
			var callGeneratePQIForm = CommCare.Shared.CallEntityAction(actionName, entityName, id, parameters);

			var generatePQIFormCallBack = callGeneratePQIForm.then(function (result) {
				if (result.OutArgument == "generated") {
					CommCare.Shared.FormContext.data.refresh();
				}
				else {
					//
				}
			});
		} catch (e) {
			console.log("Error: " + e.message);
		}
	}

	function allRequiredPQIFieldsPopulated(requiredPQIFields) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var populated = true;

		var arrayLength = requiredPQIFields.length;
		for (var i = 0; i < arrayLength; i++) {// Fix?
			if (CommCare.Shared.GetFieldValue(requiredPQIFields[i]) === null) {
				populated = false; // fix? add break;
			}
		}

		return populated;
	}

	function hideShowPatsrTabs() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];

		//RequestDescription
		//tab_8

		//change this to look at patsrid

		var source = CommCare.Shared.GetFieldValue("caseorigincode");
		var patsId = CommCare.Shared.GetFieldValue("mcs_patsrid");
		var serviceLineID = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_serviceline"));
		var patsrTab = CommCare.Shared.FormContext.ui.tabs.get("PATSR");
		var whiteHouseHLTab = CommCare.Shared.FormContext.ui.tabs.get("CommCareMetadataTab");
		var caseUpdatesTab = CommCare.Shared.FormContext.ui.tabs.get("WHHLCaseUpdates");
		var namedEmployeesTab = CommCare.Shared.FormContext.ui.tabs.get("NamedEmployees");
		var summaryTab = CommCare.Shared.FormContext.ui.tabs.get("tab_8");
		var requestDescriptionSection = null;
		if (!!summaryTab) requestDescriptionSection = summaryTab.sections.get("RequestDescription");
		//console.log(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));// sends to console CRMCC-7217
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// Uses Guid purpose on forms CRMCC-7217
		console.log("*** hideShowPatsrTabs retrieveRecord purpose:", purpose, ", has PATS-R ID of ", patsId, ", PATSR Tab exists", !!patsrTab,
			", service line is:", serviceLineID, ", WHHL Tab:", !!whiteHouseHLTab, ", HL Updates:", !!caseUpdatesTab, ", constants are available ",
			CommCare.Constants.GUIDS.ServiceLine.FMP);
		if (purpose != null) {
			Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr").then(
				function success(result) {
					//if (patsId != null /*source == CommCare.Constants.Integers.Source.PATSR*/ || result["mcs_sendtopatsr"] == true) {

					//RequestDescription
					if (patsId != null) {
						if (!!patsrTab) patsrTab.setVisible(true);
						if (!!namedEmployeesTab) namedEmployeesTab.setVisible(true);

						CommCare.Shared.SetVisible("mcs_treatmentstatus", true);
						CommCare.Shared.SetRequired("mcs_treatmentstatus", "required");
					}
					else {
						if (!!patsrTab) patsrTab.setVisible(false);
						if (!!namedEmployeesTab) namedEmployeesTab.setVisible(false);
						if (!!requestDescriptionSection) requestDescriptionSection.setVisible(false);
						CommCare.Shared.SetVisible("mcs_treatmentstatus", false);
						CommCare.Shared.SetRequired("mcs_treatmentstatus", "none");
					}
					if (result["mcs_sendtopatsr"]) {
						CommCare.Shared.SetVisible("mcs_treatmentstatus", true);
						CommCare.Shared.SetRequired("mcs_treatmentstatus", "required");
					}
				},
				function (error) {
					console.log("*** hideShowPatsrTabs retrieveRecord vhacrm_areaintersection FAILED, returned error:", error);
				}
			);
		}


	}

	function PatsrQuickCreate() {
		if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
			//var complaintAction = "bd056b6d-483a-e711-9432-0050568d1c17";
			//var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); never used

			//var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			//var lobId = CommCare.Shared.GetCleanId(lob);

			if (patsrId != null) {
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
				var fieldList = ["mcs_treatmentstatus", "mcs_callerlastname"];
				setVisibleOnMultipleFields(fieldList, true);
				CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "required");
				CommCare.Shared.SetRequired("mcs_treatmentstatus", "required");
				return;
			}

			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
			if (purpose != null) {
				var purposeID = CommCare.Shared.GetCleanId(purpose);
				//Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr").then(
				Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purposeID, "?$select=mcs_sendtopatsr").then(
					function success(result) {
						var mcs_sendtopatsr = result["mcs_sendtopatsr"];

						if (mcs_sendtopatsr == true) {
							CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
							var fieldList = ["mcs_treatmentstatus", "mcs_callerlastname"];
							setVisibleOnMultipleFields(fieldList, true);
							//CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "required");
							CommCare.Shared.SetVisible("vhacrm_requestnotes_memo", false);
							CommCare.Shared.SetRequired("mcs_treatmentstatus", "required");
						}
						else {
							CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
							var fieldList = ["mcs_treatmentstatus", "mcs_callerlastname"];
							setVisibleOnMultipleFields(fieldList, false);
							//CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "none");
							CommCare.Shared.SetVisible("vhacrm_requestnotes_memo", true);
							CommCare.Shared.SetRequired("mcs_treatmentstatus", "none");
							handleHiddenFields();
						}

						var issueResolved = CommCare.Shared.GetFieldValue("mcs_issuewasresolved")
						//if (CommCare.Shared.GetCleanId(purpose) == CommCare.Constants.GUIDS.Purpose_BILLINGCONCERN) { CRMCC-7217
						if (purposeID != null && purposeID.toLowerCase() == CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV.toLowerCase()) {
							CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", !!issueResolved);
						}
					},
					function (error) {
						console.log(error.message);
					}
				);
			}
			else {
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
				var fieldList = ["mcs_treatmentstatus", "mcs_callerlastname"];
				setVisibleOnMultipleFields(fieldList, false);
				CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "none");
				CommCare.Shared.SetRequired("mcs_treatmentstatus", "none");
				handleHiddenFields();
			}

			RequireComplaintNotesOnRequest();
		}
	}

	function RequireComplaintNotesOnRequest() {
		//var complaintAction = "37f28ecf-9d11-ed11-82e3-001dd8036776"; // fixed GUID  CRMCC-7217
		var complaintAction = CommCare.Constants.GUIDS.Actions.ComplaintLevel1;
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionId = CommCare.Shared.GetCleanId(action);
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobId = CommCare.Shared.GetCleanId(lob);
		var fieldList = ["mcs_whotocall", "mcs_besttimetocall", "mcs_complaintphonenumber", "vhacrm_requestnotes_memo"];
		var fieldList2 = ["mcs_whotocall", "mcs_besttimetocall", "mcs_complaintphonenumber"];

		if (!!actionId && lobId == CommCare.Constants.GUIDS.LOB.defaultOCCFM) {
			Xrm.WebApi.online.retrieveRecord("vhacrm_actionintersection", actionId, "?$select=_vhacrm_actionid_value,vhacrm_name").then(
				function success(result) {
					console.log(result);
					var vhacrm_actionid = result["_vhacrm_actionid_value"];

					if (complaintAction == vhacrm_actionid) {
						setVisibleOnMultipleFields(fieldList, true);
						setRequiredOnMultipleFields(fieldList, true);
					}
					else {
						setVisibleOnMultipleFields(fieldList2, false);
						setRequiredOnMultipleFields(fieldList, false);
						// 3/20/2023 This for loop was originally iterating through fieldList instead of fieldList2. 
						// This caused vhacrm_requestnotes_memo to clear its value whenever vhacrm_actionintersectionid was changed.
						for (var i = 0; i < fieldList2.length; i++) {
							var fieldVal = CommCare.Shared.GetFieldValue(fieldList2[i]);
							if (!!fieldVal)
								CommCare.Shared.SetFieldValue(fieldList2[i], null);
						}
					}
				},
				function (error) {
					console.log(error.message);
				}
			);
		}
		else if (!actionId && lobId == CommCare.Constants.GUIDS.LOB.defaultOCCFM) {
			setVisibleOnMultipleFields(fieldList2, false);
			setRequiredOnMultipleFields(fieldList, false);
			// 3/20/2023 This for loop was originally iterating through fieldList instead of fieldList2.
			// This caused vhacrm_requestnotes_memo to clear its value whenever vhacrm_actionintersectionid was changed.
			for (var i = 0; i < fieldList2.length; i++) {
				var fieldVal = CommCare.Shared.GetFieldValue(fieldList2[i]);
				if (!!fieldVal)
					CommCare.Shared.SetFieldValue(fieldList2[i], null);
			}
		}
	}

	function hideShowRequestActionSubmittedRequest() {
		console.log(CommCare.Shared.GetFieldValue("statuscode"));
		if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Constants.Integers.StatusCode.SenttoPA) {
			CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
		}

	}

	function hideShowPatsrRejectReason() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var rejectReason = CommCare.Shared.GetFieldValue("mcs_rejectreason");
		var generalTab = CommCare.Shared.FormContext.ui.tabs.get("tab_8");

		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action);
		//actionName = actionName != null ? actionName.toLowerCase() : "null";

		if (generalTab != null) {
			var section = generalTab.sections.get("RejectReason");
			if (section != null) {
				var rejectedByPatsR = action != null ? CommCare.Constants.Compare.ActionIntersection.RejectedByPATSR(actionID) : false;
				//if (rejectReason != null || actionName == "rejected by pats-r") { // fixed action CCCRM7217 from testing string to GUID fixed action same test twice?
				if (rejectReason != null || rejectedByPatsR) { 
					section.setVisible(true);
					//if (actionName == "rejected by pats-r") { // fixed action CCCRM7217 same test twice?
					if (rejectedByPatsR) {
						CommCare.Shared.SetVisible("mcs_rejectreason", false);
					}
					if (rejectReason != null) {
						CommCare.Shared.SetVisible("mcs_rejectreason", true);
					}

					var rejectCaseReason = CommCare.Shared.GetFieldValue("mcs_rejectcasereason");
					var noActionBy = CommCare.Shared.GetFieldValue("mcs_rejectednoactionby");

					CommCare.Shared.SetVisible("mcs_rejectcasereason", !!rejectCaseReason);
					CommCare.Shared.SetVisible("mcs_rejectednoactionby", !!noActionBy);
				}
				else {
					section.setVisible(false);
				}
			}
			else {
				console.log("Reject Reason Section not found");
			}
		}
		else {
			console.log("General Tab not found");
		}
	}

	function preFilterResolutionIntersections() {
		var formItem = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		if (formItem == null) {
			return;
		}
		var currentFormId = formItem.getId();
		if (currentFormId == CommCare.Constants.GUIDS.Forms.CCWF) {
			Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'RemoveResolution' and statecode eq 0").then(
				function success(results) {
					if (results.entities.length > 0) {
						var fetchXml = "<filter>";
						for (var i = 0; i < results.entities.length; i++) {
							fetchXml += "<condition attribute='vhacrm_resolutionintersectionid' operator='ne' value='" + results.entities[i]["_mcs_resolution_value"] + "' />";
						}
						fetchXml += "</filter>";
						CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addPreSearch(function () {
							//CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addCustomFilter(fetchXml);
						});
					}
				}
			);
		}
	}

	function preFilterC3Purpose() {
		//quickcreateparams
		var formItem = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		if (formItem == null) {
			return;
		}
		var currentFormId = formItem.getId();
		if (currentFormId == CommCare.Constants.GUIDS.Forms.CCWF) {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var field = CommCare.Shared.FormContext.data.attributes.get("p_patsrid");
			if (CommCare.Shared.FormContext.ui.getFormType() == CommCare.Shared.Constants.CREATE_FORM) {
				if (field != null) {
					if (CommCare.Shared.FormContext.data.attributes.get("p_patsrid").getValue() != null) {
						var fetchXml = "<filter>";
						fetchXml += "<condition attribute='mcs_sendtopatsr' operator='neq' value='1' />";
						fetchXml += "</filter>";

						CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addPreSearch(function () {
							CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addCustomFilter(fetchXml);
						});
					}
				}
			}
		}

	}

	function preFilterC3ServiceRecoveryActions() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//let purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")); //fixxed  CRMCC-7217
		//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";
		//if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid") != null) { // Called twice to the same control CRMCC-7217
		if (purpose != null) {
			//if (purposeNameFormatted.includes("service recovery")) { // fixed from testing string to GUID CRMCC-7217
			if (CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID)) {
				console.log(CommCare.Shared.GetFieldValue("bah_interactionstorequestid"));
				if (CommCare.Shared.GetFieldValue("bah_interactionstorequestid") != null) {
					Xrm.WebApi.online.retrieveRecord("bah_interactions", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("bah_interactionstorequestid")), "?$select=_bah_programtypeid_value").then(
						function success(result) {
							var _bah_programtypeid_value_formatted = result["_bah_programtypeid_value@OData.Community.Display.V1.FormattedValue"];
							if (_bah_programtypeid_value_formatted == CommCare.Shared.Constants.C3Name) { // fix? from testing string to GUID
								Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'ShowC3ServiceRecovery' and statecode eq 0").then(
									function success(results) {
										console.log(results);
										if (results.entities.length > 0) {
											var fetchXml = "<filter type='or'>";
											for (var i = 0; i < results.entities.length; i++) {
												fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + results.entities[i]["_mcs_action_value"] + "' />";
											}
											fetchXml += "</filter>";
											CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(function () {

												console.log(fetchXml);
												//CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
											});
										}
									}
								);
							}
						},
						function (error) {
							Xrm.Navigation.openAlertDialog({ text: error.message });
						}
					);
				}
			}
		}

	}

	function preFilterEscalateToTierOneReturnToVAMC() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);
		purposeDetailName = purposeDetailName != null ? purposeDetailName.toLowerCase() : "null";
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217, name not used
		//var actionName = getLookupName(action);// fixed action CCCRM7217, name not used
		//actionName = actionName != null ? actionName.toLowerCase() : "null";
		//var returnToVAMCActionId = "0549e1c3-b450-ed11-bba0-001dd8072538"; // fixed GUID CRMCC-7217
		var returnToVAMCActionId = CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCServiceRecoveryVISNVAMC;
		//var escalateToTierOneActionId = "52f870e9-b350-ed11-bba0-001dd8072538";// fixed GUID CRMCC-7217
		var escalateToTierOneActionId = CommCare.Constants.GUIDS.ActionIntersection.EscalateToTierOneServiceRecoveryVISNVAMC;
		//var returnToServiceRecoveryActionId = "e73af496-34de-ea11-a813-001dd8018866";// fixed GUID CRMCC-7217
		var returnToServiceRecoveryActionId = CommCare.Constants.GUIDS.ActionIntersection.ReturnToServiceRecoveryServiceRecoveryVISNVAMC;
		//var serviceRecoveryInvestigationActionId = "7e4b9bfe-85d6-ea11-a813-001dd8018943";// fixed GUID CRMCC-7217
		var serviceRecoveryInvestigationActionId = CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryInvestigationServiceRecoveryVISNVAMC;

		//var tierOneQueue = "5e55f8c8-648b-ec11-8d20-001dd800b6ad";// fixd GUID CRMCC-7217
		var tierOneQueue = CommCare.Constants.GUIDS.Queues.Tier1Queue;
		//var tierOneSpecialistQueue = "14f451b8-b350-ed11-bba0-001dd8072538";// fixed GUID CRMCC-7217
		var tierOneSpecialistQueue = CommCare.Constants.GUIDS.Queues.tierOneSpecialistQueue;

		console.log(CommCare.Shared.GetCleanId(action));
		console.log(purposeDetailName);
		//console.log(actionName);

		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
		if (queueItem != null) {
			Xrm.WebApi.online.retrieveRecord("queueitem", CommCare.Shared.GetCleanId(queueItem), "?$select=_queueid_value").then(
				function success(result) {
					var queueItemQueueName = result["_queueid_value@OData.Community.Display.V1.FormattedValue"];
					var queueItemQueueId = result._queueid_value;
					var isTier1 = queueItemQueueId == tierOneQueue || queueItemQueueId == tierOneSpecialistQueue;


					/*if (queueItemQueueName == "<Tier One Specialist>" || patsrId == null || purposeDetailName.indexOf("ava") > -1) {*/
					//if (isTier1 || patsrId == null || purposeDetailName.indexOf("ava") > -1) {
					//if (patsrId == null || purposeDetailName.indexOf("ava") > -1) {
					if (purposeDetailName.indexOf("ava") > -1) { // fix? from testing string to GUID
						var fetchXml = "<filter>";
						fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + escalateToTierOneActionId + "' />";
						fetchXml += "</filter>";
						CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(function () {
							CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
						});
					} /*else if (queueItemQueueName != "<Tier One Specialist>" || patsrId == null || purposeDetailName.indexOf("ava") > -1) {*/
					else if (!isTier1 || patsrId == null || purposeDetailName.indexOf("ava") > -1) { // fix? from testing string to GUID
						var fetchXml = "<filter>";
						fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + returnToVAMCActionId + "' />";
						fetchXml += "</filter>";
						CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(function () {
							CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
						});
					}

					/*if (queueItemQueueName == "<Tier One Specialist>" && CommCare.Shared.GetCleanId(action) == escalateToTierOneActionId) {*/
					if (isTier1 && CommCare.Shared.GetCleanId(action) == escalateToTierOneActionId) {
						var fetchXml = "<filter>";
						fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + returnToServiceRecoveryActionId + "' />";
						fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + serviceRecoveryInvestigationActionId + "' />";
						fetchXml += "</filter>";
						CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(function () {
							CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
						});
					}

				},
				function (error) {
					Xrm.Utility.alertDialog(error.message);
				}
			);
		}
	}

	////////////////////////////////////////////////////////////
	//combine hide/show require/unrequire fields for request based on mcs_patsrid///
	////////////////////////////////////////////////////////////


	function showHidePATSRResolutionsAndRejections(isLoad) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purposeDetail = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid"));


		if (CommCare.Request.Constants.CurrentFormType.toLowerCase() != "quickcreate") { // fix? from testing string 
			var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
			if (currentFormId != CommCare.Constants.GUIDS.Forms.CCWF)
				return;

			//Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'ShowRejectionReason' or  mcs_name eq 'ShowResolutionDescription' or mcs_name eq 'ShowWWHLResolutionTemplate'").then(
			Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'ShowRejectionReason' and statecode eq 0").then(
				function success(results) {
					var matchingSection = [];
					var matchingField = [];
					var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
					//if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid") != null) { called twice // fixed action CCCRM7217
					if (action != null) {
						//var actionGuid = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); called twice // fixed action CCCRM7217
						var actionGuid = CommCare.Shared.GetCleanId(action);

						for (var i = 0; i < results.entities.length; i++) {
							var lookupFilter = results.entities[i];
							var isMatch = false;
							if (lookupFilter["_mcs_action_value"] == actionGuid) {
								if (lookupFilter.mcs_name == "ShowResolutionDescription" && purposeDetail == "White House Hotline") { // fix? from testing string to GUID
									isMatch = false;
								}
								//else if (lookupFilter.mcs_name == "ShowWWHLResolutionTemplate" && purposeDetail != "White House Hotline") {
								//	isMatch = false;
								//}
								else {
									isMatch = true;
									console.log("isMatch");
									matchingSection.push(lookupFilter.mcs_sectionname);
									matchingField.push(lookupFilter.mcs_fieldname);
								}
							}

							if (lookupFilter.mcs_sectionname && lookupFilter.mcs_tabname) {
								if (!isMatch && matchingField.includes(lookupFilter.mcs_fieldname)) {
									isMatch = true;
								}
								if (CommCare.Shared.FormContext.ui.tabs.get(lookupFilter.mcs_tabname).sections.get(lookupFilter.mcs_sectionname) != null) {
									CommCare.Shared.FormContext.ui.tabs.get(lookupFilter.mcs_tabname).sections.get(lookupFilter.mcs_sectionname).setVisible(isMatch);
									CommCare.Shared.SetRequired(lookupFilter.mcs_fieldname, isMatch);
								}

							}
						}
					} else {
						try {
							for (var i = 0; i < results.entities.length; i++) {
								var lookupFilter = results.entities[i];
								if (lookupFilter.mcs_sectionname && lookupFilter.mcs_tabname) {
									if (CommCare.Shared.FormContext.ui.tabs.get(lookupFilter.mcs_tabname).sections.get(lookupFilter.mcs_sectionname) != null) {
										CommCare.Shared.FormContext.ui.tabs.get(lookupFilter.mcs_tabname).sections.get(lookupFilter.mcs_sectionname).setVisible(false);
										CommCare.Shared.SetRequired(lookupFilter.mcs_fieldname, false);
									}
								}
							}
						} catch (ex) {
							console.log("Exception:");
							console.log(ex);
						}
					}
				},
				function (error) {
					Xrm.Navigation.openAlertDialog({ text: error.message });
				}
			);
		}
	}

	function lockFormForPatsrRejection(action) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		//var lockActions = ["Rejected - Incorrect Facility", "Rejected - Not for OCC", "Rejected - Not Actionable", "Rejected - Other", "PATS-R Approval", "Send for PATS-R Approval"]; // fixed action CCCRM7217

		//if (lockActions.indexOf(action) > -1) {// fixed action CCCRM7217
		//	CommCare.Shared.LockForm();
		//}

		var lockActions = CommCare.Constants.Compare.ActionIntersection.RejectedIncorrectFacility(action) ||
			CommCare.Constants.Compare.ActionIntersection.RejectedNotForOCC(action) ||
			CommCare.Constants.Compare.ActionIntersection.RejectedNotActionable(action) ||
			CommCare.Constants.Compare.ActionIntersection.RejectedOther(action) ||
			CommCare.Constants.Compare.ActionIntersection.PATSRApproval(action) ||
			CommCare.Constants.Compare.ActionIntersection.SendForPATSRApproval(action);
		if (lockActions) {
			CommCare.Shared.LockForm();
		}
	}

	function hideShowQueueResolution() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var actionIntersectionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); // gets GUID only

		if (actionIntersectionId != null) {
			Xrm.WebApi.online.retrieveRecord("vhacrm_actionintersection", actionIntersectionId, "?$select=mcs_filterqueueresolutionsbyactions").then(
				function success(result) {
					var mcs_filterqueueresolutionsbyactions = result["mcs_filterqueueresolutionsbyactions"];
					console.log(result);
					if (mcs_filterqueueresolutionsbyactions) {
						if (CommCare.Shared.FormContext.ui.tabs.get("tab_8") != null) {
							if (CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("general_section_resolution") != null) {
								CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("general_section_resolution").setVisible(false);
							}
							if (CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("QueueResolutionAction") != null) {
								CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("QueueResolutionAction").setVisible(true);
							}
						}
					} else {
						if (CommCare.Shared.FormContext.ui.tabs.get("tab_8") != null) {
							if (CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("general_section_resolution") != null) {
								CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("general_section_resolution").setVisible(true);
							}
							if (CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("QueueResolutionAction") != null) {
								CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("QueueResolutionAction").setVisible(false);
							}
						}
					}
				},
				function (error) {
					Xrm.Utility.alertDialog(error.message);
				}
			);
		} else {
			if (CommCare.Shared.FormContext.ui.tabs.get("tab_8") != null) {
				if (CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("general_section_resolution") != null) {
					CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("general_section_resolution").setVisible(true);
				}
				if (CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("QueueResolutionAction") != null) {
					CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("QueueResolutionAction").setVisible(false);
				}
			}
		}

	}

	function hideShowVSignalsInfo() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("--> " + fName);
		var formItem = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		if (formItem == null) {
			return;
		}
		var currentFormId = formItem.getId();
		if (currentFormId == CommCare.Constants.GUIDS.Forms.CCWF) {
			var vsignalTab = CommCare.Shared.FormContext.ui.tabs.get("VSignals");
			//var patsrTab = CommCare.Shared.FormContext.ui.tabs.get("PATSR");
			//var namedEmployeeTab = CommCare.Shared.FormContext.ui.tabs.get("NamedEmployees");
			Xrm.WebApi.online.retrieveMultipleRecords("mcs_vsignalssurveytype",
				"?$filter=mcs_name eq 'Attending Community Care' or  mcs_name eq 'ATTENDING VA CC' or  mcs_name eq 'BILLING QUESTIONS VA CC' or  mcs_name eq 'CHOOSING VA CC' or  mcs_name eq 'FINANCIAL RESPONSIBILITY VA CC' or  mcs_name eq 'PRESCRIPTION VA CC' or  mcs_name eq 'SCHEDULING VA CC'").then(
					function success(results) {
						var validVSignal = false;
						//var vSignalId = CommCare.Shared.GetFieldValue("mcs_vsignalssurveytype");
						//if (vSignalId != null) {
						//	for (var i = 0; i < results.entities.length; i++) {
						//		if (results.entities[i]["mcs_vsignalssurveytypeid"] == CommCare.Shared.GetCleanId(vSignalId)) {
						//			validVSignal = true;
						//		}
						//	}
						//}
						var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
						var purposeDetailName = getLookupName(purposeDetailValue);
						if (purposeDetailName != null) {
							if (purposeDetailName.indexOf("V-Signals") > -1) {
								validVSignal = true;
							}
						}



						//setTimeout(function () { vsignalTab.setVisible(validVSignal); }, 2000);

						vsignalTab.setVisible(validVSignal);
						CommCare.Shared.SetVisible("mcs_patsrprioritylist", validVSignal);
						CommCare.Shared.SetVisible("mcs_patsrduedate", validVSignal);
						CommCare.Shared.SetRequired("mcs_patsrprioritylist", validVSignal);
						CommCare.Shared.SetRequired("mcs_patsrduedate", validVSignal);
						CommCare.Shared.SetOnChange("mcs_patsrprioritylist", setPatsDueDateFromPriority);
						CommCare.Shared.SetOnChange("mcs_patsrduedate", disallowInvalidPatsDueDates);
					},
					function (error) {
						Xrm.Navigation.openAlertDialog({ text: error.message });
					}
				);
		}

	}

	function disallowInvalidPatsDueDates() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);

		if (CommCare.Shared.GetFieldValue("mcs_patsrduedate") != null) {
			var maxDays = 0;
			var now = new Date();
			var priorityDate = new Date();
			var dateDiff = 0;
			var mcs_GetFederalHolidaysRequest = {
				getMetadata: function () {
					return {
						boundParameter: null,
						parameterTypes: {},
						operationType: 0,
						operationName: "mcs_GetFederalHolidays"
					};
				}
			};
			Xrm.WebApi.online.execute(mcs_GetFederalHolidaysRequest).then(
				function success(result) {
					if (result.ok) {
						return result.json();
					}
				}).then(function (responseBody) {
					var holidayArray = [];
					if (!!responseBody.holidayCSV) {
						var array = responseBody.holidayCSV.split(",");
						for (var i = 0; i < array.length; i++) {
							if (array[i] != "") {
								var currentDate = new Date(array[i]);
								holidayArray.push(currentDate.toISOString().split('T')[0]);
							}
						}
					}
					console.log(holidayArray);

					switch (CommCare.Shared.GetFieldValue("mcs_patsrprioritylist")) {
						case CommCare.Constants.Integers.PatsrPriority.Crisis0Day:
							break;
						case CommCare.Constants.Integers.PatsrPriority.Emergent1Day:
							priorityDate = addWeekdaysOnlyToDate(priorityDate, 1, holidayArray)
							dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
							maxDays = dateDiff;
							//maxDays += 1;
							break;
						case CommCare.Constants.Integers.PatsrPriority.Urgent3Day:
							priorityDate = addWeekdaysOnlyToDate(priorityDate, 3, holidayArray)
							dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
							maxDays = dateDiff;
							//maxDays += 3;
							break;
						case CommCare.Constants.Integers.PatsrPriority.General7Day:
							priorityDate = addWeekdaysOnlyToDate(priorityDate, 7, holidayArray)
							dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
							maxDays = dateDiff;
							//maxDays += 7;
							break;
						case CommCare.Constants.Integers.PatsrPriority.ReviewPriority21Day:
							priorityDate = addWeekdaysOnlyToDate(priorityDate, 21, holidayArray)
							dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
							maxDays = dateDiff;
							//maxDays += 21;
							break;
						case CommCare.Constants.Integers.PatsrPriority.Correspondence30Day:
							priorityDate = addWeekdaysOnlyToDate(priorityDate, 30, holidayArray)
							dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
							maxDays = dateDiff;
							//maxDays += 30;
							break;
						case CommCare.Constants.Integers.PatsrPriority.Appeals45Day:
							priorityDate = addWeekdaysOnlyToDate(priorityDate, 45, holidayArray)
							dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
							maxDays = dateDiff;
							//maxDays += 45;
							break;
						case CommCare.Constants.Integers.PatsrPriority.Investigation60Day:
							priorityDate = addWeekdaysOnlyToDate(priorityDate, 60, holidayArray)
							dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
							maxDays = dateDiff;
							//maxDays += 60;
							break;
					}

					if (CommCare.Shared.GetFieldValue("mcs_patsrduedate").setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
						CommCare.Shared.FormContext.getControl("mcs_patsrduedate").setNotification("A due date that is on or after today is required.", "duedatevalidation");
					} else if (CommCare.Shared.GetFieldValue("mcs_patsrduedate").setHours(0, 0, 0, 0) > now.setDate(now.getDate() + maxDays + 1)) {
						CommCare.Shared.FormContext.getControl("mcs_patsrduedate").setNotification("A due date that is on or before the priority date is required.", "duedatevalidation");
					} else {
						CommCare.Shared.FormContext.getControl("mcs_patsrduedate").clearNotification("duedatevalidation");
					}

				}).catch(function (error) {
					console.log(error.message);
				});
		} else {
			CommCare.Shared.FormContext.getControl("mcs_patsrduedate").clearNotification("duedatevalidation");
		}
	}

	function setPatsDueDateFromPriority() {
		console.log(CommCare.Shared.GetFieldValue("mcs_patsrprioritylist"));
		var mcs_GetFederalHolidaysRequest = {
			getMetadata: function () {
				return {
					boundParameter: null,
					parameterTypes: {},
					operationType: 0,
					operationName: "mcs_GetFederalHolidays"
				};
			}
		};
		// CRMCC-7110 - removed "return" from Web API call
		/*return*/ Xrm.WebApi.online.execute(mcs_GetFederalHolidaysRequest).then(
			function success(result) {
				if (result.ok) {
					return result.json();
				}
			}).then(function (responseBody) {
				var holidayArray = [];
				if (!!responseBody.holidayCSV) {
					var array = responseBody.holidayCSV.split(",");
					for (var i = 0; i < array.length; i++) {
						if (array[i] != "") {
							var currentDate = new Date(array[i]);
							holidayArray.push(currentDate.toISOString().split('T')[0]);
						}
					}
				}
				console.log(holidayArray);
				// CRMCC-7696
				// var now = new Date();
				var createdOn = CommCare.Shared.GetFieldValue("createdon");
				switch (CommCare.Shared.GetFieldValue("mcs_patsrprioritylist")) {
					case CommCare.Constants.Integers.PatsrPriority.Crisis0Day:
						break;
					case CommCare.Constants.Integers.PatsrPriority.Emergent1Day:
						createdOn = addWeekdaysOnlyToDate(createdOn, 1, holidayArray);
						break;
					case CommCare.Constants.Integers.PatsrPriority.Urgent3Day:
						createdOn = addWeekdaysOnlyToDate(createdOn, 3, holidayArray);
						break;
					case CommCare.Constants.Integers.PatsrPriority.General7Day:
						createdOn = addWeekdaysOnlyToDate(createdOn, 7, holidayArray);
						break;
					case CommCare.Constants.Integers.PatsrPriority.ReviewPriority21Day:
						createdOn = addWeekdaysOnlyToDate(createdOn, 21, holidayArray);
						break;
					case CommCare.Constants.Integers.PatsrPriority.Correspondence30Day:
						createdOn = addWeekdaysOnlyToDate(createdOn, 30, holidayArray);
						break;
					case CommCare.Constants.Integers.PatsrPriority.Appeals45Day:
						createdOn = addWeekdaysOnlyToDate(createdOn, 45, holidayArray);
						break;
					case CommCare.Constants.Integers.PatsrPriority.Investigation60Day:
						createdOn = addWeekdaysOnlyToDate(createdOn, 60, holidayArray);
						break;
				}
				CommCare.Shared.SetFieldValue("mcs_patsrduedate", typeof (createdOn) == "object" ? createdOn : new Date(createdOn));
				CommCare.Shared.FormContext.getAttribute("mcs_patsrduedate").fireOnChange();


			}).catch(function (error) {
				console.log(error.message);
			});
	}

	function addWeekdaysOnlyToDate(input, days, Holidays) {
		var i = 1;
		var j = 1;
		var nextDate;

		while (i <= days) {
			nextDate = new Date(input);
			nextDate = typeof (nextDate) == "object" ? nextDate : new Date(nextDate);

			nextDate = nextDate.setDate(nextDate.getDate() + j);

			nextDate = typeof (nextDate) == "object" ? nextDate : new Date(nextDate);
			var nextDateDayOfWeek = nextDate.getDay();

			if (nextDateDayOfWeek != 0 && nextDateDayOfWeek != 6 && !isInDateArray(new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate()), Holidays)) {
				i++;
			}
			j++;
		}

		//return input.setDate(input.getDate() + j);
		return nextDate.setDate(nextDate.getDate());
		//var Holidays = [];
		//Holidays2022.push(new Date(2022, 0, 17));
		//Holidays2022.push(new Date(2022, 1, 21));
		//Holidays2022.push(new Date(2022, 4, 30));
		//Holidays2022.push(new Date(2022, 5, 20));
		//Holidays2022.push(new Date(2022, 6, 4));
		//Holidays2022.push(new Date(2022, 8, 5));
		//Holidays2022.push(new Date(2022, 9, 10));
		//Holidays2022.push(new Date(2022, 10, 11));
		//Holidays2022.push(new Date(2022, 10, 24));
		//Holidays2022.push(new Date(2022, 11, 26));
		//Holidays.push("2022-01-17");
		//Holidays.push("2022-02-21");
		//Holidays.push("2022-05-30");
		//Holidays.push("2022-06-20");
		//Holidays.push("2022-07-04");
		//Holidays.push("2022-09-05");
		//Holidays.push("2022-10-10");
		//Holidays.push("2022-11-11");
		//Holidays.push("2022-11-24");
		//Holidays.push("2022-12-26");

		//var mcs_GetFederalHolidaysRequest = {
		//	getMetadata: function () {
		//		return {
		//			boundParameter: null,
		//			parameterTypes: {},
		//			operationType: 0,
		//			operationName: "mcs_GetFederalHolidays"
		//		};
		//	}
		//};
		//return Xrm.WebApi.online.execute(mcs_GetFederalHolidaysRequest).then(
		//	function success(result) {
		//		if (result.ok) {
		//			return result.json();
		//		}
		//	}).then(function (responseBody) {
		//		console.log(responseBody);
		//		var holidayArray = [];
		//		if (!!responseBody.holidayCSV) {
		//			holidayArray = responseBody.holidayCSV.split(",");
		//			for (var i = 0; i < holidayArray.length; i++) {
		//				var currentDate = new Date(holidayArray[i]);
		//				Holidays.push(currentDate.toISOString());
		//				console.log(currentDate.toISOString().split('T')[0]);
		//                  }
		//		}
		//		console.log(holidayArray);



		//	}).catch(function (error) {
		//		console.log(error.message);
		//	});


	}

	function isInDateArray(date, dateArray) {
		var checkDate = dateArray.filter(x => x == date.toISOString().split('T')[0]);
		return checkDate.length > 0;
	}

	function showHideDocumentReceiptDateQC() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") { // fix? from testing string to GUID
			if (CommCare.Shared.GetFieldValue("vhacrm_lobid") != null) {
				if (CommCare.Shared.GetFieldValue("vhacrm_lobid")[0]["name"].includes("FM")) {
					CommCare.Shared.SetVisible("mcs_requestdocumentreceiptdate", true);
				} else {
					CommCare.Shared.SetVisible("mcs_requestdocumentreceiptdate", false);
				}
			}
		}
	}

	function showHideTaskTitle() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var showTaskTitle = false;
		var requireTaskTitle = false;
		var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);

		//if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid") != null) { Calls the same control twice? CRMCC-7217
		if (purposeID != null) {
			//var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));Calls the same control twice? CRMCC-7217
			//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";  CRMCC-7217
			//if (purposeNameFormatted.includes("service recovery")) { // fixed from testing string to GUID CRMCC-7217
			if (CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID)) {
				showTaskTitle = true;
				if (patsrId == null) {
					requireTaskTitle = true;
				}
			}
		}
		CommCare.Shared.SetVisible("mcs_tasktitle", showTaskTitle);
		CommCare.Shared.SetRequired("mcs_tasktitle", requireTaskTitle);
		CommCare.Shared.SetRequired("ccwf_duedate_date", showTaskTitle);

	}

	function disallowPastDueDates() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")); Fixed CRMCC-7217
		//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : ""; CRMCC-7217
		//if (CommCare.Shared.GetFieldValue("ccwf_duedate_date") != null && !purposeNameFormatted.includes("service recovery")) { // fixed from testing string to GUID CRMCC-7217
		if (CommCare.Shared.GetFieldValue("ccwf_duedate_date") != null && !CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID)) {
			if (CommCare.Shared.GetFieldValue("ccwf_duedate_date").setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
				CommCare.Shared.FormContext.getControl("ccwf_duedate_date").setNotification("A due date that is on or after today is required.", "duedatevalidation");
			} else {
				CommCare.Shared.FormContext.getControl("ccwf_duedate_date").clearNotification("duedatevalidation");
			}
		} else {
			CommCare.Shared.FormContext.getControl("ccwf_duedate_date").clearNotification("duedatevalidation");
		}
	}

	function disallowFutureDocumentReceiptDates() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		if (CommCare.Shared.GetFieldValue("mcs_requestdocumentreceiptdate") != null) {
			var newReceiptDate = CommCare.Shared.GetFieldValue("mcs_requestdocumentreceiptdate").setHours(0, 0, 0, 0);
			if (newReceiptDate > new Date().setHours(0, 0, 0, 0)) {
				CommCare.Shared.FormContext.getControl("mcs_requestdocumentreceiptdate").setNotification("A document receipt date that is on or before today is required.", "documentreceiptdatevalidation");
			} else {
				CommCare.Shared.FormContext.getControl("mcs_requestdocumentreceiptdate").clearNotification("documentreceiptdatevalidation");
			}
		} else {
			CommCare.Shared.FormContext.getControl("mcs_requestdocumentreceiptdate").clearNotification("documentreceiptdatevalidation");
		}
	}

	async function lockTaskTitleAndDueDate() {

		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		var globalContext = Xrm.Utility.getGlobalContext();
		// var results = await Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + globalContext.userSettings.userId.replace("{", "").replace("}", "").toLowerCase()); //.then( CRMCC-7149 then CRMCC-7181
		var lockTaskTitleDuelDate = true;
		var facility = CommCare.Shared.GetFieldValue("hrc_facilityid");
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var actionID = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); // moved up from below fixed action CCCRM7217
		if (await CommCare.Shared.IsOnTeam(CommCare.Constants.GUIDS.Teams.ServiceRecoveryApproval)) {
			//for (var i = 0; i < 1; i++) { //  CRMCC-7181
			//if (results.entities[i]["teamid"] == CommCare.Constants.GUIDS.ServiceRecoveryApprovalTeam) { CRMCC-7181
			if (facility != null) {
				var purposeID = CommCare.Shared.GetCleanId(purpose);
				//let purposeName = CommCare.Shared.GetLookupName(purpose); CRMCC-7217
				//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : ""; CRMCC-7217
				//if (purposeNameFormatted.includes("service recovery")) {  CRMCC-7217
				if (CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID)) { // 
					lockTaskTitleDuelDate = false;
					//break;
				}

				if (facility[0]["name"] == "CX Contact Center") { // fix? from testing string to GUID
					lockTaskTitleDuelDate = false;
					//break;
				} else {
					console.log("setting lock to true");
					lockTaskTitleDuelDate = true;
				}
			} else {
				lockTaskTitleDuelDate = false;
			}
			//}
			//}CRMCC-7181
		}

		//if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid") != null) { // moved to top of function fixed action CCCRM7217
			//let actionName = CommCare.Shared.GetLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); // second reference to the same control? fixed action
			//let actionNameFormatted = actionName != null ? actionName.trim().toLowerCase() : ""; // fixed action CCCRM7217
			//if (actionNameFormatted.includes("return to service recovery") && CommCare.Shared.GetFieldValue("mcs_patsrid") != null) { // fixed action CCCRM7217
		if (actionID != null && CommCare.Constants.Compare.ActionIntersection.ServiceRecoveryApproval(actionID) && CommCare.Shared.GetFieldValue("mcs_patsrid") != null) {
			lockTaskTitleDuelDate = true;
		}
		//} // fixed action CCCRM7217

		if (CommCare.Shared.GetFieldValue("mcs_tasktitle") != null) {
			CommCare.Shared.SetReadOnly("mcs_tasktitle", lockTaskTitleDuelDate);
		}

		if (CommCare.Shared.GetFieldValue("ccwf_duedate_date") != null) {
			CommCare.Shared.SetReadOnly("ccwf_duedate_date", lockTaskTitleDuelDate);
		}

		console.log("LockTaskTitleDueDate: " + lockTaskTitleDuelDate);
		//	},
		//	function (error) {
		//		Xrm.Navigation.openAlertDialog({ text: error.message });
		//	}
		//); CRMCC-7149
	}

	function requireUnResolvedDetails() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);

		var patientPerception = CommCare.Shared.GetFieldValue("mcs_patientperception");
		if (patientPerception == CommCare.Constants.Integers.PatientPerception.Unresolved) {
			setRequiredOnMultipleFields(["mcs_unresolvedreason", "mcs_unresolveddetails"], "required");
			setVisibleOnMultipleFields(["mcs_unresolvedreason", "mcs_unresolveddetails"], true);
		}
		else if (patientPerception == CommCare.Constants.Integers.PatientPerception.Resolved) {
			setRequiredOnMultipleFields(["mcs_unresolvedreason", "mcs_unresolveddetails"], "none");
			setVisibleOnMultipleFields(["mcs_unresolvedreason", "mcs_unresolveddetails"], false);
		} else {
			setRequiredOnMultipleFields(["mcs_unresolvedreason", "mcs_unresolveddetails"], "none");
		}
	}

	function hideShowVSignalsQueueResolutionFields() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);

		var queueRes = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
		var validResolutionsForPatientPerception = ["Closed - Issue Resolved", "Closed - Unable to Make Contact", "Closed - Requested Reassignment", "Closed - Information/Documentation Not Received", "Closed - Unable to Make Contact after 3 attempts", "Closed - Non-working/Disconnected Phone number", "Closed - Duplicate"];


		//if (queueRes != null && validResolutionsForPatientPerception.indexOf(queueRes) > -1) {
		if (queueRes != null && validResolutionsForPatientPerception.indexOf(getLookupName(queueRes)) > -1) { // fix? from testing string to GUID
			setVisibleOnMultipleFields(["mcs_patientperception", "mcs_unresolvedreason", "mcs_unresolveddetails"], true);
			CommCare.Shared.SetRequired("mcs_patientperception", "required");
		}
		else {
			setVisibleOnMultipleFields(["mcs_patientperception", "mcs_unresolvedreason", "mcs_unresolveddetails"], false);
			CommCare.Shared.SetRequired("mcs_patientperception", "none");
		}
	}

	function lockReceiptDateOnSaveWithTask() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();
		Xrm.WebApi.online.retrieveRecord("systemuser", userId, "?$select=_positionid_value").then(
			function success(result) {
				var _positionid_value_formatted = result["_positionid_value@OData.Community.Display.V1.FormattedValue"];

				if (_positionid_value_formatted != null) {
					if (_positionid_value_formatted.toLowerCase() != "supervisor" && _positionid_value_formatted.toLowerCase() != "senior supervisor") { // fix? from testing string to GUID
						if (CommCare.Shared.GetFieldValue("mcs_documentreceiptdate") != null) {
							CommCare.Shared.SetReadOnly("mcs_documentreceiptdate", true);
						}
					}
				}
			},
			function (error) {
				Xrm.Utility.alertDialog(error.message);
			}
		);
	}

	function hideShowWhiteHouseHLTab() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var showWhiteHouseHLTab = false;
		var whiteHouseHLTab = CommCare.Shared.FormContext.ui.tabs.get("WHHLMetadata");
		var caseUpdatesTab = CommCare.Shared.FormContext.ui.tabs.get("WHHLCaseUpdates");

		if (purposeDetail != null) {
			var purposeDetailName = purposeDetail[0]["name"];
			var whiteHouseHLTab = CommCare.Shared.FormContext.ui.tabs.get("WHHLMetadata");
			if (purposeDetailName.indexOf("White House Hotline") > -1) { // fix? from testing string to GUID
				showWhiteHouseHLTab = true;
			}
		}
		if (whiteHouseHLTab != null) {
			whiteHouseHLTab.setVisible(showWhiteHouseHLTab);
		}
		if (caseUpdatesTab != null) {
			caseUpdatesTab.setVisible(showWhiteHouseHLTab);
		}
	}

	function hideTaskTitleQuickCreateForNonServiceRecovery() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		let purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		if (purpose != null) {
			//if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid") != null) { Call the same control twice? CRMCC-7217
			//let purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); Call the same control twice? CRMCC-7217
			var purposeID = CommCare.Shared.GetCleanId(purpose);
			//let purposeName = CommCare.Shared.GetLookupName(purpose);
			//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";
			//if (!purposeNameFormatted.includes("service recovery")) { // fixed from testing string to GUID CRMCC-7217
			if (!CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID)) { 
				CommCare.Shared.SetVisible("mcs_tasktitle", false);
				CommCare.Shared.SetRequired("ccwf_duedate_date", false);
				CommCare.Shared.SetRequired("mcs_tasktitle", false);
				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
			} else {
				CommCare.Shared.SetVisible("mcs_tasktitle", true);
				CommCare.Shared.SetRequired("ccwf_duedate_date", true);
				CommCare.Shared.SetRequired("mcs_tasktitle", true);
			}
		} else {
			CommCare.Shared.SetVisible("mcs_tasktitle", false);
			CommCare.Shared.SetRequired("ccwf_duedate_date", false);
			CommCare.Shared.SetRequired("mcs_tasktitle", false);
			CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
		}
	}

	function prefilterRemoveGenericResolvedInteractionPurpose() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.UPDATE_FORM) {
			var purpose = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")); // Fixed  CRMCC-7217
			var action = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); // uses GUID
			if (purpose != null && action != null) {
				//if (purpose.toLowerCase() == CommCare.Constants.GUIDS.Purpose_BILLINGCONCERN.toLowerCase() && CRMCC-7217
				if (purpose.toLowerCase() == CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV.toLowerCase() &&
					(action.toLowerCase() == CommCare.Constants.GUIDS.ActionIntersection.PaymentEscalationBillingConcernVV.toLowerCase() ||
						//action.toLowerCase() == CommCare.Constants.GUIDS.RequestAction_RETURNTOVAMC.toLowerCase()) // fixed GUID CRMCC-7217
					action.toLowerCase() == CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCBillingConcernVISNVAMC.toLowerCase()
						|| action.toLowerCase() == CommCare.Constants.GUIDS.ActionIntersection.VAMCInternalReviewBillingConcernVV.toLowerCase() //CRMCC-5332
				)
					//|| purpose.toLowerCase() == CommCare.Constants.GUIDS.Purpose_CUSTOMERSERVICECONCERN.toLowerCase()) { CRMCC-7217
					|| purpose.toLowerCase() == CommCare.Constants.GUIDS.PurposeIntersection.CustomerServiceConscern.toLowerCase()) {


					var fetchXml = "<filter>";
					fetchXml += "<condition attribute='vhacrm_name' operator='neq' value='Resolved' />";
					fetchXml += "</filter>";

					CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addPreSearch(function () {
						CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addCustomFilter(fetchXml);
					});

				}
			}
			if (CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid") != null) { //CRMCC-7762
				if (action == null || (action != null && !(action.toLowerCase() == CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCBillingConcernVISNVAMC.toLowerCase() //CRMCC-5332
					|| action.toLowerCase() == CommCare.Constants.GUIDS.ActionIntersection.VAMCInternalReviewBillingConcernVV.toLowerCase()))) {
					var fetchXml = "<filter>";
					fetchXml += "<condition attribute='vhacrm_name' operator='neq' value='Closed - Resolved' />";
					fetchXml += "</filter>";

					CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addPreSearch(function () {
						CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addCustomFilter(fetchXml);
					});
				}
			}
		}
	}

	function prefilterQueueResolutionRejectedByPatsR() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Constants.Integers.StatusCode.RejectedByPats) {
			var fetchXml = "<filter type='or'>";
			fetchXml += "<condition attribute='vhacrm_name' operator='begins-with' value='Closed - Incorrect Facility' />";
			fetchXml += "<condition attribute='vhacrm_name' operator='begins-with' value='Closed - Not Actionable' />";
			fetchXml += "<condition attribute='vhacrm_name' operator='begins-with' value='Closed - Not for OCC' />";
			fetchXml += "<condition attribute='vhacrm_name' operator='begins-with' value='Resolved' />";
			fetchXml += "<condition attribute='vhacrm_name' operator='begins-with' value='Rejected - PATS-R Secondary Review' />";
			fetchXml += "<condition attribute='vhacrm_name' operator='begins-with' value='Rejected - Updated Information' />";
			fetchXml += "<condition attribute='vhacrm_name' operator='begins-with' value='Rejected - Other' />";
			fetchXml += "</filter>";

			CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addPreSearch(function () {
				console.log(fetchXml);
				CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addCustomFilter(fetchXml);
			});
		}
	}

	function prefilterServiceRecoveryInteractionPurpose() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_programtype_value,_mcs_purposeintersection_value&$filter=mcs_name eq 'prefilterServiceRecoveryInteractionPurpose' and statecode eq 0").then(
			function success(results) {
				console.log(results);

				if (results.entities.length > 0) {
					var fetchXml = "<filter>";
					var programType = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ccwf_programid"));
					for (var i = 0; i < results.entities.length; i++) {
						if (programType == results.entities[i]["_mcs_programtype_value"].replace("{", "").replace("}", "").toLowerCase()) { /* mcs_programtype */
							fetchXml += "<condition attribute='vhacrm_areaintersectionid' operator='ne' value='" + results.entities[i]["_mcs_purposeintersection_value"] + "' />";
						}
					}
					fetchXml += "</filter>";
					CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addPreSearch(function () {
						CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addCustomFilter(fetchXml);
					});
				}
			});
	}

	function requireRequestDescriptionOnServiceRecoveryApproval() {
		if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
			var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // Already used GUID
			if (requestAction != null) {
				//var serviceRecoveryApprovalActionId = "2A1A960C-AE6E-EA11-A811-001DD8018866"; // fixed GUID CRMCC-7217
				var serviceRecoveryApprovalActionId = CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryApprovalServiceRecovery;
				if (requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == serviceRecoveryApprovalActionId.toLowerCase()) {
					CommCare.Shared.SetVisible("mcs_requestdescription", true);
					CommCare.Shared.SetRequired("mcs_requestdescription", true);
				} else {
					CommCare.Shared.SetVisible("mcs_requestdescription", false);
					CommCare.Shared.SetRequired("mcs_requestdescription", false);
				}
			}
		}
	}


	function showHideWHHLFields() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		if (CommCare.Request.Constants.CurrentFormType.toLowerCase() != "quickcreate") {
			Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'PATSResolution' and statecode eq 0").then(function success(result) {
				var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // Already uses GUID
				//var patsrApprovalActionC3 = "672e9fbf-23d0-ea11-a812-001dd8018866"; // fixed GUID CRMCC-7217
				var patsrApprovalActionC3 = CommCare.Constants.GUIDS.ActionIntersection.SendForPATSRApprovalServiceRecoveryVV;
				//var patsrApprovalActionNonVa = "3a76c062-4919-eb11-a813-001dd801df87"; // fixed GUID CRMCC-7217
				var patsrApprovalActionNonVa = CommCare.Constants.GUIDS.ActionIntersection.PATSRApprovalServiceRecoveryCommunityCare;
				//var serviceRecoveryApprovalNonVa = "2a1a960c-ae6e-ea11-a811-001dd8018866"; // fixed GUID CRMCC-7217
				var serviceRecoveryApprovalNonVa = CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryApprovalServiceRecovery;
				//var patsrApprovalActionDOHub = "4c761657-37c9-eb11-bacd-001dd802ec1e"; // fixed GUID CRMCC-7217
				var patsrApprovalActionDOHub = CommCare.Constants.GUIDS.ActionIntersection.PATSRApprovalServiceRecovery;
				if (requestAction != null) {
					if (requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsrApprovalActionC3.toLowerCase() ||
						requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsrApprovalActionNonVa.toLowerCase() ||
						requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == serviceRecoveryApprovalNonVa.toLowerCase() ||
						requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsrApprovalActionDOHub.toLowerCase()) {
						var whhlJson = CommCare.Shared.GetFieldValue("mcs_whhlresolutioncomponents");
						try {
							if (whhlJson != null) {
								console.log(whhlJson);
								var whhlObj = JSON.parse(whhlJson);
								console.log(whhlObj["Fields"]);
								for (var i = 0; i < whhlObj["Fields"].length; i++) {
									var fieldObject = whhlObj["Fields"][i];
									console.log(fieldObject);
									console.log("", fName, "; Field Name: ", fieldObject["FieldName"], ", Set Visible: ", fieldObject["Show"], ", is required: ", fieldObject["Require"]);
									//if (fieldObject["FieldName"] == "mcs_billingoutcome") {
									//	showHideBillingOutcome(fieldObject["Show"], fieldObject["Require"]);
									//}
									//else {
									//	if (fieldObject["Show"] == true) {
									//		CommCare.Shared.SetVisible(fieldObject["FieldName"], true);
									//		if (fieldObject["Require"] == true) {
									//			CommCare.Shared.SetRequired(fieldObject["FieldName"], true);
									//		} else {
									//			CommCare.Shared.SetRequired(fieldObject["FieldName"], false);
									//		}
									//	} else {
									//		CommCare.Shared.SetVisible(fieldObject["FieldName"], false);
									//		CommCare.Shared.SetRequired(fieldObject["FieldName"], false);
									//	}
									//}

									if (fieldObject["Show"] == true) {
										CommCare.Shared.SetVisible(fieldObject["FieldName"], true);
										if (fieldObject["Require"] == true) {
											CommCare.Shared.SetRequired(fieldObject["FieldName"], true);
										} else {
											CommCare.Shared.SetRequired(fieldObject["FieldName"], false);
										}
									} else {
										CommCare.Shared.SetVisible(fieldObject["FieldName"], false);
										CommCare.Shared.SetRequired(fieldObject["FieldName"], false);
									}
								}
								try {
									if (whhlObj["Outcomes"].length > 0) {
										var outcomeOptionSetControl = CommCare.Shared.FormContext.getControl("mcs_patsroutcome");
										var approvedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Constants.Integers.PatsrOutcomes.Approved);
										var disApprovedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Constants.Integers.PatsrOutcomes.Disapproved);
										var foundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Constants.Integers.PatsrOutcomes.Founded);
										var unfoundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Constants.Integers.PatsrOutcomes.Unfounded);
										outcomeOptionSetControl.clearOptions();
										for (var i = 0; i < whhlObj["Outcomes"].length; i++) {
											switch (whhlObj["Outcomes"][i]) {
												case "Approved":
													outcomeOptionSetControl.addOption(approvedValue);
													break;
												case "Disapproved":
													outcomeOptionSetControl.addOption(disApprovedValue);
													break;
												case "Founded":
													outcomeOptionSetControl.addOption(foundedValue);
													break;
												case "Unfounded":
													outcomeOptionSetControl.addOption(unfoundedValue);
													break;
											}
										}

									}
								} catch (ex) {
									console.log("exception in outcomes: " + ex.message);
								}

								try {
									if (whhlObj["BillingOutcomes"].length > 0) {
										let billingOutcomeControl = CommCare.Shared.FormContext.getControl("mcs_billingoutcome");
										let approvedValue = CommCare.Shared.FormContext.getAttribute("mcs_billingoutcome").getOption(CommCare.Constants.Integers.BillingOutcomes.Approved);
										let unapprovedValue = CommCare.Shared.FormContext.getAttribute("mcs_billingoutcome").getOption(CommCare.Constants.Integers.BillingOutcomes.Unapproved);
										let inquiryOnlyValue = CommCare.Shared.FormContext.getAttribute("mcs_billingoutcome").getOption(CommCare.Constants.Integers.BillingOutcomes.InquiryOnly);
										billingOutcomeControl.clearOptions();
										for (var i = 0; i < whhlObj["BillingOutcomes"].length; i++) {
											switch (whhlObj["BillingOutcomes"][i]) {
												case "Approved":
													billingOutcomeControl.addOption(approvedValue);
													break;
												case "Unapproved":
													billingOutcomeControl.addOption(unapprovedValue);
													break;
												case "Inquiry Only":
													billingOutcomeControl.addOption(inquiryOnlyValue);
													break;
											}
										}
									}
								} catch (ex) {
									console.log("exception in billing outcomes: " + ex.message);
								}

							} else {
								console.log("showHideWHHLFields VA HL JSON is NULL ");
								showHideWHHLFieldsHideShowResolutionDescription();
							}
						} catch (ex) {
							console.log(ex);
							//var WhhFieldOnChangeList = ["mcs_statementoftheissueandstatus", "mcs_dateveterancontacted", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_pointofcontact", "mcs_patsroutcome", "mcs_patsrindependentexternalreview"];
							console.log("showHideWHHLFields when error ", ex, " happens ");
							showHideWHHLFieldsHideShowResolutionDescription();
						}
					} else {
						//var WhhFieldOnChangeList = ["mcs_statementoftheissueandstatus", "mcs_dateveterancontacted", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_pointofcontact", "mcs_patsroutcome", "mcs_patsrindependentexternalreview"];
						console.log("showHideWHHLFields requestAction is NOT patsrApprovalActionC3.toLowerCase() OR patsrApprovalActionNonVa.toLowerCase() OR serviceRecoveryApprovalNonVa.toLowerCase() OR patsrApprovalActionDOHub");
						showHideWHHLFieldsHideShowResolutionDescription();
					}
				} else {
					//var WhhFieldOnChangeList = ["mcs_statementoftheissueandstatus", "mcs_dateveterancontacted", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_pointofcontact", "mcs_patsroutcome", "mcs_patsrindependentexternalreview"];
					console.log("showHideWHHLFields requestAction IS NULL");
					showHideWHHLFieldsHideShowResolutionDescription();
				}

			});
		}
	}

	function showHideWHHLFieldsHideShowResolutionDescription() {
		var WhhFieldOnChangeList = [
			"mcs_statementoftheissueandstatus",
			"mcs_dateveterancontacted",
			"mcs_actionsprogressandresolution",
			"mcs_nextsteps",
			"mcs_pointofcontact",
			"mcs_patsroutcome",
			"mcs_patsrindependentexternalreview",
			"mcs_setsubmitteraspointofcontact",
			"mcs_pointofcontactfirstname",
			"mcs_pointofcontactlastname",
			"mcs_pointofcontactemail",
			"mcs_pointofcontactposition",
			"mcs_pointofcontactphonenumber",
			"mcs_resolutiondescription",
			"mcs_billingoutcome"
		];

		for (var i = 0; i < WhhFieldOnChangeList.length; i++) {
			CommCare.Shared.SetVisible(WhhFieldOnChangeList[i], false);
			CommCare.Shared.SetRequired(WhhFieldOnChangeList[i], false);
		}

		var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // already uses GUID
		if (requestAction != null) {
			//var serviceRecoveryApprovalActionId = "2A1A960C-AE6E-EA11-A811-001DD8018866"; // fixed GUID CRMCC-7217
			var serviceRecoveryApprovalActionId = CommCare.Constants.GUIDS.ActionIntersection.ServiceRecoveryApprovalServiceRecovery;
			//var patsRApprovalId = "672e9fbf-23d0-ea11-a812-001dd8018866"; // fixed GUID CRMCC-7217
			var patsRApprovalId = CommCare.Constants.GUIDS.ActionIntersection.SendForPATSRApprovalServiceRecoveryVV;
			//var patsrApprovalActionDOHub = "4c761657-37c9-eb11-bacd-001dd802ec1e"; // fixed GUID CRMCC-7217
			var patsrApprovalActionDOHub = CommCare.Constants.GUIDS.ActionIntersection.PATSRApprovalServiceRecovery;
			var theIDToCheck = requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase();
			if (theIDToCheck == serviceRecoveryApprovalActionId.toLowerCase()
				|| theIDToCheck == patsRApprovalId.toLowerCase()
				|| theIDToCheck == patsrApprovalActionDOHub.toLowerCase()) {
				console.log("showHideWHHLFieldsHideShowResolutionDescription either",
					" Recovery Approval Action: ", (theIDToCheck == serviceRecoveryApprovalActionId.toLowerCase()),
					", OR PATS-R Approval: ", (theIDToCheck == patsRApprovalId.toLowerCase()),
					", OR Approval Action DO Hub", (theIDToCheck == patsrApprovalActionDOHub.toLowerCase()));
				CommCare.Shared.SetVisible("mcs_resolutiondescription", true);
				CommCare.Shared.SetRequired("mcs_resolutiondescription", true);
			} else {
				CommCare.Shared.SetVisible("mcs_resolutiondescription", false);
				CommCare.Shared.SetRequired("mcs_resolutiondescription", false);
			}
		} else {
			CommCare.Shared.SetVisible("mcs_resolutiondescription", false);
			CommCare.Shared.SetRequired("mcs_resolutiondescription", false);
		}
	}

	function packageResolution() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var statement = CommCare.Shared.GetFieldValue("mcs_statementoftheissueandstatus");
		var date = CommCare.Shared.GetFieldValue("mcs_dateveterancontacted");
		var actions = CommCare.Shared.GetFieldValue("mcs_actionsprogressandresolution");
		var nextSteps = CommCare.Shared.GetFieldValue("mcs_nextsteps");
		var POC = CommCare.Shared.GetFieldValue("mcs_pointofcontact");
		var outcomeField = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome");
		var outcome = "";
		if (outcomeField != null) {
			outcome = outcomeField.getSelectedOption() != null ? outcomeField.getSelectedOption().text : null;
		}
		var indExtReview = CommCare.Shared.GetFieldValue("mcs_patsrindependentexternalreview") ? "Yes" : "No";
		var resDescription = CommCare.Shared.GetFieldValue("mcs_resolutiondescription");

		var dateString = "";
		if (date != null) {
			dateString = date.toLocaleDateString('en-us');
		}
		var description = "";
		if (statement)
			description += "Statement of the Issue and Status: " + statement + "\n\n";
		if (dateString)
			// CRMCC-7109 - Changed "Date Veteran Contacted" to "Date of Report"
			description += "Date of Report: " + dateString + "\n\n";
		if (actions)
			description += "Actions, Progress, and Resolution: " + actions + "\n\n";
		if (nextSteps)
			description += "Next Steps: " + nextSteps + "\n\n";
		if (POC)
			description += "Point of Contact: " + POC + "\n\n";
		if (outcome)
			description += "Outcome: " + outcome + "\n\n";
		//if (indExtReview)
		//description += "Independent External Review: " + indExtReview + "\n";
		if (resDescription)
			description += "Resolution Description: " + resDescription;
		CommCare.Shared.SetFieldValue("mcs_patsrresolutiondescription", description);

	}

	function prefilterDOHubActions(isLoad) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		//var paymentEscalationId = "4afb3c4e-f8cd-eb11-bacc-001dd801c862"; // fixed GUID CRMCC-7217
		var paymentEscalationId = CommCare.Constants.GUIDS.ActionIntersection.PaymentEscalationServiceRecoveryVV;
		//var billingConcernIdDoHub = "163bdfa9-f8cd-eb11-bacc-001dd801c862"; // fixed GUID CRMCC-7217
		var billingConcernIdDoHub = CommCare.Constants.GUIDS.DOHubActions.BillingConcernIdDoHub;
		//var billingConcernIdC3 = "77fc43f1-c4bf-eb11-8236-001dd802dd2c"; // fixed GUID CRMCC-7217
		var billingConcernIdC3 = CommCare.Constants.GUIDS.DOHubActions.BillingConcernIdC3;
		//var returnToVamcActionId = "686a5a00-00ce-eb11-bacc-001dd801c862"; // fixed GUID CRMCC-7217
		var returnToVamcActionId = CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCServiceRecovery;
		var patsId = CommCare.Shared.GetFieldValue("mcs_patsrid");
		var subIntersectionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid"));
		CommCare.Request.Global.DoHubFetch = "<filter>";
		if (subIntersectionId != billingConcernIdC3) {
			CommCare.Request.Global.DoHubFetch += "<condition attribute='vhacrm_actionintersectionid' operator='ne' value='" + paymentEscalationId + "' />";
		}

		if (subIntersectionId != billingConcernIdDoHub || patsId == null) {
			CommCare.Request.Global.DoHubFetch += "<condition attribute='vhacrm_actionintersectionid' operator='ne' value='" + returnToVamcActionId + "' />";
		}
		CommCare.Request.Global.DoHubFetch += "</filter>";
		if (!isLoad) {
			CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setActionFilterForDoHubActions);
			console.log("removed presearch");
		}
		CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setActionFilterForDoHubActions);
	}

	function setActionFilterForDoHubActions() {
		console.log(CommCare.Request.Global.DoHubFetch);
		CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(CommCare.Request.Global.DoHubFetch);
	}

	function lockServicingFacilityVisnForPats() {
		if (CommCare.Shared.GetFieldValue("mcs_patsrid") != null) {
			CommCare.Shared.SetReadOnly("hrc_facilityid", true);
			CommCare.Shared.SetReadOnly("vhacrm_visnid", true);
		}
	}

	function showHideReasonForRejection() {
		//var ReturntoTierTwoNVA = "10a1d7c5-548f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var ReturntoTierTwoNVA = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierTwoBillingConcernCommunityCare;
		//var SendtoVAMCNVA = "31be14fa-4f8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var SendtoVAMCNVA = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCBillingConcernCommunityCare;
		//var ReturntoTierOneC3 = "8e421e4a-de8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var ReturntoTierOneC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierOneBillingConcernVISNVAMC;
		//var ReturntoTierTwoC3 = "d7d39971-e08d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var ReturntoTierTwoC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierTwoBillingConcernVISNVAMC;
		//var ReturntoVAMCC3 = "19febfb8-91f0-eb11-bacb-001dd8018ade"; // fixed? GUID CRMCC-7217
		var ReturntoVAMCC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCBillingConcernVISNVAMC;
		//var ReturntoVAMCSA = "0549e1c3-b450-ed11-bba0-001dd8072538"; // fixed GUID CRMCC-7217
		var ReturntoVAMCSA = CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCServiceRecoveryVISNVAMC;
		//var ReturnToTierOneNVA = "d5081fc9-6097-ec11-8d20-001dd8034b05"; // fixed GUID CRMCC-7217
		var ReturnToTierOneNVA = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierOneBillingConcernCommunityCare;
		//var SendToVAMCAuthNVA = "37636e87-75d4-ed11-b596-001dd8072538"; // fixed GUID CRMCC-7217
		var SendToVAMCAuthNVA = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCAuthorizationBillingConcernCommunityCare;
		//var SendToVAMCSchedNVA = "6137afee-75d4-ed11-b596-001dd8072538"; // fixed GUID CRMCC-7217
		var SendToVAMCSchedNVA = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCSchedulingBillingConcernCommunityCare
		//var SendToVAMCCompactNVA = "8e95874c-b5e2-ec11-a7b4-001dd8033eac"; // fixed GUID CRMCC-7217
		var SendToVAMCCompactNVA = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCCOMPACTCOMPACTAct;
		var ActionArray = [ReturntoTierTwoNVA, SendtoVAMCNVA, ReturntoTierOneC3, ReturntoTierTwoC3, ReturntoVAMCC3, ReturnToTierOneNVA, ReturntoVAMCSA, SendToVAMCAuthNVA, SendToVAMCSchedNVA];

		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");// Already uses GUID
		var actionId = CommCare.Shared.GetCleanId(action);

		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		//if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")) == "Return to VAMC") {
		if (ActionArray.indexOf(actionId) >= 0) {
			if (CommCare.Shared.FormContext.getControl("mcs_reasonforrejection") != null) {
				CommCare.Shared.SetVisible("mcs_reasonforrejection", true);
				CommCare.Shared.SetRequired("mcs_reasonforrejection", true);
				if (actionId == SendtoVAMCNVA) {
					CommCare.Shared.FormContext.getControl("mcs_reasonforrejection").setLabel("Request Notes");
				} else if (programTypeName == "Non-VA" && (actionId == SendToVAMCAuthNVA || actionId == SendToVAMCSchedNVA)) {
					CommCare.Shared.FormContext.getControl("mcs_reasonforrejection").setLabel("Request Notes");
				}
				else {
					CommCare.Shared.FormContext.getControl("mcs_reasonforrejection").setLabel("Reason for Return");
				}

			}
		} else {
			CommCare.Shared.SetVisible("mcs_reasonforrejection", false);
			CommCare.Shared.SetRequired("mcs_reasonforrejection", false);
		}
	}

	function lockReasonForRejection() {
		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
		if (queueItem != null) {
			Xrm.WebApi.online.retrieveRecord("queueitem", CommCare.Shared.GetCleanId(queueItem), "?$select=_queueid_value").then(
				function success(result) {
					var queueItemQueueName = result["_queueid_value@OData.Community.Display.V1.FormattedValue"];
					if (CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid") != null) {
						if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid")).replace(/\s/g, "").toLowerCase() == CommCare.Shared.Constants.C3Name.toLowerCase() && CommCare.Shared.GetFieldValue("mcs_reasonforrejection") != null && queueItemQueueName != "<DO Hub>") { // fix? from testing string to GUID
							CommCare.Shared.SetReadOnly("mcs_reasonforrejection", true);
						}
					}
				},
				function (error) {
					Xrm.Utility.alertDialog(error.message);
				}
			);
		} else {
			if (CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid") != null) {
				if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid")).replace(/\s/g, "").toLowerCase() == CommCare.Shared.Constants.C3Name.toLowerCase() && CommCare.Shared.GetFieldValue("mcs_reasonforrejection") != null) { // fix? from testing string to GUID
					CommCare.Shared.SetReadOnly("mcs_reasonforrejection", true);
				}
			}
		}
	}

	function prefilterReturnToVAMC(isLoad) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("*** ", fName);
		//var billingConcernpurposeID = "95121a83-46b7-eb11-8236-001dd80216dc"; // fixed GUID CRMCC-7217
		var billingConcernpurposeID = CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV;
		//var returnToVamcActionId = "19febfb8-91f0-eb11-bacb-001dd8018ade"; // fixed GUID CRMCC-7217
		var returnToVamcActionId = CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCBillingConcernVISNVAMC;
		//var paymentEscalationId = "41a1980d-48b7-eb11-8236-001dd80216dc"; // fixed GUID CRMCC-7217
		var paymentEscalationId = CommCare.Constants.GUIDS.ActionIntersection.PaymentEscalationBillingConcernVV;
		//var doHubQueueId = "a3f4441c-44b7-eb11-8236-001dd80216dc"; // fixed GUID CRMCC-7217
		var doHubQueueId = CommCare.Constants.GUIDS.DOHubActions.Queue;
		//var escalatedClaimReviewAction = "05ce7bfd-806d-ec11-8f8e-001dd803244d"; // fixed GUID CRMCC-7217
		var escalatedClaimReviewAction = CommCare.Constants.GUIDS.ActionIntersection.EscalatedClaimReviewBillingConcernVISNVAMC;
		var purposeID = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")); // uses guid CRMCC-7217
		var requestActionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); // uses guid
		var queueItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_queueitemid")); // uses guid
		//var Tier1Queue = "5e55f8c8-648b-ec11-8d20-001dd800b6ad"; // fixed GUID CRMCC-7217
		var Tier1Queue = CommCare.Constants.GUIDS.Queues.Tier1Queue;
		//var Tier2Queue = "92de07d5-648b-ec11-8d20-001dd800b6ad"; // fixed GUID CRMCC-7217
		var Tier2Queue = CommCare.Constants.GUIDS.Queues.Tier2Queue;
		//var Tier3Queue = "fa3913db-648b-ec11-8d20-001dd800b6ad"; // fixed GUID CRMCC-7217
		var Tier3Queue = CommCare.Constants.GUIDS.Queues.Tier3Queue;

		//fix this for tier queues
		if (queueItemId) {
			Xrm.WebApi.online.retrieveRecord("queueitem", queueItemId, "?$select=_queueid_value").then(
				function success(result) {
					console.log(result);
					console.log(doHubQueueId);
					console.log(result["_queueid_value"] != doHubQueueId);
					CommCare.Request.Global.ReturnToVAMCFetch = "<filter>";
					if (result["_queueid_value"] != doHubQueueId && result["_queueid_value"] != Tier1Queue && result["_queueid_value"] != Tier2Queue && result["_queueid_value"] != Tier3Queue) {
						if (purposeID != billingConcernpurposeID || paymentEscalationId != requestActionId) {

							CommCare.Request.Global.ReturnToVAMCFetch += "<condition attribute='vhacrm_actionintersectionid' operator='ne' value='" + returnToVamcActionId + "' />";
							CommCare.Request.Global.ReturnToVAMCFetch += "<condition attribute='vhacrm_actionintersectionid' operator='ne' value='" + escalatedClaimReviewAction + "' />";
						}
					}


					CommCare.Request.Global.ReturnToVAMCFetch += "</filter>";
					if (!isLoad) {
						CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setActionFilterForReturnToVAMCActions);
						console.log("removed presearch");
					}
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setActionFilterForReturnToVAMCActions);
				},
				function (error) {
					console.log(error);
				}
			);
		} else {
			CommCare.Request.Global.ReturnToVAMCFetch = "<filter>";
			if (purposeID != billingConcernpurposeID || paymentEscalationId != requestActionId) {
				CommCare.Request.Global.ReturnToVAMCFetch += "<condition attribute='vhacrm_actionintersectionid' operator='ne' value='" + returnToVamcActionId + "' />";
				CommCare.Request.Global.ReturnToVAMCFetch += "<condition attribute='vhacrm_actionintersectionid' operator='ne' value='" + escalatedClaimReviewAction + "' />";
			}

			CommCare.Request.Global.ReturnToVAMCFetch += "</filter>";
			if (!isLoad) {
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setActionFilterForReturnToVAMCActions);
				console.log("removed presearch");
			}
			CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setActionFilterForReturnToVAMCActions);
		}
	}

	function setActionFilterForReturnToVAMCActions() {
		console.log(CommCare.Request.Global.ReturnToVAMCFetch);
		CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(CommCare.Request.Global.ReturnToVAMCFetch);
	}

	async function handleAssignedToQuickCreate() {
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")); // fixed CRMCC-7217
		//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : ""; CRMCC-7217
		var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // only checks to see if not null
		//var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();

		//var results = await Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$select=teamid&$filter=teamid eq " + CommCare.Constants.GUIDS.ServiceRecoveryApprovalTeam + " and  systemuserid eq " + userId);//.then( CRMCC-7149
		//function success(results) {
		//if (results.entities.length > 0 && purposeNameFormatted.includes("service recovery") && CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM && requestAction != null) { CRMCC-7217 // only checks to see if not null
		if (await CommCare.Shared.IsOnTeam(CommCare.Constants.GUIDS.Teams.ServiceRecoveryApproval) &&
			CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID) &&

			CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM && requestAction != null) {
			CommCare.Shared.SetVisible("mcs_assignedtoquickcreate", true);
			preFilterAssignedToQuickCreate();
		}
		else {
			CommCare.Shared.SetFieldValue("mcs_assignedtoquickcreate", null);
			CommCare.Shared.SetVisible("mcs_assignedtoquickcreate", false);
		}
		//	},
		//	function (error) {
		//		CommCare.Shared.SetFieldValue("mcs_assignedtoquickcreate", null);
		//		CommCare.Shared.SetVisible("mcs_assignedtoquickcreate", false);
		//		console.log(error);
		//	}
		//); CRMCC-7149
	}

	function preFilterAssignedToQuickCreate() {
		Xrm.WebApi.online.retrieveMultipleRecords("queuemembership", "?$select=systemuserid&$filter=queueid eq " + CommCare.Constants.GUIDS.Queues.ServiceRecovery).then(
			function success(results) {
				CommCare.Request.Global.AssignedToQuickCreateFetch = "<filter type ='or'>";
				for (var i = 0; i < results.entities.length; i++) {
					CommCare.Request.Global.AssignedToQuickCreateFetch += "<condition attribute='systemuserid' operator='eq' value='" + results.entities[i]["systemuserid"] + "' />";
				}
				CommCare.Request.Global.AssignedToQuickCreateFetch += "</filter>";
				CommCare.Shared.FormContext.getControl("mcs_assignedtoquickcreate").addPreSearch(applyAssignedToQuickCreateFilter);
			},
			function (error) {
				Xrm.Utility.alertDialog(error.message);
			}
		);
	}

	function applyAssignedToQuickCreateFilter() {
		console.log(CommCare.Request.Global.AssignedToQuickCreateFetch);
		CommCare.Shared.FormContext.getControl("mcs_assignedtoquickcreate").addCustomFilter(CommCare.Request.Global.AssignedToQuickCreateFetch);
	}

	//CommCare.Shared.SetOnChange("vhacrm_actionintersectionid", onChangeOfRequestActionLockQueueResolution);
	//CommCare.Shared.SetOnChange("vhacrm_resolutionintersectionid", onChangeOfQueueResolutionLockRequestAction);

	function onChangeOfRequestActionLockQueueResolution() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		var isFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").getIsDirty()) ? true : false;

		if ((currentForm != null) && ((currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR) || (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF))) {
			CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", isFieldDirty);
			CommCare.Shared.SetReadOnly("vhacrm_cl_ob1resolution_code", isFieldDirty);
			CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", isFieldDirty);
			hasRequestActionChanged = isFieldDirty;
		}

		if (currentForm != null && currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR) {
			var obField = CommCare.Shared.FormContext.getAttribute("vhacrm_ahr_ob1resolution_code");
			if (!!obField) {
				var obRequired = obField.getRequiredLevel();
				if (obRequired == "required")
					CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", false);
			}
		}
	}

	// ACR form no longer locks Request Action on change of AHR OB1 Resolution (CRMCC-2610)
	function onChangeOfQueueResolutionOrOB1LockRequestAction() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		var isEitherFieldDirty;
		var requestActionFields;

		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR)) {
			isEitherFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob1resolution_code").getIsDirty()) ? true : false;
		}

		if ((currentForm != null) && (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF)) {
			isEitherFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").getIsDirty()) ? true : false;
		}

		if ((currentForm != null) && ((currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR) || (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF))) {
			//CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", isEitherFieldDirty);

			requestActionFields = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").controls;
			requestActionFields = requestActionFields["_collection"];

			for (var i in requestActionFields) {
				requestActionFields[i].setDisabled(isEitherFieldDirty);
			}
		}
	}

	function refreshFormOnSave() {
		if (hasRequestActionChanged) {
			Xrm.Utility.openEntityForm("incident", Xrm.Page.data.entity.getId());
		}
	}

	function doesQueueMatchRequestAction() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		var routingCompleted;
		var requestActionId, routingType, queueName, routingQueue, routingTeam, sendBackToFacility;
		//CommCare.Shared.getControl("vhacrm_actionintersectionid");

		// get routing type
		if ((currentForm != null) && ((currentForm.getId() === CommCare.Constants.GUIDS.Forms.ACR) || (currentForm.getId() === CommCare.Constants.GUIDS.Forms.CCWF))) {

			requestActionId = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // Already uses GUID

			if (requestActionId != null) {
				requestActionId = requestActionId[0].id;
			} else {
				console.log("No request action set");
				CommCare.Shared.FormContext.ui.clearFormNotification("ROUTINGINCOMPLETE");
				return;
			}

			var columns = "hac_routetype_code,vhacrm_queueid,hac_owner_teamid,mcs_sendbacktofacility&$expand=vhacrm_queueid($select=name),hac_owner_teamid($select=name)";
			var filter = "$filter=vhacrm_actionintersectionid eq '" + requestActionId + "'";
			var startTimer = performance.now();
			var endTimer;

			CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("vhacrm_actionintersections", columns, filter).then(function (results) {

				endTimer = performance.now() - startTimer;
				console.log("RetrieveMultiple Action Intersection: " + endTimer.toString() + " milliseconds");

				if (results.value != null) {

					routingType = results.value[0]["hac_routetype_code"];
					console.log("RetrieveMultiple Action Intersection - Routing Type: " + routingType);

					if (results.value[0]["vhacrm_queueid"] != null) {

						routingQueue = results.value[0]["vhacrm_queueid"].name;

						if (routingQueue.includes("<")) {
							routingQueue = routingQueue.substring(1, routingQueue.length - 1); // remove < and > if present
						}
					} else {
						routingQueue = null;
					}

					if (results.value[0]["hac_owner_teamid"] != null) {
						routingTeam = results.value[0]["hac_owner_teamid"].name;
					} else {
						routingTeam = null;
					}

					if (results.value[0]["mcs_sendbacktofacility"] != null) {
						sendBackToFacility = results.value[0]["mcs_sendbacktofacility"]; // 806860001 - NO // 806860000 - YES
					} else {
						sendBackToFacility = null;
					}

					queueName = CommCare.Shared.GetFieldValue("vhacrm_queueid");

					if (queueName != null) {

						queueName = queueName[0].name;

						if (queueName.includes("<")) {
							queueName = queueName.substring(1, queueName.length - 1); // remove < and > if present
						}

						if (queueName.includes("VISN ") && (queueName.length == 6)) {
							queueName = queueName.replace("VISN ", "VISN 0"); // insert 0 in single digit VISN queue name
						}
					} else {
						console.log("Queue is not populated");
						routingCompleted = false;
					}

					switch (routingType) {

						case CommCare.Constants.Integers.ActionRouteType.VISN: //  803750002: // VISN // fixed NUmbers CRMCC-7217

							// get servicing VISN

							var servicingVISNName = CommCare.Shared.GetFieldValue("vhacrm_visnid");

							if (servicingVISNName != null) {

								servicingVISNName = servicingVISNName[0].name;

								if (queueName == servicingVISNName) {
									console.log("Routing type VISN - queue match [" + queueName + "]");
									routingCompleted = true;
								} else {
									console.log("Routing type VISN - queue mismatch [" + queueName + "/" + servicingVISNName + "]");
									routingCompleted = false;
								}
							} else {
								console.log("Routing type VISN - queue mismatch [" + queueName + "/" + servicingVISNName + "]");
								routingCompleted = false;
							}
							break;

						case CommCare.Constants.Integers.ActionRouteType.Facility: // 803750001: // Facility// fixed NUmbers CRMCC-7217

							var servicingFacilityName = CommCare.Shared.GetFieldValue("hrc_facilityid");

							if (servicingFacilityName != null) {

								servicingFacilityName = servicingFacilityName[0].name;

								if (queueName == servicingFacilityName) {
									console.log("Routing type Facility - queue match [" + queueName + "]");
									routingCompleted = true;
								} else {
									console.log("Routing type Facility - queue mismatch [" + queueName + "/" + servicingFacilityName + "]");
									routingCompleted = false;
								}
							} else {
								console.log("Routing type Facility - queue mismatch [" + queueName + "/" + servicingFacilityName + "]");
								routingCompleted = false;
							}
							break;

						case CommCare.Constants.Integers.ActionRouteType.Queue: // 806860000: // Queue// fixed NUmbers CRMCC-7217
						case CommCare.Constants.Integers.ActionRouteType.TeamInsideOfQueue: // 803750004: // Team inside of Queue// fixed NUmbers CRMCC-7217

							if (queueName == routingQueue) {
								console.log("Routing type Queue - queue match [" + queueName + "]");
								routingCompleted = true;
							} else {
								console.log("Routing type Queue - queue mismatch [" + queueName + "/" + routingQueue + "]");
								routingCompleted = false;
							}
							break;

						case CommCare.Constants.Integers.ActionRouteType.Team: // 806860001: //Team// fixed NUmbers CRMCC-7217

							if (queueName == routingTeam) {
								console.log("Routing type Team - queue match [" + queueName + "]");
								routingCompleted = true;
							} else {
								console.log("Routing type Team - queue mismatch [" + queueName + "/" + routingTeam + "]");
								routingCompleted = false;
							}
							break;

						case CommCare.Constants.Integers.ActionRouteType.Hub: // 803750006: // Hub// fixed NUmbers CRMCC-7217
							if (!!sendBackToFacility) {
								if (sendBackToFacility == CommCare.Constants.Integers.ReturnToFacilityYN.No) { // Use queue// 806860001 fixrd NUmbers CRMCC-7217

									if (queueName == routingTeam) {

										console.log("Routing type Hub - queue match [" + queueName + "]");
										routingCompleted = true;
									} else {
										console.log("Routing type Hub - queue mismatch [" + queueName + "/" + routingTeam + "]");
										routingCompleted = false;
									}

								} else if (sendBackToFacility == CommCare.Constants.Integers.ReturnToFacilityYN.Yes) { // Use facility// 806860000 fixed NUmbers CRMCC-7217

									var servicingFacilityName = CommCare.Shared.GetFieldValue("hrc_facilityid");

									if (servicingFacilityName != null) {

										servicingFacilityName = servicingFacilityName[0].name;

										if (queueName == servicingFacilityName) {
											console.log("Routing type Hub - queue match [" + queueName + "]");
											routingCompleted = true;
										} else {
											console.log("Routing type Hub - queue mismatch [" + queueName + "/" + servicingFacilityName + "]");
											routingCompleted = false;
										}
									} else {

										console.log("Routing type Hub - queue mismatch [" + queueName + "/" + servicingFacilityName + "]");
										routingCompleted = false;
									}
								}
							}
							break;

						case CommCare.Constants.Integers.ActionRouteType.StatusUpdate: // 803750005: // Status Update// fixed NUmbers CRMCC-7217
						case CommCare.Constants.Integers.ActionRouteType.TPL: // 803750003: // TPL// fixed NUmbers CRMCC-7217
						case CommCare.Constants.Integers.ActionRouteType.DCU: // 803750000: // DCU// fixed NUmbers CRMCC-7217
						case CommCare.Constants.Integers.ActionRouteType.Other: // 806860002: // Other// fixed NUmbers CRMCC-7217
							break;
						default:
							break;
					}

					// set notification

					if (!routingCompleted) {
						CommCare.Shared.FormContext.ui.setFormNotification("WARNING - This Request is still in the process of being routed. If you are about to close this request, it may be reopened by the running process", "WARNING", "ROUTINGINCOMPLETE");
					} else {
						CommCare.Shared.FormContext.ui.clearFormNotification("ROUTINGINCOMPLETE");
					}

				} else {
					console.log("RetrieveMultiple Action Intersection: No results returned");
					return true;
				}
			}).catch(function (error) {
				endTimer = performance.now() - startTimer;
				console.log("RetrieveMultiple Action Intersection: " + endTimer.toString() + " milliseconds");
				console.log("Error retrieving Request Action - Routing Type: ");
				console.log(error);
				return true;
			});
		}
	}

	function hideShowNPI() {
		var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);
		if ((interactedWith == CommCare.Constants.Integers.InteractedWith.Provider || interactedWith == CommCare.Constants.Integers.InteractedWith.VIPProvider)
			&& lobName == "Customer Experience") {
			CommCare.Shared.SetVisible("mcs_npi", true);
		} else {
			CommCare.Shared.SetVisible("mcs_npi", false);
		}
	}

	function validateNPI() {
		var numberToCheck = CommCare.Shared.GetFieldValue("mcs_npi");
		var badNumber = false;
		var errMsg = "";
		if (numberToCheck != null) {
			if (numberToCheck.replace(/\D/g, '').length < numberToCheck.length && numberToCheck.length > 0) {
				errMsg = "NPI can only contain numbers";
				badNumber = true;
			} else if (numberToCheck.length == 0) {
				badNumber = false;
			}
			else if (numberToCheck.length != 10) {
				badNumber = true;
				errMsg = "The NPI must be 10 Numbers.  Please update the NPI prior to executing a Search.";
			}
		}


		if (badNumber) {
			CommCare.Shared.FormContext.getControl("mcs_npi").setNotification(errMsg, "invalidNPI");
			CommCare.Shared.FormContext.ui.setFormNotification(errMsg, "ERROR", "NPIERROR");
		} else {
			CommCare.Shared.FormContext.getControl("mcs_npi").clearNotification("invalidNPI");
			CommCare.Shared.FormContext.ui.clearFormNotification("NPIERROR");
		}
	}

	function requirePurposeDetailForServiceRecovery() {
		var programID = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ccwf_programid"));//uses guid
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";
		var status = CommCare.Shared.GetFieldValue("statecode");
		if (status == 0) {
			console.log(programID);
			//if ((programID == CommCare.Request.Constants.PROGRAM_TYPE_CSC.toLowerCase() || programID == CommCare.Request.Constants.PROGRAM_TYPE_NONVA.toLowerCase()) && purposeNameFormatted.includes("service recovery")) { // fixed from testing string to GUID CRMCC-7217
			if (!!programID && ((programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.CSC.toLowerCase() ||
				programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.NonVA.toLowerCase()) &&
				CommCare.Constants.Compare.PurposeIntersection.ServiceRecovery(purposeID))) { 
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
			} else {
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", false);
				lockActionVISNVAMCBillingConcern();
			}
		}
	}

	async function showHideImageLocatorTypeOfCare() {
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = action == null ? null : CommCare.Shared.GetCleanId(action);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // uses GUID
		var purposeID = CommCare.Shared.GetCleanId(purpose);

		//var actionName;
		//if (action != null) {
		//	actionName = CommCare.Shared.DialogNameReturn(action[0].name);
		//}
		var imageLocator = CommCare.Shared.GetFieldValue("mcs_imagelocator");
		var typeOfCare = CommCare.Shared.GetFieldValue("mcs_typeofcare");
		//if ((actionName != null && (actionName == "Claim Push" || actionName == "Clinical Decision")) || (imageLocator != null && typeOfCare != null)) {  // fixed action CCCRM7217
		if ((action != null &&
			(CommCare.Constants.Compare.ActionIntersection.ClaimPush(actionID) ||
				CommCare.Constants.Compare.ActionIntersection.ClinicalDecision(actionID))) ||
			(imageLocator != null && typeOfCare != null)) { 
			CommCare.Shared.SetVisible("mcs_imagelocator", true);
			CommCare.Shared.SetVisible("mcs_typeofcare", true);
			CommCare.Shared.SetRequired("mcs_imagelocator", true);
			CommCare.Shared.SetRequired("mcs_typeofcare", true);
		} else {
			CommCare.Shared.SetVisible("mcs_imagelocator", false);
			CommCare.Shared.SetVisible("mcs_typeofcare", false);
			CommCare.Shared.SetRequired("mcs_imagelocator", false);
			CommCare.Shared.SetRequired("mcs_typeofcare", false);
		}
		// CRMCC-5934 Tier Two Pharamacy
		if (!!actionID && await CommCare.Shared.IsOnTeam(CommCare.Constants.GUIDS.Teams.TierOne) && CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) &&
			actionID.toLowerCase() == CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementCC.toLowerCase()) {
			CommCare.Shared.SetVisible("mcs_caretype", true);
			CommCare.Shared.SetRequired("mcs_caretype", true);
		}
	}

	function lockDueDateForPSDDTAClaimFU() {
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action); // fixed action CCCRM7217
		//console.log(actionName);

		//if (actionName == "PSD DTA Claim Follow-Up") { // fixed action CCCRM7217
		if (CommCare.Constants.Compare.ActionIntersection.PSDDTAClaimFollowUp(actionID)) { 
			CommCare.Shared.SetReadOnly("ccwf_duedate_date", true);
		} else {
			CommCare.Shared.SetReadOnly("ccwf_duedate_date", false);
		}
	}

	function clearSubTypeOnChangeOfTreatmentStatus() {
		console.log("*** clearSubTypeOnChangeOfTreatmentStatus");
		CommCare.Shared.SetFieldValue("mcs_treatmentstatussubtype", null);
		showHideTreatmentStatusSubType();
	}

	function showHideTreatmentStatusSubType() {
		console.log("*** showHideTreatmentStatusSubType");
		var treatmentStatusSubType = CommCare.Shared.GetFieldValue("mcs_treatmentstatussubtype");
		var treatmentStatusId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_treatmentstatus"));
		CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", false);
		CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", false);

		if (treatmentStatusId == null) {
			CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", false);
			CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", false);
			if (treatmentStatusSubType != null) {
				CommCare.Shared.SetFieldValue("mcs_treatmentstatussubtype", null);
			}
		} else if (treatmentStatusSubType != null) {
			CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", true);
			CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", true);
		} else {
			Xrm.WebApi.online.retrieveMultipleRecords("mcs_treatmentstatussubtype", "?$filter=_mcs_treatmentstatus_value eq " + treatmentStatusId + " and statecode eq 0").then(
				function success(results) {
					if (results.entities.length > 0) {
						CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", true);
						CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", true);
					}
				},
				function (error) {
					console.log("Error retrieving Treatment Status SubTypes");
					Xrm.Utility.alertDialog(error.message);
				}
			);
		}
	}

	function lockQueueResolutionForSelectedActions() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		if (CommCare.Shared.GetFieldValue("bah_interactionstorequestid") != null) {
			Xrm.WebApi.online.retrieveRecord("bah_interactions", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("bah_interactionstorequestid")), "?$select=statecode").then(
				function success(result) {
					console.log(result);
					var statecode = result["statecode"];
					var statecode_formatted = result["statecode@OData.Community.Display.V1.FormattedValue"];
					var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
					var actionID = CommCare.Shared.GetCleanId(action);
					//var actionName = getLookupName(action); // fixed action CCCRM7217
					//console.log(actionName);
					//var lockForActions = ["Bill of Collection (BOC)", "Bowel and Bladder", "Claim Reprocessing", "Load Edit", "Claim Reprocessing - Ambulance/Bene Travel", "Reimbursement Request", "Provide Appeal Status"]; // fixed action CCCRM7217 = moved to top of function
					var lockForActionsTest = CommCare.Constants.Compare.ActionIntersection.BillofCollectionBOC(actionID) ||
						CommCare.Constants.Compare.ActionIntersection.BowelandBladder(actionID) ||
						CommCare.Constants.Compare.ActionIntersection.ClaimReprocessing(actionID) ||
						CommCare.Constants.Compare.ActionIntersection.LoadEdit(actionID) ||
						CommCare.Constants.Compare.ActionIntersection.ClaimReprocessingAmbulanceBeneTravel(actionID) ||
						CommCare.Constants.Compare.ActionIntersection.ReimbursementRequest(actionID) ||
						CommCare.Constants.Compare.ActionIntersection.ProvideAppealStatus(actionID);
					//if (lockForActions.indexOf(actionName) > -1 && statecode != 1) {
					if (lockForActionsTest && statecode != 1) {
						CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", true);
					} else {
						CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", false);
					}
				},
				function (error) {
					Xrm.Utility.alertDialog(error.message);
				}
			);
		}
	}

	function showHideCareTypeEscalationNotes() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		//always show care type when billing concern
		//var CommCareBillingConcernAreaId = "450cc7e4-4e8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var CommCareBillingConcernAreaId = CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernCC;
		//var VisnVamcBillingConcernAreaId = "95121a83-46b7-eb11-8236-001dd80216dc"; // fixed GUID CRMCC-7217
		var VisnVamcBillingConcernAreaId = CommCare.Constants.GUIDS.PurposeIntersection.BillingConscernVV;
		//var NonVaSendToVamcActionId = "31be14fa-4f8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var NonVaSendToVamcActionId = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCBillingConcernCommunityCare;

		//var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);
		purposeDetailName = purposeDetailName != null ? purposeDetailName.toLowerCase() : "null";
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionId = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action); // fixed action CCCRM7217
		//actionName = actionName != null ? actionName.toLowerCase() : "null"; // fixed action CCCRM7217
		var queue = CommCare.Shared.GetFieldValue("vhacrm_queueid");
		var queueName = getLookupName(queue);
		console.log(purposeDetailName);
		console.log(queueName);

		//var setVisReqForEscalateTierOne = (!(purposeDetailName.indexOf("ava") > -1) && actionName.indexOf("escalate to tier one") > -1 && queueName != "<Tier One Specialist>" && queueName != "<Tier One>"); // fixed action CCCRM7217
		var setVisReqForEscalateTierOne = (!(purposeDetailName.indexOf("ava") > -1) &&
			CommCare.Constants.Compare.ActionIntersection.EscalateToTierOne(actionId) &&
			queueName != "<Tier One Specialist>" &&
			queueName != "<Tier One>");
		console.log("setVisReqForEscalateTierOne: " + setVisReqForEscalateTierOne);

		AreaArray = [CommCareBillingConcernAreaId, VisnVamcBillingConcernAreaId];

		var area = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// uses GUID CRMCC-7217
		//var areaName = getLookupName(area);
		var areaId = CommCare.Shared.GetCleanId(area);

		//var setVis = (AreaArray.indexOf(areaId) >= 0 || setVisReqForEscalateTierOne || CommCare.Shared.GetCleanId(action) == NonVaSendToVamcActionId) ? true : false; // fix? from testing string to GUID
		var setVis = (AreaArray.indexOf(areaId) >= 0 || setVisReqForEscalateTierOne || actionId == NonVaSendToVamcActionId) ? true : false; // fix? from testing string to GUID

		CommCare.Shared.SetVisible("mcs_caretype", setVis);

		//set required when it is an escalated billing concern
		//var TierTwoCCNOptumNVA = "6277b55d-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoCCNOptumNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNOptumCC;
		//var TierTwoCCNTriwestNVA = "1965a869-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoCCNTriwestNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNTriwestCC;
		//var TierTwoLocalContractNVA = "cd7da881-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoLocalContractNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoLocalContractCC;
		//var TierTwoUrgentEmergentNVA = "0aebc451-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoUrgentEmergentNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoEmergentCareCC
		//var TierTwoVCANVA = "218db575-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoVCANVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoVCACC;
		//var escalateToTier1Team = "16170bb9-af8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var escalateToTier1Team = CommCare.Constants.GUIDS.ActionIntersection.EscalateToTierOneBillingConcernVISNVAMC;
		//var sendToVamcScheduling = "6137afee-75d4-ed11-b596-001dd8072538"; // fixed GUID CRMCC-7217
		var sendToVamcScheduling = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCSchedulingBillingConcernCommunityCare;
		//var sendToVamcAuth = "37636e87-75d4-ed11-b596-001dd8072538"; // fixed GUID CRMCC-7217
		var sendToVamcAuth = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCAuthorizationBillingConcernCommunityCare;

		ActionArray = [TierTwoCCNOptumNVA, TierTwoCCNTriwestNVA, TierTwoLocalContractNVA, TierTwoUrgentEmergentNVA, TierTwoVCANVA, sendToVamcAuth, sendToVamcScheduling];

		//var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");// twice?
		//var actionName = getLookupName(action); // TWICE?

		var setReq = setVisReqForEscalateTierOne ? true
			//: actionName == "RN Follow-up" ? true  // fixed action CCCRM7217
			: CommCare.Constants.Compare.ActionIntersection.RNFollowup(actionId) ? true 
				: actionId == escalateToTier1Team ? true
					: ActionArray.indexOf(actionId) >= 0 ? true // fixed from testing string to GUID
						//: CommCare.Shared.GetCleanId(action) == NonVaSendToVamcActionId ? true 
						: actionId == NonVaSendToVamcActionId ? true 
							: false;

		CommCare.Shared.SetRequired("mcs_caretype", setReq);

		//CommCare.Shared.SetVisible("mcs_escalationnotes", setVisReqForEscalateTierOne);
		//CommCare.Shared.SetRequired("mcs_escalationnotes", setVisReqForEscalateTierOne);
	}


	function hideShowEscalationNotes() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		//var EscalatetoTierOneC3 = "16170bb9-af8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var EscalatetoTierOneC3 = CommCare.Constants.GUIDS.ActionIntersection.EscalateToTierOneBillingConcernVISNVAMC;
		//var EscalatetoTierOneSR = "52f870e9-b350-ed11-bba0-001dd8072538"; // fixed GUID CRMCC-7217
		var EscalatetoTierOneSR = CommCare.Constants.GUIDS.ActionIntersection.EscalateToTierOneServiceRecoveryVISNVAMC;
		//var EscalatetoTierThreeC3 = "c531a0c2-dd8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var EscalatetoTierThreeC3 = CommCare.Constants.GUIDS.ActionIntersection.EscalateToTierThreeBillingConcernVV;
		//var EscalatetoTierThreeNVA = "48c18f74-538f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var EscalatetoTierThreeNVA = CommCare.Constants.GUIDS.ActionIntersection.EscalatetoTierThreeBillingConcernCC;
		//var EscalatedClaimReviewC3 = "05ce7bfd-806d-ec11-8f8e-001dd803244d"; // fixed GUID CRMCC-7217
		var EscalatedClaimReviewC3 = CommCare.Constants.GUIDS.ActionIntersection.EscalatedClaimReviewBillingConcernVISNVAMC;
		//var InitialClaimReviewC3 = "ab973dcd-806d-ec11-8f8e-001dd803244d"; // fixed GUID CRMCC-7217
		var InitialClaimReviewC3 = CommCare.Constants.GUIDS.ActionIntersection.InitialClaimReviewBillingConcernVV;
		//var InternalTierOneReviewNVA = "8f06947b-4f8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var InternalTierOneReviewNVA = CommCare.Constants.GUIDS.ActionIntersection.InternalTierOneReviewNVA;
		//var PaymentEscalationC3 = "41a1980d-48b7-eb11-8236-001dd80216dc"; // fixed GUID CRMCC-7217
		var PaymentEscalationC3 = CommCare.Constants.GUIDS.ActionIntersection.PaymentEscalationBillingConcernVV;
		//var ReturntoTierOneC3 = "8e421e4a-de8d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var ReturntoTierOneC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierOneBillingConcernVISNVAMC;
		//var ReturntoTierTwoC3 = "d7d39971-e08d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var ReturntoTierTwoC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierTwoBillingConcernVISNVAMC;
		//var ReturntoTierTwoNVA = "10a1d7c5-548f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var ReturntoTierTwoNVA = CommCare.Constants.GUIDS.ActionIntersection.ReturnToTierTwoBillingConcernCommunityCare;
		//var ReturntoVAMCC3 = "19febfb8-91f0-eb11-bacb-001dd8018ade"; // fixed GUID CRMCC-7217
		var ReturntoVAMCC3 = CommCare.Constants.GUIDS.ActionIntersection.ReturnToVAMCBillingConcernVISNVAMC;
		//var SendtoVAMCNVA = "31be14fa-4f8f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var SendtoVAMCNVA = CommCare.Constants.GUIDS.ActionIntersection.SendToVAMCBillingConcernCommunityCare;
		//var TierTwoCCNOptumC3 = "3120930b-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoCCNOptumC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNOptumVV;
		//var TierTwoCCNOptumNVA = "6277b55d-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoCCNOptumNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNOptumCC;
		//var TierTwoCCNTriwestC3 = "0e9fe91d-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoCCNTriwestC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNTriwestVV;
		//var TierTwoCCNTriwestNVA = "1965a869-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoCCNTriwestNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoCCNTriwestCC;
		//var TierTwoLocalContractC3 = "d1f30942-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoLocalContractC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoLocalContractVV;
		//var TierTwoLocalContractNVA = "cd7da881-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoLocalContractNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoLocalContractCC;
		//var TierTwoUrgentEmergentC3 = "0a6c622b-d78d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoUrgentEmergentC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoEmergentCareVV;
		//var TierTwoUrgentEmergentNVA = "0aebc451-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoUrgentEmergentNVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoEmergentCareCC;
		//var TierTwoVCAC3 = "49951730-d88d-ec11-8d20-001dd801d485"; // fixed GUID CRMCC-7217
		var TierTwoVCAC3 = CommCare.Constants.GUIDS.ActionIntersection.TierTwoVCAVV;
		//var TierTwoVCANVA = "218db575-518f-ec11-8d20-001dd801f2a8"; // fixed GUID CRMCC-7217
		var TierTwoVCANVA = CommCare.Constants.GUIDS.ActionIntersection.TierTwoVCACC;
		//var VAMCInternalReviewC3 = "43c7fa6e-fc67-ec11-8f8e-001dd800c03c"; // fixed GUID CRMCC-7217
		var VAMCInternalReviewC3 = CommCare.Constants.GUIDS.ActionIntersection.VAMCInternalReviewBillingConcernVV;
		// CRMCC-5934 Tier Two Pharamacy
		var ActionArray = [EscalatetoTierOneC3, EscalatetoTierOneSR, EscalatetoTierThreeC3, TierTwoCCNOptumC3, TierTwoCCNTriwestC3, TierTwoLocalContractC3
			, TierTwoVCAC3, EscalatetoTierThreeNVA, TierTwoCCNOptumNVA, TierTwoCCNTriwestNVA, TierTwoLocalContractNVA
			, TierTwoUrgentEmergentNVA, TierTwoVCANVA, TierTwoUrgentEmergentC3, CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementVV
			, CommCare.Constants.GUIDS.ActionIntersection.TierTwoPharmacyReimbursementCC];

		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // Already uses GUIDS
		var actionId = CommCare.Shared.GetCleanId(action);

		var setVis = ActionArray.indexOf(actionId) >= 0 ? true : false;

		var tab = CommCare.Shared.FormContext.ui.tabs.get("tab_8");
		var section = tab != null ? tab.sections.get("EscalationNotes") : null;
		//mcs_escalationnotes

		if (!!section) {
			section.setVisible(setVis);

			CommCare.Shared.SetRequired("mcs_escalationnotes", setVis);
			if (actionId == EscalatetoTierOneC3) {
				section.setLabel("VAMC Escalation Notes");
				CommCare.Shared.FormContext.getControl("mcs_escalationnotes").setLabel("VAMC Escalation Notes");
			}
			if (actionId == EscalatetoTierThreeC3 || actionId == EscalatetoTierThreeNVA) {
				section.setLabel("Tier Two Escalation Notes");
				CommCare.Shared.FormContext.getControl("mcs_escalationnotes").setLabel("Tier Two Escalation Notes");
			}
			// CRMCC-5934 Tier Two Pharamacy
			if (actionId == TierTwoCCNOptumC3 || actionId == TierTwoCCNTriwestC3 || actionId == TierTwoLocalContractC3 || actionId == TierTwoUrgentEmergentC3 || actionId == TierTwoVCAC3
				|| actionId == TierTwoCCNOptumNVA || actionId == TierTwoCCNTriwestNVA || actionId == TierTwoLocalContractNVA || actionId == TierTwoUrgentEmergentNVA || actionId == TierTwoVCANVA
				|| CommCare.Constants.Compare.ActionIntersection.TierTwoPharmacyReimbursement(actionId)) {
				section.setLabel("Tier One Escalation Notes");
				CommCare.Shared.FormContext.getControl("mcs_escalationnotes").setLabel("Tier One Escalation Notes");
			}
		}
	}

	function validateReferalNumber() {
		var isValid = true;
		var enteredReferalNumber = CommCare.Shared.GetFieldValue("vhacrm_internalnumber_text");
		if (enteredReferalNumber == null) {
			CommCare.Shared.FormContext.getControl("vhacrm_internalnumber_text").clearNotification("VAERROR");
			return;
		}

		if (enteredReferalNumber.substring(0, 2) === "va" || enteredReferalNumber.substring(0, 2) === "Va" || enteredReferalNumber.substring(0, 2) === "vA") {
			CommCare.Shared.SetSubmitMode("vhacrm_internalnumber_text", "always");
			CommCare.Shared.SetFieldValue("vhacrm_internalnumber_text", enteredReferalNumber.toUpperCase());
			validateReferalNumber();
			return;
		}
		console.log(enteredReferalNumber);
		if (enteredReferalNumber.substring(0, 2) != "VA") {
			console.log("must begin with 'VA'");
			CommCare.Shared.FormContext.getControl("vhacrm_internalnumber_text").setNotification("Referral Number must begin with 'VA' followed by 10 digits", "VAERROR");
			isValid = false;
		}

		if (enteredReferalNumber.length != 12) {
			CommCare.Shared.FormContext.getControl("vhacrm_internalnumber_text").setNotification("Referral Number must begin with 'VA' followed by 10 digits", "VAERROR");
			isValid = false;
		}
		var numbersPortion = enteredReferalNumber.substring(2, 12);
		console.log(numbersPortion);
		console.log(numbersPortion.replace(/\D/g, ''));
		if (numbersPortion.replace(/\D/g, '').length < numbersPortion.length && numbersPortion.length > 0) {
			CommCare.Shared.FormContext.getControl("vhacrm_internalnumber_text").setNotification("Referral Number must begin with 'VA' followed by 10 digits", "VAERROR");
			isValid = false;
		}

		if (isValid || enteredReferalNumber.length == 0) {
			CommCare.Shared.FormContext.getControl("vhacrm_internalnumber_text").clearNotification("VAERROR");
		}
	}

	function requirePOCNamedEmployeeFields() {
		var poc = CommCare.Shared.GetFieldValue("mcs_setsubmitteraspointofcontact");
		var required = poc == CommCare.Constants.Integers.HacYN.Yes ? true : false;
		CommCare.Shared.SetRequired("mcs_pointofcontactphonenumber", required);
		//CommCare.Shared.SetRequired("mcs_pointofcontactposition", required);
		CommCare.Shared.SetRequired("mcs_pointofcontactemail", required);
	}

	function setPOCUserData() {
		var poc = CommCare.Shared.GetFieldValue("mcs_setsubmitteraspointofcontact");
		if (poc == CommCare.Constants.Integers.HacYN.Yes) {
			var systemUserId = CommCare.Shared.FormContext.context.getUserId().replace("{", "").replace("}", "");
			Xrm.WebApi.online.retrieveRecord("systemuser", systemUserId, "?$select=address1_telephone1,domainname,firstname,internalemailaddress,lastname,mobilephone,_positionid_value,title").then(
				function success(result) {
					console.log(result);
					var address1_telephone1 = result["address1_telephone1"];
					var domainname = result["domainname"];
					var firstname = result["firstname"];
					var internalemailaddress = result["internalemailaddress"];
					var lastname = result["lastname"];
					var mainphone = result["address1_telephone1"];
					var _positionid_value = result["_positionid_value"];
					var _positionid_value_formatted = result["_positionid_value@OData.Community.Display.V1.FormattedValue"];
					var _positionid_value_lookuplogicalname = result["_positionid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
					var title = result["title"];

					CommCare.Shared.SetFieldValue("mcs_pointofcontactfirstname", firstname);
					CommCare.Shared.SetFieldValue("mcs_pointofcontactlastname", lastname);
					CommCare.Shared.SetFieldValue("mcs_pointofcontactemail", internalemailaddress);
					CommCare.Shared.SetFieldValue("mcs_pointofcontactposition", title);
					//CommCare.Shared.SetFieldValue("mcs_pointofcontactphonenumber", mainphone.replace(/\s/g, ''));
					var cleanMainPhone = mainphone.replace(/\D/g, '');
					var match = cleanMainPhone.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
					if (match) {
						console.log("(" + match[1] + ")" + match[2] + "-" + match[3]);
						CommCare.Shared.SetFieldValue("mcs_pointofcontactphonenumber", "(" + match[1] + ")" + match[2] + "-" + match[3]);
					}
					CommCare.Shared.FormContext.getAttribute("mcs_pointofcontactphonenumber").fireOnChange();
				},
				function (error) {
					Xrm.Utility.alertDialog(error.message);
				}
			);
		} else {
			CommCare.Shared.SetFieldValue("mcs_pointofcontactfirstname", null);
			CommCare.Shared.SetFieldValue("mcs_pointofcontactlastname", null);
			CommCare.Shared.SetFieldValue("mcs_pointofcontactemail", null);
			CommCare.Shared.SetFieldValue("mcs_pointofcontactposition", null);
			CommCare.Shared.SetFieldValue("mcs_pointofcontactphonenumber", null);
		}
	}

	function showHideIntakeNoteFields() {
		var purposeIntersectionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));// uses guid
		if (purposeIntersectionId != null) {
			Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purposeIntersectionId, "?$select=mcs_sendtopatsr").then(
				function success(result) {
					console.log(result);
					var mcs_sendtopatsr = result["mcs_sendtopatsr"];
					var mcs_sendtopatsr_formatted = result["mcs_sendtopatsr@OData.Community.Display.V1.FormattedValue"];

					if (mcs_sendtopatsr) {
						CommCare.Shared.SetVisible("mcs_descriptionoftheissue", true);
						CommCare.Shared.SetVisible("mcs_actionexecutedtodate", true);
						CommCare.Shared.SetVisible("mcs_actionbeingrequested", true);
						CommCare.Shared.SetRequired("mcs_descriptionoftheissue", true);
						CommCare.Shared.SetRequired("mcs_actionexecutedtodate", true);
						CommCare.Shared.SetRequired("mcs_actionbeingrequested", true);
						if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM) {
							if (CommCare.Shared.FormContext.getControl("vhacrm_requestnotes_memo") != null) {
								CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", false);
								CommCare.Shared.SetVisible("vhacrm_requestnotes_memo", false);
							}

							if (CommCare.Shared.FormContext.getControl("mcs_requestnotetitle") != null) {
								CommCare.Shared.SetRequired("mcs_requestnotetitle", false);
								CommCare.Shared.SetVisible("mcs_requestnotetitle", false);
							}
						}

					} else {
						CommCare.Shared.SetRequired("mcs_descriptionoftheissue", false);
						CommCare.Shared.SetRequired("mcs_actionexecutedtodate", false);
						CommCare.Shared.SetRequired("mcs_actionbeingrequested", false);

						CommCare.Shared.SetVisible("mcs_descriptionoftheissue", false);
						CommCare.Shared.SetVisible("mcs_actionexecutedtodate", false);
						CommCare.Shared.SetVisible("mcs_actionbeingrequested", false);
					}
				},
				function (error) {
					Xrm.Utility.alertDialog(error.message);
				}
			);
		} else {
			CommCare.Shared.SetRequired("mcs_descriptionoftheissue", false);
			CommCare.Shared.SetRequired("mcs_actionexecutedtodate", false);
			CommCare.Shared.SetRequired("mcs_actionbeingrequested", false);
		}
	}

	function showHideMetadataTabs() {
		//var AvaSubPurpose = "161c9f94-19b5-ec11-983e-001dd80335c4"; CRMCC-7217
		var AvaSubPurpose = CommCare.Constants.GUIDS.SubPurpose.Ava;
		//var WHHLSupPurpose = "f1251925-2162-ea11-a993-001dd800ba25"; CRMCC-7217
		var WHHLSupPurpose = CommCare.Constants.GUIDS.SubPurpose.VAHotLine;

		//var purposeDetailName = CommCare.Shared.GetLookupName(CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid"));
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailId = CommCare.Shared.GetCleanId(purposeDetail);

		var avaTab = CommCare.Shared.FormContext.ui.tabs.get("AVAMetadata");
		var whhlTab = CommCare.Shared.FormContext.ui.tabs.get("WHHLMetadata");

		if (purposeDetailId != null) {
			Xrm.WebApi.online.retrieveRecord("vhacrm_subareaintersection", purposeDetailId, "?$select=vhacrm_subareaintersectionid,_vhacrm_subareaid_value").then(
				function success(result) {
					console.log(result);
					var vhacrm_subareaid = result["_vhacrm_subareaid_value"];

					if (!!avaTab) {
						if (vhacrm_subareaid == AvaSubPurpose)
							avaTab.setVisible(true);
						else
							avaTab.setVisible(false);
					}

					if (!!whhlTab) {
						if (vhacrm_subareaid == WHHLSupPurpose)
							whhlTab.setVisible(true);
						else
							whhlTab.setVisible(false);
					}
				},
				function (error) {
					console.log(error.message);
					if (!!avaTab) {
						avaTab.setVisible(false);
					}
					if (!!whhlTab) {
						whhlTab.setVisible(false);
					}

				}
			).catch((e) => {
				console.log(e);
			});
		}
		else {
			if (!!avaTab) {
				avaTab.setVisible(false);
			}
			if (!!whhlTab) {
				whhlTab.setVisible(false);
			}

		}


		//var avaString = "AVA (VISN/VAMC)";
		//var avaString2 = "AVA (Non-VA)";
		//var whhlString = "White House Hotline (VISN/VAMC)";
		//var whhlString2 = "White House Hotline (Non-VA)";

		//var avaTab = CommCare.Shared.FormContext.ui.tabs.get("AVAMetadata");
		//var whhlTab = CommCare.Shared.FormContext.ui.tabs.get("WHHLMetadata");

		//if (!!avaTab) {
		//	if (purposeDetailName == avaString || purposeDetailName == avaString2)
		//		avaTab.setVisible(true);
		//	else
		//		avaTab.setVisible(false);
		//}

		//if (!!whhlTab) {
		//	if (purposeDetailName == whhlString || purposeDetailName == whhlString2)
		//		whhlTab.setVisible(true);
		//	else
		//		whhlTab.setVisible(false);
		//}
	}

	function validatePOCPhoneNumber() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var fieldNames = [];
		fieldNames[0] = "mcs_pointofcontactphonenumber";

		var validPhone = CommCare.Shared.ValidatePhoneOrFaxNumber("ActionItem", "POC", fieldNames, "Phone");

		return validPhone;
	}

	function removeTriWestFromCCProgramList() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		//803750004
		var field = CommCare.Shared.FormContext.getControl("mcs_communitycareprogram");
		if (!!field) {
			field.removeOption(CommCare.Constants.Integers.TriWest.CCProgramList); //803750004 fixed NUMBER CRMCC-7217
		}
	}

	function requireReasonForClaimDenied() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var claimRes = CommCare.Shared.GetFieldValue("vhacrm_choiceops_claimresolution_code");
		var setVal = claimRes == CommCare.Constants.Integers.ClaimResolution.ClaimDenied;

		CommCare.Shared.SetVisible("vhacrm_choiceops_reason_code", setVal);
		CommCare.Shared.SetRequired("vhacrm_choiceops_reason_code", setVal);
	}

	function setActionFromCommunityCareProgram(isLoad, source) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log("", fName + " Source: " + source);

		var prog = CommCare.Shared.GetFieldValue("mcs_communitycareprogram");
		var ob2 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

		if (isLoad === true) {
			if (!!!prog) {
				CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", true);
				CommCare.Shared.SetReadOnly("vhacrm_ahr_ob2resolution_code", true);
			}
			else {
				CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", false);
				CommCare.Shared.SetReadOnly("vhacrm_ahr_ob2resolution_code", false);
			}
		}
		else {
			if (!!prog) {
				if (source == "ob2" && ob2 != CommCare.Constants.Integers.OBResolution.ProviderAgrees && ob2 != CommCare.Constants.Integers.OBResolution.ProviderDisagrees) {
					return;
				}

				Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_action_value,mcs_value&$filter=mcs_name eq 'ACRMapCCProgramToAction' and statecode eq 0").then(
					function success(results) {
						console.log(results);
						for (var i = 0; i < results.entities.length; i++) {
							var result = results.entities[i];
							// Columns
							var mcs_lookupfilterid = result["mcs_lookupfilterid"]; // Guid
							var mcs_action = result["_mcs_action_value"]; // Lookup
							var mcs_action_formatted = result["_mcs_action_value@OData.Community.Display.V1.FormattedValue"];
							var mcs_action_lookuplogicalname = result["_mcs_action_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
							var mcs_value = result["mcs_value"]; // Text

							if (mcs_value == prog) {
								var lookup = [];
								lookup[0] = {};
								lookup[0].id = mcs_action;
								lookup[0].entityType = "vhacrm_actionintersection";
								lookup[0].name = mcs_action_formatted;

								CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", lookup);
								CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", false);
								CommCare.Shared.SetReadOnly("vhacrm_ahr_ob2resolution_code", false);
								console.log("setActionFromCommunityCareProgram fire on change");
								CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
								break;
							}
						}
					},
					function (error) {
						console.log(error.message);
					}
				);
			}
			else {
				CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", true);
				CommCare.Shared.SetReadOnly("vhacrm_ahr_ob2resolution_code", true);
			}
		}
	}

	function storeClaimonFile(isLoad) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		if (isLoad == "load") {
			sessionStorage.removeItem("ClaimOnFile");
		}
		else {
			var claimOnFile = CommCare.Shared.GetFieldValue("mcs_isthereaclaimonfile");
			if (!!sessionStorage) {
				sessionStorage.setItem("ClaimOnFile", claimOnFile);
			}
		}
	}

	function setMemoRequiredTradCC(isLoadReload) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName, "(", isLoadReload, ")");

		var generalTab = CommCare.Shared.FormContext.ui.tabs.get("General");
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");// already uses GUIDs
		var actionId = CommCare.Shared.GetCleanId(action);

		var ob1 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");

		if (!!generalTab) {
			if (generalTab.getDisplayState() == "expanded"
				&& !!actionId & !!ob1 
				&& actionId == CommCare.Constants.GUIDS.ActionIntersection.TraditionalCommunityCareACR) {
				if ((ob1 == CommCare.Constants.Integers.OBResolution.ProviderAgrees
					|| ob1 == CommCare.Constants.Integers.OBResolution.ProviderDisagrees)
					&& (!isLoadReload || isLoadReload.getEventArgs != undefined) //CRMCC-7300
				) {
					console.log("vhacrm_accountholdnotes_memo set to required")
					CommCare.Shared.SetRequired("vhacrm_accountholdnotes_memo", true);
				}
				else {
					console.log("vhacrm_accountholdnotes_memo set to NOT required")
					CommCare.Shared.SetRequired("vhacrm_accountholdnotes_memo", false);
				}
			}
		}
	}

	function requireAHRNotes() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var generalTab = CommCare.Shared.FormContext.ui.tabs.get("General");
		var opsTab = CommCare.Shared.FormContext.ui.tabs.get("tabChoiceOperationsGroup");
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // Already uses GUIDs
		var actionId = CommCare.Shared.GetCleanId(action);

		var ob1 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		var ob2 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

		if (!!generalTab) {
			if (generalTab.getDisplayState() == "expanded"
				&& !!actionId
				&& ((actionId == CommCare.Constants.GUIDS.ActionIntersection.CCNOPTUMACR
				|| actionId == CommCare.Constants.GUIDS.ActionIntersection.CCNTRIWestACR
				|| actionId == CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR
				|| actionId == CommCare.Constants.GUIDS.ActionIntersection.HealthNetACR)
					&& (ob1 != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting
						|| ob2 != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting)
				|| (actionId == CommCare.Constants.GUIDS.ActionIntersection.TraditionalCommunityCareACR)
					&& (ob1 == CommCare.Constants.Integers.OBResolution.ProviderAgrees
						|| ob1 == CommCare.Constants.Integers.OBResolution.ProviderDisagrees
					))
			) {
				CommCare.Shared.SetRequired("vhacrm_accountholdnotes_memo", true);
			}
			else {
				CommCare.Shared.SetRequired("vhacrm_accountholdnotes_memo", false);
			}
		}

		if (!!opsTab) {
			if (opsTab.getDisplayState() == "expanded"
				&& !!actionId
				&& (actionId == CommCare.Constants.GUIDS.ActionIntersection.CCNOPTUMACR
				|| actionId == CommCare.Constants.GUIDS.ActionIntersection.CCNTRIWestACR
				|| actionId == CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR
				|| actionId == CommCare.Constants.GUIDS.ActionIntersection.HealthNetACR)
			) {
				CommCare.Shared.SetRequired("vhacrm_choiceops_issuefeedback_memo", true);
			}
			else {
				CommCare.Shared.SetRequired("vhacrm_choiceops_issuefeedback_memo", "recommended");
			}
		}
	}

	function showHideOpsOBSection() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var OpsTab = CommCare.Shared.FormContext.ui.tabs.get("tabChoiceOperationsGroup");
		var OpsOBSection;
		var actionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); // Already uses GUIDs
		var queueId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_queueid"));

		var ob1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
		var ob2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
		var ob3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");

		var obNotNull = ob1 != null || ob2 != null || ob3 != null;

		if ((queueId == CommCare.Constants.GUIDS.Queues.Operations
			&& (actionId == CommCare.Constants.GUIDS.ActionIntersection.AmbulanceACR || actionId == CommCare.Constants.GUIDS.ActionIntersection.TraditionalCommunityCareACR))
			|| obNotNull
		) {
			if (!!OpsTab) {
				OpsOBSection = OpsTab.sections.get("OperationsOB");
				if (!!OpsOBSection) {
					OpsOBSection.setVisible(true);
				}
			}
		}
		else {
			if (!!OpsTab) {
				OpsOBSection = OpsTab.sections.get("OperationsOB");
				if (!!OpsOBSection) {
					OpsOBSection.setVisible(false);
				}
			}
		}
	}

	function OpsOBFieldLogic(isLoad) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var opsTab = CommCare.Shared.FormContext.ui.tabs.get("tabChoiceOperationsGroup");

		var actionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); // Already uses GUIDs
		var queueId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_queueid"));

		var ob1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
		var ob2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
		var ob3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");

		var ob2Fields = ["mcs_pomob2resolution", "mcs_pomob2date"];
		var ob3Fields = ["mcs_pomob3resolution", "mcs_pomob3date"];

		if (!!opsTab && opsTab.getDisplayState() == "expanded" && queueId == CommCare.Constants.GUIDS.Queues.Operations) {
			if (actionId == CommCare.Constants.GUIDS.ActionIntersection.AmbulanceACR || actionId == CommCare.Constants.GUIDS.ActionIntersection.TraditionalCommunityCareACR) {
				if (ob1 == null) {
					setVisibleOnMultipleFields(ob2Fields, false);
					setVisibleOnMultipleFields(ob3Fields, false);
					setValuesToNullOnMultipleFields(ob2Fields);
					setValuesToNullOnMultipleFields(ob3Fields);
				}
				else if (ob1 != null && ob2 == null && ob1 != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) {
					setVisibleOnMultipleFields(ob2Fields, true);
					setVisibleOnMultipleFields(ob3Fields, false);
					setValuesToNullOnMultipleFields(ob3Fields);
					//should I clear ob3?
				}
				else if (ob1 != null && ob2 == null && ob1 == CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) {
					setVisibleOnMultipleFields(ob2Fields, false);
					setVisibleOnMultipleFields(ob3Fields, false);
					if (isLoad === "onchange") CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed);
					if (isLoad === "onchange") CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
					setValuesToNullOnMultipleFields(ob3Fields);
					//should I clear ob2 and ob3?
				}
				else if (ob1 != null & ob2 != null && ob3 == null && ob2 != CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) {
					setVisibleOnMultipleFields(ob2Fields, true);
					setVisibleOnMultipleFields(ob3Fields, true);
				}
				else if (ob1 != null & ob2 != null && ob3 == null && ob2 == CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) {
					setVisibleOnMultipleFields(ob2Fields, true);
					setVisibleOnMultipleFields(ob3Fields, false);
					setValuesToNullOnMultipleFields(ob3Fields);
					if (isLoad === "onchange") CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed);
					if (isLoad === "onchange") CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
				}
				else if (ob1 != null && ob2 != null & ob3 != null) {
					setVisibleOnMultipleFields(ob2Fields, true);
					setVisibleOnMultipleFields(ob3Fields, true);
					if (ob3 == CommCare.Constants.Integers.ClosingTheLoopOBResolution.ResolutionProvided) {
						if (isLoad === "onchange") CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed);
						if (isLoad === "onchange") CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
					}
				}
			}
		}
	}

	function setValuesToNullOnMultipleFields(fields) {
		for (var i = 0; i < fields.length; i++) {
			CommCare.Shared.SetFieldValue(fields[i], null);
		}
	}

	function setDateForOpsOBFields(obField) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var field = "mcs_pomob" + obField + "date";
		CommCare.Shared.SetFieldValue(field, new Date());
	}

	function setValuesForTPA() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var tpa = CommCare.Shared.GetFieldValue("mcs_tpa_acr");

		if (!!tpa) {
			Xrm.WebApi.online.retrieveRecord("vhacrm_actionintersection", CommCare.Constants.GUIDS.ActionIntersection.ClosingTheLoopTPAResolutionACR, "?$select=vhacrm_name").then(
				function success(result) {
					var vhacrm_actionintersectionid = result["vhacrm_actionintersectionid"]; 
					var vhacrm_name = result["vhacrm_name"]; // Text
					var action = [{ id: vhacrm_actionintersectionid, entityType: "vhacrm_actionintersection", name: vhacrm_name }];

					CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", action);
					CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Pending);

					console.log("setValuesForTPA fire on change");
					CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
					CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
				},
				function (error) {
					console.log(error.message);
				}
			);
		}
	}

	function brLockOpsResolutions() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var opsOb1Res = {
			attr: CommCare.Shared.FormContext.getAttribute("mcs_pomob1resolution"),
			control: CommCare.Shared.FormContext.getControl("mcs_pomob1resolution"),
			value: CommCare.Shared.GetFieldValue("mcs_pomob1resolution"),
			setDisabled: function () {
				var retVal = opsOb1Res.value == null ? false
					: !validateOpsOBDate("OB1") ? false
						: true;

				opsOb1Res.control.setDisabled(retVal);
			}
		}
		var opsOb2Res = {
			attr: CommCare.Shared.FormContext.getAttribute("mcs_pomob2resolution"),
			control: CommCare.Shared.FormContext.getControl("mcs_pomob2resolution"),
			value: CommCare.Shared.GetFieldValue("mcs_pomob2resolution"),
			setDisabled: function () {
				var retVal = !validateOpsOBDate("OB2") ? false
					: opsOb2Res.value == null ? false
						: true;

				opsOb2Res.control.setDisabled(retVal);
			}
		}
		var opsOb3Res = {
			attr: CommCare.Shared.FormContext.getAttribute("mcs_pomob3resolution"),
			control: CommCare.Shared.FormContext.getControl("mcs_pomob3resolution"),
			value: CommCare.Shared.GetFieldValue("mcs_pomob3resolution"),
			setDisabled: function () {
				var retVal = opsOb3Res.value == null ? false
					: !validateOpsOBDate("OB3") ? false
						: true;

				opsOb3Res.control.setDisabled(retVal);
			}
		}
		var opsOb1Date = {
			attr: CommCare.Shared.FormContext.getAttribute("mcs_pomob1date"),
			control: CommCare.Shared.FormContext.getControl("mcs_pomob1date"),
			value: CommCare.Shared.GetFieldValue("mcs_pomob1date"),
			setDisabled: function () {
				var retVal = opsOb1Date.value == null ? false
					: !validateOpsOBDate("OB1") ? false
						: true;

				opsOb1Date.control.setDisabled(retVal);
			}
		}
		var opsOb2Date = {
			attr: CommCare.Shared.FormContext.getAttribute("mcs_pomob2date"),
			control: CommCare.Shared.FormContext.getControl("mcs_pomob2date"),
			value: CommCare.Shared.GetFieldValue("mcs_pomob2date"),
			setDisabled: function () {

				var retVal = !validateOpsOBDate("OB2") ? false
					: opsOb2Date.value == null ? false
						: true;

				opsOb2Date.control.setDisabled(retVal);
			}
		}
		var opsOb3Date = {
			attr: CommCare.Shared.FormContext.getAttribute("mcs_pomob3date"),
			control: CommCare.Shared.FormContext.getControl("mcs_pomob3date"),
			value: CommCare.Shared.GetFieldValue("mcs_pomob3date"),
			setDisabled: function () {
				var retVal = opsOb3Date.value == null ? false
					: !validateOpsOBDate("OB3") ? false
						: true;

				opsOb3Date.control.setDisabled(retVal);
			}
		}

		opsOb1Res.setDisabled();
		opsOb2Res.setDisabled();
		opsOb3Res.setDisabled();
		opsOb1Date.setDisabled();
		opsOb2Date.setDisabled();
		opsOb3Date.setDisabled();

	}

	function validateOpsOBDate(dateField) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var isValid = false;
		var today = new Date();
		var obDate = "";
		var ops1Date = CommCare.Shared.GetFieldValue("mcs_pomob1date");
		var ops2Date = CommCare.Shared.GetFieldValue("mcs_pomob2date");
		var ops3Date = CommCare.Shared.GetFieldValue("mcs_pomob3date");

		switch (dateField) {
			case "OB1":
				obDate = ops1Date;
				break;
			case "OB2":
				obDate = ops2Date;
				break;
			case "OB3":
				obDate = ops3Date;
				break;
		}

		CommCare.Shared.FormContext.ui.clearFormNotification("OPSBAD" + dateField + "DATE");
		CommCare.Shared.FormContext.ui.clearFormNotification("OPS2BADDATE");
		CommCare.Shared.FormContext.ui.clearFormNotification("OPS3BADDATE");

		if (obDate != null) obDate = new Date(obDate.getFullYear(), obDate.getMonth(), obDate.getDate());
		if (ops1Date != null) ops1Date = new Date(ops1Date.getFullYear(), ops1Date.getMonth(), ops1Date.getDate());
		if (ops2Date != null) ops2Date = new Date(ops2Date.getFullYear(), ops2Date.getMonth(), ops2Date.getDate());

		if (obDate != null) {
			if (obDate > today) {
				isValid = false;

				CommCare.Shared.FormContext.ui.setFormNotification("Operations " + dateField + " Date cannot be in the future.", "ERROR", "OPSBAD" + dateField + "DATE");
			}
			else {
				switch (dateField) {
					case "OB2":
						if (obDate < ops1Date) {
							CommCare.Shared.FormContext.ui.setFormNotification("Operations " + dateField + " Date cannot be prior to OB1 Date.", "ERROR", "OPS2BADDATE");
						}
						else {
							isValid = true;
						}
						break;
					case "OB3":
						if (obDate < ops1Date || obDate < ops2Date) {
							CommCare.Shared.FormContext.ui.setFormNotification("Operations " + dateField + " Date cannot be prior to OB1 or OB2 Date.", "ERROR", "OPS3BADDATE");
						}
						else {
							isValid = true;
						}
						break;
					default:
						isValid = true;
						break;
				}
			}
		}
		else {
			isValid = true;
		}

		if (isValid === false) {
			console.log("Invalid OPS OB Date.");
		}

		return isValid;
	}

	function setNotRequiredFieldsWhenNACR() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // fixed CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217

		// If ACR Request's OB1 Resolution is set to NACR, allow form to save to set Queue resolution to Resolved
		//if (purposeName == "ACR") { // fixed from testing string to GUID CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
				return;
			}

			CommCare.Shared.SetVisible("vhacrm_choiceops_visnid", true);
			CommCare.Shared.SetVisible("vhacrm_choiceops_siteid", true);

			var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
			var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
			var queueid = CommCare.Shared.FormContext.getAttribute("vhacrm_queueid").getValue();
			if (ob1Resolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting
				|| ob2Resolution === CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
				CommCare.Shared.SetRequired("vhacrm_ahr_ob1resolution_code", "none");
				CommCare.Shared.SetRequired("vhacrm_referredbyvamc_code", "none");
				CommCare.Shared.SetRequired("vhacrm_servicelocationcity_text", "none");
				CommCare.Shared.SetRequired("vhacrm_servicelocationstateid", "none");
				CommCare.Shared.SetRequired("mcs_categoryofcare", "none");
				CommCare.Shared.SetRequired("mcs_isthisincollectionsorthreatofentering", "none");
				CommCare.Shared.SetRequired("mcs_whatwasthetypeofcare", "none");
				CommCare.Shared.SetRequired("mcs_wereyoutravelingoutsideyourlocalarea", "none");
				CommCare.Shared.SetRequired("mcs_isthereaclaimonfile", "none");
				CommCare.Shared.SetRequired("vhacrm_actionintersectionid", "none");
				CommCare.Shared.SetRequired("mcs_communitycareprogram", "none"); // CRMCC - 7760
				CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
				CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
				CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
				CommCare.Shared.SetRequired("mcs_wastherea72hournotification", "none");
				CommCare.Shared.SetRequired("mcs_collectionscompany", "none");
				CommCare.Shared.SetRequired("mcs_collectionsphonenumber", "none");
				CommCare.Shared.SetRequired("ccwf_providerfacility_text", "none");
				CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", "none");
				CommCare.Shared.SetRequired("hrc_facilityid", "none");
				CommCare.Shared.SetRequired("mcs_authorizationnumber", "none");
				CommCare.Shared.SetRequired("mcs_authorizationlocation", "none");
				CommCare.Shared.SetRequired("mcs_validityfromdate", "none"); // CRMCC-5972
				CommCare.Shared.SetRequired("mcs_validitytodate", "none"); // CRMCC-5972
			} else {
				CommCare.Shared.SetRequired("vhacrm_ahr_ob1resolution_code", "required");
				if (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") !== null) {
					CommCare.Shared.SetRequired("vhacrm_referredbyvamc_code", "required");
				}
				CommCare.Shared.SetRequired("vhacrm_servicelocationcity_text", "required");
				CommCare.Shared.SetRequired("vhacrm_servicelocationstateid", "required");
				CommCare.Shared.SetRequired("mcs_categoryofcare", "required");
				CommCare.Shared.SetRequired("mcs_isthisincollectionsorthreatofentering", "required");
				if (CommCare.Shared.FormContext.getControl("mcs_whatwasthetypeofcare").getVisible()) CommCare.Shared.SetRequired("mcs_whatwasthetypeofcare", "required");
				if (CommCare.Shared.FormContext.getControl("mcs_wereyoutravelingoutsideyourlocalarea").getVisible()) CommCare.Shared.SetRequired("mcs_wereyoutravelingoutsideyourlocalarea", "required");
				if (CommCare.Shared.FormContext.getControl("mcs_isthereaclaimonfile").getVisible()) CommCare.Shared.SetRequired("mcs_isthereaclaimonfile", "required");
				if (CommCare.Shared.FormContext.getControl("mcs_wastherea72hournotification").getVisible()) CommCare.Shared.SetRequired("mcs_wastherea72hournotification", "required");
				//if (CommCare.Shared.FormContext.getControl("mcs_collectionscompany").getVisible()) CommCare.Shared.SetRequired("mcs_collectionscompany", "required");
				//if (CommCare.Shared.FormContext.getControl("mcs_collectionsphonenumber").getVisible()) CommCare.Shared.SetRequired("mcs_collectionsphonenumber", "required");

				CommCare.Shared.SetRequired("vhacrm_actionintersectionid", "required");
				CommCare.Shared.SetRequired("mcs_communitycareprogram", "required"); // CRMCC-7760
				setPRSNotRequiredWhenOB1NoContact();
				requireAuthNumber();
			}
		}
		else {
			CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
			CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
			CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
			CommCare.Shared.SetVisible("vhacrm_choiceops_visnid", false);
			CommCare.Shared.SetVisible("vhacrm_choiceops_siteid", false);
		}
	}

	function setPRSNotRequiredWhenOB1NoContact() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); // Fixed CRMCC-7217
		//var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null; CRMCC-7217
		var purposeID = CommCare.Shared.GetCleanId(purpose);

		// If ACR Request's OB1 Resolution is set to NACR, allow form to save to set Queue resolution to Resolved
		//if (purposeName == "ACR") { // fixed from testing string to GUID CRMCC-7217
		if (purposeID != null && CommCare.Constants.Compare.PurposeIntersection.ACR(purposeID)) {
			if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
				return;
			}

			var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
			var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
			var queueid = CommCare.Shared.FormContext.getAttribute("vhacrm_queueid").getValue();
			var actionid = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // Checked for null and to get GUID

			if (queueid !== null && actionid != null) {
				Xrm.WebApi.online.retrieveRecord("vhacrm_actionintersection", CommCare.Shared.GetCleanId(actionid), "?$select=vhacrm_name,_vhacrm_queueid_value").then(
					function success(result) {
						// Columns
						var vhacrm_actionintersectionid = result["vhacrm_actionintersectionid"]; // Guid
						var actionName = result["vhacrm_name"]; // Text
						var routeToQueue = result["_vhacrm_queueid_value"]; // Lookup


						if (ob1Resolution == CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting
							|| ob2Resolution == CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
							CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
							CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
							CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
						}
						else if (CommCare.Shared.GetCleanId(queueid) == CommCare.Constants.GUIDS.Queues.Operations
							&& routeToQueue == CommCare.Constants.GUIDS.Queues.ClosingTheLoop) {
							CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "required");
							CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "required");
							CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "required");
						}
						else {
							CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
							CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
							CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
						}

						var finalStatus = CommCare.Shared.GetFieldValue("mcs_operationsfinalstatus");

						var setRequired = (finalStatus == CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed
							|| (routeToQueue == CommCare.Constants.GUIDS.Queues.ClosingTheLoop
								&& CommCare.Shared.GetCleanId(queueid) == CommCare.Constants.GUIDS.Queues.Operations));

						//CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", setRequired);
						setRequiredOnMultipleFields(["vhacrm_choiceops_claimresolution_code", "vhacrm_choiceops_siteid", "vhacrm_choiceops_visnid"], setRequired);

						/*********************** OLD LOGIC   *********************************/
						//if ((ob1Resolution !== CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting
						//	|| ob2Resolution !== CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting)
						//	//&& actionid !== null
						//	//&& CommCare.Shared.GetCleanId(actionid) == CommCare.Constants.GUIDS.RequestAction_CLOSINGTHELOOP /*CommCare.Shared.DialogNameReturn(actionid[0].name).toLowerCase() !== "closing the loop"*/

						//	//&& !!queueid
						//	//&& CommCare.Shared.GetCleanId(queueid) != CommCare.Constants.GUIDS.Queues.CLOSINGTHELOOP

						//	//&& (routeToQueue != CommCare.Constants.GUIDS.Queues.CLOSINGTHELOOP
						//	//|| CommCare.Shared.GetCleanId(queueid) == CommCare.Constants.GUIDS.Queues.CLOSINGTHELOOP
						//	//|| CommCare.Shared.GetCleanId(queueid) != CommCare.Constants.GUIDS.Queues.OPERATIONS						)

						//	&& (CommCare.Shared.GetCleanId(queueid) != CommCare.Constants.GUIDS.Queues.OPERATIONS
						//	|| routeToQueue != CommCare.Constants.GUIDS.Queues.CLOSINGTHELOOP)
						//) {
						//	CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
						//	CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
						//	CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");

						//	var finalStatus = CommCare.Shared.GetFieldValue("mcs_operationsfinalstatus");

						//	var setRequired = (finalStatus == CommCare.Constants.Integers.ClosingTheLoopFinalStatus.Closed);
						//	CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", setRequired);
						//}
						//else {
						//	CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "required");
						//	CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "required");
						//	CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "required");
						//}
					},
					function (error) {
						console.log(error.message);
					}
				);
			}
			else {
				CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
				CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
				CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
			}
		}
	}

	function showHideIssueWasResolved() {
		var programValue = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programName = getLookupName(programValue);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		//var purposeName = getLookupName(purposeValue);
		var programID = CommCare.Shared.GetCleanId(programValue);
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		//let formattedPurposeName = purposeName != null ? purposeName.trim().toLowerCase() : null; CRMCC-7217
		//if (formattedPurposeName != null) {
		if (programValue != null) {
			//if (programName == "VISN/VAMC" && (formattedPurposeName.includes("complaints received") || formattedPurposeName.includes("compliments received for") || formattedPurposeName.includes("compliments received for") || formattedPurposeName.includes("billing concern") || formattedPurposeName.includes("quality and safety"))) { // fixed from testing string to GUID CRMCC-7217
			if (programName == "VISN/VAMC" &&
				(CommCare.Constants.Compare.PurposeIntersection.ComplaintsReceived(purposeID) ||
					CommCare.Constants.Compare.PurposeIntersection.ComplimentsReceivedFor(purposeID) ||
					CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) ||
					CommCare.Constants.Compare.PurposeIntersection.QualityAndSafety(purposeID))) {
				CommCare.Shared.SetVisible("mcs_issuewasresolved", true);
			} else {
				CommCare.Shared.SetVisible("mcs_issuewasresolved", false);
			}
		} else {
			CommCare.Shared.SetVisible("mcs_issuewasresolved", false);
		}
	}

	function lockActionVISNVAMCBillingConcern() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var programValue = CommCare.Shared.GetFieldValue("ccwf_programid");// fixed CRMCC-7217
		//var programName = getLookupName(programValue);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");// fixed CRMCC-7217
		//var purposeName = getLookupName(purposeValue);
		var programID = CommCare.Shared.GetCleanId(programValue);
		var purposeID = CommCare.Shared.GetCleanId(purposeValue);
		var issueWasResolved = CommCare.Shared.GetFieldValue("mcs_issuewasresolved");
		var queueItemValue = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
		//let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";

		//let formattedPurposeName = purposeName != null ? purposeName.trim().toLowerCase() : null;

		// The following is replaced below  CRMCC-7217
		//if (purposeName != null) { CRMCC-7217
		if (purposeID != null)
			//if (programName == "VISN/VAMC" && purposeNameFormatted.includes("billing concern") && issueWasResolved && !queueItemValue) { // fixed CRMCC-7217
			if (!!programID && programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.VISN_VAMC.toLowerCase() &&
				CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) && issueWasResolved && !queueItemValue) {
				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
				console.log("lockActionVISNVAMCBillingConcern fire on change");
				CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
				//} else if (programName == "VISN/VAMC" && purposeNameFormatted.includes("billing concern") && issueWasResolved && queueItemValue != null) { // fixed CRMCC-7217
			} else if (!!programID && programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.VISN_VAMC.toLowerCase() &&
				CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) && issueWasResolved && queueItemValue != null) {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_resolutionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
			}
			//else if (programName == "VISN/VAMC" && purposeNameFormatted.includes("billing concern") && !issueWasResolved && queueItemValue != null) { // fixed CRMCC-7217
			else if (!!programID && programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.VISN_VAMC.toLowerCase() &&
				CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) && !issueWasResolved && queueItemValue != null) {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
				CommCare.Shared.SetRequired("vhacrm_resolutionintersectionid", false);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
			}
			//else if (programName == "VISN/VAMC" && purposeNameFormatted.includes("billing concern") && issueWasResolved) { // fixed CRMCC-7217
			else if (!!programID && programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.VISN_VAMC.toLowerCase() &&
				CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID) && issueWasResolved) {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);

				//} else if (programName == "VISN/VAMC" && purposeNameFormatted.includes("billing concern")) { // fixed CRMCC-7217
			} else if (!!programID && programID.toLowerCase() == CommCare.Constants.GUIDS.Programs.VISN_VAMC.toLowerCase() &&
				CommCare.Constants.Compare.PurposeIntersection.BillingConcern(purposeID)) {
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
				//} else if (purposeName != null) {
			} else if (purposeID != null) {
				//if ((formattedPurposeName.includes("complaints received") || formattedPurposeName.includes("compliments received for") || formattedPurposeName.includes("quality and safety"))) { // fixed CRMCC-7217
				if (CommCare.Constants.Compare.PurposeIntersection.ComplaintsReceived(purposeID) ||
					CommCare.Constants.Compare.PurposeIntersection.ComplimentsReceivedFor(purposeID) ||
					CommCare.Constants.Compare.PurposeIntersection.QualityAndSafety(purposeID)) {
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
				} else {
					CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
				}

			} else {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
				//CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", false);
			}
	}

	function setActionBeingRequestedForIssueWasResolved() {
		var issueWasResolved = CommCare.Shared.GetFieldValue("mcs_issuewasresolved");
		if (issueWasResolved) {
//          CRMCC-6326 - changed wording
//			CommCare.Shared.SetFieldValue("mcs_actionbeingrequested", "Issue was Resolved");
			CommCare.Shared.SetFieldValue("mcs_actionbeingrequested", "Issue was Resolved - No Further Action Required");
			CommCare.Shared.SetReadOnly("mcs_actionbeingrequested", true);
		} else {
			var actionReq = CommCare.Shared.GetFieldValue("mcs_actionbeingrequested");

//          CRMCC-6326 - changed wording. Checking for both original and new in case historical data is not changed.
			//if (actionReq === "Issue was Resolved")
			if (actionReq === "Issue was Resolved" || actionReq === "Issue was Resolved - No Further Action Required")
				CommCare.Shared.SetFieldValue("mcs_actionbeingrequested", null);
			CommCare.Shared.SetReadOnly("mcs_actionbeingrequested", false);
		}
	}

	function brCollectionsOrThreat() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var collOrThreat = CommCare.Shared.GetFieldValue("mcs_isthisincollectionsorthreatofentering");
		if (collOrThreat === CommCare.Constants.Integers.HacYN.Yes) {
			CommCare.Shared.SetVisible("mcs_collectionscompany", true);
			CommCare.Shared.SetVisible("mcs_collectionsphonenumber", true);
			CommCare.Shared.SetVisible("mcs_dateenteredcollections", true);
		}
		else {
			CommCare.Shared.SetVisible("mcs_collectionscompany", false);
			CommCare.Shared.SetVisible("mcs_collectionsphonenumber", false);
			CommCare.Shared.SetVisible("mcs_dateenteredcollections", false);
		}
	}

	function hideShowCountryCode() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var countryCode = CommCare.Shared.GetFieldValue("mcs_countrycode");

		CommCare.Shared.SetVisible("mcs_countrycode", !!countryCode)
	}

	function requireRejectionReasonForRejectedAction() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		//var actionid = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); // fixed action CCCRM7217
		var actionID = CommCare.Shared.GetCleanId(action);
		//var actionName = getLookupName(action); // fixed action CCCRM7217

		var resolutionId = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
		var resolutionName = getLookupName(resolutionId);

		var setVis = false;

		//if (!!actionName) { // fixed action CCCRM7217
			//if (actionName.indexOf("Rejected -") > -1) // fixed action CCCRM7217
		if (!!action) { // fixed action CCCRM7217
			if (CommCare.Constants.Compare.ActionIntersection.RejectedDash(actionID))
				setVis = true;
		}

		if (!!resolutionName) {
			if (resolutionName.indexOf("Rejected -") > -1)
				setVis = true;
		}


		CommCare.Shared.SetVisible("mcs_rejectionreason", setVis);
		CommCare.Shared.SetRequired("mcs_rejectionreason", setVis);

		let rejectionReason = CommCare.Shared.GetFieldValue("mcs_rejectionreason");
		if (rejectionReason != null) {
			CommCare.Shared.SetVisible("mcs_rejectionreason", true);
		}

		//if (!!actionName) {
		//	//if (actionName != "Rejected by PATS-R" && actionName.indexOf("Rejected") > -1) {
		//	if (actionName.indexOf("Rejected") > -1) {
		//		CommCare.Shared.SetVisible("mcs_rejectionreason", true);
		//		CommCare.Shared.SetRequired("mcs_rejectionreason", true);
		//	} else {
		//		CommCare.Shared.SetVisible("mcs_rejectionreason", false);
		//		CommCare.Shared.SetRequired("mcs_rejectionreason", false);
		//	}
		//} else {
		//	CommCare.Shared.SetVisible("mcs_rejectionreason", false);
		//	CommCare.Shared.SetRequired("mcs_rejectionreason", false);
		//}
	}

	function lockTreatmentStatusOnVSignalsRequest() {
		//var pATSRIdHasAValue = CommCare.Shared.GetFieldValue("mcs_patsrid");
		var subpurposeID = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid"));
		var ownerId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ownerid"));
		var hasTreatmentStatus = CommCare.Shared.GetFieldValue("mcs_treatmentstatus");
		var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();
		Xrm.WebApi.online.retrieveRecord("systemuser", userId, "?$select=_positionid_value&$expand=teammembership_association($select=teamid)").then(
			function success(result) {
				//let serviceRecoveryTeamId = "594f2648-6c59-ea11-a99c-001dd8009f4b"; // fixed GUID CRMCC-7217
				let serviceRecoveryTeamId = CommCare.Constants.GUIDS.Teams.InvestigationTeam;
				//let serviceRecoveryApprovalTeamId = "9808acca-ad6e-ea11-a811-001dd8018866"; // fixed GUID CRMCC-7217
				let serviceRecoveryApprovalTeamId = CommCare.Constants.GUIDS.Teams.ServiceRecoveryApproval;
				let isOnSRTeam = false;
				let isOnSRATeam = false;

				for (var j = 0; j < result.teammembership_association.length; j++) {
					let teammembership_association_teamid = result.teammembership_association[j]["teamid"]; // Guid
					if (teammembership_association_teamid == serviceRecoveryTeamId) {
						isOnSRTeam = true;
					}
					if (teammembership_association_teamid == serviceRecoveryApprovalTeamId) {
						isOnSRATeam = true;
					}
				}
				if ((subpurposeID == CommCare.Constants.GUIDS.SubPurpose.NonVAVSignals.toLowerCase() || subpurposeID == CommCare.Constants.GUIDS.SubPurpose.NonVAVSignalsCX.toLowerCase()) &&
					(isOnSRATeam || isOnSRTeam)) {
					if (!!hasTreatmentStatus) {
						CommCare.Shared.SetReadOnly("mcs_treatmentstatus", true);
					} else {
						CommCare.Shared.SetReadOnly("mcs_treatmentstatus", false);
					}
				}
			}
		);

	}

	//function showHideBillingOutcome(show, require) { CRMCC-7147 because only call is commented out

	//	if (show == true) {
	//		if (CommCare.Shared.GetFieldValue("mcs_patsrcasetype") == "Investigation" && CommCare.Shared.GetFieldValue("mcs_patsrcasesubtype") == "Billing Issues") {
	//			CommCare.Shared.SetVisible("mcs_billingoutcome", true);
	//			CommCare.Shared.SetVisible("mcs_patsroutcome", false);
	//			CommCare.Shared.SetRequired("mcs_patsroutcome", false);
	//			if (require == true) {
	//				CommCare.Shared.SetRequired("mcs_billingoutcome", true);
	//			} else {
	//				CommCare.Shared.SetRequired("mcs_billingoutcome", false);
	//			}
	//		} else {
	//			CommCare.Shared.SetVisible("mcs_billingoutcome", false);
	//			CommCare.Shared.SetRequired("mcs_billingoutcome", false);
	//		}
	//	} else {
	//		CommCare.Shared.SetVisible("mcs_billingoutcome", false);
	//		CommCare.Shared.SetRequired("mcs_billingoutcome", false);
	//	}

	//}

	//No longer needed -- Moved to setNotRequired
	//why does the business rule show the fields in both cases?
	//function brACRChoiceOperationsCompleted() {
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); in unused code
	//	var purposeName;
	//	var choiceOperationsStatus = CommCare.Shared.GetFieldValue("vhacrm_choiceops_status_code");
	//	var actionName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); in unused code

	//	if (purposeValue !== null) {
	//		purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
	//	}

	//	if ((purposeName === "ACR"))  /*(&& actionName == "Closing the Loop"), (choiceOperationsStatus === CommCare.Constants.Integers.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
	//		//CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "required");
	//		//CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "required");
	//		//CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "required");
	//		setPRSNotRequiredWhenOB1NoContact();
	//		CommCare.Shared.SetVisible("vhacrm_choiceops_visnid", true);
	//		CommCare.Shared.SetVisible("vhacrm_choiceops_siteid", true);
	//	}
	//	else {
	//		CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
	//		CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
	//		CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
	//		CommCare.Shared.SetVisible("vhacrm_choiceops_visnid", false);
	//		CommCare.Shared.SetVisible("vhacrm_choiceops_siteid", false);
	//	}
	//}

	//function lockAdditionalFollowUpWhenEsclating() { CRMCC-7147 all calls commented out
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var isEscalating = CommCare.Shared.GetFieldValue("hac_cl1_needescalationtosrsup_bool");
	//	var followUp = CommCare.Shared.GetFieldValue("hac_cl1_additionalfollowupneeded_code");
	//	if (isEscalating && followUp == null) {
	//		CommCare.Shared.SetReadOnly("hac_cl1_additionalfollowupneeded_code", true);
	//	}

	//	var followUpAttempted = CommCare.Shared.GetFieldValue("hac_cl1_followupattempted_bool");
	//	var followUpAttemptedVisible = CommCare.Shared.FormContext.getControl("hac_cl1_followupattempted_bool").getVisible();
	//	var followUpMade = CommCare.Shared.GetFieldValue("hac_cl1_followupmade_bool");
	//	var followUpMadeVisible = CommCare.Shared.FormContext.getControl("hac_cl1_followupmade_bool").getVisible();

	//	if (followUpAttemptedVisible && !followUpAttempted && followUpMadeVisible && !followUpMade && isEscalating && followUp == null) {
	//		CommCare.Shared.SetReadOnly("hac_cl1_followupattempted_bool", true);
	//		CommCare.Shared.SetReadOnly("hac_cl1_followupmade_bool", true);
	//	}
	//}

	//function onChangeOfQueueResolutionOrOB1LockRequestAction_() { CRMCC-7147 replaced by onChangeOfQueueResolutionOrOB1LockRequestAction(
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);

	//	var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
	//	var isQRFieldDirty, isOB1CTLFieldDirty, isOB1AHRFieldDirty, isEitherFieldDirty;
	//	var requestActionFields;
	//	var ob1AHRValue;

	//	if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.ACR_FORM)) {

	//		isOB1CTLFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob1resolution_code").getIsDirty()) ? true : false;
	//		isOB1AHRFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_ahr_ob1resolution_code").getIsDirty()) ? true : false;
	//		isEitherFieldDirty = isOB1CTLFieldDirty || isOB1AHRFieldDirty;

	//		if (isOB1AHRFieldDirty) {
	//			ob1AHRValue = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
	//			// if Provider Agrees/Disagrees is selected, Request Action field should remain unlocked (CRMCC-2610)
	//			if (ob1AHRValue == 713770001 || ob1AHRValue == 713770002) {
	//				isEitherFieldDirty = false;
	//			}
	//		}
	//	}

	//	if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM)) {

	//		isQRFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").getIsDirty()) ? true : false;
	//		isEitherFieldDirty = isQRFieldDirty;
	//	}

	//	if ((currentForm != null) && ((currentForm.getId() === CommCare.Request.Constants.ACR_FORM) || (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM))) {
	//		//CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", isEitherFieldDirty);

	//		requestActionFields = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").controls;
	//		requestActionFields = requestActionFields["_collection"];

	//		for (var i in requestActionFields) {
	//			requestActionFields[i].setDisabled(isEitherFieldDirty);
	//		}
	//	}
	//}

	//function getQueueItemQueueName(queueItemId) { CRMCC-7147 not called
	//	return
	//}

	//function preFilterRemoveSendToPatsPurposesUpdateForm() { CRMCC-7147 only call commented out
	//	if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.UPDATE_FORM) {
	//		var fetchXml = "<filter>";
	//		fetchXml += "<condition attribute='mcs_sendtopatsr' operator='neq' value='1' />";
	//		fetchXml += "</filter>";

	//		CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addPreSearch(function () {
	//			console.log(fetchXml);
	//			CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addCustomFilter(fetchXml);
	//		});
	//	}
	//}

	//function hideQueueResolutionForNonServiceRecoveryApprovalNonServiceRecoveryApprovalTeam() { CRMCC-7147 only call commented out
	//	debugger;
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid") != null) { in unused code
	//		if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")[0]["name"] != "Service Recovery Approval") { in unused code
	//			var globalContext = Xrm.Utility.getGlobalContext();
	//			Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + globalContext.userSettings.userId.replace("{", "").replace("}", "").toLowerCase()).then(
	//				function success(results) {
	//					var membershipArray = [];
	//					for (var i = 0; i < results.entities.length; i++) {
	//						debugger;

	//						var teamPromise = new Promise(function (resolve, reject) {
	//							debugger;
	//							return Xrm.WebApi.online.retrieveRecord("team", results.entities[i]["teamid"], "?$select=name").then(
	//								function success(result) {
	//									resolve(result["name"]);
	//								},
	//								function (error) {
	//									reject(Xrm.Navigation.openAlertDialog({ text: error.message }));
	//								}
	//							);
	//						});
	//						membershipArray.push(teamPromise);
	//					}
	//					Promise.all(membershipArray).then(function (returnedTeams) {
	//						var showQueueResolution = false;
	//						for (var j = 0; j < returnedTeams.length; j++) {
	//							if (returnedTeams[j] == "Service Recovery Approval") {
	//								showQueueResolution = true;
	//							}
	//						}
	//						CommCare.Shared.SetVisible("vhacrm_resolutionintersectionid", showQueueResolution);
	//					});
	//				},
	//				function (error) {
	//					Xrm.Navigation.openAlertDialog({ text: error.message });
	//				}
	//			);

	//		}
	//	}
	//}

	//function objectIsEmpty(obj) { CRMCC-7147 not called
	//	for (var key in obj) {
	//		if (obj.hasOwnProperty(key)) return false;
	//	}
	//	return true;
	//}

	//function hideShowRequestActionC3Complaints() { CRMCC-7147 not called
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log("---> " + fName);
	//	var type = CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid");
	//	var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); in unused code

	//	if (purpose != null) {
	//		Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr").then(
	//			function success(result) {
	//				var mcs_sendtopatsr = result["mcs_sendtopatsr"];

	//				if (mcs_sendtopatsr == true && CommCare.Shared.GetCleanId(type) == CommCare.Shared.Constants.TYPE_INTERSECTION_C3) {
	//					CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
	//				}
	//			},
	//			function (error) {
	//				console.log(error.message);
	//			}
	//		);
	//	}
	//}

	//function USD_CallDCUGetDebtorNameFromKNumberAction(context) { CRMCC-7147 body commented out
	//	CallDCUGetDebtorNameFromKNumberAction();
	//}

	//function CallDCUGetDebtorNameFromKNumberAction() { CRMCC-7147 body commented out
	//var kNumber = CommCare.Shared.GetFieldValue("hac_boc_text");

	//var parameters = {};
	//parameters.billNumber = kNumber;

	//var req = new XMLHttpRequest();
	//req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/mcs_DCUGetDebtorNamefromKNumber", false);
	//req.setRequestHeader("OData-MaxVersion", "4.0");
	//req.setRequestHeader("OData-Version", "4.0");
	//req.setRequestHeader("Accept", "application/json");
	//req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	//req.onreadystatechange = function () {
	//    if (this.readyState === 4) {
	//        req.onreadystatechange = null;
	//        if (this.status === 200) {
	//            var result = JSON.parse(this.response);
	//            console.log("Successful Debtor Search with Results: ");
	//            console.log(result);
	//            launchDebtorSearch(result["debtorName"]);
	//        } else {
	//            console.log("Error in action call: " + this.statusText);
	//            //console.log(JSON.parse(this.response).error.message);
	//            $("#tmpDialog").hide();
	//            $("#noContent").show();
	//        }
	//    }
	//};
	//req.send(JSON.stringify(parameters));
	//}

	//function launchDebtorSearch(debtorName) {  CRMCC-7147 body commented out
	//var windowtoOpen;
	//var url
	//if (debtorName != null) {
	//    encodedName = encodeURI(debtorName);

	//    if (parent.window.IsUSD) {
	//        windowtoOpen = "http://event/?eventName=OpenDebtorSearch&searchValue=" + encodedName;

	//        setTimeout(function () {
	//            window.open(windowtoOpen);
	//        }, 1500);

	//    } else {
	//        url = Xrm.Utility.getGlobalContext().getClientUrl() + "/WebResources/mcs_DebtorSearch.html?data=searchValue%3D" + encodedName;
	//        window.open(url);
	//    }
	//}
	//}

	//function GetBillFromKNumber(kNumber) {  CRMCC-7147 body commented out
	//console.log("Begin Bill Search from KNumber - Finding Debtor Name");
	//var parameters = {};
	//parameters.billNumber = kNumber;

	//var GetDebtorName = CommCare.Shared.CallAction("mcs_DCUGetDebtorNamefromKNumber", parameters)

	//var CreateDebtorRecords = GetDebtorName.then(function (result) {
	//    var debtorName;
	//    if (result != null) debtorName = result["debtorName"];
	//    console.log("Creating Debtors with name " + debtorName);
	//    var params = {};
	//    params.searchValue = debtorName;

	//    return CommCare.Shared.CallAction("mcs_DCUCreateDebtors", params);
	//});

	//var RetrieveCreatedBill = CreateDebtorRecords.then(function (debtors) {
	//    console.log("Retrieving bill");
	//    var columns = "mcs_billofcollectionid";
	//    var filter = "$filter=mcs_name eq '" + kNumber + "'&$orderby=createdon desc";
	//    //"$filter=mcs_name eq '741-K700NNE'&$orderby=createdon desc";
	//    return CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("mcs_billofcollections", columns, filter);
	//});

	//return Promise.all([GetDebtorName, CreateDebtorRecords, RetrieveCreatedBill])
	//}



	//function lookupOrCreateBOC() {  CRMCC-7147 all calls commented out
	//    var bocNumber = CommCare.Shared.GetFieldValue("hac_boc_text");
	//    if (bocNumber != null && bocNumber.length == 11) {
	//        bocNumber = bocNumber.toUpperCase();
	//        var columns = "mcs_boctorequestid,mcs_name";
	//        var filter = "$filter=mcs_name eq '" + bocNumber + "'";
	//
	//
	//        CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
	//        CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("mcs_boctorequests", columns, filter).then(function (retBOC) {
	//            console.log(retBOC)
	//            if (retBOC.value.length == 0) {
	//                var entity = {};
	//                entity.mcs_name = bocNumber;
	//                CommCare.Shared.CreateRecord("mcs_boctorequests", entity).then(function (newRecord) {
	//                    CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_boctorequest", newRecord, bocNumber, "mcs_boctorequest");
	//                });
	//            }
	//            else {
	//                CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_boctorequest", retBOC.value[0]["mcs_boctorequestid"], bocNumber, "mcs_boctorequest");
	//            }
	//        }).catch(function (error) {
	//            console.log("Error retrieving record: " + error.message);
	//            console.log(error);
	//        });
	//    }
	//    else {
	//        CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("mcs_boctorequest", null, null, "mcs_boctorequest");
	//    }
	//    CommCare.Shared.FormContext.getAttribute("mcs_boctorequest").fireOnChange();
	//}

	//function USD_OpenBillFromKNumber(context) {  CRMCC-7147 body commented out
	//	OpenBillFromKNumber();
	//}

	//function OpenBillFromKNumber() {  CRMCC-7147 body commented out
	//var kNumber = CommCare.Shared.GetFieldValue("hac_boc_text");
	//if (kNumber != null && kNumber.length == 11) {
	//    GetBillFromKNumber(kNumber).then(function (allResponses) {
	//        if (allResponses != null) {
	//            try {
	//                billId = allResponses[2].value[0]["mcs_billofcollectionid"];
	//                if (billId != null) {
	//                    //Depricated Code
	//                    //var windowOptions = {
	//                    //    openInNewWindow: true
	//                    //};
	//                    //Xrm.Utility.openEntityForm("mcs_billofcollection", billId, null, windowOptions);

	//                    var entityFormOptions = {};
	//                    entityFormOptions.entityId = billId;
	//                    entityFormOptions.entityName = "mcs_billofcollection";
	//                    entityFormOptions.openInNewWindow = true;
	//                    Xrm.Navigation.openForm(entityFormOptions).then(function (success) { console.log("success: " + success); }, function (error) { console.log("error: " + error) });
	//                }
	//            } catch (e) {
	//                console.log("Error: " + e.message);
	//            }
	//        }
	//    });
	//}
	//}

	//function refreshBOCQuickView(executionContext) {  CRMCC-7147 all calls commented out
	//
	//    formContext = executionContext.getFormContext();
	//
	//    var quickViewControl = CommCare.Shared.FormContext.ui.quickForms.get("BOCToRequest");
	//    if (quickViewControl != null) {
	//
	//        setTimeout(function () {
	//            quickViewControl.refresh();
	//        }, 500);
	//    }
	//}


	//Duplicate function
	//function requireProviderFac(purposeName, interactedWith) {
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);

	//	if (purposeName === "Emergent Care Notification" && interactedWith === CommCare.Constants.Integers.InteractedWith.Provider && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM))) {
	//		CommCare.Shared.SetRequired("ccwf_providerfacility_text", "required");
	//	}
	//	else {
	//		CommCare.Shared.SetRequired("ccwf_providerfacility_text", "none");
	//	}
	//	MasterProviderTIN();
	//}


	//MOVED TO MASTER
	//function requireProviderOrCollections() {
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);

	//	var collectionsEnum = {
	//		Yes: 806860000,
	//		No: 806860001
	//	};

	//	var fields = [
	//		"vhacrm_provider_phoneno_text",
	//		"ccwf_providerfacility_text",
	//		"vhacrm_patientacctno_text",
	//		"mcs_collectionscompany",
	//		"mcs_collectionsphonenumber",
	//		"mcs_dateenteredcollections"
	//	];


	//	var collectionsThreat = CommCare.Shared.GetFieldValue("mcs_isthisincollectionsorthreatofentering");
	//	var colCompany = CommCare.Shared.GetFieldValue("mcs_collectionscompany");
	//	var providerFac = CommCare.Shared.GetFieldValue("ccwf_providerfacility_text");

	//	if (collectionsThreat == collectionsEnum.Yes) {

	//		setVisibleOnMultipleFields(fields, true);

	//		if (!!!colCompany && !!!providerFac) {
	//			CommCare.Shared.SetRequired("mcs_collectionscompany", true);
	//			CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

	//			CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
	//			CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
	//		}
	//		else if (!!colCompany && !!!providerFac) {
	//			CommCare.Shared.SetRequired("mcs_collectionscompany", true);
	//			CommCare.Shared.SetRequired("ccwf_providerfacility_text", false);

	//			CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
	//			CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", false);
	//		}
	//		else if (!!!colCompany && !!providerFac) {
	//			CommCare.Shared.SetRequired("mcs_collectionscompany", false);
	//			CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

	//			CommCare.Shared.SetRequired("mcs_collectionsphonenumber", false);
	//			CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);
	//		}
	//		else if (!!colCompany && !!providerFac) {
	//			CommCare.Shared.SetRequired("mcs_collectionscompany", true);
	//			CommCare.Shared.SetRequired("ccwf_providerfacility_text", true);

	//			CommCare.Shared.SetRequired("mcs_collectionsphonenumber", true);
	//			CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", true);
	//		}
	//	}
	//}

	//ProviderFacTIN REFACTOR

	//function callRoutingAction(id) {  CRMCC-7147 not called
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	debugger;
	//	return new Promise(function (resolve, reject) {
	//		var parameters = {};
	//		debugger;

	//		//id = "0623635d-d832-e811-8128-1458d04ef938";
	//		parameters.RequestEntityReference = { "incidentid": id, "@odata.type": "Microsoft.Dynamics.CRM.incident" };

	//		//JK can't find action
	//		var req = new XMLHttpRequest();
	//		req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/mcs_RouteActionButton", false);
	//		req.setRequestHeader("OData-MaxVersion", "4.0");
	//		req.setRequestHeader("OData-Version", "4.0");
	//		req.setRequestHeader("Accept", "application/json");
	//		req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	//		req.onreadystatechange = function () {
	//			console.log(this.readyState, this.status, this.statusText);
	//			if (this.readyState === 4) {
	//				req.onreadystatechange = null;
	//				if (this.status >= 200 && this.status < 300) {
	//					var result = JSON.parse(this.response);
	//					//Success - No Return Data - Do Something
	//					console.log("Successful create of Task with ID: " + result.TaskId);
	//					resolve("Sucess");
	//				} else {
	//					console.log("Error in Action call to create task: " + this.statusText);
	//					reject("Failed");
	//				}
	//			}
	//		};
	//		req.send(JSON.stringify(parameters));
	//	});
	//}

	//function callRoutingActionWorkflow(requestId) {  CRMCC-7147 not called
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	debugger;
	//	return new Promise(function (resolve, reject) {
	//		debugger;
	//		var workFlowName = "FM - Route Action Button";
	//		var workFlowId = "{C176A386-C155-4E8D-A0DB-0AADBCC8CE2E}";
	//		//var xmlData = Xrm.Utility.getGlobalContext().getClientUrl() + '/XRMServices/2011/OrganizationData.svc/WorkflowSet?$select=WorkflowId&$filter=StateCode/Value eq 1 and ParentWorkflowId/Id eq null and Name eq \'' + workFlowName + '\'';
	//		//var xmlHttp = new XMLHttpRequest();
	//		//xmlHttp.open("GET", xmlData, false);
	//		//xmlHttp.send();
	//		//if (xmlHttp.status == 200) {
	//		//    var result = xmlHttp.responseText;
	//		//    workFlowId = //------ (write logic to parse workflow id from xmlHttp object)
	//		//    }

	//		//Now Trigger the WorkFlow
	//		var functionName = "executeWorkflow >>";
	//		var query = "workflows(" + workFlowId.replace("}", "").replace("{", "") + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
	//		var data = {
	//			"EntityId": requestId
	//		};
	//		var req = new XMLHttpRequest();
	//		req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/" + query), true);
	//		req.setRequestHeader("Accept", "application/json");
	//		req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	//		req.setRequestHeader("OData-MaxVersion", "4.0");
	//		req.setRequestHeader("OData-Version", "4.0");
	//		req.onreadystatechange = function () {
	//			if (this.readyState == 4 /* complete */) {
	//				if (this.status == 204) {
	//					console.log("Successful workflow call");
	//					resolve("success");
	//					//success callback this returns null since no return value available.
	//				} else {
	//					//error callback
	//					console.log("Failed to call workflow");
	//					reject("failed");
	//				}
	//			}
	//		};
	//		req.send(JSON.stringify(data));
	//	});

	//}

	//function brRequireCommCareProgramForClosingTheLoop() {  CRMCC-7147 all calls commented out
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var actionName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")); in unused code
	//	var ob2resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

	//	if (ob2resolution != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting && actionName == "Closing the Loop") {
	//		CommCare.Shared.SetRequired("mcs_communitycareprogram", "required");
	//	}
	//	else {
	//		CommCare.Shared.SetRequired("mcs_communitycareprogram", "none");
	//	}
	//}
	//function constructNoBeneObject() {  CRMCC-7147 all calls commented out
	//	//construct object to pass into SetFieldValue
	//	var lookupValue = new Array();
	//	lookupValue[0] = new Object();
	//	lookupValue[0].id = CommCare.Request.Constants.NO_BENE_CONTACT;
	//	lookupValue[0].name = CommCare.Request.Constants.NO_BENE_CONTACT_NAME;
	//	lookupValue[0].entityType = "contact";
	//	return lookupValue;
	//}

	//function brShowHideMillBillRulingNotes() { CRMCC-7147 all calls commented out
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
	//	var lobName;
	//	var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
	//	var purposeDetailName;

	//	if (lob != null) {
	//		lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
	//	}
	//	if (purposeDetailValue != null) {
	//		purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
	//	}

	//	if ((lobName === "Customer Experience") && (purposeDetailName === "Mill Bill Ruling")) {
	//		setVisibleOnMultipleFields(["mcs_millbillrulingnotes"], true);
	//		setVisibleOnMultipleFields(["vhacrm_requestnotes_memo"], false);
	//	}
	//	else if ((lobName === "Customer Experience") && (purposeDetailName !== "Mill Bill Ruling")) {
	//		setVisibleOnMultipleFields(["vhacrm_requestnotes_memo"], true);
	//		setVisibleOnMultipleFields(["mcs_millbillrulingnotes"], false);
	//	}
	//}

	//NC Merge Candidate
	//function brNonCoreReason() {
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); in unused code
	//	var purposeName;

	//	if (purposeValue != null) {
	//		purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
	//	}

	//	if (purposeName === "Non-Core") {
	//		setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], true);
	//		setVisibleOnMultipleFields(["vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], false);
	//		setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "required");
	//	}
	//	else {
	//		setVisibleOnMultipleFields(["vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], true);
	//		setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], false);
	//		setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "none");
	//	}
	//}
	////NC Merge Candidate
	//function brNonCoreReasonInteraction() {
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var interactionPurposeValue = CommCare.Shared.GetFieldValue("ccwf_interactionpurpose");
	//	var interactionPurposeName;
	//	var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
	//	var lobName;

	//	if (interactionPurposeValue != null) {
	//		interactionPurposeName = CommCare.Shared.DialogNameReturn(interactionPurposeValue[0].name);
	//	}
	//	if (lob != null) {
	//		lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
	//	}

	//	if ((interactionPurposeName === "Non-Core") && (lobName = "Customer Experience")) {
	//		setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], true);
	//		setVisibleOnMultipleFields(["ccwf_interactionpurposedetail"], false);
	//		setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "required");
	//	}
	//	else if ((interactionPurposeName !== "Non-Core") && (lobName = "Customer Experience")) {
	//		setVisibleOnMultipleFields(["ccwf_interactionpurposedetail"], true);
	//		setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], false);
	//		setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "none");
	//	}
	//}

	//function showHideFacilityAcceptingRequests() { CRMCC-7147 all calls commented out
	//    var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//    console.log(fName);
	//    var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
	//    var lobName = getLookupName(lob);

	//    if (lobName == "OCC FM") {
	//        CommCare.Shared.SetVisible("mcs_facilityacceptingrequests", false);
	//    }
	//    else {
	//        CommCare.Shared.SetVisible("mcs_facilityacceptingrequests", true);
	//    }
	//}

	//function brNullifyACRBooleans() {  CRMCC-7147 alll calls commented out
	//	var collections = {
	//		attr: CommCare.Shared.FormContext.getAttribute("mcs_isthisincollectionsorthreatofentering"),
	//		control: CommCare.Shared.FormContext.getControl("mcs_isthisincollectionsorthreatofentering")
	//	};
	//	var traveling = {
	//		attr: CommCare.Shared.FormContext.getAttribute("mcs_wereyoutravelingoutsideyourlocalarea"),
	//		control: CommCare.Shared.FormContext.getControl("mcs_wereyoutravelingoutsideyourlocalarea")
	//	}
	//	var hour72 = {
	//		attr: CommCare.Shared.FormContext.getAttribute("mcs_wastherea72hournotification"),
	//		control: CommCare.Shared.FormContext.getControl("mcs_wastherea72hournotification")
	//	}
	//	var claimOnFile = {
	//		attr: CommCare.Shared.FormContext.getAttribute("mcs_isthereaclaimonfile"),
	//		control: CommCare.Shared.FormContext.getControl("mcs_isthereaclaimonfile")
	//	}

	//	collections.attr.setRequiredLevel("none");
	//	collections.attr.setValue(null);
	//	collections.control.setVisible(false);
	//	traveling.attr.setRequiredLevel("none");
	//	traveling.attr.setValue(null);
	//	traveling.control.setVisible(false);
	//	hour72.attr.setRequiredLevel("none");
	//	hour72.attr.setValue(null);
	//	hour72.control.setVisible(false);
	//	claimOnFile.attr.setRequiredLevel("none");
	//	claimOnFile.attr.setValue(null);
	//	claimOnFile.control.setVisible(false);
	//}

	//function clearPurposeDetial_OnChange() {  CRMCC-7147 never called
	//    var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); in unused code
	//    var purpName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;

	//    if (purpName != "Claim Status") {
	//        CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", null);
	//        CommCare.Shared.FormContext.getAttribute("vhacrm_subareaintersectionid").fireOnChange();
	//    }
	//}

	//function validateAssociatedRecordsForSave(requiredAssociatedRecordType, relatedEntityRequiredAttributes, RequestRequiredAttrs, searchAttribute, handleMessage) {  CRMCC-7147 all calls commented out
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	if (handleMessage === undefined)
	//		handleMessage = true;

	//	//Retrieve all records of RecordType supplied based on relation to current request record.
	//	var recordList = CommCare.Shared.GetEntityOData(requiredAssociatedRecordType, "", relatedEntityRequiredAttributes.join(), searchAttribute + "/Id,<guid>" + CommCare.Shared.FormContext.data.entity.getId());
	//	var level;

	//	//Loop each record verifying that the requiredAttributes are suppled by at least one entry then set requiredAttributes to not required and return true to allow save
	//	if (recordList !== null && recordList.results !== null && recordList.results.length > 0) {

	//		//for (i = 0; i < recordList.results.length; i++) {
	//		//    var record = recordList.results[e];
	//		//    if ((record.StateCode.Value == 0) || (record.StateCode.Value == 3)) {  //if StateCode is Open (0) or Scheduled (3) counted
	//		//        if (recordID != "{" + appt.ActivityId.toUpperCase() + "}")   // not counting the same record!
	//		//            numOfAppointments++;
	//		//    }
	//		//}
	//		level = "none";
	//	}
	//	//otherwise set fields to required and return false
	//	else {
	//		level = "required"; //"none";
	//	}

	//	//for (var i = 0, l = RequestRequiredAttrs.length; i < l; i++) {
	//	//
	//	//    if (CommCare.Shared.FormContext.getAttribute(RequestRequiredAttrs[i]) != null) {
	//	//        CommCare.Shared.FormContext.getAttribute(RequestRequiredAttrs[i]).setRequiredLevel(level);
	//	//    }
	//	//}

	//	if (level === "none") {
	//		return true;
	//	}

	//	if (level === "required") {
	//		if (handleMessage) {
	//			if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
	//				var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"); in unused code
	//				var requestName;

	//				if (requestAction !== null) {
	//					requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
	//				}

	//				console.log(requestName);
	//				console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
	//				var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
	//				if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Constants.Integers.OBResolution.NotAdverseCreditReporting) {
	//					CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ClaimRequired);
	//					CommCare.Request.Global.ClaimMessageShowing = true;

	//					//setTimeout(function () {
	//					//    window.open("http://event/?EventName=RequestClearProgressIndicator");
	//					//    console.log("*** Called event RequestClearProgressIndicator");
	//					//}, 1500);
	//				}
	//				else {
	//					// Load Edit does not require Adding a Claim to the request
	//					return true;
	//				}
	//			}

	//			if (requiredAssociatedRecordType === "vhacrm_referrals")
	//				CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Constants.MessageIDs.ReferralRequired);
	//		}

	//		return false;
	//	}
	//}

	//function openClaimQC() {  CRMCC-7147 never called
	//	var currId = CommCare.Shared.FormContext.data.entity.getId();

	//	var parentRecord = {
	//		entityType: "incident",
	//		id: currId,
	//	};
	//	var entityFormOptions = {};
	//	entityFormOptions["entityName"] = "bah_claim";
	//	entityFormOptions["useQuickCreateForm"] = true;
	//	entityFormOptions["createFromEntity"] = parentRecord;

	//	qcParams = {};

	//	var isClaimOnFile = CommCare.Shared.GetFieldValue("mcs_isthereaclaimonfile");
	//	if (isClaimOnFile !== null && isClaimOnFile === true) {
	//		qcParams["p_claimonfile"] = true;
	//	}

	//	return Xrm.Navigation.openForm(entityFormOptions, qcParams);
	//}

	//function HideSocialPaneItems() { CRMCC-7147 all calls commented out
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	//Unsupported method due to the inability to remove the Activities Pane and keep the Notes.
	//	//More importantly removes the ability to complete a Task on the pane without validation
	//	try {
	//		var ctrlElement = document.getElementById("header_notescontrol") == null ? parent.document.getElementById("header_notescontrol") : document.getElementById("header_notescontrol");
	//		if (ctrlElement.children != null && ctrlElement.children.length > 0) {
	//			for (var ele = 0; ele < ctrlElement.children.length; ele++) {
	//				var ctrl = ctrlElement.children[ele];

	//				if (ctrl.title == "ACTIVITIES") {
	//					ctrl.style.display = "none";
	//					if (ele + 1 < ctrlElement.children.length) { ctrlElement.children[ele + 1].click(); return; } else if (ele - 1 >= 0) {
	//						ctrlElement.children[ele - 1].click();
	//						return;
	//					}
	//				}
	//			}
	//		}
	//	}
	//	catch (e) {
	//		console.log("Error in hiding activities pane with message: " + e.message);
	//	}
	//}

	//function requireNoteForServiceRecoveryApproval(context, formType, lobName, actionName) {  CRMCC-7147 all calls commented out
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var validArray = [];
	//	var notes = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");
	//	var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")); in unused code
	//	let purposeNameFormatted = purposeName != null ? purposeName.trim().toLowerCase() : "";
	//	let actionNameFormatted = actionName != null ? actionName.trim().toLowerCase() : "";

	//	if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && actionNameFormatted.includes("service recovery approval") && purposeNameFormatted.includes("service recovery")) {
	//		if (formType == CommCare.Shared.Constants.CREATE_FORM && notes == null) {
	//			CommCare.Shared.FormContext.ui.setFormNotification("You must add a Request Note prior to saving this request", "ERROR", "ServiceRecoveryRequestNoteRequired");
	//			context.getEventArgs().preventDefault();
	//		}
	//		else if (formType == CommCare.Shared.Constants.UPDATE_FORM) {
	//			var annotationRequiredAttributes = ["ObjectId"];
	//			var RequestRequiredAttrs = [];
	//			var searchAttribute = "ObjectId";
	//			var isValid = validateAssociatedRecordsForSave("Annotation", annotationRequiredAttributes, RequestRequiredAttrs, searchAttribute, false);
	//			//validateAssociatedRecordsForSave("annotation", annotationRequiredAttributes, RequestRequiredAttrs, searchAttribute, false).then(function (isValid) {
	//			if (!isValid) {
	//				CommCare.Shared.FormContext.ui.setFormNotification("You must add a Request Note prior to saving this request", "ERROR", "ServiceRecoveryRequestNoteRequired");
	//				context.getEventArgs().preventDefault();
	//			}
	//			else {
	//				CommCare.Shared.FormContext.ui.clearFormNotification("ServiceRecoveryRequestNoteRequired");
	//			}
	//			//});
	//		}
	//		else {
	//			CommCare.Shared.FormContext.ui.clearFormNotification("ServiceRecoveryRequestNoteRequired");
	//		}
	//	}
	//}

	//function refreshPage() { CRMCC-7147 never called
	//	console.log("REFRESHING PAGE");
	//	//CommCare.Shared.FormContext.data.refresh(false);
	//}

	//function SetTINRequiredBOC() {  CRMCC-7147 never called
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);
	//	var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); in unused code
	//	var purposeName = getLookupName(purpose);

	//	var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
	//	var purposeDetailName = getLookupName(purposeDetail); // purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;

	//	if (purposeName == "Bill of Collections" && purposeDetailName == "Provider") {
	//		CommCare.Shared.SetRequired("ccwf_tin_text", "required");
	//		CommCare.Shared.SetVisible("ccwf_tin_text", true);
	//	}
	//}

	//function autoSaveContactMade(context) { CRMCC-7147 all calls commented out
	//	CommCare.Shared.FormContext.data.save();
	//}


	//function validateACRChoiceOperationsStatus() { CRMCC-7147 all calls commented out
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);

	//	var isValid = true;
	//	var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"); in unused code
	//	var purposeName = "";
	//	var choiceOperationsStatus = CommCare.Shared.GetFieldValue("vhacrm_choiceops_status_code");
	//	var queueid = CommCare.Shared.FormContext.getAttribute("vhacrm_queueid").getValue();
	//	var queueName = "";
	//	if (queueid != null) {
	//		queueName = CommCare.Shared.DialogNameReturn(queueid[0].name);
	//	}

	//	if (purposeValue !== null) {
	//		purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
	//	}

	//	if (purposeName === "ACR") {
	//		var errMsg = "This Request is already in the " + queueName + " Queue.";

	//		if (choiceOperationsStatus === CommCare.Constants.Integers.ChoiceOperationsGroupStatus.RouteToChoice && queueName === "Choice") {
	//			CommCare.Shared.FormContext.ui.setFormNotification(errMsg, "ERROR", "ALREADYINCHOICEQUEUE");
	//			alert(errMsg);
	//			isValid = false;
	//		}
	//		else {
	//			CommCare.Shared.CrmCommonJS.Notification.ClearNotification("ALREADYINCHOICEQUEUE");
	//		}

	//		if (choiceOperationsStatus === CommCare.Constants.Integers.ChoiceOperationsGroupStatus.RouteToOperations && queueName === "Operations") {
	//			CommCare.Shared.FormContext.ui.setFormNotification(errMsg, "ERROR", "ALREADYINOPERATIONSQUEUE");
	//			alert(errMsg);
	//			isValid = false;
	//		}
	//		else {
	//			CommCare.Shared.CrmCommonJS.Notification.ClearNotification("ALREADYINOPERATIONSQUEUE");
	//		}
	//	}

	//	return isValid;
	//}

})();
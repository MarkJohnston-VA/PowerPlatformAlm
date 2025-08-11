/// <reference path="Common/CommCareShared.min.js"/>

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

CommCare.Request.Global.AppointmentDateInPastMessageId = "APPOINTMENTDATEINPAST";
CommCare.Request.Global.AppointmentNoteRequiredMessageId = "APPOINTMENTORNOTEREQUIRED";
CommCare.Request.Global.ConsultNoteRequiredMessageId = "CONSULTORNOTEREQUIRED";
CommCare.Request.Global.ClaimRequiredMessageId = "CLAIMREQUIREDMESSAGE";
CommCare.Request.Global.ReferralRequiredMessageId = "REFERRALREQUIREDMESSAGE";
CommCare.Request.Global.NaNaVeteranMessageId = "NANAVETMESSAGE";
CommCare.Request.Global.FormType = null;
CommCare.Request.Global.ClaimMessageShowing = false;
CommCare.Request.Global.DoHubFetch = "";
CommCare.Request.Global.ReturnToVAMCFetch = "";
CommCare.Request.Global.AssignedToQuickCreateFetch = "";
CommCare.Request.Global.RouteActionLookupFetch = "";

CommCare.Request.Constants.OCCFM_FORM = "43132D83-9BC6-432A-B20C-2039CFC2E0C8";
CommCare.Request.Constants.ACR_FORM = "640932ba-e0f3-4107-849a-0cbec308fba5";
CommCare.Request.Constants.CCWF_FORM = "40ba7433-4b0b-4c58-bb2a-81e346e98910";
CommCare.Request.Constants.QUICKCREATE_FORM = "0131F842-65C0-47B8-85C7-D8272CDFA6EE";
CommCare.Request.Constants.CCWF_DEFAULT_LOB = "8D98D9F6-D4CE-E511-9415-0050568D64C9";
CommCare.Request.Constants.OCCFM_DEFAULT_LOB = "a9c7b284-f0e3-e611-9427-0050568d1c17";
CommCare.Request.Constants.CCWF_DEFAULT_LOB_NAME = "Customer Experience";
CommCare.Request.Constants.PURPOSE_DETAIL_CLAIM_STATUS_REPORT = "A57976C9-5211-E611-941D-0050568D64C9";
CommCare.Request.Constants.PURPOSE_DETAIL_INQUIRY = "BDE0A0CE-B30C-E611-941C-0050568D64C9";
CommCare.Request.Constants.PURPOSE_DETAIL_CHAMP_VA = "E1320787-62E7-E811-812C-1458D04E2F20";
CommCare.Request.Constants.PURPOSE_DETAIL_SPINA_BIFIDA = "FA10E899-62E7-E811-812C-1458D04E2F20";
CommCare.Request.Constants.PURPOSE_DETAIL_CWVV = "04FAD0AB-62E7-E811-812C-1458D04E2F20";
CommCare.Request.Constants.PURPOSE_DETAIL_CITI = "3CA6D4B7-62E7-E811-812C-1458D04E2F20";
CommCare.Request.Constants.PURPOSE_PREAUTH = "58DCBA85-A026-E711-942F-0050568D1C17";
CommCare.Request.Constants.NO_BENE_CONTACT = "D4745A79-BD2A-E711-9431-0050568D1C17";
CommCare.Request.Constants.ServiceRecoveryApprovalTeam = "9808acca-ad6e-ea11-a811-001dd8018866";
CommCare.Request.Constants.ServiceRecoveryQueue = "604f2648-6c59-ea11-a99c-001dd8009f4b";
CommCare.Request.Constants.PURPOSE_BILLINGCONCERN = "95121a83-46b7-eb11-8236-001dd80216dc";
CommCare.Request.Constants.REQUESTACTION_PAYMENTESCALATION = "41a1980d-48b7-eb11-8236-001dd80216dc";
CommCare.Request.Constants.REQUESTACTION_RETURNTOVAMC = "19febfb8-91f0-eb11-bacb-001dd8018ade";
CommCare.Request.Constants.PURPOSE_CUSTOMERSERVICECONCERN = "be5abf10-d7b4-eb11-8236-001dd802cd9a";
CommCare.Request.Constants.PROGRAM_TYPE_CSC = "81482FDC-43A5-E811-812C-1458D04D78B8";
CommCare.Request.Constants.PROGRAM_TYPE_NONVA = "b2e0a244-a39e-e511-940e-00155d14f3b4";
CommCare.Request.Constants.PROGRAM_TYPE_C3 = "d970695d-c0c5-e911-a984-001dd800ba25";
CommCare.Request.Constants.C3_NAME = "VISN/VAMC";
CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP = "8a9e214c-e562-ea11-a997-001dd800a749";
CommCare.Request.Constants.REQUESTACTION_ACRIMMEDIATE = "373a123a-e562-ea11-a997-001dd800a749";
CommCare.Request.Constants.REQUESTACTION_HEALTHNET = "3abc3a29-016d-ea11-a811-001dd8018230";
CommCare.Request.Constants.REQUESTACTION_CCNOPTUM = "2db51fd4-006d-ea11-a811-001dd8018230";
CommCare.Request.Constants.REQUESTACTION_CCNTRIWEST = "80a165fe-006d-ea11-a811-001dd8018230";
CommCare.Request.Constants.REQUESTACTION_AMBULANCE = "6e8d4241-1ed6-ec11-a7b4-001dd803526e";
CommCare.Request.Constants.REQUESTACTION_TRADCC = "9f21a18f-016d-ea11-a811-001dd8018230";
CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP = "6c3dce04-8e10-e611-811e-127b25dcbde7";
CommCare.Request.Constants.QUEUE_OPERATIONS = "d63af6a5-e012-e611-811e-127b25dcbde7";
CommCare.Request.Constants.QUEUE_PRS = "99ac1bf9-8d10-e611-811e-127b25dcbde7";

CommCare.Request.Constants.CurrentFormType = "Main";

CommCare.Request.Constants.PatientPerception = {
	Resolved: 803750000,
	Unresolved: 803750001
}

CommCare.Request.Constants.UnresolvedReason = {
	ClinicalConcern: 803750000,
	Law: 803750001,
	PatientSafety: 803750002,
	Policy: 803750003,
	Other: 803750004
}

CommCare.Request.Constants.TypeOfCare = {
	Emergent: 803750001,
	Urgent: 803750000,
	Scheduled: 803750002
}
CommCare.Request.Constants.InteractedWith =
{
	Provider: 810050000,
	Veteran: 810050001,
	MeaningfulRelationship: 810050002,
	VeteranRepresentative: 810050003,
	VAEmployee: 713770000,
	Other: 810050004,
	Beneficiary: 806860000,
	CampLeJeune: 806860006,
	Caregiver: 806860005,
	Clinical: 806860007,
	Congressional: 806860008,
	InternalGroup: 806860009,
	SocialWorker: 806860011,
	Sponsor: 806860002,
	Training: 806860012,
	VAGeneralCouncil: 806860013,
	VIPProvider: 803750000,
	CommunityProviderOffice: 803750002,
	TPA: 803750003
};
CommCare.Request.Constants.C6_InteractedWith_Options =
{
	Veteran: 810050001,
	MeaningfulRelationship: 810050002,
	VAEmployee: 713770000,
	Other: 810050004,
	Congressional: 806860008,
	VeteranRepresentative: 810050003,
	CommunityProviderOffice: 803750002,
	TPA: 803750003
}
CommCare.Request.Constants.MethodOfDelivery =
{
	Mail: 713770000,
	Email: 713770001,
	Fax: 713770002,
	VHIE: 803750000,
	NotClaimStatusReport: 713770003
};
CommCare.Request.Constants.OBResolution =
{
	NoContact: 713770000,
	ProviderAgrees: 713770001,
	ProviderDisagrees: 713770002,
	NotAdverseCreditReporting: 713770003
}
CommCare.Request.Constants.AuthorizationReceived =
{
	Yes: 713770000,
	No: 713770001
}
CommCare.Request.Constants.ReferredByVAMC =
{
	Yes: 713770000,
	No: 713770001
}
CommCare.Request.Constants.ChoiceOperationsGroupStatus =
{
	Unassigned: 713770000,
	InProgress: 713770002,
	PendingResponse: 713770007,
	NeedsMoreInformationRouteToCSC: 713770001,
	NeedsMoreInformationReturnToCAR: 713770006,
	RouteToOperations: 713770004,
	RouteToChoice: 713770005,
	CompletedRouteToClosingTheLoop: 713770003
}
CommCare.Request.Constants.ClosingTheLoopOBResolution =
{
	LeftVoicemail: 713770000,
	LeftMessage: 713770001,
	NoContactNoAnswer: 713770005,
	NumberDisconnected: 713770002,
	WrongNumber: 713770003,
	ResolutionProvided: 713770004
}
CommCare.Request.Constants.ClosingTheLoopFinalStatus =
{
	Pending: 713770000,
	Assigned: 713770001,
	Closed: 713770002
}
CommCare.Request.Constants.NotifyTheVAMC =
{
	Yes: 713770000,
	No: 713770001
}
CommCare.Request.Constants.HacYN =
{
	Yes: 806860000,
	No: 806860001
}
CommCare.Request.Constants.Source =
{
	Web: 3,
	Facebook: 2483,
	Twitter: 3986,
	Phone: 1,
	Chat: 810050001,
	Email: 2,
	Fax: 810050003,
	Mail: 810050004,
	Portal: 810050005,
	WalkIn: 810050006,
	Internal: 810050010,
	PATSR: 803750002
}
CommCare.Request.Constants.NonCoreReason =
{
	Choice: 713770000,
	ReferredToVAMCFacility: 713770001,
	UnsupportedVISN: 713770002,
	CallerDisconnected: 713770003,
	WrongNumber: 713770004,
	CreatedInError: 713770005,
	General: 806860000,
	Applicant: 806860001,
	Tricare: 806860002,
	VAMC: 806860003
}
CommCare.Request.Constants.ActionRouteType =
{
	VISN: 803750002,
	DCU: 803750000,
	Facility: 803750001,
	Queue: 806860000,
	Team: 806860001,
	Other: 806860002
}
CommCare.Request.Constants.TwoOptions =
{
	No: false,
	Yes: true
}
CommCare.Request.Constants.RelationshipToVeteran =
{
	Parent: 810050001,
	Spouse: 810050002,
	Child: 810050000,
	Sibling: 810050005,
	Friend: 810050003,
	Other: 810050004
}
CommCare.Request.Constants.RoutingReason =
{
	ReferralRequiresModification: 713770000,
	ApprovedConultWithoutReferral: 713770001,
	SARRequiredRequested: 713770002,
	Other: 713770003,
	Choice30: 713770004,
	Choice40: 713770005,
	ChoiceExcessiveBurdenNote: 713770006,
	NeedsMedicalReviewDetermination: 713770007
}
CommCare.Request.Constants.StatusCode =
{
	WaitingForDetails: 3,
	Researching: 4,
	Pending: 1,
	InProgress: 2,
	NotSubmitted: 810050002,
	Submitting: 810050003,
	Open: 810050004,
	Closed: 810050005,
	Approved: 810050006,
	Denied: 810050007,
	FailedtoProvideAdditionalDocumentation: 810050008,
	EscalatedtoTier3: 810050009,
	PATSRApproval: 810050010,
	InformationProvided: 1000,
	AnsweredQuestionInquiry: 810050000,
	Resolved: 5,
	ApprovedbyPA: 810050011,
	SenttoPA: 810050012,
	RejectedByPats: 810050017
}
CommCare.Request.Constants.PatsRPriority =
{
	Crisis0Day: 803750000,
	Emergent1Day: 803750001,
	Urgent3Day: 803750002,
	General7Day: 803750003,
	ReviewPriority21Day: 803750006,
	Correspondence30Day: 803750007,
	Appeals45Day: 803750004,
	Investigation60Day: 803750005
}

CommCare.Request.Constants.PatsROutcomes = {
	Approved: 803750000,
	Disapproved: 803750001,
	Founded: 803750002,
	Unfounded: 803750003
}

CommCare.Request.Constants.WhatWasTheTypeOfCare = {
	Urgent: 803750000,
	Emergent: 803750001,
	Scheduled: 803750002
}

CommCare.Request.Constants.ClaimResolution = {
	ClaimPaid: 713770000,
	ClaimDenied: 713770001,
	AdditionalInfoRequired: 713770002,
	SuspendedVAOGCRuling: 713770003,
	ProviderAgreesToWriteOff: 803750005
}

CommCare.Request.Constants.ShowFieldsInteractedWith =
{
	ccwf_tin_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.VeteranRepresentative],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.Other],
	ccwf_providerfacility_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice],
	vhacrm_otherrelationship_text: [],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_stateid: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_lastname_text: [],
	vhacrm_provideraddressline1_text: [],
	vhacrm_providercity_text: [],
	vhacrm_providerstateid: [],
	vhacrm_providerzip_text: []
};
CommCare.Request.Constants.AllShowFieldsInteractedWith =
{
	ccwf_tin_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.VeteranRepresentative],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.Other],
	ccwf_providerfacility_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship],
	vhacrm_otherrelationship_text: [],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_city_text: [],
	vhacrm_interaction_stateid: [],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
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
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee],
	ccwf_providerfacility_text: [],
	vhacrm_otherrelationship_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_stateid: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_lastname_text: [],
	vhacrm_provideraddressline1_text: [CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providercity_text: [CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providerstateid: [CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providerzip_text: [CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other]
};
CommCare.Request.Constants.CCRHideFieldsInteractedWith =
{
	ccwf_tin_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee],
	ccwf_providerfacility_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_otherrelationship_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_stateid: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_lastname_text: [],
	vhacrm_provideraddressline1_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providercity_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providerstateid: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providerzip_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other]
};
CommCare.Request.Constants.AllHideFieldsInteractedWith =
{
	ccwf_tin_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	ccwf_providerfacility_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_otherrelationship_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_interaction_stateid: [CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_lastname_text: [],
	vhacrm_provideraddressline1_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_providercity_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_providerstateid: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_providerzip_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	ccwf_interactionpurpose: [],
	vhacrm_firstname_text: []
};
CommCare.Request.Constants.SetRequiredInteractedWith =
{
	ccwf_tin_text: [],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.VeteranRepresentative],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.Other],
	ccwf_providerfacility_text: [],
	vhacrm_otherrelationship_text: [],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_stateid: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_lastname_text: [],
	vhacrm_provideraddressline1_text: [],
	vhacrm_providercity_text: [],
	vhacrm_providerstateid: [],
	vhacrm_providerzip_text: []
};
CommCare.Request.Constants.AllSetRequiredInteractedWith =
{
	ccwf_tin_text: [],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.VeteranRepresentative],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.Other],
	ccwf_providerfacility_text: [],
	vhacrm_otherrelationship_text: [],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_stateid: [],
	vhacrm_interaction_zip_text: [],
	vhacrm_lastname_text: [CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_provideraddressline1_text: [],
	vhacrm_providercity_text: [],
	vhacrm_providerstateid: [],
	vhacrm_providerzip_text: [],
	ccwf_interactionpurpose: [CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_firstname_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other]
};
CommCare.Request.Constants.SetNotRequiredInteractedWith =
{
	ccwf_tin_text: [CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee],
	ccwf_providerfacility_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_otherrelationship_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_stateid: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_lastname_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice],
	vhacrm_provideraddressline1_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providercity_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providerstateid: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_providerzip_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other]
};
CommCare.Request.Constants.AllSetNotRequiredInteractedWith =
{
	ccwf_tin_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_vsooffice_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_othertitle_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	ccwf_providerfacility_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_otherrelationship_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_relationshiptoveteran_code: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VeteranRepresentative, CommCare.Request.Constants.InteractedWith.VAEmployee, CommCare.Request.Constants.InteractedWith.Other],
	vhacrm_interaction_addressline1_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_city_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice, CommCare.Request.Constants.InteractedWith.Veteran, CommCare.Request.Constants.InteractedWith.VAEmployee],
	vhacrm_interaction_stateid: [CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_interaction_zip_text: [CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_lastname_text: [CommCare.Request.Constants.InteractedWith.TPA, CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice],
	vhacrm_provideraddressline1_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_providercity_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_providerstateid: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	vhacrm_providerzip_text: [CommCare.Request.Constants.InteractedWith.MeaningfulRelationship, CommCare.Request.Constants.InteractedWith.TPA],
	ccwf_interactionpurpose: [CommCare.Request.Constants.InteractedWith.Provider, CommCare.Request.Constants.InteractedWith.CommunityProviderOffice],
	vhacrm_firstname_text: []
};

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
		CallDCUGetDebtorNameFromKNumberAction: CallDCUGetDebtorNameFromKNumberAction,
		USD_CallDCUGetDebtorNameFromKNumberAction: USD_CallDCUGetDebtorNameFromKNumberAction,
		OpenBillFromKNumber: OpenBillFromKNumber,
		USD_OpenBillFromKNumber: USD_OpenBillFromKNumber,
		GeneratePQIForm: GeneratePQIForm,
		USD_GeneratePQIForm: USD_GeneratePQIForm,
		AdditionalRequestButton: AdditionalRequestButton_Click,
		USD_SaveForm: SaveForm
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
			var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
			var actionIdParam = CommCare.Shared.GetFieldValue("p_actionintersectionid"); //CommCare.Shared.FormContext.data.attributes.get("p_actionintersectionid").getValue();
			var actionNameParam = CommCare.Shared.GetFieldValue("p_actionintersectionname"); //CommCare.Shared.FormContext.data.attributes.get("p_actionintersectionname").getValue();
			if (purposeName == "ACR" && actionIdParam != null && actionNameParam != null) {
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
			id: interactionLookupVal[0].id,
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
			if (homeFac[0]["name"] !== "CX Contact Center") {
				quickcreateparams["p_homefacilityid"] = homeFac[0].id;
				quickcreateparams["p_homefacilityname"] = homeFac[0].name;
			}
		}

		var homeVisn = CommCare.Shared.GetFieldValue("ccwf_visn");
		if (homeVisn !== undefined && homeVisn !== null) {
			if (homeVisn[0]["name"] !== "CX Contact Center") {
				quickcreateparams["p_homevisnid"] = homeVisn[0].id;
				quickcreateparams["p_homevisnname"] = homeVisn[0].name;
			}
		}

		var serVisn = CommCare.Shared.GetFieldValue("vhacrm_visnid");
		if (serVisn !== undefined && serVisn !== null) {
			if (serVisn[0]["name"] !== "CX Contact Center") {
				quickcreateparams["p_servicingvisnid"] = serVisn[0].id;
				quickcreateparams["p_servicingvisnname"] = serVisn[0].name;
			}
		}

		var servFac = CommCare.Shared.GetFieldValue("hrc_facilityid");
		if (servFac !== undefined && servFac !== null) {
			if (servFac[0]["name"] !== "CX Contact Center") {
				quickcreateparams["p_servicingfacilityid"] = servFac[0].id;
				quickcreateparams["p_servicingfacilityname"] = servFac[0].name;
			}
		}

		quickcreateparams["p_actionintersectionid"] = "373A123A-E562-EA11-A997-001DD800A749";
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
				id: cid,
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

	function form_OnLoad(context, formType) {
		if (formType !== undefined) {
			CommCare.Request.Constants.CurrentFormType = formType.toLowerCase();
		}

		CommCare.Shared.GetFormContext(context);
		//CommCare.Shared.HashHandler();


		//CRMCC-209 Moved so that the on save handler is only called once - Chad Marshall


		if (CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) {
			navigateForm();
		}
		else {
			onLoadCallback();
		}
	}

	function onLoadCallback() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		//debugger;
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
		if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_ccwf_mivsearchrequest");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_SendEmailButton");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_VeteranAlerts");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "IFRAME_VeteranSidebar");
			CommCare.Shared.SetChildContext(CommCare.Shared.FormContext, "WebResource_request_north52_quick_referral_button");
		}


		if (lobName == CommCare.Shared.Constants.OCCFM_LOB_NAME) {
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
			//
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
		preFilterRouteActionLookup(true);
		setTreatmentStatusPreFilter();

		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-preFilterRouteActionLookup: " + endTimer.toString() + " milliseconds");

		//Hide or show resolution based on lob, action and purpose
		handleHiddenFields();
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
		CommCare.Shared.SetOnChange("hac_pdinumber_text", handleRequestOnSaveFM);
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
		//short code ywB
		if (CommCare.Shared.FormContext.ui.getFormType() != 1) {
			var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
			//if (currentFormId == CommCare.Request.Constants.ACR_FORM) {
			var validRoles = ["HAC Supervisor", "System Administrator", "Partner Group - CSC LOTW"];
			CommCare.Shared.CrmCommonJS.Security.UserHasRole(validRoles).then(function (isInRole) {
				if (!isInRole) {
					CommCare.Shared.FormContext.ui.tabs.get("tab_5").setVisible(false);
				}
			}).catch(function (error) {
				console.log("Error Checking if user has role. Not disabling Complaint tab. Error Message: " + error);
			});
			//}

			//short codes qIJ, fDp
			if ((currentFormId == CommCare.Request.Constants.CCWF_FORM) &&
				(CommCare.Request.Global.FormType === CommCare.Shared.Constants.UPDATE_FORM)) {
				var validRoles = ["Community Care - CSC Supervisor/Leadership"];
				CommCare.Shared.CrmCommonJS.Security.UserHasRole(validRoles).then(function (isInRole) {
					if (isInRole) {
						CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", false); //qIJ
						CommCare.Shared.SetReadOnly("customerid", false); //fDp
					}
				}).catch(function (error) {
					console.log("Error Checking if user has role. Not enabling Resolution and Customer fields. Error Message: " + error);
				});
			}

			//short code 2XO
			if (currentFormId == CommCare.Request.Constants.CCWF_FORM) {
				CommCare.Shared.SetOnChange("ccwf_endingdate_date", validateMODBeginAndEndDates);
				CommCare.Shared.SetOnChange("ccwf_beginningdate_date", validateMODBeginAndEndDates);
			}
		}

		CommCare.Shared.SetOnChange("vhacrm_ahr_ob1resolution_code", setOB1Date);
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

		if (currentFormId == CommCare.Request.Constants.CCWF_FORM) {
			acrTabsHideShow(true);
		}

		brShowOldACRStuff();
		perfTimer = performance.now();
		endTimer = perfTimer - startTimer;
		console.log("Request-LoadComplete: " + endTimer.toString() + " milliseconds");
		showHidePATSRResolutionsAndRejections(true);
		CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").addOnChange(function () { showHidePATSRResolutionsAndRejections(false) });

		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
		lockFormForPatsrRejection(getLookupName(action));
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
		CommCare.Shared.SetOnChange("mcs_treatmentstatus", showHideTreatmentStatusSubType);
		CommCare.Shared.SetOnChange("mcs_treatmentstatus", clearSubTypeOnChangeOfTreatmentStatus);
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

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName;

		if (purposeValue !== null) {
			purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		}

		var fieldNames = [];
		if (purposeName === "ACR") {
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
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification("ESRTIMEOUT");
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

					CommCare.Shared.FormContext.ui.setFormNotification("This Request has one or more Notes attached", "WARNING", "REQUESTNOTESEXIST");
				} else {
					console.log("No Notes are attached to Request.");

					CommCare.Shared.FormContext.ui.clearFormNotification("REQUESTNOTESEXIST");
				}
			}).catch(function (error) {
				console.log("Error retrieving any Note records on Request: " + error.message);
				console.log(error);
			});
		}
	}

	//function validateACRChoiceOperationsStatus() {
	//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
	//	console.log(fName);

	//	var isValid = true;
	//	var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
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

	//		if (choiceOperationsStatus === CommCare.Request.Constants.ChoiceOperationsGroupStatus.RouteToChoice && queueName === "Choice") {
	//			CommCare.Shared.FormContext.ui.setFormNotification(errMsg, "ERROR", "ALREADYINCHOICEQUEUE");
	//			alert(errMsg);
	//			isValid = false;
	//		}
	//		else {
	//			CommCare.Shared.CrmCommonJS.Notification.ClearNotification("ALREADYINCHOICEQUEUE");
	//		}

	//		if (choiceOperationsStatus === CommCare.Request.Constants.ChoiceOperationsGroupStatus.RouteToOperations && queueName === "Operations") {
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

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");

		if (purposeName == "ACR") {
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

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

		if (purposeName == "ACR") {
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

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
		var ob1Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1date_date");

		if (purposeName == "ACR") {
			if ((ob1Resolution != null) && (ob1Date == null)) {
				var now = new Date();
				CommCare.Shared.SetFieldValue("vhacrm_cl_ob1date_date", now);
			}
		}
	}

	function setCLOB2Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
		var ob2Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2date_date");

		if (purposeName == "ACR") {
			if ((ob2Resolution != null) && (ob2Date == null)) {
				var now = new Date();
				CommCare.Shared.SetFieldValue("vhacrm_cl_ob2date_date", now);
			}
		}
	}

	function setCLOB3Date() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		var ob3Resolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");
		var ob3Date = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3date_date");

		if (purposeName == "ACR") {
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

	function validateFaxNumber() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);

		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName;

		if (purposeValue !== null) {
			purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		}

		var fieldNames = [];
		if (purposeName === "ACR") {
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

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName;

		if (purposeValue !== null) {
			purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		}

		var fieldNames = [];
		if (purposeName === "ACR") {
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

		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName;

		if (purposeValue !== null) {
			purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		}

		var fieldNames = [];
		if (purposeName === "ACR") {
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

	function autoSaveContactMade(context) {
		CommCare.Shared.FormContext.data.save();
	}

	function setRoutingReasonOptions() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var xrmPage = CommCare.Shared.FormContext;
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lineOfBusinessName = lineOfBusiness != null ? CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) : null;

		if (lineOfBusinessName != CommCare.Shared.Constants.OCCFM_LOB_NAME) {
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
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
				routingReasonOptions.ReferralRequiresModification = xrmPage.getAttribute(pickListFieldName).getOption(713770000);
				routingReasonOptions.ApprovedConsultWithoutReferral = xrmPage.getAttribute(pickListFieldName).getOption(713770001);
				routingReasonOptions.RFSRequiredRequested = xrmPage.getAttribute(pickListFieldName).getOption(713770002);
				routingReasonOptions.Other = xrmPage.getAttribute(pickListFieldName).getOption(713770003);
				routingReasonOptions.Choice30 = xrmPage.getAttribute(pickListFieldName).getOption(713770004);
				routingReasonOptions.Choice40 = xrmPage.getAttribute(pickListFieldName).getOption(713770005);
				routingReasonOptions.ChoiceExcessiveBurdenNote = xrmPage.getAttribute(pickListFieldName).getOption(713770006);
				routingReasonOptions.NeedsMedicalReviewDetermination = xrmPage.getAttribute(pickListFieldName).getOption(713770007);
			}

			routingReasonOptionSet.clearOptions();

			switch (purposeName) {
				case "Authorizations/Referrals":
				case "Appointments":
				case "Claim Status":
					routingReasonOptionSet.addOption(routingReasonOptions.ReferralRequiresModification);
					routingReasonOptionSet.addOption(routingReasonOptions.ApprovedConsultWithoutReferral);
					routingReasonOptionSet.addOption(routingReasonOptions.RFSRequiredRequested);
					routingReasonOptionSet.addOption(routingReasonOptions.Other);
					break;
				case "Eligibility & Benefits":
					routingReasonOptionSet.addOption(routingReasonOptions.Choice30);
					routingReasonOptionSet.addOption(routingReasonOptions.ChoiceExcessiveBurdenNote);
					break;
				default:
					routingReasonOptionSet.addOption(routingReasonOptions.ReferralRequiresModification);
					routingReasonOptionSet.addOption(routingReasonOptions.ApprovedConsultWithoutReferral);
					routingReasonOptionSet.addOption(routingReasonOptions.RFSRequiredRequested);
					routingReasonOptionSet.addOption(routingReasonOptions.Other);
					routingReasonOptionSet.addOption(routingReasonOptions.Choice30);
					routingReasonOptionSet.addOption(routingReasonOptions.Choice40);
					routingReasonOptionSet.addOption(routingReasonOptions.ChoiceExcessiveBurdenNote);
					routingReasonOptionSet.addOption(routingReasonOptions.NeedsMedicalReviewDetermination);
					break;
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
		var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
		var requestName;

		if (requestAction !== null) {
			requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);

			var formItem = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
			if (formItem != null) {
				var currentFormId = formItem.getId();
				if (currentFormId === CommCare.Request.Constants.CCWF_FORM) {
					if (requestName === "Escalation to CSC" || requestName === "Escalation to COR" || requestName === "Escalation to NVCC") {
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
			if (bocNumber != null && bocNumber != "741-K") {
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
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = getLookupName(purpose);

		if (lineOfBusinessName == CommCare.Shared.Constants.OCCFM_LOB_NAME && purposeName == "Preauthorization") {
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
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = getLookupName(purposeValue);
		var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var lobName = getLookupName(lob);

		var setVal = purposeName == "Mission Act" ? lobName == "OCC FM" ? true : false : false
		CommCare.Shared.SetVisible("mcs_escalatetotier3", setVal);
	}

	function SetTINRequiredBOC() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = getLookupName(purpose);

		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetail); // purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;

		if (purposeName == "Bill of Collections" && purposeDetailName == "Provider") {
			CommCare.Shared.SetRequired("ccwf_tin_text", "required");
			CommCare.Shared.SetVisible("ccwf_tin_text", true);
		}
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

	function refreshPage() {
		console.log("REFRESHING PAGE");
		//CommCare.Shared.FormContext.data.refresh(false);
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
		if (currentFormId == CommCare.Request.Constants.ACR_FORM) {
			var action = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").getValue();
			if (action != null) {
				if (CommCare.Shared.GetCleanId(action) != CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP)
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
				if (ahrOb1 === CommCare.Request.Constants.OBResolution.NoContact && ahrOb2 === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
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
		var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");

		if (formType === CommCare.Shared.Constants.UPDATE_FORM) {

			if (lineOfBusinessName !== null && lineOfBusinessName === CommCare.Shared.Constants.CCWF_LOB_NAME) {
				//StopSave(context);
				console.log("this is where Im checking");
				//handleCustomerCareOnSave(context).then((result) => {
				//	console.log("returned from handleCustomerCareOnSave");
				//	console.log(result);
				//});
				await handleCustomerCareOnSaveAsync(context).then((isValid) => {
					console.log("returned from handleCustomerCareOnSave");
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
		lockFormForPatsrRejection(getLookupName(action));
		lockReceiptDateOnSaveWithTask();

		if (CommCare.Request.Constants.CurrentFormType.toLowerCase() != "quickcreate") {
			//lockReceiptDateOnSaveWithTask();
			lockTaskTitleAndDueDate();
		}
	}

	function requireNoteForServiceRecoveryApproval(context, formType, lobName, actionName) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var validArray = [];
		var notes = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");
		var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));

		if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && actionName == "Service Recovery Approval" && purposeName == "Service Recovery") {
			if (formType == CommCare.Shared.Constants.CREATE_FORM && notes == null) {
				CommCare.Shared.FormContext.ui.setFormNotification("You must add a Request Note prior to saving this request", "ERROR", "ServiceRecoveryRequestNoteRequired");
				context.getEventArgs().preventDefault();
			}
			else if (formType == CommCare.Shared.Constants.UPDATE_FORM) {
				var annotationRequiredAttributes = ["ObjectId"];
				var RequestRequiredAttrs = [];
				var searchAttribute = "ObjectId";
				var isValid = validateAssociatedRecordsForSave("Annotation", annotationRequiredAttributes, RequestRequiredAttrs, searchAttribute, false);
				//validateAssociatedRecordsForSave("annotation", annotationRequiredAttributes, RequestRequiredAttrs, searchAttribute, false).then(function (isValid) {
				if (!isValid) {
					CommCare.Shared.FormContext.ui.setFormNotification("You must add a Request Note prior to saving this request", "ERROR", "ServiceRecoveryRequestNoteRequired");
					context.getEventArgs().preventDefault();
				}
				else {
					CommCare.Shared.FormContext.ui.clearFormNotification("ServiceRecoveryRequestNoteRequired");
				}
				//});
			}
			else {
				CommCare.Shared.FormContext.ui.clearFormNotification("ServiceRecoveryRequestNoteRequired");
			}
		}
	}

	function stopProviderWithContactRequest(context, lineOfBusinessName) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = getLookupName(purposeDetailValue);
		var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = getLookupName(purposeValue);
		var cust = CommCare.Shared.GetFieldValue("customerid");
		var custName = getLookupName(cust);

		if (cust[0].entityType == "account" && purposeDetailName != "Provider") {
			StopSave(context);
			CommCare.Shared.CrmCommonJS.Notification.SetError("This Request must have a Purpose of Bill of Collections with a Purpose Detail of Provider due to the Customer Attached", "BOCMESSAGE");
		}
		else if (cust[0].entityType == "contact" && purposeName == "Bill of Collections" && purposeDetailName == "Provider") {
			StopSave(context);
			CommCare.Shared.CrmCommonJS.Notification.SetError("A Request regarding a person cannot have the Purpose of Bill of Collections and Subpurpose of Provider", "BOCMESSAGE");
		}
	}

	function updateFacAndVisn_ChoiceOps() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var coVisn = CommCare.Shared.GetFieldValue("vhacrm_choiceops_visnid");
		var invalidVISN = ["4593E98C-9393-E511-940E-00155D14F3B4", "C493FBB7-9393-E511-940E-00155D14F3B4", "5DC638DE-9393-E511-940E-00155D14F3B4"];
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

		if ((LOB === "Customer Experience" || LOB === "OCC FM") && custIDName == CommCare.Shared.DefaultContactRecord[0].name) {
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");

			var purposeDetailName = purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;
			var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
			var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;
			var actionName = getLookupName(action);

			var validForNaNa = false;
			if (purposeDetailName == "Claim Status Report") validForNaNa = true;
			if (purposeName == "Non-Core") validForNaNa = true;
			if (programTypeName == "Help Desk") validForNaNa = true;
			if (actionName == "Camp Lejeune") validForNaNa = true;
			if (LOB === CommCare.Shared.Constants.OCCFM_LOB_NAME && purposeName == "Mission Act") validForNaNa = true;
			if (purposeName == "Service Recovery") validForNaNa = true;

			if (!validForNaNa) {
				StopSave(context);
				console.log("Invalid NA NA Request Blocked");
				//CommCare.Shared.CrmCommonJS.Notification.SetError("A Request cannot be created for the N/A N/A Master Veteran or Beneficiary.  Please Associate a Person to this request.", NANAVETMESSAGE);
				alert("A Request cannot be created for the N/A N/A Master Veteran or Beneficiary.  Please Associate a Person to this request.");
			}
		}
	}

	function HideSocialPaneItems() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		//Unsupported method due to the inability to remove the Activities Pane and keep the Notes.  
		//More importantly removes the ability to complete a Task on the pane without validation
		try {
			var ctrlElement = document.getElementById("header_notescontrol") == null ? parent.document.getElementById("header_notescontrol") : document.getElementById("header_notescontrol");
			if (ctrlElement.children != null && ctrlElement.children.length > 0) {
				for (var ele = 0; ele < ctrlElement.children.length; ele++) {
					var ctrl = ctrlElement.children[ele];

					if (ctrl.title == "ACTIVITIES") {
						ctrl.style.display = "none";
						if (ele + 1 < ctrlElement.children.length) { ctrlElement.children[ele + 1].click(); return; } else if (ele - 1 >= 0) {
							ctrlElement.children[ele - 1].click();
							return;
						}
					}
				}
			}
		}
		catch (e) {
			console.log("Error in hiding activities pane with message: " + e.message);
		}
	}

	function setContactToDefaultOnCreatedInError() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var nonCoreReasonText = CommCare.Shared.GetOptionSetText("vhacrm_noncorereason_code");
		//console.log(CommCare.Shared.DefaultContactRecord);
		//console.log(nonCoreReasonText);
		if (nonCoreReasonText == "Created in Error") {
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

		if (custName === CommCare.Shared.DefaultContactRecord[0].name) {
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
			//if (CommCare.Shared.DialogNameReturn(action[0].name) == "Closing the Loop") {
			if (CommCare.Shared.GetCleanId(queue) == CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP) {
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
				if (currentFormId == CommCare.Request.Constants.ACR_FORM) {
					CommCare.Shared.FormContext.ui.tabs.get("General").setVisible(true);
					//var generalDisplayState = CommCare.Shared.FormContext.getDisplayState("General")
					//if (generalDisplayState != "expanded")
					if (isOnLoad == true) CommCare.Shared.FormContext.ui.tabs.get("General").setDisplayState("expanded");
					var queueid = CommCare.Shared.FormContext.getAttribute("vhacrm_queueid").getValue();
					var action = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").getValue();
					if (queueid != null) {
						//if (CommCare.Shared.DialogNameReturn(action[0].name) == "Closing the Loop") {
						if (CommCare.Shared.GetCleanId(queueid) == CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP) {
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
						//if (CommCare.Shared.DialogNameReturn(queueid[0].name) == "PR&S" || CommCare.Shared.DialogNameReturn(queueid[0].name) == "Operations" || CommCare.Shared.DialogNameReturn(queueid[0].name) == "Closing the Loop") {
						if (CommCare.Shared.GetCleanId(queueid) == CommCare.Request.Constants.QUEUE_PRS
							|| CommCare.Shared.GetCleanId(queueid) == CommCare.Request.Constants.QUEUE_OPERATIONS
							|| CommCare.Shared.GetCleanId(queueid) == CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP) {
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
		if (currentFormId === CommCare.Request.Constants.CCWF_FORM) {
			var programid = CommCare.Shared.FormContext.getAttribute("ccwf_programid").getValue();
			var setVis = false;
			if (programid != null) {
				(CommCare.Shared.DialogNameReturn(programid[0].name) === "Help Desk") ? setVis = true : setVis = false;
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

	async function handleCustomerCareOnSaveAsync(context) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		clearFormValidations();
		var requestId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
		var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
		var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var purposeDetailName = purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;
		var customerId = CommCare.Shared.GetFieldValue("customerid");
		var customerIdName = customerId != null ? CommCare.Shared.DialogNameReturn(customerId[0].name) : null;
		var routingReason = CommCare.Shared.GetFieldValue("vhacrm_routingreason_code");
		var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
		var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;
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

		if (requestAction !== null) {
			requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
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

		if ((actionsNeedingClaims.indexOf(requestName) > -1 && ((requestName == "Load Edit" || requestName == "VAMC Internal Review" || requestName == "Initial Claim Review" || requestName == "Escalated Claim Review" || purposeName == "Claim Status") ||
			((requestName == "Tier Two CCN-Optum" || requestName == "Tier Two CCN-Triwest" || requestName == "Tier Two Local Contract" || requestName == "Tier Two Emergent Care" || requestName == "Tier Two VCA" || requestName == "Escalate to Tier One" || requestName == "Not Active, For Testing Only - Tier One" || requestName == "Send to VAMC") &&
				(CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Emergent || CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Urgent))
		)) || purposeName == "Appeal" || (purposeName == "Billing Concern" && requestName == "Payment Escalation" && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)) || (purposeName == "ACR" && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM))
			|| (purposeName === "Traveling Veteran" && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM) && resolutionName != "Resolved")
			|| (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") == null && purposeName == "ACR" && ob1AhrResolution != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting && ob2AhrResolution != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting)
		) {
			var claimRequiredPromise = await Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name&$filter=_ccwf_requestid_value eq " + requestId);
			console.log(claimRequiredPromise);
			if (claimRequiredPromise.entities.length == 0) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
				isValid = false;
			}
		}


		if ((actionsNeedingReferrals.indexOf(requestName) > -1 && CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Scheduled)
			|| requestName === "Create Appointment"
			|| (routingReason !== null && (routingReason === CommCare.Request.Constants.RoutingReason.ReferralRequiresModification || routingReason === CommCare.Request.Constants.RoutingReason.SARRequiredRequested))) {
			var referralRequiredPromise = await Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date&$filter=_vhacrm_requestid_value eq " + requestId);
			if (referralRequiredPromise.entities.length == 0) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
				isValid = false;
			}
		}

		if (requestName === "Modify Appointment" || requestName === "Cancel Appointment" ||
			((routingReason !== null && routingReason === CommCare.Request.Constants.RoutingReason.ReferralRequiresModification) || requestName == "Set Up Consult")) {
			var noteRequiredPromise = await Xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=_objectid_value&$filter=_objectid_value eq " + requestId);
			if (noteRequiredPromise.entities.length == 0) {
				//CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Note to the Request to save changes and move forward.", CommCare.Request.Global.NoteRequiredMessageId);
				isValid = false;
			}
		}

		if (requestName === "Modify Appointment" || requestName === "Cancel Appointment") {
			var apptIdTemp = CommCare.Shared.GetFieldValue("vhacrm_vetappidtempfield_text");
			var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
			var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");

			if (apptIdTemp === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("An appointment is needed for this process. Please attach an appointment, or complete the following fields in the Notes box:\r\nDate*\r\nTime*\r\nFacility*\r\nProgram*\r\nType of Service*\r\nReferral/Auth Number*\r\nVISN*", CommCare.Request.Global.AppointmentNoteRequiredMessageId);
			}
		}

		if (requestName === "Cancel Appointment") {
			var apptDate = CommCare.Shared.GetFieldValue("vhacrm_appointmentdatetime_date");

			if (apptDate !== null) {
				var dateNow = new Date();

				if (apptDate < dateNow) {
					CommCare.Shared.CrmCommonJS.Notification.SetError("Request cannot be saved with appointment that occurs in the past.  Please select a future appointment.", CommCare.Request.Global.AppointmentDateInPastMessageId);
				}
			}
		}

		if ((routingReason !== null && routingReason === CommCare.Request.Constants.RoutingReason.ApprovedConultWithoutReferral) || requestName == "Set Up Consult") {
			var consultList = CommCare.Shared.GetFieldValue("vhacrm_consult_id_list");
			var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
			var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");

			if (consultList === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
				CommCare.Shared.CrmCommonJS.Notification.SetError("A consult is needed for this process. Please attach a consult, or complete the following fields in the Notes box:\r\nDate*\r\nConsult Title*\r\nRequesting Provider*\r\nConsult Status*\r\nConsult Number*\r\nConsult Urgency*", CommCare.Request.Global.ConsultNoteRequiredMessageId);
			}
		}

		if (CommCare.Shared.DefaultContactRecord != null) {
			if (customerIdName == CommCare.Shared.DefaultContactRecord[0].name && programTypeName != "Help Desk" && (requestName != "Claim Status Report" || purposeDetailName != "Claim Status Report") && purposeName != "Non-Core" && purposeName != "Service Recovery") {
				CommCare.Shared.CrmCommonJS.Notification.SetError("N/A N/A Master cannot be the associated vet if the Purpose Detail or Action is not Claim Status Report.  Please use the Associate Person button in your ribbon to begin a search.", CommCare.Request.Global.NaNaVeteranMessageId);
				isValid = false;
			}
		}

		if (purposeName == "ACR") {
			if (!CommCare.Shared.FormIsValid(CommCare.Request.Constants.ACR_FORM)) {
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

			if (opsStatus == CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed) {
				if (ob1 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided
					&& ob2 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided
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

			if (ob1AhrResolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
				|| ob2AhrResolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
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

			if (resName === "Resolved") {
				var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");
				if (initialResolutionDate == null) {
					var now = new Date();
					CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
				}
			}
		}


		return isValid;
	}


	function handleCustomerCareOnSave(context) {
		return new Promise((resolve, reject) => {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			//StopSave(context);
			//Reset all form level validation for execution again.
			clearFormValidations();

			if (!isValidationNeeded_HandleCustomerCareOnSave) {
				isValidationNeeded_HandleCustomerCareOnSave = true;
				return;
			}

			var requestId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
			var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
			var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName = purposeDetail != null ? CommCare.Shared.DialogNameReturn(purposeDetail[0].name) : null;
			var customerId = CommCare.Shared.GetFieldValue("customerid");
			var customerIdName = customerId != null ? CommCare.Shared.DialogNameReturn(customerId[0].name) : null;
			var routingReason = CommCare.Shared.GetFieldValue("vhacrm_routingreason_code");
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;
			var isValid = true;
			var actionsNeedingClaims = [];
			var actionsNeedingReferrals = [];
			var requestName;
			/////// new promise chain region
			var topLevelPromiseArray = [];

			//var topLevelPromise = new Promise((resolve, reject) => {
			if (requestAction !== null) {
				requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
				var requestActionsRequiringClaimPromise = Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$select=_mcs_action_value&$filter=mcs_name eq 'RequestActionsRequiringClaims' and statecode eq 0").then(
					function success(results) {

						for (var i = 0; i < results.entities.length; i++) {
							actionsNeedingClaims.push(results.entities[i]["_mcs_action_value@OData.Community.Display.V1.FormattedValue"]);
						}
						var requestActionsRequiringClaimsArray = [];
						if (actionsNeedingClaims.indexOf(requestName) > -1) {
							if (requestName == "Load Edit") {
								var requiredAssociatedRecordType = "bah_claim";
								var loadEditPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(loadEditPromise);
								console.log("loadEditPromise");
							} else if (requestName == "VAMC Internal Review" || requestName == "Initial Claim Review" || requestName == "Escalated Claim Review") {
								var requiredAssociatedRecordType = "bah_claim";
								var vamcReviewPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(vamcReviewPromise);
								console.log("vamcReviewPromise");
							} else if (purposeName == "Claim Status") {
								var requiredAssociatedRecordType = "bah_claim";
								var claimStatusPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(claimStatusPromise);
								console.log("claimStatusPromise");
							} else if ((requestName == "Tier Two CCN-Optum" || requestName == "Tier Two CCN-Triwest" || requestName == "Tier Two Local Contract" || requestName == "Tier Two Emergent Care" || requestName == "Tier Two VCA" || requestName == "Escalate to Tier One" || requestName == "Not Active, For Testing Only - Tier One") &&
								//programTypeName == "Non-VA" &&
								(CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Emergent || CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Urgent)) {
								var requiredAssociatedRecordType = "bah_claim";
								var tierTwoPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
										}
										return false;
									},
									function (error) {
										Xrm.Utility.alertDialog(error.message);
									}
								);
								requestActionsRequiringClaimsArray.push(tierTwoPromise);
								console.log("tierTwoPromise");
							} else if (requestName === "Create Appointment") {
								var requiredAssociatedRecordType = "vhacrm_referrals";
								var createAppointmentPromise = Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date,vhacrm_inpatientoutpatient_code,vhacrm_name,_vhacrm_servicingfacilityid_value,vhacrm_todate_date,vhacrm_vendor_text&$filter=_vhacrm_requestid_value eq " + requestId).then(
									function success(results) {
										if (results.entities.length > 0) {
											return true;
										} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
											var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
											var requestName;

											if (requestAction !== null) {
												requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
											}

											console.log(requestName);
											console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
											var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
											if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
												CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
												CommCare.Request.Global.ClaimMessageShowing = true;
											}
											else {
												return true;
											}
										} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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
						if (actionsNeedingClaims.indexOf(requestName) > -1 && CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Scheduled) {
							var requiredAssociatedRecordType = "vhacrm_referrals";
							var careTypeScheduledPromise = Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date&$filter=_vhacrm_requestid_value eq " + requestId).then(
								function success(results) {
									if (results.entities.length > 0) {
										return true;
									} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
										var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
										var requestName;

										if (requestAction !== null) {
											requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
										}

										console.log(requestName);
										console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
										var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
										if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
											CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
											CommCare.Request.Global.ClaimMessageShowing = true;
										}
										else {
											return true;
										}
									} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
										CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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


				if (requestName === "Modify Appointment" || requestName === "Cancel Appointment") {
					var apptIdTemp = CommCare.Shared.GetFieldValue("vhacrm_vetappidtempfield_text");
					var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
					var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");
					if (apptIdTemp === null) {
						var requiredAssociatedRecordType = "annotation";
						var modifyCancelAppointmentPromise = Xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=_objectid_value&$filter=_objectid_value eq " + requestId).then(
							function success(results) {
								if (results.entities.length > 0) {
									return true;
								} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
									var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
									var requestName;

									if (requestAction !== null) {
										requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
									}

									console.log(requestName);
									console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
									var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
									if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
										CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
										CommCare.Request.Global.ClaimMessageShowing = true;
									}
									else {
										return true;
									}
								} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
									CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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
						//	CommCare.Shared.CrmCommonJS.Notification.SetError("An appointment is needed for this process. Please attach an appointment, or complete the following fields in the Notes box:\r\nDate*\r\nTime*\r\nFacility*\r\nProgram*\r\nType of Service*\r\nReferral/Auth Number*\r\nVISN*", CommCare.Request.Global.AppointmentNoteRequiredMessageId);
						//	StopSave(context);
						//}
					}
				}

				if (purposeName == "Appeal") {
					var requiredAssociatedRecordType = "bah_claim";
					var appealPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
						function success(results) {
							if (results.entities.length > 0) {
								return true;
							} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
								var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
								var requestName;

								if (requestAction !== null) {
									requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
								}

								console.log(requestName);
								console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
								var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
								if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
									CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
									CommCare.Request.Global.ClaimMessageShowing = true;
								}
								else {
									return true;
								}
							} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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

				if (requestName === "Cancel Appointment") {
					var apptDate = CommCare.Shared.GetFieldValue("vhacrm_appointmentdatetime_date");

					if (apptDate !== null) {
						var dateNow = new Date();

						if (apptDate < dateNow) {
							CommCare.Shared.CrmCommonJS.Notification.SetError("Request cannot be saved with appointment that occurs in the past.  Please select a future appointment.", CommCare.Request.Global.AppointmentDateInPastMessageId);
							//StopSave(context);
						}
					}
				}
			}

			if (purposeName == "Billing Concern" && requestName == "Payment Escalation") {
				var requiredAssociatedRecordType = "bah_claim";
				var billingConcernPaymentEscalationPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=ccwf_billedamount_currency,ccwf_dateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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

			if (purposeName == "ACR") {
				var requiredAssociatedRecordType = "bah_claim";
				var acrPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=ccwf_billedamount_currency,ccwf_dateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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

			if (purposeName === "Traveling Veteran") {
				var resolutionLookup = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
				var resolutionName = "";
				if (resolutionLookup != null)
					resolutionName = CommCare.Shared.DialogNameReturn(resolutionLookup[0].name);
				var requiredAssociatedRecordType = "bah_claim";
				var travelingVetPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=ccwf_billedamount_currency,ccwf_dateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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

			if (routingReason !== null && (routingReason === CommCare.Request.Constants.RoutingReason.ReferralRequiresModification || routingReason === CommCare.Request.Constants.RoutingReason.SARRequiredRequested)) {
				var requiredAssociatedRecordType = "vhacrm_referrals";
				var modificationSarRequiredPromise = Xrm.WebApi.online.retrieveMultipleRecords("vhacrm_referrals", "?$select=vhacrm_fromdate_date,vhacrm_inpatientoutpatient_code,vhacrm_name,_vhacrm_servicingfacilityid_value,vhacrm_todate_date,vhacrm_vendor_text&$filter=_vhacrm_requestid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
						}
						return false;
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(modificationSarRequiredPromise);
				console.log("modificationSarRequiredPromise");
			} else if ((routingReason !== null && routingReason === CommCare.Request.Constants.RoutingReason.ReferralRequiresModification) || requestName == "Set Up Consult") {
				var handleMessage = false;

				var consultList = CommCare.Shared.GetFieldValue("vhacrm_consult_id_list");
				var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
				var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");
				var requiredAssociatedRecordType = "annotation";
				var referralModificationPromise = Xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=_objectid_value&$filter=_objectid_value eq " + requestId).then(
					function success(results) {
						if (results.entities.length > 0) {
							return true;
						} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
							var requestName;

							if (requestAction !== null) {
								requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
							}

							console.log(requestName);
							console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
							var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
							if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
								CommCare.Request.Global.ClaimMessageShowing = true;
							}
							else {
								return true;
							}
						} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
							CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
						}
						return false;
					},
					function (error) {
						Xrm.Utility.alertDialog(error.message);
					}
				);
				topLevelPromiseArray.push(referralModificationPromise);
				console.log("referralModificationPromise");
				//if (consultList === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
				//	CommCare.Shared.CrmCommonJS.Notification.SetError("A consult is needed for this process. Please attach a consult, or complete the following fields in the Notes box:\r\nDate*\r\nConsult Title*\r\nRequesting Provider*\r\nConsult Status*\r\nConsult Number*\r\nConsult Urgency*", CommCare.Request.Global.ConsultNoteRequiredMessageId);
				//}
				//else {
				//	isValid = true;
				//}
			}

			if (CommCare.Shared.DefaultContactRecord != null) {
				if (customerIdName == CommCare.Shared.DefaultContactRecord[0].name && programTypeName != "Help Desk" && (requestName != "Claim Status Report" || purposeDetailName != "Claim Status Report") && purposeName != "Non-Core" && purposeName != "Service Recovery") {
					CommCare.Shared.CrmCommonJS.Notification.SetError("N/A N/A Master cannot be the associated vet if the Purpose Detail or Action is not Claim Status Report.  Please use the Associate Person button in your ribbon to begin a search.", CommCare.Request.Global.NaNaVeteranMessageId);
					//StopSave(context);
					isValid = false;
				}
			}

			//Replaces N52 formula 'Request - Validate Request Action'
			var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
			var actionIntersection = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var state = CommCare.Shared.GetFieldValue("statecode");

			var resolutionLookup = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
			var resolutionName = "";
			if (resolutionLookup != null)
				resolutionName = CommCare.Shared.DialogNameReturn(resolutionLookup[0].name);

			if (queueItem != null && actionIntersection == null && actionIntersection != "97eecf60-5111-e611-941d-0050568d64c9" && state == 0 && resolutionName != "Resolved" && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM))) {
				alert("You must enter a Request Action in order to save");
				//StopSave(context);
			}

			if (purposeName == "ACR") {
				if (!CommCare.Shared.FormIsValid(CommCare.Request.Constants.ACR_FORM)) {
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

				if (opsStatus == CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed) {
					if (ob1 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided
						&& ob2 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided
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

				if (ob1AhrResolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
					|| ob2AhrResolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
					isValid = true;
					CheckOb2ResolutionIsNACRForCTLTab();
				}
				else if (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") == null) {
					var requiredAssociatedRecordType = "bah_claim";
					var referredByVamcPromise = Xrm.WebApi.online.retrieveMultipleRecords("bah_claim", "?$select=bah_name,ccwf_billedamount_currency,ccwf_dateofservice_date,ccwf_enddateofservice_date&$filter=_ccwf_requestid_value eq " + requestId).then(
						function success(results) {
							if (results.entities.length > 0) {
								return true;
							} else if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
								var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
								var requestName;

								if (requestAction !== null) {
									requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
								}

								console.log(requestName);
								console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
								var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
								if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
									CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
									CommCare.Request.Global.ClaimMessageShowing = true;
								}
								else {
									return true;
								}
							} else if (requiredAssociatedRecordType === "vhacrm_referrals") {
								CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
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

				if (resName === "Resolved") {
					var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");
					if (initialResolutionDate == null) {
						var now = new Date();
						CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
					}
				}
			}
			//	resolve(topLevelPromiseArray);
			//});
			//topArray.push(topLevelPromise);
			//Promise.all(topArray).then((returnedTopLevelPromiseArray) => {
			//	console.log(returnedTopLevelPromiseArray);



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
			//});



			///////end new promise chain region
			//if (requestAction !== null) {
			//	requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
			//	var req = new XMLHttpRequest();
			//	req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/mcs_lookupfilters?$select=_mcs_action_value&$filter=mcs_name eq 'RequestActionsRequiringClaims'", false);
			//	req.setRequestHeader("OData-MaxVersion", "4.0");
			//	req.setRequestHeader("OData-Version", "4.0");
			//	req.setRequestHeader("Accept", "application/json");
			//	req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			//	req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
			//	req.onreadystatechange = function () {
			//		if (this.readyState === 4) {
			//			req.onreadystatechange = null;
			//			if (this.status === 200) {
			//				var results = JSON.parse(this.response);
			//				for (var i = 0; i < results.value.length; i++) {
			//					actionsNeedingClaims.push(results.value[i]["_mcs_action_value@OData.Community.Display.V1.FormattedValue"]);
			//				}
			//				console.log("RequestActionsRequiringClaims");
			//				console.log(actionsNeedingClaims);
			//				if (actionsNeedingClaims.indexOf(requestName) > -1) {
			//					if (requestName == "Load Edit") {
			//						var claimEntityRequiredAttributes = ["bah_name", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var claimRequestRequiredAttrs = ["ccwf_claimnumber_text", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var searchAttribute = "ccwf_requestid";
			//						isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);

			//					} else if (requestName == "VAMC Internal Review" || requestName == "Initial Claim Review" || requestName == "Escalated Claim Review") {
			//						var claimEntityRequiredAttributes = ["bah_name", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var claimRequestRequiredAttrs = ["ccwf_claimnumber_text", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var searchAttribute = "ccwf_requestid";
			//						isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);
			//					}
			//					else if (purposeName == "Claim Status") {
			//						var claimEntityRequiredAttributes = ["bah_name", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var claimRequestRequiredAttrs = ["ccwf_claimnumber_text", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var searchAttribute = "ccwf_requestid";
			//						isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);
			//					}
			//					else if ((requestName == "Tier Two CCN-Optum" || requestName == "Tier Two CCN-Triwest" || requestName == "Tier Two Local Contract" || requestName == "Tier Two Emergent Care" || requestName == "Tier Two VCA" || requestName == "Escalate to Tier One" || requestName == "Not Active, For Testing Only - Tier One") &&
			//						//programTypeName == "Non-VA" &&
			//						(CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Emergent || CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Urgent)) {

			//						var claimEntityRequiredAttributes = ["bah_name", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var claimRequestRequiredAttrs = ["ccwf_claimnumber_text", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//						var searchAttribute = "ccwf_requestid";

			//						isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);
			//					}
			//				}
			//				//IF Request Action = Create Appointment then validate Associated record for Referrels
			//				else if (requestName === "Create Appointment") {
			//					var referralEntityRequiredAttributes = ["vhacrm_fromdate_date", "vhacrm_inpatientoutpatient_code", "vhacrm_name", "vhacrm_servicingfacilityid", "vhacrm_todate_date", "vhacrm_vendor_text"];
			//					var referralRequestRequiredAttrs = ["vhacrm_inpatientoutpatient_code", "vhacrm_internalnumber_text", "vhacrm_fromdate_date", "vhacrm_todate_date", "vhacrm_vendor_text", "vhacrm_servicingfacilityreferralid"];
			//					var searchAttribute = "vhacrm_requestid";
			//					isValid = validateAssociatedRecordsForSave("vhacrm_referrals", referralEntityRequiredAttributes, referralRequestRequiredAttrs, searchAttribute);
			//				}
			//			} else {
			//				Xrm.Utility.alertDialog(this.statusText);
			//			}
			//		}
			//	};
			//	req.send();

			//	var req = new XMLHttpRequest();
			//	req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/mcs_lookupfilters?$select=_mcs_action_value&$filter=mcs_name eq 'RequestActionsRequiringReferrals'", false);
			//	req.setRequestHeader("OData-MaxVersion", "4.0");
			//	req.setRequestHeader("OData-Version", "4.0");
			//	req.setRequestHeader("Accept", "application/json");
			//	req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			//	req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
			//	req.onreadystatechange = function () {
			//		if (this.readyState === 4) {
			//			req.onreadystatechange = null;
			//			if (this.status === 200) {
			//				var results = JSON.parse(this.response);
			//				for (var i = 0; i < results.value.length; i++) {
			//					actionsNeedingReferrals.push(results.value[i]["_mcs_action_value@OData.Community.Display.V1.FormattedValue"]);
			//				}

			//				if (actionsNeedingReferrals.indexOf(requestName) > -1 && CommCare.Shared.GetFieldValue("mcs_caretype") == CommCare.Request.Constants.TypeOfCare.Scheduled) {
			//					var referralEntityRequiredAttributes = ["vhacrm_fromdate_date"];
			//					var referralRequestRequiredAttrs = ["vhacrm_fromdate_date"];
			//					var searchAttribute = "vhacrm_requestid";
			//					isValid = validateAssociatedRecordsForSave("vhacrm_referrals", referralEntityRequiredAttributes, referralRequestRequiredAttrs, searchAttribute);
			//				}

			//			} else {
			//				Xrm.Utility.alertDialog(this.statusText);
			//			}
			//		}
			//	};
			//	req.send();


			//	if (requestName === "Modify Appointment" || requestName === "Cancel Appointment") {
			//		var handleMessage = false;

			//		var apptIdTemp = CommCare.Shared.GetFieldValue("vhacrm_vetappidtempfield_text");
			//		var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
			//		var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");

			//		var annotationRequiredAttributes = ["ObjectId"];
			//		var RequestRequiredAttrs = [];
			//		var searchAttribute = "ObjectId";

			//		if (apptIdTemp === null) {
			//			isValid = validateAssociatedRecordsForSave("Annotation", annotationRequiredAttributes, RequestRequiredAttrs, searchAttribute, handleMessage);
			//		}
			//		if (apptIdTemp === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
			//			CommCare.Shared.CrmCommonJS.Notification.SetError("An appointment is needed for this process. Please attach an appointment, or complete the following fields in the Notes box:\r\nDate*\r\nTime*\r\nFacility*\r\nProgram*\r\nType of Service*\r\nReferral/Auth Number*\r\nVISN*", CommCare.Request.Global.AppointmentNoteRequiredMessageId);
			//			StopSave(context);
			//		}

			//	}
			//	if (purposeName == "Appeal") {
			//		var claimEntityRequiredAttributes = ["bah_name", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//		var claimRequestRequiredAttrs = ["ccwf_claimnumber_text", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//		var searchAttribute = "ccwf_requestid";
			//		isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);
			//	}

			//	// don't allow appointment date/time in the past
			//	if (requestName === "Cancel Appointment") {
			//		var apptDate = CommCare.Shared.GetFieldValue("vhacrm_appointmentdatetime_date");

			//		if (apptDate !== null) {
			//			var dateNow = new Date();

			//			if (apptDate < dateNow) {
			//				CommCare.Shared.CrmCommonJS.Notification.SetError("Request cannot be saved with appointment that occurs in the past.  Please select a future appointment.", CommCare.Request.Global.AppointmentDateInPastMessageId);
			//				StopSave(context);
			//			}
			//		}
			//	}
			//}

			//if (purposeName == "Billing Concern" && requestName == "Payment Escalation") {
			//	var claimEntityRequiredAttributes = ["ccwf_billedamount_currency", "ccwf_dateofservice_date"];
			//	var claimRequestRequiredAttrs = ["ccwf_billedamount_currency", "ccwf_dateofservice_date"];
			//	var searchAttribute = "ccwf_requestid";


			//	isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);

			//	if (isValid == false && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)))
			//		StopSave(context);
			//}

			//if (purposeName == "ACR") {
			//	var claimEntityRequiredAttributes = ["ccwf_billedamount_currency", "ccwf_dateofservice_date"];
			//	var claimRequestRequiredAttrs = ["ccwf_billedamount_currency", "ccwf_dateofservice_date"];
			//	var searchAttribute = "ccwf_requestid";


			//	isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);

			//	if (isValid == false && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)))
			//		StopSave(context);
			//}
			////IF Purpose = Traveling Veteran then validate Associated record for claims, claim must have at least billed amount and start date
			//if (purposeName === "Traveling Veteran") {
			//	var claimEntityRequiredAttributes = ["ccwf_billedamount_currency", "ccwf_dateofservice_date"];
			//	var claimRequestRequiredAttrs = ["ccwf_billedamount_currency", "ccwf_dateofservice_date"];
			//	var searchAttribute = "ccwf_requestid";

			//	var resolutionLookup = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
			//	var resolutionName = "";
			//	if (resolutionLookup != null)
			//		resolutionName = CommCare.Shared.DialogNameReturn(resolutionLookup[0].name);

			//	isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);

			//	if (isValid == false && resolutionName != "Resolved" && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)))
			//		StopSave(context);
			//}
			////IF Routing Reason = Referral requires modification (713770000) OR SAR Required/Requested (713770002) then validate Associated record for Referrels
			//if (routingReason !== null && (routingReason === 713770000 || routingReason === 713770002)) {
			//	var referralEntityRequiredAttributes = ["vhacrm_fromdate_date", "vhacrm_inpatientoutpatient_code", "vhacrm_name", "vhacrm_servicingfacilityid", "vhacrm_todate_date", "vhacrm_vendor_text"];
			//	var referralRequestRequiredAttrs = ["vhacrm_inpatientoutpatient_code", "vhacrm_internalnumber_text", "vhacrm_fromdate_date", "vhacrm_todate_date", "vhacrm_vendor_text", "vhacrm_servicingfacilityreferralid"];
			//	var searchAttribute = "vhacrm_requestid";
			//	isValid = validateAssociatedRecordsForSave("vhacrm_referrals", referralEntityRequiredAttributes, referralRequestRequiredAttrs, searchAttribute);
			//}
			////IF Routing Reason = Approved Consult w/o referral (713770001) then validate record for consults or notes
			//else if ((routingReason !== null && routingReason === 713770001) || requestName == "Set Up Consult") {
			//	var handleMessage = false;

			//	var consultList = CommCare.Shared.GetFieldValue("vhacrm_consult_id_list");
			//	var consultIdsTemp = CommCare.Shared.GetFieldValue("vhacrm_vetconsultuidstempfield_text");
			//	var requestNotesMemo = CommCare.Shared.GetFieldValue("vhacrm_requestnotes_memo");

			//	var annotationRequiredAttributes = ["ObjectId"];
			//	var RequestRequiredAttrs = [];
			//	var searchAttribute = "ObjectId";
			//	isValid = validateAssociatedRecordsForSave("Annotation", annotationRequiredAttributes, RequestRequiredAttrs, searchAttribute, handleMessage);
			//	if (consultList === null && consultIdsTemp === null && requestNotesMemo === null && !isValid) {
			//		CommCare.Shared.CrmCommonJS.Notification.SetError("A consult is needed for this process. Please attach a consult, or complete the following fields in the Notes box:\r\nDate*\r\nConsult Title*\r\nRequesting Provider*\r\nConsult Status*\r\nConsult Number*\r\nConsult Urgency*", CommCare.Request.Global.ConsultNoteRequiredMessageId);
			//	}
			//	else {
			//		isValid = true;
			//	}
			//}

			////NO LONGER NEEDED BY MAL -- REPLACED WITH THE NEW 3 FIELDS AND THEY ARE REQIRED ON THE FORM
			////var req = new XMLHttpRequest();
			////req.open("GET", Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/vhacrm_areaintersectionSet(guid'" + purpose[0]["id"] + "')?$select=mcs_SendtoPATSR", false);
			////req.setRequestHeader("Accept", "application/json");
			////req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			////req.onreadystatechange = function () {
			////	if (this.readyState === 4) {
			////		this.onreadystatechange = null;
			////		if (this.status === 200) {
			////			var result = JSON.parse(this.responseText).d;
			////			console.log(result);
			////			var mcs_SendtoPATSR = result.mcs_SendtoPATSR;
			////			if (mcs_SendtoPATSR == true) {
			////				var annotationRequiredAttributes = ["ObjectId"];
			////				var RequestRequiredAttrs = [];
			////				var searchAttribute = "ObjectId";
			////				isValid = validateAssociatedRecordsForSave("Annotation", annotationRequiredAttributes, RequestRequiredAttrs, searchAttribute, handleMessage);
			////				if (!isValid) {
			////					CommCare.Shared.CrmCommonJS.Notification.SetError("A note is required for complaints received.", CommCare.Request.Global.ConsultNoteRequiredMessageId);
			////				}
			////			}

			////		} else {
			////			var alertStrings = {
			////				text: this.statusText
			////			};
			////			Xrm.Navigation.openAlertDialog(alertStrings);
			////		}
			////	}
			////};
			////req.send();


			////Check for NA/NA on Not claims status & !Claims Status Report
			//if (CommCare.Shared.DefaultContactRecord != null) {
			//	if (customerIdName == CommCare.Shared.DefaultContactRecord[0].name && programTypeName != "Help Desk" && (requestName != "Claim Status Report" || purposeDetailName != "Claim Status Report") && purposeName != "Non-Core" && purposeName != "Service Recovery") {
			//		CommCare.Shared.CrmCommonJS.Notification.SetError("N/A N/A Master cannot be the associated vet if the Purpose Detail or Action is not Claim Status Report.  Please use the Associate Person button in your ribbon to begin a search.", CommCare.Request.Global.NaNaVeteranMessageId);
			//		StopSave(context);
			//		isValid = false;
			//	}
			//}

			////Replaces N52 formula 'Request - Validate Request Action'
			//var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
			//var actionIntersection = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			//var state = CommCare.Shared.GetFieldValue("statecode");

			//var resolutionLookup = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
			//var resolutionName = "";
			//if (resolutionLookup != null)
			//	resolutionName = CommCare.Shared.DialogNameReturn(resolutionLookup[0].name);

			//if (queueItem != null && actionIntersection == null && actionIntersection != "97eecf60-5111-e611-941d-0050568d64c9" && state == 0 && resolutionName != "Resolved" && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM))) {
			//	alert("You must enter a Request Action in order to save");
			//	StopSave(context);
			//}

			//if (purposeName == "ACR") {
			//	if (!CommCare.Shared.FormIsValid(CommCare.Request.Constants.ACR_FORM)) {
			//		return true;
			//	}

			//	var resId = "411D47EF-B322-E611-941E-0050568D64C9"; // Resolved

			//	// Check if the Closing the Loop Final Status = Closed
			//	var ctlStatus = CommCare.Shared.GetFieldValue("vhacrm_cl_clfinalstatus_code");
			//	var ob1ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
			//	var ob2ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
			//	var ob3ClResolution = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");
			//	var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");

			//	var ob1AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
			//	var ob2AhrResolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

			//	if (ctlStatus == 713770002) {
			//		if (ob1ClResolution != 713770004 && ob2ClResolution != 713770004 && ob3ClResolution == null) {
			//			CommCare.Shared.FormContext.ui.setFormNotification("To set the Closing the Loop Final Status to Closed, at least 3 Outbound calls must be made or a Resolution must be provided on one of the calls.", "ERROR", "CTLFINALSTATUSCLOSED");
			//		} else {
			//			var recordId = CommCare.Shared.FormContext.data.entity.getId().replace("{", "").replace("}", "");
			//			CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_resolutionintersectionid", resId, "Resolved", "vhacrm_resolutionintersection");
			//			if (initialResolutionDate == null) {
			//				var now = new Date();
			//				CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
			//			}
			//			CommCare.Shared.FormContext.ui.clearFormNotification("CTLFINALSTATUSCLOSED");
			//		}
			//	}
			//	else {
			//		CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").setValue(null);
			//		CommCare.Shared.FormContext.ui.clearFormNotification("CTLFINALSTATUSCLOSED");
			//	}

			//	// Check if the Ops/POM Final Status = Closed
			//	var opsStatus = CommCare.Shared.GetFieldValue("mcs_operationsfinalstatus");
			//	var ob1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
			//	var ob2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
			//	var ob3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");
			//	var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");

			//	if (opsStatus == CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed) {
			//		if (ob1 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided
			//			&& ob2 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided
			//			&& ob3 == null) {
			//			CommCare.Shared.FormContext.ui.setFormNotification("To set the Ops Final Status to Closed, at least 3 Outbound calls must be made or a Resolution must be provided on one of the calls.", "ERROR", "OPSFINALSTATUSCLOSED");
			//		}
			//		else {
			//			CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_resolutionintersectionid", resId, "Resolved", "vhacrm_resolutionintersection");
			//			if (initialResolutionDate == null) {
			//				var now = new Date();
			//				CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
			//			}
			//			CommCare.Shared.FormContext.ui.clearFormNotification("OPSFINALSTATUSCLOSED");
			//		}
			//	}
			//	else {
			//		var resDirty = CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").getIsDirty();
			//		if (!resDirty) {
			//			CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").setValue(null);
			//			CommCare.Shared.FormContext.ui.clearFormNotification("OPSFINALSTATUSCLOSED");
			//		}
			//	}

			//	var claimEntityRequiredAttributes = ["bah_name", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//	var claimRequestRequiredAttrs = ["ccwf_claimnumber_text", "ccwf_billedamount_currency", "ccwf_dateofservice_date", "ccwf_enddateofservice_date"];
			//	var searchAttribute = "ccwf_requestid";

			//	if (ob1AhrResolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
			//		|| ob2AhrResolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
			//		isValid = true;
			//		CheckOb2ResolutionIsNACRForCTLTab();
			//	}
			//	else if (CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code") == null) {
			//		isValid = validateAssociatedRecordsForSave("bah_claim", claimEntityRequiredAttributes, claimRequestRequiredAttrs, searchAttribute);
			//	}
			//	else {
			//		isValid = true;
			//	}
			//}
			//else {
			//	var resolution = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
			//	var resName = "";
			//	if (resolution !== null)
			//		resName = CommCare.Shared.DialogNameReturn(resolution[0].name);

			//	if (resName === "Resolved") {
			//		var initialResolutionDate = CommCare.Shared.GetFieldValue("vhacrm_resolutiondate_date");
			//		if (initialResolutionDate == null) {
			//			var now = new Date();
			//			CommCare.Shared.SetFieldValue("vhacrm_resolutiondate_date", now);
			//		}
			//	}
			//}

			//console.log("Form is validated = " + isValid);

			//if (context != null) {
			//	if (isValid == false) {
			//		console.log("Form is invalid - stop save");
			//		StopSave(context);
			//		//var isClaimOnFile = CommCare.Shared.GetFieldValue("mcs_isthereaclaimonfile");
			//		//if (purposeName === "ACR" && CommCare.Request.Global.ClaimMessageShowing === true && isClaimOnFile === true) {
			//		//	openClaimQC()
			//		//	.then(
			//		//		function (lookup) {
			//		//			console.log("Claim created.");
			//		//			console.log(lookup);
			//		//			if (lookup !== undefined) {
			//		//				CommCare.Shared.FormContext.data.save();
			//		//			}
			//		//		},
			//		//		function (err) {
			//		//			console.error("Error creating claim.");
			//		//		}
			//		//	);
			//		//}
			//	}
			//	else {
			//		if (purposeName === "ACR") {
			//			brLockCTLResolutions();
			//			brLockOpsResolutions();
			//			acrTabsHideShow();
			//		}
			//	}
			//}

			//return isValid;
		});

	}

	function openClaimQC() {
		var currId = CommCare.Shared.FormContext.data.entity.getId();

		var parentRecord = {
			entityType: "incident",
			id: currId,
		};
		var entityFormOptions = {};
		entityFormOptions["entityName"] = "bah_claim";
		entityFormOptions["useQuickCreateForm"] = true;
		entityFormOptions["createFromEntity"] = parentRecord;

		qcParams = {};

		var isClaimOnFile = CommCare.Shared.GetFieldValue("mcs_isthereaclaimonfile");
		if (isClaimOnFile !== null && isClaimOnFile === true) {
			qcParams["p_claimonfile"] = true;
		}

		return Xrm.Navigation.openForm(entityFormOptions, qcParams);
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
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Request.Global.AppointmentDateInPastMessageId);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Request.Global.AppointmentNoteRequiredMessageId);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Request.Global.ConsultNoteRequiredMessageId);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Request.Global.ClaimRequiredMessageId);
		CommCare.Shared.CrmCommonJS.Notification.ClearNotification(CommCare.Request.Global.ReferralRequiredMessageId);
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

		if (lineOfBusinessName != CommCare.Shared.Constants.OCCFM_LOB_NAME) {
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;
			if (purposeDetail !== null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetail[0].name);
				if (purposeDetailName === "Claim Status Report") {
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
				//debugger;
				CommCare.Shared.CrmCommonJS.WebApi.RetrieveMultiple("mcs_settings", fieldsSelected.toLowerCase()).then(function (results) {
					CommCare.Shared.FormContext.ui.clearFormNotification("ESRTIMEOUT");
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
									CommCare.Shared.FormContext.ui.clearFormNotification("ESRTIMEOUT");
									setPreferredFacility(esr.Data.Demographics.PreferredFacility);
								}
								catch (e) {
									console.log("Error within success function of ESR data retrieval");
									CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", "ESRTIMEOUT");
								}
							},
							error: function (data) {
								endTimer = performance.now() - startTimer;
								console.log("ESR data retrieval: " + endTimer.toString() + " milliseconds");
								console.log("Error retrieving ESR data");
								CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", "ESRTIMEOUT");
							}
						});
					}
				}).catch(function (error) {
					console.log("Error retrieving MCS Settings: " + error);
				});
			}
			else {
				console.log("No ICN");
				CommCare.Shared.FormContext.ui.setFormNotification("Unable to automatically set Home Facility.", "WARNING", "ESRTIMEOUT");
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
	function preFilterRouteActionLookup(isLoad) {
		var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeId = CommCare.Shared.GetCleanId(purpose);
		var purposeName = getLookupName(purpose);
		var lobName = getLookupName(lineOfBusiness);
		var lobId = lineOfBusiness[0].id;
		var team = CommCare.Shared.GetFieldValue("hac_teamid");
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var teamName = getLookupName(team);
		var purposeDetailName = getLookupName(purposeDetail);
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
		//var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("tab_14");
		var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("General");
		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");

		var formType = CommCare.Shared.FormContext.ui.getFormType();
		var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
		var queue = CommCare.Shared.GetFieldValue("vhacrm_queueid")
		var queueId = CommCare.Shared.GetCleanId(queue);
		var Tier1Queue = "5e55f8c8-648b-ec11-8d20-001dd800b6ad";
		var Tier2Queue = "92de07d5-648b-ec11-8d20-001dd800b6ad";
		var Tier3Queue = "fa3913db-648b-ec11-8d20-001dd800b6ad";
		var billingConcernPurposeC3 = "95121a83-46b7-eb11-8236-001dd80216dc"
		var billingConcernPurposeNonVa = "450cc7e4-4e8f-ec11-8d20-001dd801f2a8";

		var EscalatetoTierOneC3 = "16170bb9-af8d-ec11-8d20-001dd801d485";
		var EscalatetoTierThreeC3 = "c531a0c2-dd8d-ec11-8d20-001dd801d485";
		var EscalatetoTierThreeNVA = "48c18f74-538f-ec11-8d20-001dd801f2a8";
		var InternalTierOneReviewNVA = "8f06947b-4f8f-ec11-8d20-001dd801f2a8";
		var ReturntoTierOneC3 = "8e421e4a-de8d-ec11-8d20-001dd801d485";
		var ReturntoTierOneNVA = "d5081fc9-6097-ec11-8d20-001dd8034b05";
		var ReturntoTierTwoC3 = "d7d39971-e08d-ec11-8d20-001dd801d485";
		var ReturntoTierTwoNVA = "10a1d7c5-548f-ec11-8d20-001dd801f2a8";
		var ReturntoVAMCC3 = "19febfb8-91f0-eb11-bacb-001dd8018ade";
		var SendtoVAMCNVA = "31be14fa-4f8f-ec11-8d20-001dd801f2a8";
		var TierTwoCCNOptumC3 = "3120930b-d88d-ec11-8d20-001dd801d485";
		var TierTwoCCNOptumNVA = "6277b55d-518f-ec11-8d20-001dd801f2a8";
		var TierTwoCCNTriwestC3 = "0e9fe91d-d88d-ec11-8d20-001dd801d485";
		var TierTwoCCNTriwestNVA = "1965a869-518f-ec11-8d20-001dd801f2a8";
		var TierTwoLocalContractC3 = "d1f30942-d88d-ec11-8d20-001dd801d485";
		var TierTwoLocalContractNVA = "cd7da881-518f-ec11-8d20-001dd801f2a8";
		var TierTwoUrgentEmergentC3 = "0a6c622b-d78d-ec11-8d20-001dd801d485";
		var TierTwoUrgentEmergentNVA = "0aebc451-518f-ec11-8d20-001dd801f2a8";
		var TierTwoVCAC3 = "49951730-d88d-ec11-8d20-001dd801d485";
		var TierTwoVCANVA = "218db575-518f-ec11-8d20-001dd801f2a8";
		var VAMCInternalReviewC3 = "43c7fa6e-fc67-ec11-8f8e-001dd800c03c";

		var isWHHL = false;
		if (purposeDetailName != null) {
			if (purposeDetailName.indexOf("White House Hotline") > -1) {
				isWHHL = true;
			}
		}


		CommCare.Request.Global.RouteActionLookupFetch = "";

		if (purpose != null && CommCare.Shared.GetCleanId(purpose) == "5e03aa4f-6b59-ea11-a99c-001dd8009f4b" /*Service Recovery C4*/) {
			//var purpDetailText = CommCare.Shared.GetCleanId(purposeDetail) ?? "null";


			if (queueItem == null) {
				//only serv recovery investigation
				CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
						<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \
						<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Investigation' /> \
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
								CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
									<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \
									<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval' /> \
								</filter >"
							} else if (purposeDetailName != null) {
								if (purposeDetailName.indexOf("White House Hotline") > -1) {
									//Approval
									//All rejects
									CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
									<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \
									<filter type='or' > \
										<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval' /> \
										<condition attribute='vhacrm_name' operator='eq' value='Service Recovery Approval' /> \
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
								CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
									<condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \
									<condition attribute='vhacrm_name' operator='eq' value='Return to Service Recovery' /> \
								</filter >"
							}
							else if (isWHHL) /*(purposeDetailName == "White House Hotline")*/ {
								//Approval
								//Return
								//Pats approval
								//rejects
								CommCare.Request.Global.RouteActionLookupFetch = "<filter type='and' > \
								  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='5e03aa4f-6b59-ea11-a99c-001dd8009f4b' /> \
								  <filter type='or' > \
									<condition attribute='vhacrm_name' operator='eq' value='Return to Service Recovery' /> \
									<condition attribute='vhacrm_name' operator='eq' value='PATS-R Approval' /> \
								    <condition attribute='vhacrm_name' operator='eq' value='Send for PATS-R Approval' /> \
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
		}
		else if (purposeId == billingConcernPurposeC3 || purposeId == billingConcernPurposeNonVa) {
			if ((formType == CommCare.Shared.Constants.CREATE_FORM || formType == CommCare.Shared.Constants.UPDATE_FORM) && (queue == null || (queueId != Tier1Queue && queueId != Tier2Queue && queueId != Tier3Queue))) {
				var fetchXml = "<filter type='or' >";
				if (purposeId == billingConcernPurposeC3) {
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + VAMCInternalReviewC3 + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + EscalatetoTierOneC3 + "' />";
				}
				else {
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + InternalTierOneReviewNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoUrgentEmergentNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoCCNOptumNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoCCNTriwestNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoVCANVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + TierTwoLocalContractNVA + "' />";
					fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + SendtoVAMCNVA + "' />";
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
				var urgEmerg = purposeId == billingConcernPurposeC3 ? TierTwoUrgentEmergentC3 : TierTwoUrgentEmergentNVA;
				var optum = purposeId == billingConcernPurposeC3 ? TierTwoCCNOptumC3 : TierTwoCCNOptumNVA;
				var triwest = purposeId == billingConcernPurposeC3 ? TierTwoCCNTriwestC3 : TierTwoCCNTriwestNVA;
				var VCA = purposeId == billingConcernPurposeC3 ? TierTwoVCAC3 : TierTwoVCANVA;
				var localContract = purposeId == billingConcernPurposeC3 ? TierTwoLocalContractC3 : TierTwoLocalContractNVA;
				var toVamc = purposeId == billingConcernPurposeC3 ? ReturntoVAMCC3 : SendtoVAMCNVA;

				var fetchXml = "<filter type='or' >";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + urgEmerg + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + optum + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + triwest + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + VCA + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + localContract + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + toVamc + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + EscalatetoTierOneC3 + "' />";
				if (purposeId == billingConcernPurposeNonVa) fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + InternalTierOneReviewNVA + "' />";
				fetchXml += "</filter>";

				CommCare.Request.Global.RouteActionLookupFetch = fetchXml;

				if (!isLoad) {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
					console.log("removed setRouteActionPreFilter presearch");
				}
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
			}
			else if (CommCare.Shared.GetCleanId(queue) == Tier2Queue) {
				var toTier3 = purposeId == billingConcernPurposeC3 ? EscalatetoTierThreeC3 : EscalatetoTierThreeNVA;
				var toTier1 = purposeId == billingConcernPurposeC3 ? ReturntoTierOneC3 : ReturntoTierOneNVA;

				var fetchXml = "<filter type='or' >";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + toTier3 + "' />";
				fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + toTier1 + "' />";
				if (purposeId == billingConcernPurposeC3) fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='eq' value='" + ReturntoVAMCC3 + "' />";
				fetchXml += "</filter>";

				CommCare.Request.Global.RouteActionLookupFetch = fetchXml;

				if (!isLoad) {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").removePreSearch(setRouteActionPreFilter);
					console.log("removed setRouteActionPreFilter presearch");
				}
				CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(setRouteActionPreFilter);
			}
			else if (CommCare.Shared.GetCleanId(queue) == Tier3Queue) {
				var toTier2 = purposeId == billingConcernPurposeC3 ? ReturntoTierTwoC3 : ReturntoTierTwoNVA;

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
			if (CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) === "OCC FM") {
				var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
				var purposeName;
				var team = CommCare.Shared.GetFieldValue("hac_teamid");
				var teamName;

				if (team != null)
					teamName = CommCare.Shared.DialogNameReturn(team[0].name);

				if (purpose != null) {
					var fetchXml = "<filter type='and'>";
					purposeName = CommCare.Shared.DialogNameReturn(purpose[0].name);
					if (purposeName === "Preauthorization") {

						//get user team and filter out all but Inquiry unless team = CSC Specialty
						if (teamName !== "CSC Specialty" && teamName !== "Supervisors TL 852") {
							fetchXml += "<condition attribute='vhacrm_subareaintersectionid' operator='eq' value='{50ae0175-62e7-e811-812c-1458d04e2f20}' />\
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
			if (purposeDetailName.toLowerCase().indexOf("v-sig") > -1) {
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
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purposeName = getLookupName(purpose);
		var lobName = getLookupName(lineOfBusiness);
		var lobId = lineOfBusiness[0].id;
		var team = CommCare.Shared.GetFieldValue("hac_teamid");
		var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
		var teamName = getLookupName(team);
		var purposeDetailName = getLookupName(purposeDetail);
		var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
		var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
		//var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("tab_14");
		var ahrTab = CommCare.Shared.FormContext.ui.tabs.get("General");
		var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");

		if (lineOfBusiness !== null) {
			if (lobName === CommCare.Shared.Constants.CCWF_LOB_NAME) {
				console.log(CommCare.Request.Global.RouteActionLookupFetch);
				if (CommCare.Request.Global.RouteActionLookupFetch != "") {
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(CommCare.Request.Global.RouteActionLookupFetch);
				}
				else if (purpose !== null && purposeName != "ACR") {
					var fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                </filter>";
					CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
				}
				else if (purposeName == "ACR") {
					var fetchXml
					if (ob2Resolution == null
						&& (ob1Resolution == CommCare.Request.Constants.OBResolution.NoContact
							|| ob1Resolution == CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting)
						&& ahrTab.getDisplayState() == "expanded") {
						fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP + "' />\
                                </filter>";

						//<condition attribute='vhacrm_name' operator='neq' value='Closing the Loop' />\
					}
					else if (ob2Resolution != null && ahrTab.getDisplayState() == "expanded") {
						fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Request.Constants.REQUESTACTION_ACRIMMEDIATE + "' />\
                                </filter>";

						//<condition attribute='vhacrm_name' operator='neq' value='ACR CSC Immediate' />\
					}
					else if (ob2Resolution == null && ahrTab.getDisplayState() == "expanded") {
						fetchXml = "<filter type='and'>\
                                  <condition attribute='statecode' operator='eq' value='0' />\
                                  <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                  <condition attribute='vhacrm_areaintersectionid' operator='eq' value='"+ purpose[0].id + "' />\
                                  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Request.Constants.REQUESTACTION_ACRIMMEDIATE + "' />\
								  <condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP + "' />\
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
			else if (lobName === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
				if (team !== null) {
					var fetchXml = "<filter type='or'>\
                                <filter type='and'>\
                                <condition attribute='statecode' operator='eq' value='0' />\
                                <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                <condition attribute='hac_owner_teamid' operator='eq' value='" + team[0].id + "' />\
                                <condition attribute='vhacrm_subareaintersectionid' operator='null' />\
                                </filter>\
                                ";
					if (
						(teamName === 'EEV')
						|| (teamName === 'PSD Appeals')
						|| (teamName === 'PSD DTA')
						|| (teamName === 'Pharmacy')
						|| (teamName === 'Congressional')
						|| (teamName === 'R&R Suspense 1')
						|| (teamName === 'R&R Suspense 2')
						|| (teamName === 'R&R Suspense 3')
						|| (teamName === 'R&R Suspense 4')
						|| (teamName === 'R&R Suspense 5')
						|| (teamName === 'R&R Suspense 6')
						||
						(
							(teamName === 'CSC Specialty' || teamName === 'Supervisors TL 852' || teamName === 'Clinical Decisions')
							&& (purposeName === 'Preauthorization')
							&& ((purposeDetailName == null) || (purposeDetailName === 'Inquiry'))
						)
						||
						(
							(teamName === 'CSC Specialty' || teamName === 'Supervisors TL 852' || teamName === 'Clinical Decisions') && (purposeName !== 'Preauthorization'))
					) {
						//Added team condition to stop duplicate actions in quick create
						fetchXml += "<filter type='and'>\
                                <condition attribute='statecode' operator='eq' value='0' />\
                                <condition attribute='vhacrm_lineofbusiness' operator='eq' value='" + lobId + "' />\
                                <condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + CommCare.Request.Constants.PURPOSE_PREAUTH + "' />\
								<condition attribute='hac_owner_teamid' operator='eq' value='" + team[0].id + "' />\
                                </filter>\
                            ";
					}
					else if ((teamName === 'CSC Specialty' || teamName === 'Supervisors TL 852') && (purposeDetail !== null)) {
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

	function validateAssociatedRecordsForSave(requiredAssociatedRecordType, relatedEntityRequiredAttributes, RequestRequiredAttrs, searchAttribute, handleMessage) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		if (handleMessage === undefined)
			handleMessage = true;

		//Retrieve all records of RecordType supplied based on relation to current request record.  
		var recordList = CommCare.Shared.GetEntityOData(requiredAssociatedRecordType, "", relatedEntityRequiredAttributes.join(), searchAttribute + "/Id,<guid>" + CommCare.Shared.FormContext.data.entity.getId());
		var level;

		//Loop each record verifying that the requiredAttributes are suppled by at least one entry then set requiredAttributes to not required and return true to allow save
		if (recordList !== null && recordList.results !== null && recordList.results.length > 0) {

			//for (i = 0; i < recordList.results.length; i++) {
			//    var record = recordList.results[e];
			//    if ((record.StateCode.Value == 0) || (record.StateCode.Value == 3)) {  //if StateCode is Open (0) or Scheduled (3) counted
			//        if (recordID != "{" + appt.ActivityId.toUpperCase() + "}")   // not counting the same record!
			//            numOfAppointments++;
			//    }
			//}
			level = "none";
		}
		//otherwise set fields to required and return false
		else {
			level = "required"; //"none";
		}

		//for (var i = 0, l = RequestRequiredAttrs.length; i < l; i++) {
		//
		//    if (CommCare.Shared.FormContext.getAttribute(RequestRequiredAttrs[i]) != null) {
		//        CommCare.Shared.FormContext.getAttribute(RequestRequiredAttrs[i]).setRequiredLevel(level);
		//    }
		//}

		if (level === "none") {
			return true;
		}

		if (level === "required") {
			if (handleMessage) {
				if (requiredAssociatedRecordType === "bah_claim" && CommCare.Request.Global.ClaimMessageShowing === false) {
					var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
					var requestName;

					if (requestAction !== null) {
						requestName = CommCare.Shared.DialogNameReturn(requestAction[0].name);
					}

					console.log(requestName);
					console.log(CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code"));
					var ob1Res = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
					if (requestName !== "Fraud/Waste/Abuse" && ob1Res != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
						CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Claim to the Request to save changes and move forward.", CommCare.Request.Global.ClaimRequiredMessageId);
						CommCare.Request.Global.ClaimMessageShowing = true;

						//setTimeout(function () {
						//    window.open("http://event/?EventName=RequestClearProgressIndicator");
						//    console.log("*** Called event RequestClearProgressIndicator");
						//}, 1500);
					}
					else {
						// Load Edit does not require Adding a Claim to the request
						return true;
					}
				}

				if (requiredAssociatedRecordType === "vhacrm_referrals")
					CommCare.Shared.CrmCommonJS.Notification.SetError("Please Add a Referral to the Request to save changes and move forward.", CommCare.Request.Global.ReferralRequiredMessageId);
			}

			return false;
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

		if (lineOfBusiness !== null && CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) === "Customer Experience") {

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
					if (control.getAttribute().getValue() === null && fieldsToIgnore.indexOf(controlName) < 0) {
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

	//function clearPurposeDetial_OnChange() {
	//    var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
	//    var purpName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;

	//    if (purpName != "Claim Status") {
	//        CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", null);
	//        CommCare.Shared.FormContext.getAttribute("vhacrm_subareaintersectionid").fireOnChange();
	//    }
	//}

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
				control.setSubmitMode("never");
			});


			window.open(newWindowUrl);
		}
	}

	function categoryOfCare() {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purpName = getLookupName(purpose);
		var reqLevel = purpName == "ACR" ? "required" : "none"
		if (purpName == "ACR") {
			CommCare.Shared.SetRequired("mcs_categoryofcare", reqLevel);
		}

	}

	function navigateForm(eventArgs) {
		var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		console.log(fName);
		//debugger;


		categoryOfCare();
		var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		var purpName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
		var acrFormId = "640932ba-e0f3-4107-849a-0cbec308fba5";
		var requestQuickCreateFormId = '0131f842-65c0-47b8-85c7-d8272cdfa6ee'
		var commCareFormId = "40ba7433-4b0b-4c58-bb2a-81e346e98910";
		var occfmFormId = "43132D83-9BC6-432A-B20C-2039CFC2E0C8";
		var isValidForm = true;
		var formType = CommCare.Shared.FormContext.ui.getFormType()

		///If we have eventArgs then we are being called from onChange. 
		///This is assuming that context param is NOT sent in onload call of this function
		if (eventArgs !== undefined && purpName != "Bill of Collections") {
			CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", null);
			CommCare.Shared.FormContext.getAttribute("vhacrm_subareaintersectionid").fireOnChange();
		}

		if (formType === CommCare.Shared.Constants.UPDATE_FORM || formType === CommCare.Shared.Constants.INACTIVE_FORM) {
			///If purpose is null then we do nothing here as we don't know where to go until user gives us a value
			if (purpose === null)
				return;

			var lineOfBusiness = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_lobid"));
			CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(lineOfBusiness, "hrc_lobs", "hrc_name,mcs_requestformid").then(function (lobRecord) {
				var validFormId = lobRecord["mcs_requestformid"];
				console.log(validFormId);
				console.log(CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId());
				console.log(!CommCare.Shared.FormIsValid(validFormId));
				console.log(CommCare.Shared.FormContext.ui.formSelector.items.get(validFormId.toLowerCase()) != null);
				if (validFormId !== null) {
					if (!CommCare.Shared.FormIsValid(validFormId)) {
						console.log("FORM IS VALID");
						CommCare.Shared.FormContext.data.entity.attributes.forEach(function (control, i) {
							control.setSubmitMode("never");
						});
						CommCare.Shared.FormContext.ui.formSelector.items.get(validFormId.toLowerCase()).navigate();
						return;
					}
				}
			}).catch(function (error) {
				console.log("Error retrieving Line of business record: " + error.message);
				console.log(error);
			});

				//if (lineOfBusiness !== null && getLookupName(lineOfBusiness) === CommCare.Shared.Constants.CCWF_LOB_NAME) {
				//	//TODO - use the purpName as it handles the dialog function and was already retrieved above
				//	if (purpose[0].name === "ACR") {

				//		if (!CommCare.Shared.FormIsValid(acrFormId)) {
				//			isValidForm = false;
				//			CommCare.Shared.FormContext.data.entity.attributes.forEach(function (attribute, index) {
				//				if (attribute.getName() != "vhacrm_areaintersectionid") {
				//					attribute.setSubmitMode("never");
				//					attribute.setRequiredLevel("none")
				//					//CommCare.Shared.SetReadOnly(attribute, "none");
				//				}
				//			});
				//			isValidationNeeded_HandleCustomerCareOnSave = false;
				//			CommCare.Shared.FormContext.data.save().then(function () {
				//				CommCare.Shared.FormContext.ui.formSelector.items.get(acrFormId.toLowerCase()).navigate();
				//			},
				//				function (errorCode) {
				//					console.log("Error auto saving Request prior to form change: " + errorCode.message);
				//				});

				//		}
				//	}
				//	else if (!CommCare.Shared.FormIsValid(commCareFormId)) {
				//		isValidForm = false;
				//		CommCare.Shared.FormContext.data.entity.attributes.forEach(function (attribute, index) {
				//			if (attribute.getName() != "vhacrm_areaintersectionid") {
				//				attribute.setSubmitMode("never");
				//				attribute.setRequiredLevel("none")
				//				//CommCare.Shared.SetReadOnly(attribute, "none");
				//			}
				//		});
				//		isValidationNeeded_HandleCustomerCareOnSave = false;
				//		CommCare.Shared.FormContext.data.save().then(function () {
				//			CommCare.Shared.FormContext.ui.formSelector.items.get(commCareFormId.toLowerCase()).navigate();
				//		},
				//			function (errorCode) {
				//				console.log("Error auto saving Request prior to form change: " + errorCode.message);
				//			});
				//	}
				//}
				//else if (lineOfBusiness !== null && CommCare.Shared.DialogNameReturn(lineOfBusiness[0].name) === CommCare.Shared.Constants.OCCFM_LOB_NAME) {
				//	if (!CommCare.Shared.FormIsValid(occfmFormId)) {
				//		isValidForm = false;
				//		CommCare.Shared.FormContext.ui.formSelector.items.get(occfmFormId.toLowerCase()).navigate();
				//	}
				//}
			}



			if (!!eventArgs) {
				if (!!eventArgs.getEventSource()) {
					var eventSource = eventArgs.getEventSource().getName();
					if (!!eventSource) {
						console.log(eventSource);
						console.log("Not running onload callback");
						return;
					}
				}
			}

			if (isValidForm == true) {
				onLoadCallback();
			}
		}

		function setAcceptingRequestForVisnOrServicingFac() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var lineOfBusiness = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lineOfBusinessName = getLookupName(lineOfBusiness);
			var acceptingRequests = true;

			if (lineOfBusinessName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
				var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
				if (action != null) {
					var columns = "hac_routetype_code"
					var filter = null;

					CommCare.Shared.CrmCommonJS.WebApi.RetrieveRecord(CommCare.Shared.GetCleanId(action), "vhacrm_actionintersections", columns, filter).then(function (retAct) {
						console.log(retAct);
						var routeTypeCode = retAct.hac_routetype_code;
						var servFac = CommCare.Shared.GetFieldValue("hrc_facilityid");
						var servVISN = CommCare.Shared.GetFieldValue("vhacrm_visnid");

						if (routeTypeCode == CommCare.Request.Constants.ActionRouteType.Facility) {
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
						else if (routeTypeCode == CommCare.Request.Constants.ActionRouteType.VISN) {
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

		function visnServiceFacHideShowRequire(purpose, action, purposeDetail, lob, programType) {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			if (lob === CommCare.Shared.Constants.CCWF_LOB_NAME) {
				if (programType == "C6") {
					if (purposeDetail == "VA Facility") {
						CommCare.Shared.SetVisible("hrc_facilityid", true);
						CommCare.Shared.SetRequired("hrc_facilityid", "required");
					}
					else if (action == "Facility Follow Up") {
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
				else if (purpose !== "Non-Core" && purpose !== CommCare.Shared.Constants.CCWF_LOB_NAME && programType !== "Help Desk" && purposeDetail !== "Claim Status Report") {
					CommCare.Shared.SetRequired("vhacrm_visnid", "none");
					CommCare.Shared.SetRequired("hrc_facilityid", "required");
					CommCare.Shared.SetVisible("vhacrm_visnid", true);
					CommCare.Shared.SetVisible("hrc_facilityid", true);
					CommCare.Shared.SetVisible("ccwf_homefacility", true);
					CommCare.Shared.SetRequired("ccwf_homefacility", "required");
				}
				else if (action === "Claim Status Report" || purposeDetail === "Claim Status Report") {
					CommCare.Shared.SetRequired("vhacrm_visnid", "required");
					CommCare.Shared.SetRequired("hrc_facilityid", "none");
					CommCare.Shared.SetRequired("ccwf_homefacility", "none");
					CommCare.Shared.SetVisible("vhacrm_visnid", true);
					CommCare.Shared.SetVisible("hrc_facilityid", false);
					CommCare.Shared.SetVisible("ccwf_homefacility", false);

				}
				else if (programType !== "Help Desk") {
					CommCare.Shared.SetRequired("hrc_facilityid", "none"); // <--- TODO : is this correct?? this field becomes not required whether its help desk or not
					CommCare.Shared.SetVisible("vhacrm_visnid", true);
				}
				else if (programType === "Help Desk") {
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

		function handleHiddenFields() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var validPurposeValuesForResolution = ["Mission Act", "Authorizations/Referrals", "Eligibility & Benefits", "DME", "Emergent Care Notification", "Emergent Care Notification", "Dental", "Traveling Veteran", "Discharge Planning"];
			var invalidPurposeValuesForAction = ["Mission Act", "Non-Core", "Discharge Planning", "ACR"];
			var validActionsForRoutingReason = ["Authorizations/Referrals Investigation", "Authorization Request"];
			var validSubPurposesForResolution = ["Medical Documents", "Medication Management"];
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName = getLookupName(purposeDetailValue);
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var resolution = CommCare.Shared.GetFieldValue("ccwf_resolutionrequest");
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName = getLookupName(lob);
			var purpose = false;
			var purposeDetail = false;
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = getLookupName(programType);
			var validForAction = true;
			var validForRoutingReason = false;
			var interactedWith = CommCare.Shared.GetFieldValue("ccwf_issuerequestor_code");
			var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();

			if (purposeValue !== null) {

				if (validPurposeValuesForResolution.indexOf(purposeName) >= 0) {
					purpose = true;
				}

				//Need to add our logic for PATS-R Here
				if (invalidPurposeValuesForAction.indexOf(purposeName) >= 0) {
					validForAction = false;
				}

				if (purposeName === "Non-Core") {
					CommCare.Shared.SetVisible("vhacrm_noncorereason_code", true);
					CommCare.Shared.SetRequired("vhacrm_noncorereason_code", "required");
				}
				else {
					CommCare.Shared.SetVisible("vhacrm_noncorereason_code", false);
					CommCare.Shared.SetRequired("vhacrm_noncorereason_code", "none");
				}
			}

			if (action !== null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
				if (validActionsForRoutingReason.indexOf(actionName) >= 0) {
					validForRoutingReason = true;
				}
			}

			purposeDetail = validSubPurposesForResolution.indexOf(purposeDetailName) >= 0 ? true : false;

			if (!action && (purpose == true || purposeDetail == true) && lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
				CommCare.Shared.SetVisible("ccwf_resolutionrequest", true);
			}
			else {
				CommCare.Shared.SetVisible("ccwf_resolutionrequest", false);
			}
			var vSignalId = CommCare.Shared.GetFieldValue("mcs_vsignalssurveytype");
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");


			//showHide queue resolution

			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposePromise = new Promise(function (resolve, reject) {
				if (purpose != null) {
					return Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr,vhacrm_name").then(function (result) {
						resolve(result);
					});
				} else {
					resolve("no purpose");
				}
			});

			var purposeDetailPromise = new Promise(function (resolve, reject) {
				var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
				if (purposeDetail != null) {
					resolve(purposeDetail[0]);
				} else {
					resolve("no purpose detail");
				}
			});

			var teamPromise = new Promise(function (resolve, reject) {
				var globalContext = Xrm.Utility.getGlobalContext();
				return Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + globalContext.userSettings.userId.replace("{", "").replace("}", "").toLowerCase() + " and  teamid eq " + CommCare.Request.Constants.ServiceRecoveryApprovalTeam).then(
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
				var showResolutionRequest = true;
				var lockResolutionRequest = true;

				console.log(returnedPromises);
				var isServiceRecoveryApprovalTeam = false;
				console.log(returnedPromises[1]);
				for (var i = 0; i < returnedPromises[1].length; i++) {
					console.log("isServiceRecoveryApprovalTeam");
					isServiceRecoveryApprovalTeam = true;
				}
				//if type == c3 && patsrid != null, hide
				var program = CommCare.Shared.GetFieldValue("ccwf_programid");
				if (program != null) {
					if (CommCare.Shared.GetFieldValue("mcs_patsrid") != null && CommCare.Shared.GetCleanId(program) == CommCare.Request.Constants.PROGRAM_TYPE_C3) {
						showResolutionRequest = false;
					}
				}
				console.log(returnedPromises[2]);
				if (returnedPromises[2] != null && program != null) {
					if (program[0]["name"] == "Non-VA" && actionName == "Service Recovery Approval" && returnedPromises[2]["name"] == "V-Signals") {
						showResolutionRequest = true;
						lockResolutionRequest = false;
					}
				}

				if (isServiceRecoveryApprovalTeam && returnedPromises[0]["vhacrm_name"] == "Service Recovery") {
					lockResolutionRequest = false;
				}
				else if (!isServiceRecoveryApprovalTeam && returnedPromises[0]["vhacrm_name"] == "Service Recovery") {
					lockResolutionRequest = true;
				}

				if (returnedPromises[0]["mcs_sendtopatsr"] == true || (CommCare.Shared.GetFieldValue("mcs_patsrid") != null && returnedPromises[2]["id"] == "62fc507f-55e2-ea11-a813-001dd8018866")) {
					showResolutionRequest = false;
				}
				if (purposeDetailName != null) {
					if (purposeDetailName.indexOf("White House Hotline") > -1) {
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
				if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Request.Constants.StatusCode.RejectedByPats) {
					showResolutionRequest = true;
					lockResolutionRequest = false;
				}

				if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid")).replace(/\s/g, "") == "DOHub" && CommCare.Shared.GetFieldValue("mcs_patsrid") != null) {
					lockResolutionRequest = true;
				}
				console.log(showResolutionRequest);
				CommCare.Shared.SetVisible("vhacrm_resolutionintersectionid", showResolutionRequest);
				hideShowQueueResolution();
				CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", lockResolutionRequest);

				if (CommCare.Shared.GetFieldValue("mcs_patsrid") == null && returnedPromises[0]["vhacrm_name"] != "Service Recovery") {
					brAssignedToQueueResolution();
				}
			});

			if (lobName == CommCare.Shared.Constants.OCCFM_LOB_NAME && validForAction == true) {
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
			}
			else if (purposeName == "ACR" && CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) {
				var requestActionVisibility = true;
				if (CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code") == CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
					requestActionVisibility = false;
				}
				CommCare.Shared.FormContext.ui.controls.forEach(function (control, i) {
					var controlName = control["_controlName"];
					if (controlName.includes("vhacrm_actionintersectionid")) {
						CommCare.Shared.SetVisible(controlName, requestActionVisibility);
					}
				});

			}
			else if (!resolution && lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && validForAction == true && purposeDetailName != "Mill Bill Ruling") {
				var type = CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid");
				var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");

				if (purpose != null) {
					Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr").then(
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

			if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME) {
				CommCare.Shared.SetVisible("vhacrm_routingreason_code", validForRoutingReason);
			}
			else {
				CommCare.Shared.SetVisible("vhacrm_routingreason_code", false);
			}

			if (CommCare.Shared.FormContext.ui.getFormType() != CommCare.Shared.Constants.CREATE_FORM) {
				if (purposeDetailName != null) {
					if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && purposeDetailName.indexOf("Quality Issue") > -1 && actionName == "Optum PQI") {
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
					else if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && actionName != "Optum PQI" && (currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)) {
						CommCare.Shared.FormContext.ui.tabs.get("tab_13").setVisible(false);

						var requiredPQIFields = ["mcs_firstname", "mcs_lastname", "mcs_dob", "mcs_ssn", "mcs_address1line1", "mcs_address1city",
							"mcs_address1state", "mcs_address1postalcode", "mcs_providername", "mcs_address2line1", "mcs_address2city",
							"mcs_address2state", "mcs_address2postalcode", "mcs_admitservicedatefromdate", "mcs_dischargetodate", "mcs_readmit",
							"mcs_discharge", "mcs_approximatedateofpqioccurrence", "mcs_datepqiidentified", "mcs_qualityofcarepatientsafety",
							"mcs_qualityofservice", "mcs_unknown", "mcs_descriptionofevents", "mcs_completedbynametitle", "mcs_completedbynameofdepartment"];

						setRequiredOnMultipleFields(requiredPQIFields, "none");
					}
				} else if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME && actionName != "Optum PQI" && (currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)) {
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
			visnServiceFacHideShowRequire(purposeName, actionName, purposeDetailName, lobName, programTypeName);

			//DUPLICATE WITH MASTERPROVIDERTIN()
			//Require provider info if Interacted With = Provider and Purpose = Emergent Care
			//requireProviderFac(purposeName, interactedWith);

			//Auto claim status report on action if purpose detail is claim status report
			setClaimsReportAction(purposeDetailName);

		}

		function getLookupName(lookup) {
			var lookupName = lookup != null ? CommCare.Shared.DialogNameReturn(lookup[0].name) : null;
			return lookupName;
		}

		function brRequireNotRequire72Hour() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var typeOfCare = CommCare.Shared.GetFieldValue("mcs_whatwasthetypeofcare");
			if (typeOfCare === CommCare.Request.Constants.TypeOfCare.Emergent) {
				CommCare.Shared.SetVisible("mcs_wastherea72hournotification", true);
				CommCare.Shared.SetRequired("mcs_wastherea72hournotification", "required");
			}
			else {
				CommCare.Shared.SetVisible("mcs_wastherea72hournotification", false);
				CommCare.Shared.SetRequired("mcs_wastherea72hournotification", "none");
			}
		}

		//function brNullifyACRBooleans() {
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
						id: results.entities[0]["vhacrm_actionintersectionid"],
					}];

					CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", lookup);
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

			if (ob2Resolution === CommCare.Request.Constants.OBResolution.NoContact) {
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
			else if (ob2Resolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
				// set Request Action to Closing the Loop
				SetActionIntersectionToValue("Closing the Loop - TPA Resolution").then(
					function success(retVal) {
						if (retVal === true) {
							ctlTabsHideShow();
						}
					});;
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
			}
			else if (ob2Resolution !== null
				&& ob2Resolution !== CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
				&& ob2Resolution !== CommCare.Request.Constants.OBResolution.ProviderAgrees
				&& ob2Resolution !== CommCare.Request.Constants.OBResolution.ProviderDisagrees
			) {
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
			}
			else if (ob2Resolution == CommCare.Request.Constants.OBResolution.ProviderAgrees || ob2Resolution == CommCare.Request.Constants.OBResolution.ProviderDisagrees) {
				setActionFromCommunityCareProgram(false, "ob2");
			}
			else if (ob1Resolution === CommCare.Request.Constants.OBResolution.NoContact) {
				// set Request Action to ACR CSC Immediate
				SetActionIntersectionToValue("ACR CSC Immediate").then(
					function success(retVal) {
						if (retVal === true) {
							ctlTabsHideShow();
						}
					});
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
			}
			else if (ob1Resolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
				// hide the Request Action field.
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
				CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
				ctlTabsHideShow();
			}
			else if (ob1Resolution !== null && ob1Resolution !== CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
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
			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.ACR_FORM)) {
				brACRInteractedWith();
			}
			else if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM)) {
				brCCRInteractedWith();
			}
			else {
				brInteractedWith();
			}
			//ACR scope
			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.ACR_FORM)) {
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
			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM)) {
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
			else if ((currentForm == null) || (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM)) {
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
			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM)) {
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
			if ((currentForm == null) || ((currentForm.getId() !== CommCare.Request.Constants.ACR_FORM) && (currentForm.getId() !== CommCare.Request.Constants.CCWF_FORM))) {
				brSetC4QuickCreate();
				brNonCoreReasonRequest();
			}
			//if (CommCare.Request.Constants.CurrentFormType === "quickcreate") {
			//	brNullifyACRBooleans();
			//}
			if (currentForm != null && currentForm.getId() == CommCare.Request.Constants.OCCFM_FORM.toLowerCase()) {
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
		}

		function requireAuthNumber() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var typeOfCare = CommCare.Shared.GetFieldValue("mcs_whatwasthetypeofcare");

			var setReq = typeOfCare == CommCare.Request.Constants.WhatWasTheTypeOfCare.Scheduled;

			CommCare.Shared.SetRequired("mcs_authorizationnumber", setReq);
		}

		function brSetCLFinalStatusSolved() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var clOb1 = CommCare.Shared.GetFieldValue("vhacrm_cl_ob1resolution_code");
			var clOb2 = CommCare.Shared.GetFieldValue("vhacrm_cl_ob2resolution_code");
			var clOb3 = CommCare.Shared.GetFieldValue("vhacrm_cl_ob3resolution_code");

			if ((clOb1 !== null && clOb1 === CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided)
				|| (clOb2 !== null && clOb2 === CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided)
				|| (clOb3 !== null)
			) {
				CommCare.Shared.SetFieldValue("vhacrm_cl_clfinalstatus_code", CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed);
				CommCare.Shared.FormContext.getAttribute("vhacrm_cl_clfinalstatus_code").fireOnChange();
			}
		}

		function brSetOpsFinalStatusSolved() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var clOb1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
			var clOb2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
			var clOb3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");

			if ((clOb1 !== null && clOb1 === CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided)
				|| (clOb2 !== null && clOb2 === CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided)
				|| (clOb3 !== null)
			) {
				CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed);
				CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
			}
		}

		function setBROnChangeEvents() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.ACR_FORM)) {
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
			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM)) {
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
			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.OCCFM_FORM)) {
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
				if (lobName.toLowerCase() === "occ fm") {
					setVisibleOnMultipleFields(["prioritycode"], false);
					setRequiredOnMultipleFields(["prioritycode"], "none");

					var actionVal = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
					setVisibleOnMultipleFields(["mcs_fmpriority"], actionVal !== null);
				}
				else if (lobName.toLowerCase() === "customer experience") {
					setVisibleOnMultipleFields(["prioritycode"], false);
					setVisibleOnMultipleFields(["mcs_fmpriority"], true);
					setRequiredOnMultipleFields(["mcs_fmpriority"], "none");
				}
			}
		}

		function hideShowFullSearch() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purpose);
			var setVisible = purposeName == "Bill of Collections" ? true : false;

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
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purpose);
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programId = CommCare.Shared.GetCleanId(programType);
			var programTypeName = getLookupName(programType);
			var status = CommCare.Shared.GetFieldValue("statecode");
			if (lobName == "OCC FM") {
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
				if (purposeName === "Preauthorization") {
					//CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "required");
					if (purposeDetail == null) {
						var purposeId = purpose[0].id.replace("{", "").replace("}", "");
						var subPurposeFetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'> \
                                  <entity name='vhacrm_subareaintersection'> \
                                    <attribute name='vhacrm_subareaintersectionid' /> \
                                    <filter type='and'> \
                                      <condition attribute='vhacrm_name' operator='eq' value='Inquiry' /> \
                                      <condition attribute='vhacrm_areaintersectionid' operator='eq' value='" + purposeId + "' /> \
                                    </filter> \
                                  </entity> \
                                </fetch>";

						CommCare.Shared.CrmCommonJS.WebApi.AddRequestHeader("Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
						CommCare.Shared.CrmCommonJS.WebApi.RetrieveByFetchXml("vhacrm_subareaintersections", subPurposeFetch).then(function (subPurpose) {

							var retrievedSubPurpose = subPurpose.value;
							var subPurposeId = retrievedSubPurpose[0].vhacrm_subareaintersectionid;

							CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_subareaintersectionid", subPurposeId, "Inquiry", "vhacrm_subareaintersection");
						}).catch(function (error) {
							console.log("Error in setting purpose defaults: " + error.message);
						});
					}
				}
				else if (purposeName == "Bill of Collections" && programTypeName == "CSC") {
					//CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "required");
					if (purposeDetail == null) {
						CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("vhacrm_subareaintersectionid", "D56255E9-AE45-E911-812D-1458D04E0CA0", "Provider", "vhacrm_subareaintersection");
					}
				}
				else if (purposeName == "Mission Act") {
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
				if (purposeName == "Mission Act") {
					CommCare.Shared.SetVisible("vhacrm_subareaintersectionid", true);
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "required");
				}
				else if (status == 0 && (programId == CommCare.Request.Constants.PROGRAM_TYPE_CSC || programId == CommCare.Request.Constants.PROGRAM_TYPE_NONVA) && purposeName == "Service Recovery") {
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
				}
				else {
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", "none");
					lockActionVISNVAMCBillingConcern();
				}
			}
		}
		//function showHideFacilityAcceptingRequests() {
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
		function brACRAccountHoldRequestOB2ResolutionAndDate() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var ob1ResolutionAhr = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");

			if (purposeValue !== null)
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);

			if ((purposeName === "ACR") && (ob1ResolutionAhr === CommCare.Request.Constants.OBResolution.NoContact)) {
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
			if (queueId.toLowerCase() === CommCare.Request.Constants.QUEUE_OPERATIONS) {
				CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", true);
				CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", false);
			}
			//else if ((queueName === "Closing the Loop") && (previousQueueName === "Operations")) {
			else if ((queueId.toLowerCase() === CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP) && (previousQueueId.toLowerCase() === CommCare.Request.Constants.QUEUE_OPERATIONS)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((authReceived === CommCare.Request.Constants.AuthorizationReceived.Yes) && (purposeName === "ACR") && (referredByVAMC === CommCare.Request.Constants.ReferredByVAMC.Yes)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((ob1ResolutionCtl !== null) && (ob1ResolutionCtl != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided) && (purposeName === "ACR")) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((ob2ResolutionCtl !== null) && (ob2ResolutionCtl != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided) && (purposeName === "ACR")) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (ob1ResolutionCtl !== null) && (ob2ResolutionCtl !== null)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (ob2ResolutionCtl !== null) && (ob3ResolutionCtl !== null)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (closingTheLoopFinalStatus === CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed)) {
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
			var choiceOperationsStatus = CommCare.Shared.GetFieldValue("vhacrm_choiceops_status_code");
			var previousQueue = CommCare.Shared.GetFieldValue("vhacrm_previousqueueid");
			var previousQueueName = getLookupName(previousQueue);
			var previousQueueId = CommCare.Shared.GetCleanId(previousQueue);
			var actionName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));
			var actionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));

			//if ((queueName === "PR&S") && actionName == "Closing the Loop") { //(choiceOperationsStatus === CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop)) {
			if ((queueId == CommCare.Shared.Constants.QUEUE_PRS) && actionId == CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP) { //(choiceOperationsStatus === CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop)) {
				CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", true);
				CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "required");
				CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
			}
			//else if ((queueName === "PR&S") && actionName != "Closing the Loop") /*(choiceOperationsStatus !== CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
			else if ((queueId == CommCare.Shared.Constants.QUEUE_PRS) && actionId != CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP) /*(choiceOperationsStatus !== CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
				CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", true);
				CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "none");
				CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
			}
			//else if ((queueName === "Closing the Loop") && (previousQueueName === "PR&S") && actionName == "Closing the Loop") /*(choiceOperationsStatus === CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
			else if ((queueId === CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP) && (previousQueueId === CommCare.Shared.Constants.QUEUE_PRS) && actionId == CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP) /*(choiceOperationsStatus === CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
				CommCare.Shared.SetVisible("vhacrm_choiceops_healthnettriwest_code", true);
				CommCare.Shared.SetRequired("vhacrm_choiceops_healthnettriwest_code", "required");
				CommCare.Shared.SetVisible("vhacrm_choiceops_bims_bool", false);
			}
			else if ((queueId === CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP) && (previousQueueId === CommCare.Shared.Constants.QUEUE_PRS) && actionId != CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP) /*(choiceOperationsStatus !== CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
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

			if (programTypeName == "PRRT") {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if (purposeName !== "ACR") {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var ob1ResolutionAhr = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
			var ob2ResolutionAhr = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (ob1ResolutionAhr === CommCare.Request.Constants.OBResolution.NoContact) && (ob2ResolutionAhr == null)) {
				CommCare.Shared.SetReadOnly("vhacrm_routeto_code", true);
				//CommCare.Shared.SetReadOnly("vhacrm_choiceops_status_code", true);
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
			}
			else if ((purposeName === "ACR") && (ob1ResolutionAhr == null) && (ob2ResolutionAhr == null)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && ((referredByVAMC === CommCare.Request.Constants.ReferredByVAMC.Yes) || (referredByVAMC === CommCare.Request.Constants.ReferredByVAMC.No))) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (referredByVAMC === CommCare.Request.Constants.ReferredByVAMC.No)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");
			var didYouOrTheNonVAProviderNotifyTheVAMC = CommCare.Shared.GetFieldValue("vhacrm_vamcnotification_code");

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (referredByVAMC === CommCare.Request.Constants.ReferredByVAMC.No) && (didYouOrTheNonVAProviderNotifyTheVAMC == CommCare.Request.Constants.NotifyTheVAMC.Yes)) {
				CommCare.Shared.SetRequired("vhacrm_vamcnoticationid", "required");
			}
			else if ((purposeName === "ACR") && (referredByVAMC === CommCare.Request.Constants.ReferredByVAMC.No) && (didYouOrTheNonVAProviderNotifyTheVAMC == CommCare.Request.Constants.NotifyTheVAMC.No)) {
				CommCare.Shared.SetRequired("vhacrm_vamcnoticationid", "none");
			}
		}
		function brACRReferredToVAMCYes() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var referredByVAMC = CommCare.Shared.GetFieldValue("vhacrm_referredbyvamc_code");

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (referredByVAMC === CommCare.Request.Constants.ReferredByVAMC.Yes)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if (purposeName === "ACR") {
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
			lookupValue[0].id = CommCare.Request.Constants.CCWF_DEFAULT_LOB;
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if (purposeName === "ACR") {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var closingTheLoopFinalStatus = CommCare.Shared.GetFieldValue("vhacrm_cl_clfinalstatus_code");

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "ACR") && (closingTheLoopFinalStatus != null)) {
				CommCare.Shared.SetVisible("vhacrm_cl_ob1resolution_code", true);
				CommCare.Shared.SetVisible("vhacrm_cl_ob1date_date", true);
			}
		}
		function brAssignedToQueueResolution() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var queueItem = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
			var queueItemName;
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (queueItem !== null) {
				queueItemName = CommCare.Shared.DialogNameReturn(queueItem[0].name);
			}

			if (purposeValue !== null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((queueItem == null) && ((purposeName !== "Discharge Planning") || (purposeName !== "Dental")) || hasRequestActionChanged) {
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
			if ((createdOn != null) && (interactedWith === CommCare.Request.Constants.InteractedWith.Provider || interactedWith === CommCare.Request.Constants.InteractedWith.VIPProvider) && (purposeDetailName === "Claim Status Report") && (lobName === "Customer Experience")) {
				CommCare.Shared.SetRequired("vhacrm_lastname_text", "required");
				CommCare.Shared.SetRequired("vhacrm_provideraddressline1_text", "none");
				CommCare.Shared.SetRequired("vhacrm_providercity_text", "none");
				CommCare.Shared.SetRequired("vhacrm_providerstateid", "none");
				CommCare.Shared.SetRequired("vhacrm_providerzip_text", "none");
			}
			else if ((createdOn != null) && (purposeDetailName !== "Claim Status Report") && (interactedWith === CommCare.Request.Constants.InteractedWith.Provider) && (lobName === "Customer Experience")) {
				CommCare.Shared.SetRequired("vhacrm_lastname_text", "none");
			}

			if (programTypeName == "PRRT") {
				MasterProviderTIN();
				return;
			}
		}
		function brCommunityCareDefaultSubAreaForClaimStatusArea() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;
			var accountHoldRequestNotes = CommCare.Shared.GetFieldValue("vhacrm_accountholdnotes_memo");
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (purposeDetailValue != null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}
			//TODO - use SetFormLookup?
			if ((purposeName === "Claim Status") && (purposeDetailName == null) && (accountHoldRequestNotes == null) && (lobName === "Customer Experience")) {
				//set purpose detail to "Inquiry"
				//construct object to pass into SetFieldValue
				var lookupValue = new Array();
				lookupValue[0] = new Object();
				lookupValue[0].id = CommCare.Request.Constants.PURPOSE_DETAIL_INQUIRY;
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

			if ((programTypeName === "Help Desk") && (lobName === "Customer Experience")) {
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

			if (programTypeName === "Help Desk") {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (purposeDetailValue != null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
			}

			if ((purposeName === "Claim Status") && (purposeDetailName == null)) {
				//set purpose detail to "Inquiry"
				//construct object to pass into SetFieldValue
				var lookupValue = new Array();
				lookupValue[0] = new Object();
				lookupValue[0].id = CommCare.Request.Constants.PURPOSE_DETAIL_INQUIRY;
				lookupValue[0].name = "Inquiry";
				lookupValue[0].entityType = "vhacrm_subareaintersection";

				CommCare.Shared.SetFieldValue("vhacrm_subareaintersectionid", lookupValue);
			}
		}
		function brFMShowMakeRequiredNonCoreReason() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((purposeName === "Non-Core") && (lobName === "OCC FM")) {
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
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purpose);
			var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName = getLookupName(purposeDetail);

			if (programTypeName == "PRRT") {
				MasterProviderTIN();
				return;
			}

			if (programTypeName !== "Help Desk" && programTypeName !== "PRRT") {
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

				if (programTypeName == "C6" || programTypeName == CommCare.Shared.Constants.C3Name) {
					if (interactedWith == CommCare.Request.Constants.InteractedWith.VAEmployee) {
						requireEmailOrPhoneC6();
					}
					else {
						var email = CommCare.Shared.GetFieldValue("hrc_emailaddress_text");

						if (email == null) CommCare.Shared.SetRequired("hrc_emailaddress_text", "none");
						if (email == null) CommCare.Shared.SetVisible("hrc_emailaddress_text", false);
						CommCare.Shared.SetRequired("ccwf_phone_text", "required");
						CommCare.Shared.SetVisible("ccwf_phone_text", true);
					}
					if (purposeName == "Bill of Collections" && purposeDetailName == "Provider") {
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

				if (source == CommCare.Request.Constants.Source.PATSR && patsrId != null) {
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

			if (programTypeName == "PRRT") {
				MasterProviderTIN();
				return;
			}

			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}



			if (lobName === "Customer Experience") {
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

				if (source == CommCare.Request.Constants.Source.PATSR && patsrId != null) {
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
				case CommCare.Request.Constants.Source.Email:
					CommCare.Shared.SetVisible("hrc_emailaddress_text", true);
					break;
				case CommCare.Request.Constants.Source.Fax:
					CommCare.Shared.SetVisible("vhacrm_faxnumber_text", true);
					break;
			}
		}
		function brLoadEditR6() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (purposeDetailValue != null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
			}
			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((purposeName === "Claim Status") && (purposeDetailName === "Inquiry") && (actionName === "Load Edit") && (lobName === "Customer Experience")) {
				CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
				CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
				CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
				CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
			}
			else if ((purposeName === "Traveling Veteran") && (actionName === "Load Edit") && (lobName === "Customer Experience")) {
				CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
				CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
				CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
				CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
			}
			//the following condition makes no sense logically, as none of the succeeding branches can be true
			else if ((purposeName == null) || (purposeDetailName == null) || (lobName === "Customer Experience")) {
				CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
				CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
				CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
				CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
			}
			else if ((purposeName !== "Claim Status") && (purposeName !== "Traveling Veteran") && (lobName === "Customer Experience")) {
				CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
				CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
				CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
				CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
			}
			else if ((actionName !== "Load Edit") && (actionName !== "Load Edit") && (lobName === "Customer Experience")) {
				CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "none");
				CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "none");
				CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", false);
				CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", false);
			}
			else if ((purposeName === "Claim Status") && (purposeDetailName !== "Inquiry") && (lobName === "Customer Experience")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			if (actionName === "Load Edit") {
				CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
				CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
				CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
				CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
			}
			else if (actionName === "Load Edit") { // This can't be right.  what is the intention here (the condition is identical to above, therefore else if will never hit)?
				CommCare.Shared.SetRequired("vhacrm_stationtobeloadedtoid", "required");
				CommCare.Shared.SetRequired("vhacrm_stationwithactivityid", "required");
				CommCare.Shared.SetVisible("vhacrm_stationtobeloadedtoid", true);
				CommCare.Shared.SetVisible("vhacrm_stationwithactivityid", true);
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
			var issueWasResolved = CommCare.Shared.GetFieldValue("mcs_issuewasresolved");
			var queueItemValue = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");

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

				if ((veteranId === defaultContactId) && (programTypeName !== "Help Desk") && patsrId == null) {
					CommCare.Shared.SetReadOnly("vhacrm_areaintersectionid", true);
					CommCare.Shared.SetReadOnly("vhacrm_subareaintersectionid", true);
					CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				} else if (programTypeName == "VISN/VAMC" && purposeName == "Billing Concern" && issueWasResolved && !queueItemValue) {
					CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
					CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				} else if (programTypeName == "VISN/VAMC" && purposeName == "Billing Concern" && issueWasResolved && queueItemValue != null) {
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

				lockFormForPatsrRejection(getLookupName(action));
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

			if (programTypeName === "Help Desk")
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Request.Constants.NonCoreReason.Choice)) {
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

			if ((interactionPurposeName === "Non-Core") && (nonCoreReason === CommCare.Request.Constants.NonCoreReason.Choice) && (lobName === "Customer Experience")) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Request.Constants.NonCoreReason.Choice) && (lobName === "Customer Experience")) {
				setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], true);
				setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "required");
			}
			else {
				setVisibleOnMultipleFields(["vhacrm_noncoredetail_code"], false);
				setRequiredOnMultipleFields(["vhacrm_noncoredetail_code"], "none");
			}
		}
		//NC Merge Candidate
		function brNonCoreReason() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if (purposeName === "Non-Core") {
				setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], true);
				setVisibleOnMultipleFields(["vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], false);
				setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "required");
			}
			else {
				setVisibleOnMultipleFields(["vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], true);
				setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], false);
				setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "none");
			}
		}
		//NC Merge Candidate
		function brNonCoreReasonInteraction() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var interactionPurposeValue = CommCare.Shared.GetFieldValue("ccwf_interactionpurpose");
			var interactionPurposeName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (interactionPurposeValue != null) {
				interactionPurposeName = CommCare.Shared.DialogNameReturn(interactionPurposeValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((interactionPurposeName === "Non-Core") && (lobName = "Customer Experience")) {
				setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], true);
				setVisibleOnMultipleFields(["ccwf_interactionpurposedetail"], false);
				setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "required");
			}
			else if ((interactionPurposeName !== "Non-Core") && (lobName = "Customer Experience")) {
				setVisibleOnMultipleFields(["ccwf_interactionpurposedetail"], true);
				setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], false);
				setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "none");
			}
		}
		//NC Merge Candidate
		function brNonCoreReasonRequest() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((purposeName === "Non-Core") && (lobName = "Customer Experience")) {
				setVisibleOnMultipleFields(["vhacrm_noncorereason_code"], true);
				setVisibleOnMultipleFields(["vhacrm_routingreason_code", "vhacrm_subareaintersectionid", "vhacrm_actionintersectionid"], false);
				setRequiredOnMultipleFields(["vhacrm_noncorereason_code"], "required");
				setRequiredOnMultipleFields(["vhacrm_routingreason_code"], "none");
			}
			else if ((purposeName !== "Non-Core") && (lobName = "Customer Experience")) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}

			if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Request.Constants.NonCoreReason.UnsupportedVISN)) {
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

			if ((interactionPurposeName === "Non-Core") && (nonCoreReason === CommCare.Request.Constants.NonCoreReason.UnsupportedVISN) && (lobName = "Customer Experience")) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var nonCoreReason = CommCare.Shared.GetFieldValue("vhacrm_noncorereason_code");
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((purposeName === "Non-Core") && (nonCoreReason === CommCare.Request.Constants.NonCoreReason.UnsupportedVISN) && (lobName = "Customer Experience")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			var purpose = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
			var claimNumber = CommCare.Shared.GetFieldValue("ccwf_claimnumber_text");
			var pdi = CommCare.Shared.GetFieldValue("hac_pdinumber_text");

			if ((actionName != null) && (actionName.indexOf("Unprocessed PDI") >= 0))
				setRequiredOnMultipleFields(["hac_pdinumber_text"], "required");
			else
				setRequiredOnMultipleFields(["hac_pdinumber_text"], "none");

			if (actionName != null && (actionName == "Recoupment Walkthru" || actionName == "Reopen Walkthru" || actionName == "Claim Push" || actionName == "Clinical Decision")) {
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

				if (actionName != null && (actionName == "Claim Push" || actionName == "Clinical Decision")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((interactedWith === CommCare.Request.Constants.InteractedWith.Provider || interactedWith === CommCare.Request.Constants.InteractedWith.VIPProvider) && (actionName === "Send Correspondence") && (lobName === "Customer Experience")) {
				CommCare.Shared.SetFieldValue("vhacrm_recipient_code", interactedWith);
				setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], true);
				setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
					"vhacrm_provideraddressline1_text"], false);
				setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], "required");
				setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
					"vhacrm_provideraddressline1_text"], "none");
			}
			else if ((interactedWith !== CommCare.Request.Constants.InteractedWith.Provider && interactedWith !== CommCare.Request.Constants.InteractedWith.VIPProvider) && (actionName === "Send Correspondence") && (lobName === "Customer Experience")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var recipient = CommCare.Shared.GetFieldValue("vhacrm_recipient_code");
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			if ((interactedWith === CommCare.Request.Constants.InteractedWith.Provider) && (createdOn != null) && (actionName === "Send Correspondence") && (recipient == null)) {
				setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], true);
				setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
					"vhacrm_provideraddressline1_text"], false);
				setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], "required");
				setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text",
					"vhacrm_provideraddressline1_text"], "none");
				CommCare.Shared.SetFieldValue("vhacrm_recipient_code", interactedWith);
			}
			else if ((interactedWith !== CommCare.Request.Constants.InteractedWith.Provider) && (actionName === "Send Correspondence") && (createdOn != null) && (recipient == null)) {
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
		function brRecipientNotProvider() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var recipient = CommCare.Shared.GetFieldValue("vhacrm_recipient_code");
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = programType != null ? CommCare.Shared.DialogNameReturn(programType[0].name) : null;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((actionName === "Send Correspondence") && (recipient !== CommCare.Request.Constants.InteractedWith.Provider) && (lobName === "Customer Experience")) {
				setVisibleOnMultipleFields(["ccwf_providerfacility_text"], false);
				setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "none");
			}
			else if ((actionName === "Send Correspondence") && (recipient === CommCare.Request.Constants.InteractedWith.Provider) && (lobName === "Customer Experience")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var recipient = CommCare.Shared.GetFieldValue("vhacrm_recipient_code");
			var createdOn = CommCare.Shared.GetFieldValue("createdon");

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			if ((actionName === "Send Correspondence") && (recipient !== CommCare.Request.Constants.InteractedWith.Provider) && (createdOn != null)) {
				setVisibleOnMultipleFields(["ccwf_providerfacility_text"], false);
				setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "none");
			}
			else if ((actionName === "Send Correspondence") && (recipient === CommCare.Request.Constants.InteractedWith.Provider) && (createdOn != null)) {
				setVisibleOnMultipleFields(["ccwf_providerfacility_text"], true);
				setRequiredOnMultipleFields(["ccwf_providerfacility_text"], "required");
			}
		}
		function brRelationshipToVeteran() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var relationshipToVeteran = CommCare.Shared.GetFieldValue("vhacrm_relationshiptoveteran_code");

			if (relationshipToVeteran === CommCare.Request.Constants.RelationshipToVeteran.Other) {
				setVisibleOnMultipleFields(["vhacrm_otherrelationship_text"], true);
			}
			else if ((relationshipToVeteran != null) && (relationshipToVeteran !== CommCare.Request.Constants.RelationshipToVeteran.Other)) {
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

			if ((purposeDetailName === "Claim Status Report") && (programTypeName !== "Help Desk")) {
				setVisibleOnMultipleFields(["hrc_facilityid"], false);
				setRequiredOnMultipleFields(["vhacrm_visnid"], "required");
			}
			else if ((purposeDetailName === "Claim Status Report") && (programTypeName !== "Help Desk")) {
				setVisibleOnMultipleFields(["hrc_facilityid"], true);
				setRequiredOnMultipleFields(["vhacrm_visnid"], "none");
			}
			else if (programTypeName === "Help Desk") {
				setVisibleOnMultipleFields(["hrc_facilityid", "vhacrm_visnid"], false);
				setRequiredOnMultipleFields(["hrc_facilityid", "vhacrm_visnid"], "none");
			}
		}

		function brRequireHomeFacility() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName;
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (purposeDetailValue != null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
			}
			if (programType != null) {
				programTypeName = CommCare.Shared.DialogNameReturn(programType[0].name);
			}
			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((purposeName === "Non-Core") || (purposeDetailName === "Claim Status Report") || (programTypeName === "Help Desk") || (actionName == "Claim Status Report") || (lobName !== "Customer Experience")) {
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
		function brSetBeneAndShowHideFieldsWhenActionIsCampLejeune() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			//var lookupValue = constructNoBeneObject();


			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			if ((actionName != null) && (actionName.indexOf("Camp Lejeune") >= 0)) {
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

			if (lobName === "Customer Experience") {
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
			if ((assignToSupervisors === CommCare.Request.Constants.TwoOptions.Yes)) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = getLookupName(programType);
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName = getLookupName(purposeDetailValue);

			if (programTypeName == "C6" || programTypeName == CommCare.Shared.Constants.C3Name) {
				if (purposeDetailName == "VA Facility") {
					CommCare.Shared.SetVisible("hrc_facilityid", true);
					CommCare.Shared.SetRequired("hrc_facilityid", "required");
				}
				else if (actionName == "Facility Follow Up") {
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
			else if ((purposeName === "Appointments") && (actionName === "Modify Appointment")) {
				setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
				setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "required");
			}
			else if ((purposeName === "Appointments") && (actionName === "Cancel Appointment")) {
				setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
				setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "required");
			}
			else if ((purposeName === "Appointments") && (actionName === "Create Appointment")) {
				setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
				setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "none");
			}
			else if ((purposeName === "Authorizations/Referrals") && (actionName === "Create Appointment")) {
				setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
				setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "none");
			}
			else if ((purposeName === "Authorizations/Referrals") && (actionName === "Modify Appointment")) {
				setVisibleOnMultipleFields(["vhacrm_appointmentdatetime_date"], true);
				setRequiredOnMultipleFields(["vhacrm_appointmentdatetime_date"], "required");
			}
			else if ((purposeName === "Authorizations/Referrals") && (actionName === "Cancel Appointment")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((actionName === "Send Correspondence") && (purposeName === "Emergent Care Notification") && (lobName === "Customer Experience")) {
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

			if (lobName === "OCC FM") {
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
		function brShowHideMillBillRulingNotes() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;

			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}
			if (purposeDetailValue != null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
			}

			if ((lobName === "Customer Experience") && (purposeDetailName === "Mill Bill Ruling")) {
				setVisibleOnMultipleFields(["mcs_millbillrulingnotes"], true);
				setVisibleOnMultipleFields(["vhacrm_requestnotes_memo"], false);
			}
			else if ((lobName === "Customer Experience") && (purposeDetailName !== "Mill Bill Ruling")) {
				setVisibleOnMultipleFields(["vhacrm_requestnotes_memo"], true);
				setVisibleOnMultipleFields(["mcs_millbillrulingnotes"], false);
			}
		}
		//TODO - Combine with the next function - which is written inefficiently but could be combined with this given thought
		function brCCRShowHideOtherReason() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var routingReason = CommCare.Shared.GetFieldValue("vhacrm_routingreason_code");
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			if ((routingReason === CommCare.Request.Constants.RoutingReason.Other) && (actionName === "Authorizations/Referrals Investigation")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((routingReason === CommCare.Request.Constants.RoutingReason.Other) && (actionName === "Authorizations/Referrals Investigation") && (lobName === "Customer Experience")) {
				setVisibleOnMultipleFields(["vhacrm_otherreason_text"], true);
			}
			else if ((routingReason === CommCare.Request.Constants.RoutingReason.Other) && (lobName === "Customer Experience")) {
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

			if (queueResolutionName === "Unable to complete Referral - Other") {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((actionName === "Send Correspondence") && (lobName === "Customer Experience")) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			if (actionName === "Send Correspondence") {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if (lobName !== "Customer Experience") {
				setVisibleOnMultipleFields(["vhacrm_routingreason_code"], false);
			}
			else if (actionName === "Authorizations/Referrals Investigation") {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}

			if (actionName === "Authorizations/Referrals Investigation") {
				setVisibleOnMultipleFields(["vhacrm_routingreason_code"], true);
			}
			else {
				setVisibleOnMultipleFields(["vhacrm_routingreason_code"], false);
			}
		}
		function brShowHideTINVendorization() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName;

			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (lob != null) {
				lobName = CommCare.Shared.DialogNameReturn(lob[0].name);
			}

			if ((purposeName === "Vendorization") && (lobName === "Customer Experience")) {
				setVisibleOnMultipleFields(["ccwf_tinvendorization"], true);
				setRequiredOnMultipleFields(["ccwf_tinvendorization"], "required");
			}
			else {
				setVisibleOnMultipleFields(["ccwf_tinvendorization"], false);
				setRequiredOnMultipleFields(["ccwf_tinvendorization"], "none");
			}
		}
		function brRequireCommCareProgramForClosingTheLoop() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var actionName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));
			var ob2resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

			if (ob2resolution != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting && actionName == "Closing the Loop") {
				CommCare.Shared.SetRequired("mcs_communitycareprogram", "required");
			}
			else {
				CommCare.Shared.SetRequired("mcs_communitycareprogram", "none");
			}
		}
		function constructNoBeneObject() {
			//construct object to pass into SetFieldValue
			var lookupValue = new Array();
			lookupValue[0] = new Object();
			lookupValue[0].id = CommCare.Request.Constants.NO_BENE_CONTACT;
			lookupValue[0].name = CommCare.Request.Constants.NO_BENE_CONTACT_NAME;
			lookupValue[0].entityType = "contact";
			return lookupValue;
		}
		function constructClaimStatusReportPurposeDetailObject() {
			//construct object to pass into SetFieldValue
			var lookupValue = new Array();
			lookupValue[0] = new Object();
			lookupValue[0].id = CommCare.Request.Constants.PURPOSE_DETAIL_CLAIM_STATUS_REPORT;
			lookupValue[0].name = "Claim Status Report";
			lookupValue[0].entityType = "vhacrm_subareaintersection";
			return lookupValue;
		}
		function setPurposeDetailOnRequestActionChangeToClaimStatusReport() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName;
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName;

			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			if (purposeValue != null) {
				purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
			}
			if (purposeDetailValue != null) {
				purposeDetailName = CommCare.Shared.DialogNameReturn(purposeDetailValue[0].name);
			}

			if ((purposeName === "Claim Status") && (purposeDetailName !== "Claim Status Report") && (actionName === "Claim Status Report")) {
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

					var actionTypeForm = "62d16774-b6ab-4a60-9702-2f87186559cf";
					var complaintTypeForm = "5533fa60-3ff8-44ca-8769-f29ead946c98";


					if (taskType !== null) {
						selectedForm = taskType == 806860000 ? actionTypeForm
							: taskType = 806860001 ? complaintTypeForm
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

			var actionId = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var workflowId = "5C6C5EEA-A7AD-475E-B124-8D490478FDD9";

			if (actionId == null) {
				alert("You must select an Action before attempting to route.");
			}
			else {
				var actionName = actionId != null ? CommCare.Shared.DialogNameReturn(actionId[0].name) : null;

				var isComplaint = actionName == "Complaint Level 1";
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
								CommCare.Shared.ExecuteWorkflow(workflowId, requestId).then(function () {
									CommCare.Shared.FormContext.data.save().then(launchTask(requestId));

								}).catch(function (e) {
									console.log("Error in running workflow with message: " + e.message);
								});
							});
						}
					});
				}
				else {
					CommCare.Shared.FormContext.data.save().then(function () {
						CommCare.Shared.CrmCommonJS.FormHelper.SetLookupValue("hac_temp_actionintersectionid", actionId[0].id, actionName, "vhacrm_actionintersection");
						CommCare.Shared.ExecuteWorkflow(workflowId, requestId).then(function () {
							CommCare.Shared.FormContext.data.save().then(launchTask(requestId));
						}).catch(function (e) {
							console.log("Error in running workflow with message: " + e.message);
						});
					});
				}
			}
		}

		function callRoutingAction(id) {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			return new Promise(function (resolve, reject) {
				var parameters = {};

				//id = "0623635d-d832-e811-8128-1458d04ef938";
				parameters.RequestEntityReference = { "incidentid": id, "@odata.type": "Microsoft.Dynamics.CRM.incident" };

				//JK can't find action
				var req = new XMLHttpRequest();
				req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/mcs_RouteActionButton", false);
				req.setRequestHeader("OData-MaxVersion", "4.0");
				req.setRequestHeader("OData-Version", "4.0");
				req.setRequestHeader("Accept", "application/json");
				req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				req.onreadystatechange = function () {
					console.log(this.readyState, this.status, this.statusText);
					if (this.readyState === 4) {
						req.onreadystatechange = null;
						if (this.status >= 200 && this.status < 300) {
							var result = JSON.parse(this.response);
							//Success - No Return Data - Do Something
							console.log("Successful create of Task with ID: " + result.TaskId);
							resolve("Sucess");
						} else {
							console.log("Error in Action call to create task: " + this.statusText);
							reject("Failed");
						}
					}
				};
				req.send(JSON.stringify(parameters));
			});
		}

		function callRoutingActionWorkflow(requestId) {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			return new Promise(function (resolve, reject) {
				var workFlowName = "FM - Route Action Button";
				var workFlowId = "{C176A386-C155-4E8D-A0DB-0AADBCC8CE2E}";
				//var xmlData = Xrm.Utility.getGlobalContext().getClientUrl() + '/XRMServices/2011/OrganizationData.svc/WorkflowSet?$select=WorkflowId&$filter=StateCode/Value eq 1 and ParentWorkflowId/Id eq null and Name eq \'' + workFlowName + '\'';
				//var xmlHttp = new XMLHttpRequest();
				//xmlHttp.open("GET", xmlData, false);
				//xmlHttp.send();
				//if (xmlHttp.status == 200) {
				//    var result = xmlHttp.responseText;
				//    workFlowId = //------ (write logic to parse workflow id from xmlHttp object)
				//    }

				//Now Trigger the WorkFlow
				var functionName = "executeWorkflow >>";
				var query = "workflows(" + workFlowId.replace("}", "").replace("{", "") + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
				var data = {
					"EntityId": requestId
				};
				var req = new XMLHttpRequest();
				req.open("POST", encodeURI(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/" + query), true);
				req.setRequestHeader("Accept", "application/json");
				req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				req.setRequestHeader("OData-MaxVersion", "4.0");
				req.setRequestHeader("OData-Version", "4.0");
				req.onreadystatechange = function () {
					if (this.readyState == 4 /* complete */) {
						if (this.status == 204) {
							console.log("Successful workflow call");
							resolve("success");
							//success callback this returns null since no return value available.    
						} else {
							//error callback
							console.log("Failed to call workflow");
							reject("failed");
						}
					}
				};
				req.send(JSON.stringify(data));
			});

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
				var providerForm = "86bca151-cd13-4e47-aede-2799b920ca2b";
				var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
				var lobName = getLookupName(lob);
				var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
				var purposeName = getLookupName(purpose);
				var purposeDetail = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
				var programDetailName = getLookupName(purposeDetail);

				if (lobName === "OCC FM" && purposeName == "Bill of Collections" && programDetailName == "Provider") {
					windowtoOpen = "http://event/?eventName=OpenContact&setfocus=true&formid=" + providerForm + "&rectype=provider&providerid=" + ContactId;

					setTimeout(function () {
						window.open(windowtoOpen);
					}, 1500);
				}
			}
		}

		//function lookupOrCreateBOC() {
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

		function USD_CallDCUGetDebtorNameFromKNumberAction(context) {
			CallDCUGetDebtorNameFromKNumberAction();
		}

		function CallDCUGetDebtorNameFromKNumberAction() {
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
		}

		function setBOCPrefix() {
			var purpDetail = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purpDetailName = getLookupName(purpDetail);
			var bocNumber = CommCare.Shared.GetFieldValue("hac_boc_text");

			if (purpDetailName == "Bill of Collections" && bocNumber == null) {
				CommCare.Shared.SetFieldValue("hac_boc_text", "741-K")
			}
		}

		function launchDebtorSearch(debtorName) {
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
		}

		function GetBillFromKNumber(kNumber) {
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
		}

		function USD_OpenBillFromKNumber(context) {
			OpenBillFromKNumber();
		}

		function OpenBillFromKNumber() {
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
		}

		//function refreshBOCQuickView(executionContext) {
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

		//	if (purposeName === "Emergent Care Notification" && interactedWith === CommCare.Request.Constants.InteractedWith.Provider && ((currentForm != null) && (currentForm.getId() !== CommCare.Request.Constants.ACR_FORM))) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			var programType = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programTypeName = getLookupName(programType);
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName = getLookupName(lob);
			var provider = CommCare.Request.Constants.InteractedWith.Provider;
			var vipProvider = CommCare.Request.Constants.InteractedWith.VIPProvider;
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
			if (lobName == CommCare.Shared.Constants.CCWF_LOB_NAME || programTypeName == "PRRT") {

				if (programType != "Help Desk" && purposeName != "Non-Core") {
					if ((interactedWith === provider || interactedWith === vipProvider) && actionName != "Send Correspondence" && purposeName != "Emergent Care Notification") {
						//setRequiredOnMultipleFields(["ccwf_tin_text"], "required");

						if (providerFacility == null && tin == null) {
							if (CommCare.Shared.GetFieldValue("caseorigincode") != CommCare.Request.Constants.Source.PATSR) {
								setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], "required");
							}
							setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);

							var setVis = (currentForm == CommCare.Request.Constants.ACR_FORM) ? true : false;
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
							if (CommCare.Shared.GetFieldValue("caseorigincode") != CommCare.Request.Constants.Source.PATSR) {
								setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], "required");
							}
							setVisibleOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text"], true);
						}

						if (currentForm == CommCare.Request.Constants.ACR_FORM) {
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
					else if ((interactedWith === provider || interactedWith === vipProvider) && (actionName == "Send Correspondence" || purposeName == "Emergent Care Notification")) {
						setVisibleOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], true);
						setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
						setRequiredOnMultipleFields(["ccwf_providerfacility_text", "ccwf_tin_text"], "required");
						setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
					}
					else if (purposeDetailName == "In Network" || purposeDetailName == "Out of Network") {
						setVisibleOnMultipleFields(["ccwf_tin_text"], false);
						setVisibleOnMultipleFields(["ccwf_providerfacility_text", "vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], true);
						setRequiredOnMultipleFields(["ccwf_tin_text"], "none");
						setRequiredOnMultipleFields(["ccwf_providerfacility_text", "vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "required");
					}
					else if (currentForm == CommCare.Request.Constants.ACR_FORM) {
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
					if (programTypeName == "C6" || programTypeName == CommCare.Shared.Constants.C3Name) {
						if (interactedWith == CommCare.Request.Constants.InteractedWith.VAEmployee) {
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

				if (programTypeName == "PRRT") {
					setRequiredOnMultipleFields(["ccwf_tin_text", "ccwf_providerfacility_text", "vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text", "ccwf_providerfacility_text"], "none");
					if (tin != null) {
						setVisibleOnMultipleFields(["ccwf_tin_text"], true);
					}
				}
			}
			else if (lobName == CommCare.Shared.Constants.OCCFM_LOB_NAME) {
				if (purposeName == "Bill of Collections" && purposeDetailName == "Provider") {
					CommCare.Shared.SetRequired("ccwf_tin_text", "required");
					CommCare.Shared.SetVisible("ccwf_tin_text", true);

					setRequiredOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], "none");
					setVisibleOnMultipleFields(["vhacrm_providerzip_text", "vhacrm_providerstateid", "vhacrm_providercity_text", "vhacrm_provideraddressline1_text"], false);
				}
				if (cust[0].entityType == "account") {
					CommCare.Shared.SetRequired("ccwf_tin_text", "required");
					CommCare.Shared.SetReadOnly("ccwf_tin_text", true);
					CommCare.Shared.SetVisible("ccwf_tin_text", true);
				}
			}
		}

		function hideShowEmailButton() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			var methodOfDelivery = CommCare.Shared.GetFieldValue("vhacrm_methodofdelivery_code");// Method of Delivery
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);

			var setVis = purposeName === "Emergent Care Notification" && actionName === "Send Correspondence" && methodOfDelivery == CommCare.Request.Constants.MethodOfDelivery.Email ? true : false
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			var methodOfDelivery = CommCare.Shared.GetFieldValue("vhacrm_methodofdelivery_code");// Method of Delivery
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName = getLookupName(purposeDetailValue);
			var createdOn = CommCare.Shared.GetFieldValue("createdon");
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobName = getLookupName(lob);

			if (((purposeName === "Emergent Care Notification") && (actionName === "Send Correspondence")) || actionName == "Send Documents") {
				hideShowEmailButton();

				//brBeginningEndingDatesMethodOfDeliveryR6
				CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
				CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
				CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
				CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
				CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
				CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");

				//brMethodOfDeliverySendCorrespondenceR6
				if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Mail) {
					setVisibleOnMultipleFields(["ccwf_address1_postalcode_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_address1_city_text", "vhacrm_address1_stateid"], true);
					setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
					setRequiredOnMultipleFields(["ccwf_address1_postalcode_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "vhacrm_address1_stateid"], "required");
					setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
				}
				else if (methodOfDelivery == CommCare.Request.Constants.MethodOfDelivery.VHIE) {
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
				else if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Email) {
					setVisibleOnMultipleFields(["ccwf_email_text"], true);
					if (lobName === "Customer Experience") {
						setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date", "vhacrm_address1_stateid"], false);
						setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_attentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
					}
					else {
						setVisibleOnMultipleFields(["ccwf_beginningdate_date", "ccwf_endingdate_date", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "vhacrm_faxattentionline_text", "ccwf_fax_text"], false);
						setRequiredOnMultipleFields(["ccwf_beginningdate_date", "ccwf_endingdate_date", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "vhacrm_faxattentionline_text", "ccwf_fax_text"], "none");
					}

					setRequiredOnMultipleFields(["ccwf_email_text"], "required");
				}
				else if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Fax) {
					setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], true);
					setVisibleOnMultipleFields(["ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
					setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], "required");
					setRequiredOnMultipleFields(["ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_address1_city_text", "ccwf_address1_line1_text", "ccwf_address1_attentionline_text", "ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
				}
			}

			if ((actionName === "Claim Status Report") && (purposeName === "Claim Status") && (purposeDetailName === "Claim Status Report")) {

				//brBeginningEndingDatesMethodOfDeliveryR6
				CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
				CommCare.Shared.SetVisible("ccwf_endingdate_date", true);
				CommCare.Shared.SetVisible("ccwf_beginningdate_date", true);
				CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
				CommCare.Shared.SetRequired("ccwf_endingdate_date", "required");
				CommCare.Shared.SetRequired("ccwf_beginningdate_date", "required");

				//brCCRMethodOfDeliverySendCorrespondenceR6

				//brMethodOfDeliveryClaimStatusReportPFRARR6
				if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Mail) {
					setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], true);
					setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text"], false);
					setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_beginningdate_date", "ccwf_endingdate_date", "vhacrm_address1_stateid"], "required");
					setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_email_text", "vhacrm_faxattentionline_text"], "none");
				}
				else if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Email) {
					setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], true);
					setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "vhacrm_address1_stateid"], false);
					setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "required");
					setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text"], "none");
				}
				else if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Fax) {
					setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], true);
					setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], false);
					setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "required");
					setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], "none");
				}
			}

			if ((methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.NotClaimStatusReport)) {
				setVisibleOnMultipleFields([], true);
				setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_fax_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
				setRequiredOnMultipleFields([], "required");
				setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
			}
			else if ((actionName === "PFRAR") && (purposeName === "Claim Status") && (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Mail) && (purposeDetailName === "Claim Status Report")) {
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text"], true);
				setVisibleOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_email_text"], false);
				if (lobName === "Customer Experience") {
					setRequiredOnMultipleFields(["vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_endingdate_date"], "none");
					setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_postalcode_text"], "required");
				}
				else {
					setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text"], "required");
					setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_email_text"], "none");
				}
			}
			else if ((actionName === "PFRAR") && (purposeName === "Claim Status") && (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Fax) && (purposeDetailName === "Claim Status Report") && (lobName === "Customer Experience")) {
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "vhacrm_faxattentionline_text", "ccwf_fax_text"], true);
				setVisibleOnMultipleFields(["ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], false);
				setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text"], "required");
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_city_text", "ccwf_address1_line1_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], "none");
			}
			//brCCRMethodOfDeliveryClaimStatusReportPFRARR6
			else if ((createdOn != null) && (actionName === "PFRAR") && (purposeName === "Claim Status") && (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Fax) && (purposeDetailName === "Inquiry")) {
				setVisibleOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text"], true);
				setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], false);
				setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text"], "required");
				setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "vhacrm_address1_stateid", "ccwf_address1_postalcode_text", "ccwf_email_text"], "none");
			}
			else if ((actionName === "PFRAR") && (purposeName === "Claim Status") && ((purposeDetailName === "Inquiry") || purposeDetailName === "Fraud, Waste, & Abuse")) {

				//brBeginningEndingDatesMethodOfDeliveryR6
				CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
				CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
				CommCare.Shared.SetVisible("ccwf_endingdate_date", false);
				CommCare.Shared.SetVisible("ccwf_beginningdate_date", false);
				CommCare.Shared.SetRequired("ccwf_endingdate_date", "none");
				CommCare.Shared.SetRequired("ccwf_beginningdate_date", "none");

				//if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Email) {
				//    setVisibleOnMultipleFields(["ccwf_email_text"], true);
				//    setVisibleOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], false);
				//    setRequiredOnMultipleFields(["ccwf_email_text"], "required");
				//    setRequiredOnMultipleFields(["vhacrm_faxattentionline_text", "ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], "none");
				//}

				if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Mail) {
					setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], true);
					setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
					setRequiredOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid"], "required");
					setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_email_text", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
				}
				else if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Email) {
					setVisibleOnMultipleFields(["ccwf_email_text"], true);
					setVisibleOnMultipleFields(["ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "ccwf_fax_text", "vhacrm_faxattentionline_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
					setRequiredOnMultipleFields(["ccwf_email_text"], "required");
					setRequiredOnMultipleFields(["ccwf_fax_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "vhacrm_faxattentionline_text", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
				}
				else if (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Fax) {
					setVisibleOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], true);
					setVisibleOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], false);
					setRequiredOnMultipleFields(["ccwf_fax_text", "vhacrm_faxattentionline_text"], "required");
					setRequiredOnMultipleFields(["ccwf_email_text", "ccwf_address1_attentionline_text", "ccwf_address1_line1_text", "ccwf_address1_city_text", "ccwf_address1_postalcode_text", "vhacrm_address1_stateid", "ccwf_beginningdate_date", "ccwf_endingdate_date"], "none");
				}
			}
			//brBeginningEndingDatesMethodOfDeliveryR6
			else if ((purposeDetailName === "Inquiry") && (actionName === "PFRAR") && (lobName === "Customer Experience")) {
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
			else if (purposeName == "Non-Core") {
				fieldList = ["ccwf_endingdate_date", "ccwf_endingdate_date"]
				setVisibleOnMultipleFields(fieldList, false);
				setRequiredOnMultipleFields(fieldList, "none");
				CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", false);
				CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "none");
			}
			else if (actionName == "Send Documents") {
				fieldList = ["ccwf_endingdate_date", "ccwf_endingdate_date"]
				setVisibleOnMultipleFields(fieldList, false);
				setRequiredOnMultipleFields(fieldList, "none");
				CommCare.Shared.SetVisible("vhacrm_methodofdelivery_code", true);
				CommCare.Shared.SetRequired("vhacrm_methodofdelivery_code", "required");
			}
			//brCCRBeginningEndingDatesMethodOfDeliveryR6
			else if ((purposeDetailName === "Inquiry") && (actionName !== "PFRAR")) {
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
			else if ((purposeDetailName === "Claim Status Report") && (actionName !== "Claim Status Report")) {
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
			else if ((purposeName == null) || (actionName == null)) {
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
			else if ((purposeName != "Claim Status") && (purposeName != "Emergent Care Notification")) {
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
			else if ((purposeName === "Claim Status") && (purposeDetailName == null)) {
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
			else if ((purposeName === "Emergent Care Notification") && (actionName !== "Send Correspondence")) {
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
			else if ((actionName !== "Send Correspondence") && (actionName !== "PFRAR") && (actionName !== "Claim Status Report")) {
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

				if (lobName === "Customer Experience") {
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

			if ((actionName === "Claim Status Report") && (methodOfDelivery === CommCare.Request.Constants.MethodOfDelivery.Mail) && (lobName === "Customer Experience")) {
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);

			if ((recipientCode == 810050001) && (purposeName == "Emergent Care Notification")) { //810050001 = Veteran
				if (modCode == 713770000) //mail
					CommCare.Shared.FormContext.ui.tabs.get("tab_12").setVisible(true);
				else
					CommCare.Shared.FormContext.ui.tabs.get("tab_12").setVisible(false);

				if (modCode == 713770001) //email
					CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_9").setVisible(true);
				else
					CommCare.Shared.FormContext.ui.tabs.get("tab_8").sections.get("tab_8_section_9").setVisible(false);

				if (modCode == 713770002) //fax
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
			for (var i = 0; i < arrayLength; i++) {
				if (CommCare.Shared.GetFieldValue(requiredPQIFields[i]) === null) {
					populated = false;
				}
			}

			return populated;
		}

		function hideShowPatsrTabs() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			//RequestDescription
			//tab_8

			//change this to look at patsrid

			var source = CommCare.Shared.GetFieldValue("caseorigincode");
			var patsId = CommCare.Shared.GetFieldValue("mcs_patsrid");
			var patsrTab = CommCare.Shared.FormContext.ui.tabs.get("PATSR");
			var namedEmployeesTab = CommCare.Shared.FormContext.ui.tabs.get("NamedEmployees");
			var summaryTab = CommCare.Shared.FormContext.ui.tabs.get("tab_8");
			var requestDescriptionSection = null;
			if (!!summaryTab) requestDescriptionSection = summaryTab.sections.get("RequestDescription");
			var fieldList = ["mcs_missionact", "mcs_treatmentstatus"]; //removed subfacility PV
			console.log(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			if (purpose != null) {
				Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr").then(
					function success(result) {
						//if (patsId != null /*source == CommCare.Request.Constants.Source.PATSR*/ || result["mcs_sendtopatsr"] == true) {
						if (patsId != null) {
							if (!!patsrTab) patsrTab.setVisible(true);
							if (!!namedEmployeesTab) namedEmployeesTab.setVisible(true);

							setVisibleOnMultipleFields(fieldList, true);
							setRequiredOnMultipleFields(fieldList, "required");
						}
						else {
							if (!!patsrTab) patsrTab.setVisible(false);
							if (!!namedEmployeesTab) namedEmployeesTab.setVisible(false);
							if (!!requestDescriptionSection) requestDescriptionSection.setVisible(false);
							setVisibleOnMultipleFields(fieldList, false);
							setRequiredOnMultipleFields(fieldList, "none");
						}
						if (result["mcs_sendtopatsr"]) {
							setVisibleOnMultipleFields(fieldList, true);
							setRequiredOnMultipleFields(fieldList, "required");
						}
					}
				);
			}


		}

		function PatsrQuickCreate() {
			if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
				var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
				console.log(fName);

				var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
				var complaintAction = "bd056b6d-483a-e711-9432-0050568d1c17";
				var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
				var actionId = CommCare.Shared.GetCleanId(action);
				var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
				var lobId = CommCare.Shared.GetCleanId(lob);

				if (patsrId != null) {
					CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
					var fieldList = ["mcs_treatmentstatus", "mcs_missionact", "mcs_callerlastname"];
					setVisibleOnMultipleFields(fieldList, true);
					CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "required");
					fieldList = ["mcs_missionact", "mcs_treatmentstatus"];
					setRequiredOnMultipleFields(fieldList, "required");
					return;
				}

				var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
				if (purpose != null) {
					Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr").then(
						function success(result) {
							var mcs_sendtopatsr = result["mcs_sendtopatsr"];

							if (mcs_sendtopatsr == true) {
								CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
								var fieldList = ["mcs_treatmentstatus", "mcs_missionact", "mcs_callerlastname"];
								setVisibleOnMultipleFields(fieldList, true);
								//CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "required");
								CommCare.Shared.SetVisible("vhacrm_requestnotes_memo", false);
								fieldList = ["mcs_missionact", "mcs_treatmentstatus"];
								setRequiredOnMultipleFields(fieldList, "required");
							}
							else {
								CommCare.Shared.SetVisible("vhacrm_actionintersectionid", true);
								var fieldList = ["mcs_treatmentstatus", "mcs_missionact", "mcs_callerlastname"];
								setVisibleOnMultipleFields(fieldList, false);
								//CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "none");
								CommCare.Shared.SetVisible("vhacrm_requestnotes_memo", true);
								fieldList = ["mcs_missionact", "mcs_treatmentstatus"];
								setRequiredOnMultipleFields(fieldList, "none");
								handleHiddenFields();
							}

							var issueResolved = CommCare.Shared.GetFieldValue("mcs_issuewasresolved")
							if (CommCare.Shared.GetCleanId(purpose) == CommCare.Request.Constants.PURPOSE_BILLINGCONCERN) {
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
					var fieldList = ["mcs_treatmentstatus", "mcs_missionact", "mcs_callerlastname"];
					setVisibleOnMultipleFields(fieldList, false);
					CommCare.Shared.SetRequired("vhacrm_requestnotes_memo", "none");
					fieldList = ["mcs_missionact", "mcs_treatmentstatus"];
					setRequiredOnMultipleFields(fieldList, "none");
					handleHiddenFields();
				}

				RequireComplaintNotesOnRequest();
			}
		}

		function RequireComplaintNotesOnRequest() {
			var complaintAction = "37f28ecf-9d11-ed11-82e3-001dd8036776";
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionId = CommCare.Shared.GetCleanId(action);
			var lob = CommCare.Shared.GetFieldValue("vhacrm_lobid");
			var lobId = CommCare.Shared.GetCleanId(lob);
			var fieldList = ["mcs_whotocall", "mcs_besttimetocall", "mcs_complaintphonenumber", "vhacrm_requestnotes_memo"];
			var fieldList2 = ["mcs_whotocall", "mcs_besttimetocall", "mcs_complaintphonenumber"];

			if (!!actionId && lobId == CommCare.Request.Constants.OCCFM_DEFAULT_LOB) {
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
							for (var i = 0; i < fieldList.length; i++) {
								var fieldVal = CommCare.Shared.GetFieldValue(fieldList[i]);
								if (!!fieldVal)
									CommCare.Shared.SetFieldValue(fieldList[i], null);
							}
						}
					},
					function (error) {
						console.log(error.message);
					}
				);
			}
			else if (!actionId && lobId == CommCare.Request.Constants.OCCFM_DEFAULT_LOB) {
				setVisibleOnMultipleFields(fieldList2, false);
				setRequiredOnMultipleFields(fieldList, false);
				for (var i = 0; i < fieldList.length; i++) {
					var fieldVal = CommCare.Shared.GetFieldValue(fieldList[i]);
					if (!!fieldVal)
						CommCare.Shared.SetFieldValue(fieldList[i], null);
				}
			}
		}

		function hideShowRequestActionC3Complaints() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log("---> " + fName);
			var type = CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid");
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");

			if (purpose != null) {
				Xrm.WebApi.online.retrieveRecord("vhacrm_areaintersection", purpose[0].id.replace(/[{}]/g, ""), "?$select=mcs_sendtopatsr").then(
					function success(result) {
						var mcs_sendtopatsr = result["mcs_sendtopatsr"];

						if (mcs_sendtopatsr == true && CommCare.Shared.GetCleanId(type) == CommCare.Shared.Constants.TYPE_INTERSECTION_C3) {
							CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
						}
					},
					function (error) {
						console.log(error.message);
					}
				);
			}
		}

		function hideShowRequestActionSubmittedRequest() {
			console.log(CommCare.Shared.GetFieldValue("statuscode"));
			if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Request.Constants.StatusCode.SenttoPA) {
				CommCare.Shared.SetVisible("vhacrm_actionintersectionid", false);
			}

		}

		function hideShowPatsrRejectReason() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var rejectReason = CommCare.Shared.GetFieldValue("mcs_rejectreason");
			var generalTab = CommCare.Shared.FormContext.ui.tabs.get("tab_8");

			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			actionName = actionName != null ? actionName.toLowerCase() : "null";

			if (generalTab != null) {
				var section = generalTab.sections.get("RejectReason");
				if (section != null) {
					if (rejectReason != null || actionName == "rejected by pats-r") {
						section.setVisible(true);
						if (actionName == "rejected by pats-r") {
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
			if (currentFormId == CommCare.Request.Constants.CCWF_FORM) {
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
			if (currentFormId == CommCare.Request.Constants.CCWF_FORM) {
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

		function objectIsEmpty(obj) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) return false;
			}
			return true;
		}

		function preFilterC3ServiceRecoveryActions() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid") != null) {
				if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")[0]["name"] == "Service Recovery") {
					console.log(CommCare.Shared.GetFieldValue("bah_interactionstorequestid"));
					if (CommCare.Shared.GetFieldValue("bah_interactionstorequestid") != null) {
						Xrm.WebApi.online.retrieveRecord("bah_interactions", CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("bah_interactionstorequestid")), "?$select=_bah_programtypeid_value").then(
							function success(result) {
								var _bah_programtypeid_value_formatted = result["_bah_programtypeid_value@OData.Community.Display.V1.FormattedValue"];
								if (_bah_programtypeid_value_formatted == CommCare.Shared.Constants.C3Name) {
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
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			actionName = actionName != null ? actionName.toLowerCase() : "null";
			var returnToVAMCActionId = "0549e1c3-b450-ed11-bba0-001dd8072538";
			var escalateToTierOneActionId = "52f870e9-b350-ed11-bba0-001dd8072538";
			var returnToServiceRecoveryActionId = "e73af496-34de-ea11-a813-001dd8018866";
			var serviceRecoveryInvestigationActionId = "7e4b9bfe-85d6-ea11-a813-001dd8018943";

			var tierOneQueue = "5e55f8c8-648b-ec11-8d20-001dd800b6ad";
			var tierOneSpecialistQueue = "14f451b8-b350-ed11-bba0-001dd8072538";

			console.log(CommCare.Shared.GetCleanId(action));
			console.log(purposeDetailName);
			console.log(actionName);

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
						if (purposeDetailName.indexOf("ava") > -1) {
							var fetchXml = "<filter>";
							fetchXml += "<condition attribute='vhacrm_actionintersectionid' operator='neq' value='" + escalateToTierOneActionId + "' />";
							fetchXml += "</filter>";
							CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addPreSearch(function () {
								CommCare.Shared.FormContext.getControl("vhacrm_actionintersectionid").addCustomFilter(fetchXml);
							});
						} /*else if (queueItemQueueName != "<Tier One Specialist>" || patsrId == null || purposeDetailName.indexOf("ava") > -1) {*/
						else if (!isTier1 || patsrId == null || purposeDetailName.indexOf("ava") > -1) {
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


			if (CommCare.Request.Constants.CurrentFormType.toLowerCase() != "quickcreate") {
				var currentFormId = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem().getId();
				if (currentFormId != CommCare.Request.Constants.CCWF_FORM)
					return;

				//Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'ShowRejectionReason' or  mcs_name eq 'ShowResolutionDescription' or mcs_name eq 'ShowWWHLResolutionTemplate'").then(
				Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'ShowRejectionReason' and statecode eq 0").then(
					function success(results) {
						var matchingSection = [];
						var matchingField = [];
						if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid") != null) {
							var actionGuid = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));

							for (var i = 0; i < results.entities.length; i++) {
								var lookupFilter = results.entities[i];
								var isMatch = false;
								if (lookupFilter["_mcs_action_value"] == actionGuid) {
									if (lookupFilter.mcs_name == "ShowResolutionDescription" && purposeDetail == "White House Hotline") {
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

			var lockActions = ["Rejected - Incorrect Facility", "Rejected - Not for OCC", "Rejected - Not Actionable", "Rejected - Other", "PATS-R Approval", "Send for PATS-R Approval"];

			if (lockActions.indexOf(action) > -1) {
				CommCare.Shared.LockForm();
			}
		}

		function hideShowQueueResolution() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var actionIntersectionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));

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
			if (currentFormId == CommCare.Request.Constants.CCWF_FORM) {
				var vsignalTab = CommCare.Shared.FormContext.ui.tabs.get("VSignals");
				var patsrTab = CommCare.Shared.FormContext.ui.tabs.get("PATSR");
				var namedEmployeeTab = CommCare.Shared.FormContext.ui.tabs.get("NamedEmployees");
				Xrm.WebApi.online.retrieveMultipleRecords("mcs_vsignalssurveytype",
					"?$filter=mcs_name eq 'Attending Community Care' or  mcs_name eq 'ATTENDING VA CC' or  mcs_name eq 'BILLING QUESTIONS VA CC' or  mcs_name eq 'CHOOSING VA CC' or  mcs_name eq 'FINANCIAL RESPONSIBILITY VA CC' or  mcs_name eq 'PRESCRIPTION VA CC' or  mcs_name eq 'SCHEDULING VA CC'").then(
						function success(results) {
							var validVSignal = false;
							var vSignalId = CommCare.Shared.GetFieldValue("mcs_vsignalssurveytype");
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
							case CommCare.Request.Constants.PatsRPriority.Crisis0Day:
								break;
							case CommCare.Request.Constants.PatsRPriority.Emergent1Day:
								priorityDate = addWeekdaysOnlyToDate(priorityDate, 1, holidayArray)
								dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
								maxDays = dateDiff;
								//maxDays += 1;
								break;
							case CommCare.Request.Constants.PatsRPriority.Urgent3Day:
								priorityDate = addWeekdaysOnlyToDate(priorityDate, 3, holidayArray)
								dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
								maxDays = dateDiff;
								//maxDays += 3;
								break;
							case CommCare.Request.Constants.PatsRPriority.General7Day:
								priorityDate = addWeekdaysOnlyToDate(priorityDate, 7, holidayArray)
								dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
								maxDays = dateDiff;
								//maxDays += 7;
								break;
							case CommCare.Request.Constants.PatsRPriority.ReviewPriority21Day:
								priorityDate = addWeekdaysOnlyToDate(priorityDate, 21, holidayArray)
								dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
								maxDays = dateDiff;
								//maxDays += 21;
								break;
							case CommCare.Request.Constants.PatsRPriority.Correspondence30Day:
								priorityDate = addWeekdaysOnlyToDate(priorityDate, 30, holidayArray)
								dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
								maxDays = dateDiff;
								//maxDays += 30;
								break;
							case CommCare.Request.Constants.PatsRPriority.Appeals45Day:
								priorityDate = addWeekdaysOnlyToDate(priorityDate, 45, holidayArray)
								dateDiff = Math.floor((priorityDate - now) / (1000 * 60 * 60 * 24));
								maxDays = dateDiff;
								//maxDays += 45;
								break;
							case CommCare.Request.Constants.PatsRPriority.Investigation60Day:
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
			return Xrm.WebApi.online.execute(mcs_GetFederalHolidaysRequest).then(
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
					var now = new Date();
					switch (CommCare.Shared.GetFieldValue("mcs_patsrprioritylist")) {
						case CommCare.Request.Constants.PatsRPriority.Crisis0Day:
							break;
						case CommCare.Request.Constants.PatsRPriority.Emergent1Day:
							now = addWeekdaysOnlyToDate(now, 1, holidayArray);
							break;
						case CommCare.Request.Constants.PatsRPriority.Urgent3Day:
							now = addWeekdaysOnlyToDate(now, 3, holidayArray);
							break;
						case CommCare.Request.Constants.PatsRPriority.General7Day:
							now = addWeekdaysOnlyToDate(now, 7, holidayArray);
							break;
						case CommCare.Request.Constants.PatsRPriority.ReviewPriority21Day:
							now = addWeekdaysOnlyToDate(now, 21, holidayArray);
							break;
						case CommCare.Request.Constants.PatsRPriority.Correspondence30Day:
							now = addWeekdaysOnlyToDate(now, 30, holidayArray);
							break;
						case CommCare.Request.Constants.PatsRPriority.Appeals45Day:
							now = addWeekdaysOnlyToDate(now, 45, holidayArray);
							break;
						case CommCare.Request.Constants.PatsRPriority.Investigation60Day:
							now = addWeekdaysOnlyToDate(now, 60, holidayArray);
							break;
					}
					CommCare.Shared.SetFieldValue("mcs_patsrduedate", typeof (now) == "object" ? now : new Date(now));
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
			if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
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

			if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid") != null) {
				var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
				if (purposeName == "Service Recovery") {
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

			var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));

			if (CommCare.Shared.GetFieldValue("ccwf_duedate_date") != null && purposeName != "Service Recovery") {
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

		function hideQueueResolutionForNonServiceRecoveryApprovalNonServiceRecoveryApprovalTeam() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid") != null) {
				if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")[0]["name"] != "Service Recovery Approval") {
					var globalContext = Xrm.Utility.getGlobalContext();
					Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + globalContext.userSettings.userId.replace("{", "").replace("}", "").toLowerCase()).then(
						function success(results) {
							var membershipArray = [];
							for (var i = 0; i < results.entities.length; i++) {

								var teamPromise = new Promise(function (resolve, reject) {
									return Xrm.WebApi.online.retrieveRecord("team", results.entities[i]["teamid"], "?$select=name").then(
										function success(result) {
											resolve(result["name"]);
										},
										function (error) {
											reject(Xrm.Navigation.openAlertDialog({ text: error.message }));
										}
									);
								});
								membershipArray.push(teamPromise);
							}
							Promise.all(membershipArray).then(function (returnedTeams) {
								var showQueueResolution = false;
								for (var j = 0; j < returnedTeams.length; j++) {
									if (returnedTeams[j] == "Service Recovery Approval") {
										showQueueResolution = true;
									}
								}
								CommCare.Shared.SetVisible("vhacrm_resolutionintersectionid", showQueueResolution);
							});
						},
						function (error) {
							Xrm.Navigation.openAlertDialog({ text: error.message });
						}
					);

				}
			}
		}

		function lockTaskTitleAndDueDate() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log("*** ", fName);
			var globalContext = Xrm.Utility.getGlobalContext();

			Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$filter=systemuserid eq " + globalContext.userSettings.userId.replace("{", "").replace("}", "").toLowerCase()).then(
				function success(results) {
					var lockTaskTitleDuelDate = true;
					var facility = CommCare.Shared.GetFieldValue("hrc_facilityid");
					var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
					for (var i = 0; i < results.entities.length; i++) {
						if (results.entities[i]["teamid"] == CommCare.Request.Constants.ServiceRecoveryApprovalTeam) {
							if (facility != null) {
								if (CommCare.Shared.GetLookupName(purpose) == "Service Recovery") {
									lockTaskTitleDuelDate = false;
									break;
								}

								if (facility[0]["name"] == "CX Contact Center") {
									lockTaskTitleDuelDate = false;
									break;
								} else {
									console.log("setting lock to true");
									lockTaskTitleDuelDate = true;
								}
							} else {
								lockTaskTitleDuelDate = false;
							}
						}
					}
					if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid") != null) {
						if (CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")[0]["name"] == "Return to Service Recovery" && CommCare.Shared.GetFieldValue("mcs_patsrid") != null) {
							lockTaskTitleDuelDate = true;
						}
					}

					if (CommCare.Shared.GetFieldValue("mcs_tasktitle") != null) {
						CommCare.Shared.SetReadOnly("mcs_tasktitle", lockTaskTitleDuelDate);
					}

					if (CommCare.Shared.GetFieldValue("ccwf_duedate_date") != null) {
						CommCare.Shared.SetReadOnly("ccwf_duedate_date", lockTaskTitleDuelDate);
					}

					console.log("LockTaskTitleDueDate: " + lockTaskTitleDuelDate);
				},
				function (error) {
					Xrm.Navigation.openAlertDialog({ text: error.message });
				}
			);
		}

		function requireUnResolvedDetails() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log("*** ", fName);

			var patientPerception = CommCare.Shared.GetFieldValue("mcs_patientperception");
			if (patientPerception == CommCare.Request.Constants.PatientPerception.Unresolved) {
				setRequiredOnMultipleFields(["mcs_unresolvedreason", "mcs_unresolveddetails"], "required");
				setVisibleOnMultipleFields(["mcs_unresolvedreason", "mcs_unresolveddetails"], true);
			}
			else if (patientPerception == CommCare.Request.Constants.PatientPerception.Resolved) {
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
			if (queueRes != null && validResolutionsForPatientPerception.indexOf(getLookupName(queueRes)) > -1) {
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
						if (_positionid_value_formatted.toLowerCase() != "supervisor" && _positionid_value_formatted.toLowerCase() != "senior supervisor") {
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
				if (purposeDetailName.indexOf("White House Hotline") > -1) {
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
			if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid") != null) {
				if (CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid")[0]["name"] != "Service Recovery") {
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
				var purpose = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
				var action = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));
				if (purpose != null && action != null) {
					if (purpose.toLowerCase() == CommCare.Request.Constants.PURPOSE_BILLINGCONCERN.toLowerCase() && (action.toLowerCase() == CommCare.Request.Constants.REQUESTACTION_PAYMENTESCALATION.toLowerCase() || action.toLowerCase() == CommCare.Request.Constants.REQUESTACTION_RETURNTOVAMC.toLowerCase())
						|| purpose.toLowerCase() == CommCare.Request.Constants.PURPOSE_CUSTOMERSERVICECONCERN.toLowerCase()) {

						var fetchXml = "<filter>";
						fetchXml += "<condition attribute='vhacrm_name' operator='neq' value='Resolved' />";
						fetchXml += "</filter>";

						CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addPreSearch(function () {
							console.log(fetchXml);
							CommCare.Shared.FormContext.getControl("vhacrm_resolutionintersectionid").addCustomFilter(fetchXml);
						});

					}
				}

			}
		}

		function prefilterQueueResolutionRejectedByPatsR() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log("*** ", fName);
			if (CommCare.Shared.GetFieldValue("statuscode") == CommCare.Request.Constants.StatusCode.RejectedByPats) {
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
							if (programType == results.entities[i]["_mcs_programtype_value"].replace("{", "").replace("}", "").toLowerCase()) {
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

		function preFilterRemoveSendToPatsPurposesUpdateForm() {
			if (CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.UPDATE_FORM) {
				var fetchXml = "<filter>";
				fetchXml += "<condition attribute='mcs_sendtopatsr' operator='neq' value='1' />";
				fetchXml += "</filter>";

				CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addPreSearch(function () {
					console.log(fetchXml);
					CommCare.Shared.FormContext.getControl("vhacrm_areaintersectionid").addCustomFilter(fetchXml);
				});
			}
		}

		function requireRequestDescriptionOnServiceRecoveryApproval() {
			if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
				var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
				if (requestAction != null) {
					var serviceRecoveryApprovalActionId = "2A1A960C-AE6E-EA11-A811-001DD8018866";
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
				"mcs_pointofcontactphonenumber"
			];

			if (CommCare.Request.Constants.CurrentFormType.toLowerCase() != "quickcreate") {
				Xrm.WebApi.online.retrieveMultipleRecords("mcs_lookupfilter", "?$filter=mcs_name eq 'PATSResolution' and statecode eq 0").then(function success(result) {
					var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
					var patsrApprovalActionC3 = "672e9fbf-23d0-ea11-a812-001dd8018866";
					var patsrApprovalActionNonVa = "3a76c062-4919-eb11-a813-001dd801df87";
					var serviceRecoveryApprovalNonVa = "2a1a960c-ae6e-ea11-a811-001dd8018866";
					var patsrApprovalActionDOHub = "4c761657-37c9-eb11-bacd-001dd802ec1e";
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
											var approvedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Request.Constants.PatsROutcomes.Approved);
											var disApprovedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Request.Constants.PatsROutcomes.Disapproved);
											var foundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Request.Constants.PatsROutcomes.Founded);
											var unfoundedValue = CommCare.Shared.FormContext.getAttribute("mcs_patsroutcome").getOption(CommCare.Request.Constants.PatsROutcomes.Unfounded);
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

								} else {

									for (var i = 0; i < WhhFieldOnChangeList.length; i++) {
										CommCare.Shared.SetVisible(WhhFieldOnChangeList[i], false);
										CommCare.Shared.SetRequired(WhhFieldOnChangeList[i], false);
									}

									var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
									if (requestAction != null) {
										var serviceRecoveryApprovalActionId = "2A1A960C-AE6E-EA11-A811-001DD8018866";
										var patsRApprovalId = "672e9fbf-23d0-ea11-a812-001dd8018866";
										if (requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == serviceRecoveryApprovalActionId.toLowerCase()
											|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsRApprovalId.toLowerCase()
											|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsrApprovalActionDOHub.toLowerCase()) {
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
							} catch (ex) {
								console.log(ex);
								//var WhhFieldOnChangeList = ["mcs_statementoftheissueandstatus", "mcs_dateveterancontacted", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_pointofcontact", "mcs_patsroutcome", "mcs_patsrindependentexternalreview"];
								for (var i = 0; i < WhhFieldOnChangeList.length; i++) {
									CommCare.Shared.SetVisible(WhhFieldOnChangeList[i], false);
									CommCare.Shared.SetRequired(WhhFieldOnChangeList[i], false);
								}
								var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
								if (requestAction != null) {
									var serviceRecoveryApprovalActionId = "2A1A960C-AE6E-EA11-A811-001DD8018866";
									var patsRApprovalId = "672e9fbf-23d0-ea11-a812-001dd8018866";
									if (requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == serviceRecoveryApprovalActionId.toLowerCase()
										|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsRApprovalId.toLowerCase()
										|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsrApprovalActionDOHub.toLowerCase()) {
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
						} else {
							//var WhhFieldOnChangeList = ["mcs_statementoftheissueandstatus", "mcs_dateveterancontacted", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_pointofcontact", "mcs_patsroutcome", "mcs_patsrindependentexternalreview"];
							for (var i = 0; i < WhhFieldOnChangeList.length; i++) {
								CommCare.Shared.SetVisible(WhhFieldOnChangeList[i], false);
								CommCare.Shared.SetRequired(WhhFieldOnChangeList[i], false);
							}

							var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
							if (requestAction != null) {
								var serviceRecoveryApprovalActionId = "2A1A960C-AE6E-EA11-A811-001DD8018866";
								var patsRApprovalId = "672e9fbf-23d0-ea11-a812-001dd8018866";
								if (requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == serviceRecoveryApprovalActionId.toLowerCase()
									|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsRApprovalId.toLowerCase()
									|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsrApprovalActionDOHub.toLowerCase()) {
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
					} else {
						//var WhhFieldOnChangeList = ["mcs_statementoftheissueandstatus", "mcs_dateveterancontacted", "mcs_actionsprogressandresolution", "mcs_nextsteps", "mcs_pointofcontact", "mcs_patsroutcome", "mcs_patsrindependentexternalreview"];
						for (var i = 0; i < WhhFieldOnChangeList.length; i++) {
							CommCare.Shared.SetVisible(WhhFieldOnChangeList[i], false);
							CommCare.Shared.SetRequired(WhhFieldOnChangeList[i], false);
						}

						var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
						if (requestAction != null) {
							var serviceRecoveryApprovalActionId = "2A1A960C-AE6E-EA11-A811-001DD8018866";
							var patsRApprovalId = "672e9fbf-23d0-ea11-a812-001dd8018866";
							if (requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == serviceRecoveryApprovalActionId.toLowerCase()
								|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsRApprovalId.toLowerCase()
								|| requestAction[0]["id"].replace("{", "").replace("}", "").toLowerCase() == patsrApprovalActionDOHub.toLowerCase()) {
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

				});
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
				description += "Date Veteran Contacted: " + dateString + "\n\n";
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
			var paymentEscalationId = "4afb3c4e-f8cd-eb11-bacc-001dd801c862";
			var billingConcernIdDoHub = "163bdfa9-f8cd-eb11-bacc-001dd801c862";
			var billingConcernIdC3 = "77fc43f1-c4bf-eb11-8236-001dd802dd2c";
			var returnToVamcActionId = "686a5a00-00ce-eb11-bacc-001dd801c862";
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
			var ReturntoTierTwoNVA = "10a1d7c5-548f-ec11-8d20-001dd801f2a8";
			var SendtoVAMCNVA = "31be14fa-4f8f-ec11-8d20-001dd801f2a8";
			var ReturntoTierOneC3 = "8e421e4a-de8d-ec11-8d20-001dd801d485";
			var ReturntoTierTwoC3 = "d7d39971-e08d-ec11-8d20-001dd801d485";
			var ReturntoVAMCC3 = "19febfb8-91f0-eb11-bacb-001dd8018ade";
			var ReturntoVAMCSA = "0549e1c3-b450-ed11-bba0-001dd8072538";
			var ReturnToTierOneNVA = "d5081fc9-6097-ec11-8d20-001dd8034b05";
			var ActionArray = [ReturntoTierTwoNVA, SendtoVAMCNVA, ReturntoTierOneC3, ReturntoTierTwoC3, ReturntoVAMCC3, ReturnToTierOneNVA, ReturntoVAMCSA];

			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionId = CommCare.Shared.GetCleanId(action);

			//if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid")) == "Return to VAMC") {
			if (ActionArray.indexOf(actionId) >= 0) {
				if (CommCare.Shared.FormContext.getControl("mcs_reasonforrejection") != null) {
					CommCare.Shared.SetVisible("mcs_reasonforrejection", true);
					CommCare.Shared.SetRequired("mcs_reasonforrejection", true);
					if (actionId == SendtoVAMCNVA) {
						CommCare.Shared.FormContext.getControl("mcs_reasonforrejection").setLabel("Request Notes");
					} else {
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
							if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid")).replace(/\s/g, "").toLowerCase() == CommCare.Shared.Constants.C3Name.toLowerCase() && CommCare.Shared.GetFieldValue("mcs_reasonforrejection") != null && queueItemQueueName != "<DO Hub>") {
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
					if (getLookupName(CommCare.Shared.GetFieldValue("vhacrm_typeintersectionid")).replace(/\s/g, "").toLowerCase() == CommCare.Shared.Constants.C3Name.toLowerCase() && CommCare.Shared.GetFieldValue("mcs_reasonforrejection") != null) {
						CommCare.Shared.SetReadOnly("mcs_reasonforrejection", true);
					}
				}
			}
		}

		function getQueueItemQueueName(queueItemId) {
			return
		}

		function prefilterReturnToVAMC(isLoad) {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log("*** ", fName);
			var billingConcernPurposeId = "95121a83-46b7-eb11-8236-001dd80216dc";
			var returnToVamcActionId = "19febfb8-91f0-eb11-bacb-001dd8018ade";
			var paymentEscalationId = "41a1980d-48b7-eb11-8236-001dd80216dc";
			var doHubQueueId = "a3f4441c-44b7-eb11-8236-001dd80216dc";
			var escalatedClaimReviewAction = "05ce7bfd-806d-ec11-8f8e-001dd803244d";
			var purposeId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
			var requestActionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));
			var queueItemId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_queueitemid"));
			var Tier1Queue = "5e55f8c8-648b-ec11-8d20-001dd800b6ad";
			var Tier2Queue = "92de07d5-648b-ec11-8d20-001dd800b6ad";
			var Tier3Queue = "fa3913db-648b-ec11-8d20-001dd800b6ad";

			//fix this for tier queues
			if (queueItemId) {
				Xrm.WebApi.online.retrieveRecord("queueitem", queueItemId, "?$select=_queueid_value").then(
					function success(result) {
						console.log(result);
						console.log(doHubQueueId);
						console.log(result["_queueid_value"] != doHubQueueId);
						CommCare.Request.Global.ReturnToVAMCFetch = "<filter>";
						if (result["_queueid_value"] != doHubQueueId && result["_queueid_value"] != Tier1Queue && result["_queueid_value"] != Tier2Queue && result["_queueid_value"] != Tier3Queue) {
							if (purposeId != billingConcernPurposeId || paymentEscalationId != requestActionId) {

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
				if (purposeId != billingConcernPurposeId || paymentEscalationId != requestActionId) {
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

		function handleAssignedToQuickCreate() {
			var purposeName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
			var requestAction = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "").toLowerCase();

			Xrm.WebApi.online.retrieveMultipleRecords("teammembership", "?$select=teamid&$filter=teamid eq " + CommCare.Request.Constants.ServiceRecoveryApprovalTeam + " and  systemuserid eq " + userId).then(
				function success(results) {
					if (results.entities.length > 0 && purposeName == "Service Recovery" && CommCare.Shared.FormContext.ui.getFormType() === CommCare.Shared.Constants.CREATE_FORM && requestAction != null) {
						CommCare.Shared.SetVisible("mcs_assignedtoquickcreate", true);
						preFilterAssignedToQuickCreate();
					}
					else {
						CommCare.Shared.SetFieldValue("mcs_assignedtoquickcreate", null);
						CommCare.Shared.SetVisible("mcs_assignedtoquickcreate", false);
					}
				},
				function (error) {
					CommCare.Shared.SetFieldValue("mcs_assignedtoquickcreate", null);
					CommCare.Shared.SetVisible("mcs_assignedtoquickcreate", false);
					console.log(error);
				}
			);
		}

		function preFilterAssignedToQuickCreate() {
			Xrm.WebApi.online.retrieveMultipleRecords("queuemembership", "?$select=systemuserid&$filter=queueid eq " + CommCare.Request.Constants.ServiceRecoveryQueue).then(
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

			if ((currentForm != null) && ((currentForm.getId() === CommCare.Request.Constants.ACR_FORM) || (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM))) {
				CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid", isFieldDirty);
				CommCare.Shared.SetReadOnly("vhacrm_cl_ob1resolution_code", isFieldDirty);
				CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", isFieldDirty);
				hasRequestActionChanged = isFieldDirty;
			}

			if (currentForm != null && currentForm.getId() === CommCare.Request.Constants.ACR_FORM) {
				var obField = CommCare.Shared.FormContext.getAttribute("vhacrm_ahr_ob1resolution_code");
				if (!!obField) {
					var obRequired = obField.getRequiredLevel();
					if (obRequired == "required")
						CommCare.Shared.SetReadOnly("vhacrm_ahr_ob1resolution_code", false);
				}
			}
		}

		function onChangeOfQueueResolutionOrOB1LockRequestAction_() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var currentForm = CommCare.Shared.FormContext.ui.formSelector.getCurrentItem();
			var isQRFieldDirty, isOB1CTLFieldDirty, isOB1AHRFieldDirty, isEitherFieldDirty;
			var requestActionFields;
			var ob1AHRValue;

			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.ACR_FORM)) {

				isOB1CTLFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob1resolution_code").getIsDirty()) ? true : false;
				isOB1AHRFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_ahr_ob1resolution_code").getIsDirty()) ? true : false;
				isEitherFieldDirty = isOB1CTLFieldDirty || isOB1AHRFieldDirty;

				if (isOB1AHRFieldDirty) {
					ob1AHRValue = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
					// if Provider Agrees/Disagrees is selected, Request Action field should remain unlocked (CRMCC-2610)
					if (ob1AHRValue == 713770001 || ob1AHRValue == 713770002) {
						isEitherFieldDirty = false;
					}
				}
			}

			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM)) {

				isQRFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").getIsDirty()) ? true : false;
				isEitherFieldDirty = isQRFieldDirty;
			}

			if ((currentForm != null) && ((currentForm.getId() === CommCare.Request.Constants.ACR_FORM) || (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM))) {
				//CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", isEitherFieldDirty);

				requestActionFields = CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").controls;
				requestActionFields = requestActionFields["_collection"];

				for (var i in requestActionFields) {
					requestActionFields[i].setDisabled(isEitherFieldDirty);
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

			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.ACR_FORM)) {
				isEitherFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_cl_ob1resolution_code").getIsDirty()) ? true : false;
			}

			if ((currentForm != null) && (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM)) {
				isEitherFieldDirty = (CommCare.Shared.FormContext.getAttribute("vhacrm_resolutionintersectionid").getIsDirty()) ? true : false;
			}

			if ((currentForm != null) && ((currentForm.getId() === CommCare.Request.Constants.ACR_FORM) || (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM))) {
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
			if ((currentForm != null) && ((currentForm.getId() === CommCare.Request.Constants.ACR_FORM) || (currentForm.getId() === CommCare.Request.Constants.CCWF_FORM))) {

				requestActionId = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");

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

							case 803750002: // VISN

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

							case 803750001: // Facility

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

							case 806860000: // Queue
							case 803750004: // Team inside of Queue

								if (queueName == routingQueue) {
									console.log("Routing type Queue - queue match [" + queueName + "]");
									routingCompleted = true;
								} else {
									console.log("Routing type Queue - queue mismatch [" + queueName + "/" + routingQueue + "]");
									routingCompleted = false;
								}
								break;

							case 806860001: //Team

								if (queueName == routingTeam) {
									console.log("Routing type Team - queue match [" + queueName + "]");
									routingCompleted = true;
								} else {
									console.log("Routing type Team - queue mismatch [" + queueName + "/" + routingTeam + "]");
									routingCompleted = false;
								}
								break;

							case 803750006: // Hub

								if (sendBackToFacility == 806860001) { // Use queue

									if (queueName == routingTeam) {

										console.log("Routing type Hub - queue match [" + queueName + "]");
										routingCompleted = true;
									} else {
										console.log("Routing type Hub - queue mismatch [" + queueName + "/" + routingTeam + "]");
										routingCompleted = false;
									}

								} else if (sendBackToFacility == 806860000) { // Use facility

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
								break;

							case 803750005: // Status Update
							case 803750003: // TPL
							case 803750000: // DCU
							case 806860002: // Other
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
			if ((interactedWith == CommCare.Request.Constants.InteractedWith.Provider || interactedWith == CommCare.Request.Constants.InteractedWith.VIPProvider)
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
			var programId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("ccwf_programid"));
			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;
			var status = CommCare.Shared.GetFieldValue("statecode");
			if (status == 0) {
				console.log(programId);
				if ((programId == CommCare.Request.Constants.PROGRAM_TYPE_CSC.toLowerCase() || programId == CommCare.Request.Constants.PROGRAM_TYPE_NONVA.toLowerCase()) && purposeName == "Service Recovery") {
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
				} else {
					CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", false);
					lockActionVISNVAMCBillingConcern();
				}
			}
		}

		function lockAdditionalFollowUpWhenEsclating() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var isEscalating = CommCare.Shared.GetFieldValue("hac_cl1_needescalationtosrsup_bool");
			var followUp = CommCare.Shared.GetFieldValue("hac_cl1_additionalfollowupneeded_code");
			if (isEscalating && followUp == null) {
				CommCare.Shared.SetReadOnly("hac_cl1_additionalfollowupneeded_code", true);
			}

			var followUpAttempted = CommCare.Shared.GetFieldValue("hac_cl1_followupattempted_bool");
			var followUpAttemptedVisible = CommCare.Shared.FormContext.getControl("hac_cl1_followupattempted_bool").getVisible();
			var followUpMade = CommCare.Shared.GetFieldValue("hac_cl1_followupmade_bool");
			var followUpMadeVisible = CommCare.Shared.FormContext.getControl("hac_cl1_followupmade_bool").getVisible();

			if (followUpAttemptedVisible && !followUpAttempted && followUpMadeVisible && !followUpMade && isEscalating && followUp == null) {
				CommCare.Shared.SetReadOnly("hac_cl1_followupattempted_bool", true);
				CommCare.Shared.SetReadOnly("hac_cl1_followupmade_bool", true);
			}
		}

		function showHideImageLocatorTypeOfCare() {
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName;
			if (action != null) {
				actionName = CommCare.Shared.DialogNameReturn(action[0].name);
			}
			var imageLocator = CommCare.Shared.GetFieldValue("mcs_imagelocator");
			var typeOfCare = CommCare.Shared.GetFieldValue("mcs_typeofcare");
			if ((actionName != null && (actionName == "Claim Push" || actionName == "Clinical Decision")) || (imageLocator != null && typeOfCare != null)) {
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
		}

		function lockDueDateForPSDDTAClaimFU() {
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			console.log(actionName);

			if (actionName == "PSD DTA Claim Follow-Up") {
				CommCare.Shared.SetReadOnly("ccwf_duedate_date", true);
			} else {
				CommCare.Shared.SetReadOnly("ccwf_duedate_date", false);
			}
		}

		function clearSubTypeOnChangeOfTreatmentStatus() {
			CommCare.Shared.SetFieldValue("mcs_treatmentstatussubtype", null);
			showHideTreatmentStatusSubType();
		}

		function showHideTreatmentStatusSubType() {
			var treatmentStatusSubType = CommCare.Shared.GetFieldValue("mcs_treatmentstatussubtype");
			var treatmentStatusId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("mcs_treatmentstatus"));
			if (treatmentStatusSubType != null) {
				CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", true);
				CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", true);
			} else if (treatmentStatusId == null) {
				CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", false);
				CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", false);
			}
			else {

				Xrm.WebApi.online.retrieveMultipleRecords("mcs_treatmentstatussubtype", "?$filter=_mcs_treatmentstatus_value eq " + treatmentStatusId).then(
					function success(results) {
						if (results.entities.length > 0) {
							CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", true);
							CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", true);
						} else {
							CommCare.Shared.SetVisible("mcs_treatmentstatussubtype", false);
							CommCare.Shared.SetRequired("mcs_treatmentstatussubtype", false);
						}

					},
					function (error) {
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
						var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
						var actionName = getLookupName(action);
						console.log(actionName);
						var lockForActions = ["Bill of Collection (BOC)", "Bowel and Bladder", "Claim Reprocessing", "Load Edit", "Claim Reprocessing - Ambulance/Bene Travel", "Reimbursement Request", "Provide Appeal Status"];
						if (lockForActions.indexOf(actionName) > -1 && statecode != 1) {
							CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid1", true);
						} else {
							CommCare.Shared.SetReadOnly("vhacrm_resolutionintersectionid1", false);
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
			var CommCareBillingConcernAreaId = "450cc7e4-4e8f-ec11-8d20-001dd801f2a8";
			var VisnVamcBillingConcernAreaId = "95121a83-46b7-eb11-8236-001dd80216dc";
			var NonVaSendToVamcActionId = "31be14fa-4f8f-ec11-8d20-001dd801f2a8"

			var patsrId = CommCare.Shared.GetFieldValue("mcs_patsrid");
			var purposeDetailValue = CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid");
			var purposeDetailName = getLookupName(purposeDetailValue);
			purposeDetailName = purposeDetailName != null ? purposeDetailName.toLowerCase() : "null";
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			actionName = actionName != null ? actionName.toLowerCase() : "null";
			var queue = CommCare.Shared.GetFieldValue("vhacrm_queueid");
			var queueName = getLookupName(queue);
			console.log(purposeDetailName);
			console.log(queueName);

			var setVisReqForEscalateTierOne = (!(purposeDetailName.indexOf("ava") > -1) && actionName.indexOf("escalate to tier one") > -1 && queueName != "<Tier One Specialist>" && queueName != "<Tier One>");
			console.log("setVisReqForEscalateTierOne: " + setVisReqForEscalateTierOne);

			AreaArray = [CommCareBillingConcernAreaId, VisnVamcBillingConcernAreaId];

			var area = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var areaName = getLookupName(area);
			var areaId = CommCare.Shared.GetCleanId(area);

			var setVis = (AreaArray.indexOf(areaId) >= 0 || setVisReqForEscalateTierOne || CommCare.Shared.GetCleanId(action) == NonVaSendToVamcActionId) ? true : false;

			CommCare.Shared.SetVisible("mcs_caretype", setVis);

			//set required when it is an escalated billing concern
			var TierTwoCCNOptumNVA = "6277b55d-518f-ec11-8d20-001dd801f2a8";
			var TierTwoCCNTriwestNVA = "1965a869-518f-ec11-8d20-001dd801f2a8";
			var TierTwoLocalContractNVA = "cd7da881-518f-ec11-8d20-001dd801f2a8";
			var TierTwoUrgentEmergentNVA = "0aebc451-518f-ec11-8d20-001dd801f2a8";
			var TierTwoVCANVA = "218db575-518f-ec11-8d20-001dd801f2a8";
			var escalateToTier1Team = "16170bb9-af8d-ec11-8d20-001dd801d485";

			ActionArray = [TierTwoCCNOptumNVA, TierTwoCCNTriwestNVA, TierTwoLocalContractNVA, TierTwoUrgentEmergentNVA, TierTwoVCANVA];

			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(action);
			var actionId = CommCare.Shared.GetCleanId(action);

			var setReq = setVisReqForEscalateTierOne ? true
				: actionName == "RN Follow-up" ? true
					: actionId == escalateToTier1Team ? true
						: ActionArray.indexOf(actionId) >= 0 ? true
							: CommCare.Shared.GetCleanId(action) == NonVaSendToVamcActionId ? true
								: false;

			CommCare.Shared.SetRequired("mcs_caretype", setReq);

			//CommCare.Shared.SetVisible("mcs_escalationnotes", setVisReqForEscalateTierOne);
			//CommCare.Shared.SetRequired("mcs_escalationnotes", setVisReqForEscalateTierOne);
		}


		function hideShowEscalationNotes() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var EscalatetoTierOneC3 = "16170bb9-af8d-ec11-8d20-001dd801d485";
			var EscalatetoTierOneSR = "52f870e9-b350-ed11-bba0-001dd8072538";
			var EscalatetoTierThreeC3 = "c531a0c2-dd8d-ec11-8d20-001dd801d485";
			var EscalatetoTierThreeNVA = "48c18f74-538f-ec11-8d20-001dd801f2a8";
			var EscalatedClaimReviewC3 = "05ce7bfd-806d-ec11-8f8e-001dd803244d";
			var InitialClaimReviewC3 = "ab973dcd-806d-ec11-8f8e-001dd803244d";
			var InternalTierOneReviewNVA = "8f06947b-4f8f-ec11-8d20-001dd801f2a8";
			var PaymentEscalationC3 = "41a1980d-48b7-eb11-8236-001dd80216dc";
			var ReturntoTierOneC3 = "8e421e4a-de8d-ec11-8d20-001dd801d485";
			var ReturntoTierTwoC3 = "d7d39971-e08d-ec11-8d20-001dd801d485";
			var ReturntoTierTwoNVA = "10a1d7c5-548f-ec11-8d20-001dd801f2a8";
			var ReturntoVAMCC3 = "19febfb8-91f0-eb11-bacb-001dd8018ade";
			var SendtoVAMCNVA = "31be14fa-4f8f-ec11-8d20-001dd801f2a8";
			var TierTwoCCNOptumC3 = "3120930b-d88d-ec11-8d20-001dd801d485";
			var TierTwoCCNOptumNVA = "6277b55d-518f-ec11-8d20-001dd801f2a8";
			var TierTwoCCNTriwestC3 = "0e9fe91d-d88d-ec11-8d20-001dd801d485";
			var TierTwoCCNTriwestNVA = "1965a869-518f-ec11-8d20-001dd801f2a8";
			var TierTwoLocalContractC3 = "d1f30942-d88d-ec11-8d20-001dd801d485";
			var TierTwoLocalContractNVA = "cd7da881-518f-ec11-8d20-001dd801f2a8";
			var TierTwoUrgentEmergentC3 = "0a6c622b-d78d-ec11-8d20-001dd801d485";
			var TierTwoUrgentEmergentNVA = "0aebc451-518f-ec11-8d20-001dd801f2a8";
			var TierTwoVCAC3 = "49951730-d88d-ec11-8d20-001dd801d485";
			var TierTwoVCANVA = "218db575-518f-ec11-8d20-001dd801f2a8";
			var VAMCInternalReviewC3 = "43c7fa6e-fc67-ec11-8f8e-001dd800c03c";

			var ActionArray = [EscalatetoTierOneC3, EscalatetoTierOneSR, EscalatetoTierThreeC3, TierTwoCCNOptumC3, TierTwoCCNTriwestC3, TierTwoLocalContractC3
				, TierTwoVCAC3, EscalatetoTierThreeNVA, TierTwoCCNOptumNVA, TierTwoCCNTriwestNVA, TierTwoLocalContractNVA
				, TierTwoUrgentEmergentNVA, TierTwoVCANVA, TierTwoUrgentEmergentC3];

			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
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
				if (actionId == TierTwoCCNOptumC3 || actionId == TierTwoCCNTriwestC3 || actionId == TierTwoLocalContractC3 || actionId == TierTwoUrgentEmergentC3 || actionId == TierTwoVCAC3
					|| actionId == TierTwoCCNOptumNVA || actionId == TierTwoCCNTriwestNVA || actionId == TierTwoLocalContractNVA || actionId == TierTwoUrgentEmergentNVA || actionId == TierTwoVCANVA) {
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
			var required = poc == CommCare.Request.Constants.HacYN.Yes ? true : false;
			CommCare.Shared.SetRequired("mcs_pointofcontactphonenumber", required);
			//CommCare.Shared.SetRequired("mcs_pointofcontactposition", required);
			CommCare.Shared.SetRequired("mcs_pointofcontactemail", required);
		}

		function setPOCUserData() {
			var poc = CommCare.Shared.GetFieldValue("mcs_setsubmitteraspointofcontact");
			if (poc == CommCare.Request.Constants.HacYN.Yes) {
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
			var purposeIntersectionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid"));
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
			var AvaSubPurpose = "161c9f94-19b5-ec11-983e-001dd80335c4";
			var WHHLSupPurpose = "f1251925-2162-ea11-a993-001dd800ba25";

			var purposeDetailName = CommCare.Shared.GetLookupName(CommCare.Shared.GetFieldValue("vhacrm_subareaintersectionid"));
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
				field.removeOption(803750004);
			}
		}

		function requireReasonForClaimDenied() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var claimRes = CommCare.Shared.GetFieldValue("vhacrm_choiceops_claimresolution_code");
			var setVal = claimRes == CommCare.Request.Constants.ClaimResolution.ClaimDenied;

			CommCare.Shared.SetVisible("vhacrm_choiceops_reason_code", setVal);
			CommCare.Shared.SetRequired("vhacrm_choiceops_reason_code", setVal);
		}

		function setActionFromCommunityCareProgram(isLoad, source) {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName + " Source: " + source);

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
					if (source == "ob2" && ob2 != CommCare.Request.Constants.OBResolution.ProviderAgrees && ob2 != CommCare.Request.Constants.OBResolution.ProviderDisagrees) {
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

		function requireAHRNotes() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var generalTab = CommCare.Shared.FormContext.ui.tabs.get("General");
			var opsTab = CommCare.Shared.FormContext.ui.tabs.get("tabChoiceOperationsGroup");
			var action = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionId = CommCare.Shared.GetCleanId(action);

			var ob1 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
			var ob2 = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");

			if (!!generalTab) {
				if (generalTab.getDisplayState() == "expanded"
					&& !!actionId
					&& (actionId == CommCare.Request.Constants.REQUESTACTION_CCNOPTUM
						|| actionId == CommCare.Request.Constants.REQUESTACTION_CCNTRIWEST
						|| actionId == CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP
						|| actionId == CommCare.Request.Constants.REQUESTACTION_HEALTHNET)
					&& (ob1 != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
						|| ob2 != CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting)
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
					&& (actionId == CommCare.Request.Constants.REQUESTACTION_CCNOPTUM
						|| actionId == CommCare.Request.Constants.REQUESTACTION_CCNTRIWEST
						|| actionId == CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP
						|| actionId == CommCare.Request.Constants.REQUESTACTION_HEALTHNET)
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
			var actionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));
			var queueId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_queueid"));

			var ob1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
			var ob2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
			var ob3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");

			var obNotNull = ob1 != null || ob2 != null || ob3 != null;

			if ((queueId == CommCare.Request.Constants.QUEUE_OPERATIONS
				&& (actionId == CommCare.Request.Constants.REQUESTACTION_AMBULANCE || actionId == CommCare.Request.Constants.REQUESTACTION_TRADCC))
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

			var actionId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));
			var queueId = CommCare.Shared.GetCleanId(CommCare.Shared.GetFieldValue("vhacrm_queueid"));

			var ob1 = CommCare.Shared.GetFieldValue("mcs_pomob1resolution");
			var ob2 = CommCare.Shared.GetFieldValue("mcs_pomob2resolution");
			var ob3 = CommCare.Shared.GetFieldValue("mcs_pomob3resolution");

			var ob2Fields = ["mcs_pomob2resolution", "mcs_pomob2date"];
			var ob3Fields = ["mcs_pomob3resolution", "mcs_pomob3date"];

			if (!!opsTab && opsTab.getDisplayState() == "expanded" && queueId == CommCare.Request.Constants.QUEUE_OPERATIONS) {
				if (actionId == CommCare.Request.Constants.REQUESTACTION_AMBULANCE || actionId == CommCare.Request.Constants.REQUESTACTION_TRADCC) {
					if (ob1 == null) {
						setVisibleOnMultipleFields(ob2Fields, false);
						setVisibleOnMultipleFields(ob3Fields, false);
						setValuesToNullOnMultipleFields(ob2Fields);
						setValuesToNullOnMultipleFields(ob3Fields);
					}
					else if (ob1 != null && ob2 == null && ob1 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided) {
						setVisibleOnMultipleFields(ob2Fields, true);
						setVisibleOnMultipleFields(ob3Fields, false);
						setValuesToNullOnMultipleFields(ob3Fields);
						//should I clear ob3?
					}
					else if (ob1 != null && ob2 == null && ob1 == CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided) {
						setVisibleOnMultipleFields(ob2Fields, false);
						setVisibleOnMultipleFields(ob3Fields, false);
						if (isLoad === "onchange") CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed);
						if (isLoad === "onchange") CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
						setValuesToNullOnMultipleFields(ob3Fields);
						//should I clear ob2 and ob3?
					}
					else if (ob1 != null & ob2 != null && ob3 == null && ob2 != CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided) {
						setVisibleOnMultipleFields(ob2Fields, true);
						setVisibleOnMultipleFields(ob3Fields, true);
					}
					else if (ob1 != null & ob2 != null && ob3 == null && ob2 == CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided) {
						setVisibleOnMultipleFields(ob2Fields, true);
						setVisibleOnMultipleFields(ob3Fields, false);
						setValuesToNullOnMultipleFields(ob3Fields);
						if (isLoad === "onchange") CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed);
						if (isLoad === "onchange") CommCare.Shared.FormContext.getAttribute("mcs_operationsfinalstatus").fireOnChange();
					}
					else if (ob1 != null && ob2 != null & ob3 != null) {
						setVisibleOnMultipleFields(ob2Fields, true);
						setVisibleOnMultipleFields(ob3Fields, true);
						if (ob3 == CommCare.Request.Constants.ClosingTheLoopOBResolution.ResolutionProvided) {
							if (isLoad === "onchange") CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed);
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
				Xrm.WebApi.online.retrieveRecord("vhacrm_actionintersection", CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP, "?$select=vhacrm_name").then(
					function success(result) {
						var vhacrm_actionintersectionid = result["vhacrm_actionintersectionid"]; // Guid
						var vhacrm_name = result["vhacrm_name"]; // Text
						var action = [{ id: vhacrm_actionintersectionid, entityType: "vhacrm_actionintersection", name: vhacrm_name }];

						CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", action);
						CommCare.Shared.SetFieldValue("mcs_operationsfinalstatus", CommCare.Request.Constants.ClosingTheLoopFinalStatus.Pending);

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

			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;

			// If ACR Request's OB1 Resolution is set to NACR, allow form to save to set Queue resolution to Resolved
			if (purposeName == "ACR") {
				if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
					return;
				}

				CommCare.Shared.SetVisible("vhacrm_choiceops_visnid", true);
				CommCare.Shared.SetVisible("vhacrm_choiceops_siteid", true);

				var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
				var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
				var queueid = CommCare.Shared.FormContext.getAttribute("vhacrm_queueid").getValue();
				if (ob1Resolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
					|| ob2Resolution === CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
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
					CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
					CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
					CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
					CommCare.Shared.SetRequired("mcs_wastherea72hournotification", "none");
					CommCare.Shared.SetRequired("mcs_collectionscompany", "none");
					CommCare.Shared.SetRequired("mcs_collectionsphonenumber", "none");
					CommCare.Shared.SetRequired("mcs_authorizationnumber", "none");
					CommCare.Shared.SetRequired("ccwf_providerfacility_text", "none");
					CommCare.Shared.SetRequired("vhacrm_provider_phoneno_text", "none");
					CommCare.Shared.SetRequired("hrc_facilityid", "none");
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

		//No longer needed -- Moved to setNotRequired
		//why does the business rule show the fields in both cases?
		//function brACRChoiceOperationsCompleted() {
		//	var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
		//	console.log(fName);
		//	var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
		//	var purposeName;
		//	var choiceOperationsStatus = CommCare.Shared.GetFieldValue("vhacrm_choiceops_status_code");
		//	var actionName = getLookupName(CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid"));

		//	if (purposeValue !== null) {
		//		purposeName = CommCare.Shared.DialogNameReturn(purposeValue[0].name);
		//	}

		//	if ((purposeName === "ACR"))  /*(&& actionName == "Closing the Loop"), (choiceOperationsStatus === CommCare.Request.Constants.ChoiceOperationsGroupStatus.CompletedRouteToClosingTheLoop))*/ {
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

		function setPRSNotRequiredWhenOB1NoContact() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var purpose = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = purpose != null ? CommCare.Shared.DialogNameReturn(purpose[0].name) : null;

			// If ACR Request's OB1 Resolution is set to NACR, allow form to save to set Queue resolution to Resolved
			if (purposeName == "ACR") {
				if (CommCare.Request.Constants.CurrentFormType.toLowerCase() === "quickcreate") {
					return;
				}

				var ob1Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob1resolution_code");
				var ob2Resolution = CommCare.Shared.GetFieldValue("vhacrm_ahr_ob2resolution_code");
				var queueid = CommCare.Shared.FormContext.getAttribute("vhacrm_queueid").getValue();
				var actionid = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");

				if (queueid !== null && actionid != null) {
					Xrm.WebApi.online.retrieveRecord("vhacrm_actionintersection", CommCare.Shared.GetCleanId(actionid), "?$select=vhacrm_name,_vhacrm_queueid_value").then(
						function success(result) {
							// Columns
							var vhacrm_actionintersectionid = result["vhacrm_actionintersectionid"]; // Guid
							var actionName = result["vhacrm_name"]; // Text
							var routeToQueue = result["_vhacrm_queueid_value"]; // Lookup


							if (ob1Resolution == CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
								|| ob2Resolution == CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting) {
								CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
								CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
								CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");
							}
							else if (CommCare.Shared.GetCleanId(queueid) == CommCare.Request.Constants.QUEUE_OPERATIONS
								&& routeToQueue == CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP) {
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

							var setRequired = (finalStatus == CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed
								|| (routeToQueue == CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP
									&& CommCare.Shared.GetCleanId(queueid) == CommCare.Request.Constants.QUEUE_OPERATIONS));

							//CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", setRequired);
							setRequiredOnMultipleFields(["vhacrm_choiceops_claimresolution_code", "vhacrm_choiceops_siteid", "vhacrm_choiceops_visnid"], setRequired);

							/*********************** OLD LOGIC   *********************************/
							//if ((ob1Resolution !== CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting
							//	|| ob2Resolution !== CommCare.Request.Constants.OBResolution.NotAdverseCreditReporting)
							//	//&& actionid !== null
							//	//&& CommCare.Shared.GetCleanId(actionid) == CommCare.Request.Constants.REQUESTACTION_CLOSINGTHELOOP /*CommCare.Shared.DialogNameReturn(actionid[0].name).toLowerCase() !== "closing the loop"*/

							//	//&& !!queueid
							//	//&& CommCare.Shared.GetCleanId(queueid) != CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP

							//	//&& (routeToQueue != CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP
							//	//|| CommCare.Shared.GetCleanId(queueid) == CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP
							//	//|| CommCare.Shared.GetCleanId(queueid) != CommCare.Request.Constants.QUEUE_OPERATIONS						)

							//	&& (CommCare.Shared.GetCleanId(queueid) != CommCare.Request.Constants.QUEUE_OPERATIONS
							//	|| routeToQueue != CommCare.Request.Constants.QUEUE_CLOSINGTHELOOP)
							//) {
							//	CommCare.Shared.SetRequired("vhacrm_choiceops_claimresolution_code", "none");
							//	CommCare.Shared.SetRequired("vhacrm_choiceops_siteid", "none");
							//	CommCare.Shared.SetRequired("vhacrm_choiceops_visnid", "none");

							//	var finalStatus = CommCare.Shared.GetFieldValue("mcs_operationsfinalstatus");

							//	var setRequired = (finalStatus == CommCare.Request.Constants.ClosingTheLoopFinalStatus.Closed);
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
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
			if (programName == "VISN/VAMC" && (purposeName == "Complaints Received" || purposeName == "Compliments Received For" || purposeName == "Compliments Received For" || purposeName == "Billing Concern" || purposeName == "Quality and Safety")) {
				CommCare.Shared.SetVisible("mcs_issuewasresolved", true);
			} else {
				CommCare.Shared.SetVisible("mcs_issuewasresolved", false);
			}
		}

		function lockActionVISNVAMCBillingConcern() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);

			var programValue = CommCare.Shared.GetFieldValue("ccwf_programid");
			var programName = getLookupName(programValue);
			var purposeValue = CommCare.Shared.GetFieldValue("vhacrm_areaintersectionid");
			var purposeName = getLookupName(purposeValue);
			var issueWasResolved = CommCare.Shared.GetFieldValue("mcs_issuewasresolved");
			var queueItemValue = CommCare.Shared.GetFieldValue("vhacrm_queueitemid");
			console.log(programName);
			console.log(purposeName);
			if (programName == "VISN/VAMC" && purposeName == "Billing Concern" && issueWasResolved && !queueItemValue) {
				CommCare.Shared.SetFieldValue("vhacrm_actionintersectionid", null);
				CommCare.Shared.FormContext.getAttribute("vhacrm_actionintersectionid").fireOnChange();
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
			} else if (programName == "VISN/VAMC" && purposeName == "Billing Concern" && issueWasResolved && queueItemValue != null) {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_resolutionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
			}
			else if (programName == "VISN/VAMC" && purposeName == "Billing Concern" && !issueWasResolved && queueItemValue != null) {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
				CommCare.Shared.SetRequired("vhacrm_resolutionintersectionid", false);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
			}
			else if (programName == "VISN/VAMC" && purposeName == "Billing Concern" && issueWasResolved) {
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", true);
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);

			} else if (programName == "VISN/VAMC" && purposeName == "Billing Concern") {
				CommCare.Shared.SetRequired("vhacrm_subareaintersectionid", true);
				CommCare.Shared.SetReadOnly("vhacrm_actionintersectionid", false);
			} else if (purposeName != null) {
				if ((purposeName.trim().toLowerCase() == "complaints received" || purposeName.trim().toLowerCase() == "compliments received for" || purposeName.trim().toLowerCase() == "quality and safety")) {
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
				CommCare.Shared.SetFieldValue("mcs_actionbeingrequested", "Issue was Resolved");
				CommCare.Shared.SetReadOnly("mcs_actionbeingrequested", true);
			} else {
				var actionReq = CommCare.Shared.GetFieldValue("mcs_actionbeingrequested");

				if (actionReq === "Issue was Resolved")
					CommCare.Shared.SetFieldValue("mcs_actionbeingrequested", null);
				CommCare.Shared.SetReadOnly("mcs_actionbeingrequested", false);
			}
		}



		function brCollectionsOrThreat() {
			var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
			console.log(fName);
			var collOrThreat = CommCare.Shared.GetFieldValue("mcs_isthisincollectionsorthreatofentering");
			if (collOrThreat === CommCare.Request.Constants.HacYN.Yes) {
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
			var actionid = CommCare.Shared.GetFieldValue("vhacrm_actionintersectionid");
			var actionName = getLookupName(actionid);

			var resolutionId = CommCare.Shared.GetFieldValue("vhacrm_resolutionintersectionid");
			var resolutionName = getLookupName(resolutionId);

			var setVis = false;

			if (!!actionName) {
				if (actionName.indexOf("Rejected -") > -1)
					setVis = true;
			}

			if (!!resolutionName) {
				if (resolutionName.indexOf("Rejected -") > -1)
					setVis = true;
			}

			CommCare.Shared.SetVisible("mcs_rejectionreason", setVis);
			CommCare.Shared.SetRequired("mcs_rejectionreason", setVis);

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
	}) ();
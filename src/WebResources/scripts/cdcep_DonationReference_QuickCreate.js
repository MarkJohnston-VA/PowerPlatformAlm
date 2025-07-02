var CDCEP = CDCEP || {};

CDCEP.DonationReferenceQuickCreate = CDCEP.DonationReferenceQuickCreate || {};

CDCEP.DonationReferenceQuickCreate.OnLoad = function (executionContext) {

	// Close the Quick Create form if not all required fields are populated - this prevents the user from using the + sign on the homepage
	validateQuickCreate(executionContext, ["cdcep_facilityid"], "Option not available", "Option is not available through this menu selection");

}
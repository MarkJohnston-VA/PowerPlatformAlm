if (typeof (enrollment) == "undefined") { enrollment = {}; }
// Create Namespace container for functions in this library;
enrollment = {};
enrollment.FORM_TYPE_CREATE = 1;
enrollment.FORM_TYPE_UPDATE = 2;
enrollment.FORM_TYPE_READ_ONLY = 3;
enrollment.FORM_TYPE_DISABLED = 4;

enrollment.onLoad = function (executioncontext) {
    var formContext = executioncontext.getFormContext();
    formContext.ui.headerSection.setCommandBarVisible(false);
    formContext.ui.headerSection.setTabNavigatorVisible(false);
    formContext.ui.headerSection.setBodyVisible(false);
    formContext.ui.footerSection.setVisible(false);

};
if (typeof VETHOME == 'undefined') { VETHOME = { __namespace: true }; }

if (typeof (VETHOME.PortalMessage) == "undefined") {
    VETHOME.PortalMessage = {
        __namespace: true
    };
}

if (typeof (VETHOME.PortalMessage.Constants) == "undefined") {
    VETHOME.PortalMessage.Constants = {
        __namespace: true
    };
}

VETHOME.PortalMessage.Constants.CREATE_FORM = 1;
VETHOME.PortalMessage.Constants.UPDATE_FORM = 2;

VETHOME.PortalMessage.Functions = function () {
    return {
        OnLoad: onLoad,
        OnSave: onSave
    };

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        showHideRelatedMessages(formContext);
        lockFields(formContext);
        showHideIsViewed(formContext);
    }

    function lockFields(formContext) {
        var direction = formContext.getAttribute("mcs_direction").getValue();
        //lock fields if Incoming (false) and form is not already read only
        if (formContext.ui.getFormType() == VETHOME.PortalMessage.Constants.UPDATE_FORM) {            
            var statusReason = formContext.getAttribute("statuscode").getValue();
            var isDisabled = false;
            //if Direction = Incoming OR Status = Pending Send OR Status = Pending View/Response.
            if (direction == false || statusReason == 153190000 || statusReason == 153190001) {
                isDisabled = true;
            }
            formContext.getControl("mcs_name").setDisabled(isDisabled);
            formContext.getControl("mcs_body").setDisabled(isDisabled);            
        }
        //if Direction = Incoming(false), show Resolution, otherwise hide it
        if(direction == false){
            formContext.getControl("mcs_resolutionid").setDisabled(false);
        }
        else{
            formContext.getControl("mcs_resolutionid").setDisabled(true);
        }
    }
    function showHideRelatedMessages(formContext) {
        var origMessage = formContext.getAttribute("mcs_originalmessageid").getValue();
        var generalTab = formContext.ui.tabs.get("General");
        var directSection = generalTab.sections.get("section_related_messages_direct");
        var formComponentSection = generalTab.sections.get("section_related_messages_form_component");

        if (formContext.ui.getFormType() == VETHOME.PortalMessage.Constants.CREATE_FORM) {
            directSection.setVisible(false);
            //formComponentSection.setVisible(false);
        }
        else {
            if (origMessage) {
                directSection.setVisible(false);
                formComponentSection.setVisible(true);
            }
            else {
                directSection.setVisible(true);
                formComponentSection.setVisible(false);
            }
        }
    }
    function showHideIsViewed(formContext) {
        //field should only be displayed when Direction is Outbound        
        var direction = formContext.getAttribute("mcs_direction").getValue();
        if (direction == true) {
            formContext.getControl("mcs_isviewed").setVisible(true);
        }
    }

    function onSave(executionContext) {
        //
    }

}();
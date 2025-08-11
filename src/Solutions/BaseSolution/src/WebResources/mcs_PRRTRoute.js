/// <reference path="CommCareShared.min.js"/>

if (typeof CommCare == 'undefined')
{ CommCare = { __namespace: true }; }

if (typeof (CommCare.PRRT) == "undefined") {
    CommCare.PRRT = {
        __namespace: true
    };
}

if (typeof (CommCare.PRRT.Global) == "undefined") {
    CommCare.PRRT.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.PRRT.Constants) == "undefined") {
    CommCare.PRRT.Constants = {
        __namespace: true
    };
}

CommCare.PRRT.Constants.RouteChoice = {
    CreateInteraction: 803750000,
    AssociateRecord: 803750001,
    CreateNonCore: 803750002,
    DeleteEmail: 803750003
}

CommCare.PRRT.Global = (function () {
    return { 
        OnLoad: onLoad ,
    };

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        attachOnChangeHandlers();
        handleBusinessRules();
    }

    function attachOnChangeHandlers() {
        CommCare.Shared.SetOnChange("mcs_whatwouldyouliketodowiththeemail", brHideShowSectionBasedOnRouteChoice);
        CommCare.Shared.SetOnChange("mcs_associatedinteraction", onChangeAssociatedInteraction);
        CommCare.Shared.SetOnChange("mcs_associatedrequest", onChangeAssociatedRequest);
        CommCare.Shared.SetOnChange("mcs_lineofbusiness", onChangeLOB);
    }

    function handleBusinessRules() {
        brHideShowSectionBasedOnRouteChoice();
    }

    function getLookupName(lookup) {
        var lookupName = lookup != null ? CommCare.Shared.DialogNameReturn(lookup[0].name) : null;
        return lookupName;
    }

    function setRequiredOnMultipleFields(fieldList, requiredLevel) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.SetRequired(fieldList[i], requiredLevel);
        }
    }

    function setVisibilityOfMultipleFields(fieldList, flag) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.FormContext.getControl(fieldList[i]).setVisible(flag);
        }
    }

    function setDisabledOnMultipleFields(fieldList, flag) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.FormContext.getControl(fieldList[i]).setDisabled(flag);
        }
    }

    function clearMultipleFields(fieldList) {
        for (var i = 0; i < fieldList.length; i++) {
            CommCare.Shared.FormContext.getAttribute(fieldList[i]).setValue(null);
        }
    }

    function brHideShowSectionBasedOnRouteChoice() {
        var preference = CommCare.Shared.GetFieldValue("mcs_whatwouldyouliketodowiththeemail");
        if(preference === null) {
            return;
        }

        var selectedText = CommCare.Shared.GetOptionSetText("mcs_whatwouldyouliketodowiththeemail");
        CommCare.Shared.SetFieldValue("mcs_name", selectedText);

        switch(preference) {
            case CommCare.PRRT.Constants.RouteChoice.CreateInteraction: {
                setVisibilityOfMultipleFields(["mcs_lineofbusiness", "mcs_interactionpurpose"], true);
                setVisibilityOfMultipleFields(["mcs_associatedinteraction", "mcs_associatedrequest", "mcs_noncorenotes"], false);
                setRequiredOnMultipleFields(["mcs_lineofbusiness", "mcs_interactionpurpose"], "required");
                setRequiredOnMultipleFields(["mcs_associatedinteraction", "mcs_associatedrequest", "mcs_noncorenotes"], "none");

                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("ConvertToInteraction").setVisible(true);
                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("AssociateInteractionOrRequest").setVisible(false);
                break;
            }
            case CommCare.PRRT.Constants.RouteChoice.AssociateRecord: {
                setVisibilityOfMultipleFields(["mcs_associatedinteraction","mcs_associatedrequest"], true);
                setVisibilityOfMultipleFields(["mcs_lineofbusiness", "mcs_interactionpurpose", "mcs_noncorenotes"], false);
                setRequiredOnMultipleFields(["mcs_associatedinteraction","mcs_associatedrequest"], "required");
                setRequiredOnMultipleFields(["mcs_lineofbusiness", "mcs_interactionpurpose", "mcs_noncorenotes"], "none");

                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("AssociateInteractionOrRequest").setVisible(true);
                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("ConvertToInteraction").setVisible(false);
                break;
            }
            case CommCare.PRRT.Constants.RouteChoice.CreateNonCore: {
                setVisibilityOfMultipleFields(["mcs_lineofbusiness", "mcs_noncorenotes"], true);
                setVisibilityOfMultipleFields(["mcs_interactionpurpose", "mcs_associatedrequest", "mcs_associatedinteraction"], false);
                setRequiredOnMultipleFields(["mcs_lineofbusiness", "mcs_noncorenotes"], "required");
                setRequiredOnMultipleFields(["mcs_interactionpurpose", "mcs_associatedrequest", "mcs_associatedinteraction"], "none");

                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("AssociateInteractionOrRequest").setVisible(true);
                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("ConvertToInteraction").setVisible(true);
                break;
            }
            case CommCare.PRRT.Constants.RouteChoice.DeleteEmail: {
                setRequiredOnMultipleFields(["mcs_lineofbusiness", "mcs_noncorenotes", "mcs_interactionpurpose", "mcs_associatedrequest", "mcs_associatedinteraction"], "none");
                setVisibilityOfMultipleFields(["mcs_lineofbusiness", "mcs_noncorenotes", "mcs_interactionpurpose", "mcs_associatedrequest", "mcs_associatedinteraction"], true);

                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("AssociateInteractionOrRequest").setVisible(false);
                CommCare.Shared.FormContext.ui.tabs.get("QCTab").sections.get("ConvertToInteraction").setVisible(false);
                break;
            }
        }
    }

    function onChangeLOB() {
        setInteractionPurposeCustomView();
    }

    function setInteractionPurposeCustomView() {
        var lobAttr = CommCare.Shared.FormContext.getAttribute("mcs_lineofbusiness").getValue();
        if(lobAttr === null) {
            return;
        }

        var lobName = lobAttr[0].name;
        if(lobName === "Customer Experience") {
            setPurposeCustomViewOfLOBType("Community Care");            
        }
        else if(lobName === "OCC FM") {
            setPurposeCustomViewOfLOBType("CSC");
        }
    }

    function setPurposeCustomViewOfLOBType(typeName) {
        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'> \
                                <entity name='vhacrm_areaintersection' > \
                                <attribute name='vhacrm_areaintersectionid' /> \
                                <attribute name='vhacrm_name' /> \
                                <link-entity name='vhacrm_typeintersection' from='vhacrm_typeintersectionid' to='vhacrm_typeintersectionid' link-type='inner' > \
                                    <link-entity name='vhacrm_type' from='vhacrm_typeid' to='vhacrm_typeid' link-type='inner' > \
                                    <filter type='and' > \
                                        <condition attribute='vhacrm_name' operator='eq' value='" + typeName + "' /> \
                                    </filter> \
                                    </link-entity> \
                                </link-entity> \
                                </entity> \
                            </fetch>";

            var layoutXml = "<grid name='' jump='vhacrm_name' select='1' icon='1' preview='0'> \
                                <row name='vhacrm_areaintersection' id='vhacrm_areaintersectionid'> \
                                    <cell name='vhacrm_name' width='300' /> \
                                </row> \
                            </grid>";

            CommCare.Shared.FormContext.getControl("mcs_interactionpurpose").addCustomView("00000000-0000-0000-0000-000000000001", "vhacrm_areaintersection", "Customer Experience Purposes", fetchXml, layoutXml, true);
    }

    function onChangeAssociatedInteraction() {
        if(CommCare.Shared.GetFieldValue("mcs_associatedinteraction") !== null) {
            setRequiredOnMultipleFields(["mcs_associatedrequest"], "none");
            setDisabledOnMultipleFields(["mcs_associatedrequest"], true);
            clearMultipleFields(["mcs_associatedrequest"]);
        }
        else {
            setRequiredOnMultipleFields(["mcs_associatedrequest"], "required");
            setDisabledOnMultipleFields(["mcs_associatedrequest"], false);
        }
    }

    function onChangeAssociatedRequest() {
        if(CommCare.Shared.GetFieldValue("mcs_associatedrequest") !== null) {
            setRequiredOnMultipleFields(["mcs_associatedinteraction"], "none");
            setDisabledOnMultipleFields(["mcs_associatedinteraction"], true);
            clearMultipleFields(["mcs_associatedinteraction"]);
        }
        else {
            setRequiredOnMultipleFields(["mcs_associatedinteraction"], "required");
            setDisabledOnMultipleFields(["mcs_associatedinteraction"], false);
        }
    }
})();
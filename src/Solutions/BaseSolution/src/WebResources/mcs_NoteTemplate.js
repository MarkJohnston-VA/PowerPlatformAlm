/// <reference path="Common/CommCareShared.js"/>

if (typeof CommCare == 'undefined') { CommCare = { __namespace: true }; }

if (typeof (CommCare.NoteTemplate) == "undefined") {
    CommCare.NoteTemplate = {
        __namespace: true
    };
}

if (typeof (CommCare.NoteTemplate.Global) == "undefined") {
    CommCare.NoteTemplate.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.NoteTemplate.Internal) == "undefined") {
    CommCare.NoteTemplate.Internal = {
        __namespace: true
    };
}

if (typeof (CommCare.NoteTemplate.Constants) == "undefined") {
    CommCare.NoteTemplate.Constants = {
        __namespace: true
    };
}

CommCare.NoteTemplate.Constants.CurrentForm = "";
CommCare.NoteTemplate.Constants.EntityMetadata = null;
CommCare.NoteTemplate.Constants.TemplateType = {
    Note: 803750000,
    CRAMResponse: 803750001
};

CommCare.NoteTemplate.Constants.InputVars = {
    NoteTemplateSection: null,
    NoteTemplateField: null,
    NoteTitleField: null,
    NoteTextField: null,
    ResponseTemplateField: null,
    ResponseField: null,
    TeamField: null,
    ExtObj: null
};

CommCare.NoteTemplate.Constants.GlobalResponseTemplateFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";
CommCare.NoteTemplate.Constants.GlobalNoteTemplateFetch = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";

CommCare.NoteTemplate.Global = (function () {
    return {
        OnLoad: onLoad
    };

    //CONFIGURE THIS LIBRARY ON THE FORM BY SETTING THE FORM'S LOAD PARAMETERS
    //EXAMPLE: "NoteTemplateFields", "mcs_notetemplate", "mcs_notetitle", "mcs_notetext", "mcs_responsetemplate", "mcs_response", "ownerid"
    //IF YOU ARE NOT IMPLEMENTING BOTH SOLUTIONS, PUT AN EMPTY STRING AS THE PARAMETER (ex: "")

    //  PARAMS:
    //  noteTemplateSection       NAME OF THE SECTION THAT HOUSES THE NOTE TITLE AND NOTE TEXT FIELDS THAT HIDES/SHOWS IF A NOTE TEMPLATE IS SELECTED
    //  noteTemplateField         LOGICAL NAME OF THE NOTE TEMPLATE LOOKUP FIELD
    //  noteTitleField            LOGICAL NAME OF THE NOTE TITLE FIELD (TEXT)
    //  noteTextField             LOGICAL NAME OF THE NOTE TEXT FIELD (MULTI-LINE OF TEXT)
    //  responseTemplateField     LOGICAL NAME OF THE RESPONSE TEMPLATE LOOKUP FIELD
    //  responseField             LOGICAL NAME OF THE RESPONSE FIELD TO SET WITH THE TEMPLATE VALUE
    //  teamField                 TEAM USED TO FILTER THE NOTE AND/OR RESPONSE TEMPLATES SEEN IN THE LOOKUP FIELD
    //  extObj                    EXTENSION OBJECT

    function onLoad(context, noteTemplateSection, noteTemplateField, noteTitleField, noteTextField, responseTemplateField, responseField, teamField, extObj) {
        CommCare.Shared.GetFormContext(context);
        setInputVars(noteTemplateSection, noteTemplateField, noteTitleField, noteTextField, responseTemplateField, responseField, teamField, extObj);

        //OnLoad
        if (!!noteTemplateField) {
            buildNoteTemplateFetch();

            CommCare.Shared.SetOnChange(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField, showNoteTemplate);
            CommCare.Shared.SetOnChange(CommCare.NoteTemplate.Constants.InputVars.TeamField, buildNoteTemplateFetch);

            CommCare.Shared.SetSubmitMode(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField, "never");
        }

        if (!!responseTemplateField) {
            buildResponseTemplateFetch();

            CommCare.Shared.SetOnChange(CommCare.NoteTemplate.Constants.InputVars.ResponseTemplateField, setResponseFromTemplate);
            CommCare.Shared.SetOnChange(CommCare.NoteTemplate.Constants.InputVars.TeamField, buildResponseTemplateFetch);

            CommCare.Shared.SetSubmitMode(CommCare.NoteTemplate.Constants.InputVars.ResponseTemplateField, "never");
        }

        //On Save
        CommCare.Shared.FormContext.data.entity.addOnSave(form_OnSave);

    }

    function form_OnSave(context) {

        var template = CommCare.Shared.GetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField);

        if (!!template) {
            Xrm.Utility.showProgressIndicator("Creating Note from Template");
            var noteTitle = CommCare.Shared.GetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTitleField);
            var noteText = CommCare.Shared.GetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTextField);

            createNoteRecordFromFormComponentSave(noteTitle, noteText);
            clearNoteTemplateField();
        }
    }

    function setInputVars(noteTemplateSection, noteTemplateField, noteTitleField, noteTextField, responseTemplateField, responseField, teamField, extObj) {
        if (!noteTemplateSection) noteTemplateSection = null;
        if (!noteTemplateField) noteTemplateField = null;
        if (!noteTitleField) noteTitleField = null;
        if (!noteTextField) noteTextField = null;
        if (!responseTemplateField) responseTemplateField = null;
        if (!responseField) responseField = null;
        if (!teamField) teamField = null;
        if (!extObj) extObj = null;

        CommCare.NoteTemplate.Constants.InputVars.NoteTemplateSection = noteTemplateSection;
        CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField = noteTemplateField;
        CommCare.NoteTemplate.Constants.InputVars.NoteTitleField = noteTitleField;
        CommCare.NoteTemplate.Constants.InputVars.NoteTextField = noteTextField;
        CommCare.NoteTemplate.Constants.InputVars.ResponseTemplateField = responseTemplateField;
        CommCare.NoteTemplate.Constants.InputVars.ResponseField = responseField;
        CommCare.NoteTemplate.Constants.InputVars.TeamField = teamField;
        CommCare.NoteTemplate.Constants.InputVars.ExtObj = extObj;

        var entityName = CommCare.Shared.FormContext.data.entity.getEntityName();
        Xrm.Utility.getEntityMetadata(entityName).then((em) => {
            CommCare.NoteTemplate.Constants.EntityMetadata = em;
        }).catch((e) => {
            console.error(e);
        });
    }

    function prefilterResponseTemplate() {
        CommCare.Shared.FormContext.getControl(CommCare.NoteTemplate.Constants.InputVars.ResponseTemplateField).addPreSearch(filterResponseTemplateLookup);
    }

    function filterResponseTemplateLookup() {
        CommCare.Shared.FormContext.getControl(CommCare.NoteTemplate.Constants.InputVars.ResponseTemplateField).addCustomFilter(CommCare.NoteTemplate.Constants.GlobalResponseTemplateFetch);
    }

    function buildResponseTemplateFetch() {
        var owner = CommCare.Shared.GetFieldValue(CommCare.NoteTemplate.Constants.InputVars.TeamField);
        var ownerId = CommCare.Shared.GetCleanId(owner);
        var odata = "?$select=mcs_notetemplateid,mcs_name";
        odata += "&$expand=mcs_NoteTemplate_Team_Team($select=teamid,name)";
        odata += ",mcs_NoteTemplate_mcs_NoteTemplateTable_mc($select=mcs_notetemplatetableid,mcs_name,mcs_tablelogicalname)";
        odata += "&$filter=statecode eq 0";

        CommCare.Shared.FormContext.getControl(CommCare.NoteTemplate.Constants.InputVars.ResponseTemplateField).removePreSearch(filterResponseTemplateLookup);

        Xrm.WebApi.retrieveMultipleRecords("mcs_notetemplate", odata).then((results) => {
            var r = results.entities;
            var x = r.filter(z =>
                z.mcs_NoteTemplate_Team_Team.some(y => y.teamid == ownerId)
                && z.mcs_NoteTemplate_mcs_NoteTemplateTable_mc.some(a => a.mcs_tablelogicalname == "mcs_trackeritem")
            );

            CommCare.NoteTemplate.Constants.GlobalResponseTemplateFetch = "<filter type='or'>";

            if (x.length > 0) {
                for (var i = 0; i < x.length; i++) {
                    CommCare.NoteTemplate.Constants.GlobalResponseTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='${x[i].mcs_notetemplateid}' />`;
                }
            }
            else {
                CommCare.NoteTemplate.Constants.GlobalResponseTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='00000000-0000-0000-0000-000000000000' />`;
            }

            CommCare.NoteTemplate.Constants.GlobalResponseTemplateFetch += "</filter>";

            prefilterResponseTemplate();

        }).catch((e) => {
            console.log("Error retrieving Templates");
            console.error(e);
        });
    }

    function setResponseFromTemplate() {
        var template = CommCare.Shared.GetFieldValue(CommCare.NoteTemplate.Constants.InputVars.ResponseTemplateField);

        if (!!template) {
            Xrm.WebApi.retrieveRecord("mcs_notetemplate", CommCare.Shared.GetCleanId(template), "?$select=mcs_notetext,mcs_notetitle").then((result) => {
                CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.ResponseField, result.mcs_notetext);
            }).catch((e) => {
                console.log("Error retrieving template");
                console.error(e);
            });
        }
        else {
            CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.ResponseField, null);
        }
    }

    function prefilterNoteTemplate() {
        CommCare.Shared.FormContext.getControl(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField).addPreSearch(filterNoteTemplateLookup);
    }

    function filterNoteTemplateLookup() {
        CommCare.Shared.FormContext.getControl(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField).addCustomFilter(CommCare.NoteTemplate.Constants.GlobalNoteTemplateFetch);
    }

    function buildNoteTemplateFetch() {
        var owner = CommCare.Shared.GetFieldValue(CommCare.NoteTemplate.Constants.InputVars.TeamField);
        var ownerId = CommCare.Shared.GetCleanId(owner);
        var odata = "?$select=mcs_notetemplateid,mcs_name";
        odata += "&$expand=mcs_NoteTemplate_Team_Team($select=teamid,name)";
        odata += ",mcs_NoteTemplate_mcs_NoteTemplateTable_mc($select=mcs_notetemplatetableid,mcs_name,mcs_tablelogicalname)";
        odata += "&$filter=statecode eq 0";

        CommCare.Shared.FormContext.getControl(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField).removePreSearch(filterNoteTemplateLookup);

        Xrm.WebApi.retrieveMultipleRecords("mcs_notetemplate", odata).then((results) => {
            var r = results.entities;
            var x = r.filter(z =>
                z.mcs_NoteTemplate_Team_Team.some(y => y.teamid == ownerId)
                && z.mcs_NoteTemplate_mcs_NoteTemplateTable_mc.some(a => a.mcs_tablelogicalname == "mcs_trackeritem")
            );

            CommCare.NoteTemplate.Constants.GlobalNoteTemplateFetch = "<filter type='or'>";

            if (x.length > 0) {
                for (var i = 0; i < x.length; i++) {
                    CommCare.NoteTemplate.Constants.GlobalNoteTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='${x[i].mcs_notetemplateid}' />`;
                }
            }
            else {
                CommCare.NoteTemplate.Constants.GlobalNoteTemplateFetch += `<condition attribute='mcs_notetemplateid' operator='eq' value='00000000-0000-0000-0000-000000000000' />`;
            }

            CommCare.NoteTemplate.Constants.GlobalNoteTemplateFetch += "</filter>";

            prefilterNoteTemplate();

        }).catch((e) => {
            console.log("Error retrieving Templates");
            console.error(e);
        });
    }

    function createNoteRecordFromFormComponentSave(NoteTitle, NoteText) {
        var entityName = CommCare.Shared.FormContext.data.entity.getEntityName();
        var objectReference = `objectid_${entityName}@odata.bind`;

        var record = {};
        record.notetext = NoteText;
        record.subject = NoteTitle;
        record[objectReference] = `/${CommCare.NoteTemplate.Constants.EntityMetadata.EntitySetName}(${CommCare.Shared.FormContext.data.entity.getId().replace(/[{}]/g, "")})`;

        Xrm.WebApi.createRecord("annotation", record).then((result) => {
            console.log(`Created Note with Id: ${result.id}`);
            var timeline = CommCare.Shared.FormContext.getControl("Timeline");
            if (!!timeline) timeline.refresh();
            Xrm.Utility.closeProgressIndicator();
        }).catch((e) => {
            console.error(e);
            Xrm.Utility.closeProgressIndicator();
        });
    }

    function clearNoteTemplateField() {
        CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField, null);
        CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTitleField, null);
        CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTextField, null);

        var att = CommCare.Shared.FormContext.getAttribute(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField);
        if (!!att) att.fireOnChange();
    }

    function showNoteTemplate() {
        var template = CommCare.Shared.GetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateField);

        setSectionVisibility(CommCare.NoteTemplate.Constants.InputVars.NoteTemplateSection, !!template);
        CommCare.Shared.SetRequired(CommCare.NoteTemplate.Constants.InputVars.NoteTitleField, !!template);
        CommCare.Shared.SetRequired(CommCare.NoteTemplate.Constants.InputVars.NoteTextField, !!template);

        if (!!template) {
            Xrm.WebApi.retrieveRecord("mcs_notetemplate", CommCare.Shared.GetCleanId(template), "?$select=mcs_notetext,mcs_notetitle").then((result) => {
                CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTitleField, result.mcs_notetitle);
                CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTextField, result.mcs_notetext);
            }).catch((e) => {
                console.log("Error retrieving note template");
                console.error(e);
            });
        }
        else {
            CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTitleField, null);
            CommCare.Shared.SetFieldValue(CommCare.NoteTemplate.Constants.InputVars.NoteTextField, null);
        }
    }

    function setSectionVisibility(section, vis) {
        if (vis === void 0) vis = true;
        CommCare.Shared.FormContext.ui.tabs.get().some((tab) => {
            var sec = tab.sections.get(section);
            if (sec) {
                sec.setVisible(vis);
                return true;
            }
            else {
                return false;
            }
        });
    }

})();

CommCare.NoteTemplate.Internal = (function () {
    return {
        OnLoad: onLoad
    };

    function onLoad(context, currentFormString) {
        CommCare.Shared.GetFormContext(context);
        CommCare.NoteTemplate.Constants.CurrentForm = currentFormString;

        //On Load
        handleTemplateType();

        //On Save/PostSave --- there should only be ONE each.  Add other functions to run inside the main functions
        //CommCare.Shared.FormContext.data.entity.addOnSave(onSave);
        //CommCare.Shared.FormContext.data.entity.addOnPostSave(onPostSave);

        //On Change
        CommCare.Shared.SetOnChange("mcs_templatetype", handleTemplateType);
    }

    function onPostSave() {
        console.log("onPostSave from Note Template");
        //CommCare.Shared.FormContext.data.refresh(false);
    }

    function onSave(context) {
        //var args = context.getEventArgs();
        //var saveMode = args.getSaveMode();
    }

    function handleTemplateType() {
        var templateType = CommCare.Shared.GetFieldValue("mcs_templatetype");
        var isNoteTemplate = templateType == CommCare.NoteTemplate.Constants.TemplateType.Note;

        CommCare.Shared.SetVisible("mcs_notetitle", isNoteTemplate)
        CommCare.Shared.SetRequired("mcs_notetitle", isNoteTemplate);
    }

})();
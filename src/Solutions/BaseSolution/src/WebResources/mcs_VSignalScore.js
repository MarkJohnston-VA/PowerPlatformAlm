/// <reference path="Common/CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') { CommCare = { __namespace: true }; }

if (typeof (CommCare.VSignalScore) == "undefined") {
    CommCare.VSignalScore = {
        __namespace: true
    };
}

if (typeof (CommCare.VSignalScore.Global) == "undefined") {
    CommCare.VSignalScore.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.VSignalScore.Constants) == "undefined") {
    CommCare.VSignalScore.Constants = {
        __namespace: true
    };
}

CommCare.VSignalScore.Global = (function () {
    return {
        OnLoad: onLoad
    };

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        hideShowResponseCategorization();
    }

    function hideShowResponseCategorization() {
        var SurveyType = CommCare.Shared.GetFieldValue("mcs_vsignalssurveytype");
        var SurveyTypeId = CommCare.Shared.GetCleanId(SurveyType);

        if (!!SurveyTypeId) {
            Xrm.WebApi.online.retrieveRecord("mcs_vsignalssurveytype", SurveyTypeId, "?$select=mcs_name,mcs_routeto").then(
                function success(result) {
                    console.log(result);
                    var routeTo = result["mcs_routeto@OData.Community.Display.V1.FormattedValue"];
                    if (routeTo == "FM") {
                        CommCare.Shared.SetVisible("mcs_responsecategorization", false);
                    }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }
})()
/// <reference path="CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') { CommCare = { __namespace: true }; }

if (typeof (CommCare.TagIntersection) == "undefined") {
    CommCare.TagIntersection = {
        __namespace: true
    };
}


if (typeof (CommCare.TagIntersection.Global) == "undefined") {
    CommCare.TagIntersection.Global = {
        __namespace: true
    };
}

if (typeof (CommCare.TagIntersection.Constants) == "undefined") {
    CommCare.TagIntersection.Constants = {
        __namespace: true
    };
}

CommCare.TagIntersection.Global = (function () {
    return {
        OnLoad: onLoad
    }

    function onLoad(context) {
        CommCare.Shared.GetFormContext(context);
        console.log("loaded");
        CommCare.Shared.SetOnChange("mcs_tag", setName);
    }

    function setName() {
        var tags = CommCare.Shared.GetFieldValue("mcs_tag");
        console.log(tags);
        if (tags) {
            CommCare.Shared.SetFieldValue("mcs_name", tags[0]["name"]);
        } else {
            CommCare.Shared.SetFieldValue("mcs_name", null);
        }
    }
})();
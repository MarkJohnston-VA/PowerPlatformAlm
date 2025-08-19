    function veteranonchange2() {
debugger;

    var url = "https://dvagov-commcare-dev.crm9.dynamics.com/_static/_common/scripts/inlineeditcommon.js";
    dynamicallyLoadScript(url);

        var parentInteraction = {
            entityType: "bah_interactions",
            id: Xrm.Page.data.entity.getId()
        };

Xrm.Utility.openQuickCreate("incident", parentInteraction, null).then(function (lookup) { console.log("Success"); }, function (error) { console.log("Error"); });

    }

function dynamicallyLoadScript(url) {
    var script = window.top.document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    window.top.document.head.appendChild(script);
}
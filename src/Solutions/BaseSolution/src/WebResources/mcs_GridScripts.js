/// <reference path="Common/CommCareShared.min.js"/>

if (typeof CommCare == 'undefined') { CommCare = { __namespace: true }; }

if (typeof (CommCare.Grid) == "undefined") {
    CommCare.Grid = {
        __namespace: true
    };
}


if (typeof (CommCare.Grid.Global) == "undefined") {
    CommCare.Grid.Global = {
        __namespace: true
    };
}

CommCare.Grid.Global = (function () {
    return {
        DaysRemainingQueueItem: daysRemainingQueueItem
    }

    function daysRemainingQueueItem(rowData, userLCID) {
        var rData = JSON.parse(rowData);
        var daysRemaining = rData.mcs_daysremaining_Value;
        var imgName = null;
        var tooltip = null;

        console.log(rData);
       
        if (daysRemaining != null) {
            if (daysRemaining <= 0) {
                imgName = "mcs_/Icons/redcircle-32.svg";
                tooltip = "Past Due"
            }
            else if (daysRemaining < 3) {
                imgName = "mcs_/Icons/yellowcircle-32.svg";
                tooltip = `Due in ${daysRemaining} days`;
            }
            else {
                imgName = "mcs_/Icons/greencircle-32.svg";
                tooltip = `Due in ${daysRemaining} days`;
            }
        }

        return [imgName, tooltip];
    }
})();
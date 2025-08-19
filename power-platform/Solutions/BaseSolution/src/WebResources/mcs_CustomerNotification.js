/// <reference path="Common/CommCareShared.min.js"/>

function DisplayCustomerNotification(msg) {
    console.log("Displaying customer notification message...");

    try {
        if (msg) {
            var pMsg = document.createElement("p");
            pMsg.align = "center";
            var formattedMsg = msg;
            formattedMsg = formattedMsg.split("\n").join("<br/>");
            formattedMsg = formattedMsg.split(" ").join("&nbsp;");
            pMsg.innerHTML = formattedMsg;
            document.getElementById("divMessage").appendChild(pMsg);
        }
    }
    catch (ex) {
        console.log("DisplayCustomerNotification() exception: " + ex.message);
    }
}
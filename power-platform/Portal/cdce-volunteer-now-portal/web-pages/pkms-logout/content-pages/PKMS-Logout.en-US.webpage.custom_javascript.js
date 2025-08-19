$(document).ready(function(){
    sessionStorage.setItem("User Authenticated", false);
    sessionStorage.clear();
    var logoutUrl = $("#accessVALogoutUrl").val();
    window.location.href = escapeHTML(logoutUrl);
});

function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
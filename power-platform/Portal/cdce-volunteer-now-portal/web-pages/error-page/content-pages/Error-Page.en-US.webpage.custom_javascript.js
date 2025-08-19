$(document).ready(function () {
    var errorMsg = getParameterByName("errmsg");
    if (errorMsg && errorMsg.length > 0){
        var decodedMessage = decodeURIComponent(errorMsg);
        var msgHtml = window.atob(decodedMessage);
        $("#custom_error").text(msgHtml);
    }
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replaceAll('[', '\\[').replaceAll(']', '\\]')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

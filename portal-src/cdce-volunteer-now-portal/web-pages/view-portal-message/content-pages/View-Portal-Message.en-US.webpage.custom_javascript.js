(function($){
    $(document).on('ready', function(){
        $(".page-copy").hide();
        $(".form-action-container-right:first").empty();
        $(".form-action-container-right:first").append("<button id='replyBtn' type='button' class='btn btn-primary btn-primary-action' disabled onclick='window.replyToComment()'>Reply</button>");
        $(".form-action-container-right:first").append("<button id='returnBtn' type='button' class='btn btn-primary btn-primary-action' disabled onclick='window.returnToReceivedMessages()'>Return</button>");

        let direction = $("#adx_portalcommentdirectioncode").val();
        if(direction === "2"){
            $("#cdcep_recipient_id_label").parent().next().hide();
            $("#cdcep_recipient_id_label").parent().hide();
            $("#cdcep_crm_sender_id_name").removeClass("hidden");
            $("#cdcep_recipient_id_label").parent().parent().parent().hide();
        }
        else {
            $("#cdcep_crm_sender_id_label").parent().next().hide();
            $("#cdcep_crm_sender_id_label").parent().hide();
            $("#cdcep_recipient_id_name").removeClass("hidden");
            $("#cdcep_crm_sender_id_label").parent().parent().parent().hide();
        }

        if($("#statuscode_EntityStatus").val() !== _openedMessageStatusCode && $("#adx_portalcommentdirectioncode").val() == _directionCodeOutgoing){
            updateRecordAttribute();
        }
        else{
            $("#replyBtn").removeAttr("disabled");
            $("#returnBtn").removeAttr("disabled");
        }

        $("#adx_portalcommentdirectioncode").parents('fieldset').hide();
    });

    function replyToComment(){
        let crmUserId;
        let crmUserName;
        let direction = $("#adx_portalcommentdirectioncode").val();
        if(direction === "2"){
            crmUserId = $("#cdcep_crm_sender_id").val();
            crmUserName = $("#cdcep_crm_sender_id_name").val();
        }
        else {
            crmUserId = $("#cdcep_sender_id").val();
            crmUserName = $("#cdcep_sender_id_name").val();
        }

        let msgId = parseQS(window.location.search, "id");
        if(msgId) window.location = escapeHTML('../create-message?pmid=' + msgId + '&pmName=' + encodeURIComponent($("#subject").val()) + "&uid=" + crmUserId + "&uname=" + encodeURIComponent(crmUserName));
    }

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    function returnToReceivedMessages(){
        window.location = '/messages/my-received-messages/';
    }

    function parseQS(querystr, key) {
        let qs = querystr.replace("?", "");
        let qsPairs = qs.split("&");
        for (let pair of qsPairs) {
            if (pair.includes(key)) {
                let qsKeyValuePairs = pair.split("=");
                return qsKeyValuePairs[1];
            }
        }
    }

    function updateRecordAttribute() {
        var messageId = parseQS(window.location.search, 'id');
        appAjax({
            type: "PATCH",
            url: "/_api/adx_portalcomments(" + messageId + ")",
            contentType: "application/json",
            data: JSON.stringify({
                "statecode": _completedStateCode, //Completed
                "statuscode": _openedMessageStatusCode //Opened
            }),
            success: function (res) {
                $("#replyBtn").removeAttr("disabled");
                $("#returnBtn").removeAttr("disabled");
                getAllUnreadMessages();
            }
        });
    }

    window.replyToComment = replyToComment;
    window.returnToReceivedMessages = returnToReceivedMessages;
})(jQuery);
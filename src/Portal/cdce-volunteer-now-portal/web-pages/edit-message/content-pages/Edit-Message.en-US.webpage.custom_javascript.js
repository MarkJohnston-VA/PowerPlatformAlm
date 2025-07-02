(function($){
    $(document).on('ready',function(){
        $(".form-action-container-right").empty();
        $(".form-action-container-right").append("<button type='button' class='btn btn-primary button' onclick='window.replyToComment()'>Reply</button>");

        let senderIdDiv = $("#cdcep_sender_id_name").parent().find('div');
        let recipientIdDiv = $("#cdcep_recipient_id_name").parent().find('div');

        setTimeout(function(){
            senderIdDiv.find('.launchentitylookup').prop('disabled','disabled');
            senderIdDiv.find('.clearlookupfield').hide();

            recipientIdDiv.find('.launchentitylookup').prop('disabled','disabled');
            recipientIdDiv.find('.clearlookupfield').hide();
        }, 500);
    });

    function replyToComment(){
        let msgId = parseQS(window.location.search, "id");
        if(msgId) window.location = '../create-message?pmid=' + msgId + '&pmName=' + encodeURIComponent($("#subject").val());
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

    window.replyToComment = replyToComment;
})(jQuery);
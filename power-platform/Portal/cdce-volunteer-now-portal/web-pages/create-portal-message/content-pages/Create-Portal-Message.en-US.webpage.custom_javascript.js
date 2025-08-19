(function($){
    $(document).on('ready', function(){
        $(".page-copy").hide();

        let btnGrpDiv = $("#cdcep_previous_comment_id_name").parent().find('div');
        let pmId = parseQS(window.location.search, 'pmid');
        let pmName = parseQS(window.location.search, 'pmName');
        let uId = parseQS(window.location.search, 'uid');
        let uName = parseQS(window.location.search, 'uname');

        if(pmId){
            $("#cdcep_previous_comment_id").val(pmId);
            $("#cdcep_previous_comment_id_name").val(decodeURIComponent(pmName));
            $("#cdcep_previous_comment_id_entityname").val('adx_portalcomment');

            setTimeout(function(){
                btnGrpDiv.find('.clearlookupfield').hide();
                btnGrpDiv.find('.launchentitylookup').prop('disabled','disabled');
            }, 500);
        }
        else{
            $("#cdcep_previous_comment_id").parent().parent().parent().hide();
        }

        if(uId && uName){
            let recipientDiv = $("#cdcep_recipient_id_name").parent().find('div');
            $("#cdcep_recipient_id").val(uId);
            $("#cdcep_recipient_id_name").val(decodeURIComponent(uName));
            $("#cdcep_recipient_id_entityname").val("systemuser");

            setTimeout(function(){
                recipientDiv.find('.launchentitylookup').prop('disabled','disabled');
                recipientDiv.find('.clearlookupfield').hide();
            }, 500);
        }

        $("#regardingobjectid").val(window.Microsoft.Dynamic365.Portal.User.contactId);
        $("#regardingobjectid_entityname").val("contact");

        if(pmName) $("#subject").val("RE: " + decodeURIComponent(pmName));

        $("#adx_portalcommentdirectioncode").parents('fieldset').hide();
    });

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

})(jQuery);
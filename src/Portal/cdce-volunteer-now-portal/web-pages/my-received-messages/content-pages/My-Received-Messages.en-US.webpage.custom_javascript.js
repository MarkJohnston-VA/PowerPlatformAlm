(function($){
    $(document).on('ready', function(){
        $(".page-copy").hide();

        $("div.entitylist:first").on('loaded', function(){
            setMessagesAsUnread(window.portalunreadmessages);
        });
    });

    function setMessagesAsUnread(unreadeMessageCount){
        let unreadMessages = localStorage.getItem("UnreadMessages");
        if(unreadMessages && unreadeMessageCount){
            unreadMessages = JSON.parse(unreadMessages);
            if(unreadMessages.length < unreadeMessageCount) getAllUnreadMessages();
            else{
                if(unreadMessages.length > 0){
                    let rows = $('.view-grid').find('tbody>tr');
                    showUnreadMessages(rows, unreadMessages);
                }
            }
        }
    }

    function showUnreadMessages(rows, unreadMessages){
        if(rows){
            $.each(rows,function(idx,row){
                let messageId = $(row).attr("data-id");
                let msg = findMessage(unreadMessages, messageId);
                if(msg){
                    $(row).find('a').addClass('unopenedMessage');
                }
            });
        }
    }
})(jQuery);
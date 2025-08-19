(function($){
    function sendMessage(url){
        if(url){
            var toAddress = $("#toAddress").val();
            var subject = $("#subject").val();
            var body = $("#body").val();

            if(toAddress && subject && body){
                var message = {
                    body: body,
                    subject: subject,
                    to: toAddress
                };

                //$.post(url, $.parseJSON(message))
                $.post({
                    url: url,
                    data: JSON.stringify(message),
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: true,
                    beforeSend: function (XmlHttpRequest) {
                        XmlHttpRequest.setRequestHeader("Accept", "application/json");
                        XmlHttpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                        XmlHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
                        XmlHttpRequest.setRequestHeader("OData-Version", "4.0");
                    }
                })
                .done(function(resp){
                    console.log(resp);
                })
                .fail(function(jqxhr, textStatus, error){
                    console.log(jqxhr);
                    console.log(textStatus);
                    console.log(error);
                });
            }
        }
    }

    window.sendMessage = sendMessage;
})(jQuery);
(function($){
    $(document).on('ready', function(){
        $(".page-copy").hide();

        $("#cdcep_isremovedfromlist").parents('tr').hide();

        if(window.mealTicket){
            $("input.submit-btn").parent().after("<div class='btn-group entity-action-button'><input id='printBtn' type='button' class='btn btn-primary button' value='Print'/></div>");
            $("input:text").parents("tbody").append("<tr><td class='clearfix cell text form-control-cell' colspan=2><iframe id='mealTicketFrame' style='width:100%; height:100%;'/></td></tr>");
            $("#mealTicketFrame").attr("src", 'data:application/pdf;base64,' + window.mealTicket.Body);

            $("#printBtn").on('click', function(){
                printPdf();
                $("#cdcep_isremovedfromlist").find("option:eq(1)").prop("selected","selected");
                let now = new Date();
                $("#cdcep_timelastprinted_datepicker_description").val(now.format("M/d/yyyy"));
                $("#NextButton").click();
            });
        }
    });

	function getUrlVars()
	{
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

    function printPdf(){
        var urlVars = getUrlVars();
        var attachmentId = urlVars['id']
        window.open('/print-meal-ticket?id=' + attachmentId, '');
    }

})(jQuery);
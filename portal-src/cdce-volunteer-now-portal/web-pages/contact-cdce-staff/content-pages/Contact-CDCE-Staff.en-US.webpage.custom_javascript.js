(function($){
    $(document).on('ready', function(){
        $(".page-copy").hide();

        $("#adx_portalcommentdirectioncode").parents('fieldset').hide();

        cleanupTeamQueueNames();
    });

    function cleanupTeamQueueNames(){
        let options = $("#cdcep_staff_team_id").find('option');
        options.each(function(idx, option){
            $(option).text($(option).text().replaceAll("<","").replaceAll(">",""));
        });
    }
})(jQuery);
(function($){
    $(document).on('ready', function(){
        $(".page-copy").hide();

        if(sessionStorage.getItem("User Id") !== null){
            $("#cdcep_volunteerid_name").val(sessionStorage.getItem("User Name"));
            $("#cdcep_volunteerid").val(sessionStorage.getItem("User Id"));
            $("#cdcep_volunteerid_entityname").val("contact");
        }
    });
})(jQuery);
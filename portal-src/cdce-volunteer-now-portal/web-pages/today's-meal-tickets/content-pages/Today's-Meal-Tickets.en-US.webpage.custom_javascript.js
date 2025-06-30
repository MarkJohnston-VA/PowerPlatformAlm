(function($){
    $(document).on('ready', function(){
     $(".entitylist.entity-grid").on("loaded", function () {
           
             setTimeout(function() {
                    $('span.sr-only').each(function() {
                        if ($(this).text().trim() === 'Actions') {
                            $(this).css({
                                'color':'#0071bb',
                                'position': 'inherit',
                                'margin': '1px'
                            });
                        }
                    });
                }, 1); 

        }); 
    });
})(jQuery);
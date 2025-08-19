(function($){
    $(document).on('ready', function(){
        $(".page-copy").hide();

        let columnHeaders = $("th:gt(3)");
        let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0).getTime();

        $("div.entity-grid.entitylist").on("loaded", function(){ 
            
            let availableAssignments = 0;
            $(this).find("tbody>tr").each(function(){
                let endDate;
                let startDate;

                $(this).find("td:gt(3)").each(function(){

                    if($(this).attr("data-th") === "Start Date"){
                        if($(this).attr("data-value") !== undefined) startDate = Date.parse($(this).find("time").text()).getTime();
                        $(this).attr("style","display:none");
                    }
                    if($(this).attr("data-th") === "End Date"){
                        if($(this).attr("data-value") !== undefined) endDate = Date.parse($(this).find("time").text()).getTime();
                        $(this).attr("style","display:none");
                    }

                });

                if(startDate && startDate > today){
                    $(this).hide();
                }
                else if(endDate && endDate < today){
                    $(this).hide();
                }
                else availableAssignments++;
            });

            if(availableAssignments === 0) $(".view-empty.message").show();

            //Hide Start Date column
            $(this).find("th:contains('Start Date')").hide(); 
            $(this).find("td[data-th='Start Date']").hide(); 
        });

        if(columnHeaders.length === 0){
            let headersInterval = setInterval(function(){
                columnHeaders = $("th:gt(3)");
                if(columnHeaders.length > 0){
                    clearInterval(headersInterval);
                    columnHeaders.each(function(){
                        $(this).attr("style","display:none");
                    });
                }
            },100);
        }
    });
})(jQuery);
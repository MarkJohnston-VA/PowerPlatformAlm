(function($){
    $(document).ready(function(){
        $("button.usa-accordion-button-dark").on('click',function(){
            let divId = $(this).attr("aria-controls");
            let isExpanded = $(this).attr("aria-expanded");

            if(!divId.endsWith('sub')) window.resetAllStates();

            $(this).toggleClass("usa-accordion-button-dark--expanded");
            $(this).toggleClass("usa-accordion-button-dark");

            if(isExpanded === "true"){
                $(this).attr("aria-expanded", "false");
                $("#" + divId).attr("aria-hidden", "true");
            }
            else{
                $(this).attr("aria-expanded", "true");
                $("#" + divId).attr("aria-hidden", "false");
            }
        });
    });

    function resetAllStates(){
        $("button.usa-accordion-button-dark").each(function(idx, btn){
            $(btn).attr("aria-expanded", "false");
        });
        $("div.usa-accordion-content").each(function(idx, div){
            $(div).attr("aria-hidden","true");
        });
    }

    function resetAllFacilities(btnId){
    }

    window.resetAllStates = resetAllStates;
})(jQuery)
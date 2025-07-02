(function($){
     $(document).ready(function () {
        $('.entity-action-button').append("<input type='button' onclick='window.returnToList()' value='Cancel'/>");

        function returnToList(){
            window.location.replace('/timesheets/');
        }

        window.returnToList = returnToList;
     });
})(jQuery)
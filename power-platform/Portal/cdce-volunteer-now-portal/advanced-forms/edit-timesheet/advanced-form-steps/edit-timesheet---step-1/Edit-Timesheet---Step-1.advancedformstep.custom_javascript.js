(function($){
     $(document).ready(function () {
        $('.entity-action-button').append("<input type='button' onclick='window.returnToList()' value='Cancel'/>");

        $("#msnfpe_workerid").prop('disabled','disabled');

        $("#msnfpe_planningperiodid").prop('disabled','disabled');

        $("#cdcep_createdbyportaluser").prop('disabled','disabled');

        function returnToList(){
            window.location.replace('/timesheets/');
        }

        window.returnToList = returnToList;
     });
})(jQuery)
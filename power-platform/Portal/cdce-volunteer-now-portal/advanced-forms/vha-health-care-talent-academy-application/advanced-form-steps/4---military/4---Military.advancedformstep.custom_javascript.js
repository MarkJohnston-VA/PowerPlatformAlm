$(document).ready(function () {   
    showHideMilitaryServiceGrid();
    var hasMilitaryServiceControl = $('#cdcep_militaryservice');
    hasMilitaryServiceControl.change(function () {
        showHideMilitaryServiceGrid();
    });

    var countValidator = document.createElement('span');
    countValidator.style.display = "none";
    countValidator.id = "militaryCountValidator";
    countValidator.controltovalidate = "";
    countValidator.errormessage = 'Because you selected "Yes", please enter at least one record.';
    countValidator.validationGroup = "";
    countValidator.initialvalue = "";
    countValidator.evaluationfunction = function () {
        var hasMilitaryService = $('#cdcep_militaryservice').val();
        if (hasMilitaryService == 1) {
            var serviceCount = $("#MilitaryServiceGrid table tbody tr").length;
            return serviceCount > 0;
        }
        return true;
    };
    Page_Validators.push(countValidator);
});

function showHideMilitaryServiceGrid() {
    var hasMilitaryService = $('#cdcep_militaryservice').val();
    if (hasMilitaryService == 1) {
        $("#MilitaryServiceGrid").show();
    }
    else {
        $("#MilitaryServiceGrid").hide();
    }
}
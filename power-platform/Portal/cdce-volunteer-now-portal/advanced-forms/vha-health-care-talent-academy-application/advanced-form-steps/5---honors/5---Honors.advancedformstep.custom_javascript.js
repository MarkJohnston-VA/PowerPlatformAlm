$(document).ready(function () {   
    showHideHonorsGrid();
    var hasHonorsControl = $('#cdcep_awardsyn');
    hasHonorsControl.change(function () {
        showHideHonorsGrid();
    });

    var countValidator = document.createElement('span');
    countValidator.style.display = "none";
    countValidator.id = "honorsCountValidator";
    countValidator.controltovalidate = "";
    countValidator.errormessage = 'Because you selected "Yes", please enter at least one record.';
    countValidator.validationGroup = "";
    countValidator.initialvalue = "";
    countValidator.evaluationfunction = function () {
        var hasHonors = $('#cdcep_awardsyn').val();
        if (hasHonors == 1) {
            var honorCount = $("#HonorsandAwards table tbody tr").length;
            return honorCount > 0;
        }
        return true;
    };
    Page_Validators.push(countValidator);
});

function showHideHonorsGrid() {
    var hasHonors = $('#cdcep_awardsyn').val();
    if (hasHonors == 1) {
        $("#HonorsandAwards").show();
    }
    else {
        $("#HonorsandAwards").hide();
    }
}
$(document).ready(function () {   
    showHideClubsGrid();
    var hasClubsControl = $('#cdcep_cluborgmembershipyn');
    hasClubsControl.change(function () {
        showHideClubsGrid();
    });

    var countValidator = document.createElement('span');
    countValidator.style.display = "none";
    countValidator.id = "clubsCountValidator";
    countValidator.controltovalidate = "";
    countValidator.errormessage = 'Because you selected "Yes", please enter at least one record.';
    countValidator.validationGroup = "";
    countValidator.initialvalue = "";
    countValidator.evaluationfunction = function () {
        var hasClubs = $('#cdcep_cluborgmembershipyn').val();
        if (hasClubs == 1) {
            var clubCount = $("#ClubsAndOrganizations table tbody tr").length;
            return clubCount > 0;
        }
        return true;
    };
    Page_Validators.push(countValidator);
});

function showHideClubsGrid() {
    var hasClubs = $('#cdcep_cluborgmembershipyn').val();
    if (hasClubs == 1) {
        $("#ClubsAndOrganizations").show();
    }
    else {
        $("#ClubsAndOrganizations").hide();
    }
}
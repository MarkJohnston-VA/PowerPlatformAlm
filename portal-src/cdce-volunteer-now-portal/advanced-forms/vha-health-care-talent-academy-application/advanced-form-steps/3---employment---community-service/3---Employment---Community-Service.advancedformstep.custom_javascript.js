$(document).ready(function () {
    showHideExperienceGrid();
    var hasExperienceControl = $('#cdcep_hasemploymentorcommunityserviceexperience')
    hasExperienceControl.change(function () {
        showHideExperienceGrid();
    });

    var countValidator = document.createElement('span');
    countValidator.style.display = "none";
    countValidator.id = "experienceCountValidator";
    countValidator.controltovalidate = "";
    countValidator.errormessage = 'Because you selected "Yes", please enter at least one record.';
    countValidator.validationGroup = "";
    countValidator.initialvalue = "";
    countValidator.evaluationfunction = function () {
        debugger;
        var hasExperience = $('#cdcep_hasemploymentorcommunityserviceexperience').val();
        if (hasExperience == 1) {
            var expCount = $("#Employment table tbody tr").length;
            return expCount > 0;
        }
        return true;
    };
    Page_Validators.push(countValidator);
});

function showHideExperienceGrid() {
    var hasExperience = $('#cdcep_hasemploymentorcommunityserviceexperience').val();
    if (hasExperience == 1) {
        $("#Employment").show();
    }
    else {
        $("#Employment").hide();
    }
}
$(document).ready(function () {

    var dateValue = new Date();
    // Get date field
    var dateField = $("#cdcep_localdatetime");
    var $displayField = dateField.nextAll(".datetimepicker").children("input");
    var dateFormat = $displayField.attr("data-date-format");
    dateField.val(moment(dateValue).format("YYYY-MM-DDTHH:mm:ss.0000000"));
    $displayField.val(moment(dateValue).format(dateFormat));
    $('#cdcep_localdatetime').closest("td").hide();


        $('#MessageLabel').attr('tabindex', '100');
        // Set the tabindex for the close button
        $('#btnCloseMessage.close').attr('tabindex', '0');

        // Focus on the success message text first
        $('#btnCloseMessage').hide();

    function isValid(attributes) {

        try {

            if (attributes != null && attributes != undefined && attributes != "") {

                return true;

            }

            else {

                return false;

            }

        } catch (e) {

            console.log("isValid :: " + e.message);

        }

    }
});
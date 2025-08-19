(function($){
    $(document).on('ready', function(){
        $(".entity-action-button").append("<input id='cancel' type=\'button\' class=\'btn btn-primary\' value='Cancel' onclick='window.history.go(-1);'/>");

        if(window.assignment){
            $("#cdcep_volunteer_assignment_id_name").val(window.assignment.Name);
            $("#cdcep_volunteer_assignment_id").val(window.assignment.Id);
            $("#cdcep_volunteer_assignment_id_entityname").val("cdcep_volunteerassignment");

            $(".clearlookupfield").attr("disabled","disabled");
            $(".launchentitylookup").attr("disabled","disabled");

            $("#cdcep_name").val($("#cdcep_volunteer_id_name").val() + ": " + window.assignment.Name);
            $("#cdcep_name").prop("disabled", true);

            let endDate = window.assignment.EndDate !== "" ? new Date(window.assignment.EndDate).toLocaleDateString() : "---";
            let startDate = window.assignment.StartDate !== "" ? new Date(window.assignment.StartDate).toLocaleDateString() : "---";

            let volunteerAssignment = "<fieldset aria-label=\"Section2\">" +
            "<table role=\"presentation\" data-name=\"tab_2_section_3\" class=\"section\"><colgroup><col style=\"width:100%;\"><col></colgroup><tbody><tr>" +
				"<td colspan=\"1\" rowspan=\"1\" class=\"clearfix cell lookup form-control-cell\">" +
                    "<div class=\"info\">" +
                        "<label class=\"field-label\">Facility</label>" +
                    "</div>" +
                    "<div class=\"control\">" +
                        "<div class=\"input-group\">" +
                            "<input type=\"text\" disabled value=\"" +  window.assignment.Facility + "\" class=\"text form-control lookup form-control \" style=\"min-width:600px !important; width:auto !important;\" readonly=\"\" aria-readonly=\"true\">" +
                            "<div class=\"input-group-btn\"/>" +
                        "</div>" +
                    "</div>" +
                    "</div></td>" +
				"<td class=\"cell zero-cell\"></td>" +
			"</tr>" +
			"<tr>" +
				"<td colspan=\"1\" rowspan=\"1\" class=\"clearfix cell lookup form-control-cell\">" +
                    "<div class=\"info\">" +
                        "<label class=\"field-label\">Description</label>" +
                    "</div>" +
                    "<div class=\"control\">" +
                        "<div class=\"input-group\">" +
                            "<input type=\"text\" disabled value=\"" + window.assignment.Description + "\" class=\"text form-control volunteer-assignment\" readonly=\"\" aria-readonly=\"true\">" +
                        "</div>" +
                    "</div></td>" +
				"<td class=\"cell zero-cell\"></td>" +
			"</tr>" +
			"<tr>" +
				"<td colspan=\"1\" rowspan=\"1\" class=\"clearfix cell lookup form-control-cell\">" +
                    "<div class=\"info\">" +
                        "<label class=\"field-label\">Time Commitment</label>" +
                    "</div>" +
                    "<div class=\"control\">" +
                        "<div class=\"input-group\">" +
                            "<input type=\"text\" disabled value=\"" + window.assignment.TimeCommittment + "\" class=\"text form-control volunteer-assignment\" readonly=\"\" aria-readonly=\"true\">" +
                        "</div>" +
                    "</div></td>" +
				"<td class=\"cell zero-cell\"></td>" +
			"</tr>" +
			"<tr>" +
				"<td colspan=\"1\" rowspan=\"1\" class=\"clearfix cell lookup form-control-cell\">" +
                    "<div class=\"info\">" +
                        "<label class=\"field-label\">Start Date</label>" +
                    "</div>" +
                    "<div class=\"control\">" +
                        "<div class=\"input-group\">" +
                            "<input type=\"text\" disabled value=\"" + startDate + "\" class=\"text form-control volunteer-assignment\" readonly=\"\" aria-readonly=\"true\">" +
                        "</div>" +
                    "</div></td>" +
				"<td class=\"cell zero-cell\"></td>" +
			"</tr>" +
			"<tr>" +
				"<td colspan=\"1\" rowspan=\"1\" class=\"clearfix cell lookup form-control-cell\">" +
                    "<div class=\"info\">" +
                        "<label class=\"field-label\">End Date</label>" +
                    "</div>" +
                    "<div class=\"control\">" +
                        "<div class=\"input-group\">" +
                            "<input type=\"text\" disabled value=\"" + endDate + "\" class=\"text form-control volunteer-assignment\" readonly=\"\" aria-readonly=\"true\">" +
                        "</div>" +
                    "</div></td>" +
				"<td class=\"cell zero-cell\"></td>" +
			"</tr>" +
			"</tbody></table></fieldset>"

            $("fieldset[aria-label='Section']").parent().append(volunteerAssignment);
        }
    });
})(jQuery);
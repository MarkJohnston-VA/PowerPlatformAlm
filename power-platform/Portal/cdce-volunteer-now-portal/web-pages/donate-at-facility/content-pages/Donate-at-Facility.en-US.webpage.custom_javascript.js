(function ($) {
    $(document).ready(function () {
        let baseLink = './select-needs-list';
        var organizationNameLabel = $("#cdcep_group_organization_name_label").text();

        //$('#cdcep_donation_type').after('<a><button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary" id="OpenModal">Open Modal</button><!-- Modal --><div id="myModal" role="dialog" class="modal fade"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" class="close">×</button><h4 class="modal-title">Donate Online? - localized web page</h4></div><div class="modal-body"><form><div class="form-group"><label for="description">Donate Online?</label><p>Would you like to make your donation online?</p></div></form></div><div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-primary" id="openDialog">Yes</button><button type="button" data-dismiss="modal" class="btn btn-default">No</button></div></div></div></div></a>');

        if (sessionStorage.getItem("KioskMode") !== null && sessionStorage.getItem("KioskMode") === "true") {
            $("a:contains('More about VA’s COVID-19 Response Plan »')").hide();
            //            window.setTimeout(function(){
            //                var needsListUrl = $("a:contains('View Facility Need List')").attr("href");
            //                $("a:contains('View Facility Need List')").attr("href","javascript:void(0);");"
            //                $("a:contains('View Facility Need List')").removeAttr("target");
            //                $("a:contains('View Facility Need List')").on('click',openNeedsListModal(needsListUrl));$('#addMore').click (...)
            //                
            //            },100);
        }
        $('#openDialog').on('click', function () {
            //alert('openDialog click event');
            window.location.href = '/donate_online';
        });
        //$('#openDialog').click(...)
        $(".entity-action-button").append("<input id='reset' type=\'reset\' class=\'btn btn-primary\'/>");



        //$("table[data-name=ServiceInfo]>tbody").append("<tr><td class='cellCenter' colspan='2'><a id='needlistLink' href='./select-needs-list' target='_blank'>View Facility Need List</a></td></tr>");
        $("table[data-name=ServiceInfo]>tbody").append("<tr><td colspan='2'><div id='DonateOnlineMessage' style='display:none;'><b><a href='/donate_online' target='_blank'>Click here</a> to make a monetary donation online.</b></div></td></tr><tr><td class='cellCenter' colspan='2'><br /><br /><a id='needlistLink' href='./select-needs-list' target='_blank'>View Facility Need List</a></td></tr>");



        $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").attr("disabled", "disabled");
        $("#OpenModal").hide();


        $("#cdcep_pronoun_other").hide();
        $("#cdcep_pronoun_other").parents('tr').hide();
        $("#cdcep_facilityid").hide();
        $("#cdcep_facilityid").parents('tr').hide();
        $("#cdcep_donation_type").hide();
        $("#cdcep_donation_type").parents('tr').hide();


       // addValidator("cdcep_servicestateid", "State"); Shiju commented no need as this is handled in the form as required field 9/17/24 CRMCDCEP-4789 
       // addValidator("cdcep_facilityid", "Facility");
       // addValidator("firstname", "First Name");  Shiju commented no need as this is handled in the form as required field 9/17/24 CRMCDCEP-4789 
        //addValidator("cdcep_pronoun", "Pronoun");
        addValidator("address1_line1", "Street");
        addValidator("address1_city", "City");
        addValidator("cdcep_stateid", "State");
        addValidator("address1_postalcode", "Zip/Postal Code");
        //addValidator("telephone2", "Phone");
		//CRMCDCEP-6161  Preferred Phone Number not syned to dev after a hotfix
       // addValidator("cdcep_preferredphonenumber", "Preferred Phone Number");
       // addValidator("emailaddress1", "Email");  Shiju commented no need as this is handled in the form as required field 9/17/24 CRMCDCEP-4789 
        addValidator("cdcep_donation_type", "Donation Type");
        addValidator("cdcep_donation_intent", "Intended use/purpose of your donation");

        $("#cdcep_facilityid").on('change', function () {
            let facId = $("#cdcep_facilityid").val();
            let stateId = $("#cdcep_servicestateid").val();
            if (stateId) {
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").removeAttr("disabled");
                if (facId) {
                    $("#needlistLink").attr("href", escapeHTML(baseLink + "?id=" + stateId + "&fid=" + facId));
                    $("#cdcep_donation_type").show();
                    $("#cdcep_donation_type").parents('tr').show();
                }
                else {
                    $("#needlistLink").attr("href", escapeHTML(baseLink + "?id=" + stateId));
                    $("#cdcep_donation_type").hide();
                    $("#cdcep_donation_type").parents('tr').hide();
                }
            }
            else {
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").attr("disabled", "disabled");
                $("#needlistLink").attr("href", baseLink);


            }
        });

        $("#cdcep_servicestateid").on('change', function () {
            let baseLink = './select-needs-list';
            let facId = $("#cdcep_facilityid").val();
            let stateId = $("#cdcep_servicestateid").val();
            if (stateId) {
                $("#cdcep_facilityid").show();
                $("#cdcep_facilityid").parents('tr').show();
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").removeAttr("disabled");
                if (facId) {
                    $("#needlistLink").attr("href", escapeHTML(baseLink + "?id=" + stateId + "&fid=" + facId));
                }
                else {
                    $("#needlistLink").attr("href", escapeHTML(baseLink + "?id=" + stateId));
                }
            }
            else {
                $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").attr("disabled", "disabled");
                $("#cdcep_facilityid_name").parent().find("button.clearlookupfield").hide();
                $("#cdcep_facilityid_name").val(null);
                $("#cdcep_facilityid").val(null);
                $("#needlistLink").attr("href", baseLink);
                $("#cdcep_facilityid").hide();
                $("#cdcep_facilityid").parents('tr').hide();
                $("#cdcep_donation_type").hide();
                $("#cdcep_donation_type").parents('tr').hide();
            }
        });
        

        $("#cdcep_enteraddressmanually_1").prop('checked',true);
        $("#cdcep_enteraddressmanually_1").parents('tr').hide();

        $("#cdcep_pronoun").on('change', function () {
            let pronoun = $("#cdcep_pronoun").val();
            if (pronoun === "100000003") {
                $("#cdcep_pronoun_other").show();
                $("#cdcep_pronoun_other").parents('tr').show();
            }
            else {
                $("#cdcep_pronoun_other").hide();
                $("#cdcep_pronoun_other").parents('tr').hide();
            }
        });

        if ($("#cdcep_volunteer_type_0").prop('checked')) {
            $("#cdcep_group_organization_name").parents('tr').hide();
        }

        $("#cdcep_volunteer_type_0").on('click', function () {
            if ($("#cdcep_volunteer_type_0").prop('checked')) {
                $("#cdcep_group_organization_name").parents('tr').hide();

                removeValidator("cdcep_group_organization_name");
            }
        })

        $("#cdcep_volunteer_type_1").on('click', function () {
            if ($("#cdcep_volunteer_type_1").prop('checked')) {
                $("#cdcep_group_organization_name").parents('tr').show();

                addValidator("cdcep_group_organization_name", organizationNameLabel);
            }
        })

        $("#cdcep_donation_type").on('change', function () {
            if ($("#cdcep_donation_type").val() === "100000000") {
                //showModal($("#modal-crisisline")[0]);
                //$("#OpenModal").click();
                $("#DonateOnlineMessage").show();
            }
            else {
                $("#DonateOnlineMessage").hide();
            }
        });

        ///////////////////

        $("#cdcep_preferredphonenumber").on('change', function () {

            if ($("#cdcep_preferredphonenumber").val() === "100000000") { // Home
                addValidator("telephone2", "Home Phone");
                removeValidator("mobilephone");
                removeValidator("telephone1");
            }
            else if ($("#cdcep_preferredphonenumber").val() === "100000001") { // Mobile
                addValidator("mobilephone", "Mobile Phone");
                removeValidator("telephone1");
                removeValidator("telephone2");
            }
            else if ($("#cdcep_preferredphonenumber").val() === "100000002") { //Work
                addValidator("telephone1", "Work Phone");
                removeValidator("mobilephone");
                removeValidator("telephone2");
            }
            else {
                removeValidator("telephone1");
                removeValidator("mobilephone");
                removeValidator("telephone2");
            }
        });
        ///////////////////

        $("#reset").on('click', function () {
            $("#ValidationSummaryEntityFormView").hide();
            $("#cdcep_volunteer_type_0").focus();
            $("#cdcep_facilityid_name").parent().find("button.launchentitylookup").attr("disabled", "disabled");
            $("#cdcep_facilityid_name").parent().find("button.clearlookupfield").hide();
            $("#cdcep_servicestateid_name").parent().find("button.clearlookupfield").hide();
            $("#cdcep_stateid_name").parent().find("button.clearlookupfield").hide();
            $("#needlistLink").attr("href", baseLink);
        });
    });

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    function addValidator(fieldName, fieldLabel) {
        if (typeof (Page_Validators) == 'undefined') return;
        // Create new validator
        $("#" + fieldName + "_label").parent().addClass("required");

        var newValidator = document.createElement('span');
        newValidator.style.display = "none";
        newValidator.id = "RequiredFieldValidator" + fieldName;
        newValidator.controltovalidate = "casetypecode";
        newValidator.errormessage = "<a href='#" + fieldName + "_label'>" + fieldLabel + " is a required field .</a>";
        newValidator.validationGroup = "";
        newValidator.initialvalue = "";
        newValidator.evaluationfunction = function () {
            var value = $("#" + fieldName).val();
            if (value == null || value == "") {
                return false;
            } else {
                return true;
            }
        };

        // Add the new validator to the page validators array:
        Page_Validators.push(newValidator);

        // Wire-up the click event handler of the validation summary link
        $("a[href='#" + fieldName + "_label']").on("click", function () { scrollToAndFocus(fieldName + '_label', fieldName); });
    }

    //function OpenDonateOnline() {
    //    //alert('OpenDonateOnline Clicked.');
    //    window.location.href = '/donate_online';
    //    //window.location = "/donate_online";
    //}

    //function hideModal(elem){
    //    var parentClasses = document.getElementById("modal-crisisline").classList;
    //    if(elem.classList.contains('va-overlay-close')) {
    //      parentClasses.add('va-overlay');
    //    } else if(parentClasses.contains('va-overlay')) {
    //      parentClasses.remove('va-overlay');
    //    }
    //    if($(elem).text() === "Yes") window.location = "/donate_online";
    //}

    function openNeedsListModal(url) {
        window.showModalDialog(url);
    }

    function removeValidator(fieldName) {
        $("#" + fieldName + "_label").parent().removeClass("required");

        $.each(Page_Validators, function (index, validator) {
            
            if (validator.id === "RequiredFieldValidator" + fieldName) {
                Page_Validators.splice(index, 1);
            }
            
        });

        //$("#" + fieldName + "_label").parent().removeClass("required");
    }

    //function showModal(elem) {

    //    var parentClasses = document.getElementById("modal-crisisline").classList;
    //    if(elem.classList.contains('va-overlay-close')) {
    //      parentClasses.add('va-overlay');
    //    } else if(parentClasses.contains('va-overlay')) {
    //      parentClasses.remove('va-overlay');
    //    }
    //}

    window.hideModal = hideModal;
}(jQuery));
(function($){

    var acc = document.getElementsByClassName("accordion");
    var i;
        $("#divfacility").hide();
        //$("#facilitiesList").parents('tr').hide();

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("activeFAQ");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }

    $("#facilitiesList").on('change', function(){
        var selectedFacility = $("#facilitiesList").val();
        if(selectedFacility && window.facilities){
            window.facilities.forEach(facility =>{
                if(facility.Id === selectedFacility) window.selectedFacility = facility;
            });
        }
        else{
            window.selectedFacility = null;
        }
    });

    $("#reset").on('click', function(){
        $("#divfacility").hide();
        window.selectedFacility = null;
        $("#facilitiesList").empty();
        if($("#facilitiesList").attr('disabled') === undefined) $("#facilitiesList").attr("disabled", "disabled");
    });

    $("#statesList").on("change", function(){
        var stateId = $("#statesList").val();
        window.selectedState = stateId;
        if(stateId){
        $("#divfacility").show();
            $.getJSON('/getonlinefacilitiesbystateid-json/?id=' + stateId)
                .done(function(response){
                    $("#facilitiesList").empty();
                    $("#facilitiesList").append("<option/>");
                    if(response && response.results){
                        var facilities = response.results;
                        window.facilities = facilities;
                        facilities.forEach(facility =>{
                            $("#facilitiesList").append("<option value=" + facility.Id + ">" + facility.Name + "</option>");
                        });
                        $("#facilitiesList").removeAttr("disabled");
                    }
                })
                .fail(function(jqxhr, textStatus, error){
                    console.log(jqxhr);
                    console.log(textStatus);
                    console.log(error);
                });
        }
        else{
            window.facilities = null;
            $("#facilitiesList").empty();
            $("#facilitiesList").append("<option/>");
			$("#divfacility").hide();
            window.selectedFacility = null;
            if($("#facilitiesList").attr('disabled') === undefined) $("#facilitiesList").attr("disabled", "disabled");
        }
    });

    $("#submit").on('click', function(){
        if(window.selectedFacility && window.selectedState){
            window.open(window.selectedFacility.URL, "_blank");
        }
        else {
            let msg = "";
            if(window.selectedState && !window.Facility) msg = "Please select the Facility";
            else{
                msg = "Please select the State\r\nPlease select the Facility";
            }
            alert(msg);
        }
    });

})(jQuery)
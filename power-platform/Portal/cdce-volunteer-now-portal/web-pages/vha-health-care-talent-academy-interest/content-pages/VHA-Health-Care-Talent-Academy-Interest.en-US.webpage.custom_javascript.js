$( document ).ready(function() {
    
$("#notqualified").hide();
$("#fieldsrequired").hide();
$("#healthcareyn").hide();
$("#undergrad").hide();
//alert(create_UUID());

document.getElementById("singlebutton").addEventListener("click", function(event) {
  event.preventDefault();

// $( "#singlebutton" ).click(function() {
        $("#notqualified").hide();
        $("#fieldsrequired").hide();
        var over18 = $('input[name="over18"]:checked').val();
        var uscitizen = $('input[name="uscitizen"]:checked').val();
        var healthcareyn = $('input[name="healthcareyn"]:checked').val();
        var undergrad = $('input[name="undergrad"]:checked').val();
        // check if any questions are unanswered
        if(over18 != null && uscitizen != null && healthcareyn != null && undergrad != null)
        {   // check if all Yes, then redirect to apply form 
            if(over18 == 1 && uscitizen == 1 && healthcareyn == 1 && undergrad == 1) {
                 //window.location.href = "/vha_healthcareacademy/";
                 document.getElementById("formQA").submit();
                // return false;
            }
            else { // show 'Not Qualified' message
                $("#notqualified").show();
                //return false;
            }
        } else {  // show 'All Fields Required' message
             $("#fieldsrequired").show();
            //return false;
        }
});

//function create_UUID(){
 //   var dt = new Date().getTime();
 //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
 //       var r = (dt + Math.random()*16)%16 | 0;
 //       dt = Math.floor(dt/16);
 //       return (c=='x' ? r :(r&0x3|0x8)).toString(16);
 //   });
 //   return uuid;
//}


});
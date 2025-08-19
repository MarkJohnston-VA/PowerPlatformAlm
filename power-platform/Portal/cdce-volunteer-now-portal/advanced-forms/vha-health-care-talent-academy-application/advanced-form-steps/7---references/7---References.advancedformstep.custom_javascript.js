if (window.jQuery) {
   (function ($) {
      $(document).ready(function () {
        document.getElementById("cdcep_referencecount").style.display = 'none'
         if (typeof (Page_Validators) == 'undefined') return;
         // Create new validator
         var newValidator = document.createElement('span');
         newValidator.style.display = "none";
         newValidator.id = "referenceValidator";
         newValidator.controltovalidate = "emailaddress1";
         newValidator.errormessage = "2 references are required.";
         newValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
         newValidator.initialvalue = "";
         newValidator.evaluationfunction = function () {
             var rowCount = 0;

               rowCount = $("#ReferencesSubgrid table tbody tr").length;                
               if (rowCount <=1) {

                   return false;

               } else {

                   return true;
               }
         };
 
         // Add the new validator to the page validators array:
         Page_Validators.push(newValidator);
        
 
      });
   }(window.jQuery));
}
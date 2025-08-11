function openpage(data)
{
   var selectedRecordID = data;

// Inline Page
var pageInput = {
    pageType: "custom",
    name: "mcs_routing_dbd3e",
    recordId: selectedRecordID
};
var navigationOptions = {
    target: 2, 
    position: 1,
    height: {value: 40, unit:"%"},
    width: {value: 40, unit:"%"},    
    title: "Route Queued Item"
};

Xrm.Navigation.navigateTo(pageInput, navigationOptions)
    .then(
        function () {
            // Called when page opens
        }
    ).catch(
        function (error) {
            // Handle error
        }
    );
}

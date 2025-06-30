(function($){
    $(document).ready(function() {
        $(".entitylist.entity-grid").on("loaded", listLoad);
    });

    function listLoad() {
        var gridRows = $(this).children(".view-grid").find("tr[data-entity='adx_portalcomment']");
        if (gridRows.length > 0) {
            gridRows.each((i, row) => {
                var fromCell = $(row).find("td[data-attribute='from']");
                var toCell = $(row).find("td[data-attribute='to']");       
                var fromEntityCollection = fromCell.data('value').Entities;
                var toEntityCollection = toCell.data('value').Entities;
                var fromNames = "";
                var toNames = "";
                fromEntityCollection.forEach(entity => {
                    var partyAttribute = entity.Attributes.find(x => x.Key == "partyid");
                    if (partyAttribute == null) return;
                    fromNames += partyAttribute.Value.Name;
                });
                toEntityCollection.forEach(entity => {
                    var partyAttribute = entity.Attributes.find(x => x.Key == "partyid");
                    if (partyAttribute == null) return;
                    toNames += partyAttribute.Value.Name;
                });
                $(toCell).text(toNames);
                $(fromCell).text(fromNames);
            });
        }
    }
})(jQuery);u
$("#btnReload").on("click", function () {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();

    window.parent.ReloadNotes("&startDate=" + startDate + "&endDate=" + endDate);
});

$("#startDate").keydown(function (e) {
    if (e.keyCode === 13) {
        $("#btnReload").click();
    }
});

$("#endDate").keydown(function (e) {
    if (e.keyCode === 13) {
        $("#btnReload").click();
    }
});

$("#startDate").on("change", function () {
    EnableDisableReloadButton();
});

$("#endDate").on("change", function () {
    EnableDisableReloadButton();
});

function EnableDisableReloadButton() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();

    if (startDate.length === 10 && endDate.length === 10) {
        document.getElementById("btnReload").disabled = false;
    }
    else {
        document.getElementById("btnReload").disabled = true;
    }

    // function to align the loader image during the reload button click
    jQuery.fn.center = function () {
        this.css("position", "fixed");
        this.css("top", ($(window).height() / 4) - (this.outerHeight() / 4));
        this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
        return this;
    }

}
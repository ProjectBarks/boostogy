app.onInit(function () {
    files.injectCSS("resources/css/overdue.css");

    var overdueRoot = $(".overdue-submissions");
    overdueRoot.addClass("overdue-toggle");

    function updateOverdue(hideOverdue) {
        overdueRoot.removeClass(hideOverdue ? "overdue-show" : "overdue-hide");
        overdueRoot.addClass(hideOverdue ? "overdue-hide" : "overdue-show");
    }

    var toggle = $("<div class=\"toggle\" />");

    overdueRoot.click(function() {
        cache.get("hide_overdue", true, function (hideOverdue) {
            cache.set("hide_overdue", !hideOverdue);
            updateOverdue(!hideOverdue);
        });
    });


    var refreshId = setInterval(function() {
        var results = overdueRoot.find("h3");
        if (results.length > 0) {
            results.append(toggle);
            clearInterval(refreshId);
        }
    }, 10);

    cache.get("hide_overdue", true, function (hideOverdue) {
        updateOverdue(hideOverdue);
    });
});
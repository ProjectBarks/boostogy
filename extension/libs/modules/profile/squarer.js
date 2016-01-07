app.onUpdate(function () {
    cache.get("show_circles", true, function (showCircles) {
        if (!showCircles) {
            return;
        }
        $(".profile-picture > img").filter(function () {
            return !$(this).attr("data-squared")
        }).one("load", function () {
            var dim = 5 * Math.round($(this).width() / 5);
            $(this).css({"width": dim, "height": dim});
            $(this).attr("data-squared", true);
        }).each(function () {
            if (this.complete) $(this).load();
        });
    });
});
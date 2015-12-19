core.onInit(function () {
    cache.get("auto_load", true, function (autoload) {
        if (!autoload) {
            return;
        }
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() <= $(document).height() - 140) {
                return;
            }
            var moreButton = $(".sExtlink-processed.sEdgeMore-processed").filter(function () {
                return $(this).attr("href") && $(this).is(":visible");
            })[0];
            if (moreButton) moreButton.click();
        });
    });
});
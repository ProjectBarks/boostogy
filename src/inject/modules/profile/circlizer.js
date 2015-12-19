core.onInit(function () {
    cache.get("show_circles", true, function (showCircles) {
        if (showCircles) {
            core.injectCSS("resources/css/circles.css");
        }
    });
});
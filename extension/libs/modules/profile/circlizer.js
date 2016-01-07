app.onInit(function () {
    cache.get("show_circles", true, function (showCircles) {
        if (showCircles) {
            files.injectCSS("resources/css/circles.css");
        }
    });
});
core.onUpdate(function () {
    $("html").css("overflow-y", $("#popups-overlay").size() > 0 ? "hidden" : "");
});
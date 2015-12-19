core.onInit(function () {
    core.injectCSS("resources/css/settings-list-item.css");
    $("#settings-menu-dropdown")
        .find("> li:last")
        .prev()
        .after(core.readTemplate("resources/templates/settings-list-item.html"));
});
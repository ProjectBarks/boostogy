core.onInit(function () {
    core.injectCSS("resources/css/settings-list-item.css");
    core.injectCSS("resources/css/settings-popup.css");

    function showPopup(onSubmit) {
        var template = core.readTemplate("resources/templates/settings-popup.html");
        new Popup("Boostogy Settings", template, "Save Changes", "Cancel", onSubmit).show();
    }

    function onClick(event) {
        var usersToRemove = [];

        showPopup(function (data) {
            usersToRemove.forEach(function (user) {
                cache.removeUser(user);
            });
            Object.keys(data).forEach(function (key) {
                cache.set(key, data[key]);
            });
            document.location.reload(false);
        });

        var popup = $(".boostogy-settings");
        cache.getUserIds(function (ids) {
            var userList = popup.find(".user-list");
            var userTemplate = core.readTemplate("resources/templates/settings-popup-user.html");
            ids.forEach(function (id) {
                cache.getUser(id, function (user) {
                    userList.append($(userTemplate
                        .replace("${name}", JSON.parse(user.name))
                        .replace("${show}", id == cache.getCurrentUserId() ? "initial" : "none"))
                        .on("click", ".delete", function () {
                            usersToRemove.push(id);
                            $(this).parent().remove();
                        }));
                });
            });
        });
        function updateCheckbox(id, results) {
            popup.find("#" + id).prop("checked", results[id]);
        }

        cache.getMultiple({auto_load: true, show_circles: true}, function (_) {
            updateCheckbox("auto_load", _);
            updateCheckbox("show_circles", _);
        });
        event.preventDefault();
    }

    $("#settings-menu-dropdown")
        .find("> li:last")
        .prev()
        .after($(core.readTemplate("resources/templates/settings-list-item.html")).click(onClick));
});
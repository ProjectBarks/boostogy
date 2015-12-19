var ALIAS = "course_alias";

core.onInit(function () {
    cache.get(ALIAS, {}, function (aliases) {
        $(".courses-listing li").each(function () {
            var id = $(this).children(".sections-list").first().children().first().attr("id");
            if (!id) return; else id = id.substring(8);

            var preview = $("<i class=\"course-alias-preview\"> (" + (id in aliases ? aliases[id] : "No Alias") + ")<i>");
            $(this).find(".course-title").append(preview);

            $(this).find(".course-actions .action-links").append($("<li class=\"course-rename\"><a>Rename</a></li>").click(function (event) {
                new Popup("Rename Course", core.readTemplate("resources/templates/course-alias-input.html"), "Apply", null, function (data) {
                    cache.get(ALIAS, {}, function (aliases) {
                        if (data.alias.length <= 0) {
                            if (id in aliases) {
                                preview.text(" (No Alias)");
                                delete aliases[id];
                            } else {
                                return;
                            }
                        } else {
                            aliases[id] = data.alias;
                            preview.text(" (" + data.alias + ")");
                        }

                        cache.set(ALIAS, aliases)
                    });
                }).show();
            }));
        });
    });
});

core.onUpdate(function () {
    cache.get(ALIAS, {}, function (aliases) {
        $(".courses-listing > .sections-list > .section-item").each(function () {
            var course = $(this);
            var title = course.find("div.s-course-title > span");
            if (!(course.attr("id") in aliases)) {
                if (course.attr("data-old")) {
                    title.text(course.attr("data-old"));
                    course.removeAttr("data-old");
                } else {
                    return;
                }
            }

            if (title.text() === aliases[course.attr("id")]) return;
            course.attr("data-old", title.text());
            title.text(aliases[course.attr("id")]);
        });
    });
});
var HIDDEN = "course_hidden";
app.onInit(function () {
    cache.get(HIDDEN, [], function (hidden) {
        $(".courses-listing > li").each(function () {
            var id = $(this).children(".sections-list").first().children().first().attr("id");
            if (!id) return; else id = id.substring(8);
            var visible = hidden.indexOf(id) <= -1;
            var rawCode = "<li class=\"course-visibility " + (!visible ? "hide" : "") + "\"><a>" + (visible ? "Hide" : "Show") + " Course</a></li>";

            $(this).find(".course-actions .action-links").append($(rawCode).click(function (event) {
                var toggle = $(this);

                cache.get(HIDDEN, [], function (hidden) {
                    if (!toggle.hasClass("hide")) {
                        hidden.push(id);
                        toggle.find("a").text("Show Course");
                        toggle.addClass("hide");
                    } else {
                        if (hidden.indexOf(id) > -1) {
                            hidden.splice(hidden.indexOf(id), 1);
                        }
                        toggle.find("a").text("Hide Course");
                        toggle.removeClass("hide");
                    }

                    cache.set(HIDDEN, hidden);
                    event.stopPropagation();
                });
            }));
        });
    });
});

app.onUpdate(function () {
    cache.get(HIDDEN, [], function (hidden) {
        $(".courses-listing > .sections-list > .section-item").each(function () {
            var elm = $(this);
            var pos = hidden.indexOf($(this).attr("id"));
            if (pos == -1 && elm.css("display") == "none") {
                elm.css("display", "inherit");
            } else if (pos > -1) {
                elm.css("display", "none");
            }
        });
    });
});
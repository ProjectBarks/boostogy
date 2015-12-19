core.onInit(function () {
    if (!isAssessment()) return;
    core.injectCSS("resources/css/annotation-markout.css");

    $("tr").bindFirst("click", function (e) {
        var item = $(this);
        if (!item.hasClass("markoutable")) return;

        if (item.hasClass("marked")) {
            item.removeClass("marked");
        } else {
            item.addClass("marked");
        }
        e.stopImmediatePropagation();
    });

    core.onUpdate(function () {
        var togglables = $("tr:not(.marked) > .form-radio-answer, tr:not(.marked) > .form-checkbox-option").parent();
        if (activeTool === "markout") {
            togglables.addClass("markoutable");
        } else {
            togglables.removeClass("markoutable");
        }

        if (activeTool === "mouse") {
            $("tr :checkbox, tr :radio").each(function () {
                var checkbox = $(this);
                if (checkbox.closest("tr").hasClass("marked")) {
                    if (checkbox.is(":enabled")) checkbox.prop("disabled", true);
                } else if (checkbox.is(":disabled")) {
                    checkbox.prop("disabled", false);
                }
            });
        }
    });
});
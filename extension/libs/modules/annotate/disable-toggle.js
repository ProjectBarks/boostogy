app.onInit(function () {
    if (!isAssessment()) return;

    $("tr").bindFirst("click", function (e) {
        if (activeTool !== "mouse") return;
        e.stopImmediatePropagation();
    });

    app.onUpdate(function () {
        $(":radio, :checkbox").each(function () {
            $(this).prop("disabled", activeTool !== "mouse");
        });
    });
});
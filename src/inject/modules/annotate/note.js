core.onInit(function () {
    if (!isAssessment()) return;
    core.injectCSS("resources/css/jquery-ui.css");
    core.injectCSS("resources/css/annotation-note.css");

    $("body").click(function (e) {
        if (activeTool !== "comment") return;
        if ($(e.target).is(".note *, .note, #sidebar-right, #sidebar-right *, #header, #header *")) return;
        if (rangy.getSelection().length > 0) return;

        var wrapper = $("#main-inner");
        var note = $(core.readTemplate("resources/templates/annotation-note.html"))
            .css({
                left: e.pageX - wrapper.offset().left,
                top: Math.max(e.pageY - wrapper.offset().top, 0),
                position: "absolute"
            })
            .resizable({handles: "se"})
            .click(function () {
                $(this).find("textarea").focus()
            });

        note.find(".note-remove").click(function () {
            note.remove();
        });

        var header = $("#header");
        wrapper.append(note.draggable({
            stack: ".note",
            handle: ".note-header",
            containment: "body",
            drag: function (e, ui) {
                ui.position.top = Math.max(ui.position.top, 0)
            }
        }));
    });
});
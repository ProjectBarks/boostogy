app.onInit(function () {
    if (!isAssessment()) return;
    rangy.init();
    files.injectCSS("resources/css/annotations.css");
    var registeredHighlighters = [];

    function registerHighlightType(name) {
        var highlighter = rangy.createHighlighter();
        highlighter.addClassApplier(rangy.createClassApplier("annotation-" + name, {
            ignoreWhiteSpace: true,
            tagName: "span",
            elementProperties: {
                onmouseover: function(e) {
                    var highlight = $(this);
                    if (highlight.attr("data-delete") === "visible") return;

                    var cleanup = function() {
                        highlight.attr("data-delete", "hidden");
                        annnotationDelete.remove();
                        clearInterval(counter);
                    };

                    var highlightRange = highlighter.getHighlightForElement(highlight[0]);
                    if (!highlightRange) return;
                    var highlightGroup = highlightRange.getRange().getNodes([1], function(node) {
                        return node.nodeName === "SPAN" && node.className.indexOf("annotation-") > -1 && node.getBoundingClientRect().top > 0;
                    }).map(function(_) { return $(_) });

                    var firstHighlight = highlightGroup[0];
                    highlightGroup.forEach(function(item) { firstHighlight = firstHighlight.offset().top > item.offset().top ? item : firstHighlight });

                    var inner = $("#main-inner");
                    var offset = inner.offset();
                    var annnotationDelete = $(files.readTemplate("resources/templates/annotation-delete.html"))
                        .css({top: firstHighlight.offset().top - offset.top + 85, left: firstHighlight.offset().left - offset.left})
                        .click(function() {
                            cleanup();
                            highlighter.removeHighlights([highlighter.getHighlightForElement(highlight[0])]);
                            highlight.contents().unwrap();
                        });

                    var hovered = function() {
                        if (annnotationDelete.is(":hover")) return true;
                        for (var i = 0; i <= highlightGroup.length; i++) {
                            if (!highlightGroup[0].is(":hover")) continue;
                            return true;
                        }
                        return false;
                    };

                    var unfocusedCount = 0;
                    var counter = setInterval(function() {
                        unfocusedCount += hovered()  ? -unfocusedCount : 50;
                        if (unfocusedCount >= 500) cleanup();
                    }, 50);
                    highlight.attr("data-delete", "visible");
                    inner.prepend(annnotationDelete);
                }
            }
        }));
        registeredHighlighters[name] = highlighter;
    }

    $("body").mouseup(function() {
        if (Object.keys(registeredHighlighters).indexOf(activeTool) <= -1) return;
        registeredHighlighters[activeTool].highlightSelection("annotation-" + activeTool, {
            containerElementId: "main-inner",
            exclusive: false
        });
        rangy.getSelection().removeAllRanges();
    });

    registerHighlightType("highlight");
    registerHighlightType("bold");
    registerHighlightType("underline");
    registerHighlightType("strike");
});
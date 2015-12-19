var activeTool = "";

function isAssessment() {
    return window.location.href.indexOf("*/assignment/*/assessment") > 0 && $("#s-assessment-question-fill-form").size() > 0;
}

core.onInit(function () {
    if (!isAssessment()) return;
    core.injectCSS("resources/css/annotation-sidebar.css");

    var sidebar = $(core.readTemplate("resources/templates/annotation-tools.html"));
    $("#container").prepend(sidebar);
    $(window).scroll(function () {
        sidebar.css("top", $(this).scrollTop());
    });

    function activateTool(tool) {
        var tools = sidebar.find(".annotation-tool");
        tools.removeClass("active");
        tools.filter(function () {
            return $(this).parent().attr("id") === tool
        }).addClass("active");
        activeTool = tool;
    }

    sidebar.find(".col").click(function () {
        activateTool($(this).attr("id"));
    });

    activateTool("mouse");
});

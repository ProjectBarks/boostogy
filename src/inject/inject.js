var core = {
    initRunnable: [],
    updateRunnable: [],
    onInit: function (runnable) {
        if (typeof runnable !== "function") return;
        this.initRunnable.push(runnable);
    },
    onUpdate: function (runnable) {
        if (typeof runnable !== "function") return;
        this.updateRunnable.push(runnable);
    },
    injectCSS: function (path) {
        $("head").append($("<link>")
            .attr("rel", "stylesheet")
            .attr("type", "text/css")
            .attr("href", chrome.extension.getURL(path)));
    },
    loadFile: function (path) {
        var result = null;
        $.ajax({
            url: chrome.extension.getURL(path),
            async: false,
            success: function (data) {
                result = data;
            }
        });
        if (result == null) {
            throw new Error("Failed to find file.");
        }
        return result;
    },
    readTemplate: function (path) {
        var code = $(this.loadFile(path));
        code.find("img").each(function() {
            $(this).attr("src", chrome.extension.getURL($(this).attr("src")));
        });
        return code.prop("outerHTML");
    },
    executeJS: function (path) {
        return eval(core.loadFile(path));
    }
};

$(function () {
    console.log("Initializing boostogy...");

    var includes = core.executeJS("src/inject/includes.js");
    for (var i = 0; i < includes.length; i++) {
        eval(core.loadFile("src/inject/modules/" + includes[i] + ".js"));
    }

    function executeRunnables(runnables) {
        runnables.forEach(function (runnable) {
            runnable();
        });
    }

    executeRunnables(core.initRunnable);
    setInterval(function () {
        executeRunnables(core.updateRunnable)
    }, 50);
    console.log("Welcome to Boostogy!");
});

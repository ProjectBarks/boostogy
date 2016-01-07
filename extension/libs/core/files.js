var files = {
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
        code.find("img").each(function () {
            $(this).attr("src", chrome.extension.getURL($(this).attr("src")));
        });
        return code.prop("outerHTML");
    }
};
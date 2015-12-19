var lastPopup = new Popup(null, null, null, null, null);

function Popup(title, body, ok, cancel, onOkListener) {
    var tempRemove = null;
    var visible = false;

    this.isVisible = function () {
        return visible;
    };

    this.close = function () {
        if (!lastPopup.isVisible()) return;
        tempRemove.remove();
        visible = false;
    };

    this.show = function () {
        if (lastPopup.isVisible()) {
            throw new Error("Popup already visible!");
        }
        visible = true;
        lastPopup = this;
        var _this = this;

        var popup = $(core.loadFile("resources/templates/base-popup.html")
            .replace("${title}", title || "Untitled")
            .replace("${ok}", ok || "Ok")
            .replace("${cancel}", cancel || "Cancel")
            .replace("${body}", body || "<div></div>"));

        popup.find(".popups-close, .cancel-btn").click(function () {
            _this.close()
        });
        popup.find("form").submit(function (event) {
            var values = {};
            popup.find(":input").each(function () {
                values[this.name] = $(this).val()
            });
            delete values[""];

            (onOkListener || function () {})(values);
            event.preventDefault();
            _this.close();
        });
        $(document).bind("keydown", function(event) {
            if (event.keyCode != 27) {
                return;
            }
            _this.close();
            $(this).unbind("keydown", arguments.callee);
        });
        $("body").append(popup);
        tempRemove = popup;
    };
}

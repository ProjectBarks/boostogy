var lastPopup = new Popup(null, null, null, null, null);

function Popup(title, body, ok, cancel, onOkListener) {
    this._tempRemove = null;
    this._visible = false;

    this.isVisible = function () {
        return this._visible;
    };

    this.close = function () {
        if (!lastPopup.isVisible()) return;
        this._tempRemove.remove();
        this._visible = false;
    };

    this.show = function () {
        if (lastPopup.isVisible()) {
            throw new Error("Popup already visible!");
        }
        this._visible = true;
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

            (onOkListener || function (_) {
                console.log(_)
            })(values);
            event.preventDefault();
            _this.close();
        });
        $("body").append(popup);
        this._tempRemove = popup;
    };
}

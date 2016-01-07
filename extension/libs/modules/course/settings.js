var activeDropdowns = [];

function disableDropdown(dropdown) {
    dropdown.find(".action-links").css("display", "none");
    dropdown.find(".action-links-unfold").removeClass("active");
}

function enableDropdown(dropdown) {
    dropdown.find(".action-links").css("display", "block");
    dropdown.find(".action-links-unfold").addClass("active");

    activeDropdowns.push(dropdown);
}

function disableAll() {
    activeDropdowns.forEach(function (_) {
        disableDropdown(_)
    });
    activeDropdowns = [];
}

app.onInit(function () {
    var dropdownRaw = files.readTemplate("resources/templates/course-dropdown.html");

    $("body").click(function () {
        disableAll();
    });

    $(".courses-listing > li").each(function () {
        var listItem = $(this);
        if (listItem.find(".admin-section").size() <= 0) {
            listItem.prepend($(dropdownRaw).click(function (event) {
                var dropdown = $(this);
                if (!dropdown.find(".action-links-unfold").hasClass("active")) {
                    disableAll();
                    enableDropdown(dropdown);
                } else {
                    disableDropdown(dropdown);
                }
                event.stopPropagation();
            }));
        } else {
            listItem.find(".admin-section").addClass("course-actions");
        }
    });
});
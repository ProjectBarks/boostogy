var ORDER = "course_order";

function getCourseLocation(courses, courseID) {
    var index = courses.indexOf(courseID);
    if (index <= -1) {
        index = courses.length;
        courses.push(courseID);
        cache.set(ORDER, courses);
    }
    return index;
}

var tempCourseOrder = [];
var waitForReload = false;
core.onUpdate(function () {
    if (waitForReload) return;
    function idsToList(items) {
        return items.map(function () {
            return $(this).attr("id")
        }).get()
    }

    var dropdown = $(".dropdown-reorder");
    if (dropdown.size() > 0 && dropdown.find(".title").text() === "Reorder Courses") {
        tempCourseOrder = idsToList(dropdown.find(".courses-listing > .sections-list > .section-item"));
        if (!dropdown.attr("data-sorted")) {
            dropdown.attr("data-sorted", true);
            dropdown.off("click").find("#confirmation_confirm").click(function () {
                cache.set(ORDER, tempCourseOrder);
                location.reload();
                waitForReload = true;
            });
        } else {
            return;
        }
    }

    $(".courses-listing > .sections-list").each(function () {
        cache.get(ORDER, [], function (classes) {
            var list = $(this);
            var items = list.find(".section-item");
            var cachedOrder = idsToList(items);
            if (classes.length <= 0 || items.size() <= 0 || idsToList(items).join(",") == classes.join(",")) return;

            cache.set(ORDER, classes.filter(function (_) {
                return cachedOrder.indexOf(_) > -1
            }));

            var sorted = items.sort(function (a, b) {
                return getCourseLocation($(a).attr("id")) - getCourseLocation($(b).attr("id"));
            });
            list.html(sorted);
        });
    });
});
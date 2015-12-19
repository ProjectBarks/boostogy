core.onInit(function () {
    var profile = $("#profile").find("> a");
    if (profile.size() <= 0) {
        return;
    }
    cache.initUser(profile.attr("href").substring(6), profile.text());
});
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    return {cancel: details.url.indexOf("/sites/all/themes/schoology_theme/school_themes/style.css.php?theme=") != -1};
}, {urls: ["<all_urls>"]}, ['blocking']);
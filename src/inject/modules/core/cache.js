var storage = chrome.storage.local;

var cache = function () {
    var cacheStore = {};
    var user = "";

    var throwIfInvalid = function (key) {
        if (typeof key !== "string") {
            throw new Error("Key is not a string");
        }
        if (key.match(/[^0-9a-z_]/i)) {
            throw new Error("Key contains non alphanumeric or non underscore character.");
        }
    };

    var getPair = function (key, value) {
        var pair = {};
        pair[key] = value;
        return pair;
    };

    this.setUser = function (id) {
        user = id;
    };

    this.set = function (key, value) {
        if (user.length <= 0) {
            return;
        }

        throwIfInvalid(key);

        var serialized = JSON.stringify(value);

        if (cacheStore[user] && cacheStore[user] === serialized) {
            return;
        }

        storage.set(getPair(userKey, serialized), function () {
        });
        cacheStore[userKey] = serialized;
    };

    this.getMultiple = function (keysMapDefaults, callback) {
        if (user.length <= 0) {
            callback(keysMapDefaults);
            return;
        }

        var results = {};
        var keysToSearch = {};
        var immediateResults = true;

        Object.keys(keysMapDefaults).forEach(function (key) {
            throwIfInvalid(key);
            var userKey = cache.getUserKey(key);
            if (cache.cache_store[userKey]) {
                results[key] = JSON.parse(cache.cache_store[userKey]);
            } else {
                keysToSearch[userKey] = {"key": key, "def": keysMapDefaults[key]};
                immediateResults = false;
            }
        });

        if (immediateResults) {
            callback(results);
            return;
        }

        storage.get(Object.keys(keysToSearch), function (searchResults) {
            Object.keys(keysToSearch).forEach(function (userKey) {
                var info = keysToSearch[userKey];
                var result = info.def;
                if (searchResults[userKey] !== undefined) {
                    result = JSON.parse(searchResults[userKey]);
                }

                results[info.key] = result;
                cache.cache_store[userKey] = JSON.stringify(result);

            });

            callback(results);
        });
    };

    this.get = function (key, def, callback) {
        this.getMultiple(getPair(key, def), function (results) {
            callback(results[key]);
        });
    };
    return this;
}();

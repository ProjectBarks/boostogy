var cache = function () {
    var USERS = "users";
    var storage = chrome.storage.local;
    var cachedUser = null;

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

    var getUser = function(callback) {
        if (!cachedUser) {
            var id = setInterval(function() {
               if (!cachedUser) {
                   return;
               }
                callback(cachedUser);
                clearInterval(id);
            }, 50);
        } else {
            callback(cachedUser);
        }
    };

    var updateUser = function (user) {
        storage.set(getPair(JSON.parse(user["id"]), JSON.stringify(user)));
    };

    var getSingle = function (key, callback, def) {
        if (!def) {
            def = null;
        }
        storage.get(key, function (data) {
            if (data[key] !== undefined) {
                callback(JSON.parse(data[key]));
            } else {
                callback(def);
            }
        });
    };

    this.reset = function() {
        storage.clear();
    };

    this.getUserIds = function(callback) {
        getSingle(USERS, callback, []);
    };

    this.getUser = function(id, callback){
        getSingle(id, callback);
    };

    this.initUser = function(id, name) {
        this.getUser(id, function (user) {
            if (user) {
                cachedUser = user;
            } else {
                cachedUser = {id: JSON.stringify(id), name: JSON.stringify(name || "Unknown Name [" + id + "]")};
                updateUser(cachedUser);
                this.getUserIds(function (users) {
                    users.push(id);
                    storage.set(getPair(USERS, JSON.stringify(users)));
                });
            }
            console.log(cachedUser);
        });
    };
    
    this.set = function (key, value) {
        throwIfInvalid(key);
        var serialized = JSON.stringify(value);

        getUser(function(user) {
            if (user[key] !== undefined && user[key] === serialized) {
                return;
            }
            user[key] = serialized;
            updateUser(user);
        });
    };

    this.getMultiple = function (keysMapDefaults, callback) {
        Object.keys(keysMapDefaults).forEach(function (key) {
            throwIfInvalid(key);
        });

        getUser(function (user) {
            var results = {};
            var changed = false;

            Object.keys(keysMapDefaults).forEach(function (key) {
                if (user[key]) {
                    results[key] = JSON.parse(user[key]);
                } else {
                    results[key] = keysMapDefaults[key];
                    user[key] = JSON.stringify(keysMapDefaults[key]);
                    changed = true;
                }
            });

            if (changed) {
                updateUser(user);
            }

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

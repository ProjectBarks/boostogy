$(function () {
    if ($("#copyright").text().toLowerCase().indexOf("schoology") <= -1) {
        return;
    }
    console.log("Initializing boostogy...");

    function executeRunnables(runnables) {
        runnables.forEach(function (runnable) {
            runnable();
        });
    }

    executeRunnables(app.initRunnable);
    setInterval(function () {
        executeRunnables(app.updateRunnable)
    }, 50);
    console.log("Welcome to Boostogy!");
});

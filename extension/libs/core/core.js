var app = {
    initRunnable: [],
    updateRunnable: [],
    onInit: function (runnable) {
        if (typeof runnable !== "function") return;
        this.initRunnable.push(runnable);
    },
    onUpdate: function (runnable) {
        if (typeof runnable !== "function") return;
        this.updateRunnable.push(runnable);
    }
};

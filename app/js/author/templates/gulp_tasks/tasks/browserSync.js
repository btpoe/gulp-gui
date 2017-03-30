const browserSync = require('browser-sync');
const createTask = require('../utils/create-task');
const {
    proxy = false,
} = require('../config').browserSync;

const browserSyncConfig = {
    reloadDebounce: 2000,
    open: false,
    ghostMode: false,
    proxy,
};

let browserSyncInitialized = false;

module.exports = createTask({
    taskName: 'browserSync',
    taskLogic(done) {
        browserSyncInitialized && browserSync.reload();
        done();
    },
    beforeWatch() {
        browserSync.init(browserSyncConfig);
        browserSyncInitialized = true;
    },
});

const browserSync = require('browser-sync');
const createTask = require('../utils/create-task');
const config = require('../config').browserSync;

const browserSyncConfig = Object.assign({
    reloadDebounce: 2000,
    open: false,
    ghostMode: false,
}, {
    proxy: config.proxy,
});

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

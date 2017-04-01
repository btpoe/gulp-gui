const gulp = require('gulp');
const browserSync = require('browser-sync');

const {
    proxy = false,
    src = [],
} = require('../config').browserSync;

const browserSyncConfig = {
    reloadDebounce: 2000,
    open: false,
    ghostMode: false,
    proxy,
};

function browserSyncWatch() {
    browserSync.init(browserSyncConfig);
    return gulp.watch(src).on('change', browserSync.reload);
}

gulp.task('browserSync:watch', browserSyncWatch);

module.exports = {
    task: null,
    watchTask: browserSyncWatch
};

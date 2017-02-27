const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const createTask = require('../utils/create-task');
const config = require('../config').icons;

const destination = config.dest;
config.dest = config.dest.replace(/\/icons$/, '');

module.exports = createTask({
    taskName: 'icons',
    buildProcess(gulpSrc) {
        return gulpSrc
            .pipe(svgmin(config.minifySettings))
            .pipe(gulp.dest(destination))
            .pipe(svgstore(config.svgStoreSettings));
    },
});

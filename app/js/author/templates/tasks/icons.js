const path = require('path');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const createTask = require('../utils/create-task');
const config = require('../config').icons;

module.exports = createTask({
    taskName: 'icons',
    buildProcess(gulpSrc) {
        if (config.symbolPack) {
            const svgstore = require('gulp-svgstore');

            gulp.src(config.src)
                .pipe(svgmin(config.minifySettings))
                .pipe(svgstore(config.svgStoreSettings))
                .pipe(rename({
                    basename: path.basename(config.dest)
                }))
                .pipe(gulp.dest(path.dirname(config.dest)))
        }

        return gulpSrc
    },
    minifier: svgmin
});

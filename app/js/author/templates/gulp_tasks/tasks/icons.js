const path = require('path');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const createTask = require('../utils/create-task');

const {
    src = './**/*',
    dest = './',
    symbolPack = false,
    minifySettings = {},
    svgStoreSettings = {},
} = require('../config').icons;

module.exports = createTask({
    taskName: 'icons',
    buildProcess(gulpSrc) {
        if (symbolPack) {
            const svgstore = require('gulp-svgstore');

            gulp.src(src)
                .pipe(svgmin(minifySettings))
                .pipe(svgstore(svgStoreSettings))
                .pipe(rename({
                    basename: path.basename(dest)
                }))
                .pipe(gulp.dest(path.dirname(dest)))
        }

        return gulpSrc
    },
    minifier: svgmin
});

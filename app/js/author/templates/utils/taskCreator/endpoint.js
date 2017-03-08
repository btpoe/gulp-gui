const gulp = require('gulp');
const flatmap = require('gulp-flatmap');
const resolve = require('../resolve');

module.exports = (endpoint, config) => {
    return gulp.src(resolve('src', config.taskName, endpoint))
};

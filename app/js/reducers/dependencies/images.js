module.exports = function(config) {
    const deps = [];

    if (config.enabled) {
        deps.push('gulp-imagemin');
    }

    return deps;
};

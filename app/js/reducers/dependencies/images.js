module.exports = function({
    enabled = false,
}) {
    const deps = [];

    if (enabled) {
        deps.push('gulp-imagemin');
    }

    return deps;
};

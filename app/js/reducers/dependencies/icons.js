module.exports = function({
    enabled = false,
    symbolPack = false,
}) {
    const deps = [];

    if (enabled) {
        deps.push('gulp-svgmin');

        if (symbolPack) {
            deps.push('gulp-svgstore');
        }
    }

    return deps;
};

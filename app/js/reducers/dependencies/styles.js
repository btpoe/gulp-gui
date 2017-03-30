module.exports = function({
    enabled = false,
    engine = 'off'
}) {
    const deps = [];

    if (enabled) {
        deps.push('gulp-cssnano');

        deps.push(
            'browser-sync',
            'gulp-autoprefixer',
            'gulp-cssnano',
            'gulp-sourcemaps'
        );

        if (engine !== 'off') {
            deps.push(`gulp-${engine}`);
        }

        if (engine === 'sass') {
            deps.push('node-sass-import')
        }
    }

    return deps;
};

module.exports = function(config) {
    const deps = [];

    if (config.enabled) {
        deps.push(
            'browser-sync',
            'gulp-autoprefixer',
            'gulp-cssnano',
            'gulp-sourcemaps'
        );

        if (config.engine !== 'off') {
            deps.push(`gulp-${config.engine}`);
        }

        if (config.engine === 'sass') {
            deps.push('node-sass-import')
        }
    }

    return deps;
};

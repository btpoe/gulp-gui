module.exports = function(config) {
    return config.dependencies.concat([
        'dotenv',
        'gulp',
        'gulp-if',
        'gulp-notify',
        'gulp-rename',
        'gulp-sourcemaps',
        'lodash',
        'yargs',
    ]);
};

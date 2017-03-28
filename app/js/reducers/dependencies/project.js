module.exports = function(config) {
    return config.devDependencies.concat([
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

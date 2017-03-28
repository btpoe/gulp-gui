module.exports = function(config) {
    return config.devDependencies.concat([
        'dotenv',
        'github:gulpjs/gulp#4.0',
        'gulp-if',
        'gulp-notify',
        'gulp-rename',
        'gulp-sourcemaps',
        'lodash',
        'yargs',
    ]);
};

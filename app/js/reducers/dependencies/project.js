module.exports = function({
    devDependencies = []
}) {
    return devDependencies.concat([
        'dotenv',
        'event-stream',
        'github:gulpjs/gulp#4.0',
        'gulp-clone',
        'gulp-if',
        'gulp-notify',
        'gulp-rename',
        'gulp-sourcemaps',
        'lodash',
        'yargs',
    ]);
};

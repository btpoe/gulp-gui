module.exports = function({
    packageManager = 'npm',
    devDependencies = []
}) {
    return devDependencies.concat([
        packageManager,
        'dotenv',
        'event-stream',
        'github:gulpjs/gulp#4.0',
        'gulp-cli',
        'gulp-clone',
        'gulp-if',
        'gulp-intelli-watch',
        'gulp-notify',
        'gulp-rename',
        'gulp-sourcemaps',
        'lodash',
        'yargs',
    ]);
};

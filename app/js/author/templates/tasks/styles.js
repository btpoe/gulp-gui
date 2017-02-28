const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const importer = require('node-sass-import');
const logError = require('../utils/log-error');
const createTask = require('../utils/create-task');

module.exports = createTask({
    taskName: 'styles',
    buildProcess(gulpSrc) {
        // const engineSettings = Object.assign({}, config.engineAdvancedSettings, { importer });
        return gulpSrc
            .pipe(sass({ importer }).on('error', logError))
            .pipe(autoprefixer())
            .pipe(browserSync.stream({ match: '**/*.css' }));
    },
    minifier: require('gulp-cssnano'),
});

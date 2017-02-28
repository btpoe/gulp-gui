const path = require('path');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const logError = require('./log-error');
const notificationFor = require('./notification-for');
const resolve = require('./resolve');
const config = require('../config');

const DEFAULTS = {
    buildProcess: src => src,
    minifier: false,
};

function destFolder(dest) {
    if (path.extname(dest).length) {
        return path.parse(dest).dir;
    }
    return dest;
}

/**
 * Task Generator
 * Pull settings from the config file found at `./gulp_tasks/config.js`. The taskName provided is the key to the config
 * settings to use for this task. A watch task will also be created if there is a watch string provided in the config.
 * @param {object} options - task config
 * @returns {{task: function, watchTask: function}}
 */
module.exports = (options) => {
    const { taskName, buildProcess, minifier } = Object.assign({}, DEFAULTS, options);
    // generate task name for the watcher
    const watchTaskName = `${taskName}:watch`;

    // get the settings specific to this task
    const taskConfig = config[taskName];

    const taskLogic = (endpoint) => {
        const options = {};

        if (taskConfig.baseSrcDir) {
            options.base = taskConfig.baseSrcDir;
        }

        // create gulp source
        let gulpSrc = gulp.src(resolve('src', taskName, endpoint), options)
            // log errors for all tasks
            .on('error', logError);

        function notifyProcessComplete(notifySrc) {
            return notifySrc
                .pipe(notify(notificationFor(taskName)));
        }

        function onProcessComplete(finalGulpSrc) {
            function toDestination(dest) {
                return this
                    .pipe(rename(dest.rename || {}))
                    .pipe(gulpIf(dest.minify === 'always' || dest.minify === 'production' && process.env.production, minifier()))
                    .pipe(gulp.dest(dest.location));
            }

            const lastGulpPipe = endpoint.dest.map(toDestination.bind(finalGulpSrc)).pop();
            return notifyProcessComplete(lastGulpPipe);
        }

        // pass gulpSrc into the build process
        // if the build process does not utilize gulpSrc, an optional callback is created to inform
        // gulp when to fire a notification that the task has completed
        gulpSrc = buildProcess(gulpSrc, (newGulpSrc) => {
            if (typeof newGulpSrc === 'string') {
                newGulpSrc = gulp.src(newGulpSrc);
            }

            // if we have a gulp source, execute the completion process with the new source
            if (gutil.isStream(newGulpSrc)) {
                onProcessComplete(newGulpSrc);
            } else {
                // otherwise, we'll just notify the user that the process has been completed
                notifyProcessComplete(gulpSrc);
            }
        });

        // if gulpStream is an instance of Stream, then we want to pipe the results of the build process to the
        // destination found in the task config
        if (gutil.isStream(gulpSrc)) {
            gulpSrc = onProcessComplete(gulpSrc);
        }

        return gulpSrc;
    };

    // this is to get the function name the same as the task
    let t = { [taskName]: () => {} };

    if (typeof options.taskLogic === 'function') {
        t = { [taskName]: (done = gutil.noop) => options.taskLogic(done) };
    } else if (taskConfig.endpoints) {
        t = { [taskName]: () => gulp.parallel(taskConfig.endpoints.map(taskLogic)) };
    }

    if (t[taskName]) {
        gulp.task(taskName, t[taskName]);
    }

    // if the config has files to watch, create a watch task
    if (taskConfig.watch) {
        const tw = {
            [watchTaskName]: (done) => {
                if (typeof options.beforeWatch === 'function') {
                    options.beforeWatch();
                }
                gulp.watch(taskConfig.watch)
                    .on('change', (file) => {
                        // if `onlyCompileChangedFiles` is true, changed files will run the build process with only that
                        // file pass in as the source (as opposed to all of the files in the directory)
                        t[taskName](taskConfig.onlyCompileChangedFiles ? file.path : taskConfig.src);
                    });
                done();
            },
        };
        t[watchTaskName] = gulp.series(t[taskName], tw[watchTaskName]);

        gulp.task(watchTaskName, t[watchTaskName]);
    }

    // return the names of the build task and watch task
    return { task: t[taskName], watchTask: t[watchTaskName] || false };
};

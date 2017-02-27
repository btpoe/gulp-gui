const Stream = require('stream').Stream;
const path = require('path');
const gulp = require('gulp');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const logError = require('./log-error');
const config = require('../config');

const noop = () => {};

const DEFAULTS = {
    buildProcess: src => src,
    minifier: false,
    minifySuffix: '-min',
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
    const { taskName, buildProcess, minifier, minifySuffix } = Object.assign({}, DEFAULTS, options);
    // generate task name for the watcher
    const watchTaskName = `${taskName}:watch`;

    // get the settings specific to this task
    const taskConfig = config[taskName];

    const taskLogic = (src) => {
        const options = {};

        if (taskConfig.baseSrcDir) {
            options.base = taskConfig.baseSrcDir;
        }

        // create gulp source
        let gulpSrc = gulp.src(src, options)
            // log errors for all tasks
            .on('error', logError);

        function notifyProcessComplete(notifySrc) {
            return notifySrc
                .pipe(
                    notify(
                        config.projectSettings.notificationTemplate(taskName),
                    ),
                );
        }

        function onProcessComplete(finalGulpSrc) {
            if (taskConfig.minify && minifier) {
                finalGulpSrc = finalGulpSrc
                    .pipe(rename({
                        suffix: minifySuffix,
                    }))
                    .pipe(minifier(taskConfig.minifySettings || {}))
                    .pipe(gulp.dest(destFolder(taskConfig.dest)));
            }

            return notifyProcessComplete(finalGulpSrc);
        }

        // pass gulpSrc into the build process
        // if the build process does not utilize gulpSrc, an optional callback is created to inform
        // gulp when to fire a notification that the task has completed
        gulpSrc = buildProcess(gulpSrc, (newGulpSrc) => {
            if (typeof newGulpSrc === 'string') {
                newGulpSrc = gulp.src(newGulpSrc);
            }

            // if we have a gulp source, execute the completion process with the new source
            if (newGulpSrc instanceof Stream) {
                onProcessComplete(newGulpSrc);
            } else {
                // otherwise, we'll just notify the user that the process has been completed
                notifyProcessComplete(gulpSrc);
            }
        });

        // if gulpStream is an instance of Stream, then we want to pipe the results of the build process to the
        // destination found in the task config
        if (gulpSrc instanceof Stream) {
            gulpSrc = gulpSrc
                .pipe(gulp.dest(destFolder(taskConfig.dest)));

            onProcessComplete(gulpSrc);
        }

        return gulpSrc;
    };

    // this is to get the function name the same as the task
    let t = { [taskName]: () => {} };

    if (typeof options.taskLogic === 'function') {
        t = { [taskName]: (done = noop) => options.taskLogic(done) };
    } else if (taskConfig.src) {
        t = { [taskName]: () => taskLogic(taskConfig.src) };
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

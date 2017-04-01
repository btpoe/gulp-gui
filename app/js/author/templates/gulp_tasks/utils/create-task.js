const { extname, dirname } = require('path');
const { merge } = require('event-stream');
const gulp = require('gulp');
const clone = require('gulp-clone');
const gulpIf = require('gulp-if');
const intelliWatch = require('gulp-intelli-watch');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const logError = require('./log-error');
const notificationFor = require('./notification-for');
const resolveEndpoint = require('./resolveEndpoint');
const config = require('../config');

function noop() {}

function destFolder(dest) {
    if (extname(dest).length) {
        return dirname(dest);
    }
    return dest;
}

/**
 * Task Generator
 * Pull settings from the config file found at `./gulp_tasks/config.js`. The taskName provided is the key to the config
 * settings to use for this task. A watch task will also be created if there is a watch string provided in the config.
 * @returns {{task: function, watchTask: function}}
 */
module.exports = ({
    taskName,
    buildProcess = src => src,
    minifier = noop
}) => {
    // generate task name for the watcher
    const watchTaskName = `${taskName}:watch`;

    const {
        endpoints = [
            {
                src: ['/**'],
                dest: [
                    {
                        location: '.',
                        // try to minify, if no minifier is provided, it will skip the process
                        minify: 'always',
                    },
                ],
            },
        ],
    } = config[taskName];

    const options = {
        base: resolveEndpoint('src', taskName),
    };

    function shouldMinify(minify) {
        if (minifier === noop) {
            return false;
        }
        if (minify === 'always') {
            return true;
        }
        return minify === 'production' && process.env.production;
    }

    function toDestination(endpointSrc, {
        rename: renameOpts = {},
        minify = false,
        location = '.'
    }) {
        return endpointSrc
            .pipe(clone())
            .pipe(rename(renameOpts))
            .pipe(gulpIf(shouldMinify(minify), minifier()))
            .pipe(gulp.dest(destFolder(resolveEndpoint('dest', taskName, location))));
    }

    function endpointTasks(endpoint) {
        const allSources = resolveEndpoint('src', taskName, endpoint);

        function taskLogic(src) {
            // create gulp source
            const gulpSrc = gulp.src(src, options)
            // log errors for all tasks
                .on('error', logError);

            const buildOutput = buildProcess(gulpSrc);
            return merge(endpoint.dest.map(toDestination.bind(null, buildOutput)))
                .pipe(notify(notificationFor(taskName)));
        }

        const watcher = intelliWatch(allSources, taskLogic);

        return {
            [taskName]: () => taskLogic(allSources),
            [watchTaskName]: () => watcher(),
        };
    }

    const tasks = endpoints.map(endpointTasks);

    const t = {
        [taskName]: gulp.parallel(tasks.map(task => task[taskName])),
        [watchTaskName]: gulp.parallel(tasks.map(task => task[watchTaskName])),
    };

    gulp.task(taskName, t[taskName]);
    gulp.task(watchTaskName, t[watchTaskName]);

    // return the names of the build task and watch task
    return { task: t[taskName], watchTask: t[watchTaskName] };
};

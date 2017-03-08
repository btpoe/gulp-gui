const gulp = require('gulp');
const _ = require('lodash');
const config = require('../../config');
const endpointLogic = require('./endpoint');

const DEFAULTS = {
    buildProcess: src => src,
    minifier: false,
};

module.exports = (options) => {
    const taskConfig = config[options.taskName];
    Object.assign(taskConfig, DEFAULTS, options);

    const tasks = taskConfig.endpoints.map(endpoint =>
        endpointLogic(endpoint, taskConfig)
    );

    return {
        task: gulp.parallel(_.map(tasks, 'task')),
        watchTask: gulp.parallel(_.map(tasks, 'watchTask')),
    };
};

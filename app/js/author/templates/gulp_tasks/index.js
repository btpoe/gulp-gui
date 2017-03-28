const _ = require('lodash');
const config = require('./config');

module.exports = function() {
    const allTasks = _(config)
        .map((data, taskName) => {
            data.taskName = taskName;
            return data;
        })
        .filter('enabled')
        .map(data => require(`./tasks/${data.taskName}`));

    return {
        buildTasks: allTasks.map('task').compact().value(),
        watchTasks: allTasks.map('watchTask').compact().value()
    };
};

const _ = require('lodash');

module.exports = function(...tasks) {
    const allTasks = tasks.map(taskName => require(`./tasks/${taskName}`));
    return {
        buildTasks: _(allTasks).map('task').compact().value(),
        watchTasks: _(allTasks).map('watchTask').compact().value()
    };
};

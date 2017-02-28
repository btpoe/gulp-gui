const config = require('../config').project;

module.exports = taskName => ({
    title: config.name,
    message: `${taskName} compiled`,
    icon: config.icon,
    onLast: true,
});

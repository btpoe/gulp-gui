const config = require('../config').javascript;
const createTask = require('../utils/create-task');

module.exports = createTask({
    taskName: 'scripts',
    buildProcess: require('./javascript/engines/' + config.engine),
    minifier: require('gulp-uglify'),
});

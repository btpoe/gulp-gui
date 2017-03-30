const createTask = require('../utils/create-task');

const {
    engine = 'off',
} = require('../config').javascript;

module.exports = createTask({
    taskName: 'javascript',
    buildProcess: require('./javascript/engines/' + engine),
    minifier: require('gulp-uglify'),
});

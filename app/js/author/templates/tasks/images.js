const createTask = require('../utils/create-task');

module.exports = createTask({
    taskName: 'images',
    minifier: require('gulp-imagemin'),
    minifySuffix: '',
});

const write = require('./helpers/writeFile');

module.exports = (formData) => {
    write.file('gulp_tasks/config.json', JSON.stringify(formData, null, '  '));
};

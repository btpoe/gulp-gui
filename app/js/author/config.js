const write = require('./helpers/write-file');

module.exports = (formData) => {
    write.file('gulp_tasks/config.json', JSON.stringify(formData, null, '  '));
};

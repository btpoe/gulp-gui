const writeFile = require('./helpers/write-file');

module.exports = (formData) => {
    writeFile('config.json', JSON.stringify(formData, null, '  '));
};

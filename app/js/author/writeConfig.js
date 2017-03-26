const write = require('./helpers/writeFile');
const { appPackage } = require('../appSettings');

module.exports = (config) => {
    config.gulpGuiVersion = appPackage.version;
    write.file('gulp_tasks/config.json', JSON.stringify(config, null, '  '));
    delete config.gulpGuiVersion;
};

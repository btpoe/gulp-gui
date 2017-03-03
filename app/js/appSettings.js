const path = require('path');

const USER_CONFIG = 'defaultConfig';
const PROJECT_DIRECTORY = 'projectRootDirectory';
const DEFAULT_CONFIG_PATH = path.join(__dirname, './author/templates/config.json');
const GULPFILE_PATH = path.join(__dirname, './author/templates/gulpfile.js');

function updateUserConfig(config) {
    window.localStorage.setItem(USER_CONFIG, JSON.stringify(config));
}

module.exports = {
    USER_CONFIG,
    PROJECT_DIRECTORY,
    DEFAULT_CONFIG_PATH,
    GULPFILE_PATH,
    updateUserConfig,
};

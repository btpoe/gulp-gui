const fs = require('fs');
const path = require('path');

const USER_CONFIG = 'defaultConfig';
const PROJECT_DIRECTORY = 'projectRootDirectory';
const DEFAULT_CONFIG_PATH = path.join(__dirname, './author/templates/config.json');
const GULPFILE_PATH = path.join(__dirname, './author/templates/gulpfile.js');

const appSettings = {
    // Gulp GUI
    get appPackage() {
        return require('../package.json');
    },
    get defaultGulpFile() {
        return fs.readFileSync(GULPFILE_PATH, 'utf8');
    },
    get defaultConfigFile() {
        return fs.readFileSync(DEFAULT_CONFIG_PATH, 'utf8');
    },

    // Current Project
    get projectDirectory() {
        return window.localStorage.getItem(PROJECT_DIRECTORY);
    },
    set projectDirectory(location) {
        window.localStorage.setItem(PROJECT_DIRECTORY, location);
    },
    get projectPackagePath() {
        return path.join(this.projectDirectory, 'package.json');
    },
    get projectPackage() {
        return JSON.parse(fs.readFileSync(this.projectPackagePath, 'utf8'));
    },
    set projectPackage(config) {
        fs.writeFileSync(this.projectPackagePath, JSON.stringify(config, null, '  '));
    },
    get gulpTasksPath() {
        return path.join(this.projectDirectory, 'gulp_tasks');
    },
    get gulpConfigPath() {
        return path.join(this.gulpTasksPath, 'config.json');
    },
    get gulpConfig() {
        return JSON.parse(fs.readFileSync(this.gulpConfigPath, 'utf8'));
    },
    set gulpConfig(config) {
        fs.writeFileSync(path.join(this.gulpConfigPath), JSON.stringify(config, null, '  '));
    },

    // User Preferences
    get userConfig() {
        window.localStorage.getItem(USER_CONFIG);
    },
    set userConfig(config) {
        window.localStorage.setItem(USER_CONFIG, JSON.stringify(config, null, '  '));
    },
};

module.exports = appSettings;

const fs = require('fs');
const path = require('path');

const USER_CONFIG = 'defaultConfig';
const PROJECT_DIRECTORY = 'projectRootDirectory';
const DEFAULT_CONFIG_PATH = path.join(__dirname, './author/templates/config.json');
const GULPFILE_PATH = path.join(__dirname, './author/templates/gulpfile.js');

function updateUserConfig(config) {
    window.localStorage.setItem(USER_CONFIG, JSON.stringify(config));
}

function projectDirectory(location = false) {
    if (location) {
        return window.localStorage.setItem(PROJECT_DIRECTORY, location);
    }
    return window.localStorage.getItem(PROJECT_DIRECTORY);
}

function projectPackagePath() {
    return path.join(projectDirectory(), 'package.json');
}

function projectPackage() {
    return JSON.parse(fs.readFileSync(projectPackagePath(), 'utf8'));
}

function gulpTasksPath() {
    return path.join(projectDirectory(), 'gulp_tasks');
}

function gulpConfigPath() {
    return path.join(gulpTasksPath(), 'config.json');
}

function gulpConfig() {
    return JSON.parse(fs.readFileSync(gulpConfigPath(), 'utf8'));
}

function appPackage() {
    return require('../package.json');
}

module.exports = {
    USER_CONFIG,
    DEFAULT_CONFIG_PATH,
    GULPFILE_PATH,
    updateUserConfig,
    projectDirectory,
    projectPackagePath,
    projectPackage,
    gulpTasksPath,
    gulpConfigPath,
    gulpConfig,
    appPackage,
};

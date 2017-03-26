const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
const { USER_CONFIG, projectDirectory, DEFAULT_CONFIG_PATH } = require('./appSettings');
const { load } = require('./actions/formData');
const copyTemplates = require('./author/copyTemplates');
const freshRequire = require('./author/helpers/freshRequire');

ipcRenderer.on('open-project', (e, directory) => {
    projectDirectory(directory);

    const taskDirectory = path.join(directory, 'gulp_tasks');
    const configFile = path.join(taskDirectory, 'config.json');

    copyTemplates();

    let formData;
    if (fs.existsSync(configFile)) {
        formData = freshRequire(configFile);
    } else if (formData = window.localStorage.getItem(USER_CONFIG)) {
        formData = JSON.parse(formData);
    } else {
        formData = freshRequire(DEFAULT_CONFIG_PATH);
    }
    window.store.dispatch(load(formData));
});

const fs = require('fs');
const { ipcRenderer } = require('electron');
const app = require('./appSettings');
const { load } = require('./actions/formData');
const copyTemplates = require('./author/copyTemplates');

ipcRenderer.on('open-project', (e, directory) => {
    app.projectDirectory = directory;

    copyTemplates();

    let formData;
    if (fs.existsSync(app.gulpConfigPath)) {
        formData = app.gulpConfig;
    } else {
        formData = app.userConfig || app.defaultConfigFile;
    }
    window.store.dispatch(load(formData));
});

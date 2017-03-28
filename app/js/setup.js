const { ipcRenderer } = require('electron');
const app = require('./appSettings');
const { load } = require('./actions/formData');
const copyTemplates = require('./author/copyTemplates');

ipcRenderer.on('open-project', (e, directory) => {
    app.projectDirectory = directory;

    copyTemplates();

    window.store.dispatch(load(app.gulpConfig));
});

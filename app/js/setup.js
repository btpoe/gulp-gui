const { ipcRenderer } = require('electron');
const app = require('./appSettings');
const { load } = require('./actions/formData');
const copyTemplates = require('./author/copyTemplates');

ipcRenderer.on('open-project', (e, directory) => {
    app.projectDirectory = directory;

    copyTemplates();

    const currentPackage = app.projectPackage;

    if (typeof currentPackage.scripts !== 'object') {
        currentPackage.scripts = {};
    }

    Object.assign(currentPackage.scripts, {
        build: 'node node_modules/.bin/gulp',
        start: 'node node_modules/.bin/gulp watch',
    });

    app.projectPackage = currentPackage;

    window.store.dispatch(load(app.gulpConfig));
});

const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
const copyTemplates = require('./author/copy-templates');
const copyGulpfile = require('./author/copy-gulpfile');
const { update } = require('./actions/formData');

ipcRenderer.on('open-project', (e, projectDirectory) => {
    window.localStorage.setItem('projectRootDirectory', projectDirectory);

    if (!fs.existsSync(path.join(projectDirectory, 'gulp_tasks'))) {
        copyTemplates();
    } else if (fs.existsSync(path.join(projectDirectory, 'gulp_tasks/config.json'))) {
        window.store.dispatch(update(require(path.join(projectDirectory, 'gulp_tasks/config.json'))));
    }
    copyGulpfile();
});

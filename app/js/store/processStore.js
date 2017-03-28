const _ = require('lodash');
const manageDependencies = require('../author/manageDependencies');
const app = require('../appSettings');

function processStore() {
    const devDependencies = Object.keys(app.projectPackage.devDependencies);
    const state = window.store.getState();
    const depsToAdd = _.difference(state.dependencies || [], devDependencies || []);
    const depsToRemove = _.difference(devDependencies || [], state.dependencies || []);
    manageDependencies(state.formData.project.packageManager, depsToAdd, depsToRemove);

    app.gulpConfig = Object.assign(
        {},
        state.formData,
        {
            gulpGuiVersion: app.appPackage.version
        }
    );
}

module.exports = _.debounce(processStore);

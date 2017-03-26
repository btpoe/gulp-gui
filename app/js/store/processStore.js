const _ = require('lodash');
const writeConfig = require('../author/writeConfig');
const manageDependencies = require('../author/manageDependencies');
const { projectPackage } = require('../appSettings');

function processStore() {
    const devDependencies = Object.keys(projectPackage().devDependencies);
    const state = window.store.getState();
    const depsToAdd = _.difference(state.dependencies || [], devDependencies || []);
    const depsToRemove = _.difference(devDependencies || [], state.dependencies || []);
    manageDependencies(state.formData.project.packageManager, depsToAdd, depsToRemove);
    writeConfig(state.formData);
}

module.exports = _.debounce(processStore);

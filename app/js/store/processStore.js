const _ = require('lodash');
const writeConfig = require('../author/writeConfig');

function processStore() {
    writeConfig(window.store.getState().formData);
}

module.exports = _.debounce(processStore);

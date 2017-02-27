const _ = require('lodash');
const authorConfig = require('../author/config');

function processStore(store) {
    authorConfig(store.getState().formData);
}

module.exports = _.debounce(processStore);

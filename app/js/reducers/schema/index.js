const { UPDATE } = require('../../actions/schema');
const app = require('../../appSettings');
const stateHandler = require('./stateHandler');

module.exports = function(state = stateHandler(app.gulpConfig), action) {
    switch (action.type) {
        case UPDATE:
            return stateHandler(window.store.getState().formData);
        default:
            return state;
    }
};

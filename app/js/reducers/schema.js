const { UPDATE } = require('../actions/schema');
const initialFormState = require('./formData').initialState;
const stateHandler = require('../config');

module.exports = function(state = stateHandler(initialFormState), action) {
    switch (action.type) {
        case UPDATE:
            return stateHandler(store.getState().formData);
        default:
            return state;
    }
};

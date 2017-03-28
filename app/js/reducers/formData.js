const app = require('../appSettings');
const { UPDATE, LOAD } = require('../actions/formData');

let initialState = app.gulpConfig;

module.exports = function(state = initialState, action) {
    switch (action.type) {
        case UPDATE:
            return Object.assign({}, state, { [action.key]: action.data });
        case LOAD:
            return action.data;
        default:
            return state;
    }
};

module.exports.initialState = initialState;

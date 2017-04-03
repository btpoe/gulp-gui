const app = require('../appSettings');
const { UPDATE } = require('../actions/userPreferences');

module.exports = function(state = app.userPreferences, action) {
    switch (action.type) {
        case UPDATE:
            return app.userPreferences = action.data;
        default:
            return state;
    }
};

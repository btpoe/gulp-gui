const { combineReducers } = require('redux');
const schema = require('./schema');
const formData = require('./formData');
const dependencies = require('./dependencies');
const userPreferences = require('./userPreferences');

module.exports = combineReducers({
    schema,
    formData,
    dependencies,
    userPreferences
});

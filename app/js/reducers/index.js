const { combineReducers } = require('redux');
const schema = require('./schema');
const formData = require('./formData');
const dependencies = require('./dependencies');

module.exports = combineReducers({
    schema,
    formData,
    dependencies
});

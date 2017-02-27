const { combineReducers } = require('redux');
const schema = require('./schema');
const formData = require('./formData');

module.exports = combineReducers({
    schema,
    formData,
});

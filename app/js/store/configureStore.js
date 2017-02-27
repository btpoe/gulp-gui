const { createStore } = require('redux');
const rootReducer = require('../reducers');

module.exports = initialState => createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

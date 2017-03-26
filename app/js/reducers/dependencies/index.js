const _ = require('lodash');
const initialFormState = require('../formData').initialState;
const project = require('./project');
const browserSync = require('./browserSync');
const icons = require('./icons');
const images = require('./images');
const javascript = require('./javascript');
const styles = require('./styles');

function stateHandler(formData) {
    return Array.from(new Set(_.concat(
        project(formData.project),
        browserSync(formData.browserSync),
        icons(formData.icons),
        images(formData.images),
        javascript(formData.javascript),
        styles(formData.styles)
    )));
}

module.exports = function(state = stateHandler(initialFormState)) {
    if (window.store) {
        return stateHandler(window.store.getState().formData);
    } else {
        return state;
    }
};

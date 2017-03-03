const fs = require('fs');
const path = require('path');
const { PROJECT_DIRECTORY } = require('../appSettings');
const { UPDATE, LOAD } = require('../actions/formData');

let initialState = {
    images: {
        src: './img',
        dest: './img',
    },
    javascript: {
        src: './js',
        dest: './js',
        engine: 'rollup',
        transpiler: 'buble'
    },
    project: {
        src: './assets',
        dest: './public',
    },
    styles: {
        src: './sass',
        dest: './css',
        engine: 'sass',
    },
};

const currentProject = window.localStorage.getItem(PROJECT_DIRECTORY);
if (currentProject && fs.existsSync(path.join(currentProject, 'gulp_tasks/config.json'))) {
    initialState = require(path.join(currentProject, 'gulp_tasks/config.json'));
}

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

const fs = require('fs');
const path = require('path');
const { UPDATE } = require('../actions/formData');

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

const currentProject = window.localStorage.getItem('projectRootDirectory');
if (currentProject && fs.existsSync(path.join(currentProject, 'gulp_tasks/config.json'))) {
    initialState = require(path.join(currentProject, 'gulp_tasks/config.json'));
}

module.exports = function(state = initialState, action) {
    switch (action.type) {
        case UPDATE:
            return Object.assign({}, state, { [action.key]: action.data });
        default:
            return state;
    }
};

module.exports.initialState = initialState;

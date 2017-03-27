const fs = require('fs');
const path = require('path');
const app = require('../appSettings');
const { UPDATE, LOAD } = require('../actions/formData');

let initialState = {
    browserSync: {
        enabled: true,
    },
    icons: {
        enabled: true,
    },
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
        dependencies: [],
    },
    styles: {
        src: './sass',
        dest: './css',
        engine: 'sass',
    },
};

if (fs.existsSync(app.gulpConfigPath)) {
    initialState = app.gulpConfig;
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

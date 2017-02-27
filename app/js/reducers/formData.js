const { UPDATE } = require('../actions/formData');

const initialState = {
    images: {
        src: './img',
        dest: './img',
    },
    javascript: {
        src: './js',
        dest: './js',
        engine: 'Rollup',
        transpiler: 'Buble'
    },
    project: {
        src: './assets',
        dest: './public',
    },
    styles: {
        src: './sass',
        dest: './css',
        engine: 'Sass',
    },
};

module.exports = function(state = initialState, action) {
    switch (action.type) {
        case UPDATE:
            return Object.assign({}, state, { [action.key]: action.data });
        default:
            return state;
    }
};

module.exports.initialState = initialState;

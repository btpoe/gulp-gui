const endpoints = require('./shared/endpoints');

module.exports = {
    title: 'Javascript',
    type: 'object',
    properties: {
        src: { title: 'Source Directory', type: 'string' },
        dest: { title: 'Destination Directory', type: 'string' },
        engine: {
            title: 'Bundler',
            type: 'string',
            enum: [
                'Browserify',
                'Rollup',
                'Off',
            ],
        },
        transpiler: {
            title: 'Transpiler',
            type: 'string',
            enum: [
                'Babel',
                'Buble',
                'Typescript',
                'Off',
            ],
        },
        endpoints
    },
};

const endpoints = require('./shared/endpoints');

const transpilerSettings = {
    Babel: require('../javascript/plugins/bable'),
    Buble: require('../javascript/plugins/buble'),
    Typescript: require('../javascript/plugins/typescript'),
    Off: {},
};

module.exports = formData => ({
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
        transpilerSettings: transpilerSettings[formData.transpiler],
        endpoints,
    },
});

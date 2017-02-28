const enabled = require('./shared/enabled');
const endpoints = require('./shared/endpoints');

const transpilerSettings = {
    babel: require('../javascript/plugins/bable'),
    buble: require('../javascript/plugins/buble'),
    typescript: require('../javascript/plugins/typescript'),
    off: {},
};

module.exports = formData => ({
    title: 'Javascript',
    type: 'object',
    properties: {
        enabled,
        src: { title: 'Source Directory', type: 'string' },
        dest: { title: 'Destination Directory', type: 'string' },
        engine: {
            title: 'Bundler',
            type: 'string',
            enum: [
                'browserify',
                'rollup',
                'off',
            ],
            enumNames: [
                'Browserify',
                'Rollup',
                'Off',
            ],
        },
        transpiler: {
            title: 'Transpiler',
            type: 'string',
            enum: [
                'babel',
                'buble',
                'typescript',
                'off',
            ],
            enumNames: [
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

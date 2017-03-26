const enabled = require('./shared/enabled');
const endpoints = require('./shared/endpoints');

const engineSettings = {
    browserify: require('../javascript/engines/browserify'),
    rollup: require('../javascript/engines/rollup'),
    off: require('../javascript/engines/off'),
};
const transpilerSettings = {
    babel: require('../javascript/plugins/bable'),
    buble: require('../javascript/plugins/buble'),
    typescript: require('../javascript/plugins/typescript'),
    off: {},
};

module.exports = formData => ({
    schema: {
        title: 'Javascript',
        type: 'object',
        properties: {
            enabled: enabled.schema,
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
            engineSettings: engineSettings[formData.engine].schema,
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
            transpilerSettings: transpilerSettings[formData.transpiler].schema,
            endpoints: endpoints.schema,
        },
    },
    ui: {
        enabled: enabled.ui,
        engineSettings: engineSettings[formData.engine].ui,
        transpilerSettings: transpilerSettings[formData.transpiler].ui,
        endpoints: endpoints.ui,
    }
});

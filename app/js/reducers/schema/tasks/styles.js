const endpoints = require('./shared/endpoints');
const enabled = require('./shared/enabled');

module.exports = formData => ({
    schema: {
        title: 'Styles',
        type: 'object',
        properties: {
            enabled: enabled.schema,
            src: { title: 'Source Directory', type: 'string' },
            dest: { title: 'Destination Directory', type: 'string' },
            engine: {
                title: 'Pre-Processor',
                type: 'string',
                enum: [
                    'sass',
                    'postcss',
                    'stylus',
                    'less',
                    'off',
                ],
                enumNames: [
                    'Sass',
                    'PostCSS',
                    'Stylus',
                    'Less',
                    'Off',
                ],
            },
            endpoints: endpoints.schema,
        },
    },
    ui: {
        enabled: enabled.ui,
        endpoints: endpoints.ui,
    },
});

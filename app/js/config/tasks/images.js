const enabled = require('./shared/enabled');
const endpoints = require('./shared/endpoints');

module.exports = formData => ({
    schema: {
        title: 'Images',
        type: 'object',
        properties: {
            enabled: enabled.schema,
            src: { title: 'Source Directory', type: 'string' },
            dest: { title: 'Destination Directory', type: 'string' },
        },
        endpoints: endpoints.schema,
    },
    ui: {
        enabled: enabled.ui,
        endpoints: endpoints.ui,
    }
});

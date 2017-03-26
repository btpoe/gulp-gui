const enabled = require('./shared/enabled');

module.exports = formData => ({
    schema: {
        title: 'Icons',
        type: 'object',
        properties: {
            enabled: enabled.schema,
            src: { title: 'Source Directory', type: 'string' },
            dest: { title: 'Destination Directory', type: 'string' },
            symbolPack: { title: 'Create Symbol Pack?', type: 'boolean' },
        },
    },
    ui: {
        enabled: enabled.ui,
    },
});

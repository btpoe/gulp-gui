const enabled = require('./shared/enabled');

module.exports = formData => ({
    schema: {
        title: 'Icons',
        type: 'object',
        properties: {
            enabled: enabled.schema,
        },
    },
    ui: {
        enabled: enabled.ui,
    },
});

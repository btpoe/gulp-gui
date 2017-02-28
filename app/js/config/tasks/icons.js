const enabled = require('./shared/enabled');

module.exports = formData => ({
    title: 'Icons',
    type: 'object',
    properties: {
        enabled,
    },
});

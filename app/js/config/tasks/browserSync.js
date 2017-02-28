const enabled = require('./shared/enabled');

module.exports = formData => ({
    title: 'Browser Sync',
    type: 'object',
    properties: {
        enabled,
    },
});

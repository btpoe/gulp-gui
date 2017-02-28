const enabled = require('./shared/enabled');
const endpoints = require('./shared/endpoints');

module.exports = formData => ({
    title: 'Images',
    type: 'object',
    properties: {
        enabled,
        src: { title: 'Source Directory', type: 'string' },
        dest: { title: 'Destination Directory', type: 'string' },
    },
    endpoints,
});

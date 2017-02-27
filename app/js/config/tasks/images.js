const endpoints = require('./shared/endpoints');

module.exports = {
    title: 'Images',
    type: 'object',
    properties: {
        src: { title: 'Source Directory', type: 'string' },
        dest: { title: 'Destination Directory', type: 'string' },
    },
    endpoints,
};

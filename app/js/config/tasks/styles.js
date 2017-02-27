const endpoints = require('./shared/endpoints');

module.exports = formData => ({
    title: 'Styles',
    type: 'object',
    properties: {
        src: { title: 'Source Directory', type: 'string' },
        dest: { title: 'Destination Directory', type: 'string' },
        engine: {
            title: 'Pre-Processor',
            type: 'string',
            enum: [
                'Sass',
                'PostCSS',
                'Stylus',
                'Less',
                'Off',
            ],
        },
        endpoints,
    },
});

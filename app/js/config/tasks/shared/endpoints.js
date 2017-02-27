module.exports = {
    title: 'Endpoints',
    type: 'array',
    default: [
        {
            src: ['**/*'],
            dest: [
                { location: './' },
            ],
        },
    ],
    items: {
        type: 'object',
        properties: {
            src: {
                title: 'Source',
                type: 'array',
                items: { type: 'string', default: '**/*' },
            },
            dest: {
                title: 'Destinations',
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        location: { title: 'Path', type: 'string' },
                        minify: {
                            title: 'Minify',
                            type: 'string',
                            default: 'Production',
                            enum: [
                                'Always',
                                'Production',
                                'Never',
                            ],
                        },
                        rename: {
                            title: 'Rename',
                            type: 'object',
                            properties: {
                                prefix: { title: 'Prefix', type: 'string' },
                                suffix: { title: 'Suffix', type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
};

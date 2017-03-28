module.exports = {
    schema: {
        title: 'Endpoints',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                src: {
                    title: 'Source',
                    type: 'array',
                    items: { type: 'string' },
                },
                dest: {
                    title: 'Destination',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            location: { title: 'Path', type: 'string' },
                            minify: {
                                title: 'Minify',
                                type: 'string',
                                enum: [
                                    'always',
                                    'production',
                                    'never',
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
    },
    ui: {
        'ui:options':  {
            orderable: false,
        },
        items: {
            dest: {
                'ui:options':  {
                    orderable: false,
                },
                items: {
                    'ui:field': 'destination',
                },
            },
        },
    },
};

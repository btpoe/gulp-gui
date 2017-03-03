module.exports = {
    schema: {
        title: 'Babel Settings',
        type: 'object',
        properties: {
            presets: {
                title: 'Presets',
                type: 'array',
                items: {
                    type: 'string',
                    enum: [
                        'es2015',
                        'es2016',
                        'es2017',
                        'react',
                        'stage-0',
                        'stage-1',
                        'stage-2',
                        'stage-3',
                        'stage-4',
                    ],
                    enumNames: [
                        'ES2015',
                        'ES2016',
                        'ES2017',
                        'React',
                        'Stage-0',
                        'Stage-1',
                        'Stage-2',
                        'Stage-3',
                        'Stage-4',
                    ],
                },
                uniqueItems: true,
            },
        },
    },
    ui: {
        presets: {
            'ui:widget': 'checkboxes',
        },
    },
};

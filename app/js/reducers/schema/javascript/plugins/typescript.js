module.exports = {
    schema: {
        title: 'Typescript Settings',
        type: 'object',
        properties: {
            presets: {
                title: 'Plugins',
                type: 'array',
                items: {
                    type: 'string',
                    enum: [
                        'react',
                    ],
                    enumNames: [
                        'React',
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

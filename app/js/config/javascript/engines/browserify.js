module.exports = {
    schema: {
        title: 'Browserify Settings',
        type: 'object',
        properties: {
            presets: {
                title: 'Plugins',
                type: 'array',
                items: {
                    type: 'string',
                    enum: [
                        'shim',
                    ],
                    enumNames: [
                        'Shim',
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

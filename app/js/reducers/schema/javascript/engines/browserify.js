module.exports = {
    schema: {
        title: 'Browserify Settings',
        type: 'object',
        properties: {
            externalLibraries: {
                title: 'External Libraries',
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { title: 'Package Name', type: 'string' },
                        global: { title: 'Global Variable', type: 'string' },
                    },
                },
            },
        },
    },
    ui: {
        presets: {
            'ui:widget': 'checkboxes',
        },
        externalLibraries: {
            'ui:options':  {
                orderable: false,
            },
            items: {
                'ui:field': 'externalLib',
            },
        },
    },
};

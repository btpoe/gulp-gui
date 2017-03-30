module.exports = {
    schema: {
        title: 'Rollup Settings',
        type: 'object',
        properties: {
            plugins: {
                title: 'Plugins',
                type: 'array',
                items: {
                    type: 'string',
                    enum: [
                        'node-resolve',
                        'commonjs',
                    ],
                    enumNames: [
                        'Node Resolve',
                        'CommonJS',
                    ],
                },
                uniqueItems: true,
            },
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
        plugins: {
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

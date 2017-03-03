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
        },
    },
    ui: {
        plugins: {
            'ui:widget': 'checkboxes',
        },
    },
};

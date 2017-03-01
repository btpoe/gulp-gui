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
                        'react',
                    ],
                    enumNames: [
                        'Node Resolve',
                        'CommonJS',
                        'React',
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

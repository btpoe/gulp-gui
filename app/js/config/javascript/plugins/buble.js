module.exports = {
    title: 'Buble Settings',
    type: 'object',
    properties: {
        pluginPresets: {
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
};

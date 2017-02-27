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
                    'Node Resolve',
                    'Commonjs',
                    'React',
                ],
            },
            uniqueItems: true,
        },
    },
};

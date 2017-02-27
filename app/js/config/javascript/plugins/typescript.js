module.exports = {
    title: 'Typescript Settings',
    type: 'object',
    properties: {
        pluginPresets: {
            title: 'Plugins',
            type: 'array',
            items: {
                type: 'string',
                enum: [
                    'React',
                ],
            },
            uniqueItems: true,
        },
    },
};

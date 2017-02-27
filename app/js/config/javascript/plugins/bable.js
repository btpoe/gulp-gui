module.exports = {
    title: 'Babel Settings',
    type: 'object',
    properties: {
        pluginPresets: {
            title: 'Presets',
            type: 'array',
            items: {
                type: 'string',
                enum: [
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
};

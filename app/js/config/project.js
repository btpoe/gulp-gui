module.exports = {
    title: 'Project',
    type: 'object',
    required: ['title'],
    properties: {
        title: { title: 'Project Name', type: 'string' },
        src: { title: 'Source Directory', type: 'string' },
        dest: { title: 'Distribution Directory', type: 'string' },
        dependencies: {
            title: 'Additional Dependencies',
            description: '(Order doesn\'t matter)',
            type: 'array',
            items: { type: 'string' },
        },
    }
};

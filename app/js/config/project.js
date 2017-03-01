module.exports = formData => ({
    schema: {
        title: 'Project',
        type: 'object',
        required: ['title'],
        properties: {
            title: { title: 'Project Name', type: 'string' },
            src: { title: 'Source Directory', type: 'string' },
            dest: { title: 'Distribution Directory', type: 'string' },
            icons: { title: 'Icon', type: 'string' },
            devDependencies: {
                title: 'Additional Dependencies',
                description: '(Order doesn\'t matter)',
                type: 'array',
                items: { type: 'string' },
            },
        },
    },
    ui: {
        devDependencies: {
            'ui:options':  {
                orderable: false,
            },
        },
    }
});

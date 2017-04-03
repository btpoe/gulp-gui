const { Component, createElement } = require('react');

module.exports = class extends Component {
    render() {
        const { schema } = this.props;

        if (schema.type !== 'boolean') {
            return null;
        }

        return createElement('div', null,
            createElement('label', { className: 'control-label' }, schema.title),
            createElement('div'),
            createElement('button', { type: 'button', className: 'btn btn-info', onClick: schema.action }, schema.actionLabel || 'Save')
        )
    }
};

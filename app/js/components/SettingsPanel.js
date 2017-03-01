const { Component, createElement } = require('react');
const Form = require('react-jsonschema-form').default;
const { update } = require('../actions/formData');
const updateSchema = require('../actions/schema').update;

function onError(data) {
    console.warn(data);
}

module.exports = class extends Component {
    constructor(props) {
        super(props);

        this.onChange = state => {
            window.store.dispatch(update(this.props.activePanel, state.formData));
            window.store.dispatch(updateSchema());
        };
    }

    render() {
        const { schema, formData } = this.props;
        return createElement(Form,
            {
                className: 'col-xs-12',
                schema: schema.schema,
                uiSchema: schema.ui,
                formData,
                onChange: this.onChange,
                onSubmit: this.onChange,
                onError,
            },
            createElement('div', null,
                createElement('button', { type: 'submit', className: 'btn btn-info' }, 'Save')
            )
        );
    }
};

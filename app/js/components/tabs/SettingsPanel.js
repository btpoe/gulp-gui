const { Component, createElement } = require('react');
const Form = require('react-jsonschema-form').default;
const { update } = require('../../actions/formData');

function onError(data) {
    console.warn(data);
}

const uiSchema = {
    endpoints: {
        'ui:options':  {
            orderable: false,
        },
    },
    dependencies: {
        'ui:options':  {
            orderable: false,
        },
    },
    dest: {
        'ui:options':  {
            orderable: false,
        },
    },
};

module.exports = class extends Component {
    constructor(props) {
        super(props);

        this.onChange = state => {
            store.dispatch(update(this.props.activePanel, state.formData));
        };
    }

    render() {
        const { schema, formData } = this.props;
        return createElement(Form,
            {
                className: 'col-sm-8 col-md-9',
                schema,
                uiSchema,
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

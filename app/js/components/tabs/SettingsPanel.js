const { Component, createElement } = require('react');
const Form = require('react-jsonschema-form').default;
const { update } = require('../../actions/formData');
const updateSchema = require('../../actions/schema').update;

function onError(data) {
    console.warn(data);
}

const uiSchema = {
    dependencies: {
        'ui:options':  {
            orderable: false,
        },
    },
    endpoints: {
        'ui:options':  {
            orderable: false,
        },
        items: {
            dest: {
                'ui:options':  {
                    orderable: false,
                },
            },
        },
    },
    transpilerSettings: {
        pluginPresets: {
            'ui:widget': 'checkboxes',
        },
    },
};

module.exports = class extends Component {
    constructor(props) {
        super(props);

        this.onChange = state => {
            store.dispatch(update(this.props.activePanel, state.formData));
            store.dispatch(updateSchema());
        };
    }

    render() {
        const { schema, formData } = this.props;
        console.log(schema);
        return createElement(Form,
            {
                className: 'col-sm-8 config',
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

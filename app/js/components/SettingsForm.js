const { createElement } = require('react');
const Form = require('react-jsonschema-form').default;
const { update } = require('../actions/userPreferences');
const app = require('../appSettings');
const fields = require('./fields');

const schema = {
    type: 'object',
    title: 'User Preferences',
    properties: {
        defaultConfig: {
            title: 'Save current project as default config.',
            type: 'boolean',
            action() {
                app.userConfig = window.store.getState().formData;
            }
        },
        nodeBinary: {
            title: 'Node Binary',
            type: 'string',
            default: '/usr/local/bin/node'
        },
        packageManagerBinary: {
            title: 'Package Manager Binary',
            type: 'string',
            default: '/usr/local/bin/npm'
        }
    }
};

const uiSchema = {
    defaultConfig: {
        'ui:field': 'actionButton',
    },
};

function onError(data) {
    console.warn(data);
}

function onChange(state) {
    window.store.dispatch(update(state.formData));
}

module.exports = props =>
    createElement(Form,
        {
            className: 'col-xs-12',
            schema,
            uiSchema,
            fields,
            formData: props.formData,
            onChange,
            onSubmit: onChange,
            onError,
        },
        createElement('div')
    );

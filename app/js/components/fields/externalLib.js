const { Component, createElement } = require('react');
const SchemaField = require('react-jsonschema-form/lib/components/fields/SchemaField').default;
const { toIdSchema } = require('react-jsonschema-form/lib/utils');

let randId = 0;

module.exports = class extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.formData);
    }

    onChange(key) {
        return (value) => {
            this.setState({
                [key]: value,
            }, () => this.props.onChange(this.state));
        }
    }

    render() {
        const {
            schema,
            formData,
        } = this.props;

        if (schema.type !== 'object') {
            return null;
        }

        randId++;

        return createElement('div', { className: 'row array-row' },
            createElement('div', { className: 'col-sm-5 array-col-lib-name' },
                createElement(SchemaField, Object.assign({}, this.props, {
                    schema: schema.properties.name,
                    formData: formData.name,
                    onChange: this.onChange('name'),
                    idSchema: toIdSchema(schema.properties.name, `lib__${randId}__location`),
                    uiSchema: {},
                }))
            ),
            createElement('div', { className: 'col-sm-3 array-col-lib-global' },
                createElement(SchemaField, Object.assign({}, this.props, {
                    schema: schema.properties.global,
                    formData: formData.global,
                    onChange: this.onChange('global'),
                    idSchema: toIdSchema(schema.properties.global, `lib__${randId}__minify`),
                    uiSchema: {},
                }))
            )
        );
    }
};

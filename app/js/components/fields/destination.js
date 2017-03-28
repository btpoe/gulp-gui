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

        return createElement('div', { className: 'row dest-row' },
            createElement('div', { className: 'col-sm-5 dest-col-location' },
                createElement(SchemaField, Object.assign({}, this.props, {
                    schema: schema.properties.location,
                    formData: formData.location,
                    onChange: this.onChange('location'),
                    idSchema: toIdSchema(schema.properties.location, `dest__${randId}__location`),
                    uiSchema: {},
                }))
            ),
            createElement('div', { className: 'col-sm-3 dest-col-minify' },
                createElement(SchemaField, Object.assign({}, this.props, {
                    schema: schema.properties.minify,
                    formData: formData.minify,
                    onChange: this.onChange('minify'),
                    idSchema: toIdSchema(schema.properties.minify, `dest__${randId}__minify`),
                    uiSchema: {},
                }))
            ),
            createElement('div', { className: 'col-sm-4 dest-col-rename' },
                createElement(SchemaField, Object.assign({}, this.props, {
                    schema: schema.properties.rename,
                    formData: formData.rename,
                    onChange: this.onChange('rename'),
                    idSchema: toIdSchema(schema.properties.rename, `dest__${randId}__rename`),
                    uiSchema: {},
                }))
            )
        );
    }
};

const { Component, createElement } = require('react');
const { connect } = require('react-redux');
const Nav = require('./Navigation');
const SettingsPanel = require('./SettingsPanel');

function mapStateToProps(state) {
    return {
        schema: state.schema,
        formData: state.formData
    };
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'project'
        };

        this.setActivePanel = e => {
            this.setState({ activePanel: e.target.dataset.key });
        }
    }

    render() {
        const { activePanel } = this.state;
        const schema = this.props.schema[activePanel];
        const formData = this.props.formData[activePanel];

        return createElement('div', { className: 'row' },
            createElement(Nav, { setActivePanel: this.setActivePanel, activePanel }),
            createElement(SettingsPanel, { schema, formData, activePanel })
        );
    }
}

module.exports = connect(mapStateToProps)(App);

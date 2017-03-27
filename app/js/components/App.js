const { Component, createElement } = require('react');
const { connect } = require('react-redux');
const Nav = require('./Navigation');
const ConfigForm = require('./ConfigForm');
const SettingsForm = require('./SettingsForm');
const TaskRunners = require('./TaskRunners');

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
        let mainPanel;


        if (activePanel === 'appSettings') {
            mainPanel = createElement(SettingsForm);
        } else {
            const schema = this.props.schema[activePanel];
            const formData = this.props.formData[activePanel];
            mainPanel = createElement(ConfigForm, { schema, formData, activePanel });
        }

        return createElement('div', { className: 'react-root row' },
            createElement(TaskRunners, { formData: this.props.formData }),
            createElement(Nav, { setActivePanel: this.setActivePanel, activePanel }),
            mainPanel
        );
    }
}

module.exports = connect(mapStateToProps)(App);

const { Component, createElement } = require('react');
const { connect } = require('react-redux');
const Nav = require('./Navigation');
const ConfigForm = require('./ConfigForm');
const ConsoleView = require('./ConsoleView');
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
            activePanel: 'project',
        };

        this.setActivePanel = e => {
            this.setState({ activePanel: e.target.dataset.key });
        };
    }

    get mainPanel() {
        const activePanel = this.state.activePanel;

        switch(activePanel) {
            case 'appSettings':
                return createElement(SettingsForm);
            case 'console':
                return createElement(ConsoleView);
            default:
                const schema = this.props.schema[activePanel];
                const formData = this.props.formData[activePanel];
                return createElement(ConfigForm, { schema, formData, activePanel });
        }
    }

    render() {
        const activePanel = this.state.activePanel;

        return createElement('div', { className: 'react-root row' },
            createElement(TaskRunners, { formData: this.props.formData, activePanel, setActivePanel: this.setActivePanel }),
            createElement(Nav, { activePanel, setActivePanel: this.setActivePanel }),
            this.mainPanel
        );
    }
}

module.exports = connect(mapStateToProps)(App);

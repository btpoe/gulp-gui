const { createElement, Component } = require('react');
const consoleService = require('../services/console');

module.exports = class ConsoleView extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        consoleService.listener = this;
    }

    render() {
        return createElement('div', { className: 'view--console', dangerouslySetInnerHTML: { __html: consoleService.rawLog } })
    }
};

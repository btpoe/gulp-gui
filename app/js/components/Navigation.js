const { Component, createElement } = require('react');
const _ = require('lodash');

const navKeys = ['project', 'browserSync', 'icons', 'images', 'javascript', 'styles'];

module.exports = class extends Component {
    render() {
        const { activePanel, setActivePanel } = this.props;

        const navLinks = navKeys.map(navKey =>
            createElement('li', { className: navKey === activePanel ? 'active' : '', key: navKey },
                createElement('a', { href: `#${navKey}`, onClick: setActivePanel, 'data-key': navKey }, _.startCase(navKey))
            )
        );

        return createElement('nav', { className: 'col-sm-4 navigation'},
            createElement('ul', { className: 'nav nav-pills nav-stacked' },
                navLinks
            )
        );
    }
};

const { createElement } = require('react');
const app = require('../appSettings');

function saveDefault() {
    app.userConfig = window.store.getState().formData;
}

module.exports = props =>
    createElement('div', { className: 'col-xs-12' },
        createElement('div', null,
            createElement('div', null,
                createElement('label', null, 'Save current project as default config.')
            ),
            createElement('button', { type: 'button', className: 'btn btn-info', onClick: saveDefault }, 'Save')
        )
    );

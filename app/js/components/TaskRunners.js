const { execSync } = require('child_process');
const { Component, createElement } = require('react');
const _  = require('lodash');

const clickInMenu = Symbol('click in modal');

const runTask = (enabled, task, watch) => !enabled ? null : () => {
    let command = 'npm run build';
    if (task) {
        command += ` -- ${task}`;
        if (watch) {
            command += ':watch';
        }
    } else if (watch) {
        command += ' -- watch';
    }
    execSync(command, {
        cwd: window.localStorage.getItem('projectRootDirectory'),
    });

    // do stop the watcher:
    // childProcess.kill('SIGINT');
};

const buildAll = runTask(true, false, false);
const watchAll = runTask(true, false, true);

function toggleMenu(e) {
    e.nativeEvent[clickInMenu] = true;
    e.currentTarget.parentNode.classList.toggle('open');
    _.forEach(document.querySelectorAll('.btn-group'), group => {
        if (!group.contains(e.currentTarget)) {
            group.classList.remove('open');
        }
    });
}

function closeAllMenus(e) {
    if (!e[clickInMenu]) {
        _.forEach(document.querySelectorAll('.btn-group'), group => {
            group.classList.remove('open');
        });
    }
}

module.exports = class extends Component {
    componentDidMount() {
        document.addEventListener('click', closeAllMenus);
    }

    componentWillUnmount() {
        document.removeEventListener('click', closeAllMenus);
    }

    render() {
        const actions = watch => _.map(window.store.getState().formData, (options, key) => {
            return createElement('li', { key, className: options.enabled ? '' : 'disabled' },
                createElement('a', { href: '#', onClick: runTask(options.enabled, key, watch) }, _.startCase(key))
            );
        });

        return createElement('div', { className: 'task-runners' },
            createElement('div', { className: 'btn-group' },
                createElement('button', { type: 'button', className: 'btn btn-info btn-sm', onClick: buildAll }, 'Build'),
                createElement('button', { type: 'button', className: 'btn btn-info btn-sm dropdown-toggle', onClick: toggleMenu },
                    createElement('span', { className: 'caret' }),
                    createElement('span', { className: 'sr-only' }, 'Toggle Dropdown')
                ),
                createElement('ul', { className: 'dropdown-menu' },
                    actions(false),
                    createElement('li', { className: 'divider', role: 'separator' }),
                    createElement('li', null,
                        createElement('a', { href: '#', onClick: buildAll }, 'All')
                    )
                )
            ),
            createElement('div', { className: 'btn-group' },
                createElement('button', { type: 'button', className: 'btn btn-info btn-sm', onClick: watchAll }, 'Watch'),
                createElement('button', { type: 'button', className: 'btn btn-info btn-sm dropdown-toggle', onClick: toggleMenu },
                    createElement('span', { className: 'caret' }),
                    createElement('span', { className: 'sr-only' }, 'Toggle Dropdown')
                ),
                createElement('ul', { className: 'dropdown-menu' },
                    actions(true),
                    createElement('li', { className: 'divider', role: 'separator' }),
                    createElement('li', null,
                        createElement('a', { href: '#', onClick: watchAll }, 'All')
                    )
                )
            )
        )
    }
};

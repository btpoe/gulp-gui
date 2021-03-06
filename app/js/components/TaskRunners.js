const cp = require('child_process');
const { Component, createElement } = require('react');
const _  = require('lodash');
const app = require('../appSettings');
const consoleService = require('../services/console');

const clickInMenu = Symbol('click in modal');

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
    constructor(props) {
        super(props);

        this.state = {
            building: {},
            watching: {},
        };

        this.buildAll = this.runTask(true, false, false);
        this.watchAll = this.runTask(true, false, true);
    }

    runTask(enabled, task, watch) {
        return !enabled ? null : () => {
            const taskName = task || 'all';
            if (watch && this.state.watching[taskName]) {
                this.state.watching[taskName].kill('SIGINT');
            } else {
                const command = [];
                if (task) {
                    command.push(task);
                }
                if (watch) {
                    command.push('watch');
                }

                const buildType = watch ? 'watching' : 'building';

                const taskProcess = cp.spawn(app.nodeBinary, ['node_modules/gulp-cli/bin/gulp', command.join(':'), '--color=always'], {
                    cwd: app.projectDirectory,
                }).on('exit', (e) => {
                    const state = Object.assign({}, this.state[buildType], {
                        [taskName]: null
                    });
                    this.setState({ [buildType]: state });
                });

                taskProcess.stdout.pipe(consoleService.stream);
                taskProcess.stderr.pipe(consoleService.stream);

                const state = Object.assign({}, this.state[buildType], {
                    [taskName]: taskProcess
                });
                this.setState({ [buildType]: state });
            }
        };
    }

    componentDidMount() {
        document.addEventListener('click', closeAllMenus);
    }

    componentWillUnmount() {
        document.removeEventListener('click', closeAllMenus);
    }

    render() {
        const actions = watch => _.map(this.props.formData, (options, key) => {
            if (typeof options !== 'object' || typeof options.enabled !== 'boolean') {
                return null;
            }
            return createElement('li', { key, className: options.enabled ? this.state[watch ? 'watching' : 'building'][key] ? 'btn-warning' : '' : 'disabled' },
                createElement('a', { href: '#', onClick: this.runTask(options.enabled, key, watch) }, _.startCase(key))
            );
        });

        return createElement('div', { className: 'task-runners' },
            createElement('div', { className: 'btn-group' },
                createElement('button', { type: 'button', className: `btn btn-sm btn-${this.props.activePanel === 'console' ? 'warning' : 'info'}`, onClick: this.props.setActivePanel, 'data-key': 'console' },
                    createElement('span', { className: 'glyphicon glyphicon-console', 'aria-hidden': true }),
                    ' Console'
                )
            ),
            createElement('div', { className: 'btn-group' },
                createElement('button', { type: 'button', className: `btn btn-sm btn-${this.state.building.all ? 'warning' : 'info'}`, onClick: this.buildAll }, 'Build'),
                createElement('button', { type: 'button', className: 'btn btn-sm btn-info dropdown-toggle', onClick: toggleMenu },
                    createElement('span', { className: 'caret' }),
                    createElement('span', { className: 'sr-only' }, 'Toggle Dropdown')
                ),
                createElement('ul', { className: 'dropdown-menu dropdown-menu-right' },
                    actions(false),
                    createElement('li', { className: 'divider', role: 'separator' }),
                    createElement('li', null,
                        createElement('a', { href: '#', onClick: this.buildAll }, 'All')
                    )
                )
            ),
            createElement('div', { className: 'btn-group' },
                createElement('button', { type: 'button', className: `btn btn-sm btn-${this.state.watching.all ? 'warning' : 'info'}`, onClick: this.watchAll }, 'Watch'),
                createElement('button', { type: 'button', className: 'btn btn-sm btn-info dropdown-toggle', onClick: toggleMenu },
                    createElement('span', { className: 'caret' }),
                    createElement('span', { className: 'sr-only' }, 'Toggle Dropdown')
                ),
                createElement('ul', { className: 'dropdown-menu dropdown-menu-right' },
                    actions(true),
                    createElement('li', { className: 'divider', role: 'separator' }),
                    createElement('li', null,
                        createElement('a', { href: '#', onClick: this.watchAll }, 'All')
                    )
                )
            )
        )
    }
};

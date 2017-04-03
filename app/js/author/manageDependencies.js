const cp = require('child_process');
const app = require('../appSettings');

const api = {
    npm: {
        install: 'install',
        uninstall: 'uninstall',
    },
    yarn: {
        install: 'add',
        uninstall: 'remove',
    },
};

let runningProcess;

module.exports = function manageDependencies(manager = 'npm', depsToAdd, depsToRemove) {
    if (runningProcess) {
        runningProcess.kill('SIGINT')
    }

    const packageManagerBinary = `${app.packageManagerGlobalPath.replace(/\/?(yarn|npm)$/, '')}/${manager}`;

    const commands = [];

    if (depsToAdd.length) {
        commands.push(`${packageManagerBinary} ${api[manager].install} ${depsToAdd.join(' ')} -D`);
    }

    if (depsToRemove.length) {
        commands.push(`${packageManagerBinary} ${api[manager].uninstall} ${depsToRemove.join(' ')} -D`);
    }

    if (commands.length) {
        runningProcess = cp.exec(commands.join(' && '), {
            cwd: app.projectDirectory
        }, data => data).on('exit', () => {
            runningProcess = null;
        });
    }
};

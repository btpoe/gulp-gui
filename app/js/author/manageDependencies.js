const { exec } = require('child_process');
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
let queuedProcess;

module.exports = function manageDependencies(manager = 'npm', depsToAdd, depsToRemove) {
    if (runningProcess) {
        queuedProcess = [manager, depsToAdd, depsToRemove];
        return;
    }

    const commands = [];

    if (depsToAdd.length) {
        commands.push(`${manager} ${api[manager].install} ${depsToAdd.join(' ')} -D`);
    }

    if (depsToRemove.length) {
        commands.push(`${manager} ${api[manager].uninstall} ${depsToRemove.join(' ')} -D`);
    }

    runningProcess = exec(commands.join(' && '), {
        cwd: app.projectDirectory
    }, data => data).on('exit', () => {
        runningProcess = null;
        if (queuedProcess) {
            manageDependencies.apply(null, queuedProcess);
            queuedProcess = null
        }
    });
};

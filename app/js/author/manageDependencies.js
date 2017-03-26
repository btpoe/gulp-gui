const { exec } = require('child_process');
const { projectDirectory } = require('../appSettings');

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

module.exports = function(manager, depsToAdd, depsToRemove) {
    const commands = [];

    if (depsToAdd.length) {
        commands.push(`${manager} ${api[manager].install} ${depsToAdd.join(' ')} -D`);
    }

    if (depsToRemove.length) {
        commands.push(`${manager} ${api[manager].uninstall} ${depsToRemove.join(' ')} -D`);
    }

    exec(commands.join(' && '), {
        cwd: projectDirectory()
    });
};

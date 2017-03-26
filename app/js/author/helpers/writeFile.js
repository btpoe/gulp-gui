const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const mkdirp = require('mkdirp');
const firstLine = require('./firstLine');
const { projectDirectory } = require('../../appSettings');

function file(location, data, backup = false) {
    const filePath = path.join(projectDirectory(), location);
    mkdirp(path.dirname(filePath));
    if (backup && fs.existsSync(filePath) && firstLine(filePath) !== data.toString().split('\n')[0]) {
        const parts = path.parse(filePath);
        delete parts.base;
        parts.name += '.bak';
        path.format(parts);
        fs.renameSync(filePath, path.format(parts));
    }
    fs.writeFileSync(filePath, data);
}

function cp(source, dest, opts) {
    execSync('find . -type f', { cwd: source }).toString()
        .split('\n')
        .filter(filePath => filePath.length && (!opts.filter || !opts.filter.test(filePath)))
        .forEach(filePath => {
            const sourceFilePath = path.join(source, filePath);
            const destFilePath = path.join(dest, filePath);

            file(destFilePath, fs.readFileSync(sourceFilePath), opts.backup);
        });
}

module.exports = {
    file, cp
};

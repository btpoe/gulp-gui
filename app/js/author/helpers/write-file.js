const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { execSync } = require('child_process');
const firstLine = require('./first-line');

window.localStorage.setItem('projectRootDirectory', '/Users/brandonpoe/Projects/gulp-demo');

function file(location, data, backup = false) {
    const rootDir = window.localStorage.getItem('projectRootDirectory');
    const filePath = path.join(rootDir, location);
    mkdirp(path.dirname(filePath));
    if (backup && fs.existsSync(filePath) && firstLine(filePath) !== data.split('\n')[0]) {
        const parts = path.parse(filePath);
        delete parts.base;
        parts.name += '.bak';
        path.format(parts);
        fs.renameSync(filePath, path.format(parts));
    }
    fs.writeFileSync(filePath, data);
}

function cp(source, dest) {
    const rootDir = window.localStorage.getItem('projectRootDirectory');
    const filePath = path.join(rootDir, dest);
    execSync(`cp -r ${source} ${filePath}`);
}

module.exports = {
    file, cp
};

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

window.localStorage.setItem('projectRootDirectory', '/Users/brandonpoe/Projects/gulp-demo');

module.exports = (location, data) => {
    const rootDir = window.localStorage.getItem('projectRootDirectory');
    const filePath = `${rootDir}/gulp_tasks/${location}`;
    mkdirp(path.dirname(filePath));
    fs.writeFileSync(filePath, data);
};

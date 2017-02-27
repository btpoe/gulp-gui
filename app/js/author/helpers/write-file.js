const fs = require('fs');

window.localStorage.setItem('projectRootDirectory', '/Users/brandonpoe/Projects/gulp-demo');

module.exports = (location, data) => {
    const rootDir = window.localStorage.getItem('projectRootDirectory');
    fs.writeFileSync(`${rootDir}/gulp_tasks/${location}`, data);
};

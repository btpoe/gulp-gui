const fs = require('fs');
const path = require('path');
const copyTemplates = require('./author/copy-templates');
const copyGulpfile = require('./author/copy-gulpfile');

const rootDir = window.localStorage.getItem('projectRootDirectory') || '/Users/brandonpoe/Projects/gulp-demo';

if (!fs.existsSync(path.join(rootDir, 'gulp_tasks'))) {
    copyTemplates();
}

copyGulpfile();

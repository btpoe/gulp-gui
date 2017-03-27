const fs = require('fs');
const path = require('path');
const write = require('./helpers/writeFile');
const app = require('../appSettings');

const ignoreFiles = [
    '\\.DS_Store',
    'config\\.json',
    'gulpfile\\.js',
];

module.exports = () => {
    write.cp(path.join(__dirname, 'templates'), './gulp_tasks', {
        filter: new RegExp(ignoreFiles.join('|')),
        backup: true,
    });
    write.file('gulpfile.js', app.defaultGulpFile, true);
};

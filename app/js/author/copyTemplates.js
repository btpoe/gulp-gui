const fs = require('fs');
const path = require('path');
const write = require('./helpers/writeFile');

const ignoreFiles = [
    '\\.DS_Store',
    'gulp_tasks/config.json',
];

module.exports = () => {
    write.cp(path.join(__dirname, 'templates'), './', {
        filter: new RegExp(ignoreFiles.join('|')),
        backup: true,
    });
};

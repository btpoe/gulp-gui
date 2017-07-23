const path = require('path');
const through = require('through2');

module.exports = () => {
    const fileList = [];
    let lastFile = null;

    return through.obj((file, enc, cb) => {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        lastFile = file;
        fileList.push(path.relative(process.cwd(), file.path));
        cb();
    }, function (cb) {
        this.push({
            path: 'file-list.txt',
            contents: new Buffer(fileList.join('\n')),
        });
        cb();
    });
};

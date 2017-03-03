const fs = require('fs');

module.exports = function (filePath) {
    const file = fs.readFileSync(filePath).toString();
    return file.split('\n')[0]
};

const write = require('./helpers/write-file');

module.exports = () => {
    write.cp(`${__dirname}/templates`, './gulp_tasks');
};

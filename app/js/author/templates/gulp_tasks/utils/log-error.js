module.exports = (err) => {
    const message = [err];

    if (err.name) {
        message.push(err.name);
    }
    if (err.loc && err.loc.file) {
        message.push(err.loc.file);
    } else if (err.file) {
        message.push(err.file);
    }
    if (err.snippet) {
        message.push(err.snippet);
    }

    console.log(message.join('\n'));
    if (typeof this.emit === 'function') {
        this.emit('end');
    }
};

const ansi = require('ansi-html-stream');

let listener = null;
let consoleLog = '';

module.exports = {
    set listener(value) {
        listener = value;
        if (!listener) return;
        listener.state.consoleLog = consoleLog;
    },

    get rawLog() {
        return consoleLog;
    },

    set rawLog(log) {
        consoleLog = log;
        if (!listener) return;
        listener.setState({ consoleLog });
    },

    get stream() {
        const currentStream = ansi({ chunked: true });

        currentStream.on('data', data => {
            this.rawLog += data.toString();
        });

        return currentStream;
    }
};

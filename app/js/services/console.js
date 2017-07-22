const ansi = require('ansi-html-stream');

let listener = null;

module.exports = {
    set listener(value) {
        listener = value;
        listener.state.consoleLog = '';
    },

    get rawLog() {
        return listener.state.consoleLog;
    },

    set rawLog(consoleLog) {
        listener.setState({ consoleLog })
    },

    get stream() {
        const currentStream = ansi({ chunked: true });
        currentStream.on('data', data => {
            this.rawLog += data.toString();
            console.log(data.toString());
        });

        return currentStream;
    }
};

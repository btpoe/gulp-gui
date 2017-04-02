const { resolve } = require('path');
const config = require('../config');

module.exports = function resolveEndpoint(type, task, endpoint = '') {
    if (Array.isArray(endpoint)) {
        return endpoint.map(resolveEndpoint.bind(null, type, task));
    }
    if (typeof endpoint === 'object') {
        return resolveEndpoint(type, task, endpoint[type]);
    }

    let ignored = false;
    if (endpoint[0] === '!') {
        endpoint = endpoint.substr(1);
        ignored = true;
    }
    const absolutePath = resolve(config.project[type], config[task][type], endpoint);
    return (ignored ? '!' : '') + absolutePath.replace(process.cwd() + '/', '');
};

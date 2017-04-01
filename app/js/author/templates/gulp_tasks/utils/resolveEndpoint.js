const { resolve, join} = require('path');
const config = require('../config');

module.exports = function resolveEndpoint(type, task, endpoint = '') {
    if (typeof endpoint === 'object') {
        return resolveEndpoint(type, task, endpoint[type]);
    }
    if (Array.isArray(endpoint)) {
        return endpoint.map(resolveEndpoint.bind(null, type, task));
    }

    let ignored = false;
    if (endpoint[0] === '!') {
        endpoint = endpoint.substr(1);
        ignored = true;
    }
    const relativePath = resolve(config.project[type], config[task][type], endpoint);
    return (ignored ? '!' : '') + join('.', relativePath);
};

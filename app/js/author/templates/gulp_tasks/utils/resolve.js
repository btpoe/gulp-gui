const path = require('path');
const config = require('../config');

module.exports = function resolve(type, task, endpoint = false) {
    function resolveEndpoint(src = '') {
        const relativePath = path.resolve(config.project[type], config[task][type], src);
        return path.join('./', relativePath);
    }

    if (typeof endpoint === 'object') {
        return resolve(type, task, endpoint[type]);
    }
    if (Array.isArray(endpoint)) {
        return endpoint.map(resolveEndpoint);
    }
    if (typeof endpoint === 'string') {
        return resolveEndpoint(endpoint);
    }
    return resolveEndpoint();
};

const path = require('path');
const config = require('../config');

module.exports = function(type, task, endpoint = false) {
    function resolveEndpoint(src = '') {
        const relativePath = path.resolve(config.project[type], config[task][type], src);
        return path.join('./', relativePath);
    }

    if (Array.isArray(endpoint)) {
        return endpoint.src.map(resolveEndpoint);
    }
    if (typeof endpoint === 'object') {
        return resolveEndpoint(endpoint[type]);
    }
    if (typeof endpoint === 'string') {
        return resolveEndpoint(endpoint);
    }

    return resolveEndpoint();
};

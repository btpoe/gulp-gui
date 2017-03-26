module.exports = function(config) {
    const deps = [];

    if (config.enabled) {
        deps.push('browser-sync');
    }

    return deps;
};

module.exports = function({
    enabled = false
}) {
    const deps = [];

    if (enabled) {
        deps.push('browser-sync');
    }

    return deps;
};

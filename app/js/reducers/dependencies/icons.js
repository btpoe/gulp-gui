module.exports = function(config) {
    const deps = [];

    if (config.enabled) {
        deps.push(
            'gulp-svgmin'
        );

        if (config.symbolPack) {
            deps.push(
                'gulp-svgstore'
            );
        }
    }

    return deps;
};

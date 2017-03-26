const _ = require('lodash');

module.exports = function(config) {
    const deps = [];

    if (config.enabled) {
        switch (config.engine) {
            case 'browserify':
                deps.push(
                    'gulp-flatmap',
                    'gulp-sourcemaps',
                    'browserify',
                    'browserify-incremental',
                    'vinyl-buffer',
                    'vinyl-source-stream'
                );

                switch (config.transpiler) {
                    case 'babel':
                    case 'buble':
                        deps.push(`${config.transpiler}ify`);
                        break;
                    case 'typescript':
                        deps.push('tsify');
                        break;
                }

                break;
            case 'rollup':
                deps.push(
                    'gulp-flatmap',
                    'gulp-sourcemaps',
                    'rollup-stream',
                    'vinyl-buffer',
                    'vinyl-source-stream'
                );

                _.get(config, 'engineSettings.plugins', []).forEach(plugin =>
                    deps.push(`rollup-plugin-${plugin}`)
                );

                switch (config.transpiler) {
                    case 'babel':
                    case 'buble':
                    case 'typescript':
                        deps.push(`rollup-plugin-${config.transpiler}`);
                        break;
                }

                break;

            case 'off':
                deps.push(
                    'gulp-sourcemaps',
                    'gulp-if'
                );

                if (config.transpiler !== 'off') {
                    deps.push(`gulp-${config.transpiler}`);
                }
                break;
        }
    }

    return deps;
};

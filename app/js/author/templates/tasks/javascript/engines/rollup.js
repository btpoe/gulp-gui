const config = require('../../../config').javascript;
const path = require('path');
const flatmap = require('gulp-flatmap');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup-stream');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const plugins = config.engineSettings.plugins.map(plugin =>
    require(`rollup-plugin-${plugin}`)()
);
plugins.push(
    require(`rollup-plugin-${config.transpiler}`)(config.transpilerSettings)
);

const endpointConfigs = {};

module.exports = function (gulpSrc) {
    return gulpSrc
        .pipe(flatmap((stream, file) => {
            if (!endpointConfigs[file.path]) {
                endpointConfigs[file.path] = {
                    entry: file.path,
                    sourceMap: true,
                    format: 'iife',
                    plugins,
                };
            }

            const endpointConfig = endpointConfigs[file.path];

            return rollup(endpointConfig)
                .on('bundle', bundle => {
                    endpointConfig.cache = bundle
                })
                .pipe(source(path.basename(file.path)))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }));
        }));
};

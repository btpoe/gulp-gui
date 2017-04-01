const path = require('path');
const flatmap = require('gulp-flatmap');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup-stream');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const {
    transpiler = 'off',
    transpilerSettings = {},
    engineSettings = {
        plugins: [],
        externalLibraries: []
    }
} = require('../../../config').javascript;

const external = engineSettings.externalLibraries.map(lib => lib.name);
const globals = engineSettings.externalLibraries.reduce((g, lib) => {
     g[lib.name] = lib.global;
     return g;
}, {});

function pluginConfig(name) {
    switch (name) {
        case 'node-resolve':
            return { skip: external };
        case transpiler:
            return transpilerSettings;
        default:
            return {}
    }
}

if (transpiler !== 'off') {
    engineSettings.plugins.push(transpiler);
}

const plugins = engineSettings.plugins.map(plugin =>
    require(`rollup-plugin-${plugin}`)(pluginConfig(plugin))
);

const endpointConfigs = {};

module.exports = function (gulpSrc) {
    return gulpSrc
        .pipe(flatmap((stream, file) => {
            if (!endpointConfigs[file.path]) {
                endpointConfigs[file.path] = {
                    entry: file.path,
                    dest: file.path,
                    sourceMap: true,
                    format: 'iife',
                    plugins,
                    external,
                    globals
                };
            }

            return rollup(endpointConfigs[file.path])
                .on('bundle', bundle => {
                    endpointConfigs[file.path].cache = bundle
                })
                .pipe(source(path.basename(file.path)))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }));
        }));
};

const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

const endpointConfigs = {};

module.exports = function(gulpSrc, endpoint) {
    const fileName = endpoint.src;

    if (!endpointConfigs[endpoint.src]) {
        endpointConfigs[endpoint.src] = {
            entry: endpoint.src,
            sourceMap: true,
            plugins: [
                nodeResolve({
                    extensions: ['.js', '.jsx'],
                }),
                commonjs(),
                buble(),
            ],
        };
    }

    return rollup(endpointConfigs[endpoint.src])
        .on('bundle', bundle => { endpointConfigs[endpoint.src].cache = bundle })
        .pipe(source(endpoint.src.split('/').pop()))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}));
};

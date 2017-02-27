const config = require('../config').javascript;

const tools = {};

switch(config.engine) {
    case 'Browserify':
        tools.engine = require('browserify');
        tools.engineHelpers = {
            browserifyInc: require('browserify-incremental'),
        };
        switch (config.transpiler) {
            case 'Babel':
                tools.enginePugins.push(
                    require('babelify')
                );
        }
        break;
    case 'Rollup':
        tools.engine = require('rollup-stream');
        tools.enginePugins = [
            require('rollup-plugin-node-resolve')(),
            require('rollup-plugin-commonjs')(),
        ];
        switch (config.transpiler) {
            case 'Buble':
                tools.enginePugins.push(
                    require('rollup-plugin-buble')()
                );
        }
        break;
    default:
        tools.engine = false;
}

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const createTask = require('../utils/create-task');

const endpointConfigs = {};

const runEngine = {
    Rollup(gulpSrc, endpoint) {
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
                    transpiler(),
                ],
            };
        }

        // rollup
        return tools.engine(endpointConfigs[endpoint.src])
            .on('bundle', bundle => { endpointConfigs[endpoint.src].cache = bundle })
    },
    Browserify(gulpSrc, endpoint) {
        const fileName = endpoint.src;

        Object.assign({}, defaults, config.advandcedSettings, browserifyInc.args);

        const bundle = browserify(browserifyInc.args);

        bundle.add(endpoint.src);

        bundle
            .transform(transpiler, { presets: ["es2015", "react"] })
            .transform('browserify-shim', { global: true });

        browserifyInc(bundle, {cacheFile: './gulp_tasks/.cache/javascript/' + (fileName.replace(/[\/\\.\-_]+/g, '-')) + '.json'});

        return bundler.bundle()
    },
};

module.exports = createTask({
    taskName: 'scripts',
    buildProcess(gulpSrc, endpoint) {
        return runEngine[config.engine](gulpSrc, endpoint)
            .pipe(source(endpoint.src.split('/').pop()))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
    },
    minifier: require('gulp-uglify'),
});

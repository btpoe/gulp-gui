const browserify = require('browserify');
const browserifyInc = require('browserify-incremental');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulpSrc, endpoint) {
    const fileName = endpoint.src;

    const engineSettings = Object.assign({}, defaults, config.engineAdvandcedSettings || {}, browserifyInc.args);

    const bundle = browserify(engineSettings);

    bundle.add(endpoint.src);

    bundle
        .transform(transpiler, { presets: ["es2015", "react"] })
        .transform('browserify-shim', { global: true });

    browserifyInc(bundle, {cacheFile: './gulp_tasks/.cache/javascript/' + (fileName.replace(/[\/\\.\-_]+/g, '-')) + '.json'});

    return bundle.bundle()
        .pipe(source(endpoint.src.split('/').pop()))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}));
};

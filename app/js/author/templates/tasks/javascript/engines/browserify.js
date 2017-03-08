const config = require('../../../config').javascript;
const path = require('path');
const flatmap = require('gulp-flatmap');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const browserifyInc = require('browserify-incremental');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

function getTranspiler(config) {
    if (config === 'babel') {
        return 'babelify';
    }
    if (config === 'buble') {
        return 'bubleify';
    }
    if (config === 'typescript') {
        return 'tsify';
    }
    return false;
}

module.exports = function (gulpSrc) {
    return gulpSrc
        .pipe(flatmap((stream, file) => {
            const bundle = browserify(browserifyInc.args);
            bundle.add(file.path);

            const transpiler = getTranspiler(config.transpiler);
            if (transpiler) {
                bundle.transform(transpiler, config.transpilerSettings)
            }

            if (config.engineSettings.plugins.contains('shim')) {
                bundle.transform('browserify-shim', { global: true });
            }

            browserifyInc(bundle, { cacheFile: './gulp_tasks/.cache/javascript/' + (file.path.replace(/[\/\\.\-_]+/g, '-')) + '.json' });

            return bundle.bundle()
                .pipe(source(path.basename(file.path)))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }));
        }));
};

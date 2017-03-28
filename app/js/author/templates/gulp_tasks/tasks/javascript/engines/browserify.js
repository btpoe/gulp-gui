const path = require('path');
const flatmap = require('gulp-flatmap');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const browserifyInc = require('browserify-incremental');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const {
    transpiler = 'off',
    transpilerSettings = {},
    engineSettings = { plugins: [] }
} = require('../../../config').javascript;

function getTranspiler() {
    switch (transpiler) {
        case 'babel':
        case 'buble':
            return `${transpiler}ify`;
        case 'typescript':
            return 'tsify';
    }
    return false;
}

module.exports = function (gulpSrc) {
    return gulpSrc
        .pipe(flatmap((stream, file) => {
            const bundle = browserify(browserifyInc.args);
            bundle.add(file.path);

            if (transpiler !== 'off') {
                const transpilerPlugin = getTranspiler();
                bundle.transform(transpilerPlugin, transpilerSettings)
            }

            if (engineSettings.plugins.contains('shim')) {
                bundle.transform('browserify-shim', { global: true });
            }

            browserifyInc(bundle, { cacheFile: './gulp_tasks/.cache/javascript/' + (file.path.replace(/\/\\\._/g, '-')) + '.json' });

            return bundle.bundle()
                .pipe(source(path.basename(file.path)))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }));
        }));
};

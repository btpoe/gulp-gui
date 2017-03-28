const config = require('../../../config').javascript;
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const transpiler = config.transpiler === 'off' ? false : require(`gulp-${config.transpiler}`);

module.exports = function(gulpSrc) {
    return gulpSrc
        .pipe(gulpIf(transpiler, transpiler && transpiler(config.transpilerSettings)));
};

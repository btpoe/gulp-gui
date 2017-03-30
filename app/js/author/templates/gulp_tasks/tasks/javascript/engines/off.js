const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');

const {
    transpiler = 'off',
    transpilerSettings = {},
} = require('../../../config').javascript;

const transpilerPlugin = transpiler === 'off' ? function() {} : require(`gulp-${transpiler}`);

module.exports = function(gulpSrc) {
    return gulpSrc
        .pipe(sourcemaps.init())
        .pipe(gulpIf(transpiler !== 'off', transpilerPlugin(transpilerSettings)));
};

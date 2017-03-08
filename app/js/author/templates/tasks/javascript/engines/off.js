const config = require('../../../config').javascript;
const sourcemaps = require('gulp-sourcemaps');
const transpiler = require(`gulp-${config.transpiler}`);

module.exports = function(gulpSrc) {
    return gulpSrc(config.transpilerSettings)
        .pipe(sourcemaps.init({loadMaps: true}));
};

const write = require('./helpers/write-file');

const gulpfile = `// Generated by Gulp GUI
const gulp = require('gulp');
const tasks = require('gulp_tasks');

const build = gulp.parallel(tasks.buildTasks);
const watch = gulp.parallel(tasks.watchTasks);

gulp.task('build', build);
gulp.task('default', build);
gulp.task('watch', watch);
`;

module.exports = () => {
    write.file('gulpfile.js', gulpfile, true);
};

const gulp = require('gulp');
const _ = require('lodash');
const through = require('through2');

function watchEndpoint(filePath, originalSources, taskLogic) {
    let oldSources = [];
    let watcher;

    function normalizeSources(sources) {
        const normal = new Set(sources.map(source =>
            path.resolve(path.dirname(filePath), source)
        ));
        normal.add(filePath);
        return Array.from(normal);
    }

    function identical(oldSources, currentSources) {
        const includes = arr => src => arr.includes(src);
        return oldSources.every(includes(currentSources)) && currentSources.every(includes(oldSources));
    }

    function compareSources(currentSources) {
        if (!identical(oldSources, currentSources)) {
            if (watcher) {
                watcher.close()
            }
            oldSources = currentSources;
            watcher = gulp.watch(currentSources)
                .on('change', watchLogic)
                .on('unlink', unlinkedFilePath => {
                    if (unlinkedFilePath === filePath && watcher) {
                        watcher.close();
                    }
                });
        }
    }

    function watchLogic() {
        taskLogic(filePath)
            .pipe(through.obj(function(file, enc, taskDone) {
                compareSources(normalizeSources(file.sourceMap.sources));
                this.push(file);
                taskDone();
            }));
    }

    compareSources(normalizeSources(originalSources));
}

module.exports = function(src, taskLogic) {
    let hasSources = false;
    let watcher;

    function checkForSources(filePath) {
        return taskLogic(filePath)
            .pipe(through.obj(function(file, enc, taskDone) {
                if (file.sourceMap) {
                    hasSources = true;
                    watchEndpoint(filePath, file.sourceMap.sources, taskLogic)
                }
                this.push(file);
                taskDone();
            }));
    }

    function createGlobalWatcher() {
        if (watcher) return;
        watcher = gulp.watch(src);

        if (hasSources) {
            watcher.on('add', checkForSources);
        } else {
            watcher.on('change', taskLogic)
        }
    }

    return function() {
        return gulp.src(src)
            .pipe(through.obj(function(file, enc, srcDone) {
                checkForSources(file.path)
                    .pipe(through.obj(function(file, enc, checkDone) {
                        createGlobalWatcher();
                        this.push(file);
                        checkDone();
                }));
                this.push(file);
                srcDone();
            }));
    }
};
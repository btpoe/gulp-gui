module.exports = function({
    enabled = false,
    engine = 'off',
    transpiler = 'off',
    engineSettings = {
        plugins: []
    }
}) {
    const deps = [];

    if (enabled) {
        deps.push('gulp-uglify');

        switch (engine) {
            case 'browserify':
                deps.push(
                    'gulp-flatmap',
                    'gulp-sourcemaps',
                    'browserify',
                    'browserify-incremental',
                    'vinyl-buffer',
                    'vinyl-source-stream'
                );

                if (Array.isArray(engineSettings.externalLibraries) && engineSettings.externalLibraries.length) {
                    deps.push('browserify-global-shim');
                }

                switch (transpiler) {
                    case 'babel':
                    case 'buble':
                        deps.push(`${transpiler}ify`);
                        break;
                    case 'typescript':
                        deps.push('tsify');
                        break;
                }

                break;
            case 'rollup':
                deps.push(
                    'gulp-flatmap',
                    'gulp-sourcemaps',
                    'rollup-stream',
                    'vinyl-buffer',
                    'vinyl-source-stream'
                );

                engineSettings.plugins.forEach(plugin =>
                    deps.push(`rollup-plugin-${plugin}`)
                );

                switch (transpiler) {
                    case 'babel':
                    case 'buble':
                    case 'typescript':
                        deps.push(`rollup-plugin-${transpiler}`);
                        break;
                }

                break;

            case 'off':
                deps.push(
                    'gulp-sourcemaps',
                    'gulp-if'
                );

                if (transpiler !== 'off') {
                    deps.push(`gulp-${transpiler}`);
                }
                break;
        }
    }

    return deps;
};

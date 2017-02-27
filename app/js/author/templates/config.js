require('dotenv').config();
const packageConfig = require('../package.json');

module.exports = {
    project: {
        name: packageConfig.name,
        domain: packageConfig.projectDomain,
        icon: './public/favicon-32x32.png',
        notificationTemplate(taskName) {
            return {
                title: this.name,
                message: `${taskName} compiled`,
                icon: this.icon,
                onLast: true,
            };
        },
    },
    styles: {
        src: [
            './assets/sass/**/*.scss',
            '!./assets/sass/@union/**/*.scss',
        ],
        watch: './assets/sass/**/*',
        dest: './public/css',
        minify: true,
    },
    javascript: {
        src: './assets/js/app.js',
        watch: './assets/js/**/*',
        dest: './public/js/app.js',
        minify: true,
        // settings
        rollupSettings: {
            format: 'iife',
        },
    },
    images: {
        baseSrcDir: './assets/img',
        src: './assets/img/**/*.{jpg,jpeg,png,svg,gif}',
        watch: './assets/img/**/*.{jpg,jpeg,png,svg,gif}',
        onlyCompileChangedFiles: true,
        dest: './public/img',
        minify: true,
        // settings
        minifySettings: {
            svgoPlugins: [
                { removeAttrs: false },
                { removeUselessDefs: false },
            ],
        },
    },
    icons: {
        src: './assets/icons/**/*.svg',
        watch: './assets/icons/**/*',
        dest: './public/img/icons',
        // settings
        minifySettings: {
            plugins: [{
                removeAttrs: {
                    attrs: '(id|class)',
                },
            }, {
                removeStyleElement: true,
            }, {
                collapseGroups: true,
            }],
        },
        svgStoreSettings: {
            inlineSvg: true,
        },
    },
    browserSync: {
        proxy: process.env.PROXY_DOMAIN,
        watch: [
            './craft/templates/**/*.twig',
            './public/**/*',
            '!./public/**/*.css',
            '!./public/**/*.map',
        ],
    },
};


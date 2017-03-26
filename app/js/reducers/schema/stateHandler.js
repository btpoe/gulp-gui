const project = require('./project');
const browserSync = require('./tasks/browserSync');
const icons = require('./tasks/icons');
const images = require('./tasks/images');
const javascript = require('./tasks/javascript');
const styles = require('./tasks/styles');

module.exports = formData => ({
    project: project(formData.project),
    browserSync: browserSync(formData.browserSync),
    icons: icons(formData.icons),
    images: images(formData.images),
    javascript: javascript(formData.javascript),
    styles: styles(formData.styles),
});

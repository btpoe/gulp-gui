const { app, BrowserWindow, Menu, dialog } = require('electron');
const devtools = require('electron-devtools-installer');
const menuTemplate = require('./menu-template');
const installExtension = devtools.default;
const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = devtools;

const menu = Menu.buildFromTemplate(menuTemplate);

installExtension(REACT_DEVELOPER_TOOLS, true)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

installExtension(REDUX_DEVTOOLS, true)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 930,
        height: 670,
        minWidth: 600,
        minHeight: 400,
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

app.on('open-project', () => {
    const response = dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: '~/'
    });

    if (response) {
        mainWindow.webContents.send('open-project', response[0]);
    }
});

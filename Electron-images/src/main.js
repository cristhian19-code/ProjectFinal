const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        frame: true,
        backgroundColor: '#2e2c29',
        resizable: false,
        movable: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile(__dirname + '/views/index.html');
});
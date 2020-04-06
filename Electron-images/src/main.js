const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ fullscreen: false, frame: true, backgroundColor: '#2e2c29', resizable: false, movable: false, transparent: true });
    mainWindow.loadFile(__dirname + '/views/index.html');
});
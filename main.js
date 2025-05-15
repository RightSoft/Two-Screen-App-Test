const { app, BrowserWindow, ipcMain } = require('electron');

let view1, view2;

app.whenReady().then(() => {
    const displays = require('electron').screen.getAllDisplays();
    const externalDisplay = displays.length > 1 ? displays[1] : displays[0];

    view1 = new BrowserWindow({
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    view2 = new BrowserWindow({
        x: externalDisplay.bounds.x,
        y: externalDisplay.bounds.y,
        width: 800,
        height: 600,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    view1.loadFile('view1.html');
    view2.loadFile('view2.html');

    // Handle request to change background of view2
    ipcMain.on('change-view2-color', (event, clickedItem) => {
        if (view2 && !view2.isDestroyed()) {
            view2.webContents.send('change-bg-color', clickedItem);
        }
    });
});

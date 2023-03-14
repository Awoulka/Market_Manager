const { app, BrowserWindow } = require('electron');
const path = require('path')


const mainWindow = () => {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
    // width: 800,
    // height: 600,
  });
  mainWindow.maximize();
  
  mainWindow.webContents.openDevTools();

  mainWindow.loadFile('ui/index.html');
};

app.whenReady().then(() => {
  mainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const request = require('request-promise-native');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

const tough = require('tough-cookie');

let mainWindow;

const cookiejar = request.jar();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(
      isDev ? 'http://localhost:3000' : `file://${path.join(__dirname,
          '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  electron.ipcMain.handle('fetch', async (event, args) => {
    console.log(args);
    return await request({
      url: args.url,
      method: args.method,
      body: args.body,
      headers: args.headers,
      resolveWithFullResponse: true,
      jar: cookiejar
    }).then(result => {
      if (result.headers['set-cookies']) {
        result.headers['set-cookies'].forEach(cookie => {
          cookiejar.setCookie(cookie, 'https://vrchat.com');
        });
      }
      return JSON.parse(result.body);
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

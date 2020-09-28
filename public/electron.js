const request = require('request-promise-native');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const unhandled = require('electron-unhandled');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const cookiejar = request.jar();

function createWindow() {
  unhandled();

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => (mainWindow = null));

  electron.ipcMain.handle('fetch', async (event, args) => {
    unhandled();

    if (args.storedCookies) {
      args.storedCookies.forEach((cookie) => {
        cookiejar.setCookie(cookie.value, cookie.url);
      });
    }

    return request({
      url: args.url,
      method: args.method,
      body: args.body,
      headers: args.headers,
      resolveWithFullResponse: true,
      jar: cookiejar,
    })
      .then((result) => {
        if (result.headers['set-cookies']) {
          result.headers['set-cookies'].forEach((cookie) => {
            cookiejar.setCookie(cookie, 'https://api.vrchat.cloud');
          });
        }
        return result;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  unhandled();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  unhandled();
  if (mainWindow === null) {
    createWindow();
  }
});

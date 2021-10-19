/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint @typescript-eslint/explicit-function-return-type: 0 */

const request = require('request-promise-native');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const unhandled = require('electron-unhandled');
const electronUpdater = require('electron-updater');
const electronLog = require('electron-log');
const autoUpdater = electronUpdater.autoUpdater;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  unhandled();

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 800,
    autoHideMenuBar: true,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
    },
    resizable: true,
    frame: false,
    backgroundColor: '#1A1A1A',
  });
  mainWindow
    .loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
    .finally();
  mainWindow.on('closed', () => (mainWindow = null));

  electron.ipcMain.handle('run', (event, args) => {
    switch (args) {
      case 'close': {
        return app.quit();
      }
      case 'maximize': {
        if (mainWindow.isMaximized()) {
          return mainWindow.unmaximize();
        }
        return mainWindow.maximize();
      }
      case 'minimize': {
        return mainWindow.minimize();
      }
      default:
      case 'restore': {
        return mainWindow.restore();
      }
    }
  });

  electron.ipcMain.handle('fetch', async (event, args) => {
    unhandled();
    const cookiejar = request.jar();

    if (args.storedCookies) {
      args.storedCookies.forEach((cookie) => {
        cookiejar.setCookie(cookie.value, cookie.url);
      });
    }

    const url = new URL(args.url);
    if (args.params) {
      args.params.forEach((o) => url.searchParams.set(o.key, o.value));
    }

    console.log((args.method || 'get').toUpperCase(), url.toString(), JSON.stringify(args.body || ''));
    if (args.headers) {
      Object.keys(args.headers).forEach((h) => console.log('Header:', h, '->', args.headers[h]));
    }

    return request({
      url: url.toString(),
      method: args.method,
      body: args.body,
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
        ...args.headers,
      },
      resolveWithFullResponse: true,
      jar: cookiejar,
    })
      .then((result) => {
        if (result.headers['set-cookies']) {
          result.headers['set-cookies'].forEach((cookie) => {
            cookiejar.setCookie(cookie, 'https://api.vrchat.cloud');
          });
        }
        return {
          type: 'entity',
          headers: result.headers,
          result: JSON.parse(result.body),
        };
      })
      .catch((e) => {
        return Promise.reject(e.message);
      });
  });
  autoUpdater.logger = electronLog;
  autoUpdater.checkForUpdatesAndNotify().finally();
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

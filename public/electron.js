/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint @typescript-eslint/explicit-function-return-type: 0 */

const request = require('request-promise-native');
const { app, Tray, Menu, BrowserWindow, ipcMain } = require('electron');
const unhandled = require('electron-unhandled');

const path = require('path');
const isDev = require('electron-is-dev');

const electronUpdater = require('electron-updater');
const electronLog = require('electron-log');

const Store = require('electron-store');
const store = new Store();

const autoUpdater = electronUpdater.autoUpdater;
autoUpdater.logger = electronLog;

let mainWindow;
let tray;

function createTray() {
  const appIcon = new Tray(path.join(__dirname, '../src/images', 'xsvrc-logo.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: 'Exit',
      click: function () {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  appIcon.on('double-click', function () {
    mainWindow.show();
  });
  appIcon.setToolTip('XSVRC - Manage your VRC');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

function createWindow() {
  try {
    const options = {
      icon: path.join(__dirname, '../src/images', 'xsvrc-logo.png'),
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
      show: false,
      ...store.get('winBounds'),
    };

    mainWindow = new BrowserWindow(options);

    mainWindow
      .loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
      .finally();
    mainWindow.on('closed', () => (mainWindow = null));
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });

    autoUpdater.autoInstallOnAppQuit = false;

    autoUpdater.signals.updateDownloaded(() => {
      mainWindow.webContents.send('update-downloaded');
    });
  } catch (e) {
    electronLog.log(e);
  }

  ipcMain.on('check-for-update', () => {
    autoUpdater.checkForUpdates().finally();
  });

  ipcMain.on('do-update', () => {
    autoUpdater.quitAndInstall(true, true);
  });

  ipcMain.handle('run', (event, args) => {
    switch (args) {
      case 'close': {
        return mainWindow.hide();
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
        return mainWindow.show();
      }
    }
  });

  ipcMain.handle('fetch', async (event, args) => {
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

    electronLog.log((args.method || 'get').toUpperCase(), url.toString(), JSON.stringify(args.body || ''));
    if (args.headers) {
      Object.keys(args.headers).forEach((h) => electronLog.log('Header:', h, '->', args.headers[h]));
    }

    return request({
      url: url.toString(),
      method: args.method,
      body: args.body,
      json: true,
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
          result: result.body,
        };
      })
      .catch((e) => {
        console.log(e.error);
        return Promise.resolve({
          type: 'error',
          error: e.error.error,
        });
      });
  });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isVisible() === false) {
        mainWindow.show();
      }
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
}

app.on('ready', createWindow);
app.whenReady().then(() => {
  tray = createTray();
});

app.on('before-quit', () => {
  store.set('winBounds', mainWindow.getBounds());
});

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

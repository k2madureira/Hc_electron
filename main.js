const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config');

//process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win;

function createWindow () {
  // Cria uma janela de navegação.
   const win = new BrowserWindow({
    title: 'HorusC',
    width: 1200,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    center: true,
    backgroundColor: '#001147',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    enableRemoteModule: true,
    //alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false
    }
  })

  //win.loadURL(`file://${__dirname}/index.html`);
  win.loadURL(config.url)
  //win.webContents.openDevTools()
}

function toggleDevTools() {
  win.webContents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady()
.then(createWindow)
.then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
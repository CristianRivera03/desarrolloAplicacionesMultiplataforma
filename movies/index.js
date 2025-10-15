// ARCHIVO MAIN
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })

  win.loadFile('index.html');

  ipcMain.on('button', (event, args) => {
    event.reply('btnReply', '¿cómo estás?')
  })
}

app.on('ready', () => {
  createWindow();

  // MAC
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// WINDOWS & LINUX
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
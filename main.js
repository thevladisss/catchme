
const {app, BrowserWindow} = require('electron')
const path = require('node:path')
const {promisify} = require('node:util')
const exec = promisify(require("child_process").exec);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  return win.loadURL('http://localhost:3030')
}

const bootServer = () => {
  return exec("cd server && npm run start")
}


app.whenReady().then(async () => {
  await bootServer()
  await createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

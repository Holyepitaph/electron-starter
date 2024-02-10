const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

  win.loadFile('index.html')
}
//Opens app when ready
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

//For mac but same as above
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//stops app when all windows close
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("convert-uuid", (event, uuid) => {
  const uuidV4ToHex = (uuid) => {
    const splitedStrings = uuid.split("-");
    return `X\`${splitedStrings[2]}${splitedStrings[1]}${splitedStrings[0]}${splitedStrings[3]}${splitedStrings[4]}\``;
  };

  event.returnValue = uuidV4ToHex(uuid);
});

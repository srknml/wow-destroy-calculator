const electron = require("electron");
const fetch = require('isomorphic-fetch');
const btoa = require('btoa');
require("electron-reload")(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`),
});
const { app, BrowserWindow, Menu, ipcMain } = electron;

function createWindow() {
  const win = new BrowserWindow({
    width: 960,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}
app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.on("key:input", (err, data) => {
  console.log(data);
});
const mainMenuTemplate = [
  {
    label: "Menuss",
    submenu: [{ label: "1" }, { label: "2" }],
  },
  {
    label: "Dev Tools",
    submenu: [
      {
        label: "Dev Tool",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "Reload",
        role: "reload",
        accelerator: process.platform !== "darwin" ? "Ctrl+R" : "Command+R",
      },
    ],
  },
];

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

Menu.setApplicationMenu(mainMenu);

ipcMain.on("key:newWin", () => {
  createWin();
});

function createWin() {
  let addWin = new BrowserWindow({
    width: 480,
    height: 360,
    title: "New Winssdsow",
  });
  addWin.loadFile("modal.html");
  addWin.on("close", () => {
    addWin = null;
  });
}

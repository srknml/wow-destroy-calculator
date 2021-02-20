const electron = require("electron");
const OauthClient = require("./OAuth/client");
const DataProvider = require("./Data/data");
const { OAuthConfig } = require("./OAuth/config");
const { userConfig } = require("./Data/userconfig");

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

const oauthClient = new OauthClient(OAuthConfig);
const dataProvider = new DataProvider(oauthClient, userConfig);

//Listens Update Button
ipcMain.on("Prices", async (event) => {
  await dataProvider.getConnectedRealmId(); //At the same time it gets token
  const currentPrices = await dataProvider.getAuctionHouseResponse();
  event.returnValue = currentPrices;
});

const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

//basic window boilerplate function
function createStartWindow() {
  //these settings are incredibly stupid and incredibly important so no touchy lmao
  const startWindow = new BrowserWindow({
    title: "Family Vine",
    height: "800",
    width: "1000",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2c2c2c",
      symbolColor: "#bc9e82",
      height: 29
    },
    webPreferences: {
      preload: isDev
        ? path.join(app.getAppPath(), "./public/preload.js") //pub folder for dev
        : path.join(app.getAppPath(), "./build/preload.js"), //build folder for prod
      worldSafeExecuteJavaScript: true, //should be bundled with Electron 12+ but just in case
      contextIsolation: true //not exposing our app to random javascript executions (see preload.js for ipc implementation)
    }
  });

  //remove application menu
  Menu.setApplicationMenu(null);

  //dev mode vs pack-app/build mode. it will run the same either way
  startWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  startWindow.setIcon(path.join(__dirname, "images/favicon.ico"));

  if (isDev) {
    startWindow.webContents.on("did-frame-finish-load", () => {
      startWindow.webContents.openDevTools({ mode: "detach" });
    });
  }
}

//promise to deliver electron app
app.whenReady().then(() => {
  createStartWindow();

  //ensure window is active
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createStartWindow();
    }
  });
});

//windows and linux exit handling
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//IPC handler just logs for now
ipcMain.on("send-db", (event, args) => {
  console.log("front-end sent:", args);
});

//these are just loggers anyways
ipcMain.on("log-reply", (event, args) => {
  console.log("\x1b[4m\x1b[34m%s\x1b[0m", "BACKEND-LOG:", args);
});

ipcMain.on("warn-reply", (event, args) => {
  console.log("\x1b[4m\x1b[33m%s\x1b[0m", "BACKEND-WARN:", args);
});

ipcMain.on("err-reply", (event, args) => {
  console.log("\x1b[4m\x1b[31m%s\x1b[0m", "BACKEND-ERR:", args);
});

ipcMain.on("fatal-reply", (event, args) => {
  console.log("\x1b[41m\x1b[4m\x1b[30m%s\x1b[0m", "BACKEND-FATAL:", args);
});

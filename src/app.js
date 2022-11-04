"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const config_json_1 = __importDefault(require("./config.json"));
function createMainWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: config_json_1.default.window_width,
        height: config_json_1.default.window_height,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadFile(`${__dirname}/html/index.html`);
}
function start() {
    electron_1.app.on("ready", () => {
        createMainWindow();
    });
    electron_1.app.on("window-all-closed", () => {
        // On Windows and Linux, the default behavior is to close the app when all windows are closed.
        // On macOS, the default behavior is to keep the app running until the user explicitly quits.
        if (process.platform !== "darwin") { // Darwin == macOS
            electron_1.app.quit(); // Implements the default behavior for Windows and Linux
        }
    });
    electron_1.app.on("activate", () => {
        // On MacOS, the default behavior is to re-create a window in the app when the dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
}
start();

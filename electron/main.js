const {
  app,
  BrowserWindow,
  globalShortcut,
  net,
  protocol,
} = require("electron");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const APP_PROTOCOL = "app";
const APP_HOST = "-";
const DEFAULT_DEV_URL = "http://localhost:3000";
const QUIT_SHORTCUT = "CommandOrControl+Shift+Alt+Q";

let mainWindow = null;
let allowClose = false;

const devServerUrl = process.env.ELECTRON_START_URL?.trim() || null;
const useDevServer = Boolean(devServerUrl);
const canOpenDevTools = useDevServer && !app.isPackaged;

protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_PROTOCOL,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      corsEnabled: true,
    },
  },
]);

app.disableHardwareAcceleration();

if (process.platform === "linux") {
  app.commandLine.appendSwitch("no-sandbox");
  app.commandLine.appendSwitch("disable-dev-shm-usage");
}

function getOutDir() {
  return path.join(app.getAppPath(), "out");
}

function hasFileExtension(filePath) {
  return path.extname(filePath) !== "";
}

function ensureWithinOutDir(candidatePath) {
  const outDir = path.resolve(getOutDir());
  const resolvedPath = path.resolve(candidatePath);

  if (resolvedPath === outDir || resolvedPath.startsWith(`${outDir}${path.sep}`)) {
    return resolvedPath;
  }

  return null;
}

function resolveStaticFile(requestPathname) {
  const outDir = getOutDir();
  const normalizedPathname = decodeURIComponent(requestPathname || "/");
  const strippedPath = normalizedPathname.replace(/^\/+/, "");
  const fileCandidates = [];

  if (!strippedPath) {
    fileCandidates.push(path.join(outDir, "index.html"));
  } else if (hasFileExtension(strippedPath)) {
    fileCandidates.push(path.join(outDir, strippedPath));
  } else {
    fileCandidates.push(path.join(outDir, strippedPath, "index.html"));
    fileCandidates.push(path.join(outDir, `${strippedPath}.html`));
  }

  for (const candidate of fileCandidates) {
    const safePath = ensureWithinOutDir(candidate);

    if (safePath && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
      return safePath;
    }
  }

  const fallback404 = ensureWithinOutDir(path.join(outDir, "404.html"));
  if (fallback404 && fs.existsSync(fallback404)) {
    return fallback404;
  }

  return null;
}

function getAllowedOrigins() {
  if (useDevServer) {
    try {
      return [new URL(devServerUrl).origin];
    } catch {
      return [new URL(DEFAULT_DEV_URL).origin];
    }
  }

  return [`${APP_PROTOCOL}://${APP_HOST}`];
}

function isAllowedNavigation(targetUrl) {
  try {
    const target = new URL(targetUrl);
    return getAllowedOrigins().includes(target.origin);
  } catch {
    return false;
  }
}

async function registerStaticProtocol() {
  if (useDevServer) {
    return;
  }

  protocol.handle(APP_PROTOCOL, (request) => {
    const url = new URL(request.url);
    const filePath = resolveStaticFile(url.pathname);

    if (!filePath) {
      return new Response("Not found", { status: 404 });
    }

    return net.fetch(pathToFileURL(filePath).toString());
  });
}

function registerKioskProtection(window) {
  window.webContents.on("before-input-event", (event, input) => {
    const key = input.key.toLowerCase();
    const commandOrControl = input.control || input.meta;
    const blockReload = key === "f5" || (commandOrControl && key === "r");
    const blockDevTools =
      key === "f12" || (commandOrControl && input.shift && key === "i");
    const blockQuit =
      (input.alt && key === "f4") || (commandOrControl && key === "q");

    if (blockReload || blockDevTools || blockQuit) {
      event.preventDefault();
    }
  });

  window.webContents.on("context-menu", (event) => {
    event.preventDefault();
  });

  window.webContents.on("will-navigate", (event, targetUrl) => {
    if (!isAllowedNavigation(targetUrl)) {
      event.preventDefault();
    }
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedNavigation(url)) {
      return { action: "allow" };
    }

    return { action: "deny" };
  });

  if (!canOpenDevTools) {
    window.webContents.on("devtools-opened", () => {
      window.webContents.closeDevTools();
    });
  }

  window.on("close", (event) => {
    if (!allowClose) {
      event.preventDefault();
    }
  });
}

async function loadRenderer(window) {
  if (useDevServer) {
    const targetUrl = devServerUrl || DEFAULT_DEV_URL;
    await window.loadURL(targetUrl);
    return;
  }

  await window.loadURL(`${APP_PROTOCOL}://${APP_HOST}/index.html`);
}

async function createMainWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1920,
    height: 1080,
    backgroundColor: "#000000",
    fullscreen: true,
    kiosk: true,
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      devTools: canOpenDevTools,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.removeMenu();
  registerKioskProtection(mainWindow);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setFullScreen(true);
  });

  mainWindow.webContents.on("did-fail-load", (_event, code, description, url) => {
    console.error("FAILED LOAD:", code, description, url);
  });

  mainWindow.webContents.on(
    "render-process-gone",
    (_event, details) => {
      console.error("Renderer process exited:", details);
    },
  );

  await loadRenderer(mainWindow);

  if (canOpenDevTools) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

app.on("before-quit", () => {
  allowClose = true;
});

app.whenReady().then(async () => {
  globalShortcut.register("CommandOrControl+R", () => {});
  globalShortcut.register("F5", () => {});
  globalShortcut.register("F12", () => {});
  globalShortcut.register("CommandOrControl+Shift+I", () => {});
  globalShortcut.register("CommandOrControl+Q", () => {});
  globalShortcut.register(QUIT_SHORTCUT, () => app.quit());

  try {
    await registerStaticProtocol();
    await createMainWindow();
  } catch (error) {
    console.error("Electron kiosk boot failed:", error);
    allowClose = true;
    app.quit();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow().catch((error) => {
      console.error("Electron kiosk re-open failed:", error);
      allowClose = true;
      app.quit();
    });
  }
});

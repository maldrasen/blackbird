// Add this require() at the top of server.js alongside the existing globals,
// or rely on the fact that Electron is already a global in main.js.
//
// The path and fs modules are available in the main process via Node.
const path = require('path');
const fs   = require('fs');

// ---------------------------------------------------------------------------
// Add these two Browser.receive() calls inside Server.init(), alongside the
// existing 'boot.start' handler.
// ---------------------------------------------------------------------------

// Opens a native file-picker dialog and, if the player selects a valid image,
// copies it into DATA/portraits/ and returns the filename. The renderer can
// then build a full file:// path using the DATA global it already has.
Browser.receive('portrait.select', async (event) => {
  const { dialog } = Electron;

  const result = await dialog.showOpenDialog({
    title:       'Select Character Portrait',
    buttonLabel: 'Use Portrait',
    filters:     [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }],
    properties:  ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true };
  }

  const sourcePath  = result.filePaths[0];
  const extension   = path.extname(sourcePath).toLowerCase();
  const filename    = `${Date.now()}${extension}`;
  const portraitDir = path.join(DATA, 'portraits');
  const destPath    = path.join(portraitDir, filename);

  fs.mkdirSync(portraitDir, { recursive: true });
  fs.copyFileSync(sourcePath, destPath);

  return { canceled: false, filename };
});

// Deletes a portrait file from DATA/portraits/. Called when a portrait is
// replaced or cleared so we don't accumulate orphaned files.
Browser.receive('portrait.delete', (event, filename) => {
  if (!filename) { return; }

  // Sanitize: reject anything that tries to path-traverse out of portraits/.
  const basename = path.basename(filename);
  if (basename !== filename) {
    throw new Error(`Invalid portrait filename: ${filename}`);
  }

  const portraitPath = path.join(DATA, 'portraits', basename);

  if (fs.existsSync(portraitPath)) {
    fs.unlinkSync(portraitPath);
  }
});

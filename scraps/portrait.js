// application/helpers/portrait.js
//
// Client-side helper for selecting and managing character portraits.
// Portraits are stored in DATA/portraits/ (userData on disk) and referenced
// on the character by filename only, so save files stay portable as long as
// the userData directory travels with them.
//
// Usage:
//   const filename = await Portrait.select(character.portraitFilename);
//   character.portraitFilename = filename;
//
//   // To render:
//   imgElement.src = Portrait.url(character.portraitFilename);

global.Portrait = (function() {

  // Returns the full file:// URL for a portrait filename, or null if none is set.
  // Use this wherever you need to set an <img> src.
  function url(filename) {
    if (!filename) { return null; }
    return `file://${DATA}/portraits/${filename}`;
  }

  // Opens the native file picker. If the player picks an image it is copied
  // into userData/portraits/ and the new filename is returned. If the player
  // already had a portrait, the old file is deleted.
  //
  // Returns the new filename string, or null if the dialog was canceled.
  async function select(previousFilename = null) {
    const result = await Electron.ipcRenderer.invoke('portrait.select');

    if (result.canceled) { return null; }

    // Clean up the old portrait now that we have a replacement.
    if (previousFilename) {
      await deletefile(previousFilename);
    }

    return result.filename;
  }

  // Deletes a portrait from disk. Call this when clearing a portrait without
  // replacing it, e.g. a "Remove Portrait" button.
  async function deletefile(filename) {
    if (!filename) { return; }
    await Electron.ipcRenderer.invoke('portrait.delete', filename);
  }

  return Object.freeze({
    url,
    select,
    delete: deletefile,
  });

})();

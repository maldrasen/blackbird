global.StateRecorder = function(filepath) {
  const $filepath = filepath;

  function loadState() {
    return new Promise(resolve => {
      fs.exists($filepath, exists => {
        if (!exists) { return resolve(null); }
        FileHelper.readJSON($filepath).then(data => {
          resolve(data);
        });
      });
    });
  }

  function saveState(data) {
    if (data) { return FileHelper.writeJSON($filepath, data); }
  }

  return Object.freeze({
    loadState,
    saveState,
  });
}

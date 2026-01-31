window.Electron = require("electron")
window.fs = require("fs");

Electron.ipcRenderer.invoke("boot.start");

Electron.ipcRenderer.on("boot.setContext", (event, context) => {
  window.ROOT = context.ROOT;
  window.DATA = context.DATA;
  window.Environment = context.Environment;
  Loader.startLoading();
});

window.Loader = (function() {

  // We load the client by reading the manifest.json file in the application
  // directory. This file must be present and should include all the javascript
  // files of the wrapped application.
  function startLoading() {
    try {
      appendItem(`Loading from ${ROOT}/application`);
      const manifest = require(`${ROOT}/manifest.json`);
      loadAll(manifest.fileList).then(finishLoading);
    }
    catch(error) {
      appendError(error);
    }
  }

  // The finishLoading() function cleans out the document, removing any
  // messages that were appended to the document while loading and removes the
  // temporary style tag. We then call the Main() function which should have
  // been loaded by one of the manifest files.
  function finishLoading() {
    try {
      resetDocument();
      boot();
    } catch(error) {
      console.error("!!! Error invoking Main() !!!");
      console.error(error);
    }
  }

  async function boot() {
    try {
      MainContent.loadStyles();
      MainContent.loadMainContent();

      Views.initAll();
      await WorldState.loadState();
      MainMenu.openFully();

      if (Environment.isDevelopment) {
        Tests.load();
      }

      log("Blackbird Started",{ system:'Main', data:{
        environment: Environment.name,
      }});
    }
    catch(error) {
      logError("Error booting main", error, { system:'Main' });
    }
  }

  // Load all files in the manifest.json file. We use async/await here because
  // these files are imported sequentially. Promise.all() would load all of
  // these files in parallel which would sometimes blow up if there are
  // dependencies between files.
  function loadAll(fileList) {
    return new Promise(async resolve => {
      appendItem(`Importing ${fileList.length} source files`);

      for (const file of fileList) {
        appendItem(`    - ${file}`);
        try {
          await import(`../${file}`);
        } catch(error) {
          return appendError(error.message);

        }
      }

      // This is some nasty ass shit, but without some kind of fade to black here we see some annoying flashing when
      // the application loads as the temporary loading html is replaced with the actual application html. This adds
      // a second to the boot time, but it looks nicer with the delay.
      setTimeout(() => {
        let cover = document.querySelector('#loadingCover');
        cover.style.opacity = 1;
        setTimeout(()=>{
          cover.style.opacity = 0;
          setTimeout(()=>{ cover.remove(); },600)
          resolve();
        },500);
      },1000);
    });
  }

  // As we load the client we use the HTML document like a console, so if
  // something breaks during load it's obvious even when packaged into an exe.

  function appendItem(content) {
    const element = document.createElement("li");
    element.innerHTML = `<pre>${content}</pre>`;
    document.querySelector("#fileList").append(element)
  }

  function appendError(error) {
    const element = document.createElement("li");
    element.style.color = "rgb(200,100,100)";
    element.innerHTML = `<pre>ERROR: ${error}</pre>`;
    document.querySelector("#fileList").append(element)
  }

  function resetDocument() {
    document.querySelector("#fileList").remove();
    const style = document.getElementsByTagName('style')[0];
    style.parentNode.removeChild(style);
  }

  return {
    startLoading,
  }

})();

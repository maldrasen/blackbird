global.APP = `${ROOT}/application`;

global.Main = async function() {
  try {
    // await MainContent.loadDependencies();
    // MainContent.loadStyles();
    // MainContent.loadMainContent();
    //
    // Models.init();
    // Elements.initAll();
    // Components.initAll();
    //
    // await WorldState.loadState();
    //
    // MainMenu.openFully();
    // KeyboardMonitor.start();
    //
    // if (Environment.isDevelopment) {
    //   Tests.load();
    // }
    //
    // log("Chalcedony Started",{ system:'Main', data:{
    //   environment: Environment.name,
    // }});
  }
  catch(error) {
    logError("Error booting main", error, { system:'Main' });
  }
}

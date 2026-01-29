
global.Main = async function() {
  try {
    MainContent.loadStyles();
    MainContent.loadMainContent();

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


    console.error(error)

    // logError("Error booting main", error, { system:'Main' });
  }
}

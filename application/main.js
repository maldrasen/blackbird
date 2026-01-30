
global.Main = async function() {
  try {
    MainContent.loadStyles();
    MainContent.loadMainContent();

    Elements.initAll();
    Visions.initAll();

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

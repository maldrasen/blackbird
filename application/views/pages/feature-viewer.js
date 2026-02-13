global.FeatureViewer = (function(){

  // The FeatureViewer can only be rendered once, and only in the fixtures, so registering events here is fine.
  function show() {
    MainContent.setMainContent("views/feature-viewer.html");

    X.onClick('#featureViewer .generate-feature', generateFeature);
  }

  function generateFeature(event) {
    const featureType = event.target.dataset.feature;

    clear()
    if (featureType === 'random') {
      return buildRandomFeature();
    }
  }

  function clear() {
    X.empty('#viewOverlay');
    X.fill('#viewOverlay', X.copyElement('#templates .feature'));
  }

  function buildRandomFeature() {
    const floor = FloorFactory.build(Random.between(1,10));
    const theme = DungeonTheme.lookup(floor.getTheme());
    const feature = theme.getRandomFeature();
    const rooms = feature.getRooms();
    const doors = feature.getDoors();
    const bounds = feature.calculateBounds(feature);

    X.fill('#viewOverlay .level',floor.getLevel());
    X.fill('#viewOverlay .theme',theme.getName());
    X.fill('#viewOverlay .footprint',getFootprintText(rooms,bounds));

    rooms.forEach(room => {
      X.fill('#viewOverlay .rooms',X.createElement(`<li class='room'><pre>  - ${room.inspect()}</pre></li>`));
    });
  }


  function getFootprintText(rooms, bounds) {
    let text = "";

    // TODO: This will need to loop through the bounds and figure out which room if any has a tile in that position.
    for (let y=bounds.yMax; y>0; y--) {
      for (let x=0; x<bounds.xMax; x++) {
        let tile = '.';

        for (let r=0; r<rooms.length; r++) {
          if (rooms[r].containsTile(x,y)) {
            tile = '#';
          }
        }

        // If a room contains this tile then print the room index.
        text += tile;
      }
      text += `\n`;
    }

    return text
  }

  return Object.freeze({
    show
  });

})();

global.FeaturePlacer = function() {

  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());
  const floorHeight = floor.getFloorHeight();
  const floorWidth = floor.getFloorWidth();
  const grid = buildGrid();

  function buildGrid() {
    const g = new Array(floorHeight);
    for (let y=0; y<floorHeight; y++) { g[y] = new Array(floorWidth); }
    return g;
  }

  // This feature placer builds a super dense dungeon. We randomly add features to the dungon, randomizing their
  // positions and checking to see if they fit. Once 1000 features fail to fit into the dungeon we stop trying to add
  // more features. Probably the least efficient way to do this, but still fast enough to not be noticible.
  function packFeatures() {
    const features = [];
    let guard = 0
    let index = 0;

    while(guard < 1000) {
      const feature = theme.getRandomFeature();
      setRandomPosition(feature);

      if (featureCanFit(feature)) {
        feature.setIndex(index);
        placeFeature(index, feature);
        features.push(feature);
        index += 1;
      }
      else {
        guard += 1;
      }
    }

    checkIndices(features);

    return [features, grid];
  }

  // Double check to make sure I added the features to the array with the correct indices.
  function checkIndices(features) {
    for (let i=0; i<features.length; i++) {
      if (features[i].getIndex() !== i) {
        throw new Error(`The feature index ${features[i].getIndex()} did not match the array index ${i}`);
      }
    }
  }

  function setRandomPosition(feature) {
    const bounds = feature.getBounds();
    const xPos = Random.between(0,floorWidth - bounds.xMax);
    const yPos = Random.between(0,floorHeight - bounds.yMax);
    feature.setPosition(xPos,yPos);
  }

  function featureCanFit(feature) {
    const rooms = feature.getRooms();

    for (let i=0; i<rooms.length; i++) {
      if (boxCanFit(feature.getPosition(), rooms[i].getMainBox()) === false) { return false; }
      if (boxCanFit(feature.getPosition(), rooms[i].getSubBox()) === false) { return false; }
    }

    return true;
  }

  function boxCanFit(position, box) {
    if (box != null) {
      const xMin = position.x + box.x;
      const xMax = position.x + box.x + box.width;
      const yMin = position.y + box.y;
      const yMax = position.y + box.y + box.height;

      for (let y=yMin; y<yMax; y++) {
        for (let x=xMin; x<xMax; x++) {
          if (grid[y][x] != null) { return false; }
        }
      }
    }

    return true;
  }

  function placeFeature(index, feature) {
    feature.getRooms().forEach(room => {
      placeBox(index, feature.getPosition(), room.getMainBox());
      placeBox(index, feature.getPosition(), room.getSubBox());
    });
  }

  function placeBox(index, position, box) {
    if (box != null) {
      const xMin = position.x + box.x;
      const xMax = position.x + box.x + box.width;
      const yMin = position.y + box.y;
      const yMax = position.y + box.y + box.height;

      for (let y=yMin; y<yMax; y++) {
        for (let x=xMin; x<xMax; x++) {
          grid[y][x] = index;
        }
      }
    }
  }

  return Object.freeze({
    packFeatures,
  });
}

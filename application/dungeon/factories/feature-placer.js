global.FeaturePlacer = function() {
  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());
  const floorWidth = floor.getFloorWidth();
  const floorHeight = floor.getFloorHeight();
  const grid = floor.getFloorGrid();
  const features = [];

  // This feature placer builds a super dense dungeon. We randomly add features to the dungeon, randomizing their
  // positions and checking to see if they fit. Once 1000 features fail to fit into the dungeon we stop trying to add
  // more features. Probably the least efficient way to do this, but still fast enough to not be noticeable.
  function packFeatures() {
    let guard = 0

    if (floor.getLevel() === 1) {
      placeFeature(dungeonEntrance());
    }

    if (shouldSpawnFont()) {
      placeFeature(manaFont());
    }

    while(guard < 1000) {
      const feature = theme.getRandomFeature();
      setRandomPosition(feature);

      if (featureCanFit(feature)) {
        placeFeature(feature);
      } else {
        guard += 1;
      }
    }

    checkIndices();

    return [features, grid];
  }

  // Double check to make sure I added the features to the array with the correct indices.
  function checkIndices() {
    for (let i=0; i<features.length; i++) {
      if (features[i].getIndex() !== i) {
        throw new Error(`The feature index ${features[i].getIndex()} did not match the array index ${i}`);
      }
    }
  }

  // The dungeon entrance always appears in the same orientation with a door on its east wall. It's pinned flush
  // against the west boundary of the floor so that it should always be able to connect to something.
  function dungeonEntrance() {
    const entrance = FeatureType.lookup('dungeon-entrance').buildFeature();
    entrance.setPosition(0, Random.between(0, floorHeight - entrance.getBounds().yMax));
    return entrance;
  }

  function shouldSpawnFont() {
    if (floor.getLevel() === 1) { return true; }
    if (DungeonState.canGenerateFont(floor.getLevel()) === false) { return false; }
    return Random.roll(100) < DungeonConstants.fontChance;
  }

  function manaFont() {
    const font = FeatureType.lookup('mana-font').buildFeature();
    do {
      setRandomPosition(font);
    } while (featureCanFit(font) === false);
    return font;
  }

  function setRandomPosition(feature) {
    const bounds = feature.getBounds();
    const xPos = Random.between(0,floorWidth - bounds.xMax);
    const yPos = Random.between(0,floorHeight - bounds.yMax);
    feature.setPosition(xPos,yPos);
  }

  function featureCanFit(feature) {
    const featurePosition = feature.getPosition();
    const rooms = feature.getRooms();

    for (let i=0; i<rooms.length; i++) {
      const roomPosition = rooms[i].getPosition();
      const position = { x: featurePosition.x + roomPosition.x, y: featurePosition.y + roomPosition.y };
      const footprint = rooms[i].getFootprint();
      for (let y=0; y<footprint.length; y++) {
        for (let x=0; x<footprint[y].length; x++) {
          if (footprint[y][x] != null && grid[position.y + y][position.x + x] != null) { return false; }
        }
      }
    }

    return true;
  }

  // The grid cells hold the room's floor-global index, as rooms are the unit of navigation.
  function placeFeature(feature) {
    floor.addFeature(feature);
    features.push(feature);

    feature.getRooms().forEach(room => {
      const position = room.getFloorPosition();
      const index = room.getIndex();

      room.getFootprint().forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell != null) { grid[position.y + y][position.x + x] = index; }
        });
      });
    });
  }

  return {
    packFeatures,
  };
}

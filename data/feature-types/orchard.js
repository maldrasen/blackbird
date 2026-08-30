FeatureType.register('orchard', {
  build: function(options) {
    const feature = Feature('orchard');
    const room = Room(feature);
    const width = Random.between(options.size[0], options.size[1]);
    const height = Random.between(options.size[0], options.size[1]);

    room.setBounds(width, height);
    room.addBox(0, 0, width, height);
    room.setContents(findOrchardContents(), { size:width * height });

    Random.flipCoin() ?
      addTreeRows(room, width, height) :
      addTreeCols(room, width, height);

    feature.addRoom(room);
    return feature;
  }
});

// The Orchard's contents should always have an episode. Contents other than orchard-empty start episodes that rely on
// game state flags, so they can only be placed once per floor.
function findOrchardContents() {
  const placed = DungeonSystem.getDungeonFloor().getPlacedContents();
  const possible = ['orchard-empty','orchard-kobolds'];

  return Random.from(possible.filter(code => {
    if (code !== 'orchard-empty' && placed.has(code)) { return false; }
    return Episode.lookup(RoomContents.lookup(code).getEpisode()).meetsRequirements();
  }));
}

function addTreeRows(room, width, height) {
  for (let yy=0; yy < height; yy++) {
    for (let xx=0; xx < (width*2)-1; xx++) {
      const x = 0.5 + xx/2;
      const y = 0.5 + yy;
      room.addGlyph({ x:x, y:y, glyph:'✽', color:Random.from(DungeonConstants.treeColors), size:Random.between(50,80) });
    }
  }
}

function addTreeCols(room, width, height) {
  for (let xx=0; xx < width; xx++) {
    for (let yy=0; yy < (height*2)-1; yy++) {
      const x = 0.5 + xx;
      const y = 0.5 + yy/2;
      room.addGlyph({ x:x, y:y, glyph:'✽', color:Random.from(DungeonConstants.treeColors), size:Random.between(50,80) });
    }
  }
}

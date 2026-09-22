FeatureType.register('orchard', {
  build: function(options) {
    const feature = Feature('orchard');
    const room = Room(feature);

    if (options.size[0] % 2 === 0 || options.size[1] % 2 === 0) {
      throw new Error(`An orchard's minimum and maximum size should be odd numbers.`); }

    let width = Random.between(options.size[0], options.size[1]);
    let height = Random.between(options.size[0], options.size[1]);

    if (width % 2 === 0) { width++; }
    if (height % 2 === 0) { height++; }

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

// Contents other than orchard-empty start episodes that rely on game state flags, so they can only be placed once per
// floor. Contents without an episode are always eligible.
function findOrchardContents() {
  const placed = DungeonSystem.getDungeonFloor().getPlacedContents();
  const possible = ['orchard-empty','orchard-kobolds'];

  return Random.from(possible.filter(code => {
    const episode = RoomContents.lookup(code).getEpisode();
    if (episode == null) { return true; }
    if (placed.has(code)) { return false; }
    return Episode.lookup(episode).meetsRequirements();
  }));
}

function addTreeRows(room, width, height) {
  for (let y=1; y < height-1; y+=2) {
    for (let x=1; x < width-1; x++) {
      plantTree(room, x, y);
    }
  }
}

function addTreeCols(room, width, height) {
  for (let x=1; x < width-1; x+=2) {
    for (let y=1; y < height-1; y++) {
      plantTree(room, x, y);
    }
  }
}

function plantTree(room, x, y) {
  room.setTileContents(x, y, {
    canEnter: false,
    shadow: true,
    glyph: { glyph:'✽', color:Random.from(DungeonConstants.treeColors), size:Random.between(120,180) },
  });
}

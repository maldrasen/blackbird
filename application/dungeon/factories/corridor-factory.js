global.CorridorFactory = function(grid) {
  const floor = DungeonSystem.getDungeonFloor();
  const features = floor.getFeatures();

  // Create a corridor that goes between these two features.
  function digBetween(first, second) {
    const originFeature = features[first];
    const targetFeature = features[second];

    console.log("=== Dig Between ===")
    console.log(`[${first}]`, originFeature.getLocation());
    console.log(`[${second}]`,targetFeature.getLocation());

    // We need to first find which cell to start digging at. If the target feature is above this one we should pick an
    // empty cell above the top most box. Or if the target feature is to the west we need to pick a cell along the left
    // hand side.

    // We then pick a target cell. Pretty much the exact opposite of finding an origin cell. Just need to pick an empty
    // cell in the direction of the other feature.

    // With two empty cells we can then find a path between the two. Path should be an L shape. If we can't find a
    // solution with an L shaped corridor, maybe give up on connecting these features, add them to a black list and
    // find the next closest? That or we add a "three box" room.

    // The corridor itself should be a feature. It gets added to the feature list. We add two doors for it as well.
    // We need to add the two new edges to the connectivity tree and rebuild the spanning forest. Loop until there are
    // no disconnected trees.

    return {
      feature: null,
      doors: [],
    }
  }

  return Object.freeze({
    digBetween
  });

}

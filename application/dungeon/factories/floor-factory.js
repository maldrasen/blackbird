global.FloorFactory = function() {
  const floor = DungeonSystem.getDungeonFloor();

  function buildFloor() {
    const [features, grid] = FeaturePlacer().packFeatures();
    floor.setFeatures(features);

    Console.log(`Created a Dungeon Floor [level:${floor.getLevel()}/${floor.getTheme()}] - Features:${features.length}`);

    const doors = DoorFinder(grid).execute();
  }

  return Object.freeze({
    buildFloor,
  });

};

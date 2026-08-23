global.RoomContentPlacer = function(contents=null) {
  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());
  const available = [...(contents || theme.getRoomContents())];

  const rarityWeights = {
    [Rarity.common]: 200,
    [Rarity.unusual]: 50,
    [Rarity.rare]: 16,
    [Rarity.astonishing]: 4,
    [Rarity.unheardOf]: 1,
  };

  const rarityOrder = Object.keys(rarityWeights);

  // Each contents code is placed at most once per floor. Some contents will start an episode that can only happen
  // once, so the same contents should never be in two rooms on the same floor.
  function placeContents() {
    const chance = theme.getRoomContentChance();

    getEligibleRooms().forEach(room => {
      if (available.length === 0) { return; }
      if (Random.roll(100) >= chance) { return; }

      const entry = pickContents(available);
      if (entry == null) { return; }

      room.setContents(entry.code);
      available.splice(available.indexOf(entry), 1);
    });
  }

  // TODO: No features have contents yet, but eventually some features will have rooms with preset content. If any
  //       room in a feature record has content then the placer shouldn't place randomized content into it.

  // TODO: Should a room have a "can content be added here" function? Do rooms know if they contain stairs. The need
  //       to, because the room description should mention the giant staircase.

  function getEligibleRooms() {
    const stairs = [...floor.getStairs('up'), ...floor.getStairs('down')];

    return floor.getRooms().filter(room =>
      floor.getFeatureForRoom(room.getIndex()).getType() !== 'corridor' &&
      stairs.includes(room.getIndex()) === false);
  }

  function pickContents() {
    const rolled = rarityOrder.indexOf(Random.fromFrequencyMap(rarityWeights));

    for (let tier=rolled; tier>=0; tier--) {
      const candidates = available.filter(entry => entry.rarity === rarityOrder[tier]);
      if (candidates.length > 0) { return Random.from(candidates); }
    }

    return null;
  }

  return { placeContents };
};

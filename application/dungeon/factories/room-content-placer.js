global.RoomContentPlacer = function(contents=null) {
  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());
  const available = (contents || theme.getRoomContents()).filter(entry => isInRange(entry));

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

  function isInRange(entry) {
    const range = RoomContents.lookup(entry.code).getRange();
    return range == null || (floor.getLevel() >= range[0] && floor.getLevel() <= range[1]);
  }

  function getEligibleRooms() {
    return floor.getRooms().filter(room => room.canHaveContents());
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

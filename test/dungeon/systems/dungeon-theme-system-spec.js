describe("DungeonThemeSystem", function() {

  // getRandomRarity() rolls against a frequency map totalling 74, so these rolls land in each bucket in turn.
  const rarityRolls = {
    [Rarity.common]: 0,
    [Rarity.unusual]: 30,
    [Rarity.rare]: 60,
    [Rarity.astonishing]: 70,
    [Rarity.unheardOf]: 73,
  };

  describe("pickTheme()", function() {
    it("buckets the generic dungeon as a common theme on every level", function() {
      for (let level=1; level<=10; level++) {
        Random.stubRoll(rarityRolls[Rarity.common]);
        Random.stubFrom('dungeon');
        expect(DungeonThemeSystem.pickTheme(level)).to.equal('dungeon');
      }
    });

    // Once roll() is stubbed, from() draws its index from the same queue, so each pick needs a second stubbed roll.
    it("picks a theme of the rolled rarity at every level", function() {
      Object.entries(rarityRolls).forEach(([rarity, roll]) => {
        for (let level=1; level<=10; level++) {
          Random.stubRoll(roll, 0);
          const theme = DungeonThemeSystem.pickTheme(level);
          expect(DungeonTheme.lookup(theme).getRarity(), `${rarity} level ${level}`).to.equal(rarity);
        }
      });
    });
  });

});

describe('RarityHelper', function() {

  // The rarity roll goes through Random.roll() by way of the standard frequency map, where common takes the first
  // 200, unusual the next 50, and rare the 16 after that. Random.from() then spends a roll picking between the
  // candidates of the chosen rarity.
  describe('pickByRarity()', function() {
    const common = { code:'common', rarity:Rarity.common };
    const unusual = { code:'unusual', rarity:Rarity.unusual };
    const rare = { code:'rare', rarity:Rarity.rare };

    it('picks nothing from no candidates', function() {
      expect(RarityHelper.pickByRarity([])).to.equal(null);
    });

    it('picks from the candidates at the rolled rarity', function() {
      Random.stubRoll(250, 0);
      expect(RarityHelper.pickByRarity([common, unusual, rare])).to.equal(rare);
    });

    it('steps down through the rarities when nothing is at the rolled one', function() {
      Random.stubRoll(250, 0);
      expect(RarityHelper.pickByRarity([common, unusual])).to.equal(unusual);
    });

    it('steps up through the rarities when nothing is at or below the rolled one', function() {
      Random.stubRoll(0, 0);
      expect(RarityHelper.pickByRarity([rare])).to.equal(rare);
    });
  });

});

describe.only('LootGenerator', function() {

  function setupDungeon(level, theme) {
    DungeonSystem.setDungeonFloor(DungeonFloor(level, theme));
  }

  function setupMonster(code) {
    return MonsterFactory(code).build();
  }

  describe('generateChestLoot()', function() {
    it('generates loot for the current level', function() {
      setupDungeon(1,'dungeon');
      const loot = LootGenerator();
      loot.generateChestLoot();
      console.log(loot.getDropTable())
    });
  });

  describe('generateMonsterLoot()', function() {
    it('generates loot for a monster', function() {
      const screamer = setupMonster('flamescale-screamer');
      const loot = LootGenerator();
      loot.generateMonsterLoot(screamer);
      console.log(loot.getDropTable())
    });
  });

  /*



  describe('getDropTable()', function() {
    it('collects the monster group sources for the groups the monster lists', function() {
      const table = monsterGenerator('spec-loot-blob').getDropTable();
      expect(table['spec-slimes']).to.deep.equal([{ code:'spec-gland', rarity:Rarity.common }]);
      expect(table['spec-critters']).to.be.undefined;
      expect(table.gear).to.be.undefined;
    });

    it('adds weapon and spell sources to the gear group', function() {
      const table = monsterGenerator('spec-loot-archer').getDropTable();
      expect(table.gear).to.include.deep.members([
        { code:'spec-arrow', rarity:Rarity.common, quantity:[5,10] },
        { code:'spec-ember-tear', rarity:Rarity.unusual },
      ]);
    });

    it('leaves the gear group empty when nothing matches the monster', function() {
      const table = monsterGenerator('spec-loot-brawler').getDropTable();
      expect(table.gear).to.be.undefined;
      expect(table['spec-critters']).to.deep.equal([{ code:'spec-tooth', rarity:Rarity.common }]);
    });

    it('lets the base monster adjust the table', function() {
      const table = monsterGenerator('spec-loot-archer').getDropTable();
      expect(table['spec-critters']).to.have.deep.members([
        { code:'spec-tooth', rarity:Rarity.common },
        { code:'spec-fang', rarity:Rarity.rare },
      ]);
    });

    it('collects the chest group sources for the groups the theme lists', function() {
      const table = chestGenerator().getDropTable();
      expect(table['spec-valuables']).to.have.deep.members([
        { code:'spec-tooth', rarity:Rarity.unusual, quantity:[2,4] },
        { code:'spec-idol', rarity:Rarity.common },
      ]);
      expect(table['spec-reagents']).to.deep.equal([{ code:'spec-gland', rarity:Rarity.common }]);
      expect(table['spec-slimes']).to.be.undefined;
    });

    it('returns a copy of the table', function() {
      const generator = monsterGenerator('spec-loot-blob');
      generator.getDropTable()['spec-slimes'].push({ code:'spec-fang', rarity:Rarity.common });
      expect(generator.getDropTable()['spec-slimes']).to.have.length(1);
    });
  });

  describe('rollValueRange()', function() {
    it('derives the ceiling from the chest level and the floor from the ceiling', function() {
      Random.stubBetween(100);
      const range = chestGenerator().rollValueRange();
      expect(range.ceiling).to.be.closeTo(61.5, 0.1);
      expect(range.floor).to.be.closeTo(15.4, 0.1);
    });

    it('lowers the ceiling to the rolled percentage', function() {
      Random.stubBetween(80);
      expect(chestGenerator().rollValueRange().ceiling).to.be.closeTo(49.2, 0.1);
    });

    it('scales the ceiling by the loot quality', function() {
      Random.stubBetween(100);
      expect(chestGenerator('spec-loot-shrine').rollValueRange().ceiling).to.be.closeTo(123.1, 0.1);
    });

    it('derives a monster ceiling from its essence value', function() {
      const id = MonsterFactory('spec-loot-blob').build();
      const essence = EssenceSystem.monsterEssenceValue(id);
      Random.stubBetween(100);
      const range = LootGenerator('monster', { id }).rollValueRange();
      expect(range.ceiling).to.be.closeTo(30 * Math.log(1 + (essence / 20)), 0.001);
    });
  });

  // The group and rarity rolls both go through Random.roll() by way of the frequency maps, and so does Random.from()
  // when it picks between matching entries, so every roll in a sequence is pinned with stubRoll(). The blob's groups
  // are { nothing:100, 'spec-slimes':50, extra:10 } and a rarity roll under 200 is common. The first between() in a
  // generation is the ceiling percentage, followed for chests by the roll count, then any quantity ranges.
  describe('generateLoot()', function() {
    it('drops nothing when the nothing group is rolled', function() {
      const generator = monsterGenerator('spec-loot-blob');
      Random.stubBetween(100);
      Random.stubRoll(0);
      expect(generator.generateLoot()).to.deep.equal([]);
    });

    it('picks an article from the rolled group', function() {
      const generator = monsterGenerator('spec-loot-blob');
      Random.stubBetween(100);
      Random.stubRoll(120, 0, 0);
      expect(generator.generateLoot()).to.deep.equal([{ articleCode:'spec-gland', quantity:1 }]);
    });

    it('rolls twice more when the extra group is rolled, merging matching articles', function() {
      const generator = monsterGenerator('spec-loot-blob');
      Random.stubBetween(100);
      Random.stubRoll(155, 120, 0, 0, 120, 0, 0);
      expect(generator.generateLoot()).to.deep.equal([{ articleCode:'spec-gland', quantity:2 }]);
    });

    it('steps down through the rarities when the group has nothing at the rolled rarity', function() {
      const generator = monsterGenerator('spec-loot-archer');
      Random.stubBetween(100);
      Random.stubRoll(110, 266, 0);
      expect(generator.generateLoot()).to.deep.equal([{ articleCode:'spec-fang', quantity:1 }]);
    });

    it('steps up through the rarities when nothing is at or below the rolled rarity', function() {
      const generator = chestGenerator();
      Random.stubBetween(100, 1, 3);
      Random.stubRoll(50, 0, 0);
      expect(generator.generateLoot()).to.deep.equal([{ articleCode:'spec-tooth', quantity:3 }]);
    });

    it('rolls a chest for its loot quantity', function() {
      const generator = chestGenerator();
      Random.stubBetween(100, 2, 2, 4);
      Random.stubRoll(50, 0, 0, 50, 0, 0);
      expect(generator.generateLoot()).to.deep.equal([{ articleCode:'spec-tooth', quantity:6 }]);
    });

    it('skips articles valued over the ceiling', function() {
      const generator = chestGenerator();
      Random.stubBetween(100, 1, 2);
      Random.stubRoll(50, 0, 0);
      expect(generator.generateLoot()).to.deep.equal([{ articleCode:'spec-tooth', quantity:2 }]);
    });

    it('settles for anything under the ceiling when nothing is above the floor', function() {
      const generator = chestGenerator();
      Random.stubBetween(100, 1);
      Random.stubRoll(115, 0, 0);
      expect(generator.generateLoot()).to.deep.equal([{ articleCode:'spec-pebble', quantity:1 }]);
    });

    it('drops nothing when everything in the group is over the ceiling', function() {
      const generator = chestGenerator();
      Random.stubBetween(60, 1);
      Random.stubRoll(50);
      expect(generator.generateLoot()).to.deep.equal([]);
    });

    it('drops nothing when the rolled group is empty', function() {
      const generator = monsterGenerator('spec-loot-brawler');
      Random.stubBetween(100);
      Random.stubRoll(135);
      expect(generator.generateLoot()).to.deep.equal([]);
    });

    it('drops nothing for monsters without loot groups', function() {
      expect(monsterGenerator('spec-loot-roach').generateLoot()).to.deep.equal([]);
    });
  });

  describe('addArticle()', function() {
    it('adds a common article to any group', function() {
      const generator = monsterGenerator('spec-loot-blob');
      generator.addArticle('spec-fang', 'spec-treasures');
      expect(generator.getDropTable()['spec-treasures']).to.deep.equal([{ code:'spec-fang', rarity:Rarity.common }]);
    });
  });
*/
});

describe('LootGenerator', function() {

  // The spec articles, monsters and theme keep these specs independent of the shipped loot data. The archer both
  // carries a bow and casts a red spell, so it qualifies for every kind of conditional source. The monsters carry a
  // large essence bonus so that their rolled attributes can't move the value window enough to exclude the spec
  // articles, which are all valued in the middle of it. The chest specs use level 5, where the value ceiling is 61.5.
  const essenceBonus = 1000;
  const chestLevel = 5;

  before(function() {
    Article.register('spec-tooth', { name:'Spec Tooth', category:InventoryCategory.valuables, sources:[
      { monsterGroup:'spec-critters', rarity:Rarity.common },
      { chestGroup:'spec-valuables', rarity:Rarity.unusual, quantity:[2,4] },
    ]});
    Article.register('spec-gland', { name:'Spec Gland', category:InventoryCategory.alchemy, sources:[
      { monsterGroup:'spec-slimes', rarity:Rarity.common },
      { chestGroup:'spec-reagents', rarity:Rarity.common },
    ]});
    Article.register('spec-arrow', { name:'Spec Arrow', category:InventoryCategory.ammo, sources:[
      { withWeapon:'bow', rarity:Rarity.common, quantity:[5,10] },
    ]});
    Article.register('spec-ember-tear', { name:'Spec Ember Tear', category:InventoryCategory.restoreMana, sources:[
      { castsSpells:'red', rarity:Rarity.unusual },
    ]});
    Article.register('spec-fang', { name:'Spec Fang', category:InventoryCategory.valuables });
    Article.register('spec-idol', { name:'Spec Idol', category:InventoryCategory.valuables, sources:[
      { chestGroup:'spec-valuables', rarity:Rarity.common },
    ]});
    Article.register('spec-pebble', { name:'Spec Pebble', category:InventoryCategory.valuables, sources:[
      { chestGroup:'spec-junk', rarity:Rarity.common },
    ]});

    Article.setValue('spec-tooth', 40);
    Article.setValue('spec-gland', 40);
    Article.setValue('spec-arrow', 35);
    Article.setValue('spec-ember-tear', 45);
    Article.setValue('spec-fang', 50);
    Article.setValue('spec-idol', 200);
    Article.setValue('spec-pebble', 3);

    Spell.register('spec-loot-flare', { name:'Spec Loot Flare', color:'red', manaCost:1, target:EffectTarget.single, getEffects:() => { return []; } });

    BaseMonster.register('spec-loot-archer', {
      name: 'Spec Loot Archer',
      species: SpeciesCode.kobold,
      type: 'hunter',
      level: 1,
      bonusEssence: essenceBonus,
      equipment: { loadouts:[{ main:{ base:'longbow' }}] },
      prioritizedAbilities: { flare:{ code:'monster-cast-spell', priority:50, spell:'spec-loot-flare', powerLevel:1 } },
      lootGroups: { nothing:100, 'spec-critters':30, gear:10 },
      adjustLoot: generator => { generator.addArticle('spec-fang', 'spec-critters', Rarity.rare); },
    });

    BaseMonster.register('spec-loot-brawler', {
      name: 'Spec Loot Brawler',
      species: SpeciesCode.kobold,
      type: 'fighter',
      level: 1,
      bonusEssence: essenceBonus,
      equipment: { loadouts:[{ main:{ base:'bone-club' }}] },
      lootGroups: { nothing:100, 'spec-critters':30, gear:10 },
    });

    BaseMonster.register('spec-loot-blob', {
      name: 'Spec Loot Blob',
      bodyPlan: 'yeek',
      type: 'critter',
      level: 1,
      bonusEssence: essenceBonus,
      lootGroups: { nothing:100, 'spec-slimes':50, extra:10 },
    });

    BaseMonster.register('spec-loot-roach', {
      name: 'Spec Loot Roach',
      bodyPlan: 'yeek',
      type: 'critter',
      level: 1,
    });

    DungeonTheme.register('spec-loot-vault', {
      name: 'Spec Loot Vault',
      rarity: Rarity.common,
      lootGroups: { 'spec-valuables':100, 'spec-reagents':10, 'spec-junk':10 },
    });

    DungeonTheme.register('spec-loot-shrine', {
      name: 'Spec Loot Shrine',
      rarity: Rarity.common,
      lootQuality: 2,
      lootGroups: { 'spec-valuables':100 },
    });
  });

  function chestGenerator(theme='spec-loot-vault') {
    return LootGenerator('chest', { theme, level:chestLevel });
  }

  function monsterGenerator(code) {
    return LootGenerator('monster', { id:MonsterFactory(code).build() });
  }

  it('rejects unknown generator types', function() {
    expect(() => LootGenerator('pinata', {})).to.throw(/chest or monster/);
  });

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

});

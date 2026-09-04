describe('LootGenerator', function() {

  // The spec articles, monsters and themes keep these specs independent of the shipped loot data. The archer both
  // carries a bow and casts a red spell, so it qualifies for every kind of conditional source. The monsters carry a
  // large essence bonus so that their rolled attributes can't move the value window enough to exclude the spec
  // articles, which are all valued in the middle of it. The chest specs use level 5, where the value ceiling is 61.5
  // and the floor is 15.4.
  const essenceBonus = 1000;
  const chestLevel = 5;

  before(function() {
    Article.register('spec-tooth', { name:'Spec Tooth', category:InventoryCategory.valuables, sources:[
      { group:'spec-critters', rarity:Rarity.common },
      { group:'spec-valuables', rarity:Rarity.unusual, quantity:[2,4] },
    ]});
    Article.register('spec-gland', { name:'Spec Gland', category:InventoryCategory.alchemy, sources:[
      { group:'spec-slimes', rarity:Rarity.common },
      { group:'spec-reagents', rarity:Rarity.common },
    ]});
    Article.register('spec-arrow', { name:'Spec Arrow', category:InventoryCategory.ammo, sources:[
      { withWeapon:'bow', rarity:Rarity.common, quantity:[5,10] },
    ]});
    Article.register('spec-ember-tear', { name:'Spec Ember Tear', category:InventoryCategory.restoreMana, sources:[
      { castsSpells:'red', rarity:Rarity.unusual },
    ]});
    Article.register('spec-fang', { name:'Spec Fang', category:InventoryCategory.valuables });
    Article.register('spec-idol', { name:'Spec Idol', category:InventoryCategory.valuables, sources:[
      { group:'spec-valuables', rarity:Rarity.common },
    ]});
    Article.register('spec-pebble', { name:'Spec Pebble', category:InventoryCategory.valuables, sources:[
      { group:'spec-junk', rarity:Rarity.common },
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
      lootAdjustments: [
        { addArticle:'spec-fang', group:'spec-critters', rarity:Rarity.rare },
        { addArticle:'spec-pebble', group:'spec-critters', quantity:[2,3] },
      ],
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

  function enterFloor(theme='spec-loot-vault') {
    DungeonSystem.setDungeonFloor(DungeonFloor(chestLevel, theme));
  }

  // The group and rarity rolls both go through Random.roll() by way of the frequency maps, and so does Random.from()
  // when it picks between matching entries, so every roll in a sequence is pinned with stubRoll(). The first between()
  // in a generation is the ceiling percentage, followed for chests by the roll count, then any quantity ranges. Every
  // spec monster lists the nothing group first, as does the vault when its groups are overridden, so a roll of zero
  // generates nothing and leaves the drop table and value range to be inspected.
  function monsterTable(code) {
    const id = MonsterFactory(code).build();
    const generator = LootGenerator();
    Random.stubBetween(100);
    Random.stubRoll(0);
    generator.generateMonsterLoot(id);
    return generator.getDropTable();
  }

  function chestRange(theme, options={}) {
    enterFloor(theme);
    const generator = LootGenerator();
    Random.stubBetween(100, 1);
    Random.stubRoll(0);
    generator.generateChestLoot({ ...options, groups:{ nothing:100 } });
    return generator.getValueRange();
  }

  it('is single use', function() {
    const id = MonsterFactory('spec-loot-blob').build();
    const generator = LootGenerator();
    Random.stubBetween(100);
    Random.stubRoll(0);
    generator.generateMonsterLoot(id);
    expect(() => generator.generateMonsterLoot(id)).to.throw(/single use/);
  });

  it('needs a dungeon floor to generate chest loot', function() {
    expect(() => LootGenerator().generateChestLoot()).to.throw(/dungeon floor/);
  });

  describe('getDropTable()', function() {
    it('collects the sources for the groups the monster lists', function() {
      const table = monsterTable('spec-loot-blob');
      expect(table['spec-slimes']).to.deep.equal([{ code:'spec-gland', rarity:Rarity.common }]);
      expect(table['spec-critters']).to.be.undefined;
      expect(table.gear).to.be.undefined;
    });

    it('adds weapon and spell sources to the gear group', function() {
      const table = monsterTable('spec-loot-archer');
      expect(table.gear).to.include.deep.members([
        { code:'spec-arrow', rarity:Rarity.common, quantity:[5,10] },
        { code:'spec-ember-tear', rarity:Rarity.unusual },
      ]);
    });

    it('leaves the gear group empty when nothing matches the monster', function() {
      const table = monsterTable('spec-loot-brawler');
      expect(table.gear).to.be.undefined;
      expect(table['spec-critters']).to.deep.equal([{ code:'spec-tooth', rarity:Rarity.common }]);
    });

    it('applies the loot adjustments of the base monster', function() {
      const table = monsterTable('spec-loot-archer');
      expect(table['spec-critters']).to.have.deep.members([
        { code:'spec-tooth', rarity:Rarity.common },
        { code:'spec-fang', rarity:Rarity.rare },
        { code:'spec-pebble', rarity:Rarity.common, quantity:[2,3] },
      ]);
    });

    it('is empty for monsters without loot groups', function() {
      expect(monsterTable('spec-loot-roach')).to.deep.equal({});
    });

    it('collects the sources for the groups the theme lists', function() {
      enterFloor();
      const generator = LootGenerator();
      Random.stubBetween(100, 1, 2);
      Random.stubRoll(50, 0, 0);
      generator.generateChestLoot();

      const table = generator.getDropTable();
      expect(table['spec-valuables']).to.have.deep.members([
        { code:'spec-tooth', rarity:Rarity.unusual, quantity:[2,4] },
        { code:'spec-idol', rarity:Rarity.common },
      ]);
      expect(table['spec-reagents']).to.deep.equal([{ code:'spec-gland', rarity:Rarity.common }]);
      expect(table['spec-slimes']).to.be.undefined;
    });

    it('collects the sources for the groups given as an option', function() {
      enterFloor();
      const generator = LootGenerator();
      Random.stubBetween(100, 1);
      Random.stubRoll(0, 0, 0);
      generator.generateChestLoot({ groups:{ 'spec-junk':100 } });
      expect(Object.keys(generator.getDropTable())).to.deep.equal(['spec-junk']);
    });

    it('returns a copy of the table', function() {
      const id = MonsterFactory('spec-loot-blob').build();
      const generator = LootGenerator();
      Random.stubBetween(100);
      Random.stubRoll(0);
      generator.generateMonsterLoot(id);
      generator.getDropTable()['spec-slimes'].push({ code:'spec-fang', rarity:Rarity.common });
      expect(generator.getDropTable()['spec-slimes']).to.have.length(1);
    });
  });

  describe('getValueRange()', function() {
    it('derives the ceiling from the chest level and the floor from the ceiling', function() {
      const range = chestRange();
      expect(range.ceiling).to.be.closeTo(61.5, 0.1);
      expect(range.floor).to.be.closeTo(15.4, 0.1);
    });

    it('lowers the ceiling to the rolled percentage', function() {
      enterFloor();
      const generator = LootGenerator();
      Random.stubBetween(80, 1);
      Random.stubRoll(0);
      generator.generateChestLoot({ groups:{ nothing:100 } });
      expect(generator.getValueRange().ceiling).to.be.closeTo(49.2, 0.1);
    });

    it('scales the ceiling by the loot quality of the theme', function() {
      expect(chestRange('spec-loot-shrine').ceiling).to.be.closeTo(123.1, 0.1);
    });

    it('scales the ceiling by the quality option', function() {
      expect(chestRange('spec-loot-vault', { quality:2 }).ceiling).to.be.closeTo(123.1, 0.1);
      expect(chestRange('spec-loot-shrine', { quality:1.5 }).ceiling).to.be.closeTo(184.6, 0.1);
    });

    it('derives a monster ceiling from its essence value', function() {
      const id = MonsterFactory('spec-loot-blob').build();
      const essence = EssenceSystem.monsterEssenceValue(id);
      const generator = LootGenerator();
      Random.stubBetween(100);
      Random.stubRoll(0);
      generator.generateMonsterLoot(id);
      expect(generator.getValueRange().ceiling).to.be.closeTo(30 * Math.log(1 + (essence / 20)), 0.001);
    });
  });

  // The blob's groups are { nothing:100, 'spec-slimes':50, extra:10 } and a rarity roll under 200 is common.
  describe('generateMonsterLoot()', function() {
    function generate(code, rolls) {
      const id = MonsterFactory(code).build();
      Random.stubBetween(100);
      Random.stubRoll(...rolls);
      return LootGenerator().generateMonsterLoot(id);
    }

    it('drops nothing when the nothing group is rolled', function() {
      expect(generate('spec-loot-blob', [0])).to.deep.equal([]);
    });

    it('picks an article from the rolled group', function() {
      expect(generate('spec-loot-blob', [120, 0, 0])).to.deep.equal([{ articleCode:'spec-gland', quantity:1 }]);
    });

    it('rolls twice more when the extra group is rolled, merging matching articles', function() {
      expect(generate('spec-loot-blob', [155, 120, 0, 0, 120, 0, 0])).to.deep.equal([{ articleCode:'spec-gland', quantity:2 }]);
    });

    it('steps down through the rarities when the group has nothing at the rolled rarity', function() {
      expect(generate('spec-loot-archer', [110, 266, 0])).to.deep.equal([{ articleCode:'spec-fang', quantity:1 }]);
    });

    it('drops nothing when the rolled group is empty', function() {
      expect(generate('spec-loot-brawler', [135])).to.deep.equal([]);
    });

    it('drops nothing for monsters without loot groups', function() {
      expect(generate('spec-loot-roach', [])).to.deep.equal([]);
    });
  });

  // The vault's groups are { 'spec-valuables':100, 'spec-reagents':10, 'spec-junk':10 }, and its loot quantity is
  // the default range of 1 to 4.
  describe('generateChestLoot()', function() {
    function generate(options) {
      enterFloor();
      return LootGenerator().generateChestLoot(options);
    }

    it('steps up through the rarities when nothing is at or below the rolled rarity', function() {
      Random.stubBetween(100, 1, 3);
      Random.stubRoll(50, 0, 0);
      expect(generate()).to.deep.equal([{ articleCode:'spec-tooth', quantity:3 }]);
    });

    it('rolls a chest for its loot quantity', function() {
      Random.stubBetween(100, 2, 2, 4);
      Random.stubRoll(50, 0, 0, 50, 0, 0);
      expect(generate()).to.deep.equal([{ articleCode:'spec-tooth', quantity:6 }]);
    });

    it('scales the loot quantity by the quantity option', function() {
      Random.stubBetween(100, 8);
      Random.stubRoll(0, 0, 0, 0, 0, 0, 0, 0);
      expect(generate({ quantity:2, groups:{ nothing:100 } })).to.deep.equal([]);
    });

    it('rolls at least once however small the quantity option', function() {
      Random.stubBetween(100);
      Random.stubRoll(115, 0, 0);
      expect(generate({ quantity:0.1 })).to.deep.equal([{ articleCode:'spec-pebble', quantity:1 }]);
    });

    it('rolls from the groups given as an option', function() {
      Random.stubBetween(100, 1);
      Random.stubRoll(0, 0, 0);
      expect(generate({ groups:{ 'spec-junk':100 } })).to.deep.equal([{ articleCode:'spec-pebble', quantity:1 }]);
    });

    it('skips articles valued over the ceiling', function() {
      Random.stubBetween(100, 1, 2);
      Random.stubRoll(50, 0, 0);
      expect(generate()).to.deep.equal([{ articleCode:'spec-tooth', quantity:2 }]);
    });

    it('settles for anything under the ceiling when nothing is above the floor', function() {
      Random.stubBetween(100, 1);
      Random.stubRoll(115, 0, 0);
      expect(generate()).to.deep.equal([{ articleCode:'spec-pebble', quantity:1 }]);
    });

    it('drops nothing when everything in the group is over the ceiling', function() {
      Random.stubBetween(60, 1);
      Random.stubRoll(50);
      expect(generate()).to.deep.equal([]);
    });
  });

});

describe('LootGenerator', function() {

  // The spec articles, monsters and theme keep these specs independent of the shipped loot data. The archer both
  // carries a bow and casts a red spell, so it qualifies for every kind of conditional source.
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

    Spell.register('spec-loot-flare', { name:'Spec Loot Flare', color:'red', manaCost:1, target:EffectTarget.single, getEffects:() => { return []; } });

    BaseMonster.register('spec-loot-archer', {
      name: 'Spec Loot Archer',
      species: SpeciesCode.kobold,
      type: 'hunter',
      level: 1,
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
      equipment: { loadouts:[{ main:{ base:'bone-club' }}] },
      lootGroups: { nothing:100, 'spec-critters':30, gear:10 },
    });

    BaseMonster.register('spec-loot-blob', {
      name: 'Spec Loot Blob',
      bodyPlan: 'yeek',
      type: 'critter',
      level: 1,
      lootGroups: { nothing:100, 'spec-slimes':50 },
    });

    DungeonTheme.register('spec-loot-vault', {
      name: 'Spec Loot Vault',
      rarity: Rarity.common,
      lootGroups: { 'spec-valuables':100, 'spec-reagents':10 },
    });
  });

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
      const table = LootGenerator('chest', { theme:'spec-loot-vault', level:1 }).getDropTable();
      expect(table['spec-valuables']).to.deep.equal([{ code:'spec-tooth', rarity:Rarity.unusual, quantity:[2,4] }]);
      expect(table['spec-reagents']).to.deep.equal([{ code:'spec-gland', rarity:Rarity.common }]);
      expect(table['spec-slimes']).to.be.undefined;
    });

    it('returns a copy of the table', function() {
      const generator = monsterGenerator('spec-loot-blob');
      generator.getDropTable()['spec-slimes'].push({ code:'spec-fang', rarity:Rarity.common });
      expect(generator.getDropTable()['spec-slimes']).to.have.length(1);
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

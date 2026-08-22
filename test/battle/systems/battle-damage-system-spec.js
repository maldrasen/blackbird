describe("BattleDamageSystem", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  // The max is pinned as well, otherwise a randomly generated character can roll a max below the current health
  // we're setting and moderate() would clamp it back down.
  function setHealth(id, current) {
    const health = HealthComponent.lookup(id);
    health.maxHealth = 100;
    health.currentHealth = current;
    HealthComponent.update(id, health);
  }

  function setVitality(id, value) {
    const attributes = AttributesComponent.lookup(id);
    attributes.vitality = value;
    AttributesComponent.update(id, attributes);
  }

  // The outcome tests aim their damage at a bared chest so the randomly equipped fixture characters can't
  // mitigate the hard-coded damage numbers. The species is pinned to human for the same reason - a randomly
  // rolled kobold or equian would resist part of the damage innately.
  function bareChest(id) {
    const equipment = EquipmentManager(id);
    equipment.equipItem(null, EquipmentSlot.chest);
    equipment.equipItem(null, EquipmentSlot.secondary);
    makeHuman(id);
  }

  function makeHuman(id) {
    const actor = ActorComponent.lookup(id);
    actor.species = SpeciesCode.human;
    ActorComponent.update(id, actor);
  }

  it("knocks a character out at zero or below", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);
    bareChest(target);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }, hitLocation:EquipmentSlot.chest });

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-5);
    expect(state.isKnockedOut(target)).to.be.true;
    expect(state.isAlive(target)).to.be.true;
    expect(state.getKnockedOut()).to.deep.equal([target]);
    expect(state.getActiveCharacters().includes(target)).to.be.false;
    expect(state.getTurnOrder().map(entry => entry.id).includes(target)).to.be.false;
    expect(PartyConfiguration.getConfiguration()[target]).to.equal('P.1.2');
  });

  it("still only knocks a character out at exactly negative vitality", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);
    bareChest(target);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:20 }, hitLocation:EquipmentSlot.chest });

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-15);
    expect(state.isKnockedOut(target)).to.be.true;
    expect(state.isAlive(target)).to.be.true;
  });

  it("kills a character below negative vitality", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);
    bareChest(target);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:21 }, hitLocation:EquipmentSlot.chest });

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-16);
    expect(state.isKnockedOut(target)).to.be.false;
    expect(state.isAlive(target)).to.be.false;
    expect(state.getHomePositions()[target]).to.be.undefined;
  });

  it("kills a monster at zero, clamping their health", function() {
    const state = startBattle();
    const target = state.getActiveMonsters()[0];

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:9999 }, hitLocation:EquipmentSlot.chest });

    expect(HealthComponent.lookup(target).currentHealth).to.equal(0);
    expect(state.isAlive(target)).to.be.false;
    expect(state.getDeadMonsters().includes(target)).to.be.true;
  });

  it("throws when damaging a target who is already down", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);
    setHealth(target, 5);
    setVitality(target, 15);
    bareChest(target);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }, hitLocation:EquipmentSlot.chest });

    expect(() => {
      BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }, hitLocation:EquipmentSlot.chest });
    }).to.throw('already down');
  });

  it("throws when damage has no hit location", function() {
    const state = startBattle();
    const target = state.getEntityAtPosition('P',1,2);

    expect(() => {
      BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }});
    }).to.throw('requires a hit location');
  });

  describe("armor mitigation", function() {
    // The battle fixtures equip the party randomly, so each test pins the slots it touches: known gear goes on
    // explicitly and slots that must be bare are cleared.
    function equipItem(id, item, slot) {
      InventoryManager(id).addItem(item);
      EquipmentManager(id).equipItem(item, slot);
    }

    function pinnedTarget(state) {
      const target = state.getEntityAtPosition('P',1,2);
      setHealth(target, 100);
      setVitality(target, 15);
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);
      makeHuman(target);
      return target;
    }

    it("reduces damage by the hit location's armor percent", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      equipItem(target, ArmorFactory.build('breastplate'), EquipmentSlot.chest);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(55);
      expect(HealthComponent.lookup(target).currentHealth).to.equal(45);
    });

    it("mitigates and rounds each damage type separately", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      equipItem(target, ArmorFactory.build('breastplate'), EquipmentSlot.chest);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:50, slash:50 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(62);
    });

    it("covers every hit location with a shield", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      EquipmentManager(target).equipItem(null, EquipmentSlot.head);
      equipItem(target, WeaponFactory.build('tower-shield'), EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.head });

      expect(damage).to.equal(84);
    });

    it("adds shield reduction on top of worn armor", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      equipItem(target, ArmorFactory.build('breastplate'), EquipmentSlot.chest);
      equipItem(target, WeaponFactory.build('tower-shield'), EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(39);
    });

    it("doubles vulnerable damage after mitigation", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      equipItem(target, ArmorFactory.build('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'vulnerable', { count:1 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(110);
      expect(StatusEffects(target).has('vulnerable')).to.be.false;
    });

    it("consumes one vulnerable stack per hit", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      equipItem(target, ArmorFactory.build('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'vulnerable', { count:2 });

      const hit = () => BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:20 }, hitLocation:EquipmentSlot.chest });

      expect(hit()).to.equal(22);
      expect(StatusEffects(target).get('vulnerable').count).to.equal(1);

      expect(hit()).to.equal(22);
      expect(StatusEffects(target).has('vulnerable')).to.be.false;

      expect(hit()).to.equal(11);
    });

    it("quadruples damned damage and consumes it", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      equipItem(target, ArmorFactory.build('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'damned', { count:1 });

      const hit = () => BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:20 }, hitLocation:EquipmentSlot.chest });

      expect(hit()).to.equal(44);
      expect(StatusEffects(target).has('damned')).to.be.false;

      expect(hit()).to.equal(11);
    });

    it("composes vulnerable and damned multiplicatively", function() {
      const state = startBattle();
      const target = pinnedTarget(state);
      equipItem(target, ArmorFactory.build('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'vulnerable', { count:1 });
      BattleSystem.addStatus(target, 'damned', { count:1 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:10 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(48);
      expect(StatusEffects(target).has('vulnerable')).to.be.false;
      expect(StatusEffects(target).has('damned')).to.be.false;
    });

    // The kobold species resists 10 slash - their scales - which reduces physical damage at every hit location.
    // The runt pack's kobolds wear nothing over them.
    it("applies a creature's innate resistance to physical damage", function() {
      const state = startBattle();
      const target = state.getActiveMonsters()[0];
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(90);
    });

    it("passes damage types the creature doesn't resist straight through", function() {
      const state = startBattle();
      const target = state.getActiveMonsters()[0];
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(100);
    });

    // Elemental damage has no hit location, so a kobold's fire resistance of 20 is the only thing between them and
    // the flames. Their armor never enters into it, which is why the secondary slot doesn't need clearing here.
    it("reduces elemental damage by the innate resistance alone", function() {
      const state = startBattle();
      const target = state.getActiveMonsters()[0];

      const damage = BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ fire:100 }});

      expect(damage).to.equal(80);
    });

    // A kobold's psychic resistance is -10, so they take more than what was thrown at them.
    it("raises damage for a negative resistance", function() {
      const state = startBattle();
      const target = state.getActiveMonsters()[0];

      const damage = BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ psychic:100 }});

      expect(damage).to.equal(110);
    });

    it("passes elemental damage the creature doesn't resist straight through", function() {
      const state = startBattle();
      const target = state.getActiveMonsters()[0];

      const damage = BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ nature:100 }});

      expect(damage).to.equal(100);
    });

    // The kobold trappers always wear a leather doublet over their scales, so the chest takes both reductions.
    // The secondary slot is cleared because a trapper can roll a shield loadout.
    it("stacks innate resistance with worn armor", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.trapperPack(), ambushState:'normal' });
      const target = BattleSystem.getState().getActiveMonsters()[0];
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(69);
    });
  });

  describe("difficulty scaling", function() {
    function pinnedCharacter(state) {
      const target = state.getEntityAtPosition('P',1,2);
      setHealth(target, 100);
      setVitality(target, 15);
      bareChest(target);
      return target;
    }

    // The kobold runts can roll a shield loadout, so the secondary slot is cleared. Their scales still resist
    // 10 slash, making the base slash damage 90.
    function bareMonster(state) {
      const target = state.getActiveMonsters()[0];
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);
      return target;
    }

    async function setDifficulty(difficulty) {
      await WorldState.setOptions({ difficulty:{ damage:100, mitigation:100, resistance:0, ...difficulty } });
    }

    it("scales damage dealt to monsters by the damage option", async function() {
      const state = startBattle();
      const target = bareMonster(state);
      await setDifficulty({ damage:150 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(135);
    });

    it("rounds once after scaling", async function() {
      const state = startBattle();
      const target = bareMonster(state);
      await setDifficulty({ damage:125 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(113);
    });

    it("does not scale damage dealt to characters by the damage option", async function() {
      const state = startBattle();
      const target = pinnedCharacter(state);
      await setDifficulty({ damage:500 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(100);
    });

    it("divides damage dealt to characters by the mitigation option", async function() {
      const state = startBattle();
      const target = pinnedCharacter(state);
      await setDifficulty({ mitigation:200 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(50);
      expect(HealthComponent.lookup(target).currentHealth).to.equal(50);
    });

    it("rounds the mitigated damage", async function() {
      const state = startBattle();
      const target = pinnedCharacter(state);
      await setDifficulty({ mitigation:300 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(33);
    });

    it("does not divide damage dealt to monsters by the mitigation option", async function() {
      const state = startBattle();
      const target = bareMonster(state);
      await setDifficulty({ mitigation:200 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(100);
    });

    it("composes the mitigation factor with vulnerable doubling", async function() {
      const state = startBattle();
      const target = pinnedCharacter(state);
      BattleSystem.addStatus(target, 'vulnerable', { count:1 });
      await setDifficulty({ mitigation:400 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(50);
    });
  });

});

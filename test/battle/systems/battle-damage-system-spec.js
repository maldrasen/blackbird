describe("BattleDamageSystem", function() {

  // The outcome tests aim their damage at a bared chest so the party's own armor can't
  // mitigate the hard-coded damage numbers. The species is pinned to human for the same reason - a randomly
  // rolled kobold or equian would resist part of the damage innately.
  function bareChest(id) {
    const equipment = EquipmentManager(id);
    equipment.equipItem(null, EquipmentSlot.chest);
    equipment.equipItem(null, EquipmentSlot.secondary);
    CharacterSupport.setSpecies(id, SpeciesCode.human);
  }

  it("knocks a character out at zero or below", function() {
    const state = BattleSupport.startBattle();
    const target = BattleSupport.centerRogue();
    CharacterSupport.setHealth(target, 5);
    CharacterSupport.setAttribute(target, Attrib.vitality, 15);
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
    const state = BattleSupport.startBattle();
    const target = BattleSupport.centerRogue();
    CharacterSupport.setHealth(target, 5);
    CharacterSupport.setAttribute(target, Attrib.vitality, 15);
    bareChest(target);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:20 }, hitLocation:EquipmentSlot.chest });

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-15);
    expect(state.isKnockedOut(target)).to.be.true;
    expect(state.isAlive(target)).to.be.true;
  });

  it("kills a character below negative vitality", function() {
    const state = BattleSupport.startBattle();
    const target = BattleSupport.centerRogue();
    CharacterSupport.setHealth(target, 5);
    CharacterSupport.setAttribute(target, Attrib.vitality, 15);
    bareChest(target);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:21 }, hitLocation:EquipmentSlot.chest });

    expect(HealthComponent.lookup(target).currentHealth).to.equal(-16);
    expect(state.isKnockedOut(target)).to.be.false;
    expect(state.isAlive(target)).to.be.false;
    expect(state.getHomePositions()[target]).to.be.undefined;
  });

  it("kills a monster at zero, clamping their health", function() {
    const state = BattleSupport.startBattle();
    const target = state.getActiveMonsters()[0];

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:9999 }, hitLocation:EquipmentSlot.chest });

    expect(HealthComponent.lookup(target).currentHealth).to.equal(0);
    expect(state.isAlive(target)).to.be.false;
    expect(state.getDeadMonsters().includes(target)).to.be.true;
  });

  it("throws when damaging a target who is already down", function() {
    BattleSupport.startBattle();
    const target = BattleSupport.centerRogue();
    CharacterSupport.setHealth(target, 5);
    CharacterSupport.setAttribute(target, Attrib.vitality, 15);
    bareChest(target);

    BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }, hitLocation:EquipmentSlot.chest });

    expect(() => {
      BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }, hitLocation:EquipmentSlot.chest });
    }).to.throw('already down');
  });

  it("throws when damage has no hit location", function() {
    BattleSupport.startBattle();
    const target = BattleSupport.centerRogue();

    expect(() => {
      BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }});
    }).to.throw('requires a hit location');
  });

  // The damage specs above run without a round, which is why the announcement is a separate call rather than part
  // of applyDamage(). These specs build one so there's somewhere for the messages to land.
  describe("addDownedMessage()", function() {
    function specRound() {
      BattleSystem.specRound(BattleSupport.player());
      return BattleSystem.getRound();
    }

    it("announces a knocked out character", function() {
      BattleSupport.startBattle();
      const target = BattleSupport.centerRogue();
      CharacterSupport.setHealth(target, 5);
      CharacterSupport.setAttribute(target, Attrib.vitality, 15);
      bareChest(target);
      const round = specRound();

      BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:10 }, hitLocation:EquipmentSlot.chest });
      BattleDamageSystem.addDownedMessage(target);

      expect(round.getMessages().length).to.equal(1);
      expect(round.getMessages()[0].text).to.include('was knocked out!');
      expect(round.getMessages()[0].color).to.equal('important');
    });

    it("announces a killed monster", function() {
      const state = BattleSupport.startBattle();
      const target = state.getActiveMonsters()[0];
      const round = specRound();

      BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ crush:9999 }, hitLocation:EquipmentSlot.chest });
      BattleDamageSystem.addDownedMessage(target);

      expect(round.getMessages().length).to.equal(1);
      expect(round.getMessages()[0].text).to.include('was killed!');
      expect(round.getMessages()[0].color).to.equal('important');
    });

    it("says nothing about an entity that is still up", function() {
      BattleSupport.startBattle();
      const target = BattleSupport.centerRogue();
      CharacterSupport.setHealth(target, 100);
      const round = specRound();

      BattleDamageSystem.addDownedMessage(target);

      expect(round.getMessages().length).to.equal(0);
    });
  });

  describe("armor mitigation", function() {
    // Each test pins the slots it touches so the party's own gear never enters the numbers: known gear goes on
    // explicitly and slots that must be bare are cleared. The gear is built in steel so its reduction profile
    // applies unscaled.
    function equipItem(id, item, slot) {
      EquipmentManager(id).equipItem(item, slot);
    }

    function pinnedTarget() {
      const target = BattleSupport.centerRogue();
      CharacterSupport.setHealth(target, 100);
      CharacterSupport.setAttribute(target, Attrib.vitality, 15);
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);
      CharacterSupport.setSpecies(target, SpeciesCode.human);
      return target;
    }

    it("reduces damage by the hit location's armor percent", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      equipItem(target, ItemSupport.buildSteel('breastplate'), EquipmentSlot.chest);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(55);
      expect(HealthComponent.lookup(target).currentHealth).to.equal(45);
    });

    it("mitigates and rounds each damage type separately", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      equipItem(target, ItemSupport.buildSteel('breastplate'), EquipmentSlot.chest);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:50, slash:50 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(62);
    });

    it("covers every hit location with a shield", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      EquipmentManager(target).equipItem(null, EquipmentSlot.head);
      equipItem(target, ItemSupport.buildSteel('tower-shield'), EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.head });

      expect(damage).to.equal(70);
    });

    it("adds shield reduction on top of worn armor", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      equipItem(target, ItemSupport.buildSteel('breastplate'), EquipmentSlot.chest);
      equipItem(target, ItemSupport.buildSteel('tower-shield'), EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(25);
    });

    it("doubles vulnerable damage after mitigation", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      equipItem(target, ItemSupport.buildSteel('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'vulnerable', { count:1 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(110);
      expect(StatusEffects(target).hasVulnerable()).to.be.false;
    });

    it("consumes one vulnerable stack per hit", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      equipItem(target, ItemSupport.buildSteel('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'vulnerable', { count:2 });

      const hit = () => BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:20 }, hitLocation:EquipmentSlot.chest });

      expect(hit()).to.equal(22);
      expect(StatusEffects(target).get('vulnerable').count).to.equal(1);

      expect(hit()).to.equal(22);
      expect(StatusEffects(target).hasVulnerable()).to.be.false;

      expect(hit()).to.equal(11);
    });

    it("quadruples damned damage and consumes it", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      equipItem(target, ItemSupport.buildSteel('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'damned', { count:1 });

      const hit = () => BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:20 }, hitLocation:EquipmentSlot.chest });

      expect(hit()).to.equal(44);
      expect(StatusEffects(target).hasDamned()).to.be.false;

      expect(hit()).to.equal(11);
    });

    it("composes vulnerable and damned multiplicatively", function() {
      BattleSupport.startBattle();
      const target = pinnedTarget();
      equipItem(target, ItemSupport.buildSteel('breastplate'), EquipmentSlot.chest);
      BattleSystem.addStatus(target, 'vulnerable', { count:1 });
      BattleSystem.addStatus(target, 'damned', { count:1 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:10 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(48);
      expect(StatusEffects(target).hasVulnerable()).to.be.false;
      expect(StatusEffects(target).hasDamned()).to.be.false;
    });

    // The kobold species resists 10 slash - their scales - which reduces physical damage at every hit location.
    // The runt pack's kobolds wear nothing over them.
    it("applies a creature's innate resistance to physical damage", function() {
      const state = BattleSupport.startBattle();
      const target = state.getActiveMonsters()[0];
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(90);
    });

    it("passes damage types the creature doesn't resist straight through", function() {
      const state = BattleSupport.startBattle();
      const target = state.getActiveMonsters()[0];
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(100);
    });

    // Elemental damage has no hit location, so a kobold's fire resistance of 20 is the only thing between them and
    // the flames. Their armor never enters into it, which is why the secondary slot doesn't need clearing here.
    it("reduces elemental damage by the innate resistance alone", function() {
      const state = BattleSupport.startBattle();
      const target = state.getActiveMonsters()[0];

      const damage = BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ fire:100 }});

      expect(damage).to.equal(80);
    });

    // A Firewalker's helm pinned to 8 fire resistance goes on top of the kobold's own 20.
    it("adds enchanted resistance to the elemental damage reduction", function() {
      const state = BattleSupport.startBattle();
      const target = state.getActiveMonsters()[0];
      Random.stubBetween(8);
      ItemSupport.equip(target, 'helm', ['steel'], { enchantment:{ pattern:'resistant-to-fire' } });

      const damage = BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ fire:100 }});

      expect(damage).to.equal(72);
    });

    // A kobold's psychic resistance is -10, so they take more than what was thrown at them.
    it("raises damage for a negative resistance", function() {
      const state = BattleSupport.startBattle();
      const target = state.getActiveMonsters()[0];

      const damage = BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ psychic:100 }});

      expect(damage).to.equal(110);
    });

    it("passes elemental damage the creature doesn't resist straight through", function() {
      const state = BattleSupport.startBattle();
      const target = state.getActiveMonsters()[0];

      const damage = BattleDamageSystem.applyDamage({ entity:target, damageTypes:{ nature:100 }});

      expect(damage).to.equal(100);
    });

    // A leather doublet turns away 21 slash, and it's worn over the kobold's scales so the chest takes both
    // reductions. The secondary slot is cleared because a trapper can carry a shield.
    it("stacks innate resistance with worn armor", function() {
      const target = BattleSupport.startBattle(BattleSupport.trapperPack()).getActiveMonsters()[0];
      EquipmentManager(target).equipItem(null, EquipmentSlot.secondary);
      ItemSupport.equip(target, 'doublet', ['leather']);

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(69);
    });
  });

  describe("difficulty scaling", function() {
    function pinnedCharacter() {
      const target = BattleSupport.centerRogue();
      CharacterSupport.setHealth(target, 100);
      CharacterSupport.setAttribute(target, Attrib.vitality, 15);
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
      const state = BattleSupport.startBattle();
      const target = bareMonster(state);
      await setDifficulty({ damage:150 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(135);
    });

    it("rounds once after scaling", async function() {
      const state = BattleSupport.startBattle();
      const target = bareMonster(state);
      await setDifficulty({ damage:125 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ slash:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(113);
    });

    it("does not scale damage dealt to characters by the damage option", async function() {
      BattleSupport.startBattle();
      const target = pinnedCharacter();
      await setDifficulty({ damage:500 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(100);
    });

    it("divides damage dealt to characters by the mitigation option", async function() {
      BattleSupport.startBattle();
      const target = pinnedCharacter();
      await setDifficulty({ mitigation:200 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(50);
      expect(HealthComponent.lookup(target).currentHealth).to.equal(50);
    });

    it("rounds the mitigated damage", async function() {
      BattleSupport.startBattle();
      const target = pinnedCharacter();
      await setDifficulty({ mitigation:300 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(33);
    });

    it("does not divide damage dealt to monsters by the mitigation option", async function() {
      const state = BattleSupport.startBattle();
      const target = bareMonster(state);
      await setDifficulty({ mitigation:200 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(100);
    });

    it("composes the mitigation factor with vulnerable doubling", async function() {
      BattleSupport.startBattle();
      const target = pinnedCharacter();
      BattleSystem.addStatus(target, 'vulnerable', { count:1 });
      await setDifficulty({ mitigation:400 });

      const damage = BattleDamageSystem.applyDamage({
        entity:target, damageTypes:{ crush:100 }, hitLocation:EquipmentSlot.chest });

      expect(damage).to.equal(50);
    });
  });

});

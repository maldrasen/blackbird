describe("TrapSystem", function() {

  // A hand-built floor with a single 3x3 room at (2,2). The spike trap goes on (4,3), and the scout stands beside it.
  let floor;
  let scout;

  // With every attribute at 10, a mechanics skill of 0 and the skill's factor of 2.5, the mechanics check comes to
  // (n + 2) * 2.5 where n is the second stubbed between value, followed by one roll out of 250 for the chance to
  // improve the skill, which 249 misses. stubBetween(50,5) checks a 17.5 and stubBetween(50,1) a 7.5, against the
  // spike trap's disarm of 12.
  const missedImprovement = 249;

  function buildScout() {
    const id = Registry.createEntity();
    ActorComponent.create(id, { name:'Scout', gender:Gender.male, species:SpeciesCode.human });
    AttributesComponent.create(id, { strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 });
    HealthComponent.create(id, { currentHealth:20, maxHealth:20, currentStamina:10 });

    const skills = {};
    SkillsComponent.getSkills().forEach(code => { skills[code] = 0; });
    skills.scouting = 100;
    SkillsComponent.create(id, skills);

    return id;
  }

  function placeTrap(code='spike-trap') {
    floor.getRooms()[0].setTileContents(2, 1, { type:TileContentType.trap, code });
  }

  function findTrap() {
    floor.updateTileContents(4, 3, { scoutingRoll:21, glyph:TileContents.lookup('spike-trap').getGlyph() });
  }

  function trapTile() {
    return floor.getTileContents(4,3);
  }

  function health(id) {
    return HealthComponent.lookup(id).currentHealth;
  }

  beforeEach(function() {
    floor = DungeonFloor(1,'dungeon');
    DungeonSystem.setDungeonFloor(floor);

    const feature = Feature('spec-room');
    const room = Room(feature);
    room.setBounds(3,3);
    room.addBox(0,0,3,3);
    feature.addRoom(room);
    feature.setPosition(2,2);
    floor.addFeature(feature);

    scout = buildScout();
    GameSystem.getState().setPlayer(scout);
    PartyConfiguration.setConfiguration({ [scout]:'P.0.2' });
    floor.setPartyPosition(3,3);
  });

  it("does nothing on a tile without an armed trap", function() {
    floor.getRooms()[0].setTileContents(0, 0, { description:'Scattered bones.' });
    placeTrap();
    floor.updateTileContents(4, 3, { state:'disarmed' });

    expect(TrapSystem.enterTile({ x:3, y:3 })).to.equal(null);
    expect(TrapSystem.enterTile({ x:2, y:2 })).to.equal(null);
    expect(TrapSystem.enterTile({ x:4, y:3 })).to.equal(null);
  });

  describe("a hidden trap", function() {

    // The target is picked with Random.from(), which takes a roll when only roll is stubbed.
    it("springs on its target and damages them", function() {
      placeTrap();
      Random.stubRoll(0);
      Random.stubRollDice(7);

      const result = TrapSystem.enterTile({ x:4, y:3 });
      expect(result.position).to.deep.equal({ x:4, y:3 });
      expect(result.target).to.equal(scout);
      expect(result.damage).to.equal(7);
      expect(result.title).to.equal('A Trap!');
      expect(result.text).to.include('jagged iron spikes stab into your legs');
      expect(health(scout)).to.equal(13);
    });

    it("resolves the tile as sprung", function() {
      placeTrap();
      Random.stubRoll(0);
      Random.stubRollDice(7);
      TrapSystem.enterTile({ x:4, y:3 });

      expect(trapTile().state).to.equal('sprung');
      expect(trapTile().glyph.color).to.equal(DungeonConstants.trapColors.resolved);
      expect(floor.getTileDescription(4,3)).to.include('Bloodstained spikes');
    });

    it("springs when the scout missed it too", function() {
      placeTrap();
      floor.updateTileContents(4, 3, { scoutingRoll:9 });
      Random.stubRoll(0);
      Random.stubRollDice(7);

      expect(TrapSystem.enterTile({ x:4, y:3 }).damage).to.equal(7);
    });

    // Steel plate mail reduces pierce damage by 34%.
    it("reduces the damage by the armor covering the hit location", function() {
      const player = CharacterFixtures.genericMale({});
      GameSystem.getState().setPlayer(player);
      PartyConfiguration.setConfiguration({ [player]:'P.0.2' });
      EquipmentManager(player).equipItem(ItemFixtures.buildSteel('plate-mail'), EquipmentSlot.legs);

      placeTrap();
      Random.stubRoll(0);
      Random.stubRollDice(10);

      const result = TrapSystem.enterTile({ x:4, y:3 });
      expect(result.target).to.equal(player);
      expect(result.damage).to.equal(7);
      expect(health(player)).to.equal(93);
    });

    // Trap deaths are deferred to a later task, so for now a trap that kills its target is an error.
    it("throws when the trap kills its target", function() {
      placeTrap();
      Random.stubRoll(0);
      Random.stubRollDice(200);

      expect(() => TrapSystem.enterTile({ x:4, y:3 })).to.throw('Trap deaths');
      expect(health(scout)).to.equal(20);
    });

    it("rejects a trap target it doesn't know", function() {
      TileContents.register('spec-confused-trap', { type:TileContentType.trap, trap:{ target:'the-moon' }});
      placeTrap('spec-confused-trap');

      expect(() => TrapSystem.enterTile({ x:4, y:3 })).to.throw('Bad trap target');
    });
  });

  describe("a found trap", function() {

    it("is disarmed by the scout when the mechanics check meets its disarm value", function() {
      placeTrap();
      findTrap();
      Random.stubBetween(50,5);
      Random.stubRoll(missedImprovement);

      const result = TrapSystem.enterTile({ x:4, y:3 });
      expect(result.target).to.equal(scout);
      expect(result.damage).to.equal(0);
      expect(result.state).to.equal('disarmed');
      expect(result.title).to.equal('Trap Disarmed');
      expect(result.text).to.include('wedging a loose stone');
      expect(health(scout)).to.equal(20);

      expect(trapTile().state).to.equal('disarmed');
      expect(trapTile().glyph.color).to.equal(DungeonConstants.trapColors.resolved);
      expect(floor.getTileDescription(4,3)).to.include('has been disabled');
    });

    it("springs on the scout when the mechanics check falls short", function() {
      placeTrap();
      findTrap();
      Random.stubBetween(50,1);
      Random.stubRoll(missedImprovement);
      Random.stubRollDice(7);

      const result = TrapSystem.enterTile({ x:4, y:3 });
      expect(result.target).to.equal(scout);
      expect(result.damage).to.equal(7);
      expect(result.state).to.equal('sprung');
      expect(result.title).to.equal('A Trap!');
      expect(health(scout)).to.equal(13);
      expect(trapTile().state).to.equal('sprung');
    });

    it("is disarmed without a check when the trap has no disarm value", function() {
      placeTrap('pit-trap');
      findTrap();
      Random.stubBetween();
      Random.stubRoll();

      const result = TrapSystem.enterTile({ x:4, y:3 });
      expect(result.damage).to.equal(0);
      expect(result.text).to.include('mark it so you know');
      expect(trapTile().state).to.equal('disarmed');
    });
  });

});

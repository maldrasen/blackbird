describe("ScoutingSystem", function() {

  // A hand-built floor with two 3x3 rooms, A at (2,2) and B at (5,2), joined by a door in the wall at (5,3).
  //
  //        x: 2  3  4  5  6  7
  //   y:2     A  A  A  B  B  B
  //   y:3     A  A  A | B  B  B
  //   y:4     A  A  A  B  B  B
  let floor;
  let scout;

  // With every attribute at 10 and a scouting skill of 100 the check comes to (n + 2) * 3, where n is the second of
  // the stubbed between values: stubBetween(50,5) scouts a 21 and stubBetween(50,1) scouts a 9. The traps have a
  // secrecy of 15. A skill of 100 also means no improvement roll is made.
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

  function addRoom(x, y) {
    const feature = Feature('spec-room');
    const room = Room(feature);
    room.setBounds(3,3);
    room.addBox(0,0,3,3);
    feature.addRoom(room);
    feature.setPosition(x,y);
    floor.addFeature(feature);
  }

  function placeTrap(x, y, code='spike-trap') {
    const room = floor.getRooms()[floor.getRoomIndexAt(x,y)];
    const position = room.getFloorPosition();
    room.setTileContents(x - position.x, y - position.y, { type:TileContentType.trap, code });
  }

  beforeEach(function() {
    floor = DungeonFloor(1,'dungeon');
    DungeonSystem.setDungeonFloor(floor);
    addRoom(2,2);
    addRoom(5,2);
    floor.setDoors([Door({ position:{ x:5, y:3 }, direction:'W', from:1, to:0 })]);

    scout = buildScout();
    GameSystem.getState().setPlayer(scout);
    PartyConfiguration.setConfiguration({ [scout]:'P.0.2' });
  });

  describe("scoutTile()", function() {

    it("finds a trap when the scout's roll meets its secrecy, and shows its glyph", function() {
      placeTrap(4,3);
      Random.stubBetween(50,5);

      expect(ScoutingSystem.scoutTile(4,3)).to.equal(true);
      expect(floor.getTileContents(4,3).scoutingRoll).to.equal(21);
      expect(floor.getTileContents(4,3).glyph).to.deep.equal(TileContents.lookup('spike-trap').getGlyph());
    });

    it("leaves a trap hidden when the roll falls short", function() {
      placeTrap(4,3);
      Random.stubBetween(50,1);

      expect(ScoutingSystem.scoutTile(4,3)).to.equal(false);
      expect(floor.getTileContents(4,3).scoutingRoll).to.equal(9);
      expect(floor.getTileContents(4,3).glyph).to.equal(undefined);
    });

    it("never scouts a tile twice", function() {
      placeTrap(4,3);
      Random.stubBetween(50,1);
      ScoutingSystem.scoutTile(4,3);

      Random.stubBetween(50,5);
      expect(ScoutingSystem.scoutTile(4,3)).to.equal(false);
      expect(floor.getTileContents(4,3).scoutingRoll).to.equal(9);
    });

    it("makes no check on a trap that went off before it was ever scouted", function() {
      placeTrap(4,3);
      floor.updateTileContents(4, 3, { state:'sprung' });
      Random.stubBetween();

      expect(ScoutingSystem.scoutTile(4,3)).to.equal(false);
      expect(floor.getTileContents(4,3).scoutingRoll).to.equal(undefined);
    });

    it("makes no check on a tile with nothing hidden on it", function() {
      floor.getRooms()[0].setTileContents(0, 0, { canEnter:false });
      Random.stubBetween();

      expect(ScoutingSystem.scoutTile(2,2)).to.equal(false);
      expect(ScoutingSystem.scoutTile(3,3)).to.equal(false);
      expect(ScoutingSystem.scoutTile(0,0)).to.equal(false);
    });
  });

  describe("scoutAround()", function() {

    // The reachable tiles are checked in heading order, cardinals before diagonals, so the door tile east of the
    // party rolls before the trap to their northwest.
    it("scouts only the traps the party could step onto next", function() {
      placeTrap(3,2);
      placeTrap(5,3);
      placeTrap(7,3);
      Random.stubBetween(50,1, 50,5);

      expect(ScoutingSystem.scoutAround({ x:4, y:3 })).to.deep.equal([{ x:3, y:2 }]);
      expect(floor.getTileContents(3,2).scoutingRoll).to.equal(21);
      expect(floor.getTileContents(5,3).scoutingRoll).to.equal(9);
      expect(floor.getTileContents(7,3).scoutingRoll).to.equal(undefined);
    });

    it("makes no check when every reachable tile is bare", function() {
      placeTrap(7,3);
      Random.stubBetween();

      expect(ScoutingSystem.scoutAround({ x:3, y:3 })).to.deep.equal([]);
    });

    it("scouts nothing when there is no scout", function() {
      placeTrap(4,3);
      GameSystem.getState().setPartyConfiguration({});
      Random.stubBetween();

      expect(ScoutingSystem.scoutAround({ x:3, y:3 })).to.deep.equal([]);
      expect(floor.getTileContents(4,3).scoutingRoll).to.equal(undefined);
    });
  });

});

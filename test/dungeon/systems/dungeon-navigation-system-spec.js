describe("DungeonNavigationSystem", function() {

  let floor;
  let start;

  // Entering an unexplored room rolls a scouting check for the party's scout, so the party needs a real character.
  // A SkillCheck consumes two between values, the crit roll then the value roll. The scout's skill is level 100 so
  // the check doesn't also consume an improve roll.
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

  beforeEach(function() {
    const scout = buildScout();
    GameSystem.getState().setPlayer(scout);
    PartyConfiguration.setConfiguration({ [scout]:'P.0.2' });

    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1);
    floor = DungeonSystem.getDungeonFloor();
    start = floor.getLocation();
  });

  it("starts the party in a revealed room", function() {
    expect(floor.isRevealed(start)).to.equal(true);
  });

  it("finds the rooms adjacent to a room", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentRoomIndices(start);
    const doors = floor.getDoors();

    expect(adjacent.length).to.be.greaterThan(0);

    adjacent.forEach(index => {
      const connected = doors.some(door =>
        (door.from === start && door.to === index) ||
        (door.from === index && door.to === start));
      expect(connected).to.equal(true);
    });
  });

  it("moves to an adjacent room and reveals it", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    expect(floor.isRevealed(target)).to.equal(false);
    expect(DungeonNavigationSystem.canMoveTo(target)).to.equal(true);

    DungeonNavigationSystem.moveToRoom(target);

    expect(floor.getLocation()).to.equal(target);
    expect(floor.isRevealed(target)).to.equal(true);
    expect(floor.isRevealed(start)).to.equal(true);
  });

  it("can look up the feature containing a room", function() {
    const feature = floor.getFeatureForRoom(start);
    const room = floor.getRooms()[start];

    expect(feature.getIndex()).to.equal(room.getFeatureIndex());
    expect(feature.getRooms().map(r => r.getIndex())).to.include(start);
  });

  it("stores the scout's skill check in a room when it is first entered", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    Random.stubBetween(50,5);
    DungeonNavigationSystem.moveToRoom(target);

    expect(floor.getRooms()[target].getScoutingRoll()).to.equal(21);
    expect(floor.getRooms()[start].getScoutingRoll()).to.be.undefined;
  });

  it("risks an encounter when entering an unexplored room", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    Random.stubBetween(50,5);
    Random.stubRoll(19);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(true);
  });

  it("is much safer to backtrack through an explored room", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    Random.stubBetween(50,5);
    Random.stubRoll(19, 19);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(true);
    expect(DungeonNavigationSystem.moveToRoom(start).encounter).to.equal(false);
  });

  it("never rolls an encounter when the encounter rate option is zero", async function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:0 } });
    Random.stubBetween(50,5);
    Random.stubRoll(0);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(false);
  });

  it("rolls more encounters when the encounter rate option is raised", async function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:200 } });
    Random.stubBetween(50,5);
    Random.stubRoll(39);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(true);
  });

  it("advances the game time as the party moves", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];
    const state = GameSystem.getState();
    state.setGameTime(100);

    DungeonNavigationSystem.moveToRoom(target);
    expect(state.getGameTime()).to.equal(101);

    DungeonNavigationSystem.moveToRoom(start);
    DungeonNavigationSystem.moveToRoom(target);
    expect(state.getGameTime()).to.equal(101.4);
  });

  it("can still hit an encounter while backtracking", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    Random.stubBetween(50,5);
    Random.stubRoll(20, 1);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(false);
    expect(DungeonNavigationSystem.moveToRoom(start).encounter).to.equal(true);
  });

  describe("room episodes", function() {
    let target;

    beforeEach(function() {
      Episode.register('spec-episode',{
        pages: [{ content: 'A spec episode.' }],
      });

      RoomContents.register('spec-episode-contents',{
        description: 'A room with an episode in it.',
        episode: 'spec-episode',
      });

      target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];
      floor.getRooms()[target].setContents('spec-episode-contents');
    });

    it("fires the contents episode when the room is first entered, skipping the encounter roll", function() {
      Random.stubBetween(50,5);
      Random.stubRoll(0);

      const result = DungeonNavigationSystem.moveToRoom(target);
      expect(result.episode).to.equal('spec-episode');
      expect(result.encounter).to.equal(false);
    });

    it("does not fire the episode again when backtracking through the room", function() {
      Random.stubBetween(50,5);
      Random.stubRoll(50, 50);
      DungeonNavigationSystem.moveToRoom(target);
      DungeonNavigationSystem.moveToRoom(start);

      const result = DungeonNavigationSystem.moveToRoom(target);
      expect(result.episode).to.equal(null);
    });

    it("returns no episode from contents without one", function() {
      RoomContents.register('spec-no-episode-contents',{ description: 'Nothing to see here.' });
      floor.getRooms()[target].setContents('spec-no-episode-contents');

      Random.stubBetween(50,5);
      Random.stubRoll(99);
      expect(DungeonNavigationSystem.moveToRoom(target).episode).to.equal(null);
    });
  });

  describe("room traps", function() {
    let target;

    // The scouting check rolls a 21 from the stubbed between values, so a secrecy of 30 stays unspotted while a
    // secrecy of 10 gets caught.
    beforeEach(function() {
      RoomContents.register('spec-trapped-room-contents',{
        secrecy: 30,
        trap: {
          damage: { x:2, d:6 },
          damageType: DamageType.pierce,
          hitLocation: EquipmentSlot.legs,
          target: EpisodeTarget.anyInParty,
          onScoutingFailure: () => `The spec trap springs!`,
        },
        description: 'A room with a trap in it.',
      });

      target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];
      floor.getRooms()[target].setContents('spec-trapped-room-contents');
    });

    // Once roll() is stubbed, the trap's target pick with from() draws its index from the same queue, so each trapped
    // room entry consumes a target roll before the encounter roll.
    it("springs an unspotted trap when the room is first entered", function() {
      Random.stubBetween(50,5);
      Random.stubRollDice(7);
      Random.stubRoll(0, 99);

      const result = DungeonNavigationSystem.moveToRoom(target);
      expect(result.trap.damage).to.equal(7);
    });

    it("does not spring a trap the scout spotted", function() {
      RoomContents.register('spec-spotted-trap-contents',{
        secrecy: 10,
        trap: {
          damage: { x:2, d:6 },
          damageType: DamageType.pierce,
          hitLocation: EquipmentSlot.legs,
          target: EpisodeTarget.anyInParty,
          onScoutingFailure: () => `The spec trap springs!`,
        },
        description: 'A room with a spotted trap in it.',
      });
      floor.getRooms()[target].setContents('spec-spotted-trap-contents');

      Random.stubBetween(50,5);
      Random.stubRoll(99);
      expect(DungeonNavigationSystem.moveToRoom(target).trap).to.equal(null);
    });

    it("does not spring the trap again when backtracking through the room", function() {
      Random.stubBetween(50,5);
      Random.stubRollDice(7);
      Random.stubRoll(0, 99, 99, 99);

      DungeonNavigationSystem.moveToRoom(target);
      DungeonNavigationSystem.moveToRoom(start);
      expect(DungeonNavigationSystem.moveToRoom(target).trap).to.equal(null);
    });
  });

  it("finds an empty path to the current room", function() {
    expect(DungeonNavigationSystem.getPathToRoom(start)).to.eql([]);
  });

  it("cannot find a path to an unrevealed room", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentRoomIndices(start);
    expect(DungeonNavigationSystem.getPathToRoom(adjacent[0])).to.be.undefined;
  });

  it("walks a path back through the revealed rooms", function() {
    const first = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];
    DungeonNavigationSystem.moveToRoom(first);

    const second = DungeonNavigationSystem.getAdjacentRoomIndices(first).find(index => index !== start);
    if (second != null) { DungeonNavigationSystem.moveToRoom(second); }

    const path = DungeonNavigationSystem.getPathToRoom(start);
    expect(path[path.length-1]).to.equal(start);

    let position = floor.getLocation();
    path.forEach(index => {
      expect(floor.isRevealed(index)).to.equal(true);
      expect(DungeonNavigationSystem.getAdjacentRoomIndices(position)).to.include(index);
      position = index;
    });
  });

  it("paths through a door on the current room", function() {
    const door = floor.getDoors().find(d => d.from === start || d.to === start);
    const far = (door.from === start) ? door.to : door.from;

    expect(DungeonNavigationSystem.getPathThroughDoor(door.from, door.to)).to.eql([far]);
  });

  // The first room adjacent to the start can be a dead end, so this searches the start room's neighbors for one with
  // a door leading onward. Only the start and that neighbor get revealed, so the door's far side stays unrevealed.
  it("paths through a distant door via its revealed side", function() {
    function doorLeadingOnward(index) {
      return floor.getDoors().find(door =>
        (door.from === index && door.to !== start) ||
        (door.to === index && door.from !== start));
    }

    const first = DungeonNavigationSystem.getAdjacentRoomIndices(start).find(index => doorLeadingOnward(index));
    expect(first, `every room adjacent to the start is a dead end`).to.not.be.undefined;

    DungeonNavigationSystem.moveToRoom(first);
    DungeonNavigationSystem.moveToRoom(start);

    const door = doorLeadingOnward(first);
    const far = (door.from === first) ? door.to : door.from;

    expect(floor.isRevealed(far)).to.equal(false);
    expect(DungeonNavigationSystem.getPathThroughDoor(door.from, door.to)).to.eql([first, far]);
  });

  describe("getDoorInDirection()", function() {

    // Doors are stored on the north or west wall of the tile at their position, and `from` owns that tile.
    beforeEach(function() {
      floor.setDoors([
        { position:{ x:5, y:3 }, direction:'N', from:start, to:901 },
        { position:{ x:5, y:8 }, direction:'N', from:902, to:start },
        { position:{ x:2, y:5 }, direction:'W', from:start, to:903 },
        { position:{ x:9, y:5 }, direction:'W', from:904, to:start },
        { position:{ x:9, y:6 }, direction:'W', from:905, to:906 },
      ]);
    });

    it("finds the door on each wall of the current room", function() {
      expect(DungeonNavigationSystem.getDoorInDirection('north').to).to.equal(901);
      expect(DungeonNavigationSystem.getDoorInDirection('south').from).to.equal(902);
      expect(DungeonNavigationSystem.getDoorInDirection('west').to).to.equal(903);
      expect(DungeonNavigationSystem.getDoorInDirection('east').from).to.equal(904);
    });

    it("returns null when the wall has no door", function() {
      floor.setDoors([{ position:{ x:5, y:3 }, direction:'N', from:start, to:901 }]);
      expect(DungeonNavigationSystem.getDoorInDirection('south')).to.equal(null);
      expect(DungeonNavigationSystem.getDoorInDirection('east')).to.equal(null);
    });

    it("always picks the same door when a wall has several", function() {
      floor.setDoors([
        { position:{ x:7, y:3 }, direction:'N', from:start, to:901 },
        { position:{ x:3, y:3 }, direction:'N', from:start, to:902 },
        { position:{ x:3, y:1 }, direction:'N', from:start, to:903 },
      ]);
      expect(DungeonNavigationSystem.getDoorInDirection('north').to).to.equal(903);
    });

    it("rejects a direction it doesn't know", function() {
      expect(() => DungeonNavigationSystem.getDoorInDirection('up')).to.throw('Bad direction');
    });

  });

  it("cannot move to a room without a connecting door", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentRoomIndices(start);
    const rooms = floor.getRooms();
    const distant = rooms.findIndex((_,index) => index !== start && adjacent.includes(index) === false);

    expect(DungeonNavigationSystem.canMoveTo(distant)).to.equal(false);
    expect(() => DungeonNavigationSystem.moveToRoom(distant)).to.throw(`Cannot move to room ${distant}`);
  });

});

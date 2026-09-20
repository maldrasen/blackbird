// With every attribute at 10 and a scouting skill of 100 the scout's check comes to (n + 2) * 3, where n is the
// second of the stubbed between values: stubBetween(50,5) scouts a 21 and stubBetween(50,1) scouts a 9.
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

describe("DungeonNavigationSystem", function() {

  let floor;
  let start;

  beforeEach(function() {
    const scout = buildScout();
    GameSystem.getState().setPlayer(scout);
    PartyConfiguration.setConfiguration({ [scout]:'P.0.2' });

    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1);
    floor = DungeonSystem.getDungeonFloor();
    floor.getRooms().forEach(room => room.setContents(null));

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

  it("still scouts a room revealed on the map but never visited", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];
    floor.revealRoom(target);

    Random.stubBetween(50,5);
    const result = DungeonNavigationSystem.moveToRoom(target);

    expect(result.revealed).to.equal(false);
    expect(floor.getRooms()[target].getScoutingRoll()).to.equal(21);
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

    it("fires the episode in a room revealed on the map but never visited", function() {
      floor.revealRoom(target);

      Random.stubBetween(50,5);
      Random.stubRoll(0);

      const result = DungeonNavigationSystem.moveToRoom(target);
      expect(result.episode).to.equal('spec-episode');
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

describe("DungeonNavigationSystem grid movement", function() {

  // A hand-built floor. Rooms A, B and C are 3x3, with a door (|) in the wall between A and B and a door (-) in the
  // wall between A and C. L is an L-shaped room, E is a 2x2 room against the west edge of the floor, and N is a 4x4
  // room with the 2x2 room i nested inside it, entered through a door in the north wall of i.
  //
  //        x: 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17
  //   y:2           A  A  A  B  B  B     L  L  L        N  N  N  N
  //                                                        -
  //   y:3           A  A  A | B  B  B           L        N  i  i  N
  //   y:4           A  A  A  B  B  B           L        N  i  i  N
  //                    -
  //   y:5           C  C  C                             N  N  N  N
  //   y:6           C  C  C
  //   y:7           C  C  C
  //   y:8     E  E
  //   y:9     E  E
  //
  // The rooms are indexed in the order they're added: A:0, B:1, C:2, L:3, E:4, N:5, i:6.
  let floor;
  let doorAB;
  let doorAC;
  let doorNested;

  function addRoom(x, y, width, height, boxes) {
    const feature = Feature('spec-room');
    const room = Room(feature);
    room.setBounds(width,height);
    boxes.forEach(box => room.addBox(...box));
    feature.addRoom(room);
    feature.setPosition(x,y);
    floor.addFeature(feature);
  }

  function addNestedRoom(x, y) {
    const feature = Feature('spec-room');
    const outer = Room(feature);
    const inner = Room(feature,'nested');
    outer.setBounds(4,4);
    outer.addBox(0,0,4,4);
    inner.setBounds(2,2);
    inner.addBox(0,0,2,2);
    inner.setPosition(1,1);
    inner.markOverlapping();
    feature.addRoom(outer);
    feature.addRoom(inner);
    feature.setPosition(x,y);
    floor.addFeature(feature);
  }

  function findStep(x, y, direction) {
    return DungeonNavigationSystem.findStep({ x, y }, direction);
  }

  beforeEach(function() {
    floor = DungeonFloor(1,'dungeon');
    DungeonSystem.setDungeonFloor(floor);

    addRoom(2,2,3,3,[[0,0,3,3]]);
    addRoom(5,2,3,3,[[0,0,3,3]]);
    addRoom(2,5,3,3,[[0,0,3,3]]);
    addRoom(9,2,3,3,[[0,0,3,1],[2,0,1,3]]);
    addRoom(0,8,2,2,[[0,0,2,2]]);
    addNestedRoom(14,2);

    doorAB = Door({ position:{ x:5, y:3 }, direction:'W', from:1, to:0 });
    doorAC = Door({ position:{ x:3, y:5 }, direction:'N', from:2, to:0 });
    doorNested = Door({ position:{ x:15, y:3 }, direction:'N', from:6, to:5 });
    floor.setDoors([doorAB, doorAC, doorNested]);
  });

  describe("findStep() in a cardinal direction", function() {

    it('steps freely between the tiles of a room', function() {
      expect(findStep(3,3,'north')).to.deep.equal({ position:{ x:3, y:2 }, door:null });
      expect(findStep(3,3,'south')).to.deep.equal({ position:{ x:3, y:4 }, door:null });
      expect(findStep(3,3,'west')).to.deep.equal({ position:{ x:2, y:3 }, door:null });
      expect(findStep(3,3,'east')).to.deep.equal({ position:{ x:4, y:3 }, door:null });
    });

    it('is blocked by the wall between two rooms', function() {
      expect(findStep(4,2,'east')).to.equal(null);
      expect(findStep(5,2,'west')).to.equal(null);
      expect(findStep(2,4,'south')).to.equal(null);
      expect(findStep(2,5,'north')).to.equal(null);
    });

    it('passes through a door in a west wall from either side', function() {
      expect(findStep(4,3,'east')).to.deep.equal({ position:{ x:5, y:3 }, door:doorAB });
      expect(findStep(5,3,'west')).to.deep.equal({ position:{ x:4, y:3 }, door:doorAB });
    });

    it('passes through a door in a north wall from either side', function() {
      expect(findStep(3,4,'south')).to.deep.equal({ position:{ x:3, y:5 }, door:doorAC });
      expect(findStep(3,5,'north')).to.deep.equal({ position:{ x:3, y:4 }, door:doorAC });
    });

    it('is blocked by empty tiles', function() {
      expect(findStep(2,2,'north')).to.equal(null);
      expect(findStep(2,2,'west')).to.equal(null);
      expect(findStep(7,4,'east')).to.equal(null);
      expect(findStep(4,7,'south')).to.equal(null);
    });

    it('is blocked by the edge of the floor', function() {
      expect(findStep(0,8,'west')).to.equal(null);
      expect(findStep(0,9,'west')).to.equal(null);
    });

    it('only enters a nested room through its door', function() {
      expect(findStep(15,2,'south')).to.deep.equal({ position:{ x:15, y:3 }, door:doorNested });
      expect(findStep(15,3,'north')).to.deep.equal({ position:{ x:15, y:2 }, door:doorNested });
      expect(findStep(16,2,'south')).to.equal(null);
      expect(findStep(14,3,'east')).to.equal(null);
      expect(findStep(16,4,'east')).to.equal(null);
    });

    it('steps freely around a nested room and inside it', function() {
      expect(findStep(14,2,'south')).to.deep.equal({ position:{ x:14, y:3 }, door:null });
      expect(findStep(15,3,'east')).to.deep.equal({ position:{ x:16, y:3 }, door:null });
    });

    it("rejects a direction it doesn't know", function() {
      expect(() => findStep(3,3,'up')).to.throw('Bad direction [up]');
    });

  });

  describe("findStep() in a diagonal direction", function() {

    it('steps freely between the tiles of a room', function() {
      expect(findStep(3,3,'northeast')).to.deep.equal({ position:{ x:4, y:2 }, door:null });
      expect(findStep(3,3,'northwest')).to.deep.equal({ position:{ x:2, y:2 }, door:null });
      expect(findStep(3,3,'southeast')).to.deep.equal({ position:{ x:4, y:4 }, door:null });
      expect(findStep(3,3,'southwest')).to.deep.equal({ position:{ x:2, y:4 }, door:null });
    });

    // The bend in the L is at (11,2). Both tiles are part of the room but the tile inside the bend, (10,3), isn't.
    it('will not cut the inside corner of a room', function() {
      expect(findStep(10,2,'southeast')).to.equal(null);
      expect(findStep(11,3,'northwest')).to.equal(null);

      expect(findStep(10,2,'east')).to.deep.equal({ position:{ x:11, y:2 }, door:null });
      expect(findStep(11,2,'south')).to.deep.equal({ position:{ x:11, y:3 }, door:null });
    });

    it('will not step off the outside corner of a room', function() {
      expect(findStep(2,2,'northwest')).to.equal(null);
      expect(findStep(7,4,'southeast')).to.equal(null);
    });

    // Both ring tiles belong to N, but the corner of i sits between them.
    it('will not cut across the corner of another room', function() {
      expect(findStep(15,2,'southwest')).to.equal(null);
      expect(findStep(14,3,'northeast')).to.equal(null);
    });

    it('will not step into another room, even beside a door', function() {
      expect(findStep(4,2,'southeast')).to.equal(null);
      expect(findStep(4,3,'northeast')).to.equal(null);
      expect(findStep(4,4,'southwest')).to.equal(null);
      expect(findStep(15,2,'southeast')).to.equal(null);
    });

  });

  describe("canStep()", function() {

    it('checks a step from the tile the party is standing on', function() {
      floor.setPartyPosition(4,3);

      expect(DungeonNavigationSystem.canStep('east')).to.equal(true);
      expect(DungeonNavigationSystem.canStep('north')).to.equal(true);
      expect(DungeonNavigationSystem.canStep('northwest')).to.equal(true);
      expect(DungeonNavigationSystem.canStep('northeast')).to.equal(false);
    });

    it('throws before the party has been placed', function() {
      expect(() => DungeonNavigationSystem.canStep('east')).to.throw('The party has not been placed on the floor.');
    });

  });

  // The party starts in the middle of room A, which makes A the only visited room. A stubbed roll has to fit the die
  // being rolled and the queue throws when it runs dry, so stubbing a single value also proves which of the two
  // encounter rolls a step made, and that it only made the one.
  describe("step()", function() {
    let scout;
    let state;

    const missedStep = 5;
    const missedRoom = 20;

    beforeEach(function() {
      scout = buildScout();
      state = GameSystem.getState();
      state.setPlayer(scout);
      state.setGameTime(100);
      PartyConfiguration.setConfiguration({ [scout]:'P.0.2' });

      floor.setPartyPosition(3,3);
    });

    function step(direction) {
      return DungeonNavigationSystem.step(direction);
    }

    function standBesideDoor() {
      floor.setPartyPosition(4,3);
    }

    it('moves the party onto the next tile', function() {
      Random.stubRoll(missedStep);

      expect(step('east')).to.deep.equal({
        moved: true,
        position: { x:4, y:3 },
        openedDoor: null,
        enteredRoom: null,
        revealed: false,
        episode: null,
        trap: null,
        encounter: false,
      });
      expect(floor.getPartyPosition()).to.deep.equal({ x:4, y:3 });
    });

    it('goes nowhere when the way is blocked', function() {
      floor.setPartyPosition(4,2);
      Random.stubRoll();

      expect(step('east')).to.deep.equal({ moved:false });
      expect(floor.getPartyPosition()).to.deep.equal({ x:4, y:2 });
      expect(state.getGameTime()).to.equal(100);
    });

    it('throws before the party has been placed', function() {
      DungeonSystem.setDungeonFloor(DungeonFloor(1,'dungeon'));
      expect(() => step('east')).to.throw('The party has not been placed on the floor.');
    });

    describe("inside a room", function() {

      it('takes no time', function() {
        Random.stubRoll(missedStep, missedStep);
        step('east');
        step('northwest');

        expect(floor.getPartyPosition()).to.deep.equal({ x:3, y:2 });
        expect(state.getGameTime()).to.equal(100);
      });

      it('carries a slight chance of an encounter', function() {
        Random.stubRoll(4, missedStep, 4);

        expect(step('east').encounter).to.equal(true);
        expect(step('west').encounter).to.equal(false);
        expect(step('southeast').encounter).to.equal(true);
      });

      it('never has an encounter when the encounter rate option is zero', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:0 } });
        Random.stubRoll(0);

        expect(step('east').encounter).to.equal(false);
      });

      it('has more encounters when the encounter rate option is raised', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:200 } });
        Random.stubRoll(9, 10);

        expect(step('east').encounter).to.equal(true);
        expect(step('west').encounter).to.equal(false);
      });

    });

    describe("through a door", function() {

      beforeEach(function() {
        standBesideDoor();
        Random.stubBetween(50,5);
      });

      it('opens the door the first time through', function() {
        Random.stubRoll(missedRoom, missedStep);

        expect(doorAB.open).to.equal(false);
        expect(step('east').openedDoor).to.equal(doorAB);
        expect(doorAB.open).to.equal(true);
        expect(step('west').openedDoor).to.equal(null);
        expect(doorAB.open).to.equal(true);
      });

      it('enters the room on the other side', function() {
        Random.stubRoll(missedRoom);
        const result = step('east');

        expect(result.enteredRoom).to.equal(1);
        expect(result.revealed).to.equal(true);
        expect(floor.getLocation()).to.equal(1);
        expect(floor.isVisited(1)).to.equal(true);
        expect(floor.isRevealed(1)).to.equal(true);
      });

      it('scouts a room when it is first entered', function() {
        Random.stubRoll(missedRoom);
        step('east');

        expect(floor.getRooms()[1].getScoutingRoll()).to.equal(21);
        expect(floor.getRooms()[0].getScoutingRoll()).to.be.undefined;
      });

      it('still scouts a room that was revealed on the map but never visited', function() {
        floor.revealRoom(1);
        Random.stubRoll(missedRoom);
        const result = step('east');

        expect(result.revealed).to.equal(false);
        expect(floor.getRooms()[1].getScoutingRoll()).to.equal(21);
      });

      it('takes longer to explore a new room than to walk back into an old one', function() {
        Random.stubRoll(missedRoom, missedStep, missedStep);

        step('east');
        expect(state.getGameTime()).to.equal(101);

        step('west');
        step('east');
        expect(state.getGameTime()).to.equal(101.4);
      });

      it('risks an ambush when a room is first entered', function() {
        Random.stubRoll(19);
        expect(step('east').encounter).to.equal(true);
      });

      it('only carries the slight chance of an encounter when walking back into a room', function() {
        Random.stubRoll(missedRoom, 19, 4);

        expect(step('east').encounter).to.equal(false);
        expect(step('west').encounter).to.equal(false);
        expect(step('east').encounter).to.equal(true);
      });

      it('is never ambushed when the encounter rate option is zero', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:0 } });
        Random.stubRoll(0);

        expect(step('east').encounter).to.equal(false);
      });

      it('is ambushed more often when the encounter rate option is raised', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:200 } });
        Random.stubRoll(39);

        expect(step('east').encounter).to.equal(true);
      });

      it('enters a nested room through its door', function() {
        floor.setPartyPosition(15,2);
        Random.stubRoll(missedRoom);
        const result = step('south');

        expect(result.openedDoor).to.equal(doorNested);
        expect(result.enteredRoom).to.equal(6);
        expect(floor.getPartyPosition()).to.deep.equal({ x:15, y:3 });
      });

    });

    // The spike trap has a secrecy of 15. Once roll() is stubbed the trap's target is picked from the same queue, so
    // a sprung trap takes a target roll before the encounter roll.
    describe("into a trapped room", function() {

      beforeEach(function() {
        standBesideDoor();
        floor.getRooms()[1].setContents('dungeon-spike-trap');
      });

      it('springs a trap the scout failed to spot', function() {
        Random.stubBetween(50,1);
        Random.stubRollDice(7);
        Random.stubRoll(0, missedRoom);

        const result = step('east');
        expect(result.trap.target).to.equal(scout);
        expect(result.trap.damage).to.equal(7);
        expect(HealthComponent.lookup(scout).currentHealth).to.equal(13);
      });

      it('does not spring a trap the scout spotted', function() {
        Random.stubBetween(50,5);
        Random.stubRoll(missedRoom);

        expect(step('east').trap).to.equal(null);
        expect(HealthComponent.lookup(scout).currentHealth).to.equal(20);
      });

      it('does not spring the trap again when walking back into the room', function() {
        Random.stubBetween(50,1);
        Random.stubRollDice(7);
        Random.stubRoll(0, missedRoom, missedStep, missedStep);

        step('east');
        step('west');
        expect(step('east').trap).to.equal(null);
        expect(HealthComponent.lookup(scout).currentHealth).to.equal(13);
      });

    });

    describe("into a room with an episode", function() {

      beforeEach(function() {
        GameFlags.seed();
        standBesideDoor();
        floor.getRooms()[1].setContents('orchard-kobolds',{ size:9 });
        Random.stubBetween(50,5);
      });

      it('starts the episode in place of an ambush', function() {
        Random.stubRoll();
        const result = step('east');

        expect(result.episode).to.equal('orchard-kobolds');
        expect(result.encounter).to.equal(false);
      });

      it('starts the episode in a room that was revealed on the map but never visited', function() {
        floor.revealRoom(1);
        Random.stubRoll();

        expect(step('east').episode).to.equal('orchard-kobolds');
      });

      it('does not start the episode again when walking back into the room', function() {
        Random.stubRoll(missedStep, missedStep);

        step('east');
        step('west');
        expect(step('east').episode).to.equal(null);
      });

      it('has nothing to start once the episode no longer meets its requirements', function() {
        state.setFlag(GameFlags.sixBladeStatus,'met');
        Random.stubRoll(missedRoom);

        expect(step('east').episode).to.equal(null);
      });

    });

  });

});

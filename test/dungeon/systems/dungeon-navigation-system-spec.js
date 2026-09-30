describe("DungeonNavigationSystem", function() {

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
    feature.addRoom(outer);
    feature.addRoom(inner);
    feature.setPosition(x,y);
    floor.addFeature(feature);
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

  describe("getReachableTiles()", function() {

    it('lists every tile a step could land on', function() {
      expect(DungeonNavigationSystem.getReachableTiles({ x:3, y:3 })).to.have.deep.members([
        { x:3, y:2 }, { x:3, y:4 }, { x:2, y:3 }, { x:4, y:3 },
        { x:4, y:2 }, { x:2, y:2 }, { x:4, y:4 }, { x:2, y:4 },
      ]);
    });

    it('reaches through a door but not around its corners', function() {
      expect(DungeonNavigationSystem.getReachableTiles({ x:4, y:3 })).to.have.deep.members([
        { x:4, y:2 }, { x:4, y:4 }, { x:3, y:3 }, { x:5, y:3 }, { x:3, y:2 }, { x:3, y:4 },
      ]);
    });

    it('leaves out tiles that cannot be entered', function() {
      floor.getRooms()[0].setTileContents(2, 0, { canEnter:false });

      expect(DungeonNavigationSystem.getReachableTiles({ x:3, y:3 })).to.have.deep.members([
        { x:3, y:2 }, { x:3, y:4 }, { x:2, y:3 }, { x:4, y:3 }, { x:2, y:2 }, { x:4, y:4 }, { x:2, y:4 },
      ]);
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

      const result = step('east');
      expect(result.hasMoved()).to.equal(true);
      expect(result.getPosition()).to.deep.equal({ x:4, y:3 });
      expect(result.hasOpenedDoor()).to.equal(false);
      expect(result.getEnteredRoom()).to.equal(null);
      expect(result.hasRevealedRoom()).to.equal(false);
      expect(result.getEpisode()).to.equal(null);
      expect(result.getTrap()).to.equal(null);
      expect(result.getFoundTraps()).to.deep.equal([]);
      expect(result.hasEncounter()).to.equal(false);
      expect(floor.getPartyPosition()).to.deep.equal({ x:4, y:3 });
    });

    it('goes nowhere when the way is blocked', function() {
      floor.setPartyPosition(4,2);
      Random.stubRoll();

      expect(step('east').hasMoved()).to.equal(false);
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

        expect(step('east').hasEncounter()).to.equal(true);
        expect(step('west').hasEncounter()).to.equal(false);
        expect(step('southeast').hasEncounter()).to.equal(true);
      });

      it('never has an encounter when the encounter rate option is zero', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:0 } });
        Random.stubRoll(0);

        expect(step('east').hasEncounter()).to.equal(false);
      });

      it('has more encounters when the encounter rate option is raised', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:200 } });
        Random.stubRoll(9, 10);

        expect(step('east').hasEncounter()).to.equal(true);
        expect(step('west').hasEncounter()).to.equal(false);
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
        expect(step('east').getOpenedDoor()).to.equal(doorAB);
        expect(doorAB.open).to.equal(true);
        expect(step('west').hasOpenedDoor()).to.equal(false);
        expect(doorAB.open).to.equal(true);
      });

      it('enters the room on the other side', function() {
        Random.stubRoll(missedRoom);
        const result = step('east');

        expect(result.getEnteredRoom()).to.equal(1);
        expect(result.hasRevealedRoom()).to.equal(true);
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

        expect(result.hasRevealedRoom()).to.equal(false);
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
        expect(step('east').hasEncounter()).to.equal(true);
      });

      it('only carries the slight chance of an encounter when walking back into a room', function() {
        Random.stubRoll(missedRoom, 19, 4);

        expect(step('east').hasEncounter()).to.equal(false);
        expect(step('west').hasEncounter()).to.equal(false);
        expect(step('east').hasEncounter()).to.equal(true);
      });

      it('is never ambushed when the encounter rate option is zero', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:0 } });
        Random.stubRoll(0);

        expect(step('east').hasEncounter()).to.equal(false);
      });

      it('is ambushed more often when the encounter rate option is raised', async function() {
        await WorldState.setOptions({ ...WorldState.getOptions(), difficulty:{ damage:100, mitigation:100, resistance:0, encounterRate:200 } });
        Random.stubRoll(39);

        expect(step('east').hasEncounter()).to.equal(true);
      });

      it('enters a nested room through its door', function() {
        floor.setPartyPosition(15,2);
        Random.stubRoll(missedRoom);
        const result = step('south');

        expect(result.getOpenedDoor()).to.equal(doorNested);
        expect(result.getEnteredRoom()).to.equal(6);
        expect(floor.getPartyPosition()).to.deep.equal({ x:15, y:3 });
      });

    });

    // A spike trap on (4,4), the tile southeast of the party. Nothing is scouted where the party is first placed, so
    // the trap is hidden until the party stands beside it. The trap's own rolls come before the encounter roll, and
    // a trap step makes no encounter roll at all: the roll queue proves it by running dry if one is made.
    describe("onto a trap tile", function() {

      beforeEach(function() {
        floor.getRooms()[0].setTileContents(2, 2, { type:TileContentType.trap, code:'spike-trap' });
      });

      it('springs a trap the scout never found', function() {
        Random.stubRoll(0);
        Random.stubRollDice(7);

        const result = step('southeast');
        expect(result.getTrap().target).to.equal(scout);
        expect(result.getTrap().damage).to.equal(7);
        expect(result.getTrap().position).to.deep.equal({ x:4, y:4 });
        expect(result.hasEncounter()).to.equal(false);
        expect(HealthComponent.lookup(scout).currentHealth).to.equal(13);
      });

      it('finds a trap when stepping beside it', function() {
        Random.stubBetween(50,5);
        Random.stubRoll(missedStep);

        const result = step('east');
        expect(result.getTrap()).to.equal(null);
        expect(result.getFoundTraps()).to.deep.equal([{ x:4, y:4 }]);
        expect(floor.getTileContents(4,4).glyph).to.not.be.undefined;
      });

      // The scout's mechanics skill is 0, so the disarm check is followed by a roll for the skill to improve.
      it('disarms a found trap when stepping onto it', function() {
        Random.stubBetween(50,5, 50,5);
        Random.stubRoll(missedStep, 249);

        step('east');
        const result = step('south');
        expect(result.getTrap().title).to.equal('Trap Disarmed');
        expect(result.getTrap().damage).to.equal(0);
        expect(result.hasEncounter()).to.equal(false);
        expect(floor.getTileContents(4,4).state).to.equal('disarmed');
      });

      it('walks over a resolved trap like any other tile', function() {
        Random.stubRoll(0, missedStep, missedStep);
        Random.stubRollDice(7);

        step('southeast');
        step('north');
        const result = step('south');
        expect(result.getTrap()).to.equal(null);
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

        expect(result.getEpisode()).to.equal('orchard-kobolds');
        expect(result.hasEncounter()).to.equal(false);
      });

      it('starts the episode in a room that was revealed on the map but never visited', function() {
        floor.revealRoom(1);
        Random.stubRoll();

        expect(step('east').getEpisode()).to.equal('orchard-kobolds');
      });

      it('does not start the episode again when walking back into the room', function() {
        Random.stubRoll(missedStep, missedStep);

        step('east');
        step('west');
        expect(step('east').getEpisode()).to.equal(null);
      });

      it('has nothing to start once the episode no longer meets its requirements', function() {
        state.setFlag(GameFlags.sixBladeStatus,'met');
        Random.stubRoll(missedRoom);

        expect(step('east').getEpisode()).to.equal(null);
      });

    });

  });

});

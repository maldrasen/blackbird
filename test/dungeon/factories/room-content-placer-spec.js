describe("RoomContentPlacer", function() {

  // Rolls against the rarity weights (200/50/16/4/1, total 271) that land in a given tier.
  const rollCommon = 0;
  const rollRare = 255;

  let floor;

  beforeEach(function() {
    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1, 'up', 'dungeon');
    floor = DungeonSystem.getDungeonFloor();

    ['spec-one','spec-two','spec-three','spec-rare'].forEach(code =>
      RoomContents.register(code,{ description:'Spec contents.' }));
    RoomContents.register('spec-shallow',{ description:'Spec contents.', range:[1,3] });
    RoomContents.register('spec-deep',{ description:'Spec contents.', range:[2,4] });
  });

  function eligibleRooms() {
    const stairs = [...floor.getStairs('up'), ...floor.getStairs('down')];
    return floor.getRooms().filter(room =>
      floor.getFeatureForRoom(room.getIndex()).getType() !== 'corridor' && stairs.includes(room.getIndex()) === false);
  }

  function roomsWithContents() {
    return floor.getRooms().filter(room => room.hasContents());
  }

  function clearContents() {
    floor.getRooms().forEach(room => room.setContents(null));
  }

  it("only places contents in rooms that are neither corridors nor stair rooms", function() {
    clearContents();
    const entries = floor.getRooms().map((room,i) => {
      RoomContents.register(`spec-fill-${i}`,{ description:'Spec contents.' });
      return { code:`spec-fill-${i}`, rarity:Rarity.common };
    });

    Random.stubRoll(...Array(floor.getRooms().length * 3).fill(0));
    RoomContentPlacer(entries).placeContents();

    const eligible = eligibleRooms();
    const placed = roomsWithContents();
    expect(placed).to.not.be.empty;
    placed.forEach(room => expect(eligible).to.include(room));
  });

  // Once roll() is stubbed, from() draws its index from the same queue, so from() is stubbed as well to keep the
  // roll queue to two values per placement: the chance roll and the rarity roll.
  it("never places the same contents twice on a floor", function() {
    clearContents();
    const entries = [
      { code:'spec-one', rarity:Rarity.common },
      { code:'spec-two', rarity:Rarity.common },
      { code:'spec-three', rarity:Rarity.common },
    ];

    Random.stubRoll(0,rollCommon, 0,rollCommon, 0,rollCommon);
    Random.stubFrom(...entries);
    RoomContentPlacer(entries).placeContents();

    const placed = roomsWithContents();
    expect(placed.map(room => room.getContents())).to.deep.equal(['spec-one','spec-two','spec-three']);
    expect(placed).to.deep.equal(eligibleRooms().slice(0,3));
  });

  it("skips rooms that miss the chance roll", function() {
    clearContents();
    const entries = [{ code:'spec-one', rarity:Rarity.common }];

    Random.stubRoll(...Array(floor.getRooms().length).fill(99));
    RoomContentPlacer(entries).placeContents();

    expect(roomsWithContents()).to.be.empty;
  });

  it("steps down to a more common tier when the rolled tier has nothing left", function() {
    clearContents();
    const entries = [{ code:'spec-one', rarity:Rarity.common }];

    Random.stubRoll(0,rollRare);
    Random.stubFrom(entries[0]);
    RoomContentPlacer(entries).placeContents();

    expect(roomsWithContents().map(room => room.getContents())).to.deep.equal(['spec-one']);
  });

  it("places contents whose range includes the floor level", function() {
    clearContents();
    const entries = [{ code:'spec-shallow', rarity:Rarity.common }];

    Random.stubRoll(0,rollCommon);
    Random.stubFrom(entries[0]);
    RoomContentPlacer(entries).placeContents();

    expect(roomsWithContents().map(room => room.getContents())).to.deep.equal(['spec-shallow']);
  });

  it("excludes contents whose range does not include the floor level", function() {
    clearContents();
    const entries = [{ code:'spec-deep', rarity:Rarity.common }];

    RoomContentPlacer(entries).placeContents();

    expect(roomsWithContents()).to.be.empty;
  });

  it("never steps up to a rarer tier than was rolled", function() {
    clearContents();
    const entries = [{ code:'spec-rare', rarity:Rarity.rare }];

    Random.stubRoll(...Array(floor.getRooms().length * 2).fill(0));
    RoomContentPlacer(entries).placeContents();

    expect(roomsWithContents()).to.be.empty;
  });

});

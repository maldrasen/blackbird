describe("TrapSystem", function() {

  let floor;
  let room;
  let player;

  beforeEach(function() {
    RoomContents.register('spec-trap-contents',{
      secrecy: 10,
      trap: {
        damage: { x:2, d:6 },
        damageType: DamageType.pierce,
        hitLocation: EquipmentSlot.legs,
        target: EpisodeTarget.anyInParty,
        onScoutingFailure: () => `The spec trap springs!`,
      },
      description: 'A room with a trap in it.',
    });

    player = CharacterFixtures.genericMale({});
    GameSystem.getState().setPlayer(player);
    PartyConfiguration.setConfiguration({ [player]:'P.0.2' });

    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1);
    floor = DungeonSystem.getDungeonFloor();
    room = floor.getCurrentRoom();
    room.setContents('spec-trap-contents');
  });

  it("springs nothing in a room without contents", function() {
    const empty = floor.getRooms().find(room => room.hasContents() === false);
    expect(TrapSystem.springTrap(empty)).to.equal(null);
  });

  it("springs nothing from contents without a trap", function() {
    RoomContents.register('spec-trapless-contents',{ description:'Nothing dangerous here.' });
    room.setContents('spec-trapless-contents');
    expect(TrapSystem.springTrap(room)).to.equal(null);
  });

  it("springs nothing when the scout has spotted the trap", function() {
    room.setScoutingRoll(15);
    expect(TrapSystem.springTrap(room)).to.equal(null);
  });

  it("damages its target when the scout missed the trap", function() {
    room.setScoutingRoll(5);
    Random.stubRollDice(7);

    const result = TrapSystem.springTrap(room);
    expect(result.target).to.equal(player);
    expect(result.damage).to.equal(7);
    expect(result.text).to.include('The spec trap springs!');
    expect(HealthComponent.lookup(player).currentHealth).to.equal(93);
  });

  // Plate mail reduces pierce damage by 34%.
  it("reduces the damage by the armor covering the hit location", function() {
    const plate = ArmorFactory.build('plate-mail');
    InventoryManager(player).addItem(plate);
    EquipmentManager(player).equipItem(plate, EquipmentSlot.legs);

    room.setScoutingRoll(5);
    Random.stubRollDice(10);

    const result = TrapSystem.springTrap(room);
    expect(result.damage).to.equal(7);
    expect(HealthComponent.lookup(player).currentHealth).to.equal(93);
  });

  it("deals no damage when the trap has none to roll", function() {
    RoomContents.register('spec-harmless-trap-contents',{
      secrecy: 10,
      trap: {
        target: EpisodeTarget.anyInParty,
        onScoutingFailure: () => `The spec trap springs harmlessly.`,
      },
      description: 'A room with a harmless trap in it.',
    });
    room.setContents('spec-harmless-trap-contents');
    room.setScoutingRoll(5);

    const result = TrapSystem.springTrap(room);
    expect(result.damage).to.equal(0);
    expect(HealthComponent.lookup(player).currentHealth).to.equal(100);
  });

  // Trap deaths are deferred to a later task, so for now a trap that kills its target is an error.
  it("throws when the trap kills its target", function() {
    room.setScoutingRoll(5);
    Random.stubRollDice(200);

    expect(() => TrapSystem.springTrap(room)).to.throw('Trap deaths');
    expect(HealthComponent.lookup(player).currentHealth).to.equal(100);
  });

  it("rejects a trap target it doesn't know", function() {
    RoomContents.register('spec-bad-target-contents',{
      secrecy: 10,
      trap: { target:'the-moon' },
      description: 'A room with a confused trap in it.',
    });
    room.setContents('spec-bad-target-contents');
    room.setScoutingRoll(5);

    expect(() => TrapSystem.springTrap(room)).to.throw('Bad trap target');
  });

});

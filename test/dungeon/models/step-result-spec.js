describe("StepResult", function() {
  let floor;
  let door;

  beforeEach(function() {
    floor = DungeonFloor(1,'dungeon');
    DungeonSystem.setDungeonFloor(floor);

    door = Door({ position:{ x:5, y:3 }, direction:'W', from:1, to:0 });
    floor.setDoors([door]);
  });

  function buildResult() {
    return StepResult({
      moved: true,
      position: { x:5, y:3 },
      doorPosition: { x:5, y:3 },
      doorDirection: 'W',
      enteredRoom: 1,
      revealed: true,
      episode: 'orchard-kobolds',
      trap: { position:{ x:5, y:3 }, target:7, damage:4, title:'A Trap!', text:null },
      foundTraps: [{ x:6, y:4 }],
      encounter: true,
    });
  }

  it('reports a blocked step as going nowhere', function() {
    const result = StepResult({ moved:false });

    expect(result.hasMoved()).to.equal(false);
    expect(result.getPosition()).to.equal(null);
    expect(result.hasOpenedDoor()).to.equal(false);
    expect(result.getOpenedDoor()).to.equal(null);
    expect(result.getEnteredRoom()).to.equal(null);
    expect(result.hasRevealedRoom()).to.equal(false);
    expect(result.getEpisode()).to.equal(null);
    expect(result.getTrap()).to.equal(null);
    expect(result.getFoundTraps()).to.deep.equal([]);
    expect(result.hasEncounter()).to.equal(false);
  });

  it('reports everything the step did', function() {
    const result = buildResult();

    expect(result.hasMoved()).to.equal(true);
    expect(result.getPosition()).to.deep.equal({ x:5, y:3 });
    expect(result.hasOpenedDoor()).to.equal(true);
    expect(result.getEnteredRoom()).to.equal(1);
    expect(result.hasRevealedRoom()).to.equal(true);
    expect(result.getEpisode()).to.equal('orchard-kobolds');
    expect(result.getTrap()).to.deep.equal({ position:{ x:5, y:3 }, target:7, damage:4, title:'A Trap!', text:null });
    expect(result.getFoundTraps()).to.deep.equal([{ x:6, y:4 }]);
    expect(result.hasEncounter()).to.equal(true);
  });

  it('reads the opened door fresh from the floor', function() {
    const result = buildResult();
    expect(result.getOpenedDoor().open).to.equal(false);

    floor.openDoor(5,3,'W');
    expect(result.getOpenedDoor().open).to.equal(true);
  });

  it('hands out copies of what it holds', function() {
    const result = buildResult();
    result.getPosition().x = 99;
    result.getTrap().position.x = 99;
    result.getFoundTraps()[0].x = 99;

    expect(result.getPosition()).to.deep.equal({ x:5, y:3 });
    expect(result.getTrap().position).to.deep.equal({ x:5, y:3 });
    expect(result.getFoundTraps()).to.deep.equal([{ x:6, y:4 }]);
  });

});

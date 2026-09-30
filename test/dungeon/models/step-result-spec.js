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
    const result = StepResult();
    result.setPosition({ x:5, y:3 });
    result.setOpenedDoor(door);
    result.setEnteredRoom(1);
    result.setRevealedRoom(true);
    result.setEpisode('orchard-kobolds');
    result.setTrap({ position:{ x:5, y:3 }, target:7, damage:4, title:'A Trap!', text:null });
    result.setFoundTraps([{ x:6, y:4 }]);
    result.setEncounter(true);
    return result;
  }

  it('starts out as a blocked step that went nowhere', function() {
    const result = StepResult();

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

  it('has moved once it has a position', function() {
    const result = StepResult();
    result.setPosition({ x:5, y:3 });

    expect(result.hasMoved()).to.equal(true);
  });

  // The floor still indexes the door by the wall it was set on, so a result that had kept the door's own position
  // object would look it up at (99,3) and find nothing.
  it('keeps a copy of the wall the opened door is on', function() {
    const result = StepResult();
    result.setOpenedDoor(door);
    door.position.x = 99;

    expect(result.getOpenedDoor()).to.equal(door);
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

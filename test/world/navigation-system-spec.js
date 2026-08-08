describe('NavigationSystem', function() {

  it('moves to a district entrance, advancing game time', function() {
    const state = GameSystem.getState();
    state.setCurrentLocation('ruined-living-room');

    const result = NavigationSystem.moveToDistrict('dungeon');

    expect(result.episode).to.equal(null);
    expect(state.getCurrentLocation()).to.equal('the-well');
    expect(state.getGameTime()).to.equal(60);
  });

  it('moves before any location has been set', function() {
    const state = GameSystem.getState();

    const result = NavigationSystem.moveToDistrict('home');

    expect(result.episode).to.equal(null);
    expect(state.getCurrentLocation()).to.equal('ruined-living-room');
  });

  it('returns the episode fired by the move', function() {
    const state = GameSystem.getState();
    state.setCurrentLocation('ruined-living-room');
    state.setPlayer(Registry.createEntity());
    EpisodeQueue.seed(['debug-strange-mist']);
    Random.stubRoll(0);

    const result = NavigationSystem.moveToDistrict('dungeon');

    expect(result.episode).to.equal('debug-strange-mist');
    expect(state.getCurrentLocation()).to.equal('the-well');
  });

  it('moves between locations within a district, advancing by the district move time', function() {
    const state = GameSystem.getState();
    state.setCurrentLocation('the-well');

    const result = NavigationSystem.moveWithinLocation('the-well');

    expect(result.episode).to.equal(null);
    expect(state.getGameTime()).to.equal(10);
  });

});

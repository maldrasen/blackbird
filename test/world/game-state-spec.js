describe('GameState', function() {

  it('packs game state', function() {
    GameState.reset();
    GameState.setCurrentLocation('the-piss-pits');
    GameState.setPartyConfiguration({ whatever:'stuff' });

    const packed = GameState.pack();

    expect(packed.currentLocation).to.equal('the-piss-pits');
    expect(packed.partyConfiguration.whatever).to.equal('stuff');
  });

  it('unpacks game state', function() {
    GameState.unpack({ currentLocation:'wherever', partyConfiguration:{ stuff:'thing' }});

    expect(GameState.getCurrentLocation()).to.equal('wherever');
    expect(GameState.getPartyConfiguration().stuff).to.equal('thing');
  });

});

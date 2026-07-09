describe('GameState', function() {

  it('packs game state', function() {
    const state = GameState();
    state.setCurrentLocation('the-piss-pits');
    state.setPartyConfiguration({ whatever:'stuff' });

    const packed = state.pack();

    expect(packed.currentLocation).to.equal('the-piss-pits');
    expect(packed.partyConfiguration.whatever).to.equal('stuff');
  });

  // Constructing a state from packed data replaces the old unpack().
  it('builds state from packed data', function() {
    const state = GameState({ currentLocation:'wherever', partyConfiguration:{ stuff:'thing' }});

    expect(state.getCurrentLocation()).to.equal('wherever');
    expect(state.getPartyConfiguration().stuff).to.equal('thing');
  });

});

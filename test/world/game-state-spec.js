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

  it('tracks the roster of owned characters without duplicates', function() {
    const goblin = Registry.createEntity();
    const slime = Registry.createEntity();
    const imp = Registry.createEntity();

    const state = GameState();
    state.addToRoster(goblin);
    state.addToRoster(slime);
    state.addToRoster(goblin);

    expect(state.getRoster()).to.eql([goblin,slime]);
    expect(state.isInRoster(slime)).to.equal(true);
    expect(state.isInRoster(imp)).to.equal(false);

    state.removeFromRoster(goblin);
    expect(state.getRoster()).to.eql([slime]);
  });

  it('packs and restores the roster', function() {
    const goblin = Registry.createEntity();
    const slime = Registry.createEntity();

    const state = GameState({ roster:[goblin,slime] });

    expect(state.getRoster()).to.eql([goblin,slime]);
    expect(state.pack().roster).to.eql([goblin,slime]);
  });

});

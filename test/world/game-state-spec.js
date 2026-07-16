describe('GameState', function() {

  it('packs game state', function() {
    const state = GameState();
    state.setCurrentLocation('the-piss-pits');
    state.setPartyConfiguration({ whatever:'stuff' });

    const packed = state.pack();

    expect(packed.location).to.equal('the-piss-pits');
    expect(packed.party.whatever).to.equal('stuff');
  });

  it('packs fractional game time as whole minutes', function() {
    const state = GameState({ gameTime:780 });
    state.advanceGameTime(0.25);
    state.advanceGameTime(0.25);

    expect(state.getGameTime()).to.equal(780.5);
    expect(state.pack().gameTime).to.equal(781);
  });

  it('builds state from packed data', function() {
    const state = GameState({ location:'wherever', party:{ stuff:'thing' }});

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

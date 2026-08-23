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

  it('tracks the episode queue without duplicate codes', function() {
    const state = GameState();
    state.pushEpisode('game-over','global');
    state.pushEpisode('propose-training','district:dungeon');
    state.pushEpisode('game-over','location:the-well');

    expect(state.getEpisodes()).to.eql([
      { code:'game-over', place:'global' },
      { code:'propose-training', place:'district:dungeon' },
    ]);

    state.removeEpisode('game-over');
    expect(state.getEpisodes()).to.eql([{ code:'propose-training', place:'district:dungeon' }]);
  });

  it('packs and restores the episode queue', function() {
    const state = GameState({ episodeQueue:[{ code:'game-over', place:'global' }] });
    state.pushEpisode('propose-training','location:the-well');

    const packed = state.pack();
    expect(packed.episodeQueue).to.eql([
      { code:'game-over', place:'global' },
      { code:'propose-training', place:'location:the-well' },
    ]);

    const restored = GameState(packed);
    expect(restored.getEpisodes()).to.eql(packed.episodeQueue);
  });

  it('packs and restores the roster', function() {
    const goblin = Registry.createEntity();
    const slime = Registry.createEntity();

    const state = GameState({ roster:[goblin,slime] });

    expect(state.getRoster()).to.eql([goblin,slime]);
    expect(state.pack().roster).to.eql([goblin,slime]);
  });

  it('builds an empty dungeon state for a new game', function() {
    const state = GameState();

    expect(state.getDungeonState().pack()).to.eql({ discoveredFonts:[] });
    expect(state.pack().dungeonState).to.eql({ discoveredFonts:[] });
  });

  it('packs and restores the dungeon state', function() {
    const state = GameState({ dungeonState:{ discoveredFonts:[1,3] } });

    const packed = state.pack();
    expect(packed.dungeonState).to.eql({ discoveredFonts:[1,3] });

    const restored = GameState(packed);
    expect(restored.getDungeonState().pack()).to.eql({ discoveredFonts:[1,3] });
  });

});

describe("WorldState", function() {

  it("provides default options without loading state", function() {
    expect(WorldState.getOptions().difficulty).to.deep.equal({ damage:100, mitigation:100, resistance:0, encounterRate:100 });
  });

  it("round trips options without writing to disk", async function() {
    await WorldState.setOptions({ difficulty:{ damage:200, mitigation:150, resistance:10 } });
    expect(WorldState.getOptions().difficulty.damage).to.equal(200);
    expect(fs.existsSync(`${ROOT}/World-State.json`)).to.equal(false);
  });

  it("restores pristine defaults after a reset", function() {
    WorldState.getOptions().difficulty.damage = 999;
    WorldState.reset();
    expect(WorldState.getOptions().difficulty.damage).to.equal(100);
  });

  it("fills a state missing options entirely with the defaults", function() {
    const merged = WorldState.mergeDefaults({ previousGame:'g1' });
    expect(merged.previousGame).to.equal('g1');
    expect(merged.options.difficulty).to.deep.equal({ damage:100, mitigation:100, resistance:0, encounterRate:100 });
  });

  it("removes a saved game and forgets it as the previous game", async function() {
    await WorldState.setValue('savedGames', { g1:{ legacyName:'One' }, g2:{ legacyName:'Two' } });
    await WorldState.setPreviousGame('g1');

    await WorldState.removeSavedGame('g1');
    expect(WorldState.getSavedGames()).to.deep.equal({ g2:{ legacyName:'Two' } });
    expect(WorldState.getPreviousGame()).to.equal(undefined);
    WorldState.reset();
  });

  it("keeps the previous game when a different save is removed", async function() {
    await WorldState.setValue('savedGames', { g1:{ legacyName:'One' }, g2:{ legacyName:'Two' } });
    await WorldState.setPreviousGame('g1');

    await WorldState.removeSavedGame('g2');
    expect(WorldState.getPreviousGame()).to.equal('g1');
    WorldState.reset();
  });

  it("keeps loaded values while filling missing difficulty keys", function() {
    const merged = WorldState.mergeDefaults({ options:{ difficulty:{ damage:200 } } });
    expect(merged.options.difficulty).to.deep.equal({ damage:200, mitigation:100, resistance:0, encounterRate:100 });
  });

});

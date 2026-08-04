describe("WorldState", function() {

  it("provides default options without loading state", function() {
    expect(WorldState.getOptions().difficulty).to.deep.equal({ damage:100, mitigation:100, resistance:0 });
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
    expect(merged.options.difficulty).to.deep.equal({ damage:100, mitigation:100, resistance:0 });
  });

  it("keeps loaded values while filling missing difficulty keys", function() {
    const merged = WorldState.mergeDefaults({ options:{ difficulty:{ damage:200 } } });
    expect(merged.options.difficulty).to.deep.equal({ damage:200, mitigation:100, resistance:0 });
  });

});

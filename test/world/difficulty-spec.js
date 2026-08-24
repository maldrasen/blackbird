describe("Difficulty", function() {

  it("provides neutral factors at the default difficulty", function() {
    expect(Difficulty.getDamageFactor()).to.equal(1);
    expect(Difficulty.getMitigationFactor()).to.equal(1);
    expect(Difficulty.getResistance()).to.equal(0);
    expect(Difficulty.getEncounterFactor()).to.equal(1);
  });

  it("converts the difficulty options into factors", async function() {
    await WorldState.setOptions({ difficulty:{ damage:200, mitigation:400, resistance:25, encounterRate:50 } });
    expect(Difficulty.getDamageFactor()).to.equal(2);
    expect(Difficulty.getMitigationFactor()).to.equal(0.25);
    expect(Difficulty.getResistance()).to.equal(25);
    expect(Difficulty.getEncounterFactor()).to.equal(0.5);
  });

});

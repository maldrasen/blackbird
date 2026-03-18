describe("SensationBaseline", function() {

  it("baseline sensations", function() {
    const context = TrainingFixtures.standardTrainingContext({},{});
    const result = SensationResult('massage-back',context);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.comfort).to.equal(50);
    expect(sensations.desire).to.equal(10);
    expect(result.getPlayerSensations().desire).to.equal(10);
  });

  it('sensations when reluctant', function() {
    const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ respect:160 } });
    const result = SensationResult('get-handjob', context);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.desire).to.equal(30);
    expect(sensations.shame).to.equal(120);
    expect(sensations.submission).to.equal(120);
    expect(result.getPlayerSensations().cock).to.equal(60);
  });

  it('sensations when unwilling', function() {
    const context = TrainingFixtures.standardTrainingContext({},{});
    const result = SensationResult('fondle-breasts', context);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.nipple).to.equal(30);
    expect(sensations.anger).to.equal(100);
    expect(sensations.suffering).to.equal(100);
    expect(result.getPlayerSensations().desire).to.equal(30);
  });

});

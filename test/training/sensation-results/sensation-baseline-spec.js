describe("SensationBaseline", function() {

  it("baseline sensations", function() {
    const state = TrainingFixtures.standardTrainingState({},{});
    const result = SensationResult('massage-back',state);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.comfort).to.equal(50);
    expect(sensations.desire).to.equal(10);
    expect(result.getPlayerSensations().desire).to.equal(10);
  });

  it('sensations when reluctant', function() {
    const state = TrainingFixtures.standardTrainingState({},{ feelings:{ respect:160 } });
    const result = SensationResult('get-handjob', state);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.desire).to.equal(30);
    expect(sensations.shame).to.equal(120);
    expect(sensations.submission).to.equal(120);
    expect(result.getPlayerSensations().cock).to.equal(60);
  });

  it('sensations when unwilling', function() {
    const state = TrainingFixtures.standardTrainingState({},{});
    const result = SensationResult('fondle-breasts', state);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.nipple).to.equal(30);
    expect(sensations.anger).to.equal(200);
    expect(sensations.suffering).to.equal(150);
    expect(result.getPlayerSensations().desire).to.equal(30);
  });

  it('sensations when the action is repeated', function() {
    const state = TrainingFixtures.standardTrainingState({},{});
    state.setPreviousAction('fondle-pussy');

    const result = SensationResult('fondle-pussy', state);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.pussy).to.equal(13);
    expect(sensations.anger).to.equal(200);
  });

  it(`sensations when there are persisted actions`, function() {
    const state = TrainingFixtures.standardTrainingState({},{ feelings:{ affection:200, respect:200 } });
    state.addPersistedAction('fondle-breasts');
    state.addPersistedAction('kiss');

    const result = SensationResult('fuck-pussy', state);
    SensationBaseline.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.comfort).to.equal(74);
    expect(sensations.nipple).to.equal(20);
    expect(sensations.pussy).to.equal(100);
  });

});

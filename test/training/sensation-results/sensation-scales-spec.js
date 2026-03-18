describe("SensationScales", function() {

  it("adds a factor for the scale", function() {
    const state = TrainingFixtures.standardTrainingState({},{ arousal: { arousal:75 }});
    state.setPartnerScaleValue('pussy',2000);
    state.setPartnerScaleValue('clit',5000);
    state.setPartnerScaleValue('anus',20000);

    const result = SensationResult('lap-dance',state);
    SensationBaseline.apply(result);
    SensationScales.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.pussy).to.equal(5);
    expect(sensations.clit).to.equal(8);
    expect(sensations.anus).to.equal(10);
  });

});

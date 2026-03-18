describe("SensationResult", function() {

  it("all together, when there are multiple sensitivities", function() {
    Random.stubBetween(99,99,99,99,0);

    const state = TrainingFixtures.standardTrainingState({},{
      arousal: { arousal:75 },
      sexualPreferences:{ 'pussy-slut':50, 'masturbator':70 } });
    state.setPartnerScaleValue('pussy',1000);

    const result = SensationResult.build('masturbate-pussy',state);
    const pussySensations = result.getResponse().partner.pussy;
    expect(pussySensations.length).to.equal(7);
    expect(pussySensations[5].label).to.equal('Pussy Slut');
    expect(Math.round(pussySensations[5].value * 100)).to.equal(188)
    expect(pussySensations[6].label).to.equal('Masturbator');
    expect(Math.round(pussySensations[6].value * 100)).to.equal(273)
    expect(Math.round(result.getPartnerSensations().pussy)).to.equal(2364);
  });

});

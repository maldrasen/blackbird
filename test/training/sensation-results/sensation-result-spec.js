describe("SensationResult", function() {

  it("all together, when there are multiple sensitivities", function() {
    Random.stubBetween(99,99,99,99,0);

    const state = TrainingFixtures.standardTrainingState({},{
      arousal: { arousal:75 },
      sexualPreferences:{ 'pussy-slut':50, 'masturbator':70 } });

    const result = SensationResult.build('masturbate-pussy',state);
    const pussySensations = result.getResponse().partner.pussy;
    expect(pussySensations.length).to.equal(6);

    expect(pussySensations[4].label).to.equal('Pussy Slut');
    expect(Math.round(pussySensations[4].value * 100)).to.equal(188)
    expect(pussySensations[5].label).to.equal('Masturbator');
    expect(Math.round(pussySensations[5].value * 100)).to.equal(273)
    expect(Math.round(result.getPartnerSensations().pussy)).to.equal(2364);
  });

});

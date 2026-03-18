describe("SensationPreferences", function() {

  it("there is a body part preference", function() {
    const state = TrainingFixtures.standardTrainingState({},{
      arousal: { arousal:75 },
      sexualPreferences:{ 'anal-slut':50 } });

    const result = SensationResult('suck-anus',state);
    SensationBaseline.apply(result);
    SensationPreferences.apply(result, { type:'preference', code:'anal-slut', scale:2.5 });

    expect(result.getPartnerSensations().anus).to.equal(185);
  });

});

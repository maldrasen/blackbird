describe("SensationArousal", function() {

  it("applies arousal",function() {
    const context = TrainingFixtures.standardTrainingContext(
      { arousal: { arousal:25 }},
      { arousal: { arousal:75 }, feelings:{ affection:400, respect:600 } });

    const result = SensationResult('get-deepthroat', context);
    SensationBaseline.apply(result);
    SensationArousal.apply(result, { strength:0.8 });

    const partnerSensations = result.getPartnerSensations();
    const playerSensations = result.getPlayerSensations();

    expect(partnerSensations.anger).to.equal(36);
    expect(partnerSensations.submission).to.equal(420);
    expect(playerSensations.cock).to.equal(100);
  });

});

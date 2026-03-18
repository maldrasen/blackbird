describe("SensationResult", function() {

/*
  describe("applyArousal()", function() {
    it("applies arousal",function() {
      const context = TrainingFixtures.standardTrainingContext(
        { arousal: { arousal:25 }},
        { arousal: { arousal:75 }, feelings:{ affection:400, respect:600 } });

      const result = SensationResult('get-deepthroat', context);
      SensationBaseline.apply(result);
      result.applyArousal({ strength:0.8 });

      const partnerSensations = result.getPartnerSensations();
      const playerSensations = result.getPlayerSensations();

      expect(partnerSensations.anger).to.equal(36);
      expect(partnerSensations.submission).to.equal(420);
      expect(playerSensations.cock).to.equal(100);
    });
  });

  describe("applyPreference()", function() {
    it("there is a body part preference", function() {
      const context = TrainingFixtures.standardTrainingContext({},{
        arousal: { arousal:75 },
        sexualPreferences:{ 'anal-slut':50 } });

      const result = SensationResult('suck-anus',context);
      SensationBaseline.apply(result);
      result.applyPreference({ type:'preference', code:'anal-slut', scale:2.5 });

      expect(result.getPartnerSensations().anus).to.equal(185);
    });
*/

    it("REFACTORING");

  //   it("all together, when there are multiple sensitivities", function() {
  //     Random.stubBetween(99,99,99,99,0);
  //
  //     const context = TrainingFixtures.standardTrainingContext({},{
  //       arousal: { arousal:75 },
  //       sexualPreferences:{ 'pussy-slut':50, 'masturbator':70 } });
  //
  //     const result = SensationResult('masturbate-pussy',context);
  //     result.applyFactors();
  //
  //     const pussySensations = result.getResponse().partner.pussy;
  //     expect(pussySensations.length).to.equal(6);
  //
  //     expect(pussySensations[4].label).to.equal('Pussy Slut');
  //     expect(Math.round(pussySensations[4].value * 100)).to.equal(188)
  //     expect(pussySensations[5].label).to.equal('Masturbator');
  //     expect(Math.round(pussySensations[5].value * 100)).to.equal(273)
  //     expect(Math.round(result.getPartnerSensations().pussy)).to.equal(2364);
  //   });
  // });


  // This is all a work in progress still.
  describe("applyAlignment()", function() {
    it("when alignment is submission");
    it("when alignment is masochism");
    it("when alignment is shame");
  });

});

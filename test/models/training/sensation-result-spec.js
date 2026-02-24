describe("SensationResult", function() {

  it("calculates the baseline sensation", function() {
    const context = TrainingFixtures.standardTrainingContext({},{});
    const result = SensationResult('massage-back',context);
    result.applyBaseline();

    const response = result.getResponse();
    console.log(response);
  });

});
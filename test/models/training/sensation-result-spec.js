describe("SensationResult", function() {

  describe('applyBaseline()', function() {
    it("applyBaseline() sensations", function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const result = SensationResult('massage-back',context);
      result.applyBaseline();

      const sensations = result.getSensations();
      expect(sensations.comfort).to.equal(30);
      expect(sensations.desire).to.equal(10);
    });

    it('applyBaseline() sensations when reluctant', function() {
      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ respect:160 } });
      const result = SensationResult('get-handjob', context);
      result.applyBaseline();

      const sensations = result.getSensations();
      expect(sensations.desire).to.equal(30);
      expect(sensations.shame).to.equal(120);
      expect(sensations.submission).to.equal(120);
    });

    it('applyBaseline() sensations when unwilling', function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const result = SensationResult('fondle-breasts', context);
      result.applyBaseline();

      const sensations = result.getSensations();
      expect(sensations.nipple).to.equal(30);
      expect(sensations.anger).to.equal(100);
      expect(sensations.suffering).to.equal(100);
    });
  });

});
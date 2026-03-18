describe("SensationTechnique", function() {

  describe('apply()', function() {
    it('when player has no skill', function() {
      Random.stubBetween(50,15);

      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      SensationBaseline.apply(result);
      SensationTechnique.apply(result);

      const clitSensations = result.getResponse().partner.clit;
      expect(clitSensations[1].label).to.equal('Technique');
      expect(clitSensations[1].value).to.equal(25);
      expect(result.getSkillsUsed().player).to.contain('technique');
    });

    it("when partner is 'performing' with double skill target", function() {
      Random.stubBetween(50,15);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { technique:30 },
        feelings:{ respect:350 }});

      const result = SensationResult('masturbate-anus', context);
      SensationBaseline.apply(result);
      SensationTechnique.apply(result);

      expect(result.getPartnerSensations().anus).to.equal(135);

      const anusSensations = result.getResponse().partner.anus;
      expect(anusSensations[1].label).to.equal('Pleasing Technique');
      expect(anusSensations[1].extra).to.equal('good');
      expect(anusSensations[1].value).to.equal(65);
    });

    it("crit when partner is 'performing'", function() {
      Random.stubBetween(99);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { technique:30 },
        feelings:{ respect:350 }});

      const result = SensationResult('masturbate-anus', context);
      SensationBaseline.apply(result);
      SensationTechnique.apply(result);

      const anusSensations = result.getResponse().partner.anus;
      expect(anusSensations[1].label).to.equal('Excellent Technique');
      expect(anusSensations[1].extra).to.equal('crit');
      expect(anusSensations[1].value).to.equal(130);

      const desireSensations = result.getResponse().partner.desire;
      expect(desireSensations[1].label).to.equal('Excellent Technique');
      expect(desireSensations[1].value).to.equal(50);
    });

    it("fumble when partner is 'performing'", function() {
      Random.stubBetween(1);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { technique:30 },
        feelings: { respect:350 }});

      const result = SensationResult('masturbate-anus', context);
      SensationBaseline.apply(result);
      SensationTechnique.apply(result);

      // Only baseline sensations are received, because technique value was reduced to 0.
      expect(result.getResponse().partner.anus.length).to.equal(1);
    });
  });

});

describe("SensationResult", function() {

  describe('applyBaseline()', function() {
    it("applyBaseline() sensations", function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const result = SensationResult('massage-back',context);
      result.applyBaseline();

      const sensations = result.getPartnerSensations();
      expect(sensations.comfort).to.equal(30);
      expect(sensations.desire).to.equal(10);
      expect(result.getPlayerSensations().desire).to.equal(10);
    });

    it('applyBaseline() sensations when reluctant', function() {
      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ respect:160 } });
      const result = SensationResult('get-handjob', context);
      result.applyBaseline();

      const sensations = result.getPartnerSensations();
      expect(sensations.desire).to.equal(30);
      expect(sensations.shame).to.equal(120);
      expect(sensations.submission).to.equal(120);
      expect(result.getPlayerSensations().cock).to.equal(60);

    });

    it('applyBaseline() sensations when unwilling', function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const result = SensationResult('fondle-breasts', context);
      result.applyBaseline();

      const sensations = result.getPartnerSensations();
      expect(sensations.nipple).to.equal(30);
      expect(sensations.anger).to.equal(100);
      expect(sensations.suffering).to.equal(100);
      expect(result.getPlayerSensations().desire).to.equal(30);
    });
  });

  describe('applyTechnique()', function() {
    it("applyTechnique() when partner is 'performing'", function() {
      Random.stubBetween(50,15);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { technique:30 },
        feelings:{ respect:350 }});

      const result = SensationResult('masturbate-anus', context);
      result.applyBaseline();
      result.applyTechnique();

      expect(Math.round(result.getPartnerSensations().anus)).to.equal(103);

      const anusSensations = result.getResponse().partner.anus;
      expect(anusSensations[1].label).to.equal('Technique');
      expect(anusSensations[1].extra).to.be.null;
      expect(anusSensations[1].value).to.equal(32.5);
    });

    it("applyTechnique() crit when partner is 'performing'", function() {
      Random.stubBetween(99,15);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { technique:30 },
        feelings:{ respect:350 }});

      const result = SensationResult('masturbate-anus', context);
      result.applyBaseline();
      result.applyTechnique();

      const anusSensations = result.getResponse().partner.anus;
      expect(anusSensations[1].label).to.equal('Excellent Technique');
      expect(anusSensations[1].extra).to.equal('crit');
      expect(anusSensations[1].value).to.equal(65);

      const desireSensations = result.getResponse().partner.desire;
      expect(desireSensations[1].label).to.equal('Excellent Technique');
      expect(desireSensations[1].value).to.equal(50);
    });

    it("applyTechnique() fumble when partner is 'performing'", function() {
      Random.stubBetween(1,15);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { technique:30 },
        feelings:{ respect:350 }});

      const result = SensationResult('masturbate-anus', context);
      result.applyBaseline();
      result.applyTechnique();

      // Only baseline sensations are received, because technique value was reduced to 0.
      expect(result.getResponse().partner.anus.length).to.equal(1);
    });

    it('applyTechnique() when player has no skill', function() {
      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      result.applyBaseline();
      result.applyTechnique();

      console.log(result.getResponse());
    });
  });

  describe('applySkills()', function() {
    it('applySkills() when player has no skill', function() {
      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      result.applyBaseline();
      result.applySkills();
    });

    it('applySkills() player has skill', function() {
      const context = TrainingFixtures.standardTrainingContext(
        { skills:{ servicing:20 }},
        { feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      result.applyBaseline();
      result.applySkills();
    });
  });

});
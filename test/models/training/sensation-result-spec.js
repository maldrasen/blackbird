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
    it('when player has no skill', function() {
      Random.stubBetween(50,15);

      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      result.applyBaseline();
      result.applyTechnique();

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
      result.applyBaseline();
      result.applyTechnique();

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
      result.applyBaseline();
      result.applyTechnique();

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
      result.applyBaseline();
      result.applyTechnique();

      // Only baseline sensations are received, because technique value was reduced to 0.
      expect(result.getResponse().partner.anus.length).to.equal(1);
    });
  });

  describe('applyPerformance()', function() {
    it('when normal performance focused action', function() {
      Random.stubBetween(50,10);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { respect:150 }});

      const result = SensationResult('striptease', context);
      result.applyBaseline();
      result.applyPerformance();

      expect(Math.round(result.getPlayerSensations().desire)).to.equal(65);
      expect(result.getSkillsUsed().partner).to.contain('performance');
    });

    it('when performance focused action crits', function() {
      Random.stubBetween(99); // Technique Roll
      Random.stubBetween(99); // Performance Roll

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { respect:400 }});

      const result = SensationResult('masturbate-pussy', context);
      result.applyBaseline();
      result.applyTechnique();
      result.applyPerformance();

      const pussySensations = result.getResponse().partner.pussy;
      expect(pussySensations[2].label).to.equal('Excellent Performance');
      expect(pussySensations[2].extra).to.equal('crit');
      expect(Math.round(pussySensations[2].value)).to.equal(32);
      expect(Math.round(result.getPartnerSensations().pussy)).to.equal(182);
    });

    it('when performance focused action fumbles', function() {
      Random.stubBetween(1);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { respect:400 }});

      const result = SensationResult('masturbate-pussy', context);
      result.applyBaseline();
      result.applyPerformance();

      // Only baseline sensations added to pussy on fumble.
      expect(result.getResponse().partner.pussy.length).to.equal(1);

      const shameSensations = result.getResponse().partner.shame;
      expect(shameSensations[1].extra).to.equal('fumble');
      expect(shameSensations[1].label).to.equal('Terrible Performance');
      expect(shameSensations[1].value).to.equal(80);
    });

    it('when performance focused action with player sensations', function() {
      Random.stubBetween(50,10); // Technique Roll
      Random.stubBetween(50,12); // Performance Roll

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { respect:200 }});

      const result = SensationResult('lap-dance', context);
      result.applyBaseline();
      result.applyTechnique();
      result.applyPerformance();

      expect(Math.round(result.getPlayerSensations().cock)).to.equal(90);
      expect(Math.round(result.getPartnerSensations().clit)).to.equal(24);
    });

    it('when critical performance focused action with player sensations', function() {
      Random.stubBetween(50,10); // Technique Roll
      Random.stubBetween(99);    // Performance Roll

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { respect:200 }});

      const result = SensationResult('lap-dance', context);
      result.applyBaseline();
      result.applyTechnique();
      result.applyPerformance();

      expect(Math.round(result.getPlayerSensations().cock)).to.equal(122);
      expect(Math.round(result.getPartnerSensations().clit)).to.equal(55);

      const clitSensations = result.getResponse().partner.clit;
      expect(clitSensations[2].extra).to.equal('crit');
      expect(clitSensations[2].label).to.equal('Excellent Performance');
      expect(Math.round(clitSensations[0].value)).to.equal(5);
      expect(Math.round(clitSensations[1].value)).to.equal(19);
      expect(Math.round(clitSensations[2].value)).to.equal(32);

      expect(result.getSkillsUsed().partner).to.contain('technique');
      expect(result.getSkillsUsed().partner).to.contain('performance');
    });

    it('when normal action with default performance', function() {
      Random.stubBetween(50,10);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { affection:180, respect:180 }});

      const result = SensationResult('fondle-breasts', context);
      result.applyBaseline();
      result.applyPerformance();

      const desireSensations = result.getResponse().player.desire;
      expect(desireSensations[1].label).to.equal('Performance')
      expect(Math.round(desireSensations[1].value)).to.equal(14)
      expect(result.getSkillsUsed().partner).to.include('performance');
    });

    it('when normal action with reluctant consent', function() {
      Random.stubBetween(50,10);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { affection:140, respect:140 }});

      const result = SensationResult('fondle-breasts', context);
      result.applyBaseline();
      result.applyPerformance();

      const desireSensations = result.getResponse().player.desire;
      expect(desireSensations[1].label).to.equal('Performance')
      expect(Math.round(desireSensations[1].value)).to.equal(7)
    });

    it('when normal action with fumbled performance', function() {
      Random.stubBetween(1);

      const context = TrainingFixtures.standardTrainingContext({},{
        skills: { performance:20 },
        feelings: { affection:180, respect:180 }});

      const result = SensationResult('fondle-breasts', context);
      result.applyBaseline();
      result.applyPerformance();

      const response = result.getResponse();
      const shameSensations = response.partner.shame;

      expect(shameSensations[1].extra).to.equal("fumble");
      expect(shameSensations[1].label).to.equal("Terrible Performance");
      expect(shameSensations[1].value).to.equal(60);
      expect(response.player.desire.length).to.equal(1);
    });
  });

  // describe('applySkills()', function() {
  //   it('applySkills() when player has no skill', function() {
  //     const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ affection:150 }});
  //     const result = SensationResult('suck-pussy', context);
  //     result.applyBaseline();
  //     result.applySkills();
  //   });
  //
  //   it('applySkills() player has skill', function() {
  //     const context = TrainingFixtures.standardTrainingContext(
  //       { skills:{ servicing:20 }},
  //       { feelings:{ affection:150 }});
  //     const result = SensationResult('suck-pussy', context);
  //     result.applyBaseline();
  //     result.applySkills();
  //   });
  // });

});
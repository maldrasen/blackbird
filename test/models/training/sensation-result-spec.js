describe("SensationResult", function() {

  describe('applyBaseline()', function() {
    it("baseline sensations", function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const result = SensationResult('massage-back',context);
      result.applyBaseline();

      const sensations = result.getPartnerSensations();
      expect(sensations.comfort).to.equal(30);
      expect(sensations.desire).to.equal(10);
      expect(result.getPlayerSensations().desire).to.equal(10);
    });

    it('sensations when reluctant', function() {
      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ respect:160 } });
      const result = SensationResult('get-handjob', context);
      result.applyBaseline();

      const sensations = result.getPartnerSensations();
      expect(sensations.desire).to.equal(30);
      expect(sensations.shame).to.equal(120);
      expect(sensations.submission).to.equal(120);
      expect(result.getPlayerSensations().cock).to.equal(60);
    });

    it('sensations when unwilling', function() {
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
      expect(result.getSkillsUsed().partner).to.not.include('performance');
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

  describe('applyPlayerSkill()', function() {
    it('when player has no skill', function() {
      Random.stubBetween(50,1);

      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      result.applyBaseline();
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.comfort).to.equal(50)
      expect(sensations.pussy).to.equal(43)
    });

    it('when player has skill', function() {
      Random.stubBetween(50,23);

      const context = TrainingFixtures.standardTrainingContext(
        { attributes:{ dexterity:30, vitality:30 }, skills:{ servicing:20 }},
        { feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      result.applyBaseline();
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.comfort).to.equal(50)
      expect(Math.round(sensations.pussy)).to.equal(62)
    });

    it('when skill fumbles', function() {
      Random.stubBetween(1);

      const context = TrainingFixtures.standardTrainingContext(
        { attributes:{ dexterity:30, vitality:30 }, skills:{ servicing:20 }},
        { feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      result.applyBaseline();
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.anger).to.equal(100);
      expect(sensations.comfort).to.equal(25);
      expect(Math.round(sensations.pussy)).to.equal(5);

      const pussySensations = result.getResponse().partner.pussy;
      expect(pussySensations[1].label).to.equal('Clumsy Servicing')
      expect(pussySensations[1].extra).to.equal('fumble')
      expect(Math.round(pussySensations[1].value * 100)).to.equal(13)
    });

    it('when skill crits', function() {
      Random.stubBetween(99);

      const context = TrainingFixtures.standardTrainingContext(
        { attributes:{ strength:30, vitality:30 }, skills:{ ravishing:30 }},
        { feelings:{ affection:400 }});
      const result = SensationResult('fuck-pussy', context);
      result.applyBaseline();
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.anger).to.equal(10);
      expect(sensations.comfort).to.equal(60);
      expect(Math.round(sensations.pussy)).to.equal(239);

      const pussySensations = result.getResponse().partner.pussy;
      expect(pussySensations[1].label).to.equal('Skillful Ravishing');
      expect(pussySensations[1].extra).to.equal('crit');
      expect(Math.round(pussySensations[1].value * 100)).to.equal(239);
      expect(result.getSkillsUsed().player).to.include('ravishing');
    });
  });

  describe('applyPartnerSkill()', function() {
    it('when normal skill', function() {
      Random.stubBetween(50,19);

      const context = TrainingFixtures.standardTrainingContext({},{
        feelings:{ respect:250, affection:200 },
        skills:{ servicing:20 },
        attributes:{ dexterity:30, vitality:20 }
      });

      const result = SensationResult('get-blowjob', context);
      result.applyBaseline();
      result.applySkills();

      expect(result.getPlayerSensations().cock).to.equal(116);
      expect(result.getSkillsUsed().partner).to.include('servicing');
    });

    it(`when fumbled skill`, function() {
      Random.stubBetween(1);

      const context = TrainingFixtures.standardTrainingContext({},{
        feelings:{ respect:250, affection:200 },
        skills:{ servicing:20 },
        attributes:{ dexterity:30, vitality:20 }
      });

      const result = SensationResult('get-blowjob', context);
      result.applyBaseline();
      result.applySkills();

      const cockSensations = result.getResponse().player.cock;

      expect(Math.round(result.getPlayerSensations().cock)).to.equal(9);
      expect(result.getPartnerSensations().shame).to.equal(90);
      expect(cockSensations[1].label).to.equal('Clumsy Servicing')
      expect(Math.round(cockSensations[1].value * 100)).to.equal(11);
    });
  });

  describe('applyPartnerDancing()', function() {
    it('when normal dancing', function() {
      Random.stubBetween(50,25);

      const context = TrainingFixtures.standardTrainingContext({},{
        feelings:{ respect:200, affection:200 },
        skills:{ dancing:30 },
        attributes:{ dexterity:30, beauty:40 }
      });

      const result = SensationResult('striptease', context);
      result.applyBaseline();
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.shame).to.equal(40);
      expect(Math.round(sensations.submission)).to.equal(104);
      expect(result.getSkillsUsed().partner).to.include('dance');
    });

    it('when fumbled dancing', function() {
      Random.stubBetween(1);

      const context = TrainingFixtures.standardTrainingContext({},{
        feelings:{ respect:200, affection:200 },
        skills:{ dancing:30 },
        attributes:{ dexterity:30, beauty:40 }
      });

      const result = SensationResult('striptease', context);
      result.applyBaseline();
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.shame).to.equal(120);
      expect(Math.round(sensations.submission)).to.equal(48);
    });
  });

  describe("applyArousal()", function() {
    it("applies arousal",function() {
      const context = TrainingFixtures.standardTrainingContext(
        { arousal: { arousal:25 }},
        { arousal: { arousal:75 }, feelings:{ affection:400, respect:600 } });

      const result = SensationResult('get-deepthroat', context);
      result.applyBaseline();
      result.applyArousal({ strength:0.8 });

      const partnerSensations = result.getPartnerSensations();
      const playerSensations = result.getPlayerSensations();

      expect(Math.round(partnerSensations.anger)).to.equal(36);
      expect(Math.round(partnerSensations.submission)).to.equal(420);
      expect(Math.round(partnerSensations.throat)).to.equal(112);
      expect(Math.round(playerSensations.cock)).to.equal(100);
    });
  });

  describe.only("applyPreference()", function() {
    it("there is a body part preference", function() {
      const context = TrainingFixtures.standardTrainingContext({},{
        arousal: { arousal:75 },
        sexualPreferences:{ 'anal-slut':50 } });

      const result = SensationResult('suck-anus',context);
      result.applyBaseline();
      result.applyPreference({ type:'preference', code:'anal-slut', scale:2.5 });

      expect(result.getPartnerSensations().anus).to.equal(185);
    });

    it("all together, when there are multiple sensitivities", function() {
      Random.stubBetween(99);

      const context = TrainingFixtures.standardTrainingContext({},{
        arousal: { arousal:75 },
        sexualPreferences:{ 'pussy-slut':50, 'sensitive':30, 'masturbator':70 } });

      const result = SensationResult('masturbate-pussy',context);
      result.applyFactors();

      const pussySensations = result.getResponse().partner.pussy;
      expect(pussySensations.length).to.equal(6);
      expect(pussySensations[3].label).to.equal('Sensitive');
      expect(Math.round(pussySensations[3].value * 100)).to.equal(109)
      expect(pussySensations[4].label).to.equal('Pussy Slut');
      expect(Math.round(pussySensations[4].value * 100)).to.equal(188)
      expect(pussySensations[5].label).to.equal('Masturbator');
      expect(Math.round(pussySensations[5].value * 100)).to.equal(273)
      expect(Math.round(result.getPartnerSensations().pussy)).to.equal(2193);
    });
  });

});

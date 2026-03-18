describe("SensationResult", function() {

  describe('applyPlayerSkill()', function() {
    it('when player has no skill', function() {
      Random.stubBetween(50,1);

      const context = TrainingFixtures.standardTrainingContext({},{ feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      SensationBaseline.apply(result);
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
      SensationBaseline.apply(result);
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.comfort).to.equal(50)
      expect(sensations.pussy).to.equal(62)
    });

    it('when skill fumbles', function() {
      Random.stubBetween(1);

      const context = TrainingFixtures.standardTrainingContext(
        { attributes:{ dexterity:30, vitality:30 }, skills:{ servicing:20 }},
        { feelings:{ affection:150 }});
      const result = SensationResult('suck-pussy', context);
      SensationBaseline.apply(result);
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.anger).to.equal(100);
      expect(sensations.comfort).to.equal(25);
      expect(sensations.pussy).to.equal(5);

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
      SensationBaseline.apply(result);
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.anger).to.equal(10);
      expect(sensations.comfort).to.equal(60);
      expect(sensations.pussy).to.equal(239);

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
      SensationBaseline.apply(result);
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
      SensationBaseline.apply(result);
      result.applySkills();

      const cockSensations = result.getResponse().player.cock;

      expect(result.getPlayerSensations().cock).to.equal(9);
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
      SensationBaseline.apply(result);
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.shame).to.equal(60);
      expect(sensations.submission).to.equal(114);
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
      SensationBaseline.apply(result);
      result.applySkills();

      const sensations = result.getPartnerSensations();
      expect(sensations.shame).to.equal(140);
      expect(sensations.submission).to.equal(58);
    });
  });

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
  });

  // This is all a work in progress still.
  describe("applyAlignment()", function() {
    it("when alignment is submission");
    it("when alignment is masochism");
    it("when alignment is shame");
  });

});

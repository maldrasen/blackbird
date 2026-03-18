describe("SensationSkill", function() {

  it('when player has no skill', function() {
    Random.stubBetween(50,1);

    const state = TrainingFixtures.standardTrainingState({},{ feelings:{ affection:150 }});
    const result = SensationResult('suck-pussy', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.comfort).to.equal(50)
    expect(sensations.pussy).to.equal(43)
  });

  it('when player has skill', function() {
    Random.stubBetween(50,23);

    const state = TrainingFixtures.standardTrainingState(
      { attributes:{ dexterity:30, vitality:30 }, skills:{ servicing:20 }},
      { feelings:{ affection:150 }});
    const result = SensationResult('suck-pussy', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.comfort).to.equal(50)
    expect(sensations.pussy).to.equal(62)
  });

  it('when skill fumbles', function() {
    Random.stubBetween(1);

    const state = TrainingFixtures.standardTrainingState(
      { attributes:{ dexterity:30, vitality:30 }, skills:{ servicing:20 }},
      { feelings:{ affection:150 }});
    const result = SensationResult('suck-pussy', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

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

    const state = TrainingFixtures.standardTrainingState(
      { attributes:{ strength:30, vitality:30 }, skills:{ ravishing:30 }},
      { feelings:{ affection:400 }});
    const result = SensationResult('fuck-pussy', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

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

    const state = TrainingFixtures.standardTrainingState({},{
      feelings:{ respect:250, affection:200 },
      skills:{ servicing:20 },
      attributes:{ dexterity:30, vitality:20 }
    });

    const result = SensationResult('get-blowjob', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

    expect(result.getPlayerSensations().cock).to.equal(116);
    expect(result.getSkillsUsed().partner).to.include('servicing');
  });

  it(`when fumbled skill`, function() {
    Random.stubBetween(1);

    const state = TrainingFixtures.standardTrainingState({},{
      feelings:{ respect:250, affection:200 },
      skills:{ servicing:20 },
      attributes:{ dexterity:30, vitality:20 }
    });

    const result = SensationResult('get-blowjob', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

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

    const state = TrainingFixtures.standardTrainingState({},{
      feelings:{ respect:200, affection:200 },
      skills:{ dancing:30 },
      attributes:{ dexterity:30, beauty:40 }
    });

    const result = SensationResult('striptease', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.shame).to.equal(60);
    expect(sensations.submission).to.equal(114);
    expect(result.getSkillsUsed().partner).to.include('dance');
  });

  it('when fumbled dancing', function() {
    Random.stubBetween(1);

    const state = TrainingFixtures.standardTrainingState({},{
      feelings:{ respect:200, affection:200 },
      skills:{ dancing:30 },
      attributes:{ dexterity:30, beauty:40 }
    });

    const result = SensationResult('striptease', state);
    SensationBaseline.apply(result);
    SensationSkills.apply(result);

    const sensations = result.getPartnerSensations();
    expect(sensations.shame).to.equal(140);
    expect(sensations.submission).to.equal(58);
  });

});
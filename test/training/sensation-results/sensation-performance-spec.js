describe("SensationPerformance", function() {

  it('when normal performance focused action', function() {
    Random.stubBetween(50,10);

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { respect:150 }});

    const result = SensationResult('striptease', state);
    SensationBaseline.apply(result);
    SensationPerformance.apply(result);

    expect(result.getPlayerSensations().desire).to.equal(65);
    expect(result.getSkillsUsed().partner).to.contain('performance');
  });

  it('when performance focused action crits', function() {
    Random.stubBetween(99); // Technique Roll
    Random.stubBetween(99); // Performance Roll

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { respect:400 }});

    const result = SensationResult('masturbate-pussy', state);
    SensationBaseline.apply(result);
    SensationTechnique.apply(result);
    SensationPerformance.apply(result);

    const pussySensations = result.getResponse().partner.pussy;
    expect(pussySensations[2].label).to.equal('Excellent Performance');
    expect(pussySensations[2].extra).to.equal('crit');
    expect(Math.round(pussySensations[2].value)).to.equal(32);
    expect(result.getPartnerSensations().pussy).to.equal(182);
  });

  it('when performance focused action fumbles', function() {
    Random.stubBetween(1);

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { respect:400 }});

    const result = SensationResult('masturbate-pussy', state);
    SensationBaseline.apply(result);
    SensationPerformance.apply(result);

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

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { respect:200 }});

    const result = SensationResult('lap-dance', state);
    SensationBaseline.apply(result);
    SensationTechnique.apply(result);
    SensationPerformance.apply(result);

    expect(result.getPlayerSensations().cock).to.equal(90);
    expect(result.getPartnerSensations().clit).to.equal(24);
  });

  it('when critical performance focused action with player sensations', function() {
    Random.stubBetween(50,10); // Technique Roll
    Random.stubBetween(99);    // Performance Roll

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { respect:200 }});

    const result = SensationResult('lap-dance', state);
    SensationBaseline.apply(result);
    SensationTechnique.apply(result);
    SensationPerformance.apply(result);

    expect(result.getPlayerSensations().cock).to.equal(122);
    expect(result.getPartnerSensations().clit).to.equal(55);

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

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { affection:180, respect:180 }});

    const result = SensationResult('fondle-breasts', state);
    SensationBaseline.apply(result);
    SensationPerformance.apply(result);

    const desireSensations = result.getResponse().player.desire;
    expect(desireSensations[1].label).to.equal('Performance')
    expect(Math.round(desireSensations[1].value)).to.equal(14)
    expect(result.getSkillsUsed().partner).to.not.include('performance');
  });

  it('when normal action with reluctant consent', function() {
    Random.stubBetween(50,10);

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { affection:140, respect:140 }});

    const result = SensationResult('fondle-breasts', state);
    SensationBaseline.apply(result);
    SensationPerformance.apply(result);

    const desireSensations = result.getResponse().player.desire;
    expect(desireSensations[1].label).to.equal('Performance')
    expect(Math.round(desireSensations[1].value)).to.equal(7)
  });

  it('when normal action with fumbled performance', function() {
    Random.stubBetween(1);

    const state = TrainingFixtures.standardTrainingState({},{
      skills: { performance:20 },
      feelings: { affection:180, respect:180 }});

    const result = SensationResult('fondle-breasts', state);
    SensationBaseline.apply(result);
    SensationPerformance.apply(result);

    const response = result.getResponse();
    const shameSensations = response.partner.shame;

    expect(shameSensations[1].extra).to.equal("fumble");
    expect(shameSensations[1].label).to.equal("Terrible Performance");
    expect(shameSensations[1].value).to.equal(60);
    expect(response.player.desire.length).to.equal(1);
  });

});

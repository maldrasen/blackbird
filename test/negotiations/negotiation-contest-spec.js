describe("NegotiationContest", function() {

  function contestant(conversation=100) {
    const id = Registry.createEntity();
    AttributesComponent.create(id, { strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 });

    const skills = {};
    SkillsComponent.getSkills().forEach(code => { skills[code] = 0; });
    skills.conversation = conversation;
    SkillsComponent.create(id, skills);

    return id;
  }

  it('requires win and loss reactions and a contest type', function() {
    expect(() => NegotiationContest({
      random: true,
      win: NegotiationReaction.neutral('won'),
    })).to.throw('win and a loss');

    expect(() => NegotiationContest({
      win: NegotiationReaction.neutral('won'),
      loss: NegotiationReaction.neutral('lost'),
    })).to.throw('random, attribute, or skill');
  });

  it('resolves a coin toss contest', function() {
    const contest = NegotiationContest({
      random: true,
      win: NegotiationReaction.respect('won'),
      loss: NegotiationReaction.dislike('lost'),
    });

    Random.stubFlipCoin(true);
    expect(contest.resolve({}).message).to.equal('won');
    Random.stubFlipCoin(false);
    expect(contest.resolve({}).message).to.equal('lost');
  });

  it('resolves a frequency map contest', function() {
    const contest = NegotiationContest({
      random: { win:4, loss:6 },
      win: NegotiationReaction.respect('won'),
      loss: NegotiationReaction.dislike('lost'),
    });

    Random.stubRoll(3);
    expect(contest.resolve({}).message).to.equal('won');
    Random.stubRoll(4);
    expect(contest.resolve({}).message).to.equal('lost');
  });

  it('resolves an attribute contest, with ties going to the player', function() {
    const context = { P:contestant(), T:contestant() };
    const contest = NegotiationContest({
      attribute: Attrib.strength,
      win: NegotiationReaction.respect('won'),
      loss: NegotiationReaction.dislike('lost'),
    });

    Random.stubRoll(7,3);
    expect(contest.resolve(context).message).to.equal('won');
    Random.stubRoll(4,4);
    expect(contest.resolve(context).message).to.equal('won');
    Random.stubRoll(3,7);
    expect(contest.resolve(context).message).to.equal('lost');
  });

  // A SkillCheck consumes two between values, the crit roll then the value roll. Contestants default to level 100
  // in conversation so the checks don't also consume an improve roll.
  it('resolves a skill contest, with ties going to the player', function() {
    const context = { P:contestant(), T:contestant() };
    const contest = NegotiationContest({
      skill: 'conversation',
      win: NegotiationReaction.respect('won'),
      loss: NegotiationReaction.dislike('lost'),
    });

    Random.stubBetween(50,6, 50,3);
    expect(contest.resolve(context).message).to.equal('won');
    Random.stubBetween(50,5, 50,5);
    expect(contest.resolve(context).message).to.equal('won');
    Random.stubBetween(50,3, 50,6);
    expect(contest.resolve(context).message).to.equal('lost');
  });

  it('consumes an improve roll for each contestant below skill level 100', function() {
    const context = { P:contestant(0), T:contestant(0) };
    const contest = NegotiationContest({
      skill: 'conversation',
      win: NegotiationReaction.respect('won'),
      loss: NegotiationReaction.dislike('lost'),
    });

    Random.stubBetween(50,6, 50,3);
    Random.stubRoll(149,149);
    expect(contest.resolve(context).message).to.equal('won');
    expect(SkillsComponent.lookup(context.P).conversation).to.equal(0);
    expect(SkillsComponent.lookup(context.T).conversation).to.equal(0);
  });

  it('improves the skill when the improve roll succeeds', function() {
    const context = { P:contestant(0), T:contestant(0) };
    const contest = NegotiationContest({
      skill: 'conversation',
      win: NegotiationReaction.respect('won'),
      loss: NegotiationReaction.dislike('lost'),
    });

    Random.stubBetween(50,3, 50,6);
    Random.stubRoll(5,149);
    expect(contest.resolve(context).message).to.equal('lost');
    expect(SkillsComponent.lookup(context.P).conversation).to.equal(1);
    expect(SkillsComponent.lookup(context.T).conversation).to.equal(0);
  });

  it('resolves nested contests recursively', function() {
    const inner = NegotiationContest({
      random: { win:4, loss:6 },
      win: NegotiationReaction.respect('inner won'),
      loss: NegotiationReaction.dislike('inner lost'),
    });
    const outer = NegotiationContest({
      random: true,
      win: inner,
      loss: NegotiationReaction.hate('outer lost'),
    });

    Random.stubFlipCoin(true);
    Random.stubRoll(9);
    expect(outer.resolve({}).message).to.equal('inner lost');

    Random.stubFlipCoin(false);
    expect(outer.resolve({}).message).to.equal('outer lost');
  });

});

describe("NegotiationReaction", function() {

  function contestant(conversation=100) {
    const id = Registry.createEntity();
    AttributesComponent.create(id, { strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 });

    const skills = {};
    SkillsComponent.getSkills().forEach(code => { skills[code] = 0; });
    skills.conversation = conversation;
    SkillsComponent.create(id, skills);

    return id;
  }

  describe("descriptors", function() {
    it('builds the feelings reactions from the reaction map', function() {
      expect(NegotiationReaction.respect('msg')).to.deep.include({
        type:'feelings', feelings:{ control:20, respect:30 }, message:'msg', effects:{} });
      expect(NegotiationReaction.terrify('msg')).to.deep.include({
        type:'feelings', feelings:{ control:30, affection:-20, fear:50 }, message:'msg', effects:{} });
    });

    it('builds the resolution reactions with their default feelings maps', function() {
      expect(NegotiationReaction.attack('msg')).to.deep.include({
        type:'attack', feelings:{ affection:-40, respect:-20, fear:-30 }, message:'msg', effects:{} });
      expect(NegotiationReaction.run('msg')).to.deep.include({
        type:'run', feelings:{ affection:-20, fear:30 }, message:'msg', effects:{} });
      expect(NegotiationReaction.ability('dick-punch','msg')).to.deep.include({
        type:'ability', code:'dick-punch', feelings:{ affection:-40, respect:-20, fear:-30 }, message:'msg',
        effects:{} });
      expect(NegotiationReaction.join('msg')).to.deep.include({
        type:'join', feelings:{ control:40, affection:50, respect:20, fear:-10 }, message:'msg', effects:{} });
    });

    it('hoists join feelings out of the options', function() {
      expect(NegotiationReaction.join('msg', { feelings:{ affection:30 }, givePreferences:{ 'piss-slut':20 }}))
        .to.deep.include({
          type:'join', feelings:{ affection:30 }, message:'msg', effects:{ givePreferences:{ 'piss-slut':20 }} });
    });

    it('builds a followUp reaction with no default feelings', function() {
      expect(NegotiationReaction.followUp('msg', { question:'tired-of-fighting-other-way' })).to.deep.include({
        type:'followUp', question:'tired-of-fighting-other-way', feelings:undefined, message:'msg', effects:{} });
    });

    it('hoists the followUp question and feelings out of the options', function() {
      expect(NegotiationReaction.followUp('msg', {
        question:'tired-of-fighting-other-way', feelings:{ affection:10 }, flags:{ playerHard:true },
      })).to.deep.include({
        type:'followUp', question:'tired-of-fighting-other-way', feelings:{ affection:10 }, message:'msg',
        effects:{ flags:{ playerHard:true }} });
    });

    it('requires a followUp question', function() {
      expect(() => NegotiationReaction.followUp('msg')).to.throw('must point to a question');
    });

    // rememberThis is a stub effect: the reaction carries it, and applying it does nothing yet.
    it('carries a rememberThis effect', function() {
      const reaction = NegotiationReaction.love('msg', { rememberThis:{ key:'F', event:'offered-to-monster' }});
      expect(reaction).to.deep.include({ effects:{ rememberThis:{ key:'F', event:'offered-to-monster' }}});
      expect(() => reaction.applyEffects({ F:null })).to.not.throw();
    });
  });

  describe("withFeelings()", function() {
    it('builds a new reaction with the feelings replaced', function() {
      const reaction = NegotiationReaction.followUp('msg', {
        question:'tired-of-fighting-other-way', flags:{ playerHard:true },
      });
      const moderated = reaction.withFeelings({ affection:10 });

      expect(moderated).to.not.equal(reaction);
      expect(moderated).to.deep.include({
        type:'followUp', question:'tired-of-fighting-other-way', feelings:{ affection:10 }, message:'msg',
        effects:{ flags:{ playerHard:true }} });
      expect(reaction.feelings).to.equal(undefined);
    });
  });

  describe("resolve()", function() {
    it('returns non-contest reactions as they are', function() {
      const reaction = NegotiationReaction.like('msg');
      expect(reaction.resolve({})).to.equal(reaction);
    });

    it('returns a followUp from a contest branch intact', function() {
      const followUp = NegotiationReaction.followUp('msg', { question:'tired-of-fighting-other-way' });
      const contest = NegotiationReaction.contest({
        random: true,
        win: followUp,
        loss: NegotiationReaction.dislike('lost'),
      });

      Random.stubFlipCoin(true);
      expect(contest.resolve({})).to.equal(followUp);
    });
  });

  describe("contest()", function() {
    it('requires win and loss reactions and a contest type', function() {
      expect(() => NegotiationReaction.contest({
        random: true,
        win: NegotiationReaction.neutral('won'),
      })).to.throw('win and a loss');

      expect(() => NegotiationReaction.contest({
        win: NegotiationReaction.neutral('won'),
        loss: NegotiationReaction.neutral('lost'),
      })).to.throw('random, attribute, or skill');
    });

    it('resolves a coin toss contest', function() {
      const contest = NegotiationReaction.contest({
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
      const contest = NegotiationReaction.contest({
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
      const contest = NegotiationReaction.contest({
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
      const contest = NegotiationReaction.contest({
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
      const contest = NegotiationReaction.contest({
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
      const contest = NegotiationReaction.contest({
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
      const inner = NegotiationReaction.contest({
        random: { win:4, loss:6 },
        win: NegotiationReaction.respect('inner won'),
        loss: NegotiationReaction.dislike('inner lost'),
      });
      const outer = NegotiationReaction.contest({
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

  describe("givePreferences", function() {
    function applyPreferences(id, givePreferences) {
      NegotiationReaction.join('msg', { givePreferences }).applyEffects({ T:id });
    }

    it('grants, overwrites, and deletes preferences', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');

      applyPreferences(id, { 'humiliation-slut':30, 'piss-slut':20 });
      expect(SexualPreferencesComponent.lookup(id)['humiliation-slut']).to.equal(30);
      expect(SexualPreferencesComponent.lookup(id)['piss-slut']).to.equal(20);

      applyPreferences(id, { 'humiliation-slut':60 });
      expect(SexualPreferencesComponent.lookup(id)['humiliation-slut']).to.equal(60);

      applyPreferences(id, { 'humiliation-slut':null });
      expect(SexualPreferencesComponent.lookup(id)).to.not.have.property('humiliation-slut');
      expect(SexualPreferencesComponent.lookup(id)['piss-slut']).to.equal(20);
    });

    it('ignores a preference weaker than the current value', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');

      applyPreferences(id, { 'piss-slut':50 });
      applyPreferences(id, { 'piss-slut':20 });
      expect(SexualPreferencesComponent.lookup(id)['piss-slut']).to.equal(50);

      applyPreferences(id, { perverted:null });
      applyPreferences(id, { perverted:-50 });
      applyPreferences(id, { perverted:-20 });
      expect(SexualPreferencesComponent.lookup(id).perverted).to.equal(-50);
    });

    it('treats a negative preference as its own direction, allowing flips across zero', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');

      applyPreferences(id, { perverted:null });
      applyPreferences(id, { perverted:30 });
      applyPreferences(id, { perverted:-60 });
      expect(SexualPreferencesComponent.lookup(id).perverted).to.equal(-60);

      applyPreferences(id, { perverted:10 });
      expect(SexualPreferencesComponent.lookup(id).perverted).to.equal(10);
    });

    // The sensitivities component is rebuilt without a cervix because a freshly built kobold has a small random
    // chance of rolling one.
    it('throws for an incompatible preference', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');
      SensitivitiesComponent.destroy(id);
      SensitivitiesComponent.create(id, { throat:2 });

      expect(() => applyPreferences(id, { 'cervix-slut':30 })).to.throw('incompatible');
    });

    it('throws for an unknown preference code', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');
      expect(() => applyPreferences(id, { 'linoleum-slut':30 })).to.throw('Bad sexual preference code');
    });
  });

  // These specs boot a real battle because the status effects live on the battle state.
  describe("giveStatusEffect", function() {
    function startBattle() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'negotiation-fixture-1', ambushState:'normal' });

      const player = GameSystem.getState().getPlayer();
      const monster = BattleSystem.getState().getActiveMonsters()[0];

      return { context:{ P:player, T:monster }, player, monster };
    }

    function applyStatusEffect(giveStatusEffect, context) {
      NegotiationReaction.attack('msg', { giveStatusEffect }).applyEffects(context);
    }

    it('applies a status effect to the player', function() {
      const { context, player } = startBattle();

      applyStatusEffect({ target:'player', effect:'off-balance', duration:1 }, context);

      const statusEffect = BattleSystem.getState().getStatusEffects(player)['off-balance'];
      expect(statusEffect).to.exist;
      expect(statusEffect.getDuration()).to.equal(1);
    });

    it('applies a status effect to the monster', function() {
      const { context, monster } = startBattle();

      applyStatusEffect({ target:'target', effect:'vulnerable', duration:2 }, context);

      const statusEffect = BattleSystem.getState().getStatusEffects(monster)['vulnerable'];
      expect(statusEffect).to.exist;
      expect(statusEffect.getDuration()).to.equal(2);
    });

    it('throws for an unknown status effect code', function() {
      const { context } = startBattle();
      expect(() => applyStatusEffect({ target:'player', effect:'wobbly', duration:1 }, context))
        .to.throw('Bad status effect code');
    });
  });

});

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
      expect(NegotiationReaction.respect('msg')).to.deep.equal({
        type:'feelings', feelings:{ control:20, respect:30 }, message:'msg', options:{} });
      expect(NegotiationReaction.terrify('msg')).to.deep.equal({
        type:'feelings', feelings:{ control:30, affection:-20, fear:50 }, message:'msg', options:{} });
    });

    it('builds the resolution reactions with their default feelings maps', function() {
      expect(NegotiationReaction.attack('msg')).to.deep.equal({
        type:'attack', feelings:{ affection:-40, respect:-20, fear:-30 }, message:'msg', options:{} });
      expect(NegotiationReaction.run('msg')).to.deep.equal({
        type:'run', feelings:{ affection:-20, fear:30 }, message:'msg', options:{} });
      expect(NegotiationReaction.ability('dick-punch','msg')).to.deep.equal({
        type:'ability', code:'dick-punch', feelings:{ affection:-40, respect:-20, fear:-30 }, message:'msg',
        options:{} });
      expect(NegotiationReaction.join('msg')).to.deep.equal({
        type:'join', feelings:{ control:40, affection:50, respect:20, fear:-10 }, message:'msg', options:{} });
    });

    it('hoists join feelings out of the options', function() {
      expect(NegotiationReaction.join('msg', { feelings:{ affection:30 }, givePreferences:{ 'piss-slut':20 }}))
        .to.deep.equal({
          type:'join', feelings:{ affection:30 }, message:'msg', options:{ givePreferences:{ 'piss-slut':20 }} });
    });

    it('builds a followUp reaction with no default feelings', function() {
      expect(NegotiationReaction.followUp('msg', { question:'tired-of-fighting-other-way' })).to.deep.equal({
        type:'followUp', question:'tired-of-fighting-other-way', feelings:undefined, message:'msg', options:{} });
    });

    it('hoists the followUp question and feelings out of the options', function() {
      expect(NegotiationReaction.followUp('msg', {
        question:'tired-of-fighting-other-way', feelings:{ affection:10 }, flags:{ playerHard:true },
      })).to.deep.equal({
        type:'followUp', question:'tired-of-fighting-other-way', feelings:{ affection:10 }, message:'msg',
        options:{ flags:{ playerHard:true }} });
    });

    it('requires a followUp question', function() {
      expect(() => NegotiationReaction.followUp('msg')).to.throw('needs a question');
    });
  });

  describe("resolve()", function() {
    it('returns non-contest reactions as they are', function() {
      const reaction = NegotiationReaction.like('msg');
      expect(NegotiationReaction.resolve(reaction, {})).to.equal(reaction);
    });

    it('returns a followUp from a contest branch intact', function() {
      const followUp = NegotiationReaction.followUp('msg', { question:'tired-of-fighting-other-way' });
      const contest = NegotiationReaction.contest({
        random: true,
        win: followUp,
        loss: NegotiationReaction.dislike('lost'),
      });

      Random.stubFlipCoin(true);
      expect(NegotiationReaction.resolve(contest, {})).to.equal(followUp);
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
      expect(NegotiationReaction.resolve(contest, {}).message).to.equal('won');
      Random.stubFlipCoin(false);
      expect(NegotiationReaction.resolve(contest, {}).message).to.equal('lost');
    });

    it('resolves a frequency map contest', function() {
      const contest = NegotiationReaction.contest({
        random: { win:4, loss:6 },
        win: NegotiationReaction.respect('won'),
        loss: NegotiationReaction.dislike('lost'),
      });

      Random.stubRoll(3);
      expect(NegotiationReaction.resolve(contest, {}).message).to.equal('won');
      Random.stubRoll(4);
      expect(NegotiationReaction.resolve(contest, {}).message).to.equal('lost');
    });

    it('resolves an attribute contest, with ties going to the player', function() {
      const context = { P:contestant(), T:contestant() };
      const contest = NegotiationReaction.contest({
        attribute: Attrib.strength,
        win: NegotiationReaction.respect('won'),
        loss: NegotiationReaction.dislike('lost'),
      });

      Random.stubRoll(7,3);
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('won');
      Random.stubRoll(4,4);
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('won');
      Random.stubRoll(3,7);
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('lost');
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
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('won');
      Random.stubBetween(50,5, 50,5);
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('won');
      Random.stubBetween(50,3, 50,6);
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('lost');
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
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('won');
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
      expect(NegotiationReaction.resolve(contest, context).message).to.equal('lost');
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
      expect(NegotiationReaction.resolve(outer, {}).message).to.equal('inner lost');

      Random.stubFlipCoin(false);
      expect(NegotiationReaction.resolve(outer, {}).message).to.equal('outer lost');
    });
  });

  describe("givePreferences", function() {
    function resolvePreferences(id, givePreferences) {
      NegotiationReaction.resolve(NegotiationReaction.join('msg', { givePreferences }), { T:id });
    }

    it('grants, overwrites, and deletes preferences', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');

      resolvePreferences(id, { 'humiliation-slut':30, 'piss-slut':20 });
      expect(SexualPreferencesComponent.lookup(id)['humiliation-slut']).to.equal(30);
      expect(SexualPreferencesComponent.lookup(id)['piss-slut']).to.equal(20);

      resolvePreferences(id, { 'humiliation-slut':60 });
      expect(SexualPreferencesComponent.lookup(id)['humiliation-slut']).to.equal(60);

      resolvePreferences(id, { 'humiliation-slut':0 });
      expect(SexualPreferencesComponent.lookup(id)).to.not.have.property('humiliation-slut');
      expect(SexualPreferencesComponent.lookup(id)['piss-slut']).to.equal(20);
    });

    // The sensitivities component is rebuilt without a cervix because a freshly built kobold has a small random
    // chance of rolling one.
    it('throws for an incompatible preference', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');
      SensitivitiesComponent.destroy(id);
      SensitivitiesComponent.create(id, { throat:2 });

      expect(() => resolvePreferences(id, { 'cervix-slut':30 })).to.throw('incompatible');
    });

    it('throws for an unknown preference code', function() {
      const id = MonsterFactory.build('kobold-sneak-slut');
      expect(() => resolvePreferences(id, { 'linoleum-slut':30 })).to.throw('Bad sexual preference code');
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

    function resolveStatusEffect(giveStatusEffect, context) {
      NegotiationReaction.resolve(NegotiationReaction.attack('msg', { giveStatusEffect }), context);
    }

    it('applies a status effect to the player', function() {
      const { context, player } = startBattle();

      resolveStatusEffect({ target:'player', effect:'off-balance', duration:1 }, context);

      const statusEffect = BattleSystem.getState().getStatusEffects(player)['off-balance'];
      expect(statusEffect).to.exist;
      expect(statusEffect.getDuration()).to.equal(1);
    });

    it('applies a status effect to the monster', function() {
      const { context, monster } = startBattle();

      resolveStatusEffect({ target:'target', effect:'vulnerable', duration:2 }, context);

      const statusEffect = BattleSystem.getState().getStatusEffects(monster)['vulnerable'];
      expect(statusEffect).to.exist;
      expect(statusEffect.getDuration()).to.equal(2);
    });

    it('throws for an unknown status effect code', function() {
      const { context } = startBattle();
      expect(() => resolveStatusEffect({ target:'player', effect:'wobbly', duration:1 }, context))
        .to.throw('Bad status effect code');
    });
  });

});

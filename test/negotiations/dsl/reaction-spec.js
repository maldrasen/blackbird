describe("Reaction", function() {

  describe("descriptors", function() {
    it('builds the feelings reactions from the reaction map', function() {
      expect(Reaction.respect('msg')).to.deep.include({
        type:'feelings', feelings:{ control:20, respect:30 }, message:'msg', effects:{} });
      expect(Reaction.terrify('msg')).to.deep.include({
        type:'feelings', feelings:{ control:30, affection:-20, fear:50 }, message:'msg', effects:{} });
    });

    it('builds the resolution reactions with their default feelings maps', function() {
      expect(Reaction.attack('msg')).to.deep.include({
        type:'attack', feelings:{ affection:-40, respect:-20, fear:-30 }, message:'msg', effects:{} });
      expect(Reaction.run('msg')).to.deep.include({
        type:'run', feelings:{ affection:-20, fear:30 }, message:'msg', effects:{} });
      expect(Reaction.ability('msg',{ code:'dick-punch' })).to.deep.include({
        type:'ability', code:'dick-punch', feelings:{ affection:-40, respect:-20, fear:-30 }, message:'msg',
        effects:{} });
      expect(Reaction.join('msg')).to.deep.include({
        type:'join', feelings:{ control:40, affection:50, respect:20, fear:-10 }, message:'msg', effects:{} });
    });

    it('hoists join feelings out of the options', function() {
      expect(Reaction.join('msg', { feelings:{ affection:30 }, givePreferences:{ 'piss-slut':20 }}))
        .to.deep.include({
          type:'join', feelings:{ affection:30 }, message:'msg', effects:{ givePreferences:{ 'piss-slut':20 }} });
    });

    it('builds a followUp reaction with no default feelings', function() {
      expect(Reaction.followUp('msg', { question:'tired-of-fighting-other-way' })).to.deep.include({
        type:'followUp', question:'tired-of-fighting-other-way', feelings:undefined, message:'msg', effects:{} });
    });

    it('hoists the followUp question and feelings out of the options', function() {
      expect(Reaction.followUp('msg', {
        question:'tired-of-fighting-other-way', feelings:{ affection:10 }, flags:{ playerHard:true },
      })).to.deep.include({
        type:'followUp', question:'tired-of-fighting-other-way', feelings:{ affection:10 }, message:'msg',
        effects:{ flags:{ playerHard:true }} });
    });

    it('requires a followUp question', function() {
      expect(() => Reaction.followUp('msg',{})).to.throw('must point to a question');
    });

    // rememberThis is a stub effect: the reaction carries it, and applying it does nothing yet.
    it('carries a rememberThis effect', function() {
      const reaction = Reaction.love('msg', { rememberThis:{ key:'F', event:'offered-to-monster' }});
      expect(reaction).to.deep.include({ effects:{ rememberThis:{ key:'F', event:'offered-to-monster' }}});
      expect(() => reaction.applyEffects({ F:null })).to.not.throw();
    });
  });

  describe("withFeelings()", function() {
    it('builds a new reaction with the feelings replaced', function() {
      const reaction = Reaction.followUp('msg', {
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
      const reaction = Reaction.like('msg');
      expect(reaction.resolve({})).to.equal(reaction);
    });

    it('returns a followUp from a contest branch intact', function() {
      const followUp = Reaction.followUp('msg', { question:'tired-of-fighting-other-way' });
      const contest = NegotiationContest({
        random: true,
        win: followUp,
        loss: Reaction.dislike('lost'),
      });

      Random.stubFlipCoin(true);
      expect(contest.resolve({})).to.equal(followUp);
    });
  });

  describe("givePreferences", function() {
    // Stubbing the fuzz roll at 5 makes each preference land exactly on its authored value. Null values consume no
    // roll because deletion skips the fuzz.
    function applyPreferences(id, givePreferences) {
      Random.stubRoll(...Object.values(givePreferences).filter(value => value != null).map(() => 5));
      Reaction.join('msg', { givePreferences }).applyEffects({ T:id });
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
      Reaction.attack('msg', { giveStatusEffect }).applyEffects(context);
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

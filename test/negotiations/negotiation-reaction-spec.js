describe("NegotiationReaction", function() {

  function contestant() {
    const id = Registry.createEntity();
    AttributesComponent.create(id, { strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 });
    return id;
  }

  describe("descriptors", function() {
    it('builds the feelings reactions from the reaction map', function() {
      expect(NegotiationReaction.respect('msg')).to.deep.equal({
        type:'feelings', feelings:{ control:20, respect:30 }, message:'msg', options:{} });
      expect(NegotiationReaction.terrify('msg')).to.deep.equal({
        type:'feelings', feelings:{ control:30, affection:-20, fear:50 }, message:'msg', options:{} });
    });

    it('builds the resolution reactions', function() {
      expect(NegotiationReaction.attack('msg')).to.deep.equal({ type:'attack', message:'msg', options:{} });
      expect(NegotiationReaction.run('msg')).to.deep.equal({ type:'run', message:'msg' });
      expect(NegotiationReaction.ability('dick-punch','msg')).to.deep.equal({
        type:'ability', code:'dick-punch', message:'msg' });
      expect(NegotiationReaction.join('msg')).to.deep.equal({ type:'join', message:'msg', options:{} });
    });
  });

  describe("resolve()", function() {
    it('returns non-contest reactions as they are', function() {
      const reaction = NegotiationReaction.like('msg');
      expect(NegotiationReaction.resolve(reaction, {})).to.equal(reaction);
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
      })).to.throw('random or attribute');
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

});

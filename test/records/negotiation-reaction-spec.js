// These specs run against the real shipped reactions rather than fixtures — there is no way to unregister a reaction,
// so registering test data would pollute the registry for every spec that runs after this one.
describe('NegotiationReaction', function() {

  // Loader.boot() runs this validation on every launch; running it here keeps headless test runs honest too. This is
  // what enforces the coverage invariant: every supertype, and every null-supertype archetype, must have an
  // unconditional reaction to every question.
  it('validates the shipped reactions', function() {
    expect(() => NegotiationReaction.validate()).to.not.throw();
  });

  it('looks up a reaction', function() {
    const reaction = NegotiationReaction.lookup('why-follow--supertype-fierce');
    expect(reaction.getQuestion()).to.equal('why-follow');
    expect(reaction.getMatchType()).to.equal('supertype');
    expect(reaction.getMatchValue()).to.equal(NegotiationSupertype.fierce);
    expect(reaction.getResponse(NegotiationTone.dominant)).to.eql({ affection:20, fear:20, respect:60 });
  });

  it('keeps the reaction values from the old bitch negotiation block', function() {
    const reaction = NegotiationReaction.lookup('why-follow--archetype-bitch');
    expect(reaction.getResponse(NegotiationTone.kind)).to.deep.include({ affection:-20, respect:-40 });
    expect(reaction.getResponse(NegotiationTone.dominant)).to.deep.include({ affection:20, fear:20, respect:80 });
  });

  it('names every reaction after its question and match', function() {
    NegotiationReaction.getAllCodes().forEach(code => {
      const reaction = NegotiationReaction.lookup(code);
      expect(code).to.equal(`${reaction.getQuestion()}--${reaction.getMatchType()}-${reaction.getMatchValue()}`);
    });
  });

  describe('resolve()', function() {

    function buildContext(archetype) {
      const player = Registry.createEntity();
      GameSystem.getState().setPlayer(player);

      const monster = MonsterFactory.build('kobold-runt');
      const personality = PersonalityComponent.lookup(monster);
      personality.archetype = archetype;
      PersonalityComponent.update(monster, personality);

      return { A:player, T:monster };
    }

    it('resolves an archetype reaction over the supertype baseline', function() {
      const resolved = NegotiationReaction.resolve(buildContext(ArchetypeCode.bitch));
      expect(resolved['why-follow'].getCode()).to.equal('why-follow--archetype-bitch');
      expect(resolved['what-want'].getCode()).to.equal('what-want--archetype-bitch');
      expect(resolved['if-refuse'].getCode()).to.equal('if-refuse--archetype-bitch');
    });

    it('falls back to the supertype baseline when the archetype has no reactions of its own', function() {
      const resolved = NegotiationReaction.resolve(buildContext(ArchetypeCode.sweet));
      expect(resolved['why-follow'].getCode()).to.equal('why-follow--supertype-warm');
      expect(resolved['what-want'].getCode()).to.equal('what-want--supertype-warm');
      expect(resolved['if-refuse'].getCode()).to.equal('if-refuse--supertype-warm');
    });

    it('resolves every question for a null-supertype archetype from its own reactions', function() {
      const resolved = NegotiationReaction.resolve(buildContext(ArchetypeCode.serious));
      expect(Object.keys(resolved)).to.have.members(NegotiationQuestion.getAllCodes());
      expect(resolved['why-follow'].getCode()).to.equal('why-follow--archetype-serious');
    });

  });

});

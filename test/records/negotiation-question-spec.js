// These specs run against the real shipped questions rather than fixtures — there is no way to unregister a question,
// so registering test data would pollute the registry for every spec that runs after this one.
describe('NegotiationQuestion', function() {

  it('registers the three standard questions', function() {
    expect(NegotiationQuestion.getAllCodes()).to.have.members(['why-follow','what-want','if-refuse']);
  });

  it('looks up a question with its answers keyed by tone', function() {
    const question = NegotiationQuestion.lookup('why-follow');
    expect(question.getText()).to.include(`Why should something like me follow someone like you?`);
    expect(question.getAnswers()[NegotiationTone.kind]).to.equal(`Because I'll treat you better than this place ever has.`);
    expect(question.getAnswers()[NegotiationTone.dominant]).to.equal(`Because the alternative is my blade in your throat.`);
  });

  // The authored answer order drives the order of the answer buttons.
  it('keeps the tones in their authored order', function() {
    expect(NegotiationQuestion.lookup('why-follow').getTones()).to.eql(['boastful','kind','dominant','honest']);
    expect(NegotiationQuestion.lookup('what-want').getTones()).to.eql(['dominant','honest','kind','lewd']);
    expect(NegotiationQuestion.lookup('if-refuse').getTones()).to.eql(['dominant','kind','boastful','lewd']);
  });

  it('throws on a bad question code', function() {
    expect(() => NegotiationQuestion.lookup('why-not-zoidberg')).to.throw(`Bad negotiation question code`);
  });

  // Loader.boot() runs this validation on every launch; running it here keeps headless test runs honest too. This is
  // also what enforces the coverage invariant: every supertype, and every null-supertype archetype, must have an
  // unconditional reaction to every question.
  it('validates the shipped questions and their reactions', function() {
    expect(() => NegotiationQuestion.validate()).to.not.throw();
  });

  describe('reactions', function() {

    function reactionFor(questionCode, matchKey, matchValue) {
      return NegotiationQuestion.lookup(questionCode).getReactions().find(reaction =>
        reaction[matchKey] === matchValue);
    }

    it('registers reactions onto their question', function() {
      const reaction = reactionFor('why-follow','supertype',NegotiationSupertype.fierce);
      expect(reaction.responses[NegotiationTone.dominant]).to.eql({ affection:20, fear:20, respect:60 });
    });

    it('keeps the reaction values from the old bitch negotiation block', function() {
      const reaction = reactionFor('why-follow','archetype',ArchetypeCode.bitch);
      expect(reaction.responses[NegotiationTone.kind]).to.deep.include({ affection:-20, respect:-40 });
      expect(reaction.responses[NegotiationTone.dominant]).to.deep.include({ affection:20, fear:20, respect:80 });
    });

  });

});

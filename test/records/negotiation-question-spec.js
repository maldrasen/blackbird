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

  // Loader.boot() runs this validation on every launch; running it here keeps headless test runs honest too.
  it('validates the shipped questions', function() {
    expect(() => NegotiationQuestion.validate()).to.not.throw();
  });

});

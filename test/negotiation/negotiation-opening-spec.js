// These specs run against the real shipped questions and reactions rather than fixtures — there is no way to
// unregister a question, so registering test data would pollute the registry for every spec that runs after this one.
describe("NegotiationOpening", function() {

  function buildContext(archetype) {
    const player = Registry.createEntity();
    GameSystem.getState().setPlayer(player);

    const monster = MonsterFactory.build('kobold-runt');
    const personality = PersonalityComponent.lookup(monster);
    personality.archetype = archetype;
    PersonalityComponent.update(monster, personality);

    return { A:player, T:monster };
  }

  function questionFor(opening, questionCode) {
    return opening.getQuestions().find(question => question.questionCode === questionCode);
  }

  it("resolves a reaction for every question", function() {
    const opening = NegotiationOpening(buildContext(ArchetypeCode.bitch));
    const codes = opening.getQuestions().map(question => question.questionCode);
    expect(codes).to.have.members(NegotiationQuestion.getAllCodes());
  });

  it("resolves an archetype reaction over the supertype baseline", function() {
    const opening = NegotiationOpening(buildContext(ArchetypeCode.bitch));
    expect(questionFor(opening,'why-follow').reaction.archetype).to.equal(ArchetypeCode.bitch);
    expect(questionFor(opening,'what-want').reaction.archetype).to.equal(ArchetypeCode.bitch);
    expect(questionFor(opening,'if-refuse').reaction.archetype).to.equal(ArchetypeCode.bitch);
  });

  it("falls back to the supertype baseline when the archetype has no reactions of its own", function() {
    const opening = NegotiationOpening(buildContext(ArchetypeCode.sweet));
    expect(questionFor(opening,'why-follow').reaction.supertype).to.equal(NegotiationSupertype.warm);
    expect(questionFor(opening,'what-want').reaction.supertype).to.equal(NegotiationSupertype.warm);
    expect(questionFor(opening,'if-refuse').reaction.supertype).to.equal(NegotiationSupertype.warm);
  });

  it("resolves every question for a null-supertype archetype from its own reactions", function() {
    const opening = NegotiationOpening(buildContext(ArchetypeCode.serious));
    expect(opening.getQuestions().length).to.equal(NegotiationQuestion.getAllCodes().length);
    opening.getQuestions().forEach(question => {
      expect(question.reaction.archetype).to.equal(ArchetypeCode.serious);
    });
  });

});

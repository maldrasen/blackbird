describe("NegotiationOpening", function() {

  function openingFor(options) {
    const monster = MonsterFactory.build(options.baseMonster || 'kobold-runt');

    if (options.archetype) {
      const personality = PersonalityComponent.lookup(monster);
      personality.archetype = options.archetype;
      PersonalityComponent.update(monster, personality);
    }

    return NegotiationOpening(monster);
  }

  function questionFor(opening, questionCode) {
    return opening.getQuestions().find(question => question.questionCode === questionCode);
  }

  // TODO: These specs are fragile, they only work because the current questions only have a few possible reactions.

  it("resolves a reaction for every question", function() {
    const opening = openingFor({ archetype:ArchetypeCode.slut });
    const codes = opening.getQuestions().map(question => question.questionCode);
    expect(codes).to.have.members(NegotiationQuestion.getAllCodes());
  });

  it("resolves an archetype reaction over the supertype baseline", function() {
    const opening = openingFor({ archetype:ArchetypeCode.bitch });
    expect(questionFor(opening,'why-follow').reaction.archetype).to.equal(ArchetypeCode.bitch);
  });

  it("falls back to the supertype baseline when the archetype has no reactions of its own", function() {
    const opening = openingFor({ archetype:ArchetypeCode.slut });
    expect(questionFor(opening,'why-follow').reaction.supertype).to.equal(NegotiationSupertype.lewd);
    expect(questionFor(opening,'what-want').reaction.supertype).to.equal(NegotiationSupertype.lewd);
    expect(questionFor(opening,'if-refuse').reaction.supertype).to.equal(NegotiationSupertype.lewd);
  });

});

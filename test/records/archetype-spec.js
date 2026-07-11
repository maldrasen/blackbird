describe("Archetype", function() {

  // Loader.boot() runs this validation on every launch; running it here keeps headless test runs honest too.
  it("validates the shipped archetypes", function() {
    expect(() => Archetype.validate()).to.not.throw();
  });

  describe("getSupertype()", function() {

    it("returns the archetype's negotiation supertype", function() {
      expect(Archetype.lookup(ArchetypeCode.bitch).getSupertype()).to.equal(NegotiationSupertype.fierce);
      expect(Archetype.lookup(ArchetypeCode.timid).getSupertype()).to.equal(NegotiationSupertype.timid);
      expect(Archetype.lookup(ArchetypeCode.nice).getSupertype()).to.equal(NegotiationSupertype.warm);
      expect(Archetype.lookup(ArchetypeCode.slut).getSupertype()).to.equal(NegotiationSupertype.lewd);
    });

    // Serious deliberately has no supertype. It gets no baseline negotiation reactions, so it has to register an
    // archetype reaction to every question.
    it("is null for archetypes outside every supertype", function() {
      expect(Archetype.lookup(ArchetypeCode.serious).getSupertype()).to.be.null;
    });

  });
});

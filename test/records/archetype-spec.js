describe("Archetype", function() {
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

  describe("negotiationDelta()", function() {

    it("returns the archetype's own reaction to a tone", function() {
      const delta = Archetype.lookup(ArchetypeCode.bitch).negotiationDelta(NegotiationTone.kind);
      expect(delta).to.eql({ affection:-20, fear:0, respect:-40 });
    });

    // The nice archetype has no negotiation block of its own, so it uses the default reactions.
    it("falls back to the default reaction when the archetype has no negotiation block", function() {
      const delta = Archetype.lookup(ArchetypeCode.nice).negotiationDelta(NegotiationTone.dominant);
      expect(delta).to.eql({ affection:-10, fear:30, respect:50 });
    });

  });
});

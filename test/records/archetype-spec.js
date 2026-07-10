describe("Archetype", function() {
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

describe("Archetype", function() {

  it("getSupertype()", function() {
    expect(Archetype.lookup(ArchetypeCode.slut).getSupertype()).to.equal(NegotiationSupertype.lewd);
    expect(Archetype.lookup(ArchetypeCode.serious).getSupertype()).to.be.null;
  });

});

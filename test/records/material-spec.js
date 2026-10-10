describe("Material", function() {

  // These read the shipped materials rather than fixtures, since a registered record can't be removed.

  it("reads the cost and a performance factor", function() {
    expect(Material.lookup('steel').getCost()).to.equal(20);
    expect(Material.lookup('silver').getFactor(MaterialFactor.potential)).to.equal(2.0);
  });

  it("throws for a factor the material doesn't have", function() {
    expect(() => Material.lookup('wool').getFactor(MaterialFactor.sharpness)).to.throw(/wool.*sharpness/);
  });

  describe("getTags()", function() {
    it("reads the style tags, and has none for the plain working materials", function() {
      expect(Material.lookup('silk').getTags()).to.deep.equal([ItemStyle.lavish]);
      expect(Material.lookup('leather').getTags()).to.deep.equal([ItemStyle.natural]);
      expect(Material.lookup('bone').getTags()).to.deep.equal([ItemStyle.barbaric]);
      expect(Material.lookup('steel').getTags()).to.deep.equal([]);
      expect(Material.lookup('wool').getTags()).to.deep.equal([]);
    });

    it("rejects an unknown style", function() {
      expect(() => Material.register('bad-style', { name:'Bad', cost:1, tags:['sporty'] })).to.throw(/sporty/);
    });
  });

  describe("forType()", function() {
    it("lists the materials that can be worked into the type", function() {
      expect(Material.forType(MaterialType.pliable)).to.deep.equal(['wool','silk','leather']);
      expect(Material.forType(MaterialType.hard)).to.deep.equal(['iron','steel','silver']);
    });

    it("knows which materials are metal", function() {
      expect(Material.isMetal('iron')).to.be.true;
      expect(Material.isMetal('bone')).to.be.false;
    });
  });

});

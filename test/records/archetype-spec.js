describe("Archetype", function() {

  // These read the shipped archetypes rather than fixtures, since a registered record can't be removed. Changing an
  // archetype's weights trips the spec on purpose.

  describe("getEquipmentPreferences()", function() {
    it("reads the weight for each item style", function() {
      const bimbo = Archetype.lookup(ArchetypeCode.bimbo).getEquipmentPreferences();
      const prude = Archetype.lookup(ArchetypeCode.prude).getEquipmentPreferences();

      expect(bimbo[ItemStyle.slutty]).to.equal(100);
      expect(bimbo[ItemStyle.formidable]).to.equal(-50);
      expect(prude[ItemStyle.slutty]).to.equal(-100);
      expect(prude[ItemStyle.formidable]).to.equal(100);
    });

    it("hands out a copy", function() {
      const preferences = Archetype.lookup(ArchetypeCode.prude).getEquipmentPreferences();
      preferences[ItemStyle.slutty] = 100;

      expect(Archetype.lookup(ArchetypeCode.prude).getEquipmentPreferences()[ItemStyle.slutty]).to.equal(-100);
    });

    it("leaves a style out when the archetype doesn't weigh it", function() {
      expect(Archetype.lookup(ArchetypeCode.prude).getEquipmentPreferences()).to.not.have.property(ItemStyle.feminine);
    });
  });

  describe("validation", function() {
    it("rejects an unknown style", function() {
      expect(() => Archetype.register('bad-style', { equipmentPreferences:{ sporty:10 } })).to.throw(/sporty/);
    });

    it("rejects a weight outside -100 to 100", function() {
      expect(() => Archetype.register('bad-weight', { equipmentPreferences:{ [ItemStyle.cute]:101 } })).to.throw(/greater than 100/);
    });

    it("requires the preference map", function() {
      expect(() => Archetype.register('no-map', {})).to.throw(/equipmentPreferences/);
    });
  });

});

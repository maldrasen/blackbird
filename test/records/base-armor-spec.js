describe("BaseArmor", function() {

  // These specs run against the real shipped armor rather than throwaway fixtures - there is no way to unregister a
  // base armor, so registering test pieces would leave them polluting the armory. Reduction profiles are authored at
  // steel quality; a steel piece comes out at its profile, while the soft wool and leather pieces are scaled down by
  // their material's absorption. The expected values are hard-coded so any change to a piece's data - or to a material
  // absorption factor - trips the spec.

  describe("getReduction()", function() {
    it("returns the authored profile for a steel piece", function() {
      const plate = BaseArmor.lookup('plate');
      expect(plate.getReduction(DamageType.crush)).to.equal(40);
      expect(plate.getReduction(DamageType.slash)).to.equal(50);
      expect(plate.getReduction(DamageType.pierce)).to.equal(48);
    });

    it("scales a wool piece down by its low absorption", function() {
      // doublet profile is 40/60/33 wool at 0.2 absorption -> 8/12/7.
      const doublet = BaseArmor.lookup('doublet');
      expect(doublet.getReduction(DamageType.crush)).to.equal(8);
      expect(doublet.getReduction(DamageType.slash)).to.equal(12);
      expect(doublet.getReduction(DamageType.pierce)).to.equal(7);
    });

    it("scales a leather piece down by its absorption", function() {
      const gloves = BaseArmor.lookup('gloves');
      expect(gloves.getReduction(DamageType.crush)).to.equal(5);
      expect(gloves.getReduction(DamageType.slash)).to.equal(8);
      expect(gloves.getReduction(DamageType.pierce)).to.equal(5);
    });

    it("keys the absorption off the primary material, not a softer backing", function() {
      // cuirass is steel plates over a leather backing; the steel plates are primary, so it keeps its full profile.
      expect(BaseArmor.lookup('cuirass').getReduction(DamageType.slash)).to.equal(35);
    });
  });

  describe("getReductionMap()", function() {
    it("gives the reduction for all three physical damage types", function() {
      expect(BaseArmor.lookup('plate').getReductionMap()).to.deep.equal({
        crush:40, slash:50, pierce:48,
      });
    });

    it("reflects the material scaling of a soft piece", function() {
      expect(BaseArmor.lookup('doublet').getReductionMap()).to.deep.equal({
        crush:8, slash:12, pierce:7,
      });
    });
  });

  describe("getMaterialParts()", function() {
    it("lists each part with its material and amount, primary first", function() {
      expect(BaseArmor.lookup('cuirass').getMaterialParts()).to.deep.equal([
        { part:'plates', material:MaterialType.steel, amount:3 },
        { part:'backing', material:MaterialType.leather, amount:2 },
      ]);
    });

    it("handles a single part piece", function() {
      expect(BaseArmor.lookup('gloves').getMaterialParts()).to.deep.equal([
        { part:'body', material:MaterialType.leather, amount:1 },
      ]);
    });
  });

  describe("getPrimaryMaterial()", function() {
    it("is the steel of a plate", function() {
      expect(BaseArmor.lookup('plate').getPrimaryMaterial()).to.equal(MaterialType.steel);
    });

    it("is the wool of a doublet", function() {
      expect(BaseArmor.lookup('doublet').getPrimaryMaterial()).to.equal(MaterialType.wool);
    });

    it("is the steel plates of a cuirass, not its leather backing", function() {
      expect(BaseArmor.lookup('cuirass').getPrimaryMaterial()).to.equal(MaterialType.steel);
    });
  });

  describe("getValue()", function() {
    it("prices a full plate from its heavy steel and its effort", function() {
      expect(BaseArmor.lookup('plate').getValue()).to.equal(900);
    });

    it("prices a steel-and-leather cuirass", function() {
      expect(BaseArmor.lookup('cuirass').getValue()).to.equal(550);
    });

    it("prices a padded wool doublet cheaply", function() {
      expect(BaseArmor.lookup('doublet').getValue()).to.equal(310);
    });
  });

});

describe("BaseArmor", function() {

  // Controlled fixtures so the assertions test the record's math rather than the (still being tuned) shipped armor
  // data. Reduction profiles are authored at steel quality; a soft material's absorption scales them down. Tests that
  // depend on a tuned factor derive the expected number from the live material; only the contractual anchors are
  // hard-coded (a steel piece sits at its authored profile, and an uncovered damage type reduces nothing).
  before(function() {
    BaseArmor.register('spec-steel-plate', {
      name:'spec steel plate', slots:[EquipmentSlot.chest], effort:6,
      reduction:{ crush:40, slash:50, pierce:48 },
      materials:{ body:{ material:MaterialType.steel, amount:5 }},
    });
    BaseArmor.register('spec-leather-cuirass', {
      name:'spec leather cuirass', slots:[EquipmentSlot.chest], effort:3,
      reduction:{ crush:20, slash:40, pierce:24 },
      materials:{ body:{ material:MaterialType.leather, amount:2 }},
    });
    BaseArmor.register('spec-scale', {
      name:'spec scale', slots:[EquipmentSlot.chest], effort:5,
      reduction:{ crush:25, slash:35, pierce:30 },
      materials:{ plates:{ material:MaterialType.steel, amount:3 }, backing:{ material:MaterialType.leather, amount:2 }},
    });
    BaseArmor.register('spec-partial', {
      name:'spec partial', slots:[EquipmentSlot.chest], effort:1,
      reduction:{ slash:30 },
      materials:{ body:{ material:MaterialType.steel, amount:1 }},
    });
  });

  describe("getReduction()", function() {
    it("returns the authored profile for a steel piece (absorption baseline is 1.0)", function() {
      const armor = BaseArmor.lookup('spec-steel-plate');
      expect(armor.getReduction(DamageType.crush)).to.equal(40);
      expect(armor.getReduction(DamageType.slash)).to.equal(50);
      expect(armor.getReduction(DamageType.pierce)).to.equal(48);
    });

    it("scales the profile down by a soft material's absorption, rounded", function() {
      const absorption = Material.getFactor(MaterialType.leather, MaterialFactor.absorption);
      const armor = BaseArmor.lookup('spec-leather-cuirass');
      expect(armor.getReduction(DamageType.crush)).to.equal(Math.round(20 * absorption));
      expect(armor.getReduction(DamageType.slash)).to.equal(Math.round(40 * absorption));
      expect(armor.getReduction(DamageType.pierce)).to.equal(Math.round(24 * absorption));
      expect(armor.getReduction(DamageType.slash)).to.be.below(40);
    });

    it("keys the absorption off the primary (first) material", function() {
      // Primary is steel, so the leather backing does not drag the reduction below the authored profile.
      expect(BaseArmor.lookup('spec-scale').getReduction(DamageType.slash)).to.equal(35);
    });

    it("is 0 for a damage type the profile does not cover", function() {
      const armor = BaseArmor.lookup('spec-partial');
      expect(armor.getReduction(DamageType.crush)).to.equal(0);
      expect(armor.getReduction(DamageType.pierce)).to.equal(0);
    });
  });

  describe("getReductionMap()", function() {
    it("gives the reduction for all three physical damage types", function() {
      expect(BaseArmor.lookup('spec-steel-plate').getReductionMap()).to.deep.equal({
        crush:40, slash:50, pierce:48,
      });
    });

    it("fills uncovered damage types with 0", function() {
      expect(BaseArmor.lookup('spec-partial').getReductionMap()).to.deep.equal({
        crush:0, slash:30, pierce:0,
      });
    });
  });

  describe("getMaterialParts()", function() {
    it("lists each part with its material and amount, primary first", function() {
      expect(BaseArmor.lookup('spec-scale').getMaterialParts()).to.deep.equal([
        { part:'plates', material:MaterialType.steel, amount:3 },
        { part:'backing', material:MaterialType.leather, amount:2 },
      ]);
    });
  });

  describe("getPrimaryMaterial()", function() {
    it("is the material of the first part listed", function() {
      expect(BaseArmor.lookup('spec-scale').getPrimaryMaterial()).to.equal(MaterialType.steel);
      expect(BaseArmor.lookup('spec-leather-cuirass').getPrimaryMaterial()).to.equal(MaterialType.leather);
    });
  });

  describe("getValue()", function() {
    // Value = (sum of material cost x amount) + (effort x _effortCost), rounded to the nearest 5. Derived from the
    // live cost/constant so retuning the economy does not break the spec.
    function expectedValue(code) {
      const armor = BaseArmor.lookup(code);
      const material = armor.getMaterialParts().reduce((sum,p) => sum + (Material.getCost(p.material) * p.amount), 0);
      return Math.round((material + (armor.getEffort() * _effortCost)) / 5) * 5;
    }

    it("is the material cost plus the build effort", function() {
      expect(BaseArmor.lookup('spec-steel-plate').getValue()).to.equal(expectedValue('spec-steel-plate'));
    });

    it("sums every part's material cost", function() {
      expect(BaseArmor.lookup('spec-scale').getValue()).to.equal(expectedValue('spec-scale'));
    });

    it("always comes out as a multiple of 5", function() {
      ['spec-steel-plate','spec-leather-cuirass','spec-scale','spec-partial'].forEach(code => {
        expect(BaseArmor.lookup(code).getValue() % 5).to.equal(0);
      });
    });

    it("rises with more costly materials", function() {
      // The steel plate uses far more, far costlier metal than the leather cuirass.
      expect(BaseArmor.lookup('spec-steel-plate').getValue())
        .to.be.above(BaseArmor.lookup('spec-leather-cuirass').getValue());
    });
  });

});

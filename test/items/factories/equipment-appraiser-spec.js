describe.only("EquipmentAppraiser", function() {

  function appraise(base, materials) {
    return EquipmentAppraiser.appraise({ base, materials });
  }

  describe("weapons", function() {
    it("values a weapon by its construction cost and damage per second", function() {
      expect(appraise('longsword',{ steel:3 })).to.equal(173);
    });

    it("prices the same weapon by what it was made from", function() {
      expect(appraise('longsword',{ flint:3 })).to.equal(114);
      expect(appraise('longsword',{ iron:3 })).to.equal(134);
      expect(appraise('longsword',{ silver:3 })).to.equal(253);
    });

    it("pays for every material in the item", function() {
      expect(appraise('flail',{ steel:4 })).to.equal(147);
      expect(appraise('flail',{ bone:3, silver:1 })).to.equal(125);
    });

    it("values a bow by its tension", function() {
      expect(appraise('longbow',{ wood:3 })).to.equal(79);
      expect(appraise('longbow',{ steel:3 })).to.equal(135);
    });
  });

  describe("armor", function() {
    it("values armor by its construction cost and total reduction", function() {
      expect(appraise('plate',{ steel:12 })).to.equal(456);
      expect(appraise('plate',{ iron:12 })).to.equal(285);
    });

    it("values soft armor", function() {
      expect(appraise('doublet',{ wool:4 })).to.equal(65);
      expect(appraise('doublet',{ silk:4 })).to.equal(96);
    });

    it("keys the reduction off the primary material", function() {
      expect(appraise('cuirass',{ steel:4, leather:4 })).to.equal(213);
    });
  });

  describe("shields", function() {
    it("doubles the reduction factor because a shield covers the whole body", function() {
      // 1 steel (20) plus 2 effort (200). The same 12 points of reduction on an armor piece would be worth 194.
      expect(appraise('buckler',{ steel:1 })).to.equal(159);
    });

    it("values the leather and wood builds", function() {
      expect(appraise('leather-buckler',{ leather:1 })).to.equal(115);
      expect(appraise('wood-kite-shield',{ wood:5 })).to.equal(231);
    });
  });

  describe("ItemHelper.getScaledDamageRange()", function() {
    it("leaves the authored range alone at baseline quality", function() {
      const range = ItemHelper.getScaledDamageRange(BaseEquipment.lookup('longsword'),'steel');
      expect(range).to.deep.equal({ low:50, high:100 });
    });

    it("scales a blade by sharpness", function() {
      const range = ItemHelper.getScaledDamageRange(BaseEquipment.lookup('longsword'),'flint');
      expect(range).to.deep.equal({ low:38, high:75 });
    });

    it("scales crush damage by heft instead", function() {
      const mace = BaseEquipment.lookup('mace');
      expect(ItemHelper.getScaledDamageRange(mace,'bone')).to.deep.equal({ low:20, high:100 });
      expect(ItemHelper.getScaledDamageRange(mace,'stone')).to.deep.equal({ low:15, high:75 });
    });

    it("blends the factors of a weapon with mixed damage types", function() {
      const range = ItemHelper.getScaledDamageRange(BaseEquipment.lookup('morning-star'),'iron');
      expect(range).to.deep.equal({ low:45, high:180 });
    });
  });

  describe("EquipmentFactory", function() {
    it("writes the appraised value onto the item component", function() {
      const factory = EquipmentFactory();
      factory.setAvailableMaterials(['steel']);
      expect(ItemComponent.lookup(factory.build('longsword')).value).to.equal(173);
    });
  });

});

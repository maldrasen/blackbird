describe("EquipmentComponent", function() {

  // EquipmentManager.equipItem() checks the slot before it writes, so these specs write to the component directly to
  // reach the validation behind it.
  function ownerOf(...codes) {
    const horse = CharacterFixtures.genericMale({});
    const items = codes.map(code => EquipmentFactory().build(code));
    items.forEach(item => InventoryManager(horse).addItem(item));
    return { horse, items };
  }

  describe("validate()", function() {
    it("accepts items in the slots their records allow", function() {
      const { horse, items:[sword, shield, helm] } = ownerOf('longsword','buckler','helm');
      EquipmentComponent.update(horse, { primary:sword, secondary:shield, head:helm });

      const equipment = EquipmentComponent.lookup(horse);
      expect(equipment.primary).to.equal(sword);
      expect(equipment.secondary).to.equal(shield);
      expect(equipment.head).to.equal(helm);
    });

    it("accepts a one handed weapon in either hand", function() {
      const { horse, items:[right, left] } = ownerOf('hatchet','knife');
      EquipmentComponent.update(horse, { primary:right, secondary:left });
      expect(EquipmentComponent.lookup(horse).secondary).to.equal(left);
    });

    it("rejects a shield in the main hand", function() {
      const { horse, items:[shield] } = ownerOf('buckler');
      expect(() => EquipmentComponent.update(horse, { primary:shield })).to.throw(/\(buckler\) cannot be equipped in primary/);
    });

    it("rejects a two handed weapon in the off hand", function() {
      const { horse, items:[claymore] } = ownerOf('claymore');
      expect(() => EquipmentComponent.update(horse, { secondary:claymore })).to.throw(/\(claymore\) cannot be equipped in secondary/);
    });

    it("rejects armor in a slot it doesn't name", function() {
      const { horse, items:[helm] } = ownerOf('helm');
      expect(() => EquipmentComponent.update(horse, { chest:helm })).to.throw(/\(helm\) cannot be equipped in chest/);
    });

    it("rejects a slot that doesn't exist", function() {
      const { horse, items:[sword] } = ownerOf('longsword');
      expect(() => EquipmentComponent.update(horse, { tail:sword })).to.throw(/does not have a tail slot/);
    });

    it("rejects an equipped item that isn't in the owner's inventory", function() {
      const horse = CharacterFixtures.genericMale({});
      const sword = EquipmentFactory().build('longsword');
      expect(() => EquipmentComponent.update(horse, { primary:sword })).to.throw(/isn't in Character/);
    });
  });

});

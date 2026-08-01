describe("MonsterFactory", function() {

  describe('Building a species based monster', function() {
    it("uses the CharacterFactory to build the base monster", function() {
      const id = MonsterFactory.build('deepdark-whisperer');
      expect(BodyComponent.lookup(id).scaleColor).to.equal('black');
    });

    it("leaves a natural fighter's hands empty", function() {
      const id = MonsterFactory.build('kobold-dick-puncher');
      const equipment = EquipmentComponent.lookup(id);

      expect(equipment.primary).to.be.undefined;
      expect(InventoryComponent.lookup(id).items).to.be.empty;
      expect(Monster(id).getPrioritizedAbilities().map(a => a.code)).to.include('punch');
    });

    it("equips real weapons", function() {
      const id = MonsterFactory.build('kobold-tosser');
      const primary = EquipmentComponent.lookup(id).primary;

      expect(WeaponComponent.lookup(primary).base).to.equal('bone-spear');
      expect(Weapon(primary).getName()).to.equal('bone spear');
      expect(InventoryComponent.lookup(id).items).to.include(primary);
    });

    it("equips armor", function() {
      const id = MonsterFactory.build('kobold-trapper');
      const chest = EquipmentComponent.lookup(id).chest;

      expect(ArmorComponent.lookup(chest).base).to.equal('leather-doublet');
      expect(Armor(chest).getName()).to.equal('leather doublet');
    });

    it("adds abilities");
  });

});

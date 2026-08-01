describe("MonsterFactory", function() {

  describe('Building a species based monster', function() {
    it("uses the CharacterFactory to build the base monster", function() {
      const id = MonsterFactory.build('deepdark-whisperer');
      expect(BodyComponent.lookup(id).scaleColor).to.equal('black');
    });

    it("adds natural attacks from the attack table", function() {
      const id = MonsterFactory.build('kobold-dick-puncher');
      const monster = MonsterComponent.lookup(id);
      expect(monster.basicAttack.main.base).to.equal('fist');
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

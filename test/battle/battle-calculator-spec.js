describe('BattleCalculator', function() {

  describe('rollWeaponDamage()', function() {

    it('rolls character damage', function() {
      const horse = CharacterFixtures.genericMale({ attributes:{ strength:30, dexterity:20 } });
      const axe = WeaponFactory.build('war-axe');

      // Now equip the war axe...

      // const equipment = EquipmentComponent.lookup(character);
      // equipment.legs = PantsFactory.build(options.legs);
      // equipment.chest = ShirtFactory.build(options.chest)
      // InventoryComponent.addItem(character, equipment.legs);
      // InventoryComponent.addItem(character, equipment.chest);
      // EquipmentComponent.update(character, equipment);
    });

    it('rolls monster damage');
    it('handles crits');
    it('handles deadly crits');
    it('handles fatal crits');
  });

});

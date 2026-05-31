describe('BattleCalculator', function() {

  describe.only('rollWeaponDamage()', function() {

    it('rolls character damage', function() {
      const horse = CharacterFixtures.genericMale({ attributes:{ strength:30, dexterity:20 } });
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

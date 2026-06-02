describe('BattleCalculator', function() {

  describe('rollWeaponDamage()', function() {

    it('rolls character damage', function() {
      const horse = CharacterFixtures.genericMale({ attributes:{ strength:30, dexterity:20 } });
      const axe = WeaponFactory.build('war-axe');

      InventoryManager(horse).addItem(axe);
      EquipmentManager(horse).equipItem(axe, EquipmentSlot.primary);
    });

    it('rolls monster damage');
    it('handles crits');
    it('handles deadly crits');
    it('handles fatal crits');
  });

});

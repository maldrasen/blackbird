global.BattleFixtures = (function() {

  // TODO: We'll need more control over the characters in the party for the tests.
  function prepareForBattle() {
    const player = CharacterFixtures.randomPlayer();
    const characters = CharacterFixtures.randomCharacters(2, { triggers:[] });

    PartyConfiguration.setCharacter(player,'0.1');
    PartyConfiguration.setCharacter(characters[0],'0.2');
    PartyConfiguration.setCharacter(characters[1],'1.1');

    equipAxe(player);
    equipSpear(characters[0]);
    equipSpear(characters[1]);
  }

  // TODO: Also equip a shield or offhand
  function equipAxe(id) {
    const axe = WeaponFactory.build('broad-axe');
    InventoryManager(id).addItem(axe);
    EquipmentManager(id).equipItem(axe, EquipmentSlot.primary);
  }

  function equipSpear(id) {
    const spear = WeaponFactory.build('spear');
    InventoryManager(id).addItem(spear);
    EquipmentManager(id).equipItem(spear, EquipmentSlot.primary);
  }

  return Object.freeze({
    prepareForBattle,
  })

})();
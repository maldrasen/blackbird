global.BattleFixtures = (function() {

  // TODO: We'll need more control over the characters in the party for the tests.
  function prepareForBattle() {
    const player = CharacterFixtures.randomPlayer();
    const characters = CharacterFixtures.randomCharacters(3, { species:'equian', triggers:['strong'] });

    PartyConfiguration.setCharacter(player,'P.0.2');
    PartyConfiguration.setCharacter(characters[0],'P.0.3');
    PartyConfiguration.setCharacter(characters[1],'P.0.1');
    PartyConfiguration.setCharacter(characters[2],'P.1.2');

    equipWeapon(player,'broad-axe',EquipmentSlot.primary);
    equipWeapon(characters[0],'spear',EquipmentSlot.primary);
    equipWeapon(characters[1],'dagger',EquipmentSlot.primary);
    equipWeapon(characters[2],'spear',EquipmentSlot.primary);
  }

  function equipWeapon(id, code, slot) {
    const weapon = WeaponFactory.build(code);
    InventoryManager(id).addItem(weapon);
    EquipmentManager(id).equipItem(weapon, slot);
  }

  return Object.freeze({
    prepareForBattle,
  })

})();
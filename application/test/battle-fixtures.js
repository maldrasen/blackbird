global.BattleFixtures = (function() {

  const koboldFucker = {
    name:'Longsword of Kobold Endangerment',
    base:'longsword',
    enchantment:{ type:WeaponEnchantments.endanger, species:'kobold', power:100 }
  }

  // TODO: We'll need more control over the characters in the party for the tests.
  function prepareForBattle() {
    const player = CharacterFixtures.randomPlayer();
    const characters = CharacterFixtures.randomCharacters(3, { species:'equian', triggers:['strong'] });

    PartyConfiguration.setCharacter(player,'P.0.2');
    PartyConfiguration.setCharacter(characters[0],'P.0.3');
    PartyConfiguration.setCharacter(characters[1],'P.0.1');
    PartyConfiguration.setCharacter(characters[2],'P.1.2');

    equipWeapon(player, koboldFucker, EquipmentSlot.primary);
    equipWeapon(characters[0], { base:'longsword'}, EquipmentSlot.primary);
    equipWeapon(characters[1], { base:'dagger'}, EquipmentSlot.primary);
    equipWeapon(characters[1], { base:'dagger'}, EquipmentSlot.secondary);
    equipWeapon(characters[2], { base:'spear'}, EquipmentSlot.primary);
  }

  function equipWeapon(id, weaponData, slot) {
    const weapon = WeaponFactory.build(weaponData.base, weaponData)
    InventoryManager(id).addItem(weapon);
    EquipmentManager(id).equipItem(weapon, slot);
  }

  return Object.freeze({
    prepareForBattle,
    equipWeapon,
  })

})();
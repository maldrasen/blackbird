global.BattleFixtures = (function() {

  const koboldFucker = {
    name:'Longsword of Kobold Endangerment',
    base:'longsword',
    enchantment:{ type:WeaponEnchantments.endanger, species:'kobold', power:100 }
  }

  // TODO: We'll need more control over the characters in the party for the tests.
  function prepareForBattle() {
    const player = CharacterFixtures.randomPlayer();
    const characters = CharacterFixtures.randomCharacters(5, { species:'elf' });

    PartyConfiguration.setCharacter(player,'P.0.2');
    PartyConfiguration.setCharacter(characters[0],'P.0.3');
    PartyConfiguration.setCharacter(characters[1],'P.0.1');
    PartyConfiguration.setCharacter(characters[2],'P.1.1');
    PartyConfiguration.setCharacter(characters[3],'P.1.2');
    PartyConfiguration.setCharacter(characters[4],'P.1.3');

    equipWeapon(player, koboldFucker, EquipmentSlot.primary);
    equipWeapon(characters[0], { base:'longsword'}, EquipmentSlot.primary);
    equipWeapon(characters[1], { base:'dagger'}, EquipmentSlot.primary);
    equipWeapon(characters[1], { base:'dagger'}, EquipmentSlot.secondary);
    equipWeapon(characters[2], { base:'dagger'}, EquipmentSlot.primary);
    equipWeapon(characters[2], { base:'dagger'}, EquipmentSlot.secondary);
    equipWeapon(characters[3], { base:'spear'}, EquipmentSlot.primary);
    equipWeapon(characters[4], { base:'dagger'}, EquipmentSlot.primary);
    equipWeapon(characters[4], { base:'dagger'}, EquipmentSlot.secondary);

    setSkill(characters[2], 'stealth', 1);
    setSkill(characters[4], 'stealth', 20);
  }

  function equipWeapon(id, weaponData, slot) {
    const weapon = WeaponFactory.build(weaponData.base, weaponData)
    InventoryManager(id).addItem(weapon);
    EquipmentManager(id).equipItem(weapon, slot);
  }

  function setSkill(id, code, value) {
    const skills = SkillsComponent.lookup(id);
    skills[code] = value;
    SkillsComponent.update(id, skills);
  }

  return Object.freeze({
    prepareForBattle,
    equipWeapon,
  })

})();
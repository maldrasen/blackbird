global.BattleFixtures = (function() {

  const koboldFucker = {
    name:'Longsword of Kobold Endangerment',
    base:'longsword',
    enchantment:{ type:WeaponEnchantments.endanger, species:'kobold', power:100 }
  }

  function prepareForBattle() {
    addPlayer('P.0.2');
    addTank('P.0.3');
    addRogue('P.1.2');
    addRogue('P.1.3');
  }

  function addPlayer(position) {
    const player = CharacterFixtures.randomPlayer();
    setSkill(player,'swords',Random.between(20,40));
    equipWeapon(player, koboldFucker, EquipmentSlot.primary);
    PartyConfiguration.setCharacter(player,position);
  }

  function addTank(position) {
    const tank = CharacterFixtures.randomCharacters(1,{ skills: {
      block: Random.between(10,20),
      swords: Random.between(10,20),
    }})[0];

    equipWeapon(tank, { base:'longsword'}, EquipmentSlot.primary);
    PartyConfiguration.setCharacter(tank,position);
  }

  function addRogue(position) {
    const rogue = CharacterFixtures.randomCharacters(1,{ skills:{
      stealth: Random.between(10,20),
      daggers: Random.between(10,20),
    }})[0];

    equipWeapon(rogue, { base:'dagger'}, EquipmentSlot.primary);
    equipWeapon(rogue, { base:'dagger'}, EquipmentSlot.secondary);
    PartyConfiguration.setCharacter(rogue,position);
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
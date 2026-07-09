// The CharacterEquipper outfits an existing character with weapons and armor appropriate to their skills and
// attributes. The budget isn't a total to spend, it's the most the character would pay for any single item. Each
// equipment slot uses a percentage of that budget, so characters end up with roughly comparable gear in every slot.
global.CharacterEquipper = function(id) {
  const minimumWeaponSkill = 10;
  const budgetWindow = 0.8;

  const skillsComponent = SkillsComponent.lookup(id);
  const attributesComponent = AttributesComponent.lookup(id);
  const inventoryManager = InventoryManager(id);
  const equipmentManager = EquipmentManager(id);

  const equipment = {};

  const SlotBudgetPercent = Object.freeze({
    primary: 1.0,
    secondary: 0.5,
    chest: 1.0,
    legs: 0.8,
    head: 0.3,
    feet: 0.5,
    hands: 0.25,
  });

  // TODO: The underchest and underlegs slots are skipped for now. There's no base armor registered for them yet.
  //       We'll also want slots for rings, amulet, and body piercings. Cloaks are a possibility as well.

  const ArmorSlots = [
    EquipmentSlot.chest,
    EquipmentSlot.legs,
    EquipmentSlot.head,
    EquipmentSlot.feet,
    EquipmentSlot.hands,
  ];

  // Only real weapon skills are considered when looking at what a character is trained in. Skills like block and
  // martial-arts are martial skills, but they don't map to a weapon we'd buy.
  const WeaponTypeBySkill = Object.freeze({
    axes: 'axe',
    bows: 'bow',
    daggers: 'dagger',
    maces: 'mace',
    polearms: 'polearm',
    swords: 'sword',
    whips: 'whip',
  });

  const StrengthWeaponTypes = ['axe','mace','polearm'];
  const DexterityWeaponTypes = ['bow','dagger','whip'];

  // The equip() function equips the character with a weapon, an off-hand item, and armor for every slot, then returns
  // a map of the slots that were actually filled with the new item ids. Slots with nothing affordable are simply left
  // empty.
  //
  // TODO: At the moment, we assume every character is a melee fighter for now. Magic users, specific armors for
  //       ranged fighters and rogues, ability-aware armor selection for higher level characters, and a finery pass
  //       for wealthy non-fighters can all come later.
  //
  // TODO: If a character is equipped with a bow, we'll also need to add arrows to their inventory.
  //
  function equip(budget) {
    equipWeapons(budget);
    equipArmor(budget);
    return equipment;
  }

  // === Weapons ===================================================================================================

  function equipWeapons(budget) {
    const weaponType = determineWeaponType();
    const primaryCode = selectByBudget(weaponCandidates(weaponType), budget * SlotBudgetPercent.primary);
    if (primaryCode == null) { return; }

    giveWeapon(primaryCode, EquipmentSlot.primary);
    if (BaseWeapon.lookup(primaryCode).getHands() === WeaponHandedness.two) { return; }

    const offhandType = isDexterous(weaponType) ? 'dagger' : 'shield';
    const secondaryCode = selectByBudget(weaponCandidates(offhandType), budget * SlotBudgetPercent.secondary);
    if (secondaryCode == null) { return; }

    giveWeapon(secondaryCode, EquipmentSlot.secondary);
  }

  // A character who's trained with a weapon uses that kind of weapon. Untrained characters get whatever suits their
  // attributes.
  function determineWeaponType() {
    const skilledType = typeFromSkills();
    return skilledType ? skilledType : typeFromAttributes();
  }

  // The highest weapon skill determines the weapon type, but only when it clears the minimum. Anything lower and
  // they're not really trained in anything.
  function typeFromSkills() {
    const best = Object.keys(WeaponTypeBySkill).reduce((winner, code) => {
      return (skillsComponent[code] || 0) > (skillsComponent[winner] || 0) ? code : winner;
    });

    if ((skillsComponent[best] || 0) < minimumWeaponSkill) { return null; }
    return WeaponTypeBySkill[best];
  }

  // Strong characters get a strength weapon and agile characters get a dexterity weapon, but when strength and
  // dexterity are within 10% of each other we give them a sword.
  function typeFromAttributes() {
    if (isBalanced()) { return 'sword'; }
    return Random.from(attributesComponent.strength > attributesComponent.dexterity ? StrengthWeaponTypes : DexterityWeaponTypes);
  }

  function isBalanced() {
    return Math.abs(attributesComponent.strength - attributesComponent.dexterity) <=
      Math.max(attributesComponent.strength, attributesComponent.dexterity) * 0.1;
  }

  // High dexterity characters prefer an off-hand dagger to a shield. Anyone using a dexterity weapon counts, as does
  // anyone whose dexterity beats their strength.
  function isDexterous(weaponType) {
    return (DexterityWeaponTypes.includes(weaponType)) ? true : (attributesComponent.dexterity > attributesComponent.strength);
  }

  // === Armor =====================================================================================================

  function equipArmor(budget) {
    ArmorSlots.forEach(slot => {
      const code = selectByBudget(armorCandidates(slot), budget * SlotBudgetPercent[slot]);
      if (code) {
        giveArmor(code, slot);
      }
    });
  }

  // === Selection =================================================================================================

  function weaponCandidates(type) {
    return BaseWeapon.getAllCodes().
      map(code => BaseWeapon.lookup(code)).
      filter(weapon => weapon.getType() === type).
      map(weapon => ({ code:weapon.getCode(), value:weapon.getValue() }));
  }

  function armorCandidates(slot) {
    return BaseArmor.getAllCodes().
      map(code => BaseArmor.lookup(code)).
      filter(armor => armor.getSlots().includes(slot)).
      map(armor => ({ code:armor.getCode(), value:armor.getValue() }));
  }

  // Pick a random item valued within 80% - 100% of the slot's budget. When nothing falls in that window we settle
  // for the next cheapest thing below it, and when nothing is affordable at all the slot goes empty.
  function selectByBudget(candidates, slotBudget) {
    const affordable = candidates.filter(item => item.value <= slotBudget);
    if (affordable.length === 0) { return null; }

    const inWindow = affordable.filter(item => item.value >= slotBudget * budgetWindow);
    if (inWindow.length > 0) { return Random.from(inWindow.map(item => item.code)); }

    const bestValue = Math.max(...affordable.map(item => item.value));
    return Random.from(affordable.filter(item => item.value === bestValue).map(item => item.code));
  }

  // === Giving ====================================================================================================

  function giveWeapon(code, slot) { give(WeaponFactory.build(code), slot); }
  function giveArmor(code, slot) { give(ArmorFactory.build(code), slot); }

  function give(itemId, slot) {
    inventoryManager.addItem(itemId);
    equipmentManager.equipItem(itemId, slot);
    equipment[slot] = itemId;
  }

  return Object.freeze({
    equip,
  });

}

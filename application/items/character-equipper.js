global.CharacterEquipper = function(id) {
  const minimumWeaponSkill = 10;
  const budgetWindow = 0.8;

  const species = Species.lookup(ActorComponent.lookup(id).species);
  const skillsComponent = SkillsComponent.lookup(id);
  const attributesComponent = AttributesComponent.lookup(id);
  const equipmentManager = EquipmentManager(id);
  const equipment = {};

  const SlotBudgetPercent = {
    primary: 1.0,
    secondary: 0.5,
    shield: 1.0,
    chest: 1.0,
    legs: 0.8,
    head: 0.3,
    feet: 0.5,
    hands: 0.25,
  };

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
  const WeaponTypeBySkill = {
    axes: 'axe',
    bows: 'bow',
    daggers: 'dagger',
    maces: 'mace',
    polearms: 'polearm',
    swords: 'sword',
    whips: 'whip',
  };

  const StrengthWeaponTypes = ['axe','mace','polearm'];
  const DexterityWeaponTypes = ['bow','dagger','whip'];

  //  - budget - The maximum a character can spend on any one piece of equipment, scaled by the SlotBudgetPercent.
  //  - bareHanded - This character will not buy weapons if this is true.
  //  - naked - This character will not but armor if this is true.
  //
  // TODO: At the moment, we assume every character is a melee fighter for now. Magic users, specific armors for
  //       ranged fighters and rogues, ability-aware armor selection for higher level characters, and a finery pass
  //       for wealthy non-fighters can all come later.
  //
  // TODO: If a character is equipped with a bow, we'll also need to add arrows to their inventory.
  //
  function equip(options) {
    if (options.bareHanded !== true) { equipWeapons(options.budget); }
    if (options.naked !== true) { equipArmor(options.budget); }
    return equipment;
  }

  // All the species have equipment parameters codes used to select which equipment depot to use as a fallback. A base
  // monster can also set its own equipment parameters property which take priority.
  function findDepot() {
    if (MonsterComponent.lookup(id)) {
      const monsterParameters = Monster(id).getBaseMonster().getEquipmentParameters();
      if (monsterParameters) { return EquipmentDepot(monsterParameters); }
    }
    return EquipmentDepot(species.getEquipmentParameters());
  }

  // === Weapons =======================================================================================================

  // A preset primary weapon means their weapons were chosen intentionally, so we leave both hands alone. Otherwise we
  // pick a primary and, unless it's two-handed or the off-hand is already filled, an appropriate secondary. The stock
  // is only fetched once because fetching it restocks the depot.
  function equipWeapons(budget) {
    if (isFilled(EquipmentSlot.primary)) { return; }

    const stock = findDepot().getWeapons();
    const primaryId = selectPrimary(stock, budget * SlotBudgetPercent.primary);
    if (primaryId == null) { return; }

    pickEquipment(primaryId, EquipmentSlot.primary);
    if (Item(primaryId).getBase().getHands() === WeaponHandedness.two) { return; }
    if (isFilled(EquipmentSlot.secondary)) { return; }

    // The off-hand follows the weapon they actually ended up with, which may not be the type they wanted.
    const offhandType = isDexterous(Item(primaryId).getBase().getType()) ? 'dagger' : 'shield';
    const offhandPercent = (offhandType === 'shield') ? SlotBudgetPercent.shield : SlotBudgetPercent.secondary;
    const secondaryCandidates = ofType(slotCandidates(stock, EquipmentSlot.secondary), offhandType);
    const secondaryId = selectByBudget(secondaryCandidates, budget * offhandPercent);
    if (secondaryId == null) { return; }

    pickEquipment(secondaryId, EquipmentSlot.secondary);
  }

  // A depot might not stock the weapon type a character wants (kobolds don't make whips), or might not have one
  // they can afford. Fighting with the wrong weapon beats fighting unarmed, so the search widens to any weapon in
  // budget, and then to the least unaffordable weapon in the depot. Only an empty depot leaves them unarmed. The
  // off-hand doesn't get this treatment, an empty off-hand is fine.
  function selectPrimary(stock, slotBudget) {
    const candidates = primaryCandidates(stock);

    return selectByBudget(ofType(candidates, determineWeaponType()), slotBudget)
        || selectByBudget(candidates, slotBudget)
        || selectCheapest(candidates);
  }

  // A character may already be equipped with an offhand weapon, but then equipping a two-handed weapon would knock it
  // out of their hand, so the equipper should only shop for something that leaves the off-hand alone. I'm not sure
  // that this is something that would ever actually come up in the real game, but the specs might want to specify that
  // a character must be equipped with a shield without also specifying their main hand weapon.
  function primaryCandidates(stock) {
    const candidates = slotCandidates(stock, EquipmentSlot.primary);
    return isFilled(EquipmentSlot.secondary) ?
      candidates.filter(item => Item(item.id).getBase().getHands() !== WeaponHandedness.two) :
      candidates;
  }

  // A character who's trained with a weapon uses that kind of weapon. Untrained characters get whatever suits their
  // attributes.
  function determineWeaponType() {
    return typeFromSkills() || typeFromAttributes();
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
    return DexterityWeaponTypes.includes(weaponType) || (attributesComponent.dexterity > attributesComponent.strength);
  }

  // === Armor =========================================================================================================

  function equipArmor(budget) {
    const stock = findDepot().getArmor();

    ArmorSlots.forEach(slot => {
      if (isFilled(slot)) { return; }
      const itemId = selectByBudget(slotCandidates(stock, slot), budget * SlotBudgetPercent[slot]);
      if (itemId) {
        pickEquipment(itemId, slot);
      }
    });
  }

  // === Selection =====================================================================================================

  // The stock list goes stale as items are picked from it, so anything this character has already taken is skipped.
  // Otherwise, a character with a dagger in each hand could try to pick the same dagger twice.
  function slotCandidates(stock, slot) {
    return stock.
      filter(itemId => Object.values(equipment).includes(itemId) === false).
      filter(itemId => equipmentManager.canEquipItem(itemId, slot)).
      map(itemId => ({ id:itemId, value:Item(itemId).getValue() }));
  }

  function ofType(candidates, type) {
    return candidates.filter(item => Item(item.id).getBase().getType() === type);
  }

  // Pick a random item valued within 80% - 100% of the slot's budget. When nothing falls in that window we settle
  // for the next cheapest thing below it, and when nothing is affordable at all the slot goes empty.
  function selectByBudget(candidates, slotBudget) {
    const affordable = candidates.filter(item => item.value <= slotBudget);
    if (affordable.length === 0) { return null; }

    const inWindow = affordable.filter(item => item.value >= slotBudget * budgetWindow);
    if (inWindow.length > 0) { return Random.from(inWindow.map(item => item.id)); }

    return randomWithValue(affordable, Math.max(...affordable.map(item => item.value)));
  }

  function selectCheapest(candidates) {
    if (candidates.length === 0) { return null; }
    return randomWithValue(candidates, Math.min(...candidates.map(item => item.value)));
  }

  function randomWithValue(candidates, value) {
    return Random.from(candidates.filter(item => item.value === value).map(item => item.id));
  }

  // === Giving ========================================================================================================

  function isFilled(slot) { return equipmentManager.getSlot(slot) != null; }

  function pickEquipment(itemId, slot) {
    findDepot().pickItem(itemId, id);
    equipmentManager.equipItem(itemId, slot);
    equipment[slot] = itemId;
  }

  // === Skills ========================================================================================================

  // If this character has been equipped with a weapon they have no skill in (which happens when the player character
  // is randomly given a weapon, or a monster falls back to whatever the depot had) we want to give them the minimum
  // starting skill to use that weapon. Otherwise, they'll just miss far too often.
  function assignSkills() {
    const primaryId = equipmentManager.getSlot(EquipmentSlot.primary);
    const secondaryId = equipmentManager.getSlot(EquipmentSlot.secondary);

    if (primaryId) { ensureMinimumSkill(Item(primaryId).getSkill()) }
    if (secondaryId) { ensureMinimumSkill(Item(secondaryId).getSkill()) }
  }

  // The minimum grows with level, and it's rolled before looking at the skill they have, so a character who's already
  // trained past the roll keeps what they've got.
  function ensureMinimumSkill(code) {
    const minimum = Math.min(100, minimumWeaponSkill + Random.roll(2 * Character(id).getLevel()));
    const skills = SkillsComponent.lookup(id);

    if (skills[code] < minimum) {
      skills[code] = minimum;
      SkillsComponent.update(id, skills);
    }
  }

  return {
    equip,
    assignSkills,
  };

}

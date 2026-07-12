global.FunctionLoom = (function() {

  function weave(context, name, argumentList) {
    switch(name) {
      case `unequip`: return unequip(context,argumentList);
      case `setPosition`: return setPosition(context,argumentList);
      case `aWeaponName`: return compileWeaponName(context,argumentList,'a');
      case `hisWeaponName`: return compileWeaponName(context,argumentList,'his');
      case `theWeaponName`: return compileWeaponName(context,argumentList,'the');
      default: throw new Error(`Unknown Loom Function: ${name}`);
    }
  }

  // If the propose training dialog specifies that scene should start in a position, we can update the position in the
  // training state.
  function setPosition(context, argumentList) {
    console.warn(`[TODO: Set the starting position to ${argumentList[0]}]`);
    return '';
  }

  // If the action text specifies that a character removes a piece of clothing we can have them unequip that slot.
  function unequip(context, argumentList) {
    const equipment = EquipmentManager(context[argumentList[0]]);
    equipment.equipItem(null, argumentList[1]);
    return '';
  }

  // This function gets a weapon's name from the context, or by looking up primary weapon data from the actor key. The
  // function prefixes the name with "a", "his", "the", or nothing if the weapon has a proper name. Text with a dagger
  // named Stabitha for instance should read "He thrust Stabitha" rather than "He thrust the Stabitha" or "He thrust
  // his Stabitha"
  function compileWeaponName(context,argumentList,prefix) {
    let base = context.baseWeapon;
    let weaponId = context.weapon;
    let name = context.weaponName;
    let nameType = context.weaponNameType || 'common';

    if (base == null) {
      const resolved = resolvePrimaryWeapon(context[argumentList[0]]);
      base = resolved.base;
      weaponId = resolved.id;
      name = resolved.name;
    }

    if (name == null) {
      name = BaseWeapon.lookup(base).getName();
    }

    if (weaponId) {
      const weapon = Weapon(weaponId);
      name = weapon.getName();
      nameType = weapon.getNameType();
    }

    const weaponName = `{S/wep}${name}{/S}`;
    if (nameType === 'proper') { return weaponName; }
    if (prefix === 'a') { return `${EnglishHelper.a_an(name)} ${weaponName}`; }
    if (prefix === 'his') { return `{${argumentList[0]}:his} ${weaponName}`; }

    return `the ${weaponName}`;
  }

  function resolvePrimaryWeapon(actorId) {

    if (MonsterComponent.lookup(actorId)) {
      const attack = Monster(actorId).getBasicAttack();
      const primary = attack.main || attack;
      if (primary.base) {
        return { base:primary.base, name:primary.name };
      }
    }

    const weaponId = EquipmentManager(actorId).getSlot(EquipmentSlot.primary);
    if (weaponId) {
      return { base:Weapon(weaponId).getBaseWeapon().getCode(), id:weaponId };
    }

    throw `Unable to determine a weapon for {${actorId}}.`
  }

  return Object.freeze({ weave });

})();

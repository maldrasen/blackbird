global.FunctionLoom = (function() {

  function weave(context, name, argumentList) {
    switch(name) {
      case `unequip`: return unequip(context,argumentList);
      case `setPosition`: return setPosition(context,argumentList);
      case `hisHitLocation`: return compileHitLocation(context,argumentList,'his');
      case `targetsHitLocation`: return compileHitLocation(context,argumentList,`targetName's`);
      case `aWeaponName`: return compileWeaponName(context,argumentList,'a');
      case `hisWeaponName`: return compileWeaponName(context,argumentList,'his');
      case `theWeaponName`: return compileWeaponName(context,argumentList,'the');
      case `yourWeaponName`: return compileWeaponName(context,argumentList,'your');
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

  // ===========================
  //    Target's Hit Location
  // ===========================
  // The target's hit location resolves to a phrase like "Greg's head", or "One of Greg's legs" and includes more
  // specific body parts locatated at those hit locations, like face, neck, or breasts.

  function compileHitLocation(context, argumentList, possessive) {
    const id = context[argumentList[0]];
    const location = context.hitLocation;
    const owner = `{${argumentList[0]}:${possessive}}`;

    if (location == null) { throw new Error(`The context has no hitLocation.`); }
    if (['abdomen','body','thorax'].includes(location)) { return `${owner} ${location}`; }
    if (location === EquipmentSlot.head) { return `${owner} ${Random.from(['head','face','neck'])}`; }
    if (location === EquipmentSlot.chest) { return chestHitLocation(id, owner); }
    if (location === EquipmentSlot.legs) { return legHitLocation(id, owner); }

    const singular = { hands:'hand', feet:'foot' }[location];

    return Random.from([
      `one of ${owner} ${location}`,
      `${owner} ${singular}`,
    ]);
  }

  // Hitting a character's chest will sometimes hit their breasts if they have breasts, and unlike the cock or pussy
  // hits will happen through armor.
  function chestHitLocation(id, owner) {
    const breasts = BreastsComponent.lookup(id);

    if (breasts && Random.roll(100) < 30) {
      return Random.from([
        `one of ${owner} {breasts}`,
        `one of ${owner} {T:breasts.apple} sized breasts`,
      ]);
    }

    return `${owner} chest`;
  }

  // Hitting a leg location can hit a character's cock or pussy, though it's rare. The character also has to be
  // bottomless or wearing lewd armor for this to happen. I think it's too complicated to retroactively add more
  // damage when this happens, so it's really only for flavor.
  function legHitLocation(id, owner) {
    const hasBody = BodyComponent.lookup(id) != null;

    if (hasBody && Character(id).isCrotchExposed()) {
      const cock = CockComponent.lookupNormalOf(id);
      const pussy = PussyComponent.lookupNormalOf(id);
      const exposed = Random.from(['exposed','naked','bare','vulnerable']);

      if (cock && Random.roll(100) < 20) {
        return Random.from([
          `${owner} ${exposed} {cock}`,
          `${owner} swinging {cock}`,
        ]);
      }

      if (pussy && Random.roll(100) < 10) {
        return `${owner} ${exposed} {pussy}`;
      }
    }

    return Random.from([
      `one of ${owner} ${Random.from(['legs','thighs'])}`,
      `${owner} ${Random.from(['leg','thigh'])}`,
    ]);
  }

  // =================
  //    Weapon Name
  // =================

  // This function gets a weapon's name from the context, or by looking up primary weapon data from the actor key. The
  // function prefixes the name with "a", "his", "the", or nothing if the weapon has a proper name. Text with a dagger
  // named Stabitha for instance should read "He thrust Stabitha" rather than "He thrust the Stabitha" or "He thrust
  // his Stabitha"
  function compileWeaponName(context,argumentList,prefix) {
    let base = context.baseWeapon;
    let weaponId = context.weapon;
    let name = context.weaponName;
    let nameType = context.weaponNameType || 'common';

    if (base == null && name == null) {
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
    if (prefix === 'your') { return `your ${weaponName}`; }

    return `the ${weaponName}`;
  }

  function resolvePrimaryWeapon(actorId) {
    const equipment = EquipmentComponent.lookup(actorId);
    const weaponId = equipment ? EquipmentManager(actorId).getSlot(EquipmentSlot.primary) : null;

    if (weaponId) {
      return { base:Weapon(weaponId).getBaseWeapon().getCode(), id:weaponId };
    }

    throw `Unable to determine a weapon for {${actorId}}.`
  }

  return { weave };

})();

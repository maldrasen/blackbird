global.FunctionLoom = (function() {

  function weave(context, name, argumentList) {
    switch(name) {
      case `aWeaponName`: return compileWeaponName(context,argumentList,'a');
      case `hisWeaponName`: return compileWeaponName(context,argumentList,'his');
      case `theWeaponName`: return compileWeaponName(context,argumentList,'the');
      default: throw new Error(`Unknown Loom Function: ${name}`);
    }
  }

  // This function gets a weapon's name from the context, prefixing the name with "a", "his", "the", or nothing if the
  // weapon has a proper name. Text with a dagger named Stabitha for instance should read "He thrust Stabitha" rather
  // than "He thrust the Stabitha" or "He thrust his Stabitha"
  //
  // The context should contain the base weapon code in baseWeapon and optionally the weapon entity id in { weapon }
  // The first element of the argument list should have the actor token to convert it to {A:his} if the prefix is his.
  function compileWeaponName(context,argumentList,prefix) {
    if (context['baseWeapon'] == null) { throw `At a minimum, baseWeapon should have been in the context.` }

    let name = context.weaponName;
    let nameType = context.weaponNameType || 'common';

    if (name == null) {
      name = BaseWeapon.lookup(context.baseWeapon).getName();
    }

    if (context.weapon) {
      const weapon = Weapon(context.weapon);
      name = weapon.getName();
      nameType = weapon.getNameType();
    }

    const weaponName = `{S/wep}${name}{/S}`;
    if (nameType === 'proper') { return weaponName; }
    if (prefix === 'a') { return `${EnglishHelper.a_an(name)} ${weaponName}`; }
    if (prefix === 'his') { return `{${argumentList[0]}:his} ${weaponName}`; }

    return `the ${weaponName}`;
  }

  return Object.freeze({ weave });

})();

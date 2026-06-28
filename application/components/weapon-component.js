global.WeaponComponent = (function() {
  const $properties = ['base','name','nameType','textKey','enchantment'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.weapon,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.weapon,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.weapon);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.weapon);
  }

  function validate(id) {
    const weaponComponent = lookup(id);

    Object.keys(weaponComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw new Error(`Weapon component does not have a ${key} property.`);
      }
    });

    Validate.exists('Weapon.base',weaponComponent.base);

    // Weapon names can be common or proper. A common name can be prefixed with "the" or "his", while a proper name has
    // no prefix. The difference between "He swings his spiked dildo bat" and "He thrusts Stabitha forward."
    if (weaponComponent.nameType) {
      Validate.isIn('Weapon.nameType',weaponComponent.nameType,['common','proper']);
    }
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();

global.WeaponComponent = (function() {
  const $properties = ['base','name','textKey','enchantment'];

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
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();

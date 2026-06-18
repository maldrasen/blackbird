global.WeaponFactory = (function() {

  function build(base, options={}) {
    const id = Registry.createEntity();

    ItemComponent.create(id, { type:'weapon' });
    WeaponComponent.create(id, { base:base });

    if (Object.keys(options).length > 0) {
      customizeWeapon(id, options);
    }

    return id;
  }

  // For now we can just pass the data from the options into the weapon component. Eventually we'll want to have
  // something else randomly building enchantments and adding them to weapons, adjusting the weapon name accordingly,
  // but for now just taking the raw values will let me build the canned weapons and let me use them.
  function customizeWeapon(id, options) {
    const weaponComponent = WeaponComponent.lookup(id);
    if (options.name) { weaponComponent.name = options.name; }
    if (options.textKey) { weaponComponent.textKey = options.textKey; }
    if (options.enchantment) { weaponComponent.enchantment = options.enchantment; }
    WeaponComponent.update(id, weaponComponent);
  }

  return Object.freeze({
    build,
  });

})();

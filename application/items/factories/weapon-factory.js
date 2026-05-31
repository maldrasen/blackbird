global.WeaponFactory = (function() {

  // A weapon at the bare minimum will have a base weapon type.
  function build(base, options={}) {
    const id = Registry.createEntity();
    WeaponComponent.create(id, { base:base });
    return id;
  }

  return Object.freeze({
    build,
  });

})();

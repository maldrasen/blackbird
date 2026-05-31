global.WeaponFactory = (function() {

  function build(base, options={}) {
    const id = Registry.createEntity();

    ItemComponent.create(id, { type:'weapon' });
    WeaponComponent.create(id, { base:base });

    return id;
  }

  return Object.freeze({
    build,
  });

})();

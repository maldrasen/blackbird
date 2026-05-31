global.ArmorFactory = (function() {

  function build(base, options={}) {
    const id = Registry.createEntity();

    ItemComponent.create(id, { type:'armor' });
    ArmorComponent.create(id, { base:base });

    return id;
  }

  return Object.freeze({
    build
  });

})();

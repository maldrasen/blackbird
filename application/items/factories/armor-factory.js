global.ArmorFactory = (function() {

  function build(base, options={}) {
    const id = Registry.createEntity();

    ItemComponent.create(id, { type:'armor' });
    ArmorComponent.create(id, { base:base });

    if (Object.keys(options).length > 0) {
      customizeArmor(id, options);
    }

    return id;
  }

  // For now I'm just making the armor factory work in just like the weapon factory.
  function customizeArmor(id, options) {
    const armorComponent = ArmorComponent.lookup(id);
    if (options.name) { armorComponent.name = options.name; }
    if (options.enchantment) { armorComponent.enchantment = options.enchantment; }
    ArmorComponent.update(id, armorComponent);
  }

  return Object.freeze({
    build
  });

})();

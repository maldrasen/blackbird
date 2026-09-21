global.ItemFixtures = (function() {

  function buildStandard(code) {
    return EquipmentFactory(EquipmentParameters.lookup('standard').getMaterials()).build(code);
  }

  // An item's name, reduction, and enchantment power all follow its material, so specs that assert them build in
  // steel, the baseline every factor is measured against.
  function buildSteel(code, options={}) {
    return build(code, ['steel'], options);
  }

  // Specs care about which materials an item can be made of, not how common they are, so they list the materials and
  // every one gets the same frequency.
  function build(code, materials, options={}) {
    return EquipmentFactory(Object.fromEntries(materials.map(material => [material, 1]))).build(code, options);
  }

  // Monsters pick whatever their depot happens to stock, so specs that need a character carrying something specific
  // hand it over here. The item goes into the first slot its base fits unless a slot option names another (an
  // off-hand dagger), replacing anything already equipped there. The rest of the options go to the factory.
  function equip(character, code, materials, options={}) {
    const { slot, ...buildOptions } = options;
    const item = build(code, materials, buildOptions);
    InventoryManager(character).addItem(item);
    EquipmentManager(character).equipItem(item, slot || BaseEquipment.lookup(code).getSlots()[0]);
    return item;
  }

  return {
    buildStandard,
    build,
    buildSteel,
    equip,
  };

})();

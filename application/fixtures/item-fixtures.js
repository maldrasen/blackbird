global.ItemFixtures = (function() {

  // The fixtures dress the party in specific materials, so they list the materials and every one gets the same
  // frequency.
  function build(code, materials, options={}) {
    return EquipmentFactory(Object.fromEntries(materials.map(material => [material, 1]))).build(code, options);
  }

  // The item goes into the first slot its base fits unless a slot option names another (an off-hand dagger), replacing
  // anything already equipped there. The rest of the options go to the factory.
  function equip(character, code, materials, options={}) {
    const { slot, ...buildOptions } = options;
    const item = build(code, materials, buildOptions);
    EquipmentManager(character).equipItem(item, slot || BaseEquipment.lookup(code).getSlots()[0]);
    return item;
  }

  return {
    build,
    equip,
  };

})();

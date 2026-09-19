global.ItemFixtures = (function() {

  // TODO: Eventually the character factory should just create an add an outfit to characters when they are built, and
  //       this fixture will be unnecessary.
  function addRandomEquipment(character, options={}) {
    const equipment = EquipmentManager(character);
    const inventory = InventoryManager(character);
    const factory = EquipmentFactory();
    const leggings = factory.build('leggings');
    const boots = factory.build('boots');

    inventory.addItem(leggings);
    inventory.addItem(boots);

    equipment.equipItem(leggings, EquipmentSlot.legs);
    equipment.equipItem(boots, EquipmentSlot.feet);
  }

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

  // Monsters don't equip themselves until the depots exist (task 225), so specs that need a monster carrying
  // something specific hand it over here. The item goes into the first slot its base fits.
  function equip(character, code, materials) {
    const item = build(code, materials);
    InventoryManager(character).addItem(item);
    EquipmentManager(character).equipItem(item, BaseEquipment.lookup(code).getSlots()[0]);
    return item;
  }

  return {
    addRandomEquipment,
    buildStandard,
    build,
    buildSteel,
    equip,
  };

})();

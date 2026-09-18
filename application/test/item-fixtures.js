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

  // An item's name, reduction, and enchantment power all follow its material, so specs that assert them build in
  // steel, the baseline every factor is measured against.
  function buildSteel(code, options={}) {
    const factory = EquipmentFactory();
    factory.setAvailableMaterials(['steel']);
    return factory.build(code, options);
  }

  return {
    addRandomEquipment,
    buildSteel,
  };

})();

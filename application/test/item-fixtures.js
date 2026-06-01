global.ItemFixtures = (function() {

  // TODO: Eventually the character factory should just create an add an outfit to characters when they are built, and
  //       this fixture will be unnecessary.
  function addRandomEquipment(character, options={}) {
    const equipment = EquipmentManager(character);
    const inventory = InventoryManager(character);
    const leggings = ArmorFactory.build('leggings');
    const boots = ArmorFactory.build('boots');

    inventory.addItem(leggings);
    inventory.addItem(boots);

    equipment.equipItem(leggings, EquipmentSlot.legs);
    equipment.equipItem(boots, EquipmentSlot.feet);
  }

  return Object.freeze({
    addRandomEquipment,
  });

})();

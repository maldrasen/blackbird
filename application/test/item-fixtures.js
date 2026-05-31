global.ItemFixtures = (function() {

  // TODO: Eventually the character factory should just create an add an outfit to characters when they are built, and
  //       this fixture will be unnecessary.
  function addRandomEquipment(character, options={}) {
    const equipment = EquipmentComponent.lookup(character);
    equipment.legs = PantsFactory.build(options.legs);
    equipment.chest = ShirtFactory.build(options.chest)

    const manager = InventoryManager(character);
    manager.addItem(equipment.legs);
    manager.addItem(equipment.chest);

    // This needs to go through the equipment manager...
    EquipmentComponent.update(character, equipment);
  }

  return Object.freeze({
    addRandomEquipment,
  });

})();

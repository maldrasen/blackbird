global.ItemFixtures = (function() {

  // TODO: Eventually the character factory should just create an add an outfit to characters when they are built, and
  //       this fixture will be unnecessary.
  function addRandomEquipment(character, options={}) {
    console.log("WIP: ItemFixtures.addRandomEquipment()");

    /*
    const equipment = EquipmentComponent.lookup(character);
    equipment.legs = ArmorFactory.build(options.legs);
    equipment.chest = ArmorFactory.build(options.chest)

    const manager = InventoryManager(character);
    manager.addItem(equipment.legs);
    manager.addItem(equipment.chest);

    EquipmentComponent.update(character, equipment);
     */
  }

  return Object.freeze({
    addRandomEquipment,
  });

})();

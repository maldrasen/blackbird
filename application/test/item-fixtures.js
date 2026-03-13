global.ItemFixtures = (function() {

  function addRandomEquipment(character, options={}) {
    const equipment = EquipmentComponent.lookup(character);
    equipment.legs = PantsFactory.build(options.legs);
    equipment.chest = ShirtFactory.build(options.chest)

    InventoryComponent.addItem(character, equipment.legs);
    InventoryComponent.addItem(character, equipment.chest);
    EquipmentComponent.update(character, equipment);
  }

  return Object.freeze({
    addRandomEquipment,
  });

})();

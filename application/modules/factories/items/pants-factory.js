global.PantsFactory = (function() {

  function build(options={}) {
    return ItemComponent.create({ name:'pants', slots:[EquipmentSlot.legs] });
  }

  return Object.freeze({
    build
  });

})()
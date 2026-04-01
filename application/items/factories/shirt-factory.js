global.ShirtFactory = (function() {

  function build(options={}) {
    return ItemComponent.create({ name:'shirt', slots:[EquipmentSlot.chest] });
  }

  return Object.freeze({
    build
  });

})();

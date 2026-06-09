global.Armor = function(id) {

  function getComponent() { return ArmorComponent.lookup(id); }

  return Object.freeze({
    getId: () => { return id; },
    getBaseWeapon: () => { return BaseArmor.lookup(getComponent().base); }
  });
}

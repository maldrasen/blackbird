global.Weapon = function(id) {

  function getComponent() { return WeaponComponent.lookup(id); }

  return Object.freeze({
    getId: () => { return id; },
    getBaseWeapon: () => { return BaseWeapon.lookup(getComponent().base); }
  });
}

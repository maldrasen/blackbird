global.Weapon = function(id) {

  function getComponent() { return WeaponComponent.lookup(id); }

  function getName() {
    const component = getComponent();
    return component.name || BaseWeapon.lookup(component.base).getName();
  }

  return Object.freeze({
    getId: () => { return id; },
    getBaseWeapon: () => { return BaseWeapon.lookup(getComponent().base); },
    getName,
  });
}

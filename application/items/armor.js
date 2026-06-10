global.Armor = function(id) {

  function getComponent() { return ArmorComponent.lookup(id); }

  function getName() {
    const component = getComponent();
    return component.name || BaseArmor.lookup(component.base).getName();
  }

  return Object.freeze({
    getId: () => { return id; },
    getBaseWeapon: () => { return BaseArmor.lookup(getComponent().base); },
    getName,
  });
}

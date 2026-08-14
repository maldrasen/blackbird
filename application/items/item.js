global.Item = function(id) {

  function getName() {
    switch (ItemComponent.lookup(id).type) {
      case 'armor': return Armor(id).getName();
      case 'weapon': return Weapon(id).getName();
      default: throw new Error(`TODO: Names for item type: ${type}`);
    }
  }

  function getIcon() {
    switch (ItemComponent.lookup(id).type) {
      case 'armor': return Armor(id).getIcon();
      case 'weapon': return Weapon(id).getIcon();
      default: throw new Error(`TODO: Icons for item type: ${type}`);
    }
  }

  return {
    getName,
    getIcon,
    isLewd: () => { return ItemComponent.lookup(id).isLewd === true; }
  };

}

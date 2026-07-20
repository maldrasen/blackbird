global.Item = function(id) {

  function getName() {
    const type = ItemComponent.lookup(id).type;
    if (type === 'armor') { return Armor(id).getName(); }
    if (type === 'weapon') { return Weapon(id).getName(); }
    throw new Error(`TODO: Names for item type: ${type}`);
  }

  function getIcon() {
    const type = ItemComponent.lookup(id).type;
    if (type === 'armor') { return Armor(id).getIcon(); }
    if (type === 'weapon') { return Weapon(id).getIcon(); }
    throw new Error(`TODO: Icons for item type: ${type}`);
  }

  return Object.freeze({
    getName,
    getIcon,
    isLewd: () => { return ItemComponent.lookup(id).isLewd === true; }
  });

}

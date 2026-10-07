Record.define('EnchantmentPattern', {
  getInstance: pattern => {

    // An enchantment pattern can be used to rename the enchanted item. The getName() function may need to know the
    // item being named in case the name depends on what kind of item is being named. The getName() function needs to
    // return an object with { name, nameType } in case the item name becomes a proper name. The getName() function is
    // optional and may return null if the enchanted item shouldn't be renamed.
    function rename(id) {
      const item = ItemComponent.lookup(id);
      const newName = pattern.getName?.(id);

      if (newName) {
        item.name = newName.name;
        item.nameType = newName.nameType || 'common';
        ItemComponent.update(id, item);
      }
    }

    return {
      buildEffects: id => { return pattern.buildEffects(id); },
      rename,
    }
  }
});

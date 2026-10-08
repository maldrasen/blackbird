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

    // An on hit pattern is given the item's enchantment, the round context, and the raw damage types of the hit, which
    // it may adjust. It decides whether the enchantment fires on this hit and returns { effects, message }: the status
    // effects to roll against the target and the message shown when one lands. It returns null when it doesn't fire.
    function processOnHit(enchantment, context, damageTypes) {
      return pattern.processOnHit(enchantment, context, damageTypes);
    }

    return {
      rename,
      buildEffects: id => { return pattern.buildEffects(id); },
      getTrigger: () => { return pattern.trigger; },
      processOnHit,
    }
  }
});

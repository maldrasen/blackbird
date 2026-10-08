Record.define('EnchantmentPattern', {
  getInstance: pattern => {

    // The appliesTo property is normally an array of ItemTypes. If the type is in that array this enchantment can be
    // added to it. For more fine grained control appliesTo can also be a closure. For instance, a poison enchantment
    // that can only be applied to a weapon that does piercing damage. Most maces don't deal piercing damage, but a
    // morning star does, so the ItemType alone wouldn't be sufficient in this case. If the appliesTo isn't specified
    // we can assume any item can have this enchantment.
    function canBeAppliedTo(id) {
      if (pattern.appliesTo == null) { return true; }
      return Array.isArray(pattern.appliesTo) ? pattern.appliesTo.includes(Item(id).getType()) : pattern.appliesTo(id);
    }

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

    // An on hit pattern takes part in a successful physical attack at one or both of two moments. Before the hit it's
    // given the raw damage types of the attack, which it may adjust. After the hit the damage has been dealt. A status
    // applied before the hit is caught by the hit itself (vulnerable doubles the damage and is consumed), so a status
    // meant for the next attack goes after the hit. Either hook is given the item's enchantment and the round context,
    // and returns { effects, message }: the status effects to roll against the target and the message shown when one
    // lands. It returns null when the enchantment doesn't fire.
    function processBeforeHit(enchantment, context, damageTypes) {
      return pattern.processBeforeHit ? pattern.processBeforeHit(enchantment, context, damageTypes) : null;
    }

    function processAfterHit(enchantment, context) {
      return pattern.processAfterHit ? pattern.processAfterHit(enchantment, context) : null;
    }

    return {
      getRarity: () => { return pattern.rarity },
      canBeAppliedTo,
      rename,
      buildProperties: () => { return pattern.buildProperties ? pattern.buildProperties() : {}; },
      buildEffects: id => { return pattern.buildEffects(id); },
      getTrigger: () => { return pattern.trigger; },
      processBeforeHit,
      processAfterHit,
    }
  },

  validate: (pattern, code) => {
    const hasHook = pattern.processBeforeHit != null || pattern.processAfterHit != null;
    if (pattern.trigger === EnchantmentTrigger.onHit && hasHook === false) {
      throw new Error(`EnchantmentPattern [${code}] triggers on hit without a processBeforeHit or processAfterHit.`);
    }
  },
});

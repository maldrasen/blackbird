global.Enchanter = (function() {

  function enchant(id, pattern, properties={}) {
    const patternRecord = EnchantmentPattern.lookup(pattern);

    const item = ItemComponent.lookup(id);
    item.enchantment = { pattern, properties, effects:scaleEffects(id, patternRecord.buildEffects()) }
    ItemComponent.update(id, item);

    patternRecord.rename(id);
  }

  // Picks a pattern that applies to the item, favoring the commoner rarities, and enchants the item with it, rolling
  // whatever properties the pattern needs. Returns the pattern code, or null when no pattern applies to the item.
  function enchantRandomly(id) {
    const candidates = EnchantmentPattern.getAllCodes().
      map(code => EnchantmentPattern.lookup(code)).
      filter(pattern => pattern.canBeAppliedTo(id)).
      map(pattern => ({ code:pattern.getCode(), rarity:pattern.getRarity() }));

    const pick = RarityHelper.pickByRarity(candidates);
    if (pick == null) { return null; }

    enchant(id, pick.code, EnchantmentPattern.lookup(pick.code).buildProperties());
    return pick.code;
  }

  // Rolls the percent chance that an item built for stock comes out enchanted, enchanting it randomly on a hit.
  // Returns the pattern code, or null when the roll misses or nothing applies. A chance of zero never rolls.
  function rollForEnchantment(id, chance) {
    if (chance <= 0) { return null; }
    return (Random.roll(100) < chance) ? enchantRandomly(id) : null;
  }

  function scaleEffects(id, effects) {
    const material = Item(id).getPrimaryMaterial();
    const potential = Material.lookup(material).getFactor(MaterialFactor.potential);

    effects.forEach(effect => {
      effect.strength = Math.round(effect.strength * potential);
    });

    return effects;
  }

  return {
    enchant,
    enchantRandomly,
    rollForEnchantment,
  }

})();

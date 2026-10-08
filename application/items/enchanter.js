global.Enchanter = (function() {

  function enchant(id, pattern, properties={}) {
    const patternRecord = EnchantmentPattern.lookup(pattern);

    const item = ItemComponent.lookup(id);
    item.enchantment = { pattern, properties, effects:scaleEffects(id, patternRecord.buildEffects()) }
    ItemComponent.update(id, item);

    patternRecord.rename(id);
  }

  // TODO: Material can't be null... right?
  function scaleEffects(id, effects) {
    const material = Item(id).getPrimaryMaterial();
    const potential = Material.lookup(material).getFactor(MaterialFactor.potential);

    effects.forEach(effect => {
      effect.power = Math.round(effect.power * potential);
    });

    return effects;
  }

  return {
    enchant
  }

})();

EnchantmentPattern.register(`endanger`, {
  rarity: Rarity.unusual,
  appliesTo: ItemConstants.allWeaponTypes,
  trigger: EnchantmentTrigger.onHit,
  buildProperties: () => { return { species:Random.from(Species.getAllCodes()) }; },
  getName: id => {
    const species = Enchantment(id).getProperty('species');
    return { name:`${Item(id).getName()} of ${Species.lookup(species).getName()} Endangerment` }
  },
  buildEffects: id => { return [Effect.vulnerable({ strength:Random.between(20,40), count:1 })] },

  // The enchantment only fires against the species it was made to endanger, and lands after the hit so that the
  // vulnerability waits for the next attack rather than doubling this one.
  processAfterHit: (enchantment, context) => {
    if (enchantment.getProperty('species') !== BattleHelper.getSpecies(context.T)) { return null; }

    return {
      effects: enchantment.getEffects(),
      message: `The attack leaves a trail of crackling sparks, causing intense pain and hindering {T:his} movements.`,
    };
  },
});

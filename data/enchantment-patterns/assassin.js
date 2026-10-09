// An assassin's dagger gives its wielder a chance to slip back into hiding after a sneak attack, whether or not the
// attack landed. Only the hand that struck counts: an assassin's dagger in the off hand sits out a sneak attack made
// with the primary.
EnchantmentPattern.register(`assassin`, {
  rarity: Rarity.unusual,
  appliesTo: [ItemType.dagger],
  trigger: EnchantmentTrigger.endRound,
  getName: id => { return { name:`Assassin's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.buffAfterRound('hidden', { strength:35 })] },

  processEndRound: (enchantment, context) => {
    if (BattleSystem.getRound().getAbility().getName() !== 'Sneak Attack') { return null; }
    if (context.weapon !== context.I) { return null; }

    return {
      effects: enchantment.getEffects(),
      message: `{A:ActingName} slips back into the shadows.`,
    };
  },
});

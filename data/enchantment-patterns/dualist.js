// A dualist's sword gives its wielder a chance to come out of a basic attack poised to defend, hit or miss. A basic
// attack alternates between every weapon the wielder holds, so there's no striking hand to single out the way the
// assassin's dagger does.
EnchantmentPattern.register(`dualist`, {
  rarity: Rarity.unusual,
  appliesTo: [ItemType.sword],
  trigger: EnchantmentTrigger.endRound,
  getName: id => { return { name:`Dualist's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.buffAfterRound('poised', { strength:25, count:1 })] },

  processEndRound: enchantment => {
    if (BattleSystem.getRound().getAbility().getName() !== 'Attack') { return null; }

    return {
      effects: enchantment.getEffects(),
      message: `{A:ActingName} recovers with a flourish, {S/pst}Poised{/S} to meet the next attack.`,
    };
  },
});

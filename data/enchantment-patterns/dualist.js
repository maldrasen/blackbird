
EnchantmentPattern.register(`dualist`, {
  rarity: Rarity.unusual,
  appliesTo: [ItemType.sword],
  trigger: EnchantmentTrigger.endRound,
  processEndRound,
  getName: id => { return { name:`Dualist's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.buffAfterRound('poised', { strength:15, count:1 })]},
});

EnchantmentPattern.register(`swashbuckler`, {
  rarity: Rarity.unusual,
  appliesTo: [ItemType.sword],
  trigger: EnchantmentTrigger.endRound,
  processEndRound,
  getName: id => { return { name:`Swashbuckler's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.buffAfterRound('poised', { strength:30, count:1 })]},
});

function processEndRound(enchantment) {
  if (BattleSystem.getRound().getAbility().getName() === 'Attack') {
    return {
      effects: enchantment.getEffects(),
      message: `{A:ActingName} finishes {A:his} attack with a flourish, {S/pst}Poised{/S} to meet the next attack.`,
    };
  }
}

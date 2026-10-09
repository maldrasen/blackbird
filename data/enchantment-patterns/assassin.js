
EnchantmentPattern.register(`assassin`, {
  rarity: Rarity.unusual,
  appliesTo: [ItemType.dagger],
  trigger: EnchantmentTrigger.endRound,
  processEndRound,
  getName: id => { return { name:`Assassin's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.buffAfterRound('hidden', { strength:10 })]},
});

EnchantmentPattern.register(`shadowstrike`, {
  rarity: Rarity.rare,
  appliesTo: [ItemType.dagger],
  trigger: EnchantmentTrigger.endRound,
  processEndRound,
  getName: id => { return { name:`Shadowstrike ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.buffAfterRound('hidden', { strength:20 })]},
});

EnchantmentPattern.register(`nightblade`, {
  rarity: Rarity.rare,
  appliesTo: [ItemType.dagger],
  trigger: EnchantmentTrigger.endRound,
  processEndRound,
  getName: id => { return { name:`Nightblade's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.buffAfterRound('hidden', { strength:30 })]},
});

function processEndRound(enchantment, context) {
  if (BattleSystem.getRound().getAbility().getName() !== 'Sneak Attack') { return null; }
  if (context.weapon !== context.I) { return null; }

  return {
    effects: enchantment.getEffects(),
    message: `{A:ActingName} slips back into the shadows.`,
  };
}

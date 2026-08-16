StatusEffectType.register('poison',{
  name: 'Poison',
  category: 'negative',
  damageType: DamageType.nature,
  durationType: StatusEffectDurationType.untilResisted,
  interval: 800,
  clearAfterBattle: true,

  getDamageMessage: damage => { return `{A:ActingName} takes ${damage} {S/nst}poison{/S} damage.` },
  getResistMessage: () => { return `The poison fades from {A:his} veins.` },
});

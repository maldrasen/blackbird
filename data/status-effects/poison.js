StatusEffectType.register('poison',{
  name: 'Poison',
  category: 'negative',
  damageType: DamageType.nature,
  durationType: StatusEffectDurationType.untilResisted,
  interval: 1000,
  clearAfterBattle: true,
});

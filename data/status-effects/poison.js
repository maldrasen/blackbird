StatusEffectType.register('poison',{
  name: 'Poison',
  category: 'negative',
  damageType: DamageType.nature,
  durationType: StatusEffectDurationType.untilResisted,
  interval: 2000,
  clearAfterBattle: true,
});

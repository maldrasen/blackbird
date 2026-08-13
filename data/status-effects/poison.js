StatusEffectType.register('poison',{
  name: 'Poison',
  category: 'negative',
  damageType: DamageType.nature,
  durationType: StatusEffectDurationType.untilResisted,
  clearAfterBattle: true,
});

StatusEffectType.register('off-balance',{
  name: 'Off Balance',
  category: 'negative',
  damageType: DamageType.psychic,
  durationType: StatusEffectDurationType.turnCount,
  clearAfterBattle: true,
});

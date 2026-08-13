StatusEffectType.register('stun',{
  name: 'Stun',
  category: 'negative',
  damageType: DamageType.shock,
  durationType: StatusEffectDurationType.turnCount,
  removedAt: 'end-of-round',
  clearAfterBattle: true,
});

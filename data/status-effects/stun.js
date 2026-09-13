StatusEffectType.register('stun',{
  name: 'Stun',
  category: 'negative',
  damageType: DamageType.shock,
  durationType: StatusEffectDurationType.turnCount,
  clearAfterBattle: true,
  essence: 40,
});

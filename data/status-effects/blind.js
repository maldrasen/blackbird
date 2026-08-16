StatusEffectType.register('blind',{
  name: 'Blind',
  category: 'negative',
  damageType: DamageType.fire,
  durationType: StatusEffectDurationType.fixedTime,
  clearAfterBattle: true,

  getExpireMessage: () => { return `{A:ActingName} is no longer blind.` },
});

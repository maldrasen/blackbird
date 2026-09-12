StatusEffectType.register('blind',{
  name: 'Blind',
  category: 'negative',
  damageType: DamageType.fire,
  durationType: StatusEffectDurationType.fixedTime,
  clearAfterBattle: true,
  essence: 15,

  getExpireMessage: () => { return `{A:ActingName} is no longer blind.` },
});

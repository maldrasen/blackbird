StatusEffectType.register('burn',{
  name: 'Burn',
  category: 'negative',
  damageType: DamageType.fire,
  durationType: StatusEffectDurationType.fixedTime,
  interval: 1000,
  clearAfterBattle: true,

  getDamageMessage: damage => { return `{A:ActingName} is on fire! {A:He} takes {S/nst}${damage} fire{/S} damage.` },
  getResistMessage: () => { return `The flames surrounding {A:actingName} die out.` },
});


const stories = WeaverPackage('incinerate');
stories.add(`{A:ActingName}'s body is wreathed in fire and smoke. {A:He} screams and raises {A:his} arms as the 
  configuration builds around {A:him}. Then, with a point of {A:his} smouldering finger, {T:targetName} suddenly 
  bursts into flame.`);

Spell.register('incinerate', {
  name: 'Incinerate',
  color: 'red',
  manaCost: 12,
  target: EffectTarget.single,
  castingTime: 'slow',

  getEffects: powerLevel => {
    return [
      Effect.damage(DamageType.fire,{ x:powerLevel, d:8, p:10 }),
      Effect.burn({ duration:(powerLevel * 1000), damage:{ x:2, d:8 }}),
    ];
  },

  stories: stories,
  messageForEntity: (id,results) => {
    return `{T:TargetName} takes {S/nst}${results.damage} fire{/S} damage.`;
  },

});


const stories = WeaverPackage('ember');
stories.add(`{A:ActingName} cups {A:his} hands, forming a small ball of fire that {A:he} tosses at {T:targetName}.`);

Spell.register('ember', {
  name: 'Ember',
  color: 'red',
  manaCost: 2,
  target: EffectTarget.single,
  castingTime:'medium',

  getEffects: powerLevel => {
    return [Effect.damage(DamageType.fire,{ x:powerLevel, d:4 })];
  },

  stories: stories,
  messageForEntity: (id,results) => {
    return `{T:TargetName} takes ${results.damage} fire damage.`;
  },

});

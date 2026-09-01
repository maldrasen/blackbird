
const stories = WeaverPackage('overwhelming-effulgence-start');
stories.add(`Brilliant beams of light burst from {A:actingName's} palms, filling the room with a blinding light.`);

Spell.register('overwhelming-effulgence', {
  name: 'Overwhelming Effulgence',
  color: 'red',
  manaCost: 5,
  target: EffectTarget.enemyFormation,

  getEffects: powerLevel => {
    const duration = (powerLevel * 1000) + 1000;
    const strength = (powerLevel * 5) + 5;
    return [Effect.blind({ strength, duration })];
  },

  stories: stories,
  messageForEntity: (id,results) => {
    return results.blind ? `{T:TargetName} is blinded!` : null;
  },

});

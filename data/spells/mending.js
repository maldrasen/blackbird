
const stories = WeaverPackage('mending');
stories.add(`{A:ActingName} casts mending on {A:him}self.`,CharacterRequirements.isSameEntity('A','T'));
stories.add(`{A:ActingName} casts mending on {T:TargetName}.`,CharacterRequirements.isNotSameEntity('A','T'));

Spell.register('mending', {
  name: 'Mending',
  color: Mana.green,
  manaCost: 3,
  target: EffectTarget.ally,

  getEffects: powerLevel => {
    const min = powerLevel * 10;
    return [Effect.restoreHealth(min,min*2)];
  },

  stories: stories,
  messageForEntity: (id,results) => {
    return `{T:TargetName} recovers ${results.health} health.`;
  },

});

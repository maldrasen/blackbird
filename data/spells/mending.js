
const stories = WeaverPackage('mending');
stories.add(`{A:ActingName} casts mending on {A:him}self.`,CharacterRequirements.isSameEntity('A','T'));
stories.add(`{A:ActingName} casts mending on {T:TargetName}.`,CharacterRequirements.isNotSameEntity('A','T'));

// TODO: Ember and Mending are both single target spells, but do we need to change that property to single ally and
//       single enemy? Position may need to change to to enemy or ally position. It's either that or another property
//       that specifies that the spell is cast on an enemy, ally (or potentially either?) I'm not sure anything is
//       really gained by diving the property into [single,position,formation] and [enemy,ally,(maybe either)] or if
//       the target should just be all the permutations?

Spell.register('mending', {
  name: 'Mending',
  color: Mana.green,
  manaCost: 3,
  target: EffectTarget.single,

  getEffects: powerLevel => {
    const min = powerLevel * 10;
    return [Effect.restoreHealth(min,min*2)];
  },

  stories: stories,
  messageForEntity: (id,results) => {
    console.log("Results:",results)
    return `{T:TargetName} heals ${results.level} health?`;
  },

});

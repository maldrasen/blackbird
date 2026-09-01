
// TODO: We could split these stories into parts with a spell gesture and something personality driven...
//       Also, spells don't have a hit location, because there's no mechanical component there, but we could add a hit
//       location as a weaver package part.

// TODO: This spell could also add a burn condition once we've implemented it.

const stories = WeaverPackage('searing-lance');
stories.add(`A lance of searing heat erupts from {A:actingName's} hands, striking {T:TargetName} in the chest.`);
stories.add(`{A:ActingName} cackles wildly as a lance of searing heat erupts from {A:his} hands, striking 
  {T:TargetName} in the chest.`, CharacterRequirements.hasArchetype('A',ArchetypeCode.maniac));

Spell.register('searing-lance', {
  name: 'Searing Lance',
  color: 'red',
  manaCost: 3,
  target: EffectTarget.single,

  getEffects: powerLevel => {
    return [Effect.damage(DamageType.fire,{ x:powerLevel, d:8 })];
  },

  stories: stories,
  messageForEntity: (id,results) => {
    return `{T:TargetName} takes ${results.damage} fire damage.`;
  },

});

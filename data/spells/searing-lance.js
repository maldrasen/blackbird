
// TODO: We could split these stories into parts with a spell gesture and something personality driven...

const stories = WeaverPackage('searing-lance');
stories.add(`A lance of searing heat erupts from {A:actingName's} hands, striking {T:TargetName} in 
  {hisHitLocation(T)}.`);
stories.add(`{A:ActingName} cackles wildly as a lance of searing heat erupts from {A:his} hands, striking 
  {T:TargetName} in {hisHitLocation(T)}.`, CharacterRequirements.hasArchetype('A',ArchetypeCode.maniac));

Spell.register('searing-lance', {
  name: 'Searing Lance',
  color: 'red',
  manaCost: 3,
  target: EffectTarget.single,

  getEffects: powerLevel => {
    return [Effect.damage(DamageType.fire,{ x:powerLevel, d:8 })];
  },

  stories: stories,
});

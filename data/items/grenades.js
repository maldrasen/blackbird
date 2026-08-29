
const blastoPackage = WeaverPackage('article-blasto');
blastoPackage.add(`{A:ActingName} takes aim and lobs a flaming pouch at {T:targetName}. It bursts open with a
  tremendous flash of light.`);
blastoPackage.add(`{A:ActingName} grins wildly as {A:he} lights a crudely stitched pouch on fire. {A:He} throws it at
  {T:targetName}, hitting {T:him} in the chest. A second later it explodes in a tremendous flash of light.`,
  BattleRequirements.actingIsMonster());
blastoPackage.add(`{A:ActingName} takes one of the kobold made explosives, lights it, and tosses it at {T:targetName}.
  It explodes on impact, creating a tremendous flash of light.`,
  BattleRequirements.actingIsCharacter());

// TODO: Somehow we also need to add up to 4 messages after the story with:
//   - "Name takes X damage, and is blinded and stunned!" or
//   - "Name takes X damage, and is stunned!" or
//   - "Name takes X damage, and is blinded!" or
//   - "Name takes X damage!"
// The consume() function returns an array of the effects. The effects need to all be applied to each character in the
// area of effect. The consumable will then need to create one of these messages, given the damage done and the status
// effects that were successfully applied.

Consumable.register('blasto',{
  name: 'Blasto',
  description: `These loosely stitched hide bags are covered with a pungent, flammable grease and filled with dried
    puffball mushrooms. First lit aflame then quickly tossed in an opponent's general direction, they burst open on
    impact releasing a cloud of explosive spores.`,
  category: InventoryCategory.grenades,
  tags: ['mushroom'],
  target: 'position',    //                                               []        [][][]
  areaOfEffect: 'small', // 1 center position + 3 neighbor positions.   [][][]  or    []
  usableWhen: UsableWhen.inCombat,
  stories: blastoPackage,
  effects: [
    // TODO: Damage, Blind and Stun effect against targets in area.
  ],

  messageForEntity: (id,effects) => {
    // TODO: Effects should be { damage:int, blind:bool, stun:bool }
  },

});

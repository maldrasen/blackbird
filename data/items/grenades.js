
const blastoPackage = WeaverPackage('article-blasto');
blastoPackage.add(`{A:ActingName} takes aim and lobs a flaming pouch at {T:targetName}. It bursts open with a
  tremendous flash of light.`);
blastoPackage.add(`{A:ActingName} grins wildly as {A:he} lights a crudely stitched pouch on fire. {A:He} throws it at
  {T:targetName}, hitting {T:him} in the chest. A second later it explodes in a tremendous flash of light.`,
  BattleRequirements.actingIsMonster());
blastoPackage.add(`{A:ActingName} takes one of the kobold made explosives, lights it, and tosses it at {T:targetName}.
  It explodes on impact, creating a tremendous flash of light.`,
  BattleRequirements.actingIsCharacter());

Consumable.register('blasto',{
  name: 'Blasto',
  description: `These loosely stitched hide bags are covered with a pungent, flammable grease and filled with dried
    puffball mushrooms. First lit aflame then quickly tossed in an opponent's general direction, they burst open on
    impact releasing a cloud of explosive spores.`,
  category: InventoryCategory.grenades,
  tags: ['mushroom'],
  rarity: Rarity.unusual,

  target: EffectTarget.position,
  areaOfEffect: AreaOfEffect.small,
  usableWhen: UsableWhen.inCombat,
  stories: blastoPackage,

  effects: [
    Effect.damage(DamageType.fire, { x:2, d:4 }),
    Effect.blind({ strength:20, duration:3000 }),
    Effect.stun({ strength:10, count:1 }),
  ],

  messageForEntity: (id, results) => {
    let tail = ''
    if (results.blind) { tail = `, and is blinded`; }
    if (results.stun) { tail = `, and is stunned`; }
    if (results.blind && results.stun) { tail = `, and is both blinded and stunned`; }
    return `{T:TargetName} takes ${results.damage} damage${tail}!`;
  },

  sources: [
    { chestGroup:'explosives', rarity:Rarity.unusual },
  ],
});


const poisons = {
  A: Effect.poison({ strength:15, damage:{ x:1, d:6 }}),
  B: Effect.poison({ strength:20, damage:{ x:2, d:6, p:2 }}),
  C: Effect.poison({ strength:30, damage:{ x:4, d:6, p:4 }}),
  D: Effect.poison({ strength:45, damage:{ x:6, d:6, p:6 }}),
  E: Effect.poison({ strength:60, damage:{ x:8, d:8, p:8 }}),
}

EnchantmentPattern.register(`poisoned-a`, {
  rarity: Rarity.unusual,
  appliesTo: [ItemType.dagger, ItemType.whip],
  trigger: EnchantmentTrigger.onHit,
  getName: id => { return { name:`Poisoned ${Item(id).getName()}` }},
  buildEffects: () => { return [poisons.A] },
});

EnchantmentPattern.register(`poisoned-b`, {
  rarity: Rarity.rare,
  appliesTo: [ItemType.dagger, ItemType.whip],
  trigger: EnchantmentTrigger.onHit,
  getName: id => { return { name:`Envenomed ${Item(id).getName()}` }},
  buildEffects: () => { return [poisons.B] },
});

EnchantmentPattern.register(`poisoned-c`, {
  rarity: Rarity.rare,
  appliesTo: [ItemType.dagger, ItemType.whip],
  trigger: EnchantmentTrigger.onHit,
  getName: id => { return { name:`Malignant ${Item(id).getName()}` }},
  buildEffects: () => { return [poisons.C] },
});

EnchantmentPattern.register(`poisoned-d`, {
  rarity: Rarity.astonishing,
  appliesTo: [ItemType.dagger, ItemType.whip],
  trigger: EnchantmentTrigger.onHit,
  getName: id => { return { name:generateName(id), nameType:'proper' }},
  buildEffects: () => { return [poisons.D] },
});

EnchantmentPattern.register(`poisoned-e`, {
  rarity: Rarity.astonishing,
  appliesTo: [ItemType.dagger, ItemType.whip],
  trigger: EnchantmentTrigger.onHit,
  getName: id => { return { name:generateName(id), nameType:'proper' }},
  buildEffects: () => { return [poisons.E] },
});

function generateName(id) {
  return Item(id).getType() === ItemType.dagger ? generateDaggerName() : generateWhipName();
}

// TODO: We'll obviously need a lot more interesting names for the whips and daggers with proper names. I'm going to
//       hold off on this now though until we have item descriptions. High level enchantments will completely rewrite
//       the description with something more interesting. A dagger named Black Widow could have a matte black blade and
//       a spider on the pommel or something. These descriptions can be generated from parts to give a lot more
//       variety so even though they're more distinct than other items, they're not necessarily unique.

function generateDaggerName() {
  return Random.from(['Black Widow']);
}

function generateWhipName() {
  return Random.from(['Soulflayer']);
}

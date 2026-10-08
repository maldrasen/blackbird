
// ==================================
//    Resistance to Status Effects
// ==================================
// Status effect resistances should be more common, especially on accessories like rings. Resistance strength is a
// number that's added to the resist roll and directly opposes the strength of the effect being applied. The "blasto"
// grenade for instance has a strength of 20, so a blind resistance of 20 gives an even chance of resisting the effect.

EnchantmentPattern.register('vigilant',{
  rarity: Rarity.unusual,
  appliesTo: [ItemType.head],
  getName: id => { return { name:`Vigilant ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['blind'],[10,20]); },
});

EnchantmentPattern.register('incombustible',{
  rarity: Rarity.unusual,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Incombustible ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['burn','mana-burn'],[10,20]); },
});

EnchantmentPattern.register('judicious',{
  rarity: Rarity.unusual,
  appliesTo: [ItemType.head],
  getName: id => { return { name:`Judicious ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['enthrall','delirium'],[10,20]); },
});

EnchantmentPattern.register('valorous',{
  rarity: Rarity.unusual,
  appliesTo: [ItemType.head],
  getName: id => { return { name:`Valorous ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['fear','enrage'],[10,20]); },
});

EnchantmentPattern.register('immaculate',{
  rarity: Rarity.unusual,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Immaculate ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['hex','damned'],[10,20]); },
});

EnchantmentPattern.register('incorruptible',{
  rarity: Rarity.unusual,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Incorruptible ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['poison','toxic'],[10,20]); },
});

EnchantmentPattern.register('unstoppable',{
  rarity: Rarity.unusual,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Unstoppable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['paralysis'],[10,20]); },
});

EnchantmentPattern.register('uncensorable',{
  rarity: Rarity.unusual,
  appliesTo: [ItemType.head],
  getName: id => { return { name:`Uncensorable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['silence'],[10,20]); },
});

EnchantmentPattern.register('indefatigable',{
  rarity: Rarity.unusual,
  appliesTo: [ItemType.hands, ItemType.feet],
  getName: id => { return { name:`Indefatigable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['slow'],[10,20]); },
});

EnchantmentPattern.register('impregnable',{
  rarity: Rarity.unusual,
  appliesTo: [ItemType.chest, ItemType.legs],
  getName: id => { return { name:`Impregnable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['stun','vulnerable'],[10,20]); },
});

EnchantmentPattern.register('purified',{
  rarity: Rarity.unusual,
  appliesTo: [ItemType.chest, ItemType.legs],
  getName: id => { return { name:`Purified ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['withering','infestation'],[10,20]); },
});

function buildResistEffects(effects,range) {
  const strength = Random.between(range[0],range[1]);
  return effects.map(code => Effect.resistEffect(code,strength));
}

// ================================
//    Resistance to Magic Damage
// ================================

EnchantmentPattern.register('resistant-to-fire',{
  rarity: Rarity.rare,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Firewalker's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.resistDamage(DamageType.fire, Random.between(5,10))] }
});

EnchantmentPattern.register('resistant-to-shock',{
  rarity: Rarity.rare,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Stormchaser's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.resistDamage(DamageType.shock, Random.between(5,10))] }
});

EnchantmentPattern.register('resistant-to-arcane',{
  rarity: Rarity.rare,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Mageslayer's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.resistDamage(DamageType.arcane, Random.between(5,10))] }
});

EnchantmentPattern.register('resistant-to-psychic',{
  rarity: Rarity.rare,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Ghosthunter's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.resistDamage(DamageType.psychic, Random.between(5,10))] }
});

EnchantmentPattern.register('resistant-to-corruption',{
  rarity: Rarity.rare,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Sanctified ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.resistDamage(DamageType.corruption, Random.between(5,10))] }
});

EnchantmentPattern.register('resistant-to-nature',{
  rarity: Rarity.rare,
  appliesTo: ItemConstants.allArmorTypes,
  getName: id => { return { name:`Apiarist's ${Item(id).getName()}` }},
  buildEffects: () => { return [Effect.resistDamage(DamageType.nature, Random.between(5,10))] }
});

// TODO: Enchantments with multiple resistances.
// TODO: Higher tier resistance gear.

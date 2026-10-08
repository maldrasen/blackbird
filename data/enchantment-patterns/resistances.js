
// ==================================
//    Resistance to Status Effects
// ==================================
// Status effect resistances should be more common, especially on accessories like rings. Resistance strength is a
// number that's added to the resist roll and directly opposes the strength of the effect being applied. The "blasto"
// grenade for instance has a strength of 20, so a blind resistance of 20 gives an even chance of resisting the effect.

EnchantmentPattern.register('vigilant',{
  getName: id => { return { name:`Vigilant ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['blind'],[10,20]); },
});

EnchantmentPattern.register('incombustible',{
  getName: id => { return { name:`Incombustible ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['burn','mana-burn'],[10,20]); },
});

EnchantmentPattern.register('judicious',{
  getName: id => { return { name:`Judicious ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['enthrall','delirium'],[10,20]); },
});

EnchantmentPattern.register('valorous',{
  getName: id => { return { name:`Valorous ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['fear','enrage'],[10,20]); },
});

EnchantmentPattern.register('immaculate',{
  getName: id => { return { name:`Immaculate ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['hex','damned'],[10,20]); },
});

EnchantmentPattern.register('incorruptible',{
  getName: id => { return { name:`Incorruptible ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['poison','toxic'],[10,20]); },
});

EnchantmentPattern.register('unstoppable',{
  getName: id => { return { name:`Unstoppable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['paralysis'],[10,20]); },
});

EnchantmentPattern.register('uncensorable',{
  getName: id => { return { name:`Uncensorable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['silence'],[10,20]); },
});

EnchantmentPattern.register('indefatigable',{
  getName: id => { return { name:`Indefatigable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['slow'],[10,20]); },
});

EnchantmentPattern.register('impregnable',{
  getName: id => { return { name:`Impregnable ${Item(id).getName()}` }},
  buildEffects: () => { return buildResistEffects(['stun','vulnerable'],[10,20]); },
});

EnchantmentPattern.register('purified',{
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
  getName: id => { return { name:`Firewalker's ${Item(id).getName()}` }},
  buildEffects: id => { return [Effect.resistDamage(DamageType.fire, Random.between(5,10))] }
});

EnchantmentPattern.register('resistant-to-shock',{});
EnchantmentPattern.register('resistant-to-arcane',{});
EnchantmentPattern.register('resistant-to-psychic',{});
EnchantmentPattern.register('resistant-to-corruption',{});
EnchantmentPattern.register('resistant-to-nature',{});

// TODO: Resistance permutations? Or randomly select 2 or 3 in buildEffects?

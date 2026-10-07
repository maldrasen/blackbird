
// ==================================
//    Resistance to Status Effects
// ==================================
// Status effect resistances should be more common, especially on accessories like rings. Resistance strength is a
// number that's added to the resist roll and directly opposes the strength of the effect being applied. The "blasto"
// grenade for instance has a strength of 20, so a blind resistance of 20 gives an even chance of resisting the effect.
// Because the contest floor is currently set to 100 though, we might not notice the effects of resistances until we
// see resistance values in the 100s.

// TODO: We Probably need to lower the resistance roll floor and move it into battle constants, or adjust the effect
//       strength of consumables and spells like blasto and overwhelming-effulgence to bring the strengths closer to
//       the floor.

EnchantmentPattern.register('resistant-to-blind',{
  getName: id => { return { name:`Vigilant ${Item(id).getName()}` }},
  buildEffects: id => { return [Effect.resistEffect('blind', Random.between(10,20))] }
});

EnchantmentPattern.register('resistant-to-burn',{
  getName: id => { return { name:`Quenching ${Item(id).getName()}` }},
  buildEffects: id => {
    const power = Random.between(10,20);
    return [
      Effect.resistEffect('burn',power),
      Effect.resistEffect('mana-burn',power),
    ]
  }
});

EnchantmentPattern.register('resistant-to-enthrall',{});// And delirium
EnchantmentPattern.register('resistant-to-fear',{});// And enrage
EnchantmentPattern.register('resistant-to-hex',{});// And also damned
EnchantmentPattern.register('resistant-to-poison',{});// And also toxic
EnchantmentPattern.register('resistant-to-off-balance',{});
EnchantmentPattern.register('resistant-to-paralysis',{});
EnchantmentPattern.register('resistant-to-silence',{});
EnchantmentPattern.register('resistant-to-slow',{});
EnchantmentPattern.register('resistant-to-stun',{});// And vulnerable
EnchantmentPattern.register('resistant-to-withering',{});// And infestation

// ================================
//    Resistance to Magic Damage
// ================================
// Does an item with resistance to fire and burn double dip? I think it would if I remember right. If so then fire
// resistance also grants some burn, mana burn, and blind resistance. It's a much more valuable effect.

EnchantmentPattern.register('resistant-to-fire',{
  getName: id => { return { name:`Firewalker's ${Item(id).getName()}` }},
  buildEffects: id => { return [Effect.resistDamage(DamageType.fire, Random.between(5,10))] }
});

EnchantmentPattern.register('resistant-to-shock',{});
EnchantmentPattern.register('resistant-to-arcane',{});
EnchantmentPattern.register('resistant-to-psychic',{});
EnchantmentPattern.register('resistant-to-corruption',{});
EnchantmentPattern.register('resistant-to-nature',{});

// Resistance permutations? Or randomly select 2 or 3 in buildEffects?

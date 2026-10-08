EnchantmentPattern.register(`endanger`, {
  trigger: EnchantmentTrigger.onHit,
  processOnHit: endangerOnHit,
  getName: id => {
    const species = Enchantment(id).getProperty('species');
    return { name:`${Item(id).getName()} of ${Species.lookup(species).getName()} Endangerment` }
  },
  buildEffects: id => { return [Effect.vulnerable({ strength:Random.between(20,40), count:1 })] },
});

// Standard battle context with { A,T,I } (attacker, target, this item)
function endangerOnHit(context) {
  const weapon = Item(context.I);
  const enchantment = weapon.getEnchantment();
  const effect = enchantment.getEffects()[0];

  if (enchantment.getProperty('species') === BattleHelper.getSpecies(context.T)) {
    // All of this should actually be done by the effect though...
    if (ResistRoll(context.T, DamageType.shock, effect.power) === ResistResult.fail) {
      applyEndanger(context);
    }
  }
}

function applyEndanger(context) {
  BattleSystem.addStatus(context.T, 'vulnerable', { count:1 });
  BattleSystem.getRound().addMessage({ text:`The attack leaves a trail of crackling sparks, causing intense pain and 
    hindering {T:his} movements.` });
}

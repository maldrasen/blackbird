global.WeaponEnchantment = function(enchantment) {

  function processOnHit(damageTypes) {
    switch (enchantment.type) {
      case WeaponEnchantments.endanger: return endangerOnHit();
    }
  }

  // TODO: We will eventually split the different enchantment effects into separate files. It doesn't really make
  //       sense to make the different enchantment types into data records as they're more functional than data.

  // TODO: We should also validate enchantment data somewhere. Currently an endanger enchantment can have:
  //       (type=endanger, species, power)

  // TODO: Right now, endanger only triggers when a specific species is hit. We can have other triggers as well though,
  //       making a whole slew of possible endangerment enchantments.

  function endangerOnHit() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const target = round.getTarget();

    const species = state.isMonster(target) ?
      Monster(target).getBaseMonster().getSpecies():
      Character(target).getSpecies();

    if (species === enchantment.species) {
      if (ResistRoll(target, DamageType.shock, enchantment.power) === ResistResult.fail) {
        state.addStatus( BattleStatusEffect(target, 'vulnerable', { duration:1 }));
        round.addMessage({ text:`A spiderweb of glowing blue energy wraps around {S/tar}{T:baseName's}{/S} 
          {@hitLocation}, the cursed blightning making {T:him} {S/nst}Vulnerable{/S}.` });
      }
    }
  }

  return Object.freeze({
    processOnHit,
  });
}

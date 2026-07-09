global.WeaponEnchantment = function(id, enchantment) {
  const weapon = Weapon(id);

  function getPower() {
    const material = weapon ? weapon.getBaseWeapon().getPrimaryMaterial() : null;
    const potential = (material == null) ? 1 : Material.getFactor(material, MaterialFactor.potential);
    return Math.round(enchantment.power * potential);
  }

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
      if (ResistRoll(target, DamageType.shock, getPower()) === ResistResult.fail) {
        state.addStatus( BattleStatusEffect(target, 'vulnerable', { duration:1 }));
        round.addMessage({ text:`A trail of glowing blue energy burns against {T:targetName's} flesh, the cursemark
          leaving {T:him} {S/nst}Vulnerable{/S}.` });
      }
    }
  }

  return Object.freeze({
    getType: () => { return enchantment.type; },
    getPower,
    processOnHit,
  });
}

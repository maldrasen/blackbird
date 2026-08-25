global.TrapSystem = (function() {

  // Springs the trap in a room as it's entered for the first time. Returns null when there's nothing to spring,
  // either because there's no trap in the room or because the scouting check spotted it. A sprung trap picks its
  // target, rolls and applies any damage, and returns what happened so the view can display it.
  function springTrap(room) {
    if (room.hasContents() === false) { return null; }

    const trap = RoomContents.lookup(room.getContents()).getTrap();
    if (trap == null || room.checkScoutingRoll()) { return null; }

    const target = pickTarget(trap);
    const damage = trap.damage ? rollDamage(trap, target) : 0;
    if (damage > 0) { applyDamage(target, damage); }

    const context = { T:target };
    return {
      target,
      damage,
      text: trap.onScoutingFailure ? Weaver(context).weave(trap.onScoutingFailure(context)) : null,
    };
  }

  function pickTarget(trap) {
    if (trap.target === EpisodeTarget.anyInParty) {
      return Random.from(Object.keys(PartyConfiguration.getConfiguration()));
    }
    throw new Error(`Bad trap target [${trap.target}]`);
  }

  // Trap damage skips the battle damage pipeline, but it's still mitigated like a physical hit in battle would be:
  // reduced by the armor covering the trap's hit location on top of the target's own innate resistance.
  function rollDamage(trap, target) {
    const reduction = Math.min(getReductionPercent(trap, target), BattleConstants.maxReduction);
    return Math.round(Random.rollDice(trap.damage) * (1 - reduction/100));
  }

  function getReductionPercent(trap, target) {
    const armor = (trap.hitLocation != null && EquipmentComponent.lookup(target)) ?
      EquipmentManager(target).getDamageReduction(trap.hitLocation, trap.damageType) : 0;
    return armor + Character(target).getResistance(trap.damageType);
  }

  // TODO: Trap deaths are deferred to a later task. A character killed by a trap should be revived to 1 health like
  //       a character falling in battle, unless the player dies with no one else in the party, which should be a
  //       game over instead. Both endings will need more trap text once they're handled.
  function applyDamage(id, damage) {
    const health = HealthComponent.lookup(id);
    health.currentHealth -= damage;

    if (health.currentHealth <= 0) {
      throw new Error(`The trap has killed [${id}]. Trap deaths aren't handled yet.`);
    }

    HealthComponent.update(id, health);
  }

  return { springTrap };

})();

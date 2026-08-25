global.TrapSystem = (function() {

  // Springs the trap in a room as it's entered for the first time. Returns null when there's nothing to spring,
  // either because there's no trap in the room or because the scouting check spotted it. A sprung trap picks its
  // target, rolls and applies any damage, and returns what happened so the view can display it.
  function springTrap(room) {
    if (room.hasContents() === false) { return null; }

    const trap = RoomContents.lookup(room.getContents()).getTrap();
    if (trap == null || room.checkScoutingRoll()) { return null; }

    const target = pickTarget(trap);
    const damage = trap.damage ? Random.rollDice(trap.damage) : 0;
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

  // Trap damage goes straight to the target's health, skipping armor and the battle damage pipeline.
  function applyDamage(id, damage) {
    const health = HealthComponent.lookup(id);
    health.currentHealth -= damage;
    HealthComponent.update(id, health);
  }

  return { springTrap };

})();

// What happens when the party steps onto a trap tile. Finding traps is the ScoutingSystem's job; by the time the
// party stands on one it has either been found, in which case the scout tries to disarm it, or it hasn't, in which
// case it goes off. Either way the trap is resolved, and its state, glyph and description are written to the tile.
global.TrapSystem = (function() {

  // Returns what happened for the view to show, in the same shape as a room command result, or null when there's
  // no armed trap on the tile.
  function enterTile(position) {
    const tile = DungeonSystem.getDungeonFloor().getTileContents(position.x, position.y);
    if (tile == null || tile.type !== TileContentType.trap || tile.state != null) { return null; }

    const record = TileContents.lookup(tile.code);
    const found = tile.scoutingRoll != null && tile.scoutingRoll >= record.getSecrecy();

    return found ? disarmTrap(position, record) : springTrap(position, record, pickTarget(record.getTrap()));
  }

  // A trap without a disarm value is disarmed just by knowing it's there. A failed disarm springs the trap on the
  // scout who was working on it.
  function disarmTrap(position, record) {
    const trap = record.getTrap();
    const scout = PartyConfiguration.getScout();
    const disarmed = trap.disarm == null || SkillCheck(scout, 'mechanics').value >= trap.disarm;
    if (disarmed === false) { return springTrap(position, record, scout); }

    resolveTile(position, record, 'disarmed');

    return buildResult(position, 'disarmed', scout, 0, `Trap Disarmed`, trap.disarmTrap);
  }

  function springTrap(position, record, target) {
    const trap = record.getTrap();
    const damage = trap.damage ? rollDamage(trap, target) : 0;
    if (damage > 0) { applyDamage(target, damage); }

    resolveTile(position, record, 'sprung');

    return buildResult(position, 'sprung', target, damage, `A Trap!`, trap.springTrap);
  }

  function resolveTile(position, record, state) {
    DungeonSystem.getDungeonFloor().updateTileContents(position.x, position.y, {
      state,
      glyph: record.getGlyph(state),
      description: () => { return record.getDescription({ state }); },
    });
  }

  function buildResult(position, state, target, damage, title, textFunction) {
    const context = { T:target };
    return {
      position: { ...position },
      state,
      target,
      damage,
      title,
      text: textFunction ? Weaver(context).weave(textFunction(context)) : null,
    };
  }

  function pickTarget(trap) {
    if (trap.target === EpisodeTarget.anyInParty) {
      return Random.from(Object.keys(PartyConfiguration.getConfiguration()));
    }
    throw new Error(`Bad trap target [${trap.target}]`);
  }

  // Trap damage skips the battle damage pipeline, but it's still mitigated like a physical hit in battle would be:
  // reduced by the armor covering the trap's hit location on top of the target's own innate resistance, then scaled
  // by the difficulty's mitigation option.
  function rollDamage(trap, target) {
    const reduction = Math.min(getReductionPercent(trap, target), BattleConstants.maxReduction);
    return Math.round(Random.rollDice(trap.damage) * (1 - reduction/100) * Difficulty.getMitigationFactor());
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

  return { enterTile };

})();

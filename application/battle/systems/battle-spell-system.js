global.BattleSpellSystem = (function() {

  function castSpell() {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const spellData = BattleSystem.getState().finishCastingSpell();
    const spell = Spell.lookup(spellData.code);
    const check = spell.rollSkillCheck(acting, spellData.powerLevel);

    round.addTime(BattleConstants.spellReleaseTime);
    if (check.result === 'fail') {
      return round.addMessage({ text:`{A:ActingName} fucked up casting {A:his} spell.` });
    }

    improveSpell(acting, spellData.code, check.crit);
    EffectSystem.applyDuringBattle(spell, { ...spellData, powerLevel:check.powerLevel, target:retarget(spell, spellData) });
  }

  // A character's grasp of a spell grows with successful casts, and the battle remembers the growth for the enlighten
  // screen. A monster's spells are innate and never improve.
  function improveSpell(acting, code, crit) {
    const state = BattleSystem.getState();
    if (state.isCharacter(acting) === false) { return; }

    const level = SpellbookSystem.improvePowerLevel(acting, code, crit);
    if (level != null) { state.spellImproved(acting, code, level); }
  }

  // The target was chosen when the cast began, and by the time the spell goes off they may be down or hidden. The
  // spell is redirected to the closest available target to the original target's stored position, picking at random
  // when targets are equally close. The candidates come from the stored target's side, so an ally spell stays with
  // the party. A spell that targets a position rather than an entity keeps its stored position, even if everyone has
  // moved out of it.
  function retarget(spell, spellData) {
    const state = BattleSystem.getState();

    if ([EffectTarget.single, EffectTarget.ally].includes(spell.getTarget()) === false) { return spellData.target; }
    if (state.canBeTargeted(spellData.target)) { return spellData.target; }

    const candidates = (state.isCharacter(spellData.target) ? state.getActiveCharacters() : state.getActiveMonsters()).
      filter(id => state.canBeTargeted(id));

    if (candidates.length === 0) { return spellData.target; }

    return Random.from(closestCandidates(spellData.targetPosition, candidates));
  }

  // We should consider making interruptsCasting a property of the status effect record if this becomes more complex.
  function interruptCasting(entity, code) {
    const state = BattleSystem.getState();
    if (['stun','paralysis','silence'].includes(code) && state.isCastingSpell(entity)) {
      state.cancelCastingSpell(entity);
    }
  }

  function closestCandidates(anchor, candidates) {
    const state = BattleSystem.getState();
    let closest = [];
    let best;

    candidates.forEach(id => {
      const distance = BattleHelper.distanceBetweenPositions(anchor, state.getPosition(id));
      if (best == null || distance.rank < best.rank || (distance.rank === best.rank && distance.position < best.position)) {
        best = distance;
        closest = [id];
      } else if (distance.rank === best.rank && distance.position === best.position) {
        closest.push(id);
      }
    });

    return closest;
  }

  return {
    castSpell,
    interruptCasting,
  };

})();
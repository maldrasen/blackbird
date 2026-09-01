global.BattleSpellSystem = (function() {

  // TODO: When a character casts a spell the mana should be spent here at cast time, that way, if their spell is
  //       interrupted by getting stunned or silenced, their mana is still expended.

  function castSpell() {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const spellData = BattleSystem.getState().finishCastingSpell();
    const spell = Spell.lookup(spellData.code);
    const check = spell.rollSkillCheck(acting, spellData.powerLevel);

    round.addTime(500);
    if (check.result === 'fail') {
      return round.addMessage({ text:`{A:ActingName} fucked up casting {A:his} spell.` });
    }

    EffectSystem.applyDuringBattle(spell, { ...spellData, powerLevel:check.powerLevel, target:retarget(spell, spellData) });
  }

  // The target was chosen when the cast began, and by the time the spell goes off they may be down or hidden. The
  // spell is redirected to the closest available target to the original target's stored position, picking at random
  // when targets are equally close. A spell that targets a position rather than an entity keeps its stored position,
  // even if everyone has moved out of it.
  function retarget(spell, spellData) {
    const state = BattleSystem.getState();

    if (spell.getTarget() !== EffectTarget.single) { return spellData.target; }
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
global.EnlightenSystem = (function() {
  let state;

  function startEnlightenment(from,data) {
    state = EnlightenState(from,data);
  }

  function finishEnlightenment() {
    state = null;
  }

  // The first queued character that can still level, skipping past those who can't. A character stays current until
  // their banked essence no longer covers the next level, so they can level multiple times in one visit.
  function getCurrentLevelUp() {
    const queue = state.getLevelUpQueue();

    for (let i=state.getLevelUpIndex(); i<queue.length; i++) {
      if (EssenceSystem.canLevelUp(queue[i])) { return queue[i]; }
      state.advanceLevelUpQueue();
    }

    return null;
  }

  function hasPendingLevelUps() {
    return getCurrentLevelUp() != null;
  }

  function chooseLevelUpAttribute(attribute) {
    const id = getCurrentLevelUp();
    if (id == null) { throw new Error(`No character is waiting to level up.`); }

    const increase = LevelSystem.levelUp(id, attribute);
    return { id, attribute, increase, level:ExperienceComponent.lookup(id).level };
  }

  return Object.freeze({
    getState: () => { return state; },
    startEnlightenment,
    finishEnlightenment,
    getCurrentLevelUp,
    hasPendingLevelUps,
    chooseLevelUpAttribute,
  });

})();

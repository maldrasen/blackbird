global.EnlightenSystem = (function() {
  let state;

  function startEnlightenment(from, data) {
    state = EnlightenState(from, data);
    bankEssence();
  }

  // Each character's share of the essence is banked as soon as enlightenment starts. The essence bars in the view
  // are only an animation played over values that have already been saved.
  function bankEssence() {
    Object.entries(state.getEssence()).forEach(([id, essence]) => {
      const experience = ExperienceComponent.lookup(id);
      experience.essence = essence.end;
      ExperienceComponent.update(id, experience);
    });
  }

  function finishEnlightenment() {
    state = null;
  }

  function chooseLevelUpAttribute(id, attribute) {
    if (EssenceSystem.canLevelUp(id) === false) {
      throw new Error(`${Character(id).getName()} doesn't have the essence needed to level up.`);
    }

    const increase = LevelSystem.levelUp(id, attribute);
    return { id, attribute, increase, level:ExperienceComponent.lookup(id).level };
  }

  return Object.freeze({
    getState: () => { return state; },
    startEnlightenment,
    finishEnlightenment,
    chooseLevelUpAttribute,
  });

})();

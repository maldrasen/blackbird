global.SkillsFactory = (function() {

  function build() {
    const state = CharacterFactory.getState();
    const skillsData = {};
    const defaults = state.getDefaultSkills() || {}

    SkillsComponent.getSkills().forEach(skillCode => {
      skillsData[skillCode] = defaults[skillCode] || 0;
    });

    state.getTriggers().forEach(trigger => {
      const match = trigger.match(/^([a-z\-]+)<(\d+),(\d+)>$/)
      if (match) {
        skillsData[match[1]] = Random.between(parseInt(match[2]),parseInt(match[3]));
        Console.log(`Applied ${trigger}`,{ system:'SkillsFactory', level:3 });
        state.removeTrigger(trigger);
      }
    });

    state.setSkills(skillsData);
  }

  return Object.freeze({
    build
  });

})();

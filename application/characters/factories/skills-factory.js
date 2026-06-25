global.SkillsFactory = (function() {

  function build(triggers, defaultSkills) {
    const skillsData = {};
    const defaults = defaultSkills || {}

    SkillsComponent.getSkills().forEach(skillCode => {
      skillsData[skillCode] = defaults[skillCode] || 0;
    });

    [...triggers].forEach(trigger => {
      const match = trigger.match(/^([a-z\-]+)<(\d+),(\d+)>$/)
      if (match) {
        skillsData[match[1]] = Random.between(parseInt(match[2]),parseInt(match[3]));
        Console.log(`Applied ${trigger}`,{ system:'SkillsFactory', level:3 });
        ArrayHelper.remove(triggers, trigger);
      }
    });

    return skillsData;
  }

  return Object.freeze({
    build
  });

})();
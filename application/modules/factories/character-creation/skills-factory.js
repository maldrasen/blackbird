global.SkillsFactory = (function() {

  function build(triggers) {
    const skillsData = {};

    SkillsComponent.getSkills().forEach(skillCode => {
      skillsData[skillCode] = 0;
    });

    [...triggers].forEach(trigger => {
      const match = trigger.match(/^([a-z\-]+)<(\d+),(\d+)>$/)
      if (match) {
        skillsData[match[1]] = Random.between(parseInt(match[2]),parseInt(match[3]));
        log(`Applied ${trigger}`,{ system:'SkillsFactory', level:3 });
        ArrayHelper.remove(triggers, trigger);
      }
    });

    return skillsData;
  }

  return Object.freeze({
    build
  });

})();
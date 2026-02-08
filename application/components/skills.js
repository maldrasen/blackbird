global.Skills = (function() {
  const $properties = [];

  function getProperties() { return $properties; }

  // The skills component has a property for every skill, but these come from the skill data, which is loaded after
  // all the application code. Rather than making the skill data load earlier, we add the skills to the property list
  // as they're registered.
  function addSkill(code) { $properties.push(code); }

  function validate(id) {
    const skillComponent = Registry.lookupSkillComponent(id)

    Object.keys(skillComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Skill component does not have a ${key} property.`
      }
    });

    // The skills components has a property for each skill, with the associated skill points.
    $properties.forEach(code => {
      Validate.between(code,skillComponent[code],0,100);
    });
  }

  return Object.freeze({
    getProperties,
    addSkill,
    validate,
  });

})();

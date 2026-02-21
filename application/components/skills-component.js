global.SkillsComponent = (function() {
  const $skills = [];

  // The skills component has a property for every skill, but these come from the skill data, which is loaded after
  // all the application code. Rather than making the skill data load earlier, we add the skills to the property list
  // as they're registered.
  function addSkill(code) { $skills.push(code); }
  function getSkills() { return [ ...$skills ]; }

  function create(id,data) {
    Registry.createComponent(id, ComponentType.skills, data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.skills,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.skills);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.skills);
  }

  function validate(id) {
    const skillsComponent = lookup(id)

    Object.keys(skillsComponent).forEach(key => {
      if ($skills.includes(key) === false) {
        throw `Skill component does not have a ${key} property.`
      }
    });

    // The skills components has a property for each skill, with the associated skill points.
    $skills.forEach(code => {
      Validate.between(`Skills.${code}`,skillsComponent[code],0,100);
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    addSkill,
    getSkills,
    create,
    update,
    lookup,
    destroy,
  });

})();

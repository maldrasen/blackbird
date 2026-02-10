global.Skill = (function() {
  const $skills = {};

  // The skill register() function also needs to add the skill code as a property of the Skills component.
  function register(code,data) {
    $skills[code] = data;
    SkillsComponent.addSkill(code);
  }

  function getAllCodes() {
    return Object.keys($skills);
  }

  function lookup(code) {
    if ($skills[code] === null) { throw `Bad skill code [${code}]` }

    const skill = { ...$skills[code] };

    return Object.freeze({
      getCode: () => { return skill.code; },
      getName: () => { return skill.name; },
      getAttributes: () => { return skill.attributes; }
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();

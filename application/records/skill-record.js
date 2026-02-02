// We need to call this the "SkillRecord" because "Skill" refers to the skill component.

global.SkillRecord = (function() {
  const $skills = {};

  function register(code,data) {
    $skills[code] = data;
  }

  function lookup(code) {
    const skill = $skills[code];

    if (skill === null) {
      throw `Bad skill code [${code}]`
    }

    return Object.freeze({
      getCode: () => { return skill.code; },
      getName: () => { return skill.name; },
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();

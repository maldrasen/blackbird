global.TagElements = (function() {

  function buildSkillTag(code, value) {
    const skill = Skill.lookup(code);

    return X.createElement(`<div class='skill-tag ${skill.getAttributes()[0]}'>
      <span class='label'>${skill.getName()}</span>
      <span class='value'>${value}</span>
    </div>`);
  }

  return Object.freeze({
    buildSkillTag,
  });

})();
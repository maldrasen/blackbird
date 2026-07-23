global.TagElements = (function() {

  function buildSkillTag(code, value) {
    return X.createElement(`<div class='skill-tag'>
      <span class='label'>${Skill.lookup(code).getName()}</span>
      <span class='value'>${value}</span>
    </div>`);
  }

  return Object.freeze({
    buildSkillTag,
  });

})();
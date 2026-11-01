global.TagElements = (function() {

  function buildSkillTag(code, value) {
    const skill = Skill.lookup(code);

    return X.createElement(`<div class='skill-tag ${skill.getAttributes()[0]}'>
      <span class='label'>${skill.getName()}</span>
      <span class='value'>${value}</span>
    </div>`);
  }

  // A spell tag reads the power level a character can now cast the spell at, in the spell's mana color.
  function buildSpellTag(code, level) {
    const spell = Spell.lookup(code);

    return X.createElement(`<div class='skill-tag spell-tag ${spell.getColor()}'>
      <span class='label'>${spell.getName()}</span>
      <span class='value'>${level}</span>
    </div>`);
  }

  return {
    buildSkillTag,
    buildSpellTag,
  };

})();
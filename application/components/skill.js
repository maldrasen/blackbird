global.Skill = (function() {
  const $properties = [_parentId,'code','level','experience'];

  function properties() { return $properties; }

  function validate(id) {
    const skillComponent = Registry.lookupSkillComponent(id)

    Object.keys(skillComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Skill component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,skillComponent._parentId);
    Validate.isIn('code',skillComponent.code,SkillRecord.getAllCodes());
    Validate.atLeast('level',skillComponent.level,1);
    Validate.atLeast('experience',skillComponent.experience,0);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();

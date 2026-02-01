global.Skill = (function() {
  const $properties = [_parentId,'code','level'];

  function properties() { return $properties; }

  function validate(id) {
    const skillComponent = Registry.lookupSkillComponent(id)

    Object.keys(skillComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Skill component does not have a ${key} property.`
      }
    });
  }

  return Object.freeze({
    properties,
    validate,
  });

})();

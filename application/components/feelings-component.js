global.FeelingsComponent = (function() {
  const $properties = [_parentId, 'target', 'affection', 'fear', 'respect'];

  function getProperties() { return $properties; }

  function validate(id) {
    const feelingsComponent = Registry.lookupFeelingsComponent(id)

    Object.keys(feelingsComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Feelings component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,feelingsComponent._parentId);
    Validate.exists('target',feelingsComponent.target);
    Validate.exists('affection',feelingsComponent.affection);
    Validate.exists('fear',feelingsComponent.fear);
    Validate.exists('respect',feelingsComponent.respect);
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();

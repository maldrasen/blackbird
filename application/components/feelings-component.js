global.FeelingsComponent = (function() {
  const $properties = [_parentId, 'target', 'affection', 'fear', 'respect'];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.feelings, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.feelings,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.feelings);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.feelings);
  }

  function validate(id) {
    const feelingsComponent = lookup(id)

    Object.keys(feelingsComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Feelings component does not have a ${key} property.`
      }
    });

    Validate.exists('Feelings._parentId',feelingsComponent._parentId);
    Validate.exists('Feelings.target',feelingsComponent.target);
    Validate.exists('Feelings.affection',feelingsComponent.affection);
    Validate.exists('Feelings.fear',feelingsComponent.fear);
    Validate.exists('Feelings.respect',feelingsComponent.respect);

    // We need to validate that exactly one feelings component for the target character exists.
    Validate.equals('Feelings.uniqueness',Registry.findComponentsWith(ComponentType.feelings, component => {
      return component._parentId === feelingsComponent._parentId && component.target === feelingsComponent.target;
    }).length,1);
  }

  // Find by target always returns the first result because there is at most one FeelingsComponent with the parent id
  // and the target id.
  function findByTarget(characterId, targetId) {
    const entity = Registry.findComponentsWith(ComponentType.feelings, component => {
      return component._parentId === characterId && component.target === targetId;
    })[0];

    return entity ? lookup(entity) : null;
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
    findByTarget,
  });

})();

// TODO: We give the anus component a _parentId and a placement value, though I'm not sure if we have plans for an
//       anus anyplace other than the normal place. We could do nipple assholes, though that seems redundant when we
//       have nipple cunts, which I do plan on. I think the driving factor is that unless there is a scat play element,
//       e.g. shitting nipples, then there's no reason to have a strangely placed anus  

global.AnusComponent = (function() {
  const $properties = [_parentId,'placement','shape','minWidth','maxWidth','prolapseLength'];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.anus, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.anus,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.anus);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.anus);
  }

  function validate(id) {
    const anusComponent = lookup(id);

    Object.keys(anusComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Anus component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,anusComponent._parentId);
    Validate.exists('placement',anusComponent.placement);
    Validate.isIn('shape',anusComponent.shape,AnusData.AnusShapes);
    Validate.atLeast('minWidth',anusComponent.minWidth,0);
    Validate.atLeast('maxWidth',anusComponent.maxWidth,24);
    Validate.atLeast('prolapseLength',anusComponent.prolapseLength,0);
  }

  return Object.freeze({
    hasParent: () => { return true; },
    create,
    update,
    lookup,
    destroy,
  });

})();

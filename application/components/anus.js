// TODO: We give the anus component a _parentId and a placement value, though I'm not sure if we have plans for an
//       anus anyplace other than the normal place. We could do nipple assholes, though that seems redundant when we
//       have nipple cunts, which I do plan on. I think the driving factor is that unless there is a scat play element,
//       e.g. shitting nipples, then there's no reason to have a strangely placed anus  

global.Anus = (function() {
  const $properties = [_parentId,'placement','shape','minWidth','maxWidth'];

  function properties() { return $properties; }

  function validate(id) {
    const anusComponent = Registry.lookupAnusComponent(id);

    Object.keys(anusComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Anus component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,anusComponent._parentId);
    Validate.exists('placement',anusComponent.placement);
    Validate.exists('shape',anusComponent.shape);
    Validate.atLeast('minWidth',anusComponent.minWidth,0);
    Validate.atLeast('maxWidth',anusComponent.maxWidth,24);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();

global.Dialog = (function() {

  const dialog = {};

  Object.values(DialogCategory).forEach(category => { dialog[category] = {}; });
  Object.values(ArchetypeCode).forEach(archetype => { dialog[archetype] = {}; });
  Object.values(SexStyle).forEach(style => { dialog[style] = {}; })

  // The type should be a personality archetype, or an archetype's sex style.
  function register(type, code, weaverPackage) {
    dialog[type][code] = weaverPackage
  }

  // TODO: We could include a fallback option to get a generic version of the
  //   dialog if it's not found in the archetype. We could also define some
  //   archetypes as being based on another. For instance an anal-slut would
  //   have more anal related dialog but fall back on slut for most dialog.
  //   Same could be done with a big-titted bimbo or a big-cock himbo.
  function lookupTemplate(type, code, context={}) {
    const weaverPackage = dialog[type][code];

    // TODO: Until we get update all of the Dialogs.
    if (typeof weaverPackage === 'function') {
      return weaverPackage(context);
    }

    if (typeof weaverPackage === 'object') {
      return weaverPackage.pick(context);
    }

    return `<span class='dialog-error'>[Missing Dialog Template ${type}:${code}]</span>`
  }

  return Object.freeze({
    register,
    lookupTemplate,
  });

})();

global.Dialog = (function() {

  const dialogs = {};

  Object.values(DialogCategory).forEach(category => { dialogs[category] = {}; });
  Object.values(ArchetypeCode).forEach(archetype => { dialogs[archetype] = {}; });
  Object.values(SexStyle).forEach(style => { dialogs[style] = {}; })

  // When registered, Dialogs need a type or category and a code. Dialog options for different personality archetypes
  // are stored under their types, with the dialog code, while other dialog categories only have a single object for
  // their dialog options. The dialogData can be a function called to pick a specific weaver package given a context,
  // or the weaver package itself.
  function register(type, code, dialog) {
    dialogs[type][code] = dialog;
  }

  // TODO: We could include a fallback option to get a generic version of the
  //   dialog if it's not found in the archetype. We could also define some
  //   archetypes as being based on another. For instance an anal-slut would
  //   have more anal related dialog but fall back on slut for most dialog.
  //   Same could be done with a big-titted bimbo or a big-cock himbo.
  function lookupTemplate(type, code, context={}) {
    const dialog = dialogs[type][code];

    if (typeof dialog === 'function') { return dialog(context); }
    if (typeof dialog === 'object') { return dialog.pick(context); }

    return `<span class='dialog-error'>[Missing Dialog Template ${type}:${code}]</span>`
  }

  return Object.freeze({
    register,
    lookupTemplate,
  });

})();

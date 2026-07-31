global.Requirements = (function() {

  // - requires: A predicate (a function that takes a subject, and returns true or false), an array of predicates,
  //             or a null when there are no requirements.
  // - context:  A plain object, an entity ID, or null used to determine the subject of the predicate.
  function met(requires, context=null) {
    if (requires == null) { return true; }
    if (Array.isArray(requires)) { return requires.every(requirement => requirement(context)); }
    return requires(context);
  }

  return Object.freeze({
    met,
  });

})();

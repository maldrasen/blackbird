global.ContextRequirements = (function() {

  // Questions that can be answered by referencing the passed context.
  return Object.freeze({
    set: key => { return (context) => { return context[key] != null; }},
    unset: key => { return (context) => { return context[key] == null; }},
    is: (key,value) => { return (context) => { return context[key] == value; }},
    isNot: (key,value) => { return (context) => { return context[key] != value; }},
  });

})();

global.GameRequirements = (function() {
  return Object.freeze({
    flagSet: key =>         { return () => { return GameSystem.getState().getFlag(key) != null; }},
    flagIs:  (key,value) => { return () => { return GameSystem.getState().getFlag(key) == value; }}, // Allow type coercion.
  });
})();

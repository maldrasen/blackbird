global.ObjectHelper = (function() {

  // The fetch function can be used to dive into an object to get nested
  // properties without worrying about null values along the way. This
  // function uses the varargs as keys. For instance:
  //   ObjectHelper.fetch({ foo:{ bar:{ yarp:1 }}}, 'foo', 'bar', 'yarp') == 1
  //   ObjectHelper.fetch({ foo:{ bar:{ yarp:1 }}}, 'foo', 'nope', 'wat') == null
  function fetch(object) {
    let chain = null;

    if (typeof object != 'object') { return null; }

    ObjectHelper.each(Array.prototype.slice.call(arguments, 1), (i,arg) => {
      chain = (chain == null) ? object[arg] : chain[arg];
    });

    return chain;
  }

  // Filter an object, returning only the properties with keys in the allowedKeys array.
  function filter(object, allowedKeys) {
    let filtered = {};
    allowedKeys.forEach(key => {
      if (typeof object[key] != 'undefined') { filtered[key] = object[key]; }
    });
    return filtered;
  }

  // Filter an object's properties, allowing the properties that match the selector function.
  function select(object, selector) {
    let filtered = {};
    Object.keys(object).forEach(key => {
      if (selector(key,object[key])) { filtered[key] = object[key]; }
    });
    return filtered;
  }

  return Object.freeze({
    fetch,
    filter,
    select,
  });

})();

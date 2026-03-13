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
    return Object.fromEntries(Object.entries(object).filter(([key, value]) => allowedKeys.includes(key)));
  }

  // Filter an object's properties, allowing the properties that match the selector function.
  function select(object, selector) {
    return Object.fromEntries(Object.entries(object).filter(([key, value]) => selector(key, value)));
  }

  function unfloat(object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) =>
      [key, typeof value === 'number' ? Math.round(value) : value]));
  }

  return Object.freeze({
    fetch,
    filter,
    select,
    unfloat,
  });

})();

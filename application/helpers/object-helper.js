global.ObjectHelper = {

  // The fetch function can be used to dive into an object to get nested
  // properties without worrying about null values along the way. This
  // function uses the varargs as keys. For instance:
  //   ObjectHelper.fetch({ foo:{ bar:{ yarp:1 }}}, 'foo', 'bar', 'yarp') == 1
  //   ObjectHelper.fetch({ foo:{ bar:{ yarp:1 }}}, 'foo', 'nope', 'wat') == null
  fetch: function(object) {
    let chain = null;

    if (typeof object != 'object') { return null; }

    ObjectHelper.each(Array.prototype.slice.call(arguments, 1), (i,arg) => {
      chain = (chain == null) ? object[arg] : chain[arg];
    });

    return chain;
  },

  // Filter an object, returning only the properties with keys in the allowedKeys array.
  filter: function(object, allowedKeys) {
    let filtered = {};
    allowedKeys.forEach(key => {
      if (typeof object[key] != 'undefined') { filtered[key] = object[key]; }
    });
    return filtered;
  },

  // This also seems like it should really be built into javascript...
  select: function(object, selector) {
    let filtered = {};
    ObjectHelper.each(object, (key, value) => {
      if (selector(key,value)) { filtered[key] = value; }
    });
    return filtered;
  },

};

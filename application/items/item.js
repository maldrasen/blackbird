global.Item = function(id) {

  // I think this wrapper will eventually be useful.

  return Object.freeze({
    getName: () => { return ItemComponent.lookup(id).name; },
    isLewd: () => { return ItemComponent.lookup(id).isLewd === true; }
  });
}

global.Item = function(id) {

  return Object.freeze({
    getName: () => { return ItemComponent.lookup(id).name; },
    isLewd: () => { return ItemComponent.lookup(id).isLewd === true; }
  });

}

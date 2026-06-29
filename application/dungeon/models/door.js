global.Door = function(position, direction, from, to) {

  function inspect() {
    return `${direction}-Door(${position[0]},${position[1]}) ${from} -> ${to}`;
  }

  return Object.freeze({
    getPosition: () => { return position; },
    getDirection: () => { return direction; },
    getFrom: () => { return from; },
    getTo: () => { return to; },
    inspect,
  });

}

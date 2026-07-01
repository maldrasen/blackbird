global.Door = function(position, direction, from, to) {

  function pack() {
    return {
      position,
      direction,
      from,
      to,
    }
  }

  return Object.freeze({
    getPosition: () => { return position; },
    getDirection: () => { return direction; },
    getFrom: () => { return from; },
    getTo: () => { return to; },
    pack,
  });

}

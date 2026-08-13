global.PositionPanel = function(side, rank, position) {

  const element = X.createElement(`<div class='position' data-position='${side}.${rank}.${position}'></div>`);

  return Object.freeze({
    getSide: () => { return side; },
    getRank: () => { return rank; },
    getPosition: () => { return position; },
    getElement: () => { return element; },
  });

}
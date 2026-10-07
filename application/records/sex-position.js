Record.define('SexPosition', {
  getInstance: position => ({
    getName: () => { return position.name; },
    getAlignment: () => { return position.alignment; },
    getMoves: () => { return position.moves; },
    getRearrangePackage: () => { return position.rearrangePackage },
  }),
});

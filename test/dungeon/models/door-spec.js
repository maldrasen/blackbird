describe("Door", function() {

  it('builds a closed door', function() {
    const door = Door({ position:{ x:3, y:1 }, direction:'W', from:1, to:0 });
    expect(door).to.deep.equal({ position:{ x:3, y:1 }, direction:'W', from:1, to:0, open:false });
  });

  it('only allows doors on the north or west wall of a tile', function() {
    expect(() => Door({ position:{ x:3, y:1 }, direction:'S', from:1, to:0 })).to.throw('direction[S] not in list');
    expect(() => Door({ position:{ x:3, y:1 }, direction:'E', from:1, to:0 })).to.throw('direction[E] not in list');
  });

});

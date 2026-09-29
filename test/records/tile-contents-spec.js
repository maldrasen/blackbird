describe("TileContents", function() {

  beforeEach(function() {
    TileContents.register('spec-tile-trap', {
      type: TileContentType.trap,
      range: [2,4],
      secrecy: 15,
      glyph: { glyph:'▲', color:'red' },
      description: () => 'A raised flagstone.',
      trap: { damage:{ x:2, d:6 } },
    });
  });

  it("throws for an unknown code", function() {
    expect(() => TileContents.lookup('no-such-contents')).to.throw('Bad tile contents code');
  });

  it("rejects a record with an unknown type", function() {
    expect(() => TileContents.register('spec-bad-type', { type:'statue' })).to.throw('type[statue]');
  });

  it("rejects a trap without trap data", function() {
    expect(() => TileContents.register('spec-no-trap', { type:TileContentType.trap })).to.throw('trap is null');
  });

  it("reads its properties", function() {
    const trap = TileContents.lookup('spec-tile-trap');

    expect(trap.getCode()).to.equal('spec-tile-trap');
    expect(trap.getType()).to.equal(TileContentType.trap);
    expect(trap.getRange()).to.deep.equal([2,4]);
    expect(trap.getSecrecy()).to.equal(15);
    expect(trap.getGlyph()).to.deep.equal({ glyph:'▲', color:'red' });
    expect(trap.getTrap().damage).to.deep.equal({ x:2, d:6 });
    expect(trap.getDescription()).to.equal('A raised flagstone.');
  });

  it("is in range when the record has no range or the level falls inside it", function() {
    TileContents.register('spec-anywhere', { type:TileContentType.trap, trap:{} });
    const trap = TileContents.lookup('spec-tile-trap');

    expect(TileContents.lookup('spec-anywhere').isInRange(9)).to.equal(true);
    expect(trap.isInRange(1)).to.equal(false);
    expect(trap.isInRange(2)).to.equal(true);
    expect(trap.isInRange(4)).to.equal(true);
    expect(trap.isInRange(5)).to.equal(false);
  });

});

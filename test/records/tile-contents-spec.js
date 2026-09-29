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

  it("rejects trap damage that isn't a dice roll and a disarm that isn't a number", function() {
    expect(() => TileContents.register('spec-bad-damage', { type:TileContentType.trap, trap:{ damage:7 }}))
      .to.throw('damage is not a dice roll');
    expect(() => TileContents.register('spec-bad-disarm', { type:TileContentType.trap, trap:{ disarm:'hard' }}))
      .to.throw('disarm is not a number');
  });

  it("reads its properties", function() {
    const trap = TileContents.lookup('spec-tile-trap');

    expect(trap.getCode()).to.equal('spec-tile-trap');
    expect(trap.getType()).to.equal(TileContentType.trap);
    expect(trap.getRange()).to.deep.equal([2,4]);
    expect(trap.getSecrecy()).to.equal(15);
    expect(trap.getTrap().damage).to.deep.equal({ x:2, d:6 });
    expect(trap.getDescription()).to.equal('A raised flagstone.');
  });

  it("passes the description its options", function() {
    expect(TileContents.lookup('spike-trap').getDescription({ state:'disarmed' })).to.include('wedged in place');
    expect(TileContents.lookup('spike-trap').getDescription({ state:'sprung' })).to.include('Bloodstained spikes');
  });

  describe("getGlyph()", function() {
    it("gives a trap the default glyph in the armed color", function() {
      expect(TileContents.lookup('spike-trap').getGlyph()).to.deep.equal({
        glyph:DungeonConstants.trapGlyph, color:DungeonConstants.trapColors.armed, size:60,
      });
    });

    it("keeps a trap's own glyph over the default", function() {
      expect(TileContents.lookup('spec-tile-trap').getGlyph()).to.deep.equal({ glyph:'▲', color:'red', size:60 });
    });

    it("draws a sprung or disarmed trap in the resolved color whatever its glyph", function() {
      const resolved = DungeonConstants.trapColors.resolved;
      expect(TileContents.lookup('spike-trap').getGlyph('sprung').color).to.equal(resolved);
      expect(TileContents.lookup('spec-tile-trap').getGlyph('disarmed')).to.deep.equal({ glyph:'▲', color:resolved, size:60 });
    });
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

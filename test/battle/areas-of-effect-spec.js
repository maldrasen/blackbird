describe('AreasOfEffect', function() {

  it('rejects unknown shapes', function() {
    expect(() => AreasOfEffect.get('P.0.2','goat')).to.throw('Bad AreaOfEffect');
  });

  describe('get(small)', function() {
    it('catches the neighbors and the facing position from the front rank', function() {
      const area = AreasOfEffect.get('P.0.2',AreaOfEffect.small);
      expect(area).to.have.members(['P.0.2','P.0.1','P.0.3','P.1.2','M.0.2']);
    });

    it('does not spill across the battle line from the back rank', function() {
      const area = AreasOfEffect.get('P.1.2',AreaOfEffect.small);
      expect(area).to.have.members(['P.1.2','P.1.1','P.1.3','P.0.2']);
    });

    it('clamps at the edge columns', function() {
      const area = AreasOfEffect.get('P.0.0',AreaOfEffect.small);
      expect(area).to.have.members(['P.0.0','P.0.1','P.1.0','M.0.0']);
    });

    it('mirrors for the monster side', function() {
      const area = AreasOfEffect.get('M.0.4',AreaOfEffect.small);
      expect(area).to.have.members(['M.0.4','M.0.3','M.1.4','P.0.4']);
    });
  });
});


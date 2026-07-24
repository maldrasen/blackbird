describe('Item', function() {

  describe('getName()', function() {
    it('returns base names', function() {
      const hatchet = WeaponFactory.build('hatchet');
      const helm = ArmorFactory.build('helm');

      expect(Item(hatchet).getName()).to.equal('hatchet');
      expect(Item(helm).getName()).to.equal('helm');
    });

    it('returns custom names', function() {
      const hatchet = WeaponFactory.build('hatchet', { name:'Gutripper' });
      const helm = ArmorFactory.build('helm', { name:'Crown of Sorrows' });

      expect(Item(hatchet).getName()).to.equal('Gutripper');
      expect(Item(helm).getName()).to.equal('Crown of Sorrows');
    });
  });

});

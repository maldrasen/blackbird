describe('Item', function() {

  describe('getName()', function() {
    it('returns base names', function() {
      const factory = EquipmentFactory();
      factory.setAvailableMaterials(['steel']);
      const hatchet = factory.build('hatchet');
      const helm = factory.build('helm');

      expect(Item(hatchet).getName()).to.equal('Steel Hatchet');
      expect(Item(helm).getName()).to.equal('Steel Helm');
    });

    it('returns custom names', function() {
      const hatchet = EquipmentFactory().build('hatchet', { name:'Gutripper' });
      const helm = EquipmentFactory().build('helm', { name:'Crown of Sorrows' });

      expect(Item(hatchet).getName()).to.equal('Gutripper');
      expect(Item(helm).getName()).to.equal('Crown of Sorrows');
    });
  });

});

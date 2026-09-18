describe("EquipmentFactory", function() {

  function steelFactory() {
    const factory = EquipmentFactory();
    factory.setAvailableMaterials(['steel']);
    return factory;
  }

  describe("build()", function() {
    it("builds a weapon from its base record", function() {
      const axe = Item(EquipmentFactory().build('goosewing'));
      expect(axe.getBase().getCode()).to.equal('goosewing');
    });

    it("builds armor from its base record", function() {
      const armor = Item(EquipmentFactory().build('doublet'));
      expect(armor.getBase().getCode()).to.equal('doublet');
    });

    it("names the item as common unless told otherwise", function() {
      expect(Item(EquipmentFactory().build('longsword')).getNameType()).to.equal('common');
      expect(Item(EquipmentFactory().build('longsword', { nameType:'proper' })).getNameType()).to.equal('proper');
    });
  });

  describe("materials", function() {
    it("picks each material from the available list and names the item after it", function() {
      const weapon = Item(steelFactory().build('labrys'));
      expect(weapon.getName()).to.equal('Steel Labrys');
      expect(weapon.getPrimaryMaterial()).to.equal('steel');
    });

    it("builds soft armor from a soft material", function() {
      const factory = EquipmentFactory();
      factory.setAvailableMaterials(['silk']);
      const armor = Item(factory.build('doublet'));
      expect(armor.getName()).to.equal('Silk Doublet');
      expect(armor.getPrimaryMaterial()).to.equal('silk');
      expect(armor.isMetal()).to.be.false;
    });

    it("adds up the amounts when two material types land on the same material", function() {
      // The flail is heavy:3 for the head and hard:1 for the chain; restricted to steel both types pick steel.
      expect(ItemComponent.lookup(steelFactory().build('flail')).materials).to.deep.equal({ steel:4 });
    });

    it("keeps the amounts apart when the types pick different materials", function() {
      Random.stubFrom('bone', 'iron');
      const id = EquipmentFactory().build('flail');
      expect(ItemComponent.lookup(id).materials).to.deep.equal({ bone:3, iron:1 });
      expect(Item(id).getName()).to.equal('Bone Flail');
    });

    it("throws when nothing on the available list fits a material type", function() {
      const factory = EquipmentFactory();
      factory.setAvailableMaterials(['wool']);
      expect(() => factory.build('longsword')).to.throw(/sharp/);
    });
  });

  describe("options", function() {
    it("takes a name, text key, and enchantment from the options", function() {
      const id = steelFactory().build('longsword', {
        name: 'Stabitha',
        nameType: 'proper',
        textKey: 'quick-stab',
        enchantment: { type:WeaponEnchantments.endanger, species:'kobold', power:100 },
      });

      const weapon = Item(id);
      expect(weapon.getName()).to.equal('Stabitha');
      expect(weapon.getNameType()).to.equal('proper');
      expect(weapon.getTextKey()).to.equal('quick-stab');
      expect(weapon.hasEnchantment()).to.be.true;
      expect(weapon.getEnchantment().getType()).to.equal(WeaponEnchantments.endanger);
    });

    it("scales an enchantment's power by the material's potential", function() {
      const factory = EquipmentFactory();
      factory.setAvailableMaterials(['silver']);
      const enchantment = { type:WeaponEnchantments.endanger, species:'kobold', power:100 };

      expect(Item(steelFactory().build('longsword', { enchantment })).getEnchantment().getPower()).to.equal(100);
      expect(Item(factory.build('longsword', { enchantment })).getEnchantment().getPower()).to.equal(200);
    });

    it("leaves the text key and enchantment off when they are not given", function() {
      const weapon = Item(EquipmentFactory().build('longsword'));
      expect(weapon.getTextKey()).to.equal('basic-swing');
      expect(weapon.hasEnchantment()).to.be.false;
    });
  });

});

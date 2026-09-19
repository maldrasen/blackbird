describe("EquipmentFactory", function() {

  function factoryFor(materials) {
    const factory = EquipmentFactory();
    factory.setAvailableMaterials(materials);
    return factory;
  }

  function steelFactory() { return factoryFor({ steel:1 }); }

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
    it("picks each material from the available materials and names the item after it", function() {
      const weapon = Item(steelFactory().build('labrys'));
      expect(weapon.getName()).to.equal('Steel Labrys');
      expect(weapon.getPrimaryMaterial()).to.equal('steel');
    });

    it("weighs the pick by each material's frequency", function() {
      const factory = factoryFor({ iron:10, steel:90 });
      Random.stubRoll(9, 10);
      expect(Item(factory.build('longsword')).getPrimaryMaterial()).to.equal('iron');
      expect(Item(factory.build('longsword')).getPrimaryMaterial()).to.equal('steel');
    });

    it("only weighs the materials that fit the material type", function() {
      // Wool and leather can't hold an edge, so steel is the only thing left for the longsword to roll against.
      const factory = factoryFor({ wool:100, leather:120, steel:50 });
      Random.stubRoll(49);
      expect(Item(factory.build('longsword')).getPrimaryMaterial()).to.equal('steel');
    });

    it("builds soft armor from a soft material", function() {
      const armor = Item(factoryFor({ silk:1 }).build('doublet'));
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

    it("throws when none of the available materials fit a material type", function() {
      expect(() => factoryFor({ wool:100 }).build('longsword')).to.throw(/No available sharp material/);
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
      const silverFactory = factoryFor({ silver:1 });
      const enchantment = { type:WeaponEnchantments.endanger, species:'kobold', power:100 };

      expect(Item(steelFactory().build('longsword', { enchantment })).getEnchantment().getPower()).to.equal(100);
      expect(Item(silverFactory.build('longsword', { enchantment })).getEnchantment().getPower()).to.equal(200);
    });

    it("leaves the text key and enchantment off when they are not given", function() {
      const weapon = Item(EquipmentFactory().build('longsword'));
      expect(weapon.getTextKey()).to.equal('basic-swing');
      expect(weapon.hasEnchantment()).to.be.false;
    });
  });

});

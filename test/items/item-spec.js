describe('Item', function() {

  function build(code, materials, options={}) {
    return Item(ItemFixtures.build(code, materials, options));
  }

  describe('getName()', function() {
    it('returns base names', function() {
      expect(build('hatchet',['steel']).getName()).to.equal('Steel Hatchet');
      expect(build('helm',['steel']).getName()).to.equal('Steel Helm');
    });

    it('returns custom names', function() {
      expect(build('hatchet',['steel'],{ name:'Gutripper' }).getName()).to.equal('Gutripper');
      expect(build('helm',['steel'],{ name:'Crown of Sorrows' }).getName()).to.equal('Crown of Sorrows');
    });
  });

  describe('base record', function() {
    it('reads the icon and skill through its record', function() {
      const axe = build('goosewing',['steel']);
      expect(axe.getBase().getCode()).to.equal('goosewing');
      expect(axe.getIcon()).to.equal('weapons/axe-01.png');
      expect(axe.getSkill()).to.equal('axes');
    });

    it('blocks with a shield', function() {
      expect(build('buckler',['steel']).getSkill()).to.equal('block');
    });

    it('uses the text key of the record unless the item carries its own', function() {
      expect(build('goosewing',['steel']).getTextKey()).to.equal('heavy-axe');
      expect(build('goosewing',['steel'],{ textKey:'basic-swing' }).getTextKey()).to.equal('basic-swing');
    });

    it('files weapons as weapons and everything else, shields included, as armor', function() {
      expect(build('longsword',['steel']).getCategory()).to.equal(InventoryCategory.weapon);
      expect(build('plate',['steel']).getCategory()).to.equal(InventoryCategory.armor);
      expect(build('buckler',['steel']).getCategory()).to.equal(InventoryCategory.armor);
    });

    it('is lewd when the record says so', function() {
      expect(build('chaps',['leather']).isLewd()).to.be.true;
      expect(build('leggings',['leather']).isLewd()).to.be.false;
    });
  });

  describe('materials', function() {
    it('takes the first material as the primary one', function() {
      const cuirass = build('cuirass',['steel','leather']);
      expect(cuirass.getPrimaryMaterial()).to.equal('steel');
      expect(cuirass.isMetal()).to.be.true;
    });

    it('knows soft goods are not metal', function() {
      expect(build('doublet',['silk']).isMetal()).to.be.false;
    });
  });

  // Reduction profiles are authored at steel quality and scaled by the absorption of the item's primary material:
  // iron 0.75, leather 0.35, wool 0.2.
  describe('getReduction()', function() {
    it('returns the authored profile for a steel piece', function() {
      const plate = build('plate',['steel']);
      expect(plate.getReduction(DamageType.crush)).to.equal(40);
      expect(plate.getReduction(DamageType.slash)).to.equal(50);
      expect(plate.getReduction(DamageType.pierce)).to.equal(48);
    });

    it('scales the profile down for a weaker metal', function() {
      const plate = build('plate',['iron']);
      expect(plate.getReduction(DamageType.crush)).to.equal(30);
      expect(plate.getReduction(DamageType.slash)).to.equal(38);
      expect(plate.getReduction(DamageType.pierce)).to.equal(36);
    });

    it('scales a wool piece down by its low absorption', function() {
      const doublet = build('doublet',['wool']);
      expect(doublet.getReduction(DamageType.crush)).to.equal(8);
      expect(doublet.getReduction(DamageType.slash)).to.equal(12);
      expect(doublet.getReduction(DamageType.pierce)).to.equal(7);
    });

    it('keys the absorption off the primary material, not a softer backing', function() {
      expect(build('cuirass',['steel','leather']).getReduction(DamageType.slash)).to.equal(35);
    });

    it('scales a shield the same way', function() {
      const buckler = build('leather-buckler',['leather']);
      expect(buckler.getReduction(DamageType.crush)).to.equal(1);
      expect(buckler.getReduction(DamageType.slash)).to.equal(2);
      expect(buckler.getReduction(DamageType.pierce)).to.equal(1);
    });

    it('is zero for a weapon, even in a material that has no absorption', function() {
      expect(build('hatchet',['flint']).getReduction(DamageType.slash)).to.equal(0);
    });
  });

  // Damage ranges are authored at baseline quality and scaled by the primary material's factor for the damage being
  // done: flint sharpness 0.75, stone heft 0.75, iron lash 0.9, steel tension 1.1.
  describe('getDamageRange()', function() {
    it('returns the authored range for a steel blade', function() {
      expect(build('longsword',['steel']).getDamageRange()).to.deep.equal({ low:50, high:100 });
    });

    it('scales a blade down by its sharpness', function() {
      expect(build('longsword',['flint']).getDamageRange()).to.deep.equal({ low:38, high:75 });
    });

    it('scales a crushing weapon by its heft', function() {
      expect(build('mace',['stone']).getDamageRange()).to.deep.equal({ low:15, high:75 });
    });

    it('scales a whip by its lash and a bow by its tension', function() {
      expect(build('chain-whip',['iron']).getDamageRange()).to.deep.equal({ low:27, high:63 });
      expect(build('longbow',['steel']).getDamageRange()).to.deep.equal({ low:66, high:132 });
    });
  });

  describe('getEnchantment()', function() {
    it('is null without an enchantment', function() {
      const sword = build('longsword',['steel']);
      expect(sword.hasEnchantment()).to.be.false;
      expect(sword.getEnchantment()).to.equal(null);
    });

    it('gives a weapon a weapon enchantment', function() {
      const enchantment = { type:WeaponEnchantments.endanger, species:'kobold', power:100 };
      const sword = build('longsword',['steel'],{ enchantment });
      expect(sword.hasEnchantment()).to.be.true;
      expect(sword.getEnchantment().getType()).to.equal(WeaponEnchantments.endanger);
      expect(sword.getEnchantment().processOnHit).to.be.a('function');
    });

    it('gives armor and shields an armor enchantment', function() {
      const enchantment = { type:ArmorEnchantments.resist, power:50 };
      const shield = build('buckler',['silver'],{ enchantment });
      expect(shield.getEnchantment().getType()).to.equal(ArmorEnchantments.resist);
      expect(shield.getEnchantment().getPower()).to.equal(100);
      expect(shield.getEnchantment().processOnHit).to.be.undefined;
    });
  });

});
